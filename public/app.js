function logoSVG(){return `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M9 5h17a5 5 0 0 1 5 5v7M9 5a5 5 0 0 0-5 5v17a5 5 0 0 0 5 5h9" stroke="#ff1f3d" stroke-width="3.2" stroke-linecap="round"/><path d="M12 13h12M12 19h9M12 25h5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M21 28l5 5 10-12" stroke="#ff1f3d" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
const ICO = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>', doc: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 4.5 2 4.5 5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 4-7 8-7s8 2.5 8 7"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  logout: '<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M15 8l4 4-4 4M19 12H9"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17v.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="3.5"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>', moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  half: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>', play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24">${ICO[n]}</svg>`;
function startSphere(cv){
  const c=cv.getContext('2d'),W=['for','if','int','{ }','</>','=>','0101','while','def','class','return','print()','&&','[ ]','main','void','x++','null','#include','import','git','fn','var','1','0','else','try',';','()','==','let','SELECT','Java','C++','npm','true','//','{','}','for(int i=0;i<n;i++)','System.out.println','public static void main','return 0;','if (x > 0) {','def solve():','console.log()','SELECT * FROM','while(true){','</div>','int[] a','10110','#include <stdio.h>','import java.util.*;','std::cout','git commit','function()','new Scanner','i++','0xFF','=> {','};','"Hello"','len(a)','range(n)','break;','public class','String','boolean','double','List<int>','HashMap','O(n)'],N=1800,P=[],rnd=i=>{const s=Math.sin(i*12.9898)*43758.5453;return s-Math.floor(s)},PAD=700;
  for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996;P.push({x:Math.cos(a)*r,y,z:Math.sin(a)*r,w:W[Math.floor(rnd(i)*W.length)],s:.7+rnd(i+7)*.6})}
  let ay=0,ax=-.25,vy=.003,vx=0,drag=false,lx=0,ly=0,w,h,R,cx,cy0,d=1,back,front,SP=new Map(),last=0;
  const mk=()=>{const o=document.createElement('canvas');o.width=cv.width;o.height=Math.round((h+PAD)*d);const x=o.getContext('2d');x.setTransform(d,0,0,d,0,0);return x};
  function build(){
    const b=mk(),f=mk();back=b.canvas;front=f.canvas;
    const halo=b.createRadialGradient(cx,cy0,R*.95,cx,cy0,R*1.35);halo.addColorStop(0,'rgba(255,30,60,.55)');halo.addColorStop(.35,'rgba(255,30,60,.18)');halo.addColorStop(1,'rgba(255,30,60,0)');
    b.fillStyle=halo;b.beginPath();b.arc(cx,cy0,R*1.35,0,7);b.fill();
    b.lineWidth=1;for(let i=0;i<60;i++){const a=rnd(i+50)*6.283,o=rnd(i+11)*.04,l=.08+rnd(i+90)*.5;b.strokeStyle=`rgba(255,60,80,${(.1+rnd(i+33)*.35).toFixed(2)})`;b.beginPath();b.moveTo(cx+Math.cos(a)*R*(1+o),cy0+Math.sin(a)*R*(1+o));b.lineTo(cx+Math.cos(a)*R*(1+o+l),cy0+Math.sin(a)*R*(1+o+l));b.stroke()}
    const g=b.createRadialGradient(cx-R*.4,cy0-R*.45,R*.05,cx,cy0,R);g.addColorStop(0,'#5c0814');g.addColorStop(.55,'#1c0308');g.addColorStop(1,'#030001');
    b.fillStyle=g;b.beginPath();b.arc(cx,cy0,R,0,7);b.fill();
    const ig=b.createRadialGradient(cx,cy0,R*.78,cx,cy0,R);ig.addColorStop(0,'rgba(255,30,60,0)');ig.addColorStop(1,'rgba(255,40,70,.4)');b.fillStyle=ig;b.beginPath();b.arc(cx,cy0,R,0,7);b.fill();
    f.shadowColor='#ff1f3d';f.shadowBlur=45;f.strokeStyle='rgba(255,40,70,.55)';f.lineWidth=3;f.beginPath();f.arc(cx,cy0,R,0,7);f.stroke();
    f.shadowBlur=30;f.strokeStyle='#ff9aa6';f.lineWidth=2.5;f.beginPath();f.arc(cx,cy0,R,-2.95,-.35);f.stroke();
    f.shadowBlur=14;[[1.3,.34,-.5],[1.55,.26,-.42],[1.85,.2,-.34],[1.12,.42,-.62],[2.2,.14,-.28]].forEach((o,i)=>{f.strokeStyle=`rgba(255,${50+i*12},${70+i*10},${.75-i*.1})`;f.lineWidth=1.6-i*.2;f.beginPath();f.ellipse(cx,cy0,R*o[0],R*o[1],o[2],0,7);f.stroke()});
  }
  const spr=(t,fs,cb)=>{const k=t+'|'+fs+'|'+cb;let s=SP.get(k);if(!s){const o=document.createElement('canvas'),x=o.getContext('2d'),f=fs+'px Consolas,monospace';x.font=f;const tw=Math.ceil(x.measureText(t).width)+4,th=Math.ceil(fs*1.5);o.width=Math.ceil(tw*d);o.height=Math.ceil(th*d);x.setTransform(d,0,0,d,0,0);x.font=f;x.textBaseline='middle';x.fillStyle=`rgb(255,${50+150*cb/5|0},${65+110*cb/5|0})`;x.fillText(t,2,th/2);s={o,tw,th};SP.set(k,s)}return s};
  const fit=()=>{d=Math.min(devicePixelRatio||1,1.5);w=cv.clientWidth;h=cv.clientHeight;cv.width=Math.round(w*d);cv.height=Math.round(h*d);const big=w>800;R=big?Math.min(h*.95,w*.38):w*.7;cx=big?w-R*.45:w*.65;cy0=big?h*.9:h*.88;SP.clear();build()};
  fit();addEventListener('resize',fit);
  cv.onpointerdown=e=>{drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId)};
  cv.onpointermove=e=>{if(!drag)return;vy=(e.clientX-lx)*.008;vx=(e.clientY-ly)*.008;ay+=vy;ax=Math.max(-1.4,Math.min(1.4,ax+vx));lx=e.clientX;ly=e.clientY};
  cv.onpointerup=cv.onpointercancel=()=>drag=false;
  (function loop(t){
    if(!cv.isConnected){removeEventListener('resize',fit);return}
    const dt=Math.min(3,(t-last)/16.7||1);last=t;
    if(!drag){ay+=vy*dt;ax=Math.max(-1.4,Math.min(1.4,ax+vx*dt));vy+=(.003-vy)*.03*dt;vx*=Math.pow(.94,dt)}
    const oy=scrollY*.35;
    c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,cv.width,cv.height);c.drawImage(back,0,-oy*d);
    const ca=Math.cos(ay),sa=Math.sin(ay),cb=Math.cos(ax),sb=Math.sin(ax),Y0=cy0-oy,out=[];
    for(const p of P){const x1=p.x*ca+p.z*sa,z1=-p.x*sa+p.z*ca,z=p.y*sb+z1*cb;if(z>-.05)out.push({p,x:x1,y:p.y*cb-z1*sb,z})}
    out.sort((a,b)=>a.z-b.z);
    c.setTransform(1,0,0,1,0,0);
    for(const q of out){const f=Math.max(0,q.z),L=Math.max(0,-q.x*.5-q.y*.6+q.z*.62),fs=Math.max(6,2*Math.round((3.2+5*f)*R/260*q.p.s/2)),s=spr(q.p.w,fs,Math.min(5,L*6|0));
      c.globalAlpha=.1+.8*Math.min(1,f*1.1+L*.2);c.drawImage(s.o,(cx+q.x*R*.985-s.tw/2)*d,(Y0+q.y*R*.985-s.th/2)*d)}
    c.globalAlpha=1;c.drawImage(front,0,-oy*d);
    requestAnimationFrame(loop)})(0);
}
const TS = localStorage;
const DEMO_HINT = '';
const S = { user: null, lang: localStorage.lang || 'ru', tab: null, page: 'home' };
let TK = null, tick = null, poll = null, NQ = [], regMode = false, QT = 'mc', CT = [];
const $ = i => document.getElementById(i);
const t = k => (I18N[S.lang][k] ?? I18N.ru[k] ?? k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ini = n => esc((n || '?').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase());
const norm = s => String(s ?? '').replace(/\r/g, '').split('\n').map(l => l.trimEnd()).join('\n').trim();
const LN = { javascript: 'JavaScript', python: 'Python' };
const LEGACY_LANG = { java: 'Java', cpp: 'C++' }; // Старые задания сохраняются без изменений
const SHAPES = ['▲', '◆', '●', '■'];
// Раньше здесь был fetch на свой сервер (/api/...). Теперь запросы обрабатывает ts-api.js поверх Firebase (формат ответов прежний).
async function api(p, m = 'GET', b) {
  if (!window.TSApi) await window.TSReady;
  if (!window.TSApi) throw new Error('Firebase недоступен: проверьте интернет и файл firebase-config.js');
  return window.TSApi(p, m, b);
}
function toast(m) { let el = $('toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); } el.textContent = m; el.className = 'toast show'; clearTimeout(el._t); el._t = setTimeout(() => el.className = 'toast', 3500); }
const fail = e => { const k = { auth: 'errAuth', finished: 'errFinished', exists: 'errExists', invalid: 'errInvalid' }[e.message]; toast(t(k || 'errOther')); if (e.message == 'auth' && S.user) logout(); };

// ---------- Запуск кода прямо в браузере (демо-тест и демо-версия сайта) ----------
function jsWorkerSrc() {
  onmessage = e => {
    const { code, input } = e.data; let out = '', err = '';
    const fmt = x => typeof x === 'object' ? JSON.stringify(x) : String(x);
    const con = { log: (...a) => { out += a.map(fmt).join(' ') + '\n'; } };
    const proc = { stdout: { write: s => { out += s; } } };
    const req = () => ({ readFileSync: () => input });
    try { new Function('console', 'require', 'process', code)(con, req, proc); }
    catch (x) {
      let line = null; const m = String(x.stack).match(/<anonymous>:(\d+):/);
      if (m) line = m[1] - 2;
      else if (x instanceof SyntaxError) { // ищем первую строку, на которой код перестаёт быть разбираемым
        const ls = code.split('\n');
        for (let k = 1; k <= ls.length && !line; k++) { try { new Function('console', 'require', 'process', ls.slice(0, k).join('\n')); } catch (y) { if (y instanceof SyntaxError && !/end of input|Unterminated|Unexpected end/i.test(y.message)) line = k; } }
      }
      err = 'main.js:' + (line || '?') + '\n' + x;
    }
    postMessage({ stdout: out, stderr: err, code: err ? 1 : 0 });
  };
}
function runJsLocal(code, input) {
  return new Promise(res => {
    const url = URL.createObjectURL(new Blob([`(${jsWorkerSrc})()`], { type: 'text/javascript' }));
    let w; const done = r => { clearTimeout(tm); try { w.terminate(); } catch (e) { } URL.revokeObjectURL(url); res(r); };
    const tm = setTimeout(() => done({ stdout: '', stderr: '', code: 1, timedOut: true }), 3000);
    try { w = new Worker(url); } catch (e) { return done({ stdout: '', stderr: String(e), code: 1 }); }
    w.onmessage = e => done(e.data); w.onerror = e => done({ stdout: '', stderr: 'main.js:?\n' + e.message, code: 1 });
    w.postMessage({ code, input });
  });
}
let PY = null;
async function runPyLocal(code, input) {
  try {
    if (!PY) {
      await new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
      PY = await loadPyodide();
    }
    const lines = input.split('\n'); if (lines[lines.length - 1] === '') lines.pop();
    // ввод и вывод подменяем прямо в Python, чтобы не зависеть от настроек Pyodide
    PY.runPython(`import sys,io,builtins\n_l=${JSON.stringify(lines)}\ndef _inp(p=''):\n    if not _l: raise EOFError('EOF when reading a line')\n    return _l.pop(0)\nbuiltins.input=_inp\nsys.stdout=io.StringIO()`);
    try { await PY.runPythonAsync(code, { globals: PY.globals.get('dict')() }); return { stdout: PY.runPython('sys.stdout.getvalue()'), stderr: '', code: 0 }; }
    catch (e) { return { stdout: PY.runPython('sys.stdout.getvalue()'), stderr: String(e.message), code: 1 }; }
    finally { PY.runPython('sys.stdout=sys.__stdout__'); }
  } catch (e) { return null; }
}
async function localExecute(lang, code, tests) {
  const results = [];
  for (const x of tests) {
    const inp = String(x.input || '').replace(/\n?$/, '\n');
    const r = lang === 'javascript' ? await runJsLocal(code, inp) : lang === 'python' ? await runPyLocal(code, inp) : null;
    if (!r) return { missing: true, results: [] };
    results.push({ input: x.input, expected: x.expected, out: r.stdout, err: r.code ? (r.stderr || ' ') : '', timedOut: r.timedOut, ok: x.expected != null && !r.code && !r.timedOut && norm(r.stdout) === norm(x.expected) });
  }
  return { results };
}

// ---------- Тема, язык, верхняя панель ----------
function theme() {
  // 'system' means the original TestSpace appearance, as requested.
  const stored = localStorage.getItem('theme');
  const m = ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
  document.documentElement.dataset.uiTheme = m;
  document.documentElement.classList.toggle('dark', m === 'dark');
  document.documentElement.style.colorScheme = m === 'dark' ? 'dark' : 'light';
}
function setTheme(m) { if (!['light', 'dark', 'system'].includes(m)) return; localStorage.setItem('theme', m); theme(); }
function cycleTheme() { const o = ['system', 'light', 'dark'], n = o[(o.indexOf(localStorage.theme || 'system') + 1) % 3]; setTheme(n); drawNav(); toast(t(n)); }
function setLang(l) { S.lang = l; localStorage.lang = l; S.user ? show(S.tab) : (S.page == 'auth' ? authPage() : home()); }
function drawNav() {
  document.body.classList.toggle('app', !!S.user); if (S.user) return drawSide();
  const T = S.user && S.user.role === 'teacher', tabs = S.user ? (T ? ['groups', 'tests', 'stats'] : ['tests', 'groups']) : [];
  $('nav').innerHTML = `<div class="nav"><a class="brand" onclick="${S.user ? `show('${S.tab || tabs[0]}')` : 'home()'}">${logoSVG()}<span><b>Test<i>Space</i></b></span></a>
  <div class="navmid ${S.user ? '' : 'hm'}">${S.user ? tabs.map(x => `<a class="nl ${x == S.tab ? 'on' : ''}" onclick="show('${x}')">${t(x)}</a>`).join('') : `<a class="nl on" onclick="home()">${t('s_home')}</a><a class="nl" onclick="goFeat()">${t('navFeat')}</a><a class="nl" onclick="goFeat()">${t('about')}</a>`}</div>
  <select onchange="setLang(this.value)" class="inp">${['ru', 'kk', 'en'].map(l => `<option value=${l} ${S.lang == l ? 'selected' : ''}>${l.toUpperCase()}</option>`).join('')}</select>
  <button class="btn2 ic" onclick="cycleTheme()" title="${t(localStorage.theme || 'system')}">${{ light: ic('sun'), dark: ic('moon'), system: ic('half') }[localStorage.theme || 'system']}</button>
  ${S.user ? `<span class="mut hs">${esc(S.user.name)}</span><button class="btn2" onclick="logout()">${t('logout')}</button>` : `<button class="btn2" onclick="openAuth(false)">${t('login')}</button>`}</div>${S.user ? `<div class="tabbar">${tabs.map(x => `<a class="${x == S.tab ? 'on' : ''}" onclick="show('${x}')"><i>${ic({ groups: 'users', tests: 'doc', stats: 'chart' }[x])}</i>${t(x)}</a>`).join('')}</div>` : ''}`;
}

// ---------- Монстр ----------
function monsterSVG(n = 1, sign = false) { return `<img class="mimg" alt="" draggable="false" src="${sign ? 'monster-warn.png' : 'monster.png'}">`; }
Object.assign(I18N.ru,{"cq_how": "Как пользоваться", "cq_canh": "Можно", "cq_canth": "Нельзя", "cq_monh": "Когда появляется Монстр", "cq_rulesh": "Правила", "cq_help": "Инструкция", "cq_can": ["Писать и запускать код сколько угодно раз", "Пользоваться подсказками редактора и кнопкой «Шаблоны кода»", "Открывать вкладку «Подсказки», если учитель её заполнил", "Проверять решение кнопкой «Проверить» до сдачи", "Всё, что вы печатаете сами, разрешено"], "cq_cant": ["Выходить из полноэкранного режима (клавиша Esc)", "Переключать вкладки, сворачивать браузер, открывать другие окна", "Вставлять текст (Ctrl+V), копировать и перетаскивать текст в поле", "Открывать меню правой кнопкой мыши", "Просить кого-то писать за вас или искать решение в интернете"], "cq_monst": ["Монстр появляется сразу при нарушении, а учитель видит это в своей панели в реальном времени", "У вас 3 попытки: каждое нарушение забирает одну", "Нажмите «Понятно», чтобы вернуться к заданию: полный экран включится снова", "После третьего нарушения работа сдаётся автоматически с тем, что вы успели написать"], "cq_gs": ["Вступите в группу: введите её название и пароль, которые дал учитель", "Откройте задание на вкладке «Задания» и прочитайте правила", "Нажмите «Начать»: задание откроется на весь экран, пойдёт таймер", "В тестах выберите один ответ. В задачах с кодом читайте условие слева и пишите код справа", "«Запустить» показывает результат программы и ошибки с номером строки, «Проверить» запускает скрытые тесты", "Когда всё готово, нажмите «Сдать работу» и посмотрите результат"], "cq_gt": ["Создайте группу: придумайте название и пароль, передайте их студентам", "Откройте «Задания» → «Новое задание», выберите группу, таймер и варианты", "Добавьте тестовые вопросы (правильный ответ отмечается кружком) и задачи с кодом", "Для задачи с кодом напишите условие, пример, подсказку и скрытые тесты: по ним идёт оценка", "Во время работы открывайте «Онлайн-контроль»: там видны нарушения каждого студента", "Результаты и нарушения всех работ собраны во вкладке «История»"], "cq_bt": ["Выберите группу и таймер: на весь тест или на каждый вопрос", "Правильный ответ в тестовом вопросе отмечается кружком слева", "В задаче с кодом укажите пример и скрытые тесты: ввод и точный ожидаемый вывод", "Номер варианта (0, 1, 2…) нужен, если студенты выбирают вариант или получают индивидуальные"], "cq_got": "Понятно", "cq_stay": "Остаться", "cq_attempts": "Попытки", "mt_fullscreen": "Вы вышли из полноэкранного режима!", "mt_tab": "Вы покинули вкладку теста!", "mt_paste": "Вставка и копирование запрещены!", "mt_key": "Эта комбинация клавиш запрещена!", "monText": "Это нарушение правил. За это начисляется предупреждение. При повторных нарушениях ваша попытка может быть завершена.", "monFinal": "Предупреждения закончились. Работа сдана автоматически — учитель видит все нарушения.", "understood": "Понятно", "mon_over": "Попытки закончились!", "bth": "Как собрать тест"});
Object.assign(I18N.kk,{"cq_how": "Қалай қолдану", "cq_canh": "Рұқсат", "cq_canth": "Тыйым", "cq_monh": "Құбыжық қашан шығады", "cq_rulesh": "Ережелер", "cq_help": "Нұсқаулық", "cq_can": ["Кодты қалағаныңызша жазып, іске қосу", "Редактор кеңестері мен «Код үлгілері» түймесін қолдану", "Мұғалім толтырса, «Кеңестер» қойындысын ашу", "Тапсыру алдында «Тексеру» түймесімен шешімді тексеру", "Өзіңіз терген нәрсенің бәріне рұқсат"], "cq_cant": ["Толық экран режимінен шығу (Esc пернесі)", "Қойындыларды ауыстыру, браузерді жасыру, басқа терезелерді ашу", "Мәтін қою (Ctrl+V), көшіру немесе өріске сүйреп апару", "Тінтуірдің оң жақ түймесін қолдану", "Біреуге жаздыру немесе шешімді интернеттен іздеу"], "cq_monst": ["Құбыжық ереже бұзылған сәтте шығады, мұғалім мұны өз панелінде нақты уақытта көреді", "Сізде 3 әрекет бар: әр бұзу біреуін алады", "Тапсырмаға оралу үшін «Түсінікті» басыңыз: толық экран қайта қосылады", "Үшінші бұзудан кейін жұмыс жазып үлгергеніңізбен өздігінен тапсырылады"], "cq_gs": ["Топқа қосылыңыз: мұғалім берген атау мен құпиясөзді енгізіңіз", "«Тапсырмалар» қойындысында тапсырманы ашып, ережені оқыңыз", "«Бастау» басыңыз: тапсырма толық экранда ашылады, таймер жүреді", "Тестте бір жауап таңдаңыз. Кодпен есепте шартты солда оқып, кодты оңда жазыңыз", "«Іске қосу» бағдарлама нәтижесін және қатені жол нөмірімен көрсетеді, «Тексеру» жасырын тесттерді іске қосады", "Дайын болғанда «Жұмысты тапсыру» басып, нәтижені көріңіз"], "cq_gt": ["Топ жасаңыз: атау мен құпиясөз ойлап тауып, студенттерге беріңіз", "«Тапсырмалар» → «Жаңа тапсырма» ашып, топ, таймер және нұсқаларды таңдаңыз", "Тест сұрақтарын (дұрыс жауап шеңбермен белгіленеді) және кодпен есептерді қосыңыз", "Кодпен есепке шарт, мысал, кеңес және жасырын тесттер жазыңыз: баға солар бойынша қойылады", "Жұмыс кезінде «Онлайн бақылау» ашыңыз: әр студенттің бұзуы көрінеді", "Барлық жұмыстың нәтижесі мен бұзулары «Тарих» қойындысында жиналады"], "cq_bt": ["Топ пен таймерді таңдаңыз: бүкіл тестке немесе әр сұраққа", "Тест сұрағында дұрыс жауап сол жақтағы шеңбермен белгіленеді", "Кодпен есепте мысал мен жасырын тесттерді көрсетіңіз: енгізу және нақты күтілетін шығыс", "Нұсқа нөмірі (0, 1, 2…) студент нұсқаны таңдаса немесе жеке тапсырма алса керек"], "cq_got": "Түсінікті", "cq_stay": "Қалу", "cq_attempts": "Әрекет", "mt_fullscreen": "Сіз толық экран режимінен шықтыңыз!", "mt_tab": "Сіз тест қойындысынан шықтыңыз!", "mt_paste": "Қоюға және көшіруге тыйым салынған!", "mt_key": "Бұл перне тіркесіміне тыйым салынған!", "monText": "Бұл ережені бұзу. Ол үшін ескерту беріледі. Қайталанса, әрекетіңіз аяқталуы мүмкін.", "monFinal": "Ескертулер таусылды. Жұмыс автоматты түрде тапсырылды — мұғалім барлық бұзуларды көреді.", "understood": "Түсінікті", "mon_over": "Әрекеттер таусылды!", "bth": "Тестті қалай құру керек"});
Object.assign(I18N.en,{"cq_how": "How it works", "cq_canh": "Allowed", "cq_canth": "Not allowed", "cq_monh": "When the Monster appears", "cq_rulesh": "Rules", "cq_help": "Guide", "cq_can": ["Write and run code as many times as you like", "Use editor suggestions and the Code templates button", "Open the Hints tab if the teacher filled it in", "Check your solution with the Check button before submitting", "Anything you type yourself is allowed"], "cq_cant": ["Leave fullscreen mode (Esc key)", "Switch tabs, minimize the browser or open other windows", "Paste text (Ctrl+V), copy or drag text into a field", "Open the right-click menu", "Ask someone to write for you or look up the solution online"], "cq_monst": ["The Monster appears right away and the teacher sees it live in their panel", "You have 3 attempts: every violation takes one", "Press “Got it” to return to the task, fullscreen turns on again", "After the third violation your work is submitted automatically as it is"], "cq_gs": ["Join a group: enter the name and password from your teacher", "Open a task in the Tasks tab and read the rules", "Press Start: the task opens in fullscreen and the timer begins", "In quizzes pick one answer. In coding tasks read the statement on the left and write code on the right", "Run shows the program output and errors with the line number, Check runs the hidden tests", "When done, press Submit and see your result"], "cq_gt": ["Create a group: choose a name and password and give them to your students", "Open Tasks, then New task, choose the group, timer and variants", "Add quiz questions (the correct answer is marked with a circle) and coding tasks", "For a coding task write the statement, example, hint and hidden tests: they decide the grade", "During the work open Live control to see every student violations", "Results and violations of all works are collected in History"], "cq_bt": ["Choose a group and a timer: for the whole test or for each question", "The correct answer of a quiz question is marked with the circle on the left", "For a coding task give an example and hidden tests: input and exact expected output", "The variant number (0, 1, 2…) matters when students pick a variant or get individual ones"], "cq_got": "Got it", "cq_stay": "Stay", "cq_attempts": "Attempts", "mt_fullscreen": "You left fullscreen mode!", "mt_tab": "You left the test tab!", "mt_paste": "Pasting and copying are forbidden!", "mt_key": "This key combination is forbidden!", "monText": "This is a rule violation. You receive a warning for it. After repeated violations your attempt may be ended.", "monFinal": "No warnings left. Your work was submitted automatically — the teacher sees all violations.", "understood": "Got it", "mon_over": "No attempts left!", "bth": "How to build a test"});
const KW = {
  python: ['and', 'as', 'break', 'class', 'continue', 'def', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'if', 'import', 'in', 'input', 'int', 'is', 'lambda', 'len', 'list', 'map', 'max', 'min', 'None', 'not', 'or', 'print', 'range', 'return', 'sorted', 'split', 'str', 'strip', 'sum', 'True', 'try', 'while', 'with', 'append', 'enumerate', 'float', 'abs'],
  javascript: ['break', 'case', 'class', 'const', 'continue', 'console', 'else', 'false', 'filter', 'for', 'function', 'if', 'join', 'length', 'let', 'log', 'map', 'Math', 'null', 'parseInt', 'push', 'readFileSync', 'require', 'return', 'split', 'switch', 'toString', 'trim', 'true', 'var', 'while'],
  java: ['boolean', 'break', 'char', 'class', 'continue', 'double', 'else', 'false', 'final', 'float', 'for', 'if', 'import', 'int', 'Integer', 'length', 'long', 'main', 'Math', 'new', 'nextInt', 'nextLine', 'null', 'print', 'println', 'private', 'public', 'return', 'Scanner', 'static', 'String', 'System', 'true', 'void', 'while', 'ArrayList', 'HashMap', 'parseInt'],
  cpp: ['#include', 'abs', 'bool', 'break', 'char', 'cin', 'cout', 'const', 'continue', 'double', 'else', 'endl', 'false', 'float', 'for', 'if', 'int', 'iostream', 'long', 'main', 'max', 'min', 'namespace', 'push_back', 'return', 'size', 'sort', 'std', 'string', 'struct', 'true', 'using', 'vector', 'void', 'while']
};
const ACS = { list: [], i: 0, word: '', skip: false };
function acClose() { const a = $('ac'); if (a) a.style.display = 'none'; ACS.list = []; }
function acUpdate() {
  const ta = $('ta'); if (!ta || !TK || !TK.d) return; const q = TK.d.questions[TK.i]; if (!q || q.type != 'code') return;
  const sn = SN[q.lang] || [], names = [...new Set([...sn.map(s => s[0]), ...(KW[q.lang] || [])])];
  const p = ta.selectionStart, w = (ta.value.slice(0, p).match(/[#\w]*$/) || [''])[0];
  const r = w ? names.filter(n => n.toLowerCase().startsWith(w.toLowerCase()) && n !== w).sort((a, b) => a.length - b.length).slice(0, 6) : [];
  if (!r.length) return acClose();
  ACS.list = r.map(n => { const i = sn.findIndex(s => s[0] === n); return { n, i, hint: i >= 0 ? sn[i][1].split('\n')[0].replace('§', '…') : '' }; }); ACS.word = w; ACS.i = 0; acDraw();
}
function acDraw() {
  const ta = $('ta'); if (!ta) return; let a = $('ac');
  if (!a) { a = document.createElement('div'); a.id = 'ac'; a.className = 'ac'; ta.parentNode.appendChild(a); }
  const cs = getComputedStyle(ta), lh = parseFloat(cs.lineHeight) || 20, cv = document.createElement('canvas').getContext('2d'); cv.font = cs.font;
  const cw = cv.measureText('M').width, bf = ta.value.slice(0, ta.selectionStart).split('\n'), ln = bf.length - 1, col = bf[ln].length - ACS.word.length;
  a.style.top = (ta.offsetTop + parseFloat(cs.paddingTop) + (ln + 1) * lh - ta.scrollTop) + 'px';
  a.style.left = Math.max(0, ta.offsetLeft + parseFloat(cs.paddingLeft) + col * cw - ta.scrollLeft) + 'px';
  a.innerHTML = ACS.list.map((x, k) => `<div class="${k == ACS.i ? 'on' : ''}" onmousedown="event.preventDefault();acPick(${k})"><i>⊙</i><b>${esc(x.n)}</b><small>${esc(x.hint)}</small></div>`).join(''); a.style.display = 'block';
}
function acPick(k) {
  const x = ACS.list[k], ta = $('ta'); if (!x || !ta) return; ACS.skip = true;
  if (x.i >= 0) insSn(x.i); else { const p = ta.selectionStart; ta.setRangeText(x.n, p - ACS.word.length, p, 'end'); ta.focus(); edIn(); }
  acClose();
}
function cq(k) { return (I18N[S.lang] || {})['cq_' + k] || I18N.ru['cq_' + k] || []; }
const liL = (k, tag = 'ul') => `<${tag}>${[].concat(cq(k)).map(x => `<li>${esc(x)}</li>`).join('')}</${tag}>`;
const rulesBlock = () => `<h4>${t('cq_canh')}</h4>${liL('can')}<h4>${t('cq_canth')}</h4>${liL('cant')}<h4>${t('cq_monh')}</h4>${liL('monst')}`;
function rulesModal(go) {
  $('rul')?.remove(); const m = document.createElement('div'); m.id = 'rul'; m.className = 'rl-wrap'; window.__rulesGo = go;
  m.innerHTML = `<div class="rl-box"><div class="rl-top"><h2>${t('cq_rulesh')}</h2><a class="xx2" onclick="$('rul').remove()">✕</a></div><div class="rl-body">${rulesBlock()}<h4>${t('cq_how')}</h4>${liL('gs', 'ol')}</div><button class="btn big" onclick="$('rul').remove();window.__rulesGo()">${t('start')} →</button></div>`;
  document.body.appendChild(m);
}
function helpM() {
  $('rul')?.remove(); const T = S.user && S.user.role == 'teacher', m = document.createElement('div'); m.id = 'rul'; m.className = 'rl-wrap';
  m.innerHTML = `<div class="rl-box"><div class="rl-top"><h2>${t('cq_help')}</h2><a class="xx2" onclick="$('rul').remove()">✕</a></div><div class="rl-body"><h4>${t('cq_how')}</h4>${liL(T ? 'gt' : 'gs', 'ol')}${T ? `<h4>${t('bth')}</h4>${liL('bt', 'ol')}` : ''}${rulesBlock()}</div><button class="btn big" onclick="$('rul').remove()">${t('cq_got')}</button></div>`;
  document.body.appendChild(m);
}
function alarm() { try { const a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.type = 'sawtooth'; o.connect(g); g.connect(a.destination); g.gain.value = .07; const t0 = a.currentTime; o.frequency.setValueAtTime(480, t0); o.frequency.linearRampToValueAtTime(900, t0 + .25); o.frequency.linearRampToValueAtTime(480, t0 + .5); o.start(); o.stop(t0 + .5); } catch (e) { } navigator.vibrate?.([200, 100, 200]); }
const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return h > 10 && h < 20 ? c : m == 1 ? a : m > 1 && m < 5 ? b : c; };
const HEART = '<path d="M12 20.5s-8.5-5.2-8.5-11A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.7c0 5.8-8.5 11-8.5 11z"/>';
const heartsHTML = v => `${[0, 1, 2].map(i => `<svg class="hrt ${i >= 3 - v ? 'lost' : ''}" viewBox="0 0 24 24">${HEART}</svg>`).join('')}<span>${Math.max(0, 3 - v)}/3 ${t('tries')}</span>`;
const leftTxt = l => S.lang == 'kk' ? `Сенде ${l} әрекет қалды` : S.lang == 'en' ? `You have ${l} ${l == 1 ? 'attempt' : 'attempts'} left` : `У тебя осталось ${l} ${plural(l, 'попытка', 'попытки', 'попыток')}`;
function monster(n, type) {
  let m = $('mon'); if (!m) { m = document.createElement('div'); m.id = 'mon'; m.className = 'mon'; document.body.appendChild(m); }
  document.activeElement?.blur?.(); alarm();
  const fin = n >= 3, ti = (I18N[S.lang] || {})['mt_' + type] || I18N.ru['mt_' + type] || I18N.ru.mt_paste;
  m.innerHTML = `<div class="mon-box"><img class="mon-pic" src="monster-warn.png" alt="" draggable="false"><div class="mon-card"><a class="mon-x" onclick="monCancel(${fin})">\u2715</a><h2>${fin ? t('mon_over') : t('mon_h1')}<span>${ti}</span></h2><p>${t(fin ? 'monFinal' : 'monText')}</p><div class="mon-left"><svg class="ic" viewBox="0 0 24 24">${HEART}</svg>${leftTxt(Math.max(0, 3 - n))}</div><div class="mon-btns"><button class="btn" onclick="monSend()">${t('monSend')}</button>${fin ? '' : `<button class="btn2" onclick="monCancel(false)">${t('monCancel')}</button>`}</div></div></div>`;
  const h = $('tkv'); if (h) h.innerHTML = heartsHTML(n);
}
function monCancel(fin) { if (fin) return finish(true); $('mon')?.remove(); document.documentElement.requestFullscreen?.().catch(() => { }); }
function monSend() { $('mon')?.remove(); finish(!!TK && TK.v >= 3); }


// ---------- Главная страница ----------
function artHTML() {
  return `<div class="art"><div class="blob"></div>
  <div class="win"><div class="wbar"><i></i><i></i><i></i></div><div class="wbody"><div class="wl"><i class="tg"></i><i style="width:90%"></i><i style="width:75%"></i><i style="width:82%"></i><i style="width:50%"></i></div>
  <div class="wr"><span class="c"># ${t('artCode')}</span>\n<span class="k">for</span> i <span class="k">in</span> <span class="f">range</span>(<span class="n">5</span>):\n    <span class="k">if</span> i % <span class="n">2</span> == <span class="n">0</span>:\n        <span class="f">print</span>(i)</div></div></div>
  <div class="kq"><div class="q"></div><div class="g"><i class="k0">▲</i><i class="k1">◆</i><i class="k2">●</i><i class="k3">■</i></div></div>
  <div class="tmb">12:30</div><div class="okb">5/5</div><div class="mon-art">${monsterSVG(1)}</div></div>`;
}
function home() {
  S.page = 'home'; clearInterval(poll); drawNav();
  $('main').innerHTML = `<section class="hero2"><canvas id="sph"></canvas><div class="hc"><h1><span>${t('h1a')}</span><span>${t('h1b')}</span><em>${t('h1c')}</em></h1><p>${t('h1p')}</p><button class="btn lg" onclick="openAuth(true)">${t('start')} →</button></div><div class="hint"><i class="mouse"></i>${t('simple')}<span> · ${t('sphHint')}</span></div></section>
  <section id=feat class="feats">${[1, 2, 3].map(i => `<div class="fc"><div class="fi mono">${['&lt;/&gt;', '▲◆', '%'][i - 1]}</div><h3>${t('f' + i + 't')}</h3><p>${t('f' + i + 'd')}</p></div>`).join('')}</section>`;
  startSphere($('sph'));
}
function goFeat() { if (!$('feat')) home(); $('feat').scrollIntoView({ behavior: 'smooth' }); }
function openAuth(reg) { regMode = reg; authPage(); }
function authPage() {
  S.page = 'auth'; drawNav(); $('nav').innerHTML = ''; ROLE = 'student';
  const R = regMode;
  const fld = (id, i, ph, type = 'text') => `<div class="fw"><i>${ic(i)}</i><input id=${id} type=${type} class="inp" placeholder="${ph}" autocapitalize=off>${type == 'password' ? `<button type=button class="eye" onclick="const i=$('${id}');i.type=i.type=='password'?'text':'password'">${ic('eye')}</button>` : ''}</div>`;
  const brand = c => `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="${c}" d="M21.5 4.5L2.9 11.7c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.8c.3-1.3-.5-1.8-1.5-1.4z"/></svg>`;
  $('main').innerHTML = `<div class="authwrap"><div class="sp"><div class="spl art"><img src="auth-art.jpg" alt="" draggable="false"></div>
  <div class="spr"><a class="xx" onclick="home()">\u2715</a><div class="fm"><div class="alogo">${logoSVG()}<b>Test<i>Space</i></b></div><h2>${t(R ? 'regT' : 'authLoginSub0')}</h2><p class="sub">${t(R ? 'regS' : 'loginS')}</p>
  ${R ? `<div class="seg"><button type=button class="on" id=rs onclick="pickRole('student')">${t('iStudent')}</button><button type=button id=rt onclick="pickRole('teacher')">${t('iTeacher')}</button><button type=button id=rx onclick="pickRole('user')">${t('iUser')}</button></div>${fld('an', 'user', t('labName'))}` : ''}
  ${fld('au', R ? 'mail' : 'user', R ? 'Email' : t('labLogin'))}${fld('ap', 'lock', t('password'), 'password')}
  ${R ? '' : `<div class="rm"><label><input type=checkbox checked> ${t('remember')}</label><a onclick="toast(t('soon'))">${t('forgot')}</a></div>`}
  <button class="btn big" onclick="doAuth()">${t(R ? 'register' : 'login')}</button>
  ${R ? '' : `<p class="ctr or">${t('orVia')}</p><div class="soc"><button onclick="toast(t('soon'))"><span class="gg">G</span></button><button onclick="toast(t('soon'))">${brand('#229ed9')}</button></div>`}
  <p class="ctr sw">${t(R ? 'have2' : 'no2')} <a onclick="regMode=!regMode;authPage()">${t(R ? 'login' : 'regLink')}</a></p>${DEMO_HINT}</div></div></div></div>`;
}
let ROLE = 'student';
function pickRole(r) { ROLE = r; $('rs').classList.toggle('on', r == 'student'); $('rt').classList.toggle('on', r == 'teacher'); $('rx').classList.toggle('on', r == 'user'); }
async function doAuth() {
  try {
    const b = { username: $('au').value.trim(), password: $('ap').value };
    if (regMode) { b.name = $('an').value.trim(); b.role = ROLE;  }
    const r = await api(regMode ? '/register' : '/login', 'POST', b);
    S.user = r.user; show('home');
  } catch (e) { toast(t(e.message == 'exists' ? 'errExists' : e.message == 'invalid' ? 'errInvalid' : 'error') + (['exists', 'invalid'].includes(e.message) ? '' : ': ' + e.message)); }
}
async function logout() {
  try { await api('/logout', 'POST'); }
  catch (e) { console.error('Ошибка завершения сессии:', e); }
  finally { S.user = null; home(); }
}
function show(tab) {
  clearInterval(poll); S.tab = tab; S.page = 'app'; drawNav();
  $('main').innerHTML = `<section class="content"><div id=v></div></section>`;
  ({ groups: S.user.role === 'teacher' ? tGroups : sGroups, tests: S.user.role === 'student' ? sTests : tTests, stats: tStats, home: pHome, profile: pProfile, catalog: pCatalog })[tab]().catch(fail);
}
const first = () => esc(S.user.name.split(' ')[0]);
const PG = (h, p, btn = '') => `<div class="pg"><div><h1>${h}</h1><p>${p}</p></div>${btn}</div>`;
const EMPTY = (big, h, p, btn = '') => `<div class="empty"><div class="big mono">${big}</div><h3>${h}</h3><p>${p}</p>${btn}</div>`;

// ---------- Учитель: группы ----------
async function tGroups() {
  const gs = await api('/groups');
  $('v').innerHTML = PG(t('hello').replace('{n}', first()), t('tGroupsSub')) +
    `<div class="panel"><div class="ph">${t('newGroup')}</div><div class="pb"><div style="display:flex;gap:10px;flex-wrap:wrap"><input id=gn class="inp" style="flex:1;min-width:160px" placeholder="${t('groupName')}"><input id=gp class="inp" style="flex:1;min-width:160px" placeholder="${t('groupPass')}"><button class="btn" onclick="mkGroup()">${t('create')}</button></div><p class="mut" style="margin-top:8px;font-size:13px">${t('groupHint')}</p></div></div>` +
    (gs.length ? `<div class="grid2">${gs.map(g => `<div class="panel"><div class="ph">${esc(g.name)} · ${g.students.length}</div>${g.students.map(s => `<div class="row"><span class="av">${ini(s.name)}</span><span class="grow">${esc(s.name)}</span><button class="dng" onclick="kick('${g.id}','${s.id}')">${t('kick')}</button></div>`).join('') || `<div class="pb mut">${t('noStudents')}</div>`}</div>`).join('')}</div>` : EMPTY('[#]', t('noGroups'), t('noGroupsText')));
}
async function mkGroup() { try { await api('/groups', 'POST', { name: $('gn').value.trim(), password: $('gp').value }); show('groups'); } catch (e) { toast(t('errGroup')); } }
async function kick(g, s) { if (confirm(t('confirmKick'))) { await api(`/groups/${g}/students/${s}`, 'DELETE'); show('groups'); } }

// ---------- Учитель: тесты ----------
const gLabel = x => x.access == 'public' ? ic('globe') + ' ' + t('acc_public') : x.access == 'private' ? ic('lock') + ' ' + t('acc_private') : esc(x.groupName || '');
const fmtDl = ms => new Date(ms).toLocaleString(S.lang == 'en' ? 'en-GB' : 'ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const fmtT = s => (s >= 3600 ? Math.floor(s / 3600) + ':' + String(Math.floor(s % 3600 / 60)).padStart(2, '0') : Math.floor(s / 60)) + ':' + String(s % 60).padStart(2, '0');
function testCard(x) {
  const a = x.attempt, late = x.deadline && x.deadline < Date.now() && !(a && a.finished);
  return `<div class="tcard"><h3>${esc(x.title)}</h3><div class="meta"><span class="chip">${gLabel(x)}</span>${x.creator ? `<span class="chip">${ic('user')} ${esc(x.creator)}</span>` : ''}<span class="chip">${x.count} ${t('qCount')}</span><span class="chip">${t({ none: 'tNone', total: 'tTotal', per: 'tPer' }[x.timerMode])}${x.timerMode == 'total' ? ' · ' + x.minutes + ' ' + t('minShort') : ''}</span>${x.deadline ? `<span class="chip ${late ? 'b-warn' : ''}">${ic('clock')} ${t('dlUntil')} ${fmtDl(x.deadline)}</span>` : ''}</div>
  <div class="act">${a && a.finished ? `<span class="chip b-ok mono" style="font-size:14px">${t('result')}: ${a.percent}%${a.pending ? ' ' + ic('clock') : ''}</span>${a.pending ? `<span class="mut" style="font-size:12px">${t('pending')}</span>` : ''}` : late ? `<span class="chip b-warn">${t('dlPassed')}</span>` : `${x.mode === 'choice' && !a ? `<select id=pv${x.id} class="inp">${Array.from({ length: x.variantCount }, (_, i) => `<option value=${i}>${t('chooseVariant')} ${i + 1}</option>`).join('')}</select>` : ''}<button class="btn" onclick="startTest('${x.id}')">${ic('play')} ${t(a ? 'continue' : 'start')}</button>`}</div></div>`;
}
async function sTests() {
  const ts = await api('/tests');
  const available = ts.filter(x => !(x.attempt && x.attempt.finished));
  const completed = ts.filter(x => x.attempt && x.attempt.finished);
  $('v').innerHTML = PG(t('hello').replace('{n}', first()), t('sTestsSub'), `<button class="btn2" onclick="show('catalog')">${ic('globe')} ${t('s_catalog')}</button>`)
    + `<h3 class="h3">${t('ts_available')}</h3>`
    + (available.length ? `<div class="grid2">${available.map(testCard).join('')}</div>` : EMPTY('{ }', t('ts_no_available'), t('ts_no_available_desc')))
    + (completed.length ? `<h3 class="h3" style="margin-top:26px">${t('ts_completed')}</h3><div class="grid2">${completed.map(testCard).join('')}</div>` : '');
}
async function tTests() {
  const [ts, tk] = await Promise.all([api('/tests'), api('/available')]), mk = `<button class="btn" onclick="newTest()">+ ${t('newTest')}</button>`;
  $('v').innerHTML = PG(t('tTestsTitle'), t('tTestsSub'), mk) +
    (ts.length ? `<div class="grid2">${ts.map(x => `<div class="tcard"><h3>${esc(x.title)}</h3><div class="meta"><span class="chip">${gLabel(x)}</span><span class="chip">${x.count} ${t('qCount')}</span>${x.deadline ? `<span class="chip">${ic('clock')} ${t('dlUntil')} ${fmtDl(x.deadline)}</span>` : ''}${x.access == 'private' ? `<span class="chip mono b-warn" title="${t('accCode')}">${ic('key')} ${x.code} <a style="cursor:pointer" onclick="navigator.clipboard?.writeText('${x.code}');toast(t('copied'))">⧉</a></span>` : ''}</div><div class="act"><button class="btn" onclick="monitor('${x.id}')">${t('monitor')}</button><button class="btn2 coral" onclick="delTest('${x.id}')">${t('delTest')}</button></div></div>`).join('')}</div>` : EMPTY('{ }', t('noTests'), t('noTestsText'), mk)) +
    (tk.length ? `<h3 class="h3">${t('taken')}</h3><div class="grid2">${tk.map(testCard).join('')}</div>` : '');
}
async function delTest(id) { if (!confirm(t('delAsk'))) return; try { await api('/tests/' + id, 'DELETE'); tTests(); } catch (e) { fail(e); } }
async function pCatalog() {
  window.CATL = await api('/catalog');
  $('v').innerHTML = PG(t('catTitle'), t('catSub')) + `<div class="panel"><div class="pb" style="display:flex;gap:10px;flex-wrap:wrap"><input id=cdin class="inp" style="flex:1;min-width:200px;text-transform:uppercase" placeholder="${t('codeIn')}" maxlength=12 onkeydown="if(event.key=='Enter')joinCode()"><button class="btn" onclick="joinCode()">${t('openCode')}</button></div></div><input id=csr class="inp" style="margin:14px 0;max-width:420px" placeholder="${t('search')}" oninput="catFilter()"><div class="grid2" id=cgrid></div>`;
  catFilter();
}
function catFilter() {
  const q = ($('csr')?.value || '').toLowerCase(), l = CATL.filter(x => !q || x.title.toLowerCase().includes(q) || (x.creator || '').toLowerCase().includes(q));
  $('cgrid').innerHTML = l.map(x => x.own ? `<div class="tcard"><h3>${esc(x.title)}</h3><div class="meta"><span class="chip">${ic('globe')} ${t('acc_public')}</span><span class="chip">${t('ownTest')}</span></div></div>` : testCard(x)).join('') || `<div class="mut">${t('noCat')}</div>`;
}
async function joinCode() {
  const c = $('cdin').value.trim(); if (!c) return;
  try { await api('/tests/join', 'POST', { code: c }); toast(t('joined')); show('tests'); } catch (e) { toast(t(e.message == 'nocode' ? 'noCode' : e.message == 'own' ? 'ownTest' : 'error')); }
}
async function pHomeU() {
  const [mine, tk] = await Promise.all([api('/tests'), api('/available')]);
  $('v').innerHTML = `<div class="pg"><div><h1>${t('hello').replace('{n}', first())}</h1><p>${t('uHomeSub')}</p></div><span class="ava">${ini(S.user.name)}</span></div>
  <div class="dcs"><div class="dc"><span class="dci">${ic('doc')}</span><div><small>${t('myTasks')}</small><b>${mine.length}</b></div></div><div class="dc"><span class="dci">${ic('play')}</span><div><small>${t('taken')}</small><b>${tk.length}</b></div></div><div class="dc"><span class="dci">${ic('globe')}</span><div><small>${t('s_catalog')}</small><small>${t('catSub')}</small></div></div></div>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn" onclick="newTest()">+ ${t('newTest')}</button><button class="btn2" onclick="show('catalog')">${ic('globe')} ${t('s_catalog')}</button></div>`;
}
async function newTest() {
  NQ = []; CT = []; QT = 'mc'; QIMG = ''; const gs = await api('/groups'); setTimeout(() => { if (!gs.length && $('tacc')) $('tacc').value = 'public'; accCh(); }, 0);
  $('v').innerHTML = PG(t('newTest'), t('newTestSub')) +
  `<div class="panel"><div class="ph">1 · ${t('ntBasics')}</div><div class="pb form"><input id=tt class="inp" placeholder="${t('testTitle')}">
  <div class="f2"><div class="form" id=tgw><label>${t('forGroup')}</label><select id=tg class="inp">${gs.map(g => `<option value=${g.id}>${esc(g.name)}</option>`).join('')}</select></div>
  <div class="form"><label>${t('mode')}</label><select id=tmode class="inp"><option value=same>${t('mSame')}</option><option value=choice>${t('mChoice')}</option><option value=individual>${t('mInd')}</option></select></div></div>
  <div class="f2"><div class="form"><label>${t('timer')}</label><select id=tm class="inp"><option value=none>${t('tNone')}</option><option value=total>${t('tTotal')}</option><option value=per>${t('tPer')}</option></select></div>
  <div class="form"><label>${t('minutes')}</label><input id=tmin type=number min=1 value=30 class="inp"></div></div>
  <div class="f2"><div class="form"><label>${t('accessL')}</label><select id=tacc class="inp" onchange="accCh()">${S.user.role == 'teacher' ? `<option value=group>${t('acc_group')}</option>` : ''}<option value=public>${t('acc_public')}</option><option value=private>${t('acc_private')}</option></select></div>
  <div class="form" id=tcw style="display:none"><label>${t('accCode')}</label><input id=tcode class="inp" maxlength=12 style="text-transform:uppercase" placeholder="${t('accCodeP')}"></div></div>
  <div class="form"><label>${t('deadlineL')}</label><input id=tdl type=datetime-local class="inp"></div></div></div>
  <div class="panel"><div class="ph">2 · ${t('addQ')}</div><div class="pb form"><div class="types"><div class="tp on" id=tpm onclick="setQT('mc')"><b>${t('typeQuiz')}</b><span>${t('typeQuizD')}</span></div><div class="tp" id=tpc onclick="setQT('code')"><b>${t('typeCode')}</b><span>${t('typeCodeD')}</span></div></div>
  <textarea id=qx class="inp" rows=3 placeholder="${t('qText')}"></textarea>
  <div class="imgrow"><label class="btn2 sm">${ic('camera')} ${t('photo')}<input type=file id=qimgf accept="image/*" hidden onchange="qImg(this)"></label><span id=qimgp></span></div>
  <div id=fmc class="form">${[0, 1, 2, 3].map(i => `<div class="kopt"><span class="kb k${i}">${SHAPES[i]}</span><input id=o${i} class="inp" placeholder="${t('optionN')} ${i + 1}"><label style="white-space:nowrap"><input type=radio name=cor value=${i} ${i ? '' : 'checked'}> ${t('correctMark')}</label></div>`).join('')}</div>
  <div id=fcode class="form" style="display:none"><div class="f2"><div class="form"><label>${t('lang')}</label><select id=ql class="inp">${Object.entries(LN).map(([k, v]) => `<option value=${k}>${v}</option>`).join('')}</select></div>
  <div class="form"><label>${t('codeMode')}</label><select id=qcm class="inp" onchange="cmChange(this.value)"><option value=scratch>${t('cmScratch')}</option><option value=starter>${t('cmStarter')}</option><option value=fix>${t('cmFix')}</option></select></div></div>
  <div id=fstart class="form" style="display:none"><label id=lst>${t('starterCode')}</label><textarea id=qst class="inp mono" rows=5></textarea><label>${t('hintText')}</label><textarea id=qh class="inp" rows=4 placeholder="${t('hintPh')}"></textarea></div>
  <label>${t('testsTitle')}</label><p class="mut" style="font-size:13px">${t('testsHint')}</p><div id=ctl></div>
  <div class="f2"><textarea id=ti class="inp mono" rows=2 placeholder="${t('tIn')}"></textarea><textarea id=to class="inp mono" rows=2 placeholder="${t('tOut')}"></textarea></div>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><label style="display:flex;gap:6px;align-items:center"><input id=th type=checkbox> ${t('tHidden')}</label><button class="btn2" onclick="addCT()">+ ${t('addTest')}</button></div></div>
  <div class="f2"><div class="form"><label>${t('variant')}</label><input id=qv type=number min=1 value=1 class="inp"></div><div class="form"><label>${t('secPerTask')}</label><input id=qs type=number min=10 value=60 class="inp"></div></div>
  <button class="btn" style="width:fit-content" onclick="addQ()">+ ${t('addQBtn')}</button></div></div>
  <div class="panel"><div class="ph">3 · ${t('addedQs')}</div><div id=nq></div></div><div class="savebar"><button class="btn" onclick="saveTest()">${t('saveTest')}</button></div>`;
  renderNQ();
}
function cmChange(v) { $('fstart').style.display = v == 'scratch' ? 'none' : 'grid'; $('lst').textContent = t(v == 'fix' ? 'fixCode' : 'starterCode'); }
function setQT(x) { QT = x; $('tpm').classList.toggle('on', x == 'mc'); $('tpc').classList.toggle('on', x == 'code'); $('fmc').style.display = x == 'mc' ? 'grid' : 'none'; $('fcode').style.display = x == 'code' ? 'grid' : 'none'; $('qs').value = x == 'code' ? 300 : 60; }
function addCT() { if (!$('to').value.trim() && !$('ti').value.trim()) return; CT.push({ input: $('ti').value, expected: $('to').value, hidden: $('th').checked }); $('ti').value = ''; $('to').value = ''; $('th').checked = false; renderCT(); }
function renderCT() { $('ctl').innerHTML = CT.map((x, i) => `<div class="row" style="padding:6px 0"><span class="chip ${x.hidden ? 'b-warn' : 'b-ok'}">${t(x.hidden ? 'hiddenTag' : 'openTag')}</span><span class="mono grow" style="font-size:12px;white-space:pre-wrap">${esc(x.input) || '∅'}  →  ${esc(x.expected)}</span><button class="dng" onclick="CT.splice(${i},1);renderCT()">✕</button></div>`).join(''); }
function addQ() {
  const q = { type: QT, text: $('qx').value.trim(), variant: +$('qv').value || 1, time: +$('qs').value || 60 }; if (QIMG) q.image = QIMG;
  if (!q.text) return toast(t('errNeedText'));
  if (QT == 'mc') {
    const o = [0, 1, 2, 3].map(i => $('o' + i).value.trim()); const cor = +document.querySelector('input[name=cor]:checked').value;
    if (!o[cor]) return toast(t('errCorrectEmpty'));
    q.options = []; o.forEach((x, i) => { if (x) { if (i == cor) q.correct = q.options.length; q.options.push(x); } });
    if (q.options.length < 2) return toast(t('errTwoOpts'));
    for (let i = 0; i < 4; i++) $('o' + i).value = '';
  } else {
    if ($('ti').value.trim() || $('to').value.trim()) addCT();
    q.lang = $('ql').value; q.cmode = $('qcm').value; q.starter = $('qst').value; q.hint = $('qh').value; q.tests = CT.slice();
    CT = []; renderCT(); $('qst').value = ''; $('qh').value = '';
  }
  NQ.push(q); $('qx').value = ''; QIMG = ''; $('qimgp').innerHTML = ''; $('qimgf').value = ''; renderNQ();
}
function renderNQ() {
  $('nq').innerHTML = NQ.map((q, i) => `<div class="row"><span class="chip mono">v${q.variant}</span><span class="chip ${q.type == 'code' ? 'b-warn' : 'b-ok'}">${q.type == 'code' ? (LN[q.lang] || LEGACY_LANG[q.lang] || q.lang) : t('typeQuizShort')}</span>${q.image ? '<span class="chip">' + ic('camera') + '</span>' : ''}<span class="grow">${esc(q.text.slice(0, 90))}</span><button class="dng" onclick="NQ.splice(${i},1);renderNQ()">✕</button></div>`).join('') || `<div class="pb mut">${t('noQs')}</div>`;
}
let QIMG = '';
function accCh() { const a = $('tacc')?.value; if (!a) return; $('tcw').style.display = a == 'private' ? 'grid' : 'none'; $('tgw').style.display = a == 'group' ? 'grid' : 'none'; }
function qImg(inp) {
  const f = inp.files[0]; if (!f) return; const r = new FileReader();
  r.onload = () => { const im = new Image(); im.onload = () => {
    const k = Math.min(1, 1000 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
    QIMG = c.toDataURL('image/jpeg', .8); $('qimgp').innerHTML = `<img class="qthumb" src="${QIMG}"> <a class="dng" onclick="QIMG='';$('qimgp').innerHTML='';$('qimgf').value=''">✕</a>`;
  }; im.src = r.result; }; r.readAsDataURL(f);
}
async function saveTest() {
  if (!NQ.length || !$('tt').value.trim()) return toast(t('errNeedQs'));
  const acc = $('tacc').value, dv = $('tdl').value, dl = dv ? new Date(dv).getTime() : null;
  if (acc == 'group' && !$('tg').value) return toast(t('needGroup'));
  if (dl && dl < Date.now()) return toast(t('dlPast'));
  try {
    const r = await api('/tests', 'POST', { access: acc, code: $('tcode').value, deadline: dl, groupId: $('tg').value, title: $('tt').value.trim(), timerMode: $('tm').value, minutes: $('tmin').value, mode: $('tmode').value, questions: NQ });
    toast(r.code ? t('createdCode') + ' ' + r.code : t('createdSaved')); show('tests');
  } catch (e) { toast(t(e.message == 'code' ? 'codeShort' : e.message == 'codeTaken' ? 'codeTaken' : 'error')); }
}

// ---------- Учитель: панель контроля ----------
async function monitor(id) {
  clearInterval(poll);
  $('v').innerHTML = `<button class="btn2" style="margin-bottom:14px" onclick="show('tests')">← ${t('back')}</button><div id=mh></div><div id=mb></div><div id=md></div>`;
  const load = async () => {
    try {
      const d = await api(`/tests/${id}/monitor`); $('mh').innerHTML = PG(esc(d.title), t('monSub'));
      const ev = d.rows.flatMap(r => r.violations.map(v => ({ ...v, name: r.name }))).sort((a, b) => b.at - a.at);
      const cnt = s => d.rows.filter(r => r.status == s).length;
      $('mb').innerHTML = `<div class="tiles"><div class="tile"><span class="ti c1">#</span><div><b>${d.rows.length}</b><span class="mut">${t('students')}</span></div></div><div class="tile"><span class="ti c2">${ic('play')}</span><div><b>${cnt('inProgress')}</b><span class="mut">${t('onlineNow')}</span></div></div><div class="tile"><span class="ti c3">${ic('check')}</span><div><b>${cnt('finished')}</b><span class="mut">${t('finished')}</span></div></div><div class="tile"><span class="ti c4">!</span><div><b>${ev.length}</b><span class="mut">${t('viols')}</span></div></div></div>
      <div class="panel"><div class="ph">${t('monitor')}</div><div class="tbw"><table class="tb"><tr><th>${t('student')}</th><th>${t('status')}</th><th>${t('variant')}</th><th>${t('violations')}</th><th>${t('result')}</th><th></th></tr>` +
        d.rows.map(r => { const n = r.violations.length; return `<tr><td><span class="av" style="display:inline-flex;margin-right:8px;vertical-align:middle">${ini(r.name)}</span>${esc(r.name)}</td><td><span class="chip ${r.status == 'inProgress' ? 'b-ok' : ''}">${t(r.status)}</span></td><td>${r.variant ?? '-'}</td>
        <td><span class="chip mono ${n >= 3 ? 'b-err' : n ? 'b-warn' : 'b-ok'}">${n}/3</span></td><td>${r.percent != null ? r.percent + '%' : '-'}${r.pending ? ' ' + ic('clock') : ''}</td><td>${r.status == 'finished' ? `<button class="btn2" onclick="viewAttempt('${r.attemptId}')">${t('view')}</button>` : ''}</td></tr>`; }).join('') + `</table></div></div>
      <div class="panel"><div class="ph">${t('logTitle')}</div><div class="log mono">${ev.map(e => `<div><span class="mut">[${new Date(e.at).toLocaleTimeString()}]</span> <span class="err">WARN</span> ${esc(e.name)} — ${t('v_' + e.type)}</div>`).join('') || `<span class="mut">${t('noEvents')}</span>`}</div></div>`;
    } catch (e) { clearInterval(poll); }
  };
  load(); poll = setInterval(load, 3000);
}
async function viewAttempt(aid) {
  const d = await api('/attempts/' + aid);
  const mark = r => r === 1 ? ('<span class=ok>' + ic('check') + '</span>') : r === 0 ? ('<span class=err>' + ic('x') + '</span>') : r === null ? ic('clock') : `<span class=b-warn>${Math.round(r * 100)}%</span>`;
  $('md').innerHTML = `<div class="panel"><div class="ph">${t('answer')}</div><div class="pb">` + d.questions.map((q, i) => `<div style="margin-bottom:14px"><b>${i + 1}. ${esc(q.text)}</b> ${mark(d.results[i])}
  <pre class="log mono" style="margin-top:6px;border-radius:10px">${esc(q.type == 'mc' ? (q.options[d.answers[i]] ?? '—') : (d.answers[i] || '—'))}</pre></div>`).join('') +
    (d.pending ? `<label class="mut">${t('bonus')} (0–${d.pending}): <input id=bn type=number min=0 max=${d.pending} value=${d.bonus} class="inp" style="width:80px"></label> <button class="btn" onclick="api('/attempts/${aid}/grade','POST',{bonus:$('bn').value}).then(()=>toast(t('saved')))">${t('save')}</button>` : '') + '</div></div>';
  $('md').scrollIntoView({ behavior: 'smooth' });
}

// ---------- Учитель: статистика ----------
async function tStats() {
  const d = await api('/stats');
  $('v').innerHTML = PG(t('stats'), t('statsSub')) + `<div class="tiles"><div class="tile"><span class="ti c1">#</span><div><b>${d.students}</b><span class="mut">${t('totalStudents')}</span></div></div><div class="tile"><span class="ti c2">${ic('check')}</span><div><b>${d.rows.length}</b><span class="mut">${t('attempts')}</span></div></div></div>` +
    `<div class="panel"><div class="ph">${t('avg')}</div><div class="pb">${d.tests.map(x => `<div style="margin-bottom:12px">${esc(x.title)} <span class="mut">(${x.count})</span> <b class="mono" style="float:right">${x.avg}%</b><div class="bar"><i style="width:${x.avg}%"></i></div></div>`).join('') || `<span class="mut">${t('noData')}</span>`}</div></div>` +
    `<div class="panel"><div class="ph">${t('history')}</div><div class="tbw"><table class="tb"><tr><th>${t('student')}</th><th>${t('tests')}</th><th>${t('result')}</th><th>${t('violations')}</th><th>${t('date')}</th></tr>` +
    d.rows.map(r => `<tr><td>${esc(r.student)}</td><td>${esc(r.test)}</td><td>${r.percent}%</td><td><span class="chip ${r.violations ? 'b-warn' : 'b-ok'}">${r.violations}</span></td><td class="mut">${new Date(r.at).toLocaleString()}</td></tr>`).join('') + '</table></div></div>';
}

// ---------- Студент ----------
async function sGroups() {
  const gs = await api('/groups');
  $('v').innerHTML = PG(t('myGroups'), t('joinHint')) + `<div class="panel"><div class="ph">${t('join')}</div><div class="pb" style="display:flex;gap:10px;flex-wrap:wrap"><input id=gn class="inp" style="flex:1;min-width:160px" placeholder="${t('groupName')}"><input id=gp type=password class="inp" style="flex:1;min-width:160px" placeholder="${t('groupPass')}"><button class="btn" onclick="joinGroup()">${t('join')}</button></div></div>` +
    (gs.length ? `<div class="panel">${gs.map(g => `<div class="row"><span class="av">#</span><b>${esc(g.name)}</b></div>`).join('')}</div>` : EMPTY('[#]', t('noMyGroups'), t('noMyGroupsText')));
}
async function joinGroup() { try { await api('/groups/join', 'POST', { name: $('gn').value.trim(), password: $('gp').value }); show('groups'); } catch (e) { toast(t('errJoin')); } }

// ---------- Защита от списывания ----------
const G = {
  fs: () => { if (!document.fullscreenElement) viol('fullscreen'); },
  vis: () => { if (document.hidden) viol('tab'); },
  blur: () => viol('tab'),
  paste: e => { e.preventDefault(); e.stopPropagation(); viol('paste'); },
  block: e => e.preventDefault(),
  key: e => { const k = e.key.toLowerCase(); if ((e.ctrlKey || e.metaKey) && ['v', 'c', 'x'].includes(k)) { e.preventDefault(); if (k == 'v') viol('paste'); } if (e.shiftKey && e.key == 'Insert') { e.preventDefault(); viol('paste'); } }
};
function guards(on) {
  const f = on ? 'addEventListener' : 'removeEventListener';
  document[f]('fullscreenchange', G.fs); document[f]('visibilitychange', G.vis); window[f]('blur', G.blur);
  document[f]('paste', G.paste, true); document[f]('drop', G.paste, true);
  ['copy', 'cut', 'contextmenu'].forEach(ev => document[f](ev, G.block, true)); document[f]('keydown', G.key, true);
}
function viol(type) {
  if (!TK || TK.done) return;
  const n = Date.now(); if (n - TK.last < 1500) return; TK.last = n;
  TK.v++; monster(TK.v, type);
  if (!TK.demo) api(`/tests/${TK.id}/violation`, 'POST', { type }).catch(() => { });
  if (TK.v >= 3) setTimeout(() => finish(true), 9000);
}

// ---------- Шаблоны кода (подсказки) ----------
const SN = {
  javascript: [['for', 'for (let i = 0; i < n; i++) {\n    §\n}'], ['while', 'while (§) {\n    \n}'], ['if', 'if (§) {\n    \n}'], ['print', 'console.log(§);'], ['func', 'function name(a, b) {\n    §\n}'], ['input', "const lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n');\n§"]],
  python: [['for', 'for i in range(§):\n    '], ['while', 'while §:\n    '], ['if', 'if §:\n    '], ['print', 'print(§)'], ['def', 'def name(a, b):\n    §'], ['input', 'n = int(input())\n§'], ['list', 'nums = list(map(int, input().split()))\n§']],
  java: [['main', 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        §\n    }\n}'], ['for', 'for (int i = 0; i < n; i++) {\n    §\n}'], ['while', 'while (§) {\n    \n}'], ['if', 'if (§) {\n    \n}'], ['sout', 'System.out.println(§);'], ['scanner', 'Scanner sc = new Scanner(System.in);\n§']],
  cpp: [['main', '#include <iostream>\nusing namespace std;\n\nint main() {\n    §\n    return 0;\n}'], ['for', 'for (int i = 0; i < n; i++) {\n    §\n}'], ['while', 'while (§) {\n    \n}'], ['if', 'if (§) {\n    \n}'], ['cout', 'cout << § << endl;'], ['cin', 'cin >> §;']]
};
const wordAt = ta => (/[A-Za-z_]+$/.exec(ta.value.slice(0, ta.selectionStart)) || [''])[0];
function insSn(i) {
  const ta = $('ta'), [k, c] = (SN[TK.d.questions[TK.i].lang] || [])[i], pos = ta.selectionStart, w = wordAt(ta), start = (w && k.startsWith(w)) ? pos - w.length : pos;
  const ind = /^\s*/.exec(ta.value.slice(0, start).split('\n').pop())[0], code = c.replace(/\n/g, '\n' + ind), caret = code.indexOf('§');
  ta.setRangeText(code.replace('§', ''), start, ta.selectionEnd, 'end'); ta.selectionStart = ta.selectionEnd = start + (caret < 0 ? code.length : caret); ACS.skip = true; ta.focus(); edIn();
}
function tabKey(e) {
  const ac = $('ac');
  if (ACS.list.length && ac && ac.style.display == 'block') {
    if (e.key == 'ArrowDown' || e.key == 'ArrowUp') { e.preventDefault(); ACS.i = (ACS.i + (e.key == 'ArrowDown' ? 1 : ACS.list.length - 1)) % ACS.list.length; return acDraw(); }
    if (e.key == 'Enter' || e.key == 'Tab') { e.preventDefault(); return acPick(ACS.i); }
    if (e.key == 'Escape') { e.preventDefault(); return acClose(); }
  }
  if (e.key != 'Tab') return; e.preventDefault();
  const ta = e.target, w = wordAt(ta), i = (SN[TK.d.questions[TK.i].lang] || []).findIndex(s => s[0] === w);
  if (i >= 0) insSn(i); else { ta.setRangeText('    ', ta.selectionStart, ta.selectionEnd, 'end'); edIn(); }
}

// ---------- Ошибки: в какой строке и что не так ----------
const FR = [
  [/';' expected|expected ';'|expected '\\;'/i, 'не хватает «;» в конце оператора'],
  [/class, interface, enum, or record expected/i, 'код находится вне класса: проверьте фигурные скобки'],
  [/reached end of file while parsing|Unexpected end of input|was never closed|unexpected EOF|expected '\}'/i, 'не закрыта скобка или блок'],
  [/unterminated string|missing terminating|unclosed string|Invalid or unexpected token/i, 'не закрыта кавычка в строке'],
  [/IndentationError|expected an indented block|unindent/i, 'неверные отступы: проверьте пробелы в начале строки'],
  [/cannot find symbol|was not declared|is not defined|undeclared identifier|NameError/i, 'используется имя, которое не объявлено: проверьте название переменной или метода'],
  [/missing return statement/i, 'в методе не хватает return'],
  [/incompatible types|cannot convert|TypeError/i, 'несовпадение типов данных'],
  [/ZeroDivisionError|division by zero|\/ by zero/i, 'деление на ноль'],
  [/IndexError|ArrayIndexOutOfBounds|out of range|out_of_range/i, 'выход за границы списка или массива'],
  [/ValueError|NumberFormatException|InputMismatch/i, 'не удалось преобразовать ввод в число'],
  [/SyntaxError|invalid syntax|expected ':'/i, 'синтаксическая ошибка: проверьте двоеточия, скобки и кавычки']
];
const friendly = txt => { if (S.lang != 'ru') return ''; for (const [re, m] of FR) if (re.test(txt)) return m; return ''; };
function errInfo(lang, text) {
  text = String(text || ''); let line = null, msg = '', m;
  if (lang == 'python') { const all = [...text.matchAll(/File "[^"]*", line (\d+)/g)]; if (all.length) line = +all[all.length - 1][1]; msg = text.trim().split('\n').filter(Boolean).pop() || ''; }
  else if (lang == 'javascript') { m = text.match(/main\.js:(\d+)/); if (m) line = +m[1]; msg = (text.split('\n').find(l => /Error/.test(l)) || text.split('\n')[0] || '').trim(); }
  else if (lang == 'java') { m = text.match(/Main\.java:(\d+):\s*(?:error:\s*)?(.*)/); if (m) { line = +m[1]; msg = m[2]; } else { m = text.match(/Main\.java:(\d+)\)/); if (m) line = +m[1]; msg = (text.split('\n').find(l => /Exception|Error/.test(l)) || '').trim(); } }
  else if (lang == 'cpp') { m = text.match(/main\.cpp:(\d+):(?:\d+:)?\s*(?:fatal )?error:\s*(.*)/); if (m) { line = +m[1]; msg = m[2]; } else msg = text.trim().split('\n')[0]; }
  return { line, msg: msg || text.trim().split('\n')[0] || '' };
}

// ---------- Экран теста ----------
function startTest(id) { rulesModal(() => startTest2(id)); }
async function startTest2(id) {
  try {
    const d = await api(`/tests/${id}/start`, 'POST', { variant: $('pv' + id)?.value });
    TK = { id, d, ans: Array.isArray(d.saved) ? d.saved.slice() : [], out: [], i: 0, last: 0, v: d.violations, done: false, end: d.left != null ? Date.now() + d.left * 1000 : null, dl: d.deadlineLeft != null ? Date.now() + d.deadlineLeft * 1000 : null, qEnd: Date.now() + (d.questions[0].time || 60) * 1000 };
    await document.documentElement.requestFullscreen().catch(() => { });
    guards(true); renderTest(); tick = setInterval(tickFn, 1000);
  } catch (e) { fail(e); }
}
// Preferences inside an active attempt must not reset the timer or saved answers.
function testPreference(kind, value) {
  if (!TK || TK.done) return;
  if (kind === 'theme') setTheme(value);
  if (kind === 'lang' && ['ru', 'kk', 'en'].includes(value)) { S.lang = value; localStorage.lang = value; }
  renderTest();
}
function navigateQ(delta) {
  if (!TK || TK.done) return;
  const per = TK.d.timerMode === 'per';
  // In per-question timer mode, going back would circumvent the question deadline.
  if (per && delta < 0) return;
  const next = TK.i + delta;
  if (next < 0 || next >= TK.d.questions.length) return;
  TK.i = next;
  if (per) TK.qEnd = Date.now() + (TK.d.questions[next].time || 60) * 1000;
  renderTest();
}
function renderTest() {
  let r = $('tk'); if (!r) { r = document.createElement('div'); r.id = 'tk'; document.body.appendChild(r); }
  const d = TK.d, qs = d.questions, per = d.timerMode == 'per', q = qs[TK.i], last = TK.i >= qs.length - 1, code = q.type == 'code';
  r.innerHTML = `<div class="tk-top"><span class="mono logo">&lt;/&gt; ${esc(d.title)}</span><span class="grow"></span><label class="ts-pref-label">${t('langL')} <select class="inp ts-pref" aria-label="${t('langL')}" onchange="testPreference('lang',this.value)">${['ru','kk','en'].map(l=>`<option value="${l}" ${S.lang===l?'selected':''}>${l.toUpperCase()}</option>`).join('')}</select></label><label class="ts-pref-label">${t('theme')} <select class="inp ts-pref" aria-label="${t('theme')}" onchange="testPreference('theme',this.value)">${['system','light','dark'].map(m=>`<option value="${m}" ${(localStorage.theme||'system')===m?'selected':''}>${t(m)}</option>`).join('')}</select></label><span id=tkv class="hearts">${heartsHTML(TK.v)}</span><span id=tmr class="mono timer"></span></div>
  <div class="tabs mono">${qs.map((x, i) => { const a = TK.ans[i]; const dn = a !== undefined && a !== '' && a !== x.starter; return `<div class="tab ${i == TK.i ? 'on' : ''}" ${per ? '' : `onclick="goQ(${i})"`}>${x.type == 'code' ? '{ }' : '?'} ${i + 1}${dn ? ' <span class="ok">●</span>' : ''}</div>`; }).join('')}</div>
  <div class="tk-body"><div class="panel pane"><div class="ph">${t('task')} ${TK.i + 1}/${qs.length}${code ? ' · ' + (LN[q.lang] || LEGACY_LANG[q.lang] || q.lang) : ''}</div><div class="pb"><div class="task">${esc(q.text)}</div>${q.image ? `<img class="qimg" src="${q.image}" onclick="window.open(this.src)">` : ''}
  ${code && q.cmode == 'fix' ? `<div class="fixb">${t('fixTask')}</div>` : ''}
  ${code && q.hint ? `<details class="hintbox" open><summary>${t('hintTitle')}</summary><div>${esc(q.hint)}</div></details>` : ''}
  ${code && q.examples && q.examples.length ? `<div class="exs"><b>${t('examples')}</b><table><tr><th>${t('tInShort')}</th><th>${t('tOutShort')}</th></tr>${q.examples.map(x => `<tr><td>${esc(x.input) || '∅'}</td><td>${esc(x.expected)}</td></tr>`).join('')}</table></div>` : ''}</div></div>
  <div class="panel pane">${code ? `<div class="snips"><span>${t('snippets')}:</span>${(SN[q.lang] || []).map((s, i) => `<button class="sn" onclick="insSn(${i})">${s[0]}</button>`).join('')}</div>
    <div class="edwrap"><pre id=gut class="gut mono"></pre><textarea id=ta class="ta mono" spellcheck=false wrap=off autocapitalize=off autocorrect=off placeholder="${t('scratchPh')}" oninput="edIn()" onscroll="$('gut').scrollTop=this.scrollTop" onkeydown="tabKey(event)" onblur="setTimeout(acClose,150)"></textarea></div>
    <div class="runbar"><button class="btn sm" onclick="runCode(false)">${ic('play')} ${t('run')}</button><textarea id=cin class="inp mono" placeholder="${t('stdinLabel')}"></textarea><button class="btn2 sm" onclick="runCode(true)">${ic('play')} ${t('runCustom')}</button></div><div id=out class="out"></div>`
    : `<div class="kg ${TK.ans[TK.i] !== undefined ? 'picked' : ''}">${q.options.map((o, k) => `<button class="kt k${k} ${TK.ans[TK.i] === k ? 'sel' : ''}" onclick="pick(${k})"><span class="s">${SHAPES[k]}</span>${esc(o)}</button>`).join('')}</div>`}</div></div>
  <div id=tks class="status mono ${TK.v ? 'hot' : ''}"><button ${TK.i===0||per?'disabled':''} onclick="navigateQ(-1)">← ${t('ts_previous')}</button><span class="grow"></span>${!last ? `<button onclick="navigateQ(1)">${t('next')} →</button><button onclick="finish(false)">${t('submit')}</button>` : `<button onclick="finish(false)">${t('submit')}</button>`}</div>`;
  if (code) { const ta = $('ta'); ta.value = TK.ans[TK.i] ?? (q.cmode && q.cmode != 'scratch' ? q.starter || '' : ''); edGut(); $('out').innerHTML = TK.out[TK.i] || `<span class="mut">${t('outHint')}</span>`; }
  tickFn();
}
const goQ = i => { if (!TK || TK.done || TK.d.timerMode === "per" || i < 0 || i >= TK.d.questions.length) return; TK.i = i; renderTest(); };
const pick = k => { TK.ans[TK.i] = k; saveSoon(); renderTest(); };
function nextQ() { navigateQ(1); }
function edGut() { const n = $('ta').value.split('\n').length; $('gut').innerHTML = Array.from({ length: n }, (_, i) => `<span class="${TK.errLine == i + 1 ? 'eln' : ''}">${i + 1}</span>`).join('\n'); }
function edIn() {
  const ta = $('ta'); TK.ans[TK.i] = ta.value; TK.errLine = null; edGut(); saveSoon(); if (TK.hasErr) { TK.hasErr = false; setOut(''); }
  const w = wordAt(ta), arr = SN[TK.d.questions[TK.i].lang] || []; document.querySelectorAll('.sn').forEach((b, i) => b.classList.toggle('hit', !!w && arr[i][0].startsWith(w)));
  if (ACS.skip) { ACS.skip = false; acClose(); } else acUpdate();
}
const setOut = h => { TK.out[TK.i] = h; $('out').innerHTML = h; };
async function runCode(custom) {
  const q = TK.d.questions[TK.i], code = $('ta').value; setOut(`<span class="mut">${t('running')}</span>`);
  try {
    const inp = $('cin').value;
    const r = await localExecute(q.lang, code, custom ? [{ input: inp, expected: null }] : (q.examples || []));
    showResult(q, r, custom);
  } catch (e) { setOut(`<span class="err">${esc(e.message)}</span>`); }
}
function errBlock(q, text, timedOut, kind) {
  const e = errInfo(q.lang, text); TK.errLine = e.line; TK.hasErr = true;
  if (timedOut) return `<div class="err"><b>${t('errTime')}</b></div>`;
  return `<div class="err"><b>${t(kind)}</b> ${e.line ? t('errLine').replace('{n}', e.line) + ': ' : ''}${esc(e.msg)}${friendly(String(text) + ' ' + e.msg) ? `<div class="fr">${friendly(String(text) + ' ' + e.msg)}</div>` : ''}</div><pre class="raw">${esc(String(text).trim().slice(0, 900))}</pre>`;
}
function showResult(q, r, custom) {
  let h = ''; TK.errLine = null; TK.hasErr = false;
  if (r.missing) h = `<div class="err">${t('errMissing').replace('{l}', LN[q.lang] || LEGACY_LANG[q.lang] || q.lang)}</div>`;
  else if (r.compile != null) h = errBlock(q, r.compile, r.timedOut, 'errCompile');
  else {
    const bad = r.results.find(x => x.err || x.timedOut); if (bad) h += errBlock(q, bad.err, bad.timedOut, 'errRuntime');
    if (custom) h += r.results.map(x => `<div><b>${t('output')}:</b><pre>${esc(x.out) || '∅'}</pre></div>`).join('');
    else {
      h += r.results.map((x, i) => `<div class="${x.ok ? 'ok' : 'err'}">${x.ok ? ic('check') : ic('x')} ${t('example')} ${i + 1}${x.ok || x.err ? '' : ` — ${t('expected')}: «${esc(x.expected)}», ${t('got')}: «${esc(String(x.out).trim())}»`}</div>`).join('');
      if (r.results.length && r.results.every(x => x.ok)) h += `<div class="okb2">${t('allOk')}</div>`;
    }
  }
  setOut(h); edGut();
}
function tickFn() {
  if (!TK || TK.done) return;
  const now = Date.now(); if (TK.dl && now >= TK.dl) return finish(false);
  const per = TK.d.timerMode == 'per', end = per ? TK.qEnd : TK.end, ends = [end, TK.dl].filter(Boolean); if (!ends.length) return;
  const s = Math.max(0, Math.round((Math.min(...ends) - now) / 1000));
  const el = $('tmr'); if (el) { el.textContent = `${fmtT(s)}`; el.classList.toggle('low', s <= 30); }
  if (end && now >= end) { if (per && TK.i < TK.d.questions.length - 1) nextQ(); else finish(false); }
}
function saveSoon() { if (!TK || TK.demo) return; clearTimeout(TK.sv); TK.sv = setTimeout(() => { if (TK && !TK.done) api(`/tests/${TK.id}/save`, 'POST', { answers: TK.ans }).catch(() => { }); }, 4000); }

// ---------- Демо-тест (без регистрации, работает прямо в браузере) ----------
const DEMO = {
  ru: ['Что выведет console.log(2 + 3)?', ['23', '5', 'Ошибка', 'undefined'], 'Программа получает два числа в одной строке. Выведите их сумму.', 'Сначала прочитайте строку и разделите её на числа. Потом сложите и выведите результат.\n\nПример другой задачи: на вход приходит одно число n, нужно вывести n * 2:\nconst n = Number(lines[0]);\nconsole.log(n * 2);'],
  kk: ['console.log(2 + 3) нені шығарады?', ['23', '5', 'Қате', 'undefined'], 'Бағдарлама бір жолда екі сан алады. Олардың қосындысын шығарыңыз.', 'Алдымен жолды оқып, сандарға бөліңіз. Содан кейін қосып, нәтижені шығарыңыз.\n\nБасқа есептің мысалы: бір n саны келеді, n * 2 шығару керек:\nconst n = Number(lines[0]);\nconsole.log(n * 2);'],
  en: ['What does console.log(2 + 3) print?', ['23', '5', 'Error', 'undefined'], 'The program gets two numbers on one line. Print their sum.', 'First read the line and split it into numbers. Then add them and print the result.\n\nExample of a different task: one number n comes in, print n * 2:\nconst n = Number(lines[0]);\nconsole.log(n * 2);']
};
const DEMO_STARTER = "const lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n');\n// ваш код / your code\n";
const DEMO_TESTS = [{ input: '2 3', expected: '5' }, { input: '10 20', expected: '30', hidden: true }, { input: '-5 5', expected: '0', hidden: true }];
async function startDemo() {
  const q = DEMO[S.lang];
  TK = { id: 'demo', demo: true, ans: [], out: [], i: 0, last: 0, v: 0, done: false, end: null, qEnd: 0, tests: DEMO_TESTS,
    d: { title: t('demoTest'), timerMode: 'none', questions: [{ type: 'mc', text: q[0], options: q[1] }, { type: 'code', lang: 'javascript', cmode: 'starter', text: q[2], hint: q[3], starter: DEMO_STARTER, examples: [DEMO_TESTS[0]] }] } };
  await document.documentElement.requestFullscreen().catch(() => { });
  guards(true); renderTest(); tick = setInterval(tickFn, 1000);
}
async function finish(forced) {
  if (!TK || TK.done) return; TK.done = true; clearInterval(tick); guards(false);
  const demo = TK.demo; let r = {};
  if (demo) {
    let ok = TK.ans[0] === 1 ? 1 : 0; const ex = await localExecute('javascript', TK.ans[1] || '', TK.tests);
    if (!ex.missing && ex.results.length) ok += ex.results.filter(x => x.ok).length / ex.results.length;
    r = { percent: Math.round(ok / 2 * 100) };
  } else { try { r = await api(`/tests/${TK.id}/submit`, 'POST', { answers: TK.ans, forced }); } catch (e) { TK.done = false; tick = setInterval(tickFn, 1000); toast(t('ts_submit_error')); return; } }
  if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
  $('tk')?.remove(); $('mon')?.remove(); TK = null;
  resultModal(r, forced, demo);
}
function resultModal(r, forced, demo) {
  const p = r.percent ?? 0, k = p >= 80 ? 'res_great' : p >= 50 ? 'res_good' : 'res_try';
  const m = document.createElement('div'); m.className = 'rmod';
  m.innerHTML = `<div class="rbox"><div class="ring" style="--p:${p}"><b>${p}%</b></div><h2>${t(k)}</h2><p class="mut">${t('res_score')}</p>${r.pending ? `<p class="rn">${t('res_pending')}</p>` : ''}${forced ? `<p class="rn">${t('res_forced')}</p>` : ''}<button class="btn" onclick="this.closest('.rmod').remove()">${t('res_close')}</button></div>`;
  demo ? home() : show('tests'); document.body.appendChild(m);
}


Object.assign(I18N.ru,{h1a:'Твой путь',h1b:'в мир программирования',h1c:'начинается здесь.',h1p:'Проходи тесты, выполняй задания и развивай свои навыки вместе с TestSpace.',sphHint:'Крути сферу мышью',welcome:'Добро пожаловать!',welcomeSub:'Войдите в свой аккаунт, чтобы продолжить.',authLoginSub0:'Вход в аккаунт',confirmPass:'Подтвердите пароль',remember:'Запомнить меня',forgot:'Забыли пароль?',orVia:'или войти через',soon:'Скоро будет доступно',passMismatch:'Пароли не совпадают'});
Object.assign(I18N.kk,{editProfile:'Профильді өңдеу',h1a:'Сенің жолың',h1b:'бағдарламалау әлеміне',h1c:'осы жерден басталады.',h1p:'Тесттер тапсыр, тапсырмаларды орында және TestSpace-пен дағдыларыңды дамыт.',sphHint:'Сфераны тінтуірмен айналдыр',welcome:'Қош келдіңіз!',welcomeSub:'Жалғастыру үшін аккаунтыңызға кіріңіз.',authLoginSub0:'Аккаунтқа кіру',confirmPass:'Құпиясөзді растаңыз',remember:'Мені еске сақта',forgot:'Құпиясөзді ұмыттыңыз ба?',orVia:'немесе былай кіріңіз',soon:'Жақында қолжетімді болады',passMismatch:'Құпиясөздер сәйкес емес'});
Object.assign(I18N.en,{editProfile:'Edit profile',h1a:'Your path',h1b:'into the world of programming',h1c:'starts here.',h1p:'Take tests, complete tasks and grow your skills with TestSpace.',sphHint:'Drag the sphere to rotate it',welcome:'Welcome!',welcomeSub:'Sign in to your account to continue.',authLoginSub0:'Sign in',confirmPass:'Confirm password',remember:'Remember me',forgot:'Forgot password?',orVia:'or sign in with',soon:'Coming soon',passMismatch:'Passwords do not match'});

function drawSide() {
  const U = S.user.role, it = U == 'user' ? [['home', 'home'], ['tests', 'doc'], ['catalog', 'globe'], ['profile', 'user']] : [['home', 'home'], ['tests', 'doc'], ['groups', 'users'], ['catalog', 'globe'], ['profile', 'user'], ...(U == 'teacher' ? [['stats', 'gear']] : [])];
  $('nav').innerHTML = `<aside class="side"><a class="brand" onclick="show('home')">${logoSVG()}<span><b>Test<i>Space</i></b></span></a><nav>${it.map(([k, i]) => `<a class="si ${k == S.tab ? 'on' : ''}" onclick="show('${k}')">${ic(i)}${t('s_' + k)}</a>`).join('')}</nav><a class="si hlp" onclick="helpM()">${ic('help')}${t('cq_help')}</a><a class="si logout" onclick="logout()">${ic('logout')}${t('logout')}</a></aside>`;
}
async function pHome() {
  if (S.user.role == 'user') return pHomeU();
  const [gs, ts] = await Promise.all([api('/groups'), api('/tests')]), T = S.user.role === 'teacher', av = ts.find(x => !(x.attempt && x.attempt.finished)) || ts[0];
  $('v').innerHTML = `<div class="pg"><div><h1>${t('hello').replace('{n}', first())}</h1><p>${t('homeSub')}</p></div><span class="ava">${ini(S.user.name)}</span></div>
  <div class="dcs"><div class="dc"><span class="dci">${ic('play')}</span><div><small>${t('curLesson')}</small><b>${av ? esc(av.title) : '—'}</b></div></div><div class="dc"><span class="dci">${ic('clock')}</span><div><small>${t('timeLeft')}</small><b class="mono">${av && av.timerMode == 'total' ? av.minutes + ':00' : '--:--'}</b></div></div><div class="dc"><span class="dci">1</span><div><small>${t('oneTry')}</small><small>${t('oneTryD')}</small></div></div></div>
  <h3 class="h3">${t('avail')}</h3>${av ? `<div class="dc wide"><span class="ico mono">&lt;/&gt;</span><div class="grow"><b>${esc(av.title)}</b><p class="mut">${esc(av.groupName)} · ${av.count} ${t('qCount')}</p></div><button class="btn" onclick="${T ? "show('tests')" : `startTest('${av.id}')`}">${t(T ? 'monitor' : 'start')} →</button></div>` : `<div class="dc wide mut">${t('noSTests')}</div>`}
  <h3 class="h3">${t('myGroups')}</h3>${gs.map(g => `<div class="dc wide" style="cursor:pointer" onclick="show('groups')"><span class="av">#</span><div class="grow"><b>${esc(g.name)}</b>${T ? `<p class="mut">${t('students')}: ${g.students.length}</p>` : ''}</div>›</div>`).join('') || `<div class="dc wide mut">${t('noMyGroups')}</div>`}`;
}
async function pProfile() {
  $('v').innerHTML = `<div class="pg"><h1>${t('s_profile')}</h1></div><div class="panel"><div class="pb form"><div style="display:flex;gap:16px;align-items:center"><span class="ava big">${ini(S.user.name)}</span><div><h2>${esc(S.user.name)}</h2><span class="chip">${t(S.user.role)}</span></div></div>
  <label>${t('theme')}</label><select class="inp" onchange="setTheme(this.value);show('profile')">${['light', 'dark', 'system'].map(m => `<option value=${m} ${(localStorage.theme || 'system') == m ? 'selected' : ''}>${t(m)}</option>`).join('')}</select>
  <label>${t('langL')}</label><select class="inp" onchange="setLang(this.value)">${['ru', 'kk', 'en'].map(l => `<option value=${l} ${S.lang == l ? 'selected' : ''}>${{ ru: 'Русский', kk: 'Қазақша', en: 'English' }[l]}</option>`).join('')}</select>
  <button class="btn2" onclick="editProfile()">${t('editProfile')}</button><button class="btn2 coral" onclick="logout()">${t('logout')}</button></div></div>`;
}

async function editProfile() {
  const n = prompt(t('name'), S.user.name); if (!n || !n.trim()) return;
  try { S.user = await api('/me', 'PUT', { name: n.trim() }); } catch (e) { S.user.name = n.trim(); }
  drawNav(); show('profile');
}
Object.assign(I18N.ru, { s_home: 'Главная', s_tests: 'Задания', s_groups: 'Группы', s_messages: 'Сообщения', s_profile: 'Профиль', s_stats: 'Настройки', homeSub: 'Рады видеть тебя на платформе TestSpace!', curLesson: 'Текущий урок', timeLeft: 'Оставшееся время', oneTry: 'Одна попытка', oneTryD: 'Время вышло — задание будет автоматически завершено.', avail: 'Доступное задание', theme: 'Тема', langL: 'Язык', writeMsg: 'Написать сообщение...' });
Object.assign(I18N.ru,{editProfile:'Редактировать профиль',h1p:'Проходи тесты, выполняй задания<br>и развивай свои навыки вместе с TestSpace.',simple:'Просто. Удобно. Эффективно.',about:'О нас',loginS:'Рады видеть вас снова! Войдите, чтобы продолжить.',regT:'Регистрация',wl1:'Создайте аккаунт',wl2:'Присоединяйтесь к TestSpace и начните учиться.',labName:'Имя',labMail:'Email',labLogin:'Email или логин',phName:'Ваше имя',phPass:'Введите пароль',phPass2:'Придумайте пароль',phRep:'Повторите пароль',no2:'Нет аккаунта?',regLink:'Зарегистрируйтесь',have2:'Уже есть аккаунт?'});
Object.assign(I18N.ru,{"s_catalog": "Каталог", "roleUser": "Участник", "user": "Участник", "accessL": "Кто может пройти", "acc_group": "Только моя группа", "acc_public": "Публичное", "acc_private": "Приватное (по коду)", "accCode": "Код доступа", "accCodeP": "Пусто — создастся сам", "deadlineL": "Срок сдачи (необязательно)", "dlUntil": "до", "dlPassed": "Срок сдачи истёк", "dlPast": "Срок сдачи уже в прошлом", "photo": "Фото к вопросу", "catTitle": "Каталог заданий", "catSub": "Публичные задания от всех. Для приватного введите код.", "codeIn": "Код приватного задания", "openCode": "Открыть по коду", "search": "Поиск", "noCat": "Пока нет публичных заданий", "joined": "Задание добавлено в «Задания»", "noCode": "Код не найден", "ownTest": "Это ваше задание", "codeShort": "Код: минимум 4 символа (буквы и цифры)", "codeTaken": "Такой код уже занят", "delTest": "Удалить", "delAsk": "Удалить задание и все результаты?", "copied": "Скопировано", "myTasks": "Мои задания", "taken": "Задания для прохождения", "createdSaved": "Задание создано", "createdCode": "Задание создано. Код:", "errDeadline": "Срок сдачи уже прошёл", "uHomeSub": "Создавайте задания и проходите чужие."});
Object.assign(I18N.kk,{"s_catalog": "Каталог", "roleUser": "Қатысушы", "user": "Қатысушы", "accessL": "Кім тапсыра алады", "acc_group": "Тек менің тобым", "acc_public": "Ашық", "acc_private": "Жабық (код бойынша)", "accCode": "Қолжетімділік коды", "accCodeP": "Бос — өзі жасалады", "deadlineL": "Тапсыру мерзімі (міндетті емес)", "dlUntil": "дейін", "dlPassed": "Тапсыру мерзімі өтті", "dlPast": "Мерзім өтіп кеткен", "photo": "Сұраққа сурет", "catTitle": "Тапсырмалар каталогы", "catSub": "Барлығының ашық тапсырмалары. Жабық үшін кодты енгізіңіз.", "codeIn": "Жабық тапсырма коды", "openCode": "Код бойынша ашу", "search": "Іздеу", "noCat": "Ашық тапсырмалар әлі жоқ", "joined": "Тапсырма «Тапсырмалар» бөліміне қосылды", "noCode": "Код табылмады", "ownTest": "Бұл сіздің тапсырмаңыз", "codeShort": "Код: кемінде 4 таңба (әріп пен сан)", "codeTaken": "Бұл код бос емес", "delTest": "Жою", "delAsk": "Тапсырма мен барлық нәтижелерді жою керек пе?", "copied": "Көшірілді", "myTasks": "Менің тапсырмаларым", "taken": "Тапсыруға арналған тапсырмалар", "createdSaved": "Тапсырма жасалды", "createdCode": "Тапсырма жасалды. Коды:", "errDeadline": "Тапсыру мерзімі өтіп кетті", "uHomeSub": "Тапсырмалар жасаңыз және басқалардікін тапсырыңыз."});
Object.assign(I18N.en,{"s_catalog": "Catalog", "roleUser": "Member", "user": "Member", "accessL": "Who can take it", "acc_group": "My group only", "acc_public": "Public", "acc_private": "Private (by code)", "accCode": "Access code", "accCodeP": "Empty — generated automatically", "deadlineL": "Deadline (optional)", "dlUntil": "until", "dlPassed": "Deadline has passed", "dlPast": "Deadline is in the past", "photo": "Photo for the question", "catTitle": "Task catalog", "catSub": "Public tasks from everyone. Enter a code for a private one.", "codeIn": "Private task code", "openCode": "Open by code", "search": "Search", "noCat": "No public tasks yet", "joined": "Task added to “Tasks”", "noCode": "Code not found", "ownTest": "This is your task", "codeShort": "Code: at least 4 characters (letters and digits)", "codeTaken": "This code is already taken", "delTest": "Delete", "delAsk": "Delete the task and all results?", "copied": "Copied", "myTasks": "My tasks", "taken": "Tasks to take", "createdSaved": "Task created", "createdCode": "Task created. Code:", "errDeadline": "The deadline has passed", "uHomeSub": "Create tasks and take other people’s."});
Object.assign(I18N.ru,{"mt_fullscreen": "Ты вышел из полного экрана!", "mt_tab": "Ты покинул вкладку теста!", "mt_paste": "Ты пытаешься списать!", "mt_key": "Ты пытаешься списать!", "mon_h1": "Ещё одна попытка?", "mon_over": "Попытки закончились!", "monText": "Мы заметили подозрительную активность. Пожалуйста, решай задания самостоятельно. Списывание запрещено!", "monFinal": "Попытки закончились. Работа отправлена автоматически, учитель видит все нарушения.", "monSend": "Отправить", "monCancel": "Отмена", "tries": "попытки", "regS": "Создай аккаунт и начни решать задачи прямо сейчас!", "iStudent": "Я ученик", "iTeacher": "Я учитель", "iUser": "Я участник", "labName": "Имя"});
Object.assign(I18N.kk,{"mt_fullscreen": "Сен толық экраннан шықтың!", "mt_tab": "Сен тест қойындысынан шықтың!", "mt_paste": "Сен көшіруге тырысып жатырсың!", "mt_key": "Сен көшіруге тырысып жатырсың!", "mon_h1": "Тағы бір әрекет пе?", "mon_over": "Әрекеттер таусылды!", "monText": "Біз күдікті әрекетті байқадық. Тапсырмаларды өзің орында. Көшіруге тыйым салынған!", "monFinal": "Әрекеттер таусылды. Жұмыс автоматты түрде жіберілді, мұғалім барлық бұзуларды көреді.", "monSend": "Жіберу", "monCancel": "Бас тарту", "tries": "әрекет", "regS": "Аккаунт ашып, тапсырмаларды қазір шеше бастаңыз!", "iStudent": "Мен оқушымын", "iTeacher": "Мен мұғаліммін", "iUser": "Мен қатысушымын", "labName": "Аты-жөні"});
Object.assign(I18N.en,{"mt_fullscreen": "You left fullscreen!", "mt_tab": "You left the test tab!", "mt_paste": "You are trying to cheat!", "mt_key": "You are trying to cheat!", "mon_h1": "Another attempt?", "mon_over": "No attempts left!", "monText": "We noticed suspicious activity. Please solve the tasks on your own. Cheating is forbidden!", "monFinal": "No attempts left. Your work was submitted automatically and the teacher sees all violations.", "monSend": "Submit", "monCancel": "Cancel", "tries": "attempts", "regS": "Create an account and start solving tasks right now!", "iStudent": "I'm a student", "iTeacher": "I'm a teacher", "iUser": "I'm a participant", "labName": "Name"});
// ---------- Старт ----------
theme();
(async () => {
  await window.TSReady; // ждём, пока Firebase вспомнит, кто вошёл
  try { S.user = await api('/me'); show('home'); return; } catch (e) { }
  home();
})();

Object.assign(I18N.ru, {ts_available:'Доступные задания',ts_completed:'Выполненные задания',ts_no_available:'Нет доступных заданий',ts_no_available_desc:'Все назначенные задания уже выполнены.',ts_previous:'Назад',ts_submit_error:'Не удалось сохранить результат. Проверьте интернет и попробуйте снова.'});
Object.assign(I18N.kk, {ts_available:'Қолжетімді тапсырмалар',ts_completed:'Орындалған тапсырмалар',ts_no_available:'Қолжетімді тапсырмалар жоқ',ts_no_available_desc:'Барлық берілген тапсырмалар орындалған.',ts_previous:'Артқа',ts_submit_error:'Нәтиже сақталмады. Интернетті тексеріп, қайта көріңіз.'});
Object.assign(I18N.en, {ts_available:'Available tasks',ts_completed:'Completed tasks',ts_no_available:'No available tasks',ts_no_available_desc:'All assigned tasks are complete.',ts_previous:'Back',ts_submit_error:'Could not save the result. Check your connection and try again.'});
