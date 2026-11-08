(function () {
  'use strict';

  var $ = window.KK.$;
  var $$ = window.KK.$$;
  var prefersReducedMotion = window.KK.prefersReducedMotion;

  var revealables = $$('.reveal');

  if (revealables.length) {
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      revealables.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
      );
      revealables.forEach(function (el, index) {
        el.style.transitionDelay = (index % 4) * 60 + 'ms';
        revealObserver.observe(el);
      });
    }
  }

  /* --------------------------------------------------------- Skill levels */

  $$('.dots').forEach(function (meter) {
    var level = parseInt(meter.getAttribute('data-level'), 10) || 0;
    var html = '';
    for (var i = 1; i <= 5; i += 1) {
      html += '<i class="' + (i <= level ? 'on' : '') + '"></i>';
    }
    meter.innerHTML = html;
  });

  /* ---------------------------------------------------------------- Marquee */

  var track = $('#marquee-track');
  if (track && !prefersReducedMotion) {
    track.innerHTML += track.innerHTML;
  }

  /* --------------------------------------------------------- Rotating word */

  var rotator = $('#rotator');
  if (rotator) {
    var words = $$('.rotator-item', rotator);
    var current = 0;

    /* Un texte masque fige le nom accessible : les mots animes restent
       decoratifs pour les technologies d'assistance. */
    words.forEach(function (word) {
      word.setAttribute('aria-hidden', 'true');
    });

    if (!prefersReducedMotion && words.length > 1) {
      setInterval(function () {
        words[current].classList.remove('is-current');
        words[current].classList.add('is-leaving');
        var previous = current;
        current = (current + 1) % words.length;
        words[current].classList.add('is-current');

        setTimeout(function () {
          words[previous].classList.remove('is-leaving');
        }, 450);
      }, 2800);
    }
  }

})();
