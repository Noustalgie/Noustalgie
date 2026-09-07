// api/cleanup.js
// Nettoyage RGPD : supprime les PDF (raw) Cloudinary de plus de 30 jours.
// Déclenché quotidiennement par le cron Vercel (voir vercel.json).
const https = require('https');
const crypto = require('crypto');

// Appel à l'API Admin Cloudinary (auth basique : api_key:api_secret)
function cloudinaryAdmin(method, path, bodyObj) {
  const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
  const KEY = process.env.CLOUDINARY_API_KEY;
  const SECRET = process.env.CLOUDINARY_API_SECRET;
  const auth = Buffer.from(`${KEY}:${SECRET}`).toString('base64');
  const body = bodyObj ? JSON.stringify(bodyObj) : null;
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD}${path}`,
      method,
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
      }
    };
    if (body) options.headers['Content-Length'] = Buffer.byteLength(body);
    const req = https.request(options, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve({ status: r.statusCode, data: JSON.parse(d) }); } catch(e) { resolve({ status: r.statusCode, data: d }); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  // Sécurité : n'autoriser que le cron Vercel (header) ou un secret
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers['authorization'] || '';
  const isVercelCron = req.headers['x-vercel-cron'] === '1';
  if (CRON_SECRET && !isVercelCron && auth !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: 'Clés Cloudinary manquantes' });
  }

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // il y a 30 jours
  let deleted = 0, checked = 0, errors = 0;
  let nextCursor = null;

  try {
    // Parcourir les ressources "raw" (les PDF) par pages
    do {
      let path = `/resources/raw?max_results=100`;
      if (nextCursor) path += `&next_cursor=${encodeURIComponent(nextCursor)}`;
      const listRes = await cloudinaryAdmin('GET', path);
      if (listRes.status >= 300) {
        console.error('Erreur liste Cloudinary:', listRes.status, JSON.stringify(listRes.data).slice(0,200));
        break;
      }
      const resources = (listRes.data && listRes.data.resources) || [];
      nextCursor = listRes.data.next_cursor || null;

      // Identifier ceux plus vieux que 30 jours
      const toDelete = [];
      for (const r of resources) {
        checked++;
        const created = new Date(r.created_at);
        if (created < cutoff) toDelete.push(r.public_id);
      }

      // Supprimer par lots (API delete resources)
      if (toDelete.length > 0) {
        // Cloudinary accepte public_ids[] en DELETE /resources/raw
        const params = toDelete.map(id => `public_ids[]=${encodeURIComponent(id)}`).join('&');
        const delRes = await new Promise((resolve, reject) => {
          const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
          const authB = Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64');
          const options = {
            hostname: 'api.cloudinary.com',
            path: `/v1_1/${CLOUD}/resources/raw?${params}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Basic ' + authB }
          };
          const rq = https.request(options, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{ try{resolve({status:r.statusCode,data:JSON.parse(d)});}catch(e){resolve({status:r.statusCode,data:d});} }); });
          rq.on('error', reject); rq.end();
        });
        if (delRes.status < 300) {
          deleted += toDelete.length;
          console.log(`Supprimé ${toDelete.length} PDF de +30j`);
        } else {
          errors++;
          console.error('Erreur suppression:', delRes.status, JSON.stringify(delRes.data).slice(0,200));
        }
      }
    } while (nextCursor);

    console.log(`Cleanup terminé : ${checked} vérifiés, ${deleted} supprimés, ${errors} erreurs`);
    return res.status(200).json({ checked, deleted, errors });
  } catch(e) {
    console.error('Erreur cleanup:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
