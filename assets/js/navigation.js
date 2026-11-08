(function () {
  'use strict';

  var $ = window.KK.$;
  var $$ = window.KK.$$;
  var prefersReducedMotion = window.KK.prefersReducedMotion;

  var navToggle = $('#nav-toggle');
  var mobileMenu = $('#mobile-menu');
  var navToggleIcon = $('[data-nav-icon]');
  var menuOpen = false;

  /* La gouttiere de defilement est reservee en CSS ; on ne compense la
     largeur manquante que sur les navigateurs qui ne savent pas la faire. */
  var needsScrollbarFix = !('scrollbarGutter' in document.documentElement.style);
  var desktopQuery = window.matchMedia('(min-width: 992px)');
  var pageMain = $('main');
  var pageFooter = $('footer');

  function menuItems() {
    if (!mobileMenu) return [];
    return $$('a[href], button:not([disabled])', mobileMenu).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function setMenu(open) {
    if (!mobileMenu || !navToggle) return;
    menuOpen = open;
    mobileMenu.setAttribute('data-open', String(open));
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    if (navToggleIcon) navToggleIcon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    document.body.classList.toggle('nav-open', open);
    /* Le contenu derriere l'overlay ne doit pas rester atteignable par les
       technologies d'assistance quand le menu est ouvert. */
    if (pageMain) pageMain.inert = open;
    if (pageFooter) pageFooter.inert = open;

    if (!open) {
      document.body.style.removeProperty('--nav-scrollbar');
      return;
    }

    if (needsScrollbarFix) {
      document.body.style.setProperty(
        '--nav-scrollbar',
        window.innerWidth - document.documentElement.clientWidth + 'px'
      );
    }
    var first = mobileMenu.querySelector('a[href]');
    if (first) first.focus();
  }

  /* Ordre d'apparition de la feuille : decale chaque item en cascade. */
  if (mobileMenu) {
    $$('.menu-mobile__list > li', mobileMenu).forEach(function (item, index) {
      item.style.setProperty('--i', index);
    });
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(!menuOpen);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!menuOpen) return;

    if (event.key === 'Escape') {
      setMenu(false);
      navToggle.focus();
      return;
    }

    if (event.key !== 'Tab') return;

    /* Piege de focus : le cycle boucle entre le bouton et la feuille. */
    var items = [navToggle].concat(menuItems());
    if (items.length < 2) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (!menuOpen) return;
    if (mobileMenu.contains(event.target) || navToggle.contains(event.target)) return;
    setMenu(false);
  });

  $$('#mobile-menu a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  /* ------------------------------------------------- Header + active link */

  var header = $('#site-header');
  var backToTop = $('#back-to-top');
  var navProgress = $('[data-nav-progress]');
  var navList = $('[data-nav-list]');
  var navIndicator = $('[data-nav-indicator]');
  var navLinks = $$('[data-nav]');

  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  var activeId = null;
  var scrollQueued = false;

  /* La pastille partagee suit le lien actif. On mesure par rect plutot
     qu'avec offsetLeft/offsetWidth, qui sont arrondis a l'entier et
     laisseraient un demi-pixel d'ecart en pleine page. */
  function syncIndicator() {
    if (!navIndicator || !navList) return;
    var current = $('.nav-link-kk.is-active', navList);
    if (!current || !navList.offsetParent) {
      navIndicator.classList.remove('is-visible');
      return;
    }
    var anchor = current.getBoundingClientRect();
    var box = navList.getBoundingClientRect();
    navIndicator.style.setProperty('--x', anchor.left - box.left + 'px');
    navIndicator.style.setProperty('--w', anchor.width + 'px');
    navIndicator.classList.add('is-visible');
  }

  function setActiveSection(id) {
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach(function (link) {
      var isCurrent = id !== null && link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    syncIndicator();
  }

  /* Lecture directe de la position plutot qu'un IntersectionObserver : la
     section courante est toujours la derniere dont le titre est passe sous
     la barre, y compris en haut de page (aucun lien actif) et en pied. */
  function syncActiveSection() {
    if (!sections.length) return;
    var id = null;

    if (window.scrollY > 100) {
      var probe = window.scrollY + (header ? header.offsetHeight : 0) + 40;
      for (var i = 0; i < sections.length; i += 1) {
        if (sections[i].getBoundingClientRect().top + window.scrollY <= probe) {
          id = sections[i].id;
        }
      }
      var atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) id = sections[sections.length - 1].id;
    }

    setActiveSection(id);
  }

  function syncProgress() {
    if (!navProgress) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    ratio = Math.min(1, Math.max(0, ratio));
    navProgress.style.setProperty('--nav-progress', ratio.toFixed(4));
  }

  function syncHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    syncProgress();
    syncActiveSection();
    if (backToTop) backToTop.classList.toggle('is-shown', window.scrollY > 600);
  }

  /* Un seul passage par image : scroll, resize etCharges de polices
     convergent tous vers la meme synchronisation. */
  function requestSync() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(function () {
      scrollQueued = false;
      syncHeader();
    });
  }

  window.addEventListener('scroll', requestSync, { passive: true });

  window.addEventListener('resize', function () {
    if (menuOpen && desktopQuery.matches) setMenu(false);
    requestSync();
  });

  if (document.fonts && document.fonts.ready) {
    /* Les largeurs changent une fois les polices echangees. */
    document.fonts.ready.then(requestSync);
  }

  requestSync();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

})();
