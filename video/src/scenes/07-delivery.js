/* 32,4 → 36,1 s — Livraison : le livre tombe dans un carton 3D qui se ferme, sceau, puis le colis file vers la maison */
scene('delivery', 32.4, 36.1, (root, tl, S) => {
  const L = t => t - S.start;
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 58%, #33241a, #0e0b09 75%)' });
  const floor = el('div', 'abs', root); css(floor, { left: 0, right: 0, top: '1150px', height: '770px', background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.45))' });

  const title = el('div', 'center disp shadow-txt', root, 'Livré <em class="gold">chez vous</em>');
  css(title, { top: '240px', font: '700 118px/1.05 var(--display)', color: '#f7efe2' });
  const offer = el('div', 'pillbox', root, '🎁 Livraison offerte');
  css(offer, { left: '50%', top: '410px', transform: 'translateX(-50%)', font: '700 42px/1 var(--ui)', padding: '20px 36px', background: 'rgba(245,216,152,.95)', color: '#1c1a18', border: 'none' });
  gsap.set([title, offer], { opacity: 0 });

  // ── Carton en 3D ──
  const fly = el('div', 'abs', root); css(fly, { inset: 0 });
  const stage = el('div', 'abs', fly); css(stage, { inset: 0, perspective: '2200px', perspectiveOrigin: '50% 40%' });
  const world = el('div', 'abs', stage); css(world, { left: '540px', top: '1150px', width: '0', height: '0', transformStyle: 'preserve-3d' });
  gsap.set(world, { rotationX: -30, rotationY: -36 });
  const W = 560, D = 560, HH = 210;
  const KRAFT = 'linear-gradient(180deg, #d2a86f, #b98e58)', KIN = 'linear-gradient(180deg, #9c7546, #b48a55)';
  const face = (parent, w, h, tr, bg, extra = {}) => {
    const f = el('div', 'abs', parent);
    css(f, Object.assign({ left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', background: bg, transform: tr, boxShadow: 'inset 0 0 0 2px rgba(90,60,30,.25)' }, extra));
    return f;
  };
  face(world, W, D, 'rotateX(90deg)', 'linear-gradient(135deg, #8d6a3f, #a37a49)');
  const front = face(world, W, HH, `translate3d(0, ${-HH / 2}px, ${D / 2}px)`, KRAFT);
  face(world, W, HH, `translate3d(0, ${-HH / 2}px, ${-D / 2}px) rotateY(180deg)`, KIN);
  face(world, D, HH, `translate3d(${-W / 2}px, ${-HH / 2}px, 0) rotateY(-90deg)`, KIN);
  face(world, D, HH, `translate3d(${W / 2}px, ${-HH / 2}px, 0) rotateY(90deg)`, 'linear-gradient(180deg, #c09460, #a57b49)');
  // faces intérieures visibles par l'ouverture
  face(world, W, HH, `translate3d(0, ${-HH / 2}px, ${D / 2 - 1}px) rotateY(180deg)`, KIN);
  face(world, D, HH, `translate3d(${W / 2 - 1}px, ${-HH / 2}px, 0) rotateY(-90deg)`, KIN);
  // logo imprimé sur la face avant
  const stamp = el('div', 'abs', front, 'Nous<i>talgie</i>'); css(stamp, { left: 0, right: 0, top: '70px', textAlign: 'center', font: '400 46px/1 var(--display)', color: 'rgba(70,45,20,.55)' });
  // rabats : pivots sur les arêtes du haut
  const pivot = (x, y, z) => { const p = el('div', 'abs', world); css(p, { left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', transform: `translate3d(${x}px, ${y}px, ${z}px)` }); const r = el('div', 'abs', p); css(r, { left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }); return r; };
  const flapFB = (r, w, h, bg) => { const f = el('div', 'abs', r); css(f, { left: -w / 2 + 'px', top: -h + 'px', width: w + 'px', height: h + 'px', background: bg, boxShadow: 'inset 0 0 0 2px rgba(90,60,30,.3)', backfaceVisibility: 'visible' }); return f; };
  const pF = pivot(0, -HH, D / 2), pB = pivot(0, -HH, -D / 2), pL = pivot(-W / 2, -HH, 0), pR = pivot(W / 2, -HH, 0);
  flapFB(pF, W, D / 2, 'linear-gradient(0deg, #c79d64, #d9b27a)');
  flapFB(pB, W, D / 2, 'linear-gradient(0deg, #b48a55, #c9a06a)');
  const side = (r, bg) => { const pl = el('div', 'abs', r); css(pl, { left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', transform: 'rotateY(90deg)' }); return flapFB(pl, D, W / 2 - 4, bg); };
  side(pL, 'linear-gradient(0deg, #b58b56, #c69c63)');
  side(pR, 'linear-gradient(0deg, #c49a61, #d4ab72)');
  gsap.set(pF, { rotationX: -38 }); gsap.set(pB, { rotationX: 38 }); gsap.set(pL, { rotationZ: -40 }); gsap.set(pR, { rotationZ: 40 });
  // ruban adhésif et sceau
  const tapeW = face(world, 120, D + 20, `translate3d(0, ${-HH - 2}px, 0) rotateX(90deg)`, 'none', { boxShadow: 'none' });
  const tape = el('div', 'abs', tapeW); css(tape, { inset: 0, background: 'linear-gradient(90deg, rgba(240,225,200,.85), rgba(255,245,225,.95), rgba(240,225,200,.85))', transformOrigin: '50% 100%' });
  gsap.set(tape, { opacity: 0 });
  const seal = el('div', 'abs', front, '<div style="font:400 30px/1 var(--display)">Nous<i>talgie</i></div><div style="font:700 12px/1 var(--ui);letter-spacing:.2em;margin-top:6px">FAIT AVEC AMOUR</div>');
  css(seal, { left: W / 2 - 95 + 'px', top: '18px', width: '190px', height: '190px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #f7dfa6, #c9a05a 60%, #a07a3c)', color: '#2a1d10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(0,0,0,.35), inset 0 0 0 6px rgba(255,255,255,.25)', textAlign: 'center' });
  gsap.set(seal, { opacity: 0 });

  // le livre (fermé) qui tombe dans le carton
  const bk = el('div', 'abs', world); css(bk, { left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' });
  const B = makeBook(bk, { size: 470, thick: 30 });
  css(B.wrap, { left: '-235px', top: '-235px' });
  gsap.set(B.wrap, { rotationX: 90 });
  gsap.set(bk, { y: -1100, rotationY: 30 });
  tl.to(bk, { y: -18, rotationY: 0, duration: 0.5, ease: 'power2.in' }, L(32.5));
  tl.to(bk, { y: -40, duration: 0.1, ease: 'power2.out' }, L(33.0)).to(bk, { y: -18, duration: 0.12, ease: 'power2.in' }, L(33.1));
  sfx('whoosh', 32.5, { len: 0.45, gain: 0.5 });
  sfx('thud', 33.0, { gain: 0.9 });
  shake(33.0, 10, 0.25, 21);

  // fermeture des rabats
  tl.to(pL, { rotationZ: 90, duration: 0.24, ease: 'back.out(1.2)' }, L(33.13));
  tl.to(pR, { rotationZ: -90, duration: 0.24, ease: 'back.out(1.2)' }, L(33.16));
  tl.to(pF, { rotationX: 90, duration: 0.24, ease: 'back.out(1.2)' }, L(33.38));
  tl.to(pB, { rotationX: -90, duration: 0.24, ease: 'back.out(1.2)' }, L(33.41));
  sfx('flap', 33.25, { gain: 0.5 }); sfx('flap', 33.5, { gain: 0.6 });
  tl.fromTo(tape, { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 0.22, ease: 'power2.out', immediateRender: false }, L(33.6));
  sfx('tape', 33.6, { gain: 0.5 });
  tl.fromTo(seal, { opacity: 1, scale: 2.4, rotation: -25 }, { scale: 1, rotation: -8, duration: 0.25, ease: 'power4.in', immediateRender: false }, L(33.75));
  sfx('stamp', 34.0, { gain: 0.9 });
  shake(34.0, 12, 0.25, 22);
  burst({ t: 34.0, x: 470, y: 1060, n: 60, speed: [300, 1100], life: [0.5, 1.1], size: [2, 5], gravity: 600, drag: 2.5, colors: GOLDS, seed: 91 });

  // titres
  tl.fromTo(title, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', immediateRender: false }, L(34.0));
  tl.fromTo(offer, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)', immediateRender: false }, L(34.5));
  sfx('pop', 34.5, { gain: 0.5 });

  // trajet pointillé jusqu'à la maison
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('width', '1080'); svg.setAttribute('height', '1920'); css(svg, { position: 'absolute', left: 0, top: 0 });
  root.insertBefore(svg, fly);
  const D0 = 'M540 1040 C 470 860, 650 760, 800 700';
  svg.innerHTML = `<defs><mask id="routeMask"><path id="routeM" d="${D0}" stroke="#fff" stroke-width="30" fill="none" stroke-linecap="round"/></mask></defs><path d="${D0}" stroke="#f5d898" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="1 26" mask="url(#routeMask)"/>`;
  const rm = svg.querySelector('#routeM'), len = rm.getTotalLength();
  rm.setAttribute('stroke-dasharray', `${len} ${len}`); rm.setAttribute('stroke-dashoffset', String(len));
  tl.to(rm, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.inOut' }, L(34.3));
  const house = el('div', 'abs', root, '<svg width="180" height="170" viewBox="0 0 180 170"><path d="M90 10 L170 78 L150 78 L150 160 L30 160 L30 78 L10 78 Z" fill="#f2ebe0"/><rect x="72" y="104" width="36" height="56" rx="4" fill="#c9a05a"/><path d="M60 92c0-8 12-12 16-3 4-9 16-5 16 3 0 9-16 18-16 18s-16-9-16-18z" fill="#e05a6b" transform="translate(14 -26)"/></svg>');
  css(house, { left: '725px', top: '540px', width: '180px', height: '170px' });
  const pin = el('div', 'abs', root, '📍'); css(pin, { left: '775px', top: '430px', fontSize: '84px' });
  gsap.set([house, pin], { opacity: 0 });
  tl.fromTo(house, { opacity: 0, scale: 0.3, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, L(34.25));
  // le colis s'envole et rétrécit le long du trajet
  tl.to(fly, { motionPath: { path: [{ x: 0, y: 0 }, { x: -60, y: -200 }, { x: 120, y: -330 }, { x: 255, y: -420 }], curviness: 1.2 }, scale: 0.16, duration: 0.95, ease: 'power2.inOut', transformOrigin: '540px 1040px' }, L(34.35));
  tl.to(world, { rotationY: -10, rotationX: -18, duration: 0.95, ease: 'power2.inOut' }, L(34.35));
  sfx('whoosh', 34.35, { len: 0.9, gain: 0.6 });
  tl.set(fly, { opacity: 0 }, L(35.3));
  tl.fromTo(pin, { opacity: 1, y: -200 }, { y: 0, duration: 0.4, ease: 'bounce.out', immediateRender: false }, L(35.2));
  burst({ t: 35.3, x: 815, y: 600, n: 50, speed: [200, 800], life: [0.5, 1.2], size: [3, 6], gravity: 300, drag: 2.5, colors: WARM, seed: 93 });
  sfx('ding', 35.3, { gain: 0.6 });
  tl.fromTo(house, { scale: 1.2 }, { scale: 1, duration: 0.35, ease: 'back.out(3)', immediateRender: false }, L(35.3));
});
