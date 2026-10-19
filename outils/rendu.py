#!/usr/bin/env python3
"""Capture fidèle de noustalgie.fr en local, même sans accès réseau.

Les polices Google sont servies depuis des copies @fontsource (installées une fois dans ~/.cache),
les photos Unsplash sont remplacées par des images de substitution, tout autre appel externe est bloqué.

Usage :
  python3 outils/rendu.py                      # public/ -> /tmp/rendu_1440.png et /tmp/rendu_390.png
  python3 outils/rendu.py --dossier public --sortie /tmp/avant --tailles 1440x900 1024x768 390x844
Chaque capture pleine page est aussi découpée en tranches lisibles (_partNN.png).
"""
import argparse, asyncio, functools, hashlib, http.server, io, os, re, socketserver, subprocess, threading, urllib.parse

POLICES = {  # nom Google Fonts -> (paquet npm, nom de famille déclaré par le paquet si variable)
    'Inter': ('@fontsource/inter', None), 'Playfair Display': ('@fontsource/playfair-display', None),
    'Libre Baskerville': ('@fontsource/libre-baskerville', None), 'Cormorant Garamond': ('@fontsource/cormorant-garamond', None),
    'Hanken Grotesk': ('@fontsource-variable/hanken-grotesk', 'Hanken Grotesk Variable'),
    # style Magazine de l'album
    'Instrument Serif': ('@fontsource/instrument-serif', None), 'Bodoni Moda': ('@fontsource-variable/bodoni-moda', 'Bodoni Moda Variable'),
    'Pinyon Script': ('@fontsource/pinyon-script', None), 'Homemade Apple': ('@fontsource/homemade-apple', None),
    # style Années 70
    'Special Elite': ('@fontsource/special-elite', None), 'Caprasimo': ('@fontsource/caprasimo', None),
    'Jost': ('@fontsource/jost', None), 'Yellowtail': ('@fontsource/yellowtail', None),
}
CACHE = os.path.expanduser('~/.cache/noustalgie-polices')
NM = os.path.join(CACHE, 'node_modules')


def installer_polices():
    manquants = [p for p, _ in POLICES.values() if not os.path.isdir(os.path.join(NM, p))]
    if manquants:
        os.makedirs(CACHE, exist_ok=True)
        if not os.path.exists(os.path.join(CACHE, 'package.json')):
            open(os.path.join(CACHE, 'package.json'), 'w').write('{"name":"polices","private":true}')
        subprocess.run(['npm', 'i', '--silent', '--no-audit', '--no-fund', *manquants], cwd=CACHE, check=True)


def css_polices(url):
    q = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
    out = []
    for fam in q.get('family', []):
        nom = fam.split(':')[0].replace('+', ' ')
        if nom not in POLICES:
            continue
        paquet, nom_var = POLICES[nom]
        d = os.path.join(NM, paquet)
        fichiers = [f for f in os.listdir(d) if f.endswith('.css')]
        if nom_var:
            choix = ([f for f in ('opsz.css', 'opsz-italic.css') if f in fichiers]          # taille optique (Bodoni Moda)
                     or [f for f in ('wght.css', 'wght-italic.css') if f in fichiers] or ['index.css'])
        else:
            choix = [f for f in fichiers if re.match(r'^\d{3}(-italic)?\.css$', f)]
        for f in choix:
            t = open(os.path.join(d, f), encoding='utf-8').read()
            t = t.replace('url(./files/', f'url(https://fonts.gstatic.com/__local/{paquet}/files/')
            if nom_var:
                t = t.replace(f"'{nom_var}'", f"'{nom}'")
            out.append(t)
    return '\n'.join(out)


def photo_substitut(url):
    from PIL import Image, ImageDraw, ImageFilter
    h = int(hashlib.md5(url.encode()).hexdigest()[:6], 16)
    base = [(186, 140, 110), (120, 96, 84), (204, 170, 140), (96, 80, 70), (170, 120, 100), (140, 120, 104)][h % 6]
    im = Image.new('RGB', (900, 1100), base)
    dr = ImageDraw.Draw(im)
    for y in range(1100):
        dr.line([(0, y), (900, y)], fill=tuple(int(c * (1.15 - .45 * y / 1100)) for c in base))
    dr.ellipse([160, 240, 470, 1045], fill=tuple(int(c * .55) for c in base))
    dr.ellipse([410, 200, 760, 1080], fill=tuple(int(c * .45) for c in base))
    b = io.BytesIO(); im.filter(ImageFilter.GaussianBlur(28)).save(b, 'JPEG', quality=80)
    return b.getvalue()


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serveur(dossier):
    socketserver.TCPServer.allow_reuse_address = True
    s = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Silencieux, directory=dossier))
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s


async def routage(route):
    u = route.request.url
    if u.startswith('http://127.0.0.1'):
        return await route.continue_()
    if 'fonts.googleapis.com/css' in u:
        return await route.fulfill(status=200, content_type='text/css', body=css_polices(u))
    if 'fonts.gstatic.com/__local/' in u:
        p = os.path.join(NM, u.split('/__local/')[1])
        return await route.fulfill(status=200, content_type='font/woff2', body=open(p, 'rb').read(), headers={'access-control-allow-origin': '*'})
    if 'images.unsplash.com' in u:
        return await route.fulfill(status=200, content_type='image/jpeg', body=photo_substitut(u.split('?')[0]))
    return await route.abort()


async def ouvrir(navigateur, port, largeur, hauteur):
    """Ouvre la page servie localement, sections révélées. Renvoie la page Playwright."""
    pg = await navigateur.new_page(viewport={'width': largeur, 'height': hauteur})
    await pg.route('**/*', routage)
    await pg.goto(f'http://127.0.0.1:{port}/', wait_until='load')
    await pg.wait_for_timeout(1500)
    await pg.evaluate("""async () => { const H = document.documentElement.scrollHeight;
      for (let y = 0; y < H; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); }
      document.querySelectorAll('.nst-rv').forEach(e => e.classList.add('in'));
      document.querySelectorAll('.reveal').forEach(e => e.classList.add('on'));
      document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); }""")
    await pg.wait_for_timeout(700)
    return pg


async def principal(args):
    from playwright.async_api import async_playwright
    from PIL import Image
    installer_polices()
    srv = serveur(args.dossier)
    port = srv.server_address[1]
    async with async_playwright() as p:
        nav = await p.chromium.launch()
        for taille in args.tailles:
            l, h = map(int, taille.split('x'))
            pg = await ouvrir(nav, port, l, h)
            erreurs = await pg.evaluate('window.__nstErrs || []')
            chemin = f'{args.sortie}_{l}.png'
            await pg.screenshot(path=chemin, full_page=True)
            im = Image.open(chemin)
            tranche = int(h * 1.6)
            for i, y in enumerate(range(0, im.size[1], tranche)):
                im.crop((0, y, im.size[0], min(y + tranche, im.size[1]))).save(f'{args.sortie}_{l}_part{i:02d}.png')
            print(f'{chemin} {im.size[0]}x{im.size[1]} · erreurs JS : {erreurs or "aucune"}')
            await pg.close()
        await nav.close()
    srv.shutdown()


if __name__ == '__main__':
    racine = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    a = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    a.add_argument('--dossier', default=os.path.join(racine, 'public'))
    a.add_argument('--sortie', default='/tmp/rendu')
    a.add_argument('--tailles', nargs='+', default=['1440x900', '390x844'])
    asyncio.run(principal(a.parse_args()))
