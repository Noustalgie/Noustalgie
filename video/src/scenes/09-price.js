/* 39,85 → 43,15 s — Prix : « Aperçu 100 % gratuit », trois formules, livraison offerte */
scene('price', 39.85, 43.15, (root, tl, S) => {
  const L = t => t - S.start;
  el('div', 'glowbg', root);
  const rays = el('div', 'rays', root); css(rays, { top: '58%' });
  tl.fromTo(rays, { rotation: 0, opacity: 0 }, { rotation: 25, opacity: 0.8, duration: S.end - S.start, ease: 'none' }, 0);
  tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);

  const h1 = el('div', 'center disp shadow-txt', root, 'Aperçu');
  css(h1, { top: '215px', font: 'italic 500 110px/1 var(--display)', color: 'var(--gold2)' });
  const h2 = el('div', 'center disp shadow-txt', root, '100 % gratuit');
  css(h2, { top: '335px', font: '900 136px/1 var(--display)', color: '#f7efe2', fontVariantNumeric: 'lining-nums' });
  tl.fromTo(h1, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }, L(40.0));
  tl.fromTo(h2, { opacity: 0, scale: 1.7, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.38, ease: 'expo.out' }, L(40.05));
  sfx('drop', 40.0, { gain: 0.85, b: true });
  shake(40.05, 16, 0.35, 31);
  flash(40.0, 0.6, 0.03, 0.35);
  burst({ t: 40.05, x: 540, y: 400, n: 90, speed: [400, 1500], life: [0.6, 1.4], size: [2, 5], gravity: 500, drag: 2.5, colors: GOLDS, seed: 101, spread: 700, spreadY: 120 });

  // les trois formules (prix du site)
  const CARDS = [['Essentiel', '24', 'dès 14 photos', '39,99 €', 'PDF 14,99 €'], ['Classique', '36', 'dès 20 photos', '49,99 €', 'PDF 19,99 €'], ['Premium', '50', 'dès 31 photos', '69,99 €', 'PDF 24,99 €']];
  const CW = 284, CH = 520, GAP = 18, X0 = 62, Y0 = 600; // décalé à gauche : la colonne de boutons TikTok occupe la droite
  const cards = CARDS.map(([tier, n, ph, price, pdf], i) => {
    const feat = i === 1;
    const c = el('div', 'abs', root);
    css(c, { left: X0 + i * (CW + GAP) + 'px', top: Y0 + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '26px', padding: '34px 20px', textAlign: 'center',
      background: feat ? 'linear-gradient(180deg, #221a12, #120d09)' : '#f6f1e8', color: feat ? '#f2ebe0' : '#1c1a18',
      border: feat ? '3px solid #e8be7a' : '1px solid rgba(0,0,0,.08)', boxShadow: feat ? '0 30px 80px rgba(0,0,0,.6), 0 0 60px rgba(232,190,122,.25)' : '0 24px 60px rgba(0,0,0,.45)' });
    c.innerHTML = `${feat ? '<div style="position:absolute;top:-24px;left:50%;transform:translateX(-50%);background:#e8be7a;color:#1c1a18;font:800 22px/1 var(--ui);letter-spacing:.12em;padding:12px 20px;border-radius:999px;white-space:nowrap">⭐ POPULAIRE</div>' : ''}
      <div style="font:700 22px/1 var(--ui);letter-spacing:.2em;text-transform:uppercase;opacity:.65">${tier}</div>
      <div style="font:900 150px/1 var(--display);margin-top:26px;font-variant-numeric:lining-nums;color:${feat ? '#f5d898' : '#1c1a18'}">${n}</div>
      <div style="font:600 26px/1 var(--ui);opacity:.7;margin-top:6px">pages</div>
      <div style="font:500 22px/1 var(--ui);opacity:.55;margin-top:10px">${ph}</div>
      <div style="height:1px;background:${feat ? 'rgba(232,190,122,.35)' : 'rgba(0,0,0,.12)'};margin:26px 10px"></div>
      <div style="font:600 22px/1 var(--ui);opacity:.65">Livre</div>
      <div style="font:800 52px/1.1 var(--ui);margin-top:6px;letter-spacing:-.01em">${price}</div>
      <div style="font:500 22px/1 var(--ui);opacity:.55;margin-top:12px">${pdf}</div>`;
    gsap.set(c, { opacity: 0 });
    return c;
  });
  const ORDER = [0, 2, 1];
  ORDER.forEach((i, j) => {
    const t = 40.5 + j * 0.16, feat = i === 1;
    tl.fromTo(cards[i], { opacity: 1, y: 900, rotation: (i - 1) * 25, scale: 0.8 }, { y: feat ? -36 : 0, rotation: (i - 1) * 3, scale: feat ? 1.1 : 0.96, duration: 0.55, ease: 'back.out(1.3)', immediateRender: false }, L(t));
    sfx('swish', t, { gain: 0.35 });
  });
  // reflet sur la formule populaire
  const shine = el('div', 'abs', cards[1]); css(shine, { inset: 0, borderRadius: '24px', background: 'linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,240,210,.35) 50%, rgba(255,255,255,0) 65%)' });
  tl.fromTo(shine, { xPercent: -120 }, { xPercent: 120, duration: 0.7, ease: 'power2.inOut' }, L(41.6));
  sfx('shimmer', 41.6, { gain: 0.4, dur: 0.8 });

  const ship = el('div', 'pillbox', root, '🎁 Livraison offerte · 🔒 Paiement sécurisé');
  css(ship, { left: '50%', top: '1210px', transform: 'translateX(-50%)', font: '700 34px/1 var(--ui)', padding: '20px 32px' });
  gsap.set(ship, { opacity: 0 });
  tl.fromTo(ship, { opacity: 0, y: 40, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, L(41.2));
  sfx('pop', 41.2, { gain: 0.45 });

  // sortie
  tl.to(cards, { y: '-=1300', rotation: (i) => (i - 1) * -12, duration: 0.45, ease: 'power3.in', stagger: 0.04 }, L(42.65));
  tl.to([h1, h2, ship], { opacity: 0, y: -60, duration: 0.3, ease: 'power2.in' }, L(42.7));
  leak(42.8, 0.8, 0.7, [20, 80], [80, 20]);
  sfx('whoosh', 42.65, { len: 0.45, gain: 0.6 });
});
