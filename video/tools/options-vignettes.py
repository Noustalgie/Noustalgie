"""Vignettes des options du livre imprimé (encadré « Options » du paiement) : coffret, affiche, cadre et aimant
photographiés en 3D (Blender Cycles), zone imprimée blanche et face à l'objectif. Sur le site, la couverture du client
est posée dans cette zone, puis la photo par-dessus en « multiplier » : ombres et lumière de la scène retombent sur sa photo.
  ~/blender-venv/bin/python tools/options-vignettes.py [--only cadre,aimant] [--spp 96]
  → ../public/img/options/<objet>.jpg (480 × 480) ; la zone imprimée de chaque photo (en % de l'image) est écrite
    dans out/options/zones.json, à recopier dans OPT_IMG (index.html) si elle change.
Textures du décor : python3 tools/decor.py (out/mag/decor/chene-*)."""
import json
import math
import os
import sys

import bpy
import bmesh  # après bpy (module fourni par Blender)
import numpy as np
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Matrix, Vector
from PIL import Image

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
DECOR = os.path.join(ROOT, 'out', 'mag', 'decor')
SITE = os.path.normpath(os.path.join(ROOT, '..', 'public', 'img', 'options'))
TMP = os.path.join(ROOT, 'out', 'options')
args = sys.argv[1:]
ONLY = args[args.index('--only') + 1].split(',') if '--only' in args else None
SPP = int(args[args.index('--spp') + 1]) if '--spp' in args else 96
RES = 480


def scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    cy = sc.cycles
    cy.device = 'CPU'; cy.samples = SPP; cy.adaptive_threshold = 0.02
    cy.use_denoising = True; cy.denoiser = 'OPENIMAGEDENOISE'
    cy.max_bounces = 8; cy.caustics_reflective = False; cy.caustics_refractive = False
    sc.render.resolution_x = sc.render.resolution_y = RES
    sc.render.resolution_percentage = 100
    sc.view_settings.view_transform = 'Khronos PBR Neutral'
    sc.view_settings.exposure = -1.6                            # sans blanc brûlé : le gain final cale la zone imprimée
    sc.render.image_settings.file_format = 'PNG'
    w = bpy.data.worlds.new('monde'); sc.world = w; w.use_nodes = True
    nt = w.node_tree; bg = nt.nodes['Background']
    env = nt.nodes.new('ShaderNodeTexEnvironment')
    env.image = bpy.data.images.load(os.path.normpath(os.path.join(os.path.dirname(bpy.__file__), '..', '..', '..', 'datafiles', 'studiolights', 'world', 'interior.exr')))
    hs = nt.nodes.new('ShaderNodeHueSaturation'); hs.inputs['Saturation'].default_value = 0.3
    nt.links.new(env.outputs['Color'], hs.inputs['Color']); nt.links.new(hs.outputs['Color'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = 0.35
    return sc


def material(name, color, rough=0.5, coat=0.0, coat_rough=0.08, metal=0.0, bump=None):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Coat Weight'].default_value = coat; b.inputs['Coat Roughness'].default_value = coat_rough
    b.inputs['Metallic'].default_value = metal
    if bump:                                    # relief fin (plâtre, carton)
        nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = bump[0]; nz.inputs['Detail'].default_value = 8
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = bump[1]; bp.inputs['Distance'].default_value = 0.0005
        nt.links.new(nz.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m


def chene(scale=1.6):
    """chêne plaqué du décor salon, en coordonnées objet (1 répétition par 1/scale m)"""
    m = bpy.data.materials.new('chene'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (scale, scale, scale)
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    for f, entree, data in (('chene-couleur.jpg', 'Base Color', False), ('chene-rugosite.png', 'Roughness', True)):
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(os.path.join(DECOR, f), check_existing=True)
        if data:
            t.image.colorspace_settings.name = 'Non-Color'
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector']); nt.links.new(t.outputs['Color'], b.inputs[entree])
    b.inputs['Coat Weight'].default_value = 0.12; b.inputs['Coat Roughness'].default_value = 0.3
    return m


def cube(name, size, loc, mat, rot=(0, 0, 0), bevel=0.0):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * size[0], v.co.y * size[1], v.co.z * size[2]))
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    ob.location = loc; ob.rotation_euler = rot; ob['taille'] = list(size)
    me.materials.append(mat)
    if bevel:
        md = ob.modifiers.new('arrondi', 'BEVEL'); md.width = bevel; md.segments = 3
    return ob


def cylindre(name, r, h, loc, mat):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=64, radius1=r, radius2=r, depth=h)
    bm.to_mesh(me); bm.free()
    for p in me.polygons:
        p.use_smooth = True
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    ob.location = loc; me.materials.append(mat)
    return ob


def lumiere(loc, cible, taille, puissance, couleur=(1.0, 0.96, 0.9)):
    """fenêtre : grande source douce"""
    l = bpy.data.lights.new('fenetre', 'AREA'); l.size = taille; l.energy = puissance; l.color = couleur
    ob = bpy.data.objects.new('fenetre', l); bpy.context.scene.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = (Vector(cible) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()


def camera(centre, normale, dist, champ, decalage=(0.0, 0.0), haut=(0, 0, 1)):
    """objectif dans l'axe de la face imprimée (la zone reste un rectangle droit dans l'image) ; champ : largeur vue à cette distance (m)"""
    sc = bpy.context.scene
    cam = bpy.data.cameras.new('cam'); co = bpy.data.objects.new('cam', cam); sc.collection.objects.link(co); sc.camera = co
    cam.sensor_fit = 'HORIZONTAL'; cam.sensor_width = 36; cam.lens = 36 * dist / champ
    cam.shift_x, cam.shift_y = decalage
    n = Vector(normale).normalized()
    co.location = Vector(centre) + n * dist
    co.rotation_euler = (-n).to_track_quat('-Z', 'Y').to_euler() if haut == (0, 0, 1) else Matrix(((Vector(haut).cross(n)).normalized(), Vector(haut), n)).transposed().to_euler()
    return co


def zone(ob, coins):
    """rectangle (en % de l'image) couvert par la face imprimée : coins en fractions de la taille du pavé (±0,5)"""
    sc = bpy.context.scene; bpy.context.view_layer.update()
    T = ob['taille']
    pts = [world_to_camera_view(sc, sc.camera, ob.matrix_world @ Vector([c[i] * T[i] for i in range(3)])) for c in coins]
    xs = [p.x for p in pts]; ys = [1 - p.y for p in pts]
    return {'x': round(min(xs) * 100, 2), 'y': round(min(ys) * 100, 2), 'w': round((max(xs) - min(xs)) * 100, 2), 'h': round((max(ys) - min(ys)) * 100, 2)}


BLANC = (0.92, 0.92, 0.92)      # zone imprimée : papier ou céramique blancs


def s_cadre():
    """carreau 15 × 15 cm légèrement penché dans son support en bois, sur une table en chêne, devant un mur clair"""
    cube('table', (1.2, 0.8, 0.03), (0, 0.1, -0.015), chene())
    cube('mur', (1.6, 0.02, 1.0), (0, 0.32, 0.5), material('mur', (0.74, 0.72, 0.68), 0.95, bump=(60, 0.05)))
    bois = material('support', (0.5, 0.34, 0.21), 0.5, coat=0.1, bump=(220, 0.08))
    cube('support', (0.17, 0.045, 0.022), (0, 0, 0.011), bois, bevel=0.003)
    a = math.radians(9)
    t = cube('carreau', (0.15, 0.0065, 0.15), (0, 0.004, 0.012 + 0.075 * math.cos(a)), material('ceramique', BLANC, 0.18, coat=0.5, coat_rough=0.06), rot=(-a, 0, 0), bevel=0.0015)
    lumiere((-0.55, -0.45, 0.65), (0, 0, 0.08), 0.6, 60)
    c = Vector(t.location); n = Vector((0, -math.cos(a), math.sin(a)))
    camera(c, n, 0.46, 0.26, decalage=(0, -0.09))
    return zone(t, [(sx * 0.5, -0.5, sz * 0.5) for sx in (-1, 1) for sz in (-1, 1)])


def s_aimant():
    """carreau aimanté 5 × 5 cm sur une porte de réfrigérateur blanche, poignée en inox à droite"""
    cube('porte', (0.8, 0.02, 0.8), (0, 0.01, 0), material('porte', (0.9, 0.9, 0.88), 0.28, coat=0.35, coat_rough=0.15))
    cube('poignee', (0.016, 0.028, 0.5), (0.05, -0.02, 0), material('inox', (0.8, 0.8, 0.8), 0.25, metal=1.0), bevel=0.006)
    t = cube('aimant', (0.05, 0.004, 0.05), (-0.012, -0.002, 0.004), material('ceramique', BLANC, 0.18, coat=0.5, coat_rough=0.06), bevel=0.0008)
    lumiere((-0.5, -0.5, 0.45), (0, 0, 0), 0.5, 38)
    camera(Vector((-0.004, 0, 0.004)), (0, -1, 0), 0.3, 0.12)
    return zone(t, [(sx * 0.5, -0.5, sz * 0.5) for sx in (-1, 1) for sz in (-1, 1)])


def s_affiche():
    """affiche 30 × 40 cm au mur, au-dessus d'une console en chêne, vase en céramique"""
    cube('mur', (2.0, 0.02, 1.6), (0, 0.01, 0.2), material('mur', (0.74, 0.72, 0.68), 0.95, bump=(40, 0.06)))
    t = cube('affiche', (0.3, 0.0006, 0.4), (0, -0.0015, 0.13), material('papier', BLANC, 0.6), bevel=0.0)
    cube('console', (1.2, 0.3, 0.03), (0, -0.15, -0.2), chene(), bevel=0.002)
    lumiere((-0.9, -0.8, 0.8), (0, 0, 0.1), 0.9, 140)
    camera(Vector((0, 0, 0.072)), (0, -1, 0), 1.1, 0.58)
    return zone(t, [(sx * 0.5, -0.5, sz * 0.5) for sx in (-1, 1) for sz in (-1, 1)])


def s_coffret():
    """le livre couché dans sa boîte cadeau rigide ouverte, couvercle à côté, vu de dessus sur la table en chêne"""
    cube('table', (1.2, 1.2, 0.03), (0, 0, -0.015), chene())
    carton = material('carton', (0.62, 0.6, 0.57), 0.75, bump=(300, 0.03))
    e, L, H = 0.004, 0.236, 0.05
    cube('fond', (L, L, e), (0, 0, e / 2), carton)
    for nom, s, p in (('g', (e, L, H), (-L / 2 + e / 2, 0, H / 2)), ('d', (e, L, H), (L / 2 - e / 2, 0, H / 2)),
                      ('h', (L - 2 * e, e, H), (0, L / 2 - e / 2, H / 2)), ('b', (L - 2 * e, e, H), (0, -L / 2 + e / 2, H / 2))):
        cube('paroi-' + nom, s, p, carton)
    cube('couvercle', (L + 0.01, L + 0.01, 0.03), (0.25, 0.235, 0.015), carton, rot=(0, 0, math.radians(-12)), bevel=0.001)
    cube('livre-tranche', (0.214, 0.214, 0.014), (0, 0, e + 0.007), material('tranche', (0.95, 0.94, 0.9), 0.6), bevel=0.0015)
    t = cube('livre', (0.214, 0.214, 0.0006), (0, 0, e + 0.0143), material('couv', BLANC, 0.35, coat=0.25, coat_rough=0.2))
    lumiere((-0.6, 0.4, 0.9), (0, 0, 0), 0.8, 90)
    camera(Vector((0, 0, e + 0.0146)), (0, 0, 1), 0.85, 0.3, haut=(0, 1, 0))
    return zone(t, [(sx * 0.5, sy * 0.5, 0.5) for sx in (-1, 1) for sy in (-1, 1)])


SCENES = {'coffret': s_coffret, 'affiche': s_affiche, 'cadre': s_cadre, 'aimant': s_aimant}


def main():
    os.makedirs(SITE, exist_ok=True); os.makedirs(TMP, exist_ok=True)
    fz = os.path.join(TMP, 'zones.json')
    zones = json.load(open(fz)) if os.path.exists(fz) else {}
    for nom, f in SCENES.items():
        if ONLY and nom not in ONLY:
            continue
        sc = scene(); z = f()
        brut = os.path.join(TMP, nom + '.png'); sc.render.filepath = brut
        bpy.ops.render.render(write_still=True)
        im = np.asarray(Image.open(brut).convert('RGB')).astype(np.float32)
        # exposition calée sur la zone imprimée : son blanc devient presque blanc, la couverture garde sa luminosité
        x0, y0 = int(RES * (z['x'] + 1) / 100), int(RES * (z['y'] + 1) / 100)
        x1, y1 = int(RES * (z['x'] + z['w'] - 1) / 100), int(RES * (z['y'] + z['h'] - 1) / 100)
        k = 248 / max(1.0, np.percentile(im[y0:y1, x0:x1].mean(axis=2), 90))
        Image.fromarray(np.clip(im * k, 0, 255).astype(np.uint8)).save(os.path.join(SITE, nom + '.jpg'), quality=84, optimize=True, progressive=True)
        zones[nom] = z
        print(nom, z, 'gain', round(k, 2), flush=True)
    json.dump(zones, open(fz, 'w'), indent=1)


if __name__ == '__main__':
    main()
