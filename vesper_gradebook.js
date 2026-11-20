/* ============================================================
 * vesper_gradebook.js — Boleta de calificaciones por alumno.
 *
 * MODELO (2026-11, rediseño). La calificación sale de CINCO componentes,
 * todos capturados por el PROFESOR (los intentos de la app son práctica y
 * NO cuentan; ver README → Integridad de calificaciones):
 *
 *   Asistencia          10 %  pase de lista diario (Presente/Retardo/Falta/Justificada)
 *   Tareas              15 %  marca diaria (entregada / incompleta / no entregó)
 *   Desempeño en clase  25 %  rúbrica por habilidad en 4 niveles (ver CRITERIA)
 *   Parciales           20 %  hasta 3 evaluaciones 0–100 (promedio de las capturadas)
 *   Examen final        30 %  0–100 (clase 20)
 *
 * Reglas del cálculo (computeGrade):
 *   - Un componente sin datos se excluye y los pesos se renormalizan, PERO la
 *     nota es PROVISIONAL ("avance") y lleva su cobertura (% de la calificación
 *     ya evaluado). Solo hay Aprobado/Reprobado cuando existe el examen final.
 *   - La rúbrica NO arranca en perfecto: lo que el profesor no calificó no
 *     cuenta. Cada habilidad pesa igual (promedio de promedios por criterio).
 *   - Una falta vale 0 de asistencia y ese día no se evalúa desempeño; la
 *     justificada no cuenta ni a favor ni en contra; el retardo vale LATE_CREDIT.
 *   - Asistencia por debajo de MIN_ATTENDANCE (con al menos 2 faltas) o avance
 *     por debajo de PASS_THRESHOLD levantan una alerta ("en riesgo"). No
 *     reprueban solos.
 *
 * CALENDARIO: el ciclo arranca en COURSE_START (clase 1) y dura COURSE_DAYS
 * clases contadas en días hábiles (lun–vie, saltando NO_CLASS). Con eso cada
 * "día 1..20" de la rúbrica tiene fecha real.
 *
 * Datos (Firestore REST, base "teachermanuals", token de VesperAuth):
 *   gradebook/{sid}       quiz1..quiz3, finalExam (int 0..100), notes (comentario
 *                         que ve el alumno). Campos del modelo anterior que se
 *                         siguen LEYENDO como respaldo: examsGrade → Parciales,
 *                         lessonsGrade → Tareas, participacion → Desempeño.
 *   daily_progress/{sid}  days: { "1": { _activo, att, hw?, r?:{criterio:1..4} } }
 *                         Los días del modelo anterior ({_activo, aspecto:false})
 *                         se convierten al leer (legacyDay) y se reescriben en el
 *                         formato nuevo la próxima vez que se guarda ese alumno.
 * Escriben SOLO profes/admin; lee el dueño y el profe (firestore.rules /
 * FIRESTORE_GRADEBOOK_RULES.md). Las reglas publicadas ya aceptan estos
 * campos: no hay que republicar nada para que funcione.
 *
 * Privacidad y grupos: el roster se lee de `roster/{sid}` (espejo SIN CORREO
 * de la allowlist). El `sid` es un hash opaco del correo; cada profesor solo
 * lee alumnos de SUS grupos (lo exigen las reglas); el admin ve todo.
 *
 * Degrada en silencio: sin Firebase, sin sesión o sin la regla publicada
 * (403), los fetch* resuelven null y los save* false.
 *
 * window.VESPER_GRADEBOOK:
 *   Configuración: COURSE_START, COURSE_DAYS, COMPONENTS, PASS_THRESHOLD,
 *                  MIN_ATTENDANCE, QUIZ_KEYS, ATT, ATT_ORDER, LEVELS, CRITERIA
 *   Calendario:    classDates() -> ["AAAA-MM-DD" × COURSE_DAYS]
 *                  courseClock() -> { today, day, isClassDay, started, ended, start, end }
 *                  fmtDay(iso) -> "lun 23 nov"
 *   Red:           fetchRoster(), fetchGrades(sids), fetchMyGrade(), saveGrade(sid, data),
 *                  fetchDailyAll(sids), fetchMyDaily(), saveDaily(sid, data)
 *   Puras:         buildRoster(rosterMap, attempts, grades) -> [fila por alumno]
 *                  dailyStats(days) -> asistencia, tareas, criterios, desempeño, perDay
 *                  computeGrade(row, stats) -> { parts, grade, coverage, closed, passed, ... }
 *   Vista:         injectCss(), attMark(a), hwMark(h), dailyGridHtml(days)
 * ============================================================ */
window.VESPER_GRADEBOOK = (function () {
  var DB_ID = "teachermanuals";
  var COLLECTION = "gradebook";
  var DAILY_COLLECTION = "daily_progress";

  /* ================= CONFIGURACIÓN (todo lo ajustable vive aquí) ================= */

  /* Inicio del curso: la clase 1. Las demás fechas se cuentan solas. */
  var COURSE_START = "2026-11-23";
  var COURSE_DAYS = 20;
  /* Fechas "AAAA-MM-DD" entre semana SIN clase (festivos, vacaciones): el ciclo
     las salta y la clase se recorre. Del 23 nov al 18 dic de 2026 no hay ninguna. */
  var NO_CLASS = [];

  /* Componentes de la calificación. Los pesos deben sumar 1. */
  var COMPONENTS = [
    { key: "attendance",  label: "Asistencia",         weight: 0.10 },
    { key: "homework",    label: "Tareas",             weight: 0.15 },
    { key: "performance", label: "Desempeño en clase", weight: 0.25 },
    { key: "quizzes",     label: "Parciales",          weight: 0.20 },
    { key: "final",       label: "Examen final",       weight: 0.30 }
  ];
  var PASS_THRESHOLD = 70;   // mínimo para aprobar (y línea de "en riesgo")
  var MIN_ATTENDANCE = 80;   // % de asistencia por debajo del cual se alerta
  var LATE_CREDIT = 0.5;     // un retardo vale media asistencia
  var QUIZ_KEYS = ["quiz1", "quiz2", "quiz3"];

  /* Asistencia. credit null = no cuenta (ni a favor ni en contra). */
  var ATT = {
    P: { label: "Presente",    mark: "✓", credit: 1 },
    R: { label: "Retardo",     mark: "R", credit: LATE_CREDIT },
    F: { label: "Falta",       mark: "F", credit: 0 },
    J: { label: "Justificada", mark: "J", credit: null }
  };
  var ATT_ORDER = ["P", "R", "F", "J"];

  /* Tarea del día: 2 entregada · 1 incompleta · 0 no entregó (sin marca = no hubo). */
  var HW = {
    2: { label: "Entregada",  mark: "✓", pts: 100 },
    1: { label: "Incompleta", mark: "½", pts: 50 },
    0: { label: "No entregó", mark: "✗", pts: 0 }
  };

  /* Niveles de la rúbrica. Los puntos NO son lineales a propósito: "Regular"
     es justo la línea de aprobación e "Insuficiente" reprueba sin hundir a 25. */
  var LEVELS = {
    4: { label: "Excelente",    pts: 100 },
    3: { label: "Bien",         pts: 85 },
    2: { label: "Regular",      pts: 70 },
    1: { label: "Insuficiente", pts: 50 }
  };

  /* Criterios de la rúbrica de desempeño. Las 'key' son campos en Firestore:
     no las cambies. Para añadir/quitar un criterio basta editar esta lista. */
  var CRITERIA = [
    { key: "participacion", label: "Participación", hint: "Participa, trabaja y usa el inglés en clase" },
    { key: "speaking",      label: "Speaking",      hint: "Fluidez y pronunciación al hablar" },
    { key: "listening",     label: "Listening",     hint: "Comprende lo que escucha" },
    { key: "reading",       label: "Reading",       hint: "Comprende lo que lee" },
    { key: "writing",       label: "Writing",       hint: "Escribe con claridad y corrección" },
    { key: "gramatica",     label: "Gramática",     hint: "Usa bien las estructuras del nivel" },
    { key: "vocabulario",   label: "Vocabulario",   hint: "Usa el vocabulario del nivel" }
  ];

  /* Modelo anterior (16 aspectos ✓/✗): a qué criterio nuevo cae cada aspecto. */
  var LEGACY_GROUPS = {
    participacion: ["participacion", "actitud", "trabajo_clase", "uso_ingles", "material"],
    speaking: ["speaking", "pronunciacion", "fluidez"],
    listening: ["listening"], reading: ["reading"], writing: ["writing"],
    gramatica: ["gramatica"], vocabulario: ["vocabulario"]
  };

  /* ================= CALENDARIO DEL CICLO ================= */
  var MON_S = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var DOW_S = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function isoOf(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
  function parseIso(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDay(s) {
    if (!s) return "";
    var d = parseIso(s);
    return DOW_S[d.getDay()] + " " + d.getDate() + " " + MON_S[d.getMonth()];
  }

  /* las COURSE_DAYS fechas de clase: [0] = clase 1 */
  var datesCache = null;
  function classDates() {
    if (datesCache) return datesCache;
    var out = [], d = parseIso(COURSE_START), guard = 0;
    while (out.length < COURSE_DAYS && guard++ < 400) {
      var wd = d.getDay(), s = isoOf(d);
      if (wd !== 0 && wd !== 6 && NO_CLASS.indexOf(s) === -1) out.push(s);
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    datesCache = out;
    return out;
  }

  /* dónde va el ciclo HOY. day = última clase cuya fecha ya llegó (0 = aún no
     inicia); isClassDay = hoy toca clase. `now` solo para pruebas. */
  function courseClock(now) {
    var dates = classDates(), t = isoOf(now || new Date()), day = 0;
    for (var i = 0; i < dates.length; i++) if (dates[i] <= t) day = i + 1;
    return {
      today: t, day: day, isClassDay: dates.indexOf(t) !== -1,
      started: t >= dates[0], ended: t > dates[dates.length - 1],
      start: dates[0], end: dates[dates.length - 1]
    };
  }

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

  /* ---- identidad y grupos (mismo modelo que vesper_results.js) ---- */

  function isAdminUser() {
    try {
      return String(currentUser.email || "").trim().toLowerCase() ===
             String(window.VesperAuth.config.adminEmail || "").trim().toLowerCase();
    } catch (e) { return false; }
  }

  /* sid del alumno con sesión: el que sembró vesper_auth.js en el perfil o,
     si falta, se calcula (hash determinista del correo, igual que sid_of()
     en upload_manuals.py). */
  function mySid() {
    try {
      var p = JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {};
      if (p.sid) return Promise.resolve(String(p.sid));
    } catch (e) {}
    var email = String((currentUser && currentUser.email) || "").trim().toLowerCase();
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

  /* grupos del profesor con sesión (lee su propio doc teachers/{correo}). */
  function fetchMyGroups(token) {
    var email = String(currentUser.email || "").trim().toLowerCase();
    return fetch(base() + "/teachers/" + encodeURIComponent(email), {
      headers: { "Authorization": "Bearer " + token }
    }).then(function (r) {
      if (r.status !== 200) return [];
      return r.json().then(function (doc) {
        var vals = (doc.fields && doc.fields.groups && doc.fields.groups.arrayValue &&
                    doc.fields.groups.arrayValue.values) || [];
        return vals.map(function (v) { return v.stringValue || ""; }).filter(Boolean);
      });
    }).catch(function () { return []; });
  }

  /* ---- roster: la lista de alumnos que este profesor puede ver ----
     Lee roster/{sid} (name/level/group, SIN correo). El admin lista la
     colección completa; un profesor lanza una query `group == g` por cada
     uno de sus grupos (la regla solo le permite eso). Devuelve un mapa
     sid -> { sid, name, level, levelName, group } — null si falta la regla,
     {} si simplemente no tiene alumnos/grupos. */
  function readRosterDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    var name = (doc && doc.name) || "";
    var lvl = (f.level && f.level.integerValue != null) ? parseInt(f.level.integerValue, 10) : null;
    return {
      sid: name.slice(name.lastIndexOf("/") + 1),
      name: s("name"), levelName: s("levelName"), group: s("group"),
      level: (lvl != null && !isNaN(lvl)) ? lvl : null
    };
  }

  function fetchRoster() {
    if (!signedIn()) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      function runQuery(query) {
        return fetch(base() + ":runQuery", {
          method: "POST",
          headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
          body: JSON.stringify({ structuredQuery: query })
        }).then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(function (rows) {
            return (rows || []).filter(function (x) { return x.document; })
                               .map(function (x) { return readRosterDoc(x.document); });
          });
        });
      }
      function toMap(list) {
        var map = {};
        (list || []).forEach(function (st) { if (st.sid) map[st.sid] = st; });
        return map;
      }
      if (isAdminUser()) {
        return runQuery({ from: [{ collectionId: "roster" }], limit: 1000 })
          .then(function (list) { return list === null ? null : toMap(list); });
      }
      return fetchMyGroups(token).then(function (groups) {
        if (!groups.length) return {};
        return Promise.all(groups.map(function (g) {
          return runQuery({
            from: [{ collectionId: "roster" }],
            where: { fieldFilter: {
              field: { fieldPath: "group" }, op: "EQUAL", value: { stringValue: g }
            } },
            limit: 1000
          });
        })).then(function (parts) {
          if (parts.every(function (p) { return p === null; })) return null;
          var all = [];
          parts.forEach(function (p) { if (p) all = all.concat(p); });
          return toMap(all);
        });
      });
    }).catch(function () { return null; });
  }

  function clampPct(v) {
    v = parseInt(v, 10);
    if (isNaN(v)) return null;
    return Math.max(0, Math.min(100, v));
  }

  /* lee un doc REST de gradebook -> fila plana. El id del doc es el sid.
     quiz1..3 y finalExam son las evaluaciones que captura el PROFESOR (0..100;
     null = sin capturar, no cuenta). participacion / examsGrade / lessonsGrade
     son del modelo anterior: ya no se escriben, solo se leen como respaldo. */
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    function iOrNull(k) {
      return (f[k] && f[k].integerValue != null) ? clampPct(f[k].integerValue) : null;
    }
    var name = (doc && doc.name) || "";
    return {
      sid: name.slice(name.lastIndexOf("/") + 1),
      quiz1: iOrNull("quiz1"), quiz2: iOrNull("quiz2"), quiz3: iOrNull("quiz3"),
      finalExam: iOrNull("finalExam"),
      participacion: iOrNull("participacion"),
      examsGrade: iOrNull("examsGrade"),
      lessonsGrade: iOrNull("lessonsGrade"),
      notes: s("notes"),
      alias: s("alias"),
      studentUid: s("studentUid"),
      updatedAt: (f.updatedAt && f.updatedAt.timestampValue) || "",
      updatedBy: s("updatedBy")
    };
  }

  /* batchGet de una colección por lista de sids -> mapa sid -> doc REST.
     Se usa en vez de listar la colección completa porque la regla del
     profesor depende del grupo de CADA doc (roster/{sid}.group) y una query
     de colección no sería demostrable. Los sids vienen del roster, así que
     el permiso por doc está garantizado; los docs aún no creados llegan
     como "missing" (se ignoran). null si falla la petición completa. */
  function batchGetBySid(collection, sids) {
    if (!signedIn()) return Promise.resolve(null);
    sids = (sids || []).filter(Boolean);
    if (!sids.length) return Promise.resolve({});
    var prefix = "projects/" + projectId() + "/databases/" + DB_ID + "/documents/" + collection + "/";
    return currentUser.getIdToken().then(function (token) {
      return fetch(base().replace(/\/documents$/, "") + "/documents:batchGet", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ documents: sids.map(function (s) { return prefix + s; }) })
      }).then(function (r) {
        if (r.status !== 200) return null;
        return r.json().then(function (rows) {
          var map = {};
          (rows || []).forEach(function (x) {
            if (!x.found) return;
            var id = String(x.found.name || "").slice(String(x.found.name || "").lastIndexOf("/") + 1);
            if (id) map[id] = x.found;
          });
          return map;
        });
      });
    }).catch(function () { return null; });
  }

  /* lectura del profe: la parte manual de los alumnos DADOS (sids del
     roster) -> mapa por sid. null si falta la regla o hay error. */
  function fetchGrades(sids) {
    return batchGetBySid(COLLECTION, sids).then(function (docs) {
      if (docs === null) return null;
      var map = {};
      Object.keys(docs).forEach(function (id) { map[id] = readDoc(docs[id]); });
      return map;
    });
  }

  /* lectura del ALUMNO: su propio doc de gradebook (la regla compara el sid
     con students/{su correo}.sid). Resuelve null sin sesión, sin doc o error. */
  function fetchMyGrade() {
    if (!signedIn()) return Promise.resolve(null);
    return mySid().then(function (sid) {
      if (!sid) return null;
      return currentUser.getIdToken().then(function (token) {
        return fetch(base() + "/" + COLLECTION + "/" + sid, {
          headers: { "Authorization": "Bearer " + token }
        }).then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(readDoc);
        });
      });
    }).catch(function () { return null; });
  }

  /* upsert de las evaluaciones de un alumno. PATCH con updateMask crea el doc
     si no existe y SOLO toca los campos listados en el mask, así una llamada
     que cambia un campo no borra los demás. Solo profe/admin (regla).
     `data` lleva únicamente lo que cambia:
       quiz1..quiz3 / finalExam: número 0..100, o null para BORRAR la nota
         (va en el mask pero no en el cuerpo: Firestore elimina el campo);
       notes: comentario para el alumno (máx. 500);
       alias / studentUid: se copian si vienen. */
  function saveGrade(sid, data) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    data = data || {};
    var fields = {
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    var mask = ["updatedAt", "updatedBy"];
    if (data.notes != null) { fields.notes = { stringValue: String(data.notes).slice(0, 500) }; mask.push("notes"); }
    if (data.alias) { fields.alias = { stringValue: String(data.alias).slice(0, 24) }; mask.push("alias"); }
    if (data.studentUid) { fields.studentUid = { stringValue: String(data.studentUid) }; mask.push("studentUid"); }
    QUIZ_KEYS.concat(["finalExam"]).forEach(function (k) {
      if (!(k in data)) return;
      mask.push(k);
      var v = clampPct(data[k]);
      if (v != null) fields[k] = { integerValue: String(v) };
    });
    var qs = mask.map(function (k) { return "updateMask.fieldPaths=" + k; }).join("&");
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/" + COLLECTION + "/" + sid + "?" + qs, {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* ---- registro diario por clase ----
     days[d] en memoria (d = 1..COURSE_DAYS, la PRESENCIA de la clave = se pasó
     lista a ese alumno ese día):
       { att: "P"|"R"|"F"|"J", hw: 0|1|2 (o sin clave = no hubo tarea),
         r: { criterio: 1..4 } (solo lo que el profesor calificó) }
     En Firestore además lleva `_activo:true` (así un día sin nada más se
     guarda, y un lector viejo lo sigue viendo como día con clase). */

  /* un día del modelo anterior ({_activo, aspecto:false = tache}) -> forma nueva.
     ✓ valía 100 y ✗ 0: aquí ✓ → nivel 4 y ✗ → nivel 1, promediado por grupo. */
  function legacyDay(af) {
    function tache(k) { return !!(af[k] && af[k].booleanValue === false); }
    var cell = { att: tache("asistencia") ? "F" : (tache("puntualidad") ? "R" : "P"),
                 hw: tache("tarea") ? 0 : 2, r: {} };
    Object.keys(LEGACY_GROUPS).forEach(function (k) {
      var members = LEGACY_GROUPS[k], bad = 0;
      members.forEach(function (m) { if (tache(m)) bad++; });
      cell.r[k] = Math.max(1, Math.round(4 - 3 * bad / members.length));
    });
    return cell;
  }

  function readDailyDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    var name = (doc && doc.name) || "";
    var sid = name.slice(name.lastIndexOf("/") + 1);
    var days = {};
    var dm = (f.days && f.days.mapValue && f.days.mapValue.fields) || {};
    Object.keys(dm).forEach(function (d) {
      var day = parseInt(d, 10);
      if (!(day >= 1 && day <= COURSE_DAYS)) return;
      var af = (dm[d] && dm[d].mapValue && dm[d].mapValue.fields) || {};
      if (!(af.att && af.att.stringValue)) { days[day] = legacyDay(af); return; }
      var cell = { att: ATT[af.att.stringValue] ? af.att.stringValue : "P", r: {} };
      if (af.hw && af.hw.integerValue != null) {
        var hw = parseInt(af.hw.integerValue, 10);
        if (HW[hw]) cell.hw = hw;
      }
      var rf = (af.r && af.r.mapValue && af.r.mapValue.fields) || {};
      CRITERIA.forEach(function (c) {
        var lv = rf[c.key] ? parseInt(rf[c.key].integerValue, 10) : 0;
        if (LEVELS[lv]) cell.r[c.key] = lv;
      });
      days[day] = cell;
    });
    return {
      sid: sid, alias: s("alias"), studentUid: s("studentUid"),
      days: days,
      updatedAt: (f.updatedAt && f.updatedAt.timestampValue) || "",
      updatedBy: s("updatedBy")
    };
  }

  function daysToFs(days) {
    var fields = {};
    Object.keys(days || {}).forEach(function (d) {
      var day = parseInt(d, 10), cell = days[d];
      if (!(day >= 1 && day <= COURSE_DAYS) || !cell) return;
      var cf = { _activo: { booleanValue: true },
                 att: { stringValue: ATT[cell.att] ? cell.att : "P" } };
      if (HW[cell.hw]) cf.hw = { integerValue: String(cell.hw) };
      var rf = {};
      CRITERIA.forEach(function (c) {
        var lv = cell.r && cell.r[c.key];
        if (LEVELS[lv]) rf[c.key] = { integerValue: String(lv) };
      });
      if (Object.keys(rf).length) cf.r = { mapValue: { fields: rf } };
      fields[String(day)] = { mapValue: { fields: cf } };
    });
    return { mapValue: { fields: fields } };
  }

  /* lectura del profe: las rúbricas de los alumnos DADOS (sids del roster)
     -> mapa por sid (o null si falla). */
  function fetchDailyAll(sids) {
    return batchGetBySid(DAILY_COLLECTION, sids).then(function (docs) {
      if (docs === null) return null;
      var map = {};
      Object.keys(docs).forEach(function (id) { map[id] = readDailyDoc(docs[id]); });
      return map;
    });
  }

  /* lectura del ALUMNO: su propia rúbrica (o null si no hay/404/error). */
  function fetchMyDaily() {
    if (!signedIn()) return Promise.resolve(null);
    return mySid().then(function (sid) {
      if (!sid) return null;
      return currentUser.getIdToken().then(function (token) {
        return fetch(base() + "/" + DAILY_COLLECTION + "/" + sid, {
          headers: { "Authorization": "Bearer " + token }
        }).then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(readDailyDoc);
        });
      });
    }).catch(function () { return null; });
  }

  /* upsert de la rúbrica completa de un alumno (el mapa days se reemplaza
     entero — el llamador manda el estado completo). Solo profe/admin. */
  function saveDaily(sid, data) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    var fields = {
      days: daysToFs((data && data.days) || {}),
      alias: { stringValue: String((data && data.alias) || "").slice(0, 24) },
      studentUid: { stringValue: String((data && data.studentUid) || "") },
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    var mask = Object.keys(fields).map(function (k) {
      return "updateMask.fieldPaths=" + k;
    }).join("&");
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/" + DAILY_COLLECTION + "/" + sid + "?" + mask, {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* estadística del registro diario de UN alumno (función pura):
       days        clases con pase de lista
       att         { P, R, F, J, counted, pct }   pct = (P + LATE_CREDIT·R) / (P+R+F)
       hw          { n, pct }                      promedio de las tareas marcadas
       criteria    { key: { n, pct } }             promedio por habilidad
       performance promedio de los promedios por criterio (cada habilidad pesa igual)
       ratings     observaciones de rúbrica que cuentan
       perDay      { d: { att, hw, score, ratings } }   score = desempeño de ese día
     Los días con Falta o Justificada no aportan rúbrica aunque tenga marcas. */
  function dailyStats(days) {
    days = days || {};
    var att = { P: 0, R: 0, F: 0, J: 0 }, hwSum = 0, hwN = 0, n = 0, ratings = 0;
    var crit = {}, perDay = {};
    CRITERIA.forEach(function (c) { crit[c.key] = { sum: 0, n: 0 }; });
    for (var d = 1; d <= COURSE_DAYS; d++) {
      var cell = days[d];
      if (!cell) continue;
      n++;
      var a = ATT[cell.att] ? cell.att : "P";
      att[a]++;
      if (HW[cell.hw]) { hwSum += HW[cell.hw].pts; hwN++; }
      var dsum = 0, dn = 0;
      if (a === "P" || a === "R") {
        CRITERIA.forEach(function (c) {
          var lv = cell.r && cell.r[c.key];
          if (!LEVELS[lv]) return;
          crit[c.key].sum += LEVELS[lv].pts; crit[c.key].n++;
          dsum += LEVELS[lv].pts; dn++;
        });
      }
      ratings += dn;
      perDay[d] = { att: a, hw: HW[cell.hw] ? cell.hw : null,
                    score: dn ? Math.round(dsum / dn) : null, ratings: dn };
    }
    var counted = att.P + att.R + att.F;
    var criteria = {}, psum = 0, pn = 0;
    CRITERIA.forEach(function (c) {
      var x = crit[c.key];
      criteria[c.key] = { n: x.n, pct: x.n ? Math.round(x.sum / x.n) : null };
      if (x.n) { psum += x.sum / x.n; pn++; }
    });
    return {
      days: n,
      att: { P: att.P, R: att.R, F: att.F, J: att.J, counted: counted,
             pct: counted ? Math.round(100 * (att.P + LATE_CREDIT * att.R) / counted) : null },
      hw: { n: hwN, pct: hwN ? Math.round(hwSum / hwN) : null },
      criteria: criteria,
      performance: pn ? Math.round(psum / pn) : null,
      ratings: ratings,
      perDay: perDay
    };
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

  /* rosterMap: mapa sid -> alumno de fetchRoster (TODOS los registrados que
     este profesor puede ver: son la base de la boleta aunque no tengan
     ningún intento). attempts: filas de VESPER_RESULTS.fetchAll (fecha DESC).
     grades: mapa por sid de fetchGrades (o null/{}). Devuelve una fila por
     alumno: { key, sid, name, alias, group, levelName, levelNum, studentUid,
     level, lastDate, quiz1..quiz3, finalExam, notes,
     examsAvg, examsCount, lessonsAvg, lessonsCount   (PRÁCTICA en la app),
     examsGrade, lessonsGrade, participacion          (modelo anterior) }.
     Los intentos viejos sin sid (solo los ve el admin) forman filas "legacy"
     identificadas por correo/uid, sin captura manual posible. */
  var GRADE_FIELDS = QUIZ_KEYS.concat(["finalExam", "examsGrade", "lessonsGrade", "participacion"]);

  function buildRoster(rosterMap, attempts, grades) {
    var by = {};
    function entry(key) {
      if (!by[key]) {
        by[key] = { key: key, sid: "", name: "", alias: "", group: "",
                    levelName: "", levelNum: null, studentUid: "", level: "",
                    examsBest: {}, examsCount: 0, lessonsBest: {}, lessonsCount: 0,
                    notes: "", lastDate: "" };
        GRADE_FIELDS.forEach(function (k) { by[key][k] = null; });
      }
      return by[key];
    }

    /* 1) base: todos los alumnos del roster (con o sin actividad) */
    Object.keys(rosterMap || {}).forEach(function (sid) {
      var st = rosterMap[sid];
      var e = entry(sid);
      e.sid = sid;
      e.name = st.name || "";
      e.group = st.group || "";
      e.levelName = st.levelName || "";
      e.levelNum = (st.level != null) ? st.level : null;
    });

    /* 2) intentos: se cuelgan de su sid; los viejos sin sid, en fila legacy */
    (attempts || []).forEach(function (r) {
      if (!r || r.examType === "placement") return; // diagnóstico: no califica
      var key = r.sid ||
                (r.email ? "legacy:" + String(r.email).trim().toLowerCase()
                         : (r.studentUid ? "legacy-uid:" + r.studentUid : ""));
      if (!key) return;
      var e = entry(key);
      if (r.sid) e.sid = r.sid;
      if (!e.alias && r.alias) e.alias = r.alias;           // DESC: el más reciente
      if (!e.studentUid && r.studentUid) e.studentUid = r.studentUid;
      if (!e.group && r.group) e.group = r.group;
      if (!e.level && r.level) e.level = r.level;
      if (!e.lastDate && r.date) e.lastDate = r.date;
      if (!e.name && r.email) e.name = String(r.email).trim().toLowerCase(); // legacy: solo admin
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

    /* 3) lo capturado por el profesor (por sid) */
    Object.keys(grades || {}).forEach(function (sid) {
      var g = grades[sid];
      var e = entry(sid);
      e.sid = sid;
      GRADE_FIELDS.forEach(function (k) { e[k] = (g[k] != null) ? g[k] : null; });
      e.notes = g.notes || "";
      if (!e.alias && g.alias) e.alias = g.alias;
      if (!e.studentUid && g.studentUid) e.studentUid = g.studentUid;
    });

    return Object.keys(by).map(function (k) {
      var e = by[k];
      var row = {
        key: e.key, sid: e.sid,
        name: e.name || e.alias || "Estudiante",
        alias: e.alias, group: e.group,
        levelName: e.levelName, levelNum: e.levelNum,
        studentUid: e.studentUid, level: e.level, lastDate: e.lastDate,
        // PRÁCTICA en la app (autocalificada por el alumno): referencia, no nota.
        examsAvg: bestAvg(e.examsBest), examsCount: e.examsCount,
        lessonsAvg: bestAvg(e.lessonsBest), lessonsCount: e.lessonsCount,
        notes: e.notes
      };
      GRADE_FIELDS.forEach(function (f) { row[f] = e[f]; });
      return row;
    });
  }

  /* Calificación de UN alumno (función pura). row = fila de buildRoster,
     stats = dailyStats(sus días). Devuelve:
       parts    [{ key, label, weight, value|null, legacy }]  un renglón por componente
       grade    promedio ponderado de los componentes CON dato (null si no hay ninguno)
       coverage % de la calificación ya evaluado (suma de pesos con dato)
       closed   ¿ya hay examen final? Solo entonces hay veredicto.
       passed   true/false si closed; null mientras el curso sigue
       status   "none" | "open" | "pass" | "fail"
       alerts   [texto]  (asistencia baja, avance bajo)
       atRisk   hay alertas y el curso sigue abierto
       label    Excelente / Muy bien / Bien / Insuficiente
     Los datos del modelo anterior solo entran si el componente nuevo no tiene
     nada capturado, y van marcados con legacy:true. */
  function computeGrade(row, stats) {
    row = row || {};
    stats = stats || dailyStats({});
    var quizVals = [];
    QUIZ_KEYS.forEach(function (k) { if (row[k] != null) quizVals.push(row[k]); });
    var quizAvg = null;
    if (quizVals.length) {
      quizAvg = Math.round(quizVals.reduce(function (x, y) { return x + y; }, 0) / quizVals.length);
    }
    function pick(v, old) {
      if (v != null) return { v: v, legacy: false };
      return { v: (old != null ? old : null), legacy: old != null };
    }
    var src = {
      attendance: pick(stats.att.pct, null),
      homework: pick(stats.hw.pct, row.lessonsGrade),
      performance: pick(stats.performance, row.participacion),
      quizzes: pick(quizAvg, row.examsGrade),
      final: pick(row.finalExam, null)
    };
    var sum = 0, wsum = 0;
    var parts = COMPONENTS.map(function (c) {
      var x = src[c.key];
      if (x.v != null) { sum += c.weight * x.v; wsum += c.weight; }
      return { key: c.key, label: c.label, weight: c.weight, value: x.v, legacy: x.legacy };
    });
    var grade = wsum ? Math.round(sum / wsum) : null;
    var closed = row.finalExam != null;
    var passed = (closed && grade != null) ? grade >= PASS_THRESHOLD : null;
    var alerts = [];
    /* una sola falta no dispara la alerta (en la semana 1 sería puro ruido):
       hacen falta al menos 2 faltas, contando cada retardo por lo que descuenta */
    var misses = stats.att.F + (1 - LATE_CREDIT) * stats.att.R;
    if (stats.att.pct != null && misses >= 2 && stats.att.pct < MIN_ATTENDANCE) {
      alerts.push("Asistencia de " + stats.att.pct + "% (mínimo " + MIN_ATTENDANCE + "%)");
    }
    if (!closed && grade != null && grade < PASS_THRESHOLD) {
      alerts.push("Avance de " + grade + ", por debajo de " + PASS_THRESHOLD);
    }
    return {
      parts: parts, grade: grade, coverage: Math.round(100 * wsum),
      closed: closed, passed: passed,
      status: grade == null ? "none" : (!closed ? "open" : (passed ? "pass" : "fail")),
      alerts: alerts, atRisk: !closed && alerts.length > 0,
      label: grade == null ? "" : (grade >= 90 ? "Excelente" : grade >= 80 ? "Muy bien" :
                                   grade >= PASS_THRESHOLD ? "Bien" : "Insuficiente")
    };
  }

  /* ---- piezas de vista compartidas por portal_boleta.html y mi_boleta.html ---- */

  /* marca + tono + texto de una celda. tono: good | fine | warn | bad | neutral | none */
  var NONE = { mark: "·", tone: "none", label: "Sin marcar" };
  function attMark(a) {
    var x = ATT[a];
    if (!x) return NONE;
    return { mark: x.mark, label: x.label,
             tone: a === "P" ? "good" : a === "R" ? "warn" : a === "F" ? "bad" : "neutral" };
  }
  function hwMark(h) {
    var x = HW[h];
    if (!x) return { mark: "·", tone: "none", label: "Sin tarea" };
    return { mark: x.mark, label: x.label, tone: h === 2 ? "good" : h === 1 ? "warn" : "bad" };
  }
  function levelMark(lv) {
    var x = LEVELS[lv];
    if (!x) return { mark: "·", tone: "none", label: "Sin calificar" };
    return { mark: String(lv), label: x.label,
             tone: lv === 4 ? "good" : lv === 3 ? "fine" : lv === 2 ? "warn" : "bad" };
  }

  var CSS =
    ".vgb-good{background:#dff0e6;color:#1f6a42;border-color:#c4e2d0}" +
    ".vgb-fine{background:#edf4dc;color:#55691a;border-color:#dbe6bf}" +
    ".vgb-warn{background:#fbefd0;color:#8a6412;border-color:#edd9a3}" +
    ".vgb-bad{background:#f7e3e3;color:#a23030;border-color:#e6c3c3}" +
    ".vgb-neutral{background:#e8ecf3;color:#48566b;border-color:#d3dae6}" +
    ".vgb-none{background:transparent;color:#b9b2a3}" +
    "html.vesper-dark .vgb-good{background:rgba(65,197,149,.2);color:#7fe0b9;border-color:transparent}" +
    "html.vesper-dark .vgb-fine{background:rgba(170,200,90,.18);color:#c9dd88;border-color:transparent}" +
    "html.vesper-dark .vgb-warn{background:rgba(226,170,70,.2);color:#f0c670;border-color:transparent}" +
    "html.vesper-dark .vgb-bad{background:rgba(224,112,101,.2);color:#f3a399;border-color:transparent}" +
    "html.vesper-dark .vgb-neutral{background:rgba(140,160,200,.2);color:#b9c7df;border-color:transparent}" +
    "html.vesper-dark .vgb-none{color:rgba(255,255,255,.3)}" +
    ".vgb-gridwrap{overflow-x:auto}" +
    "table.vgb-grid{width:auto;border-collapse:separate;border-spacing:3px;font-size:.74rem}" +
    "table.vgb-grid th{background:transparent;border:0;padding:2px 0;text-align:center;color:var(--muted,#6b7a8d);" +
      "font-size:.64rem;font-weight:600;min-width:26px;letter-spacing:0;text-transform:none}" +
    "table.vgb-grid th.vgb-row{text-align:left;padding-right:12px;font-size:.76rem;color:inherit;" +
      "min-width:108px;white-space:nowrap}" +
    "table.vgb-grid tr.vgb-sep th,table.vgb-grid tr.vgb-sep td{padding-top:7px}" +
    "table.vgb-grid th.vgb-today{color:var(--gold2,#a8843d);font-weight:800}" +
    "table.vgb-grid th[data-vgb-day]{cursor:pointer;border-radius:5px}" +
    "table.vgb-grid th[data-vgb-day]:hover{background:rgba(201,168,76,.2)}" +
    "table.vgb-grid td{width:26px;height:26px;min-width:26px;padding:0;text-align:center;border:1px solid var(--border,#e4e0d8);" +
      "border-radius:6px;font-weight:700;font-variant-numeric:tabular-nums}" +
    "table.vgb-grid td.vgb-none{font-weight:400}" +
    "table.vgb-grid td.vgb-dim{opacity:.35}";

  function injectCss() {
    if (document.getElementById("vgb-css")) return;
    var st = document.createElement("style");
    st.id = "vgb-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* rejilla de solo lectura de UN alumno: filas Asistencia, Tarea y un renglón
     por criterio; columnas = las COURSE_DAYS clases (con su fecha en el title).
     opts.dayLinks: los números de clase llevan data-vgb-day (la página decide
     qué hacer al tocarlos). */
  function dailyGridHtml(days, opts) {
    days = days || {}; opts = opts || {};
    var dates = classDates(), today = courseClock().today, d;
    function esc(t) { return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function td(m, title, dim) {
      return '<td class="vgb-' + m.tone + (dim ? " vgb-dim" : "") + '" title="' + esc(title + ": " + m.label) + '">' + m.mark + '</td>';
    }
    var head = '<tr><th class="vgb-row"></th>';
    for (d = 1; d <= COURSE_DAYS; d++) {
      head += '<th' + (dates[d - 1] === today ? ' class="vgb-today"' : '') +
              (opts.dayLinks ? ' data-vgb-day="' + d + '" tabindex="0" role="button"' : '') +
              ' title="Clase ' + d + " · " + fmtDay(dates[d - 1]) + '">' + d + '</th>';
    }
    head += '</tr>';
    function row(label, fn, sep) {
      var cells = '';
      for (var i = 1; i <= COURSE_DAYS; i++) {
        var c = days[i], t = "Clase " + i + " · " + fmtDay(dates[i - 1]);
        cells += c ? fn(c, t) : '<td class="vgb-none" title="' + esc(t + ": sin registro") + '">·</td>';
      }
      return '<tr' + (sep ? ' class="vgb-sep"' : '') + '><th class="vgb-row">' + esc(label) + '</th>' + cells + '</tr>';
    }
    var body = row("Asistencia", function (c, t) { return td(attMark(c.att), t); }) +
               row("Tarea", function (c, t) { return td(hwMark(c.hw), t); });
    CRITERIA.forEach(function (cr, idx) {
      body += row(cr.label, function (c, t) {
        var absent = (c.att === "F" || c.att === "J");
        return td(levelMark(c.r && c.r[cr.key]), t, absent);
      }, idx === 0);
    });
    return '<div class="vgb-gridwrap"><table class="vgb-grid"><thead>' + head + '</thead><tbody>' +
           body + '</tbody></table></div>';
  }

  start();
  return {
    COURSE_START: COURSE_START, COURSE_DAYS: COURSE_DAYS, COMPONENTS: COMPONENTS,
    PASS_THRESHOLD: PASS_THRESHOLD, MIN_ATTENDANCE: MIN_ATTENDANCE, QUIZ_KEYS: QUIZ_KEYS,
    ATT: ATT, ATT_ORDER: ATT_ORDER, HW: HW, LEVELS: LEVELS, CRITERIA: CRITERIA,
    classDates: classDates, courseClock: courseClock, fmtDay: fmtDay,
    available: available, signedIn: signedIn, isAdminUser: isAdminUser,
    fetchRoster: fetchRoster,
    fetchGrades: fetchGrades, fetchMyGrade: fetchMyGrade, saveGrade: saveGrade,
    fetchDailyAll: fetchDailyAll, fetchMyDaily: fetchMyDaily,
    saveDaily: saveDaily, dailyStats: dailyStats,
    buildRoster: buildRoster, computeGrade: computeGrade,
    injectCss: injectCss, attMark: attMark, hwMark: hwMark, levelMark: levelMark,
    dailyGridHtml: dailyGridHtml
  };
})();
