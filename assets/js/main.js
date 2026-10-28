/* Junk-B-Gone – site scripts (no dependencies) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: solid background once the page scrolls ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('[data-menu-btn]');
  var menu = document.querySelector('[data-menu]');
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    if (open) header.classList.add('is-scrolled'); else onScroll();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* ---------- Mobile action bar: show once the hero buttons are out of view ---------- */
  var bar = document.querySelector('[data-mobile-bar]');
  var heroCta = document.querySelector('[data-hero-cta]');
  if (bar) {
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle('is-shown', !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
      }).observe(heroCta);
    } else {
      bar.classList.add('is-shown');
    }
  }

  /* ---------- Scroll reveals ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Services explorer (ARIA tabs) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var panels = document.querySelectorAll('[data-panel]');

  function selectTab(id, focus) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) tab.focus();
        // keep the chosen chip in view on the mobile scroller
        var scroller = tab.closest('.overflow-x-auto');
        if (scroller && scroller.scrollWidth > scroller.clientWidth) {
          scroller.scrollTo({
            left: tab.offsetLeft - scroller.clientWidth / 2 + tab.offsetWidth / 2,
            behavior: reduceMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
    panels.forEach(function (panel) {
      var on = panel.getAttribute('data-panel') === id;
      panel.hidden = !on;
      if (on && !reduceMotion) {
        panel.classList.remove('animate-panel-in');
        void panel.offsetWidth; // restart the animation
        panel.classList.add('animate-panel-in');
      }
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab.getAttribute('data-tab')); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        selectTab(next.getAttribute('data-tab'), true);
      }
    });
  });

  // Footer service links open the matching tab
  document.querySelectorAll('[data-service-link]').forEach(function (link) {
    link.addEventListener('click', function () { selectTab(link.getAttribute('data-service-link')); });
  });

  /* ---------- "Get a quote" buttons pre-select the service in the form ---------- */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-quote-service]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!serviceSelect) return;
      serviceSelect.value = btn.getAttribute('data-quote-service');
      var field = serviceSelect.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });
  });

  /* ---------- Quote form: inline validation + submit state ---------- */
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    var fields = form.querySelectorAll('input:not([type=hidden]):not([name=_honey]), select, textarea');

    function validate(el) {
      var field = el.closest('.field');
      if (!field) return true;
      var ok = el.checkValidity() && (!el.required || el.value.trim() !== '');
      field.classList.toggle('is-invalid', !ok);
      var err = field.querySelector('.err');
      if (err) {
        el.setAttribute('aria-describedby', err.id);
        el.setAttribute('aria-invalid', String(!ok));
      }
      return ok;
    }

    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value.trim() !== '') validate(el); });
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) validate(el);
      });
    });

    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (el) {
        if (!validate(el) && !firstBad) firstBad = el;
      });
      if (firstBad) {
        e.preventDefault();
        firstBad.focus();
        return;
      }
      var btn = form.querySelector('[data-submit]');
      var label = form.querySelector('[data-submit-label]');
      if (btn) {
        btn.disabled = true;
        btn.classList.add('opacity-80', 'cursor-wait');
      }
      if (label) label.textContent = 'Sending…';
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
