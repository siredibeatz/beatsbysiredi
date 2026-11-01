(function () {
  var s = window.SITE || {};
  document.querySelectorAll('[data-apk]').forEach(function (a) { if (s.apkUrl) a.href = s.apkUrl; });
  document.querySelectorAll('[data-version]').forEach(function (el) { if (s.version) el.textContent = s.version; });
  var play = document.getElementById('play');
  if (play) {
    if (s.playUrl) { play.href = s.playUrl; play.classList.remove('soon'); play.querySelector('.play-top').textContent = 'GET IT ON'; play.removeAttribute('aria-disabled'); }
    else { play.addEventListener('click', function (e) { e.preventDefault(); }); }
  }
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
