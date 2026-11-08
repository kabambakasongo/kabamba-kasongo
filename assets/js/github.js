(function () {
  'use strict';

  var $ = window.KK.$;

  var githubSection = $('#github');
  var GITHUB_USER = githubSection && githubSection.getAttribute('data-github-user');

  function setText(selector, value) {
    var el = $(selector);
    if (el) el.textContent = value;
  }

  function renderGithubStats() {
    var headers = { Accept: 'application/vnd.github+json' };
    var CACHE_KEY = 'kk-gh-cache';
    var CACHE_TTL = 30 * 60 * 1000;

    function render(user, repos) {
      if (user) {
        setText('#gh-repos', user.public_repos);
        setText('#gh-followers', user.followers);
        if (user.avatar_url) {
          var avatar = $('#gh-avatar');
          if (avatar) avatar.src = user.avatar_url;
        }
      }

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
    }

    /* Cache de session : l'API publique est limitee a 60 requetes par heure
       et par IP ; on evite de la solliciter a chaque visite. */
    var cached = null;
    try {
      cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    } catch (e) {
      cached = null;
    }

    if (cached && cached.t && Date.now() - cached.t < CACHE_TTL && cached.user) {
      render(cached.user, cached.repos);
      setText('#gh-status', 'Données issues de api.github.com (cache local).');
      return;
    }

    fetch('https://api.github.com/users/' + encodeURIComponent(GITHUB_USER), { headers: headers })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (user) {
        return fetch(
          'https://api.github.com/users/' +
            encodeURIComponent(GITHUB_USER) +
            '/repos?per_page=100&sort=updated',
          { headers: headers }
        )
          .then(function (response) {
            return response && response.ok ? response.json() : [];
          })
          .then(function (repos) {
            try {
              sessionStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ t: Date.now(), user: user, repos: repos })
              );
            } catch (e) {
              /* stockage indisponible : pas de cache */
            }
            render(user, repos);
            setText('#gh-status', 'Données issues de api.github.com, sans aucune clé.');
          });
      })
      .catch(function () {
        if (cached && cached.user) {
          render(cached.user, cached.repos);
          setText('#gh-status', 'Statistiques GitHub servies depuis le cache local.');
          return;
        }
        setText('#gh-status', 'Statistiques GitHub indisponibles pour le moment.');
      });
  }

  var ghStatus = $('#gh-status');
  if (ghStatus && GITHUB_USER) renderGithubStats();

})();
