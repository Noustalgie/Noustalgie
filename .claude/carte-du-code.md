# Carte de public/index.html

Générée automatiquement (8857 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1651 : <style> (137 Ko)
- lignes 1652-1724 : <script type="application/ld+json"> (2 Ko)
- lignes 1725-1828 : <script type="application/ld+json"> (6 Ko)
- lignes 2388-4560 : <script> (189 Ko)
- lignes 4561-5886 : <script> (122 Ko)
- lignes 5887-8828 : <script> (253 Ko)
- lignes 8829-8854 : <script> (2 Ko)

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
 4888  Style Magazine : le livre comme un magazine de couple
 6062  1. Import des photos : une version écran + une version impression
 6352  2. Génération : histoire + légendes à partir des photos
 6664  3. Éditeur
 7072  4. Sauvegarde locale (IndexedDB : photos comprises)
 7107  5. Impression : photos en pleine résolution + PDF hébergé
 7340  6. Paiement
 8359  1. Livre 3D réutilisable
 8480  2. Aperçu en direct pendant la création (ordinateur)
 8514  3. Photos : date de prise de vue, couverture, glisser-déposer
 8616  4. Génération vivante : leurs photos se posent dans un livre
 8642  5. Récapitulatif de commande avec LEUR couverture
 8680  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1856  <header>
 1857  <nav class="ed-nav">
 1879  <main id="main" tabindex="-1">
 1881  <section class="ed-hero">
 1890  <div class="nst-demo" id="nstDemo"
 1896  <section class="nst-how nst-frise" id="how">
 1910  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1933  <section class="ed-price" id="pricing">
 1970  <section class="section app-section" id="app">
 1997  <div class="panel active" id="panel0"
 2082  <div class="panel" id="panel1"
 2127  <div class="panel" id="panel2"
 2153  <div class="panel" id="panel3"
 2154  <div id="nstEd"
 2181  <div class="panel" id="panel4"
 2183  <div id="payForm"
 2261  <section class="ed-faq-section" id="faq">
 2317  <footer>
 2367  <div class="legal-overlay" id="legalOverlay"
 2373  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2393  LANGS.fr
 2481  LANGS.en
 2569  LANGS.de
 2657  LANGS.es
 2745  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2837  toggleLangMenu
 2838  pickLang
 2840  setLang
 2879  highlightPal
 2899  selectPricing
 2914  onSlider
 2927  onInAppSlider
 2950  animNum
 2956  toggleCmp
 2975  saveDraft
 2994  restoreDraft
 3001  set
 3009  clearDraft
 3033  goTab
 3072  edPickPrice
 3078  toggleFaq
 3079  startApp
 3084  addPhotosFromEditor
 3117  ensureConvertible
 3135  detectFocalY
 3155  showUploadLoader
 3167  hideUploadLoader
 3171  addPhotos
 3179  processBatch
 3216  getMinPhotos
 3220  renderPhotos
 3236  removePhoto
 3242  openMsgModal
 3243  closeMsgModal
 3244  saveMsgModal
 3249  selStyle
 3254  log
 3264  setProgress
 3275  api
 3305  runGeneration
 3537  renderBookPreview
 3547  pg
 3554  _take
 3565  pickIdx
 3571  ph
 3572  imgT
 3581  img
 3590  wantTall
 3591  wantSquare
 3592  wantWide
 3997  avRender
 4034  reapplyTexts
 4035  avBuildThumbs
 4048  avNext
 4049  avPrev
 4056  toggleEditor
 4057  edTab
 4058  refreshEditor
 4059  refreshTextFields
 4087  estRows
 4096  liveText
 4109  setActiveSlot
 4110  edSelectPhoto
 4111  updateFilter
 4112  updateCrop
 4113  updateZoom
 4114  toggleBW
 4115  applySlotEditsToDOM
 4119  saveTextStyle
 4120  updateTextStyle
 4121  toggleTextStyle
 4122  setTextSize
 4132  applyTextStylesToDOM
 4133  edSelectLayout
 4134  applyEdit
 4135  applyLayoutOverride
 4136  applyTextLive
 4137  resetEdit
 4141  initCropGestures
 4145  editorOpen
 4146  curSlot
 4154  snapshotPage
 4155  undoEdit
 4157  openFullPreview
 4164  base64ToBlob
 4176  fetchWithTimeout
 4191  processPayment
 4290  generateAlbumPDF
 4297  compressPhotoForPdf
 4361  generateAlbumPDF_UNUSED
 4428  applyPromo
 4449  selectFormat
 4471  updateFormatPrices
 4485  generateFinalPDF
 4502  addPage
 4528  openLegal
 4529  closeLegal
 4571  clamp
 4617  curLang
 4624  themeKey
 4625  theme
 4626  photos
 4631  printSrc
 4643  faceSpan
 4646  autoPos
 4651  fit
 4654  L
 4677  cropCost
 4692  slot
 4717  tx
 4724  fit
 4725  orientOf
 4892  MT
 4894  mix
 4905  MONTHS
 4909  svgHeart
 4910  svgHeartLine
 4911  svgCurl
 4912  tape
 4914  polaroid
 4921  barcode
 4930  heartMap
 4942  wordGrid
 4944  rnd
 4970  folio
 4986  col
 4990  seal
 5099  ic
 5164  mark
 5286  fmtCoord
 5290  k3Line
 5297  yearPhotos
 5308  kmBetween
 5313  villesT
 5320  planMagazine
 5402  again
 5403  freshOr
 5404  pick
 5408  mk
 5416  L
 5506  renderPage
 5527  tierOf
 5528  photoPageCount
 5529  minPhotos
 5532  distribute
 5548  pickLayout
 5565  chooseLayout
 5578  mkPage
 5582  plan
 5618  tag
 5621  takePhoto
 5692  pairOf
 5694  relayout
 5700  makeSpread
 5718  unmakeSpread
 5734  syncSpread
 5742  fixSpreads
 5782  loadDetector
 5787  go
 5797  loadImg
 5801  saliency
 5828  subjectFromFaces
 5837  analyze
 5863  analyzeAll
 6035  t
 6056  lang
 6057  nPagesSel
 6058  promo
 6063  loadImage
 6065  toJpeg
 6087  was
 6104  pickerBack
 6120  showPickHelp
 6129  close
 6151  within
 6152  decodeFile
 6182  hdBlob
 6192  importFile
 6213  toast
 6226  geom
 6231  prepThumb
 6237  prepFull
 6243  dropPhoto
 6249  tile
 6258  pump
 6286  pump2
 6306  addPhotos
 6339  renderPhotos
 6358  browserTag
 6359  callAI
 6387  thumb
 6389  coupleInfo
 6403  mqParts
 6408  magAnswers
 6427  fetchCarte
 6437  fetchVilles
 6449  storyPrompt
 6488  magFacts
 6498  magazinePrompt
 6520  cleanMag
 6521  s
 6533  captionPhotos
 6555  defaultStory
 6590  runGeneration
 6654  showIssue
 6667  isWide
 6668  snap
 6670  H
 6671  commit
 6672  restore
 6673  undo
 6674  redo
 6675  updUndo
 6680  visible
 6688  mountPage
 6693  scaleHost
 6702  drawStage
 6716  drawThumb
 6720  drawStrip
 6727  markStrip
 6733  drawThemes
 6738  revealStage
 6744  drawAll
 6745  refreshPage
 6747  afterSlotEdit
 6754  go
 6755  step
 6760  highlightSel
 6770  drawTools
 6820  rewrite
 6837  swapPhoto
 6848  movePage
 6858  bindEditor
 7031  openReader
 7034  draw
 7038  close
 7040  next
 7056  renderBookPreview
 7074  idb
 7075  idbSet
 7076  idbGet
 7077  idbDel
 7078  saveLocal
 7084  offerResume
 7108  fullBlob
 7126  dataUrlToBlob
 7127  uploadPhotos
 7130  todo
 7136  worker
 7161  nstBake
 7219  docHtml
 7228  printHtml
 7229  innerHtml
 7231  spineStyle
 7235  spineText
 7236  defaultSpine
 7237  coverHtml
 7253  paInnerHtml
 7260  paSheet
 7268  paCoverHtml
 7278  optSlot
 7284  afficheHtml
 7292  cadreHtml
 7296  aimantHtml
 7297  generateAlbumPDF
 7303  gen
 7310  doc
 7311  tries
 7350  processPayment
 7391  goTab
 7418  lang
 7428  img
 7453  stop
 7484  upd
 7510  apply
 7529  T
 7530  nm
 7531  renderQuiz
 7537  mark
 7543  save
 7590  mail
 7745  backLbl
 7750  toc
 7757  show
 7764  openLegal
 7772  hideLegal
 7773  closeLegal
 7801  cur
 7810  paint
 7835  lang
 7840  applyUI
 7847  setLang
 7867  syncStory
 7901  ensureStoryFor
 7917  recompose
 7931  addInput
 7950  removePhoto
 8003  saveLink
 8025  openFromLink
 8035  set
 8053  trHide
 8055  trackOverlay
 8063  close
 8102  ouvrir
 8128  ekLabel
 8139  drawEbar
 8164  coach
 8170  done
 8176  goTab
 8185  draw
 8213  payLabel
 8255  optTotal
 8257  drawOpts
 8282  fillOptImgs
 8295  pickOptPhoto
 8318  selectFormat
 8327  highlightPal
 8332  setLang
 8347  lang
 8360  spineColors
 8387  sampleCover
 8406  auto
 8407  build
 8414  name
 8430  words
 8437  apply
 8464  build
 8473  nst70
 8493  names
 8494  renderLive
 8507  flowMode
 8516  exifDate
 8526  readAscii
 8527  scan
 8544  addPhotos
 8553  remap
 8554  applyOrder
 8567  movePhoto
 8570  sortByDate
 8579  renderPhotosPlus
 8618  startGenAnim
 8630  tick
 8638  stopGenAnim
 8640  runGeneration
 8645  noel
 8649  fill
 8652  renderSummary
 8665  syncPrice
 8676  goTab
 8698  setLang
 8715  lang
 8746  applyText
 8755  fromFrance
 8763  fromOSM
 8782  close
 8783  render
 8791  pick
 8799  search
 8835  etape

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
