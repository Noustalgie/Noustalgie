/* Livre 3D Noustalgie : couverture rigide, 11 feuillets qui se courbent en tournant, table en noyer,
   lumière chaude, profondeur de champ, grain. Les pages sont celles de l'album d'exemple du site.

   Tout est piloté par un objet d'état (state) : la même image sort toujours pour le même état,
   ce qui permet un rendu image par image déterministe. */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const PW = 21;            // côté d'une page (cm)
export const BW = 21.2;          // longueur d'un plat de couverture (du dos vers l'extérieur)
export const BH = 21.4;          // hauteur d'un plat
export const N = 11;             // feuillets (22 pages) ; le plat de couverture est à part
export const TH = 0.06;          // épaisseur d'un feuillet (un peu exagérée pour qu'elle se voie)
export const BT = 0.3;           // épaisseur d'un plat de couverture
const NS = 40, NZ = 8;           // subdivisions d'un feuillet (largeur, hauteur)
const RISE = 0.34, RISE_S0 = 1.5; // creux de la gouttière : les pages montent depuis le pli

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

/* Bruit de valeurs (pour le bois et le papier) */
function rng(seed) { let a = seed | 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function makeNoise(seed) {
  const r = rng(seed), P = new Uint8Array(512), G = new Float32Array(256);
  const perm = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255]; for (let i = 0; i < 256; i++) G[i] = r();
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const n2 = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255;
    const a = G[P[P[X] + Y]], b = G[P[P[X + 1] + Y]], c = G[P[P[X] + Y + 1]], d = G[P[P[X + 1] + Y + 1]], u = fade(xf), v = fade(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; };
  return { n2, fbm(x, y, o = 4) { let s = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < o; i++) { s += a * n2(x * f, y * f); n += a; a *= 0.5; f *= 2; } return s / n; } };
}

function woodTexture(size = 1024) {
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d'), img = x.createImageData(size, size), N2 = makeNoise(11);
  const fract = v => v - Math.floor(v);
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const u = i / size, v = j / size;
    const t = v * 13 + N2.fbm(u * 1.4, v * 2.0, 3) * 3.2 + N2.fbm(u * 3.3 + 7, v * 5.1, 3) * 0.9;
    const ring = Math.pow(Math.abs(fract(t) - 0.5) * 2, 2.4);
    const pores = N2.fbm(u * 2.5, v * 240, 2) - 0.5;
    const g = 0.34 + 0.2 * ring + 0.16 * pores + 0.14 * (N2.fbm(u * 1.1, v * 1.2, 3) - 0.5);
    const k = (j * size + i) * 4; img.data[k] = lerp(20, 58, g); img.data[k + 1] = lerp(14, 38, g); img.data[k + 2] = lerp(10, 26, g); img.data[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t;
}

function paperNormal(size = 512) { // grain de papier : normale légère
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d'), img = x.createImageData(size, size), N2 = makeNoise(5);
  const h = new Float32Array(size * size);
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) h[j * size + i] = N2.fbm(i / 22, j / 22, 3) * 0.7 + N2.n2(i / 2.5, j / 2.5) * 0.3;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const dx = h[j * size + (i + 1) % size] - h[j * size + (i - 1 + size) % size], dy = h[((j + 1) % size) * size + i] - h[((j - 1 + size) % size) * size + i];
    const k = (j * size + i) * 4; img.data[k] = 128 + dx * 260; img.data[k + 1] = 128 + dy * 260; img.data[k + 2] = 255; img.data[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

function spineTexture(text, bg = '#ebe5d8', fg = '#2a2622') {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 96; const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, 1024, 96);
  x.fillStyle = fg; x.font = '500 34px "Hanken Grotesk", Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.letterSpacing = '8px'; x.fillText(text, 512, 50);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

function blankTexture(hex) { const c = document.createElement('canvas'); c.width = c.height = 8; const x = c.getContext('2d'); x.fillStyle = hex; x.fillRect(0, 0, 8, 8); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }

function stripeTexture() { // tranche des pages : fines lignes de papier
  const c = document.createElement('canvas'); c.width = 8; c.height = 64; const x = c.getContext('2d');
  for (let j = 0; j < 64; j++) { x.fillStyle = j % 4 === 0 ? '#c9c0ae' : '#f1ece0'; x.fillRect(0, j, 8, 1); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

function softDisc() { // disque doux pour la poussière
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.5, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
}

/* Matériau des points flous : taille du disque de confusion calculée en fonction de la distance de mise au point */
function bokehMaterial(res) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    uniforms: { uFocus: { value: 60 }, uLens: { value: 0.012 }, uScale: { value: 1000 }, uGain: { value: 1 }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(res[0], res[1]) } },
    vertexShader: `
      uniform float uFocus, uLens, uScale, uTime; attribute float aSize; attribute vec3 aCol; attribute float aSeed; varying vec3 vCol; varying float vA;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float d = max(-mv.z, 1.0);
        float sizePx = aSize * uScale / d;
        float coc = abs(d - uFocus) / d * uLens * uScale;
        float tot = sqrt(sizePx * sizePx + coc * coc);
        gl_PointSize = clamp(tot, 1.0, 420.0);
        float tw = 0.65 + 0.35 * sin(uTime * (0.8 + aSeed) + aSeed * 40.0);
        vA = (sizePx * sizePx) / (tot * tot) * tw;
        vCol = aCol;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform float uGain; varying vec3 vCol; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float disc = smoothstep(1.0, 0.82, d) * (0.6 + 0.4 * smoothstep(0.45, 0.95, d));
        gl_FragColor = vec4(vCol * vA * uGain, 1.0) * disc;
      }`,
  });
}

const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uGrain: { value: 0.05 }, uVig: { value: 0.4 }, uAb: { value: 0.0012 }, uFade: { value: 0 }, uTime: { value: 0 }, uWarm: { value: 0.0 }, uContrast: { value: 0.12 }, uAspect: { value: 9 / 16 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uGrain, uVig, uAb, uFade, uTime, uWarm, uContrast, uAspect; varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    void main(){
      vec2 c = vUv - 0.5; float r2 = dot(c * vec2(uAspect, 1.0), c * vec2(uAspect, 1.0));
      vec2 off = c * uAb * (1.0 + r2 * 6.0);
      vec3 col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
      col = mix(col, col * col * (3.0 - 2.0 * col), uContrast);                       // courbe en S légère
      col *= vec3(1.0 + uWarm, 1.0, 1.0 - uWarm);                                    // teinte chaude
      float vig = smoothstep(0.78, 0.12, r2 * 1.7); col *= mix(1.0 - uVig, 1.0, vig); // vignette
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      float g = (hash(vUv * 1700.0 + fract(uTime) * 91.7) + hash(vUv * 900.0 + fract(uTime * 1.7) * 37.1) - 1.0);
      col += g * uGrain * (0.45 + 0.9 * (1.0 - l));                                   // grain, plus visible dans les ombres
      col = mix(col, vec3(0.0), uFade);
      gl_FragColor = vec4(col, 1.0);
    }`,
};

class SpritePass extends RenderPass { // dessine les points par-dessus sans effacer l'image (le fond de scène l'effacerait)
  render(...a) { const bg = this.scene.background; this.scene.background = null; super.render(...a); this.scene.background = bg; }
}

export const DEFAULTS = () => ({
  // caméra
  camX: 0, camY: 70, camZ: 55, tgtX: 0, tgtY: 0, tgtZ: 0, fov: 32, roll: 0,
  // profondeur de champ
  focus: 85, lens: 0.0, aperture: 0.00055, maxblur: 0.012,
  // lumière et post-traitement
  exposure: 1.0, key: 2.6, keyAz: -35, keyEl: 38, fill: 0.32, rim: 1.1, env: 0.16, bloom: 0.32, bloomThr: 0.88,
  grain: 0.04, vignette: 0.4, aberration: 0.0012, fade: 0, warm: 0.012, contrast: 0.1,
  keyDist: 110, keyAngle: 0.5, keyPenumbra: 1.0,
  // livre : pose et pages
  bookX: 0, bookZ: 0, bookRot: 0, bookTilt: 0,
  cover: 0, flip: Array(N).fill(0),
  // accessoires et ambiance
  rings: 0, ringsX: -14, ringsZ: 20, ringsRot: 0.4, dust: 1, bokeh: 1, time: 0, table: 1,
  // studio (visuels du site) : surface claire et lumière douce ; 0 = ambiance du film
  studio: 0, bgColor: 0xd0c9bd, keyColor: 0xfff0dc, top: 0, shadowRadius: 12, fogNear: 220, fogFar: 520,
});

export async function createBook3D(canvas, { width = 1080, height = 1920, base = '/site/img/exemple/album/', samples = 4, shadowSize = 2048, spine: spineOpt = {}, floorMap = null, floorRepeat = 1 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1); renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0705);
  scene.fog = new THREE.Fog(0x0b0705, 130, 330);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, width / height, 2, 600);
  const camSprites = camera.clone(); camSprites.layers.set(1);

  /* ── lumières ── */
  const hemi = new THREE.HemisphereLight(0xffe2c2, 0x1b0f08, 0.3); scene.add(hemi);
  const key = new THREE.SpotLight(0xffe0b8, 2.6, 0, 0.5, 1.0, 0); key.castShadow = true;
  key.shadow.mapSize.set(shadowSize, shadowSize); key.shadow.camera.near = 20; key.shadow.camera.far = 260; key.shadow.bias = -0.0003; key.shadow.normalBias = 0.03; key.shadow.radius = 5;
  scene.add(key); scene.add(key.target);
  const rim = new THREE.DirectionalLight(0xffc690, 1.1); rim.position.set(40, 30, -70); scene.add(rim);

  /* ── table en noyer ── */
  const wood = woodTexture(1024); wood.repeat.set(5, 5);
  const table = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ map: wood, roughness: 0.55, metalness: 0, envMapIntensity: 0.5 }));
  table.rotation.x = -Math.PI / 2; table.receiveShadow = true; scene.add(table);

  /* ── studio : surface claire + lumière zénithale très douce (ombre de contact), utilisés pour les visuels du site ── */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ color: 0xdad3c7, roughness: 0.96, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; floor.visible = false; scene.add(floor);
  if (floorMap) {                                                     // surface photographiée (chêne, lin, marbre…) au lieu d'un aplat
    const ft = await new THREE.TextureLoader().loadAsync(floorMap); ft.colorSpace = THREE.SRGBColorSpace;
    ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(floorRepeat, floorRepeat); ft.anisotropy = 8;
    floor.material.map = ft; floor.material.color.setHex(0xffffff); floor.material.roughness = 0.8; floor.material.needsUpdate = true;
  }
  const top = new THREE.DirectionalLight(0xffffff, 0); top.position.set(0, 120, 0); top.castShadow = true;
  top.shadow.mapSize.set(1024, 1024); top.shadow.bias = -0.0004; top.shadow.normalBias = 0.05; top.shadow.radius = 18;
  Object.assign(top.shadow.camera, { left: -48, right: 48, top: 48, bottom: -48, near: 10, far: 300 }); top.shadow.camera.updateProjectionMatrix();
  scene.add(top); scene.add(top.target);

  /* ── textures des pages ── */
  const loader = new THREE.TextureLoader();
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const pad = n => String(n).padStart(2, '0');
  const pageTex = {};
  const need = [];
  for (let p = 1; p <= 24; p++) need.push(loader.loadAsync(`${base}page-${pad(p)}.jpg`).then(t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, aniso); pageTex[p] = t; }));
  await Promise.all(need);
  const blank = blankTexture('#fbfaf7');
  const pnorm = paperNormal(512); pnorm.repeat.set(3, 3);

  const book = new THREE.Group(); scene.add(book);
  const mat = (map, side) => new THREE.MeshStandardMaterial({ map, roughness: 0.9, metalness: 0, side, normalMap: pnorm, normalScale: new THREE.Vector2(0.08, 0.08), shadowSide: THREE.DoubleSide });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: 0.95 });

  /* feuillets : front = page paire (à droite quand le livre est fermé), back = page impaire */
  const leaves = [];
  const idx = [];
  for (let j = 0; j < NZ; j++) for (let i = 0; i < NS; i++) {
    const a = j * (NS + 1) + i, b = a + 1, c = a + (NS + 1), d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  for (let k = 0; k < N; k++) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array((NS + 1) * (NZ + 1) * 3), uvF = new Float32Array((NS + 1) * (NZ + 1) * 2), uvB = new Float32Array((NS + 1) * (NZ + 1) * 2);
    for (let j = 0; j <= NZ; j++) for (let i = 0; i <= NS; i++) {
      const n = j * (NS + 1) + i; uvF[n * 2] = i / NS; uvF[n * 2 + 1] = 1 - j / NZ; uvB[n * 2] = 1 - i / NS; uvB[n * 2 + 1] = 1 - j / NZ;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uvF, 2)); g.setIndex(idx);
    const gb = new THREE.BufferGeometry(); gb.setAttribute('position', g.attributes.position); gb.setAttribute('uv', new THREE.BufferAttribute(uvB, 2)); gb.setIndex(idx);
    const front = new THREE.Mesh(g, mat(pageTex[2 * k + 2], THREE.FrontSide));
    const back = new THREE.Mesh(gb, mat(pageTex[2 * k + 3], THREE.BackSide));
    for (const m of [front, back]) { m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; book.add(m); }
    const r = rng(100 + k);
    leaves.push({ g, gb, K: 0.052 + r() * 0.016, skew: (r() - 0.5) * 0.7, front, back });
  }

  /* plats de couverture et dos */
  const front = new THREE.Group(); book.add(front);
  const coverMesh = new THREE.Mesh(new THREE.BoxGeometry(BW, BT, BH), [edgeMat, edgeMat, mat(pageTex[1], THREE.FrontSide), mat(blank, THREE.FrontSide), edgeMat, edgeMat]);
  coverMesh.position.set(BW / 2, BT / 2, 0); coverMesh.castShadow = coverMesh.receiveShadow = true; front.add(coverMesh);
  const backBoard = new THREE.Mesh(new THREE.BoxGeometry(BW, BT, BH), [edgeMat, edgeMat, mat(blank, THREE.FrontSide), mat(pageTex[24], THREE.FrontSide), edgeMat, edgeMat]);
  backBoard.position.set(BW / 2, BT / 2, 0); backBoard.castShadow = backBoard.receiveShadow = true; book.add(backBoard);
  const spineTex = spineTexture(spineOpt.text || 'LÉA & HUGO · 2026', spineOpt.bg, spineOpt.fg);
  const spineMat = new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.92 });
  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1, BH), [edgeMat, spineMat, edgeMat, edgeMat, edgeMat, edgeMat]);
  spine.castShadow = spine.receiveShadow = true; book.add(spine);
  const stripe = stripeTexture();
  const blockMat = new THREE.MeshStandardMaterial({ map: stripe, roughness: 0.95 });
  const blockR = new THREE.Mesh(new THREE.BoxGeometry(PW - 0.1, 1, PW - 0.1), blockMat); blockR.receiveShadow = true; book.add(blockR);
  const blockL = new THREE.Mesh(new THREE.BoxGeometry(PW - 0.1, 1, PW - 0.1), blockMat); blockL.receiveShadow = true; book.add(blockL);

  /* alliances (accessoire) */
  const rings = new THREE.Group();
  const gold = new THREE.MeshStandardMaterial({ color: 0xe0b050, metalness: 1, roughness: 0.2, envMapIntensity: 1.6 });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.17, 24, 64), gold); r1.rotation.x = Math.PI / 2; r1.position.set(0, 0.18, 0); r1.castShadow = true;
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.15, 24, 64), gold); r2.rotation.set(Math.PI / 2 - 0.9, 0, 0.3); r2.position.set(0.6, 0.55, -0.9); r2.castShadow = true;
  rings.add(r1, r2); scene.add(rings);

  /* poussière et lumières floues (points avec flou de profondeur analytique) */
  const R = rng(7);
  const dustN = 220, bokehN = 70;
  const dustGeo = new THREE.BufferGeometry(); const dp = new Float32Array(dustN * 3), ds = new Float32Array(dustN), dc = new Float32Array(dustN * 3), dseed = new Float32Array(dustN);
  const dustBase = [];
  for (let i = 0; i < dustN; i++) { dustBase.push([(R() - 0.5) * 120, 1 + R() * 55, (R() - 0.5) * 100, 0.8 + R() * 2.4, R()]); ds[i] = dustBase[i][3] * 0.2; dseed[i] = R(); dc[i * 3] = 1; dc[i * 3 + 1] = 0.86 + R() * 0.1; dc[i * 3 + 2] = 0.66 + R() * 0.15; }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3)); dustGeo.setAttribute('aSize', new THREE.BufferAttribute(ds, 1)); dustGeo.setAttribute('aCol', new THREE.BufferAttribute(dc, 3)); dustGeo.setAttribute('aSeed', new THREE.BufferAttribute(dseed, 1));
  const dustMat = bokehMaterial([width, height]); dustMat.uniforms.uGain.value = 0.9;
  const dust = new THREE.Points(dustGeo, dustMat); dust.layers.set(1); dust.frustumCulled = false; scene.add(dust);
  const bkGeo = new THREE.BufferGeometry(); const bp = new Float32Array(bokehN * 3), bs = new Float32Array(bokehN), bc = new Float32Array(bokehN * 3), bseed = new Float32Array(bokehN);
  for (let i = 0; i < bokehN; i++) {
    const a = (R() - 0.5) * 2.6, rad = 105 + R() * 70; bp[i * 3] = Math.sin(a) * rad; bp[i * 3 + 1] = 6 + R() * 70; bp[i * 3 + 2] = -Math.cos(a) * rad;
    bs[i] = 3 + R() * 7; bseed[i] = R(); const w = R(); bc[i * 3] = 1; bc[i * 3 + 1] = 0.62 + 0.25 * w; bc[i * 3 + 2] = 0.22 + 0.3 * w * w;
  }
  bkGeo.setAttribute('position', new THREE.BufferAttribute(bp, 3)); bkGeo.setAttribute('aSize', new THREE.BufferAttribute(bs, 1)); bkGeo.setAttribute('aCol', new THREE.BufferAttribute(bc, 3)); bkGeo.setAttribute('aSeed', new THREE.BufferAttribute(bseed, 1));
  const bkMat = bokehMaterial([width, height]); bkMat.uniforms.uGain.value = 0.34;
  const bokeh = new THREE.Points(bkGeo, bkMat); bokeh.layers.set(1); bokeh.frustumCulled = false; scene.add(bokeh);

  /* ── post-traitement ── */
  const rt = new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType, samples });
  const composer = new EffectComposer(renderer, rt); composer.setPixelRatio(1); composer.setSize(width, height);
  composer.addPass(new RenderPass(scene, camera));
  const bokehPass = new BokehPass(scene, camera, { focus: 85, aperture: 0.00055, maxblur: 0.012 }); composer.addPass(bokehPass);
  const spritePass = new SpritePass(scene, camSprites); spritePass.clear = false; spritePass.clearDepth = false; composer.addPass(spritePass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width / 2, height / 2), 0.32, 0.7, 0.88); composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  const gradePass = new ShaderPass(GradeShader); composer.addPass(gradePass);

  /* ── mise à jour du livre selon l'état ── */
  const vtmp = new THREE.Vector3();
  function bendLeaf(L, i, f, rise) {
    const th0 = Math.PI * f;
    const kap = -L.K * Math.sin(2 * Math.PI * f);
    const sk = L.skew * Math.sin(Math.PI * f);
    const stackOff = BT + lerp((N - 1 - i) * TH, i * TH, f) + 0.02;
    const pos = L.g.attributes.position.array;
    const ds = PW / NS, cth = Math.cos(th0), flatSide = th0 < Math.PI / 2;
    for (let j = 0; j <= NZ; j++) {
      const z = -PW / 2 + PW * j / NZ, zn = z / (PW / 2);
      const kj = kap * (1 + sk * zn * 1.4);
      let x = 0, y = stackOff;
      for (let s = 0; s <= NS; s++) {
        const n = (j * (NS + 1) + s) * 3; pos[n] = x; pos[n + 1] = y; pos[n + 2] = z;
        const sm = (s + 0.5) * ds;
        let ang = th0 + kj * sm + rise * Math.exp(-sm / RISE_S0) * cth * 1.0;
        ang = flatSide ? Math.max(ang, 0) : Math.min(ang, Math.PI);
        x += Math.cos(ang) * ds; y += Math.sin(ang) * ds;
      }
    }
    L.g.attributes.position.needsUpdate = true; L.g.computeVertexNormals(); L.gb.setAttribute('normal', L.g.attributes.normal);
  }

  function applyBook(S) {
    book.position.set(S.bookX, 0, S.bookZ); book.rotation.set(S.bookTilt * Math.PI / 180, S.bookRot * Math.PI / 180, 0);
    const c = clamp(S.cover, 0, 1);
    const rise = RISE * smooth(0.25, 0.9, c);
    // feuillets
    let nRight = 0, nLeft = 0;
    for (let i = 0; i < N; i++) {
      const f = clamp(S.flip[i], 0, 1); 
      bendLeaf(leaves[i], i, f, rise);
      if (f < 0.5) nRight++; else nLeft++;
    }
    // couverture : plat rigide qui pivote autour du dos
    const hy = BT + (N * TH + 0.03) * (1 - smooth(0, 1, c)) + 0.5 * Math.sin(Math.PI * c);
    front.position.set(0, hy, 0); front.rotation.z = Math.PI * c;
    // dos : hauteur selon l'ouverture
    const topY = BT + N * TH + 0.03 + BT;
    const sh = lerp(topY, BT * 1.05, smooth(0.0, 1.0, c));
    spine.scale.y = sh; spine.position.set(-0.17, sh / 2, 0);
    // blocs de pages sous les feuillets
    const hR = Math.max(0.001, nRight * TH), hL = Math.max(0.001, nLeft * TH);
    blockR.scale.y = hR; blockR.position.set(PW / 2 + 0.05, BT + hR / 2 - 0.01, 0); blockR.visible = nRight > 0;
    blockL.scale.y = hL; blockL.position.set(-PW / 2 - 0.05, BT + hL / 2 - 0.01, 0); blockL.visible = nLeft > 0 && c > 0.5;
    backBoard.visible = true;
    rings.visible = S.rings > 0.01; rings.scale.setScalar(Math.max(S.rings, 0.001)); rings.position.set(S.ringsX, 0, S.ringsZ); rings.rotation.y = S.ringsRot;
  }

  function render(S) {
    applyBook(S);
    // caméra
    camera.fov = S.fov; camera.aspect = width / height; camera.position.set(S.camX, S.camY, S.camZ);
    camera.up.set(Math.sin(S.roll * Math.PI / 180), Math.cos(S.roll * Math.PI / 180), 0);
    camera.lookAt(S.tgtX, S.tgtY, S.tgtZ); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
    camSprites.copy(camera); camSprites.layers.set(1);
    // lumières
    const az = S.keyAz * Math.PI / 180, el = S.keyEl * Math.PI / 180;
    const kd = S.keyDist || 110; key.position.set(Math.sin(az) * Math.cos(el) * kd, Math.sin(el) * kd, Math.cos(az) * Math.cos(el) * kd); key.angle = (S.keyAngle || 0.5); key.penumbra = S.keyPenumbra != null ? S.keyPenumbra : 1.0; key.target.position.set(0, 0, 0); key.intensity = S.key;
    hemi.intensity = S.fill; rim.intensity = S.rim; scene.environmentIntensity = S.env;
    renderer.toneMappingExposure = S.exposure;
    const studio = !!S.studio;
    table.visible = S.table > 0 && !studio; floor.visible = studio;
    scene.background.setHex(studio ? S.bgColor : 0x0b0705);
    scene.fog.color.copy(scene.background); scene.fog.near = studio ? S.fogNear : 130; scene.fog.far = studio ? S.fogFar : 330;
    hemi.color.setHex(studio ? 0xfff7ec : 0xffe2c2); hemi.groundColor.setHex(studio ? 0xe9e1d4 : 0x1b0f08);
    key.color.setHex(studio ? S.keyColor : 0xffe0b8); rim.color.setHex(studio ? 0xfff2e2 : 0xffc690);
    top.intensity = studio ? S.top : 0; key.shadow.radius = studio ? S.shadowRadius : 5;
    // profondeur de champ
    bokehPass.uniforms.focus.value = S.focus; bokehPass.uniforms.aperture.value = S.aperture; bokehPass.uniforms.maxblur.value = S.maxblur;
    const uScale = height / (2 * Math.tan(camera.fov * Math.PI / 360));
    const lens = S.aperture * 24;
    for (const m of [dustMat, bkMat]) { m.uniforms.uFocus.value = S.focus; m.uniforms.uScale.value = uScale; m.uniforms.uLens.value = lens; m.uniforms.uTime.value = S.time; }
    dustMat.uniforms.uGain.value = 0.9 * S.dust; bkMat.uniforms.uGain.value = 0.34 * S.bokeh;
    // poussière : dérive lente et déterministe
    const t = S.time;
    for (let i = 0; i < dustN; i++) {
      const b = dustBase[i];
      dp[i * 3] = b[0] + Math.sin(t * 0.21 + b[4] * 20) * 3 + t * 0.35; dp[i * 3] = ((dp[i * 3] + 60) % 120 + 120) % 120 - 60;
      dp[i * 3 + 1] = 1 + ((b[1] - 1 + t * (0.6 + b[4] * 0.8)) % 55 + 55) % 55;
      dp[i * 3 + 2] = b[2] + Math.cos(t * 0.17 + b[4] * 11) * 3;
    }
    dustGeo.attributes.position.needsUpdate = true;
    bloomPass.strength = S.bloom; bloomPass.threshold = S.bloomThr;
    const gu = gradePass.uniforms; gu.uGrain.value = S.grain; gu.uVig.value = S.vignette; gu.uAb.value = S.aberration; gu.uFade.value = S.fade; gu.uTime.value = S.grainT != null ? S.grainT : S.time; gu.uWarm.value = S.warm; gu.uContrast.value = S.contrast; gu.uAspect.value = width / height;
    composer.render();
  }

  const project = (x, y, z) => { vtmp.set(x, y, z).applyMatrix4(book.matrixWorld).project(camera); return [(vtmp.x * 0.5 + 0.5) * width, (1 - (vtmp.y * 0.5 + 0.5)) * height]; };
  return { render, project, THREE, scene, camera, renderer, composer, DEFAULTS, N, PW };
}
