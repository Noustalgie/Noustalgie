# Carte de public/index.html

Générée automatiquement (9850 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6578 : <script> (187 Ko)
- lignes 6579-9809 : <script> (288 Ko)
- lignes 9810-9847 : <script> (3 Ko)

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
 5505  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 6774  1. Import des photos : une version écran + une version impression
 7083  2. Génération : histoire + légendes à partir des photos
 7405  3. Éditeur
 7812  4. Sauvegarde locale (IndexedDB : photos comprises)
 7886  5. Impression : photos en pleine résolution + PDF hébergé
 8162  6. Paiement
 9321  1. Livre 3D réutilisable
 9442  2. Aperçu en direct pendant la création (ordinateur)
 9476  3. Photos : date de prise de vue, couverture, glisser-déposer
 9578  4. Génération vivante : leurs photos se posent dans un livre
 9604  5. Récapitulatif de commande avec LEUR couverture
 9661  6. Finitions : apparition au défilement, page tournée

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
 5511  mixc
 5512  rgba
 5517  VEIL
 5519  ratioOf
 5520  boxFor
 5522  polaDims
 5523  pola
 5532  booth
 5541  motif
 5547  sticker
 5554  txh
 5561  cadreOr
 5569  plaque
 5578  rond
 5721  row
 5739  cell
 5767  stat
 5807  laurel
 5823  sun
 5824  cloud
 5825  heart
 5870  fmtCoord
 5874  k3Line
 5881  yearPhotos
 5891  parseMeet
 5902  kmBetween
 5907  villesT
 5914  planMagazine
 5970  st
 6023  again
 6024  freshOr
 6025  pick
 6030  mk
 6041  meetTxt
 6044  L
 6174  renderPage
 6195  tierOf
 6196  photoPageCount
 6197  minPhotos
 6200  distribute
 6216  pickLayout
 6243  pickMag
 6256  chooseLayout
 6269  mkPage
 6273  plan
 6309  tag
 6312  takePhoto
 6383  pairOf
 6385  magAlbum
 6386  relayout
 6392  makeSpread
 6410  unmakeSpread
 6426  syncSpread
 6434  fixSpreads
 6474  loadDetector
 6479  go
 6489  loadImg
 6493  saliency
 6520  subjectFromFaces
 6529  analyze
 6555  analyzeAll
 6747  t
 6768  lang
 6769  nPagesSel
 6770  promo
 6775  loadImage
 6777  toJpeg
 6799  was
 6816  pickerBack
 6832  showPickHelp
 6841  close
 6863  within
 6864  decodeFile
 6894  hdBlob
 6904  importFile
 6925  toast
 6938  geom
 6943  prepThumb
 6949  prepFull
 6955  dropPhoto
 6961  tile
 6970  pump
 6998  pump2
 7018  addPhotos
 7051  renderPhotos
 7064  drawUp36
 7089  browserTag
 7090  callAI
 7118  thumb
 7120  coupleInfo
 7136  mqParts
 7141  magAnswers
 7160  fetchCarte
 7170  fetchVilles
 7182  storyPrompt
 7223  magFacts
 7233  magazinePrompt
 7255  cleanMag
 7256  s
 7268  captionPhotos
 7290  defaultStory
 7327  runGeneration
 7395  showIssue
 7408  isWide
 7409  snap
 7411  H
 7412  commit
 7413  restore
 7414  undo
 7415  redo
 7416  updUndo
 7421  visible
 7429  mountPage
 7434  scaleHost
 7443  drawStage
 7457  drawThumb
 7461  drawStrip
 7468  markStrip
 7474  drawThemes
 7479  revealStage
 7485  drawAll
 7486  refreshPage
 7488  afterSlotEdit
 7495  go
 7496  step
 7501  highlightSel
 7511  drawTools
 7562  rewrite
 7579  swapPhoto
 7588  movePage
 7598  bindEditor
 7771  openReader
 7774  draw
 7778  close
 7780  next
 7796  renderBookPreview
 7814  idb
 7815  idbSet
 7816  idbGet
 7817  idbDel
 7818  saveLocal
 7824  offerResume
 7861  proposerMagazine
 7891  lisible
 7899  hdCopie
 7904  photoAEnvoyer
 7924  dataUrlToBlob
 7928  relais
 7934  uploadPhotos
 7937  todo
 7944  worker
 7976  nstBake
 8034  docHtml
 8043  printHtml
 8044  innerHtml
 8046  spineStyle
 8050  spineText
 8051  defaultSpine
 8052  coverHtml
 8068  paInnerHtml
 8075  paSheet
 8083  paCoverHtml
 8093  optSlot
 8099  afficheHtml
 8107  cadreHtml
 8111  aimantHtml
 8112  generateAlbumPDF
 8123  gen
 8130  doc
 8131  tries
 8174  processPayment
 8180  vers
 8233  goTab
 8260  lang
 8270  img
 8295  stop
 8326  upd
 8354  apply
 8373  T
 8374  nm
 8375  renderQuiz
 8381  mark
 8387  save
 8434  mail
 8599  backLbl
 8604  toc
 8611  show
 8618  openLegal
 8626  hideLegal
 8627  closeLegal
 8655  cur
 8664  paint
 8689  lang
 8694  applyUI
 8701  setLang
 8724  syncStory
 8760  ensureStoryFor
 8776  recompose
 8790  addInput
 8819  removePhoto
 8836  selectPricing
 8887  fixTexts
 8920  saveLink
 8921  q
 8959  fermer
 8979  openFromLink
 8989  set
 9007  trHide
 9009  trackOverlay
 9017  close
 9056  ouvrir
 9085  ekLabel
 9098  drawEbar
 9123  coach
 9129  done
 9135  goTab
 9144  draw
 9175  payLabel
 9217  optTotal
 9219  drawOpts
 9244  fillOptImgs
 9257  pickOptPhoto
 9280  selectFormat
 9289  highlightPal
 9294  setLang
 9309  lang
 9322  spineColors
 9349  sampleCover
 9368  auto
 9369  build
 9376  name
 9392  words
 9399  apply
 9426  build
 9435  nst70
 9455  names
 9456  renderLive
 9469  flowMode
 9478  exifDate
 9488  readAscii
 9489  scan
 9506  addPhotos
 9515  remap
 9516  applyOrder
 9529  movePhoto
 9532  sortByDate
 9541  renderPhotosPlus
 9580  startGenAnim
 9592  tick
 9600  stopGenAnim
 9602  runGeneration
 9607  noel
 9610  noelApres
 9615  fill
 9618  renderSummary
 9631  syncPrice
 9648  cadeauLien
 9657  goTab
 9679  setLang
 9696  lang
 9727  applyText
 9736  fromFrance
 9744  fromOSM
 9763  close
 9764  render
 9772  pick
 9780  search
 9825  etape

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
