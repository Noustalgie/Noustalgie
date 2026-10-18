// Écran du téléphone de la dernière photo (tools/mag-photos.py) : l'accueil de noustalgie.fr en mobile, avec la barre d'état.
//   node tools/mag-ecran.js   → out/mag/decor/site-mobile.png (1170 × 2532)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'mag', 'decor');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const site = await serve(path.join(ROOT, '..', 'public'));        // le site à la racine (liens absolus /img/…)
  const FONTS = path.join(ROOT, 'assets', 'fonts');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 830 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  // polices du site depuis assets/fonts, servies sur le même domaine (comme en ligne, sans dépendre du réseau)
  await page.route('**/__polices/*', r => r.fulfill({ path: path.join(FONTS, path.basename(new URL(r.request().url()).pathname)), contentType: 'font/woff2' }));
  await page.goto(`http://127.0.0.1:${site.address().port}/index.html`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.addStyleTag({ content: fs.readFileSync(path.join(FONTS, 'fonts.css'), 'utf8').replace(/url\((\w[^)]*\.woff2)\)/g, 'url(/__polices/$1)') });
  await page.evaluate(async () => { await document.fonts.load('400 40px "Playfair Display"'); await document.fonts.load('400 16px "Hanken Grotesk"'); await document.fonts.ready; });
  await page.waitForTimeout(800);
  const shot = path.join(OUT, '_site.png');
  const top = await page.evaluate(() => { const h = document.querySelector('header, nav'); return h ? Math.max(0, Math.round(h.getBoundingClientRect().top)) : 0; });
  await page.screenshot({ path: shot, clip: { x: 0, y: Math.min(top, 40), width: 390, height: 790 } });   // sans la bande vide au-dessus du menu
  // barre d'état iOS au-dessus de la page
  const bar = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await bar.setContent(`<!doctype html><html><head><style>
    *{margin:0;padding:0}body{width:390px;height:844px;background:#fbf9f6;font:600 17px/1 -apple-system,'Hanken Grotesk',sans-serif;color:#1c1a18;overflow:hidden}
    .s{height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px 0 44px;box-sizing:border-box}
    .i{display:flex;gap:6px;align-items:center}.g{display:flex;gap:2px;align-items:flex-end}.g i{width:3px;background:#1c1a18;border-radius:1px}
    .b{width:25px;height:12px;border:1.5px solid rgba(28,26,24,.45);border-radius:4px;padding:1.5px;box-sizing:border-box}.b i{display:block;height:100%;width:80%;background:#1c1a18;border-radius:1.5px}
    img{display:block;width:390px;height:790px}</style></head><body>
    <div class="s"><span>9:41</span><span class="i"><span class="g"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i></span><span class="b"><i></i></span></span></div>
    <img src="data:image/png;base64,${fs.readFileSync(shot).toString('base64')}"></body></html>`);
  await bar.evaluate(() => Promise.all([...document.images].map(im => im.decode())));
  await bar.screenshot({ path: path.join(OUT, 'site-mobile.png') });
  fs.unlinkSync(shot);
  await browser.close(); site.close();
  console.log('écran →', path.join(OUT, 'site-mobile.png'));
})().catch(e => { console.error(e); process.exit(1); });
