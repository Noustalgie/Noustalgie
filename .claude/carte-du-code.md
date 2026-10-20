# Carte de public/index.html

Générée automatiquement (8687 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1746 : <style> (133 Ko)
- lignes 1747-1766 : <script type="application/ld+json"> (1 Ko)
- lignes 1767-1854 : <script type="application/ld+json"> (4 Ko)
- lignes 2396-4560 : <script> (182 Ko)
- lignes 4561-5886 : <script> (122 Ko)
- lignes 5887-8658 : <script> (235 Ko)
- lignes 8659-8684 : <script> (2 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  678  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  820  FORCE FINALE : champs texte éditeur toujours sombres
  830  PANNEAUX EDITEUR : fond noir uniforme
  866  v1.1 — accessibilité & confort
  873  Noustalgie v2 — éditeur d'album
  975  v2.2 — édition au doigt
 1003  v3.3 — album : lien, format, photos, glisser-déposer, suivi
 1031  v2.2 — système de design du site
 1081  v2.3 — boutons pilule
 1090  v2.3 — galerie de vraies pages
 1105  v2.3 — garanties
 1111  v2.3 — tarifs actionnables
 1115  v2.3 — barre d'action mobile
 1128  v2.4 — hero : couverture du livre fermé
 1136  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1155  v2.5 — sélecteur de langue
 1165  v2.5 — pages d'information
 1207  v2.6 — « Comment ça marche »
 1239  v2.7 — « Comment ça marche » en frise éditoriale
 1259  v3 — indications sous les questions
 1260  v4 — livre 3D
 1284  v4 — tarifs : épaisseur réelle
 1288  v4 — aperçu en direct
 1299  v4 — photos
 1309  v4 — génération vivante
 1319  v4 — récapitulatif de commande
 1327  v4 — étapes
 1335  v4 — apparition au défilement et page tournée
 1345  v4.3 — suggestions d'adresse
 1359  v4.5 — message d'import
 1369  v4.7 — correctifs téléphone
 1385  v4.8 — édition évidente
 1404  v5.2 — photos non transmises par l'iPhone
 1415  v5.4 — lisibilité
 1420  v5.5 — finitions demandées
 1446  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1624  galerie d'accueil : lien vers l'album d'exemple complet
 1718  Fond du site (choix de Gabin) : le couple dans la montagne, flouté dans le fichier même et voilé, fixe derrièr
 4888  Style Magazine : le livre comme un magazine de couple
 6062  1. Import des photos : une version écran + une version impression
 6352  2. Génération : histoire + légendes à partir des photos
 6664  3. Éditeur
 7072  4. Sauvegarde locale (IndexedDB : photos comprises)
 7107  5. Impression : photos en pleine résolution + PDF hébergé
 7284  6. Paiement
 8189  1. Livre 3D réutilisable
 8310  2. Aperçu en direct pendant la création (ordinateur)
 8344  3. Photos : date de prise de vue, couverture, glisser-déposer
 8446  4. Génération vivante : leurs photos se posent dans un livre
 8472  5. Récapitulatif de commande avec LEUR couverture
 8510  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1882  <header>
 1883  <nav class="ed-nav">
 1905  <main id="main" tabindex="-1">
 1907  <section class="ed-hero">
 1916  <div class="nst-demo" id="nstDemo"
 1922  <section class="nst-how nst-frise" id="how">
 1936  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1958  <section class="ed-price" id="pricing">
 1991  <section class="section app-section" id="app">
 2018  <div class="panel active" id="panel0"
 2103  <div class="panel" id="panel1"
 2144  <div class="panel" id="panel2"
 2170  <div class="panel" id="panel3"
 2171  <div id="nstEd"
 2198  <div class="panel" id="panel4"
 2200  <div id="payForm"
 2278  <section class="ed-faq-section" id="faq">
 2326  <footer>
 2375  <div class="legal-overlay" id="legalOverlay"
 2381  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2401  LANGS.fr
 2488  LANGS.en
 2575  LANGS.de
 2662  LANGS.es
 2749  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2840  toggleLangMenu
 2841  pickLang
 2843  setLang
 2882  highlightPal
 2902  selectPricing
 2917  onSlider
 2930  onInAppSlider
 2953  animNum
 2959  toggleCmp
 2978  saveDraft
 2997  restoreDraft
 3004  set
 3012  clearDraft
 3036  goTab
 3075  edPickPrice
 3081  toggleFaq
 3082  startApp
 3087  addPhotosFromEditor
 3120  ensureConvertible
 3138  detectFocalY
 3158  showUploadLoader
 3170  hideUploadLoader
 3174  addPhotos
 3182  processBatch
 3219  getMinPhotos
 3223  renderPhotos
 3239  removePhoto
 3245  openMsgModal
 3246  closeMsgModal
 3247  saveMsgModal
 3252  selStyle
 3257  log
 3267  setProgress
 3278  api
 3308  runGeneration
 3540  renderBookPreview
 3550  pg
 3557  _take
 3568  pickIdx
 3574  ph
 3575  imgT
 3584  img
 3593  wantTall
 3594  wantSquare
 3595  wantWide
 4000  avRender
 4037  reapplyTexts
 4038  avBuildThumbs
 4051  avNext
 4052  avPrev
 4059  toggleEditor
 4060  edTab
 4061  refreshEditor
 4062  refreshTextFields
 4090  estRows
 4099  liveText
 4112  setActiveSlot
 4113  edSelectPhoto
 4114  updateFilter
 4115  updateCrop
 4116  updateZoom
 4117  toggleBW
 4118  applySlotEditsToDOM
 4122  saveTextStyle
 4123  updateTextStyle
 4124  toggleTextStyle
 4125  setTextSize
 4135  applyTextStylesToDOM
 4136  edSelectLayout
 4137  applyEdit
 4138  applyLayoutOverride
 4139  applyTextLive
 4140  resetEdit
 4144  initCropGestures
 4148  editorOpen
 4149  curSlot
 4157  snapshotPage
 4158  undoEdit
 4160  openFullPreview
 4167  base64ToBlob
 4179  fetchWithTimeout
 4194  processPayment
 4293  generateAlbumPDF
 4300  compressPhotoForPdf
 4364  generateAlbumPDF_UNUSED
 4431  applyPromo
 4452  selectFormat
 4474  updateFormatPrices
 4488  generateFinalPDF
 4505  addPage
 4531  openLegal
 4532  closeLegal
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
 7129  todo
 7135  worker
 7160  nstBake
 7217  docHtml
 7225  printHtml
 7226  innerHtml
 7228  spineStyle
 7232  spineText
 7233  defaultSpine
 7234  coverHtml
 7242  generateAlbumPDF
 7248  gen
 7260  doc
 7261  tries
 7294  processPayment
 7334  goTab
 7361  lang
 7371  img
 7396  stop
 7427  upd
 7453  apply
 7472  T
 7473  nm
 7474  renderQuiz
 7480  mark
 7486  save
 7533  mail
 7680  backLbl
 7685  toc
 7692  show
 7699  openLegal
 7707  hideLegal
 7708  closeLegal
 7736  cur
 7745  paint
 7770  lang
 7775  applyUI
 7782  setLang
 7802  syncStory
 7836  ensureStoryFor
 7852  recompose
 7866  addInput
 7885  removePhoto
 7938  saveLink
 7960  openFromLink
 7970  set
 7988  trHide
 7990  trackOverlay
 7998  close
 8035  ouvrir
 8061  ekLabel
 8072  drawEbar
 8097  coach
 8103  done
 8109  goTab
 8118  draw
 8146  payLabel
 8157  highlightPal
 8162  setLang
 8177  lang
 8190  spineColors
 8217  sampleCover
 8236  auto
 8237  build
 8244  name
 8260  words
 8267  apply
 8294  build
 8303  nst70
 8323  names
 8324  renderLive
 8337  flowMode
 8346  exifDate
 8356  readAscii
 8357  scan
 8374  addPhotos
 8383  remap
 8384  applyOrder
 8397  movePhoto
 8400  sortByDate
 8409  renderPhotosPlus
 8448  startGenAnim
 8460  tick
 8468  stopGenAnim
 8470  runGeneration
 8475  noel
 8479  fill
 8482  renderSummary
 8495  syncPrice
 8506  goTab
 8528  setLang
 8545  lang
 8576  applyText
 8585  fromFrance
 8593  fromOSM
 8612  close
 8613  render
 8621  pick
 8629  search
 8665  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
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
- api/tools.js (24 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (251 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
