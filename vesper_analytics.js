/* ============================================================
 * vesper_analytics.js — Instrumentación ligera y sin dependencias
 * del embudo gratis -> lead (lecciones + examen de nivel).
 *
 * OBJETIVO (Nivel 0): hacer MEDIBLE el embudo y conectar las
 * lecciones con la página que convierte (book_placement.html).
 *
 * Tres destinos, todos best-effort y no bloqueantes:
 *   1) localStorage (buffer)   -> SIEMPRE activo. Inspecciona con VA.funnel().
 *   2) Google Analytics 4      -> se enciende al pegar tu ID en GA4_ID.
 *   3) Firestore "app_events"  -> opcional (VA.cfg.cloud=true + regla).
 *
 * La señal más útil — QUÉ momento de la app produjo un lead — viaja
 * con el propio lead: VA.goPlacement() agrega ?src= a book_placement.html,
 * y ese origen queda en el correo + historial que la academia YA recibe.
 * Eso funciona sin ninguna configuración extra.
 *
 * Para encender analítica por visitante (opcional): crea una propiedad
 * GA4 (gratis), copia tu "Measurement ID" (G-XXXXXXXXXX) y pégalo abajo.
 *
 * CONSENTIMIENTO (2026-10-29): con un ID pegado, GA4 NO se carga hasta que
 * el visitante pulsa "Aceptar" en el aviso de cookies que este archivo
 * muestra una sola vez (enlaza a aviso-de-privacidad.html#tecnologias).
 * "Rechazar" se respeta para siempre en ese navegador. Sin ID no se muestra
 * ningún aviso. VA.consent("granted"|"denied") cambia la decisión por código.
 * ============================================================ */
(function () {
  "use strict";

  /* ====== CONFIG ====== */
  /* Pega aquí tu Measurement ID de GA4 para activar analítica por
     visitante (ej. "G-XXXXXXXXXX"). Déjalo "" para mantenerlo apagado. */
  var GA4_ID = "";

  var LS_EVENTS = "vesper_events";
  var LS_VID = "vesper_vid";
  var LS_SRC = "vesper_cta_src";
  var LS_CONSENT = "vesper_analytics_consent";   /* "granted" | "denied" */
  var MAX_EVENTS = 300;

  function uid(p) {
    return (p || "") + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
  function vid() {
    try {
      var v = localStorage.getItem(LS_VID);
      if (!v) { v = uid("v_"); localStorage.setItem(LS_VID, v); }
      return v;
    } catch (e) { return "v_anon"; }
  }
  var SID = uid("s_");   /* un "session id" por cadena de carga de página */

  function pushLocal(rec) {
    try {
      var a = JSON.parse(localStorage.getItem(LS_EVENTS) || "[]");
      a.push(rec);
      if (a.length > MAX_EVENTS) a = a.slice(a.length - MAX_EVENTS);
      localStorage.setItem(LS_EVENTS, JSON.stringify(a));
    } catch (e) {}
  }

  function toGa(name, props) {
    try { if (window.gtag) window.gtag("event", name, props || {}); } catch (e) {}
  }

  /* Escritura opcional a Firestore (base "teachermanuals", la única del
     proyecto) — sólo si VA.cfg.cloud. Reutiliza la apiKey pública ya presente
     en vesper_auth.js. Requiere la regla 'create' de app_events
     (_scripts/firestore.rules). Si falla, se ignora. */
  function toCloud(name, props, rec) {
    if (!VA.cfg.cloud) return;
    try {
      var cfg = window.VesperAuth && VesperAuth.config && VesperAuth.config.firebase;
      var key = cfg && cfg.apiKey, pid = (cfg && cfg.projectId) || "vesper-academy";
      if (!key || /PEGAR/.test(key)) return;
      var url = "https://firestore.googleapis.com/v1/projects/" + pid +
        "/databases/teachermanuals/documents/app_events?key=" + encodeURIComponent(key);
      var body = { fields: {
        event:     { stringValue: String(name) },
        props:     { stringValue: JSON.stringify(props || {}) },
        vid:       { stringValue: rec.vid },
        sid:       { stringValue: rec.sid },
        page:      { stringValue: rec.page },
        createdAt: { timestampValue: new Date().toISOString() }
      } };
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).catch(function () {});
    } catch (e) {}
  }

  var VA = {
    cfg: { cloud: false, ga4: GA4_ID },

    /* registra un evento en todos los destinos disponibles */
    track: function (name, props) {
      var rec = {
        e: name, p: props || {}, t: Date.now(), sid: SID, vid: vid(),
        page: (location.pathname.split("/").pop() || "index.html")
      };
      pushLocal(rec);
      toGa(name, props);
      toCloud(name, props, rec);
      return rec;
    },

    /* URL del examen de nivel con la atribución de origen */
    placementUrl: function (src) {
      return "book_placement.html?src=" + encodeURIComponent(src || "leccion");
    },

    /* registra el clic de CTA y navega al examen de nivel */
    goPlacement: function (src) {
      src = src || "leccion";
      this.track("cta_click", { src: src });
      try { localStorage.setItem(LS_SRC, src); } catch (e) {}
      location.href = this.placementUrl(src);
    },

    /* atribución de primer contacto: { src, utm_source, utm_medium, … , landing } */
    attribution: function () { return readAttr(); },
    /* la misma, en una línea corta para guardarla con el lead */
    attributionText: function () {
      var a = readAttr(), out = [];
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "landing"].forEach(function (k) {
        if (a[k]) out.push(k.replace("utm_", "") + "=" + a[k]);
      });
      return out.join("|").slice(0, 120);
    },

    /* lee ?src= (o el último guardado) — lo usa book_placement.html */
    readSource: function () {
      try {
        var s = new URLSearchParams(location.search).get("src");
        if (s) return s;
        return localStorage.getItem(LS_SRC) || "";
      } catch (e) { return ""; }
    },

    /* resumen del embudo en ESTE dispositivo (para inspección propia) */
    funnel: function () {
      var a = [];
      try { a = JSON.parse(localStorage.getItem(LS_EVENTS) || "[]"); } catch (e) {}
      var counts = {};
      a.forEach(function (r) { counts[r.e] = (counts[r.e] || 0) + 1; });
      return { total: a.length, counts: counts, events: a };
    },
    dump: function () { return this.funnel().events; },
    /* decisión de cookies de analítica: VA.consent() la lee; con valor la fija */
    consent: function (v) {
      if (v === "granted" || v === "denied") {
        try { localStorage.setItem(LS_CONSENT, v); } catch (e) {}
        if (v === "granted") loadGa4();
      }
      try { return localStorage.getItem(LS_CONSENT) || ""; } catch (e) { return ""; }
    },
    clear: function () { try { localStorage.removeItem(LS_EVENTS); } catch (e) {} }
  };

  /* ---------- Atribución (src / UTM) ----------
     Se guarda el PRIMER contacto del visitante (de qué campaña o página llegó)
     y se conserva entre páginas, para que llegue al lead aunque el visitante
     navegue antes de dejar sus datos. */
  var LS_ATTR = "vesper_attr";
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  function clean(v) { return String(v || "").replace(/[^A-Za-z0-9_.\-]/g, "").slice(0, 40); }
  function pageSlug() { return (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index"; }
  function readAttr() {
    try { return JSON.parse(localStorage.getItem(LS_ATTR) || "{}") || {}; } catch (e) { return {}; }
  }
  function captureAttr() {
    try {
      var q = new URLSearchParams(location.search), a = readAttr(), had = !!a.landing, found = false;
      UTM.forEach(function (k) { var v = clean(q.get(k)); if (v && !a[k]) { a[k] = v; found = true; } });
      var src = clean(q.get("src"));
      if (src) { localStorage.setItem(LS_SRC, src); if (!a.src) { a.src = src; found = true; } }
      if (!had) { a.landing = pageSlug(); a.t = Date.now(); found = true; }
      if (found) localStorage.setItem(LS_ATTR, JSON.stringify(a));
    } catch (e) {}
  }

  /* ---------- Clics que importan ----------
     Un solo escucha para todo el sitio:
      · cualquier enlace a WhatsApp  -> evento whatsapp_click {page, where}
      · enlaces al examen de nivel   -> se les añade ?src=<página> si no lo traen,
        para que el lead diga desde qué página se llegó. */
  function whereOf(el) {
    var tag = el.getAttribute("data-wa") || "";
    if (tag) return tag;
    if (el.classList && el.classList.contains("v-wa-float")) return "flotante";
    var sec = el.closest ? el.closest("section[id], footer, header, nav, [id]") : null;
    return sec ? (sec.id || sec.tagName.toLowerCase()) : "";
  }
  function onClick(ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
      VA.track("whatsapp_click", { page: pageSlug(), where: clean(whereOf(a)) });
      return;
    }
    if (/^book_placement\.html/i.test(href) && !/[?&]src=/.test(href)) {
      var hash = "", i = href.indexOf("#");
      if (i >= 0) { hash = href.slice(i); href = href.slice(0, i); }
      a.setAttribute("href", href + (href.indexOf("?") >= 0 ? "&" : "?") + "src=" + encodeURIComponent(pageSlug()) + hash);
      VA.track("cta_click", { src: pageSlug() });
    }
  }
  function autoInstrument() {
    captureAttr();
    try { document.addEventListener("click", onClick, true); } catch (e) {}
    var a = readAttr();
    VA.track("page_view", { page: pageSlug(), src: a.src || "", source: a.utm_source || "", campaign: a.utm_campaign || "" });
  }

  function gaIdOk() { var g = VA.cfg.ga4; return !!g && /^G-[A-Z0-9]{4,}$/.test(g); }

  /* carga gtag.js: solo con ID válido Y consentimiento */
  var _gaLoaded = false;
  function loadGa4() {
    if (_gaLoaded || !gaIdOk()) return;
    _gaLoaded = true;
    try {
      var g = VA.cfg.ga4, s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + g;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", g);
    } catch (e) {}
  }

  /* aviso de cookies: una vez por navegador, solo si hay ID de GA4 */
  function consentBanner() {
    if (document.getElementById("va-consent")) return;
    var d = document.createElement("div");
    d.id = "va-consent";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-label", "Cookies de analítica");
    /* encima de la barra inferior del alumno (vesper_nav.js) si la hay */
    var low = document.getElementById("vsp-tabbar") ? "calc(72px + env(safe-area-inset-bottom))" : "16px";
    d.style.cssText = "position:fixed;left:12px;right:12px;bottom:" + low + ";z-index:10050;max-width:520px;margin:0 auto;" +
      "background:#1B1B2F;color:#F5F2EB;border:1px solid rgba(201,168,76,.55);border-radius:14px;padding:14px 16px;" +
      "font:400 14px/1.45 Inter,system-ui,sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.3)";
    d.innerHTML = '<p style="margin:0 0 10px">Usamos Google Analytics para saber qué partes del sitio sirven y mejorarlas. '
      + 'Solo se activa si lo aceptas. <a href="aviso-de-privacidad.html#tecnologias" style="color:#E8C979">Aviso de privacidad</a></p>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">'
      + '<button type="button" data-va="denied" style="font:600 14px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:10px;border:1px solid rgba(245,242,235,.4);background:transparent;color:#F5F2EB;cursor:pointer">Rechazar</button>'
      + '<button type="button" data-va="granted" style="font:600 14px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:10px;border:0;background:#C9A84C;color:#1B1B2F;cursor:pointer">Aceptar</button>'
      + '</div>';
    d.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-va]");
      if (!b) return;
      VA.consent(b.getAttribute("data-va"));
      d.remove();
    });
    document.body.appendChild(d);
  }

  (function initGa4() {
    if (!gaIdOk()) return;
    var c = VA.consent();
    if (c === "granted") { loadGa4(); return; }
    if (c === "denied") return;
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(consentBanner, 600); });
    else setTimeout(consentBanner, 600);
  })();

  window.VA = VA;
  autoInstrument();
})();
