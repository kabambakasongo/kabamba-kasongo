(function () {
  'use strict';

  var $ = window.KK.$;

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var form = $('#contact-form');
  var contactEmail = form && form.getAttribute('data-contact-email');

  function showError(field, message) {
    var input = $('#contact-' + field);
    var error = $('#contact-' + field + '-error');
    if (input) {
      input.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
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
          (contactEmail || '') +
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
            "L'envoi a échoué. Vous pouvez m'écrire directement à " +
              (contactEmail || 'mon adresse e-mail') +
              ' ou sur WhatsApp.'
          );
        })
        .then(function () {
          if (submit) submit.disabled = false;
          if (label) label.textContent = 'Envoyer le message';
        });
    });
  }

})();
