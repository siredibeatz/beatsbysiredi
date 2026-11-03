(function () {
  var s = window.SITE || {};

  // ---- Which edition? Guess from the phone's time zone (no tracking, no outside services).
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
  var langs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
  var guessLS = tz === 'Africa/Maseru' || /(^|,)st(-|,|$)/.test(langs); // Lesotho time, or Sesotho set as language
  var chosen = null;
  try { chosen = localStorage.getItem('bbe-edition'); } catch (e) { /* storage blocked */ }
  var lesothoOn = !!(s.showLesotho && s.apkUrlLesotho);
  var edition = lesothoOn && (chosen === 'LS' || (!chosen && guessLS)) ? 'LS' : 'KE';

  function apply(ed) {
    edition = ed;
    var ls = ed === 'LS';
    var url = ls ? s.apkUrlLesotho : s.apkUrl;
    document.querySelectorAll('[data-apk]').forEach(function (a) { if (url) a.href = url; });
    document.querySelectorAll('[data-dl-label]').forEach(function (el) {
      el.textContent = ls ? 'Download for Android · Lesotho' : 'Download for Android';
    });
    document.querySelectorAll('[data-apk-name]').forEach(function (el) {
      el.textContent = ls ? 'Beats-By-Sir-Edi-Lesotho.apk' : 'Beats-By-Sir-Edi.apk';
    });
    document.querySelectorAll('[data-ke]').forEach(function (el) {
      el.textContent = ls ? el.getAttribute('data-ls') : el.getAttribute('data-ke');
    });
    document.querySelectorAll('[data-alt-edition]').forEach(function (el) {
      if (!lesothoOn) { el.hidden = true; return; }
      el.hidden = false;
      el.textContent = '';
      el.appendChild(document.createTextNode(ls ? 'Not in Lesotho? ' : 'In Lesotho? '));
      var a = document.createElement('a');
      a.href = ls ? s.apkUrl : s.apkUrlLesotho;
      a.textContent = ls ? 'Get the Kenya version' : 'Get the Lesotho version (M-Pesa, EcoCash, Maloti)';
      a.addEventListener('click', function (e) {
        // switch the page over too, then let the download start
        try { localStorage.setItem('bbe-edition', ls ? 'KE' : 'LS'); } catch (err) { /* ignore */ }
        setTimeout(function () { apply(ls ? 'KE' : 'LS'); }, 0);
      });
      el.appendChild(a);
    });
  }
  apply(edition);

  document.querySelectorAll('[data-version]').forEach(function (el) { if (s.version) el.textContent = s.version; });
  var play = document.getElementById('play');
  if (play) {
    if (s.playUrl) { play.href = s.playUrl; play.classList.remove('soon'); play.querySelector('.play-top').textContent = 'GET IT ON'; play.removeAttribute('aria-disabled'); }
    else { play.addEventListener('click', function (e) { e.preventDefault(); }); }
  }
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
