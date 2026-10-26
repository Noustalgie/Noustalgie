# Carte de public/index.html

Générée automatiquement (8777 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1631 : <style> (135 Ko)
- lignes 1632-1704 : <script type="application/ld+json"> (2 Ko)
- lignes 1705-1808 : <script type="application/ld+json"> (6 Ko)
- lignes 2368-4540 : <script> (188 Ko)
- lignes 4541-5866 : <script> (122 Ko)
- lignes 5867-8748 : <script> (246 Ko)
- lignes 8749-8774 : <script> (2 Ko)

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
 4868  Style Magazine : le livre comme un magazine de couple
 6042  1. Import des photos : une version écran + une version impression
 6332  2. Génération : histoire + légendes à partir des photos
 6644  3. Éditeur
 7052  4. Sauvegarde locale (IndexedDB : photos comprises)
 7087  5. Impression : photos en pleine résolution + PDF hébergé
 7311  6. Paiement
 8279  1. Livre 3D réutilisable
 8400  2. Aperçu en direct pendant la création (ordinateur)
 8434  3. Photos : date de prise de vue, couverture, glisser-déposer
 8536  4. Génération vivante : leurs photos se posent dans un livre
 8562  5. Récapitulatif de commande avec LEUR couverture
 8600  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1836  <header>
 1837  <nav class="ed-nav">
 1859  <main id="main" tabindex="-1">
 1861  <section class="ed-hero">
 1870  <div class="nst-demo" id="nstDemo"
 1876  <section class="nst-how nst-frise" id="how">
 1890  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1913  <section class="ed-price" id="pricing">
 1950  <section class="section app-section" id="app">
 1977  <div class="panel active" id="panel0"
 2062  <div class="panel" id="panel1"
 2107  <div class="panel" id="panel2"
 2133  <div class="panel" id="panel3"
 2134  <div id="nstEd"
 2161  <div class="panel" id="panel4"
 2163  <div id="payForm"
 2241  <section class="ed-faq-section" id="faq">
 2297  <footer>
 2347  <div class="legal-overlay" id="legalOverlay"
 2353  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2373  LANGS.fr
 2461  LANGS.en
 2549  LANGS.de
 2637  LANGS.es
 2725  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2817  toggleLangMenu
 2818  pickLang
 2820  setLang
 2859  highlightPal
 2879  selectPricing
 2894  onSlider
 2907  onInAppSlider
 2930  animNum
 2936  toggleCmp
 2955  saveDraft
 2974  restoreDraft
 2981  set
 2989  clearDraft
 3013  goTab
 3052  edPickPrice
 3058  toggleFaq
 3059  startApp
 3064  addPhotosFromEditor
 3097  ensureConvertible
 3115  detectFocalY
 3135  showUploadLoader
 3147  hideUploadLoader
 3151  addPhotos
 3159  processBatch
 3196  getMinPhotos
 3200  renderPhotos
 3216  removePhoto
 3222  openMsgModal
 3223  closeMsgModal
 3224  saveMsgModal
 3229  selStyle
 3234  log
 3244  setProgress
 3255  api
 3285  runGeneration
 3517  renderBookPreview
 3527  pg
 3534  _take
 3545  pickIdx
 3551  ph
 3552  imgT
 3561  img
 3570  wantTall
 3571  wantSquare
 3572  wantWide
 3977  avRender
 4014  reapplyTexts
 4015  avBuildThumbs
 4028  avNext
 4029  avPrev
 4036  toggleEditor
 4037  edTab
 4038  refreshEditor
 4039  refreshTextFields
 4067  estRows
 4076  liveText
 4089  setActiveSlot
 4090  edSelectPhoto
 4091  updateFilter
 4092  updateCrop
 4093  updateZoom
 4094  toggleBW
 4095  applySlotEditsToDOM
 4099  saveTextStyle
 4100  updateTextStyle
 4101  toggleTextStyle
 4102  setTextSize
 4112  applyTextStylesToDOM
 4113  edSelectLayout
 4114  applyEdit
 4115  applyLayoutOverride
 4116  applyTextLive
 4117  resetEdit
 4121  initCropGestures
 4125  editorOpen
 4126  curSlot
 4134  snapshotPage
 4135  undoEdit
 4137  openFullPreview
 4144  base64ToBlob
 4156  fetchWithTimeout
 4171  processPayment
 4270  generateAlbumPDF
 4277  compressPhotoForPdf
 4341  generateAlbumPDF_UNUSED
 4408  applyPromo
 4429  selectFormat
 4451  updateFormatPrices
 4465  generateFinalPDF
 4482  addPage
 4508  openLegal
 4509  closeLegal
 4551  clamp
 4597  curLang
 4604  themeKey
 4605  theme
 4606  photos
 4611  printSrc
 4623  faceSpan
 4626  autoPos
 4631  fit
 4634  L
 4657  cropCost
 4672  slot
 4697  tx
 4704  fit
 4705  orientOf
 4872  MT
 4874  mix
 4885  MONTHS
 4889  svgHeart
 4890  svgHeartLine
 4891  svgCurl
 4892  tape
 4894  polaroid
 4901  barcode
 4910  heartMap
 4922  wordGrid
 4924  rnd
 4950  folio
 4966  col
 4970  seal
 5079  ic
 5144  mark
 5266  fmtCoord
 5270  k3Line
 5277  yearPhotos
 5288  kmBetween
 5293  villesT
 5300  planMagazine
 5382  again
 5383  freshOr
 5384  pick
 5388  mk
 5396  L
 5486  renderPage
 5507  tierOf
 5508  photoPageCount
 5509  minPhotos
 5512  distribute
 5528  pickLayout
 5545  chooseLayout
 5558  mkPage
 5562  plan
 5598  tag
 5601  takePhoto
 5672  pairOf
 5674  relayout
 5680  makeSpread
 5698  unmakeSpread
 5714  syncSpread
 5722  fixSpreads
 5762  loadDetector
 5767  go
 5777  loadImg
 5781  saliency
 5808  subjectFromFaces
 5817  analyze
 5843  analyzeAll
 6015  t
 6036  lang
 6037  nPagesSel
 6038  promo
 6043  loadImage
 6045  toJpeg
 6067  was
 6084  pickerBack
 6100  showPickHelp
 6109  close
 6131  within
 6132  decodeFile
 6162  hdBlob
 6172  importFile
 6193  toast
 6206  geom
 6211  prepThumb
 6217  prepFull
 6223  dropPhoto
 6229  tile
 6238  pump
 6266  pump2
 6286  addPhotos
 6319  renderPhotos
 6338  browserTag
 6339  callAI
 6367  thumb
 6369  coupleInfo
 6383  mqParts
 6388  magAnswers
 6407  fetchCarte
 6417  fetchVilles
 6429  storyPrompt
 6468  magFacts
 6478  magazinePrompt
 6500  cleanMag
 6501  s
 6513  captionPhotos
 6535  defaultStory
 6570  runGeneration
 6634  showIssue
 6647  isWide
 6648  snap
 6650  H
 6651  commit
 6652  restore
 6653  undo
 6654  redo
 6655  updUndo
 6660  visible
 6668  mountPage
 6673  scaleHost
 6682  drawStage
 6696  drawThumb
 6700  drawStrip
 6707  markStrip
 6713  drawThemes
 6718  revealStage
 6724  drawAll
 6725  refreshPage
 6727  afterSlotEdit
 6734  go
 6735  step
 6740  highlightSel
 6750  drawTools
 6800  rewrite
 6817  swapPhoto
 6828  movePage
 6838  bindEditor
 7011  openReader
 7014  draw
 7018  close
 7020  next
 7036  renderBookPreview
 7054  idb
 7055  idbSet
 7056  idbGet
 7057  idbDel
 7058  saveLocal
 7064  offerResume
 7088  fullBlob
 7106  dataUrlToBlob
 7107  uploadPhotos
 7109  todo
 7115  worker
 7140  nstBake
 7198  docHtml
 7207  printHtml
 7208  innerHtml
 7210  spineStyle
 7214  spineText
 7215  defaultSpine
 7216  coverHtml
 7232  paInnerHtml
 7239  paSheet
 7247  paCoverHtml
 7257  afficheHtml
 7264  cadreHtml
 7269  generateAlbumPDF
 7275  gen
 7282  doc
 7283  tries
 7321  processPayment
 7362  goTab
 7389  lang
 7399  img
 7424  stop
 7455  upd
 7481  apply
 7500  T
 7501  nm
 7502  renderQuiz
 7508  mark
 7514  save
 7561  mail
 7716  backLbl
 7721  toc
 7728  show
 7735  openLegal
 7743  hideLegal
 7744  closeLegal
 7772  cur
 7781  paint
 7806  lang
 7811  applyUI
 7818  setLang
 7838  syncStory
 7872  ensureStoryFor
 7888  recompose
 7902  addInput
 7921  removePhoto
 7974  saveLink
 7996  openFromLink
 8006  set
 8024  trHide
 8026  trackOverlay
 8034  close
 8073  ouvrir
 8099  ekLabel
 8110  drawEbar
 8135  coach
 8141  done
 8147  goTab
 8156  draw
 8184  payLabel
 8215  optTotal
 8217  drawOpts
 8238  selectFormat
 8247  highlightPal
 8252  setLang
 8267  lang
 8280  spineColors
 8307  sampleCover
 8326  auto
 8327  build
 8334  name
 8350  words
 8357  apply
 8384  build
 8393  nst70
 8413  names
 8414  renderLive
 8427  flowMode
 8436  exifDate
 8446  readAscii
 8447  scan
 8464  addPhotos
 8473  remap
 8474  applyOrder
 8487  movePhoto
 8490  sortByDate
 8499  renderPhotosPlus
 8538  startGenAnim
 8550  tick
 8558  stopGenAnim
 8560  runGeneration
 8565  noel
 8569  fill
 8572  renderSummary
 8585  syncPrice
 8596  goTab
 8618  setLang
 8635  lang
 8666  applyText
 8675  fromFrance
 8683  fromOSM
 8702  close
 8703  render
 8711  pick
 8719  search
 8755  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (53 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (54 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (172 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (100 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (26 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (286 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
