(function () {
  'use strict';

  var $ = window.KK.$;
  var $$ = window.KK.$$;

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
    manono: "Site corporate multilingue d'une société minière",
    lcs: "Site corporate multilingue d'une fonderie de cuivre",
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

})();
