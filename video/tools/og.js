// Image de partage 1200 × 630 : fond rendu par le livre 3D (tools/oui-still.js, mode studio) + texte aux polices du site.
//   node tools/og.js fond.png sortie.jpg "Titre <em>en italique</em>" "Sous-titre" [--brand Noustalgie] [--x 735]
//   --panneau : bandeau clair sous le texte (fond photographique, par ex. la table en bois de tools/mag-photos.py --site)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [, , bg, out, titre, sous] = process.argv;
const opt = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : process.argv[i + 1]; };
const ROOT = path.join(__dirname, '..');
const x = +opt('x', 735);
const html = `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="file://${ROOT}/assets/fonts/fonts.css">
<style>
 html,body{margin:0;width:1200px;height:630px;overflow:hidden}
 body{background:#e4dfd7 url("file://${path.resolve(bg)}") 0 0/1200px 630px no-repeat;color:#1c1a18;-webkit-font-smoothing:antialiased}
 .t{position:absolute;left:${x}px;top:0;bottom:0;right:56px;display:flex;flex-direction:column;justify-content:center}${process.argv.includes('--panneau') ? `
 .p{position:absolute;left:${x - 44}px;top:0;bottom:0;right:0;background:rgba(251,249,246,.95);box-shadow:-18px 0 40px -24px rgba(28,26,24,.35)}` : ''}
 .m{font:700 27px/1 'Times New Roman',Times,serif;letter-spacing:-.01em;margin-bottom:22px}
 h1{font:400 49px/1.08 'Playfair Display',Georgia,serif;letter-spacing:-.015em;margin:0 0 22px;text-wrap:balance}
 h1 em{font-style:italic}
 p{font:400 23px/1.45 'Hanken Grotesk',system-ui,sans-serif;color:#5f5a54;margin:0;max-width:400px}
</style>
${process.argv.includes('--panneau') ? '<div class="p"></div>' : ''}<div class="t"><div class="m">${opt('brand', 'Noustalgie')}</div><h1>${titre}</h1><p>${sous}</p></div>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const f = path.join(path.dirname(path.resolve(out)), '.og-tmp.html');
  fs.writeFileSync(f, html);
  await p.goto('file://' + f, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, type: out.endsWith('.png') ? 'png' : 'jpeg', quality: 90 });
  fs.unlinkSync(f);
  await b.close();
})();
