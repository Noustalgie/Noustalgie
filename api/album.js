// api/album.js — « Recevoir le lien de mon album »
// POST : sauvegarde l'album (sans données bancaires ni email) pour 30 jours, envoie le lien, programme une relance
// GET  : relit un album à partir de son identifiant secret
const https = require('https');
const crypto = require('crypto');
const { isAllowedOrigin, applyCors, rateLimit, parseBody, escapeHtml: h } = require('./_lib/security');
const { cfg, sign, pdfProof } = require('./_lib/cloudinary');

const SITE = 'https://noustalgie.fr';
const ID_RE = /^[a-f0-9]{24}$/;
const MAX_JSON = 900 * 1024;

function request(opts, body) {
  return new Promise(resolve => {
    const req = https.request({ timeout: 20000, ...opts }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j, raw: d }); });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0 }); });
    req.on('error', () => resolve({ status: 0 }));
    if (body) req.write(body); req.end();
  });
}
async function saveJson(id, obj) {
  const { cloud, key, secret } = cfg();
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { invalidate: 'true', overwrite: 'true', public_id: `noustalgie/albums/${id}.json`, timestamp };
  const file = 'data:application/json;base64,' + Buffer.from(JSON.stringify(obj)).toString('base64');
  const body = new URLSearchParams({ file, api_key: key, signature: sign(params, secret), ...params }).toString();
  const r = await request({ hostname: 'api.cloudinary.com', path: `/v1_1/${cloud}/raw/upload`, method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } }, body);
  return !!(r.body && r.body.secure_url);
}
async function loadJson(id) {
  const { cloud, key, secret } = cfg();
  const auth = Buffer.from(`${key}:${secret}`).toString('base64');
  // Métadonnées à jour (numéro de version) pour éviter une copie en cache
  const meta = await request({ hostname: 'api.cloudinary.com', path: `/v1_1/${cloud}/resources/raw/upload/${encodeURIComponent(`noustalgie/albums/${id}.json`)}`, method: 'GET', headers: { Authorization: 'Basic ' + auth } });
  if (!meta.body || !meta.body.secure_url) return null;
  const u = new URL(meta.body.secure_url);
  const r = await request({ hostname: u.hostname, path: u.pathname, method: 'GET' });
  return r.status === 200 ? r.body : null;
}
function sendEmail(payload) {
  if (!process.env.RESEND_API_KEY) return Promise.resolve(null);
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', reply_to: 'contact@noustalgie.fr', ...payload }));
  return request({ hostname: 'api.resend.com', path: '/emails', method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json', 'Content-Length': buf.length } }, buf)
    .then(r => (r.body && r.body.id) || null);
}
const T = {
  fr: { s1: 'Votre album Noustalgie vous attend', h1: 'Votre album est bien enregistré', p1: 'Vous pouvez le reprendre à tout moment, sur n’importe quel appareil, pendant 30 jours.', b: 'Reprendre mon album',
        s2: 'Votre album n’attend plus que vous', h2: 'Il ne manque presque rien', p2: 'Votre livre est composé : photos, textes, mise en page. Reprenez-le en un clic pour le relire ou le commander.', f: 'Lien personnel, valable 30 jours. Ne le transférez pas si vous voulez garder la surprise.' },
  en: { s1: 'Your Noustalgie album is waiting', h1: 'Your album is saved', p1: 'Pick it up anytime, on any device, for the next 30 days.', b: 'Open my album',
        s2: 'Your album is almost ready', h2: 'Almost there', p2: 'Your book is composed: photos, words, layout. Open it in one click to review or order it.', f: 'Personal link, valid for 30 days. Don’t forward it if it’s a surprise.' },
  de: { s1: 'Euer Noustalgie-Album wartet', h1: 'Euer Album ist gespeichert', p1: 'Ihr könnt es 30 Tage lang jederzeit und auf jedem Gerät fortsetzen.', b: 'Mein Album öffnen',
        s2: 'Euer Album ist fast fertig', h2: 'Fast geschafft', p2: 'Euer Buch ist gestaltet: Fotos, Texte, Layout. Öffnet es mit einem Klick, um es zu prüfen oder zu bestellen.', f: 'Persönlicher Link, 30 Tage gültig.' },
  es: { s1: 'Tu álbum Noustalgie te espera', h1: 'Tu álbum está guardado', p1: 'Puedes retomarlo cuando quieras, en cualquier dispositivo, durante 30 días.', b: 'Abrir mi álbum',
        s2: 'Tu álbum casi está listo', h2: 'Ya casi está', p2: 'Tu libro está compuesto: fotos, textos y maquetación. Ábrelo con un clic para revisarlo o pedirlo.', f: 'Enlace personal, válido 30 días.' },
  pt: { s1: 'O teu álbum Noustalgie está à tua espera', h1: 'O teu álbum está guardado', p1: 'Podes retomá-lo quando quiseres, em qualquer dispositivo, durante 30 dias.', b: 'Abrir o meu álbum',
        s2: 'O teu álbum está quase pronto', h2: 'Falta pouco', p2: 'O teu livro está composto: fotos, textos e paginação. Abre-o com um clique para rever ou encomendar.', f: 'Link pessoal, válido 30 dias.' },
};
const mail = (title, text, link, label, foot) => `<div style="background:#f6f4f0;padding:32px 16px;font-family:Georgia,serif"><div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #e4dfd7;border-radius:14px;padding:32px 28px;color:#1c1a18">
<div style="font-size:20px;margin-bottom:22px">Nous<em>talgie</em></div><h2 style="font-weight:400;font-size:24px;margin:0 0 12px">${title}</h2>
<p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#5f5a54">${text}</p>
<div style="margin:26px 0"><a href="${h(link)}" style="background:#1c1a18;color:#fff;padding:14px 26px;border-radius:999px;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;display:inline-block">${label}</a></div>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#8b857d">${foot}</p></div></div>`;

module.exports = async (req, res) => {
  applyCors(req, res, 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  const { cloud, key, secret } = cfg();
  if (!cloud || !key || !secret) return res.status(500).json({ error: 'Configuration incomplète.' });

  if (req.method === 'GET') {
    if (!rateLimit(req, 'album-get', 30, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
    const id = new URLSearchParams((req.url || '').split('?')[1] || '').get('id') || '';
    if (!ID_RE.test(id)) return res.status(400).json({ error: 'Lien invalide.' });
    const album = await loadJson(id);
    if (!album) return res.status(404).json({ error: 'Cet album n’existe plus (les albums sont conservés 30 jours).' });
    res.setHeader('Cache-Control', 'no-store');
    return res.json({ album });
  }
  if (req.method !== 'POST') return res.status(405).end();
  if (!rateLimit(req, 'album-post', 12, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  const { id: givenId, album, email, remind, lang } = parseBody(req);
  if (!album || typeof album !== 'object' || !Array.isArray(album.pages)) return res.status(400).json({ error: 'Album invalide.' });
  const size = JSON.stringify(album).length;
  if (size > MAX_JSON) return res.status(413).json({ error: 'Album trop lourd.' });
  if (JSON.stringify(album).includes('data:image')) return res.status(400).json({ error: 'Photos non envoyées.' });
  const id = ID_RE.test(givenId || '') ? givenId : crypto.randomBytes(12).toString('hex');
  if (!(await saveJson(id, { ...album, savedAt: Date.now() }))) return res.status(502).json({ error: 'La sauvegarde a échoué.' });

  const out = { id, link: `${SITE}/?album=${id}` };
  const L = T[lang] || T.fr;
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
    out.sent = !!(await sendEmail({ to: email, subject: L.s1, html: mail(L.h1, L.p1, out.link, L.b, L.f) }));
    if (remind) {
      const at = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
      const rid = await sendEmail({ to: email, subject: L.s2, html: mail(L.h2, L.p2, out.link, L.b, L.f), scheduled_at: at });
      if (rid) out.reminder = { id: rid, sig: pdfProof(rid, 'reminder') };
    }
  }
  return res.json(out);
};
