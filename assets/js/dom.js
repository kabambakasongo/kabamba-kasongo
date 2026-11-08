(function () {
  'use strict';

  window.KK = {
    $: function (selector, scope) {
      return (scope || document).querySelector(selector);
    },
    $$: function (selector, scope) {
      return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    },
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
})();
