// api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
// directement à Cloudinary (pas de passage par Vercel, donc pas de limite de 4,5 Mo).
const crypto = require('crypto');
const { isAllowedOrigin, applyCors, rateLimit } = require('./_lib/security');
const { cfg, sign } = require('./_lib/cloudinary');

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'sign', 12, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  const { cloud, key, secret } = cfg();
  if (!cloud || !key || !secret) return res.status(500).json({ error: 'Configuration incomplète.' });
  // Une signature couvre un dossier de commande unique : toutes les photos d'un album
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `noustalgie/photos/${new Date().toISOString().slice(0, 10)}-${crypto.randomBytes(5).toString('hex')}`;
  // Signés avec la requête : seuls des fichiers image sont acceptés, redimensionnés à 2600 px max dès l'arrivée
  const params = { allowed_formats: 'jpg,jpeg,png,webp', folder, timestamp, transformation: 'c_limit,w_2600,h_2600' };
  return res.json({ cloud, apiKey: key, ...params, signature: sign(params, secret) });
};
