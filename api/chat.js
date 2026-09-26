// api/chat.js — proxy OpenAI VERROUILLÉ
// - uniquement depuis noustalgie.fr (ou previews du projet)
// - modèle et nombre de tokens imposés côté serveur
// - taille du prompt et fréquence d'appel limitées
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');

const MODEL = 'gpt-4o';
const MAX_TOKENS = 3000;
const MAX_PROMPT_CHARS = 24000;

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: { message: 'Origine non autorisée.' } });
  // 12 générations / 10 min par IP : largement assez pour un vrai client
  if (!rateLimit(req, 'chat', 12, 10 * 60 * 1000)) {
    return res.status(429).json({ error: { message: 'Trop de demandes. Réessayez dans quelques minutes.' } });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: { message: 'Configuration serveur incomplète.' } });

  const body = parseBody(req);
  const msgs = Array.isArray(body.messages) ? body.messages : [];
  const messages = msgs
    .filter(m => m && (m.role === 'user' || m.role === 'system') && typeof m.content === 'string')
    .slice(0, 4)
    .map(m => ({ role: m.role, content: m.content }));
  const totalChars = messages.reduce((n, m) => n + m.content.length, 0);
  if (!messages.length || totalChars > MAX_PROMPT_CHARS) {
    return res.status(400).json({ error: { message: 'Requête invalide.' } });
  }

  const payload = {
    model: MODEL,
    max_tokens: Math.min(parseInt(body.max_tokens, 10) || MAX_TOKENS, MAX_TOKENS),
    messages,
  };
  const buf = Buffer.from(JSON.stringify(payload));

  return new Promise((resolve) => {
    const request = https.request({
      hostname: 'api.openai.com', path: '/v1/chat/completions', method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + OPENAI_API_KEY, 'Content-Length': buf.length },
      timeout: 55000,
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
