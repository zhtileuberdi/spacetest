// Подключает Firebase (вход + база данных) и превращает его в window.TSApi — замену старого сервера.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser }
  from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { initializeFirestore, doc, collection, query, where, getDoc, getDocs, setDoc, updateDoc, deleteDoc, writeBatch, arrayUnion, serverTimestamp, onSnapshot }
  from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { createApi } from './ts-api.js';

const ready = () => window.__tsReady && window.__tsReady();
function banner(msg) {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:99999;background:#ff1f3d;color:#fff;padding:10px 16px;font:600 14px system-ui;text-align:center';
  d.textContent = msg; document.body.appendChild(d);
}
try {
  const cfg = window.FIREBASE_CONFIG || {};
  if (!cfg.apiKey || String(cfg.apiKey).startsWith('PASTE') || String(cfg.appId).startsWith('PASTE')) {
    banner('Firebase не настроен: вставьте ключи в public/firebase-config.js (инструкция: docs/FIREBASE.md)');
    throw new Error('firebase-config');
  }
  const app = initializeApp(cfg), a = getAuth(app), db = initializeFirestore(app, { ignoreUndefinedProperties: true });
  const F = { db, doc, collection, query, where, getDoc, getDocs, setDoc, updateDoc, deleteDoc, writeBatch, arrayUnion, serverTimestamp, onSnapshot };
  const auth = {
    uid: () => a.currentUser ? a.currentUser.uid : null,
    register: (e, p) => createUserWithEmailAndPassword(a, e, p),
    login: (e, p) => signInWithEmailAndPassword(a, e, p),
    logout: () => signOut(a),
    removeCurrent: () => deleteUser(a.currentUser)
  };
  window.TSApi = createApi({ F, auth, localExecute: (...x) => window.localExecute(...x) });
  // ждём, пока Firebase вспомнит, кто вошёл (после обновления страницы), и только потом запускаем сайт
  const off = onAuthStateChanged(a, () => { off(); ready(); }, () => ready());
} catch (e) { if (e.message !== 'firebase-config') { console.error(e); banner('Не удалось подключить Firebase: ' + e.message); } ready(); }
