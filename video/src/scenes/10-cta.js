/* 43,0 → 48 s — Appel à l'action : logo, livre, noustalgie.fr */
scene('cta', 43.0, 48.0, (root, tl, S) => {
  const L = t => t - S.start;
  el('div', 'glowbg', root);
  const rays = el('div', 'rays', root); css(rays, { top: '53%' });
  tl.fromTo(rays, { rotation: 0, opacity: 0 }, { rotation: 30, opacity: 1, duration: S.end - S.start, ease: 'none' }, 0);
  tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0);
  tl.to(FXS, { dust: 1, duration: 0.5 }, 0);

  // logo Nous·talgie, lettre par lettre
  const logo = el('div', 'center disp', root, 'Nous<em class="gold">talgie</em>');
  css(logo, { top: '430px', font: '500 168px/1 var(--display)', color: '#f7efe2', letterSpacing: '-.01em', textShadow: '0 10px 50px rgba(0,0,0,.5)' });
  const chars = splitChars(logo);
  tl.fromTo(chars, { opacity: 0, y: -120, rotationX: 90, transformPerspective: 500, filter: 'blur(8px)' }, { opacity: 1, y: 0, rotationX: 0, filter: 'blur(0px)', duration: 0.55, ease: 'back.out(1.8)', stagger: 0.045 }, L(43.15));
  sfx('logo', 43.15, { gain: 0.8 });
  // reflet doré qui traverse le logo
  const sh = el('div', 'center disp', root, 'Nous<em>talgie</em>');
  css(sh, { top: '430px', font: '500 168px/1 var(--display)', letterSpacing: '-.01em', color: 'transparent', backgroundImage: 'linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,245,215,.95) 50%, rgba(255,255,255,0) 60%)', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text' });
  tl.fromTo(sh, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 0.9, ease: 'power2.inOut' }, L(43.9));
  tl.fromTo(sh, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 0.9, ease: 'power2.inOut', immediateRender: false }, L(46.0));

  const tag = el('div', 'center disp shadow-txt', root, 'L’album qui raconte votre histoire');
  css(tag, { top: '640px', font: 'italic 400 60px/1.2 var(--display)', color: 'rgba(242,235,224,.88)' });
  tl.fromTo(tag, { opacity: 0, y: 40, letterSpacing: '.12em' }, { opacity: 1, y: 0, letterSpacing: '0em', duration: 0.8, ease: 'expo.out' }, L(43.7));

  // le livre qui tourne
  const st = el('div', 'abs', root); css(st, { inset: 0, perspective: '2000px', perspectiveOrigin: '50% 50%' });
  const shadow = el('div', 'abs', st); css(shadow, { left: '290px', top: '1180px', width: '500px', height: '80px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,.6), rgba(0,0,0,0) 70%)' });
  const B = makeBook(st, { size: 360 });
  css(B.wrap, { left: '360px', top: '780px' });
  gsap.set(B.wrap, { visibility: 'hidden', rotationY: -200, rotationX: 20, y: 500 });
  tl.set(B.wrap, { visibility: 'visible' }, L(43.9));
  tl.to(B.wrap, { rotationY: -28, rotationX: 12, y: 0, duration: 0.8, ease: 'expo.out' }, L(43.9));
  tl.to(B.wrap, { rotationY: 26, rotationX: 8, y: -14, duration: 48 - 44.7, ease: 'sine.inOut' }, L(44.7));
  tl.fromTo(shadow, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8 }, L(43.9));
  tl.fromTo(B.sheen, { '--sx': '-90%' }, { '--sx': '90%', duration: 1.2, ease: 'power2.inOut', immediateRender: false }, L(45.0));
  sfx('whoosh', 43.9, { len: 0.6, gain: 0.5 });

  // bouton noustalgie.fr
  const btn = el('div', 'abs', root); css(btn, { left: '50%', top: '1250px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '22px', padding: '30px 54px', borderRadius: '999px', background: 'linear-gradient(180deg, #f5d898, #d9ae63)', color: '#1c1a18', font: '800 64px/1 var(--ui)', letterSpacing: '-.01em', boxShadow: '0 20px 60px rgba(201,160,90,.45), inset 0 2px 0 rgba(255,255,255,.6)', whiteSpace: 'nowrap' });
  btn.innerHTML = 'noustalgie.fr <span style="display:inline-flex;width:62px;height:62px;border-radius:50%;background:#1c1a18;color:#f5d898;align-items:center;justify-content:center;font-size:36px">↗</span>';
  gsap.set(btn, { opacity: 0 });
  tl.fromTo(btn, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)', immediateRender: false }, L(44.5));
  sfx('pop', 44.5, { gain: 0.6 });
  const note = el('div', 'center ui', root, 'Aperçu gratuit · lien en bio');
  css(note, { top: '1400px', font: '600 38px/1 var(--ui)', color: 'rgba(242,235,224,.8)' });
  tl.fromTo(note, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, L(44.95));
  // tap sur le bouton
  const tap = el('div', 'abs', root); css(tap, { left: '760px', top: '1310px', width: '110px', height: '110px', marginLeft: '-55px', marginTop: '-55px', borderRadius: '50%', background: 'rgba(255,255,255,.5)', border: '4px solid rgba(28,26,24,.35)', opacity: 0 });
  const rip = el('div', 'abs', root); css(rip, { left: '760px', top: '1310px', width: '110px', height: '110px', marginLeft: '-55px', marginTop: '-55px', borderRadius: '50%', border: '6px solid #f5d898', opacity: 0 });
  tl.fromTo(tap, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.25, immediateRender: false }, L(45.2));
  tl.to(tap, { scale: 0.8, duration: 0.08 }, L(45.45)).to(tap, { scale: 1, opacity: 0, duration: 0.35 }, L(45.55));
  tl.to(btn, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, L(45.45));
  tl.fromTo(rip, { opacity: 0.9, scale: 0.6 }, { opacity: 0, scale: 3, duration: 0.6, ease: 'power2.out', immediateRender: false }, L(45.5));
  sfx('tap', 45.5, { gain: 0.6 });
  // dernier temps fort
  burst({ t: 46.0, x: 540, y: 520, n: 120, speed: [400, 1600], life: [0.7, 1.6], size: [2, 6], gravity: 350, drag: 2.4, colors: GOLDS, seed: 111, spread: 600, spreadY: 100 });
  tl.fromTo(logo, { scale: 1 }, { scale: 1.06, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, L(46.0));
  tl.fromTo(btn, { boxShadow: '0 20px 60px rgba(201,160,90,.45), inset 0 2px 0 rgba(255,255,255,.6)' }, { boxShadow: '0 20px 120px rgba(245,216,152,.95), inset 0 2px 0 rgba(255,255,255,.6)', duration: 0.3, yoyo: true, repeat: 3, immediateRender: false }, L(46.0));
  sfx('final', 46.0, { gain: 1 });
});
