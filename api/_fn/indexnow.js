// /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search et Copilot)
// les pages du sitemap modifiées depuis la veille. Le sitemap est lu sur le site en ligne : seules les pages déjà publiées partent.
const KEY = '5598547cefa38c11e1fb92e98263de80';

module.exports = async (req, res) => {
  const CRON_SECRET = process.env.CRON_SECRET;
  if (!CRON_SECRET || (req.headers['authorization'] || '') !== `Bearer ${CRON_SECRET}`) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const xml = await (await fetch('https://noustalgie.fr/sitemap.xml', { signal: AbortSignal.timeout(10000) })).text();
    const depuis = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g)].filter(m => m[2] >= depuis).map(m => m[1]);
    if (!urlList.length) return res.status(200).json({ envoyees: 0 });
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ host: 'noustalgie.fr', key: KEY, keyLocation: `https://noustalgie.fr/${KEY}.txt`, urlList }),
    });
    console.log('IndexNow', r.status, urlList.length);
    return res.status(200).json({ envoyees: urlList.length, indexnow: r.status });
  } catch (e) {
    console.error('Erreur IndexNow:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
