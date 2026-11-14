# Carte de public/index.html

Générée automatiquement (9190 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1675 : <style> (139 Ko)
- lignes 1676-1749 : <script type="application/ld+json"> (2 Ko)
- lignes 1750-1853 : <script type="application/ld+json"> (6 Ko)
- lignes 2437-4610 : <script> (190 Ko)
- lignes 4611-5981 : <script> (127 Ko)
- lignes 5982-9149 : <script> (277 Ko)
- lignes 9150-9187 : <script> (3 Ko)

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
 4982  Style Magazine : le livre comme un magazine de couple
 6177  1. Import des photos : une version écran + une version impression
 6486  2. Génération : histoire + légendes à partir des photos
 6804  3. Éditeur
 7211  4. Sauvegarde locale (IndexedDB : photos comprises)
 7285  5. Impression : photos en pleine résolution + PDF hébergé
 7561  6. Paiement
 8671  1. Livre 3D réutilisable
 8792  2. Aperçu en direct pendant la création (ordinateur)
 8826  3. Photos : date de prise de vue, couverture, glisser-déposer
 8928  4. Génération vivante : leurs photos se posent dans un livre
 8954  5. Récapitulatif de commande avec LEUR couverture
 9001  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1882  <header>
 1883  <nav class="ed-nav">
 1905  <main id="main" tabindex="-1">
 1907  <section class="ed-hero">
 1916  <div class="nst-demo" id="nstDemo"
 1922  <section class="nst-how nst-frise" id="how">
 1936  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1959  <section class="ed-price" id="pricing">
 1997  <section class="section app-section" id="app">
 2024  <div class="panel active" id="panel0"
 2110  <div class="panel" id="panel1"
 2155  <div class="panel" id="panel2"
 2181  <div class="panel" id="panel3"
 2182  <div id="nstEd"
 2209  <div class="panel" id="panel4"
 2211  <div id="payForm"
 2292  <section class="ed-faq-section" id="faq">
 2348  <footer>
 2416  <div class="legal-overlay" id="legalOverlay"
 2422  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2442  LANGS.fr
 2530  LANGS.en
 2618  LANGS.de
 2706  LANGS.es
 2794  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2886  toggleLangMenu
 2887  pickLang
 2889  setLang
 2928  highlightPal
 2948  selectPricing
 2963  onSlider
 2976  onInAppSlider
 2999  animNum
 3005  toggleCmp
 3024  saveDraft
 3043  restoreDraft
 3050  set
 3058  clearDraft
 3082  goTab
 3121  edPickPrice
 3127  toggleFaq
 3128  startApp
 3133  addPhotosFromEditor
 3166  ensureConvertible
 3184  detectFocalY
 3204  showUploadLoader
 3216  hideUploadLoader
 3220  addPhotos
 3228  processBatch
 3265  getMinPhotos
 3269  renderPhotos
 3285  removePhoto
 3291  openMsgModal
 3292  closeMsgModal
 3293  saveMsgModal
 3298  selStyle
 3303  log
 3313  setProgress
 3324  api
 3354  runGeneration
 3586  renderBookPreview
 3596  pg
 3603  _take
 3614  pickIdx
 3620  ph
 3621  imgT
 3630  img
 3639  wantTall
 3640  wantSquare
 3641  wantWide
 4046  avRender
 4083  reapplyTexts
 4084  avBuildThumbs
 4097  avNext
 4098  avPrev
 4105  toggleEditor
 4106  edTab
 4107  refreshEditor
 4108  refreshTextFields
 4136  estRows
 4145  liveText
 4158  setActiveSlot
 4159  edSelectPhoto
 4160  updateFilter
 4161  updateCrop
 4162  updateZoom
 4163  toggleBW
 4164  applySlotEditsToDOM
 4168  saveTextStyle
 4169  updateTextStyle
 4170  toggleTextStyle
 4171  setTextSize
 4181  applyTextStylesToDOM
 4182  edSelectLayout
 4183  applyEdit
 4184  applyLayoutOverride
 4185  applyTextLive
 4186  resetEdit
 4190  initCropGestures
 4194  editorOpen
 4195  curSlot
 4203  snapshotPage
 4204  undoEdit
 4206  openFullPreview
 4213  base64ToBlob
 4225  fetchWithTimeout
 4240  processPayment
 4339  generateAlbumPDF
 4346  compressPhotoForPdf
 4410  generateAlbumPDF_UNUSED
 4477  applyPromo
 4499  selectFormat
 4521  updateFormatPrices
 4535  generateFinalPDF
 4552  addPage
 4578  openLegal
 4579  closeLegal
 4621  clamp
 4667  curLang
 4674  themeKey
 4675  theme
 4676  photos
 4681  printSrc
 4693  faceSpan
 4696  autoPos
 4701  fit
 4704  L
 4727  cropCost
 4742  slot
 4775  joli
 4796  coeur
 4799  tx
 4806  fit
 4813  haut
 4819  orientOf
 4986  MT
 4988  mix
 4999  MONTHS
 5003  svgHeart
 5004  svgHeartLine
 5005  svgCurl
 5006  tape
 5008  polaroid
 5015  barcode
 5024  heartMap
 5036  wordGrid
 5038  rnd
 5064  folio
 5080  col
 5084  seal
 5193  ic
 5258  mark
 5381  fmtCoord
 5385  k3Line
 5392  yearPhotos
 5403  kmBetween
 5408  villesT
 5415  planMagazine
 5497  again
 5498  freshOr
 5499  pick
 5503  mk
 5511  L
 5601  renderPage
 5622  tierOf
 5623  photoPageCount
 5624  minPhotos
 5627  distribute
 5643  pickLayout
 5660  chooseLayout
 5673  mkPage
 5677  plan
 5713  tag
 5716  takePhoto
 5787  pairOf
 5789  relayout
 5795  makeSpread
 5813  unmakeSpread
 5829  syncSpread
 5837  fixSpreads
 5877  loadDetector
 5882  go
 5892  loadImg
 5896  saliency
 5923  subjectFromFaces
 5932  analyze
 5958  analyzeAll
 6150  t
 6171  lang
 6172  nPagesSel
 6173  promo
 6178  loadImage
 6180  toJpeg
 6202  was
 6219  pickerBack
 6235  showPickHelp
 6244  close
 6266  within
 6267  decodeFile
 6297  hdBlob
 6307  importFile
 6328  toast
 6341  geom
 6346  prepThumb
 6352  prepFull
 6358  dropPhoto
 6364  tile
 6373  pump
 6401  pump2
 6421  addPhotos
 6454  renderPhotos
 6467  drawUp36
 6492  browserTag
 6493  callAI
 6521  thumb
 6523  coupleInfo
 6539  mqParts
 6544  magAnswers
 6563  fetchCarte
 6573  fetchVilles
 6585  storyPrompt
 6624  magFacts
 6634  magazinePrompt
 6656  cleanMag
 6657  s
 6669  captionPhotos
 6691  defaultStory
 6726  runGeneration
 6794  showIssue
 6807  isWide
 6808  snap
 6810  H
 6811  commit
 6812  restore
 6813  undo
 6814  redo
 6815  updUndo
 6820  visible
 6828  mountPage
 6833  scaleHost
 6842  drawStage
 6856  drawThumb
 6860  drawStrip
 6867  markStrip
 6873  drawThemes
 6878  revealStage
 6884  drawAll
 6885  refreshPage
 6887  afterSlotEdit
 6894  go
 6895  step
 6900  highlightSel
 6910  drawTools
 6961  rewrite
 6978  swapPhoto
 6987  movePage
 6997  bindEditor
 7170  openReader
 7173  draw
 7177  close
 7179  next
 7195  renderBookPreview
 7213  idb
 7214  idbSet
 7215  idbGet
 7216  idbDel
 7217  saveLocal
 7223  offerResume
 7260  proposerMagazine
 7290  lisible
 7298  hdCopie
 7303  photoAEnvoyer
 7323  dataUrlToBlob
 7327  relais
 7333  uploadPhotos
 7336  todo
 7343  worker
 7375  nstBake
 7433  docHtml
 7442  printHtml
 7443  innerHtml
 7445  spineStyle
 7449  spineText
 7450  defaultSpine
 7451  coverHtml
 7467  paInnerHtml
 7474  paSheet
 7482  paCoverHtml
 7492  optSlot
 7498  afficheHtml
 7506  cadreHtml
 7510  aimantHtml
 7511  generateAlbumPDF
 7522  gen
 7529  doc
 7530  tries
 7573  processPayment
 7631  goTab
 7658  lang
 7668  img
 7693  stop
 7724  upd
 7750  apply
 7769  T
 7770  nm
 7771  renderQuiz
 7777  mark
 7783  save
 7830  mail
 7994  backLbl
 7999  toc
 8006  show
 8013  openLegal
 8021  hideLegal
 8022  closeLegal
 8050  cur
 8059  paint
 8084  lang
 8089  applyUI
 8096  setLang
 8118  syncStory
 8152  ensureStoryFor
 8168  recompose
 8182  addInput
 8211  removePhoto
 8228  selectPricing
 8279  fixTexts
 8312  saveLink
 8334  openFromLink
 8344  set
 8362  trHide
 8364  trackOverlay
 8372  close
 8411  ouvrir
 8437  ekLabel
 8448  drawEbar
 8473  coach
 8479  done
 8485  goTab
 8494  draw
 8525  payLabel
 8567  optTotal
 8569  drawOpts
 8594  fillOptImgs
 8607  pickOptPhoto
 8630  selectFormat
 8639  highlightPal
 8644  setLang
 8659  lang
 8672  spineColors
 8699  sampleCover
 8718  auto
 8719  build
 8726  name
 8742  words
 8749  apply
 8776  build
 8785  nst70
 8805  names
 8806  renderLive
 8819  flowMode
 8828  exifDate
 8838  readAscii
 8839  scan
 8856  addPhotos
 8865  remap
 8866  applyOrder
 8879  movePhoto
 8882  sortByDate
 8891  renderPhotosPlus
 8930  startGenAnim
 8942  tick
 8950  stopGenAnim
 8952  runGeneration
 8957  noel
 8961  fill
 8964  renderSummary
 8977  syncPrice
 8988  cadeauLien
 8997  goTab
 9019  setLang
 9036  lang
 9067  applyText
 9076  fromFrance
 9084  fromOSM
 9103  close
 9104  render
 9112  pick
 9120  search
 9165  etape

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
