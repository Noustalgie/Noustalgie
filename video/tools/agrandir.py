"""Agrandit ×4 des photos basse définition avec Real-ESRGAN (modèle realesr-general-x4v3), sans PyTorch :
lecture du .pth (archive zip + pickle) et réseau SRVGGNetCompact recodé en numpy (convolutions par im2col + BLAS).
Une photo de 300 px prend 5 à 12 s sur 4 cœurs.
  curl -sSL -o ~/modeles/realesr-general-x4v3.pth https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth
  python3 tools/agrandir.py ~/modeles/realesr-general-x4v3.pth out/mag/album-lyon/src out/mag/album-lyon/hd [noms...]
  (entrée : PNG ; sortie : JPEG ×4)"""
import collections, os, pickle, sys, time, zipfile
import numpy as np
from PIL import Image
from numpy.lib.stride_tricks import sliding_window_view


class Lecteur(pickle.Unpickler):
    def __init__(self, f, z, racine):
        super().__init__(f); self.z, self.racine = z, racine

    def find_class(self, mod, name):
        if (mod, name) == ('torch._utils', '_rebuild_tensor_v2'):
            def rebuild(st, off, size, stride, *_):
                return np.lib.stride_tricks.as_strided(st[off:], shape=size, strides=[s * st.itemsize for s in stride]).copy()
            return rebuild
        if mod == 'torch' and name.endswith('Storage'):
            return name
        if (mod, name) == ('collections', 'OrderedDict'):
            return collections.OrderedDict
        raise pickle.UnpicklingError(f'classe inattendue {mod}.{name}')

    def persistent_load(self, pid):
        _, stype, key, _, _ = pid
        dt = {'FloatStorage': np.float32, 'HalfStorage': np.float16}[stype]
        return np.frombuffer(self.z.read(f'{self.racine}/data/{key}'), dtype=dt)


def charger(chemin):
    z = zipfile.ZipFile(chemin)
    racine = z.namelist()[0].split('/')[0]
    d = Lecteur(z.open(f'{racine}/data.pkl'), z, racine).load()
    return {k: v.astype(np.float32) for k, v in (d.get('params_ema') or d.get('params') or d).items()}


def conv(x, w, b):
    """x : (H, W, Cin) ; w : (Cout, Cin, 3, 3) ; même taille en sortie"""
    h, wd, c = x.shape
    xp = np.pad(x, ((1, 1), (1, 1), (0, 0)))
    cols = sliding_window_view(xp, (3, 3), axis=(0, 1)).reshape(h * wd, c * 9)
    return (cols @ w.reshape(w.shape[0], -1).T + b).reshape(h, wd, -1)


def agrandir(p, img):
    x = img.astype(np.float32) / 255
    n = max(int(k.split('.')[1]) for k in p if k.startswith('body.'))
    out = x
    for i in range(n + 1):
        if f'body.{i}.bias' in p:
            out = conv(out, p[f'body.{i}.weight'], p[f'body.{i}.bias'])
        else:                                                        # PReLU
            a = p[f'body.{i}.weight']
            out = np.where(out > 0, out, out * a)
    h, w, _ = out.shape
    out = out.reshape(h, w, 3, 4, 4).transpose(0, 3, 1, 4, 2).reshape(h * 4, w * 4, 3)   # PixelShuffle(4)
    out += np.repeat(np.repeat(x, 4, 0), 4, 1)                                           # + entrée agrandie (plus proche voisin)
    return (np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8)


if __name__ == '__main__':
    modele, src, dst = sys.argv[1:4]
    noms = sys.argv[4:] or sorted(f[:-4] for f in os.listdir(src) if f.endswith('.png'))
    p = charger(modele)
    os.makedirs(dst, exist_ok=True)
    for nom in noms:
        t0 = time.time()
        im = np.asarray(Image.open(os.path.join(src, nom + '.png')).convert('RGB'))
        Image.fromarray(agrandir(p, im)).save(os.path.join(dst, nom + '.jpg'), quality=94, subsampling=0)
        print(nom, im.shape[1], 'x', im.shape[0], '→ ×4 en', round(time.time() - t0, 1), 's', flush=True)
