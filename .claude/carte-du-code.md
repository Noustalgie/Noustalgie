# Carte de public/index.html

Générée automatiquement (8647 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1621 : <style> (134 Ko)
- lignes 1622-1694 : <script type="application/ld+json"> (2 Ko)
- lignes 1695-1790 : <script type="application/ld+json"> (6 Ko)
- lignes 2346-4518 : <script> (186 Ko)
- lignes 4519-5844 : <script> (122 Ko)
- lignes 5845-8618 : <script> (236 Ko)
- lignes 8619-8644 : <script> (2 Ko)

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
 4846  Style Magazine : le livre comme un magazine de couple
 6020  1. Import des photos : une version écran + une version impression
 6310  2. Génération : histoire + légendes à partir des photos
 6622  3. Éditeur
 7030  4. Sauvegarde locale (IndexedDB : photos comprises)
 7065  5. Impression : photos en pleine résolution + PDF hébergé
 7242  6. Paiement
 8149  1. Livre 3D réutilisable
 8270  2. Aperçu en direct pendant la création (ordinateur)
 8304  3. Photos : date de prise de vue, couverture, glisser-déposer
 8406  4. Génération vivante : leurs photos se posent dans un livre
 8432  5. Récapitulatif de commande avec LEUR couverture
 8470  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1818  <header>
 1819  <nav class="ed-nav">
 1841  <main id="main" tabindex="-1">
 1843  <section class="ed-hero">
 1852  <div class="nst-demo" id="nstDemo"
 1858  <section class="nst-how nst-frise" id="how">
 1872  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1895  <section class="ed-price" id="pricing">
 1932  <section class="section app-section" id="app">
 1959  <div class="panel active" id="panel0"
 2044  <div class="panel" id="panel1"
 2089  <div class="panel" id="panel2"
 2115  <div class="panel" id="panel3"
 2116  <div id="nstEd"
 2143  <div class="panel" id="panel4"
 2145  <div id="payForm"
 2223  <section class="ed-faq-section" id="faq">
 2275  <footer>
 2325  <div class="legal-overlay" id="legalOverlay"
 2331  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2351  LANGS.fr
 2439  LANGS.en
 2527  LANGS.de
 2615  LANGS.es
 2703  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2795  toggleLangMenu
 2796  pickLang
 2798  setLang
 2837  highlightPal
 2857  selectPricing
 2872  onSlider
 2885  onInAppSlider
 2908  animNum
 2914  toggleCmp
 2933  saveDraft
 2952  restoreDraft
 2959  set
 2967  clearDraft
 2991  goTab
 3030  edPickPrice
 3036  toggleFaq
 3037  startApp
 3042  addPhotosFromEditor
 3075  ensureConvertible
 3093  detectFocalY
 3113  showUploadLoader
 3125  hideUploadLoader
 3129  addPhotos
 3137  processBatch
 3174  getMinPhotos
 3178  renderPhotos
 3194  removePhoto
 3200  openMsgModal
 3201  closeMsgModal
 3202  saveMsgModal
 3207  selStyle
 3212  log
 3222  setProgress
 3233  api
 3263  runGeneration
 3495  renderBookPreview
 3505  pg
 3512  _take
 3523  pickIdx
 3529  ph
 3530  imgT
 3539  img
 3548  wantTall
 3549  wantSquare
 3550  wantWide
 3955  avRender
 3992  reapplyTexts
 3993  avBuildThumbs
 4006  avNext
 4007  avPrev
 4014  toggleEditor
 4015  edTab
 4016  refreshEditor
 4017  refreshTextFields
 4045  estRows
 4054  liveText
 4067  setActiveSlot
 4068  edSelectPhoto
 4069  updateFilter
 4070  updateCrop
 4071  updateZoom
 4072  toggleBW
 4073  applySlotEditsToDOM
 4077  saveTextStyle
 4078  updateTextStyle
 4079  toggleTextStyle
 4080  setTextSize
 4090  applyTextStylesToDOM
 4091  edSelectLayout
 4092  applyEdit
 4093  applyLayoutOverride
 4094  applyTextLive
 4095  resetEdit
 4099  initCropGestures
 4103  editorOpen
 4104  curSlot
 4112  snapshotPage
 4113  undoEdit
 4115  openFullPreview
 4122  base64ToBlob
 4134  fetchWithTimeout
 4149  processPayment
 4248  generateAlbumPDF
 4255  compressPhotoForPdf
 4319  generateAlbumPDF_UNUSED
 4386  applyPromo
 4407  selectFormat
 4429  updateFormatPrices
 4443  generateFinalPDF
 4460  addPage
 4486  openLegal
 4487  closeLegal
 4529  clamp
 4575  curLang
 4582  themeKey
 4583  theme
 4584  photos
 4589  printSrc
 4601  faceSpan
 4604  autoPos
 4609  fit
 4612  L
 4635  cropCost
 4650  slot
 4675  tx
 4682  fit
 4683  orientOf
 4850  MT
 4852  mix
 4863  MONTHS
 4867  svgHeart
 4868  svgHeartLine
 4869  svgCurl
 4870  tape
 4872  polaroid
 4879  barcode
 4888  heartMap
 4900  wordGrid
 4902  rnd
 4928  folio
 4944  col
 4948  seal
 5057  ic
 5122  mark
 5244  fmtCoord
 5248  k3Line
 5255  yearPhotos
 5266  kmBetween
 5271  villesT
 5278  planMagazine
 5360  again
 5361  freshOr
 5362  pick
 5366  mk
 5374  L
 5464  renderPage
 5485  tierOf
 5486  photoPageCount
 5487  minPhotos
 5490  distribute
 5506  pickLayout
 5523  chooseLayout
 5536  mkPage
 5540  plan
 5576  tag
 5579  takePhoto
 5650  pairOf
 5652  relayout
 5658  makeSpread
 5676  unmakeSpread
 5692  syncSpread
 5700  fixSpreads
 5740  loadDetector
 5745  go
 5755  loadImg
 5759  saliency
 5786  subjectFromFaces
 5795  analyze
 5821  analyzeAll
 5993  t
 6014  lang
 6015  nPagesSel
 6016  promo
 6021  loadImage
 6023  toJpeg
 6045  was
 6062  pickerBack
 6078  showPickHelp
 6087  close
 6109  within
 6110  decodeFile
 6140  hdBlob
 6150  importFile
 6171  toast
 6184  geom
 6189  prepThumb
 6195  prepFull
 6201  dropPhoto
 6207  tile
 6216  pump
 6244  pump2
 6264  addPhotos
 6297  renderPhotos
 6316  browserTag
 6317  callAI
 6345  thumb
 6347  coupleInfo
 6361  mqParts
 6366  magAnswers
 6385  fetchCarte
 6395  fetchVilles
 6407  storyPrompt
 6446  magFacts
 6456  magazinePrompt
 6478  cleanMag
 6479  s
 6491  captionPhotos
 6513  defaultStory
 6548  runGeneration
 6612  showIssue
 6625  isWide
 6626  snap
 6628  H
 6629  commit
 6630  restore
 6631  undo
 6632  redo
 6633  updUndo
 6638  visible
 6646  mountPage
 6651  scaleHost
 6660  drawStage
 6674  drawThumb
 6678  drawStrip
 6685  markStrip
 6691  drawThemes
 6696  revealStage
 6702  drawAll
 6703  refreshPage
 6705  afterSlotEdit
 6712  go
 6713  step
 6718  highlightSel
 6728  drawTools
 6778  rewrite
 6795  swapPhoto
 6806  movePage
 6816  bindEditor
 6989  openReader
 6992  draw
 6996  close
 6998  next
 7014  renderBookPreview
 7032  idb
 7033  idbSet
 7034  idbGet
 7035  idbDel
 7036  saveLocal
 7042  offerResume
 7066  fullBlob
 7084  dataUrlToBlob
 7085  uploadPhotos
 7087  todo
 7093  worker
 7118  nstBake
 7175  docHtml
 7183  printHtml
 7184  innerHtml
 7186  spineStyle
 7190  spineText
 7191  defaultSpine
 7192  coverHtml
 7200  generateAlbumPDF
 7206  gen
 7218  doc
 7219  tries
 7252  processPayment
 7292  goTab
 7319  lang
 7329  img
 7354  stop
 7385  upd
 7411  apply
 7430  T
 7431  nm
 7432  renderQuiz
 7438  mark
 7444  save
 7491  mail
 7638  backLbl
 7643  toc
 7650  show
 7657  openLegal
 7665  hideLegal
 7666  closeLegal
 7694  cur
 7703  paint
 7728  lang
 7733  applyUI
 7740  setLang
 7760  syncStory
 7794  ensureStoryFor
 7810  recompose
 7824  addInput
 7843  removePhoto
 7896  saveLink
 7918  openFromLink
 7928  set
 7946  trHide
 7948  trackOverlay
 7956  close
 7995  ouvrir
 8021  ekLabel
 8032  drawEbar
 8057  coach
 8063  done
 8069  goTab
 8078  draw
 8106  payLabel
 8117  highlightPal
 8122  setLang
 8137  lang
 8150  spineColors
 8177  sampleCover
 8196  auto
 8197  build
 8204  name
 8220  words
 8227  apply
 8254  build
 8263  nst70
 8283  names
 8284  renderLive
 8297  flowMode
 8306  exifDate
 8316  readAscii
 8317  scan
 8334  addPhotos
 8343  remap
 8344  applyOrder
 8357  movePhoto
 8360  sortByDate
 8369  renderPhotosPlus
 8408  startGenAnim
 8420  tick
 8428  stopGenAnim
 8430  runGeneration
 8435  noel
 8439  fill
 8442  renderSummary
 8455  syncPrice
 8466  goTab
 8488  setLang
 8505  lang
 8536  applyText
 8545  fromFrance
 8553  fromOSM
 8572  close
 8573  render
 8581  pick
 8589  search
 8625  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (42 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (145 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (85 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (25 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (251 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
