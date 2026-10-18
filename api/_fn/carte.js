// /api/carte?q=Lille — plan du lieu de rencontre pour la page « Là où tout a commencé ».
// 1) géocodage (Photon, puis Nominatim en secours), 2) rues et eau autour du point (Overpass, données
// OpenStreetMap, attribution imprimée sous la carte), 3) projection, découpe et simplification en tracés SVG
// dans un carré 0..1000 centré sur le lieu. Réponse mise en cache 30 jours par le CDN (même ville, même carte).
const https = require('https');
const { rateLimit } = require('../_lib/security');

const UA = 'Noustalgie/1.0 (contact@noustalgie.fr)';
// Serveurs Overpass publics, essayés l'un après l'autre (le principal limite les adresses IP partagées des hébergeurs)
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const MAJOR = /^(motorway|trunk|primary|secondary)(_link)?$/;

function request(url, { method = 'GET', body = null, timeout = 8000 } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method, timeout,
      headers: Object.assign({ 'User-Agent': UA, Accept: 'application/json' }, body ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } : {}) }, res => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => { data += c; if (data.length > 30e6) req.destroy(new Error('réponse trop lourde')); });
      res.on('end', () => {
        if (res.statusCode >= 300) return reject(new Error('HTTP ' + res.statusCode));
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('JSON illisible')); }
      });
    });
    req.on('timeout', () => req.destroy(new Error('délai dépassé')));
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function geocode(q) {
  try {
    const j = await request(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1&lang=fr`, { timeout: 6000 });
    const f = j && j.features && j.features[0];
    if (f) {
      const [lon, lat] = f.geometry.coordinates, p = f.properties || {};
      return { lat, lon, name: p.type === 'city' || p.type === 'town' || p.type === 'village' ? p.name : (p.city || p.name || q), type: p.type || p.osm_value || '' };
    }
  } catch (e) { /* secours ci-dessous */ }
  const j = await request(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(q)}`, { timeout: 6000 });
  const r = j && j[0];
  if (!r) return null;
  const a = r.address || {};
  return { lat: +r.lat, lon: +r.lon, name: a.city || a.town || a.village || r.name || q, type: r.addresstype || r.type || '' };
}

const radiusFor = type => (/^(city|town|county|state|district|borough|suburb)$/.test(type) ? 1500 : /^(village|hamlet|locality)$/.test(type) ? 1100 : 900);

async function overpass(lat, lon, R) {
  const A = `(around:${R},${lat},${lon})`;
  const q = `[out:json][timeout:12];(way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|pedestrian)(_link)?$"]${A};`
    + `way["natural"="water"]${A};relation["natural"="water"]${A};way["waterway"="riverbank"]${A};way["waterway"~"^(river|canal)$"]${A};);out geom;`;
  let last;
  for (const url of OVERPASS) {
    const t0 = Date.now();
    try { return await request(url, { method: 'POST', body: 'data=' + encodeURIComponent(q), timeout: 9000 }); }
    catch (e) { last = e; console.warn('[carte] Overpass', new URL(url).hostname, e.message, Date.now() - t0, 'ms'); }
  }
  throw last;
}

// Ramer-Douglas-Peucker (tolérance en unités de la carte 0..1000)
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let idx = -1, max = tol * tol;
    const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1;
    for (let i = a + 1; i < b; i++) {
      const t = Math.max(0, Math.min(1, ((pts[i][0] - ax) * dx + (pts[i][1] - ay) * dy) / L));
      const ex = ax + t * dx - pts[i][0], ey = ay + t * dy - pts[i][1], d = ex * ex + ey * ey;
      if (d > max) { max = d; idx = i; }
    }
    if (idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

// Éléments Overpass → tracés SVG (rues fines, grands axes, plans d'eau, rivières)
function draw(data, lat, lon, R) {
  const kx = Math.cos(lat * Math.PI / 180) * 111320, ky = 110540, s = 500 / R;
  const P = g => [500 + (g.lon - lon) * kx * s, 500 - (g.lat - lat) * ky * s];
  const inside = ([x, y]) => x > -120 && x < 1120 && y > -120 && y < 1120;
  // Coordonnées entières et relatives (« l ») : deux fois plus court qu'en absolu
  const path = (pts, close) => {
    const q = simplify(pts, 1.4).map(([x, y]) => [Math.round(x), Math.round(y)]);
    if (q.length < 2) return '';
    let d = `M${q[0][0]} ${q[0][1]}l`;
    for (let i = 1; i < q.length; i++) {
      const dx = q[i][0] - q[i - 1][0], dy = q[i][1] - q[i - 1][1];
      d += (i > 1 && dx >= 0 ? ' ' : '') + dx + (dy >= 0 ? ' ' : '') + dy;
    }
    return d + (close ? 'Z' : '');
  };
  const out = { roads: [], major: [], water: [], rivers: [] };
  for (const el of (data && data.elements) || []) {
    const t = el.tags || {};
    if (el.type === 'way' && el.geometry) {
      const pts = el.geometry.map(P);
      if (!pts.some(inside)) continue;
      if (t.highway) (MAJOR.test(t.highway) ? out.major : out.roads).push(path(pts, false));
      else if (t.natural === 'water' || t.waterway === 'riverbank') out.water.push(path(pts, true));
      else if (t.waterway) out.rivers.push(path(pts, false));
    } else if (el.type === 'relation' && el.members) {
      const parts = el.members.filter(m => m.type === 'way' && m.geometry).map(m => m.geometry.map(P)).filter(p => p.some(inside));
      parts.forEach(p => out.water.push(path(p, true)));
    }
  }
  const join = a => a.filter(Boolean).join('');
  return { roads: join(out.roads), major: join(out.major), water: join(out.water), rivers: join(out.rivers) };
}

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const q = String((req.query && req.query.q) || '').trim().slice(0, 120);
  if (q.length < 2) return res.status(400).json({ error: 'Lieu manquant.' });
  if (!rateLimit(req, 'carte', 20, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  let g;
  try { g = await geocode(q); } catch (e) { console.warn('[carte] géocodage', e.message); return res.status(502).json({ error: 'Lieu introuvable pour le moment.' }); }
  if (!g) return res.status(404).json({ error: 'Lieu introuvable.' });
  const base = { name: g.name, lat: Math.round(g.lat * 1e4) / 1e4, lon: Math.round(g.lon * 1e4) / 1e4 };
  if (/^(country|state)$/.test(g.type)) { res.setHeader('Cache-Control', 'public, s-maxage=2592000'); return res.json(base); }
  try {
    const R = radiusFor(g.type);
    const d = draw(await overpass(g.lat, g.lon, R), g.lat, g.lon, R);
    res.setHeader('Cache-Control', 'public, s-maxage=2592000, stale-while-revalidate=604800');
    return res.json(Object.assign(base, d));
  } catch (e) {
    res.setHeader('Cache-Control', 'public, s-maxage=600');
    return res.json(base);                                          // sans tracé : la page garde son cœur décoratif
  }
}
module.exports = handler;
module.exports._draw = draw;
module.exports._simplify = simplify;
