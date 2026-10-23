# Album vitrine « magazine » : rend les 24 pages de mag/vitrine.json avec le vrai moteur du site
# (NA.renderPage de public/index.html), en 1588 px, pour les slides et le film.
#   python3 tools/mag-pages.py [--theme magazine]   → out/mag/pages/page-01.jpg … page-24.jpg
#   python3 tools/mag-pages.py --vitrine mag/vitrine-paris.json --theme seventies   → out/mag/pages-paris-seventies/ (autre album d'exemple)
#   python3 tools/mag-pages.py --vitrine mag/vitrine-lyon.json   → out/mag/pages-lyon/ (photos de out/mag/album-lyon, hors dépôt)
#                                                    + pano-g.jpg / pano-d.jpg (double page paysage des slides, clé « pano »)
import asyncio, json, os, sys
VIDEO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPOT = os.path.dirname(VIDEO)
sys.path.insert(0, os.path.join(DEPOT, 'outils'))
import rendu
from playwright.async_api import async_playwright
from PIL import Image

THEME = sys.argv[sys.argv.index('--theme') + 1] if '--theme' in sys.argv else 'magazine'
VITRINE = sys.argv[sys.argv.index('--vitrine') + 1] if '--vitrine' in sys.argv else os.path.join('mag', 'vitrine.json')
NOM = os.path.basename(VITRINE)[:-5].replace('vitrine', '').strip('-')          # vitrine-paris.json → « paris »
OUT = os.path.join(VIDEO, 'out', 'mag', '-'.join(['pages'] + ([NOM] if NOM else []) + ([THEME] if THEME != 'magazine' else [])))
SPEC = json.load(open(os.path.join(VIDEO, VITRINE), encoding='utf-8'))
PH = json.load(open(os.path.join(VIDEO, SPEC.get('photos', os.path.join('mag', 'photos.json')))))   # clé « photos » : autre jeu de photos
IDX = {o['n'].replace('.jpg', ''): i for i, o in enumerate(PH)}


async def main():
    os.makedirs(OUT, exist_ok=True)
    rendu.installer_polices()
    srv = rendu.serveur(DEPOT)
    pages = [{'layout': p['layout'], 'v': p.get('v', 0), 'k': p.get('k'), 't': p['t'],
              'slots': [{'p': IDX[n], 'f': 'none', 'z': 1, **p.get('cadre', {})} for n in p.get('ph', [])]} for p in SPEC['pages'] + SPEC.get('pano', [])]
    noms = [f'page-{i + 1:02d}' for i in range(len(SPEC['pages']))] + ['pano-g', 'pano-d'][:len(SPEC.get('pano', []))]
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
          NA.pages = a.pages; NA.theme = a.theme; NA.info = { carte: a.carte, names: a.names, n1: a.n1, n2: a.n2 }; window.__photos = a.photos; }""",
                          {'pages': pages, 'photos': photos, 'carte': SPEC['carte'], 'theme': THEME,
                           'names': SPEC.get('names', 'Léa & Hugo'), 'n1': SPEC.get('n1', 'Léa'), 'n2': SPEC.get('n2', 'Hugo')})
        for i in range(len(pages)):
            await pg.evaluate("""async (i) => { const host = document.getElementById('nstShot');
              host.innerHTML = NA.renderPage(NA.pages[i], { photos: window.__photos, theme: NA.theme });
              await document.fonts.ready; await Promise.all([...host.querySelectorAll('img')].map(im => im.decode().catch(() => {}))); }""", i)
            f = os.path.join(OUT, noms[i] + '.png')
            await pg.locator('#nstShot').screenshot(path=f)
            Image.open(f).convert('RGB').save(f[:-4] + '.jpg', quality=93)
            os.remove(f)
        await nav.close()
    if errs:
        sys.exit('erreurs JavaScript : ' + '; '.join(errs))
    print(len(SPEC['pages']), 'pages', '+ double page paysage' if SPEC.get('pano') else '', 'dans', os.path.relpath(OUT, VIDEO))

asyncio.run(main())
