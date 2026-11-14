// /api/tools?fn=photo — secours de l'envoi des photos en haute définition (3e essai de uploadPhotos, index.html).
// La photo arrive en texte (data URI JPEG, PNG ou WEBP) et part chez Cloudinary depuis le serveur, avec les mêmes réglages que
// /api/sign-upload. Utile quand l'envoi direct du navigateur échoue : navigateur intégré d'une application (Google, Instagram…),
// réseau qui bloque api.cloudinary.com. Corps limité à 4,5 Mo par Vercel : le navigateur envoie la version écran au-delà de 4 Mo.
const https = require('https');
const crypto = require('crypto');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('../_lib/security');
const { cfg, sign } = require('../_lib/cloudinary');

const DOSSIER = /^noustalgie\/photos\/\d{4}-\d{2}-\d{2}-[0-9a-f]{10}$/;   // dossier donné par /api/sign-upload

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'photo', 150, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  const { cloud, key, secret } = cfg();
  if (!cloud || !key || !secret) return res.status(500).json({ error: 'Configuration incomplète.' });
  const b = parseBody(req) || {};
  const file = typeof b.file === 'string' ? b.file : '';
  if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]/.test(file) || file.length > 4.4e6) return res.status(400).json({ error: 'Photo invalide.' });
  const folder = DOSSIER.test(String(b.folder || '')) ? b.folder : `noustalgie/photos/${new Date().toISOString().slice(0, 10)}-${crypto.randomBytes(5).toString('hex')}`;
  const params = { allowed_formats: 'jpg,jpeg,png,webp', folder, timestamp: Math.floor(Date.now() / 1000), transformation: 'c_limit,w_2600,h_2600' };
  const body = new URLSearchParams({ file, api_key: key, signature: sign(params, secret), ...params }).toString();
  const j = await new Promise(resolve => {
    const q = https.request({ hostname: 'api.cloudinary.com', path: `/v1_1/${cloud}/image/upload`, method: 'POST', timeout: 25000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ error: { message: 'réponse Cloudinary illisible' } }); } });
    });
    q.on('timeout', () => { q.destroy(); resolve({ error: { message: 'délai dépassé' } }); });
    q.on('error', e => resolve({ error: { message: e.message } }));
    q.write(body); q.end();
  });
  if (j && j.public_id) return res.json({ public_id: j.public_id });
  console.error('photo relayée refusée :', JSON.stringify(j).slice(0, 200));
  return res.status(502).json({ error: (j && j.error && j.error.message) || 'Envoi impossible.' });
};
