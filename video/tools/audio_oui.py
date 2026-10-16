"""Bande-son de « Le plus beau oui » (38 s, 80 BPM, ré majeur), synthétisée et calée sur out/cues-oui.json.

Piano, nappes, basse, cloches et bruitage de livre (couverture, pages qui tournent), sans échantillon externe.
La résolution sur l'accord de ré tombe à 36 s, quand « Votre histoire, si. » apparaît.

  python3 tools/audio_oui.py          → out/audio-oui.wav, out/audio-oui-sfx.wav, out/audio-oui-music.wav
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from pedalboard import Pedalboard, Reverb, Chorus, Delay, HighpassFilter, LowpassFilter, Compressor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import audio as A  # noqa: E402  (instruments communs : piano, bell, supersaw, filtre, limiteur…)

A.DUR = 38.0
A.N = int(A.SR * A.DUR)
SR, N = A.SR, A.N
BPM = 80
BEAT = 60 / BPM
BAR = 4 * BEAT
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out')
rng = np.random.default_rng(38)
A.rng = rng

CHORDS = {  # accords : basse, triade (voicing moyen), couleur
    'D': dict(root=38, tri=[62, 66, 69], add=76),
    'Bm': dict(root=35, tri=[59, 62, 66], add=69),
    'G': dict(root=43, tri=[55, 59, 62], add=66),
    'A': dict(root=45, tri=[57, 61, 64], add=71),
}
PROG = ['D', 'Bm', 'G', 'A', 'D', 'Bm', 'G', 'A', 'D', 'Bm', 'G', 'A', 'D']
MELODY = {  # barre : (temps, note, durée en temps)
    4: [(0, 74, 1), (1, 78, 1), (2, 81, 1.5), (3.5, 79, 0.5)],
    5: [(0, 78, 1), (1, 76, 1), (2, 74, 2)],
    6: [(0, 71, 1), (1, 74, 1), (2, 78, 1.5), (3.5, 76, 0.5)],
    7: [(0, 74, 1), (1, 73, 1), (2, 69, 2)],
    8: [(0, 78, 1), (1, 81, 1), (2, 86, 2)],
    9: [(0, 85, 1.5), (1.5, 83, 0.5), (2, 81, 2)],
    10: [(0, 83, 1), (1, 81, 1), (2, 79, 1), (3, 78, 1)],
    11: [(0, 76, 2), (2, 73, 1), (3, 76, 1)],
    12: [(0, 74, 6)],
}
# intensité du jeu au piano par barre (0 = silence)
DYN = [0.0, 0.5, 0.6, 0.64, 0.7, 0.72, 0.76, 0.82, 0.92, 0.98, 1.0, 0.7, 0.9]


def build():
    keys, melo, pads, bass, bells, sfx, air = (A.zeros() for _ in range(7))
    cues = json.load(open(os.path.join(OUT, 'cues-oui.json')))['cues']

    # ── barre 0 : ouverture, quelques notes seules et des éclats d'alliances ──
    A.place(keys, A.piano(69, 3.0, 0.38), 0.45, pan=-0.1)
    A.place(keys, A.piano(74, 3.0, 0.36), 1.95, pan=0.1)
    A.place(keys, A.piano(66, 3.0, 0.30), 2.55, pan=-0.05)
    p = A.supersaw([50, 57, 62, 66], 3.4, attack=1.2, release=1.0, gain=0.5)
    A.place(pads, A.sweep_filter(p, np.linspace(380, 1100, p.shape[1])), 0.0)

    # ── barres 1 à 12 ──
    for b in range(1, 13):
        t0 = b * BAR
        c = CHORDS[PROG[b]]
        d = DYN[b]
        mid = c['tri']
        # piano : arpège de croches (quarts de note en barre 1)
        pat = [mid[0], mid[1], mid[2], mid[0] + 12, mid[2], mid[1], mid[2] + 12 if b >= 8 else mid[2], mid[1]]
        if b == 1:
            hits = [(0, mid[0]), (2, mid[1]), (4, mid[2]), (6, mid[1])]
        elif b == 11:
            hits = [(0, mid[0] + 12), (2, mid[1] + 12), (4, mid[2] + 12), (6, mid[1] + 12)]
        elif b == 12:
            hits = [(0, mid[0]), (0, mid[1]), (0, mid[2]), (0, mid[0] + 12)]
        else:
            hits = [(e, n) for e, n in enumerate(pat)]
        for e, n in hits:
            tt = t0 + e * BEAT / 2
            if tt >= 38:
                continue
            acc = 1.0 if e % 4 == 0 else 0.82
            A.place(keys, A.piano(n, 1.1 if b < 12 else 3.5, 0.5 * d * acc), tt + rng.uniform(-0.006, 0.006), pan=-0.18 + 0.36 * ((e % 4) / 3))
        # basse : fondamentale tenue (à partir de la barre 2), octave au climax
        if b >= 2:
            A.place(bass, A.sub(c['root'], BAR * 0.97 if b < 12 else 2.8, 0.55 * min(1, d + 0.1)), t0)
            if b in (8, 9, 10, 12):
                A.place(bass, A.sub(c['root'] - 12, BAR * 0.9 if b < 12 else 2.6, 0.42), t0)
        # nappe
        if b >= 1:
            ch = [c['root'] + 24, c['root'] + 31] + [n - 12 for n in mid] + [mid[0] + 12]
            lvl = [0, 0.42, 0.48, 0.52, 0.62, 0.66, 0.7, 0.78, 0.92, 1.0, 1.0, 0.8, 1.0][b]
            dur = BAR + (0.6 if b < 12 else 2.4)
            p = A.supersaw(ch, dur, attack=0.7, release=1.1, gain=0.62 * lvl)
            cut = 900 + 1300 * lvl + (900 if b in (8, 9, 10) else 0)
            A.place(pads, A.sweep_filter(p, np.full(p.shape[1], cut)), t0)
        # mélodie
        for beat, note, ln in MELODY.get(b, []):
            tt = t0 + beat * BEAT
            if b >= 8:
                A.place(melo, A.piano(note, ln * BEAT, 0.74 * (1 if b < 12 else 0.9)), tt, pan=0.12)
                A.place(bells, A.bell(note + 12, max(1.2, ln * BEAT), 0.42), tt, pan=-0.2)
            else:
                A.place(melo, A.piano(note, ln * BEAT, 0.62), tt, pan=0.1)
        # éclats de cloches au-dessus (poussière dorée)
        if 2 <= b <= 11:
            for k in range(3 if b < 8 else 5):
                tt = t0 + rng.uniform(0.2, BAR - 0.2)
                A.place(bells, A.bell(int(rng.choice([88, 91, 93, 95, 98])), 1.4, 0.22 + 0.12 * d), tt, pan=rng.uniform(-0.7, 0.7))

    # accord final : ré majeur, résolution à 36 s
    cf = CHORDS['D']
    for n in (50, 57, 62, 66, 69, 74, 78):
        A.place(keys, A.piano(n, 3.8, 0.62), 36.0 + rng.uniform(0, 0.03), pan=rng.uniform(-0.25, 0.25))
    A.place(bells, A.bell(86, 2.0, 0.5), 36.0)
    A.place(bells, A.bell(90, 2.0, 0.4), 36.06, pan=0.4)

    # ── bruitage ──
    for c in cues:
        t, name = c['t'], c['name']
        if name == 'flip':
            A.place(sfx, flip_foley(c['dur'], 0.9 if c['dur'] > 0.9 else 0.75), t)
        elif name == 'open':
            A.place(sfx, open_foley(c['dur']), t)
        elif name == 'glint':
            A.place(bells, A.bell(100, 1.4, 0.5), t, pan=-0.3)
            A.place(bells, A.bell(96, 1.4, 0.4), t + 0.07, pan=0.3)
    # montée : souffle inversé vers 26 s, plus doux avant la résolution
    A.place(sfx, riser(4.0, 0.5), 22.0)
    A.place(sfx, riser(2.6, 0.45), 33.4)
    # souffle et poussière : lit sonore très discret
    t = np.arange(N) / SR
    bed = A.bp(rng.standard_normal(N), 2500, 9000) * (0.0025 + 0.0016 * np.sin(2 * np.pi * t / 7.5) ** 2)
    air += np.stack([bed, np.roll(bed, 211)])
    room = A.lp(rng.standard_normal(N), 380) * 0.0045
    air += np.stack([room, np.roll(room, 97)])
    return dict(keys=keys, melo=melo, pads=pads, bass=bass, bells=bells, sfx=sfx, air=air)


def flip_foley(dur, vel):
    """Une page qui tourne : levée (froissement), souffle qui suit la vitesse de la page, retombée feutrée."""
    n = int((dur + 0.5) * SR)
    t = np.arange(n) / SR
    ph = np.clip(t / dur, 0, 1)
    speed = np.sin(np.pi * ph) ** 1.6 * (ph <= 1)
    nz = rng.standard_normal(n)
    swish = A.bp(nz, 700, 5200) * speed * 0.55 + A.bp(rng.standard_normal(n), 2200, 7000) * speed * 0.2 * (0.6 + 0.4 * np.sin(2 * np.pi * 34 * t))
    lift = A.lp(rng.standard_normal(n), 2400) * np.exp(-t * 38) * 0.35
    land_t = dur * 0.93
    k = np.clip((t - land_t) / 0.001, 0, 1)
    thump = np.sin(2 * np.pi * (120 - 50 * np.clip((t - land_t) * 7, 0, 1)) * (t - land_t)) * np.exp(-np.clip(t - land_t, 0, None) * 26) * k * 0.55
    click = A.lp(rng.standard_normal(n), 1800) * np.exp(-np.clip(t - land_t, 0, None) * 60) * k * 0.25
    mono = (swish + lift + thump + click) * vel * 0.9
    pan = np.clip(0.55 - 1.1 * ph, -0.55, 0.55)
    return np.stack([mono * (1 - np.clip(pan, 0, 1) * 0.7), mono * (1 + np.clip(pan, -1, 0) * 0.7)])


def open_foley(dur):
    """Couverture rigide qui s'ouvre : craquement grave de la reliure, souffle, retombée sur la table."""
    n = int((dur + 0.8) * SR)
    t = np.arange(n) / SR
    ph = np.clip(t / dur, 0, 1)
    env = np.sin(np.pi * ph) ** 1.3
    f = 62 + 40 * ph + 14 * np.sin(2 * np.pi * 9 * t)
    creak = A.saw(f, n) * 0.5 + A.saw(f * 2.01, n) * 0.16
    creak = A.lp(creak, 520) * env * 0.5 * (0.5 + 0.5 * np.sin(2 * np.pi * 15 * t + 4 * np.sin(2 * np.pi * 2.3 * t)) ** 2)
    air_ = A.bp(rng.standard_normal(n), 500, 3800) * env * 0.35
    land = dur * 0.97
    k = np.clip((t - land) / 0.001, 0, 1)
    thud = np.sin(2 * np.pi * (85 - 40 * np.clip((t - land) * 5, 0, 1)) * (t - land)) * np.exp(-np.clip(t - land, 0, None) * 12) * k * 0.9
    knock = A.bp(rng.standard_normal(n), 300, 1600) * np.exp(-np.clip(t - land, 0, None) * 45) * k * 0.4
    mono = creak + air_ + thud + knock
    return np.stack([mono, np.roll(mono, 120)]) * 0.85


def riser(dur, gain):
    nz = rng.standard_normal(int(dur * SR))
    t = np.arange(len(nz)) / SR
    y = A.sweep_filter(nz, np.geomspace(500, 9000, len(nz)), reso=0.3) * (t / dur) ** 2.2
    y = y / (np.max(np.abs(y)) + 1e-9) * gain
    return np.stack([y, np.roll(y, 260)])


def mix():
    st = build()
    P = {
        'keys': (st['keys'], Pedalboard([HighpassFilter(60), Reverb(room_size=0.78, damping=0.42, wet_level=0.36, dry_level=0.78, width=1.0)]), -20.5),
        'melo': (st['melo'], Pedalboard([HighpassFilter(120), Reverb(room_size=0.82, damping=0.4, wet_level=0.34, dry_level=0.8, width=1.0), Delay(delay_seconds=0.75, feedback=0.22, mix=0.16)]), -21.5),
        'pads': (st['pads'], Pedalboard([HighpassFilter(120), Chorus(rate_hz=0.5, depth=0.25, mix=0.3), Reverb(room_size=0.88, damping=0.5, wet_level=0.4, dry_level=0.7, width=1.0)]), -23.5),
        'bass': (st['bass'], Pedalboard([LowpassFilter(420)]), -26.0),
        'bells': (st['bells'], Pedalboard([HighpassFilter(500), Reverb(room_size=0.9, damping=0.35, wet_level=0.45, dry_level=0.6, width=1.0)]), -29.0),
        'air': (st['air'], Pedalboard([HighpassFilter(80)]), -43.0),
    }
    music = A.zeros()
    for name, (x, board, target) in P.items():
        y = A.norm(A.fx(x, board), target)
        print(f'  {name:6s} {A.loudness(y):6.1f} LUFS')
        music += y
    sfx = A.fx(st['sfx'], Pedalboard([Reverb(room_size=0.5, damping=0.5, wet_level=0.16, dry_level=0.95, width=1.0)]))
    sfx = A.norm(sfx, -24.0)
    print(f'  sfx    {A.loudness(sfx):6.1f} LUFS')
    glue = Pedalboard([HighpassFilter(28), Compressor(threshold_db=-20, ratio=1.8, attack_ms=25, release_ms=220)])

    def finish(x, target):
        y = A.limiter(A.fx(x, glue), -3.0)
        y = A.limiter(A.norm(y, target), -1.0)
        fi = int(0.5 * SR)                      # entrée douce
        y[:, :fi] *= np.linspace(0, 1, fi) ** 1.5
        fo = int(0.8 * SR)                      # fondu final
        y[:, -fo:] *= np.linspace(1, 0, fo) ** 2
        print(f'  → {A.loudness(y):.1f} LUFS, crête {20 * np.log10(np.max(np.abs(y)) + 1e-9):.1f} dBFS')
        return y

    print('mixage complet')
    full = finish(music + sfx, -14.0)
    sf.write(os.path.join(OUT, 'audio-oui.wav'), full.T.astype(np.float32), SR, subtype='PCM_24')
    print('bruitage seul')
    sf.write(os.path.join(OUT, 'audio-oui-sfx.wav'), finish(sfx, -20.0).T.astype(np.float32), SR, subtype='PCM_24')
    print('musique seule')
    sf.write(os.path.join(OUT, 'audio-oui-music.wav'), finish(music, -14.0).T.astype(np.float32), SR, subtype='PCM_24')


if __name__ == '__main__':
    mix()
