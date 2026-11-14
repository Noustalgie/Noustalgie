# Carte de public/index.html

Générée automatiquement (9265 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6016 : <script> (127 Ko)
- lignes 6017-9224 : <script> (281 Ko)
- lignes 9225-9262 : <script> (3 Ko)

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
 5017  Style Magazine : le livre comme un magazine de couple
 6212  1. Import des photos : une version écran + une version impression
 6521  2. Génération : histoire + légendes à partir des photos
 6839  3. Éditeur
 7246  4. Sauvegarde locale (IndexedDB : photos comprises)
 7320  5. Impression : photos en pleine résolution + PDF hébergé
 7596  6. Paiement
 8746  1. Livre 3D réutilisable
 8867  2. Aperçu en direct pendant la création (ordinateur)
 8901  3. Photos : date de prise de vue, couverture, glisser-déposer
 9003  4. Génération vivante : leurs photos se posent dans un livre
 9029  5. Récapitulatif de commande avec LEUR couverture
 9076  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1915  <header>
 1916  <nav class="ed-nav">
 1938  <main id="main" tabindex="-1">
 1940  <section class="ed-hero">
 1950  <div class="nst-demo" id="nstDemo"
 1956  <section class="nst-how nst-frise" id="how">
 1970  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1993  <section class="ed-price" id="pricing">
 2031  <section class="section app-section" id="app">
 2058  <div class="panel active" id="panel0"
 2144  <div class="panel" id="panel1"
 2189  <div class="panel" id="panel2"
 2215  <div class="panel" id="panel3"
 2216  <div id="nstEd"
 2244  <div class="panel" id="panel4"
 2246  <div id="payForm"
 2327  <section class="ed-faq-section" id="faq">
 2383  <footer>
 2451  <div class="legal-overlay" id="legalOverlay"
 2457  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2477  LANGS.fr
 2565  LANGS.en
 2653  LANGS.de
 2741  LANGS.es
 2829  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2921  toggleLangMenu
 2922  pickLang
 2924  setLang
 2963  highlightPal
 2983  selectPricing
 2998  onSlider
 3011  onInAppSlider
 3034  animNum
 3040  toggleCmp
 3059  saveDraft
 3078  restoreDraft
 3085  set
 3093  clearDraft
 3117  goTab
 3156  edPickPrice
 3162  toggleFaq
 3163  startApp
 3168  addPhotosFromEditor
 3201  ensureConvertible
 3219  detectFocalY
 3239  showUploadLoader
 3251  hideUploadLoader
 3255  addPhotos
 3263  processBatch
 3300  getMinPhotos
 3304  renderPhotos
 3320  removePhoto
 3326  openMsgModal
 3327  closeMsgModal
 3328  saveMsgModal
 3333  selStyle
 3338  log
 3348  setProgress
 3359  api
 3389  runGeneration
 3621  renderBookPreview
 3631  pg
 3638  _take
 3649  pickIdx
 3655  ph
 3656  imgT
 3665  img
 3674  wantTall
 3675  wantSquare
 3676  wantWide
 4081  avRender
 4118  reapplyTexts
 4119  avBuildThumbs
 4132  avNext
 4133  avPrev
 4140  toggleEditor
 4141  edTab
 4142  refreshEditor
 4143  refreshTextFields
 4171  estRows
 4180  liveText
 4193  setActiveSlot
 4194  edSelectPhoto
 4195  updateFilter
 4196  updateCrop
 4197  updateZoom
 4198  toggleBW
 4199  applySlotEditsToDOM
 4203  saveTextStyle
 4204  updateTextStyle
 4205  toggleTextStyle
 4206  setTextSize
 4216  applyTextStylesToDOM
 4217  edSelectLayout
 4218  applyEdit
 4219  applyLayoutOverride
 4220  applyTextLive
 4221  resetEdit
 4225  initCropGestures
 4229  editorOpen
 4230  curSlot
 4238  snapshotPage
 4239  undoEdit
 4241  openFullPreview
 4248  base64ToBlob
 4260  fetchWithTimeout
 4275  processPayment
 4374  generateAlbumPDF
 4381  compressPhotoForPdf
 4445  generateAlbumPDF_UNUSED
 4512  applyPromo
 4534  selectFormat
 4556  updateFormatPrices
 4570  generateFinalPDF
 4587  addPage
 4613  openLegal
 4614  closeLegal
 4656  clamp
 4702  curLang
 4709  themeKey
 4710  theme
 4711  photos
 4716  printSrc
 4728  faceSpan
 4731  autoPos
 4736  fit
 4739  L
 4762  cropCost
 4777  slot
 4810  joli
 4831  coeur
 4834  tx
 4841  fit
 4848  haut
 4854  orientOf
 5021  MT
 5023  mix
 5034  MONTHS
 5038  svgHeart
 5039  svgHeartLine
 5040  svgCurl
 5041  tape
 5043  polaroid
 5050  barcode
 5059  heartMap
 5071  wordGrid
 5073  rnd
 5099  folio
 5115  col
 5119  seal
 5228  ic
 5293  mark
 5416  fmtCoord
 5420  k3Line
 5427  yearPhotos
 5438  kmBetween
 5443  villesT
 5450  planMagazine
 5532  again
 5533  freshOr
 5534  pick
 5538  mk
 5546  L
 5636  renderPage
 5657  tierOf
 5658  photoPageCount
 5659  minPhotos
 5662  distribute
 5678  pickLayout
 5695  chooseLayout
 5708  mkPage
 5712  plan
 5748  tag
 5751  takePhoto
 5822  pairOf
 5824  relayout
 5830  makeSpread
 5848  unmakeSpread
 5864  syncSpread
 5872  fixSpreads
 5912  loadDetector
 5917  go
 5927  loadImg
 5931  saliency
 5958  subjectFromFaces
 5967  analyze
 5993  analyzeAll
 6185  t
 6206  lang
 6207  nPagesSel
 6208  promo
 6213  loadImage
 6215  toJpeg
 6237  was
 6254  pickerBack
 6270  showPickHelp
 6279  close
 6301  within
 6302  decodeFile
 6332  hdBlob
 6342  importFile
 6363  toast
 6376  geom
 6381  prepThumb
 6387  prepFull
 6393  dropPhoto
 6399  tile
 6408  pump
 6436  pump2
 6456  addPhotos
 6489  renderPhotos
 6502  drawUp36
 6527  browserTag
 6528  callAI
 6556  thumb
 6558  coupleInfo
 6574  mqParts
 6579  magAnswers
 6598  fetchCarte
 6608  fetchVilles
 6620  storyPrompt
 6659  magFacts
 6669  magazinePrompt
 6691  cleanMag
 6692  s
 6704  captionPhotos
 6726  defaultStory
 6761  runGeneration
 6829  showIssue
 6842  isWide
 6843  snap
 6845  H
 6846  commit
 6847  restore
 6848  undo
 6849  redo
 6850  updUndo
 6855  visible
 6863  mountPage
 6868  scaleHost
 6877  drawStage
 6891  drawThumb
 6895  drawStrip
 6902  markStrip
 6908  drawThemes
 6913  revealStage
 6919  drawAll
 6920  refreshPage
 6922  afterSlotEdit
 6929  go
 6930  step
 6935  highlightSel
 6945  drawTools
 6996  rewrite
 7013  swapPhoto
 7022  movePage
 7032  bindEditor
 7205  openReader
 7208  draw
 7212  close
 7214  next
 7230  renderBookPreview
 7248  idb
 7249  idbSet
 7250  idbGet
 7251  idbDel
 7252  saveLocal
 7258  offerResume
 7295  proposerMagazine
 7325  lisible
 7333  hdCopie
 7338  photoAEnvoyer
 7358  dataUrlToBlob
 7362  relais
 7368  uploadPhotos
 7371  todo
 7378  worker
 7410  nstBake
 7468  docHtml
 7477  printHtml
 7478  innerHtml
 7480  spineStyle
 7484  spineText
 7485  defaultSpine
 7486  coverHtml
 7502  paInnerHtml
 7509  paSheet
 7517  paCoverHtml
 7527  optSlot
 7533  afficheHtml
 7541  cadreHtml
 7545  aimantHtml
 7546  generateAlbumPDF
 7557  gen
 7564  doc
 7565  tries
 7608  processPayment
 7614  vers
 7667  goTab
 7694  lang
 7704  img
 7729  stop
 7760  upd
 7788  apply
 7807  T
 7808  nm
 7809  renderQuiz
 7815  mark
 7821  save
 7868  mail
 8032  backLbl
 8037  toc
 8044  show
 8051  openLegal
 8059  hideLegal
 8060  closeLegal
 8088  cur
 8097  paint
 8122  lang
 8127  applyUI
 8134  setLang
 8156  syncStory
 8190  ensureStoryFor
 8206  recompose
 8220  addInput
 8249  removePhoto
 8266  selectPricing
 8317  fixTexts
 8350  saveLink
 8351  q
 8389  fermer
 8409  openFromLink
 8419  set
 8437  trHide
 8439  trackOverlay
 8447  close
 8486  ouvrir
 8512  ekLabel
 8523  drawEbar
 8548  coach
 8554  done
 8560  goTab
 8569  draw
 8600  payLabel
 8642  optTotal
 8644  drawOpts
 8669  fillOptImgs
 8682  pickOptPhoto
 8705  selectFormat
 8714  highlightPal
 8719  setLang
 8734  lang
 8747  spineColors
 8774  sampleCover
 8793  auto
 8794  build
 8801  name
 8817  words
 8824  apply
 8851  build
 8860  nst70
 8880  names
 8881  renderLive
 8894  flowMode
 8903  exifDate
 8913  readAscii
 8914  scan
 8931  addPhotos
 8940  remap
 8941  applyOrder
 8954  movePhoto
 8957  sortByDate
 8966  renderPhotosPlus
 9005  startGenAnim
 9017  tick
 9025  stopGenAnim
 9027  runGeneration
 9032  noel
 9036  fill
 9039  renderSummary
 9052  syncPrice
 9063  cadeauLien
 9072  goTab
 9094  setLang
 9111  lang
 9142  applyText
 9151  fromFrance
 9159  fromOSM
 9178  close
 9179  render
 9187  pick
 9195  search
 9240  etape

## api/

- api/_fn/album.js (124 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cadeau.js (90 lignes) /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/photo.js (40 lignes) /api/tools?fn=photo — secours de l'envoi des photos en haute définition (3e essai de uploadPhotos, index.html)
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
- api/create-checkout.js (187 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (31 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (350 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
