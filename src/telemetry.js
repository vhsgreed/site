// First-party telemetry beacon → https://telemetry.lillerik-sund.workers.dev
// No cookies, no client ids: the Worker derives a daily-rotating session hash server-side.
// Fires: 'view' on load, 'scroll' at 25/50/75/100 depth, 'click' for [data-track], 'outbound' for external links.
(function () {
  var ENDPOINT = 'https://telemetry.lillerik-sund.workers.dev/e';

  function send(type, extra) {
    try {
      var payload = JSON.stringify({
        t: type,
        p: location.pathname + location.search,
        r: document.referrer && document.referrer.indexOf(location.origin) === -1 ? document.referrer : '',
        n: extra && extra.name ? extra.name : undefined
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      } else {
        fetch(ENDPOINT, { method: 'POST', body: payload, keepalive: true, mode: 'cors' });
      }
    } catch (e) {}
  }

  window.__telemetry = send;

  // View on load
  send('view');

  // Scroll depth: fire once per threshold
  var marks = [0.25, 0.5, 0.75, 1.0];
  var fired = {};
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var depth = Math.min(1, (window.scrollY || doc.scrollTop || 0) / max);
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (!fired[m] && depth >= m) {
        fired[m] = true;
        send('scroll', { name: String(Math.round(m * 100)) });
      }
    }
    if (fired[1.0]) window.removeEventListener('scroll', onScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Click tracking: [data-track] = named click, external links = outbound
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (el) send('click', { name: el.getAttribute('data-track') });
    var a = e.target.closest('a[href]');
    if (a) {
      var href = a.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0) {
        send('outbound', { name: a.hostname });
      }
    }
  });
})();
