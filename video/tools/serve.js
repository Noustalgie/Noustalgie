// Petit serveur statique (sans dépendance) pour la composition et les outils
const path = require('path');
const fs = require('fs');
const http = require('http');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
};

function serve(root, port = 0) {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
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
