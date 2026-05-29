const https = require('https');
const crypto = require('crypto');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { pdf, title } = body;
    if (!pdf) return res.status(400).json({ error: 'PDF manquant' });

    const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
    const KEY = process.env.CLOUDINARY_API_KEY;
    const SECRET = process.env.CLOUDINARY_API_SECRET;

    if (!CLOUD || !KEY || !SECRET) {
      return res.status(500).json({ error: 'Cloudinary non configuré' });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'noustalgie';
    
    // Signature correcte - seulement les params envoyés dans l'ordre alphabétique
    const sigStr = `folder=${folder}&timestamp=${timestamp}${SECRET}`;
    const signature = crypto.createHash('sha256').update(sigStr).digest('hex');

    const pdfBuffer = Buffer.from(pdf, 'base64');
    const boundary = '----CloudinaryBoundary' + Date.now();

    const parts = [
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="album.pdf"\r\nContent-Type: application/pdf\r\n\r\n`),
      pdfBuffer,
      Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n${KEY}\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n${timestamp}\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="folder"\r\n\r\n${folder}\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="resource_type"\r\n\r\nraw\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="signature"\r\n\r\n${signature}\r\n`),
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
        r.on('end', () => {
          try { resolve(JSON.parse(d)); } catch(e) { resolve({ error: d }); }
        });
      });
      req2.on('error', reject);
      req2.on('timeout', () => { req2.destroy(); reject(new Error('Timeout Cloudinary')); });
      req2.write(formBody);
      req2.end();
    });

    if (result.secure_url) {
      console.log('PDF uploadé Cloudinary:', result.secure_url);
      return res.json({ url: result.secure_url });
    } else {
      throw new Error('Cloudinary error: ' + JSON.stringify(result).slice(0, 200));
    }
  } catch(e) {
    console.error('Upload error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
