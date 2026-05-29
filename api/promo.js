// Codes promo stockés en mémoire (simples, usage unique)
// Format: CODE -> { discount: 100, type: 'free', used: false }
const PROMOS = {
  'ANTOINE34': { discount: 100, type: 'free', used: false },
  'ANTOINE2': { discount: 100, type: 'free', used: false },
  'ANTOINE3': { discount: 100, type: 'free', used: false },
  'ANTOINE4': { discount: 100, type: 'free', used: false },
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { code } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const promo = PROMOS[code?.toUpperCase()];

  if (!promo) return res.json({ valid: false, error: 'Code invalide.' });
  if (promo.used) return res.json({ valid: false, error: 'Ce code a déjà été utilisé.' });

  return res.json({ valid: true, discount: promo.discount, type: promo.type });
};
