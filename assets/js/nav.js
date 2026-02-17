/* =============================================
   NAV.JS — Navigation: Hamburger, Scroll, Dropdown
   SM Technical Consultancy
   ============================================= */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__menu');

  if (!nav) return;

  // --- Scroll-aware sticky class ---
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger toggle ---
  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('nav__menu--open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        menu.classList.remove('nav__menu--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });

    // Close menu when a link inside it is clicked
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('nav__menu--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      });
    });
  }

  // --- Dropdown: close on Escape ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close mobile menu
      if (menu && menu.classList.contains('nav__menu--open')) {
        menu.classList.remove('nav__menu--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
        hamburger.focus();
      }
      // Close any open dropdowns by blurring focus
      const activeDropdown = document.querySelector('.nav__dropdown-wrap:focus-within');
      if (activeDropdown) {
        activeDropdown.querySelector('.nav__link').blur();
      }
    }
  });

}());
