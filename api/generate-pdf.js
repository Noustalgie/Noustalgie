// api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');

const MAX_HTML = 30 * 1024 * 1024; // photos compressées incluses

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'pdf', 8, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes, réessayez dans quelques minutes.' });

  try {
    const { html } = parseBody(req);
    if (!html || typeof html !== 'string') return res.status(400).json({ error: 'HTML manquant' });
    if (html.length > MAX_HTML) return res.status(413).json({ error: 'Album trop lourd.' });

    const KEY = process.env.PDFSHIFT_API_KEY;
    if (!KEY) return res.status(500).json({ error: 'Configuration PDF incomplète.' });

    const payload = Buffer.from(JSON.stringify({ source: html, format: '210mmx210mm', margin: '0', use_print: true, sandbox: false }));
    const result = await new Promise((resolve, reject) => {
      const r2 = https.request({
        hostname: 'api.pdfshift.io', path: '/v3/convert/pdf', method: 'POST',
        headers: { Authorization: 'Basic ' + Buffer.from('api:' + KEY).toString('base64'), 'Content-Type': 'application/json', 'Content-Length': payload.length },
        timeout: 50000,
      }, r => {
        const chunks = [];
        r.on('data', c => chunks.push(c));
        r.on('end', () => {
          const buf = Buffer.concat(chunks);
          resolve(r.statusCode === 200 ? { ok: true, pdf: buf.toString('base64') } : { ok: false, error: `PDFShift ${r.statusCode}: ${buf.toString().slice(0, 300)}` });
        });
      });
      r2.on('error', reject);
      r2.on('timeout', () => { r2.destroy(); reject(new Error('Timeout PDFShift')); });
      r2.write(payload); r2.end();
    });
    if (!result.ok) throw new Error(result.error);
    return res.json({ pdf: result.pdf });
  } catch (e) {
    console.error('generate-pdf:', e.message);
    return res.status(500).json({ error: 'La génération du PDF a échoué.' });
  }
};
