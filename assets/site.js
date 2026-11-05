(function () {
  var s = window.SITE || {};

  // ---- Three editions. Pick one from the phone's time zone (no tracking, no outside services).
  var ED = {
    KE: { url: s.apkUrl, on: !!s.apkUrl, file: 'Beats-By-Sir-Edi.apk', btn: 'Download for Android',
          link: 'Kenya version (M-Pesa, KSh)' },
    LS: { url: s.apkUrlLesotho, on: !!(s.showLesotho && s.apkUrlLesotho), file: 'Beats-By-Sir-Edi-Lesotho.apk',
          btn: 'Download for Android · Lesotho', link: 'Lesotho version (M-Pesa, EcoCash, Maloti)' },
    GL: { url: s.apkUrlGlobal, on: !!(s.showGlobal && s.apkUrlGlobal), file: 'Beats-By-Sir-Edi-Global.apk',
          btn: 'Download for Android · Worldwide', link: 'Worldwide version (Visa / Mastercard, US$)' },
  };
  var PAY = {
    KE: ['Pay with M-Pesa', 'Secure checkout by Paystack with M-Pesa or Visa / Mastercard. Prices in Kenyan shillings.'],
    LS: ['Pay with M-Pesa or EcoCash', 'Secure checkout by MoPay with M-Pesa, EcoCash or Visa / Mastercard. Prices in Maloti.'],
    GL: ['Pay by card, anywhere', 'Secure checkout by Paystack with Visa or Mastercard. Prices in US dollars.'],
  };

  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
  var langs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
  var guess = tz === 'Africa/Maseru' || /(^|,)st(-|,|$)/.test(langs) ? 'LS'
    : tz === 'Africa/Nairobi' || /(^|,)sw(-|,|$)/.test(langs) ? 'KE'
    : 'GL';
  var chosen = null;
  try { chosen = localStorage.getItem('bbe-edition'); } catch (e) { /* storage blocked */ }
  var start = chosen && ED[chosen] && ED[chosen].on ? chosen : ED[guess].on ? guess : 'KE';

  function apply(code) {
    var ed = ED[code];
    document.querySelectorAll('[data-apk]').forEach(function (a) { if (ed.url) a.href = ed.url; });
    document.querySelectorAll('[data-dl-label]').forEach(function (el) { el.textContent = ed.btn; });
    document.querySelectorAll('[data-apk-name]').forEach(function (el) { el.textContent = ed.file; });
    document.querySelectorAll('[data-ke]').forEach(function (el) {
      el.textContent = PAY[code][el.tagName === 'H3' ? 0 : 1];
    });
    var others = Object.keys(ED).filter(function (k) { return k !== code && ED[k].on; });
    document.querySelectorAll('[data-alt-edition]').forEach(function (el) {
      el.textContent = '';
      el.hidden = !others.length;
      if (!others.length) return;
      el.appendChild(document.createTextNode('Also available: '));
      others.forEach(function (k, i) {
        if (i) el.appendChild(document.createTextNode(' · '));
        var a = document.createElement('a');
        a.href = ED[k].url;
        a.textContent = ED[k].link;
        a.addEventListener('click', function () {
          try { localStorage.setItem('bbe-edition', k); } catch (err) { /* ignore */ }
          setTimeout(function () { apply(k); }, 0); // switch the page, let the download start
        });
        el.appendChild(a);
      });
    });
  }
  apply(start);

  document.querySelectorAll('[data-version]').forEach(function (el) { if (s.version) el.textContent = s.version; });
  var play = document.getElementById('play');
  if (play) {
    if (s.playUrl) { play.href = s.playUrl; play.classList.remove('soon'); play.querySelector('.play-top').textContent = 'GET IT ON'; play.removeAttribute('aria-disabled'); }
    else { play.addEventListener('click', function (e) { e.preventDefault(); }); }
  }
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
