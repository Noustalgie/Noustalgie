const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: { message: 'OPENAI_API_KEY manquante' } });

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const buf = Buffer.from(JSON.stringify(payload));
    return new Promise((resolve) => {
      const r = https.request({
        hostname: 'api.openai.com', path: '/v1/chat/completions', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY, 'Content-Length': buf.length },
        timeout: 55000
      }, (resp) => {
        let data = '';
        resp.on('data', c => data += c);
        resp.on('end', () => {
          try { res.status(resp.statusCode).json(JSON.parse(data)); }
          catch(e) { res.status(500).json({ error: { message: 'Parse error' }}); }
          resolve();
        });
      });
      r.on('timeout', () => { r.destroy(); res.status(504).json({ error: { message: 'Timeout — réessaie' }}); resolve(); });
      r.on('error', (e) => { res.status(500).json({ error: { message: e.message }}); resolve(); });
      r.write(buf); r.end();
    });
  } catch(e) { return res.status(500).json({ error: { message: e.message }}); }
};
