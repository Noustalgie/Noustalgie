/* Composants réutilisables : livre 3D, livre ouvert à feuilleter, téléphone, saisie, tap, en-têtes. */
(function () {
'use strict';
const P = 'assets/pages/';
window.PAGE = id => P + id + '.jpg';

/* ── Livre fermé en 3D (couverture, dos, tranche, bloc de pages) ── */
window.makeBook = (parent, o = {}) => {
  const S = o.size || 600, T = o.thick || Math.round(S * 0.065);
  const wrap = el('div', 'book3d', parent);
  css(wrap, { width: S + 'px', height: S + 'px' });
  const inset = Math.max(2, Math.round(S * 0.014));
  const face = (cls, w, h, tr) => {
    const f = el('div', 'bface ' + cls, wrap);
    css(f, { width: w + 'px', height: h + 'px', left: (S - w) / 2 + 'px', top: (S - h) / 2 + 'px', transform: tr });
    return f;
  };
  face('pages shade', T - 2, S - 2 * inset, `rotateY(90deg) translateZ(${S / 2 - inset}px)`);
  const pt = face('pages', S - 2 * inset, T - 2, `rotateX(90deg) translateZ(${S / 2 - inset}px)`); pt.style.setProperty('--pg-dir', '0deg');
  const pb = face('pages shade', S - 2 * inset, T - 2, `rotateX(-90deg) translateZ(${S / 2 - inset}px)`); pb.style.setProperty('--pg-dir', '0deg');
  const spine = face('spine', T, S, `rotateY(-90deg) translateZ(${S / 2}px)`);
  spine.innerHTML = `<span>${o.spine || 'LÉA &amp; HUGO · 2026'}</span>`;
  spine.style.setProperty('--spine-fs', Math.max(8, Math.round(T * 0.32)) + 'px');
  const back = face('back', S, S, `rotateY(180deg) translateZ(${T / 2}px)`);
  back.innerHTML = `<div class="back-txt">${o.backText || 'À nous deux,<br>pour toutes les années à venir.'}</div><div class="back-logo">Nous<i>talgie</i></div>`;
  const front = face('front', S, S, `translateZ(${T / 2}px)`);
  img(o.cover || PAGE('cover'), '', front);
  el('div', 'hinge', front);
  const sheen = el('div', 'sheen', front);
  return { wrap, front, back, spine, sheen, S, T };
};

/* ── Livre ouvert : couverture + feuillets qui se tournent autour du dos ──
   spreads : [[gauche, droite], ...] ; le 1er feuillet est la couverture (recto = couverture, verso = gauche de la double 0). */
window.makeOpenBook = (parent, o) => {
  const Pw = o.page, sp = o.spreads, N = sp.length; // N doubles pages, N feuillets (couverture comprise)
  const dz = o.dz || 0.6;
  const root = el('div', 'obook', parent);
  css(root, { width: 2 * Pw + 'px', height: Pw + 'px' });
  // tranche visible sous les pages (épaisseur du bloc)
  const eh = Math.round(Pw * 0.022);
  const edgeL = el('div', 'edge', root); css(edgeL, { left: '4px', width: Pw - 4 + 'px', top: Pw + 'px', height: eh + 'px', transform: `translateZ(${-(N + 3) * dz}px)` });
  const edgeR = el('div', 'edge', root); css(edgeR, { left: Pw + 'px', width: Pw - 4 + 'px', top: Pw + 'px', height: eh + 'px', transform: `translateZ(${-(N + 3) * dz}px)` });
  const baseL = el('div', 'half l', root); css(baseL, { left: 0, width: Pw + 'px', height: Pw + 'px', transform: `translateZ(${-(N + 2) * dz}px)` });
  img(PAGE(o.baseLeft || sp[0][0]), '', baseL);
  const baseR = el('div', 'half r', root); css(baseR, { left: Pw + 'px', width: Pw + 'px', height: Pw + 'px', transform: 'translateZ(0px)' });
  img(PAGE(sp[N - 1][1]), '', baseR);
  const leaves = [];
  for (let i = 0; i < N; i++) {
    const front = i === 0 ? (o.cover || 'cover') : sp[i - 1][1];
    const back = sp[i][0];
    const lf = el('div', 'leaf', root);
    css(lf, { left: Pw + 'px', width: Pw + 'px', height: Pw + 'px' });
    const f = el('div', 'lf', lf); img(PAGE(front), '', f); const fs = el('div', 'shade', f);
    const b = el('div', 'lb', lf); img(PAGE(back), '', b); const bs = el('div', 'shade', b);
    const z0 = (N - i) * dz;
    gsap.set(lf, { z: z0, rotationY: 0, transformOrigin: '0% 50%' });
    leaves.push({ el: lf, fs, bs, z0 });
  }
  const gutter = el('div', 'gutter', root); css(gutter, { left: Pw - Pw * 0.08 + 'px', width: Pw * 0.16 + 'px', transform: `translateZ(${(N + 2) * dz}px)`, opacity: 0 });
  /* Tourne le feuillet i à l'instant t (local à tl) */
  const flip = (tl, i, t, dur = 0.45, ease = 'power2.inOut') => {
    const L = leaves[i];
    tl.to(L.el, { rotationY: -180, z: -L.z0, duration: dur, ease }, t);
    tl.to(L.fs, { opacity: 0.55, duration: dur / 2, ease: 'sine.in' }, t);
    tl.set(L.fs, { opacity: 0 }, t + dur / 2);
    tl.fromTo(L.bs, { opacity: 0.55 }, { opacity: 0, duration: dur / 2, ease: 'sine.out', immediateRender: false }, t + dur / 2);
  };
  return { root, leaves, flip, baseL, baseR, gutter, edgeL, edgeR, Pw, N };
};

/* ── Téléphone (écran 390 × 844 px CSS, agrandi par zoom) ── */
window.makePhone = (parent, o = {}) => {
  const pos = el('div', 'phone-pos', parent);
  const ph = el('div', 'phone', pos);
  ph.style.zoom = o.zoom || 1.8;
  const scr = el('div', 'screen', ph);
  el('div', 'island', scr);
  const sb = el('div', 'statusbar', scr, `<span>9:41</span><span class="icons"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg><svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0zM1 4.4a9.9 9.9 0 0 1 14 0l-1.4 1.4a7.9 7.9 0 0 0-11.2 0z" fill="currentColor"/></svg><span class="bat"><i></i></span></span>`);
  const app = el('div', 'app', scr);
  const tap = el('div', 'tap', scr), rip = el('div', 'ripple', scr);
  return { pos, ph, scr, app, sb, tap, rip, zoom: o.zoom || 1.8 };
};

/* Tap du doigt (coordonnées dans l'écran, px CSS) */
window.tapAt = (tl, P, x, y, t, absT) => {
  tl.set(P.tap, { left: x, top: y }, t - 0.25);
  tl.fromTo(P.tap, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out', immediateRender: false }, t - 0.25);
  tl.to(P.tap, { scale: 0.82, duration: 0.08, ease: 'power2.in' }, t - 0.05);
  tl.to(P.tap, { scale: 1, opacity: 0, duration: 0.3, ease: 'power2.out' }, t + 0.05);
  tl.set(P.rip, { left: x, top: y }, t);
  tl.fromTo(P.rip, { opacity: 0.9, scale: 0.6 }, { opacity: 0, scale: 2.6, duration: 0.5, ease: 'power2.out', immediateRender: false }, t);
  if (absT != null) sfx('tap', absT);
};

/* Saisie lettre par lettre dans un conteneur (avec curseur) */
window.typeText = (tl, node, text, t, cps = 14, caret = true) => {
  node.innerHTML = '';
  const spans = [...text].map(c => { const s = el('span', '', node); s.textContent = c; s.style.display = 'none'; return s; });
  let k = null;
  if (caret) { k = el('span', 'caret', node); gsap.set(k, { opacity: 0 }); tl.set(k, { opacity: 1 }, t - 0.05); }
  spans.forEach((s, i) => tl.set(s, { display: 'inline' }, t + i / cps));
  const end = t + spans.length / cps;
  if (caret) tl.set(k, { opacity: 0 }, end + 0.25);
  return end;
};

/* Anneau d'onde de choc */
window.shockwave = (tl, parent, x, y, t, o = {}) => {
  const r = el('div', 'ring', parent);
  const s = o.size || 200;
  css(r, { left: x - s / 2 + 'px', top: y - s / 2 + 'px', width: s + 'px', height: s + 'px', borderWidth: (o.width || 6) + 'px', borderColor: o.color || '#f5d898' });
  tl.fromTo(r, { opacity: 0.95, scale: 0.2 }, { opacity: 0, scale: o.scale || 7, duration: o.dur || 0.8, ease: 'expo.out', immediateRender: false }, t);
  return r;
};

/* En-tête d'étape : pastille, grand titre, sous-titre */
window.stepHead = (parent, n, titleHTML, sub) => {
  const h = el('div', 'step-head', parent);
  const pill = el('div', 'step-pill', h, `<b>${n}</b>Étape ${n}/3`);
  const title = el('h2', 'step-title shadow-txt', h, titleHTML);
  const subEl = sub ? el('p', 'step-sub', h, sub) : null;
  return { h, pill, title, sub: subEl };
};
/* Animation standard d'entrée de l'en-tête */
window.stepHeadIn = (tl, H, t) => {
  tl.fromTo(H.pill, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' }, t);
  const words = splitWords(H.title);
  tl.fromTo(words, { opacity: 0, y: 90, rotationX: -70, transformOrigin: '50% 100%' }, { opacity: 1, y: 0, rotationX: 0, duration: 0.7, stagger: 0.07, ease: 'expo.out' }, t + 0.06);
  if (H.sub) tl.fromTo(H.sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, t + 0.3);
};
})();
