// Petit serveur statique (sans dépendance) pour les compositions et les outils.
// /site/... sert le dossier public/ du site (images de l'album d'exemple, par exemple).
const path = require('path');
const fs = require('fs');
const http = require('http');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4',
};
const PUBLIC = path.join(__dirname, '..', '..', 'public');

function serve(root, port = 0) {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent(req.url.split('?')[0]);
      let base = root;
      if (url.startsWith('/site/')) { base = PUBLIC; url = url.slice(5); }
      const file = path.join(base, url);
      if (!file.startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    }).listen(port, '127.0.0.1', () => resolve(server));
  });
}

module.exports = { serve };

if (require.main === module) {
  const root = path.join(__dirname, '..');
  serve(root, Number(process.argv[2]) || 8780).then(s => console.log(`http://127.0.0.1:${s.address().port}/index.html`));
}
