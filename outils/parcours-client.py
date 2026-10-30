#!/usr/bin/env python3
"""Un vrai client, de l'accueil jusqu'à Stripe, avec de vrais clics et de vraies photos.

Bandeau cookies, bouton « Composer mon album », questionnaire, envoi des photos, création de l'album (IA simulée,
ou en panne), aperçu, commande, paiement. Le serveur est le vrai code (outils/parcours-serveur.js) ; seuls OpenAI,
PDFShift, Cloudinary, Stripe et Print API sont simulés. Relève à chaque étape : erreurs JavaScript, requêtes en
échec, débordement horizontal sur téléphone, blocage.

    python3 outils/parcours-client.py              # tous les cas, code de sortie 1 si un échoue
    python3 outils/parcours-client.py --cas 2 --captures /tmp/pc   # un cas, avec une capture par étape
"""
import argparse, asyncio, json, os, shutil, subprocess, sys, tempfile, time, urllib.request
from PIL import Image, ImageOps
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rendu
from playwright.async_api import async_playwright

DEPOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(DEPOT, 'public')
SOURCES = [os.path.join(PUB, 'img/exemple', f) for f in sorted(os.listdir(os.path.join(PUB, 'img/exemple'))) if f.startswith('photo-')] + \
          [os.path.join(PUB, 'img/exemple/photos', f) for f in sorted(os.listdir(os.path.join(PUB, 'img/exemple/photos')))]

CAS = [
    dict(nom='téléphone, 36 pages', tel=True),
    dict(nom='ordinateur, 36 pages'),
    dict(nom='téléphone, 24 pages, coffret', tel=True, pages=24, options=['coffret']),
    dict(nom='ordinateur, 50 pages, affiche', pages=50, photos=34, options=['affiche']),
    dict(nom='téléphone, IA en panne', tel=True, ia='panne'),
    dict(nom='téléphone, anglais', tel=True, langue='en'),
    dict(nom='téléphone, PDF seul', tel=True, format='pdf'),
    dict(nom='téléphone, trop peu de photos', tel=True, photos=8, attendu='refus-photos'),
    dict(nom='téléphone, retour depuis Stripe puis nouvel essai', tel=True, retour=True),
    dict(nom='téléphone, une photo refusée par le réseau', tel=True, envoi_ko=True, attendu='message-envoi'),
    dict(nom='téléphone, coffret, « Retour à l’aperçu » de la page d’annulation', tel=True, options=['coffret'], retour='annulation'),
    dict(nom='ordinateur, allemand, livré en Allemagne, numéro « 0170/1234567 »', langue='de', pays='DE', tel_num='0170/1234567'),
]


def photos(n, dossier):
    """n photos JPEG distinctes (recadrages des photos d'exemple), comme celles d'un téléphone."""
    out = []
    for i in range(n):
        im = Image.open(SOURCES[i % len(SOURCES)]).convert('RGB')
        w, h = im.size
        k = (i // len(SOURCES)) * 0.06
        im = im.crop((int(w * k), int(h * k), w, h)).resize((1600, int(1600 * h / w)))
        if i % 3 == 1:
            im = ImageOps.mirror(im)
        f = os.path.join(dossier, f'IMG_{4000 + i}.jpg')
        im.save(f, quality=88)
        out.append(f)
    return out


async def jouer(nav, port, api, c, captures):
    c = dict(dict(tel=False, pages=36, photos=None, options=[], ia='ok', langue='fr', format='print', attendu='stripe', retour=False, envoi_ko=False, pays='FR', tel_num='06 12 34 56 78'), **c)
    if not c['photos']:
        c['photos'] = {24: 16, 36: 24, 50: 34}[c['pages']]
    urllib.request.urlopen(f'http://127.0.0.1:{api}/__ia?mode={c["ia"]}').read()
    dossier = tempfile.mkdtemp(prefix='parcours-')
    fichiers = photos(c['photos'], dossier)
    vue = {'width': 390, 'height': 844} if c['tel'] else {'width': 1440, 'height': 900}
    ctx = await nav.new_context(viewport=vue, is_mobile=c['tel'], has_touch=c['tel'], device_scale_factor=2 if c['tel'] else 1)
    pg = await ctx.new_page()
    pb, js, req, alertes, journal, stripe = [], [], [], [], [], {'ok': False}
    pg.on('pageerror', lambda e: js.append(str(e)[:200]))
    pg.on('console', lambda m: js.append('console : ' + m.text[:200]) if m.type == 'error' and 'Failed to load resource' not in m.text and not (c['ia'] == 'panne' and 'écriture indisponible' in m.text) and not (c['envoi_ko'] and 'photos non envoyées' in m.text) else None)
    ignorer = ('/_vercel/insights/', 'tfjs-backend-wasm') + (('/api/compose', '/api/chat') if c['ia'] == 'panne' else ())   # statistiques Vercel (absentes en local) ; moteur facultatif de face-api ; panne voulue
    pg.on('response', lambda r: req.append(f'{r.status} {r.url.split("?")[0][-60:]}') if r.status >= 400 and f'127.0.0.1:{port}' in r.url and not any(x in r.url for x in ignorer) else None)
    pg.on('dialog', lambda d: (alertes.append(d.message), asyncio.ensure_future(d.dismiss())))
    n_img, reseau = [0], {'coupe': c['envoi_ko']}

    async def route(r):
        u = r.request.url
        if u.startswith('https://checkout.stripe.com/'):
            stripe['ok'] = True
            return await r.fulfill(status=200, content_type='text/html', body='<p>Stripe</p>')
        if u.startswith('https://api.cloudinary.com/') and '/image/upload' in u:
            if reseau['coupe'] and b'filename="photo-3.jpg"' in (r.request.post_data_buffer or b''):
                return await r.abort('connectionreset')            # cette photo ne passe jamais (réseau mobile)
            n_img[0] += 1
            return await r.fulfill(content_type='application/json', body=json.dumps({'public_id': f'noustalgie/photos/test/p{n_img[0]}'}))
        if 'res.cloudinary.com' in u and '/image/' in u:
            return await r.fulfill(path=SOURCES[0], content_type='image/jpeg')
        if 'data.geopf.fr' in u or 'photon.komoot.io' in u:
            return await r.fulfill(content_type='application/json', body='{"features": []}')
        if f'127.0.0.1:{port}/api/' in u:
            q = u.split(f'127.0.0.1:{port}', 1)[1]
            return await r.fulfill(response=await r.fetch(url=f'http://127.0.0.1:{api}{q}'))
        return await rendu.routage(r)
    await ctx.route('**/*', route)

    async def etape(nom):
        journal.append(nom)
        if c['tel']:
            d = await pg.evaluate('document.documentElement.scrollWidth - window.innerWidth')
            if d > 1:
                pb.append(f'{nom} : la page déborde de {d} px sur téléphone (Safari dézoome)')
        if captures:
            os.makedirs(captures, exist_ok=True)
            await pg.screenshot(path=os.path.join(captures, f'{len(journal):02d}-{nom.split(" ")[0]}.png'))

    async def attendre(js_cond, s, nom):
        t0 = time.time()
        while time.time() - t0 < s:
            if alertes or await pg.evaluate(js_cond):
                return True
            await pg.wait_for_timeout(250)
        pb.append(f'{nom} : rien après {s} s')
        return False

    try:
        await pg.goto(f'http://127.0.0.1:{port}/index.html', wait_until='load')
        await pg.wait_for_timeout(1500)
        if c['langue'] != 'fr':
            await pg.evaluate(f"setLang('{c['langue']}')")
        if await pg.is_visible('#nstConsent'):
            await pg.click('#nstConsent [data-c="non"]')
        await etape('accueil')
        await pg.click('.ed-hero .ed-btn-dark')
        await pg.wait_for_timeout(1200)
        if not await pg.is_visible('#name1'):
            pb.append('« Composer mon album » ne mène pas au questionnaire')
            return c['nom'], pb, js, req
        await pg.fill('#name1', 'Emma')
        await pg.fill('#name2', 'Hugo')
        await pg.fill('#meetDate', 'juin 2021')
        await pg.click('details[data-mq="city"] summary')
        await pg.fill('#qCity', 'Lille')
        await etape('questionnaire')
        await pg.click('#panel0 .btn-row .btn-gold')
        await pg.wait_for_timeout(800)
        await pg.set_input_files('#dz input[type=file]', fichiers)
        if not await attendre(f"S.photos.length >= {c['photos']} && S.photos.every(p => p.data || p.failed)", 60, 'envoi des photos'):
            return c['nom'], pb, js, req
        await pg.click(f"#pal{c['pages']}")
        await pg.wait_for_timeout(400)
        await etape('photos')
        await pg.click('#btnGen')
        if c['attendu'] == 'refus-photos':
            await pg.wait_for_timeout(1500)
            if not alertes:
                pb.append('trop peu de photos : aucun message pour le client')
            elif await pg.evaluate("document.getElementById('panel2').classList.contains('active')"):
                pb.append('trop peu de photos : la création démarre quand même')
            return c['nom'], pb, js, req
        if not await attendre("document.getElementById('panel3').classList.contains('active') && NA.pages.length > 0", 90, 'création de l’album'):
            return c['nom'], pb, js, req
        await pg.wait_for_timeout(1500)
        if alertes:
            pb.append('message pendant la création : ' + alertes[0][:150])
        n = await pg.evaluate('NA.pages.length')
        if n != c['pages']:
            pb.append(f"album de {n} pages au lieu de {c['pages']}")
        if c['ia'] == 'panne' and not await pg.is_visible('#nstIssue'):
            pb.append('IA en panne : aucun message ni bouton pour réessayer')
        await etape('aperçu')
        await pg.click('#btnOrder')
        await pg.wait_for_timeout(1000)
        if not await pg.evaluate("document.getElementById('panel4').classList.contains('active')"):
            pb.append('« Commander ce livre » ne mène pas au formulaire')
            return c['nom'], pb, js, req
        await pg.fill('#payName', 'Emma')
        await pg.fill('#payLastName', 'Martin')
        await pg.fill('#payEmail', 'emma.martin@example.com')
        if c['format'] == 'pdf':
            await pg.click('#formatPdf')
        else:
            await pg.fill('#payAddrLine1', '12 rue des Arts')
            await pg.fill('#payAddrPostal', '59800')
            await pg.fill('#payAddrCity', 'Lille')
            await pg.select_option('#payAddrCountry', c['pays'])
            await pg.fill('#payPhone', c['tel_num'])
            for o in c['options']:
                await pg.check(f'input[data-opt="{o}"]')
        await pg.wait_for_timeout(300)
        prix = await pg.evaluate('NA.curPrice ? NA.curPrice().v : null')
        await etape('commande')
        await pg.click('#payBtn')
        t0 = time.time()
        while time.time() - t0 < 120 and not stripe['ok'] and not alertes:
            await pg.wait_for_timeout(250)
        d = json.loads(urllib.request.urlopen(f'http://127.0.0.1:{api}/__dernier').read())
        if c['attendu'] == 'message-envoi':
            if stripe['ok'] and d.get('basse_def'):
                pb.append(f"photo non envoyée : le livre part quand même avec {d['basse_def']} photo(s) en basse définition")
            elif not stripe['ok'] and not alertes:
                pb.append('photo non envoyée : aucun message pour le client')
            elif alertes:
                journal.append('message : ' + alertes[0][:120])
                if 'Wi-Fi' not in alertes[0]:
                    pb.append('photo non envoyée : message vague « ' + alertes[0][:100] + ' »')
                # le réseau revient, le client clique de nouveau : le livre doit partir en pleine définition
                alertes.clear(); reseau['coupe'] = False
                if await pg.evaluate("document.getElementById('payBtn').disabled"):
                    pb.append('photo non envoyée : bouton de paiement resté bloqué')
                await pg.click('#payBtn')
                t0 = time.time()
                while time.time() - t0 < 120 and not stripe['ok'] and not alertes:
                    await pg.wait_for_timeout(250)
                d = json.loads(urllib.request.urlopen(f'http://127.0.0.1:{api}/__dernier').read())
                if not stripe['ok']:
                    pb.append('nouvel essai après la coupure : pas de passage sur Stripe' + (f' (« {alertes[0][:120]} »)' if alertes else ''))
                elif d.get('basse_def'):
                    pb.append(f"nouvel essai après la coupure : {d['basse_def']} photo(s) en basse définition")
        elif not stripe['ok']:
            pb.append('pas de passage sur Stripe' + (f' : « {alertes[0][:200]} »' if alertes else ' (rien après 120 s)'))
        else:
            s = d['stripe'] or {}
            m = {k[9:-1]: v for k, v in s.items() if k.startswith('metadata[')}
            total = sum(int(v) for k, v in s.items() if k.endswith('[unit_amount]')) / 100
            if prix is not None and abs(total - prix) > 0.01:
                pb.append(f'prix affiché {prix} € mais Stripe demande {total} €')
            if m.get('pages') != str(c['pages']):
                pb.append(f"Stripe facture {m.get('pages')} pages au lieu de {c['pages']}")
            if d.get('basse_def'):
                pb.append(f"{d['basse_def']} photo(s) imprimée(s) en basse définition (envoi HD raté, sans prévenir le client)")
            if c['format'] == 'print' and not (m.get('pa_cover') and m.get('pa_inner')):
                pb.append('fichiers Print API absents')
        if stripe['ok'] and c['retour']:
            # le client revient de Stripe avec « Précédent » (Safari restaure la page telle quelle), ou par le lien
            # « Retour à l'aperçu » de la page d'annulation (/#app, page rechargée), puis réessaie
            envoyees = n_img[0]
            await pg.wait_for_url('https://checkout.stripe.com/**', timeout=15000)   # navigation vers Stripe terminée
            if c['retour'] == 'annulation':
                await pg.goto(f'http://127.0.0.1:{port}/index.html#app', wait_until='load'); await pg.wait_for_timeout(3000)
            else:
                await pg.go_back(wait_until='load'); await pg.wait_for_timeout(1500)
            etat = await pg.evaluate("(() => { const b = document.getElementById('payBtn'); return { ok: !!b && !b.disabled, txt: b ? b.innerText : '', pages: NA.pages.length, panneau: !!document.querySelector('#panel4.active'), ville: (document.getElementById('payAddrCity') || {}).value, opts: [...(NA.opts || [])].sort().join(',') }; })()")
            if etat['pages'] and not etat['panneau']:
                pb.append('retour depuis Stripe : le client ne retombe pas sur sa commande')
            if etat['pages'] and etat['ville'] != 'Lille':
                pb.append('retour depuis Stripe : adresse à ressaisir')
            if etat['pages'] and etat['opts'] != ','.join(sorted(c['options'])):
                pb.append(f"retour depuis Stripe : options « {etat['opts']} » au lieu de « {','.join(sorted(c['options']))} »")
            await pg.evaluate("document.getElementById('payBtn').scrollIntoView({block: 'center'})"); await etape('retour depuis Stripe')
            if not etat['pages']:
                pb.append('retour depuis Stripe : l’album a disparu')
            elif not etat['ok']:
                pb.append(f"retour depuis Stripe : bouton de paiement bloqué (« {etat['txt'].strip()[:40]} »)")
            else:
                stripe['ok'] = False
                await pg.evaluate('goTab(4)'); await pg.wait_for_timeout(500)
                await pg.click('#payBtn')
                t0 = time.time()
                while time.time() - t0 < 120 and not stripe['ok'] and not alertes:
                    await pg.wait_for_timeout(250)
                if not stripe['ok']:
                    pb.append('retour depuis Stripe : le deuxième essai n’arrive pas sur Stripe' + (f' (« {alertes[0][:120]} »)' if alertes else ''))
                elif n_img[0] > envoyees:
                    pb.append(f'retour depuis Stripe : {n_img[0] - envoyees} photo(s) renvoyée(s) une deuxième fois (attente inutile)')
                else:
                    d = json.loads(urllib.request.urlopen(f'http://127.0.0.1:{api}/__dernier').read())
                    m = {k[9:-1]: v for k, v in (d['stripe'] or {}).items() if k.startswith('metadata[')}
                    if sorted(m.get('options', '').split(',') if m.get('options') else []) != sorted(c['options']):
                        pb.append(f"retour depuis Stripe : options payées {m.get('options')!r} au lieu de {','.join(c['options'])!r}")
        if n_img[0] == 0:
            pb.append('aucune photo envoyée en haute définition avant l’impression')
    except Exception as e:
        pb.append(f'arrêt du test à l’étape « {journal[-1] if journal else "début"} » : {str(e)[:200]}')
    finally:
        await ctx.close()
        shutil.rmtree(dossier, ignore_errors=True)
    return c['nom'], pb, js, req


async def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--cas', type=int); ap.add_argument('--captures'); a = ap.parse_args()
    rendu.installer_polices()
    srv = rendu.serveur(PUB); port = srv.server_address[1]
    proc = subprocess.Popen(['node', os.path.join(DEPOT, 'outils', 'parcours-serveur.js')], stdout=subprocess.PIPE, text=True)
    api = int(proc.stdout.readline())
    echecs = 0
    try:
        async with async_playwright() as p:
            nav = await p.chromium.launch()
            for i, c in enumerate(CAS, 1):
                if a.cas and a.cas != i:
                    continue
                nom, pb, js, req = await jouer(nav, port, api, c, a.captures and os.path.join(a.captures, str(i)))
                tout = pb + [f'erreur JavaScript : {x}' for x in dict.fromkeys(js)][:4] + [f'requête en échec : {x}' for x in dict.fromkeys(req)][:4]
                print(('OK     ' if not tout else 'ÉCHEC  ') + f'{i}. {nom}' + ''.join('\n         ' + x for x in tout), flush=True)
                echecs += bool(tout)
            await nav.close()
    finally:
        proc.terminate(); srv.shutdown()
    print(f'\n{echecs} cas en échec')
    sys.exit(1 if echecs else 0)

asyncio.run(main())
