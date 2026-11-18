# Roses et nœud de dentelle argentée de la double page « lettre » de l'album (d'après une lettre d'amour vue sur TikTok).
# Modélisés et rendus en 3D (Blender Cycles), fond transparent avec leur ombre portée, puis enregistrés en WebP
# dans public/img/album/ : la page de l'album les pose derrière et devant la photo.
#   ~/blender-venv/bin/python tools/lettre-objets.py [--draft] [--only rose-a,noeud]
import bpy, bmesh, math, os, random, sys
from mathutils import Vector, Matrix

ARGS = sys.argv[1:]
DRAFT = '--draft' in ARGS
ONLY = ARGS[ARGS.index('--only') + 1].split(',') if '--only' in ARGS else None
DEPOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SORTIE = os.path.join(DEPOT, 'public', 'img', 'album')
TMP = os.path.join(DEPOT, 'video', 'out', 'lettre-objets')
os.makedirs(SORTIE, exist_ok=True); os.makedirs(TMP, exist_ok=True)


def vider():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = 16 if DRAFT else 96
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    sc.render.film_transparent = True
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = 'AgX - Punchy'
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_mode = 'RGBA'
    w = bpy.data.worlds.new('monde'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs[0].default_value = (0.92, 0.92, 0.93, 1)
    w.node_tree.nodes['Background'].inputs[1].default_value = 0.25
    return sc


def lumiere(nom, loc, energie, taille, cible=(0, 0, 0)):
    l = bpy.data.lights.new(nom, 'AREA'); l.energy = energie; l.size = taille
    o = bpy.data.objects.new(nom, l); bpy.context.collection.objects.link(o); o.location = loc
    d = Vector(cible) - Vector(loc); o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return o


def camera(loc, cible, ortho=None, lens=85):
    c = bpy.data.cameras.new('cam'); c.lens = lens
    if ortho: c.type = 'ORTHO'; c.ortho_scale = ortho
    o = bpy.data.objects.new('cam', c); bpy.context.collection.objects.link(o); o.location = loc
    o.rotation_euler = (Vector(cible) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.camera = o
    return o


def sol():
    # plan qui ne reçoit que l'ombre (le papier de la page est dessiné par le site)
    bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, 0))
    p = bpy.context.object; p.is_shadow_catcher = True
    return p


# ── Rose : couches de pétales en spirale, cœur fermé, pétales extérieurs ouverts et retournés au bord ──
def mat_rose(nom, bord, coeur):
    m = bpy.data.materials.new(nom); m.use_nodes = True
    nt = m.node_tree; N = nt.nodes; L = nt.links
    b = N['Principled BSDF']
    b.inputs['Roughness'].default_value = 0.55
    b.inputs['Subsurface Weight'].default_value = 0.35
    b.inputs['Subsurface Radius'].default_value = (0.9, 0.35, 0.35)
    b.inputs['Subsurface Scale'].default_value = 0.004
    b.inputs['Sheen Weight'].default_value = 0.35
    attr = N.new('ShaderNodeAttribute'); attr.attribute_name = 'h'      # 0 à la base du pétale, 1 au bord
    ramp = N.new('ShaderNodeValToRGB'); r = ramp.color_ramp
    r.elements[0].position = 0.0; r.elements[0].color = coeur
    r.elements[1].position = 1.0; r.elements[1].color = bord
    e = r.elements.new(0.72); e.color = (coeur[0] * .98, coeur[1] * .94, coeur[2] * .93, 1)
    e2 = r.elements.new(0.9); e2.color = tuple(coeur[i] * .5 + bord[i] * .5 for i in range(3)) + (1,)
    noise = N.new('ShaderNodeTexNoise'); noise.inputs['Scale'].default_value = 60; noise.inputs['Detail'].default_value = 4
    mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 0.08
    L.new(attr.outputs['Fac'], ramp.inputs['Fac'])
    L.new(ramp.outputs['Color'], mix.inputs[6]); L.new(noise.outputs['Color'], mix.inputs[7])
    L.new(mix.outputs[2], b.inputs['Base Color'])
    return m


def petale(bm, hl, theta, r0, larg, haut, ouvre, retour, creux, rng, segs=(12, 10)):
    # pétale large et arrondi, enroulé autour du cœur (la largeur suit un arc de cercle), bord supérieur roulé vers l'extérieur
    nu, nv = segs; vs = []
    ondes = [rng.uniform(-1, 1) for _ in range(3)]
    for j in range(nv + 1):
        v = j / nv; row = []
        w = larg * (0.38 + 0.62 * math.sin(math.pi / 2 * min(1.0, v * 1.3))) * math.sqrt(max(0.02, 1 - (max(0.0, v - 0.72) / 0.28) ** 2))
        for i in range(nu + 1):
            u = i / nu * 2 - 1
            x = u * w
            roule = retour * haut * 0.45 * max(0.0, v - 0.62) ** 2 / 0.144 * (0.9 + 0.2 * u * u)
            rad = r0 + v * haut * math.sin(ouvre) + roule - creux * 0.10 * (1 - u * u) * w
            z = v * haut * math.cos(ouvre) - retour * haut * 0.22 * max(0.0, v - 0.8) ** 2 / 0.04
            z += 0.005 * haut * sum(a * math.sin((k + 2) * math.pi * u + k) for k, a in enumerate(ondes)) * v ** 2
            phi = theta + x / max(rad, 0.004)
            row.append(bm.verts.new(Vector((rad * math.cos(phi), rad * math.sin(phi), z))))
        vs.append(row)
    lay = bm.verts.layers.float.get('h')
    for j, row in enumerate(vs):
        for vt in row: vt[lay] = j / nv
    for j in range(nv):
        for i in range(nu):
            bm.faces.new((vs[j][i], vs[j][i + 1], vs[j + 1][i + 1], vs[j + 1][i]))


def rose(nom, seed, bord, coeur, ouverture=1.0):
    rng = random.Random(seed)
    me = bpy.data.meshes.new(nom); bm = bmesh.new(); bm.verts.layers.float.new('h')
    gold = math.radians(137.5); k = 0
    couches = [  # (nombre, r0, largeur, hauteur, ouverture, retour, creux)
        (3, 0.002, 0.012, 0.026, 0.04, 0.0, 1.2), (4, 0.004, 0.018, 0.031, 0.10, 0.05, 1.1),
        (5, 0.007, 0.026, 0.037, 0.22, 0.25, 1.0), (5, 0.010, 0.034, 0.043, 0.40, 0.6, 0.9),
        (5, 0.013, 0.042, 0.048, 0.62, 1.0, 0.8), (5, 0.016, 0.048, 0.051, 0.88, 1.35, 0.7),
        (4, 0.019, 0.052, 0.050, 1.02, 1.5, 0.6)]
    for n, r0, la, ha, ou, re, cr in couches:
        for _ in range(n):
            th = k * gold + rng.uniform(-.15, .15); k += 1
            petale(bm, None, th, r0, la * rng.uniform(.9, 1.1), ha * rng.uniform(.92, 1.08), ou * ouverture * rng.uniform(.9, 1.1), re * rng.uniform(.8, 1.2), cr, rng)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nom, me); bpy.context.collection.objects.link(o)
    for p in me.polygons: p.use_smooth = True
    s = o.modifiers.new('ep', 'SOLIDIFY'); s.thickness = 0.0007
    d = o.modifiers.new('lisse', 'SUBSURF'); d.levels = 1; d.render_levels = 2
    o.data.materials.append(mat_rose(nom + '-m', bord, coeur))
    return o


# ── Nœud de dentelle argentée : rubans construits point par point (orientation de la largeur maîtrisée),
#    dentelle ajourée dessinée en texture (bords festonnés, filet, fleurettes), paillettes procédurales ──
def texture_dentelle(f, T=512):
    from PIL import Image, ImageDraw
    im = Image.new('RGBA', (T, T), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = (255, 255, 255, 255)
    d.rectangle((0, 40, T, T - 40), fill=(255, 255, 255, 60))   # tulle fin sous la dentelle
    # festons sur les deux bords (le bord du ruban est en haut et en bas de la tuile)
    for k in range(8):
        cx = k * T / 8 + T / 16
        for y0, sgn in ((0, 1), (T, -1)):
            d.ellipse((cx - T / 16, y0 - T / 16, cx + T / 16, y0 + T / 16), outline=c, width=9)
            d.ellipse((cx - 6, y0 + sgn * 34 - 6, cx + 6, y0 + sgn * 34 + 6), fill=c)
    d.line((0, 70, T, 70), fill=c, width=11); d.line((0, T - 70, T, T - 70), fill=c, width=11)
    # filet en losanges
    for k in range(-8, 9):
        x = k * T / 8
        d.line((x, 70, x + (T - 140), T - 70), fill=c, width=6); d.line((x, T - 70, x + (T - 140), 70), fill=c, width=6)
    # fleurettes
    for k in range(4):
        cx, cy = k * T / 4 + T / 8, T / 2
        for a in range(6):
            ang = a * math.pi / 3; px, py = cx + 32 * math.cos(ang), cy + 32 * math.sin(ang)
            d.ellipse((px - 20, py - 20, px + 20, py + 20), fill=c)
        d.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=(225, 225, 230, 255))
    im.save(f)


def mat_dentelle():
    f = os.path.join(TMP, 'dentelle.png'); texture_dentelle(f)
    m = bpy.data.materials.new('dentelle'); m.use_nodes = True
    nt = m.node_tree; N = nt.nodes; L = nt.links
    b = N['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.94, 0.94, 0.96, 1)
    b.inputs['Roughness'].default_value = 0.4
    b.inputs['Metallic'].default_value = 0.35
    tex = N.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(f); tex.interpolation = 'Cubic'
    uv = N.new('ShaderNodeUVMap'); uv.uv_map = 'UVMap'
    L.new(uv.outputs['UV'], tex.inputs['Vector']); L.new(tex.outputs['Alpha'], b.inputs['Alpha'])
    tc = N.new('ShaderNodeTexCoord')
    nz = N.new('ShaderNodeTexVoronoi'); nz.inputs['Scale'].default_value = 700
    sp = N.new('ShaderNodeMath'); sp.operation = 'GREATER_THAN'; sp.inputs[1].default_value = 0.94
    em = N.new('ShaderNodeMath'); em.operation = 'MULTIPLY'; em.inputs[1].default_value = 2.5
    L.new(tc.outputs['Object'], nz.inputs['Vector']); L.new(nz.outputs['Color'], sp.inputs[0]); L.new(sp.outputs['Value'], em.inputs[0])
    L.new(em.outputs['Value'], b.inputs['Emission Strength']); b.inputs['Emission Color'].default_value = (1, 1, 1, 1)
    return m


def catmull(pts, n=16):
    P = [Vector(p) for p in pts]; out = []
    for i in range(len(P) - 1):
        p0, p1, p2, p3 = P[max(i - 1, 0)], P[i], P[i + 1], P[min(i + 2, len(P) - 1)]
        for k in range(n):
            t = k / n
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    out.append(P[-1]); return out


def ruban(nom, pts, larg, largeurs):
    # pts : points du milieu du ruban ; largeurs : direction de la largeur à chaque point (interpolée)
    C = catmull(pts); D = catmull(largeurs)
    me = bpy.data.meshes.new(nom); bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
    rows = []; long = 0.0; us = []
    for i, c in enumerate(C):
        t = (C[min(i + 1, len(C) - 1)] - C[max(i - 1, 0)]).normalized()
        d = D[i] - t * D[i].dot(t); d.normalize()
        if i: long += (c - C[i - 1]).length
        us.append(long / larg)
        rows.append((bm.verts.new(c - d * larg / 2), bm.verts.new(c + d * larg / 2)))
    for i in range(len(rows) - 1):
        f = bm.faces.new((rows[i][0], rows[i + 1][0], rows[i + 1][1], rows[i][1]))
        for lp, (u, v) in zip(f.loops, ((us[i], 0), (us[i + 1], 0), (us[i + 1], 1), (us[i], 1))): lp[uvl].uv = (u, v)
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new(nom, me); bpy.context.collection.objects.link(o)
    return o


def noeud():
    m = mat_dentelle(); W = 0.05; objs = []
    up = lambda a: (0, math.cos(a), math.sin(a))
    for sg in (-1, 1):
        # boucle : part du nœud par l'avant, monte vers l'extérieur, tourne et revient par l'arrière, plus bas
        P = [(0, .002, .012), (sg * .035, .02, .02), (sg * .08, .04, .018), (sg * .115, .035, .004), (sg * .12, .012, -.01), (sg * .095, -.006, -.016), (sg * .05, -.008, -.014), (0, -.004, -.01)]
        Dw = [up(.5), up(.55), up(.65), up(1.2), up(1.9), up(2.4), up(2.5), up(2.5)]
        objs.append(ruban('boucle%d' % sg, P, W, [(sg * 0.15 + d[0], d[1], d[2]) for d in Dw]))
        # pan : tombe en ondulant, face au regard
        P = [(sg * .004, -.01, .014), (sg * .02, -.06, .016), (sg * .038, -.11, .012), (sg * .05, -.16, .014), (sg * .07, -.215, .01)]
        Dw = [(1, .25 * sg, .1), (1, .1 * sg, .35), (1, -.1 * sg, -.2), (1, .1 * sg, .3), (1, .3 * sg, 0)]
        objs.append(ruban('pan%d' % sg, P, W * .9, Dw))
    # nœud : une bande qui fait le tour du centre
    K = [(0, .018 * math.cos(a), .018 * math.sin(a) + .008) for a in [math.pi * .5 + k * math.pi / 6 for k in range(13)]]
    objs.append(ruban('coeur', K, .034, [(1, 0, 0)] * len(K)))
    for o in objs:
        o.data.materials.append(m)
        s = o.modifiers.new('ep', 'SOLIDIFY'); s.thickness = 0.0005
    return objs


def rendre(nom, res):
    sc = bpy.context.scene
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = 50 if DRAFT else 100
    f = os.path.join(TMP, nom + '.png'); sc.render.filepath = f
    bpy.ops.render.render(write_still=True)
    return f


def webp(png, nom, larg, ombre=(10, 18, 16, .30)):
    from PIL import Image, ImageFilter, ImageChops
    im = Image.open(png).convert('RGBA')
    bb = im.getchannel('A').point(lambda a: 255 if a > 6 else 0).getbbox()
    if bb: im = im.crop(bb)
    dx, dy, flou, op = ombre; pad = flou * 3 + max(abs(dx), abs(dy))
    W, H = im.width + 2 * pad, im.height + 2 * pad
    a = Image.new('L', (W, H), 0); a.paste(im.getchannel('A'), (pad + dx, pad + dy))
    a = a.filter(ImageFilter.GaussianBlur(flou)).point(lambda v: int(v * op))
    fond = Image.new('RGBA', (W, H), (40, 30, 30, 0)); fond.putalpha(a)
    fond.alpha_composite(im, (pad, pad)); im = fond
    if im.width > larg: im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    out = os.path.join(SORTIE, nom + '.webp'); im.save(out, 'WEBP', quality=86, method=6)
    print(nom, im.size, os.path.getsize(out) // 1024, 'Ko ->', out)


CREME = (0.93, 0.88, 0.84, 1)
ROSES = {  # nom : (graine, couleur du bord, ouverture, angle de vue)
    'rose-a': (3, (0.62, 0.10, 0.20, 1), 1.0, 38),
    'rose-b': (7, (0.70, 0.16, 0.26, 1), 1.12, 55),
    'rose-c': (11, (0.58, 0.08, 0.18, 1), 0.92, 28),
}
for nom, (seed, bord, ouv, vue) in ROSES.items():
    if ONLY and nom not in ONLY: continue
    vider()
    o = rose(nom, seed, bord, CREME, ouv); o.location = (0, 0, 0.0)
    a = math.radians(vue)
    camera((0, -0.42 * math.cos(a), 0.42 * math.sin(a) + 0.02), (0, 0, 0.022), lens=70)
    lumiere('cle', (-.35, -.3, .55), 9, .5); lumiere('rempl', (.4, -.2, .25), 2.5, .8); lumiere('dos', (0, .45, .3), 4, .4)
    webp(rendre(nom, (900, 900)), nom, 720)

if not ONLY or 'noeud' in ONLY:
    vider()
    for o in noeud(): pass
    c = camera((0, -0.07, 0.6), (0, -0.07, 0), ortho=0.3); c.rotation_euler = (0, 0, 0)
    lumiere('cle', (-.3, -.25, .5), 7, .4, (0, -.07, 0)); lumiere('rempl', (.35, .1, .4), 2.5, .8, (0, -.07, 0))
    lumiere('eclat', (.15, -.35, .25), 3, .05, (0, -.07, 0))
    webp(rendre('noeud', (1000, 1000)), 'noeud-dentelle', 800)
