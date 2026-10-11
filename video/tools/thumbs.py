"""Vignettes carrées 300 px des photos (mur de photos et grille de l'appli) : python3 tools/thumbs.py"""
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
src, dst = os.path.join(ROOT, 'assets', 'photos'), os.path.join(ROOT, 'assets', 'thumbs')
os.makedirs(dst, exist_ok=True)
for f in sorted(os.listdir(src)):
    im = Image.open(os.path.join(src, f))
    w, h = im.size
    s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((300, 300), Image.LANCZOS)
    im.save(os.path.join(dst, f), quality=86)
print(len(os.listdir(dst)), 'vignettes')
