"""Écran du MacBook du film « ordinateur » : le vrai site (1440 × 900, 16:10) aux étapes du parcours d'Inès et Théo.
  python3 tools/mac-ecran.py   → out/mag/mac/ecran/
    accueil-00…NN.png  prénoms tapés lettre par lettre dans « Essayez avec vos deux prénoms »
    photos-00…NN.png   leurs photos ajoutées par petits paquets (out/mag/album-lyon/hd, hors dépôt)
    album-00…NN.png    l'album composé (vitrine-lyon, style Années 70), page après page dans l'éditeur
Polices réelles et photos du haut de page servies localement (outils/rendu.py)."""
import asyncio, json, os, sys
VIDEO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPOT = os.path.dirname(VIDEO)
sys.path.insert(0, os.path.join(DEPOT, 'outils'))
import rendu
from playwright.async_api import async_playwright

OUT = os.path.join(VIDEO, 'out', 'mag', 'mac', 'ecran')
SPEC = json.load(open(os.path.join(VIDEO, 'mag', 'vitrine-lyon.json'), encoding='utf-8'))
PH = json.load(open(os.path.join(VIDEO, SPEC['photos'])))
IDX = {o['n'].replace('.jpg', ''): i for i, o in enumerate(PH)}
NOMS = 'Inès & Théo'


async def main():
    os.makedirs(OUT, exist_ok=True)
    rendu.installer_polices()
    srv = rendu.serveur(os.path.join(DEPOT, 'public'))

    async def route(r):                                  # photos de l'album, hors de public/
        u = r.request.url
        if '/video/out/' in u:
            return await r.fulfill(path=os.path.join(DEPOT, u.split('127.0.0.1:%d/' % srv.server_address[1])[1].split('?')[0]))
        return await rendu.routage(r)

    async with async_playwright() as p:
        nav = await p.chromium.launch()
        pg = await nav.new_page(viewport={'width': 1440, 'height': 900}, device_scale_factor=1.5)
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
        await pg.route('**/*', route)
        await pg.goto(f'http://127.0.0.1:{srv.server_address[1]}/index.html', wait_until='load')
        await pg.wait_for_timeout(2500)
        await pg.evaluate("document.querySelectorAll('.nst-rv').forEach(e => e.classList.add('in')); document.documentElement.style.scrollBehavior = 'auto'")
        await pg.add_style_tag(content='html,body{scroll-behavior:auto!important}')
        shot = lambda nom: pg.screenshot(path=os.path.join(OUT, nom + '.png'))

        # 1. accueil : les prénoms tapés un à un
        await pg.click('#nstTry')
        await shot('accueil-00')
        for i in range(1, len(NOMS) + 1):
            await pg.fill('#nstTry', NOMS[:i])
            await pg.wait_for_timeout(260)
            await shot('accueil-%02d' % i)

        # 2. les photos ajoutées par paquets de 4 (étape « Vos photos »)
        await pg.evaluate("startApp()")
        await pg.wait_for_timeout(1500)
        await pg.evaluate("S.done.add(0); goTab(1)")
        await pg.wait_for_timeout(800)
        await pg.evaluate("document.getElementById('panel1').scrollIntoView({ block: 'start' }); window.scrollBy(0, -90)")
        await shot('photos-00')
        urls = ['/video/out/mag/album-lyon/hd/' + o['n'] for o in PH]
        for k in range(0, 24, 4):
            await pg.evaluate("""async (us) => { const fs = [];
              for (const u of us) { const b = await (await fetch(u)).blob(); fs.push(new File([b], u.split('/').pop(), { type: 'image/jpeg', lastModified: Date.now() })); }
              await window.addPhotos(fs); }""", urls[k:k + 4])
            await pg.wait_for_timeout(1800)
            await pg.evaluate("document.getElementById('panel1').scrollIntoView({ block: 'start' }); window.scrollBy(0, -90)")
            await shot('photos-%02d' % (k // 4 + 1))

        # 3. l'album composé, page après page dans l'éditeur
        pages = [{'layout': q['layout'], 'v': q.get('v', 0), 'k': q.get('k'), 't': q['t'],
                  'slots': [{'p': IDX[n], 'f': 'none', 'z': 1, **q.get('cadre', {})} for n in q.get('ph', [])]} for q in SPEC['pages']]
        photos = [{'data': o['f'], 'w': o['w'], 'h': o['h'], 'ratio': o['w'] / o['h'],
                   'orient': 'portrait' if o['w'] / o['h'] < 0.8 else 'paysage' if o['w'] / o['h'] > 1.25 else 'carre'} for o in PH]
        await pg.evaluate("""(a) => { S.photos = a.photos; NA.pages = a.pages; NA.theme = 'seventies';
          NA.info = { carte: a.carte, names: a.names, n1: a.n1, n2: a.n2 }; S.story = S.story || { captions: [], mag: {} };
          NA.cur = 0; S.done.add(0); S.done.add(1); S.done.add(2); goTab(3);
          document.getElementById('panel3').scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }""",
                          {'pages': pages, 'photos': photos, 'carte': SPEC['carte'], 'names': SPEC['names'], 'n1': SPEC['n1'], 'n2': SPEC['n2']})
        await pg.wait_for_timeout(2500)
        await pg.evaluate("[...document.querySelectorAll('button')].filter(b => b.textContent.trim() === 'Compris').forEach(b => b.click())")
        await pg.wait_for_timeout(400)
        for i in range(4):
            await pg.evaluate("document.getElementById('nstSpread').scrollIntoView({ block: 'center' })")
            await pg.wait_for_timeout(200)
            await shot('album-%02d' % i)
            await pg.evaluate("(document.getElementById('nstNext') || {}).click && document.getElementById('nstNext').click()")
            await pg.wait_for_timeout(1500)
        await nav.close()
    srv.shutdown()
    if errs:
        print('erreurs JavaScript :', '; '.join(errs))
    print('écrans dans', os.path.relpath(OUT, VIDEO))

asyncio.run(main())
