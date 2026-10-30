// TestSpace: «бэкенд в браузере».
// Раньше сайт ходил на свой сервер (Node.js + Express, server.js). Теперь те же самые запросы (/login, /groups, /tests ...)
// выполняются прямо здесь, поверх Firebase: Authentication (вход) и Firestore (база данных).
// Формат ответов полностью совпадает со старым сервером, поэтому app.js почти не менялся.
//
// Файл не зависит от конкретной версии Firebase SDK: нужные функции передаются в createApi().
// Безопасность обеспечивают правила Firestore (файл firestore.rules): они проверяют, кто что может читать и писать.

export function createApi({ F, auth, localExecute }) {
  const CREATOR = ['teacher', 'user'];
  const enc = new TextEncoder();
  const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  const sha256 = async s => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
  const rid = () => hex(crypto.getRandomValues(new Uint8Array(6)));
  const E = m => new Error(m);
  const D = path => F.doc(F.db, ...path.split('/'));
  const C = name => F.collection(F.db, name);
  const chunk = (a, n) => { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; };
  const pub = u => ({ id: u.id, name: u.name, role: u.role });
  const accessOf = t => t.access || 'group';
  const pct = a => Math.min(100, Math.round(((a.auto || 0) + (a.bonus || 0)) / (a.total || 1) * 100));
  const clean = o => JSON.parse(JSON.stringify(o)); // убирает undefined: Firestore их не принимает
  const toEmail = u => hex(enc.encode(u)) + '@testspace.app'; // логин -> служебный email (Firebase Auth требует email)
  const toPw = p => 'ts#' + p;                                // Firebase требует 6+ символов, у нас было 4+

  // ---------- Текущий пользователь, часы сервера ----------
  let ME = null, SKEW = 0;
  const userCache = new Map();
  const now = () => Date.now() + SKEW;
  async function loadMe() {
    const id = auth.uid(); if (!id) { ME = null; return null; }
    if (ME && ME.id === id) return ME;
    const s = await F.getDoc(D('users/' + id)); if (!s.exists()) return null;
    ME = { id, ...s.data(), joined: s.data().joined || [] }; userCache.set(id, ME); return ME;
  }
  async function me(roles) {
    const u = await loadMe(); if (!u) throw E('auth');
    if (roles && ![].concat(roles).includes(u.role)) throw E('auth');
    return u;
  }
  async function getUser(id) {
    if (userCache.has(id)) return userCache.get(id);
    let u = null; try { const s = await F.getDoc(D('users/' + id)); if (s.exists()) u = { id, ...s.data() }; } catch (e) { }
    userCache.set(id, u); return u;
  }
  // Время ставит сервер Firebase, а не часы компьютера студента: нельзя «растянуть» таймер, переведя время на ПК.
  async function syncClock() {
    try {
      const t0 = Date.now(); await F.setDoc(D('users/' + ME.id), { seen: F.serverTimestamp() }, { merge: true });
      const s = await F.getDoc(D('users/' + ME.id)), t1 = Date.now(), seen = s.data().seen;
      if (seen) SKEW = Math.round(seen.toMillis() - (t0 + t1) / 2);
    } catch (e) { }
  }
  function mapAuthErr(e) {
    const c = (e && e.code) || '';
    if (c === 'auth/email-already-in-use') return E('exists');
    if (['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password', 'auth/invalid-email', 'auth/weak-password', 'auth/missing-password', 'auth/invalid-login-credentials'].includes(c)) return E('invalid');
    if (c === 'auth/too-many-requests') return E('Слишком много попыток. Попробуйте позже.');
    if (c === 'auth/operation-not-allowed') return E('В Firebase не включён вход по Email/Password (Authentication → Sign-in method)');
    if (c === 'auth/network-request-failed') return E('Нет соединения с Firebase');
    return E(c || String(e && e.message));
  }

  // ---------- Чтение из Firestore ----------
  const ms = v => v && typeof v.toMillis === 'function' ? v.toMillis() : v;
  const fromDoc = d => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) });
  const attDoc = d => { const a = fromDoc(d); a.startedAt = ms(a.startedAt); a.violations = a.violations || []; return a; };
  async function where(col, ...conds) {
    const s = await F.getDocs(F.query(C(col), ...conds.map(([f, o, v]) => F.where(f, o, v))));
    return s.docs.map(col === 'attempts' ? attDoc : fromDoc);
  }
  async function getTest(id) { const s = await F.getDoc(D('tests/' + id)); return s.exists() ? fromDoc(s) : null; }
  const myAttempts = async u => new Map((await where('attempts', ['student', '==', u.id])).map(a => [a.testId, a]));
  const myGroupIds = async u => (await where('groupMembers', ['uid', '==', u.id])).map(m => m.groupId);

  // ---------- Вспомогательное: тесты ----------
  const info = (t, u, a) => ({
    id: t.id, title: t.title, count: t.count, timerMode: t.timerMode, minutes: t.minutes, mode: t.mode, variantCount: t.variantCount,
    access: accessOf(t), groupName: t.groupName || undefined, creator: t.creator, deadline: t.deadline || null, own: t.teacher === u.id,
    attempt: a ? { finished: a.finished, percent: pct(a), pending: a.pending } : null
  });
  async function takeList(u) {
    const [gids, atts] = await Promise.all([myGroupIds(u), myAttempts(u)]);
    const byId = new Map();
    for (const part of chunk(gids, 30)) for (const t of await where('tests', ['groupId', 'in', part], ['access', '==', 'group'])) byId.set(t.id, t);
    const joined = u.joined || [], need = new Set(joined); atts.forEach((a, tid) => need.add(tid));
    const rest = [...need].filter(id => !byId.has(id));
    for (const t of await Promise.all(rest.map(getTest))) {
      if (t && (joined.includes(t.id) || (accessOf(t) === 'public' && atts.has(t.id)))) byId.set(t.id, t);
    }
    return [...byId.values()].filter(t => t.teacher !== u.id).sort((a, b) => b.created - a.created).map(t => info(t, u, atts.get(t.id)));
  }

  // Можно ли проходить тест (то же правило проверяют и правила Firestore): не свой; публичный / приватный по коду / тест моей группы
  async function canTake(u, t) {
    if (t.teacher === u.id) return false;
    const ac = accessOf(t);
    if (ac === 'public') return true;
    if (ac === 'private') return (u.joined || []).includes(t.id);
    return !!t.groupId && (await F.getDoc(D('groupMembers/' + t.groupId + '_' + u.id))).exists();
  }

  // ---------- Проверка работы (раньше делал сервер) ----------
  // Код студента проверяется в браузере: JavaScript и Python. Для Java и C++ браузер компилятора не имеет,
  // такие задания остаются «на проверку учителю» (поле pending), как раньше при отсутствии компилятора.
  async function gradeVariant(qs, answers) {
    let auto = 0, pending = 0; const results = [];
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i], ans = (answers || [])[i];
      if (q.type === 'mc') { const r = ans === q.correct ? 1 : 0; auto += r; results.push(r); continue; }
      if (!q.tests || !q.tests.length) { pending++; results.push(null); continue; }
      if (!ans || !String(ans).trim()) { results.push(0); continue; }
      const ex = await localExecute(q.lang, String(ans), q.tests);
      if (ex.missing) { pending++; results.push(null); continue; }
      const r = ex.compile != null ? 0 : ex.results.filter(x => x.ok).length / q.tests.length;
      auto += r; results.push(r);
    }
    return { results, auto, pending, total: qs.length };
  }
  const cleanAnswers = arr => Array.from({ length: Math.min(100, (arr || []).length) }, (_, i) => {
    const x = arr[i]; return x == null ? null : typeof x === 'number' ? x : String(x).slice(0, 20000);
  });
  // Закрыть работу и проверить. Студент: сначала фиксирует «завершено» (после этого правила открывают ему ключи), потом пишет оценку.
  async function finishAttempt(a, t, { answers, forced, expired, finishedAt, byTeacher }) {
    const patch = { finished: true, finishedAt: finishedAt ?? now(), forced: !!forced, answers: cleanAnswers(answers) };
    if (expired) patch.expired = true;
    const ref = D('attempts/' + a.id);
    if (!byTeacher) await F.updateDoc(ref, patch);
    const sec = await F.getDoc(D('testSecrets/' + a.testId));
    if (!sec.exists()) throw E('404');
    const g = await gradeVariant(sec.data().variants['v' + a.variant], patch.answers);
    const res = { results: g.results, auto: g.auto, pending: g.pending, total: g.total, graded: true };
    await F.updateDoc(ref, byTeacher ? { ...patch, ...res } : res);
    Object.assign(a, patch, res); return a;
  }
  // Автозавершение: срок сдачи вышел или таймер закончился — работа закрывается с тем, что студент успел написать.
  const isOver = (t, a) => (t.deadline && now() > t.deadline + 3000) || (t.timerMode === 'total' && now() > a.startedAt + t.minutes * 60000 + 30000);
  async function sweepList(list, tests, byTeacher) {
    for (const a of list) {
      if (a.finished) continue; const t = tests.get(a.testId); if (!t || !isOver(t, a)) continue;
      try { await finishAttempt(a, t, { answers: a.answers || [], forced: true, expired: true, finishedAt: Math.min(now(), t.deadline || now()), byTeacher }); }
      catch (e) { console.error('sweep', e); }
    }
  }
  let lastSweep = 0;
  async function sweepMine(u, force) {
    if (!force && Date.now() - lastSweep < 8000) return; lastSweep = Date.now();
    const open = (await where('attempts', ['student', '==', u.id], ['finished', '==', false]));
    if (!open.length) return;
    const tests = new Map(); await Promise.all([...new Set(open.map(a => a.testId))].map(async id => { const t = await getTest(id); if (t) tests.set(id, t); }));
    await sweepList(open, tests, false);
  }
  async function sweepOwn(u, atts, tests) {
    await sweepList(atts.filter(a => !a.finished), new Map(tests.map(t => [t.id, t])), true);
  }

  // ---------- Онлайн-панель учителя ----------
  // Вместо опроса базы каждые 3 секунды держим одну живую подписку: читаются только изменившиеся записи (экономит лимиты Firestore).
  const MON = { id: null, unsubs: [], attempts: new Map(), members: [], meta: null, code: undefined, last: 0, lastSweep: 0, err: null };
  const monStop = () => { MON.unsubs.forEach(f => { try { f(); } catch (e) { } }); MON.unsubs = []; MON.id = null; };
  const monTimer = setInterval(() => { if (MON.id && Date.now() - MON.last > 15000) monStop(); }, 5000);
  if (monTimer.unref) monTimer.unref();

  // ---------- Маршруты ----------
  const imgOk = s => typeof s === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,/.test(s) && s.length <= 900000 ? s : undefined;
  const newCode = async () => { let c, s; do { c = hex(crypto.getRandomValues(new Uint8Array(3))).toUpperCase(); s = await F.getDoc(D('testCodes/' + c)); } while (s.exists()); return c; };
  const savedAns = new Map();

  async function loadQuestions(tid, variant) {
    const s = await F.getDoc(D('testQuestions/' + tid)); if (!s.exists()) throw E('404');
    const qs = clean(s.data().variants['v' + variant]);
    const hs = [...new Set(qs.map(q => q.image).filter(x => typeof x === 'string' && x.startsWith('img:')).map(x => x.slice(4)))];
    const pics = {}; await Promise.all(hs.map(async h => { const d = await F.getDoc(D('images/' + h)); if (d.exists()) pics[h] = d.data().data; }));
    qs.forEach(q => { if (typeof q.image === 'string' && q.image.startsWith('img:')) { const p = pics[q.image.slice(4)]; if (p) q.image = p; else delete q.image; } });
    return qs;
  }

  const routes = [];
  const on = (m, re, h) => routes.push([m, re, h]);

  // --- вход / регистрация ---
  on('POST', /^\/register$/, async b => {
    const { username, password, role } = b, name = String(b.name || '').trim().slice(0, 60);
    if (!name || !username || !password || password.length < 4 || !['teacher', 'student', 'user'].includes(role) || enc.encode(username).length > 31) throw E('invalid');
    try { await auth.register(toEmail(username), toPw(password)); } catch (e) { throw mapAuthErr(e); }
    const prof = { name, username, role, joined: [] };
    try { await F.setDoc(D('users/' + auth.uid()), prof); }
    catch (e) { console.error(e); try { await auth.removeCurrent(); } catch (x) { } throw E('invalid'); }
    userCache.clear(); ME = { id: auth.uid(), ...prof }; userCache.set(ME.id, ME); syncClock();
    return { user: pub(ME) };
  });
  on('POST', /^\/login$/, async b => {
    try { await auth.login(toEmail(String(b.username || '')), toPw(String(b.password || ''))); } catch (e) { throw mapAuthErr(e); }
    userCache.clear(); ME = null; const u = await loadMe();
    if (!u) { await auth.logout(); throw E('invalid'); }
    syncClock(); return { user: pub(u) };
  });
  on('GET', /^\/me$/, async () => pub(await me()));
  on('PUT', /^\/me$/, async b => {
    const u = await me(), name = String(b.name || '').trim().slice(0, 60); if (!name) throw E('invalid');
    await F.updateDoc(D('users/' + u.id), { name }); u.name = name;
    if (CREATOR.includes(u.role)) { // имя автора показывается в карточках тестов
      try { for (const t of await where('tests', ['teacher', '==', u.id])) await F.updateDoc(D('tests/' + t.id), { creator: name }); } catch (e) { }
    }
    return pub(u);
  });
  on('POST', /^\/logout$/, async () => { monStop(); await auth.logout(); ME = null; userCache.clear(); savedAns.clear(); return { ok: true }; });

  // --- группы ---
  on('POST', /^\/groups$/, async b => {
    const u = await me('teacher'), { name, password } = b; if (!name || !password) throw E('invalid');
    if ((await where('groups', ['teacher', '==', u.id])).some(g => g.name === name)) throw E('invalid');
    const gid = rid(), key = await sha256(name + '\n' + password);
    await F.setDoc(D('groups/' + gid), { name, teacher: u.id, created: Date.now() });
    // «ключ входа» = хеш(название + пароль). Пароль группы нигде не хранится, а студент, зная название и пароль, находит группу по ключу.
    try { await F.setDoc(D('groupKeys/' + key), { groupId: gid, teacher: u.id }); }
    catch (e) { try { await F.deleteDoc(D('groups/' + gid)); } catch (x) { } throw E('invalid'); }
    return { ok: 1 };
  });
  on('GET', /^\/groups$/, async () => {
    const u = await me();
    if (u.role === 'teacher') {
      const [gs, mem] = await Promise.all([where('groups', ['teacher', '==', u.id]), where('groupMembers', ['teacher', '==', u.id])]);
      gs.sort((a, b) => a.created - b.created); const out = [];
      for (const g of gs) {
        const st = (await Promise.all(mem.filter(m => m.groupId === g.id).map(m => getUser(m.uid)))).filter(Boolean).map(pub);
        out.push({ id: g.id, name: g.name, students: st });
      }
      return out;
    }
    const ids = await myGroupIds(u), snaps = await Promise.all(ids.map(id => F.getDoc(D('groups/' + id))));
    return snaps.filter(s => s.exists()).map(s => ({ id: s.id, name: s.data().name, students: [] }));
  });
  on('POST', /^\/groups\/join$/, async b => {
    const u = await me('student'), key = await sha256(String(b.name || '') + '\n' + String(b.password || ''));
    const ks = await F.getDoc(D('groupKeys/' + key)); if (!ks.exists()) throw E('invalid');
    const k = ks.data(), mid = k.groupId + '_' + u.id;
    if (!(await F.getDoc(D('groupMembers/' + mid))).exists()) await F.setDoc(D('groupMembers/' + mid), { groupId: k.groupId, uid: u.id, teacher: k.teacher, key });
    return { ok: 1 };
  });
  on('DELETE', /^\/groups\/([^/]+)\/students\/([^/]+)$/, async (b, gid, sid) => {
    await me('teacher'); await F.deleteDoc(D('groupMembers/' + gid + '_' + sid)); return { ok: 1 };
  });

  // --- списки тестов ---
  on('GET', /^\/tests$/, async () => {
    const u = await me();
    if (!CREATOR.includes(u.role)) { await sweepMine(u); return takeList(u); }
    const [ts, atts, secs] = await Promise.all([where('tests', ['teacher', '==', u.id]), where('attempts', ['teacher', '==', u.id]),
      where('testSecrets', ['teacher', '==', u.id], ['access', '==', 'private'])]);
    await sweepOwn(u, atts, ts);
    const codes = new Map(secs.map(s => [s.id, s.code]));
    return ts.sort((a, b) => b.created - a.created).map(t => ({
      id: t.id, title: t.title, count: t.count, access: accessOf(t), code: accessOf(t) === 'private' ? codes.get(t.id) : undefined, deadline: t.deadline || null,
      groupName: t.groupName || undefined, attempts: atts.filter(a => a.testId === t.id).length
    }));
  });
  on('GET', /^\/available$/, async () => { const u = await me(); await sweepMine(u); return takeList(u); });
  on('GET', /^\/catalog$/, async () => {
    const u = await me(); await sweepMine(u);
    const [ts, atts] = await Promise.all([where('tests', ['access', '==', 'public']), myAttempts(u)]);
    return ts.sort((a, b) => b.created - a.created).map(t => info(t, u, atts.get(t.id)));
  });
  on('POST', /^\/tests\/join$/, async b => {
    const u = await me(), code = String(b.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const s = code && await F.getDoc(D('testCodes/' + code)); if (!s || !s.exists()) throw E('nocode');
    const c = s.data(); if (c.teacher === u.id) throw E('own');
    if (!u.joined.includes(c.testId)) { await F.updateDoc(D('users/' + u.id), { joined: F.arrayUnion(c.testId) }); u.joined.push(c.testId); }
    return { id: c.testId, title: c.title };
  });

  // --- создание и удаление теста ---
  on('POST', /^\/tests$/, async b => {
    const u = await me(CREATOR), { groupId, title, minutes, questions } = b;
    const timerMode = ['none', 'total', 'per'].includes(b.timerMode) ? b.timerMode : 'none';
    const mode = ['same', 'choice', 'individual'].includes(b.mode) ? b.mode : 'same';
    let access = ['group', 'public', 'private'].includes(b.access) ? b.access : 'group';
    if (u.role === 'user' && access === 'group') access = 'public';
    let g = null;
    if (access === 'group') { const s = await F.getDoc(D('groups/' + groupId)); if (s.exists() && s.data().teacher === u.id) g = { id: s.id, ...s.data() }; }
    if ((access === 'group' && !g) || !title || !Array.isArray(questions) || !questions.length) throw E('invalid');
    let code;
    if (access === 'private') {
      code = String(b.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
      if (code && code.length < 4) throw E('code');
      if (code && (await F.getDoc(D('testCodes/' + code))).exists()) throw E('codeTaken');
      if (!code) code = await newCode();
    }
    const cl = questions.map(q => q.type === 'mc'
      ? { type: 'mc', text: String(q.text), image: imgOk(q.image), options: q.options.map(String), correct: +q.correct, variant: +q.variant || 1, time: +q.time || 60 }
      : { type: 'code', text: String(q.text), image: imgOk(q.image), lang: ['javascript', 'python', 'java', 'cpp'].includes(q.lang) ? q.lang : 'python', cmode: ['starter', 'fix'].includes(q.cmode) ? q.cmode : 'scratch',
          starter: String(q.starter || ''), hint: String(q.hint || ''), variant: +q.variant || 1, time: +q.time || 300,
          tests: (q.tests || []).map(x => ({ input: String(x.input || ''), expected: String(x.expected || ''), hidden: !!x.hidden })) });
    const nums = [...new Set(cl.map(q => q.variant))].sort((a, b) => a - b);
    let variants = nums.map(n => cl.filter(q => q.variant === n));
    if (mode === 'same') variants = [variants[0]];
    const dl = +b.deadline > Date.now() ? +b.deadline : null, tid = rid();
    // Картинки хранятся отдельно (документ Firestore не может быть больше 1 МБ)
    const hashOf = new Map();
    for (const v of variants) for (const q of v) if (q.image && !hashOf.has(q.image)) hashOf.set(q.image, await sha256(q.image));
    for (const [data, h] of hashOf) if (!(await F.getDoc(D('images/' + h))).exists()) await F.setDoc(D('images/' + h), { data });
    const pubQ = q => q.type === 'mc'
      ? { type: 'mc', text: q.text, options: q.options, time: q.time, image: q.image ? 'img:' + hashOf.get(q.image) : undefined }
      : { type: 'code', text: q.text, lang: q.lang, cmode: q.cmode, starter: q.starter, hint: q.hint, time: q.time, image: q.image ? 'img:' + hashOf.get(q.image) : undefined,
          examples: q.tests.filter(x => !x.hidden).map(x => ({ input: x.input, expected: x.expected })) };
    // Три документа: открытая часть (без ответов), вопросы для студентов и «секреты» (верные ответы, скрытые тесты) — их студент читать не может.
    const obj = fn => Object.fromEntries(variants.map((v, i) => ['v' + i, v.map(fn)]));
    const meta = { title: String(title).slice(0, 120), teacher: u.id, creator: u.name, access, groupId: g ? g.id : null, groupName: g ? g.name : null, deadline: dl,
      timerMode, minutes: +minutes || 30, mode, variantCount: variants.length, count: variants[0].length, created: Date.now() };
    const done = [];
    try {
      await F.setDoc(D('tests/' + tid), clean(meta)); done.push('tests/' + tid);
      await F.setDoc(D('testQuestions/' + tid), clean({ variants: obj(pubQ) })); done.push('testQuestions/' + tid);
      await F.setDoc(D('testSecrets/' + tid), clean({ teacher: u.id, access, code: code || null, variants: obj(q => ({ ...q, image: undefined })) })); done.push('testSecrets/' + tid);
      if (code) { await F.setDoc(D('testCodes/' + code), { testId: tid, teacher: u.id, title: meta.title }); done.push('testCodes/' + code); }
    } catch (e) {
      console.error(e); for (const p of done.reverse()) { try { await F.deleteDoc(D(p)); } catch (x) { } }
      throw E('invalid');
    }
    return { ok: 1, id: tid, code };
  });
  on('DELETE', /^\/tests\/([^/]+)$/, async (b, tid) => {
    const u = await me(CREATOR), t = await getTest(tid); if (!t || t.teacher !== u.id) throw E('404');
    const atts = await where('attempts', ['teacher', '==', u.id], ['testId', '==', tid]);
    const sec = await F.getDoc(D('testSecrets/' + tid)), code = sec.exists() ? sec.data().code : null;
    const refs = [...atts.map(a => D('attempts/' + a.id)), D('testQuestions/' + tid), D('testSecrets/' + tid)]; if (code) refs.push(D('testCodes/' + code));
    refs.push(D('tests/' + tid));
    for (const part of chunk(refs, 400)) { const bt = F.writeBatch(F.db); part.forEach(r => bt.delete(r)); await bt.commit(); }
    return { ok: 1 };
  });

  // --- прохождение теста студентом ---
  on('POST', /^\/tests\/([^/]+)\/start$/, async (b, tid) => {
    const u = await me(); await sweepMine(u, true);
    const t = await getTest(tid); if (!t || !(await canTake(u, t))) throw E('404');
    const aid = tid + '_' + u.id, ref = D('attempts/' + aid);
    let snap = await F.getDoc(ref), a = snap.exists() ? attDoc(snap) : null;
    if (a && a.finished) throw E('finished');
    await syncClock();
    if (t.deadline && now() > t.deadline) throw E('deadline');
    if (!a) {
      let v = 0;
      if (t.mode === 'choice') v = Math.max(0, Math.min(t.variantCount - 1, +b.variant || 0));
      if (t.mode === 'individual') v = Math.floor(Math.random() * t.variantCount);
      try { await F.setDoc(ref, { testId: tid, student: u.id, teacher: t.teacher, variant: v, startedAt: F.serverTimestamp(), violations: [], finished: false, answers: [] }); }
      catch (e) { console.error(e); throw E('404'); }
      a = attDoc(await F.getDoc(ref));
    }
    const qs = await loadQuestions(tid, a.variant), n = now();
    const tl = t.timerMode === 'total' ? Math.max(0, Math.round((a.startedAt + t.minutes * 60000 - n) / 1000)) : null;
    const dl = t.deadline ? Math.max(0, Math.round((t.deadline - n) / 1000)) : null;
    const saved = (a.answers || []).map(x => x === null ? undefined : x);
    savedAns.set(aid, JSON.stringify(a.answers || []));
    return { title: t.title, timerMode: t.timerMode, violations: a.violations.length, left: tl != null && dl != null ? Math.min(tl, dl) : tl, deadlineLeft: dl, saved,
      questions: qs.map(q => ({ type: q.type, text: q.text, image: q.image, options: q.options, lang: q.lang, cmode: q.cmode, starter: q.starter, hint: q.hint, time: q.time,
        examples: q.type === 'code' ? q.examples || [] : undefined })) };
  });
  // автосохранение ответов: если студент закроет вкладку, при сроке сдачи работа закроется с сохранённым
  on('POST', /^\/tests\/([^/]+)\/save$/, async (b, tid) => {
    const u = await me(), aid = tid + '_' + u.id;
    if (!Array.isArray(b.answers)) return { ok: 1 };
    const answers = cleanAnswers(b.answers), s = JSON.stringify(answers);
    if (savedAns.get(aid) === s) return { ok: 1 }; // ничего не менялось — не тратим записи Firestore
    await F.updateDoc(D('attempts/' + aid), { answers }); savedAns.set(aid, s); return { ok: 1 };
  });
  on('POST', /^\/tests\/([^/]+)\/violation$/, async (b, tid) => {
    const u = await me(); await F.updateDoc(D('attempts/' + tid + '_' + u.id), { violations: F.arrayUnion({ type: String(b.type).slice(0, 20), at: now() }) });
    return { ok: 1 };
  });
  on('POST', /^\/tests\/([^/]+)\/submit$/, async (b, tid) => {
    const u = await me(); await sweepMine(u, true);
    const s = await F.getDoc(D('attempts/' + tid + '_' + u.id)); if (!s.exists()) throw E('404');
    const a = attDoc(s), t = await getTest(tid); if (!t) throw E('404');
    if (!a.finished) await finishAttempt(a, t, { answers: Array.isArray(b.answers) ? b.answers : a.answers || [], forced: !!b.forced });
    else if (!a.graded) await finishAttempt(a, t, { answers: a.answers || [], forced: a.forced }); // закрыто, но не проверено (например, закрыли вкладку)
    return { percent: pct(a), pending: a.pending };
  });

  // --- панель учителя ---
  on('GET', /^\/tests\/([^/]+)\/monitor$/, async (b, tid) => {
    const u = await me(CREATOR);
    if (MON.id !== tid) {
      monStop(); const t = await getTest(tid); if (!t || t.teacher !== u.id) throw E('404');
      MON.id = tid; MON.meta = t; MON.attempts = new Map(); MON.err = null; MON.lastSweep = 0;
      await new Promise(res => {
        let first = res;
        const un = F.onSnapshot(F.query(C('attempts'), F.where('teacher', '==', u.id), F.where('testId', '==', tid)),
          snap => { MON.attempts = new Map(snap.docs.map(d => [d.id, attDoc(d)])); if (first) { first(); first = null; } },
          err => { MON.err = err; if (first) { first(); first = null; } });
        MON.unsubs.push(un);
      });
      if (MON.err) { const e = MON.err; monStop(); throw e; }
      MON.members = t.groupId ? await where('groupMembers', ['groupId', '==', t.groupId], ['teacher', '==', u.id]) : [];
      MON.code = undefined;
      if (t.access === 'private') { const s = await F.getDoc(D('testSecrets/' + tid)); if (s.exists()) MON.code = s.data().code; }
    }
    MON.last = Date.now();
    if (Date.now() - MON.lastSweep > 30000) { MON.lastSweep = Date.now(); sweepList([...MON.attempts.values()], new Map([[tid, MON.meta]]), true).catch(() => { }); }
    const t = MON.meta, ids = MON.members.map(m => m.uid); MON.attempts.forEach(a => { if (!ids.includes(a.student)) ids.push(a.student); });
    const rows = await Promise.all(ids.map(async sid => {
      const usr = await getUser(sid), a = MON.attempts.get(tid + '_' + sid);
      return { name: usr && usr.name, attemptId: a && a.id, status: !a ? 'notStarted' : a.finished ? 'finished' : 'inProgress', expired: !!(a && a.expired),
        variant: a ? a.variant + 1 : null, violations: a ? a.violations : [], percent: a && a.finished ? pct(a) : null, pending: a ? a.pending || 0 : 0 };
    }));
    return { title: t.title, access: accessOf(t), code: MON.code, deadline: t.deadline || null, rows };
  });
  async function ownAttempt(id) {
    const u = await me(CREATOR), s = await F.getDoc(D('attempts/' + id)); if (!s.exists()) throw E('404');
    const a = attDoc(s); if (a.teacher !== u.id) throw E('404'); return a;
  }
  on('GET', /^\/attempts\/([^/]+)$/, async (b, id) => {
    const a = await ownAttempt(id), sec = await F.getDoc(D('testSecrets/' + a.testId)); if (!sec.exists()) throw E('404');
    return { id: a.id, bonus: a.bonus || 0, pending: a.pending, answers: a.answers, results: a.results, questions: sec.data().variants['v' + a.variant] };
  });
  on('POST', /^\/attempts\/([^/]+)\/grade$/, async (b, id) => {
    const a = await ownAttempt(id); await F.updateDoc(D('attempts/' + id), { bonus: Math.max(0, Math.min(a.pending || 0, +b.bonus || 0)) }); return { ok: 1 };
  });
  on('GET', /^\/stats$/, async () => {
    const u = await me(CREATOR);
    const [my, atts, mem] = await Promise.all([where('tests', ['teacher', '==', u.id]), where('attempts', ['teacher', '==', u.id]), where('groupMembers', ['teacher', '==', u.id])]);
    await sweepOwn(u, atts, my);
    const done = atts.filter(a => a.finished).sort((a, b) => b.finishedAt - a.finishedAt), title = new Map(my.map(t => [t.id, t.title]));
    const rows = []; for (const a of done) { const s = await getUser(a.student); rows.push({ student: s && s.name, test: title.get(a.testId), percent: pct(a), violations: a.violations.length, at: a.finishedAt }); }
    const tests = my.map(t => { const r = done.filter(a => a.testId === t.id); return { title: t.title, count: r.length, avg: r.length ? Math.round(r.reduce((s, a) => s + pct(a), 0) / r.length) : 0 }; });
    return { rows, tests, students: new Set(mem.map(m => m.uid)).size };
  });

  return async function api(path, method = 'GET', body) {
    const p = String(path).split('?')[0];
    for (const [m, re, h] of routes) {
      if (m !== method) continue; const mm = re.exec(p); if (!mm) continue;
      try { return await h(body || {}, ...mm.slice(1).map(decodeURIComponent)); }
      catch (e) {
        if (e && e.code && String(e.code).startsWith('permission')) console.error('[TestSpace] Firestore отклонил запрос ' + method + ' ' + p + '. Опубликованы ли правила из firestore.rules?', e);
        throw e instanceof Error && !e.code ? e : E(e.code || e.message);
      }
    }
    throw E('404');
  };
}
