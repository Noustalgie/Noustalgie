/* Noustalgie — générateur de « photos » procédurales pour la vidéo.
   Aucune photo réelle : chaque scène est dessinée au canvas (silhouettes, paysages),
   puis étalonnée (grain, vignette, courbe) pour un rendu argentique cohérent. */
(function () {
'use strict';

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const rnd = mulberry32(seed);
  const perm = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const p = new Uint8Array(512); for (let i = 0; i < 512; i++) p[i] = perm[i & 255];
  const g = new Float32Array(256); for (let i = 0; i < 256; i++) g[i] = rnd();
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  function n2(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255;
    const a = g[p[p[X] + Y]], b = g[p[p[X + 1] + Y]], c = g[p[p[X] + Y + 1]], d = g[p[p[X + 1] + Y + 1]];
    const u = fade(xf), v = fade(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, oct = 5) { let s = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < oct; i++) { s += a * n2(x * f, y * f); n += a; a *= 0.5; f *= 2; } return s / n; }
  return { n2, fbm, n1: x => fbm(x, 0.37, 5) };
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function vgrad(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}
function glow(ctx, x, y, r, color, alpha = 1, mode = 'lighter') {
  ctx.save(); ctx.globalCompositeOperation = mode; ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.restore();
}
function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
}
function off(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

/* Nuages : bruit fbm calculé en basse résolution puis agrandi (doux, sans pixels) */
function clouds(ctx, W, H, N, o) {
  const lw = o.res || 220, lh = Math.round(lw * (o.h || H) / W);
  const c = off(lw, lh), cx = c.getContext('2d'), img = cx.createImageData(lw, lh);
  const col = o.color || [255, 220, 200];
  for (let y = 0; y < lh; y++) for (let x = 0; x < lw; x++) {
    const v = N.fbm(x / lw * (o.sx || 3) + (o.ox || 0), y / lh * (o.sy || 8) + (o.oy || 0), 6);
    let a = clamp((v - (o.th || 0.52)) * (o.k || 4), 0, 1);
    const fy = y / lh; a *= o.mask ? o.mask(fy, x / lw) : 1;
    const i = (y * lw + x) * 4;
    const shade = o.shade ? o.shade(fy, v) : 1;
    img.data[i] = col[0] * shade; img.data[i + 1] = col[1] * shade; img.data[i + 2] = col[2] * shade; img.data[i + 3] = a * 255 * (o.alpha || 1);
  }
  cx.putImageData(img, 0, 0);
  ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  if (o.mode) ctx.globalCompositeOperation = o.mode;
  ctx.drawImage(c, 0, o.y || 0, W, o.h || H);
  ctx.restore();
}

/* Crête de montagne : profil 1D fractal */
function ridge(ctx, W, H, N, o) {
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 4) {
    const t = x / W;
    let y = o.base - (N.n1(t * o.freq + o.seed) - 0.5) * o.amp - Math.pow(Math.abs(N.n2(t * o.freq * 3 + o.seed, 9.1) - 0.5), 1.2) * o.amp * (o.jag || 0.4);
    if (o.peak) y -= o.peak(t);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.closePath();
  ctx.fillStyle = o.fill; ctx.fill();
}

/* ── Silhouettes humaines (union de formes pleines) ─────────────── */
function cap(ctx, x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1e-3, nx = -dy / d, ny = dx / d;
  ctx.beginPath();
  ctx.moveTo(x1 + nx * r1, y1 + ny * r1); ctx.lineTo(x2 + nx * r2, y2 + ny * r2);
  ctx.lineTo(x2 - nx * r2, y2 - ny * r2); ctx.lineTo(x1 - nx * r1, y1 - ny * r1); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(x1, y1, r1, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(x2, y2, r2, 0, 7); ctx.fill();
}
function ell(ctx, x, y, rx, ry, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, 7); ctx.fill(); }

/* Personnage debout (vu de face ou de dos). f = { x, y (pieds), h, fem, hair, dress, armL, armR, legs, tilt } */
function stand(ctx, f) {
  const u = f.h / 7.6, X = (a) => f.x + a * u * (f.flip ? -1 : 1), Y = (b) => f.y + b * u;
  const fem = !!f.fem, sh = fem ? 0.84 : 1.0, wa = fem ? 0.5 : 0.64, hp = fem ? 0.82 : 0.78;
  const tilt = f.tilt || 0;
  // tête et cou
  const hx = X(tilt * 0.6), hy = Y(-7.1);
  ell(ctx, hx, hy, 0.4 * u, 0.5 * u, tilt * 0.25);
  if (f.hair === 'long') {
    ctx.beginPath();
    ctx.moveTo(hx - 0.42 * u, hy - 0.1 * u);
    ctx.quadraticCurveTo(hx - 0.62 * u, Y(-6.3), X(-0.56 + tilt * 0.3), Y(-5.55));
    ctx.quadraticCurveTo(hx, Y(-5.3), X(0.56 + tilt * 0.3), Y(-5.55));
    ctx.quadraticCurveTo(hx + 0.62 * u, Y(-6.3), hx + 0.42 * u, hy - 0.1 * u);
    ctx.closePath(); ctx.fill();
  } else if (f.hair === 'bun') {
    ell(ctx, hx + 0.05 * u, hy - 0.52 * u, 0.24 * u, 0.2 * u);
  }
  if (f.hat) { ell(ctx, hx, hy - 0.32 * u, 0.48 * u, 0.32 * u); ell(ctx, hx, hy - 0.62 * u, 0.12 * u, 0.12 * u); }
  cap(ctx, X(tilt * 0.3), Y(-6.6), 0.17 * u, X(0), Y(-6.2), 0.2 * u);
  // buste
  ctx.beginPath();
  ctx.moveTo(X(-0.3), Y(-6.4));
  ctx.quadraticCurveTo(X(-sh + 0.05), Y(-6.3), X(-sh), Y(-5.8));
  ctx.lineTo(X(-sh + 0.12), Y(-5.2));
  ctx.quadraticCurveTo(X(-wa - 0.08), Y(-4.7), X(-wa), Y(-4.2));
  ctx.quadraticCurveTo(X(-hp - 0.05), Y(-3.8), X(-hp), Y(-3.45));
  ctx.lineTo(X(hp), Y(-3.45));
  ctx.quadraticCurveTo(X(hp + 0.05), Y(-3.8), X(wa), Y(-4.2));
  ctx.quadraticCurveTo(X(wa + 0.08), Y(-4.7), X(sh - 0.12), Y(-5.2));
  ctx.lineTo(X(sh), Y(-5.8));
  ctx.quadraticCurveTo(X(sh - 0.05), Y(-6.3), X(0.3), Y(-6.4));
  ctx.closePath(); ctx.fill();
  // bras : [coude, poignet] en unités, relatifs aux pieds
  const armL = f.armL || [[-1.02, -4.55], [-1.08, -3.45]], armR = f.armR || [[1.02, -4.55], [1.08, -3.45]];
  [[-1, armL], [1, armR]].forEach(([s, a]) => {
    const sx = X(s * (sh - 0.14)), sy = Y(-5.85);
    cap(ctx, sx, sy, 0.27 * u, X(a[0][0]), Y(a[0][1]), 0.2 * u);
    cap(ctx, X(a[0][0]), Y(a[0][1]), 0.2 * u, X(a[1][0]), Y(a[1][1]), 0.14 * u);
    ell(ctx, X(a[1][0]), Y(a[1][1]) + 0.15 * u, 0.15 * u, 0.2 * u);
  });
  // jambes
  const legs = f.legs || [[-0.36, -1.9, -0.3, -0.18], [0.36, -1.9, 0.3, -0.18]];
  const lr = fem ? 0.82 : 1;
  legs.forEach(([kx, ky, ax, ay], i) => {
    const s = i ? 1 : -1;
    cap(ctx, X(s * 0.4), Y(-3.5), 0.42 * u * lr, X(kx), Y(ky), 0.26 * u * lr);
    cap(ctx, X(kx), Y(ky), 0.26 * u * lr, X(ax), Y(ay), 0.14 * u * lr);
    ell(ctx, X(ax + s * 0.04), Y(ay + 0.1), 0.17 * u, 0.1 * u);
  });
  if (f.dress) {
    ctx.beginPath();
    ctx.moveTo(X(-wa - 0.02), Y(-4.3));
    ctx.quadraticCurveTo(X(-0.95), Y(-3.2), X(-1.08), Y(-2.15));
    ctx.quadraticCurveTo(X(0), Y(-1.95), X(1.08), Y(-2.15));
    ctx.quadraticCurveTo(X(0.95), Y(-3.2), X(wa + 0.02), Y(-4.3));
    ctx.closePath(); ctx.fill();
  }
  if (f.coat) {
    // manteau long : masque les articulations, silhouette plus naturelle
    const hem = fem ? -2.35 : -2.55, hw = fem ? 1.0 : 0.98;
    ctx.beginPath();
    ctx.moveTo(X(-0.32), Y(-6.42));
    ctx.quadraticCurveTo(X(-sh - 0.02), Y(-6.32), X(-sh - 0.04), Y(-5.75));
    ctx.quadraticCurveTo(X(-sh + 0.02), Y(-4.6), X(-hw), Y(hem));
    ctx.quadraticCurveTo(X(0), Y(hem + 0.12), X(hw), Y(hem));
    ctx.quadraticCurveTo(X(sh - 0.02), Y(-4.6), X(sh + 0.04), Y(-5.75));
    ctx.quadraticCurveTo(X(sh + 0.02), Y(-6.32), X(0.32), Y(-6.42));
    ctx.closePath(); ctx.fill();
  }
}

/* Personnage assis vu de dos. f = { x, y (sol), h (hauteur debout), fem, hair, lean (inclinaison tête), armAround } */
function sit(ctx, f) {
  const u = f.h / 7.6, X = (a) => f.x + a * u, Y = (b) => f.y + b * u;
  const sh = f.fem ? 0.86 : 1.02;
  const lean = f.lean || 0;
  const hx = X(lean * 0.55), hy = Y(-3.95 + Math.abs(lean) * 0.12);
  ell(ctx, hx, hy, 0.4 * u, 0.5 * u, lean * 0.45);
  if (f.hair === 'long') {
    ctx.beginPath();
    ctx.moveTo(hx - 0.42 * u, hy - 0.05 * u);
    ctx.quadraticCurveTo(hx - 0.62 * u, Y(-3.1), X(-0.5 + lean * 0.3), Y(-2.3));
    ctx.quadraticCurveTo(hx, Y(-2.05), X(0.5 + lean * 0.3), Y(-2.3));
    ctx.quadraticCurveTo(hx + 0.62 * u, Y(-3.1), hx + 0.42 * u, hy - 0.05 * u);
    ctx.closePath(); ctx.fill();
  } else if (f.hair === 'bun') ell(ctx, hx, hy - 0.5 * u, 0.22 * u, 0.2 * u);
  if (f.hat) { ell(ctx, hx, hy - 0.32 * u, 0.48 * u, 0.32 * u); ell(ctx, hx, hy - 0.62 * u, 0.12 * u, 0.12 * u); }
  cap(ctx, X(lean * 0.3), Y(-3.45), 0.17 * u, X(0), Y(-3.05), 0.2 * u);
  ctx.beginPath();
  ctx.moveTo(X(-0.3), Y(-3.22));
  ctx.quadraticCurveTo(X(-sh + 0.05), Y(-3.12), X(-sh), Y(-2.6));
  ctx.quadraticCurveTo(X(-sh + 0.2), Y(-1.6), X(-0.72), Y(-1.1));
  ctx.quadraticCurveTo(X(-1.0), Y(-0.4), X(-1.05), Y(0));
  ctx.lineTo(X(1.05), Y(0));
  ctx.quadraticCurveTo(X(1.0), Y(-0.4), X(0.72), Y(-1.1));
  ctx.quadraticCurveTo(X(sh - 0.2), Y(-1.6), X(sh), Y(-2.6));
  ctx.quadraticCurveTo(X(sh - 0.05), Y(-3.12), X(0.3), Y(-3.22));
  ctx.closePath(); ctx.fill();
  // bras le long du corps (coudes légèrement écartés)
  cap(ctx, X(-sh + 0.12), Y(-2.7), 0.26 * u, X(-sh - 0.1), Y(-1.5), 0.2 * u);
  cap(ctx, X(-sh - 0.1), Y(-1.5), 0.2 * u, X(-sh + 0.1), Y(-0.4), 0.15 * u);
  if (f.armAround != null) {
    // bras posé sur l'épaule de l'autre (distance en unités vers la droite ou la gauche)
    const d = f.armAround;
    cap(ctx, X(Math.sign(d) * (sh - 0.12)), Y(-2.7), 0.26 * u, X(d * 0.55), Y(-2.95), 0.2 * u);
    cap(ctx, X(d * 0.55), Y(-2.95), 0.2 * u, X(d * 1.0), Y(-2.75), 0.16 * u);
  } else {
    cap(ctx, X(sh - 0.12), Y(-2.7), 0.26 * u, X(sh + 0.1), Y(-1.5), 0.2 * u);
    cap(ctx, X(sh + 0.1), Y(-1.5), 0.2 * u, X(sh - 0.1), Y(-0.4), 0.15 * u);
  }
}

/* Dessine une silhouette avec un liseré de lumière côté source (rim light) */
/* La silhouette garde sa forme exacte ; le noir décalé de (rimDx, rimDy) laisse
   un fin liseré de lumière du côté opposé au décalage. */
function opaqueMix(fillHex, rimRgba) {
  // couleur du liseré rendue opaque (mélange avec le noir de la silhouette),
  // sinon les formes superposées laisseraient voir leurs jointures
  const n = parseInt(fillHex.slice(1), 16), f = [n >> 16 & 255, n >> 8 & 255, n & 255];
  const m = rimRgba.match(/rgba?\(([^)]+)\)/)[1].split(',').map(Number), a = m[3] == null ? 1 : m[3];
  return `rgb(${[0, 1, 2].map(i => Math.round(f[i] * (1 - a) + m[i] * a)).join(',')})`;
}
function silhouette(ctx, draw, o) {
  const W = ctx.canvas.width, H = ctx.canvas.height;
  const c = off(W, H), cx = c.getContext('2d');
  if (o.rim) {
    const rim = opaqueMix(o.fill || '#110b09', o.rim);
    cx.fillStyle = rim; cx.strokeStyle = rim; draw(cx);
    cx.globalCompositeOperation = 'source-atop';
    cx.translate(o.rimDx || 0, o.rimDy || 0);
  }
  cx.fillStyle = o.fill || '#110b09'; cx.strokeStyle = o.fill || '#110b09';
  draw(cx);
  ctx.save();
  if (o.blur) ctx.filter = `blur(${o.blur}px)`;
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.drawImage(c, 0, 0);
  ctx.restore();
  return c;
}

/* Reflet vertical d'une silhouette (sable mouillé, eau), qui s'efface en s'éloignant */
function reflect(ctx, c, yAxis, alpha, blur, fade = 0.18) {
  const W = ctx.canvas.width, H = ctx.canvas.height;
  const r = off(W, H), rx = r.getContext('2d');
  rx.translate(0, 2 * yAxis); rx.scale(1, -1); rx.drawImage(c, 0, 0);
  rx.setTransform(1, 0, 0, 1, 0, 0);
  rx.globalCompositeOperation = 'destination-in';
  const g = rx.createLinearGradient(0, yAxis, 0, yAxis + H * fade);
  g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  rx.fillStyle = g; rx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = alpha; ctx.filter = `blur(${blur}px)`; ctx.drawImage(r, 0, 0); ctx.restore();
}

/* ── Étalonnage final : courbe, teinte, grain, vignette ─────────── */
function grade(ctx, W, H, rnd, o = {}) {
  const vg = ctx.createRadialGradient(W / 2, H * 0.48, Math.min(W, H) * 0.25, W / 2, H / 2, Math.hypot(W, H) * 0.62);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(10,5,3,${o.vignette != null ? o.vignette : 0.55})`);
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  const img = ctx.getImageData(0, 0, W, H), d = img.data;
  const lift = o.lift != null ? o.lift : 10, warm = o.warm != null ? o.warm : 1, g = o.grain != null ? o.grain : 14;
  const curve = new Uint8ClampedArray(256);
  for (let i = 0; i < 256; i++) { const x = i / 255, s = x * x * (3 - 2 * x); curve[i] = 255 * lerp(x, s, o.contrast != null ? o.contrast : 0.35); }
  for (let i = 0; i < d.length; i += 4) {
    const n = (rnd() - 0.5) * g;
    d[i] = curve[d[i]] * (1 - lift / 255) + lift * 1.15 * warm + n;
    d[i + 1] = curve[d[i + 1]] * (1 - lift / 255) + lift * 0.95 + n;
    d[i + 2] = curve[d[i + 2]] * (1 - lift / 255) + lift * 0.8 / warm + n;
  }
  ctx.putImageData(img, 0, 0);
}

/* Paillettes de soleil sur l'eau */
function glitter(ctx, rnd, cx, y0, y1, spread, color, count) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < count; i++) {
    const t = Math.pow(rnd(), 0.8), y = lerp(y0, y1, t);
    const sp = spread * (0.25 + t * 1.6);
    const x = cx + (rnd() + rnd() + rnd() - 1.5) * sp;
    const w = (4 + rnd() * 26) * (0.4 + t * 1.4), h = 1 + t * 2.4;
    ctx.globalAlpha = (0.25 + rnd() * 0.6) * (1 - t * 0.55);
    ctx.fillStyle = color; ctx.fillRect(x - w / 2, y, w, h);
  }
  ctx.restore();
}

function bokeh(ctx, rnd, W, H, o) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < o.count; i++) {
    const x = rnd() * W, y = o.y0 * H + rnd() * (o.y1 - o.y0) * H;
    const r = o.rmin + Math.pow(rnd(), 2) * (o.rmax - o.rmin);
    const col = o.colors[Math.floor(rnd() * o.colors.length)];
    const a = o.amin + rnd() * (o.amax - o.amin);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(col, a * 0.75)); g.addColorStop(0.82, rgba(col, a)); g.addColorStop(0.92, rgba(col, a * 0.55)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  ctx.restore();
}

function birds(ctx, rnd, list, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineCap = 'round';
  list.forEach(([x, y, s]) => {
    ctx.lineWidth = Math.max(1.5, s * 0.16);
    ctx.beginPath(); ctx.moveTo(x - s, y - s * 0.35); ctx.quadraticCurveTo(x - s * 0.45, y - s * 0.55, x, y);
    ctx.quadraticCurveTo(x + s * 0.45, y - s * 0.55, x + s, y - s * 0.35); ctx.stroke();
  });
  ctx.restore();
}

function pines(ctx, rnd, W, baseY, o) {
  ctx.fillStyle = o.fill;
  for (let x = -20; x < W + 20; x += o.step * (0.6 + rnd() * 0.8)) {
    const h = o.hmin + rnd() * (o.hmax - o.hmin), w = h * (0.28 + rnd() * 0.08), by = baseY + (rnd() - 0.5) * o.jit;
    ctx.beginPath(); ctx.moveTo(x, by - h);
    const tiers = 7;
    for (let i = 1; i <= tiers; i++) { const t = i / tiers; ctx.lineTo(x + w * t * 0.5 + w * 0.12 * t, by - h + h * t - h * 0.04); ctx.lineTo(x + w * t * 0.36, by - h + h * t); }
    for (let i = tiers; i >= 1; i--) { const t = i / tiers; ctx.lineTo(x - w * t * 0.36, by - h + h * t); ctx.lineTo(x - w * t * 0.5 - w * 0.12 * t, by - h + h * t - h * 0.04); }
    ctx.closePath(); ctx.fill();
    ctx.fillRect(x - w * 0.05, by - h * 0.05, w * 0.1, h * 0.1);
  }
}

/* ══════════════════ SCÈNES ══════════════════ */
const SCENES = {};

/* 1. Coucher de soleil sur la plage, couple main dans la main */
SCENES.plage = (ctx, W, H, rnd, N) => {
  const hz = H * 0.62;
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, hz, [[0, '#251a45'], [0.32, '#6b2f63'], [0.62, '#d9645a'], [0.86, '#f6a35c'], [1, '#ffd89a']]);
  ctx.fillRect(0, 0, W, hz);
  const sx = W * 0.6, sy = hz - H * 0.035;
  glow(ctx, sx, sy, W * 0.9, 'rgba(255,170,90,0.55)');
  glow(ctx, sx, sy, W * 0.35, 'rgba(255,214,150,0.8)');
  clouds(ctx, W, H, N, { y: H * 0.05, h: hz * 0.95, sx: 2.2, sy: 9, th: 0.5, k: 3.2, color: [255, 160, 140], alpha: 0.75,
    mask: fy => Math.sin(fy * Math.PI) * 0.9, shade: (fy) => 0.55 + fy * 0.55, mode: 'source-over', ox: 3.1 });
  clouds(ctx, W, H, N, { y: hz * 0.45, h: hz * 0.5, sx: 1.6, sy: 14, th: 0.55, k: 3, color: [255, 205, 150], alpha: 0.6, mask: fy => Math.sin(fy * Math.PI), mode: 'lighter', ox: 7 });
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#fff6dc'; ctx.beginPath(); ctx.arc(sx, sy, W * 0.045, 0, 7); ctx.fill(); ctx.restore();
  glow(ctx, sx, sy, W * 0.12, 'rgba(255,240,200,0.9)');
  // mer
  const sb = H * 0.84;
  ctx.fillStyle = vgrad(ctx, 0, hz, 0, sb, [[0, '#f2a865'], [0.12, '#c8645c'], [0.5, '#6e3352'], [1, '#331a35']]);
  ctx.fillRect(0, hz, W, sb - hz);
  ctx.save(); ctx.globalAlpha = 0.5;
  for (let y = hz + 2; y < sb; y += 3 + (y - hz) * 0.035) {
    const k = (y - hz) / (sb - hz);
    ctx.fillStyle = `rgba(30,10,30,${0.15 + k * 0.25})`;
    for (let x = 0; x < W; x += 40 + rnd() * 80) ctx.fillRect(x, y, 30 + rnd() * 120 * (0.3 + k), 1 + k * 2);
  }
  ctx.restore();
  glitter(ctx, rnd, sx, hz + 2, sb, W * 0.05, '#ffe2a8', 2200);
  glow(ctx, sx, hz + 10, W * 0.25, 'rgba(255,200,120,0.35)');
  // plage (sable mouillé réfléchissant)
  ctx.fillStyle = vgrad(ctx, 0, sb, 0, H, [[0, '#a45a4b'], [0.35, '#6b3638'], [1, '#2b1518']]);
  ctx.fillRect(0, sb, W, H - sb);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const rg = ctx.createLinearGradient(sx - W * 0.2, 0, sx + W * 0.2, 0);
  rg.addColorStop(0, 'rgba(255,170,100,0)'); rg.addColorStop(0.5, 'rgba(255,190,120,0.35)'); rg.addColorStop(1, 'rgba(255,170,100,0)');
  ctx.fillStyle = rg; ctx.fillRect(0, sb, W, H - sb); ctx.restore();
  // écume
  ctx.save(); ctx.strokeStyle = 'rgba(255,235,215,0.55)'; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x <= W; x += 8) { const y = sb + 8 + (N.n1(x / W * 6) - 0.5) * 30; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke(); ctx.globalAlpha = 0.25; ctx.lineWidth = 10; ctx.filter = 'blur(6px)'; ctx.stroke(); ctx.restore();
  // couple
  const fy = H * 0.935, fh = H * 0.3, fx = W * 0.4;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, armR: [[1.18, -4.6], [1.36, -3.7]] });
    stand(c, { x: fx + fh / 7.6 * 2.62, y: fy, h: fh * 0.93, fem: true, hair: 'long', dress: true, armL: [[-1.12, -4.6], [-1.28, -3.75]], tilt: -0.25 });
  };
  const sil = silhouette(ctx, draw, { fill: '#150c0c', rim: 'rgba(255,190,130,0.9)', rimDx: -3, rimDy: 0, blur: 0.8 });
  reflect(ctx, sil, fy, 0.28, 3);
  birds(ctx, rnd, [[W * 0.28, H * 0.22, 14], [W * 0.31, H * 0.2, 10], [W * 0.25, H * 0.25, 9], [W * 0.75, H * 0.3, 8]], 'rgba(30,12,30,0.75)');
  grade(ctx, W, H, rnd, { lift: 12, contrast: 0.3 });
};

/* 2. Sur la colline : assis de dos face aux montagnes, heure dorée */
SCENES.colline = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H * 0.7, [[0, '#f3c99a'], [0.45, '#f4b383'], [1, '#f7d6a8']]);
  ctx.fillRect(0, 0, W, H);
  const sx = W * 0.22, sy = H * 0.43;
  glow(ctx, sx, sy, W * 1.1, 'rgba(255,190,120,0.5)');
  glow(ctx, sx, sy, W * 0.3, 'rgba(255,240,200,0.95)');
  glow(ctx, sx, sy, W * 0.07, 'rgba(255,255,240,1)');
  const layers = [
    { base: H * 0.5, amp: H * 0.12, freq: 2.2, seed: 1.3, fill: '#efb48f', jag: 0.3 },
    { base: H * 0.56, amp: H * 0.12, freq: 2.8, seed: 4.1, fill: '#d99178' },
    { base: H * 0.63, amp: H * 0.1, freq: 3.3, seed: 8.7, fill: '#b56f68' },
    { base: H * 0.7, amp: H * 0.09, freq: 3.9, seed: 2.2, fill: '#82505a' },
    { base: H * 0.77, amp: H * 0.07, freq: 4.4, seed: 6.6, fill: '#523543' },
  ];
  layers.forEach((l, i) => {
    ridge(ctx, W, H, N, l);
    const mg = ctx.createLinearGradient(0, l.base - l.amp * 0.2, 0, l.base + H * 0.08);
    mg.addColorStop(0, 'rgba(255,220,190,0)'); mg.addColorStop(1, `rgba(255,214,180,${0.35 - i * 0.04})`);
    ctx.fillStyle = mg; ctx.fillRect(0, l.base - l.amp, W, H);
  });
  // rayons
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 14; i++) {
    const a = -0.25 + i * 0.07 + rnd() * 0.03, len = W * 1.4;
    ctx.beginPath(); ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.cos(a) * len, sy + Math.sin(a) * len); ctx.lineTo(sx + Math.cos(a + 0.025) * len, sy + Math.sin(a + 0.025) * len);
    ctx.closePath(); ctx.fillStyle = `rgba(255,220,160,${0.04 + rnd() * 0.05})`; ctx.fill();
  }
  ctx.restore();
  // colline au premier plan
  ctx.fillStyle = '#1b1110';
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 6) { const t = x / W; ctx.lineTo(x, H * 0.86 - Math.sin(t * Math.PI * 0.9 + 0.3) * H * 0.05 + (N.n1(t * 9) - 0.5) * 12); }
  ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#1b1110'; ctx.lineWidth = 2;
  for (let x = 0; x < W; x += 3) {
    const t = x / W, y = H * 0.86 - Math.sin(t * Math.PI * 0.9 + 0.3) * H * 0.05 + (N.n1(t * 9) - 0.5) * 12;
    const h = 6 + rnd() * 22; ctx.beginPath(); ctx.moveTo(x, y + 3); ctx.quadraticCurveTo(x + (rnd() - 0.5) * 8, y - h * 0.5, x + (rnd() - 0.3) * 10, y - h); ctx.stroke();
  }
  const gy = H * 0.86 - Math.sin(0.58 * Math.PI * 0.9 + 0.3) * H * 0.05 + 4, fh = H * 0.32;
  const u = fh / 7.6;
  const draw = c => {
    sit(c, { x: W * 0.55, y: gy, h: fh, armAround: 2.0 });
    sit(c, { x: W * 0.55 + u * 1.75, y: gy, h: fh * 0.93, fem: true, hair: 'long', lean: -0.55 });
  };
  silhouette(ctx, draw, { fill: '#170f0e', rim: 'rgba(255,214,160,0.95)', rimDx: 3, rimDy: 1, blur: 0.7 });
  birds(ctx, rnd, [[W * 0.7, H * 0.2, 12], [W * 0.74, H * 0.18, 9], [W * 0.66, H * 0.23, 8]], 'rgba(90,50,50,0.6)');
  grade(ctx, W, H, rnd, { lift: 14, contrast: 0.25 });
};

/* 3. Ville la nuit : bokeh, pluie, parapluie */
SCENES.ville = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#0a0d2a'], [0.5, '#1d1440'], [0.75, '#3a1838'], [1, '#120a18']]);
  ctx.fillRect(0, 0, W, H);
  // immeubles flous
  const b = off(W, H), bx = b.getContext('2d');
  for (let i = 0; i < 26; i++) {
    const w = W * (0.06 + rnd() * 0.12), h = H * (0.25 + rnd() * 0.45), x = rnd() * W, y = H * 0.72 - h;
    bx.fillStyle = `rgba(${15 + rnd() * 20},${12 + rnd() * 15},${40 + rnd() * 30},1)`; bx.fillRect(x, y, w, h + H * 0.1);
    for (let wy = y + 14; wy < H * 0.7; wy += 22) for (let wx = x + 8; wx < x + w - 10; wx += 18) {
      if (rnd() < 0.42) { bx.fillStyle = rnd() < 0.8 ? `rgba(255,${180 + rnd() * 50},${90 + rnd() * 60},${0.5 + rnd() * 0.5})` : 'rgba(160,200,255,0.7)'; bx.fillRect(wx, wy, 9, 12); }
    }
  }
  ctx.save(); ctx.filter = 'blur(9px)'; ctx.globalAlpha = 0.85; ctx.drawImage(b, 0, 0); ctx.restore();
  bokeh(ctx, rnd, W, H, { count: 170, y0: 0.15, y1: 0.95, rmin: 10, rmax: 90, amin: 0.08, amax: 0.35, colors: ['#ffb347', '#ff7f50', '#ffd27f', '#ff6f91', '#7fb2ff', '#ffe0a0'] });
  // sol mouillé : reflets étirés
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 90; i++) {
    const x = rnd() * W, y = H * 0.74 + rnd() * H * 0.05, col = ['#ffb347', '#ff7f50', '#ffd27f', '#ff6f91', '#7fb2ff'][Math.floor(rnd() * 5)];
    const g = ctx.createLinearGradient(0, y, 0, y + H * 0.25); g.addColorStop(0, rgba(col, 0.28)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.fillRect(x, y, 6 + rnd() * 18, H * 0.25);
  }
  ctx.restore();
  ctx.fillStyle = vgrad(ctx, 0, H * 0.74, 0, H, [[0, 'rgba(10,6,20,0.2)'], [1, 'rgba(8,4,12,0.75)']]); ctx.fillRect(0, H * 0.74, W, H * 0.26);
  // couple sous un parapluie, de dos
  const fy = H * 0.93, fh = H * 0.4, fx = W * 0.42, u = fh / 7.6;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, coat: true, armR: [[1.0, -4.9], [0.85, -5.6]] });
    stand(c, { x: fx + u * 2.05, y: fy, h: fh * 0.92, fem: true, hair: 'long', coat: true, tilt: -0.5, armL: [[-0.95, -4.6], [-1.15, -3.8]] });
    // parapluie
    const ux = fx + u * 1.05, uy = fy - fh * 1.06;
    c.beginPath(); c.moveTo(ux - u * 2.9, uy + u * 0.9);
    c.quadraticCurveTo(ux - u * 2.4, uy - u * 1.5, ux, uy - u * 1.7);
    c.quadraticCurveTo(ux + u * 2.4, uy - u * 1.5, ux + u * 2.9, uy + u * 0.9);
    for (let k = 5; k >= 0; k--) { const xk = ux - u * 2.9 + k * u * 5.8 / 6; c.quadraticCurveTo(xk + u * 0.48, uy + u * 0.55, xk, uy + u * 0.9); }
    c.closePath(); c.fill();
    c.fillRect(ux - u * 0.05, uy - u * 2.0, u * 0.1, u * 0.4);
    c.lineWidth = u * 0.1; c.strokeStyle = c.fillStyle; c.beginPath(); c.moveTo(ux, uy); c.lineTo(fx + u * 0.85, fy - u * 5.6); c.stroke();
  };
  silhouette(ctx, draw, { fill: '#07040a', rim: 'rgba(255,170,120,0.55)', rimDx: 1.5, rimDy: -1, blur: 1.1 });
  // pluie
  ctx.save(); ctx.strokeStyle = 'rgba(220,230,255,0.22)'; ctx.lineWidth = 1.4;
  for (let i = 0; i < 900; i++) { const x = rnd() * W, y = rnd() * H, l = 18 + rnd() * 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - l * 0.18, y + l); ctx.stroke(); }
  ctx.restore();
  grade(ctx, W, H, rnd, { lift: 8, contrast: 0.3, warm: 0.95 });
};

/* 4. Paris au crépuscule */
SCENES.paris = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H * 0.8, [[0, '#4f5d97'], [0.45, '#a78bb0'], [0.75, '#efb2a6'], [1, '#f8d2a6']]);
  ctx.fillRect(0, 0, W, H);
  glow(ctx, W * 0.7, H * 0.78, W * 0.8, 'rgba(255,190,150,0.45)');
  clouds(ctx, W, H, N, { y: H * 0.08, h: H * 0.55, sx: 2.5, sy: 7, th: 0.55, k: 2.6, color: [255, 190, 190], alpha: 0.55, mask: fy => Math.sin(fy * Math.PI), shade: fy => 0.75 + fy * 0.35, mode: 'source-over', ox: 11 });
  // tour (silhouette approximée)
  const tx = W * 0.62, base = H * 0.86, th = H * 0.72, top = base - th;
  const T = (f) => top + th * f;
  const halfW = f => { // demi-largeur selon la hauteur relative f (0 = sommet)
    if (f < 0.06) return W * 0.004;
    if (f < 0.55) return lerp(W * 0.012, W * 0.05, Math.pow((f - 0.06) / 0.49, 1.6));
    return lerp(W * 0.05, W * 0.2, Math.pow((f - 0.55) / 0.45, 1.9));
  };
  const twr = off(W, H), tc = twr.getContext('2d');
  tc.fillStyle = '#2a1d33';
  tc.beginPath(); tc.moveTo(tx, top - H * 0.03);
  for (let f = 0; f <= 1.0001; f += 0.01) tc.lineTo(tx + halfW(f), T(f));
  for (let f = 1; f >= 0; f -= 0.01) tc.lineTo(tx - halfW(f), T(f));
  tc.closePath(); tc.fill();
  // arche
  tc.globalCompositeOperation = 'destination-out';
  tc.beginPath(); tc.moveTo(tx - W * 0.13, base + 2);
  tc.quadraticCurveTo(tx - W * 0.11, T(0.8), tx, T(0.79)); tc.quadraticCurveTo(tx + W * 0.11, T(0.8), tx + W * 0.13, base + 2); tc.closePath(); tc.fill();
  // treillis
  tc.globalCompositeOperation = 'destination-out'; tc.lineWidth = 2.2;
  for (let f = 0.1; f < 0.98; f += 0.018) {
    const w1 = halfW(f) * 0.82, w2 = halfW(f + 0.018) * 0.82;
    tc.beginPath(); tc.moveTo(tx - w1, T(f)); tc.lineTo(tx + w2 * 0.15, T(f + 0.018)); tc.moveTo(tx + w1, T(f)); tc.lineTo(tx - w2 * 0.15, T(f + 0.018)); tc.stroke();
  }
  tc.globalCompositeOperation = 'source-over'; tc.fillStyle = '#2a1d33';
  [[0.55, 0.012], [0.79, 0.016], [0.3, 0.008]].forEach(([f, hh]) => tc.fillRect(tx - halfW(f) * 1.12, T(f) - H * hh / 2, halfW(f) * 2.24, H * hh));
  ctx.save(); ctx.filter = 'blur(0.8px)'; ctx.globalAlpha = 0.92; ctx.drawImage(twr, 0, 0); ctx.restore();
  // toits haussmanniens au premier plan
  ctx.fillStyle = '#1a1220';
  ctx.beginPath(); ctx.moveTo(0, H);
  let x = 0;
  while (x < W) {
    const w = W * (0.12 + rnd() * 0.12), h = H * (0.1 + rnd() * 0.07), y = H - h - H * 0.03;
    ctx.lineTo(x, y + H * 0.03); ctx.lineTo(x + w * 0.08, y); ctx.lineTo(x + w * 0.92, y); ctx.lineTo(x + w, y + H * 0.03);
    x += w;
  }
  ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 16; i++) {
    const cx = rnd() * W, cy = H * (0.8 + rnd() * 0.05);
    ctx.fillRect(cx, cy, W * 0.022, H * 0.06);
    for (let k = 0; k < 3; k++) ctx.fillRect(cx + k * W * 0.007 + 2, cy - H * 0.012, W * 0.005, H * 0.014);
  }
  // fenêtres chaudes
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 40; i++) { const wx = rnd() * W, wy = H * (0.9 + rnd() * 0.08); ctx.fillStyle = `rgba(255,${170 + rnd() * 60},90,${0.35 + rnd() * 0.4})`; ctx.fillRect(wx, wy, W * 0.008, H * 0.012); }
  ctx.restore();
  birds(ctx, rnd, [[W * 0.2, H * 0.25, 12], [W * 0.24, H * 0.23, 9], [W * 0.17, H * 0.28, 8]], 'rgba(40,30,60,0.7)');
  grade(ctx, W, H, rnd, { lift: 12, contrast: 0.22, warm: 1.0 });
};

/* 5. Montgolfières à l'aube */
SCENES.montgolfieres = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#7fa4c9'], [0.45, '#f1c3a2'], [0.7, '#f6d8b0'], [1, '#e9b08a']]);
  ctx.fillRect(0, 0, W, H);
  glow(ctx, W * 0.3, H * 0.62, W * 0.9, 'rgba(255,215,160,0.6)');
  glow(ctx, W * 0.3, H * 0.62, W * 0.15, 'rgba(255,250,225,0.95)');
  [{ base: H * 0.7, amp: H * 0.06, freq: 2, seed: 3, fill: '#c99a8e' }, { base: H * 0.78, amp: H * 0.06, freq: 3, seed: 7, fill: '#9c7272' }, { base: H * 0.87, amp: H * 0.05, freq: 3.6, seed: 1, fill: '#5e4249' }].forEach((l, i) => {
    ridge(ctx, W, H, N, l);
    ctx.fillStyle = vgrad(ctx, 0, l.base - l.amp, 0, l.base + H * 0.06, [[0, 'rgba(255,230,210,0)'], [1, `rgba(255,232,214,${0.5 - i * 0.12})`]]);
    ctx.fillRect(0, l.base - l.amp, W, H);
  });
  const balloons = [[0.62, 0.28, 0.17, ['#c0392b', '#f39c12']], [0.25, 0.4, 0.09, ['#2e86c1', '#f4d03f']], [0.82, 0.52, 0.07, ['#8e44ad', '#f5b7b1']], [0.45, 0.6, 0.05, ['#e67e22', '#fdebd0']], [0.12, 0.2, 0.06, ['#16a085', '#f9e79f']], [0.92, 0.18, 0.045, ['#d35400', '#fae5d3']]];
  balloons.forEach(([bx, by, br, cols]) => {
    const x = bx * W, y = by * H, r = br * W;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + r * 1.55);
    ctx.bezierCurveTo(x - r * 0.35, y + r * 1.2, x - r * 1.05, y + r * 0.55, x - r, y - r * 0.1);
    ctx.bezierCurveTo(x - r * 0.95, y - r * 0.95, x - r * 0.4, y - r * 1.15, x, y - r * 1.15);
    ctx.bezierCurveTo(x + r * 0.4, y - r * 1.15, x + r * 0.95, y - r * 0.95, x + r, y - r * 0.1);
    ctx.bezierCurveTo(x + r * 1.05, y + r * 0.55, x + r * 0.35, y + r * 1.2, x, y + r * 1.55);
    ctx.closePath(); ctx.clip();
    for (let k = -6; k <= 6; k++) { ctx.fillStyle = k % 2 ? cols[0] : cols[1]; ctx.beginPath(); ctx.ellipse(x, y, Math.abs(k) * r * 0.17 + r * 0.09, r * 1.6, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = cols[0]; ctx.beginPath(); ctx.ellipse(x, y, r * 0.09, r * 1.6, 0, 0, 7); ctx.fill();
    // volume : lumière rasante du soleil (en bas à gauche) + ombre propre
    const sh = ctx.createRadialGradient(x - r * 0.45, y - r * 0.2, r * 0.1, x, y, r * 1.5);
    sh.addColorStop(0, 'rgba(255,245,220,0.45)'); sh.addColorStop(0.45, 'rgba(255,230,200,0.05)'); sh.addColorStop(1, 'rgba(50,20,35,0.55)');
    ctx.fillStyle = sh; ctx.fillRect(x - r * 1.2, y - r * 1.3, r * 2.4, r * 3);
    ctx.fillStyle = 'rgba(40,15,25,0.25)'; ctx.fillRect(x - r * 1.2, y + r * 0.9, r * 2.4, r);
    ctx.restore();
    ctx.strokeStyle = 'rgba(60,35,30,0.8)'; ctx.lineWidth = Math.max(1, r * 0.02);
    ctx.beginPath(); ctx.moveTo(x - r * 0.25, y + r * 1.42); ctx.lineTo(x - r * 0.16, y + r * 1.75); ctx.moveTo(x + r * 0.25, y + r * 1.42); ctx.lineTo(x + r * 0.16, y + r * 1.75); ctx.stroke();
    ctx.fillStyle = '#5a3a2c'; ctx.fillRect(x - r * 0.17, y + r * 1.75, r * 0.34, r * 0.24);
  });
  grade(ctx, W, H, rnd, { lift: 14, contrast: 0.2, vignette: 0.4 });
};

/* 6. Sous les étoiles : tente, feu de camp, voie lactée */
SCENES.etoiles = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#04061a'], [0.55, '#0d1438'], [0.8, '#2a2346'], [1, '#090713']]);
  ctx.fillRect(0, 0, W, H);
  // voie lactée : bande diagonale de bruit, avec des « lanes » de poussière sombre
  const X0 = W * 0.0, Y0 = H * 0.78, X1 = W * 1.0, Y1 = H * 0.02, LL = Math.hypot(X1 - X0, Y1 - Y0);
  const bandAt = (px, py) => Math.exp(-Math.pow(Math.abs((py - Y0) * (X1 - X0) - (px - X0) * (Y1 - Y0)) / LL / (W * 0.11), 2));
  {
    const lw = 360, lh = Math.round(lw * H / W), c = off(lw, lh), cx = c.getContext('2d'), img = cx.createImageData(lw, lh);
    for (let y = 0; y < lh; y++) for (let x = 0; x < lw; x++) {
      const px = x / lw * W, py = y / lh * H, b = bandAt(px, py);
      const n = N.fbm(px / W * 5, py / H * 5, 6), dust = clamp((N.fbm(px / W * 11 + 3, py / H * 11, 5) - 0.45) * 3, 0, 1);
      const a = clamp(b * (0.25 + n * 0.9) * (1 - dust * 0.75 * b), 0, 1), i = (y * lw + x) * 4;
      const warm = clamp(b * 1.4 - 0.4, 0, 1);
      img.data[i] = lerp(150, 255, warm); img.data[i + 1] = lerp(150, 225, warm); img.data[i + 2] = lerp(255, 200, warm); img.data[i + 3] = a * 150;
    }
    cx.putImageData(img, 0, 0);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(c, 0, 0, W, H); ctx.restore();
  }
  for (let i = 0; i < 2600; i++) {
    let x = rnd() * W, y = rnd() * H * 0.78;
    if (rnd() < 0.5) { // étoiles plus denses dans la bande
      const t = rnd(), s = (rnd() + rnd() + rnd() - 1.5) * W * 0.12;
      x = lerp(X0, X1, t) + s * (Y1 - Y0) / LL * -1; y = lerp(Y0, Y1, t) + s * (X1 - X0) / LL;
      if (y > H * 0.78) continue;
    }
    const r = Math.pow(rnd(), 6) * 2.6 + 0.4;
    ctx.fillStyle = `rgba(255,${235 + rnd() * 20},${220 + rnd() * 35},${0.3 + rnd() * 0.7})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    if (r > 2.2) glow(ctx, x, y, r * 6, 'rgba(200,210,255,0.5)');
  }
  ridge(ctx, W, H, N, { base: H * 0.76, amp: H * 0.12, freq: 2.4, seed: 5, fill: '#0b0a16', jag: 0.5 });
  ctx.fillStyle = '#07060d'; ctx.fillRect(0, H * 0.84, W, H);
  ctx.beginPath(); ctx.moveTo(0, H * 0.85);
  for (let x = 0; x <= W; x += 8) ctx.lineTo(x, H * 0.84 + (N.n1(x / W * 5 + 3) - 0.5) * 30); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  // tente lumineuse
  const tx = W * 0.62, ty = H * 0.86, tw = W * 0.2, th = H * 0.15;
  const tg = ctx.createLinearGradient(tx - tw / 2, ty - th, tx + tw / 2, ty);
  tg.addColorStop(0, '#ffcf7a'); tg.addColorStop(0.6, '#f39a3c'); tg.addColorStop(1, '#a85320');
  ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(tx - tw / 2, ty); ctx.lineTo(tx, ty - th); ctx.lineTo(tx + tw / 2, ty); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,240,200,0.85)'; ctx.beginPath(); ctx.moveTo(tx - tw * 0.12, ty); ctx.lineTo(tx, ty - th * 0.62); ctx.lineTo(tx + tw * 0.12, ty); ctx.closePath(); ctx.fill();
  glow(ctx, tx, ty - th * 0.4, W * 0.35, 'rgba(255,170,80,0.45)');
  // feu de camp
  const fx = W * 0.36, fy = H * 0.88;
  glow(ctx, fx, fy - 10, W * 0.3, 'rgba(255,120,40,0.55)');
  glow(ctx, fx, fy - 14, W * 0.05, 'rgba(255,230,160,1)');
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 70; i++) { const a = rnd() * Math.PI, d = rnd() * H * 0.2; ctx.fillStyle = `rgba(255,${150 + rnd() * 80},60,${0.4 + rnd() * 0.6})`; ctx.fillRect(fx + (rnd() - 0.5) * 40 + Math.cos(a) * d * 0.15, fy - 20 - d, 2.2, 2.2); }
  ctx.restore();
  const u = H * 0.2 / 7.6;
  const draw = c => {
    sit(c, { x: fx - u * 2.7, y: fy + 6, h: H * 0.2, hat: true, armAround: 1.9 });
    sit(c, { x: fx - u * 1.05, y: fy + 6, h: H * 0.19, fem: true, hair: 'long', lean: -0.5 });
  };
  silhouette(ctx, draw, { fill: '#070509', rim: 'rgba(255,150,70,0.95)', rimDx: 3, rimDy: 0, blur: 0.7 });
  grade(ctx, W, H, rnd, { lift: 6, contrast: 0.25, warm: 1.0, vignette: 0.5 });
};

/* 7. Lac miroir et canoë */
SCENES.lac = (ctx, W, H, rnd, N) => {
  const hz = H * 0.55;
  const sky = c => {
    c.fillStyle = vgrad(c, 0, 0, 0, hz, [[0, '#6f8fbf'], [0.5, '#c6b0c8'], [0.85, '#f6c7a6'], [1, '#fde0b8']]);
    c.fillRect(0, 0, W, hz);
    glow(c, W * 0.5, hz, W * 0.7, 'rgba(255,210,170,0.55)');
    clouds(c, W, hz, N, { y: hz * 0.05, h: hz * 0.7, sx: 2, sy: 6, th: 0.56, k: 2.4, color: [255, 214, 200], alpha: 0.55, mask: fy => Math.sin(fy * Math.PI), mode: 'source-over', ox: 21 });
    ridge(c, W, hz, N, { base: hz * 0.78, amp: hz * 0.42, freq: 1.8, seed: 2.5, fill: '#8f87a6', jag: 0.6, peak: t => Math.exp(-Math.pow((t - 0.42) / 0.12, 2)) * hz * 0.22 });
    c.fillStyle = vgrad(c, 0, hz * 0.5, 0, hz, [[0, 'rgba(255,225,215,0)'], [1, 'rgba(255,228,214,0.55)']]); c.fillRect(0, hz * 0.4, W, hz);
    ridge(c, W, hz, N, { base: hz * 0.93, amp: hz * 0.12, freq: 3, seed: 7.7, fill: '#4f4a62', jag: 0.3 });
    pines(c, rnd, W, hz + 2, { fill: '#26233a', step: W * 0.016, hmin: hz * 0.06, hmax: hz * 0.16, jit: 6 });
  };
  const s = off(W, Math.ceil(hz) + 2), sc = s.getContext('2d'); sky(sc);
  ctx.drawImage(s, 0, 0);
  // reflet
  ctx.save(); ctx.translate(0, 2 * hz); ctx.scale(1, -1); ctx.globalAlpha = 0.82; ctx.filter = 'blur(2.5px)'; ctx.drawImage(s, 0, 0); ctx.restore();
  ctx.fillStyle = vgrad(ctx, 0, hz, 0, H, [[0, 'rgba(40,40,70,0.05)'], [1, 'rgba(25,22,40,0.65)']]); ctx.fillRect(0, hz, W, H - hz);
  ctx.save(); ctx.globalAlpha = 0.35;
  for (let y = hz + 4; y < H; y += 4 + (y - hz) * 0.05) { ctx.fillStyle = 'rgba(255,230,210,0.25)'; for (let x = rnd() * 80; x < W; x += 60 + rnd() * 140) ctx.fillRect(x, y, 20 + rnd() * 90, 1.2); }
  ctx.restore();
  // brume
  clouds(ctx, W, H, N, { y: hz - H * 0.05, h: H * 0.12, sx: 3, sy: 4, th: 0.4, k: 1.6, color: [255, 236, 226], alpha: 0.5, mask: fy => Math.sin(fy * Math.PI), mode: 'source-over', ox: 5 });
  // canoë
  const cx = W * 0.5, cy = H * 0.74, cw = W * 0.22, u = H * 0.16 / 7.6;
  const draw = c => {
    c.beginPath(); c.moveTo(cx - cw / 2, cy - 6); c.quadraticCurveTo(cx, cy + cw * 0.09, cx + cw / 2, cy - 6); c.quadraticCurveTo(cx, cy + cw * 0.03, cx - cw / 2, cy - 6); c.fill();
    sit(c, { x: cx - cw * 0.2, y: cy - 2, h: H * 0.16, hat: false });
    sit(c, { x: cx + cw * 0.18, y: cy - 2, h: H * 0.15, fem: true, hair: 'bun' });
    c.lineWidth = u * 0.16; c.strokeStyle = c.fillStyle; c.beginPath(); c.moveTo(cx - cw * 0.28, cy - u * 2.4); c.lineTo(cx - cw * 0.05, cy + u * 1.2); c.stroke();
  };
  const sil = silhouette(ctx, draw, { fill: '#141222', blur: 0.6 });
  reflect(ctx, sil, cy + 3, 0.35, 2.5);
  ctx.save(); ctx.strokeStyle = 'rgba(255,230,210,0.35)'; ctx.lineWidth = 1.5;
  for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.ellipse(cx, cy + 6, cw * 0.55 * i * 0.6, 6 * i * 0.6, 0, 0, 7); ctx.stroke(); }
  ctx.restore();
  grade(ctx, W, H, rnd, { lift: 14, contrast: 0.22, warm: 1.0, vignette: 0.45 });
};

/* 8. Grande roue à l'heure bleue */
SCENES.granderoue = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#0e1846'], [0.5, '#3b2a6b'], [0.8, '#a2507a'], [1, '#e3896f']]);
  ctx.fillRect(0, 0, W, H);
  const cx = W * 0.56, cy = H * 0.42, R = W * 0.42;
  ctx.save(); ctx.strokeStyle = 'rgba(20,12,40,0.9)'; ctx.lineWidth = W * 0.006;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, R * 0.93, 0, 7); ctx.stroke();
  ctx.lineWidth = W * 0.003;
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
  ctx.lineWidth = W * 0.012; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - R * 0.55, H); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * 0.55, H); ctx.stroke();
  ctx.restore();
  // lumières
  for (let i = 0; i < 96; i++) {
    const a = i / 96 * Math.PI * 2, col = i % 3 === 0 ? '#ffd27f' : i % 3 === 1 ? '#ff8fb1' : '#9fd0ff';
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; glow(ctx, x, y, W * 0.025, rgba(col, 0.9)); ctx.fillStyle = '#fff6e0'; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 7); ctx.fill();
  }
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2, x = cx + Math.cos(a) * R * 0.62, y = cy + Math.sin(a) * R * 0.62; glow(ctx, x, y, W * 0.016, 'rgba(255,220,150,0.8)');
    const x2 = cx + Math.cos(a) * R, y2 = cy + Math.sin(a) * R; ctx.fillStyle = '#1b1030'; ctx.fillRect(x2 - W * 0.018, y2, W * 0.036, W * 0.03); glow(ctx, x2, y2 + W * 0.015, W * 0.03, 'rgba(255,200,120,0.6)');
  }
  glow(ctx, cx, cy, W * 0.06, 'rgba(255,240,200,0.9)');
  bokeh(ctx, rnd, W, H, { count: 60, y0: 0.7, y1: 1.0, rmin: 20, rmax: 110, amin: 0.1, amax: 0.35, colors: ['#ffb347', '#ff8fb1', '#ffd27f', '#9fd0ff'] });
  const fy = H * 0.96, fh = H * 0.25, fx = W * 0.33, u = fh / 7.6;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, coat: true, armR: [[1.18, -4.6], [1.36, -3.7]] });
    stand(c, { x: fx + u * 2.62, y: fy, h: fh * 0.92, fem: true, hair: 'long', dress: true, armL: [[-1.12, -4.6], [-1.28, -3.75]], armR: [[1.4, -5.6], [2.1, -6.6]], tilt: 0.15 });
  };
  silhouette(ctx, draw, { fill: '#08050f', rim: 'rgba(255,170,200,0.6)', rimDx: -1.5, rimDy: 0, blur: 0.9 });
  grade(ctx, W, H, rnd, { lift: 8, contrast: 0.25, warm: 0.95 });
};

/* 9. Champ de lavande, couple qui marche */
SCENES.lavande = (ctx, W, H, rnd, N) => {
  const hz = H * 0.5;
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, hz, [[0, '#8a7bb8'], [0.5, '#e6a6a0'], [1, '#ffd69a']]);
  ctx.fillRect(0, 0, W, hz);
  const sx = W * 0.52, sy = hz - H * 0.02;
  glow(ctx, sx, sy, W * 0.9, 'rgba(255,190,120,0.5)'); glow(ctx, sx, sy, W * 0.12, 'rgba(255,248,220,1)');
  ctx.fillStyle = '#7a5f8c'; ctx.fillRect(0, hz, W, H - hz);
  // rangs en perspective
  const vx = sx, vy = hz;
  for (let i = -24; i <= 24; i++) {
    const xb = W / 2 + i * W * 0.11;
    const g = ctx.createLinearGradient(0, vy, 0, H); g.addColorStop(0, '#9c7fb5'); g.addColorStop(0.4, '#6c4a8f'); g.addColorStop(1, '#3a2353');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(vx + (xb - vx) * 0.002, vy); ctx.lineTo(xb - W * 0.035, H); ctx.lineTo(xb + W * 0.035, H); ctx.closePath(); ctx.fill();
  }
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 2500; i++) { const t = Math.pow(rnd(), 1.6), y = lerp(vy, H, t), x = vx + (rnd() - 0.5) * W * 2.4 * t; ctx.fillStyle = `rgba(${150 + rnd() * 60},${110 + rnd() * 40},${200},${0.15 + t * 0.3})`; ctx.fillRect(x, y, 2 + t * 6, 2 + t * 10); }
  ctx.restore();
  glow(ctx, sx, hz, W * 0.5, 'rgba(255,200,140,0.35)');
  ctx.fillStyle = vgrad(ctx, 0, hz, 0, hz + H * 0.06, [[0, 'rgba(255,214,170,0.7)'], [1, 'rgba(255,214,170,0)']]); ctx.fillRect(0, hz, W, H * 0.06);
  const fy = H * 0.66, fh = H * 0.17, fx = W * 0.47, u = fh / 7.6;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, armR: [[1.18, -4.6], [1.36, -3.7]], legs: [[-0.3, -1.9, -0.28, -0.35], [0.38, -1.8, 0.42, 0.05]] });
    stand(c, { x: fx + u * 2.62, y: fy, h: fh * 0.92, fem: true, hair: 'long', dress: true, armL: [[-1.12, -4.6], [-1.28, -3.75]], legs: [[-0.32, -1.85, -0.3, 0.05], [0.34, -1.9, 0.3, -0.3]] });
  };
  silhouette(ctx, draw, { fill: '#1d1024', rim: 'rgba(255,214,160,0.9)', rimDx: -2, blur: 0.6 });
  grade(ctx, W, H, rnd, { lift: 12, contrast: 0.25 });
};

/* 10. Neige et guirlandes */
SCENES.neige = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#0d1528'], [0.6, '#1d2a45'], [1, '#2e3550']]);
  ctx.fillRect(0, 0, W, H);
  // façades floues
  const b = off(W, H), bx = b.getContext('2d');
  [[0, 0.35, '#2a2236'], [0.6, 0.4, '#251f33']].forEach(([x0, w, col]) => {
    bx.fillStyle = col; bx.fillRect(x0 * W, H * 0.1, w * W, H * 0.8);
    for (let wy = H * 0.18; wy < H * 0.75; wy += H * 0.12) for (let wx = x0 * W + W * 0.04; wx < (x0 + w) * W - W * 0.08; wx += W * 0.1) { bx.fillStyle = rnd() < 0.7 ? 'rgba(255,190,110,0.9)' : 'rgba(255,220,170,0.4)'; bx.fillRect(wx, wy, W * 0.05, H * 0.07); }
  });
  ctx.save(); ctx.filter = 'blur(10px)'; ctx.drawImage(b, 0, 0); ctx.restore();
  // guirlandes
  for (let k = 0; k < 4; k++) {
    const y0 = H * (0.12 + k * 0.1), sag = H * (0.05 + k * 0.015);
    for (let i = 0; i <= 26; i++) {
      const t = i / 26, x = t * W, y = y0 + Math.sin(t * Math.PI) * sag + (rnd() - 0.5) * 4;
      glow(ctx, x, y, W * 0.03, 'rgba(255,200,110,0.7)'); ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill();
    }
  }
  // sol enneigé
  ctx.fillStyle = vgrad(ctx, 0, H * 0.82, 0, H, [[0, '#8a8aa0'], [1, '#c7c4d6']]); ctx.fillRect(0, H * 0.82, W, H * 0.18);
  glow(ctx, W * 0.5, H * 0.85, W * 0.6, 'rgba(255,190,120,0.25)');
  const fy = H * 0.92, fh = H * 0.36, fx = W * 0.4, u = fh / 7.6;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, hat: true, coat: true, armR: [[1.18, -4.6], [1.36, -3.7]] });
    stand(c, { x: fx + u * 2.5, y: fy, h: fh * 0.92, fem: true, hair: 'long', hat: true, coat: true, tilt: -0.45, armL: [[-1.12, -4.6], [-1.24, -3.75]] });
  };
  silhouette(ctx, draw, { fill: '#0c0a14', rim: 'rgba(255,200,140,0.55)', rimDx: 1.5, blur: 1.1 });
  // flocons
  ctx.save();
  for (let i = 0; i < 700; i++) { const x = rnd() * W, y = rnd() * H, r = Math.pow(rnd(), 3) * 9 + 1; ctx.fillStyle = `rgba(255,255,255,${0.25 + rnd() * 0.6})`; ctx.filter = r > 6 ? 'blur(3px)' : 'none'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
  ctx.restore();
  grade(ctx, W, H, rnd, { lift: 10, contrast: 0.22, warm: 1.0 });
};

/* 11. Road trip au coucher du soleil */
SCENES.route = (ctx, W, H, rnd, N) => {
  const hz = H * 0.52;
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, hz, [[0, '#3c3a78'], [0.4, '#c25f72'], [0.75, '#f2985a'], [1, '#ffd38a']]); ctx.fillRect(0, 0, W, hz);
  glow(ctx, W * 0.5, hz, W * 0.9, 'rgba(255,170,90,0.5)'); glow(ctx, W * 0.5, hz - H * 0.02, W * 0.08, 'rgba(255,245,210,1)');
  // mesas
  ctx.fillStyle = '#5b2c45';
  [[0.02, 0.2, 0.09], [0.68, 0.26, 0.12], [0.3, 0.1, 0.05]].forEach(([x, w, h]) => { ctx.beginPath(); ctx.moveTo(x * W, hz); ctx.lineTo(x * W + w * W * 0.15, hz - h * H); ctx.lineTo(x * W + w * W * 0.85, hz - h * H); ctx.lineTo(x * W + w * W, hz); ctx.closePath(); ctx.fill(); });
  ctx.fillStyle = vgrad(ctx, 0, hz, 0, H, [[0, '#7a3e3e'], [1, '#2a1416']]); ctx.fillRect(0, hz, W, H - hz);
  // route
  ctx.fillStyle = '#1d1416'; ctx.beginPath(); ctx.moveTo(W * 0.49, hz); ctx.lineTo(W * 0.51, hz); ctx.lineTo(W * 0.95, H); ctx.lineTo(W * 0.05, H); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = vgrad(ctx, 0, hz, 0, H, [[0, 'rgba(255,180,110,0.5)'], [1, 'rgba(255,180,110,0.05)']]);
  ctx.beginPath(); ctx.moveTo(W * 0.495, hz); ctx.lineTo(W * 0.505, hz); ctx.lineTo(W * 0.6, H); ctx.lineTo(W * 0.4, H); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = 'rgba(255,220,150,0.85)';
  for (let i = 0; i < 14; i++) { const t0 = Math.pow(i / 14, 1.8), t1 = Math.pow((i + 0.45) / 14, 1.8), y0 = lerp(hz, H, t0), y1 = lerp(hz, H, t1); ctx.beginPath(); ctx.moveTo(W / 2 - lerp(0.5, 7, t0), y0); ctx.lineTo(W / 2 + lerp(0.5, 7, t0), y0); ctx.lineTo(W / 2 + lerp(0.5, 7, t1), y1); ctx.lineTo(W / 2 - lerp(0.5, 7, t1), y1); ctx.fill(); }
  // van
  const vx = W * 0.14, vy = H * 0.86, vw = W * 0.3, vh = vw * 0.48;
  const draw = c => {
    c.beginPath(); c.moveTo(vx, vy); c.lineTo(vx, vy - vh * 0.75); c.quadraticCurveTo(vx, vy - vh, vx + vw * 0.15, vy - vh); c.lineTo(vx + vw * 0.8, vy - vh); c.quadraticCurveTo(vx + vw, vy - vh * 0.9, vx + vw, vy - vh * 0.45); c.lineTo(vx + vw, vy); c.closePath(); c.fill();
    c.beginPath(); c.arc(vx + vw * 0.22, vy, vh * 0.2, 0, 7); c.fill(); c.beginPath(); c.arc(vx + vw * 0.78, vy, vh * 0.2, 0, 7); c.fill();
    sit(c, { x: vx + vw * 0.38, y: vy - vh, h: H * 0.12 });
    sit(c, { x: vx + vw * 0.38 + H * 0.12 / 7.6 * 1.7, y: vy - vh, h: H * 0.115, fem: true, hair: 'long', lean: -0.5 });
  };
  silhouette(ctx, draw, { fill: '#140b0e', rim: 'rgba(255,190,120,0.9)', rimDx: 2, blur: 0.7 });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,140,0.5)';
  ctx.fillRect(vx + vw * 0.2, vy - vh * 0.75, vw * 0.18, vh * 0.25); ctx.fillRect(vx + vw * 0.45, vy - vh * 0.75, vw * 0.18, vh * 0.25); ctx.restore();
  grade(ctx, W, H, rnd, { lift: 12, contrast: 0.28 });
};

/* 12. Feu d'artifice sur l'eau */
SCENES.artifice = (ctx, W, H, rnd, N) => {
  const hz = H * 0.62;
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, hz, [[0, '#050612'], [0.7, '#14112e'], [1, '#2b1838']]); ctx.fillRect(0, 0, W, hz);
  const bursts = [[0.3, 0.25, 0.2, '#ffd27f'], [0.7, 0.2, 0.17, '#ff8fb1'], [0.55, 0.42, 0.12, '#ffe7b0'], [0.15, 0.45, 0.09, '#9fd0ff'], [0.85, 0.45, 0.1, '#ffb347']];
  const fw = off(W, H), fc = fw.getContext('2d');
  bursts.forEach(([bx, by, br, col]) => {
    const x = bx * W, y = by * H, R = br * W;
    glow(fc, x, y, R * 1.4, rgba(col, 0.25));
    fc.save(); fc.globalCompositeOperation = 'lighter'; fc.lineCap = 'round';
    for (let i = 0; i < 140; i++) {
      const a = rnd() * Math.PI * 2, r = R * (0.75 + rnd() * 0.3);
      const ex = x + Math.cos(a) * r, ey = y + Math.sin(a) * r + r * 0.12;
      const g = fc.createLinearGradient(x, y, ex, ey); g.addColorStop(0, rgba(col, 0)); g.addColorStop(0.7, rgba(col, 0.35)); g.addColorStop(1, rgba('#fff8e8', 0.95));
      fc.strokeStyle = g; fc.lineWidth = 2 + rnd() * 1.6; fc.beginPath(); fc.moveTo(x + Math.cos(a) * r * 0.2, y + Math.sin(a) * r * 0.2);
      fc.quadraticCurveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, ex, ey); fc.stroke();
      fc.fillStyle = rgba('#fffaf0', 0.9); fc.beginPath(); fc.arc(ex, ey, 2.4, 0, 7); fc.fill();
    }
    fc.restore();
  });
  ctx.drawImage(fw, 0, 0);
  // ville lointaine
  ctx.fillStyle = '#0a0812';
  for (let x = 0; x < W; x += W * 0.03) { const h = H * (0.02 + rnd() * 0.06); ctx.fillRect(x, hz - h, W * 0.03 + 1, h); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(255,${180 + rnd() * 60},120,${0.3 + rnd() * 0.5})`; ctx.fillRect(rnd() * W, hz - rnd() * H * 0.06, 3, 3); }
  ctx.restore();
  // eau + reflets
  ctx.fillStyle = vgrad(ctx, 0, hz, 0, H, [[0, '#1b1530'], [1, '#05040a']]); ctx.fillRect(0, hz, W, H - hz);
  ctx.save(); ctx.translate(0, 2 * hz); ctx.scale(1, -1); ctx.globalAlpha = 0.4; ctx.filter = 'blur(6px)'; ctx.drawImage(fw, 0, 0); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.5; for (let y = hz; y < H; y += 5) { ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, y, W, 2); } ctx.restore();
  // ponton + couple
  ctx.fillStyle = '#050307'; ctx.fillRect(0, H * 0.86, W, H * 0.14);
  const u = H * 0.26 / 7.6;
  const draw = c => {
    sit(c, { x: W * 0.42, y: H * 0.865, h: H * 0.26, armAround: 1.9 });
    sit(c, { x: W * 0.42 + u * 1.72, y: H * 0.865, h: H * 0.245, fem: true, hair: 'long', lean: -0.5 });
  };
  silhouette(ctx, draw, { fill: '#050307', rim: 'rgba(255,200,170,0.7)', rimDx: 0, rimDy: 2, blur: 0.7 });
  grade(ctx, W, H, rnd, { lift: 6, contrast: 0.25 });
};

/* 13. Cœur dessiné au cierge magique */
SCENES.cierge = (ctx, W, H, rnd, N) => {
  ctx.fillStyle = vgrad(ctx, 0, 0, 0, H, [[0, '#07040a'], [1, '#1a0d14']]); ctx.fillRect(0, 0, W, H);
  bokeh(ctx, rnd, W, H, { count: 90, y0: 0, y1: 0.7, rmin: 20, rmax: 80, amin: 0.06, amax: 0.22, colors: ['#ffb347', '#ffd27f', '#ff9f80'] });
  const cx = W * 0.5, cy = H * 0.38, s = W * 0.22;
  const heart = t => [cx + s * 16 * Math.pow(Math.sin(t), 3) / 16, cy - s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16];
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [[24, 'rgba(255,150,60,0.12)'], [12, 'rgba(255,190,100,0.35)'], [4, 'rgba(255,240,200,0.95)']].forEach(([lw, col]) => {
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.01) { const [x, y] = heart(t); const j = (N.n2(t * 10, lw) - 0.5) * 6; t ? ctx.lineTo(x + j, y + j) : ctx.moveTo(x, y); }
    ctx.stroke();
  });
  for (let i = 0; i < 500; i++) { const [x, y] = heart(rnd() * Math.PI * 2); const a = rnd() * 7, d = rnd() * 30; ctx.fillStyle = `rgba(255,${200 + rnd() * 55},${120 + rnd() * 80},${rnd()})`; ctx.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, 2, 2); }
  ctx.restore();
  const fy = H * 1.02, fh = H * 0.5, fx = W * 0.33, u = fh / 7.6;
  const draw = c => {
    stand(c, { x: fx, y: fy, h: fh, coat: true, armR: [[1.3, -4.9], [1.75, -5.5]] });
    stand(c, { x: fx + u * 3.3, y: fy, h: fh * 0.92, fem: true, hair: 'long', coat: true, armL: [[-1.3, -4.9], [-1.7, -5.6]] });
  };
  silhouette(ctx, draw, { fill: '#040205', rim: 'rgba(255,190,110,0.6)', rimDx: 0, rimDy: 1.5, blur: 1.2 });
  // étincelles des cierges
  [[fx + u * 1.75, fy - u * 5.6], [fx + u * 1.6, fy - u * 5.7]].forEach(([x, y]) => { glow(ctx, x, y, W * 0.12, 'rgba(255,200,120,0.7)'); glow(ctx, x, y, W * 0.02, 'rgba(255,255,240,1)'); });
  grade(ctx, W, H, rnd, { lift: 6, contrast: 0.25 });
};

/* 14. Plage vue du ciel */
SCENES.aerienne = (ctx, W, H, rnd, N) => {
  const img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const shore = W * (0.52 + (N.fbm(y / H * 2.2, 3.3, 4) - 0.5) * 0.35);
    const dx = x - shore, i = (y * W + x) * 4;
    let r, g, b;
    if (dx < 0) { // mer
      const k = clamp(-dx / (W * 0.5), 0, 1), n = N.fbm(x / W * 8, y / H * 8, 4);
      r = lerp(120, 6, k) + n * 20; g = lerp(225, 120, k) + n * 25; b = lerp(215, 160, k) + n * 20;
      const foam = Math.max(0, 1 - Math.abs(dx + W * 0.012 + Math.sin(y / H * 40 + N.n2(y / 40, 1) * 3) * W * 0.006) / (W * 0.008));
      const foam2 = Math.max(0, 1 - Math.abs(dx + W * 0.06 + N.n2(y / 60, 4) * W * 0.03) / (W * 0.006)) * 0.5;
      const f = Math.max(foam, foam2); r = lerp(r, 250, f); g = lerp(g, 252, f); b = lerp(b, 250, f);
    } else { // sable
      const n = N.fbm(x / W * 30, y / H * 30, 3); const wet = Math.max(0, 1 - dx / (W * 0.05));
      r = 236 - n * 25 - wet * 40; g = 214 - n * 25 - wet * 40; b = 178 - n * 25 - wet * 30;
    }
    d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  // serviettes, parasol, deux personnes allongées (vues du dessus)
  const tx = W * 0.7, ty = H * 0.48;
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(-0.25);
  ctx.shadowColor = 'rgba(80,50,20,0.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 10; ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#e8574d'; ctx.fillRect(-W * 0.09, -H * 0.11, W * 0.07, H * 0.2);
  ctx.fillStyle = '#f2c14e'; ctx.fillRect(W * 0.01, -H * 0.11, W * 0.07, H * 0.2);
  ctx.fillStyle = 'rgba(255,255,255,0.8)'; for (let k = 0; k < 5; k++) ctx.fillRect(-W * 0.09, -H * 0.11 + k * H * 0.045, W * 0.07, H * 0.012);
  ctx.shadowBlur = 8;
  const body = (x, skin, suit) => {
    ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(x, -H * 0.08, W * 0.012, 0, 7); ctx.fill();
    ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(x, -H * 0.03, W * 0.016, H * 0.035, 0, 0, 7); ctx.fill();
    ctx.fillStyle = suit; ctx.beginPath(); ctx.ellipse(x, H * 0.005, W * 0.015, H * 0.015, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = skin; ctx.lineCap = 'round'; ctx.lineWidth = W * 0.009;
    ctx.beginPath(); ctx.moveTo(x - W * 0.007, H * 0.01); ctx.lineTo(x - W * 0.01, H * 0.075); ctx.moveTo(x + W * 0.007, H * 0.01); ctx.lineTo(x + W * 0.01, H * 0.075); ctx.stroke();
    ctx.lineWidth = W * 0.007; ctx.beginPath(); ctx.moveTo(x - W * 0.014, -H * 0.055); ctx.lineTo(x - W * 0.022, -H * 0.005); ctx.moveTo(x + W * 0.014, -H * 0.055); ctx.lineTo(x + W * 0.022, -H * 0.005); ctx.stroke();
  };
  body(-W * 0.055, '#c98d68', '#1f3b5c'); body(W * 0.045, '#e0aa85', '#d94f70');
  ctx.restore();
  ctx.save(); ctx.translate(tx + W * 0.1, ty - H * 0.13); ctx.shadowColor = 'rgba(80,50,20,0.4)'; ctx.shadowBlur = 20; ctx.shadowOffsetX = 30; ctx.shadowOffsetY = 24;
  for (let k = 0; k < 8; k++) { ctx.fillStyle = k % 2 ? '#ffffff' : '#2a9d8f'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, W * 0.075, k * Math.PI / 4, (k + 1) * Math.PI / 4); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  grade(ctx, W, H, rnd, { lift: 6, contrast: 0.2, vignette: 0.3, grain: 10 });
};

window.NSTScenes = { SCENES, mulberry32, makeNoise, render(name, W, H, seed) {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  const rnd = mulberry32(seed || 7), N = makeNoise((seed || 7) * 31 + 5);
  SCENES[name](ctx, W, H, rnd, N);
  return c;
} };
})();
