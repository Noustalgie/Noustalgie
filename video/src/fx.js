/* Effets dessinés au canvas, fonctions pures du temps t : poussière dorée, gerbes de particules, grain. */
(function () {
'use strict';
const { W, H } = window.STAGE;
const cv = document.getElementById('fx'), ctx = cv.getContext('2d');
const gcv = document.getElementById('grain'), gctx = gcv.getContext('2d');

/* Grain argentique : tuiles pré-calculées, changées 24 fois par seconde */
const tiles = [];
for (let k = 0; k < 12; k++) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d'), im = x.createImageData(256, 256), r = rng(900 + k);
  for (let i = 0; i < im.data.length; i += 4) { const v = 128 + (r() + r() - 1) * 70; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  x.putImageData(im, 0, 0); tiles.push(c);
}

/* Poussière dorée ambiante */
const dust = [];
{
  const r = rng(4242);
  for (let i = 0; i < 110; i++) dust.push({ x: r() * W, y: r() * (H + 200), v: 18 + r() * 55, amp: 10 + r() * 40, f: 0.3 + r() * 0.9, ph: r() * 6.28, s: 1.2 + Math.pow(r(), 2.5) * 6, a: 0.25 + r() * 0.6, tw: 1 + r() * 3 });
}

/* Gerbes : burst({ t, x, y, n, speed:[a,b], angle:[a,b], gravity, drag, life:[a,b], size:[a,b], colors, seed, streak }) */
const bursts = [];
window.burst = o => {
  const r = rng(o.seed || Math.round(o.t * 997));
  const ps = [];
  for (let i = 0; i < o.n; i++) {
    const a = (o.angle ? o.angle[0] + r() * (o.angle[1] - o.angle[0]) : r() * Math.PI * 2);
    const sp = o.speed[0] + r() * (o.speed[1] - o.speed[0]);
    ps.push({ vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: o.life[0] + r() * (o.life[1] - o.life[0]), s: o.size[0] + r() * (o.size[1] - o.size[0]),
      c: o.colors[Math.floor(r() * o.colors.length)], ox: (r() - 0.5) * (o.spread || 0), oy: (r() - 0.5) * (o.spreadY != null ? o.spreadY : (o.spread || 0)), tw: r() * 6.28, delay: (o.stagger || 0) * r() });
  }
  bursts.push(Object.assign({ gravity: 600, drag: 2.2, streak: false }, o, { ps }));
};

function drawDust(t, k) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const d of dust) {
    const y = ((d.y - d.v * t) % (H + 200) + H + 200) % (H + 200) - 100;
    const x = d.x + Math.sin(t * d.f + d.ph) * d.amp;
    const a = d.a * k * (0.6 + 0.4 * Math.sin(t * d.tw + d.ph));
    const g = ctx.createRadialGradient(x, y, 0, x, y, d.s * 3);
    g.addColorStop(0, `rgba(255,230,170,${a})`); g.addColorStop(0.35, `rgba(240,190,110,${a * 0.5})`); g.addColorStop(1, 'rgba(240,190,110,0)');
    ctx.fillStyle = g; ctx.fillRect(x - d.s * 3, y - d.s * 3, d.s * 6, d.s * 6);
  }
  ctx.restore();
}

function drawBursts(t) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const b of bursts) {
    const tau0 = t - b.t;
    if (tau0 < 0 || tau0 > 4) continue;
    for (const p of b.ps) {
      const tau = tau0 - p.delay;
      if (tau < 0 || tau > p.life) continue;
      const k = b.drag, e = (1 - Math.exp(-k * tau)) / k;
      const x = b.x + p.ox + p.vx * e, y = b.y + p.oy + p.vy * e + 0.5 * b.gravity * tau * tau;
      const life = 1 - tau / p.life, a = Math.min(1, life * 1.6) * (0.75 + 0.25 * Math.sin(tau * 18 + p.tw));
      if (b.streak) {
        const vx = p.vx * Math.exp(-k * tau), vy = p.vy * Math.exp(-k * tau) + b.gravity * tau;
        ctx.strokeStyle = p.c.replace('A', a.toFixed(3)); ctx.lineWidth = p.s; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - vx * 0.03, y - vy * 0.03); ctx.stroke();
      } else {
        const s = p.s * (0.6 + life * 0.6);
        const g = ctx.createRadialGradient(x, y, 0, x, y, s * 2.4);
        g.addColorStop(0, p.c.replace('A', a.toFixed(3))); g.addColorStop(1, p.c.replace('A', '0'));
        ctx.fillStyle = g; ctx.fillRect(x - s * 2.4, y - s * 2.4, s * 4.8, s * 4.8);
      }
    }
  }
  ctx.restore();
}

window.renderFX = t => {
  ctx.clearRect(0, 0, W, H);
  if (FXS.dust > 0.001) drawDust(t, FXS.dust);
  drawBursts(t);
  // grain
  gctx.clearRect(0, 0, W, H);
  if (FXS.grain > 0) {
    const gf = Math.floor(t * 12);
    const tile = tiles[gf % tiles.length];
    gctx.globalAlpha = FXS.grain;
    const pat = gctx.createPattern(tile, 'repeat');
    const ox = (gf * 37) % 256, oy = (gf * 53) % 256;
    gctx.save(); gctx.translate(-ox, -oy); gctx.fillStyle = pat; gctx.fillRect(0, 0, W + 256, H + 256); gctx.restore();
    gctx.globalAlpha = 1;
  }
};

/* Couleurs prêtes pour burst() : 'A' est remplacé par l'opacité */
window.GOLDS = ['rgba(255,226,160,A)', 'rgba(245,200,120,A)', 'rgba(255,245,220,A)', 'rgba(232,170,90,A)'];
window.WARM = ['rgba(255,190,120,A)', 'rgba(255,140,110,A)', 'rgba(255,230,180,A)', 'rgba(255,170,200,A)'];
})();
