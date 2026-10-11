"""Bande-son originale de la vidéo Noustalgie (48 s, 120 BPM, la mineur).

Tout est synthétisé ici (aucun échantillon externe) : piano, nappes, basse, batterie,
mélodie du drop, et les effets sonores placés sur les repères exportés par la
composition (out/cues.json). Sorties : out/audio.wav (mixage complet) et
out/sfx_only.wav (effets seuls, pour poser un son tendance TikTok par-dessus).

Usage : python3 tools/audio.py
"""
import json
import os

import numpy as np
import soundfile as sf
from scipy import signal
from pedalboard import Pedalboard, Reverb, Compressor, Limiter, LadderFilter, Chorus, Delay, HighpassFilter, LowpassFilter

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(ROOT, 'out')
SR = 48000
DUR = 48.0
N = int(SR * DUR)
BEAT = 0.5
BAR = 2.0
rng = np.random.default_rng(2026)


# ───────────────────────── utilitaires ─────────────────────────
def zeros():
    return np.zeros((2, N), dtype=np.float64)


def tt(dur):
    return np.arange(int(SR * dur)) / SR


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def place(bus, sig, t, gain=1.0, pan=0.0):
    """Ajoute un signal mono ou stéréo au bus à l'instant t (s)."""
    i = int(round(t * SR))
    if i >= N:
        return
    if sig.ndim == 1:
        sig = np.stack([sig * min(1.0, 1 - pan), sig * min(1.0, 1 + pan)])
    j0 = max(0, -i)
    n = min(sig.shape[1] - j0, N - max(i, 0))
    if n <= 0:
        return
    bus[:, max(i, 0):max(i, 0) + n] += gain * sig[:, j0:j0 + n]


def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo, hi], btype='band', fs=SR, output='sos')
    return signal.sosfilt(sos, x)


def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype='high', fs=SR, output='sos'), x)


def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype='low', fs=SR, output='sos'), x)


def noise(n):
    return rng.standard_normal(n)


def saw(f, n, phase=None):
    """Dent de scie à bande limitée (PolyBLEP). f : Hz (scalaire ou tableau)."""
    dt = np.full(n, f / SR) if np.isscalar(f) else np.asarray(f) / SR
    ph = ((rng.random() if phase is None else phase) + np.cumsum(dt)) % 1.0
    y = 2 * ph - 1
    m = ph < dt
    x = ph[m] / dt[m]
    y[m] -= 2 * x - x * x - 1
    m = ph > 1 - dt
    x = (ph[m] - 1) / dt[m]
    y[m] -= x * x + 2 * x + 1
    return y


def sine(f, n, phase=0.0):
    if np.isscalar(f):
        return np.sin(2 * np.pi * f * np.arange(n) / SR + phase)
    return np.sin(2 * np.pi * np.cumsum(f) / SR + phase)


def adsr(n, a=0.005, d=0.1, s=0.7, r=0.1, hold=None):
    """Enveloppe ; hold = durée avant relâchement (s)."""
    hold = n / SR - r if hold is None else hold
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-6), s + (1 - s) * np.exp(-(t - a) / max(d, 1e-6)))
    rel = np.clip(1 - (t - hold) / max(r, 1e-6), 0, 1)
    return e * np.where(t > hold, rel, 1)


def sweep_filter(x, cutoff, reso=0.15, drive=1.0, block=128):
    """Filtre en échelle (type Moog) dont la fréquence de coupure varie dans le temps."""
    f = LadderFilter(mode=LadderFilter.Mode.LPF24, cutoff_hz=float(cutoff[0]), resonance=reso, drive=drive)
    y = np.zeros_like(x, dtype=np.float32)
    x32 = x.astype(np.float32)
    stereo = x32.ndim == 2
    for i in range(0, x32.shape[-1], block):
        f.cutoff_hz = float(np.clip(cutoff[min(i, len(cutoff) - 1)], 30, 20000))
        seg = x32[:, i:i + block] if stereo else x32[None, i:i + block]
        out = f.process(seg, SR, reset=False)
        if stereo:
            y[:, i:i + block] = out
        else:
            y[i:i + block] = out[0]
    return y.astype(np.float64)


def fx(x, board):
    x32 = (x if x.ndim == 2 else np.stack([x, x])).astype(np.float32)
    return board(x32, SR).astype(np.float64)


# ───────────────────────── instruments ─────────────────────────
def kick(gain=1.0, punch=1.0):
    t = tt(0.5)
    f = 46 + 125 * np.exp(-t * 36) + 60 * np.exp(-t * 220)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6.0) * (1 - np.exp(-t * 1500))
    click = hp(noise(len(t)), 1800) * np.exp(-t * 350) * 0.35 * punch
    return np.tanh(1.8 * (body + click)) * 0.95 * gain


def clap(gain=1.0):
    t = tt(0.45)
    env = np.zeros_like(t)
    for k, d in enumerate([0, 0.008, 0.017, 0.026]):
        env += np.where(t >= d, np.exp(-(t - d) * 320), 0) * (0.8 if k < 3 else 1.0)
    env += np.exp(-t * 13) * 0.55 * (t > 0.026)
    y = bp(noise(len(t)), 900, 4200) * env
    return y / (np.max(np.abs(y)) + 1e-9) * 0.8 * gain


def snare(gain=1.0):
    t = tt(0.3)
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 28) * 0.5
    nz = bp(noise(len(t)), 1200, 8000) * np.exp(-t * 20)
    y = tone + nz
    return y / (np.max(np.abs(y)) + 1e-9) * 0.75 * gain


def hat(open_=False, gain=1.0):
    t = tt(0.45 if open_ else 0.07)
    y = hp(noise(len(t)), 7500 if not open_ else 6000, 4) * np.exp(-t * (8 if open_ else 65))
    return y / (np.max(np.abs(y)) + 1e-9) * 0.5 * gain


def crash(gain=1.0, length=2.8):
    t = tt(length)
    y = hp(noise(len(t)), 3500, 2) * np.exp(-t * 1.9)
    ring = sum(np.sin(2 * np.pi * f * t + rng.random() * 6) for f in [3120, 4470, 5230, 6650, 7810]) * 0.05 * np.exp(-t * 2.5)
    y = y + ring
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.5 * gain
    return np.stack([y, np.roll(y, 240)])


def boom(gain=1.0, length=2.2):
    t = tt(length)
    f = 32 + 55 * np.exp(-t * 7)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) * (1 - np.exp(-t * 400))
    y += lp(noise(len(t)), 300) * np.exp(-t * 9) * 0.4
    return np.tanh(1.5 * y) * 0.95 * gain


def sub(midi, dur, gain=1.0):
    n = int(SR * dur)
    f = mtof(midi)
    y = sine(f, n) + 0.3 * sine(2 * f, n) + 0.08 * saw(f, n)
    y = np.tanh(1.3 * y) * adsr(n, 0.004, 0.25, 0.75, 0.04)
    return lp(y, 900) * gain


def piano(midi, dur, vel=0.8):
    n = int(SR * (dur + 1.6))
    t = np.arange(n) / SR
    f0 = mtof(midi)
    y = np.zeros(n)
    B = 0.00035
    bright = 0.6 + 0.6 * vel
    for k in range(1, 16):
        fk = f0 * k * np.sqrt(1 + B * k * k)
        if fk > 15000:
            break
        a = (1 / k ** 1.25) * (bright ** (k / 6))
        d = 0.7 + 0.55 * k + f0 / 900
        env = 0.65 * np.exp(-t * d * 2.2) + 0.35 * np.exp(-t * d * 0.35)
        y += a * env * (np.sin(2 * np.pi * fk * t + rng.random() * 6) + 0.5 * np.sin(2 * np.pi * fk * 1.0012 * t))
    y += lp(noise(n), 2500) * np.exp(-t * 60) * 0.08 * vel
    rel = np.clip(1 - (t - dur) / 0.35, 0, 1)
    y *= np.where(t > dur, rel, 1) * (1 - np.exp(-t * 2000))
    return y / 4.0 * vel


def pluck(midi, dur=0.3, vel=1.0):
    n = int(SR * (dur + 0.25))
    t = np.arange(n) / SR
    f0 = mtof(midi)
    y = np.zeros(n)
    for k in range(1, 24):
        fk = f0 * k
        if fk > 16000:
            break
        y += (1 / k) * np.exp(-t * (4 + 2.2 * k)) * (np.sin(2 * np.pi * fk * t) + 0.6 * np.sin(2 * np.pi * fk * 1.004 * t + 1.3))
    env = (1 - np.exp(-t * 3000)) * np.where(t > dur, np.clip(1 - (t - dur) / 0.08, 0, 1), 1)
    return y * env * 0.32 * vel


def bell(midi, dur=1.2, vel=1.0, ratio=3.5):
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = mtof(midi)
    idx = 3.2 * np.exp(-t * 7)
    y = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * ratio * t)) * np.exp(-t * 3.2) * (1 - np.exp(-t * 2500))
    return y * 0.3 * vel


def supersaw(midis, dur, voices=7, spread=16, attack=0.01, release=0.25, gain=1.0):
    n = int(SR * (dur + release))
    out = np.zeros((2, n))
    det = np.linspace(-spread, spread, voices)
    for m in midis:
        f = mtof(m)
        for k, c in enumerate(det):
            v = saw(f * 2 ** (c / 1200), n)
            pan = (k / (voices - 1)) * 2 - 1
            out[0] += v * (1 - max(0, pan) * 0.8)
            out[1] += v * (1 + min(0, pan) * 0.8)
    env = adsr(n, attack, 0.3, 0.85, release, hold=dur)
    return out * env / (voices * len(midis)) ** 0.5 * 0.35 * gain


# ───────────────────────── partition ─────────────────────────
CH = {'Am': [57, 60, 64], 'F': [53, 57, 60], 'C': [55, 60, 64], 'G': [55, 59, 62]}
PAD = {'Am': [57, 59, 60, 64], 'F': [53, 57, 60, 64], 'C': [55, 60, 62, 64], 'G': [55, 59, 62, 64]}
ROOTS = {'Am': 33, 'F': 29, 'C': 36, 'G': 31}
BARS = ['Am', 'Am', 'Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G',
        'Am', 'F', 'C', 'G', 'F', 'G', 'Am', 'F', 'G', 'C']


def chord_at(t):
    return BARS[min(int(t // BAR), len(BARS) - 1)]


def compose():
    drums, bass, keys, pads, lead, arps, hits = (zeros() for _ in range(7))
    kicks = []

    def K(t, g=1.0, p=1.0):
        place(drums, kick(g, p), t)
        kicks.append((t, g))

    # ── 0–2 s : accroche (pulsations, arpège qui s'ouvre) ──
    for i in range(16):
        t = i * 0.125
        place(arps, pluck(CH['Am'][i % 3] + 12 + (12 if i % 4 == 3 else 0), 0.1, 0.55 + i * 0.02), t, pan=(-0.3 if i % 2 else 0.3))
        place(drums, hat(False, 0.35 + 0.25 * (i % 2)), t, pan=0.2)
    for t in (0.0, 0.5, 1.0, 1.5, 1.75):
        K(t, 0.8)
        place(bass, sub(33, 0.24, 0.8), t)
    # ── 2,36–4 s : après l'arrêt, nappe sombre + cymbale inversée ──
    pad_dark = supersaw(PAD['Am'], 1.5, attack=0.4, release=0.4, gain=0.6)
    place(pads, sweep_filter(pad_dark, np.linspace(400, 1400, pad_dark.shape[1])), 2.45)
    rev = crash(0.55, 1.0)[:, ::-1]
    place(hits, rev, 3.0)
    place(keys, piano(45, 1.4, 0.55), 2.4)
    place(keys, piano(57, 1.4, 0.45), 2.4)

    # ── 4–8 s : promesse (piano + nappe, pulsation douce) ──
    mel = [(4.0, 76, 0.9), (5.0, 74, 0.45), (5.5, 72, 0.45), (6.0, 72, 0.9), (7.0, 69, 0.45), (7.5, 71, 0.45)]
    for b in range(2, 4):
        c = BARS[b]
        for beat in range(4):
            t = b * BAR + beat * BEAT
            for m in CH[c]:
                place(keys, piano(m, 0.45, 0.42 + (0.1 if beat == 0 else 0)), t, pan=-0.15)
            place(keys, piano(ROOTS[c] + 12, 0.9, 0.5), t) if beat in (0, 2) else None
    for t, m, d in mel:
        place(keys, piano(m, d, 0.75), t, pan=0.15)
    for b in range(2, 4):
        p = supersaw(PAD[BARS[b]], BAR, attack=0.35, release=0.5, gain=0.55)
        place(pads, sweep_filter(p, np.full(p.shape[1], 1600.0)), b * BAR)
    for t in (4.0, 5.0, 6.0, 7.0):
        K(t, 0.55, 0.6)
    for t in np.arange(6.5, 8.0, 0.25):
        place(drums, hat(False, 0.3), t, pan=0.25)
    place(bass, sub(ROOTS['F'], 1.5, 0.7), 6.5)

    # ── 8–26 s : couplet (groove, basse, arpèges) ──
    for b in range(4, 13):
        c = BARS[b]
        t0 = b * BAR
        # batterie
        for e in (0, 3, 4):
            K(t0 + e * 0.25, 0.95)
        if b % 2 == 1:
            K(t0 + 7 * 0.25, 0.6)
        for e in (2, 6):
            place(drums, clap(0.85), t0 + e * 0.25)
        for e in range(8):
            place(drums, hat(False, 0.45 if e % 2 else 0.28), t0 + e * 0.25, pan=0.25)
        if b >= 7:
            for e in range(16):
                if e % 2:
                    place(drums, hat(False, 0.18), t0 + e * 0.125, pan=-0.25)
        # basse
        for e, g in ((0, 1.0), (3, 0.8), (4, 0.9), (6, 0.7)):
            place(bass, sub(ROOTS[c], 0.22, g), t0 + e * 0.25)
        # arpège pincé en croches
        ch = CH[c]
        pat = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24, ch[2] + 12, ch[1] + 12, ch[0] + 24, ch[2] + 12]
        for e, m in enumerate(pat):
            place(arps, pluck(m, 0.2, 0.75 if e % 2 == 0 else 0.6), t0 + e * 0.25, pan=(0.35 if e % 2 else -0.35))
        # nappe
        p = supersaw(PAD[c], BAR, attack=0.25, release=0.4, gain=0.42)
        place(pads, sweep_filter(p, np.full(p.shape[1], 1300.0 if b < 7 else 1900.0)), t0)
        # cloches « magiques » pendant l'écriture (14–22 s)
        if 7 <= b <= 10:
            for k, e in enumerate((1, 5, 6)):
                place(keys, bell(ch[(k + b) % 3] + 24, 1.0, 0.5), t0 + e * 0.25 + 0.125, pan=(0.5 if k % 2 else -0.5))

    # ── 26–28 s : montée (roulement de caisse claire, coupure avant le drop) ──
    c = BARS[13]
    times = list(np.arange(26.0, 27.0, 0.25)) + list(np.arange(27.0, 27.5, 0.125)) + list(np.arange(27.5, 27.75, 0.0625))
    for i, t in enumerate(times):
        place(drums, snare(0.35 + 0.5 * i / len(times)), t)
    for t in (26.0, 26.5):
        K(t, 0.9)
    p = supersaw(PAD['G'], 1.75, attack=0.2, release=0.05, gain=0.6)
    place(pads, sweep_filter(p, np.geomspace(600, 9000, p.shape[1]), reso=0.3), 26.0)
    for e in range(14):
        m = CH['G'][e % 3] + 12 + 12 * (e // 7)
        place(arps, pluck(m, 0.1, 0.5 + e * 0.03), 26.0 + e * 0.125)

    # ── drops : 28–36 s et 40–46 s ──
    MELA = {'Am': [76, None, 76, 74, 76, None, 72, None], 'F': [72, None, 72, 69, 72, None, 74, None],
            'C': [76, None, 76, 79, 76, None, 74, 72], 'G': [74, None, 71, None, 67, None, 74, None]}
    MELB_G = [74, None, 76, None, 79, None, 81, None]

    def drop_bar(b, melody):
        c = BARS[b]
        t0 = b * BAR
        for e in range(4):
            K(t0 + e * BEAT, 1.0)
        for e in (1, 3):
            place(drums, clap(1.0), t0 + e * BEAT)
        for e in range(4):
            place(drums, hat(True, 0.32), t0 + e * BEAT + 0.25, pan=0.2)
        for e in range(16):
            place(drums, hat(False, 0.22 if e % 2 else 0.12), t0 + e * 0.125, pan=-0.2)
        # basse : fondamentale + octave en contretemps
        for e in range(8):
            m = ROOTS[c] + (12 if e % 2 else 0)
            place(bass, sub(m, 0.2, 0.95 if e % 2 == 0 else 0.6), t0 + e * 0.25)
        # accords supersaw (pompés par le sidechain)
        voicing = CH[c] + [CH[c][0] + 12]
        p = supersaw(voicing, BAR, attack=0.01, release=0.3, gain=0.95)
        place(pads, sweep_filter(p, np.full(p.shape[1], 5200.0), reso=0.1), t0)
        # arpège en doubles croches
        ch = CH[c]
        pat = [ch[0] + 24, ch[2] + 12, ch[1] + 12, ch[2] + 12]
        for e in range(16):
            place(arps, pluck(pat[e % 4], 0.1, 0.5), t0 + e * 0.125, pan=(0.4 if e % 2 else -0.4))
        # mélodie
        for e, m in enumerate(melody):
            if m is None:
                continue
            nxt = next((k for k in range(e + 1, 8) if melody[k] is not None), 8)
            d = (nxt - e) * 0.25 - 0.03
            v = supersaw([m], d, voices=5, spread=10, attack=0.005, release=0.12, gain=1.5)
            pl = pluck(m, d, 1.0)[:v.shape[1]]
            v[:, :len(pl)] += 0.6 * pl
            place(lead, v, t0 + e * 0.25)

    for b in range(14, 18):
        drop_bar(b, MELA[BARS[b]])
    place(hits, crash(0.9), 28.0)
    place(hits, crash(0.6), 32.0)
    # ── 36–40 s : pont (nappe, piano, montée finale) ──
    for b in (18, 19):
        c = BARS[b]
        t0 = b * BAR
        p = supersaw(PAD[c], BAR, attack=0.3, release=0.5, gain=0.6)
        place(pads, sweep_filter(p, np.full(p.shape[1], 1500.0 if b == 18 else 2200.0)), t0)
        for beat in range(4):
            for m in CH[c]:
                place(keys, piano(m + 12, 0.45, 0.45), t0 + beat * BEAT, pan=-0.1)
        place(bass, sub(ROOTS[c], 1.9, 0.6), t0)
        for e in range(8):
            place(arps, pluck(CH[c][e % 3] + 24, 0.12, 0.35), t0 + e * 0.25, pan=(0.4 if e % 2 else -0.4))
    K(36.0, 0.8)
    K(38.0, 0.7)
    times = list(np.arange(38.5, 39.25, 0.25)) + list(np.arange(39.25, 39.75, 0.125))
    for i, t in enumerate(times):
        place(drums, snare(0.3 + 0.45 * i / len(times)), t)
    for b in range(20, 23):
        drop_bar(b, MELA[BARS[b]] if BARS[b] != 'G' else MELB_G)
    place(hits, crash(0.9), 40.0)
    place(hits, crash(0.6), 44.0)
    # ── 46–48 s : accord final (do majeur) ──
    K(46.0, 1.0, 1.2)
    place(hits, crash(1.0, 2.0), 46.0)
    p = supersaw(CH['C'] + [72, 76], 1.2, attack=0.01, release=0.8, gain=1.0)
    place(pads, sweep_filter(p, np.linspace(6000, 1200, p.shape[1])), 46.0)
    for m in (48, 55, 60, 64, 67, 72, 76):
        place(keys, piano(m, 1.6, 0.7), 46.0)
    place(bass, sub(36, 1.2, 0.9), 46.0)
    place(lead, supersaw([76], 1.0, voices=5, spread=10, release=0.6, gain=1.2), 46.0)
    return dict(drums=drums, bass=bass, keys=keys, pads=pads, lead=lead, arps=arps, hits=hits), kicks


def sidechain(kicks, depth=0.6, tau=0.14):
    """Courbe de « pompage » des nappes et de la basse déclenchée par les grosses caisses."""
    g = np.ones(N)
    t = np.arange(N) / SR
    for tk, gain in kicks:
        i = int(tk * SR)
        n = min(N - i, int(SR * 0.6))
        if n <= 0:
            continue
        seg = t[i:i + n] - tk
        g[i:i + n] = np.minimum(g[i:i + n], 1 - depth * gain * np.exp(-seg / tau) * np.clip(seg / 0.004, 0, 1) ** 0.5)
    return g


def tape_stop(x, t0, dur):
    """Effet « cassette qui s'arrête » : le son ralentit et descend jusqu'au silence."""
    i0, n = int(t0 * SR), int(dur * SR)
    speed = np.linspace(1, 0, n) ** 1.5
    pos = i0 + np.cumsum(speed)
    for ch in range(x.shape[0]):
        seg = np.interp(pos, np.arange(x.shape[1]), x[ch])
        x[ch, i0:i0 + n] = seg * np.linspace(1, 0.2, n)
        x[ch, i0 + n:i0 + n + int(0.05 * SR)] = 0


# ───────────────────────── effets sonores ─────────────────────────
def whoosh(length=0.5, rise=False, gain=1.0):
    t = tt(length)
    n = len(t)
    x = noise(n)
    f = np.geomspace(500, 6000, n) if rise else np.geomspace(5000, 400, n)
    y = sweep_filter(x, f, reso=0.35)
    env = np.sin(np.pi * np.clip(t / length, 0, 1)) ** (2 if not rise else 1.2)
    if rise:
        env = (t / length) ** 1.6 * np.clip((length - t) / 0.04, 0, 1)
    y = y * env
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.7 * gain
    pan = np.linspace(-0.7, 0.7, n)
    return np.stack([y * (1 - np.clip(pan, 0, 1)), y * (1 + np.clip(pan, -1, 0))])


def pop(gain=1.0, pitch=1.0):
    t = tt(0.12)
    f = (900 + 700 * np.exp(-t * 60)) * pitch
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38) * (1 - np.exp(-t * 3000))
    return y * 0.55 * gain


def tick(gain=1.0, f=2600):
    t = tt(0.03)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t * 260) + hp(noise(len(t)), 3000) * np.exp(-t * 400) * 0.4
    return y * 0.4 * gain


def keyclick(gain=1.0):
    t = tt(0.05)
    y = bp(noise(len(t)), 1800, 6000) * np.exp(-t * 180) + np.sin(2 * np.pi * 220 * t) * np.exp(-t * 90) * 0.3
    return y * 0.35 * gain


def chime(notes, gain=1.0, gap=0.07):
    out = np.zeros(int(SR * (1.6 + gap * len(notes))))
    for k, m in enumerate(notes):
        b = bell(m, 1.4, 1.0, ratio=2.0)
        i = int(k * gap * SR)
        out[i:i + len(b)] += b
    return out * gain


def paperflip(gain=1.0):
    t = tt(0.28)
    n = len(t)
    env = (1 - np.exp(-t * 90)) * np.exp(-t * 14)
    flutter = 0.6 + 0.4 * np.sin(2 * np.pi * 38 * t + 2 * np.sin(2 * np.pi * 7 * t))
    y = bp(noise(n), 900, 5200) * env * flutter
    y += lp(noise(n), 400) * np.exp(-t * 30) * 0.3
    return y / (np.max(np.abs(y)) + 1e-9) * 0.6 * gain


def glitch(dur=0.18, gain=1.0):
    n = int(SR * dur)
    y = np.zeros(n)
    k = 0
    while k < n:
        L = int(SR * rng.uniform(0.008, 0.03))
        f = rng.choice([180, 360, 720, 1440, 2880])
        seg = np.sign(np.sin(2 * np.pi * f * np.arange(L) / SR)) * 0.5 + noise(L) * 0.25
        seg = np.round(seg * 4) / 4
        y[k:k + L] = seg[:max(0, min(L, n - k))]
        k += L + int(SR * rng.uniform(0, 0.01))
    return y * 0.5 * gain


def zip_down(dur=0.32, gain=1.0):
    t = tt(dur)
    f = np.geomspace(2400, 120, len(t))
    y = saw(f, len(t)) * 0.4 + bp(noise(len(t)), 300, 4000) * 0.3
    return lp(y, 5000) * np.exp(-t * 2) * gain * 0.6


def riser(dur=1.6, gain=1.0):
    t = tt(dur)
    n = len(t)
    y = sweep_filter(noise(n), np.geomspace(300, 12000, n), reso=0.45) * 0.6
    f = np.geomspace(220, 880, n)
    y += (saw(f, n) + saw(f * 1.007, n)) * 0.12
    env = (t / dur) ** 2.2
    y = y * env * np.clip((dur - t) / 0.02, 0, 1)
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.7 * gain
    return np.stack([y, np.roll(y, 300)])


def thud(gain=1.0):
    t = tt(0.35)
    f = 70 + 60 * np.exp(-t * 40)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) + bp(noise(len(t)), 200, 1800) * np.exp(-t * 30) * 0.5
    return np.tanh(y * 1.5) * 0.8 * gain


def flap(gain=1.0):
    t = tt(0.16)
    y = bp(noise(len(t)), 250, 2500) * np.exp(-t * 35) * (1 - np.exp(-t * 300))
    return y / (np.max(np.abs(y)) + 1e-9) * 0.55 * gain


def tape_rip(gain=1.0):
    t = tt(0.24)
    f = np.geomspace(800, 5000, len(t))
    y = sweep_filter(noise(len(t)), f, reso=0.5) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 70 * t)))
    return y / (np.max(np.abs(y)) + 1e-9) * 0.45 * gain * np.clip((0.24 - t) / 0.03, 0, 1)


def stamp(gain=1.0):
    t = tt(0.4)
    y = np.sin(2 * np.pi * (60 + 80 * np.exp(-t * 50)) * t) * np.exp(-t * 12) + hp(noise(len(t)), 2000) * np.exp(-t * 80) * 0.5
    return np.tanh(y * 1.8) * 0.85 * gain


def sfx_bus(cues):
    s = zeros()
    for c in cues:
        name, t, g = c['name'], c['t'], c.get('gain', 0.5)
        if name == 'whoosh':
            place(s, whoosh(c.get('len', 0.5), c.get('rise', False), g), t)
        elif name in ('swish', 'swipe'):
            place(s, whoosh(0.28, False, g * 0.8), t)
        elif name == 'word':
            place(s, whoosh(0.22, True, g * 0.6), t - 0.12)
        elif name == 'pop':
            place(s, pop(g, c.get('pitch', 1.0)), t, pan=rng.uniform(-0.3, 0.3))
        elif name == 'tick':
            place(s, tick(g * 1.2), t)
        elif name == 'ticks':
            d, r0, r1 = c['dur'], c['r0'], c['r1']
            x = 0.0
            while x < d:
                place(s, tick(g if g != 0.5 else 0.6, 2400 + rng.uniform(-200, 400)), t + x, pan=rng.uniform(-0.4, 0.4))
                x += 1 / (r0 + (r1 - r0) * x / d)
        elif name == 'glitch':
            place(s, glitch(c.get('dur', 0.18), 1.0), t)
        elif name == 'rewind':
            place(s, zip_down(c.get('dur', 0.32), 1.0), t)
        elif name == 'boom':
            place(s, boom(g), t)
        elif name == 'impact':
            place(s, boom(g * (0.5 if c.get('soft') else 1.0)), t)
            if not c.get('soft'):
                place(s, crash(g * 0.8), t)
        elif name == 'drop':
            place(s, boom(g), t)
        elif name == 'shimmer':
            d = c.get('dur', 1.2)
            for k in range(int(d * 14)):
                place(s, bell(rng.choice([84, 88, 91, 93, 96, 100]), 0.9, 0.35), t + rng.uniform(0, d), pan=rng.uniform(-0.7, 0.7))
        elif name == 'sparkle':
            for k, m in enumerate((91, 96, 100)):
                place(s, bell(m, 0.8, 0.45), t + k * 0.06, gain=g * 2, pan=rng.uniform(-0.5, 0.5))
        elif name == 'keys':
            nk, d = c.get('n', 5), c['dur']
            for k in range(nk):
                place(s, keyclick(1.0), t + k * d / nk + rng.uniform(-0.01, 0.01), pan=rng.uniform(-0.2, 0.2))
        elif name == 'typing':
            x = 0.0
            while x < c['dur']:
                place(s, keyclick(rng.uniform(0.6, 1.0)), t + x, pan=rng.uniform(-0.25, 0.25))
                x += rng.uniform(0.045, 0.09)
        elif name == 'tap':
            place(s, tick(g * 1.4, 1500), t)
        elif name == 'success':
            place(s, chime([88, 95], g * 1.4), t)
        elif name == 'ding':
            place(s, chime([84, 91, 96], g * 1.3, 0.05), t)
        elif name == 'tile':
            place(s, paperflip(g * 0.8), t, pan=rng.uniform(-0.4, 0.4))
            place(s, pop(g * 0.5, 0.6 * c.get('pitch', 1.0)), t + 0.04)
        elif name == 'pageflip':
            place(s, paperflip(g), t, pan=rng.uniform(-0.3, 0.3))
        elif name == 'riser':
            place(s, riser(c.get('dur', 1.6), g), t)
        elif name == 'hit':
            place(s, kick(g * 0.8), t)
            place(s, clap(g * 0.6), t)
        elif name == 'thud':
            place(s, thud(g), t)
        elif name == 'flap':
            place(s, flap(g), t)
        elif name == 'tape':
            place(s, tape_rip(g), t)
        elif name == 'stamp':
            place(s, stamp(g), t)
        elif name == 'logo':
            place(s, whoosh(0.6, True, 0.5), t - 0.3)
            place(s, chime([76, 81, 84, 88], 0.9, 0.09), t)
        elif name == 'final':
            place(s, boom(g), t)
    return s


def limiter(x, ceiling_db=-1.0, lookahead=0.004, release=0.09):
    """Limiteur de crête transparent avec anticipation (sans gain de compensation)."""
    from scipy.ndimage import minimum_filter1d
    c = 10 ** (ceiling_db / 20)
    L = int(lookahead * SR)
    peak = np.max(np.abs(x), axis=0)
    g = np.minimum(1.0, c / np.maximum(peak, 1e-9))
    g = minimum_filter1d(g, size=2 * L + 1)
    k = 1 - np.exp(-1 / (release * SR))
    out = np.empty_like(g)
    cur = 1.0
    for i in range(len(g)):
        v = g[i]
        cur = v if v < cur else cur + (v - cur) * k
        out[i] = cur
    out = np.convolve(out, np.ones(L) / L, mode='same')
    return x * np.minimum(out, g)


def loudness(x):
    import pyloudnorm as pyln
    v = pyln.Meter(SR).integrated_loudness(x.T)
    return v if np.isfinite(v) else -70.0


def norm(x, target):
    return x * 10 ** ((target - loudness(x)) / 20)


def main():
    cues = json.load(open(os.path.join(OUT, 'cues.json')))['cues']
    stems, kicks = compose()
    sc = sidechain([k for k in kicks if k[1] >= 0.75])
    # traitement des pistes puis niveau cible (LUFS) de chacune avant la somme
    P = {
        'drums': (stems['drums'], Pedalboard([HighpassFilter(30), Compressor(threshold_db=-14, ratio=3, attack_ms=5, release_ms=80)]), -17.5),
        'bass': (stems['bass'] * sc, Pedalboard([LowpassFilter(1200)]), -21.0),
        'pads': (stems['pads'] * sc, Pedalboard([HighpassFilter(140), Chorus(rate_hz=0.6, depth=0.25, mix=0.35), Reverb(room_size=0.82, damping=0.5, wet_level=0.32, dry_level=0.8, width=1.0)]), -22.5),
        'keys': (stems['keys'], Pedalboard([HighpassFilter(70), Reverb(room_size=0.7, damping=0.45, wet_level=0.3, dry_level=0.85, width=0.9)]), -21.5),
        'arps': (stems['arps'] * (0.55 + 0.45 * sc), Pedalboard([HighpassFilter(250), Delay(delay_seconds=0.375, feedback=0.28, mix=0.22), Reverb(room_size=0.55, wet_level=0.2, dry_level=0.9)]), -24.0),
        'lead': (stems['lead'], Pedalboard([HighpassFilter(200), Delay(delay_seconds=0.375, feedback=0.3, mix=0.25), Reverb(room_size=0.7, wet_level=0.28, dry_level=0.85)]), -20.5),
        'hits': (stems['hits'], Pedalboard([Reverb(room_size=0.9, wet_level=0.35, dry_level=0.8)]), -24.0),
    }
    music = zeros()
    for name, (x, board, target) in P.items():
        y = norm(fx(x, board), target)
        print(f'  {name:6s} → {loudness(y):6.1f} LUFS, crête {20 * np.log10(np.max(np.abs(y)) + 1e-12):5.1f} dBFS')
        music += y
    tape_stop(music, 1.92, 0.42)
    sfx = fx(sfx_bus(cues), Pedalboard([Reverb(room_size=0.5, wet_level=0.14, dry_level=0.95, width=1.0)]))
    sfx = norm(sfx, -18.5)
    print(f'  sfx    → {loudness(sfx):6.1f} LUFS, crête {20 * np.log10(np.max(np.abs(sfx)) + 1e-12):5.1f} dBFS')
    glue = Pedalboard([HighpassFilter(25), Compressor(threshold_db=-16, ratio=2.0, attack_ms=15, release_ms=150)])

    def finish(x, target):
        y = limiter(fx(x, glue), -3.0)
        y = limiter(norm(y, target), -1.0)
        fade = int(0.35 * SR)
        y[:, -fade:] *= np.linspace(1, 0, fade) ** 2
        print(f'  → {loudness(y):.1f} LUFS, crête {20 * np.log10(np.max(np.abs(y)) + 1e-9):.1f} dBFS')
        return y

    print('mixage complet')
    full = finish(music + sfx, -14.0)
    sf.write(os.path.join(OUT, 'audio.wav'), full.T.astype(np.float32), SR, subtype='PCM_24')
    print('effets seuls')
    only = finish(sfx, -18.0)
    sf.write(os.path.join(OUT, 'sfx_only.wav'), only.T.astype(np.float32), SR, subtype='PCM_24')
    print('musique seule')
    mus = finish(music, -14.0)
    sf.write(os.path.join(OUT, 'music_only.wav'), mus.T.astype(np.float32), SR, subtype='PCM_24')


if __name__ == '__main__':
    main()
