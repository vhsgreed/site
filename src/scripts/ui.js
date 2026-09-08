// ui.js — redesign utility scripts (ported verbatim from the approved
// design prototype /home/karl/openclaw/design-test/index.html):
// mobile menu open/close · scroll progress + back-to-top · sidenav
// scrollspy · mobile table guard. Copy-code handled by CopyCode.astro.
(function () {
  'use strict';

  /* ---------- menu: rock-solid open/close ---------- */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mm');
  if (btn && menu) {
    var open = false;
    function set(state) {
      open = state;
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    }
    btn.addEventListener('click', function () { set(!open); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { set(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (open && !e.target.closest('#mm') && !e.target.closest('#menuBtn')) set(false);
    });
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width:1024px)').matches && open) set(false);
    });
  }

  /* ---------- scroll progress + back to top ---------- */
  var bar = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  if (bar && toTop) {
    var raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
        toTop.classList.toggle('show', h.scrollTop > 600);
      });
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  /* ---------- sidenav scrollspy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidenav a'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if (targets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('current', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- mobile table guard (big /data/ tables) ---------- */
  document.querySelectorAll('table').forEach(function (t) {
    if (t.parentElement.classList.contains('tablewrap')) return;
    var w = document.createElement('div');
    w.className = 'tablewrap';
    w.style.overflowX = 'auto';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
})();
