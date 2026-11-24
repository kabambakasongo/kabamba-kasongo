(function () {
  'use strict';

  var $ = window.KK.$;
  var $$ = window.KK.$$;
  var t = window.KK.i18n.t;
  var f = window.KK.i18n.f;

  $$('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      var span = document.createElement('span');
      span.className = 'd-grid place-items-center w-100';
      span.style.aspectRatio = '1 / 1';
      span.style.fontFamily = 'var(--font-display)';
      span.style.fontSize = '3rem';
      span.style.fontWeight = '700';
      span.style.color = 'var(--brand)';
      span.textContent = img.getAttribute('data-fallback') || '';
      img.replaceWith(span);
    });
  });

  /* ---------------------------------------------------------------- Année */

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------- Copy & partage */

  var copyBtn = $('#copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var value = copyBtn.getAttribute('data-copy') || '';
      var icon = copyBtn.querySelector('i');

      var done = function () {
        if (icon) icon.className = 'bi bi-check2';
        copyBtn.lastChild.textContent = t('copied');
        setTimeout(function () {
          if (icon) icon.className = 'bi bi-clipboard';
          copyBtn.lastChild.textContent = t('copyEmail');
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
          var status = $('#contact-status');
          if (status) {
            status.style.color = '#f43f5e';
            status.textContent = f('copyFailed', value);
          }
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
        text: t('shareText'),
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(data.url);
      }
      shareBtn.title = t('shareCopied');
    });
  }
})();
