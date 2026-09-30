(function () {
  'use strict';

  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Thème */

  var root = document.documentElement;
  var themeToggle = $('#theme-toggle');
  var themeIcon = $('[data-theme-icon]');
  var themeMeta = $('#theme-color');

  function syncTheme() {
    var isDark = root.classList.contains('dark');
    if (themeIcon) themeIcon.className = isDark ? 'bi bi-moon-stars' : 'bi bi-sun';
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#0A0B0D' : '#F6F6F3');
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
    });
  }

  syncTheme();

  /* -------------------------------------------------------- Mobile menu */

  var navToggle = $('#nav-toggle');
  var mobileMenu = $('#mobile-menu');
  var navToggleIcon = $('[data-nav-icon]');

  function setMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.hidden = !open;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    if (navToggleIcon) navToggleIcon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(mobileMenu.hidden);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
      setMenu(false);
      navToggle.focus();
    }
  });

  $$('#mobile-menu a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  /* ------------------------------------------------- Header + active link */

  var header = $('#site-header');
  var backToTop = $('#back-to-top');

  function onScroll() {
    var scrolled = window.scrollY > 24;
    if (header) {
      header.classList.toggle('glass-strong', scrolled);
      header.style.borderBottom = scrolled ? '1px solid var(--line)' : '1px solid transparent';
    }
    if (backToTop) backToTop.classList.toggle('is-shown', window.scrollY > 600);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  var navLinks = $$('[data-nav]');
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ----------------------------------------------------- Reveal on scroll */

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

    /* Le nom accessible du conteneur est fige (aria-label) : on masque les
       mots qui ne sont pas affiches pour ne les exposer qu'une fois. */
    words.forEach(function (word, index) {
      word.setAttribute('aria-hidden', String(index !== current));
    });

    if (!prefersReducedMotion && words.length > 1) {
      setInterval(function () {
        words[current].classList.remove('is-current');
        words[current].classList.add('is-leaving');
        words[current].setAttribute('aria-hidden', 'true');
        var previous = current;
        current = (current + 1) % words.length;
        words[current].classList.add('is-current');
        words[current].setAttribute('aria-hidden', 'false');

        setTimeout(function () {
          words[previous].classList.remove('is-leaving');
        }, 450);
      }, 2800);
    }
  }

  /* -------------------------------------------------------- Project filters */

  var filterBar = $('#project-filters');
  var projectItems = $$('#project-grid [data-categories]');
  var projectEmpty = $('#project-empty');

  if (filterBar) {
    filterBar.addEventListener('click', function (event) {
      var button = event.target.closest('.filter-btn');
      if (!button) return;

      var filter = button.getAttribute('data-filter');
      var visible = 0;

      $$('.filter-btn', filterBar).forEach(function (b) {
        var active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      projectItems.forEach(function (item) {
        var categories = (item.getAttribute('data-categories') || '').split(/\s+/);
        var show = filter === 'all' || categories.indexOf(filter) !== -1;
        item.hidden = !show;
        if (show) visible += 1;
      });

      if (projectEmpty) projectEmpty.hidden = visible !== 0;
    });
  }

  /* ---------------------------------------------------------- Project modal */

  var projectModal = $('#project-modal');
  var modalTitle = $('#project-modal-title');
  var modalTagline = $('#project-modal-tagline');
  var modalBody = $('#project-modal-body');

  var taglines = {
    schoolflow: 'Plateforme SaaS de gestion de complexes scolaires',
    majifuzo: 'Application desktop de gestion scolaire',
    businessflow: "Solution de gestion d'activités commerciales",
    peguywax: "Logiciel de gestion d'atelier de couture",
    'educ-me': 'Plateforme éducative numérique',
    englishpro: 'Plateforme de formation professionnelle en anglais',
  };

  function openProject(slug, trigger) {
    var template = document.getElementById('tpl-' + slug);
    if (!template || !projectModal || !modalBody) return;

    var heading = trigger ? trigger.querySelector('h3') : null;
    modalTitle.textContent = (heading ? heading.textContent.trim() : '') || slug;
    modalTagline.textContent = taglines[slug] || '';
    modalBody.innerHTML = '';
    modalBody.appendChild(template.content.cloneNode(true));

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(projectModal).show();
    }
  }

  $$('.project-card').forEach(function (card) {
    var item = card.closest('[data-slug]');
    var slug = item && item.getAttribute('data-slug');

    card.addEventListener('click', function (event) {
      event.preventDefault();
      openProject(slug, card);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openProject(slug, card);
    });
  });

  /* ------------------------------------------------------------ Github stats */

  var GITHUB_USER = 'kabambakasongo';

  function setText(selector, value) {
    var el = $(selector);
    if (el) el.textContent = value;
  }

  function renderGithubStats() {
    var headers = { Accept: 'application/vnd.github+json' };

    fetch('https://api.github.com/users/' + encodeURIComponent(GITHUB_USER), { headers: headers })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (user) {
        setText('#gh-repos', user.public_repos);
        setText('#gh-followers', user.followers);
        if (user.avatar_url) {
          var avatar = $('#gh-avatar');
          if (avatar) avatar.src = user.avatar_url;
        }
        return fetch(
          'https://api.github.com/users/' +
            encodeURIComponent(GITHUB_USER) +
            '/repos?per_page=100&sort=updated',
          { headers: headers }
        );
      })
      .then(function (response) {
        if (!response || !response.ok) return [];
        return response.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) return;

        var stars = 0;
        repos.forEach(function (repo) {
          if (!repo.fork) stars += repo.stargazers_count;
        });
        setText('#gh-stars', stars);

        var list = $('#gh-repos-list');
        if (!list) return;

        var featured = repos
          .filter(function (repo) {
            return !repo.fork;
          })
          .sort(function (a, b) {
            return b.stargazers_count - a.stargazers_count;
          })
          .slice(0, 3);

        if (!featured.length) return;

        list.innerHTML = '';
        featured.forEach(function (repo) {
          var li = document.createElement('li');
          var link = document.createElement('a');
          link.className = 'd-flex align-items-center justify-content-between gap-3 text-decoration-none';
          link.href = repo.html_url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          var label = document.createElement('span');
          label.innerHTML =
            '<span class="d-block fw-semibold" style="color: var(--ink)"></span>' +
            '<span class="d-block text-subtle" style="font-size: 0.8rem"></span>';
          label.children[0].textContent = repo.name;
          label.children[1].textContent = repo.language || 'Dépôt public';

          var star = document.createElement('span');
          star.className = 'tag flex-shrink-0';
          star.innerHTML = '<i class="bi bi-star-fill" aria-hidden="true"></i> ' + repo.stargazers_count;

          link.appendChild(label);
          link.appendChild(star);
          li.appendChild(link);
          list.appendChild(li);
        });
      })
      .catch(function () {
        setText('#gh-status', "Statistiques GitHub indisponibles pour le moment.");
      })
      .then(function () {
        var status = $('#gh-status');
        if (status && status.textContent.indexOf('Chargement') !== -1) {
          status.textContent = 'Données issues de api.github.com, sans aucune clé.';
        }
      });
  }

  var ghStatus = $('#gh-status');
  if (ghStatus) renderGithubStats();

  /* -------------------------------------------------------------- Contact */

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var CONTACT_EMAIL = 'ledouxkabamba135@gmail.com';

  var form = $('#contact-form');

  function showError(field, message) {
    var input = $('#contact-' + field);
    var error = $('#contact-' + field + '-error');
    if (input) input.classList.toggle('is-invalid', Boolean(message));
    if (!error) return;
    error.textContent = message || '';
    error.classList.toggle('d-none', !message);
  }

  function setStatus(kind, message) {
    var status = $('#contact-status');
    if (!status) return;
    var colors = { success: '#10b981', error: '#f43f5e', info: 'var(--ink-muted)' };
    status.style.color = colors[kind] || 'var(--ink-muted)';
    status.textContent = message;
  }

  if (form) {
    ['name', 'email', 'message'].forEach(function (field) {
      var input = $('#contact-' + field);
      if (!input) return;
      input.addEventListener('input', function () {
        showError(field, '');
        setStatus('info', '');
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = $('#contact-name').value.trim();
      var email = $('#contact-email').value.trim();
      var subject = $('#contact-subject').value.trim();
      var message = $('#contact-message').value.trim();
      var honeypot = $('#contact-website').value;

      if (honeypot) return;

      var hasError = false;
      if (name.length < 2) {
        showError('name', 'Indiquez votre nom (2 caractères minimum).');
        hasError = true;
      }
      if (!EMAIL_PATTERN.test(email)) {
        showError('email', 'Adresse e-mail invalide.');
        hasError = true;
      }
      if (message.length < 20) {
        showError('message', 'Décrivez votre besoin en 20 caractères minimum.');
        hasError = true;
      }
      if (hasError) {
        setStatus('error', 'Corrigez les champs signalés ci-dessus.');
        return;
      }

      var provider = form.getAttribute('data-provider') || 'none';
      var endpoint = form.getAttribute('data-endpoint') || '';
      var accessKey = form.getAttribute('data-access-key') || '';

      if (provider === 'none') {
        var subjectLine = subject || 'Demande via le portfolio';
        var body =
          'Nom : ' + name + '\nE-mail : ' + email + '\n\n' + message;
        window.location.href =
          'mailto:' +
          CONTACT_EMAIL +
          '?subject=' +
          encodeURIComponent(subjectLine) +
          '&body=' +
          encodeURIComponent(body);
        setStatus('info', "Votre logiciel de messagerie s'ouvre avec le message prêt à partir.");
        return;
      }

      var submit = $('#contact-submit');
      var label = $('#contact-submit-label');
      if (submit) submit.disabled = true;
      if (label) label.textContent = 'Envoi...';

      var payload = { name: name, email: email, subject: subject, message: message };
      var request;

      if (provider === 'formspree' && endpoint) {
        request = fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      } else if (provider === 'web3forms' && accessKey) {
        payload.access_key = accessKey;
        request = fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        setStatus('error', "Aucun service d'envoi configuré. Écrivez-moi directement par e-mail.");
        if (submit) submit.disabled = false;
        if (label) label.textContent = 'Envoyer le message';
        return;
      }

      request
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          form.reset();
          setStatus('success', 'Merci ! Votre message a bien été envoyé, je vous réponds sous 48 h.');
        })
        .catch(function () {
          setStatus(
            'error',
            "L'envoi a échoué. Vous pouvez m'écrire directement à " + CONTACT_EMAIL + ' ou sur WhatsApp.'
          );
        })
        .then(function () {
          if (submit) submit.disabled = false;
          if (label) label.textContent = 'Envoyer le message';
        });
    });
  }

  /* ------------------------------------------------------- Copy & partage */

  var copyBtn = $('#copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var value = copyBtn.getAttribute('data-copy') || '';
      var icon = copyBtn.querySelector('i');

      var done = function () {
        if (icon) icon.className = 'bi bi-check2';
        copyBtn.lastChild.textContent = ' Adresse copiée';
        setTimeout(function () {
          if (icon) icon.className = 'bi bi-clipboard';
          copyBtn.lastChild.textContent = " Copier l'adresse e-mail";
        }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done);
      } else {
        var helper = document.createElement('textarea');
        helper.value = value;
        helper.setAttribute('readonly', '');
        helper.style.position = 'absolute';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {
          setStatus('error', 'Copie impossible : ' + value);
        }
        document.body.removeChild(helper);
      }
    });
  }

  var shareBtn = $('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var data = {
        title: document.title,
        text: 'Portfolio de KABAMBA KASONGO, développeur Full-Stack.',
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(data.url);
      }
      shareBtn.title = 'Lien du site copié';
    });
  }
})();
