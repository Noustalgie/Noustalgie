"""Film « ordinateur » (22 s, 1080 × 1920, 30 i/s) : le MacBook sur la table du salon, le site à l'écran, puis l'album imprimé.
  python3 tools/mac-film.py --audio musique.wav [--brouillon]   → out/mag/mac/film.mp4
Entrées : plans de l'ordinateur (mag-photos.py --decor salon --mac --sortie mac : passes « noir » et « blanc » + coins de l'écran),
écrans du site (mac-ecran.py), photos de l'album en couleur (mag-photos.py --decor salon --pages pages-lyon --sortie salon-lyon).
L'écran est recomposé à chaque image : noir + contenu × (blanc − noir), reflets et lumière sur le clavier compris.
Pas de texte ajouté. Transitions : plongée dans l'écran au drop (4 s), puis glissés avec flou de mouvement, calés sur les temps (120 BPM)."""
import json, math, os, subprocess, sys
import numpy as np
from PIL import Image

VIDEO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAG = os.path.join(VIDEO, 'out', 'mag')
MAC = os.path.join(MAG, 'mac')
ALBUM = os.path.join(MAG, 'salon-lyon')
args = sys.argv[1:]
AUDIO = args[args.index('--audio') + 1] if '--audio' in args else None
BROUILLON = '--brouillon' in args
PLANS = os.path.join(MAG, args[args.index('--plans') + 1]) if '--plans' in args else MAC     # --plans mac-essai : rendus de brouillon
OUT = args[args.index('--out') + 1] if '--out' in args else os.path.join(MAC, 'film.mp4')
W, H, FPS, DUREE = 1080, 1920, 30, 22.0
SUB = 1 if BROUILLON else 20                    # sous-images moyennées pendant la plongée dans l'écran (flou de zoom)

ease = lambda t: t * t * (3 - 2 * t)
ease_in = lambda t: t ** 3
ease_out = lambda t: 1 - (1 - t) ** 3


# ── l'ordinateur ──
def boite(w, h, cx, cy, z):
    """cadre 9:16 de l'image source (largeur source / z) centré en (cx, cy), gardé dans l'image"""
    cw = w / z; ch = cw * H / W
    cx = min(max(cx, cw / 2), w - cw / 2); cy = min(max(cy, ch / 2), h - ch / 2)
    return (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)


def perspective(src, dst):
    """coefficients PIL (pixel d'arrivée → pixel source) pour envoyer les 4 points src sur les 4 points dst"""
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


class Plan:
    def __init__(self, nom):
        noir = np.asarray(Image.open(os.path.join(PLANS, 'brut', nom + '-noir.png')).convert('RGB')).astype(np.float32)
        blanc = np.asarray(Image.open(os.path.join(PLANS, 'brut', nom + '-blanc.png')).convert('RGB')).astype(np.float32)
        self.noir = Image.fromarray(noir.astype(np.uint8))
        self.diff = Image.fromarray(np.clip(blanc - noir, 0, 255).astype(np.uint8))
        j = json.load(open(os.path.join(PLANS, 'brut', nom + '.json')))
        bl, br, tr, tl = j['ecran']                 # coins de la dalle dans le plan
        self.coins = [tl, tr, br, bl]               # haut gauche, haut droit, bas droit, bas gauche
        self.w, self.h = self.noir.size
        self.centre = np.array(self.coins).mean(axis=0)
        self.haut = (bl[1] + br[1] - tl[1] - tr[1]) / 2
        self._ecrans = {}

    def ecran(self, nom):
        if nom not in self._ecrans:
            e = Image.open(os.path.join(MAC, 'ecran', nom + '.png')).convert('RGB')
            moy = np.asarray(e.resize((1, 1), Image.BOX)).astype(np.float32).reshape(3) / 255   # lumière de l'écran sur le clavier
            self._ecrans[nom] = (e, moy)
        return self._ecrans[nom]

    def vue(self, nom, cx, cy, z):
        """plan vu dans ce cadre, avec ce contenu à l'écran ; l'écran est incrusté à la résolution de sortie (net même de très près)"""
        box = boite(self.w, self.h, cx, cy, z)
        k = W / (box[2] - box[0])
        noir = np.asarray(self.noir.resize((W, H), Image.BICUBIC, box=box)).astype(np.float32)
        diff = np.asarray(self.diff.resize((W, H), Image.BICUBIC, box=box)).astype(np.float32)
        e, moy = self.ecran(nom)
        dst = [((x - box[0]) * k, (y - box[1]) * k) for x, y in self.coins]
        co = perspective([(0, 0), (e.width, 0), (e.width, e.height), (0, e.height)], dst)
        c = np.asarray(e.transform((W, H), Image.PERSPECTIVE, co, Image.BICUBIC)).astype(np.float32) / 255
        m = np.asarray(Image.new('L', e.size, 255).transform((W, H), Image.PERSPECTIVE, co, Image.BILINEAR)).astype(np.float32)[..., None] / 255
        c = c * m + moy * (1 - m)
        return np.clip(noir + c * diff * 1.15, 0, 255)                     # écran un peu plus lumineux


def vue(img, cx, cy, z):
    """cadre 9:16 d'une photo, ramené en 1080 × 1920"""
    h, w = img.shape[:2]
    return np.asarray(Image.fromarray(img).resize((W, H), Image.BICUBIC, box=boite(w, h, cx, cy, z))).astype(np.float32)


# ── l'album : photos de mag-photos.py (1080 × 1920) ──
_photos = {}


def photo(n):
    if n not in _photos:
        f = os.path.join(ALBUM, '%02d.jpg' % n)
        if BROUILLON and not os.path.exists(f):                # brouillon : photo pas encore rendue
            f = os.path.join(ALBUM, '01.jpg')
        _photos[n] = np.asarray(Image.open(f).convert('RGB'))
    return _photos[n]


# plan, durée (s), zoom de début et de fin, dérive (fraction de l'image)
ALBUM_PLANS = [(1, 1.0, 1.10, 1.02, (0.0, 0.0)), (2, 1.5, 1.0, 1.06, (0.01, -0.01)), (3, 1.0, 1.06, 1.0, (-0.01, 0.0)),
               (4, 1.0, 1.0, 1.05, (0.0, 0.01)), (5, 1.5, 1.06, 1.0, (0.01, 0.0)), (6, 1.5, 1.0, 1.06, (-0.01, -0.01)),
               (7, 1.0, 1.05, 1.0, (0.0, 0.01)), (8, 1.0, 1.0, 1.05, (0.01, 0.0)), (9, 1.5, 1.06, 1.0, (-0.01, 0.0)),
               (10, 1.5, 1.0, 1.06, (0.0, -0.01)), (11, 1.5, 1.06, 1.0, (0.0, 0.0))]
T_ALBUM, T_FIN = 4.0, 18.0
GLISSE = 0.27                                    # durée d'un glissé (s), à cheval sur la coupe


def cadre_album(i, t):
    """image du plan i de l'album au temps local t (0 → durée)"""
    n, d, z0, z1, (dx, dy) = ALBUM_PLANS[i]
    u = ease(min(max(t / d, 0), 1))
    z = z0 + (z1 - z0) * u
    img = photo(n)
    return vue(img, W / 2 + dx * W * u, H / 2 + dy * H * u, z)


def flou(f, L, axe):
    """flou de mouvement d'une translation : moyenne glissante de L pixels le long de l'axe (somme cumulée)"""
    if L < 2:
        return f
    pad = [(0, 0)] * 3; pad[axe] = (L // 2, L - 1 - L // 2)
    c = np.cumsum(np.pad(f, pad, mode='edge'), axis=axe, dtype=np.float64)
    c = np.concatenate([np.zeros_like(np.take(c, [0], axis=axe)), c], axis=axe)
    n = f.shape[axe]
    return ((np.take(c, np.arange(L, L + n), axis=axe) - np.take(c, np.arange(n), axis=axe)) / L).astype(np.float32)


def glisse(a, b, u, sens):
    """a sort, b entre ; u de 0 à 1 ; sens : (dx, dy) unitaire"""
    out = np.empty_like(a)
    dx, dy = sens
    off = ease(u)
    sx, sy = int(round(-dx * off * W)), int(round(-dy * off * H))
    canvas = np.zeros((H * 3, W * 3, 3), np.float32)
    canvas[H:2 * H, W:2 * W] = a
    canvas[H + dy * H:2 * H + dy * H, W + dx * W:2 * W + dx * W] = b
    out = canvas[H - sy:2 * H - sy, W - sx:2 * W - sx]
    return out


# ── l'ordinateur au début (0–4 s) : prénoms tapés, photos, album ; puis plongée dans l'écran ──
def ecran_debut(t):
    if t < 0.25:
        return 'accueil-00'
    if t < 1.45:
        return 'accueil-%02d' % min(11, int((t - 0.25) / 1.1 * 11) + 1)
    if t < 1.6:
        return 'photos-00'
    if t < 2.5:
        return 'photos-%02d' % min(6, int((t - 1.6) / 0.9 * 6) + 1)
    return 'album-%02d' % min(3, int((t - 2.5) / 0.5))


def debut(P, t):
    cx0, cy0 = P.w / 2, P.h * 0.56                 # un peu plus bas : le fond de la pièce reste hors de l'image
    sx, sy = P.centre
    if t < 3.4:                                   # lente poussée vers l'écran
        u = ease(t / 3.4)
        z = 1.15 + 0.27 * u
        cx, cy = cx0 + (sx - cx0) * u * 0.8, cy0 + (sy - cy0) * u * 0.8
    else:                                         # plongée : l'écran remplit l'image
        u = ease_in((t - 3.4) / 0.6)
        zf = P.w / (P.haut * 0.8 * W / H)                         # à la fin, l'écran déborde de l'image

        z = 1.42 + (zf - 1.42) * u
        cx = cx0 + (sx - cx0) * (0.8 + 0.2 * u); cy = cy0 + (sy - cy0) * (0.8 + 0.2 * u)
    return P.vue(ecran_debut(t), cx, cy, z)


def fin(P, t):
    """18–22 s : l'ordinateur et le livre imprimé, la caméra recule doucement"""
    u = ease(min(t / 4.0, 1))
    z = 1.16 - 0.16 * u
    return P.vue('accueil-11', P.w / 2, P.h * 0.44, z)          # un peu plus haut : moins de tapis sous la table


def cadre(t, Pd, Pf):
    if t < T_ALBUM:
        return debut(Pd, t)
    if t >= T_FIN:
        return fin(Pf, t - T_FIN)
    s = T_ALBUM
    for i, p in enumerate(ALBUM_PLANS):
        if t < s + p[1]:
            return cadre_album(i, t - s)
        s += p[1]
    return cadre_album(len(ALBUM_PLANS) - 1, ALBUM_PLANS[-1][1])


def coupes():
    """instants des coupes de l'album et du passage final (glissés)"""
    s, c = T_ALBUM, []
    for p in ALBUM_PLANS:
        s += p[1]; c.append(s)
    return c                                      # la dernière vaut T_FIN


SENS = [(1, 0), (0, 1), (-1, 0), (0, -1)]


def image(t, Pd, Pf, rng):
    cs = coupes()
    # glissé autour d'une coupe : la sortie du plan précédent et l'entrée du suivant, flou de mouvement
    for k, c in enumerate(cs):
        if abs(t - c) < GLISSE / 2:
            sens = SENS[k % 4]
            u = min(max((t - (c - GLISSE / 2)) / GLISSE, 0), 1)
            f = glisse(cadre(c - 1e-3, Pd, Pf), cadre(c + 1e-3, Pd, Pf), u, sens)
            if not BROUILLON:                     # flou continu : la distance parcourue pendant l'image
                du = 1 / FPS / GLISSE
                d = abs(ease(min(u + du / 2, 1)) - ease(max(u - du / 2, 0))) * (W if sens[0] else H) * 0.5   # obturateur à 180°
                f = flou(f, int(d), 1 if sens[0] else 0)
            return finition(f, rng)
    # plongée dans l'écran (3,6–4 s) : flou de zoom ; drop : le livre arrive en reculant
    if 3.6 <= t < T_ALBUM or T_ALBUM <= t < T_ALBUM + 0.12:
        acc = np.zeros((H, W, 3), np.float32)
        for j in range(SUB):
            acc += cadre(t + (j / SUB - 0.5) * 0.75 / FPS, Pd, Pf)          # obturateur à 270° : le zoom reste lisible
        f = acc / SUB
        if T_ALBUM <= t < T_ALBUM + 0.2:          # petit éclat lumineux sur le drop
            f = f * (1 + 0.25 * (1 - (t - T_ALBUM) / 0.2))
        return finition(f, rng)
    f = cadre(t, Pd, Pf)
    if T_ALBUM <= t < T_ALBUM + 0.2:
        f = f * (1 + 0.25 * (1 - (t - T_ALBUM) / 0.2))
    return finition(f, rng)


def finition(f, rng):
    """grain fin animé, comme une vidéo de téléphone"""
    g = rng.normal(0, 2.0, (H // 2, W // 2)).astype(np.float32)
    g = np.repeat(np.repeat(g, 2, 0), 2, 1)[..., None]
    return np.clip(f + g, 0, 255).astype(np.uint8)


def main():
    Pd, Pf = Plan('bureau'), Plan('fin')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-']
    if AUDIO:
        cmd += ['-i', AUDIO, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest']
    cmd += ['-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    rng = np.random.default_rng(7)
    n = int(DUREE * FPS)
    for i in range(n):
        ff.stdin.write(image(i / FPS, Pd, Pf, rng).tobytes())
        if i % 60 == 0:
            print('image', i, '/', n, flush=True)
    ff.stdin.close(); ff.wait()
    print('film :', os.path.relpath(OUT, VIDEO))


if __name__ == '__main__':
    main()
