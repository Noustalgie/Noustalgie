# Carte de public/index.html

Générée automatiquement (10475 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2486-4659 : <script> (190 Ko)
- lignes 4660-7202 : <script> (259 Ko)
- lignes 7203-10434 : <script> (289 Ko)
- lignes 10435-10472 : <script> (3 Ko)

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
 6222  Magazine v4 : les pages des magazines envoyés par Gabin, au plus près (20 novembre, « exactement pareil »)
 7398  1. Import des photos : une version écran + une version impression
 7707  2. Génération : histoire + légendes à partir des photos
 8029  3. Éditeur
 8436  4. Sauvegarde locale (IndexedDB : photos comprises)
 8510  5. Impression : photos en pleine résolution + PDF hébergé
 8786  6. Paiement
 9946  1. Livre 3D réutilisable
10067  2. Aperçu en direct pendant la création (ordinateur)
10101  3. Photos : date de prise de vue, couverture, glisser-déposer
10203  4. Génération vivante : leurs photos se posent dans un livre
10229  5. Récapitulatif de commande avec LEUR couverture
10286  6. Finitions : apparition au défilement, page tournée

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
 6261  dixItem
 6268  flat
 6270  fenetre
 6271  sparkle
 6349  ico
 6430  fmtCoord
 6434  k3Line
 6441  yearPhotos
 6451  parseMeet
 6462  kmBetween
 6467  villesT
 6474  planMagazine
 6541  st
 6555  singles
 6604  again
 6605  freshOr
 6606  pick
 6611  mk
 6622  meetTxt
 6626  L
 6798  renderPage
 6819  tierOf
 6820  photoPageCount
 6821  minPhotos
 6824  distribute
 6840  pickLayout
 6867  pickMag
 6880  chooseLayout
 6893  mkPage
 6897  plan
 6933  tag
 6936  takePhoto
 7007  pairOf
 7009  magAlbum
 7010  relayout
 7016  makeSpread
 7034  unmakeSpread
 7050  syncSpread
 7058  fixSpreads
 7098  loadDetector
 7103  go
 7113  loadImg
 7117  saliency
 7144  subjectFromFaces
 7153  analyze
 7179  analyzeAll
 7371  t
 7392  lang
 7393  nPagesSel
 7394  promo
 7399  loadImage
 7401  toJpeg
 7423  was
 7440  pickerBack
 7456  showPickHelp
 7465  close
 7487  within
 7488  decodeFile
 7518  hdBlob
 7528  importFile
 7549  toast
 7562  geom
 7567  prepThumb
 7573  prepFull
 7579  dropPhoto
 7585  tile
 7594  pump
 7622  pump2
 7642  addPhotos
 7675  renderPhotos
 7688  drawUp36
 7713  browserTag
 7714  callAI
 7742  thumb
 7744  coupleInfo
 7760  mqParts
 7765  magAnswers
 7784  fetchCarte
 7794  fetchVilles
 7806  storyPrompt
 7847  magFacts
 7857  magazinePrompt
 7879  cleanMag
 7880  s
 7892  captionPhotos
 7914  defaultStory
 7951  runGeneration
 8019  showIssue
 8032  isWide
 8033  snap
 8035  H
 8036  commit
 8037  restore
 8038  undo
 8039  redo
 8040  updUndo
 8045  visible
 8053  mountPage
 8058  scaleHost
 8067  drawStage
 8081  drawThumb
 8085  drawStrip
 8092  markStrip
 8098  drawThemes
 8103  revealStage
 8109  drawAll
 8110  refreshPage
 8112  afterSlotEdit
 8119  go
 8120  step
 8125  highlightSel
 8135  drawTools
 8186  rewrite
 8203  swapPhoto
 8212  movePage
 8222  bindEditor
 8395  openReader
 8398  draw
 8402  close
 8404  next
 8420  renderBookPreview
 8438  idb
 8439  idbSet
 8440  idbGet
 8441  idbDel
 8442  saveLocal
 8448  offerResume
 8485  proposerMagazine
 8515  lisible
 8523  hdCopie
 8528  photoAEnvoyer
 8548  dataUrlToBlob
 8552  relais
 8558  uploadPhotos
 8561  todo
 8568  worker
 8600  nstBake
 8658  docHtml
 8667  printHtml
 8668  innerHtml
 8670  spineStyle
 8674  spineText
 8675  defaultSpine
 8676  coverHtml
 8692  paInnerHtml
 8699  paSheet
 8707  paCoverHtml
 8717  optSlot
 8723  afficheHtml
 8731  cadreHtml
 8735  aimantHtml
 8736  generateAlbumPDF
 8747  gen
 8754  doc
 8755  tries
 8798  processPayment
 8804  vers
 8857  goTab
 8884  lang
 8894  img
 8919  stop
 8950  upd
 8978  apply
 8997  T
 8998  nm
 8999  renderQuiz
 9005  mark
 9011  save
 9058  mail
 9223  backLbl
 9228  toc
 9235  show
 9242  openLegal
 9250  hideLegal
 9251  closeLegal
 9279  cur
 9288  paint
 9313  lang
 9318  applyUI
 9325  setLang
 9348  syncStory
 9384  ensureStoryFor
 9400  recompose
 9414  addInput
 9443  removePhoto
 9460  selectPricing
 9511  fixTexts
 9544  saveLink
 9545  q
 9583  fermer
 9603  openFromLink
 9613  set
 9631  trHide
 9633  trackOverlay
 9641  close
 9680  ouvrir
 9710  ekLabel
 9723  drawEbar
 9748  coach
 9754  done
 9760  goTab
 9769  draw
 9800  payLabel
 9842  optTotal
 9844  drawOpts
 9869  fillOptImgs
 9882  pickOptPhoto
 9905  selectFormat
 9914  highlightPal
 9919  setLang
 9934  lang
 9947  spineColors
 9974  sampleCover
 9993  auto
 9994  build
10001  name
10017  words
10024  apply
10051  build
10060  nst70
10080  names
10081  renderLive
10094  flowMode
10103  exifDate
10113  readAscii
10114  scan
10131  addPhotos
10140  remap
10141  applyOrder
10154  movePhoto
10157  sortByDate
10166  renderPhotosPlus
10205  startGenAnim
10217  tick
10225  stopGenAnim
10227  runGeneration
10232  noel
10235  noelApres
10240  fill
10243  renderSummary
10256  syncPrice
10273  cadeauLien
10282  goTab
10304  setLang
10321  lang
10352  applyText
10361  fromFrance
10369  fromOSM
10388  close
10389  render
10397  pick
10405  search
10450  etape

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
