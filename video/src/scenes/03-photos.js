/* 7,95 → 14,3 s — Étape 1 : « Tes photos » (formulaire du duo puis import des photos dans l'appli) */
scene('photos', 7.95, 14.3, (root, tl, S) => {
  const L = t => t - S.start;
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 90% 55% at 50% 62%, #2b1e13, #0e0b09 72%)' });
  const big = el('div', 'bigdigit', root, '1'); css(big, { left: '470px', top: '330px' });
  const H = stepHead(root, 1, 'Tes <em>photos</em>', 'Importe-les, parle-nous de vous deux.');

  // ── Téléphone et vues (construits avant toute transformation pour mesurer les positions) ──
  const st = el('div', 'abs', root); css(st, { inset: 0, perspective: '2400px', perspectiveOrigin: '50% 45%' });
  const ZOOM = 1.85;
  const P = makePhone(st, { zoom: ZOOM });
  css(P.pos, { left: (1080 - 416 * ZOOM) / 2 + 'px', top: '560px' });

  // Vue 1 : le duo
  const v1 = el('div', 'abs', P.app); css(v1, { left: 0, top: 0, width: '390px' });
  el('div', 'apphead', v1, '<span class="logo">Noustalgie</span><span class="pill">FR ▾</span>');
  const w1 = el('div', 'wiz', v1);
  el('div', 'wiz-top', w1, '<span>Votre duo</span><small>1 / 5</small>');
  el('div', 'wiz-bar', w1, '<i></i>');
  const card = el('div', 'card', w1);
  el('div', 'lab', card, 'Votre couple');
  el('h4', '', card, 'Parlons de vous deux');
  el('div', 'hint', card, 'Ces informations personnalisent chaque ligne de votre livre.');
  const field = (label, ph) => { const f = el('div', 'field', card); el('label', '', f, label); const i = el('div', 'inp', f); const v = el('span', '', i); const p = el('span', 'ph', i, ph); return { f, i, v, ph: p }; };
  const f1 = field('Prénom 1', 'Votre prénom'), f2 = field('Prénom 2', 'Votre prénom'), f3 = field('Ensemble depuis', 'Mois et année');
  const fo = el('div', 'field', card); el('label', '', fo, 'Occasion du livre');
  const chips = el('div', 'chips', fo);
  const chipEls = ['Surprise romantique', 'Saint-Valentin', 'Anniversaire de couple', 'Noël', 'Mariage', 'Cadeau pour un proche'].map(c => el('span', 'chip', chips, c));
  const next = el('div', 'btn-dark', w1, 'Suivant — Nos photos →');

  // Vue 2 : les photos
  const v2 = el('div', 'abs', P.app); css(v2, { left: 0, top: 0, width: '390px', height: '790px', background: 'var(--paper)' });
  el('div', 'apphead', v2, '<span class="logo">Noustalgie</span><span class="pill">FR ▾</span>');
  const w2 = el('div', 'wiz', v2);
  el('div', 'wiz-top', w2, '<span>Vos photos</span><small>2 / 5</small>');
  el('div', 'wiz-bar', w2, '<i style="width:40%"></i>');
  const h3 = el('div', '', w2, 'Vos photos ensemble'); css(h3, { font: '400 23px/1.2 var(--display)', margin: '4px 0 12px' });
  const grid = el('div', '', w2); css(grid, { position: 'relative', height: '349px' });
  const TS = 113, TG = 5, PHOTOS = ['plage', 'colline', 'ville', 'lac', 'lavande', 'etoiles', 'paris', 'granderoue', 'route'];
  const tiles = PHOTOS.map((n, i) => {
    const t = el('div', 'abs', grid);
    css(t, { left: (i % 3) * (TS + TG) + 'px', top: Math.floor(i / 3) * (TS + TG) + 'px', width: TS + 'px', height: TS + 'px', border: '1.5px dashed #cfc8bd', borderRadius: '6px', overflow: 'hidden', background: '#f3f0ea' });
    const im = img('assets/thumbs/' + n + '.jpg', '', t); css(im, { width: '100%', height: '100%', objectFit: 'cover', opacity: 0 });
    const fl = el('div', 'abs', t); css(fl, { inset: 0, background: '#fff', opacity: 0 });
    return { t, im, fl };
  });
  const badge = el('div', 'abs', tiles[0].t, '★ Couverture'); css(badge, { left: '6px', top: '6px', padding: '4px 7px', borderRadius: '999px', background: 'rgba(28,26,24,.82)', color: '#fff', font: '600 10px/1 var(--ui)', opacity: 0 });
  const plus = el('div', 'abs', tiles[8].t, '+15'); css(plus, { inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(28,26,24,.62)', color: '#fff', font: '700 30px/1 var(--ui)', opacity: 0 });
  const drop = el('div', 'abs', grid, '<div style="font-size:30px">📷</div><div>Glissez vos photos ici</div>');
  css(drop, { inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', font: 'italic 16px/1.3 var(--display)', color: '#6d675f', background: 'rgba(250,249,247,.7)' });
  const count = el('div', '', w2); css(count, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 8px', font: '600 14px/1 var(--ui)', position: 'relative', height: '16px' });
  const cnums = ['0 photo', ...PHOTOS.map((_, i) => (i + 1) + (i ? ' photos' : ' photo')), '24 photos ✓'].map((txt, i) => { const s = el('span', 'abs', count, txt); css(s, { left: 0, top: 0, opacity: i ? 0 : 1, color: i === 10 ? '#2f7d4f' : 'inherit', transformOrigin: '0% 50%' }); return s; });
  const cmin = el('span', 'abs', count, 'minimum 20'); css(cmin, { right: 0, top: 0, color: 'var(--mut)', fontWeight: 500 });
  const pbar = el('div', '', w2); css(pbar, { height: '6px', borderRadius: '3px', background: '#e7e2da', overflow: 'hidden' });
  const pfill = el('div', '', pbar); css(pfill, { height: '100%', width: '0%', background: 'var(--ink)', borderRadius: '3px' });
  const tiers = el('div', '', w2); css(tiers, { display: 'flex', gap: '6px', marginTop: '14px' });
  const tierEls = [['24', '39,99€'], ['36 ⭐', '49,99€'], ['50', '69,99€']].map(([p, e]) => {
    const d = el('div', '', tiers, `<div style="font:700 20px/1 var(--display)">${p}</div><div style="font:500 10px/1.4 var(--ui);opacity:.7">pages</div><div style="font:600 13px/1 var(--ui);margin-top:4px">${e}</div>`);
    css(d, { flex: 1, textAlign: 'center', border: '1px solid #ddd6cc', padding: '9px 4px', background: '#fff', color: 'var(--ink)' });
    return d;
  });
  const create = el('div', 'btn-dark', w2, 'Créer notre histoire →');

  // Écran de création (sombre)
  const gen = el('div', 'abs', P.scr); css(gen, { inset: 0, background: '#141211', zIndex: 45, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', color: '#efe9e0', opacity: 0 });
  el('div', '', gen, '<span style="font:400 30px/1 var(--display)">Nous<i style="color:#c9a05a">talgie</i></span>');
  el('div', '', gen, '<span style="font:italic 15px/1 var(--display);opacity:.7">Création de votre album…</span>');

  // Mesures (px CSS de l'écran), avant les transformations 3D
  const sr = P.scr.getBoundingClientRect(), kz = sr.width / 390;
  const pos = e => { const a = e.getBoundingClientRect(); return [(a.left + a.width / 2 - sr.left) / kz, (a.top + a.height / 2 - sr.top) / kz]; };
  const chipP = pos(chipEls[2]), nextP = pos(next), createP = pos(create);
  const gr = grid.getBoundingClientRect(), gxx = (gr.left - sr.left) / kz, gy = (gr.top - sr.top) / kz;

  // ── Animations ──
  tl.fromTo(big, { x: 120, opacity: 0 }, { x: -60, opacity: 1, duration: S.end - S.start, ease: 'none' }, 0);
  tl.fromTo(root, { x: 1300 }, { x: 0, duration: 0.34, ease: 'power3.out' }, 0);
  tl.set(root, { filter: 'url(#mblurX)' }, 0);
  tl.set(root, { filter: 'none' }, 0.26);
  stepHeadIn(tl, H, L(8.1));
  sfx('swish', 8.1, { gain: 0.4 });

  gsap.set(v2, { x: 390 });
  gsap.set(P.pos, { rotationY: -14, rotationX: 7, rotationZ: 1.5, transformOrigin: '50% 30%' });
  tl.fromTo(P.pos, { y: 1100, rotationX: 38 }, { y: 0, rotationX: 7, duration: 0.7, ease: 'expo.out' }, L(8.2));
  tl.to(P.pos, { rotationY: -6, rotationZ: 0.5, duration: 13.4 - 8.9, ease: 'sine.inOut' }, L(8.9));
  sfx('whoosh', 8.2, { len: 0.45, gain: 0.45 });

  const typeField = (F, text, t, cps) => {
    tl.set(F.i, { attr: { class: 'inp focus' } }, L(t - 0.12));
    tl.set(F.ph, { display: 'none' }, L(t - 0.02));
    const end = typeText(tl, F.v, text, L(t), cps);
    tl.set(F.i, { attr: { class: 'inp' } }, end + 0.12);
    sfx('keys', t, { dur: text.length / cps, n: text.length });
  };
  typeField(f1, 'Léa', 8.62, 11);
  typeField(f2, 'Hugo', 8.98, 12);
  typeField(f3, 'Novembre 2019', 9.36, 24);
  tl.to(v1, { y: -150, duration: 0.45, ease: 'power3.inOut' }, L(9.62));
  tapAt(tl, P, chipP[0], chipP[1] - 150, L(10.0), 10.0);
  tl.set(chipEls[2], { attr: { class: 'chip on' } }, L(10.0));
  tl.fromTo(chipEls[2], { scale: 1 }, { scale: 1.12, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, L(10.0));
  tapAt(tl, P, nextP[0], nextP[1] - 150, L(10.36), 10.36);
  tl.to(next, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, L(10.32));

  tl.to(v1, { x: -390, duration: 0.38, ease: 'power3.inOut' }, L(10.48));
  tl.to(v2, { x: 0, duration: 0.38, ease: 'power3.inOut' }, L(10.48));
  sfx('swipe', 10.48, { gain: 0.4 });
  tl.to(drop, { opacity: 0, duration: 0.25 }, L(10.9));

  // Les photos volent jusque dans la grille (calque aligné sur l'écran, hors du masque arrondi)
  const fly = el('div', 'abs', P.pos);
  css(fly, { left: 13 * ZOOM + 'px', top: 13 * ZOOM + 'px', width: '390px', height: '844px', zoom: ZOOM, pointerEvents: 'none' });
  const fr = rng(31);
  const FROM = [[-420, 120], [560, -40], [-380, 520], [600, 420], [-300, -260], [620, 760], [-460, 820], [540, -300], [180, 1100]];
  PHOTOS.forEach((n, i) => {
    const t0 = 10.55 + i * 0.125, land = t0 + 0.45;
    const c = el('div', 'abs', fly); css(c, { left: 0, top: 0, width: TS + 'px', height: TS + 'px', padding: '4px', background: '#fff', borderRadius: '4px', boxShadow: '0 18px 40px rgba(0,0,0,.35)', opacity: 0 });
    const im = img('assets/thumbs/' + n + '.jpg', '', c); css(im, { width: '100%', height: '100%', objectFit: 'cover', display: 'block' });
    const tx = gxx + (i % 3) * (TS + TG), ty = gy + Math.floor(i / 3) * (TS + TG);
    tl.fromTo(c, { opacity: 1, x: FROM[i][0], y: FROM[i][1], rotation: (fr() - 0.5) * 70, scale: 2.4 }, { x: tx, y: ty, rotation: 0, scale: 1, duration: land - t0, ease: 'power3.out', immediateRender: false }, L(t0));
    tl.set(c, { opacity: 0 }, L(land));
    tl.set(tiles[i].im, { opacity: 1 }, L(land));
    tl.set(tiles[i].t, { borderStyle: 'solid', borderColor: 'rgba(0,0,0,0)' }, L(land));
    tl.fromTo(tiles[i].fl, { opacity: 0.85 }, { opacity: 0, duration: 0.3, immediateRender: false }, L(land));
    tl.fromTo(tiles[i].t, { scale: 1.12 }, { scale: 1, duration: 0.35, ease: 'back.out(3)', immediateRender: false }, L(land));
    tl.set(cnums[i], { opacity: 0 }, L(land));
    tl.set(cnums[i + 1], { opacity: 1 }, L(land));
    tl.to(pfill, { width: Math.round((i + 1) / 24 * 100) + '%', duration: 0.15 }, L(land));
    sfx('pop', land, { gain: 0.35, pitch: 1 + i * 0.06 });
    if (i === 0) tl.fromTo(badge, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)', immediateRender: false }, L(land + 0.05));
  });
  const TOK = 12.25;
  tl.fromTo(plus, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, L(TOK));
  tl.set(cnums[9], { opacity: 0 }, L(TOK));
  tl.fromTo(cnums[10], { opacity: 1, scale: 1 }, { scale: 1.25, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, L(TOK));
  tl.to(pfill, { width: '100%', backgroundColor: '#2f7d4f', duration: 0.3 }, L(TOK));
  sfx('success', TOK, { gain: 0.5 });
  tl.to(v2, { y: -175, duration: 0.45, ease: 'power3.inOut' }, L(12.45));
  tl.set(tierEls[1], { backgroundColor: '#1c1a18', color: '#ffffff', borderColor: '#1c1a18' }, L(12.7));
  tl.fromTo(tierEls[1], { scale: 1 }, { scale: 1.08, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, L(12.7));
  tapAt(tl, P, createP[0], createP[1] - 175, L(13.0), 13.0);
  tl.to(create, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, L(12.96));

  // Plongée dans le téléphone
  tl.to(gen, { opacity: 1, duration: 0.3 }, L(13.2));
  tl.set(P.sb, { color: '#efe9e0', backgroundColor: '#141211' }, L(13.3));
  tl.to(P.pos, { scale: 4.2, rotationY: 0, rotationX: 0, rotationZ: 0, y: -260, duration: 0.85, ease: 'power3.in' }, L(13.45));
  tl.to([H.h, big], { opacity: 0, y: -80, duration: 0.4, ease: 'power2.in' }, L(13.45));
  sfx('whoosh', 13.5, { len: 0.8, gain: 0.8, rise: true });
});
