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

    const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
    if (!CLOUD) return res.status(500).json({ error: 'CLOUDINARY_CLOUD_NAME manquant' });

    const pdfBuffer = Buffer.from(pdf, 'base64');
    const boundary = '----Boundary' + Date.now();
    const parts = [
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="album.pdf"\r\nContent-Type: application/pdf\r\n\r\n`),
      pdfBuffer,
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="upload_preset"\r\n\r\nnoustalgie_unsigned\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="resource_type"\r\n\r\nraw\r\n`),
      Buffer.from(`--${boundary}--\r\n`)
    ];
    const formBody = Buffer.concat(parts);

    const result = await new Promise((resolve, reject) => {
      const req2 = https.request({
        hostname: 'api.cloudinary.com',
        path: `/v1_1/${CLOUD}/raw/upload`,
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': formBody.length
        },
        timeout: 30000
      }, r => {
        let d = ''; r.on('data', c => d += c);
        r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({ error: d }); } });
      });
      req2.on('error', reject);
      req2.on('timeout', () => { req2.destroy(); reject(new Error('Timeout Cloudinary')); });
      req2.write(formBody);
      req2.end();
    });

    if (result.secure_url) {
      console.log('PDF uploadé Cloudinary unsigned:', result.secure_url);
      return res.json({ url: result.secure_url });
    } else {
      throw new Error('Cloudinary error: ' + JSON.stringify(result).slice(0, 200));
    }
  } catch(e) {
    console.error('Upload error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
