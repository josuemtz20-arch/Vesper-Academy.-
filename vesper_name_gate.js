/* ============================================================
   VESPER ACADEMY — Puerta de nombre (primer ingreso del alumno)
   ------------------------------------------------------------
   La 1ª vez que un ALUMNO aprobado entra al portal, lo PRIMERO que
   debe hacer es elegir su nombre. Antes, el registro no pedía nombre
   y todos quedaban como "Estudiante": este gate lo resuelve.

   Muestra una capa BLOQUEANTE (no se puede cerrar ni saltar) con un
   único campo: el nombre. Al guardarlo:
     - vesper_profile.name        = nombre elegido
     - vesper_profile.nameChosen  = true   (marca que ya lo eligió)
     - vesper_profile.vesper.leagueAlias = nombre (si no tenía)

   Reglas de aparición (todo debe cumplirse):
     - hay sesión de Firebase con correo verificado;
     - el usuario es ALUMNO aprobado (NO profesor, NO admin);
     - aún no tiene nombre elegido (nameChosen !== true).
   Sin sesión / en localhost / si es profe o admin: no hace nada.

   No destructivo: solo escribe en vesper_profile (localStorage) tras
   la acción del alumno. Requiere que la página cargue vesper_auth.js
   ANTES que este script (window.VesperAuth).
   ============================================================ */
(function () {
  "use strict";
  if (!window.VesperAuth || !VesperAuth.initFirebase) return;

  var OVERLAY_ID = "vesper-name-gate";
  var MIN = 2, MAX = 40;
  var LETTER = /[A-Za-zÀ-ÿ]/;              /* al menos una letra (incluye acentos) */

  function readProfile() {
    try { return JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {}; }
    catch (e) { return {}; }
  }
  function writeProfile(p) {
    try { localStorage.setItem("vesper_profile", JSON.stringify(p)); } catch (e) {}
  }
  function prettyFromEmail(email) {
    var local = String(email || "").split("@")[0] || "";
    local = local.replace(/[._+\-]+/g, " ").replace(/[0-9]+/g, "").trim();
    if (!local) return "";
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  function onDomReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else { fn(); }
  }

  /* Inyecta los estilos una sola vez. */
  function ensureStyles() {
    if (document.getElementById("vesper-name-gate-css")) return;
    var css = document.createElement("style");
    css.id = "vesper-name-gate-css";
    css.textContent = [
      "#" + OVERLAY_ID + "{position:fixed;inset:0;z-index:2147483000;",
      "  display:flex;align-items:center;justify-content:center;padding:20px;",
      "  background:linear-gradient(135deg,#15152b,#26264c);",
      "  font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;",
      "  animation:vngFade .25s ease;}",
      "@keyframes vngFade{from{opacity:0}to{opacity:1}}",
      "#" + OVERLAY_ID + " .vng-card{width:100%;max-width:440px;background:#fff;",
      "  border:1px solid rgba(197,160,89,.4);border-radius:20px;padding:30px 26px;",
      "  box-shadow:0 20px 60px rgba(0,0,0,.4);text-align:center;color:#1B1B2F;",
      "  animation:vngRise .3s ease;}",
      "@keyframes vngRise{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}",
      "#" + OVERLAY_ID + " .vng-emoji{font-size:2.6rem;line-height:1;margin-bottom:6px;}",
      "#" + OVERLAY_ID + " .vng-eyebrow{display:block;font-size:.7rem;font-weight:700;",
      "  letter-spacing:2px;text-transform:uppercase;color:#8f6f2e;margin-bottom:8px;}",
      "#" + OVERLAY_ID + " h2{font-family:'Inria Serif',Georgia,serif;font-size:1.5rem;",
      "  margin:0 0 8px;line-height:1.2;}",
      "#" + OVERLAY_ID + " p.vng-sub{color:#5a6673;font-size:.95rem;margin:0 0 20px;line-height:1.5;}",
      "#" + OVERLAY_ID + " label{display:block;text-align:left;font-size:.8rem;font-weight:600;",
      "  color:#1B1B2F;margin:0 0 6px;}",
      "#" + OVERLAY_ID + " input{width:100%;padding:14px 16px;font-size:1.05rem;",
      "  border:1.5px solid #e4e0d8;border-radius:12px;font-family:inherit;background:#fff;color:#1B1B2F;}",
      "#" + OVERLAY_ID + " input:focus{outline:none;border-color:#c5a059;",
      "  box-shadow:0 0 0 3px rgba(197,160,89,.2);}",
      "#" + OVERLAY_ID + " .vng-err{display:none;text-align:left;color:#c0392b;",
      "  font-size:.85rem;margin:8px 2px 0;}",
      "#" + OVERLAY_ID + " .vng-err.show{display:block;}",
      "#" + OVERLAY_ID + " button.vng-go{margin-top:18px;width:100%;padding:14px;font-size:1rem;",
      "  font-weight:700;border:none;border-radius:12px;background:#c5a059;color:#1B1B2F;",
      "  cursor:pointer;transition:background .15s;}",
      "#" + OVERLAY_ID + " button.vng-go:hover{background:#b6924a;}",
      "#" + OVERLAY_ID + " button.vng-go:disabled{opacity:.55;cursor:not-allowed;}",
      "#" + OVERLAY_ID + " .vng-hint{color:#8a94a0;font-size:.78rem;margin:14px 0 0;}",
      "#" + OVERLAY_ID + " .vng-logout{background:none;border:none;color:#8a94a0;",
      "  font-size:.78rem;text-decoration:underline;cursor:pointer;margin-top:4px;font-family:inherit;}",
      "#" + OVERLAY_ID + " .vng-logout:hover{color:#5a6673;}",
      "html.vng-lock,body.vng-lock{overflow:hidden!important;}"
    ].join("");
    document.head.appendChild(css);
  }

  function alreadyOpen() { return !!document.getElementById(OVERLAY_ID); }

  function showGate(email, auth) {
    if (alreadyOpen()) return;
    onDomReady(function () {
      if (alreadyOpen()) return;
      ensureStyles();

      var p = readProfile();
      var suggestion = (p.name && String(p.name).trim()) || prettyFromEmail(email) || "";

      var ov = document.createElement("div");
      ov.id = OVERLAY_ID;
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.setAttribute("aria-labelledby", "vng-title");

      var card = document.createElement("div");
      card.className = "vng-card";
      card.innerHTML =
        '<div class="vng-emoji" aria-hidden="true">🐾</div>' +
        '<span class="vng-eyebrow">Vesper Academy</span>' +
        '<h2 id="vng-title">¡Te damos la bienvenida!</h2>' +
        '<p class="vng-sub">Antes de entrar, dinos cómo quieres que te llamemos en la academia.</p>' +
        '<label for="vng-name">Tu nombre</label>' +
        '<input id="vng-name" type="text" maxlength="' + MAX + '" autocomplete="given-name" ' +
        'placeholder="Escribe tu nombre" />' +
        '<p class="vng-err" id="vng-err">Escribe tu nombre (al menos 2 letras) para continuar.</p>' +
        '<button type="button" class="vng-go" id="vng-go">Guardar y entrar</button>' +
        '<p class="vng-hint">Podrás cambiarlo después en tu perfil.</p>' +
        '<button type="button" class="vng-logout" id="vng-logout">No soy yo — cerrar sesión</button>';
      ov.appendChild(card);
      document.body.appendChild(ov);
      document.documentElement.classList.add("vng-lock");
      document.body.classList.add("vng-lock");

      var input = document.getElementById("vng-name");
      var err = document.getElementById("vng-err");
      var go = document.getElementById("vng-go");
      input.value = suggestion;
      /* selecciona la sugerencia para que reescribir sea inmediato */
      try { input.focus(); input.select(); } catch (e) {}

      function valid(v) {
        v = String(v || "").trim();
        return v.length >= MIN && v.length <= MAX && LETTER.test(v);
      }
      function clearErr() { err.classList.remove("show"); }
      input.addEventListener("input", clearErr);

      function submit() {
        var v = String(input.value || "").trim().replace(/\s+/g, " ");
        if (!valid(v)) { err.classList.add("show"); input.focus(); return; }
        var prof = readProfile();
        prof.name = v.slice(0, MAX);
        prof.nameChosen = true;
        prof.vesper = prof.vesper || {};
        if (!prof.vesper.leagueAlias) prof.vesper.leagueAlias = prof.name.slice(0, 24);
        writeProfile(prof);
        closeGate();
        /* refresca el saludo del portal si está presente */
        var intro = document.getElementById("intro-title");
        if (intro) intro.textContent = "Hola, " + prof.name + " 👋";
        try {
          document.dispatchEvent(new CustomEvent("vesper-name-set", { detail: { name: prof.name } }));
        } catch (e) {}
      }

      go.addEventListener("click", submit);
      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") { ev.preventDefault(); submit(); }
      });

      document.getElementById("vng-logout").addEventListener("click", function () {
        try { if (auth) auth.signOut(); } catch (e) {}
        try { location.href = "login.html"; } catch (e) {}
      });
    });
  }

  function closeGate() {
    var ov = document.getElementById(OVERLAY_ID);
    if (ov) ov.parentNode.removeChild(ov);
    document.documentElement.classList.remove("vng-lock");
    document.body.classList.remove("vng-lock");
  }

  /* ── Orquestación ──
     Espera la sesión; decide si mostrar el gate para un alumno aprobado. */
  VesperAuth.initFirebase().then(function (auth) {
    auth.onAuthStateChanged(function (user) {
      if (!user || !user.emailVerified) { closeGate(); return; }
      var p = readProfile();
      if (p.nameChosen === true) return;      /* ya eligió su nombre */

      var email = String(user.email || "").trim().toLowerCase();

      /* Profesores y admin quedan exentos. */
      VesperAuth.isTeacher(user).then(function (isTeacher) {
        if (isTeacher) return;
        /* Solo alumnos APROBADOS (los no aprobados los maneja la puerta de acceso). */
        VesperAuth.isApprovedUser(user).then(function (ok) {
          if (!ok) return;
          if (readProfile().nameChosen === true) return; /* pudo cambiar entre awaits */
          showGate(email, auth);
        }).catch(function () {});
      }).catch(function () {});
    });
  }).catch(function () { /* sin red / sin config: dormant */ });
})();
