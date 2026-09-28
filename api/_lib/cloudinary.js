// api/_lib/cloudinary.js — signature et upload serveur (pas une route)
const https = require('https');
const crypto = require('crypto');

function cfg() {
  return { cloud: process.env.CLOUDINARY_CLOUD_NAME, key: process.env.CLOUDINARY_API_KEY, secret: process.env.CLOUDINARY_API_SECRET };
}
// Signature Cloudinary : paramètres triés, joints par &, suivis du secret, SHA-1
function sign(params, secret) {
  const str = Object.keys(params).filter(k => params[k] !== undefined && params[k] !== '').sort().map(k => `${k}=${params[k]}`).join('&');
  return crypto.createHash('sha1').update(str + secret).digest('hex');
}
// Upload côté serveur d'une ressource distante (Cloudinary va la chercher lui-même)
function uploadRemote({ url, resourceType = 'raw', folder, publicId }) {
  const { cloud, key, secret } = cfg();
  if (!cloud || !key || !secret) return Promise.resolve(null);
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder, public_id: publicId, timestamp };
  const body = new URLSearchParams({ file: url, api_key: key, signature: sign(params, secret), ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) }).toString();
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.cloudinary.com', path: `/v1_1/${cloud}/${resourceType}/upload`, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) }, timeout: 40000,
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { const j = JSON.parse(d); resolve(j.secure_url ? j : (console.error('Cloudinary:', d.slice(0, 200)), null)); } catch (e) { resolve(null); } });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
    req.write(body); req.end();
  });
}
// Preuve que ce PDF a été généré par notre serveur avec ce nombre de pages exact
function pdfProof(url, pages) {
  return crypto.createHmac('sha256', 'nst-pdf:' + (process.env.CLOUDINARY_API_SECRET || '')).update(`${url}|${pages}`).digest('hex');
}
function checkProof(url, pages, proof) {
  if (!proof || typeof proof !== 'string' || !process.env.CLOUDINARY_API_SECRET) return false;
  const a = Buffer.from(pdfProof(url, pages)), b = Buffer.from(proof);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
module.exports = { cfg, sign, uploadRemote, pdfProof, checkProof };
