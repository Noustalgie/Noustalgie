# Carte de public/index.html

Générée automatiquement (8864 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1651 : <style> (137 Ko)
- lignes 1652-1725 : <script type="application/ld+json"> (2 Ko)
- lignes 1726-1829 : <script type="application/ld+json"> (6 Ko)
- lignes 2390-4562 : <script> (189 Ko)
- lignes 4563-5888 : <script> (122 Ko)
- lignes 5889-8832 : <script> (254 Ko)
- lignes 8833-8861 : <script> (2 Ko)

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
 4890  Style Magazine : le livre comme un magazine de couple
 6064  1. Import des photos : une version écran + une version impression
 6354  2. Génération : histoire + légendes à partir des photos
 6666  3. Éditeur
 7074  4. Sauvegarde locale (IndexedDB : photos comprises)
 7109  5. Impression : photos en pleine résolution + PDF hébergé
 7344  6. Paiement
 8363  1. Livre 3D réutilisable
 8484  2. Aperçu en direct pendant la création (ordinateur)
 8518  3. Photos : date de prise de vue, couverture, glisser-déposer
 8620  4. Génération vivante : leurs photos se posent dans un livre
 8646  5. Récapitulatif de commande avec LEUR couverture
 8684  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1858  <header>
 1859  <nav class="ed-nav">
 1881  <main id="main" tabindex="-1">
 1883  <section class="ed-hero">
 1892  <div class="nst-demo" id="nstDemo"
 1898  <section class="nst-how nst-frise" id="how">
 1912  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1935  <section class="ed-price" id="pricing">
 1972  <section class="section app-section" id="app">
 1999  <div class="panel active" id="panel0"
 2084  <div class="panel" id="panel1"
 2129  <div class="panel" id="panel2"
 2155  <div class="panel" id="panel3"
 2156  <div id="nstEd"
 2183  <div class="panel" id="panel4"
 2185  <div id="payForm"
 2263  <section class="ed-faq-section" id="faq">
 2319  <footer>
 2369  <div class="legal-overlay" id="legalOverlay"
 2375  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2395  LANGS.fr
 2483  LANGS.en
 2571  LANGS.de
 2659  LANGS.es
 2747  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2839  toggleLangMenu
 2840  pickLang
 2842  setLang
 2881  highlightPal
 2901  selectPricing
 2916  onSlider
 2929  onInAppSlider
 2952  animNum
 2958  toggleCmp
 2977  saveDraft
 2996  restoreDraft
 3003  set
 3011  clearDraft
 3035  goTab
 3074  edPickPrice
 3080  toggleFaq
 3081  startApp
 3086  addPhotosFromEditor
 3119  ensureConvertible
 3137  detectFocalY
 3157  showUploadLoader
 3169  hideUploadLoader
 3173  addPhotos
 3181  processBatch
 3218  getMinPhotos
 3222  renderPhotos
 3238  removePhoto
 3244  openMsgModal
 3245  closeMsgModal
 3246  saveMsgModal
 3251  selStyle
 3256  log
 3266  setProgress
 3277  api
 3307  runGeneration
 3539  renderBookPreview
 3549  pg
 3556  _take
 3567  pickIdx
 3573  ph
 3574  imgT
 3583  img
 3592  wantTall
 3593  wantSquare
 3594  wantWide
 3999  avRender
 4036  reapplyTexts
 4037  avBuildThumbs
 4050  avNext
 4051  avPrev
 4058  toggleEditor
 4059  edTab
 4060  refreshEditor
 4061  refreshTextFields
 4089  estRows
 4098  liveText
 4111  setActiveSlot
 4112  edSelectPhoto
 4113  updateFilter
 4114  updateCrop
 4115  updateZoom
 4116  toggleBW
 4117  applySlotEditsToDOM
 4121  saveTextStyle
 4122  updateTextStyle
 4123  toggleTextStyle
 4124  setTextSize
 4134  applyTextStylesToDOM
 4135  edSelectLayout
 4136  applyEdit
 4137  applyLayoutOverride
 4138  applyTextLive
 4139  resetEdit
 4143  initCropGestures
 4147  editorOpen
 4148  curSlot
 4156  snapshotPage
 4157  undoEdit
 4159  openFullPreview
 4166  base64ToBlob
 4178  fetchWithTimeout
 4193  processPayment
 4292  generateAlbumPDF
 4299  compressPhotoForPdf
 4363  generateAlbumPDF_UNUSED
 4430  applyPromo
 4451  selectFormat
 4473  updateFormatPrices
 4487  generateFinalPDF
 4504  addPage
 4530  openLegal
 4531  closeLegal
 4573  clamp
 4619  curLang
 4626  themeKey
 4627  theme
 4628  photos
 4633  printSrc
 4645  faceSpan
 4648  autoPos
 4653  fit
 4656  L
 4679  cropCost
 4694  slot
 4719  tx
 4726  fit
 4727  orientOf
 4894  MT
 4896  mix
 4907  MONTHS
 4911  svgHeart
 4912  svgHeartLine
 4913  svgCurl
 4914  tape
 4916  polaroid
 4923  barcode
 4932  heartMap
 4944  wordGrid
 4946  rnd
 4972  folio
 4988  col
 4992  seal
 5101  ic
 5166  mark
 5288  fmtCoord
 5292  k3Line
 5299  yearPhotos
 5310  kmBetween
 5315  villesT
 5322  planMagazine
 5404  again
 5405  freshOr
 5406  pick
 5410  mk
 5418  L
 5508  renderPage
 5529  tierOf
 5530  photoPageCount
 5531  minPhotos
 5534  distribute
 5550  pickLayout
 5567  chooseLayout
 5580  mkPage
 5584  plan
 5620  tag
 5623  takePhoto
 5694  pairOf
 5696  relayout
 5702  makeSpread
 5720  unmakeSpread
 5736  syncSpread
 5744  fixSpreads
 5784  loadDetector
 5789  go
 5799  loadImg
 5803  saliency
 5830  subjectFromFaces
 5839  analyze
 5865  analyzeAll
 6037  t
 6058  lang
 6059  nPagesSel
 6060  promo
 6065  loadImage
 6067  toJpeg
 6089  was
 6106  pickerBack
 6122  showPickHelp
 6131  close
 6153  within
 6154  decodeFile
 6184  hdBlob
 6194  importFile
 6215  toast
 6228  geom
 6233  prepThumb
 6239  prepFull
 6245  dropPhoto
 6251  tile
 6260  pump
 6288  pump2
 6308  addPhotos
 6341  renderPhotos
 6360  browserTag
 6361  callAI
 6389  thumb
 6391  coupleInfo
 6405  mqParts
 6410  magAnswers
 6429  fetchCarte
 6439  fetchVilles
 6451  storyPrompt
 6490  magFacts
 6500  magazinePrompt
 6522  cleanMag
 6523  s
 6535  captionPhotos
 6557  defaultStory
 6592  runGeneration
 6656  showIssue
 6669  isWide
 6670  snap
 6672  H
 6673  commit
 6674  restore
 6675  undo
 6676  redo
 6677  updUndo
 6682  visible
 6690  mountPage
 6695  scaleHost
 6704  drawStage
 6718  drawThumb
 6722  drawStrip
 6729  markStrip
 6735  drawThemes
 6740  revealStage
 6746  drawAll
 6747  refreshPage
 6749  afterSlotEdit
 6756  go
 6757  step
 6762  highlightSel
 6772  drawTools
 6822  rewrite
 6839  swapPhoto
 6850  movePage
 6860  bindEditor
 7033  openReader
 7036  draw
 7040  close
 7042  next
 7058  renderBookPreview
 7076  idb
 7077  idbSet
 7078  idbGet
 7079  idbDel
 7080  saveLocal
 7086  offerResume
 7110  fullBlob
 7128  dataUrlToBlob
 7129  uploadPhotos
 7132  todo
 7138  worker
 7163  nstBake
 7221  docHtml
 7230  printHtml
 7231  innerHtml
 7233  spineStyle
 7237  spineText
 7238  defaultSpine
 7239  coverHtml
 7255  paInnerHtml
 7262  paSheet
 7270  paCoverHtml
 7280  optSlot
 7286  afficheHtml
 7294  cadreHtml
 7298  aimantHtml
 7299  generateAlbumPDF
 7305  gen
 7312  doc
 7313  tries
 7354  processPayment
 7395  goTab
 7422  lang
 7432  img
 7457  stop
 7488  upd
 7514  apply
 7533  T
 7534  nm
 7535  renderQuiz
 7541  mark
 7547  save
 7594  mail
 7749  backLbl
 7754  toc
 7761  show
 7768  openLegal
 7776  hideLegal
 7777  closeLegal
 7805  cur
 7814  paint
 7839  lang
 7844  applyUI
 7851  setLang
 7871  syncStory
 7905  ensureStoryFor
 7921  recompose
 7935  addInput
 7954  removePhoto
 8007  saveLink
 8029  openFromLink
 8039  set
 8057  trHide
 8059  trackOverlay
 8067  close
 8106  ouvrir
 8132  ekLabel
 8143  drawEbar
 8168  coach
 8174  done
 8180  goTab
 8189  draw
 8217  payLabel
 8259  optTotal
 8261  drawOpts
 8286  fillOptImgs
 8299  pickOptPhoto
 8322  selectFormat
 8331  highlightPal
 8336  setLang
 8351  lang
 8364  spineColors
 8391  sampleCover
 8410  auto
 8411  build
 8418  name
 8434  words
 8441  apply
 8468  build
 8477  nst70
 8497  names
 8498  renderLive
 8511  flowMode
 8520  exifDate
 8530  readAscii
 8531  scan
 8548  addPhotos
 8557  remap
 8558  applyOrder
 8571  movePhoto
 8574  sortByDate
 8583  renderPhotosPlus
 8622  startGenAnim
 8634  tick
 8642  stopGenAnim
 8644  runGeneration
 8649  noel
 8653  fill
 8656  renderSummary
 8669  syncPrice
 8680  goTab
 8702  setLang
 8719  lang
 8750  applyText
 8759  fromFrance
 8767  fromOSM
 8786  close
 8787  render
 8795  pick
 8803  search
 8839  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (53 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sante.js (30 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (58 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (27 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
