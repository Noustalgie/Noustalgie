/* 35,85 → 40,05 s — « Le cadeau parfait pour… » (rouleau de mots) sur un carrousel de pages */
scene('occasions', 35.85, 40.05, (root, tl, S) => {
  const L = t => t - S.start;
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 85% 55% at 50% 50%, #2a1c14, #0b0806 75%)' });
  // entrée : bande dorée en diagonale
  gsap.set(root, { clipPath: 'polygon(0% 0%, 0% 0%, -40% 100%, -40% 100%)' });
  tl.to(root, { clipPath: 'polygon(0% 0%, 140% 0%, 100% 100%, -40% 100%)', duration: 0.4, ease: 'power3.inOut' }, 0);
  tl.set(root, { clipPath: 'none' }, 0.42);
  const band = el('div', 'abs', root); css(band, { top: '-400px', height: '2800px', width: '140px', left: '0', background: 'linear-gradient(90deg, rgba(245,216,152,0), #f5d898, rgba(245,216,152,0))', transform: 'rotate(18deg)', boxShadow: '0 0 80px #f5d898' });
  tl.fromTo(band, { x: -300 }, { x: 1500, duration: 0.42, ease: 'power3.inOut' }, 0);
  sfx('whoosh', 35.85, { len: 0.45, gain: 0.6 });

  // carrousel 3D de pages
  const cst = el('div', 'abs', root); css(cst, { inset: 0, perspective: '1600px', perspectiveOrigin: '50% 50%' });
  const car = el('div', 'abs', cst); css(car, { left: '540px', top: '1230px', width: 0, height: 0, transformStyle: 'preserve-3d' });
  const IDS = ['full-plage', 'love', 'g-duo', 'a-frame', 'meteo', 'trio', 'g-frame', 'full-colline', 'film', 'a-grid', 'notep-cierge', 'g-strip'];
  const R = 760, SZ = 380;
  IDS.forEach((id, i) => {
    const a = i / IDS.length * 360;
    const f = el('div', 'abs', car); css(f, { left: -SZ / 2 + 'px', top: -SZ / 2 + 'px', width: SZ + 'px', height: SZ + 'px', transform: `rotateY(${a}deg) translateZ(${R}px)`, boxShadow: '0 20px 50px rgba(0,0,0,.5)' });
    img(PAGE(id), '', f).style.cssText = 'width:100%;height:100%;display:block';
  });
  gsap.set(car, { rotationX: -12, z: -260 });
  tl.fromTo(car, { rotationY: 20 }, { rotationY: -70, duration: S.end - S.start, ease: 'none' }, 0);
  const veil = el('div', 'abs', root); css(veil, { inset: 0, background: 'linear-gradient(180deg, rgba(11,8,6,.92) 0%, rgba(11,8,6,.9) 46%, rgba(11,8,6,.45) 62%, rgba(11,8,6,.55) 85%, rgba(11,8,6,.85) 100%)' });

  // texte
  const lead = el('div', 'center disp shadow-txt', root, 'Le cadeau parfait pour…');
  css(lead, { top: '560px', font: 'italic 400 88px/1.1 var(--display)', color: 'rgba(242,235,224,.92)' });
  tl.fromTo(lead, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, L(36.05));
  const win = el('div', 'abs', root); css(win, { left: 0, right: 0, top: '700px', height: '190px', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)', maskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)' });
  const list = el('div', 'abs', win); css(list, { left: 0, right: 0, top: 0 });
  const WORDS = ['la Saint-Valentin 💘', 'vos 1 an 🥂', 'un anniversaire 🎂', 'un mariage 💍', 'Noël 🎄', 'dire je t’aime ❤️'];
  WORDS.forEach((w, i) => {
    const d = el('div', 'disp shadow-txt', list, i === WORDS.length - 1 ? `<em class="gold">${w}</em>` : w);
    css(d, { height: '190px', lineHeight: '190px', textAlign: 'center', font: i === WORDS.length - 1 ? 'italic 700 118px/190px var(--display)' : '700 112px/190px var(--display)', color: '#f7efe2', whiteSpace: 'nowrap' });
  });
  gsap.set(list, { y: 190 });
  const STEPS = [36.25, 36.75, 37.25, 37.5, 37.75, 38.0];
  STEPS.forEach((t, i) => {
    const last = i === STEPS.length - 1;
    tl.to(list, { y: -i * 190, duration: last ? 0.45 : 0.2, ease: last ? 'back.out(1.6)' : 'power3.inOut' }, L(t));
    tl.fromTo(list, { filter: 'blur(5px)' }, { filter: 'blur(0px)', duration: last ? 0.3 : 0.18, immediateRender: false }, L(t + 0.02));
    sfx(last ? 'ding' : 'tick', t + (last ? 0.12 : 0.05), { gain: last ? 0.7 : 0.45 });
  });
  // cœurs
  burst({ t: 38.12, x: 540, y: 800, n: 90, speed: [300, 1300], life: [0.7, 1.6], size: [3, 7], gravity: 250, drag: 2.2, colors: ['rgba(255,110,140,A)', 'rgba(255,170,190,A)', 'rgba(255,220,170,A)', 'rgba(232,90,120,A)'], seed: 97, spread: 300 });
  const hr = rng(13);
  for (let i = 0; i < 14; i++) {
    const h = el('div', 'abs', root, ['❤️', '💛', '🤍'][i % 3]); css(h, { left: 120 + hr() * 840 + 'px', top: '1500px', fontSize: 40 + hr() * 50 + 'px' });
    gsap.set(h, { opacity: 0 });
    const t = 38.1 + hr() * 0.9;
    tl.fromTo(h, { opacity: 0, y: 0, x: 0, rotation: (hr() - 0.5) * 40 }, { opacity: 1, y: -700 - hr() * 500, x: (hr() - 0.5) * 200, duration: 1.8, ease: 'power1.out', immediateRender: false }, L(t));
    tl.to(h, { opacity: 0, duration: 0.5 }, L(t + 1.2));
  }
  sfx('shimmer', 38.1, { gain: 0.5, dur: 1.5 });
  // sortie : zoom à travers le mot
  tl.to([lead, win], { scale: 1.8, opacity: 0, duration: 0.35, ease: 'power3.in' }, L(39.65));
  sfx('whoosh', 39.6, { len: 0.4, gain: 0.6, rise: true });
});
