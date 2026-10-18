# Album vitrine « magazine » : rend les 24 pages de mag/vitrine.json avec le vrai moteur du site
# (NA.renderPage de public/index.html), en 1588 px, pour les slides et le film.
#   python3 tools/mag-pages.py [--theme magazine]   → out/mag/pages/page-01.jpg … page-24.jpg
import asyncio, json, os, sys
VIDEO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPOT = os.path.dirname(VIDEO)
sys.path.insert(0, os.path.join(DEPOT, 'outils'))
import rendu
from playwright.async_api import async_playwright
from PIL import Image

THEME = sys.argv[sys.argv.index('--theme') + 1] if '--theme' in sys.argv else 'magazine'
OUT = os.path.join(VIDEO, 'out', 'mag', 'pages' if THEME == 'magazine' else 'pages-' + THEME)
PH = json.load(open(os.path.join(VIDEO, 'mag', 'photos.json')))
IDX = {o['n'].replace('.jpg', ''): i for i, o in enumerate(PH)}
SPEC = json.load(open(os.path.join(VIDEO, 'mag', 'vitrine.json'), encoding='utf-8'))


async def main():
    os.makedirs(OUT, exist_ok=True)
    rendu.installer_polices()
    srv = rendu.serveur(DEPOT)
    pages = [{'layout': p['layout'], 'v': p.get('v', 0), 'k': p.get('k'), 't': p['t'],
              'slots': [{'p': IDX[n], 'z': 1, 'f': 'none'} for n in p.get('ph', [])]} for p in SPEC['pages']]
    photos = [{'data': o['f'], 'w': o['w'], 'h': o['h'], 'ratio': o['w'] / o['h'],
               'orient': 'portrait' if o['w'] / o['h'] < 0.8 else 'paysage' if o['w'] / o['h'] > 1.25 else 'carre'} for o in PH]
    async with async_playwright() as p:
        nav = await p.chromium.launch()
        pg = await nav.new_page(viewport={'width': 900, 'height': 900}, device_scale_factor=2)
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
        await pg.route('**/*', rendu.routage)
        await pg.goto(f'http://127.0.0.1:{srv.server_address[1]}/public/index.html', wait_until='load')
        await pg.add_style_tag(content='#nstShot{position:fixed;left:0;top:0;width:794px;height:794px;z-index:2147483647;background:#fff}')
        await pg.evaluate("""(a) => { const d = document.createElement('div'); d.id = 'nstShot'; document.body.appendChild(d);
          NA.pages = a.pages; NA.theme = a.theme; NA.info = { carte: a.carte, names: 'Léa & Hugo', n1: 'Léa', n2: 'Hugo' }; window.__photos = a.photos; }""",
                          {'pages': pages, 'photos': photos, 'carte': SPEC['carte'], 'theme': THEME})
        for i in range(len(pages)):
            await pg.evaluate("""async (i) => { const host = document.getElementById('nstShot');
              host.innerHTML = NA.renderPage(NA.pages[i], { photos: window.__photos, theme: NA.theme });
              await document.fonts.ready; await Promise.all([...host.querySelectorAll('img')].map(im => im.decode().catch(() => {}))); }""", i)
            f = os.path.join(OUT, f'page-{i + 1:02d}.png')
            await pg.locator('#nstShot').screenshot(path=f)
            Image.open(f).convert('RGB').save(f[:-4] + '.jpg', quality=93)
            os.remove(f)
        await nav.close()
    if errs:
        sys.exit('erreurs JavaScript : ' + '; '.join(errs))
    print(len(pages), 'pages dans', os.path.relpath(OUT, VIDEO))

asyncio.run(main())
