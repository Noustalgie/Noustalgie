# Carte de public/index.html

Générée automatiquement (8815 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1644 : <style> (136 Ko)
- lignes 1645-1717 : <script type="application/ld+json"> (2 Ko)
- lignes 1718-1821 : <script type="application/ld+json"> (6 Ko)
- lignes 2381-4553 : <script> (189 Ko)
- lignes 4554-5879 : <script> (122 Ko)
- lignes 5880-8786 : <script> (249 Ko)
- lignes 8787-8812 : <script> (2 Ko)

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
 4881  Style Magazine : le livre comme un magazine de couple
 6055  1. Import des photos : une version écran + une version impression
 6345  2. Génération : histoire + légendes à partir des photos
 6657  3. Éditeur
 7065  4. Sauvegarde locale (IndexedDB : photos comprises)
 7100  5. Impression : photos en pleine résolution + PDF hébergé
 7327  6. Paiement
 8317  1. Livre 3D réutilisable
 8438  2. Aperçu en direct pendant la création (ordinateur)
 8472  3. Photos : date de prise de vue, couverture, glisser-déposer
 8574  4. Génération vivante : leurs photos se posent dans un livre
 8600  5. Récapitulatif de commande avec LEUR couverture
 8638  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1849  <header>
 1850  <nav class="ed-nav">
 1872  <main id="main" tabindex="-1">
 1874  <section class="ed-hero">
 1883  <div class="nst-demo" id="nstDemo"
 1889  <section class="nst-how nst-frise" id="how">
 1903  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1926  <section class="ed-price" id="pricing">
 1963  <section class="section app-section" id="app">
 1990  <div class="panel active" id="panel0"
 2075  <div class="panel" id="panel1"
 2120  <div class="panel" id="panel2"
 2146  <div class="panel" id="panel3"
 2147  <div id="nstEd"
 2174  <div class="panel" id="panel4"
 2176  <div id="payForm"
 2254  <section class="ed-faq-section" id="faq">
 2310  <footer>
 2360  <div class="legal-overlay" id="legalOverlay"
 2366  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2386  LANGS.fr
 2474  LANGS.en
 2562  LANGS.de
 2650  LANGS.es
 2738  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2830  toggleLangMenu
 2831  pickLang
 2833  setLang
 2872  highlightPal
 2892  selectPricing
 2907  onSlider
 2920  onInAppSlider
 2943  animNum
 2949  toggleCmp
 2968  saveDraft
 2987  restoreDraft
 2994  set
 3002  clearDraft
 3026  goTab
 3065  edPickPrice
 3071  toggleFaq
 3072  startApp
 3077  addPhotosFromEditor
 3110  ensureConvertible
 3128  detectFocalY
 3148  showUploadLoader
 3160  hideUploadLoader
 3164  addPhotos
 3172  processBatch
 3209  getMinPhotos
 3213  renderPhotos
 3229  removePhoto
 3235  openMsgModal
 3236  closeMsgModal
 3237  saveMsgModal
 3242  selStyle
 3247  log
 3257  setProgress
 3268  api
 3298  runGeneration
 3530  renderBookPreview
 3540  pg
 3547  _take
 3558  pickIdx
 3564  ph
 3565  imgT
 3574  img
 3583  wantTall
 3584  wantSquare
 3585  wantWide
 3990  avRender
 4027  reapplyTexts
 4028  avBuildThumbs
 4041  avNext
 4042  avPrev
 4049  toggleEditor
 4050  edTab
 4051  refreshEditor
 4052  refreshTextFields
 4080  estRows
 4089  liveText
 4102  setActiveSlot
 4103  edSelectPhoto
 4104  updateFilter
 4105  updateCrop
 4106  updateZoom
 4107  toggleBW
 4108  applySlotEditsToDOM
 4112  saveTextStyle
 4113  updateTextStyle
 4114  toggleTextStyle
 4115  setTextSize
 4125  applyTextStylesToDOM
 4126  edSelectLayout
 4127  applyEdit
 4128  applyLayoutOverride
 4129  applyTextLive
 4130  resetEdit
 4134  initCropGestures
 4138  editorOpen
 4139  curSlot
 4147  snapshotPage
 4148  undoEdit
 4150  openFullPreview
 4157  base64ToBlob
 4169  fetchWithTimeout
 4184  processPayment
 4283  generateAlbumPDF
 4290  compressPhotoForPdf
 4354  generateAlbumPDF_UNUSED
 4421  applyPromo
 4442  selectFormat
 4464  updateFormatPrices
 4478  generateFinalPDF
 4495  addPage
 4521  openLegal
 4522  closeLegal
 4564  clamp
 4610  curLang
 4617  themeKey
 4618  theme
 4619  photos
 4624  printSrc
 4636  faceSpan
 4639  autoPos
 4644  fit
 4647  L
 4670  cropCost
 4685  slot
 4710  tx
 4717  fit
 4718  orientOf
 4885  MT
 4887  mix
 4898  MONTHS
 4902  svgHeart
 4903  svgHeartLine
 4904  svgCurl
 4905  tape
 4907  polaroid
 4914  barcode
 4923  heartMap
 4935  wordGrid
 4937  rnd
 4963  folio
 4979  col
 4983  seal
 5092  ic
 5157  mark
 5279  fmtCoord
 5283  k3Line
 5290  yearPhotos
 5301  kmBetween
 5306  villesT
 5313  planMagazine
 5395  again
 5396  freshOr
 5397  pick
 5401  mk
 5409  L
 5499  renderPage
 5520  tierOf
 5521  photoPageCount
 5522  minPhotos
 5525  distribute
 5541  pickLayout
 5558  chooseLayout
 5571  mkPage
 5575  plan
 5611  tag
 5614  takePhoto
 5685  pairOf
 5687  relayout
 5693  makeSpread
 5711  unmakeSpread
 5727  syncSpread
 5735  fixSpreads
 5775  loadDetector
 5780  go
 5790  loadImg
 5794  saliency
 5821  subjectFromFaces
 5830  analyze
 5856  analyzeAll
 6028  t
 6049  lang
 6050  nPagesSel
 6051  promo
 6056  loadImage
 6058  toJpeg
 6080  was
 6097  pickerBack
 6113  showPickHelp
 6122  close
 6144  within
 6145  decodeFile
 6175  hdBlob
 6185  importFile
 6206  toast
 6219  geom
 6224  prepThumb
 6230  prepFull
 6236  dropPhoto
 6242  tile
 6251  pump
 6279  pump2
 6299  addPhotos
 6332  renderPhotos
 6351  browserTag
 6352  callAI
 6380  thumb
 6382  coupleInfo
 6396  mqParts
 6401  magAnswers
 6420  fetchCarte
 6430  fetchVilles
 6442  storyPrompt
 6481  magFacts
 6491  magazinePrompt
 6513  cleanMag
 6514  s
 6526  captionPhotos
 6548  defaultStory
 6583  runGeneration
 6647  showIssue
 6660  isWide
 6661  snap
 6663  H
 6664  commit
 6665  restore
 6666  undo
 6667  redo
 6668  updUndo
 6673  visible
 6681  mountPage
 6686  scaleHost
 6695  drawStage
 6709  drawThumb
 6713  drawStrip
 6720  markStrip
 6726  drawThemes
 6731  revealStage
 6737  drawAll
 6738  refreshPage
 6740  afterSlotEdit
 6747  go
 6748  step
 6753  highlightSel
 6763  drawTools
 6813  rewrite
 6830  swapPhoto
 6841  movePage
 6851  bindEditor
 7024  openReader
 7027  draw
 7031  close
 7033  next
 7049  renderBookPreview
 7067  idb
 7068  idbSet
 7069  idbGet
 7070  idbDel
 7071  saveLocal
 7077  offerResume
 7101  fullBlob
 7119  dataUrlToBlob
 7120  uploadPhotos
 7122  todo
 7128  worker
 7153  nstBake
 7211  docHtml
 7220  printHtml
 7221  innerHtml
 7223  spineStyle
 7227  spineText
 7228  defaultSpine
 7229  coverHtml
 7245  paInnerHtml
 7252  paSheet
 7260  paCoverHtml
 7270  afficheHtml
 7277  cadreHtml
 7283  aimantHtml
 7284  generateAlbumPDF
 7290  gen
 7297  doc
 7298  tries
 7337  processPayment
 7378  goTab
 7405  lang
 7415  img
 7440  stop
 7471  upd
 7497  apply
 7516  T
 7517  nm
 7518  renderQuiz
 7524  mark
 7530  save
 7577  mail
 7732  backLbl
 7737  toc
 7744  show
 7751  openLegal
 7759  hideLegal
 7760  closeLegal
 7788  cur
 7797  paint
 7822  lang
 7827  applyUI
 7834  setLang
 7854  syncStory
 7888  ensureStoryFor
 7904  recompose
 7918  addInput
 7937  removePhoto
 7990  saveLink
 8012  openFromLink
 8022  set
 8040  trHide
 8042  trackOverlay
 8050  close
 8089  ouvrir
 8115  ekLabel
 8126  drawEbar
 8151  coach
 8157  done
 8163  goTab
 8172  draw
 8200  payLabel
 8236  optTotal
 8238  drawOpts
 8262  fillOptImgs
 8276  selectFormat
 8285  highlightPal
 8290  setLang
 8305  lang
 8318  spineColors
 8345  sampleCover
 8364  auto
 8365  build
 8372  name
 8388  words
 8395  apply
 8422  build
 8431  nst70
 8451  names
 8452  renderLive
 8465  flowMode
 8474  exifDate
 8484  readAscii
 8485  scan
 8502  addPhotos
 8511  remap
 8512  applyOrder
 8525  movePhoto
 8528  sortByDate
 8537  renderPhotosPlus
 8576  startGenAnim
 8588  tick
 8596  stopGenAnim
 8598  runGeneration
 8603  noel
 8607  fill
 8610  renderSummary
 8623  syncPrice
 8634  goTab
 8656  setLang
 8673  lang
 8704  applyText
 8713  fromFrance
 8721  fromOSM
 8740  close
 8741  render
 8749  pick
 8757  search
 8793  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (53 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sante.js (30 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (54 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (173 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (27 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
