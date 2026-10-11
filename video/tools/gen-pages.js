// Rend de vraies pages d'album avec le moteur du site (NA.renderPage de public/index.html)
// et les photos procédurales → assets/pages/<id>.jpg (1588 px, soit 2× la page de 794 px)
// Usage : node tools/gen-pages.js
const path = require('path');
const fs = require('fs');
const http = require('http');
const { chromium } = require('playwright');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, '..', 'assets', 'pages');

// Photos : chemin + zone sujet (x0, y0, x1, y1 en 0..1) pour le cadrage automatique du site
const PH = {
  plage: [0.3, 0.5, 0.66, 0.96], colline: [0.45, 0.55, 0.75, 0.9], ville: [0.25, 0.3, 0.75, 0.95], paris: [0.4, 0.1, 0.85, 0.9],
  montgolfieres: [0.3, 0.1, 0.9, 0.7], etoiles: [0.25, 0.3, 0.75, 0.92], lac: [0.3, 0.35, 0.7, 0.85], granderoue: [0.2, 0.15, 0.9, 0.97],
  lavande: [0.35, 0.4, 0.65, 0.7], neige: [0.25, 0.3, 0.75, 0.95], route: [0.1, 0.4, 0.7, 0.92], artifice: [0.1, 0.1, 0.9, 0.9],
  cierge: [0.2, 0.2, 0.8, 0.95], aerienne: [0.5, 0.3, 0.95, 0.7],
};
const SIZES = { ville: [1200, 1600], montgolfieres: [1200, 1600], granderoue: [1200, 1600], neige: [1200, 1600], artifice: [1200, 1600], cierge: [1200, 1600] };
const NAMES = Object.keys(PH);
const photos = NAMES.map(n => {
  const [w, h] = SIZES[n] || [1600, 1600];
  return { data: `/video/assets/photos/${n}.jpg`, w, h, ratio: w / h, orient: w < h ? 'portrait' : w > h ? 'paysage' : 'carre', subj: PH[n], faces: [] };
});
const P = n => NAMES.indexOf(n);
const pg = (layout, ph, t, v = 0) => ({ layout, v, slots: ph.map(n => ({ p: P(n), z: 1, f: 'none' })), t });

const LOVE = 'Ton rire qui arrive avant le mien\nTes chansons inventées sous la douche\nLe bruit de tes clés le soir\nTa patience avec mes plantes\nTa façon de dire mon prénom\nLes petits mots sur le frigo';
const WISH = 'Voir une aurore boréale\nApprendre à faire du pain\nUn road trip sans GPS\nDanser sous la pluie à Lisbonne\nRelire ce livre dans vingt ans';
const PAGES = [
  // Thème Nuit (celui de l'album reçu)
  ['nuit', 'cover', pg('cover', ['plage'], { title: 'Toutes nos premières fois', names: 'LÉA & HUGO · 2026' })],
  ['nuit', 'dedicace', pg('dedication', [], { label: 'Pour toi', text: 'À nous deux, pour toutes les années à venir.', sign: 'Léa' })],
  ['nuit', 'chap1', pg('chapter', [], { num: 'I', title: 'La rencontre', text: 'C’était un mardi de novembre, sous une pluie fine. Hugo cherchait ses clés, Léa cherchait un taxi. Ils ont partagé le même parapluie, puis un café, puis tout le reste. Ils n’ont plus jamais changé de parapluie.' })],
  ['nuit', 'chap2', pg('chapterp', ['ville'], { num: 'II', title: 'Paris sous la pluie', text: 'Un week-end improvisé, deux billets achetés à minuit. Il a plu sans s’arrêter, et c’était parfait : on a tout visité à l’abri d’un seul parapluie.' }, 1)],
  ['nuit', 'full-colline', pg('full', ['colline'], { cap: 'Notre colline, un dimanche de juin' })],
  ['nuit', 'love', pg('list', [], { title: 'Ce que j’aime chez toi', items: LOVE })],
  ['nuit', 'meteo', pg('prose', [], { title: 'Bulletin météo de notre amour', text: 'Ciel dégagé toute la semaine. 100 % de chances de câlins le dimanche matin, quelques averses de fous rires en soirée.\n\nVigilance orange : tu me manques déjà.' })],
  ['nuit', 'film', pg('prose', [], { title: 'Si notre histoire était un film', text: 'Une comédie romantique tournée entre Lille et Lisbonne, avec beaucoup trop de cafés et pas assez de sommeil. Scène culte : le parapluie. Fin heureuse garantie.', foot: 'Avec Léa et Hugo' })],
  ['nuit', 'wish', pg('checklist', [], { title: 'Ce qu’on fera ensemble', items: WISH })],
  ['nuit', 'quote', pg('quote', [], { text: 'On ne tombe pas amoureux une fois : on recommence chaque matin.' })],
  ['nuit', 'notep-cierge', pg('notep', ['cierge'], { text: 'Tu es mon endroit préféré.' })],
  ['nuit', 'trio', pg('trio', ['etoiles', 'granderoue', 'artifice'], {})],
  ['nuit', 'closing', pg('closing', [], { text: 'Et ce n’est que le début.', names: 'Ce livre appartient à\nLéa & Hugo\n2026' })],
  ['nuit', 'full-plage', pg('full', ['plage'], { cap: 'Biarritz, le soir où tu as dit oui' })],
  ['nuit', 'full-colline-nocap', pg('full', ['colline'], {})],
  ['nuit', 'grid-ete', pg('grid', ['colline', 'lac', 'lavande', 'etoiles'], {})],
  ['nuit', 'bleed2', pg('bleed2', ['route', 'lavande'], {})],
  ['nuit', 'grid', pg('grid', ['montgolfieres', 'paris', 'route', 'neige'], {})],
  // Thème Galerie
  ['galerie', 'g-cover', pg('cover', ['lac'], { title: 'Nos plus belles années', names: 'LÉA & HUGO · 2026' })],
  ['galerie', 'g-duo', pg('duo', ['lac', 'lavande'], { cap: 'L’été où tout était possible' })],
  ['galerie', 'g-frame', pg('frame', ['paris'], { cap: 'Paris, premier voyage à deux' })],
  ['galerie', 'g-chap', pg('chapterp', ['etoiles'], { num: 'III', title: 'Sous les étoiles', text: 'Une tente, un feu de camp, et le ciel entier rien que pour nous. On a compté les étoiles filantes jusqu’à trois heures du matin.' }, 0)],
  ['galerie', 'g-strip', pg('strip', ['ville', 'neige', 'montgolfieres'], { cap: 'Quatre saisons, une seule histoire' })],
  ['galerie', 'g-full', pg('full', ['aerienne'], { cap: 'Nos vacances, vues d’en haut' })],
  // Thème Argentique
  ['argentique', 'a-frame', pg('frame', ['montgolfieres'], { cap: 'Cappadoce, le matin des montgolfières' }, 1)],
  ['argentique', 'a-duo', pg('duo', ['route', 'colline'], { cap: 'Le road trip sans GPS' })],
  ['argentique', 'a-love', pg('list', [], { title: 'Ce que j’aime chez toi', items: LOVE })],
  ['argentique', 'a-grid', pg('grid', ['plage', 'lac', 'granderoue', 'artifice'], {})],
  // Thème Encre
  ['encre', 'e-quote', pg('quote', [], { text: 'Partout où tu es, c’est chez moi.' })],
  ['encre', 'e-stack', pg('stack', ['lavande', 'route'], {})],
];

function serve(root) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.bin': 'application/octet-stream' };
  return new Promise(res => {
    const s = http.createServer((req, rsp) => {
      const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
      if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rsp);
    }).listen(0, () => res(s));
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(REPO);
  const base = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error('page error:', e.message.slice(0, 160)));
  await page.route(u => !u.href.startsWith(base), r => r.abort());
  await page.goto(base + '/public/index.html', { waitUntil: 'load' });
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css'), 'utf8').replace(/url\(([^)]+)\)/g, 'url(/video/assets/fonts/$1)');
  await page.addStyleTag({ content: css + '\n#nstShot{position:fixed;left:0;top:0;width:794px;height:794px;z-index:2147483647;}' });
  await page.evaluate(() => { const d = document.createElement('div'); d.id = 'nstShot'; document.body.appendChild(d); });
  for (const [theme, id, spec] of PAGES) {
    await page.evaluate(async ({ spec, theme, photos }) => {
      const host = document.getElementById('nstShot');
      host.innerHTML = window.NA.renderPage(spec, { photos, theme });
      await document.fonts.ready;
      await Promise.all([...host.querySelectorAll('img')].map(i => i.decode().catch(() => {})));
    }, { spec, theme, photos });
    await page.locator('#nstShot').screenshot({ path: path.join(OUT, id + '.jpg'), type: 'jpeg', quality: 94 });
    console.log('page', id, theme);
  }
  await browser.close();
  server.close();
})();
