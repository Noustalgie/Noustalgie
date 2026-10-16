/* Noustalgie — noyau de la composition : utilitaires, scènes, repères sonores.
   Tout est piloté par une timeline GSAP en pause : window.__seek(t) affiche l'instant t.
   Aucune animation ne dépend du temps réel, le rendu image par image est donc déterministe. */
(function () {
'use strict';
const W = 1080, H = 1920;
const BPM = 120, BEAT = 60 / BPM, BAR = 4 * BEAT;
window.STAGE = { W, H, BPM, BEAT, BAR };
gsap.registerPlugin(MotionPathPlugin);
gsap.defaults({ ease: 'power3.out', duration: 0.6, overwrite: false });
gsap.ticker.lagSmoothing(0);

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
window.rng = mulberry32;

window.el = (tag, cls, parent, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
};
window.css = (e, styles) => { Object.assign(e.style, styles); return e; };

/* Images : toutes préchargées et décodées avant le premier rendu */
const IMGS = [];
window.img = (src, cls, parent) => {
  const i = el('img', cls, parent);
  i.decoding = 'sync'; i.draggable = false; i.src = src;
  IMGS.push(i);
  return i;
};
window.preloadAll = () => Promise.all(IMGS.map(i => i.decode().catch(() => console.error('image manquante : ' + i.src))));

/* Découpe un élément en mots / lettres (spans inline-block) en gardant le HTML simple (<em>, <br>) */
function split(node, mode) {
  const out = [];
  const walk = (n, parent) => {
    [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const parts = mode === 'chars' ? [...c.textContent] : c.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
          const s = document.createElement('span');
          s.className = mode === 'chars' ? 'ch' : 'wd';
          s.textContent = p;
          frag.appendChild(s); out.push(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    });
  };
  walk(node);
  return out;
}
window.splitChars = n => split(n, 'chars');
window.splitWords = n => split(n, 'words');

/* Repères sonores : exportés vers out/cues.json pour la bande-son */
window.CUES = [];
window.sfx = (name, t, o = {}) => { window.CUES.push(Object.assign({ name, t: Math.round(t * 1000) / 1000 }, o)); };

/* Scènes : start/end en secondes absolues ; build(root, tl, S) reçoit une timeline locale (0 = start) */
window.SCENES = [];
window.scene = (name, start, end, build) => window.SCENES.push({ name, start, end, build });

/* Timeline maîtresse + effets globaux (caméra, flash, fuites de lumière) */
window.master = gsap.timeline({ paused: true });
window.FXS = { dust: 0, dustHue: 0, grain: 1, leak: 0, lx: 20, ly: 30, rays: 0 };
window.beat = n => n * BEAT;

/* Secousse de caméra déterministe à l'instant t (absolu) */
window.shake = (t, amp = 14, dur = 0.35, seed = 1) => {
  const r = mulberry32(Math.round(t * 1000) + seed), cam = document.getElementById('camera');
  const steps = Math.max(4, Math.round(dur / 0.035));
  const tl = gsap.timeline();
  for (let i = 0; i < steps; i++) {
    const k = 1 - i / steps;
    tl.to(cam, { x: (r() - 0.5) * 2 * amp * k, y: (r() - 0.5) * 2 * amp * k, rotation: (r() - 0.5) * amp * 0.06 * k, duration: dur / steps, ease: 'none' });
  }
  tl.to(cam, { x: 0, y: 0, rotation: 0, duration: 0.05, ease: 'none' });
  window.master.add(tl, t);
};
/* Flash lumineux (opacité crête a) */
window.flash = (t, a = 0.85, up = 0.04, down = 0.35) => {
  const f = document.getElementById('flash');
  window.master.fromTo(f, { opacity: 0 }, { opacity: a, duration: up, ease: 'none', immediateRender: false }, t);
  window.master.to(f, { opacity: 0, duration: down, ease: 'power2.out' }, t + up);
};
/* Fuite de lumière chaude qui traverse l'image */
window.leak = (t, dur = 0.8, a = 0.75, from = [10, 20], to = [70, 60]) => {
  const L = document.getElementById('leak');
  window.master.fromTo(L, { opacity: 0, '--lx': from[0] + '%', '--ly': from[1] + '%' }, { opacity: a, '--lx': (from[0] + to[0]) / 2 + '%', '--ly': (from[1] + to[1]) / 2 + '%', duration: dur * 0.4, ease: 'sine.out', immediateRender: false }, t);
  window.master.to(L, { opacity: 0, '--lx': to[0] + '%', '--ly': to[1] + '%', duration: dur * 0.6, ease: 'sine.in' }, t + dur * 0.4);
};
})();
