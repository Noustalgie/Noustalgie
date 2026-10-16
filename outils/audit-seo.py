#!/usr/bin/env python3
"""Audit SEO de noustalgie.fr, sans réseau : rejoue sur public/ les contrôles de l'audit technique Semrush.

  python3 outils/audit-seo.py            # rapport complet, code de sortie 1 s'il reste une erreur
  python3 outils/audit-seo.py --json     # même chose en JSON (pour comparer deux versions)
  python3 outils/audit-seo.py --mots     # ajoute la correspondance mots-clés → pages

Il lit le HTML tel que le robot le voit (sans exécuter le JavaScript) et reproduit la logique de
vercel.json (redirections, réécritures, en-têtes). Gravités : E = erreur, A = avertissement, R = remarque.
Les numéros entre crochets sont ceux de l'audit Semrush (meta_issues).
"""
import glob
import json
import os
import re
import sys
import unicodedata
import urllib.parse
from collections import Counter, defaultdict, deque
from datetime import date
from html.parser import HTMLParser

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
PUBLIC = os.path.join(RACINE, 'public')
SITE = 'https://noustalgie.fr'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
INVISIBLE = {'script', 'style', 'noscript', 'template', 'svg', 'head', 'title'}

# Mots-clés suivis dans Semrush (France, mobile), volumes mensuels relevés le 14/10/2026
MOTS_CLES = {
    'idée cadeau couple': 2900, 'cadeau couple personnalisé': 1600, 'album photo couple': 590, 'livre personnalisé couple': 210,
    'livre couple': 480, 'idée cadeau couple noël': 1300, 'cadeau noël couple': 260, 'cadeau 1 an de couple': 320,
    'cadeau anniversaire de couple': 140, 'cadeau noces de coton': 210, 'cadeau anniversaire mariage': 720,
    'album photo mariage': 2900, 'livre photo mariage': 1300, 'cadeau pour son copain': 1900, 'cadeau pour sa copine': 1600,
    'album photo voyage': 0, 'texte album photo': 0, 'mots doux': 0,
}
GENERIQUES = {'cliquez ici', 'ici', 'en savoir plus', 'lire la suite', 'voir plus', 'plus', 'cliquez', 'lien', 'suite', 'read more', 'click here'}


class Noeud:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.enfants, self.texte = tag, dict(attrs), parent, [], []

    def descendants(self):
        for e in self.enfants:
            yield e
            yield from e.descendants()

    def cache(self):
        n = self
        while n:
            if n.tag in INVISIBLE or 'hidden' in n.attrs:
                return True
            n = n.parent
        return False


class Arbre(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.racine = Noeud('#racine', {}, None)
        self.cur = self.racine
        self.doctype = False

    def handle_decl(self, decl):
        if decl.lower().startswith('doctype html'):
            self.doctype = True

    def handle_starttag(self, tag, attrs):
        n = Noeud(tag, [(k, v if v is not None else '') for k, v in attrs], self.cur)
        self.cur.enfants.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        n = Noeud(tag, [(k, v if v is not None else '') for k, v in attrs], self.cur)
        self.cur.enfants.append(n)

    def handle_endtag(self, tag):
        n = self.cur
        while n and n.tag != tag:
            n = n.parent
        if n and n.parent:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.texte.append(data)


def texte_de(n, visible=True):
    """Texte visible d'un noeud (ordre du document approximé : texte propre puis enfants)."""
    if visible and (n.tag in INVISIBLE or 'hidden' in n.attrs):
        return ''
    out = ''.join(n.texte)
    for e in n.enfants:
        out += ' ' + texte_de(e, visible)
    return out


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


class Page:
    def __init__(self, fichier):
        self.fichier = fichier
        rel = os.path.relpath(fichier, PUBLIC).replace(os.sep, '/')
        self.rel = rel
        if rel == 'index.html':
            self.url = '/'
        elif rel.endswith('/index.html'):
            self.url = '/' + rel[:-len('/index.html')]
        else:
            self.url = '/' + rel
        brut = open(fichier, encoding='utf-8', errors='replace').read()
        self.octets = len(brut.encode('utf-8'))
        # ancres gérées par script : {'#cgv': 'cgv'}, location.hash === '#suivi', sec.id = 'exemples'
        self.ancres_js = set(re.findall(r"['\"]#([A-Za-z][\w-]{2,30})['\"]\s*:", brut)) | set(re.findall(r"hash\s*===?\s*['\"]#([A-Za-z][\w-]{2,30})['\"]", brut)) | set(re.findall(r"\.id\s*=\s*['\"]([A-Za-z][\w-]{2,30})['\"]", brut))
        a = Arbre()
        a.feed(brut)
        self.doctype = a.doctype
        self.racine = a.racine
        self.tous = list(a.racine.descendants())
        self.meta, self.og = {}, {}
        for n in self.tous:
            if n.tag == 'meta':
                if n.attrs.get('name'):
                    self.meta.setdefault(n.attrs['name'].lower(), []).append(n.attrs.get('content', ''))
                if n.attrs.get('property'):
                    self.og.setdefault(n.attrs['property'].lower(), []).append(n.attrs.get('content', ''))
        t = [n for n in self.tous if n.tag == 'title']
        self.titre = ''.join(t[0].texte).strip() if t else ''
        h = [n for n in self.tous if n.tag == 'html']
        self.lang = h[0].attrs.get('lang', '') if h else ''
        self.charset = any(n.tag == 'meta' and ('charset' in n.attrs or 'utf-8' in n.attrs.get('content', '').lower()) for n in self.tous)
        self.canoniques = [n.attrs.get('href', '') for n in self.tous if n.tag == 'link' and 'canonical' in n.attrs.get('rel', '').lower().split()]
        self.hreflang = [n for n in self.tous if n.tag == 'link' and n.attrs.get('hreflang')]
        self.robots = ' '.join(self.meta.get('robots', [])).lower()
        self.refresh = [n for n in self.tous if n.tag == 'meta' and n.attrs.get('http-equiv', '').lower() == 'refresh']
        self.titres = [(int(n.tag[1]), re.sub(r'\s+', ' ', texte_de(n)).strip()) for n in self.tous if re.fullmatch(r'h[1-6]', n.tag) and not n.cache()]
        corps = [n for n in self.tous if n.tag == 'body']
        self.texte = re.sub(r'\s+', ' ', texte_de(corps[0])).strip() if corps else ''
        mains = [n for n in self.tous if n.tag == 'main']
        self.texte_main = re.sub(r'\s+', ' ', texte_de(mains[0])).strip() if mains else self.texte
        self.mots = len(re.findall(r"[\w'’-]+", self.texte))
        self.balises = Counter(n.tag for n in self.tous)
        self.liens = [n for n in self.tous if n.tag == 'a' and 'href' in n.attrs and not n.cache()]
        self.images = [n for n in self.tous if n.tag == 'img' and not n.cache()]
        self.scripts = [n for n in self.tous if n.tag == 'script']
        self.css_externes = [n.attrs.get('href', '') for n in self.tous if n.tag == 'link' and n.attrs.get('rel', '').lower() == 'stylesheet']
        self.jsonld = []
        for s in self.scripts:
            if s.attrs.get('type') == 'application/ld+json':
                self.jsonld.append(''.join(s.texte))
        self.octets_inline = sum(len(''.join(s.texte).encode()) for s in self.tous if s.tag in ('script', 'style'))
        self.indexable = 'noindex' not in self.robots


def charger_config():
    with open(os.path.join(RACINE, 'vercel.json'), encoding='utf-8') as f:
        return json.load(f)


class Audit:
    def __init__(self):
        self.cfg = charger_config()
        self.pages = [Page(f) for f in sorted(glob.glob(os.path.join(PUBLIC, '**', '*.html'), recursive=True))]
        self.par_url = {p.url: p for p in self.pages}
        self.pb = []  # (gravité, code Semrush, page, message)
        self.redirections = {r['source']: r['destination'] for r in self.cfg.get('redirects', [])}
        self.reecritures = {r['source']: r['destination'] for r in self.cfg.get('rewrites', [])}
        for src, dst in self.reecritures.items():
            if dst.endswith('.html') and src not in self.par_url:
                p = self.par_url.get(dst)
                if p:
                    self.par_url[src] = p

    def pb_(self, grav, code, page, msg):
        self.pb.append((grav, code, page, msg))

    # ── résolution d'une adresse interne comme Vercel ──
    def resoudre(self, chemin):
        chemin = urllib.parse.unquote(chemin)
        if chemin in self.redirections:
            return 'redirection', self.redirections[chemin]
        c = chemin.rstrip('/') or '/'
        if c in self.par_url:
            return 'page', c
        if c in self.reecritures:
            return 'api', c
        f = os.path.join(PUBLIC, c.lstrip('/'))
        if os.path.isfile(f):
            return 'fichier', c
        if os.path.isdir(f) and os.path.isfile(os.path.join(f, 'index.html')):
            return 'page', c
        return None, c

    def absolue(self, page, href):
        return urllib.parse.urljoin(SITE + page.url, href)

    # ── contrôles par page ──
    def controles_page(self, p):
        U = p.url
        indexable = p.indexable
        if not p.doctype:
            self.pb_('E', 116, U, 'Doctype html absent')
        if not p.lang:
            self.pb_('E', 114, U, "Attribut lang absent sur <html>")
        if not p.charset:
            self.pb_('E', 115, U, "Encodage (charset) non déclaré")
        if 'viewport' not in p.meta:
            self.pb_('E', 20, U, 'Balise viewport absente')
        elif 'width=device-width' not in p.meta['viewport'][0]:
            self.pb_('A', 46, U, 'Viewport sans width=device-width')
        if p.refresh:
            self.pb_('A', 40, U, 'Redirection par balise meta refresh')
        # titre
        if not p.titre:
            self.pb_('E', 3, U, 'Balise title absente ou vide')
        else:
            n = len(p.titre)
            if n < 10:
                self.pb_('A', 101, U, f'Titre trop court ({n} car.)')
            if n > 70:
                self.pb_('A', 102, U, f'Titre trop long ({n} car., Semrush limite à 70)')
            elif n > 60 and indexable:
                self.pb_('R', 102, U, f'Titre de {n} car. : risque de coupure dans Google (idéal ≤ 60)')
        # description
        d = p.meta.get('description', [''])[0].strip()
        if indexable:
            if not d:
                self.pb_('E', 106, U, 'Meta description absente')
            else:
                if len(d) > 165:
                    self.pb_('R', 0, U, f'Description de {len(d)} car. : coupée dans Google au-delà de ~160')
                if len(d) < 70:
                    self.pb_('R', 0, U, f'Description courte ({len(d)} car.)')
        # titres de page
        h1 = [t for lvl, t in p.titres if lvl == 1]
        if indexable:
            if not h1:
                self.pb_('E', 103, U, 'Aucun H1')
            elif len(h1) > 1:
                self.pb_('A', 104, U, f'{len(h1)} balises H1')
            elif p.titre and norm(h1[0]) == norm(p.titre):
                self.pb_('R', 105, U, 'H1 identique au titre de la page')
            niv = [lvl for lvl, _ in p.titres]
            for a, b in zip(niv, niv[1:]):
                if b > a + 1:
                    self.pb_('R', 0, U, f'Saut de niveau de titre (h{a} puis h{b})')
                    break
        # canonique
        if indexable:
            if not p.canoniques:
                self.pb_('E', 0, U, 'Balise canonical absente')
            elif len(p.canoniques) > 1:
                self.pb_('E', 39, U, 'Plusieurs balises canonical')
            else:
                attendu = SITE + (U if U != '/' else '/')
                if p.canoniques[0] != attendu:
                    self.pb_('E', 38, U, f'Canonical {p.canoniques[0]} au lieu de {attendu}')
        if p.hreflang:
            self.pb_('R', 23, U, 'Balises hreflang présentes : à vérifier')
        # partage social
        if indexable:
            for k in ('og:title', 'og:description', 'og:image', 'og:url', 'og:type'):
                if k not in p.og:
                    self.pb_('R', 0, U, f'Balise {k} absente')
            img = p.og.get('og:image', [''])[0]
            if img:
                if img.lower().endswith('.svg'):
                    self.pb_('E', 0, U, 'og:image en SVG : refusé par Facebook, WhatsApp, LinkedIn, X')
                chemin = urllib.parse.urlparse(img).path
                if not os.path.isfile(os.path.join(PUBLIC, chemin.lstrip('/'))):
                    self.pb_('E', 14, U, f'og:image introuvable : {chemin}')
                if 'og:image:width' not in p.og:
                    self.pb_('R', 0, U, 'og:image:width absent (aperçus plus lents)')
            if 'twitter:card' not in p.meta:
                self.pb_('R', 0, U, 'twitter:card absent')
            if 'theme-color' not in p.meta:
                self.pb_('R', 0, U, 'theme-color absent')
        # texte
        if indexable:
            ratio = 100 * len(p.texte) / max(1, p.octets)
            if ratio < 10:
                self.pb_('A', 112, U, f'Rapport texte/HTML de {ratio:.1f} % (< 10 %), dont {p.octets_inline // 1024} Ko de code en ligne')
            if p.mots < 200:
                self.pb_('A', 117, U, f'Peu de contenu ({p.mots} mots)')
            if p.octets > 2_000_000:
                self.pb_('E', 21, U, f'Page HTML trop lourde ({p.octets // 1024} Ko)')
            if p.octets > 300_000:
                self.pb_('R', 21, U, f'HTML de {p.octets // 1024} Ko : lourd à analyser sur mobile')
            if len(U) > 100:
                self.pb_('R', 136, U, f'Adresse longue ({len(U)} car.)')
            if '_' in U:
                self.pb_('A', 122, U, "Tiret bas dans l'adresse")
            # sémantique
            manquants = [t for t in ('header', 'nav', 'main', 'footer') if not p.balises.get(t)]
            if manquants and U != '/success.html':
                self.pb_('R', 222, U, 'Éléments sémantiques absents : ' + ', '.join(manquants))
        # images
        for im in p.images:
            src = im.attrs.get('src', '')
            if 'alt' not in im.attrs:
                self.pb_('E', 110, U, f'Image sans attribut alt : {src[:70]}')
            elif not im.attrs['alt'].strip() and indexable and 'aria-hidden' not in im.attrs:
                self.pb_('R', 110, U, f'Image avec alt vide : {src[:70]}')
            if src.startswith('/') or (src and not src.startswith(('http', 'data:'))):
                cible = os.path.join(PUBLIC, urllib.parse.urlparse(src).path.lstrip('/'))
                if src and not os.path.isfile(cible):
                    self.pb_('E', 13, U, f'Image interne introuvable : {src}')
                elif os.path.getsize(cible) > 250_000:
                    self.pb_('A', 0, U, f'Image de {os.path.getsize(cible) // 1024} Ko : {src}')
            if indexable and not (im.attrs.get('width') and im.attrs.get('height')):
                self.pb_('R', 0, U, f'Image sans width/height (décalage de mise en page) : {src[:60]}')
        # liens
        for a in p.liens:
            href = a.attrs['href'].strip()
            texte = re.sub(r'\s+', ' ', texte_de(a)).strip()
            if href.startswith(('mailto:', 'tel:', 'javascript:')):
                continue
            if href in ('#', ''):
                self.pb_('A', 0, U, f'Lien vide (href="{href}") : « {texte[:40]} »')
                continue
            if not texte and not a.attrs.get('aria-label') and not any(i.attrs.get('alt') for i in a.descendants() if i.tag == 'img'):
                self.pb_('R', 216, U, f'Lien sans texte : {href[:60]}')
            if norm(texte) in {norm(g) for g in GENERIQUES}:
                self.pb_('R', 217, U, f'Texte de lien peu descriptif « {texte} » vers {href[:50]}')
            if href.startswith('#'):
                continue
            absu = self.absolue(p, href)
            pu = urllib.parse.urlparse(absu)
            if pu.scheme == 'http':
                self.pb_('A', 31, U, f'Lien vers une page HTTP : {absu[:70]}')
            if pu.netloc in ('noustalgie.fr', 'www.noustalgie.fr'):
                kind, cible = self.resoudre(pu.path or '/')
                if pu.netloc == 'www.noustalgie.fr':
                    self.pb_('R', 0, U, f'Lien interne vers www : {absu[:70]}')
                if kind is None:
                    self.pb_('E', 8, U, f'Lien interne cassé : {href}')
                elif kind == 'redirection':
                    self.pb_('A', 214, U, f'Lien vers une adresse redirigée : {href} → {cible}')
                elif kind == 'fichier' and re.search(r'\.(jpe?g|png|webp|gif|pdf|svg)$', cible, re.I):
                    self.pb_('R', 215, U, f'Ressource déclarée comme lien de page : {cible}')
                if kind == 'page' and pu.fragment and pu.fragment not in self.ancres(cible):
                    self.pb_('A', 0, U, f'Ancre introuvable : {cible}#{pu.fragment}')
            else:
                rel = a.attrs.get('rel', '').lower()
                if a.attrs.get('target') == '_blank' and 'noopener' not in rel:
                    self.pb_('R', 0, U, f'target="_blank" sans noopener : {absu[:60]}')
        # données structurées
        self.donnees_structurees(p)
        # ressources
        for s in p.scripts:
            if s.attrs.get('src', '').startswith('http://'):
                self.pb_('E', 30, U, 'Script chargé en HTTP')
        if sum(1 for s in p.scripts if s.attrs.get('src')) + len(p.css_externes) > 20:
            self.pb_('A', 134, U, 'Trop de fichiers JavaScript/CSS')
        for href in p.css_externes:
            if not href.startswith('http'):
                if not os.path.isfile(os.path.join(PUBLIC, href.split('?')[0].lstrip('/'))):
                    self.pb_('E', 41, U, f'CSS interne introuvable : {href}')

    _ancres = {}

    def ancres(self, url):
        if url not in self._ancres:
            p = self.par_url.get(url)
            self._ancres[url] = ({n.attrs.get('id') for n in p.tous if n.attrs.get('id')} | {n.attrs.get('name') for n in p.tous if n.tag == 'a' and n.attrs.get('name')} | p.ancres_js) if p else set()
        return self._ancres[url]

    # ── données structurées ──
    def donnees_structurees(self, p):
        U = p.url
        if not p.indexable:
            return
        blocs = []
        for i, brut in enumerate(p.jsonld):
            try:
                blocs.append(json.loads(brut))
            except Exception as e:
                self.pb_('E', 45, U, f'JSON-LD n°{i + 1} invalide : {str(e)[:60]}')
        objets = []

        def aplatir(o):
            if isinstance(o, list):
                for x in o:
                    aplatir(x)
            elif isinstance(o, dict):
                if '@graph' in o:
                    aplatir(o['@graph'])
                else:
                    objets.append(o)
        aplatir(blocs)

        def types(o):
            t = o.get('@type', [])
            return t if isinstance(t, list) else [t]

        def manque(o, champs):
            return [c for c in champs if not o.get(c)]
        visible = norm(p.texte)
        for o in objets:
            t = types(o)
            if 'Article' in t:
                m = manque(o, ['headline', 'image', 'datePublished', 'author'])
                if m:
                    self.pb_('E', 45, U, 'Article : champs manquants ' + ', '.join(m))
                if not o.get('dateModified'):
                    self.pb_('R', 45, U, 'Article : dateModified recommandé')
                if o.get('mainEntityOfPage') and isinstance(o['mainEntityOfPage'], (str, dict)):
                    v = o['mainEntityOfPage'] if isinstance(o['mainEntityOfPage'], str) else o['mainEntityOfPage'].get('@id', '')
                    if v and v.rstrip('/') != (SITE + U).rstrip('/'):
                        self.pb_('A', 45, U, f'Article : mainEntityOfPage {v} ≠ page')
            if 'FAQPage' in t:
                qs = o.get('mainEntity', [])
                if not qs:
                    self.pb_('E', 45, U, 'FAQPage sans question')
                for q in qs if isinstance(qs, list) else [qs]:
                    nom = q.get('name', '')
                    rep = (q.get('acceptedAnswer') or {}).get('text', '')
                    if not nom or not rep:
                        self.pb_('E', 45, U, f'FAQPage : question ou réponse vide ({nom[:40]})')
                    elif norm(nom) not in visible:
                        self.pb_('E', 45, U, f"FAQPage : question absente du texte visible (règle Google) : {nom[:50]}")
            if 'BreadcrumbList' in t:
                els = o.get('itemListElement', [])
                pos = [e.get('position') for e in els]
                if pos != list(range(1, len(els) + 1)):
                    self.pb_('E', 45, U, f'BreadcrumbList : positions {pos}')
                for e in els[:-1]:
                    it = e.get('item')
                    if not it or not str(it).startswith('https://'):
                        self.pb_('E', 45, U, 'BreadcrumbList : item absent ou non absolu')
            if 'Product' in t:
                m = manque(o, ['name', 'image', 'description', 'offers'])
                if m:
                    self.pb_('E', 45, U, 'Product : champs manquants ' + ', '.join(m))
                if 'aggregateRating' in o or 'review' in o:
                    self.pb_('E', 45, U, "Product : avis ou note déclarés alors que le site n'affiche aucun avis (contraire aux règles Google)")
                offs = o.get('offers', [])
                for off in offs if isinstance(offs, list) else [offs]:
                    for c in ('price', 'priceCurrency', 'availability'):
                        if off.get(c) in (None, ''):
                            self.pb_('E', 45, U, f'Offer : {c} manquant')
                    if off.get('priceValidUntil'):
                        try:
                            if date.fromisoformat(off['priceValidUntil'][:10]) < date.today():
                                self.pb_('A', 45, U, f"Offer : priceValidUntil {off['priceValidUntil']} est passé")
                        except ValueError:
                            self.pb_('E', 45, U, 'Offer : priceValidUntil invalide')
                    if 'hasMerchantReturnPolicy' not in off and 'hasMerchantReturnPolicy' not in o:
                        self.pb_('R', 45, U, "Offer : hasMerchantReturnPolicy absent (recommandé pour les fiches marchands Google)")
            if 'Organization' in t and not manque(o, ['name']) and not o.get('url') and 'publisher' not in str(o)[:0]:
                pass
            if 'ImageObject' in t and o.get('url') is None and o.get('contentUrl') is None:
                self.pb_('A', 45, U, 'ImageObject sans url')
            for cle in ('image', 'logo', 'url'):
                for v in ([o.get(cle)] if not isinstance(o.get(cle), list) else o.get(cle)):
                    v = v.get('url') if isinstance(v, dict) else v
                    if isinstance(v, str) and v.startswith(SITE + '/'):
                        chemin = urllib.parse.urlparse(v).path
                        k, _ = self.resoudre(chemin)
                        if k is None:
                            self.pb_('E', 45, U, f'Données structurées : {cle} introuvable {chemin}')
        if not objets:
            self.pb_('A', 0, U, 'Aucune donnée structurée')

    # ── contrôles du site entier ──
    def controles_site(self):
        indexables = [p for p in self.pages if p.indexable and p.url not in ('/success.html',)]
        # doublons de titres et de descriptions
        for champ, code in (('titre', 6), ('desc', 15)):
            vus = defaultdict(list)
            for p in indexables:
                v = p.titre if champ == 'titre' else p.meta.get('description', [''])[0].strip()
                if v:
                    vus[v].append(p.url)
            for v, urls in vus.items():
                if len(urls) > 1:
                    self.pb_('A', code, ', '.join(urls), f"{'Titre' if champ == 'titre' else 'Description'} en double : {v[:60]}")
        # contenu dupliqué (mêmes séquences de 5 mots dans le texte principal)
        def ens(p):
            m = norm(p.texte_main).split()
            return {' '.join(m[i:i + 5]) for i in range(max(0, len(m) - 4))}
        E = {p.url: ens(p) for p in indexables}
        paires = []
        for i, a in enumerate(indexables):
            for b in indexables[i + 1:]:
                inter = len(E[a.url] & E[b.url])
                union = len(E[a.url] | E[b.url]) or 1
                paires.append((inter / union, a.url, b.url))
        paires.sort(reverse=True)
        self.doublons = paires[:6]
        for s, a, b in paires:
            if s >= 0.5:
                self.pb_('A', 7, f'{a} / {b}', f'Contenu très proche ({100 * s:.0f} % de séquences communes), Semrush signale à partir de 85 %')
            elif s >= 0.3:
                self.pb_('R', 7, f'{a} / {b}', f'Contenu proche ({100 * s:.0f} % de séquences communes)')
        # graphe de liens
        entrants = defaultdict(set)
        sortants = defaultdict(set)
        for p in self.pages:
            for a in p.liens:
                href = a.attrs['href'].strip()
                if not href or href.startswith(('#', 'mailto:', 'tel:', 'javascript:')):
                    continue
                pu = urllib.parse.urlparse(self.absolue(p, href))
                if pu.netloc != 'noustalgie.fr':
                    continue
                kind, cible = self.resoudre(pu.path or '/')
                if kind == 'redirection':
                    cible = self.redirections[cible]
                    kind = 'page'
                if kind == 'page' and cible != p.url:
                    entrants[cible].add(p.url)
                    sortants[p.url].add(cible)
        self.entrants = entrants
        profondeur = {'/': 0}
        file = deque(['/'])
        while file:
            u = file.popleft()
            for v in sortants[u]:
                if v not in profondeur:
                    profondeur[v] = profondeur[u] + 1
                    file.append(v)
        self.profondeur = profondeur
        for p in indexables:
            if p.url not in profondeur:
                self.pb_('E', 207, p.url, "Page orpheline : aucun lien interne ne mène jusqu'à elle depuis l'accueil")
            elif profondeur[p.url] > 3:
                self.pb_('A', 212, p.url, f'À {profondeur[p.url]} clics de l’accueil')
            n = len(entrants[p.url])
            if p.url != '/' and n < 2:
                self.pb_('A' if n == 0 else 'R', 213, p.url, f'Seulement {n} page(s) y renvoient')
        # sitemap
        chemin = os.path.join(PUBLIC, 'sitemap.xml')
        if not os.path.isfile(chemin):
            self.pb_('E', 125, '/sitemap.xml', 'Sitemap absent')
        else:
            xml = open(chemin, encoding='utf-8').read()
            locs = re.findall(r'<loc>(.*?)</loc>', xml)
            if len(xml.encode()) > 50_000_000 or len(locs) > 50000:
                self.pb_('E', 43, '/sitemap.xml', 'Sitemap trop gros')
            if not xml.lstrip().startswith('<?xml') or '</urlset>' not in xml:
                self.pb_('E', 17, '/sitemap.xml', 'Format du sitemap invalide')
            vus = set()
            for loc in locs:
                if not loc.startswith('https://noustalgie.fr'):
                    self.pb_('E', 128, '/sitemap.xml', f'Adresse hors site ou en HTTP : {loc}')
                    continue
                u = loc[len('https://noustalgie.fr'):] or '/'
                if loc in vus:
                    self.pb_('A', 18, '/sitemap.xml', f'Adresse en double : {loc}')
                vus.add(loc)
                k, cible = self.resoudre(u)
                p = self.par_url.get(u.rstrip('/') or '/')
                if k != 'page' or not p:
                    self.pb_('E', 18, '/sitemap.xml', f'Adresse du sitemap qui ne répond pas en 200 : {loc} ({k})')
                elif not p.indexable:
                    self.pb_('E', 18, '/sitemap.xml', f'Page noindex dans le sitemap : {loc}')
                elif p.canoniques and p.canoniques[0] != loc:
                    self.pb_('E', 18, '/sitemap.xml', f'Sitemap {loc} ≠ canonical {p.canoniques[0]}')
            for m in re.findall(r'<lastmod>(.*?)</lastmod>', xml):
                try:
                    if date.fromisoformat(m[:10]) > date.today():
                        self.pb_('A', 17, '/sitemap.xml', f'lastmod dans le futur : {m}')
                except ValueError:
                    self.pb_('E', 17, '/sitemap.xml', f'lastmod invalide : {m}')
            for p in indexables:
                if SITE + (p.url if p.url != '/' else '/') not in vus:
                    self.pb_('A', 0, p.url, 'Page indexable absente du sitemap')
        # robots.txt
        chemin = os.path.join(PUBLIC, 'robots.txt')
        if not os.path.isfile(chemin):
            self.pb_('E', 203, '/robots.txt', 'robots.txt absent')
        else:
            txt = open(chemin, encoding='utf-8').read()
            for n, l in enumerate(txt.splitlines(), 1):
                l = l.strip()
                if l and not l.startswith('#') and not re.match(r'^(user-agent|allow|disallow|sitemap|crawl-delay|host)\s*:', l, re.I):
                    self.pb_('E', 16, '/robots.txt', f'Ligne {n} invalide : {l[:50]}')
            if not re.search(r'^sitemap:\s*https://noustalgie\.fr/sitemap\.xml', txt, re.I | re.M):
                self.pb_('A', 124, '/robots.txt', 'Sitemap non déclaré dans robots.txt')
            if re.search(r'^disallow:\s*/\s*$', txt, re.I | re.M):
                self.pb_('E', 4, '/robots.txt', 'Tout le site est bloqué')
        # llms.txt
        chemin = os.path.join(PUBLIC, 'llms.txt')
        if not os.path.isfile(chemin):
            self.pb_('R', 137, '/llms.txt', 'llms.txt absent')
        else:
            lignes = open(chemin, encoding='utf-8').read().splitlines()
            if not lignes or not re.match(r'^# \S', lignes[0]):
                self.pb_('A', 219, '/llms.txt', 'La première ligne doit être un titre « # Nom »')
            if not any(l.startswith('> ') for l in lignes[:6]):
                self.pb_('A', 219, '/llms.txt', 'Résumé en citation « > … » absent en tête de fichier')
            for n, l in enumerate(lignes, 1):
                for _, url in re.findall(r'\[([^\]]*)\]\(([^)]*)\)', l):
                    if url.startswith(SITE):
                        k, _ = self.resoudre(urllib.parse.urlparse(url).path or '/')
                        if k is None:
                            self.pb_('E', 219, '/llms.txt', f'Ligne {n} : lien cassé {url}')
        # en-têtes : cache des ressources statiques et sécurité
        regles = self.cfg.get('headers', [])
        def entetes(chemin):
            res = {}
            for r in regles:
                src = r['source']
                motif = '^' + src.replace('(.*)', '.*').replace('(', '(?:').replace('.*', '.*') + '$'
                try:
                    ok = re.match(motif, chemin)
                except re.error:
                    ok = False
                if ok:
                    for h in r['headers']:
                        res[h['key'].lower()] = h['value']
            return res
        self.entetes = entetes
        for ex, nom in (('/guides.css', 'CSS'), ('/img/exemple/album/page-01.jpg', 'images'), ('/favicon.svg', 'icônes'), ('/vendor/face-api/face-api.js', 'bibliothèque JS')):
            if os.path.isfile(os.path.join(PUBLIC, ex.lstrip('/'))):
                cc = entetes(ex).get('cache-control', '')
                m = re.search(r'max-age=(\d+)', cc)
                if not m or int(m.group(1)) < 86400:
                    self.pb_('A', 132, ex, f'{nom} sans cache longue durée (Cache-Control : « {cc or "absent"} » ; Vercel met max-age=0 par défaut)')
        for h in ('strict-transport-security', 'x-content-type-options', 'referrer-policy', 'content-security-policy'):
            if h not in entetes('/'):
                self.pb_('A', 205 if h.startswith('strict') else 0, '/', f'En-tête {h} absent')

    def correspondance_mots(self):
        lignes = []
        for kw, vol in sorted(MOTS_CLES.items(), key=lambda x: -x[1]):
            jetons = [j for j in norm(kw).split() if j not in ('de', 'du', 'la', 'le', 'un', 'pour', 'son', 'sa')]
            meilleur = None
            for p in self.pages:
                if not p.indexable:
                    continue
                t, h1 = norm(p.titre), norm(' '.join(x for l, x in p.titres if l == 1))
                d, u = norm(p.meta.get('description', [''])[0]), norm(p.url)
                debut = ' '.join(norm(p.texte_main).split()[:120])
                def tous(s):
                    return all(j in s.split() for j in jetons)
                sc = 4 * tous(t) + 4 * tous(h1) + 2 * tous(d) + 2 * tous(u) + tous(debut)
                if meilleur is None or sc > meilleur[0]:
                    meilleur = (sc, p.url, tous(t), tous(h1), tous(d), tous(u), tous(debut))
            lignes.append((kw, vol, meilleur))
        return lignes

    def lancer(self):
        for p in self.pages:
            self.controles_page(p)
        self.controles_site()


def main():
    a = Audit()
    a.lancer()
    if '--json' in sys.argv:
        print(json.dumps([{'gravite': g, 'semrush': c, 'page': p, 'message': m} for g, c, p, m in a.pb], ensure_ascii=False, indent=1))
        return 1 if any(g == 'E' for g, *_ in a.pb) else 0
    ordre = {'E': 0, 'A': 1, 'R': 2}
    noms = {'E': 'ERREUR', 'A': 'AVERTISSEMENT', 'R': 'REMARQUE'}
    print(f"{len(a.pages)} pages lues, {sum(1 for p in a.pages if p.indexable)} indexables, {sum(p.mots for p in a.pages if p.indexable)} mots\n")
    groupes = defaultdict(list)
    for g, c, p, m in a.pb:
        modele = re.sub(r'[:«(].*$', '', m).strip() or m
        groupes[(g, c, modele)].append((p, m))
    for (g, c, modele), items in sorted(groupes.items(), key=lambda kv: (ordre[kv[0][0]], kv[0][1], kv[0][2])):
        tag = f'[{c}] ' if c else ''
        print(f"{noms[g]:13s} {tag}{modele}  ×{len(items)}")
        for p, m in items[:4]:
            print(f"      {p}  {m if len(items) < 8 else m[:110]}")
        if len(items) > 4:
            print(f"      … et {len(items) - 4} autre(s)")
    nE, nA, nR = (sum(1 for g, *_ in a.pb if g == x) for x in 'EAR')
    print(f"\nBilan : {nE} erreur(s), {nA} avertissement(s), {nR} remarque(s)")
    print('\nPages les plus proches (séquences communes) :', ' ; '.join(f'{u1} / {u2} ({100 * s:.0f} %)' for s, u1, u2 in a.doublons[:3]))
    prof = Counter(a.profondeur.values())
    print('Profondeur de clic depuis l’accueil :', dict(sorted(prof.items())))
    faibles = sorted(((len(a.entrants[p.url]), p.url) for p in a.pages if p.indexable and p.url != '/'))[:5]
    print('Pages les moins reliées :', ', '.join(f'{u} ({n})' for n, u in faibles))
    if '--mots' in sys.argv:
        print('\nMot-clé → page la mieux placée (T=titre H=H1 D=description U=adresse C=début du texte) :')
        for kw, vol, m in a.correspondance_mots():
            sc, url, t, h, d, u, c = m
            flags = ''.join(l if f else '.' for l, f in zip('THDUC', (t, h, d, u, c)))
            print(f"  {kw:34s} {vol:5d}  {flags}  {url}  (score {sc}/13)")
    return 1 if nE else 0


if __name__ == '__main__':
    sys.exit(main())
