/* « Le plus beau oui » : film de 38 s, 1080 × 1920, 30 i/s.
   Une timeline GSAP en pause pilote le livre 3D (pages, caméra, lumière) et les légendes ;
   __seek(t) affiche l'instant t, le rendu image par image est donc déterministe. */
import { createBook3D, DEFAULTS, N } from './book3d.js';

const q = new URLSearchParams(location.search);
const RES = +(q.get('res') || 1);
const W = Math.round(1080 * RES), H = Math.round(1920 * RES);
const DURATION = 38;
const canvas = document.getElementById('gl'); canvas.width = W; canvas.height = H;
const ui = document.getElementById('ui');

const S = DEFAULTS();
window.CUES = [];
const cue = (name, t, o = {}) => window.CUES.push(Object.assign({ name, t: Math.round(t * 1000) / 1000 }, o));

/* ── interpolation monotone (pas de dépassement) entre les clés de caméra ── */
function pchip(pts) {
  const n = pts.length, h = [], d = [], m = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) { h[i] = pts[i + 1][0] - pts[i][0]; d[i] = (pts[i + 1][1] - pts[i][1]) / h[i]; }
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m[i] = 0;
    else { const w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
  }
  return t => {
    if (t <= pts[0][0]) return pts[0][1]; if (t >= pts[n - 1][0]) return pts[n - 1][1];
    let i = 0; while (t > pts[i + 1][0]) i++;
    const x = (t - pts[i][0]) / h[i], x2 = x * x, x3 = x2 * x;
    return (2 * x3 - 3 * x2 + 1) * pts[i][1] + (x3 - 2 * x2 + x) * h[i] * m[i] + (-2 * x3 + 3 * x2) * pts[i + 1][1] + (x3 - x2) * h[i] * m[i + 1];
  };
}
const rad = a => a * Math.PI / 180;
/* Caméra sphérique autour d'un point de la table : tx, tz = cible ; d = distance ; E = hauteur (°) ; A = côté (°) */
const sph = (tx, tz, d, E, A, ty = 0) => ({ tgtX: tx, tgtY: ty, tgtZ: tz, camX: tx + d * Math.sin(rad(A)) * Math.cos(rad(E)), camY: ty + d * Math.sin(rad(E)), camZ: tz + d * Math.cos(rad(A)) * Math.cos(rad(E)) });

/* ── plan de la caméra : une clé = un instant, un cadrage ── */
const KEYS = [
  // 0 s : alliances en très gros plan, puis recul jusqu'au livre fermé
  { t: 0.0, camX: -6.2, camY: 4.4, camZ: 29.2, tgtX: -13.8, tgtY: 0.7, tgtZ: 19.4, fov: 28, aperture: 0.0019, maxblur: 0.024, focusOff: 0, keyAz: -55, keyEl: 24, exposure: 0.8, bloom: 0.5 },
  { t: 1.6, camX: -7.6, camY: 5.9, camZ: 30.8, tgtX: -13.4, tgtY: 0.9, tgtZ: 19.6, fov: 28, aperture: 0.0019, maxblur: 0.024, focusOff: 0, keyAz: -52, keyEl: 26, exposure: 1.0, bloom: 0.5 },
  { t: 3.1, ...sph(8.5, -2, 88, 47, -16), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -42, keyEl: 42, exposure: 1.0, bloom: 0.34 },
  // ouverture de la couverture, dédicace
  { t: 4.6, ...sph(10.4, -4, 80, 56, 0), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -38, keyEl: 44, exposure: 1.0, bloom: 0.32 },
  { t: 7.4, ...sph(10.6, -4, 73, 57, 3), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -38, keyEl: 44, exposure: 1.0, bloom: 0.32 },
  // [3|4] alliances
  { t: 8.5, ...sph(10.4, -4, 78, 56, -3), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  { t: 10.4, ...sph(10.6, -4, 72, 57, -2), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  // [5|6] bouquet
  { t: 11.5, ...sph(10.5, -4, 77, 57, 2), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  { t: 13.4, ...sph(10.6, -4, 72, 58, 1), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  // cascade de pages : on recule pour voir passer les feuillets
  { t: 14.3, ...sph(0, -3, 94, 62, 0), fov: 30, aperture: 0.0006, maxblur: 0.011, focusOff: 0, exposure: 1.0 },
  // [11|12] mains, puis le portage
  { t: 15.3, ...sph(-10.4, -4, 71, 55, -4), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  { t: 17.8, ...sph(10.4, -4, 70, 55, 4), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  // [13|14] l'allée illuminée
  { t: 18.9, ...sph(-10.4, -4, 71, 55, -3), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  { t: 21.6, ...sph(10.4, -4, 70, 56, 3), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  // [15|16] slow, puis la phrase
  { t: 22.9, ...sph(-3, -4, 84, 60, 0), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0 },
  { t: 25.9, ...sph(0.5, -4, 100, 62, 0), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, exposure: 1.04, bloom: 0.4 },
  // cascade vers le panorama
  { t: 27.0, ...sph(0, -3, 96, 62, 0), fov: 30, aperture: 0.0006, maxblur: 0.011, focusOff: 0, exposure: 1.05 },
  // [21|22] panorama : travelling vers la droite, puis recul
  { t: 27.9, ...sph(-11, -4, 70, 51, -6), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -34, keyEl: 40, exposure: 1.08, bloom: 0.46 },
  { t: 29.9, ...sph(11, -4, 70, 50, 5), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -30, keyEl: 38 },
  { t: 31.3, ...sph(0, -4, 104, 52, 0), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -36, keyEl: 42, exposure: 1.0, bloom: 0.36 },
  // [23|vide] lettre : le livre se fond en flou derrière la carte finale
  { t: 34.0, ...sph(0, -4, 112, 52, 0), fov: 30, aperture: 0.0007, maxblur: 0.012, focusOff: 0, keyAz: -40, keyEl: 44, exposure: 0.78, bloom: 0.3 },
  { t: 36.0, ...sph(0, -4, 120, 52, 0), fov: 30, aperture: 0.0026, maxblur: 0.034, focusOff: -50, exposure: 0.5 },
  { t: 38.0, ...sph(0, -4, 124, 52, 0), fov: 30, aperture: 0.0026, maxblur: 0.034, focusOff: -50, exposure: 0.42 },
];
const PROPS = ['camX', 'camY', 'camZ', 'tgtX', 'tgtY', 'tgtZ', 'fov', 'aperture', 'maxblur', 'focusOff', 'keyAz', 'keyEl', 'exposure', 'bloom'];
const TRACKS = {};
for (const p of PROPS) {
  const pts = KEYS.filter(k => k[p] != null).map(k => [k.t, k[p]]);
  if (pts.length) TRACKS[p] = pchip(pts);
}
/* respiration de la caméra : bruit lent, déterministe */
const wob = (t, f, s) => Math.sin(t * f + s) * 0.6 + Math.sin(t * f * 2.31 + s * 3.7) * 0.4;

function applyTracks(t) {
  for (const p of PROPS) if (TRACKS[p] && p !== 'focusOff') S[p] = TRACKS[p](t);
  const amp = t < 3 ? 0.35 : 1;
  S.camX += wob(t, 0.9, 1) * 0.06 * amp; S.camY += wob(t, 0.7, 2) * 0.05 * amp; S.camZ += wob(t, 0.8, 3) * 0.06 * amp;
  S.tgtX += wob(t, 0.6, 4) * 0.05 * amp; S.tgtZ += wob(t, 0.55, 5) * 0.05 * amp;
  S.roll = wob(t, 0.5, 6) * 0.12;
  const dx = S.camX - S.tgtX, dy = S.camY - S.tgtY, dz = S.camZ - S.tgtZ;
  S.focus = Math.hypot(dx, dy, dz) + (TRACKS.focusOff ? TRACKS.focusOff(t) : 0);
  S.time = t;
}

/* ── pages : feuillets 0..10 (leaf i : pages 2i+2 | 2i+3) ── */
const master = gsap.timeline({ paused: true });
const flip = (i, t, d = 0.9, ease = 'sine.inOut') => { master.to(S.flip, { [i]: 1, duration: d, ease }, t); cue('flip', t, { dur: d, leaf: i }); };
master.fromTo(S, { fade: 0.6 }, { fade: 0, duration: 0.7, ease: 'power2.out', immediateRender: true }, 0);
master.to(S, { rings: 0, duration: 0.25, ease: 'power2.in' }, 2.5);
master.to(S, { cover: 1, duration: 1.5, ease: 'power2.inOut' }, 3.2); cue('open', 3.2, { dur: 1.5 });
flip(0, 7.3, 0.95);
flip(1, 10.4, 0.95);
flip(2, 13.4, 0.8, 'sine.inOut'); flip(3, 13.75, 0.8, 'sine.inOut'); flip(4, 14.1, 0.8, 'sine.inOut');
flip(5, 17.9, 0.95);
flip(6, 21.8, 0.95);
flip(7, 26.0, 0.8); flip(8, 26.35, 0.8); flip(9, 26.7, 0.8);
flip(10, 31.0, 1.0);
master.to(S, { fade: 1, duration: 0.75, ease: 'power2.in' }, 37.25);

/* ── légendes ── */
const wrapWords = (el, html) => {
  el.innerHTML = html.split(/(\s+)/).map(w => /^\s+$/.test(w) ? w : `<span class="w">${w}</span>`).join('');
  return [...el.querySelectorAll('.w')];
};
function caption(html, t0, t1, top, cls = '') {
  const el = document.createElement('div'); el.className = 'cap ' + cls; el.style.top = top + 'px'; ui.appendChild(el);
  const ws = wrapWords(el, html);
  gsap.set(ws, { opacity: 0 });
  master.fromTo(ws, { opacity: 0, y: 26, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.085, immediateRender: false }, t0);
  master.to(ws, { opacity: 0, y: -14, filter: 'blur(8px)', duration: 0.5, ease: 'power2.in', stagger: 0.02 }, t1);
  cue('word', t0, { n: ws.length });
  return el;
}
caption('Huit ans après un premier café raté…', 0.9, 3.0, 250);
caption('Pour toi, qui as dit <em>oui</em> un samedi de juin.', 4.5, 7.1, 250);
caption('Les alliances, gravées de nos initiales.', 8.5, 10.7, 250, 'sm');
caption('Le bouquet, cueilli le matin même.', 11.5, 13.6, 250, 'sm');
caption('Il avait promis de me porter jusqu’à la voiture.', 15.4, 18.0, 250);
caption('Tu étais là, au bout de l’allée, et soudain tout était simple.', 19.0, 21.9, 250, 'sm');
caption('Se marier, c’est continuer à se choisir, simplement devant tout le monde.', 23.0, 26.1, 250, 'sm');
caption('Et toute la vie devant <em>nous.</em>', 28.2, 31.2, 250);
caption('À toutes les pages qu’il nous reste à écrire.', 32.0, 33.8, 250, 'sm');

/* carte finale */
(() => {
  const end = document.createElement('div'); end.className = 'end'; end.style.top = '240px'; ui.appendChild(end);
  const l1 = document.createElement('div'); l1.className = 'l1'; end.appendChild(l1);
  const l2 = document.createElement('div'); l2.className = 'l2'; end.appendChild(l2);
  const mark = document.createElement('div'); mark.className = 'mark'; mark.textContent = 'Noustalgie'; end.appendChild(mark);
  const url = document.createElement('div'); url.className = 'url'; url.textContent = 'noustalgie.fr'; end.appendChild(url);
  const fine = document.createElement('div'); fine.className = 'fine'; fine.textContent = 'Album d’exemple : couple imaginaire, photos Unsplash, pages composées par Noustalgie.'; end.appendChild(fine);
  const w1 = wrapWords(l1, 'Léa et Hugo n’existent pas.'), w2 = wrapWords(l2, 'Votre histoire, si.');
  gsap.set([...w1, ...w2, mark, url, fine], { opacity: 0 });
  master.fromTo(w1, { opacity: 0, y: 24, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.09, immediateRender: false }, 34.6);
  master.fromTo(w2, { opacity: 0, y: 24, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.12, immediateRender: false }, 36.0);
  master.fromTo([mark, url], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15, immediateRender: false }, 36.4);
  master.fromTo(fine, { opacity: 0 }, { opacity: 1, duration: 0.8, immediateRender: false }, 36.6);
  master.to(end, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 37.4);
  cue('chord', 36.0); cue('end', 34.6);
})();
const flash = document.getElementById('flash');
const fl = (t, a, up = 0.05, dn = 0.45) => { master.fromTo(flash, { opacity: 0 }, { opacity: a, duration: up, ease: 'none', immediateRender: false }, t); master.to(flash, { opacity: 0, duration: dn, ease: 'power2.out' }, t + up); };
fl(2.9, 0.22); fl(27.8, 0.18); fl(36.0, 0.2);
cue('glint', 0.9); cue('glint', 1.7); cue('swell', 22.0, { dur: 4.2 }); cue('wide', 31.0);
master.set({}, {}, DURATION);

/* ── mise en route ── */
await document.fonts.ready;
await Promise.all([document.fonts.load('italic 400 70px "Playfair Display"'), document.fonts.load('500 30px "Hanken Grotesk"'), document.fonts.load('700 50px "Times New Roman"')]);
const B = await createBook3D(canvas, { width: W, height: H, samples: +(q.get('samples') || 4), shadowSize: +(q.get('shadow') || 2048) });
S.rings = 1; S.ringsX = -14; S.ringsZ = 20; S.ringsRot = 0.5;
window.__duration = DURATION;
const clampT = t => Math.min(Math.max(t, 1e-4), DURATION - 1e-4);
const acc = document.createElement('canvas'); acc.width = W; acc.height = H; acc.id = 'acc';
acc.style.cssText = 'position:absolute;left:0;top:0;width:1080px;height:1920px;display:none';
canvas.after(acc);
const actx = acc.getContext('2d');
const MB = q.has('nomb') ? 1 : +(q.get('mb') || 5), SHUTTER = 0.85 / 30;   // obturateur ~306° : images réparties sur 0,85/30 s
const flipWins = window.CUES.filter(c => c.name === 'flip' || c.name === 'open').map(c => [c.t - 0.05, c.t + c.dur + 0.05]);
window.__seek = t => {
  const moving = MB > 1 && flipWins.some(([a, b]) => t >= a && t <= b);
  if (!moving) {
    acc.style.display = 'none';
    master.seek(clampT(t), false); applyTracks(t); S.grainT = t; B.render(S);
    return true;
  }
  for (let j = 0; j < MB; j++) {
    const tj = t + (j / (MB - 1) - 0.5) * SHUTTER;
    master.seek(clampT(tj), false); applyTracks(t); S.grainT = t; B.render(S);   // seules les pages sont décalées dans le temps
    actx.globalAlpha = 1 / (j + 1); actx.drawImage(canvas, 0, 0);
  }
  acc.style.display = 'block';
  master.seek(clampT(t), false);                                  // légendes à l'instant exact
  return true;
};
window.__B = B; window.__S = S;
window.__ready = Promise.resolve(true);
window.__seek(0);
if (q.has('t')) window.__seek(+q.get('t'));
