// api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une commande.
// Environnement : PRINTAPI_CLIENT_ID + PRINTAPI_SECRET ; PRINTAPI_ENV=live pour les vraies commandes (sinon environnement de test, rien n'est imprimé).
const https = require('https');

const host = () => (process.env.PRINTAPI_ENV === 'live' ? 'live.printapi.nl' : 'test.printapi.nl');
// En production, seules des clés « live » comptent : des clés de test y feraient des commandes jamais imprimées
const configured = () => !!(process.env.PRINTAPI_CLIENT_ID && process.env.PRINTAPI_SECRET)
  && (process.env.VERCEL_ENV !== 'production' || process.env.PRINTAPI_ENV === 'live');

// Livres à couverture rigide brillante, papier intérieur « Premium » non couché (finitions par défaut du produit) :
// 21 × 21 cm (carré) et A4 portrait 21 × 29,7 cm (fiche produit lue le 22 novembre 2026 : /api/tools?fn=sante&produits=boek_hc_a4_sta)
const BOOKS = { carre: 'boek_hc_21x21', a4: 'boek_hc_a4_sta' };
const BOOK = BOOKS.carre;
const bookOf = b => (b === 'a4' ? 'a4' : 'carre');
// Pages intérieures avec 3 mm de fond perdu, et hauteur de la couverture d'un seul tenant (rabats compris), par format
const INNER_MM = { carre: '216mmx216mm', a4: '216mmx303mm' };
const COVER_H = { carre: 254, a4: 342 };
// Couverture à 24 pages : 478 mm de large en carré (rabats de 19 mm, plats de 217 mm, dos de 6 mm), 477 en A4 (plats de 216,5 mm,
// fiche produit), puis 0,1432 mm par feuille en plus
const COVER_W = { carre: 478, a4: 477 };
const coverWidthMm = (innerPages, book) => +(COVER_W[bookOf(book)] + Math.max(0, innerPages - 24) / 2 * 0.1432).toFixed(2);
const spineMm = innerPages => +(6 + Math.max(0, innerPages - 24) / 2 * 0.1432).toFixed(2);
// Pages intérieures envoyées : celles de l'album sans les deux couvertures, 24 au minimum (pages vierges ajoutées en fin de livre)
const innerCount = albumPages => Math.max(24, albumPages - 2);
// Objets livrés dans le même colis que le livre
const EXTRAS = { affiche: 'poster_30x40', cadre: 'tegeltje_15x15_hou_houder', aimant: 'tegeltje_5x5' };

function call(method, path, body, token, form) {
  return new Promise(resolve => {
    const buf = body ? Buffer.from(form ? body : JSON.stringify(body)) : null;
    const req = https.request({ hostname: host(), path, method, timeout: 25000,
      headers: Object.assign({ Accept: 'application/json' }, token ? { Authorization: 'Bearer ' + token } : {},
        buf ? { 'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json', 'Content-Length': buf.length } : {}) }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j, raw: d }); });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: null, raw: 'timeout' }); });
    req.on('error', e => resolve({ status: 0, body: null, raw: 'réseau: ' + e.message }));
    if (buf) req.write(buf); req.end();
  });
}

// Jeton valable 4 h, gardé tant que la fonction reste chaude
let tok = null;
async function token() {
  if (tok && tok.exp > Date.now()) return tok.v;
  const r = await call('POST', '/v2/oauth', `grant_type=client_credentials&client_id=${encodeURIComponent(process.env.PRINTAPI_CLIENT_ID)}&client_secret=${encodeURIComponent(process.env.PRINTAPI_SECRET)}`, null, true);
  const v = r.body && r.body.access_token;
  if (!v) throw new Error(`OAuth Print API refusé (HTTP ${r.status}) ${String(r.raw).slice(0, 200)}`);
  tok = { v, exp: Date.now() + Math.max(60, (r.body.expires_in || 3600) - 300) * 1000 };
  return v;
}

async function getOrder(id) {
  if (!configured() || !id) return null;
  const r = await call('GET', `/v2/orders/${encodeURIComponent(id)}`, null, await token());
  return r.status === 200 && r.body && r.body.id ? r.body : null;
}

async function postOrder(payload) {
  const r = await call('POST', '/v2/orders', payload, await token());
  if (r.status && r.status < 300 && r.body && r.body.id) return { order: r.body };
  return { order: null, err: `HTTP ${r.status} — ${String(r.raw).slice(0, 600)}` };
}

module.exports = { configured, host, call, token, getOrder, postOrder, BOOK, BOOKS, bookOf, INNER_MM, COVER_H, EXTRAS, coverWidthMm, spineMm, innerCount };
