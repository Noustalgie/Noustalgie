"""Planche contact des captures de contrôle : python3 tools/sheet.py out/snaps/t*.png -o out/sheet.jpg [--cols 8]"""
import argparse
import os
from PIL import Image, ImageDraw, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument('files', nargs='+')
ap.add_argument('-o', default='out/sheet.jpg')
ap.add_argument('--cols', type=int, default=8)
ap.add_argument('--w', type=int, default=270)
a = ap.parse_args()
ims = []
for f in a.files:
    im = Image.open(f).convert('RGB')
    h = round(im.height * a.w / im.width)
    ims.append((os.path.basename(f), im.resize((a.w, h), Image.LANCZOS)))
h = ims[0][1].height
rows = (len(ims) + a.cols - 1) // a.cols
sheet = Image.new('RGB', (a.cols * (a.w + 6), rows * (h + 30)), '#333')
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 18)
except OSError:
    font = ImageFont.load_default()
for i, (name, im) in enumerate(ims):
    x, y = (i % a.cols) * (a.w + 6), (i // a.cols) * (h + 30)
    sheet.paste(im, (x, y + 26))
    d.text((x + 4, y + 3), name.replace('.png', ''), fill='#ffd88a', font=font)
sheet.save(a.o, quality=90)
print(a.o, sheet.size)
