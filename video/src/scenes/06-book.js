/* 27,95 → 32,55 s — LE DROP : le livre s'ouvre, les pages défilent sur le tempo, caractéristiques */
scene('book', 27.95, 32.55, (root, tl, S) => {
  const L = t => t - S.start;
  el('div', 'glowbg', root);
  const rays = el('div', 'rays', root); css(rays, { top: '46%' });
  tl.fromTo(rays, { rotation: -10, opacity: 0.9 }, { rotation: 30, duration: S.end - S.start, ease: 'none' }, 0);
  tl.to(FXS, { dust: 1, duration: 0.3 }, 0);

  const title = el('div', 'center disp shadow-txt', root, 'Un vrai <em class="gold">livre</em>.');
  css(title, { top: '230px', font: '700 128px/1 var(--display)', color: '#f7efe2' });
  const sub = el('div', 'center ui', root, 'Imprimé et relié pour vous');
  css(sub, { top: '385px', font: '600 40px/1 var(--ui)', color: 'rgba(242,235,224,.75)', letterSpacing: '.02em' });

  // pastille du style en cours
  const styleP = el('div', 'pillbox', root); css(styleP, { left: '50%', top: '480px', transform: 'translateX(-50%)', font: '700 30px/1 var(--ui)', padding: '14px 26px', letterSpacing: '.12em', textTransform: 'uppercase' });
  const STY = ['Style Nuit', 'Style Galerie', 'Style Argentique', 'Style Encre'];
  styleP.innerHTML = '<span class="dot"></span>';
  const sw = el('span', '', styleP); css(sw, { position: 'relative', display: 'inline-block', width: '330px', height: '30px' });
  const styEls = STY.map((s, i) => { const e = el('span', 'abs', sw, s); css(e, { left: 0, top: 0, whiteSpace: 'nowrap', opacity: i ? 0 : 1 }); return e; });

  // Livre ouvert
  const stage = el('div', 'abs', root); css(stage, { inset: 0, perspective: '2100px', perspectiveOrigin: '50% 35%' });
  const PW = 470;
  const spreads = [['chap1', 'full-colline'], ['love', 'trio'], ['meteo', 'full-plage'], ['film', 'notep-cierge'], ['g-chap', 'g-duo'], ['g-frame', 'g-strip'], ['a-love', 'a-frame'], ['a-duo', 'a-grid'], ['e-quote', 'e-stack']];
  const holder = el('div', 'abs', stage); css(holder, { left: (1080 - 2 * PW) / 2 + 'px', top: '610px', width: 2 * PW + 'px', height: PW + 'px', transformStyle: 'preserve-3d' });
  const ob = makeOpenBook(holder, { page: PW, spreads, cover: 'cover', dz: 0.8 });
  const shadow = el('div', 'abs', stage); css(shadow, { left: '40px', top: (610 + PW - 30) + 'px', width: '1000px', height: '120px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,.7), rgba(0,0,0,0) 70%)', zIndex: -1 });

  // entrée : le livre fermé tombe en place puis s'ouvre
  gsap.set(holder, { x: -PW / 2, rotationX: 48, rotationZ: -6, scale: 1.35, z: 200, transformOrigin: '50% 50%' });
  tl.to(holder, { rotationX: 16, rotationZ: -2, scale: 1, z: 0, duration: 0.32, ease: 'power3.out' }, L(27.97));
  tl.to(holder, { x: 0, duration: 0.45, ease: 'power3.inOut' }, L(28.02));
  ob.flip(tl, 0, L(28.02), 0.45, 'power3.inOut');
  gsap.set(ob.edgeL, { opacity: 0 });
  tl.to(ob.edgeL, { opacity: 1, duration: 0.15 }, L(28.25));
  sfx('drop', 28.0, { gain: 1 });
  shake(28.0, 22, 0.5, 11);
  burst({ t: 28.05, x: 540, y: 840, n: 160, speed: [600, 2000], life: [0.7, 1.6], size: [2, 6], gravity: 420, drag: 2.4, colors: GOLDS, seed: 81, spread: 500, spreadY: 200 });
  shockwave(tl, root, 540, 845, L(28.02), { size: 300, scale: 7, width: 10, dur: 0.9 });
  leak(28.0, 1.2, 0.8, [80, 15], [10, 85]);
  tl.fromTo(title, { opacity: 0, scale: 1.5, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'expo.out' }, L(28.02));
  tl.fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, L(28.3));
  tl.fromTo(styleP, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, L(28.45));

  // les pages défilent sur le tempo (le dernier temps s'accélère)
  const FLIPS = [28.5, 29.0, 29.5, 30.0, 30.5, 31.0, 31.5, 31.75];
  FLIPS.forEach((t, i) => {
    const d = i >= 6 ? 0.3 : 0.42;
    ob.flip(tl, i + 1, L(t), d, 'power2.inOut');
    sfx('pageflip', t + 0.05, { gain: 0.65 });
    burst({ t: t + d * 0.6, x: 540 - 200 + (i % 3) * 120, y: 760, n: 18, speed: [150, 520], life: [0.4, 0.9], size: [2, 4], gravity: 300, drag: 2.5, colors: GOLDS, seed: 400 + i, spread: 300 });
  });
  // changement de style : Galerie (feuillet 4), Argentique (6), Encre (8)
  [[1, 4], [2, 6], [3, 8]].forEach(([s, leaf]) => {
    const t = FLIPS[leaf - 1] + 0.2;
    tl.set(styEls[s - 1], { opacity: 0 }, L(t));
    tl.fromTo(styEls[s], { opacity: 1, y: 20 }, { y: 0, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, L(t));
    tl.fromTo(styleP, { scale: 1.12 }, { scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: false }, L(t));
  });
  // pulsation sur chaque temps
  for (let b = 28.5; b < 32.4; b += 0.5) tl.fromTo(stage, { scale: 1.022 }, { scale: 1, duration: 0.22, ease: 'power2.out', immediateRender: false }, L(b));

  // caractéristiques
  const SPECS = [['📐', '21 × 21 cm', 'l', 1180, 28.5], ['📕', 'Couverture rigide', 'r', 1180, 29.5], ['✨', 'Papier photo pro', 'l', 1285, 30.5], ['📖', '24 à 50 pages', 'r', 1285, 31.5]];
  SPECS.forEach(([ico, txt, side, y, t]) => {
    const p = el('div', 'pillbox', root, `<span style="font-size:34px">${ico}</span>${txt}`);
    css(p, { top: y + 'px', font: '700 36px/1 var(--ui)', padding: '18px 28px', [side === 'l' ? 'left' : 'right']: side === 'l' ? '56px' : '135px' });
    gsap.set(p, { opacity: 0 });
    tl.fromTo(p, { opacity: 0, x: side === 'l' ? -200 : 200, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false }, L(t));
    sfx('pop', t, { gain: 0.5 });
  });

  // sortie : plongée dans le livre
  tl.to(holder, { scale: 2.6, rotationX: 0, y: 120, duration: 0.42, ease: 'power3.in' }, L(32.12));
  tl.to([title, sub, styleP], { opacity: 0, duration: 0.2 }, L(32.12));
  tl.set(root, { filter: 'blur(6px)' }, L(32.42));
  flash(32.45, 0.9, 0.06, 0.4);
  sfx('whoosh', 32.1, { len: 0.45, gain: 0.7, rise: true });
});
