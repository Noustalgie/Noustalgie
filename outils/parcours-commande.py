#!/usr/bin/env python3
"""Parcours de commande joué de bout en bout, comme un client, sur de nombreux cas.

Le vrai site dans Chromium, et pour le serveur les vraies fonctions api/generate-pdf.js et api/create-checkout.js
(outils/parcours-serveur.js) : seuls PDFShift, Cloudinary, Stripe et Print API sont simulés. Chaque cas compose un
album, remplit le formulaire et clique sur « Payer » ; il passe si la page s'ouvre sur Stripe avec le bon livre,
le bon prix et les fichiers d'impression attendus.

    python3 outils/parcours-commande.py            # tous les cas, code de sortie 1 si un échoue
    python3 outils/parcours-commande.py --cas 3    # un seul cas (numéro de la liste)
"""
import argparse, asyncio, json, os, subprocess, sys, urllib.request
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rendu
from playwright.async_api import async_playwright

DEPOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(DEPOT, 'public')
PH = ['img/exemple/photo-portee.jpg', 'img/exemple/photo-bouquet.jpg', 'img/exemple/photo-champ.jpg', 'img/exemple/photo-lumieres.jpg',
      'img/exemple/photo-mains.jpg', 'img/exemple/photo-montagne.jpg', 'img/exemple/photos/allee.jpg', 'img/exemple/photos/arche.jpg',
      'img/exemple/photos/assis.jpg', 'img/exemple/photos/bouquet.jpg', 'img/exemple/photos/invites.jpg', 'img/exemple/photos/montagne.jpg',
      'img/exemple/photos/sortie.jpg']
LOCAL = {}
PHOTOS = []
for k in range(3):                                   # 39 photos : assez pour 50 pages
    for i, f in enumerate(PH):
        n = f'parcours-{k}-{i}'
        w, h = Image.open(os.path.join(PUB, f)).size
        r = w / h
        LOCAL[n] = os.path.join(PUB, f)
        PHOTOS.append({'pid': f'noustalgie/essai/{n}', 'cloud': 'daxkn7pyb', 'data': '/' + f, 'thumb': '/' + f, 'w': w, 'h': h, 'ratio': r,
                       'orient': 'portrait' if r < .8 else 'paysage' if r > 1.25 else 'carre', 'name': n})

# Cas : pages, format, style (clé de NA.THEMES, None = Magazine), options, pays, langue, format choisi APRÈS la composition, code promo
CAS = [
    dict(pages=24), dict(pages=36), dict(pages=50),
    dict(pages=36, format='pdf'), dict(pages=24, format='pdf'),
    dict(pages=36, style='seventies'), dict(pages=24, style='nuit'), dict(pages=50, style='argentique'),
    dict(pages=36, options=['coffret', 'express']), dict(pages=24, options=['affiche', 'cadre', 'aimant']),
    dict(pages=50, options=['coffret', 'express', 'affiche', 'cadre', 'aimant']),
    dict(pages=24, apres=50), dict(pages=50, apres=24), dict(pages=36, apres=24, format='pdf'),
    dict(pages=24, apres=50, photos=16),                 # trop peu de photos pour 50 pages : message, l'album reste à 24
    dict(pages=36, pays='BE'), dict(pages=24, pays='CH'), dict(pages=36, pays='CH', options=['coffret']),
    dict(pages=36, langue='en'), dict(pages=24, langue='de', options=['aimant']),
    dict(pages=36, promo='MOITIE'), dict(pages=36, promo='MOITIE', options=['coffret']),
    dict(pages=36, mobile=True), dict(pages=24, mobile=True, options=['coffret', 'affiche'], apres=36),
]


def demarrer_serveur():
    p = subprocess.Popen(['node', os.path.join(DEPOT, 'outils', 'parcours-serveur.js')], stdout=subprocess.PIPE, text=True)
    return p, int(p.stdout.readline())


async def jouer(nav, port, api, i, c):
    c = dict(dict(format='print', style=None, options=[], pays='FR', langue='fr', apres=None, promo=None, photos=None, mobile=False), **c)
    ctx = await nav.new_context(viewport={'width': 390, 'height': 844} if c['mobile'] else {'width': 1280, 'height': 900}, is_mobile=c['mobile'], has_touch=c['mobile'])
    pg = await ctx.new_page()
    alertes, erreurs, stripe = [], [], {'ok': False}
    pg.on('pageerror', lambda e: erreurs.append(str(e)[:200]))
    pg.on('dialog', lambda d: (alertes.append(d.message), asyncio.ensure_future(d.dismiss())))

    async def route(r):
        u = r.request.url
        if u.startswith('https://checkout.stripe.com/'):
            stripe['ok'] = True
            return await r.fulfill(status=200, content_type='text/html', body='<p>Stripe</p>')
        if 'res.cloudinary.com' in u and '/image/' in u:
            k = u.rsplit('/', 1)[1].split('.')[0]
            return await r.fulfill(path=LOCAL[k], content_type='image/jpeg') if k in LOCAL else await r.abort()
        if f'127.0.0.1:{port}/api/' in u:
            q = u.split(f'127.0.0.1:{port}', 1)[1]
            return await r.fulfill(response=await r.fetch(url=f'http://127.0.0.1:{api}{q}'))
        return await rendu.routage(r)
    await ctx.route('**/*', route)
    await pg.goto(f'http://127.0.0.1:{port}/index.html', wait_until='load')
    await pg.wait_for_timeout(1500)
    await pg.evaluate("localStorage.setItem('nst_consent2', 'non')")
    if c['langue'] != 'fr':
        await pg.evaluate(f"setLang('{c['langue']}')")
    pret = await pg.evaluate("""([ph, c]) => {
      S.photos = ph;
      const info = { names: 'Emma & Hugo', n1: 'Emma', n2: 'Hugo', city: 'Lille', captions: [] };
      const story = NA._ed.defaultStory(info); story.captions = []; story.mag = {};
      S.story = story; NA.info = info; NA.theme = c.style && NA.THEMES[c.style] ? c.style : 'magazine';
      try { selectedPages = c.pages; } catch (e) {}
      NA.pages = NA.plan(c.pages, story, info);
      NA.opts = new Set(c.options);
      if (c.apres) selectPricing(c.apres, null);           // format choisi après la composition
      return { theme: NA.theme };
    }""", [PHOTOS[:c['photos']] if c['photos'] else PHOTOS, c])
    for _ in range(40):                                      # recomposition éventuelle
        if not c["apres"] or c['photos'] or await pg.evaluate("NA.pages.length") == c["apres"]: break
        await pg.wait_for_timeout(250)
    pret['pages'] = await pg.evaluate("NA.pages.length")
    refus = c['photos'] and c['apres']                       # le site doit refuser poliment et garder l'album
    if refus:
        if pret['pages'] != c['pages'] or not alertes:
            await ctx.close()
            return f"pages={c['pages']}, apres={c['apres']}, photos={c['photos']}", ['pas assez de photos : le site aurait dû prévenir et garder l’album']
        alertes.clear()
    elif c['apres'] and pret['pages'] != c['apres']:
        await ctx.close()
        return f"pages={c['pages']}, apres={c['apres']}", [f"format {c['apres']} choisi après la composition : l'album reste à {pret['pages']} pages"]
    await pg.evaluate("goTab(4)")
    await pg.wait_for_timeout(600)
    await pg.evaluate("""c => {
      const set = (id, v) => { const e = document.getElementById(id); if (e) e.value = v; };
      set('payName', 'Jeanne'); set('payLastName', 'Essai'); set('payPhone', '06 12 34 56 78'); set('payEmail', 'contact@noustalgie.fr');
      set('payAddrLine1', '10 rue de Rivoli'); set('payAddrPostal', '75001'); set('payAddrCity', 'Paris'); set('payAddrCountry', c.pays);
      selectFormat(c.format);
      NA.opts = new Set(c.format === 'print' ? c.options : []);
      if (NA.payLabel) NA.payLabel();
    }""", c)
    if c['promo']:
        await pg.evaluate("document.querySelector('.nst-promo') && (document.querySelector('.nst-promo').open = true)")
        await pg.fill('#promoCode', c['promo'])
        await pg.click('#promoWrap button')
        await pg.wait_for_timeout(500)
    affiche = await pg.evaluate("NA.curPrice ? NA.curPrice().v : null")
    await pg.evaluate("processPayment()")
    for _ in range(240):
        if stripe['ok'] or alertes:
            break
        await pg.wait_for_timeout(250)
    d = json.loads(urllib.request.urlopen(f'http://127.0.0.1:{api}/__dernier').read())
    await ctx.close()

    pb = []
    s = d['stripe'] or {}
    if not stripe['ok']:
        pb.append('pas de passage sur Stripe' + (f' : « {alertes[0][:160]} »' if alertes else ' (aucun message, délai dépassé)'))
    else:
        m = {k[9:-1]: v for k, v in s.items() if k.startswith('metadata[')}
        total = sum(int(v) for k, v in s.items() if k.endswith('[unit_amount]')) / 100
        if m.get('pages') != str(pret['pages']):
            pb.append(f"livre de {pret['pages']} pages payé comme {m.get('pages')} pages")
        attendu = affiche if not c['promo'] else None
        if attendu is not None and abs(total - attendu) > 0.01:
            pb.append(f'prix affiché {attendu} € mais Stripe demande {total} €')
        if c['format'] == 'print':
            if not (m.get('pa_cover') and m.get('pa_inner')):
                pb.append('fichiers Print API absents (le livre partirait chez Prodigi)')
            for o in ('affiche', 'cadre', 'aimant'):
                if o in c['options'] and not m.get(f'{o}_url'):
                    pb.append(f'fichier de l’option {o} absent')
            if sorted(m.get('options', '').split(',') if m.get('options') else []) != sorted(c['options']):
                pb.append(f"options payées {m.get('options')!r} au lieu de {','.join(c['options'])!r}")
    if erreurs:
        pb.append('erreur JavaScript : ' + erreurs[0])
    if d['alertes'] and stripe['ok']:
        pb.append('alerte envoyée alors que le paiement a abouti')
    if not stripe['ok'] and not d['alertes']:
        pb.append('aucune alerte envoyée à Gabin pour ce blocage')
    desc = ', '.join(f'{k}={v}' for k, v in c.items() if v and not (k == 'format' and v == 'print') and not (k == 'pays' and v == 'FR') and not (k == 'langue' and v == 'fr'))
    return desc, pb


async def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--cas', type=int); a = ap.parse_args()
    rendu.installer_polices()
    srv = rendu.serveur(PUB); port = srv.server_address[1]
    proc, api = demarrer_serveur()
    echecs = 0
    try:
        async with async_playwright() as p:
            nav = await p.chromium.launch()
            for i, c in enumerate(CAS, 1):
                if a.cas and a.cas != i:
                    continue
                desc, pb = await jouer(nav, port, api, i, c)
                print(('OK     ' if not pb else 'ÉCHEC  ') + f'{i:2}. {desc}' + ('' if not pb else '\n         ' + '\n         '.join(pb)), flush=True)
                echecs += bool(pb)
            await nav.close()
    finally:
        proc.terminate(); srv.shutdown()
    print(f'\n{len(CAS) - echecs if not a.cas else (0 if echecs else 1)} cas réussis, {echecs} en échec')
    sys.exit(1 if echecs else 0)

asyncio.run(main())
