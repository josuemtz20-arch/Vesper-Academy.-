/* ============================================================
 * vesper_league_cloud.js — Leaderboard REAL de la liga (Firestore REST).
 *
 * Convierte la liga semanal de rivales simulados (vesper_league.js) en una
 * tabla con usuarios REALES cuando el alumno tiene sesión verificada. Reusa el
 * mismo patrón REST que vesper_sync.js (DB "teachermanuals", token de
 * VesperAuth) sobre la colección semanal `leagues/{weekId}/members/{uid}`:
 *   - cada quien escribe SOLO su propia entrada { alias, xp, ts }
 *   - cualquier usuario autenticado puede leer la tabla
 * Privacidad: se publica un ALIAS (editable en Configuración) o un código
 * anónimo derivado del uid; NUNCA el correo.
 *
 * Degrada en silencio: sin Firebase, sin sesión, o si falta publicar la regla
 * de Firestore (403), el llamador (liga.html / vesper_league.js) usa la liga
 * simulada. Ver FIRESTORE_LEAGUE_RULES.md para activar la nube.
 *
 * window.VESPER_LEAGUE_CLOUD:
 *   available()            -> ¿hay Firebase configurado?
 *   signedIn()             -> ¿hay sesión verificada?
 *   aliasOf()              -> alias público actual (o código anónimo)
 *   pushScore(weekId, xp)  -> sube tu XP semanal (PATCH, con rebote)
 *   fetchBoard(weekId)     -> Promise<[{uid,alias,xp,rank,isMe}]|null>
 * ============================================================ */
window.VESPER_LEAGUE_CLOUD = (function () {
  var DB_ID = "teachermanuals";

  function available() { return !!(window.VesperAuth && window.VesperAuth.isConfigured); }
  function projectId() { try { return window.VesperAuth.config.firebase.projectId; } catch (e) { return null; } }
  function base() { return "https://firestore.googleapis.com/v1/projects/" + projectId() + "/databases/" + DB_ID + "/documents"; }
  function membersPath(weekId) { return base() + "/leagues/" + encodeURIComponent(weekId) + "/members"; }
  function memberDoc(weekId, uid) { return membersPath(weekId) + "/" + encodeURIComponent(uid); }

  var authInst = null, currentUser = null, pushTimer = null, started = false;

  function start() {
    if (started || !available()) return;
    started = true;
    try {
      window.VesperAuth.initFirebase().then(function (auth) {
        authInst = auth;
        auth.onAuthStateChanged(function (user) {
          currentUser = (user && user.emailVerified) ? user : null;
        });
      }).catch(function () { /* sin red a Firebase: queda solo simulado */ });
    } catch (e) {}
  }

  function signedIn() { return !!currentUser; }

  /* alias público: el que el alumno puso en Configuración, o un código estable
     derivado del uid (sin exponer el correo). */
  function aliasOf() {
    var alias = "";
    try {
      var prof = JSON.parse(localStorage.getItem("vesper_profile") || "null");
      alias = (prof && prof.vesper && prof.vesper.leagueAlias) ? ("" + prof.vesper.leagueAlias).trim() : "";
    } catch (e) {}
    if (alias) return alias.slice(0, 24);
    var uid = (currentUser && currentUser.uid) ? currentUser.uid : "";
    return "Estudiante#" + (uid ? uid.slice(-4) : "0000");
  }

  /* ---- codificación Firestore REST ---- */
  function toFs(alias, xp) {
    return { fields: {
      alias: { stringValue: String(alias || "") },
      xp: { integerValue: String(Math.max(0, Math.round(xp || 0))) },
      ts: { stringValue: new Date().toISOString() }
    } };
  }
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    var name = doc && doc.name ? ("" + doc.name) : "";
    var uid = name ? name.slice(name.lastIndexOf("/") + 1) : "";
    return { uid: uid, alias: (f.alias || {}).stringValue || "Estudiante",
      xp: parseInt((f.xp || {}).integerValue || "0", 10) };
  }

  /* PATCH con rebote (~1.2s) para no escribir en cada ejercicio */
  function pushScore(weekId, xp) {
    if (!signedIn() || !weekId) return;
    clearTimeout(pushTimer);
    var alias = aliasOf();
    pushTimer = setTimeout(function () {
      currentUser.getIdToken().then(function (token) {
        fetch(memberDoc(weekId, currentUser.uid), {
          method: "PATCH",
          headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
          body: JSON.stringify(toFs(alias, xp))
        }).catch(function () { /* nunca bloquees el progreso local por un fallo de red */ });
      }).catch(function () {});
    }, 1200);
  }

  /* GET de la tabla: ordena en cliente (evita índices) y marca tu fila por uid.
     Resuelve null si no hay sesión, falta la regla (403) o hay error. */
  function fetchBoard(weekId) {
    if (!signedIn() || !weekId) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      return fetch(membersPath(weekId) + "?pageSize=100", { headers: { "Authorization": "Bearer " + token } })
        .then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(function (j) {
            var docs = (j && j.documents) || [];
            var rows = docs.map(readDoc).filter(function (x) { return x.uid; });
            rows.sort(function (a, b) { return b.xp - a.xp; });
            rows = rows.slice(0, 50);
            for (var i = 0; i < rows.length; i++) {
              rows[i].rank = i + 1;
              rows[i].isMe = (rows[i].uid === currentUser.uid);
            }
            return rows;
          });
        });
    }).catch(function () { return null; });
  }

  start();
  return { available: available, signedIn: signedIn, aliasOf: aliasOf, pushScore: pushScore, fetchBoard: fetchBoard };
})();
