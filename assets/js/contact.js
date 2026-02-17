/* =============================================
   CONTACT.JS — Form Validation + Success Banner
   SM Technical Consultancy
   ============================================= */

(function () {
  'use strict';

  // --- Success banner: detect ?success=true in URL ---
  var params = new URLSearchParams(window.location.search);
  var successBanner = document.querySelector('.form-success-banner');
  var contactForm = document.querySelector('#contact-form');

  if (params.get('success') === 'true' && successBanner) {
    successBanner.classList.add('is-visible');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (contactForm) contactForm.style.display = 'none';
  }

  // --- Client-side validation ---
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    var valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.form-error').forEach(function (el) {
      el.classList.remove('is-visible');
      el.textContent = '';
    });
    contactForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
      el.classList.remove('is-invalid');
    });

    // Validate each required field
    var requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      var value = field.value.trim();
      var errorEl = field.parentElement.querySelector('.form-error');

      if (!value) {
        valid = false;
        field.classList.add('is-invalid');
        if (errorEl) {
          errorEl.textContent = 'This field is required.';
          errorEl.classList.add('is-visible');
        }
      } else if (field.type === 'email' && !isValidEmail(value)) {
        valid = false;
        field.classList.add('is-invalid');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.classList.add('is-visible');
        }
      }
    });

    if (!valid) {
      e.preventDefault();
      // Focus first invalid field
      var firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Real-time validation feedback ---
  contactForm.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('blur', function () {
      var value = field.value.trim();
      var errorEl = field.parentElement.querySelector('.form-error');

      if (!value) {
        field.classList.add('is-invalid');
        if (errorEl) {
          errorEl.textContent = 'This field is required.';
          errorEl.classList.add('is-visible');
        }
      } else if (field.type === 'email' && !isValidEmail(value)) {
        field.classList.add('is-invalid');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.classList.add('is-visible');
        }
      } else {
        field.classList.remove('is-invalid');
        if (errorEl) {
          errorEl.classList.remove('is-visible');
          errorEl.textContent = '';
        }
      }
    });
  });
}());
