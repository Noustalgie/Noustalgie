"""Décor des photos « magazine » (tools/mag-photos.py) : table en bois et tapis en jute, textures calculées.

Le bois imite celui des photos de référence : planches d'acacia miel, fil serré et ondulé, nuances marbrées.
  python3 tools/decor.py   → out/mag/decor/bois-couleur.jpg, bois-rugosite.png, bois-relief.png,
                              jute-couleur.jpg, jute-relief.png, apercu.jpg
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out', 'mag', 'decor')
WOOD_GAIN = (1.87, 2.36, 2.65)      # gain linéaire par canal : le bois rendu retombe sur le bois des photos (150, 111, 60)


def grid(cells, seed):
    """grille aléatoire préfiltrée pour une interpolation spline (bruit lisse)"""
    g = np.random.default_rng(seed).random((cells[0] + 4, cells[1] + 4))
    return ndimage.spline_filter(g, order=3, mode='grid-wrap')


def sample(g, cy, cx):
    """valeur du bruit aux coordonnées (en cellules) ; le motif se répète"""
    return ndimage.map_coordinates(g, [cy, cx], order=3, mode='grid-wrap', prefilter=False)


def fbm(cy, cx, seed, octaves=4, cells=64):
    s, a, n = 0.0, 0.5, 0.0
    for o in range(octaves):
        f = 2 ** o
        s = s + a * sample(grid((cells, cells), seed + o), cy * f, cx * f)
        n += a
        a *= 0.5
    return s / n


def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def mix(c1, c2, t):
    c1, c2 = np.array(c1, float), np.array(c2, float)
    return c1 + (c2 - c1) * t[..., None]


# ── bois de la table des photos de référence : planches à fil serré et ondulé, nuances marbrées (acacia) ──
def wood(W=4096, H=2048, LX=1.8, LY=0.9, seed=3):
    """plateau de 1,8 × 0,9 m en planches ; le fil suit la longueur (x) ; 1 px = 0,44 mm"""
    r = np.random.default_rng(seed)
    X = np.broadcast_to(np.linspace(0, LX, W, endpoint=False)[None, :], (H, W))
    Y = np.broadcast_to(np.linspace(0, LY, H, endpoint=False)[:, None], (H, W))
    widths, y = [], 0.0
    while LY - y > 0.24:
        w = r.uniform(0.14, 0.2); widths.append(w); y += w
    widths.append(LY - y)
    col = np.zeros((H, W, 3)); rough = np.zeros((H, W)); relief = np.zeros((H, W))
    light, dark = (176, 126, 70), (104, 70, 36)
    edges, y0 = [], 0.0
    for i, w in enumerate(widths):
        y1 = y0 + w
        rows = slice(int(round(y0 / LY * H)), int(round(y1 / LY * H)))
        Xb, Yb = X[rows], Y[rows]
        sd = seed * 100 + i * 7
        # contrefil : la position en travers du fil serpente lentement
        b = Yb + 0.006 * (fbm(Yb / LY * 6, Xb / LX * 5, sd + 1, 3, 16) - 0.5) \
               + 0.0015 * (fbm(Yb / LY * 40, Xb / LX * 25, sd + 2, 2, 32) - 0.5)
        fib1 = sample(grid((1400, 320), sd + 3), b / LY * 1300, Xb / LX * 300)   # fibres : 0,7 mm × 6 mm
        fib2 = sample(grid((700, 640), sd + 4), b / LY * 620, Xb / LX * 600)     # 1,5 mm × 3 mm
        strk = sample(grid((240, 24), sd + 5), b / LY * 220, Xb / LX * 20)       # traînées : 4 mm × 9 cm
        mott = fbm(b / LY * 10, Xb / LX * 6, sd + 6, 4, 16)                      # marbrures allongées
        d = 0.42 + 0.9 * (mott - 0.5) + 0.32 * smooth(0.55, 0.85, strk) + 0.28 * (fib1 - 0.5) + 0.2 * (fib2 - 0.5)
        c = mix(light, dark, np.clip(d + r.uniform(-0.12, 0.12), 0, 1))         # chaque planche a sa nuance
        col[rows] = c * np.array([1, r.uniform(0.97, 1.02), r.uniform(0.94, 1.05)])
        rough[rows] = 0.42 + 0.06 * (fib1 - 0.5)
        relief[rows] = 0.5 + 0.08 * (fib1 - 0.5) + 0.05 * (fib2 - 0.5)
        edges.append(rows.stop)
        y0 = y1
    for e in edges[:-1]:                                                  # joints entre planches
        col[e - 1:e + 1] *= 0.82; rough[e - 1:e + 1] = 0.55; relief[e - 1:e + 1] = 0.25
    lin = (np.clip(col, 0, 255) / 255) ** 2.2 * np.array(WOOD_GAIN)       # calage sur les photos de référence
    col = 255 * np.clip(lin, 0, 1) ** (1 / 2.2)
    return np.clip(col, 0, 255).astype(np.uint8), np.clip(rough, 0, 1), np.clip(relief, 0, 1)


# ── jute : tapis tressé en chevrons (vu au-delà du bord de la table) ──
def jute(N=2048, L=1.0, seed=5):
    x = (np.arange(N) + 0.5) / N * L
    X, Y = np.meshgrid(x, x)
    rowH, p = 0.056, 0.03
    j = np.floor(Y / rowH)
    v = Y / rowH - j - 0.5
    uu = X / p + (j % 2) * 0.5
    h = np.zeros_like(X); which = np.zeros_like(X); cell = np.zeros_like(X)
    for k in (-1, 0, 1):
        u = uu - np.floor(uu) - 0.5 - k
        for sgn in (1, -1):
            cu, cv = u * p, (v - sgn * 0.25) * rowH
            a = sgn * np.deg2rad(38)
            al = cu * np.cos(a) + cv * np.sin(a)
            ac = -cu * np.sin(a) + cv * np.cos(a)
            e = 1 - (al / (0.7 * p)) ** 2 - (ac / (0.29 * rowH)) ** 2
            hh = np.sqrt(np.clip(e, 0, 1))
            m = hh > h
            h = np.where(m, hh, h); which = np.where(m, sgn, which)
            cell = np.where(m, (np.floor(uu) + k) * 7.31 + j * 3.17 + sgn, cell)
    # fibres dans le sens de chaque brin
    fib = np.zeros_like(X)
    for sgn in (1, -1):
        a = sgn * np.deg2rad(38)
        al = X * np.cos(a) + Y * np.sin(a)
        ac = -X * np.sin(a) + Y * np.cos(a)
        g = grid((512, 128), seed + (sgn > 0))
        fsgn = sample(g, ac / L * 2600, al / L * 260)
        fib = np.where(which == sgn, fsgn, fib)
    var = np.sin(cell * 12.9898) * 43758.5453
    var = var - np.floor(var)
    base = np.array([196, 156, 100], float) * (0.9 + 0.18 * var)[..., None]
    col = base * (0.72 + 0.42 * fib)[..., None]
    ao = 0.45 + 0.55 * h ** 0.5
    col = col * ao[..., None]
    relief = np.clip(0.75 * h ** 0.7 + 0.25 * fib * h, 0, 1)
    return np.clip(col, 0, 255).astype(np.uint8), relief


# ── chêne de la table basse ovale (décor « salon ») : plateau plaqué d'un seul tenant, fil en cathédrales ──
CHENE_GAIN = (0.9, 0.93, 1.08)        # gain linéaire par canal, calé sur la photo de référence (bois moyen 163, 122, 89)


def chene(W=4096, H=2048, LX=1.3, LY=0.7, seed=11):
    """plateau de 1,3 × 0,7 m, fil dans la longueur (x) ; 1 px = 0,32 mm. Débit sur dosse : les cernes d'un tronc
    (axe selon x) coupés par un plan à distance h(x) dessinent des arches emboîtées (cathédrales) ; pores du bois
    de printemps en traits fins, rayons en courtes mouchetures."""
    X = np.broadcast_to(np.linspace(0, LX, W, endpoint=False)[None, :], (H, W))
    Y = np.broadcast_to(np.linspace(0, LY, H, endpoint=False)[:, None], (H, W))
    u = X / LX
    yc = LY * 0.42 + 0.05 * np.sin(u * 2.1 + 0.4) + 0.03 * (fbm(u * 3, Y / LY * 0.6, seed, 3, 16) - 0.5)
    h = 0.06 + 0.11 * u ** 1.25 + 0.018 * np.sin(u * 4.3 + 1.1) + 0.01 * (fbm(u * 2, Y / LY * 2, seed + 1, 3, 16) - 0.5)
    d = np.sqrt((Y - yc) ** 2 + h ** 2)
    d = d + 0.006 * (fbm(Y / LY * 5, u * 2, seed + 2, 4, 32) - 0.5)               # cernes irréguliers
    # largeur des cernes variable d'une année à l'autre : index de cerne = d / 4,5 mm + bruit le long du rayon
    ring = d / 0.003 + 3.2 * sample(grid((256, 4), seed + 6), d / 0.003 * 0.35, np.zeros_like(d) + 1.5)
    k = np.floor(ring)
    f = ring - k
    hk = np.sin(k * 12.9898) * 43758.5453
    hk = hk - np.floor(hk)                                                         # contraste propre à chaque cerne
    late = smooth(0.4, 0.93, f) * (1 - smooth(0.965, 1.0, f)) * (0.75 + 0.3 * hk)
    pores_g = sample(grid((900, 260), seed + 3), Y / LY * 880, u * 250)            # pores : 0,8 mm × 5 mm
    pores = smooth(0.62, 0.8, pores_g) * (1 - smooth(0.25, 0.4, f))
    fleck = smooth(0.7, 0.86, sample(grid((420, 60), seed + 4), Y / LY * 400, u * 55))   # rayons
    mott = fbm(Y / LY * 4, u * 2.5, seed + 5, 4, 16)
    light, dark = (200, 154, 112), (128, 86, 52)
    t = np.clip(0.27 + 0.28 * late + 0.3 * pores + 0.1 * fleck + 0.6 * (mott - 0.5), 0, 1)
    col = mix(light, dark, t)
    lin = (np.clip(col, 0, 255) / 255) ** 2.2 * np.array(CHENE_GAIN)
    col = 255 * np.clip(lin, 0, 1) ** (1 / 2.2)
    rough = 0.4 + 0.12 * pores + 0.04 * (mott - 0.5)
    relief = 0.55 - 0.3 * pores + 0.05 * late
    return np.clip(col, 0, 255).astype(np.uint8), np.clip(rough, 0, 1), np.clip(relief, 0, 1)


def save16(a, path):
    Image.fromarray((a * 65535).astype(np.uint16)).save(path)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    if 'chene' in sys.argv:                                              # décor « salon » seulement
        c, ro, re = chene()
        Image.fromarray(c).save(os.path.join(OUT, 'chene-couleur.jpg'), quality=94)
        Image.fromarray((ro * 255).astype(np.uint8)).save(os.path.join(OUT, 'chene-rugosite.png'))
        save16(re, os.path.join(OUT, 'chene-relief.png'))
        s = Image.new('RGB', (1600, 1610), 'white')
        s.paste(Image.fromarray(c).resize((1600, 800)), (0, 0)); s.paste(Image.fromarray(c[500:1300, 1200:2800]), (0, 810))
        s.save(os.path.join(OUT, 'apercu-chene.jpg'), quality=88)
        sys.exit(print('chêne →', os.path.normpath(OUT)))
    c, ro, re = wood()
    Image.fromarray(c).save(os.path.join(OUT, 'bois-couleur.jpg'), quality=94)
    Image.fromarray((ro * 255).astype(np.uint8)).save(os.path.join(OUT, 'bois-rugosite.png'))
    save16(re, os.path.join(OUT, 'bois-relief.png'))
    jc, jr = jute()
    Image.fromarray(jc).save(os.path.join(OUT, 'jute-couleur.jpg'), quality=94)
    save16(jr, os.path.join(OUT, 'jute-relief.png'))
    a = Image.fromarray(c).resize((1600, 800))
    b = Image.fromarray(c[600:1400, 1200:2000])                         # détail à pleine résolution
    d = Image.fromarray(jc[:800, :800])
    s = Image.new('RGB', (1600, 1610), 'white')
    s.paste(a, (0, 0)); s.paste(b, (0, 810)); s.paste(d, (800, 810))
    s.save(os.path.join(OUT, 'apercu.jpg'), quality=88)
    print('textures →', os.path.normpath(OUT))
