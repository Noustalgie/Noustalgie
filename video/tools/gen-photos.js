// Génère les « photos » procédurales de l'album (assets/photos/*.jpg)
// Usage : node tools/gen-photos.js [nom...]
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'photos');
const LIST = [
  ['plage', 1600, 1600, 11], ['colline', 1600, 1600, 12], ['ville', 1200, 1600, 13], ['paris', 1600, 1600, 14],
  ['montgolfieres', 1200, 1600, 15], ['etoiles', 1600, 1600, 16], ['lac', 1600, 1600, 17], ['granderoue', 1200, 1600, 18],
  ['lavande', 1600, 1600, 19], ['neige', 1200, 1600, 20], ['route', 1600, 1600, 21], ['artifice', 1200, 1600, 22],
  ['cierge', 1200, 1600, 23], ['aerienne', 1600, 1600, 24],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => console.error('page error:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
  await page.setContent('<!doctype html><html><body></body></html>');
  await page.addScriptTag({ path: path.join(__dirname, 'scenes.js') });
  for (const [name, w, h, seed] of LIST) {
    if (only.length && !only.includes(name)) continue;
    const t0 = Date.now();
    const data = await page.evaluate(([n, w, h, s]) => window.NSTScenes.render(n, w, h, s).toDataURL('image/jpeg', 0.93), [name, w, h, seed]);
    fs.writeFileSync(path.join(OUT, name + '.jpg'), Buffer.from(data.split(',')[1], 'base64'));
    console.log(name, w + 'x' + h, (Date.now() - t0) + 'ms');
  }
  await browser.close();
})();
