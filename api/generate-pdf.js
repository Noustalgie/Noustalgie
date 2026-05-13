const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { pages, title } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!pages || !pages.length) return res.status(400).json({ error: 'Pages manquantes' });

    // HTML complet de l'album
    const html = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"/>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { background:#000; }
      .page {
        width: 630px; height: 630px;
        page-break-after: always;
        overflow: hidden;
        position: relative;
      }
      .page:last-child { page-break-after: avoid; }
    </style>
    </head><body>
    ${pages.map(p => `<div class="page">${p.html}</div>`).join('')}
    </body></html>`;

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 630, height: 630 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

    const pdf = await page.pdf({
      width: '210mm',
      height: '210mm',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    const base64 = Buffer.from(pdf).toString('base64');
    return res.json({ pdf: base64 });

  } catch(e) {
    console.error('PDF gen error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
