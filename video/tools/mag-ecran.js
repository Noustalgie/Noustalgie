// Écran du téléphone de la dernière photo (tools/mag-photos.py) : l'accueil de noustalgie.fr en mobile, avec la barre d'état.
//   node tools/mag-ecran.js   → out/mag/decor/site-mobile.png (1170 × 2532)
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'mag', 'decor');
// polices réelles du site, y compris celles de la couverture de l'album (Bodoni Moda, Pinyon Script…) : mêmes copies
// locales qu'outils/rendu.py, sinon la couverture du haut de page s'affiche dans une police de remplacement
const OUTILS = path.join(ROOT, '..', 'outils');
const NM = path.join(os.homedir(), '.cache', 'noustalgie-polices', 'node_modules');
const cssPolices = u => execFileSync('python3', ['-c', 'import sys; sys.path.insert(0, sys.argv[1]); import rendu; rendu.installer_polices(); sys.stdout.write(rendu.css_polices(sys.argv[2]))', OUTILS, u]).toString();

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const site = await serve(path.join(ROOT, '..', 'public'));        // le site à la racine (liens absolus /img/…)
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 830 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.includes('fonts.googleapis.com/css')) return r.fulfill({ contentType: 'text/css', body: cssPolices(u) });
    if (u.includes('fonts.gstatic.com/__local/')) return r.fulfill({ path: path.join(NM, u.split('/__local/')[1]), contentType: 'font/woff2', headers: { 'access-control-allow-origin': '*' } });
    return u.startsWith('http://127.0.0.1') ? r.continue() : r.abort();
  });
  await page.goto(`http://127.0.0.1:${site.address().port}/index.html`, { waitUntil: 'networkidle', timeout: 60000 });
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
