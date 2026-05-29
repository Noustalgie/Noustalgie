const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { html, title } = body;
    if (!html) return res.status(400).json({ error: 'HTML manquant' });

    const PDFSHIFT_KEY = process.env.PDFSHIFT_API_KEY;
    if (!PDFSHIFT_KEY) return res.status(500).json({ error: 'PDFSHIFT_API_KEY manquante' });

    const payload = JSON.stringify({
      source: html,
      format: 'Letter',
      width: '210mm',
      height: '210mm',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      use_print: true,
      sandbox: false
    });

    const result = await new Promise((resolve, reject) => {
      const auth = Buffer.from('api:' + PDFSHIFT_KEY).toString('base64');
      const buf = Buffer.from(payload);
      const req2 = https.request({
        hostname: 'api.pdfshift.io',
        path: '/v3/convert/pdf',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth,
          'Content-Type': 'application/json',
          'Content-Length': buf.length
        },
        timeout: 50000
      }, r => {
        const chunks = [];
        r.on('data', c => chunks.push(c));
        r.on('end', () => {
          if (r.statusCode === 200) {
            const pdfBuffer = Buffer.concat(chunks);
            resolve({ success: true, pdf: pdfBuffer.toString('base64') });
          } else {
            const text = Buffer.concat(chunks).toString();
            resolve({ success: false, error: `PDFShift ${r.statusCode}: ${text.slice(0,200)}` });
          }
        });
      });
      req2.on('error', reject);
      req2.on('timeout', () => { req2.destroy(); reject(new Error('Timeout PDFShift')); });
      req2.write(buf);
      req2.end();
    });

    if (result.success) {
      console.log('PDF généré via PDFShift OK');
      return res.json({ pdf: result.pdf });
    } else {
      throw new Error(result.error);
    }
  } catch(e) {
    console.error('PDF error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
