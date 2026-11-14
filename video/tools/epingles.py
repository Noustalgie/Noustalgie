"""Épingles Pinterest (1000 × 1500, format 2:3) à partir des photos d'album rendues par mag-photos.py :
la photo en haut, un bandeau blanc avec un titre en Playfair Display et l'adresse du site (charte du site).
  python3 tools/epingles.py   → out/mag/epingles/*.jpg (liste EPINGLES ci-dessous)
"""
import asyncio, base64, os
from playwright.async_api import async_playwright

VIDEO = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
OUT = os.path.join(VIDEO, 'out', 'mag', 'epingles')
F = os.path.join(VIDEO, 'assets', 'fonts')

# (fichier de sortie, photo, décalage vertical du recadrage (0 haut, 1 bas), titre, sous-titre)
EPINGLES = [
    ('01-noel', 'tiktok-1-pages-lyon-seventies/01.jpg', 0.55, 'Le cadeau de Noël<br><em>qui raconte votre histoire</em>', 'Votre album photo de couple, façon magazine'),
    ('02-magazine', 'tiktok-2-pages-paris-argentique/03.jpg', 0.5, 'Votre histoire d’amour<br><em>en magazine</em>', 'Vos photos, vos souvenirs, un vrai livre relié'),
    ('03-plan', 'tiktok-5-pages-paris/02.jpg', 0.5, 'Le plan de votre rencontre<br><em>dans un cœur</em>', 'Idée cadeau couple personnalisée'),
    ('04-copine', 'tiktok-3-pages-nuit/01.jpg', 0.5, 'Idée cadeau<br><em>pour sa copine</em>', 'Un album photo de votre couple, écrit pour vous'),
    ('05-copain', 'tiktok-3-pages-nuit/06.jpg', 0.5, 'Idée cadeau<br><em>pour son copain</em>', 'Votre playlist, vos voyages, votre histoire'),
    ('06-album', 'tiktok-2-pages-paris-argentique/05.jpg', 0.5, 'Album photo couple<br><em>façon magazine</em>', 'Aperçu gratuit avant de commander'),
    # Noël (album Années 70 sur le lit à guirlande) et Saint-Valentin (table basse du salon), 14 novembre 2026
    ('07-carte-cadeau', 'photos-lit/01.jpg', 0.55, 'La carte cadeau<br><em>qui devient un livre</em>', 'Offrez l’album de leur histoire, 49,99 €'),
    ('08-noel-copine', 'photos-lit/12.jpg', 0.5, 'Cadeau de Noël<br><em>pour sa copine</em>', 'Le plan de votre rencontre dans un cœur'),
    ('09-noel-copain', 'photos-lit/07.jpg', 0.5, 'Cadeau de Noël<br><em>pour son copain</em>', 'Votre playlist, vos voyages, votre année'),
    ('10-message-noel', 'photos-lit/11.jpg', 0.5, '40 messages de Noël<br><em>pour son amoureux</em>', 'Pour un SMS, une carte ou une lettre'),
    ('11-avent', 'photos-lit/10.jpg', 0.5, 'Calendrier de l’Avent<br><em>pour un couple</em>', '24 idées de cases à faire soi-même'),
    ('12-derniere-minute', 'photos-lit/05.jpg', 0.5, 'Cadeau de Noël<br><em>de dernière minute</em>', '15 idées qui ne font pas improvisées'),
    ('13-noel-parents', 'photos-lit/04.jpg', 0.5, 'Cadeau de Noël<br><em>pour ses parents</em>', 'L’album de leur histoire d’amour'),
    ('14-noel-couple', 'photos-lit/02.jpg', 0.55, 'Idée cadeau couple<br><em>pour Noël</em>', 'L’album de votre année à deux'),
    ('15-saint-valentin', 'photos-salon/02.jpg', 0.5, 'Idée cadeau<br><em>Saint-Valentin</em>', '30 idées pour elle, pour lui ou à deux'),
    ('16-message-sv', 'photos-salon/10.jpg', 0.5, '45 messages<br><em>de Saint-Valentin</em>', 'Pour une carte, un SMS ou une lettre'),
    ('17-premiere-sv', 'photos-salon/01.jpg', 0.5, 'Votre première<br><em>Saint-Valentin</em>', 'Des idées pour bien la commencer'),
]

def b64(p):
    return base64.b64encode(open(p, 'rb').read()).decode()

HTML = '''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:P;src:url(data:font/woff2;base64,{pn})}}
@font-face{{font-family:P;font-style:italic;src:url(data:font/woff2;base64,{pi})}}
@font-face{{font-family:H;src:url(data:font/woff2;base64,{hk})}}
html,body{{margin:0;width:1000px;height:1500px;background:#fff}}
.ph{{width:1000px;height:1080px;background:url(data:image/jpeg;base64,{img}) center {pos}%/cover}}
.b{{height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#1c1a18}}
h1{{font:400 70px/1.08 P,serif;margin:0 40px}} h1 em{{font-style:italic}}
p{{font:400 30px/1.3 H,sans-serif;color:#5f5a54;margin:22px 0 0}}
.u{{font:600 26px H,sans-serif;letter-spacing:.06em;margin-top:26px;border:2px solid #1c1a18;border-radius:99px;padding:10px 30px}}
</style></head><body><div class="ph"></div><div class="b"><h1>{t}</h1><p>{s}</p><div class="u">noustalgie.fr</div></div></body></html>'''

async def main():
    os.makedirs(OUT, exist_ok=True)
    fonts = dict(pn=b64(os.path.join(F, 'PlayfairDisplay-normal-latin.woff2')), pi=b64(os.path.join(F, 'PlayfairDisplay-italic-latin.woff2')),
                 hk=b64(os.path.join(F, 'HankenGrotesk-normal-latin.woff2')))
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1000, 'height': 1500})
        for nom, photo, pos, t, s in EPINGLES:
            src = os.path.join(VIDEO, 'out', 'mag', photo)
            if not os.path.exists(src):
                print('manque', photo); continue
            await pg.set_content(HTML.format(img=b64(src), pos=round(pos * 100), t=t, s=s, **fonts))
            await pg.evaluate('document.fonts.ready')
            await pg.screenshot(path=os.path.join(OUT, nom + '.jpg'), type='jpeg', quality=88)
            print('épingle', nom)
        await b.close()

asyncio.run(main())
