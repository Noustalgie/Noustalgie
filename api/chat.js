const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: { message: 'OPENAI_API_KEY manquante dans Vercel Environment Variables' } });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const isDalle = (req.url || '').includes('dalle');
    const endpoint = isDalle ? '/v1/images/generations' : '/v1/chat/completions';
    const buf = Buffer.from(JSON.stringify(payload));

    return new Promise((resolve) => {
      const request = https.request({
        hostname: 'api.openai.com', path: endpoint, method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + OPENAI_API_KEY,
          'Content-Length': buf.length
        }
      }, (r) => {
        let data = '';
        r.on('data', c => data += c);
        r.on('end', () => {
          try { res.status(r.statusCode).json(JSON.parse(data)); }
          catch(e) { res.status(r.statusCode).send(data); }
          resolve();
        });
      });
      request.on('error', (e) => {
        res.status(500).json({ error: { message: e.message } });
        resolve();
      });
      request.write(buf);
      request.end();
    });
  } catch(e) {
    return res.status(500).json({ error: { message: e.message } });
  }
};
