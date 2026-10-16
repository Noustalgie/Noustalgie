// Rendu image par image d'une composition avec Chromium, puis encodage ffmpeg.
//   node tools/render.js                              → composition index.html (v1, 48 s) → out/noustalgie-tiktok.mp4
//   node tools/render.js --page oui/index.html        → « Le plus beau oui » (WebGL) → out/le-plus-beau-oui.mp4
//   node tools/render.js --snap 1.2,6.6,30            → captures PNG de contrôle dans out/snaps/
//   node tools/render.js --cues                       → exporte out/cues.json (repères des effets sonores)
// Options : --fps 60 --workers 4 --from 0 --to 48 --scale 1 --res 1 --audio out/audio.wav --frames out/frames --out nom.mp4
//   --scale : facteur de capture (aperçus) ; --res : résolution interne du canvas WebGL (compositions 3D)
//   --query "mbmax=9" : paramètres d'adresse ajoutés à la composition ; --only liste.json : ne rendre que ces images (numéros)
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
const PAGE = opt('page', 'index.html');
const RES = opt('res', '1');
const NAME = PAGE.startsWith('oui') ? 'le-plus-beau-oui' : 'noustalgie-tiktok';
const GL = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-gpu-vsync', '--disable-lcd-text', '--font-render-hinting=none'];

async function openPage(base, scale = 1) {
  const browser = await chromium.launch({ args: GL });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: scale });
  page.on('pageerror', e => console.error('[page error]', e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('[console]', m.text().slice(0, 300)); });
  await page.goto(`${base}/${PAGE}?render&res=${RES}${args.includes('--samples') ? '&samples=' + opt('samples') : ''}${args.includes('--query') ? '&' + opt('query') : ''}`, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__seek === 'function', null, { timeout: 240000 });
  await page.evaluate(() => window.__ready);
  const cdp = await page.context().newCDPSession(page);
  return { browser, page, cdp };
}

async function capture(cdp, file, format = 'jpeg') {
  const r = await cdp.send('Page.captureScreenshot', { format, quality: format === 'jpeg' ? 95 : undefined, captureBeyondViewport: false });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(ROOT);
  const base = `http://127.0.0.1:${server.address().port}`;

  if (opt('cues')) {
    const { browser, page } = await openPage(base);
    const data = await page.evaluate(() => ({ duration: window.__duration, cues: window.CUES, beats: window.BEATS || null }));
    fs.writeFileSync(path.join(OUT, opt('cuesfile', 'cues.json')), JSON.stringify(data, null, 1));
    console.log('cues:', data.cues.length, 'durée:', data.duration);
    await browser.close(); server.close(); return;
  }

  const snap = opt('snap');
  if (snap) {
    const dir = path.join(OUT, opt('snapdir', 'snaps')); fs.mkdirSync(dir, { recursive: true });
    const scale = Number(opt('scale', 0.5));
    const { browser, page, cdp } = await openPage(base, scale);
    for (const t of String(snap).split(',').map(Number)) {
      const t0 = Date.now();
      await page.evaluate(t => window.__seek(t), t);
      const f = path.join(dir, `t${t.toFixed(2).padStart(6, '0')}.png`);
      await capture(cdp, f, 'png');
      console.log(f, Date.now() - t0, 'ms');
    }
    await browser.close(); server.close(); return;
  }

  const fps = Number(opt('fps', 60));
  const workers = Number(opt('workers', 4));
  const dir = path.join(ROOT, opt('frames', path.join('out', 'frames'))); fs.mkdirSync(dir, { recursive: true });
  let duration = Number(opt('duration', 48));
  if (!opt('encode')) {
    const probe = await openPage(base);
    duration = await probe.page.evaluate(() => window.__duration);
    await probe.browser.close();
  }
  const from = Number(opt('from', 0)), to = Math.min(Number(opt('to', duration)), duration);
  const f0 = Math.round(from * fps), f1 = Math.round(to * fps);
  const total = f1 - f0, per = Math.ceil(total / workers);
  console.log(`rendu ${total} images (${fps} i/s) avec ${workers} processus…`);
  const t0 = Date.now();
  let done = 0;
  const only = opt('only') && opt('only') !== true ? JSON.parse(fs.readFileSync(opt('only'), 'utf8')) : null;   // liste d'images à (re)faire, réparties en alternance
  if (!opt('encode')) await Promise.all(Array.from({ length: workers }, async (_, w) => {
    const a = f0 + w * per, b = Math.min(f1, a + per);
    if (!only && a >= b) return;
    const { browser, page, cdp } = await openPage(base);
    const mine = only ? only.filter((_, i) => i % workers === w) : null;
    for (let k = 0; k < (mine ? mine.length : b - a); k++) {
      const f = mine ? mine[k] : a + k;
      const file = path.join(dir, `${String(f).padStart(5, '0')}.jpg`);
      if (!opt('force') && fs.existsSync(file) && fs.statSync(file).size > 0) { done++; continue; }
      await page.evaluate(t => window.__seek(t), f / fps);
      await capture(cdp, file);
      if (++done % 30 === 0) {
        const el = (Date.now() - t0) / 1000;
        console.log(`${done}/${total} — ${(el / done * 1000).toFixed(0)} ms/image, reste ~${Math.round(el / done * (total - done))} s`);
      }
    }
    await browser.close();
  }));
  server.close();
  console.log(`images terminées en ${Math.round((Date.now() - t0) / 1000)} s`);

  if (opt('noencode')) return;
  const audio = opt('audio', path.join(OUT, NAME === 'le-plus-beau-oui' ? 'audio-oui.wav' : 'audio.wav'));
  const outFile = path.join(OUT, opt('out', NAME + '.mp4'));
  const ff = ['-y', '-framerate', String(fps), '-start_number', String(f0), '-i', path.join(dir, '%05d.jpg')];
  if (audio && fs.existsSync(audio)) ff.push('-ss', String(from), '-i', audio);
  ff.push('-frames:v', String(total), '-c:v', 'libx264', '-preset', 'slow', '-crf', opt('crf', '18'), '-maxrate', opt('maxrate', '14M'), '-bufsize', '28M', '-profile:v', 'high', '-level', '4.2', '-pix_fmt', 'yuv420p',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-movflags', '+faststart');
  if (audio && fs.existsSync(audio)) ff.push('-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-shortest');
  ff.push(outFile);
  console.log('ffmpeg', ff.join(' '));
  const r = spawnSync('ffmpeg', ff, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status);
  console.log('→', outFile);
})();
