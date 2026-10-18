// Slides TikTok « magazine », version à plat : les pages de out/mag/pages posées sur un fond clair, bien lisibles.
//   node tools/mag-plats.js   → out/mag/plats/01.jpg … (1080 × 1920)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const W = 1080, H = 1920, OUT = path.join(ROOT, 'out', 'mag', 'plats');
const P = n => `/out/mag/pages/page-${String(n).padStart(2, '0')}.jpg`;

// une page seule (one) ou une double page (two) ; mêmes textes que les slides 3D
const SLIDES = [
  { one: 1, s: 'idée cadeau couple', t: ['Et si votre histoire', 'devenait un magazine ?'] },
  { one: 2, t: ['Votre dédicace', 'et un vrai sommaire'] },
  { two: [3, 4], t: ['Le plan de la ville', 'où tout a commencé,', 'dans un cœur'] },
  { two: [5, 6], t: ['Vos grandes étapes,', 'sur une pellicule'] },
  { two: [7, 8], t: ['Une année en photos,', 'mois par mois'] },
  { two: [9, 10], t: ['La playlist', 'de votre histoire'] },
  { two: [11, 12], t: ['Vos adresses préférées', 'et vos voyages'] },
  { two: [13, 14], t: ['Une interview exclusive', '(les stars, c’est vous)'] },
  { two: [17, 18], t: ['Des jeux à faire à deux'], b: '« Qui est le plus… ? », mots mêlés' },
  { two: [21, 22], t: ['Et pour finir,', 'une lettre d’amour'] },
  { one: 1, small: true, t: ['Créez le vôtre', 'sur noustalgie.fr'], b: 'Aperçu gratuit · livré en 10 à 12 jours' },
];

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
#s{position:relative;width:${W}px;height:${H}px;overflow:hidden;font-family:'TikTok Sans',sans-serif;-webkit-font-smoothing:antialiased;
  background:radial-gradient(120% 70% at 50% 45%,#f7f1e7 0%,#ece3d5 60%,#ddd1bf 100%)}
#s::after{content:"";position:absolute;inset:0;opacity:.35;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .4 0 0 0 0 .33 0 0 0 .5 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")}
.book{position:absolute;left:50%;top:1000px;transform:translate(-50%,-50%) rotate(var(--r,0deg));box-shadow:0 40px 60px -30px rgba(60,40,20,.55),0 12px 22px -12px rgba(60,40,20,.35)}
.book img{display:block;width:100%;height:100%}
.two{width:1000px;height:500px;display:flex}
.two .pg{position:relative;width:500px;height:500px}
.two .pg::after{content:"";position:absolute;inset:0;pointer-events:none}
.two .l::after{background:linear-gradient(90deg,rgba(0,0,0,0) 78%,rgba(60,40,20,.10) 93%,rgba(40,25,10,.28) 100%)}
.two .r::after{background:linear-gradient(270deg,rgba(0,0,0,0) 80%,rgba(60,40,20,.08) 94%,rgba(40,25,10,.22) 100%)}
.one{width:860px;height:860px;top:1060px}
.one.small{width:640px;height:640px;top:1120px}
.box{position:absolute;left:70px;right:70px;top:300px;text-align:center;z-index:2}
.s{display:block;margin:0 auto 22px;font:600 38px/1.2 'TikTok Sans',sans-serif;color:#1c1a18}
.t{display:inline;font:600 60px/1.42 'TikTok Sans',sans-serif;color:#fff;background:#1c1a18;padding:.08em .34em;border-radius:16px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.b{display:block;margin:30px auto 0;max-width:820px;font:600 36px/1.3 'TikTok Sans',sans-serif;color:#1c1a18}
`;
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

(async () => {
  if (!fs.existsSync(path.join(ROOT, 'out', 'mag', 'pages', 'page-24.jpg'))) throw new Error('lancer d’abord : python3 tools/mag-pages.py');
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(ROOT);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [i, sl] of SLIDES.entries()) {
    const r = (i % 2 ? 1 : -1) * (sl.one ? 1.2 : 1.6);
    const book = sl.one
      ? `<div class="book one${sl.small ? ' small' : ''}" style="--r:${r}deg"><img src="${P(sl.one)}"></div>`
      : `<div class="book two" style="--r:${r}deg"><div class="pg l"><img src="${P(sl.two[0])}"></div><div class="pg r"><img src="${P(sl.two[1])}"></div></div>`;
    const cap = `<div class="box">${sl.s ? `<span class="s">${esc(sl.s)}</span>` : ''}${sl.t.map(l => `<span class="t">${esc(l)}</span>`).join('<br>')}${sl.b ? `<span class="b">${esc(sl.b)}</span>` : ''}</div>`;
    fs.writeFileSync(path.join(OUT, '_slide.html'), `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/fonts/fonts.css"><style>${CSS}</style></head><body><div id="s">${cap}${book}</div></body></html>`);
    await page.goto(`${base}/out/mag/plats/_slide.html`, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.load('600 60px "TikTok Sans"'); await document.fonts.ready; await Promise.all([...document.images].map(im => im.decode())); });
    const f = path.join(OUT, String(i + 1).padStart(2, '0') + '.jpg');
    await page.screenshot({ path: f, type: 'jpeg', quality: 92 });
    console.log('slide', i + 1);
  }
  fs.unlinkSync(path.join(OUT, '_slide.html'));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
