#!/usr/bin/env python3
"""Vérifications automatiques avant mise en ligne de noustalgie.fr (sans réseau, sans Stripe).

  python3 outils/verifier-site.py            # toutes les vérifications, code de sortie 1 si une échoue

Contrôles : syntaxe (scripts, JSON-LD, CSS, fichiers api/), chargement sans erreur JavaScript sur ordinateur
et mobile, pas de défilement horizontal sur mobile, sections et menu présents, textes français identiques
après un aller-retour de langue, formulaire de paiement (nom de famille, téléphone, données envoyées),
aucun tiret cadratin visible.
"""
import asyncio, glob, json, os, subprocess, sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
sys.path.insert(0, ICI)
import rendu  # noqa: E402

resultats = []


def note(nom, ok, detail=''):
    resultats.append((nom, ok, detail))


def syntaxe():
    crochet = os.path.join(RACINE, '.claude', 'hooks', 'verifier-syntaxe.mjs')
    r = subprocess.run(['node', crochet], input=json.dumps({'tool_input': {'file_path': os.path.join(RACINE, 'public', 'index.html')}}),
                       capture_output=True, text=True)
    note('Syntaxe de index.html (scripts, JSON-LD, CSS)', r.returncode == 0, r.stderr.strip()[:300])
    ko = []
    for f in sorted(glob.glob(os.path.join(RACINE, 'api', '**', '*.js'), recursive=True)):
        if subprocess.run(['node', '--check', f], capture_output=True).returncode:
            ko.append(os.path.relpath(f, RACINE))
    note('Syntaxe des fichiers api/', not ko, ', '.join(ko))


INSTANTANE = """() => [...document.querySelectorAll('[data-i18n],[data-nst],[data-nst-html]')]
  .map(e => [e.getAttribute('data-i18n') || e.getAttribute('data-nst') || e.getAttribute('data-nst-html'), e.textContent.trim().replace(/\\s+/g, ' ')])"""


async def navigateur():
    from playwright.async_api import async_playwright
    rendu.installer_polices()
    i = sys.argv.index('--dossier') if '--dossier' in sys.argv else -1   # version construite (outils/preparer-production.mjs --sortie …)
    srv = rendu.serveur(os.path.abspath(sys.argv[i + 1]) if i > 0 else os.path.join(RACINE, 'public'))
    port = srv.server_address[1]
    async with async_playwright() as p:
        nav = await p.chromium.launch()

        # Ordinateur
        pg = await rendu.ouvrir(nav, port, 1440, 900)
        erreurs = []
        pg.on('pageerror', lambda e: erreurs.append(str(e)))
        nst = await pg.evaluate('window.__nstErrs || []')
        note('Chargement ordinateur sans erreur JavaScript', not nst and not erreurs, '; '.join(nst + erreurs)[:300])
        manquantes = await pg.evaluate("['#how','#exemples','#pricing','#app','#faq','footer','.ed-hero .ed-btn-dark'].filter(s => !document.querySelector(s))")
        note('Sections et bouton principal présents', not manquantes, ', '.join(manquantes))
        liens = await pg.evaluate("[...document.querySelectorAll('.ed-nav-links a')].map(a => a.getAttribute('href'))")
        note('Liens du menu', set(['#how', '#pricing']).issubset(liens), ' '.join(liens))
        tirets = await pg.evaluate("(document.body.innerText.match(/[\\u2014]/g) || []).length")
        note('Aucun tiret cadratin visible', tirets == 0, f'{tirets} trouvé(s)')

        avant = await pg.evaluate(INSTANTANE)
        await pg.evaluate("setLang('en')"); await pg.wait_for_timeout(300)
        await pg.evaluate("setLang('fr')"); await pg.wait_for_timeout(400)
        apres = await pg.evaluate(INSTANTANE)
        ecarts = [a[0] for a, b in zip(avant, apres) if a[1] != b[1]]
        note('Français identique après aller-retour de langue', not ecarts, ', '.join(ecarts[:12]))

        # Formulaire de paiement (Stripe et PDF simulés)
        await pg.evaluate("""() => { window.__alerts = []; window.alert = m => window.__alerts.push(m); window.__bodies = [];
          const of = window.fetch;
          window.fetch = async (u, o) => { if (String(u).includes('/api/create-checkout')) { window.__bodies.push(JSON.parse(o.body));
            return new Response(JSON.stringify({ error: 'test' }), { status: 400 }); } return of(u, o); };
          window.generateAlbumPDF = async () => ({ url: 'https://x/a.pdf', proof: 'p', spine: null });
          if (!NA.pages || !NA.pages.length) NA.pages = [{ layout: 'x', slots: [] }]; }""")

        async def payer(champs):
            await pg.evaluate("""f => { window.__alerts = []; window.__bodies = [];
              for (const [k, v] of Object.entries(f)) document.getElementById(k).value = v;
              document.getElementById('payFormat').value = 'print'; }""", champs)
            await pg.evaluate('processPayment()'); await pg.wait_for_timeout(400)
            return await pg.evaluate('({ alerts: window.__alerts, bodies: window.__bodies })')

        adr = {'payAddrLine1': '12 rue des Arts', 'payAddrPostal': '59800', 'payAddrCity': 'Lille', 'payEmail': 'emma@test.fr', 'payName': 'Emma'}
        r1 = await payer({**adr, 'payLastName': '', 'payPhone': '0612345678'})
        note('Paiement bloqué sans nom de famille', not r1['bodies'] and any('nom' in a.lower() for a in r1['alerts']))
        r2 = await payer({**adr, 'payLastName': 'Martin', 'payPhone': '12'})
        note('Paiement bloqué avec un téléphone invalide', not r2['bodies'])
        r3 = await payer({**adr, 'payLastName': 'Martin', 'payPhone': '06 12 34 56 78'})
        b = r3['bodies'][0] if r3['bodies'] else {}
        note('Paiement : prénom, nom et téléphone envoyés', b.get('firstName') == 'Emma' and b.get('lastName') == 'Martin' and bool(b.get('phone')),
             json.dumps({k: b.get(k) for k in ('name', 'firstName', 'lastName', 'phone')}, ensure_ascii=False))
        await pg.close()

        # Mobile
        pg = await rendu.ouvrir(nav, port, 390, 844)
        nst = await pg.evaluate('window.__nstErrs || []')
        note('Chargement mobile sans erreur JavaScript', not nst, '; '.join(nst)[:300])
        debord = await pg.evaluate('document.documentElement.scrollWidth - window.innerWidth')
        note('Mobile : pas de défilement horizontal', debord <= 0, f'{debord} px de trop')
        await pg.close()
        await nav.close()
    srv.shutdown()


if __name__ == '__main__':
    syntaxe()
    asyncio.run(navigateur())
    largeur = max(len(n) for n, _, _ in resultats)
    for nom, ok, detail in resultats:
        print(f"{'OK    ' if ok else 'ÉCHEC '} {nom.ljust(largeur)}  {'' if ok or not detail else detail}")
    echecs = sum(1 for _, ok, _ in resultats if not ok)
    print(f"\n{len(resultats) - echecs}/{len(resultats)} vérifications réussies")
    sys.exit(1 if echecs else 0)
