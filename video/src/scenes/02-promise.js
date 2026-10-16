/* 3,55 → 8,2 s — Promesse : « Et si votre histoire devenait un vrai livre ? » + apparition du livre 3D */
scene('promise', 3.55, 8.2, (root, tl, S) => {
  const L = t => t - S.start;
  el('div', 'glowbg', root);
  const rays = el('div', 'rays', root); css(rays, { top: '58%' });
  gsap.set(rays, { opacity: 0 });
  tl.to(rays, { opacity: 0.7, duration: 1.2 }, L(6.4));
  tl.fromTo(rays, { rotation: 0 }, { rotation: 22, duration: S.end - S.start, ease: 'none' }, 0);

  // Ouverture en iris depuis le « 0 »
  gsap.set(root, { clipPath: 'circle(0px at 540px 810px)' });
  tl.to(root, { clipPath: 'circle(1500px at 540px 810px)', duration: 0.68, ease: 'power3.in' }, L(3.55));
  tl.set(root, { clipPath: 'none' }, L(4.25));
  const edge = el('div', 'ring', root);
  css(edge, { left: '540px', top: '810px', width: '0', height: '0', borderWidth: '10px', borderColor: '#f5d898', boxShadow: '0 0 60px rgba(245,216,152,.8), inset 0 0 40px rgba(245,216,152,.6)' });
  tl.fromTo(edge, { opacity: 1, width: 0, height: 0, x: 0, y: 0 }, { width: 3000, height: 3000, x: -1500, y: -1500, duration: 0.68, ease: 'power3.in', immediateRender: false }, L(3.55));
  tl.set(edge, { opacity: 0 }, L(4.24));
  tl.to(FXS, { dust: 0.85, duration: 1 }, L(4.0));

  // Texte cinétique, une ligne par temps
  const box = el('div', 'abs', root); css(box, { left: 0, right: 0, top: '560px', textAlign: 'center' });
  const lines = [
    ['Et si', 'italic 400 116px/1.08 var(--display)', 'rgba(242,235,224,.9)'],
    ['votre histoire', '700 124px/1.08 var(--display)', '#f7efe2'],
    ['devenait', 'italic 400 116px/1.08 var(--display)', 'rgba(242,235,224,.9)'],
    ['un vrai <em class="gold" style="font-weight:700">livre</em>&#8239;?', '700 150px/1.1 var(--display)', '#f7efe2'],
  ].map(([h, f, c]) => { const d = el('div', 'shadow-txt', box, h); css(d, { font: f, color: c }); gsap.set(d, { opacity: 0 }); return d; });
  lines.forEach((d, i) => {
    const t = 4.0 + i * 0.5;
    tl.fromTo(d, { opacity: 0, y: 70, scale: 0.8, filter: 'blur(12px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.7)', immediateRender: false }, L(t));
    sfx('word', t, { gain: 0.35 + i * 0.1 });
  });
  const livre = lines[3].querySelector('em');
  tl.fromTo(livre, { textShadow: '0 0 0px rgba(245,216,152,0)' }, { textShadow: '0 0 50px rgba(245,216,152,.9)', duration: 0.3, yoyo: true, repeat: 1 }, L(5.7));
  // le texte devient le titre en haut
  tl.to(box, { y: -360, scale: 0.6, duration: 0.6, ease: 'expo.inOut' }, L(5.98));

  // Le livre arrive du fond et s'écrase en douceur
  const st = el('div', 'abs', root); css(st, { inset: 0, perspective: '2200px', perspectiveOrigin: '50% 58%' });
  const shadow = el('div', 'abs', st); css(shadow, { left: '170px', top: '1440px', width: '740px', height: '120px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,.65), rgba(0,0,0,0) 70%)' });
  gsap.set(shadow, { opacity: 0, scale: 0.3 });
  const B = makeBook(st, { size: 600 });
  css(B.wrap, { left: '240px', top: '840px' });
  gsap.set(B.wrap, { visibility: 'hidden', z: -6000, rotationY: -600, rotationX: 55, rotationZ: -25 });
  const TB = 6.0, TI = 6.5;
  tl.set(B.wrap, { visibility: 'visible' }, L(TB));
  tl.to(B.wrap, { z: 0, rotationY: -34, rotationX: 15, rotationZ: -5, duration: TI - TB, ease: 'power3.out' }, L(TB));
  tl.to(shadow, { opacity: 1, scale: 1, duration: TI - TB, ease: 'power3.out' }, L(TB));
  sfx('whoosh', TB, { len: 0.55, gain: 0.7, rise: true });
  // impact
  flash(TI, 0.55, 0.03, 0.4);
  shake(TI, 20, 0.45, 3);
  sfx('impact', TI, { gain: 1 });
  sfx('shimmer', TI + 0.05, { gain: 0.6, dur: 1.4 });
  shockwave(tl, root, 540, 1140, L(TI), { size: 260, scale: 8, width: 8, dur: 0.9 });
  burst({ t: TI, x: 540, y: 1140, n: 110, speed: [500, 1700], life: [0.6, 1.5], size: [2, 6], gravity: 500, drag: 2.6, colors: GOLDS, seed: 61, spread: 200 });
  leak(TI - 0.05, 1.1, 0.7, [15, 70], [85, 25]);
  // présentation produit : lente rotation + reflet
  tl.to(B.wrap, { rotationY: 20, rotationX: 9, rotationZ: 2, y: -16, duration: 8.2 - TI, ease: 'sine.inOut' }, L(TI));
  tl.fromTo(B.sheen, { '--sx': '-90%' }, { '--sx': '90%', duration: 1.1, ease: 'power2.inOut', immediateRender: false }, L(6.85));

  // Sortie : panoramique filé vers la gauche
  const out = [box, st];
  tl.to(out, { x: -1300, duration: 0.32, ease: 'power3.in' }, L(7.88));
  tl.set(root, { filter: 'url(#mblurX)' }, L(7.95));
  sfx('whoosh', 7.9, { len: 0.4, gain: 0.8 });
});
