// api/chat.js — proxy OpenAI VERROUILLÉ
// - uniquement depuis noustalgie.fr (ou previews du projet)
// - modèle, tokens et format imposés côté serveur
// - images acceptées uniquement en miniatures JPEG, analysées en basse définition
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');

const MODEL = 'gpt-4o';
const MAX_TOKENS = 3500;
const MAX_TEXT_CHARS = 24000;
const MAX_IMAGES = 60;
const MAX_IMAGE_B64 = 280000; // ~200 Ko par miniature

function cleanContent(content) {
  if (typeof content === 'string') return { ok: true, content, chars: content.length, images: 0 };
  if (!Array.isArray(content)) return { ok: false };
  let chars = 0, images = 0;
  const out = [];
  for (const part of content.slice(0, MAX_IMAGES + 10)) {
    if (part && part.type === 'text' && typeof part.text === 'string') {
      chars += part.text.length; out.push({ type: 'text', text: part.text });
    } else if (part && part.type === 'image_url' && part.image_url && typeof part.image_url.url === 'string') {
      const url = part.image_url.url;
      if (!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(url) || url.length > MAX_IMAGE_B64) return { ok: false };
      images++; out.push({ type: 'image_url', image_url: { url, detail: 'low' } });
    }
  }
  if (images > MAX_IMAGES) return { ok: false };
  return { ok: true, content: out, chars, images };
}

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: { message: 'Origine non autorisée.' } });
  // Génération (2 appels) + réécritures ponctuelles depuis l'éditeur
  if (!rateLimit(req, 'chat', 30, 10 * 60 * 1000)) {
    return res.status(429).json({ error: { message: 'Trop de demandes. Réessayez dans quelques minutes.' } });
  }
  const KEY = process.env.OPENAI_API_KEY;
  if (!KEY) return res.status(500).json({ error: { message: 'Configuration serveur incomplète.' } });

  const body = parseBody(req);
  const msgs = Array.isArray(body.messages) ? body.messages.slice(0, 4) : [];
  const messages = [];
  let chars = 0;
  for (const m of msgs) {
    if (!m || (m.role !== 'user' && m.role !== 'system')) continue;
    const c = cleanContent(m.content);
    if (!c.ok) return res.status(400).json({ error: { message: 'Requête invalide.' } });
    chars += c.chars; messages.push({ role: m.role, content: c.content });
  }
  if (!messages.length || chars > MAX_TEXT_CHARS) return res.status(400).json({ error: { message: 'Requête invalide.' } });

  const payload = {
    model: MODEL,
    max_tokens: Math.min(parseInt(body.max_tokens, 10) || 2000, MAX_TOKENS),
    temperature: typeof body.temperature === 'number' ? Math.max(0, Math.min(1.2, body.temperature)) : 0.9,
    messages,
  };
  if (body.response_format && body.response_format.type === 'json_object') payload.response_format = { type: 'json_object' };
  const buf = Buffer.from(JSON.stringify(payload));

  return new Promise((resolve) => {
    const request = https.request({
      hostname: 'api.openai.com', path: '/v1/chat/completions', method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY, 'Content-Length': buf.length },
      timeout: 57000,
    }, (r) => {
      let data = '';
      r.on('data', c => data += c);
      r.on('end', () => {
        try { res.status(r.statusCode).json(JSON.parse(data)); }
        catch (e) { res.status(502).json({ error: { message: 'Réponse IA illisible.' } }); }
        resolve();
      });
    });
    request.on('timeout', () => { request.destroy(); res.status(504).json({ error: { message: 'Délai dépassé.' } }); resolve(); });
    request.on('error', () => { res.status(502).json({ error: { message: 'Service IA indisponible.' } }); resolve(); });
    request.write(buf); request.end();
  });
};
