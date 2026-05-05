const https = require('https');

// Vercel Hobby plan: max 60 secondes
export const maxDuration = 60;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: { message: 'OPENAI_API_KEY manquante dans Vercel' } });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const endpoint = '/v1/chat/completions';
    const buf = Buffer.from(JSON.stringify(payload));

    return new Promise((resolve) => {
      const request = https.request({
        hostname: 'api.openai.com',
        path: endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + OPENAI_API_KEY,
          'Content-Length': buf.length
        },
        timeout: 55000
      }, (r) => {
        let data = '';
        r.on('data', c => data += c);
        r.on('end', () => {
          try { res.status(r.statusCode).json(JSON.parse(data)); }
          catch(e) { res.status(500).json({ error: { message: 'Parse error: ' + data.slice(0,100) }}); }
          resolve();
        });
      });
      request.on('timeout', () => {
        request.destroy();
        res.status(504).json({ error: { message: 'Timeout OpenAI — réessaie' } });
        resolve();
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
