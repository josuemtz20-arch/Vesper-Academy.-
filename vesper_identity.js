/* ============================================================
   VESPER ACADEMY — Enlace automático de cuenta ↔ identidad local
   ------------------------------------------------------------
   Las lecciones (leccion.html) funcionan SIN cuenta: la identidad
   del alumno vive en localStorage (vesper_profile). Cuando el alumno
   SÍ tiene sesión de Firebase (inició sesión en el portal), este
   script "enlaza" esa cuenta con su identidad local de forma
   automática y no destructiva:

     - Registra la cuenta vinculada en  vesper_profile.account
       {email, uid, linkedTs}  (refleja siempre la sesión actual).
     - Si el alumno aún NO tiene nombre, lo deriva de su cuenta
       (displayName o la parte del correo).
     - Si aún NO tiene alias de liga, usa su nombre/cuenta — así su
       identidad en el juego (liga, progreso, resultados) es su
       cuenta y no un "Estudiante#1234" anónimo.

   Solo rellena lo que está vacío: nunca pisa lo que el alumno haya
   elegido a mano. Sin sesión, no hace nada (modo libre intacto).
   Requiere que la página ya cargue vesper_auth.js (window.VesperAuth).
   Emite el evento "vesper-identity" para que la página reaccione.
   ============================================================ */
(function () {
  "use strict";
  if (!window.VesperAuth || !VesperAuth.initFirebase) return;

  function prettyFromEmail(email) {
    var local = String(email || "").split("@")[0] || "";
    local = local.replace(/[._+\-]+/g, " ").replace(/[0-9]+/g, "").trim();
    if (!local) return "";
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  function readProfile() {
    try { return JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {}; }
    catch (e) { return {}; }
  }
  function writeProfile(p) {
    try { localStorage.setItem("vesper_profile", JSON.stringify(p)); } catch (e) {}
  }

  function announce(detail) {
    window.VesperIdentity = detail;
    try { document.dispatchEvent(new CustomEvent("vesper-identity", { detail: detail })); } catch (e) {}
  }

  function link(user) {
    var email = String(user.email || "").trim().toLowerCase();
    var p = readProfile();
    var changed = false;

    var acct = p.account || {};
    if (acct.email !== email || acct.uid !== user.uid) {
      p.account = { email: email, uid: user.uid, linkedTs: Date.now() };
      changed = true;
    }
    if (!p.name) {
      var nm = (user.displayName && user.displayName.trim()) || prettyFromEmail(email);
      if (nm) { p.name = nm; changed = true; }
    }
    p.vesper = p.vesper || {};
    if (!p.vesper.leagueAlias) {
      var alias = p.name || prettyFromEmail(email);
      if (alias) { p.vesper.leagueAlias = alias.slice(0, 24); changed = true; }
    }
    if (changed) writeProfile(p);
    announce({ linked: true, email: email, uid: user.uid, name: p.name || null });
  }

  window.VesperIdentity = window.VesperIdentity || { linked: false };
  VesperAuth.initFirebase().then(function (auth) {
    auth.onAuthStateChanged(function (user) {
      if (user && user.emailVerified) link(user);
      else announce({ linked: false });
    });
  }).catch(function () {});
})();
