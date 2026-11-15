# Carte de public/index.html

Générée automatiquement (9278 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6018 : <script> (127 Ko)
- lignes 6019-9237 : <script> (282 Ko)
- lignes 9238-9275 : <script> (3 Ko)

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
 6214  1. Import des photos : une version écran + une version impression
 6523  2. Génération : histoire + légendes à partir des photos
 6841  3. Éditeur
 7248  4. Sauvegarde locale (IndexedDB : photos comprises)
 7322  5. Impression : photos en pleine résolution + PDF hébergé
 7598  6. Paiement
 8749  1. Livre 3D réutilisable
 8870  2. Aperçu en direct pendant la création (ordinateur)
 8904  3. Photos : date de prise de vue, couverture, glisser-déposer
 9006  4. Génération vivante : leurs photos se posent dans un livre
 9032  5. Récapitulatif de commande avec LEUR couverture
 9089  6. Finitions : apparition au défilement, page tournée

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
 5418  fmtCoord
 5422  k3Line
 5429  yearPhotos
 5440  kmBetween
 5445  villesT
 5452  planMagazine
 5534  again
 5535  freshOr
 5536  pick
 5540  mk
 5548  L
 5638  renderPage
 5659  tierOf
 5660  photoPageCount
 5661  minPhotos
 5664  distribute
 5680  pickLayout
 5697  chooseLayout
 5710  mkPage
 5714  plan
 5750  tag
 5753  takePhoto
 5824  pairOf
 5826  relayout
 5832  makeSpread
 5850  unmakeSpread
 5866  syncSpread
 5874  fixSpreads
 5914  loadDetector
 5919  go
 5929  loadImg
 5933  saliency
 5960  subjectFromFaces
 5969  analyze
 5995  analyzeAll
 6187  t
 6208  lang
 6209  nPagesSel
 6210  promo
 6215  loadImage
 6217  toJpeg
 6239  was
 6256  pickerBack
 6272  showPickHelp
 6281  close
 6303  within
 6304  decodeFile
 6334  hdBlob
 6344  importFile
 6365  toast
 6378  geom
 6383  prepThumb
 6389  prepFull
 6395  dropPhoto
 6401  tile
 6410  pump
 6438  pump2
 6458  addPhotos
 6491  renderPhotos
 6504  drawUp36
 6529  browserTag
 6530  callAI
 6558  thumb
 6560  coupleInfo
 6576  mqParts
 6581  magAnswers
 6600  fetchCarte
 6610  fetchVilles
 6622  storyPrompt
 6661  magFacts
 6671  magazinePrompt
 6693  cleanMag
 6694  s
 6706  captionPhotos
 6728  defaultStory
 6763  runGeneration
 6831  showIssue
 6844  isWide
 6845  snap
 6847  H
 6848  commit
 6849  restore
 6850  undo
 6851  redo
 6852  updUndo
 6857  visible
 6865  mountPage
 6870  scaleHost
 6879  drawStage
 6893  drawThumb
 6897  drawStrip
 6904  markStrip
 6910  drawThemes
 6915  revealStage
 6921  drawAll
 6922  refreshPage
 6924  afterSlotEdit
 6931  go
 6932  step
 6937  highlightSel
 6947  drawTools
 6998  rewrite
 7015  swapPhoto
 7024  movePage
 7034  bindEditor
 7207  openReader
 7210  draw
 7214  close
 7216  next
 7232  renderBookPreview
 7250  idb
 7251  idbSet
 7252  idbGet
 7253  idbDel
 7254  saveLocal
 7260  offerResume
 7297  proposerMagazine
 7327  lisible
 7335  hdCopie
 7340  photoAEnvoyer
 7360  dataUrlToBlob
 7364  relais
 7370  uploadPhotos
 7373  todo
 7380  worker
 7412  nstBake
 7470  docHtml
 7479  printHtml
 7480  innerHtml
 7482  spineStyle
 7486  spineText
 7487  defaultSpine
 7488  coverHtml
 7504  paInnerHtml
 7511  paSheet
 7519  paCoverHtml
 7529  optSlot
 7535  afficheHtml
 7543  cadreHtml
 7547  aimantHtml
 7548  generateAlbumPDF
 7559  gen
 7566  doc
 7567  tries
 7610  processPayment
 7616  vers
 7669  goTab
 7696  lang
 7706  img
 7731  stop
 7762  upd
 7790  apply
 7809  T
 7810  nm
 7811  renderQuiz
 7817  mark
 7823  save
 7870  mail
 8035  backLbl
 8040  toc
 8047  show
 8054  openLegal
 8062  hideLegal
 8063  closeLegal
 8091  cur
 8100  paint
 8125  lang
 8130  applyUI
 8137  setLang
 8159  syncStory
 8193  ensureStoryFor
 8209  recompose
 8223  addInput
 8252  removePhoto
 8269  selectPricing
 8320  fixTexts
 8353  saveLink
 8354  q
 8392  fermer
 8412  openFromLink
 8422  set
 8440  trHide
 8442  trackOverlay
 8450  close
 8489  ouvrir
 8515  ekLabel
 8526  drawEbar
 8551  coach
 8557  done
 8563  goTab
 8572  draw
 8603  payLabel
 8645  optTotal
 8647  drawOpts
 8672  fillOptImgs
 8685  pickOptPhoto
 8708  selectFormat
 8717  highlightPal
 8722  setLang
 8737  lang
 8750  spineColors
 8777  sampleCover
 8796  auto
 8797  build
 8804  name
 8820  words
 8827  apply
 8854  build
 8863  nst70
 8883  names
 8884  renderLive
 8897  flowMode
 8906  exifDate
 8916  readAscii
 8917  scan
 8934  addPhotos
 8943  remap
 8944  applyOrder
 8957  movePhoto
 8960  sortByDate
 8969  renderPhotosPlus
 9008  startGenAnim
 9020  tick
 9028  stopGenAnim
 9030  runGeneration
 9035  noel
 9038  noelApres
 9043  fill
 9046  renderSummary
 9059  syncPrice
 9076  cadeauLien
 9085  goTab
 9107  setLang
 9124  lang
 9155  applyText
 9164  fromFrance
 9172  fromOSM
 9191  close
 9192  render
 9200  pick
 9208  search
 9253  etape

## api/

- api/_fn/album.js (124 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cadeau.js (90 lignes) /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/photo.js (40 lignes) /api/tools?fn=photo — secours de l'envoi des photos en haute définition (3e essai de uploadPhotos, index.html)
- api/_fn/printapi-hook.js (77 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cadeau.js (75 lignes) api/_lib/cadeau.js — cartes cadeaux (49,99 €, soit un livre imprimé de 36 pages livré)
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (93 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (187 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (31 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (350 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
