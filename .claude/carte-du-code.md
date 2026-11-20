# Carte de public/index.html

Générée automatiquement (10067 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2486-4659 : <script> (190 Ko)
- lignes 4660-6794 : <script> (212 Ko)
- lignes 6795-10026 : <script> (288 Ko)
- lignes 10027-10064 : <script> (3 Ko)

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
 6990  1. Import des photos : une version écran + une version impression
 7299  2. Génération : histoire + légendes à partir des photos
 7621  3. Éditeur
 8028  4. Sauvegarde locale (IndexedDB : photos comprises)
 8102  5. Impression : photos en pleine résolution + PDF hébergé
 8378  6. Paiement
 9538  1. Livre 3D réutilisable
 9659  2. Aperçu en direct pendant la création (ordinateur)
 9693  3. Photos : date de prise de vue, couverture, glisser-déposer
 9795  4. Génération vivante : leurs photos se posent dans un livre
 9821  5. Récapitulatif de commande avec LEUR couverture
 9878  6. Finitions : apparition au défilement, page tournée

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
 6075  fmtCoord
 6079  k3Line
 6086  yearPhotos
 6096  parseMeet
 6107  kmBetween
 6112  villesT
 6119  planMagazine
 6177  st
 6231  again
 6232  freshOr
 6233  pick
 6238  mk
 6249  meetTxt
 6252  L
 6390  renderPage
 6411  tierOf
 6412  photoPageCount
 6413  minPhotos
 6416  distribute
 6432  pickLayout
 6459  pickMag
 6472  chooseLayout
 6485  mkPage
 6489  plan
 6525  tag
 6528  takePhoto
 6599  pairOf
 6601  magAlbum
 6602  relayout
 6608  makeSpread
 6626  unmakeSpread
 6642  syncSpread
 6650  fixSpreads
 6690  loadDetector
 6695  go
 6705  loadImg
 6709  saliency
 6736  subjectFromFaces
 6745  analyze
 6771  analyzeAll
 6963  t
 6984  lang
 6985  nPagesSel
 6986  promo
 6991  loadImage
 6993  toJpeg
 7015  was
 7032  pickerBack
 7048  showPickHelp
 7057  close
 7079  within
 7080  decodeFile
 7110  hdBlob
 7120  importFile
 7141  toast
 7154  geom
 7159  prepThumb
 7165  prepFull
 7171  dropPhoto
 7177  tile
 7186  pump
 7214  pump2
 7234  addPhotos
 7267  renderPhotos
 7280  drawUp36
 7305  browserTag
 7306  callAI
 7334  thumb
 7336  coupleInfo
 7352  mqParts
 7357  magAnswers
 7376  fetchCarte
 7386  fetchVilles
 7398  storyPrompt
 7439  magFacts
 7449  magazinePrompt
 7471  cleanMag
 7472  s
 7484  captionPhotos
 7506  defaultStory
 7543  runGeneration
 7611  showIssue
 7624  isWide
 7625  snap
 7627  H
 7628  commit
 7629  restore
 7630  undo
 7631  redo
 7632  updUndo
 7637  visible
 7645  mountPage
 7650  scaleHost
 7659  drawStage
 7673  drawThumb
 7677  drawStrip
 7684  markStrip
 7690  drawThemes
 7695  revealStage
 7701  drawAll
 7702  refreshPage
 7704  afterSlotEdit
 7711  go
 7712  step
 7717  highlightSel
 7727  drawTools
 7778  rewrite
 7795  swapPhoto
 7804  movePage
 7814  bindEditor
 7987  openReader
 7990  draw
 7994  close
 7996  next
 8012  renderBookPreview
 8030  idb
 8031  idbSet
 8032  idbGet
 8033  idbDel
 8034  saveLocal
 8040  offerResume
 8077  proposerMagazine
 8107  lisible
 8115  hdCopie
 8120  photoAEnvoyer
 8140  dataUrlToBlob
 8144  relais
 8150  uploadPhotos
 8153  todo
 8160  worker
 8192  nstBake
 8250  docHtml
 8259  printHtml
 8260  innerHtml
 8262  spineStyle
 8266  spineText
 8267  defaultSpine
 8268  coverHtml
 8284  paInnerHtml
 8291  paSheet
 8299  paCoverHtml
 8309  optSlot
 8315  afficheHtml
 8323  cadreHtml
 8327  aimantHtml
 8328  generateAlbumPDF
 8339  gen
 8346  doc
 8347  tries
 8390  processPayment
 8396  vers
 8449  goTab
 8476  lang
 8486  img
 8511  stop
 8542  upd
 8570  apply
 8589  T
 8590  nm
 8591  renderQuiz
 8597  mark
 8603  save
 8650  mail
 8815  backLbl
 8820  toc
 8827  show
 8834  openLegal
 8842  hideLegal
 8843  closeLegal
 8871  cur
 8880  paint
 8905  lang
 8910  applyUI
 8917  setLang
 8940  syncStory
 8976  ensureStoryFor
 8992  recompose
 9006  addInput
 9035  removePhoto
 9052  selectPricing
 9103  fixTexts
 9136  saveLink
 9137  q
 9175  fermer
 9195  openFromLink
 9205  set
 9223  trHide
 9225  trackOverlay
 9233  close
 9272  ouvrir
 9302  ekLabel
 9315  drawEbar
 9340  coach
 9346  done
 9352  goTab
 9361  draw
 9392  payLabel
 9434  optTotal
 9436  drawOpts
 9461  fillOptImgs
 9474  pickOptPhoto
 9497  selectFormat
 9506  highlightPal
 9511  setLang
 9526  lang
 9539  spineColors
 9566  sampleCover
 9585  auto
 9586  build
 9593  name
 9609  words
 9616  apply
 9643  build
 9652  nst70
 9672  names
 9673  renderLive
 9686  flowMode
 9695  exifDate
 9705  readAscii
 9706  scan
 9723  addPhotos
 9732  remap
 9733  applyOrder
 9746  movePhoto
 9749  sortByDate
 9758  renderPhotosPlus
 9797  startGenAnim
 9809  tick
 9817  stopGenAnim
 9819  runGeneration
 9824  noel
 9827  noelApres
 9832  fill
 9835  renderSummary
 9848  syncPrice
 9865  cadeauLien
 9874  goTab
 9896  setLang
 9913  lang
 9944  applyText
 9953  fromFrance
 9961  fromOSM
 9980  close
 9981  render
 9989  pick
 9997  search
10042  etape

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
