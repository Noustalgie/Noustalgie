"""Photos « magazine » pour les slides TikTok : l'album vitrine (pages de out/mag/pages) photographié
ouvert sur une table en bois, tapis en jute au sol, lumière de fenêtre. Rendu Blender Cycles (lancer de rayons).

Prérequis : python3 tools/mag-pages.py (pages) et python3 tools/decor.py (textures), puis Blender en module Python :
  python3.11 -m venv ~/blender-venv && ~/blender-venv/bin/pip install bpy==5.0.1
  ~/blender-venv/bin/python tools/mag-photos.py [--only 3,4] [--draft]
  → out/mag/photos/brut/NN.png (rendu) et out/mag/photos/NN.jpg (grain et netteté de téléphone)
  (la version années 70 lit out/mag/pages-seventies : python3 tools/mag-pages.py --theme seventies)
  ~/blender-venv/bin/python tools/mag-photos.py --site [--only album-couverture]
  → out/mag/site/*.jpg : visuels du site (images d'album des guides, fonds des images de partage)
  ~/blender-venv/bin/python tools/mag-photos.py --decor salon --pages pages-lyon [--spp 64]
  → out/mag/photos-salon/01…11.jpg en 1080 × 1920 : table basse ovale en chêne, tapis à poils longs, plante
"""
import math
import os
import sys
import time

import bpy
import numpy as np
from mathutils import Vector
from PIL import Image, ImageFilter

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
DECOR = os.path.join(ROOT, 'out', 'mag', 'decor')
args = sys.argv[1:]
SITE = '--site' in args
LIEU = args[args.index('--decor') + 1] if '--decor' in args else 'table'      # table (bois miel, jute), lit (lin, plaid, guirlande), salon (table basse ovale, tapis à poils, plante) ou noel (même table, soir de Noël)
HAUT = LIEU in ('salon', 'noel', 'jute') or '--916' in args                           # 9:16, plein écran TikTok (cadrages SHOTS_SALON)
PAGES = os.path.join(ROOT, 'out', 'mag', args[args.index('--pages') + 1] if '--pages' in args else 'pages')
AUTRE = args[args.index('--autre') + 1] if '--autre' in args else 'pages-seventies'   # l'autre style, montré par une slide
OUT = os.path.join(ROOT, 'out', 'mag', 'site' if SITE else args[args.index('--sortie') + 1] if '--sortie' in args else 'photos' if LIEU == 'table' else 'photos-' + LIEU)
DRAFT = '--draft' in args
ONLY = [int(n) if n.isdigit() else n for n in args[args.index('--only') + 1].split(',')] if '--only' in args else None
W, H = (1080, 1920) if HAUT else (1080, 1440)
if DRAFT:
    W, H = W // 2, H // 2
EXPO = float(args[args.index('--expo') + 1]) if '--expo' in args else -2.5
GLOW = 2.0          # luminosité de l'écran du téléphone

# ── l'album : couverture rigide 21 × 21, 11 feuillets de papier photo, reliure PUR (les pages se courbent vers le dos) ──
P = 0.21            # côté d'une page (m)
OV = 0.003          # débord du carton autour des pages
BT = 0.0025         # épaisseur d'un plat
LT = 0.0003         # épaisseur d'un feuillet
NL = 11             # feuillets entre les plats


def page(n, d=PAGES):
    """n : numéro de page ou nom de fichier (pano-g.jpg…) ; d : dossier des pages (une version de style)"""
    return os.path.join(d, n if isinstance(n, str) else 'page-%02d.jpg' % n)


# ── matériaux ──
_mats = {}


def tex(nt, path, data=False, ext='REPEAT'):
    img = bpy.data.images.load(path, check_existing=True)
    if data:
        img.colorspace_settings.name = 'Non-Color'
    n = nt.nodes.new('ShaderNodeTexImage'); n.image = img; n.extension = ext; n.interpolation = 'Cubic'
    return n


def material(name, color=(0.8, 0.8, 0.8), image=None, rough=0.45, coat=0.0, coat_rough=0.1, spec=0.5, ext='REPEAT', bump=None, metal=0.0, glow=0.0):
    if name in _mats:
        return _mats[name]
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Specular IOR Level'].default_value = spec
    b.inputs['Coat Weight'].default_value = coat
    b.inputs['Coat Roughness'].default_value = coat_rough
    b.inputs['Metallic'].default_value = metal
    if image:
        t = tex(nt, image, ext=ext); nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
        if glow:                                # écran allumé
            nt.links.new(t.outputs['Color'], b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = glow
    if bump:                                    # grain du papier : bruit fin en relief
        nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = bump[0]; nz.inputs['Detail'].default_value = 6
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = bump[1]; bp.inputs['Distance'].default_value = 0.0002
        nt.links.new(nz.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    _mats[name] = m
    return m


def paper(path):
    """page imprimée : papier photo satiné"""
    # nom du matériau = dossier + fichier : page-03.jpg existe en plusieurs styles (pages/, pages-seventies/)
    return material('page:' + os.path.join(os.path.basename(os.path.dirname(path)), os.path.basename(path)), image=path, rough=0.33, spec=0.42, bump=(900, 0.04))


def wood_material():
    m = bpy.data.materials.new('bois'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    # plateau de 0,9 × 1,8 m vu par son petit côté : le fil du bois part vers le fond de la table
    # (le maillage du plateau a son origine au centre de la scène : x dans [-0,45 ; 0,45], y dans [-0,45 ; 1,35])
    mp.inputs['Location'].default_value = (0.25, 0.5, 0); mp.inputs['Scale'].default_value = (1 / 0.9, 1 / 1.8, 1)
    mp.inputs['Rotation'].default_value = (0, 0, math.radians(-90))
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    c = tex(nt, os.path.join(DECOR, 'bois-couleur.jpg'), ext='EXTEND')
    r = tex(nt, os.path.join(DECOR, 'bois-rugosite.png'), True, 'EXTEND')
    h = tex(nt, os.path.join(DECOR, 'bois-relief.png'), True, 'EXTEND')
    for t in (c, r, h):
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
    nt.links.new(c.outputs['Color'], b.inputs['Base Color'])
    nt.links.new(r.outputs['Color'], b.inputs['Roughness'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.12; bp.inputs['Distance'].default_value = 0.0004
    nt.links.new(h.outputs['Color'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    b.inputs['Coat Weight'].default_value = 0.1; b.inputs['Coat Roughness'].default_value = 0.3   # vernis satiné
    return m


def jute_material(scale=1.0):
    m = bpy.data.materials.new('jute'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])                                       # 1 m par répétition (÷ scale)
    mp.inputs['Scale'].default_value = (scale, scale, scale)
    c = tex(nt, os.path.join(DECOR, 'jute-couleur.jpg')); h = tex(nt, os.path.join(DECOR, 'jute-relief.png'), True)
    for t in (c, h):
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
    nt.links.new(c.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.92
    b.inputs['Sheen Weight'].default_value = 0.4
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.9; bp.inputs['Distance'].default_value = 0.006
    nt.links.new(h.outputs['Color'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m


# ── maillages ──
def mesh(name, verts, faces, uvs, mat_idx, mats, smooth=None, parent=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    uvl = me.uv_layers.new(name='UVMap')
    for fi, poly in enumerate(me.polygons):
        poly.material_index = mat_idx[fi]
        poly.use_smooth = bool(smooth[fi]) if smooth else False
        for k, li in enumerate(poly.loop_indices):
            uvl.data[li].uv = uvs[fi][k]
    for m in mats:
        me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    if parent:
        ob.parent = parent
    return ob


class Builder:
    """accumule des quadrilatères (sommets, uv, matériau) puis crée un objet"""

    def __init__(self):
        self.v, self.f, self.uv, self.mi, self.sm = [], [], [], [], []

    def quad(self, pts, uvs, mi, smooth=False):
        b = len(self.v)
        self.v += [tuple(p) for p in pts]
        self.f.append(tuple(range(b, b + len(pts))))
        self.uv.append(uvs); self.mi.append(mi); self.sm.append(smooth)

    def grid(self, X, Y, Z, U, V, mi, flip=False):
        """surface (ni × nj sommets) ; ordre des sommets choisi pour que la normale pointe vers le haut"""
        ni, nj = X.shape
        b = len(self.v)
        self.v += list(zip(X.ravel().tolist(), Y.ravel().tolist(), Z.ravel().tolist()))
        uvs = list(zip(U.ravel().tolist(), V.ravel().tolist()))
        for i in range(ni - 1):
            for j in range(nj - 1):
                a, c, d, e = b + i * nj + j, b + (i + 1) * nj + j, b + (i + 1) * nj + j + 1, b + i * nj + j + 1
                q = (a, c, d, e) if not flip else (a, e, d, c)
                self.f.append(q); self.uv.append([uvs[k - b] for k in q]); self.mi.append(mi); self.sm.append(True)

    def box(self, x0, x1, y0, y1, z0, z1, mi_top, mi_side, mi_bottom=None, top_uv=None):
        tuv = top_uv or [(0, 0), (1, 0), (1, 1), (0, 1)]
        o = [(0, 0), (1, 0), (1, 1), (0, 1)]
        self.quad([(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)], tuv, mi_top)
        self.quad([(x0, y1, z0), (x1, y1, z0), (x1, y0, z0), (x0, y0, z0)], o, mi_side if mi_bottom is None else mi_bottom)
        self.quad([(x0, y0, z0), (x1, y0, z0), (x1, y0, z1), (x0, y0, z1)], o, mi_side)
        self.quad([(x1, y1, z0), (x0, y1, z0), (x0, y1, z1), (x1, y1, z1)], o, mi_side)
        self.quad([(x0, y1, z0), (x0, y0, z0), (x0, y0, z1), (x0, y1, z1)], o, mi_side)
        self.quad([(x1, y0, z0), (x1, y1, z0), (x1, y1, z1), (x1, y0, z1)], o, mi_side)

    def build(self, name, mats, parent=None):
        return mesh(name, self.v, self.f, self.uv, self.mi, mats, self.sm, parent)


def profile(t_side, hb=0.0055, xa=0.004, xc=0.034, z0=0.0004, n=220):
    """coupe de la page du dessus, depuis le pli (x = 0) : creux de la reliure, bosse, puis à plat sur la pile.
    Renvoie x, z et u (abscisse curviligne / P : la page n'est pas étirée)."""
    xs = np.linspace(0, P * 1.02, 4000)
    bump = (1 - np.exp(-xs / xa)) * np.exp(-xs / xc)
    bump /= bump.max()
    z = z0 + (t_side - z0) * (1 - np.exp(-xs / 0.003)) + hb * bump
    s = np.concatenate([[0], np.cumsum(np.hypot(np.diff(xs), np.diff(z)))])
    x_end = np.interp(P, s, xs)
    q = np.linspace(0, 1, n) ** 1.7 * x_end                    # plus de points près du pli
    zq = np.interp(q, xs, z)
    return q, zq, np.interp(q, xs, s) / P


def open_book(left, right, k, parent):
    """album ouvert : feuillets k à gauche, NL - k à droite ; left/right = chemins des images (None = garde blanche)"""
    endp = material('garde', color=(0.86, 0.85, 0.82), rough=0.6)
    edge = material('tranche', color=(0.78, 0.76, 0.72), rough=0.7)
    cover_edge = material('chant', color=(0.06, 0.055, 0.05), rough=0.45)
    mats = [paper(left) if left else endp, paper(right) if right else endp, endp, edge, cover_edge]
    bld = Builder()
    ny = 26
    ext = []
    for side, n_leaves, mi in ((-1, k, 0), (1, NL - k, 1)):
        t = max(n_leaves, 0.4) * LT
        xs, zs, us = profile(t)
        ext.append(xs[-1])
        ys = np.linspace(-P / 2, P / 2, ny)
        Xg = np.repeat(xs[:, None], ny, 1); Yg = np.repeat(ys[None, :], len(xs), 0)
        lift = 0.0014 * (Xg / xs[-1]) ** 3 * (np.abs(Yg) / (P / 2)) ** 3          # coins qui se soulèvent un peu
        lift += 0.0016 * (Xg / xs[-1]) ** 2.5                                      # le papier ne retombe pas tout à fait à plat
        lift += 0.0004 * np.sin(Xg * 21 + side * 1.3) * np.cos(Yg * 17 + k)        # légère ondulation
        Zg = BT + np.repeat(zs[:, None], ny, 1) + lift
        Ug = np.repeat(us[:, None], ny, 1); Vg = (Yg + P / 2) / P
        if side < 0:
            bld.grid(-Xg, Yg, Zg, 1 - Ug, Vg, mi, flip=True)
        else:
            bld.grid(Xg, Yg, Zg, Ug, Vg, mi)
        # tranches de la pile : tête, pied, gouttière
        for yy, sgn in ((-P / 2, 1), (P / 2, -1)):
            for i in range(len(xs) - 1):
                xa_, xb_ = side * xs[i], side * xs[i + 1]
                za, zb = BT + zs[i] + lift[i, 0], BT + zs[i + 1] + lift[i + 1, 0]
                pts = [(xa_, yy, BT), (xb_, yy, BT), (xb_, yy, zb), (xa_, yy, za)]
                if (side * sgn) < 0:
                    pts = pts[::-1]
                bld.quad(pts, [(0, 0), (1, 0), (1, 1), (0, 1)], 3)
        xe = side * xs[-1]
        ze0, ze1 = BT + zs[-1] + lift[-1, 0], BT + zs[-1] + lift[-1, -1]
        pts = [(xe, -P / 2, BT), (xe, P / 2, BT), (xe, P / 2, ze1), (xe, -P / 2, ze0)]
        bld.quad(pts if side > 0 else pts[::-1], [(0, 0), (1, 0), (1, 1), (0, 1)], 3)
        # plat de couverture sous la pile (garde collée dessus), dépasse de 3 mm
        x_in, x_out = 0.004, xs[-1] + OV
        x0, x1 = (x_in, x_out) if side > 0 else (-x_out, -x_in)
        bld.box(x0, x1, -P / 2 - OV, P / 2 + OV, 0, BT, 2, 4)
    bld.box(-0.004, 0.004, -P / 2 - OV, P / 2 + OV, 0, BT * 0.9, 4, 4)                # dos
    return bld.build('album', mats, parent)


def closed_book(cover, parent):
    """album fermé, couverture vers le haut ; le dos est du côté x = 0"""
    tot = 2 * BT + NL * LT + 0.0006
    cov = material('couv:' + os.path.basename(cover), image=cover, rough=0.38, coat=0.25, coat_rough=0.22, ext='EXTEND')
    edge = material('tranche', color=(0.78, 0.76, 0.72), rough=0.7)
    dark = material('chant', color=(0.06, 0.055, 0.05), rough=0.45)
    mats = [cov, edge, dark]
    bld = Builder()
    bw = P + OV + 0.002
    y0, y1 = -P / 2 - OV, P / 2 + OV
    # plat du dessus avec le mors (rainure près du dos) ; la couverture imprimée couvre le dessus et les chants
    xs = np.concatenate([np.linspace(0.0015, 0.0055, 3), np.linspace(0.006, 0.0105, 10), np.linspace(0.011, 0.0015 + bw, 30)])
    zt = tot + -0.0007 * np.exp(-((xs - 0.0083) / 0.0018) ** 2)
    ys = np.linspace(y0, y1, 3)
    Xg = np.repeat(xs[:, None], 3, 1); Yg = np.repeat(ys[None, :], len(xs), 0)
    Zg = np.repeat(zt[:, None], 3, 1)
    Ug = (Xg - 0.0015) / bw; Vg = (Yg - y0) / (y1 - y0)
    bld.grid(Xg, Yg, Zg, Ug, Vg, 0)
    zb = tot - BT
    for i in range(len(xs) - 1):                                                      # chants avant et arrière
        u0, u1 = (xs[i] - 0.0015) / bw, (xs[i + 1] - 0.0015) / bw
        bld.quad([(xs[i], y0, zb), (xs[i + 1], y0, zb), (xs[i + 1], y0, zt[i + 1]), (xs[i], y0, zt[i])],
                 [(u0, -0.01), (u1, -0.01), (u1, 0), (u0, 0)], 0)
        bld.quad([(xs[i + 1], y1, zb), (xs[i], y1, zb), (xs[i], y1, zt[i]), (xs[i + 1], y1, zt[i + 1])],
                 [(u1, 1.01), (u0, 1.01), (u0, 1), (u1, 1)], 0)
    xe = 0.0015 + bw
    bld.quad([(xe, y0, zb), (xe, y1, zb), (xe, y1, zt[-1]), (xe, y0, zt[-1])], [(1.01, 0), (1.01, 1), (1, 1), (1, 0)], 0)
    bld.quad([(0.0015, y1, zb), (0.0015, y0, zb), (0.0015, y0, zt[0]), (0.0015, y1, zt[0])], [(0, 1), (0, 0), (0, 0), (0, 1)], 2)
    bld.quad([(0.0015, y1, zb), (xe, y1, zb), (xe, y0, zb), (0.0015, y0, zb)], [(0, 0)] * 4, 1)
    back = material('dos4:' + os.path.basename(page(24)), image=page(24), rough=0.38, coat=0.25, coat_rough=0.22, ext='EXTEND')
    mats.append(back)
    bld.box(0.0015, 0.0015 + bw, y0, y1, 0, BT, 1, 3, top_uv=None)                   # plat du dessous (4e de couverture)
    bld.box(0.003, 0.003 + P, -P / 2, P / 2, BT, tot - BT, 1, 1)                      # pages
    # dos arrondi
    nseg = 12
    for i in range(nseg):
        a0, a1 = math.pi * i / nseg, math.pi * (i + 1) / nseg
        r = tot / 2
        p0 = (0.0015 - 0.0022 * math.sin(a0), r - r * math.cos(a0))
        p1 = (0.0015 - 0.0022 * math.sin(a1), r - r * math.cos(a1))
        bld.quad([(p0[0], y1, p0[1]), (p0[0], y0, p0[1]), (p1[0], y0, p1[1]), (p1[0], y1, p1[1])],
                 [(0, 0), (1, 0), (1, 1), (0, 1)], 2)
    return bld.build('album', mats, parent)


def rounded_rect(w, h, r, n=10):
    """contour d'un rectangle arrondi centré, sens trigonométrique"""
    pts = []
    for cx, cy, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for i in range(n + 1):
            a = math.radians(a0 + 90 * i / n)
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def phone(screen, parent):
    """téléphone posé à plat, écran allumé (capture de l'accueil du site, 1170 × 2532)"""
    w, h, t, r = 0.0716, 0.1476, 0.0078, 0.0105
    mats = [material('coque', color=(0.05, 0.05, 0.055), rough=0.3, metal=1.0),
            material('verre', color=(0.003, 0.003, 0.004), rough=0.04, coat=1.0, coat_rough=0.02),
            material('ecran', image=screen, rough=0.04, coat=1.0, coat_rough=0.02, glow=GLOW, ext='EXTEND'),
            material('ilot', color=(0.0, 0.0, 0.0), rough=0.2)]
    bld = Builder()
    o = rounded_rect(w, h, r)
    bld.quad([(x, y, t) for x, y in o], [((x + w / 2) / w, (y + h / 2) / h) for x, y in o], 1)
    bld.quad([(x, y, 0) for x, y in o[::-1]], [(0, 0)] * len(o), 0)
    for i in range(len(o)):
        (x0, y0), (x1, y1) = o[i], o[(i + 1) % len(o)]
        bld.quad([(x0, y0, 0), (x1, y1, 0), (x1, y1, t), (x0, y0, t)], [(0, 0), (1, 0), (1, 1), (0, 1)], 0)
    body = bld.build('album-tel', mats, parent)
    bv = body.modifiers.new('arrondi', 'BEVEL'); bv.width = 0.0016; bv.segments = 4; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(40)
    sw, sh = w - 0.0052, h - 0.0052
    scr = Builder()
    o = rounded_rect(sw, sh, r - 0.0026)
    scr.quad([(x, y, t + 0.00006) for x, y in o], [((x + sw / 2) / sw, (y + sh / 2) / sh) for x, y in o], 2)
    o = rounded_rect(0.0125, 0.0037, 0.00185)
    scr.quad([(x, y + sh / 2 - 0.0105, t + 0.00009) for x, y in o], [(0, 0)] * len(o), 3)
    scr.build('album-ecran', mats, parent)


# ── scène ──
def scene_setup():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    cy = sc.cycles
    cy.device = 'CPU'
    cy.samples = 24 if DRAFT else int(args[args.index('--spp') + 1]) if '--spp' in args else 128
    cy.adaptive_threshold = 0.03 if DRAFT else 0.015
    cy.use_denoising = True; cy.denoiser = 'OPENIMAGEDENOISE'
    cy.max_bounces = 8; cy.diffuse_bounces = 4; cy.glossy_bounces = 4; cy.caustics_reflective = False; cy.caustics_refractive = False
    cy.filter_width = 1.2
    sc.render.resolution_x, sc.render.resolution_y = W, H
    sc.render.resolution_percentage = 100
    sc.view_settings.view_transform = 'Khronos PBR Neutral'      # garde la couleur du papier et du bois
    sc.view_settings.exposure = EXPO + (0.2 if HAUT else 0.0)
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_depth = '16'
    # monde : studio « intérieur » fourni avec Blender (reflets doux)
    w = bpy.data.worlds.new('monde'); sc.world = w; w.use_nodes = True
    nt = w.node_tree
    bg = nt.nodes['Background']
    env = nt.nodes.new('ShaderNodeTexEnvironment')
    env.image = bpy.data.images.load(os.path.normpath(os.path.join(os.path.dirname(bpy.__file__), '..', '..', '..', 'datafiles', 'studiolights', 'world', 'interior.exr')))
    mp = nt.nodes.new('ShaderNodeMapping'); tc = nt.nodes.new('ShaderNodeTexCoord')
    mp.inputs['Rotation'].default_value = (0, 0, math.radians(200))
    nt.links.new(tc.outputs['Generated'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], env.inputs['Vector'])
    hs = nt.nodes.new('ShaderNodeHueSaturation'); hs.inputs['Saturation'].default_value = 0.35
    nt.links.new(env.outputs['Color'], hs.inputs['Color']); nt.links.new(hs.outputs['Color'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = 0.3
    if LIEU == 'lit':
        decor_lit(sc)
    elif LIEU == 'salon':
        decor_salon(sc)
    elif LIEU == 'noel':
        decor_noel(sc)
    elif LIEU == 'jute':
        decor_jute(sc)
    else:
        decor_table(sc)
    cam = bpy.data.cameras.new('tel'); co = bpy.data.objects.new('tel', cam); sc.collection.objects.link(co); sc.camera = co
    cam.sensor_fit = 'AUTO'; cam.sensor_width = 34.6       # 26 mm équivalent, comme l'objectif principal d'un téléphone
    cam.dof.use_dof = True
    return sc, co


THROW = (0.56, 0.36, -0.52, 0.12, math.radians(-18))    # plaid du décor lit : largeur, profondeur, centre x, y, rotation


def sheet_z(X, Y):
    """relief du drap froissé (m) ; presque plat là où repose l'album (centre 0, -0,25)"""
    rng = np.random.default_rng(7)
    Z = np.zeros_like(X)
    for _ in range(320):                                  # plis : crêtes allongées, orientées au hasard
        cx, cy, a = rng.uniform(-1, 1), rng.uniform(-1.25, 0.75), rng.uniform(0, math.pi)
        L, w, h = rng.uniform(0.05, 0.3), rng.uniform(0.008, 0.035), rng.uniform(0.005, 0.024)
        u = (X - cx) * math.cos(a) + (Y - cy) * math.sin(a)
        v = -(X - cx) * math.sin(a) + (Y - cy) * math.cos(a)
        Z = Z + h * np.exp(-(v / w) ** 2 - (u / L) ** 2)
    Z = Z + 0.006 * np.sin(X * 7 + 1.3) * np.sin(Y * 5 + 0.4) + 0.003 * np.sin(X * 13 + Y * 9)
    k = np.clip((np.hypot(X, Y + 0.25) - 0.24) / 0.12, 0, 1)
    k = k * k * (3 - 2 * k)                              # plat sous l'album, plis dès son bord
    w, h, cx, cy, th = THROW                             # et sous le plaid
    U = (X - cx) * math.cos(th) + (Y - cy) * math.sin(th); V = -(X - cx) * math.sin(th) + (Y - cy) * math.cos(th)
    q = np.clip((np.maximum(np.abs(U) - w / 2, np.abs(V) - h / 2) + 0.01) / 0.08, 0, 1)
    k = k * q * q * (3 - 2 * q)
    return Z * k - 0.004 * (1 - k) - 0.001


def fabric_material(name, colors, rough, weave, sheen, bump):
    """tissu : nuances étirées dans le sens du fil (colors : sombre, clair), trame fine (weave : période en m)"""
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1, 14, 1)
    nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 30; nz.inputs['Detail'].default_value = 8
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], nz.inputs['Vector'])
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (*colors[0], 1); ramp.color_ramp.elements[1].color = (*colors[1], 1)
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac']); nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = rough
    b.inputs['Specular IOR Level'].default_value = 0.25
    b.inputs['Sheen Weight'].default_value = sheen
    mx = nt.nodes.new('ShaderNodeMath'); mx.operation = 'ADD'
    for d in ('X', 'Y'):                                  # chaîne et trame : 0,5 + 0,5 sin(20·échelle·x)
        wv = nt.nodes.new('ShaderNodeTexWave'); wv.wave_type = 'BANDS'; wv.bands_direction = d
        wv.inputs['Scale'].default_value = 2 * math.pi / (20 * weave)
        nt.links.new(tc.outputs['Object'], wv.inputs['Vector'])
        nt.links.new(wv.outputs['Fac'], mx.inputs[0 if d == 'X' else 1])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = bump; bp.inputs['Distance'].default_value = 0.0004
    nt.links.new(mx.outputs['Value'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m


def throw_z(U, V, w, h, t=0.03):
    """plaid plié : épaisseur t, bords arrondis, légère ondulation de la laine (U, V : coordonnées locales en m)"""
    edge = np.clip(np.minimum.reduce([U + w / 2, w / 2 - U, V + h / 2, h / 2 - V]) / 0.05, 0, 1)
    return t * np.sin(edge * math.pi / 2) ** 0.9 + 0.0015 * np.sin(U * 31 + 1) * np.sin(V * 23) * edge


def tartan_material():
    """laine écossaise de Noël : fond rouge, bandes vertes et marine, filets crème (motif de 9 cm), sergé fin"""
    m = bpy.data.materials.new('ecossais'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    uv = nt.nodes.new('ShaderNodeTexCoord').outputs['UV']
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv, sep.inputs[0])
    ramps = []
    for axis in ('X', 'Y'):
        md = nt.nodes.new('ShaderNodeMath'); md.operation = 'MODULO'; md.inputs[1].default_value = 0.09
        dv = nt.nodes.new('ShaderNodeMath'); dv.operation = 'DIVIDE'; dv.inputs[1].default_value = 0.09
        nt.links.new(sep.outputs[axis], md.inputs[0]); nt.links.new(md.outputs[0], dv.inputs[0])
        rp = nt.nodes.new('ShaderNodeValToRGB'); cr = rp.color_ramp; cr.interpolation = 'CONSTANT'
        R, G, C, N = (0.32, 0.025, 0.03), (0.035, 0.12, 0.07), (0.78, 0.72, 0.6), (0.02, 0.03, 0.06)
        cr.elements[0].color = (*R, 1); cr.elements[1].position = 0.34; cr.elements[1].color = (*G, 1)
        for pos, col in ((0.56, R), (0.62, C), (0.645, R), (0.8, N), (0.86, R)):
            e = cr.elements.new(pos); e.color = (*col, 1)
        nt.links.new(dv.outputs[0], rp.inputs['Fac']); ramps.append(rp)
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.inputs[0].default_value = 0.5
    a_in = [x for x in mx.inputs if x.type == 'RGBA']
    nt.links.new(ramps[0].outputs['Color'], a_in[0]); nt.links.new(ramps[1].outputs['Color'], a_in[1])
    nt.links.new([x for x in mx.outputs if x.type == 'RGBA'][0], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.95; b.inputs['Sheen Weight'].default_value = 1.0; b.inputs['Specular IOR Level'].default_value = 0.2
    tw = nt.nodes.new('ShaderNodeTexWave'); tw.wave_type = 'BANDS'; tw.bands_direction = 'DIAGONAL'
    tw.inputs['Scale'].default_value = 2 * math.pi / (10 * 0.0018)
    nt.links.new(uv, tw.inputs['Vector'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.35; bp.inputs['Distance'].default_value = 0.0005
    nt.links.new(tw.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m


def fairy_lights(points, z_of):
    """guirlande : fil de cuivre posé sur le drap et petites ampoules chaudes tous les 7 cm"""
    pts = np.array(points, dtype=float)
    t = np.linspace(0, 1, len(pts)); tt = np.linspace(0, 1, 600)
    xs, ys = np.interp(tt, t, pts[:, 0]), np.interp(tt, t, pts[:, 1])
    for _ in range(3):                                    # lissage : courbe souple
        xs[1:-1] = (xs[:-2] + xs[1:-1] + xs[2:]) / 3; ys[1:-1] = (ys[:-2] + ys[1:-1] + ys[2:]) / 3
    zs = z_of(xs, ys) + 0.0012
    cu = bpy.data.curves.new('fil', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.0006; cu.bevel_resolution = 2
    sp = cu.splines.new('POLY'); sp.points.add(len(xs) - 1)
    for i, (x, y, z) in enumerate(zip(xs, ys, zs)):
        sp.points[i].co = (x, y, z, 1)
    fil = bpy.data.objects.new('fil', cu); bpy.context.collection.objects.link(fil)
    fil.data.materials.append(material('cuivre', color=(0.55, 0.3, 0.16), rough=0.35, metal=1.0))
    bulb = material('ampoule', color=(1.0, 0.8, 0.55), rough=0.2)
    nt = bulb.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Emission Color'].default_value = (1.0, 0.62, 0.3, 1); b.inputs['Emission Strength'].default_value = 60
    seg = np.hypot(np.diff(xs), np.diff(ys)); dist = np.concatenate([[0], np.cumsum(seg)])
    for d in np.arange(0.03, dist[-1], 0.07):
        i = int(np.searchsorted(dist, d))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.0045, segments=16, ring_count=8, location=(xs[i], ys[i], zs[i] + 0.003))
        o = bpy.context.object; o.name = 'ampoule'; o.data.materials.append(bulb)
        for p in o.data.polygons:
            p.use_smooth = True


def decor_lit(sc):
    """lit défait : drap en lin froissé, plaid en grosse maille camel, guirlande lumineuse ; lampe chaude et jour d'hiver"""
    n = 440
    X, Y = np.meshgrid(np.linspace(-1.0, 1.0, n), np.linspace(-1.25, 0.75, n), indexing='ij')
    b = Builder(); b.grid(X, Y, sheet_z(X, Y), X, Y, 0)
    b.build('drap', [fabric_material('lin', ((0.74, 0.72, 0.67), (0.9, 0.88, 0.84)), 0.9, 0.001, 0.6, 0.2)])
    # plaid plié, derrière l'album à gauche (haut des photos)
    w, h, cx, cy, th = THROW
    U, V = np.meshgrid(np.linspace(-w / 2, w / 2, 300), np.linspace(-h / 2, h / 2, 200), indexing='ij')
    PX, PY = cx + U * math.cos(th) - V * math.sin(th), cy + U * math.sin(th) + V * math.cos(th)
    k = Builder(); k.grid(PX, PY, throw_z(U, V, w, h) + sheet_z(PX, PY) + 0.0005, U + w / 2, V + h / 2, 0)
    k.build('plaid', [tartan_material()])
    # guirlande autour de l'album (jamais dessous ni sur le plaid), derrière et à droite
    a = np.radians(np.linspace(95, -160, 16))
    r = 0.3 + 0.035 * np.sin(np.arange(16) * 1.7)
    fairy_lights(list(zip(r * np.cos(a), -0.25 + r * np.sin(a))), sheet_z)
    # lumière : lampe de chevet chaude à droite, jour d'hiver doux par la fenêtre à gauche
    for name, size, energy, color, loc in (('lampe', 0.35, 100, (1.0, 0.8, 0.6), (0.85, 0.35, 0.75)),
                                            ('fenetre', 1.4, 200, (0.93, 0.96, 1.0), (-2.0, -0.5, 1.8))):
        ld = bpy.data.lights.new(name, 'AREA'); ld.size = size; ld.energy = energy; ld.color = color
        lo = bpy.data.objects.new(name, ld); sc.collection.objects.link(lo); lo.location = loc
        lo.rotation_euler = (Vector((0, -0.25, 0)) - lo.location).to_track_quat('-Z', 'Y').to_euler()


def decor_table(sc):
    """table en bois miel, coin de tapis en jute, lumière de fenêtre"""
    # plateau en bois : 0,9 × 1,8 m, 3 cm d'épaisseur, bord arrondi ; dessus à z = 0, bord avant à y = -0,45
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.45, -0.015))
    tb = bpy.context.object; tb.name = 'table'; tb.scale = (0.9, 1.8, 0.03)
    bpy.ops.object.transform_apply(scale=True)
    bv = tb.modifiers.new('arrondi', 'BEVEL'); bv.width = 0.005; bv.segments = 5; bv.limit_method = 'ANGLE'
    tb.data.materials.append(wood_material())
    for p in tb.data.polygons:
        p.use_smooth = True
    # tapis en jute au sol (la table fait 75 cm de haut)
    bpy.ops.mesh.primitive_plane_add(size=4, location=(0, -0.6, -0.75))
    rug = bpy.context.object; rug.name = 'tapis'; rug.data.materials.append(jute_material())
    # pieds et ceinture de la table (ombre sous le plateau)
    for x in (-0.38, 0.38):
        for y in (-0.37, 1.27):
            bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, -0.39)); lg = bpy.context.object
            lg.scale = (0.06, 0.06, 0.72); lg.data.materials.append(leg_material())
    # fenêtre : grande source douce sur le côté gauche de la table (le tapis devant la table reste éclairé)
    ld = bpy.data.lights.new('fenetre', 'AREA'); ld.shape = 'RECTANGLE'; ld.size = 1.4; ld.size_y = 1.1
    ld.energy = 350; ld.color = (0.96, 0.98, 1.0)
    lo = bpy.data.objects.new('fenetre', ld); sc.collection.objects.link(lo)
    lo.location = (-2.0, -0.5, 1.8)
    lo.rotation_euler = (Vector((0, -0.2, 0)) - lo.location).to_track_quat('-Z', 'Y').to_euler()
    # rebond doux côté pièce
    lf = bpy.data.lights.new('rebond', 'AREA'); lf.size = 2.0; lf.energy = 140; lf.color = (1.0, 0.95, 0.9)
    lfo = bpy.data.objects.new('rebond', lf); sc.collection.objects.link(lfo)
    lfo.location = (1.2, -1.8, 1.8)
    lfo.rotation_euler = (Vector((0, -0.2, 0)) - lfo.location).to_track_quat('-Z', 'Y').to_euler()


# ── décor « salon » : table basse ovale en chêne, tapis à poils longs beige, plante retombante dans une coupe ──
TABLE = (0.02, -0.12, 0.65, 0.36, 2.3)    # centre x, y, demi-axes (m), exposant de la superellipse (ovale un peu carré)
POT = (0.36, 0.05)                        # coupe de la plante, derrière l'album à droite
HT = 0.40                                 # hauteur de la table basse : le tapis est à z = -HT


def oval(a, b, n, cx=0.0, cy=0.0, N=240):
    """contour d'une superellipse |x/a|^n + |y/b|^n = 1 (sens trigonométrique) et normales extérieures"""
    t = np.linspace(0, 2 * math.pi, N, endpoint=False)
    c, s = np.cos(t), np.sin(t)
    x = a * np.sign(c) * np.abs(c) ** (2 / n); y = b * np.sign(s) * np.abs(s) ** (2 / n)
    tx, ty = np.roll(x, -1) - np.roll(x, 1), np.roll(y, -1) - np.roll(y, 1)
    ln = np.hypot(tx, ty)
    return x + cx, y + cy, ty / ln, -tx / ln


def slab(name, a, b, n, z_top, z_bot, r, mats, cx=0.0, cy=0.0):
    """plateau à bords arrondis (rayon r) : dessus plat, chant en quart de cercle, dessous plat"""
    x, y, nx, ny = oval(a, b, n, cx, cy)
    th = np.concatenate([np.linspace(0, math.pi / 2, 7), np.linspace(math.pi / 2, math.pi, 7)[1:]])
    off = np.where(th <= math.pi / 2, -r + r * np.sin(th), -r + r * np.sin(th))
    zz = np.where(th <= math.pi / 2, z_top - r + r * np.cos(th), z_bot + r + r * np.cos(th))
    # entre les deux quarts de cercle, le chant droit : on insère le point bas du premier et le haut du second
    off = np.concatenate([off[:7], [0.0], off[7:]]); zz = np.concatenate([zz[:7], [z_bot + r], zz[7:]])
    bld = Builder()
    xi = np.concatenate([x, x[:1]]); yi = np.concatenate([y, y[:1]]); nxi = np.concatenate([nx, nx[:1]]); nyi = np.concatenate([ny, ny[:1]])
    X = xi[None, :] + off[:, None] * nxi[None, :]; Y = yi[None, :] + off[:, None] * nyi[None, :]
    Z = np.repeat(zz[:, None], len(xi), 1)
    bld.grid(X, Y, Z, X, Y, 0, flip=True)
    top = [(x[i] - r * nx[i], y[i] - r * ny[i], z_top) for i in range(len(x))]
    bld.quad(top, [(p[0], p[1]) for p in top], 0)
    bot = [(x[i] - r * nx[i], y[i] - r * ny[i], z_bot) for i in range(len(x))][::-1]
    bld.quad(bot, [(p[0], p[1]) for p in bot], 0)
    return bld.build(name, mats)


def oak_material():
    """chêne plaqué (python3 tools/decor.py chene), projeté sur le plateau de 1,3 × 0,72 m vu de dessus"""
    m = bpy.data.materials.new('chene'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Location'].default_value = (0.5 - TABLE[0] / 1.32, 0.5 - TABLE[1] / 0.74, 0)
    mp.inputs['Scale'].default_value = (1 / 1.32, 1 / 0.74, 1)
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    c = tex(nt, os.path.join(DECOR, 'chene-couleur.jpg'), ext='EXTEND')
    r = tex(nt, os.path.join(DECOR, 'chene-rugosite.png'), True, 'EXTEND')
    h = tex(nt, os.path.join(DECOR, 'chene-relief.png'), True, 'EXTEND')
    for t in (c, r, h):
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
    nt.links.new(c.outputs['Color'], b.inputs['Base Color'])
    nt.links.new(r.outputs['Color'], b.inputs['Roughness'])
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.1; bp.inputs['Distance'].default_value = 0.0003
    nt.links.new(h.outputs['Color'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    b.inputs['Coat Weight'].default_value = 0.12; b.inputs['Coat Roughness'].default_value = 0.28   # vernis mat satiné
    return m


def yarn_material():
    """laine du tapis : beige, chaque mèche un peu différente (Curves Info → Random)"""
    m = bpy.data.materials.new('laine'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    info = nt.nodes.new('ShaderNodeHairInfo')
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (0.74, 0.59, 0.43, 1); ramp.color_ramp.elements[1].color = (0.93, 0.80, 0.63, 1)
    nt.links.new(info.outputs['Random'], ramp.inputs['Fac'])
    # pointes plus claires, racines dans l'ombre
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'
    a_in = [x for x in mx.inputs if x.type == 'RGBA']
    grad = nt.nodes.new('ShaderNodeValToRGB')
    grad.color_ramp.elements[0].color = (0.72, 0.7, 0.68, 1); grad.color_ramp.elements[1].color = (1.0, 1.0, 1.0, 1)
    grad.color_ramp.elements[1].position = 0.5
    nt.links.new(info.outputs['Intercept'], grad.inputs['Fac'])
    mx.inputs[0].default_value = 1.0
    nt.links.new(ramp.outputs['Color'], a_in[0]); nt.links.new(grad.outputs['Color'], a_in[1])
    nt.links.new([x for x in mx.outputs if x.type == 'RGBA'][0], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.82
    b.inputs['Specular IOR Level'].default_value = 0.25
    b.inputs['Sheen Weight'].default_value = 0.6
    return m


def rug(sc):
    """tapis à poils longs : socle beige et ~450 000 fibres fines (objet Curves), groupées en mèches bouclées
    qui retombent dans tous les sens ; plus serrées près de la table, plus épaisses au loin"""
    rng = np.random.default_rng(21)
    cx, cy, a, b, n = TABLE
    roots = []
    for (r0, r1, sp, nf) in ((0.0, 1.05, 0.008, 7), (1.05, 2.1, 0.012, 5)):
        g = np.arange(-2.1, 2.1, sp)
        X, Y = np.meshgrid(g, g, indexing='ij')
        X = X + rng.uniform(-0.45, 0.45, X.shape) * sp; Y = Y + rng.uniform(-0.45, 0.45, Y.shape) * sp
        d = np.hypot(X - cx, Y - (cy - 0.05))
        keep = (d >= r0) & (d < r1) & (Y > -1.15) & (np.abs(X) < 1.9)
        keep &= (np.abs((X - cx) / (a * 0.8)) ** n + np.abs((Y - cy) / (b * 0.75)) ** n) >= 1      # caché par la table
        roots.append((X[keep], Y[keep], nf, sp))
    P = 8
    t = np.linspace(0, 1, P)
    pos_all, rad_all = [], []
    for X, Y, nf, sp in roots:
        T = len(X)
        phi = rng.uniform(0, 2 * math.pi, T); th0 = np.radians(rng.uniform(30, 70, T)); L = rng.uniform(0.04, 0.065, T)
        bend = np.radians(rng.uniform(30, 75, T)); twist = rng.normal(0, 1.1, T)
        # axe de la mèche
        C = np.zeros((T, P, 3)); C[:, 0] = np.stack([X, Y, np.full(T, -HT)], 1)
        for k in range(1, P):
            tm = (t[k] + t[k - 1]) / 2
            th = th0 + bend * tm; ph = phi + twist * tm
            st = L / (P - 1)
            C[:, k, 0] = C[:, k - 1, 0] + st * np.sin(th) * np.cos(ph)
            C[:, k, 1] = C[:, k - 1, 1] + st * np.sin(th) * np.sin(ph)
            C[:, k, 2] = np.maximum(C[:, k - 1, 2] + st * np.cos(th), -HT + 0.003)
        # repère perpendiculaire à la mèche (direction de départ)
        d0 = np.stack([np.sin(th0) * np.cos(phi), np.sin(th0) * np.sin(phi), np.cos(th0)], 1)
        e1 = np.cross(d0, np.array([0.0, 0.0, 1.0])); e1 /= np.linalg.norm(e1, axis=1, keepdims=True) + 1e-9
        e2 = np.cross(d0, e1)
        # fibres : vrille autour de l'axe, les pointes s'écartent
        N = T * nf
        Ci = np.repeat(C, nf, 0)
        psi = rng.uniform(0, 2 * math.pi, N)[:, None] + rng.uniform(2, 5, N)[:, None] * t[None, :]
        rho = (0.0012 + 0.0035 * t[None, :] ** 1.5) * rng.uniform(0.5, 1.2, N)[:, None]
        E1, E2 = np.repeat(e1, nf, 0), np.repeat(e2, nf, 0)
        pos = Ci + (rho * np.cos(psi))[..., None] * E1[:, None, :] + (rho * np.sin(psi))[..., None] * E2[:, None, :]
        pos[:, 0] = Ci[:, 0] + rng.normal(0, 0.0012, (N, 3)) * np.array([1, 1, 0])
        pos[..., 2] = np.maximum(pos[..., 2], -HT + 0.001)
        r = 0.0009 if sp > 0.01 else 0.00065
        rad_all.append(np.outer(np.full(N, r) * rng.uniform(0.8, 1.2, N), np.linspace(1.0, 0.5, P)))
        pos_all.append(pos)
    pos = np.concatenate(pos_all).astype(np.float32); rad = np.concatenate(rad_all).astype(np.float32)
    N = len(pos)
    cv = bpy.data.hair_curves.new('tapis')
    cv.add_curves([P] * N)
    cv.position_data.foreach_set('vector', pos.ravel())
    ra = cv.attributes.get('radius') or cv.attributes.new('radius', 'FLOAT', 'POINT')
    ra.data.foreach_set('value', rad.ravel())
    cv.materials.append(yarn_material())
    ob = bpy.data.objects.new('tapis', cv); sc.collection.objects.link(ob)
    # socle du tapis (on le voit entre les mèches)
    bpy.ops.mesh.primitive_plane_add(size=5, location=(0, 0, -HT))
    bpy.context.object.name = 'tapis-socle'
    bpy.context.object.data.materials.append(material('socle', color=(0.62, 0.52, 0.40), rough=0.95))
    sc.cycles_curves.shape = 'THICK'
    print('tapis :', N, 'fibres', flush=True)


def revolve(name, prof, mats, seg=72, mi=0):
    """surface de révolution autour de z (prof : liste de (rayon, z) du bas vers le haut)"""
    r = np.array([p[0] for p in prof]); z = np.array([p[1] for p in prof])
    a = np.linspace(0, 2 * math.pi, seg + 1)
    X = r[:, None] * np.cos(a)[None, :] + POT[0]; Y = r[:, None] * np.sin(a)[None, :] + POT[1]
    Z = np.repeat(z[:, None], seg + 1, 1)
    U = np.repeat(np.linspace(0, 1, seg + 1)[None, :], len(r), 0); V = np.repeat(np.linspace(0, 1, len(r))[:, None], seg + 1, 1)
    bld = Builder(); bld.grid(X, Y, Z, U, V, mi, flip=True)
    return bld.build(name, mats)


def leaf_material():
    m = bpy.data.materials.new('feuille'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    uv = nt.nodes.new('ShaderNodeTexCoord').outputs['UV']
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv, sep.inputs[0])
    ab = nt.nodes.new('ShaderNodeMath'); ab.operation = 'SUBTRACT'; ab.inputs[1].default_value = 0.5
    nt.links.new(sep.outputs['Y'], ab.inputs[0])
    av = nt.nodes.new('ShaderNodeMath'); av.operation = 'ABSOLUTE'; nt.links.new(ab.outputs[0], av.inputs[0])
    ramp = nt.nodes.new('ShaderNodeValToRGB'); cr = ramp.color_ramp
    cr.elements[0].color = (0.03, 0.075, 0.025, 1); cr.elements[0].position = 0.0
    e = cr.elements.new(0.03); e.color = (0.09, 0.16, 0.06, 1)                   # nervure centrale claire
    e = cr.elements.new(0.06); e.color = (0.025, 0.065, 0.02, 1)
    e = cr.elements.new(0.3); e.color = (0.04, 0.10, 0.03, 1)
    cr.elements[1].position = 0.5; cr.elements[1].color = (0.13, 0.2, 0.07, 1)   # bord panaché
    nt.links.new(av.outputs[0], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.38; b.inputs['Specular IOR Level'].default_value = 0.45
    tr = nt.nodes.new('ShaderNodeBsdfTranslucent'); tr.inputs['Color'].default_value = (0.12, 0.25, 0.04, 1)
    mix = nt.nodes.new('ShaderNodeMixShader'); mix.inputs['Fac'].default_value = 0.18
    out = nt.nodes['Material Output']
    nt.links.new(b.outputs['BSDF'], mix.inputs[1]); nt.links.new(tr.outputs['BSDF'], mix.inputs[2])
    nt.links.new(mix.outputs['Shader'], out.inputs['Surface'])
    return m


def plant(sc):
    """coupe sur pied en céramique crème, terreau, ~22 tiges retombantes et leurs feuilles pointues"""
    rng = np.random.default_rng(5)
    ceramic = material('ceramique', color=(0.78, 0.73, 0.65), rough=0.42, coat=0.25, coat_rough=0.2)
    prof = [(0.001, 0.0), (0.046, 0.0), (0.05, 0.003), (0.048, 0.01), (0.036, 0.019), (0.029, 0.03), (0.034, 0.042),
            (0.052, 0.056), (0.07, 0.074), (0.082, 0.094), (0.088, 0.112), (0.089, 0.12), (0.086, 0.123), (0.082, 0.119),
            (0.079, 0.108), (0.077, 0.104)]
    revolve('coupe', prof, [ceramic])
    soil = material('terreau', color=(0.035, 0.025, 0.018), rough=0.95, bump=(400, 0.6))
    revolve('terreau', [(0.077, 0.104), (0.04, 0.106), (0.001, 0.107)], [soil])
    rim_r, rim_z = 0.089, 0.123
    stems, leaves = [], Builder()
    n_st = 24
    for i in range(n_st):
        az = rng.uniform(-math.pi, math.pi) if i > 5 else rng.uniform(-2.6, -0.4)   # plusieurs tiges vers l'avant
        r0 = rng.uniform(0.01, 0.06)
        long = rng.random() < 0.55
        drop = rng.uniform(0.04, 0.115) if not long else 0.118
        pts = [(r0, 0.106), (min(r0 + 0.02, rim_r - 0.012), rng.uniform(0.135, 0.165)), (rim_r + 0.012, rng.uniform(0.128, 0.142)),
               (rim_r + 0.03, 0.12 - drop * 0.45), (rim_r + 0.042, max(0.12 - drop, 0.006))]
        if long:
            pts += [(rim_r + 0.075, 0.004), (rim_r + rng.uniform(0.12, 0.2), 0.003)]
        pr = np.array(pts)
        tt = np.linspace(0, 1, len(pr)); ts = np.linspace(0, 1, 60)
        rr = np.interp(ts, tt, pr[:, 0]); zz = np.interp(ts, tt, pr[:, 1])
        for _ in range(4):
            rr[1:-1] = (rr[:-2] + rr[1:-1] + rr[2:]) / 3; zz[1:-1] = (zz[:-2] + zz[1:-1] + zz[2:]) / 3
        aa = az + rng.normal(0, 0.12) * ts + rng.uniform(-0.25, 0.25) * ts ** 2
        xs, ys = POT[0] + rr * np.cos(aa), POT[1] + rr * np.sin(aa)
        stems.append(np.stack([xs, ys, zz], 1))
        # feuilles alternées le long de la tige
        seg = np.hypot(np.hypot(np.diff(xs), np.diff(ys)), np.diff(zz)); dist = np.concatenate([[0], np.cumsum(seg)])
        side = 1
        for d in np.arange(rng.uniform(0.02, 0.035), dist[-1], rng.uniform(0.024, 0.032)):
            j = min(int(np.searchsorted(dist, d)), len(xs) - 2)
            p = np.array([xs[j], ys[j], zz[j]]); tg = np.array([xs[j + 1] - xs[j], ys[j + 1] - ys[j], zz[j + 1] - zz[j]])
            tg /= np.linalg.norm(tg) + 1e-9
            frac = d / dist[-1]
            size = rng.uniform(0.026, 0.04) * (1.0 - 0.35 * frac)
            hz = np.array([tg[0], tg[1], 0.0]); hz /= np.linalg.norm(hz) + 1e-9
            lat = np.array([-hz[1], hz[0], 0.0]) * side
            ang = math.radians(rng.uniform(35, 65))
            fwd = math.cos(ang) * hz + math.sin(ang) * lat
            fwd[2] = rng.uniform(-0.15, 0.35) if p[2] > 0.012 else rng.uniform(-0.05, 0.08)
            fwd /= np.linalg.norm(fwd)
            up = np.array([0, 0, 1.0]) + rng.normal(0, 0.25, 3)
            wv = np.cross(up, fwd); wv /= np.linalg.norm(wv) + 1e-9
            nv = np.cross(fwd, wv)
            add_leaf(leaves, p, fwd, wv, nv, size, rng)
            side = -side
    cu = bpy.data.curves.new('tiges', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.0011; cu.bevel_resolution = 2
    for s in stems:
        sp = cu.splines.new('POLY'); sp.points.add(len(s) - 1)
        for i, q in enumerate(s):
            sp.points[i].co = (q[0], q[1], max(q[2], 0.0012), 1)
    ob = bpy.data.objects.new('tiges', cu); sc.collection.objects.link(ob)
    cu.materials.append(material('tige', color=(0.06, 0.12, 0.035), rough=0.5))
    lv = leaves.build('feuilles', [leaf_material()])
    for p in lv.data.polygons:
        p.use_smooth = True


def add_leaf(bld, base, fwd, wv, nv, size, rng):
    """feuille ovale pointue, pliée en V le long de la nervure, la pointe qui retombe un peu"""
    nu, nvv = 9, 5
    u = np.linspace(0, 1, nu)[:, None]; v = np.linspace(-1, 1, nvv)[None, :]
    half = 0.27 * size * np.sin(np.pi * np.clip(u, 0, 1) ** 0.75) ** 0.85
    fold = 0.18 * size * np.abs(v) * half / (0.27 * size + 1e-9)
    droop = -0.12 * size * u ** 2 * rng.uniform(0.3, 1.0)
    L = u * size; Wd = v * half; Hh = fold + droop + 0.0004
    P = base[None, None, :] + L[..., None] * fwd + Wd[..., None] * wv + Hh[..., None] * nv
    P[..., 2] = np.maximum(P[..., 2], 0.0015)
    U = np.repeat(u, nvv, 1); V = np.repeat((v + 1) / 2, nu, 0)
    bld.grid(P[..., 0], P[..., 1], P[..., 2], U, V, 0)


def decor_salon(sc):
    """table basse ovale en chêne sur un tapis à poils longs, plante retombante ; lumière douce de fenêtre"""
    cx, cy, a, b, n = TABLE
    oak = oak_material()
    slab('table', a, b, n, 0.0, -0.024, 0.009, [oak], cx, cy)
    slab('table-pied', 0.36, 0.13, 4, -0.024, -HT, 0.004, [oak], cx, cy)          # piètement plein, dans l'ombre
    rug(sc)
    plant(sc)
    ld = bpy.data.lights.new('fenetre', 'AREA'); ld.shape = 'RECTANGLE'; ld.size = 1.6; ld.size_y = 1.3
    ld.energy = 420; ld.color = (1.0, 0.97, 0.93)
    lo = bpy.data.objects.new('fenetre', ld); sc.collection.objects.link(lo)
    lo.location = (-2.1, 0.4, 1.9)
    lo.rotation_euler = (Vector((0, -0.15, 0)) - lo.location).to_track_quat('-Z', 'Y').to_euler()
    lf = bpy.data.lights.new('rebond', 'AREA'); lf.size = 2.2; lf.energy = 280; lf.color = (1.0, 0.93, 0.86)
    lfo = bpy.data.objects.new('rebond', lf); sc.collection.objects.link(lfo)
    lfo.location = (1.4, -1.9, 1.7)
    lfo.rotation_euler = (Vector((0, -0.2, 0)) - lfo.location).to_track_quat('-Z', 'Y').to_euler()


def box(name, size, loc, mats, rot=0.0, bevel=0.002):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object; o.name = name; o.scale = size; o.rotation_euler = (0, 0, math.radians(rot))
    bpy.ops.object.transform_apply(scale=True)
    bv = o.modifiers.new('arrondi', 'BEVEL'); bv.width = bevel; bv.segments = 3; bv.limit_method = 'ANGLE'
    for m in mats:
        o.data.materials.append(m)
    return o


def decor_noel(sc):
    """soir de Noël sur la table basse du salon : guirlande lumineuse autour de l'album, paquet en papier kraft
    et ruban bordeaux, boules de verre, bougie ; lampe chaude et dernier jour bleuté à la fenêtre"""
    cx, cy, a, b, n = TABLE
    oak = oak_material()
    slab('table', a, b, n, 0.0, -0.024, 0.009, [oak], cx, cy)
    slab('table-pied', 0.36, 0.13, 4, -0.024, -HT, 0.004, [oak], cx, cy)
    rug(sc)
    # paquet cadeau derrière l'album à droite (à la place de la plante)
    kraft = material('kraft', color=(0.52, 0.36, 0.22), rough=0.8, bump=(260, 0.25))
    ruban = material('ruban', color=(0.2, 0.01, 0.03), rough=0.6, coat=0.08, coat_rough=0.4)
    gx, gy, gr = POT[0] - 0.02, POT[1] + 0.03, 14
    w, d, h = 0.17, 0.13, 0.085
    box('paquet', (w, d, h), (gx, gy, h / 2), [kraft], gr)
    ca, sa = math.cos(math.radians(gr)), math.sin(math.radians(gr))
    box('ruban-1', (0.022, d + 0.003, h + 0.003), (gx, gy, h / 2), [ruban], gr, 0.0008)
    box('ruban-2', (w + 0.003, 0.022, h + 0.003), (gx, gy, h / 2), [ruban], gr, 0.0008)
    for ang in (32, 148, -40, -140):                      # nœud : quatre pans aplatis en rosace, posés sur le paquet
        t = math.radians(gr + ang)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=32, ring_count=16, location=(gx + 0.022 * math.cos(t), gy + 0.022 * math.sin(t), h + 0.006))
        o = bpy.context.object; o.name = 'noeud'; o.scale = (0.026, 0.011, 0.006); o.rotation_euler = (0, math.radians(-12), t)
        o.data.materials.append(ruban)
        for p in o.data.polygons:
            p.use_smooth = True
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.009, location=(gx, gy, h + 0.007))
    o = bpy.context.object; o.scale = (1, 1, 0.7); o.data.materials.append(ruban)
    # petit paquet crème au ruban vert, derrière l'album à gauche
    creme = material('papier-creme', color=(0.82, 0.78, 0.7), rough=0.7, bump=(300, 0.15))
    vert = material('ruban-vert', color=(0.02, 0.09, 0.05), rough=0.45, coat=0.3)
    box('paquet-2', (0.1, 0.1, 0.06), (-0.2, 0.14, 0.03), [creme], -20)
    box('ruban-3', (0.016, 0.103, 0.063), (-0.2, 0.14, 0.03), [vert], -20, 0.0006)
    box('ruban-4', (0.103, 0.016, 0.063), (-0.2, 0.14, 0.03), [vert], -20, 0.0006)
    # boules de Noël en verre laqué, avec leur attache dorée
    dore = material('dore', color=(0.85, 0.62, 0.3), rough=0.25, metal=1.0)
    for name, col, r, (x, y) in (('boule-bordeaux', (0.3, 0.02, 0.05), 0.032, (0.22, 0.13)),
                                 ('boule-or', (0.8, 0.55, 0.22), 0.026, (0.5, -0.1)),
                                 ('boule-vert', (0.02, 0.1, 0.06), 0.03, (-0.43, -0.02)),
                                 ('boule-creme', (0.85, 0.8, 0.7), 0.022, (-0.36, 0.08))):
        mat = material(name, color=col, rough=0.12, coat=1.0, coat_rough=0.05, metal=0.6 if 'or' in name else 0.0)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=48, ring_count=24, location=(x, y, r))
        o = bpy.context.object; o.name = name; o.data.materials.append(mat)
        for p in o.data.polygons:
            p.use_smooth = True
        bpy.ops.mesh.primitive_cylinder_add(radius=r * 0.28, depth=r * 0.3, location=(x - r * 0.75, y + r * 0.2, r * 0.9))
        o = bpy.context.object; o.rotation_euler = (0, math.radians(-70), math.radians(15)); o.data.materials.append(dore)
    # bougie crème à gauche, flamme et sa lumière
    bpy.ops.mesh.primitive_cylinder_add(radius=0.035, depth=0.09, vertices=64, location=(-0.42, -0.24, 0.045))
    o = bpy.context.object; o.name = 'bougie'; o.data.materials.append(material('cire', color=(0.9, 0.86, 0.76), rough=0.5))
    for p in o.data.polygons:
        p.use_smooth = True
    flamme = material('flamme', color=(1.0, 0.7, 0.3), rough=0.5)
    fb = flamme.node_tree.nodes['Principled BSDF']
    fb.inputs['Emission Color'].default_value = (1.0, 0.55, 0.18, 1); fb.inputs['Emission Strength'].default_value = 40
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.006, location=(-0.42, -0.24, 0.103))
    o = bpy.context.object; o.name = 'flamme'; o.scale = (1, 1, 2.2); o.data.materials.append(flamme)
    lb = bpy.data.lights.new('bougie', 'POINT'); lb.energy = 4; lb.color = (1.0, 0.6, 0.3); lb.shadow_soft_size = 0.01
    lbo = bpy.data.objects.new('bougie', lb); sc.collection.objects.link(lbo); lbo.location = (-0.42, -0.24, 0.12)
    # guirlande posée sur la table autour de l'album (de la gauche du paquet, par l'avant, jusqu'à la droite)
    an = np.radians(np.linspace(100, 370, 22))
    rr = 1 + 0.06 * np.sin(np.arange(22) * 1.9)
    pts = list(zip(0.0 + 0.37 * rr * np.cos(an), -0.21 + 0.235 * rr * np.sin(an)))
    fairy_lights(pts, lambda x, y: np.zeros_like(x))
    # lumière : lampe chaude derrière à droite, fenêtre bleutée faible à gauche, rebond chaud
    for name, size, energy, color, loc in (('lampe', 0.5, 160, (1.0, 0.72, 0.45), (1.1, 0.9, 1.0)),
                                            ('fenetre', 1.6, 110, (0.72, 0.8, 1.0), (-2.1, 0.4, 1.9)),
                                            ('rebond', 2.2, 90, (1.0, 0.8, 0.6), (1.4, -1.9, 1.7))):
        ld = bpy.data.lights.new(name, 'AREA'); ld.size = size; ld.energy = energy; ld.color = color
        lo = bpy.data.objects.new(name, ld); sc.collection.objects.link(lo); lo.location = loc
        lo.rotation_euler = (Vector((0, -0.15, 0)) - lo.location).to_track_quat('-Z', 'Y').to_euler()


def decor_jute(sc):
    """album posé à même un tapis de jute tressé (comme les vidéos claires), lumière douce de fenêtre"""
    bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, -0.0005))
    o = bpy.context.object; o.name = 'tapis-jute'; o.data.materials.append(jute_material(1.3))
    for name, size, energy, color, loc in (('fenetre', 1.6, 620, (1.0, 0.97, 0.93), (-2.1, 0.4, 1.9)),
                                            ('rebond', 2.2, 380, (1.0, 0.93, 0.86), (1.4, -1.9, 1.7))):
        ld = bpy.data.lights.new(name, 'AREA'); ld.size = size; ld.energy = energy; ld.color = color
        lo = bpy.data.objects.new(name, ld); sc.collection.objects.link(lo); lo.location = loc
        lo.rotation_euler = (Vector((0, -0.15, 0)) - lo.location).to_track_quat('-Z', 'Y').to_euler()


def leg_material():
    if 'pied' in _mats:
        return _mats['pied']
    m = material('pied', color=(0.35, 0.2, 0.09), rough=0.5)
    return m


def place_camera(co, target, dist, elev, azim, roll=0.0, lens=26, fstop=14.0):
    e, a = math.radians(elev), math.radians(azim)
    t = Vector(target)
    pos = t + Vector((math.sin(a) * math.cos(e) * dist, -math.cos(a) * math.cos(e) * dist, math.sin(e) * dist))
    co.location = pos
    q = (t - pos).to_track_quat('-Z', 'Y')
    co.rotation_euler = q.to_euler()
    co.rotation_euler.rotate_axis('Z', math.radians(roll))
    co.data.lens = lens
    co.data.dof.focus_distance = (t - pos).length
    co.data.dof.aperture_fstop = fstop


# ── les photos (mêmes rubriques que le carrousel de référence) ──
# book : position (x, y) sur la table et rotation (°) ; cam : cible, distance, hauteur (°), côté (°), roulis (°)
def spread(n, k, tilt, roll=0.0, dist=0.34, elev=58, azim=-32, dx=-0.018, up=0.035):
    """double page k ; tilt : rotation de l'album dans l'image (°) ; dx : visée décalée vers la page de gauche (m) ;
    up : album remonté dans l'image, pour que la légende du bas tombe sur la table"""
    rot, a = math.radians(azim + tilt), math.radians(azim)
    cx, cy = 0.0, -0.25
    target = (cx + dx * math.cos(rot) + up * math.sin(a), cy + dx * math.sin(rot) - up * math.cos(a), 0)
    return dict(n=n, spread=k, book=(cx, cy, azim + tilt), cam=dict(target=target, dist=dist, elev=elev, azim=azim, roll=roll))


SHOTS = [
    dict(n=1, closed=1, book=(0.0, -0.25, 30), cam=dict(target=(-0.03, -0.2, 0), dist=0.38, elev=66, azim=24, roll=-2)),   # accroche : album fermé dans son décor
    dict(n=2, closed=1, book=(0.0, -0.25, -40), cam=dict(target=(0.0, -0.24, 0), dist=0.31, elev=72, azim=-30, roll=1)),
    spread(3, 1, 14, -1, dist=0.41, elev=58, azim=26, dx=0.02),
    spread(4, 2, -16, 2, elev=62, azim=-24),
    spread(5, 3, 20, 0, dist=0.38, azim=30, dx=-0.065),
    dict(spread(6, 7, -12, -1, dist=0.40, dx=0.03, azim=-22), pages=('pano-g.jpg', 'pano-d.jpg')),   # double page paysage (clé « pano » de mag/vitrine.json), vue entière
    spread(7, 4, -18, 1, dist=0.37, elev=60, azim=-36),
    spread(8, 5, 20, -2, dist=0.38, azim=28, dx=-0.065),
    spread(9, 6, -15, 2, dist=0.37, elev=64, azim=-28),
    spread(10, 8, 20, -1, dist=0.38, azim=30, dx=-0.065),
    spread(11, 10, -20, 1, dist=0.37, elev=60, azim=-30),
    dict(spread(12, 1, -20, 1, azim=-30), dir=AUTRE),                 # la même double page dans l'autre style
    dict(n=13, closed=1, book=(0.04, -0.28, -14), phone=(-0.14, -0.18, -18), cam=dict(target=(-0.005, -0.27, 0), dist=0.40, elev=72, azim=-30, roll=2)),
]


def spread_s(n, k, tilt, roll=0.0, dist=0.68, elev=60, azim=-30, dx=0.0, up=0.0):
    """décor salon (9:16) : double page k, album au milieu de la table ovale, plante en haut de l'image"""
    rot, a = math.radians(azim + tilt), math.radians(azim)
    cx, cy = 0.0, -0.21
    target = (cx + dx * math.cos(rot) + up * math.sin(a), cy + dx * math.sin(rot) - up * math.cos(a), 0)
    return dict(n=n, spread=k, book=(cx, cy, azim + tilt), cam=dict(target=target, dist=dist, elev=elev, azim=azim, roll=roll))


SHOTS_SALON = [
    dict(n=1, closed=1, book=(-0.01, -0.2, -20), cam=dict(target=(0.03, -0.15, 0), dist=0.56, elev=66, azim=-24, roll=-1)),   # la couverture, la plante derrière
    spread_s(2, 1, 12, -1, azim=28),                       # « Là où tout a commencé » et le plan de la ville
    spread_s(3, 2, -14, 1, azim=-26),                      # nos étapes, photo pleine page
    spread_s(4, 3, 16, 0, azim=32),                        # une année en photos
    dict(spread_s(5, 7, -10, -1, azim=-22), pages=('pano-g.jpg', 'pano-d.jpg')),   # la double page paysage
    spread_s(6, 4, -16, 1, azim=-34),                      # la playlist
    spread_s(7, 5, 18, -1, azim=26),                       # adresses et voyages
    spread_s(8, 7, -12, 1, azim=-28),                      # chapitre et deux photos
    spread_s(9, 9, 14, 0, azim=30),                        # bucket list et photo pleine page
    spread_s(10, 10, -14, 1, azim=-30),                    # la lettre
    dict(n=11, closed=1, book=(0.0, -0.21, 30), cam=dict(target=(0.0, -0.2, 0), dist=0.5, elev=74, azim=30, roll=1)),   # la couverture de plus près
]


def finish(src, dst):
    """rendu → photo de téléphone : légère netteté, grain fin, JPEG (visuels du site : sans grain, JPEG léger)"""
    im = Image.open(src).convert('RGB')
    if LIEU in ('lit', 'noel'):                           # halo chaud autour des ampoules de la guirlande
        a = np.asarray(im).astype(np.float32) / 255
        m = Image.fromarray((np.clip((a.min(axis=2) - 0.9) / 0.1, 0, 1) * 255).astype(np.uint8))
        r = W / 1080
        glow = sum(np.asarray(m.filter(ImageFilter.GaussianBlur(k * r))).astype(np.float32) / 255 * g for k, g in ((5, 0.9), (16, 0.6), (40, 0.35)))
        a = np.clip(a + glow[..., None] * np.array([1.0, 0.72, 0.42]), 0, 1)
        im = Image.fromarray((a * 255).astype(np.uint8))
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2))
    if SITE:
        im.save(dst, quality=80, optimize=True, progressive=True, subsampling=2)
        return
    a = np.asarray(im).astype(np.float32)
    rng = np.random.default_rng(sum(map(ord, os.path.basename(src))))
    lum = rng.normal(0, 2.2, a.shape[:2])[..., None]
    chroma = rng.normal(0, 0.8, a.shape)
    a = np.clip(a + lum + chroma, 0, 255).astype(np.uint8)
    Image.fromarray(a).save(dst, quality=93, subsampling=0)


# ── visuels du site : mêmes décor et lumière, cadrages carrés (images d'album des guides) et 1200 × 630 (partage) ──
def site_spread(name, k, tilt, dist=0.38, elev=62, azim=-32, res=(1200, 1200), right=0.0):
    """double page k centrée ; right : visée décalée vers la droite de l'image (l'album passe à gauche)"""
    a = math.radians(azim)
    cx, cy = 0.0, -0.26
    return dict(name=name, res=res, spread=k, book=(cx, cy, azim + tilt),
                cam=dict(target=(cx + right * math.cos(a), cy + right * math.sin(a), 0), dist=dist, elev=elev, azim=azim))


SITE_SHOTS = [
    dict(name='album-couverture', res=(1200, 1200), closed=1, book=(0.0, -0.25, -50), cam=dict(target=(-0.03, -0.24, 0), dist=0.35, elev=70, azim=-32)),
    site_spread('album-double-page', 1, -16),           # « Là où tout a commencé » et le plan de la ville
    site_spread('album-pages', 2, 14),                  # nos étapes
    site_spread('album-souvenirs', 3, -12),             # une année en photos
    site_spread('album-tour', 10, 15),                  # la lettre
    dict(name='og-fond', res=(1200, 630), closed=1, book=(0.0, -0.25, -46),
         cam=dict(target=(0.15 * math.cos(math.radians(-32)), -0.255 + 0.15 * math.sin(math.radians(-32)), 0), dist=0.5, elev=66, azim=-32)),
    site_spread('og-exemple-fond', 1, -10, dist=0.6, elev=60, res=(1200, 630), right=0.17),
    # image principale du flux Google Shopping (--decor salon) : la couverture remplit l'image, comme les vignettes des concurrents
    dict(name='shopping-couverture', res=(1200, 1200), closed=1, book=(0.0, -0.21, -6),
         cam=dict(target=(0.0, -0.212, 0), dist=0.43, elev=80, azim=-8, lens=52)),
]


def main():
    os.makedirs(os.path.join(OUT, 'brut'), exist_ok=True)
    sc, co = scene_setup()
    for s in (SITE_SHOTS if SITE else SHOTS_SALON if HAUT else SHOTS):
        name = s.get('name') or '%02d' % s['n']
        if ONLY and s.get('n', name) not in ONLY and name not in ONLY:
            continue
        t0 = time.time()
        rx, ry = s.get('res', (W, H) if not DRAFT else (W * 2, H * 2))
        sc.render.resolution_x, sc.render.resolution_y = (rx // 2, ry // 2) if DRAFT else (rx, ry)
        for ob in [o for o in bpy.data.objects if o.name.startswith(('album', 'pivot'))]:
            bpy.data.objects.remove(ob, do_unlink=True)
        piv = bpy.data.objects.new('pivot', None); sc.collection.objects.link(piv)
        bx, by, rot = s['book']
        if s.get('closed'):                                   # (bx, by) = centre de la couverture ; le pivot est au dos
            a = math.radians(rot)
            bx, by = bx - 0.109 * math.cos(a), by - 0.109 * math.sin(a)
        piv.location = (bx, by, 0); piv.rotation_euler = (0, 0, math.radians(rot))
        if s.get('closed'):
            closed_book(page(1), piv)
            if s.get('phone'):                                # téléphone posé à côté, écran sur l'accueil du site
                tel = bpy.data.objects.new('pivot-tel', None); sc.collection.objects.link(tel)
                px, py, pr = s['phone']
                tel.location = (px, py, 0); tel.rotation_euler = (0, 0, math.radians(pr))
                phone(os.path.join(DECOR, 'site-mobile.png'), tel)
        else:
            k, d = s['spread'], os.path.join(ROOT, 'out', 'mag', s.get('dir', os.path.basename(PAGES)))
            g, r = s.get('pages', (2 * k + 1, 2 * k + 2))
            open_book(page(g, d) if k > 0 else None, page(r, d), k, piv)
        place_camera(co, **s['cam'])
        raw = os.path.join(OUT, 'brut', name + '.png')
        sc.render.filepath = raw
        bpy.ops.render.render(write_still=True)
        finish(raw, os.path.join(OUT, name + '.jpg'))
        print('photo', name, round(time.time() - t0), 's', flush=True)


if __name__ == '__main__':
    main()
