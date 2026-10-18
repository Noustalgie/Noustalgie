"""Bande-son de « Avant / après » (22 s, 120 BPM, fa majeur), synthétisée et calée sur out/cues-mag.json.

0–4 s : piano étouffé « haut-parleur de téléphone », tic à chaque défilement, montée.
4 s : le drop (le magazine apparaît) : batterie, basse, piano, nappe pompée, mélodie pincée ; une page par temps.
18 s : accord final sur la carte de fin. Bruitage du livre (couverture, pages) repris du film « Le plus beau oui ».

  python3 tools/audio_mag.py   → out/audio-mag.wav, out/audio-mag-music.wav, out/audio-mag-sfx.wav
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from pedalboard import Pedalboard, Reverb, Chorus, Delay, HighpassFilter, LowpassFilter, Compressor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import audio as A  # noqa: E402  (instruments : piano, pluck, supersaw, batterie, limiteur…)
import audio_oui as O  # noqa: E402  (bruitage du livre : flip_foley, open_foley)

A.DUR = 22.0
A.N = int(A.SR * A.DUR)
SR, N = A.SR, A.N
O.N = N
BEAT, BAR, DROP, END = 0.5, 2.0, 4.0, 18.0
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out')
rng = np.random.default_rng(22)
A.rng = rng

CH = {'F': [57, 60, 65], 'C': [55, 60, 64], 'Dm': [57, 62, 65], 'Bb': [58, 62, 65]}
PAD = {'F': [53, 60, 65, 69], 'C': [52, 55, 60, 67], 'Dm': [50, 57, 62, 65], 'Bb': [46, 58, 62, 65]}
ROOT = {'F': 41, 'C': 36, 'Dm': 38, 'Bb': 34}
BARS = ['F', 'C', 'F', 'C', 'Dm', 'Bb', 'F', 'C', 'Bb', 'F', 'F']      # une mesure = 2 s
# mélodie pincée (croches : position, note, durée en croches), du drop à la fin
MOTIF = {
    2: [(0, 72, 2), (2, 69, 1), (3, 72, 1), (4, 74, 1), (5, 72, 1), (6, 69, 2)],
    3: [(0, 67, 2), (2, 67, 1), (3, 69, 1), (4, 72, 2), (6, 69, 1), (7, 67, 1)],
    4: [(0, 69, 2), (2, 69, 1), (3, 72, 1), (4, 77, 1), (5, 76, 1), (6, 74, 2)],
    5: [(0, 74, 1), (1, 72, 1), (2, 70, 1), (3, 69, 1), (4, 70, 2), (6, 69, 1), (7, 67, 1)],
    6: [(0, 72, 2), (2, 69, 1), (3, 72, 1), (4, 74, 1), (5, 77, 1), (6, 76, 2)],
    7: [(0, 74, 2), (2, 72, 1), (3, 74, 1), (4, 76, 2), (6, 72, 2)],
    8: [(0, 74, 1), (1, 72, 1), (2, 70, 1), (3, 72, 1), (4, 74, 2), (6, 76, 1), (7, 77, 1)],
}


def build():
    drums, bass, keys, pads, lead, sfx, air = (A.zeros() for _ in range(7))
    cues = json.load(open(os.path.join(OUT, 'cues-mag.json')))['cues']
    kicks = []

    # ── 0–4 s : intro « téléphone » : accords de piano étouffés, pulsation discrète ──
    for b in range(2):
        for k, beat in enumerate([0, 1.5, 2, 3.5]):
            t0 = b * BAR + beat * BEAT
            for n in CH[BARS[b]]:
                A.place(keys, A.piano(n, 0.9, 0.42 if k % 2 == 0 else 0.3), t0 + rng.uniform(0, 0.012), pan=rng.uniform(-0.2, 0.2))
        for k in range(8):
            A.place(drums, A.hat(False, 0.18 + 0.06 * (k % 2)), b * BAR + k * BEAT + BEAT / 2)
    A.place(drums, A.kick(0.35, 0.4), 2.0); A.place(drums, A.kick(0.4, 0.4), 3.0)
    A.place(bass, A.sub(ROOT['C'], 1.8, 0.35), 2.0)

    # ── 4–18 s : le magazine : 4 temps, claps, charleston, basse en croches, piano, nappe, mélodie ──
    for b in range(2, 9):
        c, t0 = BARS[b], b * BAR
        for k in range(4):
            tk = t0 + k * BEAT
            A.place(drums, A.kick(0.95 if k == 0 else 0.85), tk); kicks.append((tk, 1.0))
            A.place(drums, A.hat(True, 0.22), tk + BEAT / 2)
            for s in range(4):
                A.place(drums, A.hat(False, 0.1 + 0.06 * (s == 2)), tk + s * BEAT / 4 + rng.uniform(-0.003, 0.003))
            if k in (1, 3):
                A.place(drums, A.clap(0.6), tk); A.place(drums, A.snare(0.3), tk)
        for e in range(8):                                             # basse en croches, octave sur les contretemps
            A.place(bass, A.sub(ROOT[c] + (12 if e % 2 else 0), BEAT / 2 * 0.9, 0.55 if e % 2 == 0 else 0.4), t0 + e * BEAT / 2)
        for k, beat in enumerate([0.5, 1.5, 2.5, 3.0, 3.5]):           # piano en contretemps
            for n in CH[c] + [CH[c][0] + 12]:
                A.place(keys, A.piano(n, 0.32, 0.5), t0 + beat * BEAT + rng.uniform(0, 0.008), pan=rng.uniform(-0.3, 0.3))
        p = A.supersaw(PAD[c], BAR, attack=0.04, release=0.3, gain=0.5)
        A.place(pads, A.sweep_filter(p, np.full(p.shape[1], 2600.0)), t0)
        for pos, note, ln in MOTIF.get(b, []):
            A.place(lead, A.pluck(note, ln * BEAT / 2 * 0.95, 0.85), t0 + pos * BEAT / 2, pan=0.1)
            A.place(lead, A.pluck(note + 12, ln * BEAT / 2 * 0.9, 0.22), t0 + pos * BEAT / 2 + 0.002, pan=-0.25)

    # ── 18–22 s : accord final, puis le calme ──
    for n in [41, 53, 57, 60, 65, 69, 72]:
        A.place(keys, A.piano(n, 3.6, 0.62), END + rng.uniform(0, 0.025), pan=rng.uniform(-0.25, 0.25))
    p = A.supersaw(PAD['F'], 3.4, attack=0.02, release=1.2, gain=0.55)
    A.place(pads, A.sweep_filter(p, np.geomspace(3200, 700, p.shape[1])), END)
    A.place(bass, A.sub(ROOT['F'], 2.6, 0.6), END)
    for k, n in enumerate([72, 77, 81, 84]):
        A.place(lead, A.bell(n + 12, 2.0, 0.34), END + 0.5 + k * BEAT / 2, pan=-0.3 + 0.2 * k)

    # ── bruitage, sur les repères de la composition ──
    for c in cues:
        name, t = c['name'], c['t']
        if name == 'scroll':
            A.place(sfx, A.tick(0.55, 2300), t); A.place(sfx, A.whoosh(0.26, False, 0.22), t - 0.02)
        elif name == 'pop':
            A.place(sfx, A.pop(0.22, 1.2), t)
        elif name == 'cut' and t not in (5.5, END):
            A.place(sfx, A.whoosh(0.2, False, 0.16), t - 0.08)
        elif name == 'flip':
            A.place(sfx, O.flip_foley(c['dur'], 0.8), t)
        elif name == 'open':
            A.place(sfx, O.open_foley(c['dur']), t)
        elif name == 'riser':
            A.place(sfx, A.riser(c.get('dur', 2.0), 0.55), t)
        elif name == 'drop':
            A.place(drums, A.crash(0.7, 2.6), t); A.place(drums, A.boom(0.8, 2.0), t); kicks.append((t, 1.0))
        elif name == 'end':
            A.place(drums, A.crash(0.45, 3.0), t)
    t = np.arange(N) / SR
    crackle = A.hp(rng.standard_normal(N), 4000) * (rng.random(N) > 0.9994) * 0.6     # grésillement du téléphone, avant le drop
    air[0] += crackle * (t < DROP); air[1] += crackle * (t < DROP)
    return dict(drums=drums, bass=bass, keys=keys, pads=pads, lead=lead, sfx=sfx, air=air, kicks=kicks)


def mix():
    st = build()
    pump = A.sidechain(st['kicks'], depth=0.55, tau=0.12)
    t = np.arange(N) / SR
    phone = t < DROP                                                   # avant le drop : son filtré « haut-parleur »
    for k in ('keys', 'drums', 'bass'):
        x = st[k]
        lo = A.lp(A.hp(x, 380), 3200)
        st[k] = np.where(phone, lo * 1.2, x)
    st['bass'] = st['bass'] * pump
    st['pads'] = st['pads'] * (0.35 + 0.65 * pump)
    P = {
        'drums': (st['drums'], Pedalboard([HighpassFilter(30), Compressor(threshold_db=-14, ratio=2.5, attack_ms=8, release_ms=120)]), -17.0),
        'bass': (st['bass'], Pedalboard([LowpassFilter(1200)]), -19.0),
        'keys': (st['keys'], Pedalboard([Reverb(room_size=0.45, damping=0.6, wet_level=0.2, dry_level=0.9)]), -20.0),
        'pads': (st['pads'], Pedalboard([Chorus(rate_hz=0.4, depth=0.25, mix=0.3), Reverb(room_size=0.7, wet_level=0.3, dry_level=0.7)]), -23.0),
        'lead': (st['lead'], Pedalboard([Delay(delay_seconds=0.375, feedback=0.25, mix=0.18), Reverb(room_size=0.55, wet_level=0.22, dry_level=0.85)]), -20.0),
        'air': (st['air'], Pedalboard([]), -40.0),
    }
    music = A.zeros()
    for name, (x, board, target) in P.items():
        y = A.norm(A.fx(x, board), target)
        print(f'  {name:6s} {A.loudness(y):6.1f} LUFS')
        music += y
    sfx = A.fx(st['sfx'], Pedalboard([Reverb(room_size=0.4, damping=0.5, wet_level=0.14, dry_level=0.95, width=1.0)]))
    sfx = A.norm(sfx, -21.0)
    print(f'  sfx    {A.loudness(sfx):6.1f} LUFS')
    glue = Pedalboard([HighpassFilter(28), Compressor(threshold_db=-18, ratio=2.0, attack_ms=20, release_ms=180)])

    def finish(x, target):
        y = A.limiter(A.fx(x, glue), -3.0)
        y = A.limiter(A.norm(y, target), -1.0)
        fo = int(1.2 * SR)                                             # fondu final
        y[:, -fo:] *= np.linspace(1, 0, fo) ** 2
        print(f'  → {A.loudness(y):.1f} LUFS, crête {20 * np.log10(np.max(np.abs(y)) + 1e-9):.1f} dBFS')
        return y

    print('mixage complet')
    sf.write(os.path.join(OUT, 'audio-mag.wav'), finish(music + sfx, -14.0).T.astype(np.float32), SR, subtype='PCM_24')
    print('musique seule')
    sf.write(os.path.join(OUT, 'audio-mag-music.wav'), finish(music, -14.0).T.astype(np.float32), SR, subtype='PCM_24')
    print('bruitage seul (pour poser un son tendance par-dessus)')
    sf.write(os.path.join(OUT, 'audio-mag-sfx.wav'), finish(sfx, -18.0).T.astype(np.float32), SR, subtype='PCM_24')


if __name__ == '__main__':
    mix()
