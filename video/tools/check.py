"""Vérifie la synchronisation : les temps forts de l'audio tombent-ils sur les repères de l'image ?
python3 tools/check.py out/noustalgie-tiktok.mp4"""
import json
import subprocess
import sys

import numpy as np

path = sys.argv[1] if len(sys.argv) > 1 else 'out/noustalgie-tiktok.mp4'
probe = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', path], capture_output=True, text=True).stdout)
for s in probe['streams']:
    if s['codec_type'] == 'video':
        print(f"vidéo : {s['codec_name']} {s['width']}×{s['height']} {s['r_frame_rate']} i/s, {s.get('nb_frames')} images, {s['pix_fmt']}")
    else:
        print(f"audio : {s['codec_name']} {s['sample_rate']} Hz, {s['channels']} canaux")
fmt = probe['format']
print(f"durée {float(fmt['duration']):.3f} s, {int(fmt['size']) / 1e6:.1f} Mo, {int(fmt['bit_rate']) / 1e6:.1f} Mb/s")

# audio décodé depuis le MP4 (donc après encodage AAC et mux)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '48000', '-f', 'f32le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.float32)
sr = 48000
hop = 240
env = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, mode='same'))[::hop]
on = np.maximum(0, np.diff(env, prepend=env[0]))
for t in (2.36, 6.5, 28.0, 34.0, 40.0, 46.0):
    i0, i1 = int((t - 0.08) * sr / hop), int((t + 0.08) * sr / hop)
    k = i0 + int(np.argmax(on[i0:i1]))
    print(f'repère {t:6.2f} s → attaque audio à {k * hop / sr:6.3f} s (écart {1000 * (k * hop / sr - t):+.0f} ms)')
