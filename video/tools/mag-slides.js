// Slides TikTok « magazine » : le livre 3D (pages de out/mag/pages) posé sur la table, texte façon TikTok.
//   node tools/mag-pages.py d'abord, puis : node tools/mag-slides.js [--only 1,3] [--draft]
//   → out/mag/slides/01.jpg … (1080 × 1920)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const only = opt('only', '') ? opt('only').split(',').map(Number) : null;
const draft = args.includes('--draft');
const W = 1080, H = 1920, OUT = path.join(ROOT, 'out', 'mag', 'slides');

const rad = a => a * Math.PI / 180;
// caméra sphérique autour d'un point de la table : cible (tx, tz), distance d, hauteur E (°), côté A (°)
const sph = (tx, tz, d, E, A, ty = 0) => ({ tgtX: tx, tgtY: ty, tgtZ: tz, camX: tx + d * Math.sin(rad(A)) * Math.cos(rad(E)), camY: ty + d * Math.sin(rad(E)), camZ: tz + d * Math.cos(rad(A)) * Math.cos(rad(E)) });
// livre ouvert sur la double page k (pages 2k+1 | 2k+2 ; k = 0 : rabat de couverture | page 2)
const open = k => ({ cover: 1, flip: Array.from({ length: 11 }, (_, i) => (i < k ? 1 : 0)) });
const LIGHT = { keyAz: -38, keyEl: 46, exposure: 1.12, bloom: 0.28, aperture: 0.0006, maxblur: 0.01, grain: 0.03, warm: 0.016, vignette: 0.26, dust: 0.22, bokeh: 0.55 };
// livre fermé : le plat de couverture va du dos (x = 0) vers x = 21,2 ; son centre tourne avec le livre
const closed = (rot, d, E, A) => { const a = rad(rot), cx = 10.6 * Math.cos(a), cz = -10.6 * Math.sin(a); return { ...sph(cx, cz - 5, d, E, A), cover: 0, bookRot: rot }; };
// double page vue d'un peu au-dessus, le livre au centre de la zone visible (TikTok couvre le haut et le bas de l'écran)
const SPREAD = (k, rot = 0) => ({ ...sph(0, -6.5, 160, 56, 0), fov: 32, ...LIGHT, ...open(k), bookRot: rot });

// t : légende en pastilles blanches (une ligne par élément) ; s : petite ligne au-dessus ; b : ligne sous les pastilles
const SLIDES = [
  { n: 1, state: { ...LIGHT, ...closed(-9, 88, 62, -12), rings: 1, ringsX: 24, ringsZ: 13, ringsRot: 0.9 },
    s: 'idée cadeau couple', t: ['Et si votre histoire', 'devenait un magazine ?'], top: 340 },
  { n: 2, state: { ...sph(10.6, -4.5, 84, 64, 0), ...LIGHT, ...open(0), bookRot: 1.5 }, t: ['Votre dédicace', 'et un vrai sommaire'], top: 390 },
  { n: 3, state: SPREAD(1, -1.5), t: ['Le plan de la ville', 'où tout a commencé,', 'dans un cœur'], top: 510 },
  { n: 4, state: SPREAD(2, 1.5), t: ['Vos grandes étapes,', 'sur une pellicule'], top: 540 },
  { n: 5, state: SPREAD(3, -1), t: ['Une année en photos,', 'mois par mois'], top: 540 },
  { n: 6, state: SPREAD(4, 1.8), t: ['La playlist', 'de votre histoire'], top: 540 },
  { n: 7, state: SPREAD(5, -1.6), t: ['Vos adresses préférées', 'et vos voyages'], top: 540 },
  { n: 8, state: SPREAD(6, 1.2), t: ['Une interview exclusive', '(les stars, c’est vous)'], top: 540 },
  { n: 9, state: SPREAD(8, -1.4), t: ['Des jeux à faire à deux'], b: '« Qui est le plus…\u00a0? », mots mêlés', top: 560 },
  { n: 10, state: SPREAD(10, 1), t: ['Et pour finir,', 'une lettre d’amour'], top: 540 },
  { n: 11, state: { ...LIGHT, ...closed(6, 90, 64, 8) },
    t: ['Créez le vôtre', 'sur noustalgie.fr'], b: 'Aperçu gratuit · livré en 10 à 12 jours', top: 340 },
];

const CSS = `
#cap{position:fixed;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none;font-family:'TikTok Sans',Inter,sans-serif;-webkit-font-smoothing:antialiased}
#cap .box{position:absolute;left:70px;right:70px;text-align:center}
#cap .s{display:block;margin:0 auto 22px;font:600 38px/1.2 'TikTok Sans',sans-serif;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.6)}
#cap .t{display:inline;font:600 60px/1.42 'TikTok Sans',sans-serif;color:#141414;background:#fff;padding:.08em .34em;border-radius:16px;
  -webkit-box-decoration-break:clone;box-decoration-break:clone}
#cap .b{display:block;margin:30px auto 0;max-width:820px;font:600 36px/1.3 'TikTok Sans',sans-serif;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.6)}
`;
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

(async () => {
  if (!fs.existsSync(path.join(ROOT, 'out', 'mag', 'pages', 'page-24.jpg'))) throw new Error('lancer d’abord : python3 tools/mag-pages.py');
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(ROOT);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on('pageerror', e => console.error('[page error]', e.message));
  const spine = encodeURIComponent(JSON.stringify({ text: 'LÉA & HUGO · 2026', bg: '#161412', fg: '#FBF9F6' }));
  await page.goto(`http://127.0.0.1:${server.address().port}/oui/test.html?w=${W}&h=${H}&samples=${draft ? 2 : 4}&shadow=${draft ? 1024 : 4096}&base=/out/mag/pages/&spine=${spine}`);
  await page.waitForFunction(() => window.__ready, null, { timeout: 180000 });
  await page.addStyleTag({ content: CSS });
  await page.evaluate(() => document.fonts.load('600 60px "TikTok Sans"'));
  for (const sl of SLIDES) {
    if (only && !only.includes(sl.n)) continue;
    const t0 = Date.now(), S = sl.state;
    S.focus = Math.hypot(S.camX - S.tgtX, S.camY - S.tgtY, S.camZ - S.tgtZ);
    await page.evaluate(s => window.__shot(s), S);
    const html = `<div class="box" style="top:${sl.top}px">${sl.s ? `<span class="s">${esc(sl.s)}</span>` : ''}`
      + sl.t.map(l => `<span class="t">${esc(l)}</span>`).join('<br>') + (sl.b ? `<span class="b">${esc(sl.b)}</span>` : '') + '</div>';
    await page.evaluate(h => { let c = document.getElementById('cap'); if (!c) { c = document.createElement('div'); c.id = 'cap'; document.body.appendChild(c); } c.innerHTML = h; }, html);
    const f = path.join(OUT, String(sl.n).padStart(2, '0') + '.png');
    await page.screenshot({ path: f, timeout: 300000 });
    console.log('slide', sl.n, Date.now() - t0, 'ms');
  }
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
