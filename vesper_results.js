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
 * Privacidad (2026-07-07): los intentos ya NO guardan el correo del alumno.
 * Cada intento lleva `sid` (id opaco = hash del correo, el mismo de roster/)
 * y `group` (el grupo del alumno): el profesor identifica al alumno por su
 * NOMBRE vía roster/{sid} y las reglas solo le dejan leer intentos de SUS
 * grupos (where group == <suyo>). El admin sigue leyendo todo. Los intentos
 * viejos con correo quedan visibles solo para el dueño y el admin.
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
 *   fetchAll({limit})  -> Promise<[fila]|null>  (profe: solo SUS grupos; admin: todo)
 *   fetchMine()        -> Promise<[fila]|null>  (el alumno lee SUS intentos)
 *   localAll()         -> intentos guardados en este dispositivo
 *   isAdminUser()      -> ¿la sesión es la cuenta admin?
 *   fetchMyGroups()    -> Promise<[grupo]> del profesor con sesión
 *   computeSid(email)  -> Promise<sid> (hash opaco, igual que el script admin)
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

  /* ---- identidad opaca del alumno (sid + grupo) ----
     El sid es determinista (hash del correo, igual que sid_of() en
     upload_manuals.py) y el grupo lo siembra vesper_auth.js en
     vesper_profile al validar la allowlist. Con ellos el intento queda
     identificable para el profesor SIN exponer el correo. */
  function profileOf() {
    try { return JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {}; }
    catch (e) { return {}; }
  }

  function computeSid(email) {
    email = String(email || "").trim().toLowerCase();
    if (!email || !(window.crypto && crypto.subtle && window.TextEncoder)) {
      return Promise.resolve("");
    }
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode("vesper-sid-v1|" + email))
      .then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("").slice(0, 20);
      }).catch(function () { return ""; });
  }

  /* sid del usuario actual: el sembrado en el perfil o, si falta, se calcula. */
  function mySid() {
    var p = profileOf();
    if (p.sid) return Promise.resolve(String(p.sid));
    return computeSid(currentUser && currentUser.email);
  }

  function myGroup() {
    var p = profileOf();
    return String(p.group || "");
  }

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
          skill: String(d.skill == null ? "" : d.skill),
          correct: !!d.correct
        });
      }
    }
    return {
      studentUid: (currentUser && currentUser.uid) ? currentUser.uid : "",
      alias: aliasOf(),
      sid: "",             // se resuelve en record() antes de subir
      group: myGroup(),
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
        skill: { stringValue: d.skill || "" },
        correct: { booleanValue: d.correct }
      } } };
    });
    return { fields: {
      studentUid: { stringValue: rec.studentUid },
      alias: { stringValue: rec.alias },
      sid: { stringValue: rec.sid },
      group: { stringValue: rec.group },
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
        skill: (df.skill && df.skill.stringValue) || "",
        correct: !!(df.correct && df.correct.booleanValue)
      });
    }
    return {
      studentUid: s("studentUid"), alias: s("alias") || "Estudiante",
      sid: s("sid"), group: s("group"), email: s("email") /* solo docs viejos */,
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
    return mySid().then(function (sid) {
      rec.sid = sid;
      return currentUser.getIdToken();
    }).then(function (token) {
      return fetch(collPath(), {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(toFs(rec))
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* ¿la sesión actual es la cuenta admin? (ve todo, incluidos docs viejos) */
  function isAdminUser() {
    try {
      return String(currentUser.email || "").trim().toLowerCase() ===
             String(window.VesperAuth.config.adminEmail || "").trim().toLowerCase();
    } catch (e) { return false; }
  }

  /* grupos asignados al profesor con sesión (teachers/{correo}.groups; la
     regla permite leer el propio doc). [] si no tiene o si falla. */
  function fetchMyGroups() {
    if (!signedIn()) return Promise.resolve([]);
    var email = String(currentUser.email || "").trim().toLowerCase();
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/teachers/" + encodeURIComponent(email), {
        headers: { "Authorization": "Bearer " + token }
      }).then(function (r) {
        if (r.status !== 200) return [];
        return r.json().then(function (doc) {
          var vals = (doc.fields && doc.fields.groups && doc.fields.groups.arrayValue &&
                      doc.fields.groups.arrayValue.values) || [];
          return vals.map(function (v) { return v.stringValue || ""; }).filter(Boolean);
        });
      });
    }).catch(function () { return []; });
  }

  /* lectura del profe. El ADMIN lee toda la colección (query ordenada); un
     PROFESOR solo puede leer intentos de SUS grupos, así que se lanza una
     query filtrada `group == g` por cada grupo (sin orderBy para no exigir
     índice compuesto) y se ordena aquí. Resuelve null si no hay sesión o si
     falta la regla (403); [] si el profesor no tiene grupos asignados. */
  function fetchAll(opts) {
    opts = opts || {};
    var limit = Math.max(1, Math.min(1000, parseInt(opts.limit, 10) || 500));
    if (!signedIn()) return Promise.resolve(null);

    function runQuery(token, query) {
      return fetch(base() + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: query })
      }).then(function (r) {
        if (r.status !== 200) return null;
        return r.json().then(function (rows) {
          return (rows || []).filter(function (x) { return x.document; }).map(function (x) {
            return readDoc(x.document);
          });
        });
      });
    }

    return currentUser.getIdToken().then(function (token) {
      if (isAdminUser()) {
        return runQuery(token, {
          from: [{ collectionId: COLLECTION }],
          orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
          limit: limit
        });
      }
      return fetchMyGroups().then(function (groups) {
        if (!groups.length) return [];
        return Promise.all(groups.map(function (g) {
          return runQuery(token, {
            from: [{ collectionId: COLLECTION }],
            where: { fieldFilter: {
              field: { fieldPath: "group" }, op: "EQUAL",
              value: { stringValue: g }
            } },
            limit: limit
          });
        })).then(function (parts) {
          if (parts.every(function (p) { return p === null; })) return null;
          var rows = [];
          parts.forEach(function (p) { if (p) rows = rows.concat(p); });
          rows.sort(function (a, b) { return (b.date || "") < (a.date || "") ? -1 : 1; });
          return rows.slice(0, limit);
        });
      });
    }).catch(function () { return null; });
  }

  /* lectura del ALUMNO: solo SUS intentos (la regla lo permite vía el filtro
     studentUid == uid; sin orderBy para no requerir índice compuesto — se
     ordena aquí por fecha desc). Resuelve null sin sesión o con error. */
  function fetchMine() {
    if (!signedIn()) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: COLLECTION }],
          where: { fieldFilter: {
            field: { fieldPath: "studentUid" },
            op: "EQUAL",
            value: { stringValue: currentUser.uid }
          } },
          limit: 1000
        } })
      }).then(function (r) {
        if (r.status !== 200) return null;
        return r.json().then(function (rows) {
          return (rows || []).filter(function (x) { return x.document; }).map(function (x) {
            return readDoc(x.document);
          }).sort(function (a, b) { return (b.date || "") < (a.date || "") ? -1 : 1; });
        });
      });
    }).catch(function () { return null; });
  }

  start();
  return {
    available: available, signedIn: signedIn, aliasOf: aliasOf,
    record: record, fetchAll: fetchAll, fetchMine: fetchMine, localAll: localAll,
    isAdminUser: isAdminUser, fetchMyGroups: fetchMyGroups, computeSid: computeSid
  };
})();
