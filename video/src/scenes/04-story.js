/* 13,9 → 22,35 s — Étape 2 : « Votre histoire s'écrit » puis le mur de pages composées */
scene('story', 13.9, 22.35, (root, tl, S) => {
  const L = t => t - S.start;
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 85% 55% at 50% 55%, #241a12, #0b0806 75%)' });
  tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0);
  tl.to(FXS, { dust: 0.6, duration: 0.5 }, 0);
  const big = el('div', 'bigdigit', root, '2'); css(big, { left: '430px', top: '360px' });
  tl.fromTo(big, { x: 100, opacity: 0 }, { x: -40, opacity: 1, duration: 3.5, ease: 'none' }, L(14.0));
  tl.to(big, { opacity: 0, duration: 0.4 }, L(17.0));

  const H = stepHead(root, 2, 'Votre histoire <em>s’écrit</em>', 'Avec vos prénoms et vos souvenirs.');
  css(H.title, { fontSize: '100px' });
  stepHeadIn(tl, H, L(14.05));
  sfx('swish', 14.05, { gain: 0.4 });
  sfx('impact', 13.95, { gain: 0.45, soft: true });

  // ── La page « Nuit » qui s'écrit ──
  const PG = 760, top = 600;
  const page = el('div', 'abs', root);
  css(page, { left: (1080 - PG) / 2 + 'px', top: top + 'px', width: PG + 'px', height: PG + 'px', background: '#141211', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(201,160,90,.12)', transformOrigin: '50% 50%' });
  const num = el('div', 'abs disp', page, 'I'); css(num, { left: '56px', top: '34px', font: 'italic 400 136px/1 var(--display)', color: '#c9a05a' });
  const title = el('div', 'abs disp', page); css(title, { left: '62px', top: '200px', font: 'italic 400 66px/1.1 var(--display)', color: '#efe9e0' });
  const body = el('div', 'abs', page); css(body, { left: '62px', top: '305px', width: '640px', font: '400 31px/1.6 var(--body)', color: 'rgba(239,233,224,.92)' });
  const TITLE = 'La rencontre';
  const BODY = 'C’était un mardi de novembre, sous une pluie fine. Hugo cherchait ses clés, Léa cherchait un taxi. Ils ont partagé le même parapluie… et n’en ont plus jamais changé.';
  const mk = (node, txt) => [...txt].map(c => { const s = el('span', '', node); s.textContent = c; return s; });
  const tch = mk(title, TITLE), bch = mk(body, BODY);
  const pr = page.getBoundingClientRect();
  const posOf = s => { const r = s.getBoundingClientRect(); return [r.right - pr.left, r.top - pr.top, r.height]; };
  const tpos = tch.map(posOf), bpos = bch.map(posOf);
  [...tch, ...bch].forEach(s => { s.style.visibility = 'hidden'; });
  const caret = el('div', 'abs', page); css(caret, { width: '4px', background: '#e8be7a', boxShadow: '0 0 14px #e8be7a', borderRadius: '2px', opacity: 0 });
  gsap.set(num, { opacity: 0 });
  tl.fromTo(page, { opacity: 0, scale: 0.85, rotationX: 25, y: 60 }, { opacity: 1, scale: 1, rotationX: 0, y: 0, duration: 0.55, ease: 'expo.out', immediateRender: false }, L(14.15));
  tl.fromTo(num, { opacity: 0, x: -30, filter: 'blur(10px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, immediateRender: false }, L(14.35));
  const typeRun = (chars, pos, t0, cps, glyphH) => {
    chars.forEach((s, i) => {
      const t = t0 + i / cps;
      tl.set(s, { visibility: 'visible', color: '#f5d898', textShadow: '0 0 18px rgba(245,216,152,.9)' }, L(t));
      tl.to(s, { color: 'rgba(239,233,224,.92)', textShadow: '0 0 0px rgba(245,216,152,0)', duration: 0.5, ease: 'power1.out' }, L(t + 0.02));
      const [x, y, h] = pos[i];
      tl.set(caret, { x: x + 3, y: y + h * 0.12, height: h * 0.78 }, L(t));
    });
    return t0 + chars.length / cps;
  };
  tl.set(caret, { opacity: 1 }, L(14.5));
  const tEnd = typeRun(tch, tpos, 14.55, 26);
  const bEnd = typeRun(bch, bpos, tEnd + 0.08, 76);
  tl.to(caret, { opacity: 0, duration: 0.1, repeat: 3, yoyo: true }, L(bEnd + 0.05));
  tl.set(caret, { opacity: 0 }, L(bEnd + 0.5));
  sfx('typing', 14.55, { dur: bEnd - 14.55 });

  // Souvenirs qui « nourrissent » le texte : ils apparaissent sous le titre puis glissent
  // dans le coin haut droit de la page (zone vide), sans jamais masquer le texte qui s'écrit
  const WAVES = [[14.3, ['Léa', 'Hugo', 'Novembre 2019']], [15.45, ['le parapluie ☂️', 'nos fous rires', 'Lisbonne']]];
  WAVES.forEach(([t0, words], w) => {
    const pills = words.map(txt => { const c = el('div', 'pillbox', root, `<span class="dot"></span>${txt}`); css(c, { left: '0', top: '488px', font: '600 30px/1 var(--ui)', padding: '14px 24px' }); return c; });
    const widths = pills.map(c => c.getBoundingClientRect().width), gap = 18;
    let x = (1080 - (widths.reduce((s, v) => s + v, 0) + gap * (pills.length - 1))) / 2;
    pills.forEach((c, k) => {
      c.style.left = x + 'px';
      const cx = x + widths[k] / 2; x += widths[k] + gap;
      const tIn = t0 + k * 0.1, tOut = t0 + 0.7 + k * 0.08, tx = 760 + (k - 1) * 50, ty = 690;
      gsap.set(c, { opacity: 0 });
      tl.fromTo(c, { opacity: 0, scale: 0.3, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(2.2)', immediateRender: false }, L(tIn));
      tl.to(c, { x: tx - cx, y: ty - 488, scale: 0.25, opacity: 0, duration: 0.45, ease: 'power2.in' }, L(tOut));
      burst({ t: tOut + 0.42, x: tx, y: ty + 20, n: 26, speed: [120, 420], life: [0.4, 0.9], size: [2, 4], gravity: -60, drag: 3, colors: GOLDS, seed: 300 + w * 10 + k });
      sfx('pop', tIn, { gain: 0.25, pitch: 1.2 + k * 0.1 });
      sfx('sparkle', tOut + 0.38, { gain: 0.25 });
    });
  });

  // Pastille de progression
  const prog = el('div', 'pillbox', root); css(prog, { left: '50%', top: '1385px', font: '600 32px/1 var(--ui)', padding: '16px 30px', transform: 'translateX(-50%)' });
  prog.innerHTML = '<span style="color:#f5d898">✦</span><span>L’IA écrit votre histoire…</span>';
  const pct = el('span', '', prog); css(pct, { position: 'relative', display: 'inline-block', width: '92px', height: '32px', color: '#f5d898' });
  const PCT = ['8 %', '23 %', '41 %', '57 %', '72 %', '88 %', '100 %'].map((p, i) => { const s = el('span', 'abs', pct, p); css(s, { right: 0, top: 0, opacity: i ? 0 : 1 }); return s; });
  gsap.set(prog, { opacity: 0 });
  tl.fromTo(prog, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, L(14.4));
  PCT.forEach((s, i) => { if (!i) return; const t = 14.6 + i * 0.38; tl.set(PCT[i - 1], { opacity: 0 }, L(t)); tl.set(s, { opacity: 1 }, L(t)); });
  tl.to(prog, { opacity: 0, y: 30, duration: 0.3 }, L(17.15));

  // ── Mur de pages : chaque page est composée pour vous ──
  const TL = 272, GAP = 20, GX = (1080 - (3 * TL + 2 * GAP)) / 2, GY = 560;
  const wallW = el('div', 'abs', root); css(wallW, { left: 0, top: 0, width: '1080px', height: '1920px', perspective: '1800px', transformOrigin: `540px ${GY + TL * 1.5 + GAP}px` });
  const IDS = ['chap1', 'love', 'full-colline', 'film', 'meteo', 'g-duo', 'full-plage', 'wish', 'a-frame'];
  const tiles = IDS.map((id, i) => {
    const t = el('div', 'abs', wallW);
    css(t, { left: GX + (i % 3) * (TL + GAP) + 'px', top: GY + Math.floor(i / 3) * (TL + GAP) + 'px', width: TL + 'px', height: TL + 'px', boxShadow: '0 20px 50px rgba(0,0,0,.55)', backfaceVisibility: 'hidden' });
    const im = img(PAGE(id), '', t); css(im, { width: '100%', height: '100%', display: 'block' });
    const dim = el('div', 'abs', t); css(dim, { inset: 0, background: '#0b0806', opacity: 0 });
    gsap.set(t, { opacity: 0 });
    return { t, dim };
  });
  // la page écrite rétrécit et devient la première vignette
  const T5 = 17.1;
  const k = TL / PG;
  tl.to(page, { x: GX - (1080 - PG) / 2 - (PG - TL) / 2, y: GY - top - (PG - TL) / 2, scale: k, duration: 0.55, ease: 'power3.inOut' }, L(T5));
  tl.set(tiles[0].t, { opacity: 1 }, L(T5 + 0.55));
  tl.set(page, { opacity: 0 }, L(T5 + 0.58));
  sfx('whoosh', T5, { len: 0.5, gain: 0.5 });
  // nouveau titre
  tl.to(H.h, { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' }, L(T5));
  const H2 = el('div', 'step-head', root);
  const h2t = el('h2', 'step-title shadow-txt', H2, 'Chaque page<br><em>est unique</em>'); css(h2t, { marginTop: '0', fontSize: '104px' });
  css(H2, { top: '250px' });
  gsap.set(H2, { opacity: 0 });
  tl.set(H2, { opacity: 1 }, L(T5 + 0.25));
  const w2 = splitWords(h2t);
  tl.fromTo(w2, { opacity: 0, y: 80, rotationX: -70 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.07, ease: 'expo.out', immediateRender: false }, L(T5 + 0.25));
  const ORDER = [4, 1, 3, 5, 7, 2, 6, 8];
  ORDER.forEach((ti, j) => {
    const t = 17.5 + j * 0.25;
    tl.fromTo(tiles[ti].t, { opacity: 1, rotationY: -100, scale: 0.6, z: -200 }, { rotationY: 0, scale: 1, z: 0, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false }, L(t));
    sfx('tile', t, { gain: 0.35, pitch: 1 + j * 0.05 });
  });
  // étiquettes des pages surprises
  const LABELS = [['Ce que j’aime chez toi ❤️', 1, 18.0], ['Si notre histoire était un film 🎬', 3, 18.5], ['Bulletin météo de notre amour ☀️', 4, 19.0]];
  const labs = LABELS.map(([txt, ti, t]) => {
    const c = el('div', 'pillbox', root, txt);
    const ty = GY + Math.floor(ti / 3) * (TL + GAP) + TL - 26;
    css(c, { left: '0', top: ty + 'px', font: '700 30px/1 var(--ui)', padding: '14px 24px', background: 'rgba(245,216,152,.95)', color: '#1c1a18', border: 'none' });
    const w = c.getBoundingClientRect().width, cx = GX + (ti % 3) * (TL + GAP) + TL / 2;
    c.style.left = Math.max(40, Math.min(1080 - 140 - w, cx - w / 2)) + 'px';
    gsap.set(c, { opacity: 0 });
    tl.fromTo(c, { opacity: 0, scale: 0.3, rotation: -8 }, { opacity: 1, scale: 1, rotation: (ti % 2 ? 2 : -2), duration: 0.45, ease: 'back.out(2.5)', immediateRender: false }, L(t));
    sfx('pop', t, { gain: 0.45 });
    return c;
  });
  // zoom sur le bulletin météo
  const T6 = 19.5;
  const mx = GX + TL * 1.5 + GAP, my = GY + TL * 1.5 + GAP;
  tl.to(labs, { opacity: 0, scale: 0.8, duration: 0.25 }, L(T6));
  tl.to(H2, { opacity: 0, y: -40, duration: 0.3 }, L(T6));
  tl.to(wallW, { scale: 2.75, x: 540 - mx, y: 860 - my, duration: 0.7, ease: 'power3.inOut' }, L(T6));
  tiles.forEach((T, i) => { if (i !== 4) tl.to(T.dim, { opacity: 0.75, duration: 0.5 }, L(T6)); });
  sfx('whoosh', T6, { len: 0.6, gain: 0.55 });
  const quote = el('div', 'abs', root);
  css(quote, { left: '60px', right: '60px', top: '1290px', padding: '34px 40px', background: 'rgba(14,11,9,.88)', border: '1.5px solid rgba(232,190,122,.5)', borderRadius: '28px', textAlign: 'center', boxShadow: '0 30px 80px rgba(0,0,0,.6)' });
  quote.innerHTML = '<div style="font:700 26px/1 var(--ui);letter-spacing:.2em;color:#e8be7a;text-transform:uppercase;margin-bottom:18px">☀️ Bulletin météo de notre amour</div><div style="font:italic 500 58px/1.22 var(--display);color:#f7efe2">« 100 % de chances de câlins le dimanche matin »</div>';
  gsap.set(quote, { opacity: 0 });
  tl.fromTo(quote, { opacity: 0, y: 80, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out', immediateRender: false }, L(T6 + 0.45));
  sfx('pop', T6 + 0.5, { gain: 0.4 });

  // Sortie : glissement vers le haut
  const T7 = 21.95;
  tl.to([wallW, quote], { y: '-=1900', duration: 0.4, ease: 'power3.in' }, L(T7));
  tl.set(root, { filter: 'url(#mblurY)' }, L(T7 + 0.15));
  sfx('whoosh', T7, { len: 0.45, gain: 0.7 });
});
