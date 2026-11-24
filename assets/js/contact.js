(function () {
  'use strict';

  var $ = window.KK.$;
  var t = window.KK.i18n.t;
  var f = window.KK.i18n.f;

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
        showError('name', t('contactNameError'));
        hasError = true;
      }
      if (!EMAIL_PATTERN.test(email)) {
        showError('email', t('contactEmailError'));
        hasError = true;
      }
      if (message.length < 20) {
        showError('message', t('contactMessageError'));
        hasError = true;
      }
      if (hasError) {
        setStatus('error', t('contactErrors'));
        return;
      }

      var provider = form.getAttribute('data-provider') || 'none';
      var endpoint = form.getAttribute('data-endpoint') || '';
      var accessKey = form.getAttribute('data-access-key') || '';

      if (provider === 'none') {
        var subjectLine = subject || t('contactSubject');
        var body = f('contactBody', name, email, message);
        window.location.href =
          'mailto:' +
          (contactEmail || '') +
          '?subject=' +
          encodeURIComponent(subjectLine) +
          '&body=' +
          encodeURIComponent(body);
        setStatus('info', t('mailerOpened'));
        return;
      }

      var submit = $('#contact-submit');
      var label = $('#contact-submit-label');
      if (submit) submit.disabled = true;
      if (label) label.textContent = t('sending');

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
        setStatus('error', t('noProvider'));
        if (submit) submit.disabled = false;
        if (label) label.textContent = t('sendMessage');
        return;
      }

      request
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          form.reset();
          setStatus('success', t('sent'));
        })
        .catch(function () {
          setStatus('error', f('sendFailed', contactEmail || t('contactEmailFallback')));
        })
        .then(function () {
          if (submit) submit.disabled = false;
          if (label) label.textContent = t('sendMessage');
        });
    });
  }

})();
