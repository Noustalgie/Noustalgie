"""Photos « magazine » pour les slides TikTok : l'album vitrine (pages de out/mag/pages) photographié
ouvert sur une table en bois, tapis en jute au sol, lumière de fenêtre. Rendu Blender Cycles (lancer de rayons).

Prérequis : python3 tools/mag-pages.py (pages) et python3 tools/decor.py (textures), puis Blender en module Python :
  python3.11 -m venv ~/blender-venv && ~/blender-venv/bin/pip install bpy==5.0.1
  ~/blender-venv/bin/python tools/mag-photos.py [--only 3,4] [--draft]
  → out/mag/photos/brut/NN.png (rendu) et out/mag/photos/NN.jpg (grain et netteté de téléphone)
  (la version années 70 lit out/mag/pages-seventies : python3 tools/mag-pages.py --theme seventies)
  ~/blender-venv/bin/python tools/mag-photos.py --site [--only album-couverture]
  → out/mag/site/*.jpg : visuels du site (images d'album des guides, fonds des images de partage)
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
PAGES = os.path.join(ROOT, 'out', 'mag', 'pages')
DECOR = os.path.join(ROOT, 'out', 'mag', 'decor')
args = sys.argv[1:]
SITE = '--site' in args
OUT = os.path.join(ROOT, 'out', 'mag', 'site' if SITE else 'photos')
DRAFT = '--draft' in args
ONLY = [int(n) if n.isdigit() else n for n in args[args.index('--only') + 1].split(',')] if '--only' in args else None
W, H = (540, 720) if DRAFT else (1080, 1440)
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
    return material('page:' + os.path.basename(path), image=path, rough=0.33, spec=0.42, bump=(900, 0.04))


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


def jute_material():
    m = bpy.data.materials.new('jute'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])                                       # 1 m par répétition
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
    sc.view_settings.exposure = EXPO
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
    cam = bpy.data.cameras.new('tel'); co = bpy.data.objects.new('tel', cam); sc.collection.objects.link(co); sc.camera = co
    cam.sensor_fit = 'AUTO'; cam.sensor_width = 34.6       # 26 mm équivalent, comme l'objectif principal d'un téléphone
    cam.dof.use_dof = True
    return sc, co


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
    dict(n=2, closed=1, book=(0.0, -0.24, -52), cam=dict(target=(0.0, -0.25, 0), dist=0.30, elev=72, azim=-32, roll=0)),
    spread(3, 1, -22),
    spread(4, 2, 16, 2),
    spread(5, 3, -18, -2),
    dict(spread(6, 7, 13, 1, dist=0.43, dx=0.03), pages=('pano-g.jpg', 'pano-d.jpg')),   # double page paysage (clé « pano » de mag/vitrine.json), vue entière
    spread(7, 4, 18),
    spread(8, 5, -20, -2),
    spread(9, 6, 15, 2),
    spread(10, 9, -22),
    spread(11, 8, 16, 2),
    spread(12, 10, -18),
    dict(spread(13, 1, -22), dir='pages-seventies'),                    # la slide 3 en style Années 70 (même cadrage)
    dict(n=14, closed=1, book=(0.04, -0.28, -14), phone=(-0.14, -0.18, -18), cam=dict(target=(-0.005, -0.27, 0), dist=0.40, elev=72, azim=-30, roll=2)),
]


def finish(src, dst):
    """rendu → photo de téléphone : légère netteté, grain fin, JPEG (visuels du site : sans grain, JPEG léger)"""
    im = Image.open(src).convert('RGB')
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
]


def main():
    os.makedirs(os.path.join(OUT, 'brut'), exist_ok=True)
    sc, co = scene_setup()
    for s in (SITE_SHOTS if SITE else SHOTS):
        name = s.get('name') or '%02d' % s['n']
        if ONLY and s.get('n', name) not in ONLY and name not in ONLY:
            continue
        t0 = time.time()
        rx, ry = s.get('res', (1080, 1440))
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
            k, d = s['spread'], os.path.join(ROOT, 'out', 'mag', s.get('dir', 'pages'))
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
