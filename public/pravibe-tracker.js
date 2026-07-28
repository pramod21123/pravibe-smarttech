/**
 * PRAVIBE TRACKER
 * This file goes into GITHUB → public/pravibe-tracker.js
 * Everything is already filled in. Do not edit anything.
 *
 * Then add to index.html just before </body>:
 *     <script src="/pravibe-tracker.js" defer></script>
 *
 * To stop tracking yourself, open your site once with:
 *     https://pravibesmarttech.com/?notrack=1
 * (to switch tracking back on: ?notrack=0)
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxKYouqnZEdkWFPl5CrstOb3Upse1OXMt0gF1dRh2YsU8yhF2WdnMLwcbuw3K6-Pg_HmQ/exec';
  var SECRET   = 'pravibe-track-9x7k2m';

  try {

    // ---------- do-not-track switch (for your own visits) ----------
    var params = new URLSearchParams(location.search);
    if (params.get('notrack') === '1') localStorage.setItem('pv_notrack', '1');
    if (params.get('notrack') === '0') localStorage.removeItem('pv_notrack');
    if (localStorage.getItem('pv_notrack') === '1') return;

    // ---------- who is this visitor ----------
    var vid   = localStorage.getItem('pv_vid');
    var isNew = false;
    if (!vid) {
      vid = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      localStorage.setItem('pv_vid', vid);
      isNew = true;
    }

    var sid = sessionStorage.getItem('pv_sid');
    if (!sid) {
      sid = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem('pv_sid', sid);
    }

    // ---------- device / browser / location ----------
    var ua = navigator.userAgent;

    var device = /iPad|Tablet/i.test(ua) ? 'Tablet'
               : /Mobi|Android|iPhone/i.test(ua) ? 'Mobile'
               : 'Desktop';

    var browser = /Edg\//.test(ua)     ? 'Edge'
                : /OPR\//.test(ua)     ? 'Opera'
                : /Chrome\//.test(ua)  ? 'Chrome'
                : /Safari\//.test(ua)  ? 'Safari'
                : /Firefox\//.test(ua) ? 'Firefox'
                : 'Other';

    var loc = '';
    try { loc = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}

    // ---------- where did they come from ----------
    function trafficSource() {
      var utm = params.get('utm_source');
      if (utm) return 'utm: ' + utm;
      var r = document.referrer;
      if (!r) return 'Direct';
      try {
        var h = new URL(r).hostname.replace(/^www\./, '');
        if (h === location.hostname)   return 'Internal';
        if (/google\./.test(h))        return 'Google';
        if (/instagram/.test(h))       return 'Instagram';
        if (/facebook|fb\./.test(h))   return 'Facebook';
        if (/linkedin/.test(h))        return 'LinkedIn';
        if (/whatsapp|wa\.me/.test(h)) return 'WhatsApp';
        if (/youtube/.test(h))         return 'YouTube';
        if (/bing\./.test(h))          return 'Bing';
        return h;
      } catch (e) { return 'Direct'; }
    }
    var source = trafficSource();

    // ---------- the sending queue ----------
    var queue = [];

    function push(type, detail, secs) {
      queue.push({
        vid: vid, sid: sid, isNew: isNew,
        type: type,
        page: location.pathname + location.search,
        detail: (detail || '').toString().slice(0, 200),
        source: source,
        device: device, browser: browser, loc: loc,
        secs: secs || ''
      });
      if (queue.length >= 12) flush();
    }

    function flush() {
      if (!queue.length) return;
      var payload = JSON.stringify({ secret: SECRET, events: queue });
      queue = [];
      try {
        fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payload
        }).catch(function () {});
      } catch (e) {}
    }

    setInterval(flush, 8000);

    // ---------- page views (works with react-router too) ----------
    var scrollMarks = {};
    var pageStart   = Date.now();
    var lastPath    = location.pathname;

    function pageview() {
      pageStart = Date.now();
      push('pageview', document.title);
    }

    function pageExit() {
      var secs = Math.round((Date.now() - pageStart) / 1000);
      if (secs > 0 && secs < 3600) push('exit', lastPath, secs);
    }

    function routeChanged() {
      if (location.pathname === lastPath) return;
      pageExit();
      lastPath = location.pathname;
      scrollMarks = {};
      pageview();
    }

    ['pushState', 'replaceState'].forEach(function (m) {
      var orig = history[m];
      history[m] = function () {
        var r = orig.apply(this, arguments);
        setTimeout(routeChanged, 0);
        return r;
      };
    });
    window.addEventListener('popstate', function () { setTimeout(routeChanged, 0); });

    pageview();

    // ---------- clicks ----------
    document.addEventListener('click', function (ev) {
      try {
        var el = ev.target.closest('a, button, [data-track]');
        if (!el) return;

        var label = el.getAttribute('data-track')
                 || (el.innerText || '').trim().slice(0, 60)
                 || el.getAttribute('aria-label')
                 || el.tagName;

        var href = el.getAttribute('href') || '';
        if (/^tel:/.test(href))                label = 'CALL BUTTON — ' + href;
        else if (/wa\.me|whatsapp/.test(href)) label = 'WHATSAPP BUTTON';
        else if (/^mailto:/.test(href))        label = 'EMAIL — ' + href;
        else if (href)                         label = label + ' (' + href + ')';

        push('click', label);
      } catch (e) {}
    }, true);

    // ---------- form submit ----------
    document.addEventListener('submit', function (ev) {
      try { push('form_submit', (ev.target && ev.target.id) || 'form'); } catch (e) {}
    }, true);

    // ---------- scroll depth ----------
    window.addEventListener('scroll', function () {
      try {
        var h = document.documentElement;
        var pct = Math.round((h.scrollTop + window.innerHeight) / h.scrollHeight * 100);
        [25, 50, 75, 100].forEach(function (m) {
          if (pct >= m && !scrollMarks[m]) {
            scrollMarks[m] = true;
            push('scroll', m + '%');
          }
        });
      } catch (e) {}
    }, { passive: true });

    // ---------- leaving ----------
    window.addEventListener('pagehide', function () { pageExit(); flush(); });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') { pageExit(); flush(); }
    });

  } catch (e) {
    /* tracker must never break the website */
  }
})();
