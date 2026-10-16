/* Assemblage : chaque scène est construite puis placée sur la timeline maîtresse. */
(function () {
'use strict';
const cam = document.getElementById('camera');
const DURATION = 48;

// Les scènes sont construites visibles (GSAP mesure les éléments affichés : origines de
// transformation justes, ordre des nœuds préservé), puis masquées hors de leur plage.
const built = SCENES.map(S => {
  const root = el('div', 'scene s-' + S.name, cam);
  root.style.display = 'block';
  const tl = gsap.timeline();
  S.build(root, tl, S);
  return { root, tl };
});
// L'affichage est inséré avant la timeline de la scène : lors d'un saut, la scène est
// visible quand ses tweens s'initialisent (sinon GSAP mesure des éléments masqués).
SCENES.forEach((S, i) => {
  const { root, tl } = built[i];
  gsap.set(root, { display: 'none' });
  master.set(root, { display: 'block' }, S.start);
  master.add(tl, S.start);
  master.set(root, { display: 'none' }, S.end);
});
// fin : fondu au noir pour une boucle propre vers le début
master.to('#fade', { opacity: 1, duration: 0.35, ease: 'power1.in' }, DURATION - 0.35);
master.set({}, {}, DURATION);

window.__duration = DURATION;
window.__seek = t => {
  master.seek(Math.min(Math.max(t, 1e-4), DURATION - 1e-4), false);
  renderFX(t);
};
window.__ready = (async () => {
  await document.fonts.ready;
  await Promise.all(['400', '700', '900'].map(w => document.fonts.load(`${w} 40px "Playfair Display"`)));
  await Promise.all(['400', '700'].map(w => document.fonts.load(`italic ${w} 40px "Playfair Display"`)));
  await document.fonts.load('600 40px Inter'); await document.fonts.load('400 20px "Libre Baskerville"'); await document.fonts.load('italic 400 20px "Cormorant Garamond"');
  await preloadAll();
  window.__seek(0);
  return true;
})();

/* Aperçu dans un navigateur : ?play lit la timeline en temps réel, ?t=12.5 fige un instant */
const q = new URLSearchParams(location.search);
if (q.has('play')) {
  window.__ready.then(() => { const t0 = performance.now() - (Number(q.get('play')) || 0) * 1000; const loop = () => { window.__seek(((performance.now() - t0) / 1000) % DURATION); requestAnimationFrame(loop); }; loop(); });
} else if (q.has('t')) window.__ready.then(() => window.__seek(Number(q.get('t'))));
})();
