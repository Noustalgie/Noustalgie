// Banc d'essai du livre 3D : rend des images fixes à partir d'états.
//   node tools/oui-still.js shots.json [--w 1080 --h 1920 --out out/stills --scale 1]
// shots.json : { "nom": { camX: ..., cover: 1, flip: [..] }, ... }  (voir DEFAULTS dans oui/src/book3d.js)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const file = args.find(a => !a.startsWith('--') && a.endsWith('.json'));

(async () => {
  const shots = JSON.parse(fs.readFileSync(file, 'utf8'));
  const W = +opt('w', 1080), H = +opt('h', 1920), outDir = path.join(ROOT, opt('out', 'out/stills'));
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve(ROOT);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  page.on('pageerror', e => console.error('[page error]', e.message));
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) console.error('[console]', m.text().slice(0, 300)); });
  await page.goto(`http://127.0.0.1:${server.address().port}/oui/test.html?w=${W}&h=${H}&samples=${opt('samples', 4)}&shadow=${opt('shadow', 2048)}`);
  await page.waitForFunction(() => window.__ready, null, { timeout: 120000 });
  for (const [name, state] of Object.entries(shots)) {
    const t0 = Date.now();
    await page.evaluate(s => window.__shot(s), state);
    const f = path.join(outDir, name + '.png');
    await page.screenshot({ path: f, timeout: 300000 });
    console.log(name, Date.now() - t0, 'ms');
  }
  await browser.close(); server.close();
})();
