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

  /* Escritura opcional a Firestore (DB (default)) — sólo si VA.cfg.cloud.
     Reutiliza la apiKey pública ya presente en vesper_auth.js. Requiere una
     regla que permita 'create' en la colección app_events. Si falla, se ignora. */
  function toCloud(name, props, rec) {
    if (!VA.cfg.cloud) return;
    try {
      var cfg = window.VesperAuth && VesperAuth.config && VesperAuth.config.firebase;
      var key = cfg && cfg.apiKey, pid = (cfg && cfg.projectId) || "vesper-academy";
      if (!key || /PEGAR/.test(key)) return;
      var url = "https://firestore.googleapis.com/v1/projects/" + pid +
        "/databases/(default)/documents/app_events?key=" + encodeURIComponent(key);
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
    clear: function () { try { localStorage.removeItem(LS_EVENTS); } catch (e) {} }
  };

  /* enciende GA4 si pegaste un Measurement ID válido */
  (function initGa4() {
    var g = VA.cfg.ga4;
    if (!g || g.indexOf("G-") !== 0) return;
    try {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + g;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", g);
    } catch (e) {}
  })();

  window.VA = VA;
})();
