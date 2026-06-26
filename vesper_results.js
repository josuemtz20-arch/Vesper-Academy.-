/* ============================================================
 * vesper_results.js — Registro central de resultados de exámenes.
 *
 * Centraliza dentro de la plataforma las calificaciones de los exámenes que
 * ya existen (boss exams de fin de mundo, examen de nivelación) y de las
 * lecciones, para que el profesor las consulte sin recurrir a fuentes
 * externas (Forms, PDFs, etc.).
 *
 * Reusa el MISMO patrón REST que vesper_league_cloud.js / vesper_sync.js:
 *   - DB "teachermanuals", token de VesperAuth (sesión verificada).
 *   - colección de nivel superior `exam_results/{autoId}`: cada alumno CREA
 *     su propio intento; el profe/admin lee todos (ver reglas).
 * El intento se espeja SIEMPRE en localStorage (`vesper_exam_results_v1`),
 * así funciona sin cuenta. Con sesión verificada además sube a Firestore.
 *
 * Privacidad: a diferencia de la liga (tabla pública entre alumnos), esta
 * colección SOLO la leen el dueño y los profesores/admin (regla de Firestore),
 * por eso sí se guarda el correo del alumno cuando hay sesión — útil para que
 * el profe identifique a su alumno. Sin sesión, solo queda el alias.
 *
 * Degrada en silencio: sin Firebase, sin sesión, o si falta publicar la regla
 * (403), record() escribe solo en local y NUNCA bloquea la pantalla de
 * resultados. Ver FIRESTORE_EXAM_RESULTS_RULES.md para activar la nube.
 *
 * window.VESPER_RESULTS:
 *   available()        -> ¿hay Firebase configurado?
 *   signedIn()         -> ¿hay sesión verificada?
 *   aliasOf()          -> alias público actual (o código anónimo)
 *   record(result)     -> registra un intento (local + nube si hay sesión)
 *   fetchAll({limit})  -> Promise<[fila]|null>  (lectura del profe)
 *   localAll()         -> intentos guardados en este dispositivo
 * ============================================================ */
window.VESPER_RESULTS = (function () {
  var DB_ID = "teachermanuals";
  var COLLECTION = "exam_results";
  var LS_KEY = "vesper_exam_results_v1";
  var LS_CAP = 100;
  var DETAIL_CAP = 60;

  function available() { return !!(window.VesperAuth && window.VesperAuth.isConfigured); }
  function projectId() { try { return window.VesperAuth.config.firebase.projectId; } catch (e) { return null; } }
  function base() { return "https://firestore.googleapis.com/v1/projects/" + projectId() + "/databases/" + DB_ID + "/documents"; }
  function collPath() { return base() + "/" + COLLECTION; }

  var authInst = null, currentUser = null, started = false;

  function start() {
    if (started || !available()) return;
    started = true;
    try {
      window.VesperAuth.initFirebase().then(function (auth) {
        authInst = auth;
        auth.onAuthStateChanged(function (user) {
          currentUser = (user && user.emailVerified) ? user : null;
        });
      }).catch(function () { /* sin red a Firebase: queda solo-local */ });
    } catch (e) {}
  }

  function signedIn() { return !!currentUser; }

  /* alias público: el de Configuración o un código estable derivado del uid. */
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

  /* normaliza el objeto que pasa el llamador a la forma del modelo de datos. */
  function normalize(r) {
    r = r || {};
    var total = Math.max(0, parseInt(r.total, 10) || 0);
    var score = Math.max(0, parseInt(r.score, 10) || 0);
    var percent = (r.percent != null)
      ? Math.max(0, Math.min(100, Math.round(r.percent)))
      : (total ? Math.round(100 * score / total) : 0);
    var threshold = Math.max(0, Math.min(100, parseInt(r.threshold, 10) || 0));
    var detail = [];
    if (r.detail && r.detail.length) {
      for (var i = 0; i < r.detail.length && i < DETAIL_CAP; i++) {
        var d = r.detail[i] || {};
        detail.push({
          q: String(d.q == null ? "" : d.q).slice(0, 200),
          type: String(d.type == null ? "" : d.type),
          correct: !!d.correct
        });
      }
    }
    return {
      studentUid: (currentUser && currentUser.uid) ? currentUser.uid : "",
      alias: aliasOf(),
      email: (currentUser && currentUser.email) ? String(currentUser.email).trim().toLowerCase() : "",
      examType: String(r.examType || "lesson"),
      examId: String(r.examId || ""),
      level: String(r.level || ""),
      score: score,
      total: total,
      percent: percent,
      passed: (r.passed != null) ? !!r.passed : (threshold ? percent >= threshold : false),
      threshold: threshold,
      detail: detail,
      clientTs: new Date().toISOString()
    };
  }

  /* ---- codificación Firestore REST (valores tipados) ---- */
  function toFs(rec) {
    var detailValues = rec.detail.map(function (d) {
      return { mapValue: { fields: {
        q: { stringValue: d.q },
        type: { stringValue: d.type },
        correct: { booleanValue: d.correct }
      } } };
    });
    return { fields: {
      studentUid: { stringValue: rec.studentUid },
      alias: { stringValue: rec.alias },
      email: { stringValue: rec.email },
      examType: { stringValue: rec.examType },
      examId: { stringValue: rec.examId },
      level: { stringValue: rec.level },
      score: { integerValue: String(rec.score) },
      total: { integerValue: String(rec.total) },
      percent: { integerValue: String(rec.percent) },
      passed: { booleanValue: rec.passed },
      threshold: { integerValue: String(rec.threshold) },
      detail: { arrayValue: { values: detailValues } },
      createdAt: { timestampValue: rec.clientTs },
      clientTs: { stringValue: rec.clientTs }
    } };
  }

  /* lee un documento REST -> fila plana para el panel del profesor */
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    function n(k) { return parseInt((f[k] && f[k].integerValue) || "0", 10); }
    function b(k) { return !!(f[k] && f[k].booleanValue); }
    var detail = [];
    var arr = (f.detail && f.detail.arrayValue && f.detail.arrayValue.values) || [];
    for (var i = 0; i < arr.length; i++) {
      var df = (arr[i] && arr[i].mapValue && arr[i].mapValue.fields) || {};
      detail.push({
        q: (df.q && df.q.stringValue) || "",
        type: (df.type && df.type.stringValue) || "",
        correct: !!(df.correct && df.correct.booleanValue)
      });
    }
    return {
      studentUid: s("studentUid"), alias: s("alias") || "Estudiante", email: s("email"),
      examType: s("examType") || "lesson", examId: s("examId"), level: s("level"),
      score: n("score"), total: n("total"), percent: n("percent"),
      passed: b("passed"), threshold: n("threshold"),
      date: (f.createdAt && f.createdAt.timestampValue) || s("clientTs"),
      detail: detail
    };
  }

  /* ---- espejo local (siempre, con o sin cuenta) ---- */
  function localAll() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveLocal(rec) {
    try {
      var list = localAll();
      list.unshift(rec);
      localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, LS_CAP)));
    } catch (e) {}
  }

  /* registra un intento: local SIEMPRE + nube si hay sesión verificada.
     Nunca lanza al llamador (la pantalla de resultados no debe romperse). */
  function record(result) {
    var rec;
    try { rec = normalize(result); } catch (e) { return Promise.resolve(false); }
    saveLocal(rec);
    if (!signedIn()) return Promise.resolve(false);
    return currentUser.getIdToken().then(function (token) {
      return fetch(collPath(), {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(toFs(rec))
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* lectura del profe: runQuery ordenado por fecha desc. Ordena/limita.
     Resuelve null si no hay sesión, falta la regla (403) o hay error. */
  function fetchAll(opts) {
    opts = opts || {};
    var limit = Math.max(1, Math.min(1000, parseInt(opts.limit, 10) || 500));
    if (!signedIn()) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: COLLECTION }],
          orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
          limit: limit
        } })
      }).then(function (r) {
        if (r.status !== 200) return null;
        return r.json().then(function (rows) {
          return (rows || []).filter(function (x) { return x.document; }).map(function (x) {
            return readDoc(x.document);
          });
        });
      });
    }).catch(function () { return null; });
  }

  start();
  return {
    available: available, signedIn: signedIn, aliasOf: aliasOf,
    record: record, fetchAll: fetchAll, localAll: localAll
  };
})();
