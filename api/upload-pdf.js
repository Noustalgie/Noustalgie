const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { pdf } = body;
    if (!pdf) return res.status(400).json({ error: 'PDF manquant' });

    const pdfBuffer = Buffer.from(pdf, 'base64');
    const boundary = '----Boundary' + Date.now();
    const parts = [
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="album.pdf"\r\nContent-Type: application/pdf\r\n\r\n`),
      pdfBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ];
    const formBody = Buffer.concat(parts);

    const result = await new Promise((resolve, reject) => {
      const req2 = https.request({
        hostname: 'file.io',
        path: '/?expires=14d',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': formBody.length
        },
        timeout: 20000
      }, r => {
        let d = ''; r.on('data', c => d += c);
        r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({}); } });
      });
      req2.on('error', reject);
      req2.on('timeout', () => { req2.destroy(); reject(new Error('Timeout')); });
      req2.write(formBody);
      req2.end();
    });

    if (result.success && result.link) {
      console.log('PDF uploadé file.io:', result.link);
      return res.json({ url: result.link });
    } else {
      throw new Error('file.io error: ' + JSON.stringify(result).slice(0,100));
    }
  } catch(e) {
    console.error('Upload error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
