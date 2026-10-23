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
    ('01-noel', 'tiktok-1-noel-lyon70/01.jpg', 0.55, 'Le cadeau de Noël<br><em>qui raconte votre histoire</em>', 'Votre album photo de couple, façon magazine'),
    ('02-magazine', 'tiktok-2-salon-paris/03.jpg', 0.5, 'Votre histoire d’amour<br><em>en magazine</em>', 'Vos photos, vos souvenirs, un vrai livre relié'),
    ('03-plan', 'tiktok-1-noel-lyon70/02.jpg', 0.5, 'Le plan de votre rencontre<br><em>dans un cœur</em>', 'Idée cadeau couple personnalisée'),
    ('04-copine', 'tiktok-3-noel-nuit/11.jpg', 0.5, 'Idée cadeau<br><em>pour sa copine</em>', 'Un album photo de votre couple, écrit pour vous'),
    ('05-copain', 'tiktok-3-noel-nuit/06.jpg', 0.5, 'Idée cadeau<br><em>pour son copain</em>', 'Votre playlist, vos voyages, votre histoire'),
    ('06-album', 'tiktok-2-salon-paris/05.jpg', 0.5, 'Album photo couple<br><em>façon magazine</em>', 'Aperçu gratuit avant de commander'),
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
