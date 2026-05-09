const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { pdf, title } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!pdf) return res.status(400).json({ error: 'PDF manquant' });

    // Convertir base64 en Buffer
    const pdfBuffer = Buffer.from(pdf, 'base64');
    const filename = `${(title || 'noustalgie').replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;

    // Upload vers file.io (service gratuit, URL valide 14 jours, 1 téléchargement)
    const boundary = '----FormBoundary' + Date.now().toString(16);
    const formParts = [
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: application/pdf\r\n\r\n`,
      pdfBuffer,
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="expires"\r\n\r\n14d\r\n`,
      `--${boundary}\r\nContent-Disposition: form-data; name="maxDownloads"\r\n\r\n3\r\n`,
      `--${boundary}--\r\n`
    ];

    const bodyParts = formParts.map(p => Buffer.isBuffer(p) ? p : Buffer.from(p));
    const body = Buffer.concat(bodyParts);

    const result = await new Promise((resolve, reject) => {
      const reqHttp = https.request({
        hostname: 'file.io',
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length
        }
      }, r => {
        let data = '';
        r.on('data', c => data += c);
        r.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch(e) { reject(new Error('Parse error: ' + data.slice(0,200))); }
        });
      });
      reqHttp.on('error', reject);
      reqHttp.write(body);
      reqHttp.end();
    });

    if (result.success && result.link) {
      console.log(`✅ PDF uploadé : ${result.link} (${Math.round(pdfBuffer.length/1024)}KB)`);
      return res.json({ url: result.link, key: result.key });
    } else {
      throw new Error('file.io error: ' + JSON.stringify(result));
    }
  } catch(e) {
    console.error('Upload PDF error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
