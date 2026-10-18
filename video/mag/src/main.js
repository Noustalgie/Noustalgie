/* « Avant / après » : 22 s, 1080 × 1920, 30 i/s, 120 BPM (un temps = 0,5 s).
   0–4 s : la pellicule du téléphone (avant). 4 s : le magazine imprimé (après), une page par temps,
   pages tournées et gros plans en alternance. 18 s : carte finale.
   Une timeline GSAP en pause pilote tout ; __seek(t) affiche l'instant t (rendu image par image déterministe). */
import { createBook3D, DEFAULTS, N } from '../../oui/src/book3d.js';

const q = new URLSearchParams(location.search);
const RES = +(q.get('res') || 1);
const W = Math.round(1080 * RES), H = Math.round(1920 * RES);
const DURATION = 22, DROP = 4, END = 18;
const canvas = document.getElementById('gl'); canvas.width = W; canvas.height = H;
const ui = document.getElementById('ui'), before = document.getElementById('before');

const S = DEFAULTS();
Object.assign(S, { keyAz: -38, keyEl: 46, exposure: 1.12, bloom: 0.28, aperture: 0.0006, maxblur: 0.01, grain: 0.03, warm: 0.016, vignette: 0.26, dust: 0.22, bokeh: 0.55, fov: 32 });
window.CUES = [];
const cue = (name, t, o = {}) => window.CUES.push(Object.assign({ name, t: Math.round(t * 1000) / 1000 }, o));

/* ── caméra : une suite de plans ; dans un plan, la caméra glisse doucement d'un cadrage à l'autre ── */
const rad = a => a * Math.PI / 180;
const sph = (tx, tz, d, E, A, ty = 0) => ({ tgtX: tx, tgtY: ty, tgtZ: tz, camX: tx + d * Math.sin(rad(A)) * Math.cos(rad(E)), camY: ty + d * Math.sin(rad(E)), camZ: tz + d * Math.cos(rad(A)) * Math.cos(rad(E)), bookRot: 0 });
// livre fermé : le plat va du dos (x = 0) vers x = 21,2 ; son centre tourne avec le livre
const closed = (rot, d, E, A) => { const a = rad(rot); return Object.assign(sph(10.6 * Math.cos(a), -10.6 * Math.sin(a) - 5, d, E, A), { bookRot: rot }); };
const page = (x, d) => sph(x, -2.5, d, 66, 0);                         // gros plan sur une page (x = ±10,6)
const spread = t => sph(0, -6.5, 160 - (t - 7) * 0.8, 56 + (t - 7) * 0.1, 0);  // double page, lente avancée
const SPREAD = 'spread';
const SHOTS = [
  [DROP, 5.5, closed(-6, 74, 56, -12), closed(-6, 86, 60, -6)],         // le magazine posé sur la table
  [5.5, 6.4, closed(-6, 86, 60, -6), sph(10.6, -4.5, 84, 64, 0)],       // la couverture s'ouvre
  [6.4, 7.0, sph(10.6, -4.5, 84, 64, 0), sph(10.6, -4.5, 79, 65, 0)],   // édito
  [7.0, 8.0, SPREAD],                                                    // là où tout a commencé
  [8.0, 9.0, page(10.6, 80), page(10.6, 72)],                            // le plan dans un cœur
  [9.0, 10.0, SPREAD],                                                   // étapes
  [10.0, 10.5, page(-10.6, 78), page(-10.6, 73)],                        // la pellicule
  [10.5, 12.0, SPREAD],                                                  // année en photos, playlist
  [12.0, 12.5, page(-10.6, 78), page(-10.6, 73)],                        // la pochette
  [12.5, 15.5, SPREAD],                                                  // adresses, interview, chapitre, jeux
  [15.5, 16.0, page(-10.6, 78), page(-10.6, 73)],                        // le quiz
  [16.0, 17.5, SPREAD],                                                  // souvenir, lettre
  [17.5, END, SPREAD, page(10.6, 84)],                                   // on s'approche de la lettre
  [END, DURATION, closed(4, 98, 62, 6), closed(4, 106, 64, 3)],         // carte finale
];
const KEYS = ['camX', 'camY', 'camZ', 'tgtX', 'tgtY', 'tgtZ', 'bookRot'];
const sine = k => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(Math.max(k, 0), 1));
const wob = (t, f, s) => Math.sin(t * f + s) * 0.6 + Math.sin(t * f * 2.31 + s * 3.7) * 0.4;
function camera(t) {
  const sh = SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1];
  const at = v => (v === SPREAD ? spread(t) : v);
  const a = at(sh[2]), b = at(sh[3] || sh[2]), k = sine((t - sh[0]) / (sh[1] - sh[0]));
  for (const key of KEYS) S[key] = a[key] + (b[key] - a[key]) * k;
  S.camX += wob(t, 0.9, 1) * 0.05; S.camY += wob(t, 0.7, 2) * 0.04; S.camZ += wob(t, 0.8, 3) * 0.05;  // tenue à la main, très légère
  S.roll = wob(t, 0.5, 6) * 0.1;
  S.focus = Math.hypot(S.camX - S.tgtX, S.camY - S.tgtY, S.camZ - S.tgtZ);
  S.time = t;
}
SHOTS.forEach(s => { if (s[0] > DROP && s[0] < DURATION) cue('cut', s[0]); });

/* ── pages ── */
const master = gsap.timeline({ paused: true });
master.to(S, { cover: 1, duration: 0.85, ease: 'power2.inOut' }, 5.5); cue('open', 5.5, { dur: 0.85 });
const flip = (i, t, d = 0.42) => { master.to(S.flip, { [i]: 1, duration: d, ease: 'power2.inOut' }, t); cue('flip', t, { dur: d, leaf: i }); };
flip(0, 7.0); flip(1, 9.0); flip(2, 10.5); flip(3, 11.5); flip(4, 12.5); flip(5, 13.0); flip(6, 14.0); flip(7, 14.5); flip(8, 16.0); flip(9, 16.5, 0.45);
master.set(S, { cover: 0 }, END);                                       // carte finale : de nouveau le livre fermé
master.set(S.flip, Object.fromEntries([...Array(N).keys()].map(i => [i, 0])), END);

/* ── avant : la pellicule du téléphone, qui défile sur les temps ── */
const PHOTOS = ['allee', 'arche', 'assis', 'bouquet', 'invites', 'montagne', 'sortie'].map(n => `/site/img/exemple/photos/${n}.jpg`)
  .concat(['bouquet', 'champ', 'lumieres', 'mains', 'montagne', 'portee'].map(n => `/site/img/exemple/photo-${n}.jpg`));
const grid = document.getElementById('grid'), phone = document.getElementById('phone');
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (let i = 0; i < 150; i++) {
  const d = document.createElement('div');
  d.style.backgroundImage = `url(${PHOTOS[Math.floor(rnd() * PHOTOS.length)]})`;
  d.style.backgroundPosition = `${Math.round(rnd() * 100)}% ${Math.round(rnd() * 100)}%`;
  d.style.backgroundSize = `${100 + Math.round(rnd() * 80)}%`;
  grid.appendChild(d);
}
for (let k = 1; k <= 6; k++) { master.to(grid, { y: -k * 640, duration: 0.3, ease: 'power3.out' }, k * 0.5); cue('scroll', k * 0.5); }
master.to(phone, { scale: 2.8, y: -260, duration: 0.5, ease: 'power3.in' }, 3.5);
cue('riser', 2.0, { dur: 2.0 }); cue('drop', DROP);
const flash = document.getElementById('flash');
master.fromTo(flash, { opacity: 0 }, { opacity: 0.9, duration: 0.12, ease: 'power1.in', immediateRender: false }, DROP - 0.12);
master.to(flash, { opacity: 0, duration: 0.5, ease: 'power2.out' }, DROP);
master.fromTo(flash, { opacity: 0 }, { opacity: 0.35, duration: 0.05, immediateRender: false }, END);
master.to(flash, { opacity: 0, duration: 0.4, ease: 'power2.out' }, END + 0.05);

/* ── légendes façon TikTok : pastilles blanches ── */
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
function cap(lines, t0, t1, top, o = {}) {
  const el = document.createElement('div'); el.className = 'cap' + (o.big ? ' big' : ''); el.style.top = top + 'px';
  el.innerHTML = lines.map(l => `<span class="t">${esc(l)}</span>`).join('<br>') + (o.s ? `<span class="s">${esc(o.s)}</span>` : '') + (o.f ? `<span class="f">${esc(o.f)}</span>` : '');
  ui.appendChild(el);
  master.fromTo(el, { opacity: 0, scale: 0.9, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'back.out(2.2)', immediateRender: false }, t0);
  if (t1 < DURATION) master.to(el, { opacity: 0, duration: 0.12, ease: 'power1.in' }, t1 - 0.12);
  cue('pop', t0);
}
cap(['Avant'], 0.15, DROP - 0.1, 200, { big: true, s: 'vos photos dorment dans le téléphone' });
cap(['Après'], DROP + 0.12, 5.5, 200, { big: true, s: 'votre histoire, imprimée en magazine' });
cap(['Votre dédicace'], 6.45, 7.0, 250);
cap(['Le plan de votre rencontre'], 7.1, 9.0, 250);
cap(['Vos grandes étapes'], 9.1, 10.5, 250);
cap(['Une année en photos'], 10.6, 11.5, 250);
cap(['Votre playlist'], 11.6, 12.5, 250);
cap(['Une interview exclusive'], 13.1, 14.0, 250);
cap(['Des jeux à deux'], 14.6, 16.0, 250);
cap(['Une lettre d’amour'], 16.6, END, 250);
cap(['Créez le vôtre', 'sur noustalgie.fr'], END + 0.15, DURATION, 230, { s: 'Aperçu gratuit · livré en 10 à 12 jours', f: 'Album d’exemple : couple imaginaire, photos Unsplash.' });
cue('end', END);
master.set({}, {}, DURATION);

/* ── mise en route ── */
await document.fonts.ready;
await Promise.all([document.fonts.load('600 62px "TikTok Sans"'), document.fonts.load('700 96px "TikTok Sans"'), document.fonts.load('500 34px "Hanken Grotesk"')]);
await Promise.all(PHOTOS.map(src => new Promise(r => { const im = new Image(); im.onload = im.onerror = r; im.src = src; })));
const B = await createBook3D(canvas, { width: W, height: H, samples: +(q.get('samples') || 4), shadowSize: +(q.get('shadow') || 2048),
  base: '/out/mag/pages/', spine: { text: 'LÉA & HUGO · 2026', bg: '#161412', fg: '#FBF9F6' } });
window.__duration = DURATION;
const clampT = t => Math.min(Math.max(t, 1e-4), DURATION - 1e-4);
const acc = document.createElement('canvas'); acc.width = W; acc.height = H;
acc.style.cssText = 'position:absolute;left:0;top:0;width:1080px;height:1920px;display:none';
canvas.after(acc);
const actx = acc.getContext('2d');
const MB = q.has('nomb') ? 1 : +(q.get('mb') || 5), SHUTTER = 0.85 / 30;   // flou de bougé des pages qui tournent
const flipWins = window.CUES.filter(c => c.name === 'flip' || c.name === 'open').map(c => [c.t - 0.03, c.t + c.dur + 0.03]);
window.__seek = t => {
  master.seek(clampT(t), false);
  if (t < DROP) { before.style.display = 'block'; acc.style.display = 'none'; return true; }   // avant : pas de 3D
  before.style.display = 'none';
  const moving = MB > 1 && flipWins.some(([a, b]) => t >= a && t <= b);
  if (!moving) { acc.style.display = 'none'; camera(t); S.grainT = t; B.render(S); return true; }
  for (let j = 0; j < MB; j++) {
    const tj = t + (j / (MB - 1) - 0.5) * SHUTTER;
    master.seek(clampT(tj), false); camera(t); S.grainT = t; B.render(S);      // seules les pages sont décalées dans le temps
    actx.globalAlpha = 1 / (j + 1); actx.drawImage(canvas, 0, 0);
  }
  acc.style.display = 'block';
  master.seek(clampT(t), false);                                              // légendes à l'instant exact
  return true;
};
window.__B = B; window.__S = S;
window.__ready = Promise.resolve(true);
window.__seek(0);
if (q.has('t')) window.__seek(+q.get('t'));
