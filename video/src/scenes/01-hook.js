/* 0 → 4,3 s — Accroche : « 12 847 photos dans ton téléphone… et 0 album. » */
scene('hook', 0, 4.3, (root, tl, S) => {
  const THUMBS = ['plage', 'colline', 'ville', 'paris', 'montgolfieres', 'etoiles', 'lac', 'granderoue', 'lavande', 'neige', 'route', 'artifice', 'cierge', 'aerienne'];
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 42%, #2a1d14, #0e0b09 70%)' });

  // Mur de photos (pellicule du téléphone) qui défile
  const ww = el('div', 'abs', root); css(ww, { inset: 0, perspective: '1700px', perspectiveOrigin: '50% 40%' });
  const wall = el('div', 'abs', ww);
  const C = 5, SZ = 196, G = 16, ROWS = 17;
  css(wall, { left: (1080 - (C * SZ + (C - 1) * G)) / 2 + 'px', top: '-200px', width: C * SZ + (C - 1) * G + 'px', height: ROWS * (SZ + G) + 'px', transform: 'rotateX(26deg) rotateZ(-11deg) scale(1.3)', transformOrigin: '50% 30%' });
  const r = rng(77), tiles = [];
  for (let i = 0; i < C * ROWS; i++) {
    const t = el('div', 'abs', wall);
    css(t, { left: (i % C) * (SZ + G) + 'px', top: Math.floor(i / C) * (SZ + G) + 'px', width: SZ + 'px', height: SZ + 'px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,.45)' });
    const im = img('assets/thumbs/' + THUMBS[(i * 5 + Math.floor(i / C) * 3) % THUMBS.length] + '.jpg', '', t);
    css(im, { width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + r() * 0.5}) ${r() < 0.4 ? 'scaleX(-1)' : ''}`, transformOrigin: `${r() * 100}% ${r() * 100}%` });
    tiles.push(t);
  }
  const shade = el('div', 'abs', root);
  css(shade, { inset: 0, background: 'linear-gradient(180deg, rgba(14,11,9,.92) 0%, rgba(14,11,9,.45) 22%, rgba(14,11,9,.62) 50%, rgba(14,11,9,.5) 72%, rgba(14,11,9,.95) 100%)' });
  tl.fromTo(wall, { y: 0 }, { y: -1650, duration: 2.1, ease: 'power1.in' }, 0);

  // Compteur à rouleaux
  const TARGET = [1, 2, 8, 4, 7];
  const cw = el('div', 'abs disp', root);
  css(cw, { left: 0, right: 0, top: '600px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', font: '900 270px/1 var(--display)', color: '#f7efe2', fontVariantNumeric: 'lining-nums tabular-nums', textShadow: '0 10px 60px rgba(0,0,0,.6)' });
  const cols = [];
  TARGET.forEach((d, j) => {
    if (j === 2) el('div', '', cw).style.width = '0.16em';
    const box = el('div', '', cw); css(box, { height: '1em', overflow: 'hidden', position: 'relative' });
    const strip = el('div', '', box);
    const R = 2 + j; // nombre de tours
    for (let k = 0; k < R * 10 + 10; k++) { const s = el('div', '', strip, String(k % 10)); css(s, { height: '1em', lineHeight: '1em' }); }
    cols.push({ box, strip, R, d });
  });
  cols.forEach((c, j) => {
    const fin = (c.R * 10 + c.d), start = 3 + j * 2;
    tl.fromTo(c.strip, { y: -start * 270, filter: 'blur(7px)' }, { y: -fin * 270, filter: 'blur(0px)', duration: 0.62 + j * 0.1, ease: 'power3.out' }, 0);
  });
  sfx('ticks', 0, { dur: 1.02, r0: 26, r1: 6 });
  sfx('whoosh', 0.0, { len: 0.5, gain: 0.5 });
  sfx('pop', 1.03, { gain: 0.6 });
  tl.fromTo(cw, { scale: 0.86 }, { scale: 1, duration: 1.05, ease: 'power2.out' }, 0);
  tl.to(cw, { scale: 1.06, duration: 0.12, ease: 'power2.out' }, 1.02).to(cw, { scale: 1, duration: 0.3, ease: 'power2.inOut' }, 1.14);

  // reflet doré qui balaie les chiffres
  const shine = el('div', 'abs', cw);
  css(shine, { inset: '-10% -20%', background: 'linear-gradient(105deg, rgba(255,220,150,0) 40%, rgba(255,236,190,.55) 50%, rgba(255,220,150,0) 60%)', mixBlendMode: 'overlay' });
  tl.fromTo(shine, { xPercent: -80 }, { xPercent: 80, duration: 0.6, ease: 'power2.inOut' }, 1.08);

  const l1 = el('div', 'center disp shadow-txt', root, 'photos dans ton téléphone');
  css(l1, { top: '930px', font: 'italic 500 74px/1.15 var(--display)', color: 'rgba(242,235,224,.92)' });
  const l1w = splitWords(l1);
  tl.fromTo(l1w, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'expo.out' }, 0.12);
  const emo = el('div', 'center', root, '📱');
  css(emo, { top: '1060px', fontSize: '90px' });
  tl.fromTo(emo, { opacity: 0, scale: 0.3, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.5)' }, 0.5);

  // ── Rupture à 2,0 s : tout retombe à zéro ──
  const T2 = 2.0;
  sfx('glitch', T2, { dur: 0.18 });
  sfx('rewind', T2 + 0.02, { dur: 0.32 });
  cols.forEach((c, j) => {
    tl.to(c.strip, { y: -(c.R * 10 + 10 - 10) * 270, filter: 'blur(9px)', duration: 0.3, ease: 'power2.in' }, T2 + 0.02 + j * 0.015);
  });
  // glitch RVB sur le compteur
  const gl = [];
  ['rgba(255,40,80,.85)', 'rgba(40,220,255,.85)'].forEach((c, k) => {
    const g = el('div', 'abs disp', root, '12&#8239;847');
    css(g, { left: 0, right: 0, top: '600px', height: '300px', textAlign: 'center', font: '900 270px/300px var(--display)', color: c, mixBlendMode: 'screen', opacity: 0, fontVariantNumeric: 'lining-nums tabular-nums' });
    gl.push(g);
  });
  const gr = rng(5);
  for (let s = 0; s < 5; s++) {
    const tt = T2 + s * 0.035, y0 = gr() * 70, y1 = y0 + 10 + gr() * 30;
    gl.forEach((g, k) => tl.set(g, { opacity: 1, x: (k ? 1 : -1) * (10 + gr() * 26), clipPath: `inset(${y0}% 0 ${100 - y1}% 0)` }, tt));
    tl.set(cw, { x: (gr() - 0.5) * 40, skewX: (gr() - 0.5) * 18 }, tt);
  }
  gl.forEach(g => tl.set(g, { opacity: 0 }, T2 + 0.18));
  tl.set(cw, { x: 0, skewX: 0 }, T2 + 0.18);
  tl.to([l1, emo], { opacity: 0, y: 40, duration: 0.2, ease: 'power2.in' }, T2);

  // le compteur disparaît, un seul « 0 » doré reste
  tl.to(cw, { opacity: 0, scale: 0.7, duration: 0.18, ease: 'power2.in' }, T2 + 0.3);
  const zeroWrap = el('div', 'abs', root); css(zeroWrap, { left: '0', right: '0', top: '560px', height: '480px' });
  const zero = el('div', 'abs disp', zeroWrap, '0');
  css(zero, { left: 0, right: 0, top: 0, textAlign: 'center', font: '900 480px/480px var(--display)', color: 'var(--gold2)', textShadow: '0 0 80px rgba(232,190,122,.45)', fontVariantNumeric: 'lining-nums', transformOrigin: '50% 52%' });
  gsap.set(zero, { opacity: 0 });
  tl.fromTo(zero, { opacity: 0, scale: 2.2, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.35, ease: 'expo.out', immediateRender: false }, T2 + 0.34);
  sfx('boom', T2 + 0.36, { gain: 0.8 });
  shake(T2 + 0.36, 16, 0.3);
  const et = el('div', 'center disp shadow-txt', root, '…et');
  css(et, { top: '440px', font: 'italic 400 96px/1 var(--display)', color: 'rgba(242,235,224,.85)' });
  gsap.set(et, { opacity: 0 });
  tl.fromTo(et, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, immediateRender: false }, T2 + 0.22);
  const alb = el('div', 'center disp shadow-txt', root, 'album.');
  css(alb, { top: '1040px', font: 'italic 700 170px/1 var(--display)', color: '#f7efe2' });
  gsap.set(alb, { opacity: 0 });
  tl.fromTo(alb, { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out', immediateRender: false }, T2 + 0.46);

  // les photos tombent
  tiles.forEach((t, i) => {
    const d = T2 + 0.05 + gr() * 0.45;
    tl.to(t, { y: 1700 + gr() * 900, x: (gr() - 0.5) * 300, rotation: (gr() - 0.5) * 80, duration: 0.9 + gr() * 0.4, ease: 'power2.in' }, d);
  });
  tl.to(shade, { background: 'linear-gradient(180deg, rgba(14,11,9,.96) 0%, rgba(14,11,9,.86) 50%, rgba(14,11,9,.98) 100%)', duration: 0.5 }, T2);

  const sub = el('div', 'center ui', root, 'Elles méritent mieux qu’un écran.');
  css(sub, { top: '1270px', font: '600 46px/1.3 var(--ui)', color: 'rgba(242,235,224,.78)', letterSpacing: '.01em' });
  gsap.set(sub, { opacity: 0 });
  tl.fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, T2 + 0.75);

  // ── Sortie à travers le « 0 » ──
  const T3 = 3.5;
  tl.to([et, alb, sub], { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' }, T3);
  tl.to(zero, { scale: 9, duration: 0.75, ease: 'power3.in' }, T3);
  tl.to(zero, { opacity: 0, duration: 0.2, ease: 'none' }, T3 + 0.55);
  sfx('whoosh', T3 + 0.05, { len: 0.75, gain: 0.8, rise: true });
});
