// Carrousel TikTok « magazine » : légendes posées sur les photos de tools/mag-photos.py, comme sur le carrousel de
// référence (texte blanc cerné de noir, émojis), et slide d'accroche (photo du couple, autocollants).
//   node tools/mag-legendes.js   → out/mag/carrousel/01.jpg … 13.jpg (1080 × 1440) + 01-copain.jpg, 01-copine.jpg (autres accroches)
//                                 + out/mag/carrousel/sans-texte/ (mêmes images sans légende, pour écrire le texte dans TikTok)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
// --jeu jute-lyon|jute-lea : carrousels 9:16 du décor jute, seule la 1re image porte une accroche (façon Mimosa)
const JEU = process.argv.includes('--jeu') ? process.argv[process.argv.indexOf('--jeu') + 1] : null;
const W = 1080, H = JEU ? 1920 : 1440;
// --decor lit : carrousel du lit (album années 70 de Jade et Malo, tools/mag-photos.py --decor lit) ; sinon la table
const LIEU = process.argv.includes('--decor') ? process.argv[process.argv.indexOf('--decor') + 1] : 'table';
const PHOTOS = JEU || (LIEU === 'table' ? 'photos' : 'photos-' + LIEU);
const OUT = path.join(ROOT, 'out', 'mag', JEU ? 'carrousel-' + JEU : LIEU === 'table' ? 'carrousel' : 'carrousel-' + LIEU);
const ACCROCHE = JEU === 'jute-lyon' ? '/out/mag/album-lyon/hd/a01.jpg' : '/site/img/exemple/photo-portee.jpg';     // le couple de la couverture (slide 2)

// haut / bas : légende (une ligne par élément) ; petit : ligne plus petite sous la légende du bas ;
// y : hauteur de la légende du bas (fraction de l'image) quand l'album occupe sa place habituelle
const TABLE = [
  { n: 1, accroche: { note: 'Pour Noël 🎄', a: 'Idée cadeau', b: 'Couple' } },
  { n: 2, haut: ['💌 Aperçu gratuit sur noustalgie.fr'], bas: ['Un magazine', 'personnalisé ❤️'], y: 0.81 },
  { n: 3, bas: ['Le plan de la ville', 'où tout a commencé 🥹'] },
  { n: 4, haut: ['Vos grandes étapes 🎞️'] },
  { n: 5, bas: ['Vos souvenirs,', 'mois par mois 📸'] },
  { n: 6, bas: ['Votre plus belle photo,', 'en double page 🌄'] },
  { n: 7, bas: ['La bande son', 'de votre histoire 💿'] },
  { n: 8, haut: ['Vos adresses préférées 😍'], bas: ['et vos voyages ✈️'] },
  { n: 9, bas: ['Une interview', 'exclusive 🎤'] },
  { n: 10, bas: ['Des jeux et quiz', 'sur vous 🎲'] },
  { n: 11, bas: ['Et une lettre d’amour pour', 'lui dire tout ce que vous', 'avez sur le cœur 💌'] },
  { n: 12, bas: ['Existe aussi en', 'version années 70 🕺'] },
  { n: 13, bas: ['Créez le vôtre', 'sur noustalgie.fr ✨'], petit: ['Aperçu gratuit · livré en 10 à 12 jours', 'Pour Noël : commandez avant le 6/12 🎄'], y: 0.09 },
  // autres accroches, pour publier le même carrousel plusieurs fois (même photo, autre titre)
  { n: 1, f: '01-copain', accroche: { note: 'Pour Noël 🎄', a: 'Idée cadeau', b: 'pour ton copain' } },
  { n: 1, f: '01-copine', accroche: { note: 'Pour Noël 🎄', a: 'Idée cadeau', b: 'pour ta copine' } },
];

// Lit : album années 70 de Jade et Malo, guirlande et plaid écossais ; accroche = la photo et un texte simple
const LIT = [
  { n: 1, grand: true, haut: ['Idée cadeau', 'couple 🎄'] },
  { n: 2, haut: ['💌 Aperçu gratuit sur noustalgie.fr'], bas: ['Votre histoire en magazine,', 'façon années 70 🕺'], y: 0.82 },
  { n: 3, bas: ['Le plan de la ville', 'où tout a commencé 🥹'], y: 0.8 },
  { n: 4, haut: ['Vos grandes étapes 🎞️'] },
  { n: 5, bas: ['Vos souvenirs,', 'mois par mois 📸'], y: 0.8 },
  { n: 6, bas: ['Votre plus belle photo,', 'en double page 🌄'], y: 0.8 },
  { n: 7, bas: ['La bande son', 'de votre histoire 💿'], y: 0.8 },
  { n: 8, haut: ['Vos adresses préférées 😍'], bas: ['et vos voyages ✈️'], y: 0.82 },
  { n: 9, bas: ['Une interview', 'exclusive 🎤'], y: 0.8 },
  { n: 10, bas: ['Des jeux et quiz', 'sur vous 🎲'], y: 0.8 },
  { n: 11, bas: ['Et une lettre d’amour pour', 'lui dire tout ce que vous', 'avez sur le cœur 💌'], y: 0.76 },
  { n: 12, bas: ['Existe aussi', 'en couleur ❤️'], y: 0.8 },
  { n: 13, bas: ['Créez le vôtre', 'sur noustalgie.fr ✨'], petit: ['Aperçu gratuit · livré en 10 à 12 jours', 'Pour Noël : commandez avant le 6/12 🎄'], y: 0.07 },
  { n: 1, f: '01-copain', grand: true, haut: ['Idée cadeau', 'pour ton copain 🎄'] },
  { n: 1, f: '01-copine', grand: true, haut: ['Idée cadeau', 'pour ta copine 🎄'] },
];
const JEUX = {
  'jute-lyon': [{ n: 1, accroche: { note: 'Pour Noël 🎄', a: 'Idée cadeau', b: 'Couple' } }],
  'jute-lea': [{ n: 1, grand: true, haut: ['POV : vous voulez lui offrir', 'quelque chose de', 'vraiment spécial'] }],
};
const SLIDES = JEU ? JEUX[JEU] : LIEU === 'table' ? TABLE : LIT;

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#000}
#s{position:relative;width:${W}px;height:${H}px;overflow:hidden;-webkit-font-smoothing:antialiased}
#s>img.fond{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cap{position:absolute;left:50px;right:50px;text-align:center;color:#fff;font:600 52px/1.24 'TikTok Sans','Noto Color Emoji',sans-serif;
  text-shadow:0 0 2px #000,0 0 2px #000,0 0 3px rgba(0,0,0,.9),0 2px 7px rgba(0,0,0,.45)}
.cap .e{text-shadow:none}
.cap.haut{top:118px}
.cap.bas{top:${Math.round(H * 0.74)}px}
.cap .petit{display:block;margin-top:14px;font-size:36px}
/* décor clair (lit) : style natif TikTok, texte noir sur bandeau blanc ; accroche en grand, sans dessin */
.boite .cap{color:#111;text-shadow:none;line-height:1.5}
.boite .cap .l{background:#fff;border-radius:14px;padding:4px 20px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.boite .cap .petit{line-height:1.6;margin-top:12px}
.boite .cap.grand{font-size:78px;line-height:1.38;top:120px}
/* accroche : photo du couple et autocollants, comme la première slide de référence */
.note{position:absolute;left:44px;top:70px;width:330px;height:214px;background:#fbfaf6;transform:rotate(-9deg);
  box-shadow:0 10px 24px rgba(40,30,20,.28),0 2px 4px rgba(40,30,20,.2);
  background-image:linear-gradient(90deg,transparent 49.6%,rgba(0,0,0,.07) 50%,transparent 50.6%),linear-gradient(transparent 52%,rgba(0,0,0,.035) 52.5%,transparent 53.5%)}
.note b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:400 52px/1 'Gochi Hand','Noto Color Emoji',cursive;color:#1c1a18;transform:rotate(-4deg)}
.scotch{position:absolute;left:105px;top:-26px;width:124px;height:46px;transform:rotate(-5deg);opacity:.86;
  background:repeating-conic-gradient(#f4a7c4 0 25%,#fbd3e2 0 50%) 0 0/16px 16px}
.titre{position:absolute;left:0;right:0;text-align:center}
.titre .a{display:block;font:400 148px/1 'Lilita One',sans-serif;color:#ff6fb5;-webkit-text-stroke:5px #8c2457;paint-order:stroke fill;
  text-shadow:6px 7px 0 #d9468e}
.titre .b{display:inline-block;margin-top:6px;font:400 128px/1 'Gochi Hand',cursive;color:#fff59e;-webkit-text-stroke:6px #1c1a18;paint-order:stroke fill;position:relative}
.titre svg{position:absolute}
`;
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const emo = s => esc(s).replace(/(\p{Extended_Pictographic}️?)/gu, '<span class="e">$1</span>');
const ligne = l => `<span class="l">${emo(l)}</span>`;
const cap = (lines, cls, petit, y) => `<div class="cap ${cls}"${y ? ` style="top:${Math.round(H * y)}px"` : ''}>${lines.map(ligne).join('<br>')}${petit ? `<span class="petit">${[].concat(petit).map(ligne).join('<br>')}</span>` : ''}</div>`;

const COEUR = '<svg width="96" height="86" viewBox="0 0 24 22" style="left:-112px;top:22px;filter:blur(1.2px)"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2 4 6 4c2.4 0 3.8 1.5 6 3.6C14.2 5.5 15.6 4 18 4c4 0 5.7 4.4 4 7.7C19.5 16.4 12 21 12 21z" fill="#f78fb8"/></svg>';
const ETOILE = (x, y, s, fill, stroke) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="left:calc(100% + ${x}px);top:${y}px"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.4 6.7L12 17l-6.1 3.3 1.4-6.7-5-4.6 6.8-.8z" fill="${fill}" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

function html(sl) {
  if (sl.accroche) {
    const A = sl.accroche, long = A.b.length > 8;                 // « pour ton copain » : titre plus petit
    return `<div id="s"><img class="fond" src="${ACCROCHE}" style="object-position:${JEU ? '50% 50%' : '20% 40%'}">`
      + `<div class="note"><i class="scotch"></i><b>${emo(A.note)}</b></div>`
      + `<div class="titre" style="top:${(long ? 940 : 930) + (JEU ? 380 : 0)}px"><span class="a">${esc(A.a)}</span><span class="b"${long ? ' style="font-size:100px"' : ''}>${COEUR}${esc(A.b)}`
      + `${ETOILE(4, -14, 70, 'rgba(255,255,255,.15)', '#fbd3e2')}${ETOILE(-8, 62, 36, '#f78fb8', '#f78fb8')}</span></div></div>`;
  }
  const f = String(sl.n).padStart(2, '0');
  return `<div id="s"${LIEU === 'table' && !JEU ? '' : ' class="boite"'}><img class="fond" src="/out/mag/${PHOTOS}/${f}.jpg">${sl.haut ? cap(sl.haut, sl.grand ? 'haut grand' : 'haut') : ''}${sl.bas ? cap(sl.bas, 'bas', sl.petit, sl.y) : ''}</div>`;
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'sans-texte'), { recursive: true });
  const server = await serve(ROOT);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const base = `http://127.0.0.1:${server.address().port}`;
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',').map(Number) : null;
  for (const sl of SLIDES) {
    if (only && !only.includes(sl.n)) continue;
    const f = sl.f || String(sl.n).padStart(2, '0');
    const photo = path.join(ROOT, 'out', 'mag', PHOTOS, String(sl.n).padStart(2, '0') + '.jpg');
    if (!sl.accroche && !fs.existsSync(photo)) { console.log('photo manquante', f); continue; }
    fs.writeFileSync(path.join(OUT, '_slide.html'), `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/fonts/fonts.css"><style>${CSS}</style></head><body>${html(sl)}</body></html>`);
    await page.goto(`${base}/${path.relative(ROOT, OUT)}/_slide.html`, { waitUntil: 'load' });
    await page.evaluate(async () => {
      await Promise.all(['600 52px "TikTok Sans"', '148px "Lilita One"', '128px "Gochi Hand"'].map(f => document.fonts.load(f)));
      await document.fonts.ready; await Promise.all([...document.images].map(im => im.decode()));
    });
    await page.screenshot({ path: path.join(OUT, f + '.jpg'), type: 'jpeg', quality: 93 });
    if (sl.f) { console.log('slide', f); continue; }                        // variante d'accroche : pas de copie sans texte
    if (!sl.accroche) fs.copyFileSync(photo, path.join(OUT, 'sans-texte', f + '.jpg'));
    else {
      await page.evaluate(() => document.querySelectorAll('.note,.titre').forEach(e => e.remove()));
      await page.screenshot({ path: path.join(OUT, 'sans-texte', f + '.jpg'), type: 'jpeg', quality: 93 });
    }
    console.log('slide', sl.n);
  }
  fs.unlinkSync(path.join(OUT, '_slide.html'));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
