// api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
// Mode "url" (v2) : PDFShift héberge le PDF, puis Cloudinary en garde une copie.
// Aucun fichier lourd ne transite par Vercel → plus de limite de 4,5 Mo, photos en pleine qualité.
const https = require('https');
const crypto = require('crypto');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');
const { uploadRemote } = require('./_lib/cloudinary');

const MAX_HTML = 4 * 1024 * 1024;

function pdfshift(payloadObj, key) {
  const payload = Buffer.from(JSON.stringify(payloadObj));
  return new Promise((resolve, reject) => {
    const r2 = https.request({
      hostname: 'api.pdfshift.io', path: '/v3/convert/pdf', method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from('api:' + key).toString('base64'), 'Content-Type': 'application/json', 'Content-Length': payload.length },
      timeout: 52000,
    }, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve({ status: r.statusCode, body: Buffer.concat(chunks) }));
    });
    r2.on('error', reject);
    r2.on('timeout', () => { r2.destroy(); reject(new Error('Timeout PDFShift')); });
    r2.write(payload); r2.end();
  });
}

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'pdf', 8, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes, réessayez dans quelques minutes.' });

  try {
    const { html, mode } = parseBody(req);
    if (!html || typeof html !== 'string') return res.status(400).json({ error: 'HTML manquant' });
    if (html.length > MAX_HTML) return res.status(413).json({ error: 'Album trop lourd.' });
    const KEY = process.env.PDFSHIFT_API_KEY;
    if (!KEY) return res.status(500).json({ error: 'Configuration PDF incomplète.' });

    const base = { source: html, format: '210mmx210mm', margin: '0', use_print: true, sandbox: false };

    if (mode === 'url') {
      const ref = `album-${new Date().toISOString().slice(0, 10)}-${crypto.randomBytes(5).toString('hex')}`;
      const out = await pdfshift({ ...base, filename: ref + '.pdf', wait_for: 'nstReady' }, KEY);
      let j = null; try { j = JSON.parse(out.body.toString()); } catch (e) {}
      if (out.status !== 200 || !j || !j.url) throw new Error(`PDFShift ${out.status}: ${out.body.toString().slice(0, 300)}`);
      // Copie durable chez nous (30 jours, cf. cron cleanup). Si ça échoue, le lien PDFShift reste valable.
      const copy = await uploadRemote({ url: j.url, resourceType: 'raw', folder: 'noustalgie/pdf', publicId: ref + '.pdf' });
      return res.json({ url: (copy && copy.secure_url) || j.url, pages: j.pdf_pages || null, size: j.filesize || null });
    }

    // Ancien mode (compatibilité) : PDF renvoyé en base64
    const out = await pdfshift(base, KEY);
    if (out.status !== 200) throw new Error(`PDFShift ${out.status}: ${out.body.toString().slice(0, 300)}`);
    return res.json({ pdf: out.body.toString('base64') });
  } catch (e) {
    console.error('generate-pdf:', e.message);
    return res.status(500).json({ error: 'La génération du PDF a échoué.' });
  }
};
