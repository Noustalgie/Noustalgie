# Carte de public/index.html

Générée automatiquement (9152 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1675 : <style> (139 Ko)
- lignes 1676-1749 : <script type="application/ld+json"> (2 Ko)
- lignes 1750-1853 : <script type="application/ld+json"> (6 Ko)
- lignes 2435-4608 : <script> (190 Ko)
- lignes 4609-5979 : <script> (127 Ko)
- lignes 5980-9111 : <script> (274 Ko)
- lignes 9112-9149 : <script> (3 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  543  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  685  FORCE FINALE : champs texte éditeur toujours sombres
  695  PANNEAUX EDITEUR : fond noir uniforme
  731  v1.1 — accessibilité & confort
  738  Noustalgie v2 — éditeur d'album
  840  v2.2 — édition au doigt
  868  v3.3 — album : lien, format, photos, glisser-déposer, suivi
  896  v2.2 — système de design du site
  946  v2.3 — boutons pilule
  955  v2.3 — galerie de vraies pages
  970  v2.3 — garanties
  976  v2.3 — tarifs actionnables
  980  v2.3 — barre d'action mobile
  993  v2.4 — hero : couverture du livre fermé
 1001  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1020  v2.5 — sélecteur de langue
 1030  v2.5 — pages d'information
 1072  v2.6 — « Comment ça marche »
 1104  v2.7 — « Comment ça marche » en frise éditoriale
 1124  v3 — indications sous les questions
 1125  v4 — livre 3D
 1149  v4 — tarifs : épaisseur réelle
 1153  v4 — aperçu en direct
 1164  v4 — photos
 1174  v4 — génération vivante
 1184  v4 — récapitulatif de commande
 1192  v4 — étapes
 1200  v4 — apparition au défilement et page tournée
 1210  v4.3 — suggestions d'adresse
 1224  v4.5 — message d'import
 1234  v4.7 — correctifs téléphone
 1250  v4.8 — édition évidente
 1269  v5.2 — photos non transmises par l'iPhone
 1280  v5.4 — lisibilité
 1285  v5.5 — finitions demandées
 1311  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1489  galerie d'accueil : lien vers l'album d'exemple complet
 1583  Fond du site (choix de Gabin) : le couple dans la montagne, flouté dans le fichier même et voilé, fixe derrièr
 4980  Style Magazine : le livre comme un magazine de couple
 6175  1. Import des photos : une version écran + une version impression
 6484  2. Génération : histoire + légendes à partir des photos
 6802  3. Éditeur
 7209  4. Sauvegarde locale (IndexedDB : photos comprises)
 7283  5. Impression : photos en pleine résolution + PDF hébergé
 7523  6. Paiement
 8633  1. Livre 3D réutilisable
 8754  2. Aperçu en direct pendant la création (ordinateur)
 8788  3. Photos : date de prise de vue, couverture, glisser-déposer
 8890  4. Génération vivante : leurs photos se posent dans un livre
 8916  5. Récapitulatif de commande avec LEUR couverture
 8963  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1882  <header>
 1883  <nav class="ed-nav">
 1905  <main id="main" tabindex="-1">
 1907  <section class="ed-hero">
 1916  <div class="nst-demo" id="nstDemo"
 1922  <section class="nst-how nst-frise" id="how">
 1936  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1959  <section class="ed-price" id="pricing">
 1997  <section class="section app-section" id="app">
 2024  <div class="panel active" id="panel0"
 2110  <div class="panel" id="panel1"
 2155  <div class="panel" id="panel2"
 2181  <div class="panel" id="panel3"
 2182  <div id="nstEd"
 2209  <div class="panel" id="panel4"
 2211  <div id="payForm"
 2292  <section class="ed-faq-section" id="faq">
 2348  <footer>
 2414  <div class="legal-overlay" id="legalOverlay"
 2420  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2440  LANGS.fr
 2528  LANGS.en
 2616  LANGS.de
 2704  LANGS.es
 2792  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2884  toggleLangMenu
 2885  pickLang
 2887  setLang
 2926  highlightPal
 2946  selectPricing
 2961  onSlider
 2974  onInAppSlider
 2997  animNum
 3003  toggleCmp
 3022  saveDraft
 3041  restoreDraft
 3048  set
 3056  clearDraft
 3080  goTab
 3119  edPickPrice
 3125  toggleFaq
 3126  startApp
 3131  addPhotosFromEditor
 3164  ensureConvertible
 3182  detectFocalY
 3202  showUploadLoader
 3214  hideUploadLoader
 3218  addPhotos
 3226  processBatch
 3263  getMinPhotos
 3267  renderPhotos
 3283  removePhoto
 3289  openMsgModal
 3290  closeMsgModal
 3291  saveMsgModal
 3296  selStyle
 3301  log
 3311  setProgress
 3322  api
 3352  runGeneration
 3584  renderBookPreview
 3594  pg
 3601  _take
 3612  pickIdx
 3618  ph
 3619  imgT
 3628  img
 3637  wantTall
 3638  wantSquare
 3639  wantWide
 4044  avRender
 4081  reapplyTexts
 4082  avBuildThumbs
 4095  avNext
 4096  avPrev
 4103  toggleEditor
 4104  edTab
 4105  refreshEditor
 4106  refreshTextFields
 4134  estRows
 4143  liveText
 4156  setActiveSlot
 4157  edSelectPhoto
 4158  updateFilter
 4159  updateCrop
 4160  updateZoom
 4161  toggleBW
 4162  applySlotEditsToDOM
 4166  saveTextStyle
 4167  updateTextStyle
 4168  toggleTextStyle
 4169  setTextSize
 4179  applyTextStylesToDOM
 4180  edSelectLayout
 4181  applyEdit
 4182  applyLayoutOverride
 4183  applyTextLive
 4184  resetEdit
 4188  initCropGestures
 4192  editorOpen
 4193  curSlot
 4201  snapshotPage
 4202  undoEdit
 4204  openFullPreview
 4211  base64ToBlob
 4223  fetchWithTimeout
 4238  processPayment
 4337  generateAlbumPDF
 4344  compressPhotoForPdf
 4408  generateAlbumPDF_UNUSED
 4475  applyPromo
 4497  selectFormat
 4519  updateFormatPrices
 4533  generateFinalPDF
 4550  addPage
 4576  openLegal
 4577  closeLegal
 4619  clamp
 4665  curLang
 4672  themeKey
 4673  theme
 4674  photos
 4679  printSrc
 4691  faceSpan
 4694  autoPos
 4699  fit
 4702  L
 4725  cropCost
 4740  slot
 4773  joli
 4794  coeur
 4797  tx
 4804  fit
 4811  haut
 4817  orientOf
 4984  MT
 4986  mix
 4997  MONTHS
 5001  svgHeart
 5002  svgHeartLine
 5003  svgCurl
 5004  tape
 5006  polaroid
 5013  barcode
 5022  heartMap
 5034  wordGrid
 5036  rnd
 5062  folio
 5078  col
 5082  seal
 5191  ic
 5256  mark
 5379  fmtCoord
 5383  k3Line
 5390  yearPhotos
 5401  kmBetween
 5406  villesT
 5413  planMagazine
 5495  again
 5496  freshOr
 5497  pick
 5501  mk
 5509  L
 5599  renderPage
 5620  tierOf
 5621  photoPageCount
 5622  minPhotos
 5625  distribute
 5641  pickLayout
 5658  chooseLayout
 5671  mkPage
 5675  plan
 5711  tag
 5714  takePhoto
 5785  pairOf
 5787  relayout
 5793  makeSpread
 5811  unmakeSpread
 5827  syncSpread
 5835  fixSpreads
 5875  loadDetector
 5880  go
 5890  loadImg
 5894  saliency
 5921  subjectFromFaces
 5930  analyze
 5956  analyzeAll
 6148  t
 6169  lang
 6170  nPagesSel
 6171  promo
 6176  loadImage
 6178  toJpeg
 6200  was
 6217  pickerBack
 6233  showPickHelp
 6242  close
 6264  within
 6265  decodeFile
 6295  hdBlob
 6305  importFile
 6326  toast
 6339  geom
 6344  prepThumb
 6350  prepFull
 6356  dropPhoto
 6362  tile
 6371  pump
 6399  pump2
 6419  addPhotos
 6452  renderPhotos
 6465  drawUp36
 6490  browserTag
 6491  callAI
 6519  thumb
 6521  coupleInfo
 6537  mqParts
 6542  magAnswers
 6561  fetchCarte
 6571  fetchVilles
 6583  storyPrompt
 6622  magFacts
 6632  magazinePrompt
 6654  cleanMag
 6655  s
 6667  captionPhotos
 6689  defaultStory
 6724  runGeneration
 6792  showIssue
 6805  isWide
 6806  snap
 6808  H
 6809  commit
 6810  restore
 6811  undo
 6812  redo
 6813  updUndo
 6818  visible
 6826  mountPage
 6831  scaleHost
 6840  drawStage
 6854  drawThumb
 6858  drawStrip
 6865  markStrip
 6871  drawThemes
 6876  revealStage
 6882  drawAll
 6883  refreshPage
 6885  afterSlotEdit
 6892  go
 6893  step
 6898  highlightSel
 6908  drawTools
 6959  rewrite
 6976  swapPhoto
 6985  movePage
 6995  bindEditor
 7168  openReader
 7171  draw
 7175  close
 7177  next
 7193  renderBookPreview
 7211  idb
 7212  idbSet
 7213  idbGet
 7214  idbDel
 7215  saveLocal
 7221  offerResume
 7258  proposerMagazine
 7284  fullBlob
 7302  dataUrlToBlob
 7303  uploadPhotos
 7306  todo
 7312  worker
 7338  nstBake
 7396  docHtml
 7405  printHtml
 7406  innerHtml
 7408  spineStyle
 7412  spineText
 7413  defaultSpine
 7414  coverHtml
 7430  paInnerHtml
 7437  paSheet
 7445  paCoverHtml
 7455  optSlot
 7461  afficheHtml
 7469  cadreHtml
 7473  aimantHtml
 7474  generateAlbumPDF
 7484  gen
 7491  doc
 7492  tries
 7535  processPayment
 7593  goTab
 7620  lang
 7630  img
 7655  stop
 7686  upd
 7712  apply
 7731  T
 7732  nm
 7733  renderQuiz
 7739  mark
 7745  save
 7792  mail
 7956  backLbl
 7961  toc
 7968  show
 7975  openLegal
 7983  hideLegal
 7984  closeLegal
 8012  cur
 8021  paint
 8046  lang
 8051  applyUI
 8058  setLang
 8080  syncStory
 8114  ensureStoryFor
 8130  recompose
 8144  addInput
 8173  removePhoto
 8190  selectPricing
 8241  fixTexts
 8274  saveLink
 8296  openFromLink
 8306  set
 8324  trHide
 8326  trackOverlay
 8334  close
 8373  ouvrir
 8399  ekLabel
 8410  drawEbar
 8435  coach
 8441  done
 8447  goTab
 8456  draw
 8487  payLabel
 8529  optTotal
 8531  drawOpts
 8556  fillOptImgs
 8569  pickOptPhoto
 8592  selectFormat
 8601  highlightPal
 8606  setLang
 8621  lang
 8634  spineColors
 8661  sampleCover
 8680  auto
 8681  build
 8688  name
 8704  words
 8711  apply
 8738  build
 8747  nst70
 8767  names
 8768  renderLive
 8781  flowMode
 8790  exifDate
 8800  readAscii
 8801  scan
 8818  addPhotos
 8827  remap
 8828  applyOrder
 8841  movePhoto
 8844  sortByDate
 8853  renderPhotosPlus
 8892  startGenAnim
 8904  tick
 8912  stopGenAnim
 8914  runGeneration
 8919  noel
 8923  fill
 8926  renderSummary
 8939  syncPrice
 8950  cadeauLien
 8959  goTab
 8981  setLang
 8998  lang
 9029  applyText
 9038  fromFrance
 9046  fromOSM
 9065  close
 9066  render
 9074  pick
 9082  search
 9127  etape

## api/

- api/_fn/album.js (124 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cadeau.js (90 lignes) /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cadeau.js (75 lignes) api/_lib/cadeau.js — cartes cadeaux (49,99 €, soit un livre imprimé de 36 pages livré)
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (84 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (186 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (30 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (348 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
