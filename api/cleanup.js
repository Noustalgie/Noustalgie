// api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
// Supprime les PDF (raw) et les photos (image) de plus de 30 jours sur Cloudinary.
const https = require('https');

function admin(method, path) {
  const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
  const auth = Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64');
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: 'api.cloudinary.com', path: `/v1_1/${CLOUD}${path}`, method, headers: { Authorization: 'Basic ' + auth } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve({ status: r.statusCode, data: JSON.parse(d) }); } catch (e) { resolve({ status: r.statusCode, data: d }); } });
    });
    req.on('error', reject); req.end();
  });
}

async function purge(resourceType, prefix, cutoff, stats) {
  let cursor = null;
  do {
    let path = `/resources/${resourceType}/upload?max_results=100`;
    if (prefix) path += `&prefix=${encodeURIComponent(prefix)}`;
    if (cursor) path += `&next_cursor=${encodeURIComponent(cursor)}`;
    const list = await admin('GET', path);
    if (list.status >= 300) { stats.errors++; console.error('Liste', resourceType, list.status); break; }
    const resources = list.data.resources || [];
    cursor = list.data.next_cursor || null;
    const old = resources.filter(r => { stats.checked++; return new Date(r.created_at) < cutoff; }).map(r => r.public_id);
    if (old.length) {
      const q = old.map(id => `public_ids[]=${encodeURIComponent(id)}`).join('&');
      const del = await admin('DELETE', `/resources/${resourceType}/upload?${q}`);
      if (del.status < 300) stats.deleted += old.length; else { stats.errors++; console.error('Suppression', resourceType, del.status); }
    }
  } while (cursor);
}

module.exports = async (req, res) => {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers['authorization'] || '';
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) return res.status(401).json({ error: 'Unauthorized' });
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return res.status(500).json({ error: 'Clés Cloudinary manquantes' });

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const stats = { checked: 0, deleted: 0, errors: 0 };
  try {
    await purge('raw', '', cutoff, stats);                     // PDF d'albums
    await purge('image', 'noustalgie/', cutoff, stats);        // photos clients
    console.log('Cleanup', stats);
    return res.status(200).json(stats);
  } catch (e) {
    console.error('Erreur cleanup:', e.message);
    return res.status(500).json({ error: e.message, ...stats });
  }
};
