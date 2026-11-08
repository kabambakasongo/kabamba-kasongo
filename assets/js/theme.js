(function () {
  'use strict';

  var $ = window.KK.$;

  var root = document.documentElement;
  var themeToggle = $('#theme-toggle');
  var themeIcon = $('[data-theme-icon]');
  var themeMeta = $('#theme-color');

  function syncTheme() {
    var isDark = root.classList.contains('dark');
    if (themeIcon) themeIcon.className = isDark ? 'bi bi-moon-stars' : 'bi bi-sun';
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#0A0B0D' : '#F6F6F3');
    if (themeToggle) {
      var label = isDark ? 'Activer le thème clair' : 'Activer le thème sombre';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.classList.contains('dark') ? 'light' : 'dark';
      root.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem('kk-theme', next);
      } catch (e) {
        /* stockage indisponible : le thème reste valable pour la session */
      }
      syncTheme();
      /* L'icone est remplacee a mi-parcours pour lire comme une rotation. */
      themeToggle.classList.add('is-swapping');
      window.setTimeout(function () {
        themeToggle.classList.remove('is-swapping');
      }, 200);
    });
  }

  syncTheme();

})();
