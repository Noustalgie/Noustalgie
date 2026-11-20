# Carte de public/index.html

Générée automatiquement (10240 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2486-4659 : <script> (190 Ko)
- lignes 4660-6967 : <script> (232 Ko)
- lignes 6968-10199 : <script> (288 Ko)
- lignes 10200-10237 : <script> (3 Ko)

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
 5031  Style Magazine : le livre comme un magazine de couple
 5537  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 5898  Pages « objets » : nœud de satin, enveloppe, cachet de cire, carte postale
 6071  Magazine v3 : pages pleines d'après les magazines de couple envoyés par Gabin (20 novembre)
 7163  1. Import des photos : une version écran + une version impression
 7472  2. Génération : histoire + légendes à partir des photos
 7794  3. Éditeur
 8201  4. Sauvegarde locale (IndexedDB : photos comprises)
 8275  5. Impression : photos en pleine résolution + PDF hébergé
 8551  6. Paiement
 9711  1. Livre 3D réutilisable
 9832  2. Aperçu en direct pendant la création (ordinateur)
 9866  3. Photos : date de prise de vue, couverture, glisser-déposer
 9968  4. Génération vivante : leurs photos se posent dans un livre
 9994  5. Récapitulatif de commande avec LEUR couverture
10051  6. Finitions : apparition au défilement, page tournée

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
 2465  <div class="legal-overlay" id="legalOverlay"
 2471  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2491  LANGS.fr
 2579  LANGS.en
 2667  LANGS.de
 2755  LANGS.es
 2843  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2935  toggleLangMenu
 2936  pickLang
 2938  setLang
 2977  highlightPal
 2997  selectPricing
 3012  onSlider
 3025  onInAppSlider
 3048  animNum
 3054  toggleCmp
 3073  saveDraft
 3092  restoreDraft
 3099  set
 3107  clearDraft
 3131  goTab
 3170  edPickPrice
 3176  toggleFaq
 3177  startApp
 3182  addPhotosFromEditor
 3215  ensureConvertible
 3233  detectFocalY
 3253  showUploadLoader
 3265  hideUploadLoader
 3269  addPhotos
 3277  processBatch
 3314  getMinPhotos
 3318  renderPhotos
 3334  removePhoto
 3340  openMsgModal
 3341  closeMsgModal
 3342  saveMsgModal
 3347  selStyle
 3352  log
 3362  setProgress
 3373  api
 3403  runGeneration
 3635  renderBookPreview
 3645  pg
 3652  _take
 3663  pickIdx
 3669  ph
 3670  imgT
 3679  img
 3688  wantTall
 3689  wantSquare
 3690  wantWide
 4095  avRender
 4132  reapplyTexts
 4133  avBuildThumbs
 4146  avNext
 4147  avPrev
 4154  toggleEditor
 4155  edTab
 4156  refreshEditor
 4157  refreshTextFields
 4185  estRows
 4194  liveText
 4207  setActiveSlot
 4208  edSelectPhoto
 4209  updateFilter
 4210  updateCrop
 4211  updateZoom
 4212  toggleBW
 4213  applySlotEditsToDOM
 4217  saveTextStyle
 4218  updateTextStyle
 4219  toggleTextStyle
 4220  setTextSize
 4230  applyTextStylesToDOM
 4231  edSelectLayout
 4232  applyEdit
 4233  applyLayoutOverride
 4234  applyTextLive
 4235  resetEdit
 4239  initCropGestures
 4243  editorOpen
 4244  curSlot
 4252  snapshotPage
 4253  undoEdit
 4255  openFullPreview
 4262  base64ToBlob
 4274  fetchWithTimeout
 4289  processPayment
 4388  generateAlbumPDF
 4395  compressPhotoForPdf
 4459  generateAlbumPDF_UNUSED
 4526  applyPromo
 4548  selectFormat
 4570  updateFormatPrices
 4584  generateFinalPDF
 4601  addPage
 4627  openLegal
 4628  closeLegal
 4670  clamp
 4716  curLang
 4723  themeKey
 4724  theme
 4725  photos
 4730  printSrc
 4742  faceSpan
 4745  autoPos
 4750  fit
 4753  L
 4776  cropCost
 4791  slot
 4824  joli
 4845  coeur
 4848  tx
 4855  fit
 4862  haut
 4868  orientOf
 5035  MT
 5037  mix
 5048  MONTHS
 5052  svgHeart
 5053  svgHeartLine
 5054  svgCurl
 5055  tape
 5057  polaroid
 5064  barcode
 5073  heartMap
 5085  wordGrid
 5087  rnd
 5113  folio
 5119  edToc
 5120  edNames
 5131  col
 5138  col3
 5246  ic
 5311  mark
 5543  mixc
 5544  rgba
 5549  VEIL
 5551  ratioOf
 5552  boxFor
 5554  polaDims
 5555  pola
 5564  booth
 5573  motif
 5579  sticker
 5586  txh
 5593  cadreOr
 5601  plaque
 5610  rond
 5753  row
 5771  cell
 5799  stat
 5839  laurel
 5855  sun
 5856  cloud
 5857  heart
 5905  noeud
 5924  cachetCoeur
 5926  heart
 5942  objImg
 5944  cachet
 5960  envDos
 5968  envFace
 5977  timbre
 5987  tampon
 6000  haut
 6092  star4
 6093  heartHand
 6096  fillPh
 6123  petit
 6158  btn
 6203  item
 6206  card
 6226  fmtCoord
 6230  k3Line
 6237  yearPhotos
 6247  parseMeet
 6258  kmBetween
 6263  villesT
 6270  planMagazine
 6332  st
 6346  singles
 6395  again
 6396  freshOr
 6397  pick
 6402  mk
 6413  meetTxt
 6417  L
 6563  renderPage
 6584  tierOf
 6585  photoPageCount
 6586  minPhotos
 6589  distribute
 6605  pickLayout
 6632  pickMag
 6645  chooseLayout
 6658  mkPage
 6662  plan
 6698  tag
 6701  takePhoto
 6772  pairOf
 6774  magAlbum
 6775  relayout
 6781  makeSpread
 6799  unmakeSpread
 6815  syncSpread
 6823  fixSpreads
 6863  loadDetector
 6868  go
 6878  loadImg
 6882  saliency
 6909  subjectFromFaces
 6918  analyze
 6944  analyzeAll
 7136  t
 7157  lang
 7158  nPagesSel
 7159  promo
 7164  loadImage
 7166  toJpeg
 7188  was
 7205  pickerBack
 7221  showPickHelp
 7230  close
 7252  within
 7253  decodeFile
 7283  hdBlob
 7293  importFile
 7314  toast
 7327  geom
 7332  prepThumb
 7338  prepFull
 7344  dropPhoto
 7350  tile
 7359  pump
 7387  pump2
 7407  addPhotos
 7440  renderPhotos
 7453  drawUp36
 7478  browserTag
 7479  callAI
 7507  thumb
 7509  coupleInfo
 7525  mqParts
 7530  magAnswers
 7549  fetchCarte
 7559  fetchVilles
 7571  storyPrompt
 7612  magFacts
 7622  magazinePrompt
 7644  cleanMag
 7645  s
 7657  captionPhotos
 7679  defaultStory
 7716  runGeneration
 7784  showIssue
 7797  isWide
 7798  snap
 7800  H
 7801  commit
 7802  restore
 7803  undo
 7804  redo
 7805  updUndo
 7810  visible
 7818  mountPage
 7823  scaleHost
 7832  drawStage
 7846  drawThumb
 7850  drawStrip
 7857  markStrip
 7863  drawThemes
 7868  revealStage
 7874  drawAll
 7875  refreshPage
 7877  afterSlotEdit
 7884  go
 7885  step
 7890  highlightSel
 7900  drawTools
 7951  rewrite
 7968  swapPhoto
 7977  movePage
 7987  bindEditor
 8160  openReader
 8163  draw
 8167  close
 8169  next
 8185  renderBookPreview
 8203  idb
 8204  idbSet
 8205  idbGet
 8206  idbDel
 8207  saveLocal
 8213  offerResume
 8250  proposerMagazine
 8280  lisible
 8288  hdCopie
 8293  photoAEnvoyer
 8313  dataUrlToBlob
 8317  relais
 8323  uploadPhotos
 8326  todo
 8333  worker
 8365  nstBake
 8423  docHtml
 8432  printHtml
 8433  innerHtml
 8435  spineStyle
 8439  spineText
 8440  defaultSpine
 8441  coverHtml
 8457  paInnerHtml
 8464  paSheet
 8472  paCoverHtml
 8482  optSlot
 8488  afficheHtml
 8496  cadreHtml
 8500  aimantHtml
 8501  generateAlbumPDF
 8512  gen
 8519  doc
 8520  tries
 8563  processPayment
 8569  vers
 8622  goTab
 8649  lang
 8659  img
 8684  stop
 8715  upd
 8743  apply
 8762  T
 8763  nm
 8764  renderQuiz
 8770  mark
 8776  save
 8823  mail
 8988  backLbl
 8993  toc
 9000  show
 9007  openLegal
 9015  hideLegal
 9016  closeLegal
 9044  cur
 9053  paint
 9078  lang
 9083  applyUI
 9090  setLang
 9113  syncStory
 9149  ensureStoryFor
 9165  recompose
 9179  addInput
 9208  removePhoto
 9225  selectPricing
 9276  fixTexts
 9309  saveLink
 9310  q
 9348  fermer
 9368  openFromLink
 9378  set
 9396  trHide
 9398  trackOverlay
 9406  close
 9445  ouvrir
 9475  ekLabel
 9488  drawEbar
 9513  coach
 9519  done
 9525  goTab
 9534  draw
 9565  payLabel
 9607  optTotal
 9609  drawOpts
 9634  fillOptImgs
 9647  pickOptPhoto
 9670  selectFormat
 9679  highlightPal
 9684  setLang
 9699  lang
 9712  spineColors
 9739  sampleCover
 9758  auto
 9759  build
 9766  name
 9782  words
 9789  apply
 9816  build
 9825  nst70
 9845  names
 9846  renderLive
 9859  flowMode
 9868  exifDate
 9878  readAscii
 9879  scan
 9896  addPhotos
 9905  remap
 9906  applyOrder
 9919  movePhoto
 9922  sortByDate
 9931  renderPhotosPlus
 9970  startGenAnim
 9982  tick
 9990  stopGenAnim
 9992  runGeneration
 9997  noel
10000  noelApres
10005  fill
10008  renderSummary
10021  syncPrice
10038  cadeauLien
10047  goTab
10069  setLang
10086  lang
10117  applyText
10126  fromFrance
10134  fromOSM
10153  close
10154  render
10162  pick
10170  search
10215  etape

## api/

- api/_fn/album.js (126 lignes) api/album.js — « Recevoir le lien de mon album »
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
