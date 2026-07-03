/* ============================================================
 * vesper_gradebook.js — Boleta de calificaciones por alumno.
 *
 * Una tabla GENÉRICA para todos los niveles (A1–C2): una fila por alumno
 * con tres criterios en escala 0–100, iguales para cualquier nivel:
 *   - Exámenes  (automático: exam_results, examType "exam"|"boss")
 *   - Lecciones (automático: exam_results, examType "lesson")
 *   - Participación (manual: la captura el profesor en portal_boleta.html)
 * El nivel CEFR es solo una insignia informativa; NO cambia la estructura
 * ni los criterios de la boleta.
 *
 * Reusa el MISMO patrón REST que vesper_results.js:
 *   - DB "teachermanuals", token de VesperAuth (sesión verificada).
 *   - colección `gradebook/{correo en minúsculas}`: un doc por alumno con
 *     la parte manual. Escriben SOLO profes/admin; lee el dueño y el profe
 *     (ver firestore.rules / FIRESTORE_GRADEBOOK_RULES.md).
 * El roster se deriva de exam_results (alumnos con intentos en la nube)
 * unido con los docs de gradebook (alumnos ya calificados a mano), así no
 * hace falta relajar la allowlist students/.
 *
 * Degrada en silencio: sin Firebase, sin sesión o sin la regla publicada
 * (403), fetchGrades() resuelve null y saveGrade() false — la página
 * muestra su aviso sin romperse.
 *
 * window.VESPER_GRADEBOOK:
 *   WEIGHTS / PASS_THRESHOLD  -> pesos de la final y umbral de aprobación
 *   available()               -> ¿hay Firebase configurado?
 *   signedIn()                -> ¿hay sesión verificada?
 *   fetchGrades()             -> Promise<{correo: fila}|null> (lectura profe)
 *   saveGrade(email, data)    -> Promise<bool> (upsert de la parte manual)
 *   buildRoster(attempts, grades) -> [fila por alumno] (función pura)
 *   computeFinal(row)         -> { final:int|null, passed:bool|null } (pura)
 * ============================================================ */
window.VESPER_GRADEBOOK = (function () {
  var DB_ID = "teachermanuals";
  var COLLECTION = "gradebook";

  /* Pesos de la calificación final (deben sumar 1). Si un componente no
     existe aún (p. ej. alumno sin exámenes), se excluye y los pesos
     restantes se renormalizan — la falta de datos NO cuenta como cero. */
  var WEIGHTS = { exams: 0.5, lessons: 0.3, participation: 0.2 };
  var PASS_THRESHOLD = 70; // % mínimo para "Aprobado" en la final

  function available() { return !!(window.VesperAuth && window.VesperAuth.isConfigured); }
  function projectId() { try { return window.VesperAuth.config.firebase.projectId; } catch (e) { return null; } }
  function base() { return "https://firestore.googleapis.com/v1/projects/" + projectId() + "/databases/" + DB_ID + "/documents"; }

  var currentUser = null, started = false;

  function start() {
    if (started || !available()) return;
    started = true;
    try {
      window.VesperAuth.initFirebase().then(function (auth) {
        auth.onAuthStateChanged(function (user) {
          currentUser = (user && user.emailVerified) ? user : null;
        });
      }).catch(function () { /* sin red a Firebase: queda inactivo */ });
    } catch (e) {}
  }

  function signedIn() { return !!currentUser; }

  function clampPct(v) {
    v = parseInt(v, 10);
    if (isNaN(v)) return null;
    return Math.max(0, Math.min(100, v));
  }

  /* lee un doc REST de gradebook -> fila plana. El id del doc es el correo. */
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    var name = (doc && doc.name) || "";
    var email = name.slice(name.lastIndexOf("/") + 1).toLowerCase();
    var p = (f.participacion && f.participacion.integerValue != null)
      ? clampPct(f.participacion.integerValue) : null;
    return {
      email: email,
      participacion: p,
      notes: s("notes"),
      alias: s("alias"),
      studentUid: s("studentUid"),
      updatedAt: (f.updatedAt && f.updatedAt.timestampValue) || "",
      updatedBy: s("updatedBy")
    };
  }

  /* lectura del profe: todos los docs de gradebook -> mapa por correo.
     Resuelve null si no hay sesión, falta la regla (403) o hay error. */
  function fetchGrades() {
    if (!signedIn()) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: COLLECTION }],
          limit: 1000
        } })
      }).then(function (r) {
        if (r.status !== 200) return null;
        return r.json().then(function (rows) {
          var map = {};
          (rows || []).forEach(function (x) {
            if (!x.document) return;
            var g = readDoc(x.document);
            if (g.email) map[g.email] = g;
          });
          return map;
        });
      });
    }).catch(function () { return null; });
  }

  /* upsert de la parte manual de un alumno. PATCH con updateMask crea el
     doc si no existe; el mask DEBE listar cada campo enviado para no borrar
     los demás. La regla exige participacion int 0..100 y cuenta de profe. */
  function saveGrade(email, data) {
    email = String(email || "").trim().toLowerCase();
    var p = clampPct(data && data.participacion);
    if (!email || p == null || !signedIn()) return Promise.resolve(false);
    var fields = {
      participacion: { integerValue: String(p) },
      notes: { stringValue: String((data && data.notes) || "").slice(0, 500) },
      alias: { stringValue: String((data && data.alias) || "").slice(0, 24) },
      studentUid: { stringValue: String((data && data.studentUid) || "") },
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    var mask = Object.keys(fields).map(function (k) {
      return "updateMask.fieldPaths=" + k;
    }).join("&");
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/" + COLLECTION + "/" + encodeURIComponent(email) + "?" + mask, {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* ---- construcción de la boleta (funciones puras, sin red) ---- */

  /* promedio del MEJOR percent por examen distinto: los reintentos cuentan
     por su mejor marca (mismo criterio que vesper_path.js), no en contra. */
  function bestAvg(best) {
    var ids = Object.keys(best);
    if (!ids.length) return null;
    var sum = 0;
    ids.forEach(function (id) { sum += best[id]; });
    return Math.round(sum / ids.length);
  }

  /* attempts: filas de VESPER_RESULTS.fetchAll (ya vienen por fecha DESC).
     grades: mapa de fetchGrades (o null/{}). Devuelve una fila por alumno:
     { key, email, alias, studentUid, level, examsAvg, examsCount,
       lessonsAvg, lessonsCount, participacion, notes, lastDate } */
  function buildRoster(attempts, grades) {
    var by = {};
    function entry(key) {
      if (!by[key]) {
        by[key] = { key: key, email: "", alias: "", studentUid: "", level: "",
                    examsBest: {}, examsCount: 0, lessonsBest: {}, lessonsCount: 0,
                    participacion: null, notes: "", lastDate: "" };
      }
      return by[key];
    }

    (attempts || []).forEach(function (r) {
      if (!r || r.examType === "placement") return; // diagnóstico: no califica
      var email = String(r.email || "").trim().toLowerCase();
      var key = email || (r.studentUid ? "uid:" + r.studentUid : "");
      if (!key) return;
      var e = entry(key);
      if (email) e.email = email;
      if (!e.alias && r.alias) e.alias = r.alias;           // DESC: el más reciente
      if (!e.studentUid && r.studentUid) e.studentUid = r.studentUid;
      if (!e.level && r.level) e.level = r.level;
      if (!e.lastDate && r.date) e.lastDate = r.date;
      var pct = clampPct(r.percent); if (pct == null) pct = 0;
      var id = r.examId || (r.examType + "|" + (r.level || ""));
      if (r.examType === "exam" || r.examType === "boss") {
        e.examsCount++;
        if (e.examsBest[id] == null || pct > e.examsBest[id]) e.examsBest[id] = pct;
      } else if (r.examType === "lesson") {
        e.lessonsCount++;
        if (e.lessonsBest[id] == null || pct > e.lessonsBest[id]) e.lessonsBest[id] = pct;
      }
    });

    /* alumnos ya calificados a mano siguen en la boleta aunque sus intentos
       hayan salido de la ventana de fetchAll (o no tengan ninguno). */
    Object.keys(grades || {}).forEach(function (email) {
      var g = grades[email];
      var e = entry(email);
      e.email = email;
      e.participacion = g.participacion;
      e.notes = g.notes || "";
      if (!e.alias && g.alias) e.alias = g.alias;
      if (!e.studentUid && g.studentUid) e.studentUid = g.studentUid;
    });

    return Object.keys(by).map(function (k) {
      var e = by[k];
      return {
        key: e.key, email: e.email, alias: e.alias || "Estudiante",
        studentUid: e.studentUid, level: e.level, lastDate: e.lastDate,
        examsAvg: bestAvg(e.examsBest), examsCount: e.examsCount,
        lessonsAvg: bestAvg(e.lessonsBest), lessonsCount: e.lessonsCount,
        participacion: e.participacion, notes: e.notes
      };
    });
  }

  /* final ponderada SOLO con los componentes presentes (pesos renormalizados). */
  function computeFinal(row) {
    var parts = [
      { w: WEIGHTS.exams, v: row.examsAvg },
      { w: WEIGHTS.lessons, v: row.lessonsAvg },
      { w: WEIGHTS.participation, v: row.participacion }
    ].filter(function (p) { return p.v != null; });
    if (!parts.length) return { final: null, passed: null };
    var sum = 0, wsum = 0;
    parts.forEach(function (p) { sum += p.w * p.v; wsum += p.w; });
    var final = Math.round(sum / wsum);
    return { final: final, passed: final >= PASS_THRESHOLD };
  }

  start();
  return {
    WEIGHTS: WEIGHTS, PASS_THRESHOLD: PASS_THRESHOLD,
    available: available, signedIn: signedIn,
    fetchGrades: fetchGrades, saveGrade: saveGrade,
    buildRoster: buildRoster, computeFinal: computeFinal
  };
})();
