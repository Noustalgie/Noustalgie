/* 21,95 → 28,15 s — Étape 3 : « Tu modifies tout » (aperçu, légende, mise en page) puis « Tu paies seulement si tu adores » */
scene('preview', 21.95, 28.15, (root, tl, S) => {
  const L = t => t - S.start;
  css(el('div', 'abs', root), { inset: 0, background: 'radial-gradient(ellipse 90% 55% at 50% 62%, #2b1e13, #0e0b09 72%)' });
  const big = el('div', 'bigdigit', root, '3'); css(big, { left: '440px', top: '330px' });
  const H = stepHead(root, 3, 'Tu <em>modifies</em> tout', 'Aperçu 100 % gratuit, avant de payer.');

  const st = el('div', 'abs', root); css(st, { inset: 0, perspective: '2400px', perspectiveOrigin: '50% 45%' });
  const ZOOM = 1.85;
  const P = makePhone(st, { zoom: ZOOM });
  css(P.pos, { left: (1080 - 416 * ZOOM) / 2 + 'px', top: '560px' });

  // ── Écran d'aperçu ──
  const v = el('div', 'abs', P.app); css(v, { left: 0, top: 0, width: '390px', height: '790px' });
  el('div', 'apphead', v, '<span style="font:500 14px/1 var(--ui)">← Photos</span><span class="logo">Noustalgie</span><span class="pill" style="background:#1c1a18;color:#fff;border-color:#1c1a18">Commander</span>');
  const w = el('div', 'wiz', v);
  el('div', 'wiz-top', w, '<span>Aperçu</span><small>4 / 5</small>');
  el('div', 'wiz-bar', w, '<i style="width:80%"></i>');
  const ttl = el('div', '', w, '<span style="font:400 24px/1 var(--display)">Votre livre est prêt</span>'); css(ttl, { margin: '2px 0 4px' });
  el('div', '', w, '<span style="font:italic 13px/1.4 var(--display);color:#5f5a54">Touchez un texte ou une photo pour le modifier.</span>');
  const viewer = el('div', '', w); css(viewer, { position: 'relative', height: '214px', marginTop: '14px', background: '#ece9e4', perspective: '900px', overflow: 'hidden' });
  const PW = 166;
  const ob = makeOpenBook(viewer, { page: PW, spreads: [['chap1', 'full-plage'], ['love', 'trio'], ['meteo', 'full-colline-nocap']], cover: 'cover', dz: 0.3 });
  css(ob.root, { left: (350 - 2 * PW) / 2 + 'px', top: '20px', boxShadow: '0 14px 30px rgba(0,0,0,.25)' });
  gsap.set(ob.leaves[0].el, { rotationY: -180, z: -ob.leaves[0].z0 });
  // légende posée sur la page de droite (mise en page « pleine page » du site)
  const capBox = el('div', 'abs', ob.baseR); css(capBox, { left: 64 / 794 * PW + 'px', bottom: 52 / 794 * PW + 'px', width: '70%', font: `italic ${Math.round(22 / 794 * PW * 1.5)}px/1.3 var(--display)`, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.5)' });
  const gridLayer = el('div', 'abs', ob.baseR); css(gridLayer, { inset: 0, opacity: 0 });
  img(PAGE('grid-ete'), '', gridLayer);
  const ctrl = el('div', '', w); css(ctrl, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 2px 0', font: '500 14px/1 var(--ui)' });
  ctrl.innerHTML = '<span style="font-size:22px">‹</span><span style="border:1.3px solid #1c1a18;border-radius:999px;padding:8px 18px">Feuilleter</span><span style="font-size:22px">›</span>';
  const tools = el('div', '', w); css(tools, { display: 'flex', gap: '8px', marginTop: '12px' });
  tools.innerHTML = '<span class="chip">↶ Annuler</span><span class="chip">↷ Rétablir</span><span class="chip" style="margin-left:auto">🎨 Style : Nuit</span>';
  const lay = el('div', '', w); css(lay, { marginTop: '12px', font: '700 10px/1 var(--ui)', letterSpacing: '.16em', textTransform: 'uppercase', color: '#5f5a54' });
  lay.textContent = 'Mise en page';
  const layChips = el('div', 'chips', w);
  const LC = ['Pleine page', 'Deux photos', 'Une grande, deux petites', 'Grille'].map((c, i) => el('span', 'chip' + (i === 0 ? ' on' : ''), layChips, c));
  const order = el('div', 'btn-dark', w, 'Commander ce livre — 49,99 €');

  // Fenêtre « Votre petit mot » (légende), centrée comme sur le site
  const sheet = el('div', 'abs', P.scr); css(sheet, { left: '18px', right: '18px', top: '232px', background: '#fff', borderRadius: '20px', boxShadow: '0 24px 60px rgba(0,0,0,.35)', padding: '20px', zIndex: 30, opacity: 0 });
  sheet.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font:400 22px/1.2 var(--display)">Votre petit mot 💌</span><span style="font:400 22px/1 var(--ui);color:#77726b">×</span></div><div style="font:italic 13px/1.45 var(--display);color:#5f5a54;margin-bottom:12px">Cette légende apparaîtra sous cette photo dans votre livre.</div>';
  const sInp = el('div', 'field', sheet, '<label>Légende personnelle</label>');
  const inBox = el('div', 'inp focus', sInp); const inTxt = el('span', '', inBox);
  const sBtns = el('div', '', sheet); css(sBtns, { display: 'flex', gap: '10px', marginTop: '16px' });
  sBtns.innerHTML = '<div class="chip" style="flex:1;text-align:center;padding:13px">Annuler</div>';
  const save = el('div', 'btn-dark', sBtns, 'Sauvegarder'); css(save, { flex: 1, marginTop: 0 });
  const veil = el('div', 'abs', P.scr); css(veil, { inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 29, opacity: 0 });

  // Mesures avant transformations
  const sr = P.scr.getBoundingClientRect(), kz = sr.width / 390;
  const pos = e => { const a = e.getBoundingClientRect(); return [(a.left + a.width / 2 - sr.left) / kz, (a.top + a.height / 2 - sr.top) / kz]; };
  const rightPageP = (() => { const a = ob.root.getBoundingClientRect(); return [(a.left + a.width * 0.75 - sr.left) / kz, (a.top + a.height * 0.82 - sr.top) / kz]; })();
  const gridChipP = pos(LC[3]), saveP = pos(save);

  // ── Animations ──
  tl.fromTo(root, { y: 1920 }, { y: 0, duration: 0.42, ease: 'power3.out' }, 0);
  tl.set(root, { filter: 'url(#mblurY)' }, 0);
  tl.set(root, { filter: 'none' }, 0.3);
  tl.fromTo(big, { x: 120, opacity: 0 }, { x: -60, opacity: 1, duration: 4.4, ease: 'none' }, L(22.0));
  stepHeadIn(tl, H, L(22.2));
  sfx('swish', 22.2, { gain: 0.4 });
  gsap.set(P.pos, { rotationY: 13, rotationX: 6, rotationZ: -1.5, transformOrigin: '50% 30%' });
  tl.to(P.pos, { rotationY: 5, rotationZ: -0.5, duration: 4, ease: 'sine.inOut' }, L(22.3));

  ob.flip(tl, 1, L(22.75), 0.5);
  ob.flip(tl, 2, L(23.25), 0.5);
  sfx('pageflip', 22.75, { gain: 0.5 }); sfx('pageflip', 23.25, { gain: 0.5 });

  // gros plan sur le téléphone pendant l'édition
  tl.to(H.h, { opacity: 0, y: -60, duration: 0.35, ease: 'power2.in' }, L(23.7));
  tl.to(P.pos, { scale: 1.2, y: -170, duration: 0.5, ease: 'power3.inOut' }, L(23.75));
  tapAt(tl, P, rightPageP[0], rightPageP[1], L(23.95), 23.95);
  tl.to(veil, { opacity: 1, duration: 0.2 }, L(24.05));
  tl.fromTo(sheet, { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.6)', immediateRender: false }, L(24.05));
  sfx('swipe', 24.05, { gain: 0.35 });
  const CAP = 'Notre colline, un dimanche de juin';
  const tEnd = typeText(tl, inTxt, CAP, L(24.3), 52);
  sfx('keys', 24.3, { dur: CAP.length / 52, n: CAP.length });
  const tSave = tEnd + 0.15;
  tapAt(tl, P, saveP[0], saveP[1], tSave, tSave + S.start);
  tl.to(sheet, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' }, tSave + 0.08);
  tl.to(veil, { opacity: 0, duration: 0.2 }, tSave + 0.1);
  typeText(tl, capBox, CAP, tSave + 0.25, 90, false);
  sfx('success', tSave + S.start + 0.3, { gain: 0.35 });
  // changement de mise en page
  const tGrid = tSave + 0.75;
  tapAt(tl, P, gridChipP[0], gridChipP[1], tGrid, tGrid + S.start);
  tl.set(LC[0], { attr: { class: 'chip' } }, tGrid);
  tl.set(LC[3], { attr: { class: 'chip on' } }, tGrid);
  tl.fromTo(gridLayer, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.6)', immediateRender: false }, tGrid + 0.05);
  tl.to(capBox, { opacity: 0, duration: 0.15 }, tGrid + 0.05);

  // ── « Tu paies seulement si tu adores. » ──
  const T8 = 26.4;
  const dim = el('div', 'abs', root); css(dim, { inset: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(14,11,9,.78), rgba(14,11,9,.95))', opacity: 0 });
  tl.to(dim, { opacity: 1, duration: 0.35 }, L(T8));
  tl.to(P.pos, { scale: 0.86, y: 0, rotationY: 0, rotationZ: 0, duration: 1.4, ease: 'power2.out' }, L(T8));
  const box = el('div', 'abs', root); css(box, { left: 0, right: 0, top: '620px', textAlign: 'center' });
  const LINES = [['Tu paies', '700 150px/1.05 var(--display)', '#f7efe2', 26.5], ['seulement si', 'italic 400 120px/1.1 var(--display)', 'rgba(242,235,224,.9)', 27.0], ['tu <em class="gold">adores.</em>', '700 170px/1.05 var(--display)', '#f7efe2', 27.5]];
  LINES.forEach(([h, f, c, t]) => {
    const d = el('div', 'shadow-txt', box, h); css(d, { font: f, color: c });
    gsap.set(d, { opacity: 0 });
    tl.fromTo(d, { opacity: 0, scale: 1.6, filter: 'blur(16px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.32, ease: 'expo.out', immediateRender: false }, L(t));
    sfx('hit', t, { gain: 0.55 });
  });
  const heart = el('div', 'center', root, '❤️'); css(heart, { top: '1150px', fontSize: '150px' });
  gsap.set(heart, { opacity: 0 });
  tl.fromTo(heart, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(3)', immediateRender: false }, L(27.62));
  tl.to(heart, { scale: 1.25, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, L(27.95 - 0.24));
  shake(27.5, 10, 0.25, 7);
  sfx('riser', 26.4, { dur: 1.6, gain: 0.8 });
  flash(27.9, 1, 0.1, 0.45);
});
