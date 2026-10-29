/* Consentement aux cookies publicitaires (pixel Meta, Google Ads) : rien n'est chargé avant « Accepter ».
   Choix gardé dans localStorage (nst_consent2 = oui | non ; nst_consent ne couvrait que Meta, d'où la nouvelle clé) ;
   « Cookies » en bas de page rouvre le bandeau.
   window.nstPixel(événement, paramètres) et window.nstGads(montant, commande) : n'envoient rien sans accord. */
(function () {
  var PIXEL = '2148419749217096', ADS = 'AW-18540584693', ACHAT = ADS + '/wjcwCNmi1KsdEPW964hF', CLE = 'nst_consent2';
  var TXT = {
    fr: ['Nous aimerions mesurer l’efficacité de nos publicités sur Facebook, Instagram et Google (cookies Meta et Google Ads). Rien n’est déposé sans votre accord.', 'En savoir plus', 'Refuser', 'Accepter', 'Cookies'],
    en: ['We would like to measure how our Facebook, Instagram and Google ads perform (Meta and Google Ads cookies). Nothing is stored without your consent.', 'Learn more', 'Decline', 'Accept', 'Cookies'],
    de: ['Wir möchten die Wirkung unserer Werbung auf Facebook, Instagram und Google messen (Meta- und Google-Ads-Cookies). Ohne Ihre Zustimmung wird nichts gespeichert.', 'Mehr erfahren', 'Ablehnen', 'Akzeptieren', 'Cookies'],
    es: ['Nos gustaría medir la eficacia de nuestros anuncios en Facebook, Instagram y Google (cookies de Meta y Google Ads). No se guarda nada sin su consentimiento.', 'Más información', 'Rechazar', 'Aceptar', 'Cookies'],
    pt: ['Gostaríamos de medir a eficácia dos nossos anúncios no Facebook, no Instagram e no Google (cookies da Meta e do Google Ads). Nada é guardado sem o seu consentimento.', 'Saber mais', 'Recusar', 'Aceitar', 'Cookies'],
  };
  var t = function () { var l = String(window.currentLang || document.documentElement.lang || 'fr').slice(0, 2); return TXT[l] || TXT.fr; };
  var lire = function () { try { return localStorage.getItem(CLE); } catch (e) { return null; } };
  var ecrire = function (v) { try { localStorage.setItem(CLE, v); } catch (e) {} };

  var charge = false;
  function pixel() {
    if (charge) return; charge = true;
    /* code officiel du pixel Meta */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL);
    window.fbq('track', 'PageView');
  }
  // Sans réponse au bandeau, l'événement attend : envoyé si le visiteur accepte, oublié s'il refuse
  var attente = [];
  var siAccord = function (f) { var c = lire(); if (c === 'oui') f(); else if (c !== 'non') attente.push(f); };
  window.nstPixel = function (ev, p) { siAccord(function () { pixel(); try { window.fbq('track', ev, p || {}); } catch (e) {} }); };

  // Google Ads : balise Google chargée après accord, achat compté sur la page de confirmation (une fois par commande)
  var gCharge = false;
  function gads() {
    if (gCharge) return; gCharge = true;
    var t = document.createElement('script'); t.async = true; t.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS;
    document.head.appendChild(t);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Mode de consentement de Google : la balise n'est chargée qu'après « Accepter », l'accord est donc transmis tel quel
    window.gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', ADS);
  }
  window.nstGads = function (v, id) { siAccord(function () { gads(); try { window.gtag('event', 'conversion', { send_to: ACHAT, value: v > 0 ? v : 49.99, currency: 'EUR', transaction_id: id || '' }); } catch (e) {} }); };

  function bandeau() {
    var old = document.getElementById('nstConsent'); if (old) old.remove();
    var x = t(), d = document.createElement('div');
    d.id = 'nstConsent'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-live', 'polite');
    d.innerHTML = '<p>' + x[0] + ' <a href="/confidentialite">' + x[1] + '</a></p><div><button type="button" data-c="non">' + x[2] + '</button><button type="button" data-c="oui">' + x[3] + '</button></div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      ecrire(b.getAttribute('data-c')); d.remove();
      if (b.getAttribute('data-c') === 'oui') { pixel(); gads(); attente.splice(0).forEach(function (f) { f(); }); } else attente = [];
    });
    document.body.appendChild(d);
  }
  window.nstConsent = bandeau;

  var css = document.createElement('style');
  css.textContent = '#nstConsent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9600;max-width:520px;margin:0 auto;padding:16px 18px;background:#fff;border:1px solid #e4dfd7;border-radius:20px;box-shadow:0 12px 40px rgba(28,26,24,.18);font:400 13.5px/1.5 "Hanken Grotesk",system-ui,sans-serif;color:#1c1a18;}'
    + '#nstConsent p{margin:0 0 12px;}#nstConsent a{color:#1c1a18;}#nstConsent div{display:flex;gap:8px;}'
    + '#nstConsent button{flex:1;min-height:42px;border:1px solid #1c1a18;border-radius:999px;background:#1c1a18;color:#fff;font:500 14px "Hanken Grotesk",system-ui,sans-serif;cursor:pointer;}'
    + '.nst-cookies{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer;}';
  document.head.appendChild(css);

  function demarrer() {
    var c = lire();
    if (c === 'oui') { pixel(); gads(); } else if (c !== 'non') bandeau();
    // « Cookies » en bas de page : changer d'avis à tout moment
    var f = document.querySelector('footer');
    if (f && !f.querySelector('.nst-cookies')) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'nst-cookies'; b.textContent = t()[4];
      b.addEventListener('click', bandeau);
      var p = document.createElement('p'); p.style.cssText = 'margin:10px 0 0;font-size:12px;opacity:.75;text-align:center'; p.appendChild(b); f.appendChild(p);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();
