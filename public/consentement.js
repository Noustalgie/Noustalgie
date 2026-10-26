/* Consentement aux cookies publicitaires (pixel Meta) : rien n'est chargé avant « Accepter ».
   Choix gardé dans localStorage (nst_consent = oui | non) ; « Cookies » en bas de page rouvre le bandeau.
   window.nstPixel(événement, paramètres) : n'envoie rien sans accord. */
(function () {
  var PIXEL = '2148419749217096', CLE = 'nst_consent';
  var TXT = {
    fr: ['Nous aimerions mesurer l’efficacité de nos publicités sur Facebook et Instagram (cookies Meta). Rien n’est déposé sans votre accord.', 'En savoir plus', 'Refuser', 'Accepter', 'Cookies'],
    en: ['We would like to measure how our Facebook and Instagram ads perform (Meta cookies). Nothing is stored without your consent.', 'Learn more', 'Decline', 'Accept', 'Cookies'],
    de: ['Wir möchten die Wirkung unserer Werbung auf Facebook und Instagram messen (Meta-Cookies). Ohne Ihre Zustimmung wird nichts gespeichert.', 'Mehr erfahren', 'Ablehnen', 'Akzeptieren', 'Cookies'],
    es: ['Nos gustaría medir la eficacia de nuestros anuncios en Facebook e Instagram (cookies de Meta). No se guarda nada sin su consentimiento.', 'Más información', 'Rechazar', 'Aceptar', 'Cookies'],
    pt: ['Gostaríamos de medir a eficácia dos nossos anúncios no Facebook e no Instagram (cookies da Meta). Nada é guardado sem o seu consentimento.', 'Saber mais', 'Recusar', 'Aceitar', 'Cookies'],
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
  window.nstPixel = function (ev, p) { if (lire() === 'oui') { pixel(); try { window.fbq('track', ev, p || {}); } catch (e) {} } };

  function bandeau() {
    var old = document.getElementById('nstConsent'); if (old) old.remove();
    var x = t(), d = document.createElement('div');
    d.id = 'nstConsent'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-live', 'polite');
    d.innerHTML = '<p>' + x[0] + ' <a href="/confidentialite">' + x[1] + '</a></p><div><button type="button" data-c="non">' + x[2] + '</button><button type="button" data-c="oui">' + x[3] + '</button></div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      ecrire(b.getAttribute('data-c')); d.remove();
      if (b.getAttribute('data-c') === 'oui') pixel();
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
    if (c === 'oui') pixel(); else if (c !== 'non') bandeau();
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
