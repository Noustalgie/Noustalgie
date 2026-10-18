// /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
// 1) géocodage (Photon, puis Nominatim en secours), 2) tuiles vectorielles OpenStreetMap d'OpenFreeMap
// (schéma OpenMapTiles, CDN public sans clé ; attribution imprimée sous la carte), 3) rues, eau et rivières
// découpées, projetées et simplifiées en tracés SVG dans un carré 0..1000 centré sur le lieu.
// Réponse mise en cache 30 jours par le CDN (même ville, même carte).
const https = require('https');
const zlib = require('zlib');
const { rateLimit } = require('../_lib/security');

const UA = 'Noustalgie/1.0 (contact@noustalgie.fr)';
const TILEJSON = 'https://tiles.openfreemap.org/planet';
const Z = 14, R_EARTH = 6378137, WORLD = 2 * Math.PI * R_EARTH;
const MAJOR = /^(motorway|trunk|primary|secondary)$/;
const MINOR = /^(tertiary|minor|street|street_limited)$/;

function get(url, { timeout = 8000, raw = false } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout, headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip' } }, res => {
      const parts = []; let n = 0;
      res.on('data', c => { parts.push(c); n += c.length; if (n > 8e6) req.destroy(new Error('réponse trop lourde')); });
      res.on('end', () => {
        if (res.statusCode === 204) return resolve(raw ? Buffer.alloc(0) : null);
        if (res.statusCode >= 300) return reject(new Error('HTTP ' + res.statusCode));
        let buf = Buffer.concat(parts);
        try {
          if (buf[0] === 0x1f && buf[1] === 0x8b) buf = zlib.gunzipSync(buf);
          resolve(raw ? buf : JSON.parse(buf.toString('utf8')));
        } catch (e) { reject(new Error('réponse illisible')); }
      });
    });
    req.on('timeout', () => req.destroy(new Error('délai dépassé')));
    req.on('error', reject);
  });
}

async function geocode(q) {
  try {
    const j = await get(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1&lang=fr`, { timeout: 6000 });
    const f = j && j.features && j.features[0];
    if (f) {
      const [lon, lat] = f.geometry.coordinates, p = f.properties || {};
      return { lat, lon, name: p.type === 'city' || p.type === 'town' || p.type === 'village' ? p.name : (p.city || p.name || q), type: p.type || p.osm_value || '' };
    }
  } catch (e) { console.warn('[carte] Photon', e.message); }
  const j = await get(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(q)}`, { timeout: 6000 });
  const r = j && j[0];
  if (!r) return null;
  const a = r.address || {};
  return { lat: +r.lat, lon: +r.lon, name: a.city || a.town || a.village || r.name || q, type: r.addresstype || r.type || '' };
}

const radiusFor = type => (/^(city|town|county|state|district|borough|suburb)$/.test(type) ? 1500 : /^(village|hamlet|locality)$/.test(type) ? 1100 : 900);

/* ── Lecture des tuiles vectorielles (Mapbox Vector Tile : protobuf) ── */
function varint(b, p) { let r = 0, m = 1, c; do { c = b[p.i++]; r += (c & 0x7f) * m; m *= 128; } while (c & 0x80); return r; }
function fields(b, start, end, cb) {
  const p = { i: start };
  while (p.i < end) {
    const key = varint(b, p), wt = key & 7, at = p.i;
    cb(key >>> 3, wt, p);
    if (p.i === at) { if (wt === 0) varint(b, p); else if (wt === 1) p.i += 8; else if (wt === 2) p.i += varint(b, p); else if (wt === 5) p.i += 4; else throw new Error('tuile illisible'); }
  }
}
const str = (b, p) => { const n = varint(b, p), s = b.toString('utf8', p.i, p.i + n); p.i += n; return s; };
function value(b, s, e) {
  let v = null;
  fields(b, s, e, (t, w, q) => {
    if (t === 1) v = str(b, q);
    else if (t === 2) { v = b.readFloatLE(q.i); q.i += 4; }
    else if (t === 3) { v = b.readDoubleLE(q.i); q.i += 8; }
    else if (t === 4) {                                   // int64 : un négatif s'écrit sur 10 octets, relu exactement
      const st = q.i; v = varint(b, q);
      if (v >= 2 ** 63) { let r = 0n; for (let i = q.i - 1; i >= st; i--) r = (r << 7n) | BigInt(b[i] & 0x7f); v = Number(BigInt.asIntN(64, r)); }
    }
    else if (t === 5) v = varint(b, q);
    else if (t === 6) { const n = varint(b, q); v = n % 2 ? -(n + 1) / 2 : n / 2; }
    else if (t === 7) v = !!varint(b, q);
  });
  return v;
}
// → { couche: { extent, features: [{ type, tags, rings }] } }, seules les couches demandées sont lues en détail
function decodeTile(b, want) {
  const out = {};
  fields(b, 0, b.length, (tag, wt, p) => {
    if (tag !== 3 || wt !== 2) return;
    const n = varint(b, p), s = p.i, e = s + n; p.i = e;
    let name = '', extent = 4096; const keys = [], vals = [], feats = [];
    fields(b, s, e, (t, w, q) => {
      if (t === 1) name = str(b, q);
      else if (t === 2) { const m = varint(b, q); feats.push([q.i, q.i + m]); q.i += m; }
      else if (t === 3) keys.push(str(b, q));
      else if (t === 4) { const m = varint(b, q); vals.push(value(b, q.i, q.i + m)); q.i += m; }
      else if (t === 5) extent = varint(b, q);
    });
    if (!want.has(name)) return;
    out[name] = { extent, features: feats.map(([fs, fe]) => {
      const f = { type: 0, tags: {}, rings: [] };
      fields(b, fs, fe, (t, w, q) => {
        if (t === 2) { const m = varint(b, q), end = q.i + m; while (q.i < end) { const k = varint(b, q), v = varint(b, q); f.tags[keys[k]] = vals[v]; } }
        else if (t === 3) f.type = varint(b, q);
        else if (t === 4) {
          const m = varint(b, q), end = q.i + m; let x = 0, y = 0, cur = null;
          while (q.i < end) {
            const c = varint(b, q), id = c & 7, cnt = c >>> 3;
            if (id === 1 || id === 2) for (let k = 0; k < cnt; k++) {
              const dx = varint(b, q), dy = varint(b, q);
              x += dx % 2 ? -(dx + 1) / 2 : dx / 2; y += dy % 2 ? -(dy + 1) / 2 : dy / 2;
              if (id === 1) { cur = []; f.rings.push(cur); }
              cur.push([x, y]);
            }
            else if (id === 7 && cur && cur.length) cur.push(cur[0]);
          }
        }
      });
      return f;
    }) };
  });
  return out;
}

// Polygone découpé au carré de la tuile (les tuiles se chevauchent : sans découpe, l'eau serait doublée aux raccords)
function clipRing(ring, E) {
  let pts = ring;
  for (const [axis, lim, keepBelow] of [[0, 0, false], [0, E, true], [1, 0, false], [1, E, true]]) {
    const inside = q => (keepBelow ? q[axis] <= lim : q[axis] >= lim), out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length], ia = inside(a), ib = inside(b);
      if (ia) out.push(a);
      if (ia !== ib) { const t = (lim - a[axis]) / (b[axis] - a[axis]); out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]); }
    }
    pts = out; if (!pts.length) break;
  }
  return pts.length > 2 ? pts : null;
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
// Coordonnées entières et relatives (« l ») : deux fois plus court qu'en absolu
function path(pts, close) {
  const q = simplify(pts, 1.4).map(([x, y]) => [Math.round(x), Math.round(y)]);
  if (q.length < 2) return '';
  let d = `M${q[0][0]} ${q[0][1]}l`;
  for (let i = 1; i < q.length; i++) {
    const dx = q[i][0] - q[i - 1][0], dy = q[i][1] - q[i - 1][1];
    d += (i > 1 && dx >= 0 ? ' ' : '') + dx + (dy >= 0 ? ' ' : '') + dy;
  }
  return d + (close ? 'Z' : '');
}

const mercX = lon => lon * Math.PI / 180 * R_EARTH;
const mercY = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * R_EARTH;
const tileOf = (mx, my) => [Math.floor((mx + WORLD / 2) / WORLD * 2 ** Z), Math.floor((WORLD / 2 - my) / WORLD * 2 ** Z)];

// Tuiles décodées ({ z, x, y, layers }) → tracés, dans un carré 0..1000 où R mètres = 500 unités
function draw(tiles, lat, lon, R) {
  const mx0 = mercX(lon), my0 = mercY(lat), s = 500 * Math.cos(lat * Math.PI / 180) / R;
  const inside = ([x, y]) => x > -120 && x < 1120 && y > -120 && y < 1120;
  const out = { roads: [], major: [], water: [], rivers: [] };
  for (const t of tiles) {
    const L = t.layers || {}, size = WORLD / 2 ** t.z;
    const proj = E => ([px, py]) => [500 + ((t.x + px / E) * size - WORLD / 2 - mx0) * s, 500 - (WORLD / 2 - (t.y + py / E) * size - my0) * s];
    const roads = L.transportation || L.road;
    if (roads) for (const f of roads.features) {
      const c = String(f.tags.class || ''), sub = String(f.tags.subclass || '');
      if (f.type !== 2 || f.tags.brunnel === 'tunnel' || f.tags.structure === 'tunnel') continue;
      const major = MAJOR.test(c), minor = MINOR.test(c) || (c === 'path' && sub === 'pedestrian');
      if (!major && !minor) continue;
      for (const r of f.rings) { const pts = r.map(proj(roads.extent)); if (pts.some(inside)) (major ? out.major : out.roads).push(path(pts, false)); }
    }
    const water = L.water;
    if (water) for (const f of water.features) {
      if (f.type !== 3 || f.tags.class === 'swimming_pool') continue;
      for (const r of f.rings) { const c = clipRing(r, water.extent); if (c) { const pts = c.map(proj(water.extent)); if (pts.some(inside)) out.water.push(path(pts, true)); } }
    }
    const ww = L.waterway;
    if (ww) for (const f of ww.features) {
      if (f.type !== 2 || !/^(river|canal)$/.test(String(f.tags.class || ''))) continue;
      for (const r of f.rings) { const pts = r.map(proj(ww.extent)); if (pts.some(inside)) out.rivers.push(path(pts, false)); }
    }
  }
  const join = a => a.filter(Boolean).join('');
  return { roads: join(out.roads), major: join(out.major), water: join(out.water), rivers: join(out.rivers) };
}

let tmpl = null;                       // adresse des tuiles (change à chaque mise à jour d'OpenFreeMap)
async function tiles(lat, lon, R) {
  if (!tmpl) { const j = await get(TILEJSON, { timeout: 6000 }); tmpl = j && j.tiles && j.tiles[0]; if (!tmpl) throw new Error('TileJSON sans tuiles'); }
  const mx = mercX(lon), my = mercY(lat), r = R / Math.cos(lat * Math.PI / 180) * 1.12;
  const [x0, y0] = tileOf(mx - r, my + r), [x1, y1] = tileOf(mx + r, my - r), list = [];
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) list.push({ z: Z, x, y });
  if (list.length > 12) throw new Error('trop de tuiles');
  const want = new Set(['transportation', 'water', 'waterway']);
  await Promise.all(list.map(async t => {
    const buf = await get(tmpl.replace('{z}', t.z).replace('{x}', t.x).replace('{y}', t.y), { timeout: 8000, raw: true });
    t.layers = buf.length ? decodeTile(buf, want) : {};
  }));
  return list;
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
    const d = draw(await tiles(g.lat, g.lon, R), g.lat, g.lon, R);
    res.setHeader('Cache-Control', 'public, s-maxage=2592000, stale-while-revalidate=604800');
    return res.json(Object.assign(base, d));
  } catch (e) {
    console.warn('[carte] tuiles', e.message);
    tmpl = null;
    res.setHeader('Cache-Control', 'public, s-maxage=600');
    return res.json(base);                                          // sans tracé : la page garde son cœur décoratif
  }
}
module.exports = handler;
Object.assign(module.exports, { _decodeTile: decodeTile, _draw: draw, _simplify: simplify, _clipRing: clipRing });
