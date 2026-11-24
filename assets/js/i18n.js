(function () {
  'use strict';

  var $$ = window.KK.$$;

  var locale = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2);
  if (locale !== 'en') locale = 'fr';

  var messages = {
    fr: {
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      themeLight: 'Activer le thème clair',
      themeDark: 'Activer le thème sombre',
      tagline_schoolflow: 'Plateforme SaaS de gestion de complexes scolaires',
      tagline_majifuzo: 'Application desktop de gestion scolaire',
      tagline_businessflow: "Solution de gestion d'activités commerciales",
      tagline_peguywax: "Logiciel de gestion d'atelier de couture",
      'tagline_educ-me': 'Plateforme éducative numérique',
      tagline_englishpro: 'Plateforme de formation professionnelle en anglais',
      tagline_manono: "Site corporate multilingue d'une société minière",
      tagline_lcs: "Site corporate multilingue d'une fonderie de cuivre",
      contactNameError: 'Indiquez votre nom (2 caractères minimum).',
      contactEmailError: 'Adresse e-mail invalide.',
      contactMessageError: 'Décrivez votre besoin en 20 caractères minimum.',
      contactErrors: 'Corrigez les champs signalés ci-dessus.',
      contactSubject: 'Demande via le portfolio',
      contactBody: function (name, email, message) {
        return 'Nom : ' + name + '\nE-mail : ' + email + '\n\n' + message;
      },
      mailerOpened: "Votre logiciel de messagerie s'ouvre avec le message prêt à partir.",
      sending: 'Envoi...',
      noProvider: "Aucun service d'envoi configuré. Écrivez-moi directement par e-mail.",
      sendMessage: 'Envoyer le message',
      sent: 'Merci ! Votre message a bien été envoyé, je vous réponds sous 48 h.',
      contactEmailFallback: 'mon adresse e-mail',
      sendFailed: function (email) {
        return "L'envoi a échoué. Vous pouvez m'écrire directement à " + email + ' ou sur WhatsApp.';
      },
      ghPublicRepo: 'Dépôt public',
      ghCached: 'Données issues de api.github.com (cache local).',
      ghLive: 'Données issues de api.github.com, sans aucune clé.',
      ghCacheFallback: 'Statistiques GitHub servies depuis le cache local.',
      ghUnavailable: 'Statistiques GitHub indisponibles pour le moment.',
      copied: ' Adresse copiée',
      copyEmail: " Copier l'adresse e-mail",
      copyFailed: function (value) {
        return 'Copie impossible : ' + value;
      },
      shareText: 'Portfolio de KABAMBA KASONGO, développeur Full-Stack.',
      shareCopied: 'Lien du site copié'
    },
    en: {
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      themeLight: 'Switch to light theme',
      themeDark: 'Switch to dark theme',
      tagline_schoolflow: 'SaaS platform for managing school complexes',
      tagline_majifuzo: 'Desktop application for school management',
      tagline_businessflow: 'Business activity management solution',
      tagline_peguywax: 'Tailoring workshop management software',
      'tagline_educ-me': 'Digital education platform',
      tagline_englishpro: 'Professional English training platform',
      tagline_manono: 'Multilingual corporate website for a mining company',
      tagline_lcs: 'Multilingual corporate website for a copper smelter',
      contactNameError: 'Please enter your name (at least 2 characters).',
      contactEmailError: 'Invalid email address.',
      contactMessageError: 'Please describe your needs in at least 20 characters.',
      contactErrors: 'Please correct the highlighted fields.',
      contactSubject: 'Enquiry via the portfolio',
      contactBody: function (name, email, message) {
        return 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      },
      mailerOpened: 'Your email client has opened with the message ready to send.',
      sending: 'Sending...',
      noProvider: 'No sending service configured. Please email me directly.',
      sendMessage: 'Send message',
      sent: 'Thank you! Your message has been sent; I usually reply within 48 hours.',
      contactEmailFallback: 'my email address',
      sendFailed: function (email) {
        return 'Sending failed. You can email me directly at ' + email + ' or on WhatsApp.';
      },
      ghPublicRepo: 'Public repository',
      ghCached: 'Data from api.github.com (local cache).',
      ghLive: 'Data from api.github.com, with no API key.',
      ghCacheFallback: 'GitHub statistics served from the local cache.',
      ghUnavailable: 'GitHub statistics are currently unavailable.',
      copied: ' Address copied',
      copyEmail: ' Copy email address',
      copyFailed: function (value) {
        return 'Could not copy: ' + value;
      },
      shareText: 'Portfolio of KABAMBA KASONGO, full-stack developer.',
      shareCopied: 'Site link copied'
    }
  };

  function t(key) {
    var value = messages[locale][key];
    return value === undefined ? messages.fr[key] : value;
  }

  function f(key) {
    var value = t(key);
    var args = Array.prototype.slice.call(arguments, 1);
    return typeof value === 'function' ? value.apply(null, args) : value;
  }

  window.KK.i18n = {
    locale: locale,
    t: t,
    f: f
  };

  $$('.lang-switch__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!window.location.hash) return;
      link.setAttribute('href', link.getAttribute('href').split('#')[0] + window.location.hash);
    });
  });

})();
