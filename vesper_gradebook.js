/* ============================================================
 * vesper_gradebook.js — Boleta de calificaciones por alumno.
 *
 * MODELO (2026-11-20, «10 puntos», aprobado por Josue; demo de referencia:
 * _propuestas/arena-2026-11-20-calificaciones/opcion-a4). Todo lo captura el
 * PROFESOR; la práctica en la app es solo referencia y NO cuenta.
 *
 *   Cada clase empieza en 100. El profe marca ✗ (tache) en los POINTS donde
 *   el alumno falló; cada ✗ resta TACHE_DEFAULT (−5) o −10 al TOTAL del día
 *   (el profe elige con un interruptor que se recuerda en localStorage).
 *   «Asistió» ✗ = FALTA: esa clase vale 0 en el promedio.
 *
 *   Clase          60 %  promedio de la nota de los días REVISADOS (FALTA = 0)
 *   Examen final   40 %  0–100, gradebook/{sid}.finalExam (lo pone el profe)
 *   Sin examen final: la calificación es un AVANCE con Clase al 100 %.
 *   Aprueba con PASS_THRESHOLD (70); solo hay veredicto con examen final.
 *   Alertas (no reprueban solas): 2+ faltas y asistencia < MIN_ATTENDANCE, o
 *   avance < 70 mientras no hay final.
 *   Ya NO hay parciales ni rúbrica de 7 criterios.
 *
 * POR MES (2026-11-21, Josue): la calificación es POR CICLO de COURSE_DAYS
 * clases (L–V; festivos y vacaciones lo pausan), y cada ciclo es «un mes»:
 * el puente (23 nov – 18 dic 2026) y los 12 de 2027 (cycles()). Cada mes
 * tiene su Clase, su examen final, su comentario y su calificación; juntos
 * son el HISTORIAL ACADÉMICO del alumno (history()). Las páginas eligen un
 * mes con setCycle(id); classDates/courseClock/days/finalExam/saves hablan
 * de ese mes. Por defecto, el de hoy (currentCycleId).
 *
 * Datos (Firestore REST, base "teachermanuals", token de VesperAuth). <clave>
 * = cycleKey(id), p. ej. "k2027_c01" (sin guion para no citar la ruta):
 *   daily_progress/{sid}  cycles.<clave> = { days: { "1": { t: 0..100,
 *                         x: {punto: n taches}, dp: {punto: puntos restados},
 *                         att: "F" (solo si faltó), rv: 1 } }, group, levelName }
 *                         (+ alias, studentUid, updatedAt, updatedBy).
 *                         saveDaily reemplaza el mapa de UN mes completo.
 *   gradebook/{sid}       cycles.<clave> = { finalExam (int 0..100), notes
 *                         (comentario que ve el alumno, máx. 500), group,
 *                         levelName } + alias, studentUid, updatedAt/By.
 *   group/levelName de cada mes son la foto de ese mes para el historial.
 *   Antes de los meses: `days`, `finalExam` y `notes` del nivel superior. Se
 *   leen como el ciclo puente y se borran la primera vez que se guarda el
 *   puente (ya en su entrada cycles.k2026_puente).
 *   MATRÍCULA: roster/{sid}.matricula y students/{correo}.matricula (formato
 *   VA<aa>-<nnnn>); la asigna portal_escuela.html; el alumno la ve vía
 *   vesper_profile (myMatricula()).
 * Reglas: daily_progress no valida campos; gradebook solo valida participacion/
 * examsGrade/lessonsGrade SI vienen en el nivel superior (cycles pasa). No hay
 * que republicar reglas para este modelo (revisado 2026-11-21 en firestore.rules).
 *
 * DATOS VIEJOS (el curso empieza el 23 nov 2026: casi no hay). Se leen sin
 * romper y se convierten al leer (readDay); la próxima vez que el profe guarde
 * a ese alumno se reescriben en el formato nuevo:
 *   - Día del formato anterior {att: P|R|F|J, hw: 0|1|2, r: {criterio: 1..4}}:
 *       F → FALTA · R → 1 ✗ Puntualidad · J → se IGNORA (la justificada no
 *       contaba ni a favor ni en contra; al reescribir desaparece) ·
 *       hw 1 → 1 ✗ Tarea, hw 0 → 2 ✗ Tarea ·
 *       r: participacion→Participación, speaking→Fluidez, listening→Comprensión
 *       auditiva, gramatica→Gramática, vocabulario→Vocabulario (nivel 4 = 0 ✗,
 *       3 = 1, 2 = 2, 1 = 3); reading y writing no tienen punto: se ignoran.
 *   - Día del formato más viejo {_activo, aspecto:false}: cada aspecto en false
 *     es 1 ✗ en su punto (asistencia false = FALTA); reading/writing se ignoran.
 *   Cada ✗ convertido vale −5 y t = 100 − lo restado (mínimo 0). Cuentan como
 *   revisados.
 *   - gradebook: quiz1..quiz3, examsGrade, lessonsGrade y participacion se
 *     siguen LEYENDO (readDoc los trae en la fila como `legacy`), pero NO
 *     cuentan en la calificación nueva. saveGrade ya no los escribe.
 *
 * Privacidad y grupos: el roster se lee de `roster/{sid}` (espejo SIN CORREO
 * de la allowlist). Cada profesor solo lee alumnos de SUS grupos; el admin
 * ve todo.
 *
 * Degrada en silencio: sin Firebase, sin sesión o sin la regla publicada
 * (403), los fetch* resuelven null y los save* false.
 *
 * window.VESPER_GRADEBOOK:
 *   Configuración: COURSE_DAYS, PUENTE_ID, DAY_MAX, POINTS, ABSENT_KEY,
 *                  TACHE_OPTIONS, TACHE_DEFAULT, WEIGHTS, COMPONENTS,
 *                  PASS_THRESHOLD, MIN_ATTENDANCE
 *   Puntos:        points() (con nombres editados en este navegador),
 *                  savePointLabels(list), resetPointLabels(),
 *                  tacheValue(), setTacheValue(v)
 *   Meses:         cycles(), cycleById(id), currentCycleId(), cycleId(), cycle(),
 *                  setCycle(id), daysFor(dailyRec, id)
 *   Calendario:    classDates(), courseClock(), fmtDay(iso)   (del mes elegido)
 *   Red:           fetchRoster(), fetchMyGroupIds(), fetchGrades(sids), fetchMyGrade(),
 *                  saveGrade(sid, data, cid?), fetchDailyAll(sids), fetchMyDaily(),
 *                  saveDaily(sid, data, cid?)
 *   Día:           newDay(), isAbsent(c), dayScore(c), addTache(c, key, v),
 *                  removeTache(c, key, back)
 *   Puras:         buildRoster(rosterMap, attempts, grades), dailyStats(days),
 *                  computeGrade(row, stats), history(grade, daily, opts),
 *                  myMatricula()
 *   Vista:         injectCss(), tone(v), historyHtml(days, opts)
 * ============================================================ */
window.VESPER_GRADEBOOK = (function () {
  var DB_ID = "teachermanuals";
  var COLLECTION = "gradebook";
  var DAILY_COLLECTION = "daily_progress";

  /* ================= CONFIGURACIÓN (todo lo ajustable vive aquí) ================= */

  /* CICLOS = MESES (2026-11-21, Josue: «las calificaciones van por mes»).
     Cada ciclo son COURSE_DAYS clases L–V; festivos y vacaciones lo pausan.
     Misma regla y mismas fechas que portal_calendario.html (fuente canónica)
     y calendarCycles() de portal_escuela.html: si cambias una, cambia las tres.
     El ciclo puente (23 nov – 18 dic 2026) es el primero; luego 12 de 2027. */
  var COURSE_DAYS = 20;
  var PUENTE_ID = "2026-puente", PUENTE_START = "2026-11-23";
  var FIRST_2027 = "2027-01-04", CYCLES_2027 = 12;
  var BREAKS = [["2026-12-21", "2027-01-01"], ["2027-03-22", "2027-03-26"], ["2027-12-20", "2027-12-31"]];
  var NO_CLASS = ["2027-01-01", "2027-02-01", "2027-03-15", "2027-03-25", "2027-03-26", "2027-05-01",
                  "2027-09-16", "2027-11-02", "2027-11-15", "2027-12-25"];

  var DAY_MAX = 100;              // cada clase empieza aquí
  var TACHE_OPTIONS = [5, 10];    // lo que puede valer un ✗ (resta al total del día)
  var TACHE_DEFAULT = 5;
  /* Los 10 puntos. Las 'key' son campos en Firestore: no las cambies. El
     nombre y la pista se pueden editar en portal_boleta.html («Editar los 10
     puntos», solo en ese navegador). El primero siempre es la asistencia. */
  var POINTS = [
    { key: "asistio",       label: "Asistió",              hint: "✗ = faltó: la clase vale 0 (FALTA)" },
    { key: "puntualidad",   label: "Puntualidad",          hint: "Llegó a tiempo" },
    { key: "tarea",         label: "Tarea",                hint: "Entregó la tarea completa" },
    { key: "participacion", label: "Participación",        hint: "Participó y usó el inglés" },
    { key: "vocabulario",   label: "Vocabulario",          hint: "Usó las palabras de la clase" },
    { key: "gramatica",     label: "Gramática",            hint: "Usó bien las reglas del nivel" },
    { key: "fluidez",       label: "Fluidez",              hint: "Habló sin trabarse" },
    { key: "estructuras",   label: "Estructuras",          hint: "Armó bien las oraciones" },
    { key: "pronunciacion", label: "Pronunciación",        hint: "Se le entiende al hablar" },
    { key: "auditiva",      label: "Comprensión auditiva", hint: "Entendió lo que escuchó" }
  ];
  var ABSENT_KEY = "asistio";
  /* Calificación del curso. Los pesos suman 1. */
  var WEIGHTS = { clase: 0.60, final: 0.40 };
  var COMPONENTS = [
    { key: "clase", label: "Clase",        weight: WEIGHTS.clase },
    { key: "final", label: "Examen final", weight: WEIGHTS.final }
  ];
  var PASS_THRESHOLD = 70;   // mínimo para aprobar (y línea de "en riesgo")
  var MIN_ATTENDANCE = 80;   // % de asistencia por debajo del cual se alerta

  var TACHE_KEY = "vesper_boleta_tache";      // localStorage: valor del ✗ elegido
  var LABELS_KEY = "vesper_boleta_puntos";    // localStorage: nombres editados

  var POINT_KEYS = POINTS.map(function (p) { return p.key; });
  var DEFAULT_LABELS = POINTS.map(function (p) { return { label: p.label, hint: p.hint }; });

  /* ---- nombres de los puntos (editables en este navegador) ---- */
  function points() {
    var out = POINTS.map(function (p, i) { return { key: p.key, label: DEFAULT_LABELS[i].label, hint: DEFAULT_LABELS[i].hint }; });
    try {
      var l = JSON.parse(localStorage.getItem(LABELS_KEY) || "null");
      if (l && l.length === out.length) l.forEach(function (x, i) {
        if (x && x.label) out[i].label = String(x.label).slice(0, 40);
        if (x && x.hint != null) out[i].hint = String(x.hint).slice(0, 80);
      });
    } catch (e) {}
    return out;
  }
  function savePointLabels(list) {
    try {
      localStorage.setItem(LABELS_KEY, JSON.stringify((list || []).map(function (p, i) {
        return { label: String((p && p.label) || DEFAULT_LABELS[i].label).slice(0, 40),
                 hint: String((p && p.hint) || "").slice(0, 80) };
      })));
      return true;
    } catch (e) { return false; }
  }
  function resetPointLabels() { try { localStorage.removeItem(LABELS_KEY); } catch (e) {} }
  function tacheValue() {
    try { var v = +localStorage.getItem(TACHE_KEY); if (TACHE_OPTIONS.indexOf(v) >= 0) return v; } catch (e) {}
    return TACHE_DEFAULT;
  }
  function setTacheValue(v) {
    v = +v;
    if (TACHE_OPTIONS.indexOf(v) < 0) return TACHE_DEFAULT;
    try { localStorage.setItem(TACHE_KEY, String(v)); } catch (e) {}
    return v;
  }

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

  var MON_L = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
               "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function isClassIso(s) {
    var w = parseIso(s).getDay();
    if (w === 0 || w === 6 || NO_CLASS.indexOf(s) !== -1) return false;
    for (var i = 0; i < BREAKS.length; i++) if (s >= BREAKS[i][0] && s <= BREAKS[i][1]) return false;
    return true;
  }
  /* COURSE_DAYS fechas de clase a partir de `start` (o del siguiente día de clase) */
  function datesFrom(start) {
    var out = [], d = parseIso(start), guard = 0;
    while (out.length < COURSE_DAYS && guard++ < 400) {
      if (isClassIso(isoOf(d))) out.push(isoOf(d));
      d = addDays(d, 1);
    }
    return out;
  }
  /* «Enero 2027»; si el ciclo cruza meses y el segundo tiene 5+ clases, «Febrero–marzo 2027» */
  function monthLabel(dates) {
    var cnt = {}, order = [];
    dates.forEach(function (s) { var k = s.slice(0, 7); if (!cnt[k]) { cnt[k] = 0; order.push(k); } cnt[k]++; });
    var top = order.slice().sort(function (a, b) { return cnt[b] - cnt[a]; });
    function nm(k) { return MON_L[+k.slice(5, 7) - 1]; }
    if (top.length > 1 && cnt[top[1]] >= 5) {
      var a = order[0], b = order[1];
      return nm(a) + "–" + nm(b).toLowerCase() + " " + b.slice(0, 4);
    }
    return nm(top[0]) + " " + top[0].slice(0, 4);
  }
  /* clave del ciclo en Firestore: un identificador simple (sin guion ni dígito
     inicial) para que la ruta cycles.<clave> no necesite comillas en updateMask */
  function cycleKey(id) { return "k" + String(id).replace(/[^A-Za-z0-9]/g, "_"); }

  var cyclesCache = null;
  /* [{ id, key, n, name, month, label, dates, start, end }] en orden */
  function cycles() {
    if (cyclesCache) return cyclesCache;
    var out = [];
    function push(id, n, name, dates) {
      out.push({ id: id, key: cycleKey(id), n: n, name: name, month: monthLabel(dates),
                 label: monthLabel(dates) + " · " + name, dates: dates,
                 start: dates[0], end: dates[dates.length - 1] });
    }
    push(PUENTE_ID, 0, "Ciclo puente", datesFrom(PUENTE_START));
    var cur = FIRST_2027;
    for (var n = 1; n <= CYCLES_2027; n++) {
      var ds = datesFrom(cur);
      push("2027-c" + pad2(n), n, "Ciclo " + n, ds);
      cur = isoOf(addDays(parseIso(ds[ds.length - 1]), 1));
    }
    cyclesCache = out;
    return out;
  }
  function cycleById(id) {
    var list = cycles();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function cycleByKey(key) {
    var list = cycles();
    for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i];
    return null;
  }
  /* el ciclo de HOY: el último que ya empezó (entre ciclos sigue el que acaba
     de terminar, para cerrar su examen final); antes del primero, el primero. */
  function currentCycleId(now) {
    var t = isoOf(now || new Date()), list = cycles(), id = list[0].id;
    for (var i = 0; i < list.length; i++) if (list[i].start <= t) id = list[i].id;
    return id;
  }
  /* ciclo SELECCIONADO: todo lo de «un ciclo» (classDates, courseClock, days,
     finalExam, saves) habla de este. Las páginas lo cambian con setCycle(). */
  var CUR = currentCycleId();
  function cycleId() { return CUR; }
  function cycle() { return cycleById(CUR); }
  function setCycle(id) { if (cycleById(id)) CUR = id; return CUR; }

  function classDates() { return cycle().dates; }

  /* dónde va el ciclo seleccionado HOY. day = última clase cuya fecha ya llegó
     (0 = aún no inicia); isClassDay = hoy toca clase. `now` solo para pruebas. */
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

  /* ¿staff (admin o coordinador)? Lo decide firestore.rules (isStaff); esto
     solo sirve para mostrar u ocultar botones. roles/{correo} lo puede leer
     su dueño. */
  var staffCache = null;
  function isStaffUser() {
    if (!signedIn()) return Promise.resolve(false);
    if (isAdminUser()) return Promise.resolve(true);
    if (staffCache) return staffCache;
    var email = String(currentUser.email || "").trim().toLowerCase();
    staffCache = currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/roles/" + encodeURIComponent(email), {
        headers: { "Authorization": "Bearer " + token }
      }).then(function (r) {
        if (r.status !== 200) return false;
        return r.json().then(function (doc) {
          var role = doc.fields && doc.fields.role && doc.fields.role.stringValue;
          return role === "admin" || role === "coordinator";
        });
      });
    }).catch(function () { return false; });
    return staffCache;
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

  /* pública: ids de los grupos asignados al profesor ([] si no tiene o falla;
     el admin no tiene lista propia: sus grupos salen del roster). */
  var myGroupsCache = null;
  function fetchMyGroupIds() {
    if (!signedIn()) return Promise.resolve([]);
    if (myGroupsCache) return myGroupsCache;
    myGroupsCache = currentUser.getIdToken().then(fetchMyGroups).catch(function () { return []; });
    return myGroupsCache;
  }

  /* ---- roster: la lista de alumnos que este profesor puede ver ---- */
  function readRosterDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    var name = (doc && doc.name) || "";
    var lvl = (f.level && f.level.integerValue != null) ? parseInt(f.level.integerValue, 10) : null;
    return {
      sid: name.slice(name.lastIndexOf("/") + 1),
      name: s("name"), levelName: s("levelName"), group: s("group"),
      matricula: s("matricula"),
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
      return fetchMyGroupIds().then(function (groups) {
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

  /* campos de gradebook del modelo anterior: se leen, NO cuentan. */
  var LEGACY_GRADE_FIELDS = ["quiz1", "quiz2", "quiz3", "examsGrade", "lessonsGrade", "participacion"];

  function mapFields(v) { return (v && v.mapValue && v.mapValue.fields) || {}; }
  function intIn(f, k) { return (f[k] && f[k].integerValue != null) ? clampPct(f[k].integerValue) : null; }
  function strIn(f, k) { return (f[k] && f[k].stringValue) || ""; }

  /* lee un doc REST de gradebook -> fila plana. El id del doc es el sid.
     Por ciclo:  cycles.<clave> = { finalExam, notes, group, levelName }.
     finalExam y notes del nivel superior son del formato de antes de los
     ciclos: cuentan como el ciclo puente mientras ese ciclo no tenga entrada
     (saveGrade del puente los borra al pasarlos a su ciclo).
     La fila trae `cycles` (todos) y finalExam/notes del ciclo seleccionado. */
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return strIn(f, k); }
    function iOrNull(k) { return intIn(f, k); }
    var name = (doc && doc.name) || "";
    var legacy = null;
    LEGACY_GRADE_FIELDS.forEach(function (k) {
      var v = iOrNull(k);
      if (v != null) { legacy = legacy || {}; legacy[k] = v; }
    });
    var cyc = {}, cm = mapFields(f.cycles);
    Object.keys(cm).forEach(function (k) {
      var c = cycleByKey(k); if (!c) return;
      var cf = mapFields(cm[k]);
      cyc[c.id] = { finalExam: intIn(cf, "finalExam"), notes: strIn(cf, "notes"),
                    group: strIn(cf, "group"), levelName: strIn(cf, "levelName") };
    });
    if (!cyc[PUENTE_ID] && (iOrNull("finalExam") != null || s("notes"))) {
      cyc[PUENTE_ID] = { finalExam: iOrNull("finalExam"), notes: s("notes"), group: "", levelName: "" };
    }
    var sel = cyc[CUR] || {};
    return {
      sid: name.slice(name.lastIndexOf("/") + 1),
      cycles: cyc,
      finalExam: sel.finalExam != null ? sel.finalExam : null,
      legacy: legacy,
      notes: sel.notes || "",
      alias: s("alias"),
      studentUid: s("studentUid"),
      updatedAt: (f.updatedAt && f.updatedAt.timestampValue) || "",
      updatedBy: s("updatedBy")
    };
  }

  /* batchGet de una colección por lista de sids -> mapa sid -> doc REST.
     (La regla del profesor depende del grupo de CADA doc, por eso no se lista
     la colección.) Los docs aún no creados llegan como "missing". null si
     falla la petición completa. */
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

  function fetchGrades(sids) {
    return batchGetBySid(COLLECTION, sids).then(function (docs) {
      if (docs === null) return null;
      var map = {};
      Object.keys(docs).forEach(function (id) { map[id] = readDoc(docs[id]); });
      return map;
    });
  }

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

  /* upsert de un alumno en gradebook, en el ciclo `cid` (por defecto el
     seleccionado). PATCH con updateMask crea el doc si no existe y SOLO toca
     los campos listados. `data` lleva lo que se guarda de ESE ciclo:
       finalExam: número 0..100, o null para BORRAR la nota (va en el mask
         pero no en el cuerpo: Firestore elimina el campo);
       notes: comentario para el alumno (máx. 500);
       group / levelName: foto del grupo y nivel en ese ciclo (historial);
       alias / studentUid: se copian si vienen.
     En el ciclo puente manda SIEMPRE finalExam y notes juntos: se borran los
     del nivel superior (formato de antes) para que no reaparezcan. */
  function saveGrade(sid, data, cid) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    data = data || {};
    var c = cycleById(cid || CUR); if (!c) return Promise.resolve(false);
    var fields = {
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    var mask = ["updatedAt", "updatedBy"], cf = {}, pre = "cycles." + c.key + ".";
    if (data.notes != null) { cf.notes = { stringValue: String(data.notes).slice(0, 500) }; mask.push(pre + "notes"); }
    if (data.group != null) { cf.group = { stringValue: String(data.group).slice(0, 40) }; mask.push(pre + "group"); }
    if (data.levelName != null) { cf.levelName = { stringValue: String(data.levelName).slice(0, 60) }; mask.push(pre + "levelName"); }
    if (data.alias) { fields.alias = { stringValue: String(data.alias).slice(0, 24) }; mask.push("alias"); }
    if (data.studentUid) { fields.studentUid = { stringValue: String(data.studentUid) }; mask.push("studentUid"); }
    if ("finalExam" in data) {
      mask.push(pre + "finalExam");
      var v = clampPct(data.finalExam);
      if (v != null) cf.finalExam = { integerValue: String(v) };
    }
    if (c.id === PUENTE_ID && ("finalExam" in data) && data.notes != null) mask.push("finalExam", "notes");
    if (Object.keys(cf).length) {
      var ck = {}; ck[c.key] = { mapValue: { fields: cf } };
      fields.cycles = { mapValue: { fields: ck } };
    }
    var qs = mask.map(function (k) { return "updateMask.fieldPaths=" + k; }).join("&");
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/" + COLLECTION + "/" + sid + "?" + qs, {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* Borra el registro completo de un alumno: daily_progress, gradebook y
     roster, en UN commit atómico (o se borran los tres o ninguno). Solo
     staff (firestore.rules). Conserva students/ (acceso) y exam_results.
     Borrar un doc que no existe no es error. Devuelve true si se borró. */
  function deleteStudent(sid) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    var prefix = "projects/" + projectId() + "/databases/" + DB_ID + "/documents/";
    var writes = [DAILY_COLLECTION, COLLECTION, "roster"].map(function (c) { return { "delete": prefix + c + "/" + sid }; });
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + ":commit", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ writes: writes })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* ================= EL DÍA (forma en memoria) =================
     { t: 0..100, x: {punto: n}, dp: {punto: pts}, att: "F" (si faltó), rv: 1 }
     Sin registro = no revisado. */
  function newDay() { return { t: DAY_MAX, x: {}, dp: {} }; }
  function isAbsent(c) { return !!(c && (c.att === "F" || (c.x && c.x[ABSENT_KEY]))); }
  /* nota del día para mostrar: FALTA = null; sin registro = 100 */
  function dayScore(c) {
    if (isAbsent(c)) return null;
    return (c && c.t != null) ? c.t : DAY_MAX;
  }
  /* un ✗ en `key` que vale `v`. Devuelve lo que restó de verdad (0 si nada). */
  function addTache(c, key, v) {
    c.x = c.x || {}; c.dp = c.dp || {};
    if (key === ABSENT_KEY) {
      if (isAbsent(c)) return 0;
      c.x[key] = 1; c.att = "F";
      return 0;
    }
    if (isAbsent(c)) return 0;
    var t = c.t != null ? c.t : DAY_MAX;
    if (t <= 0) return 0;
    var dv = Math.min(+v || TACHE_DEFAULT, t);
    c.t = t - dv; c.x[key] = (c.x[key] || 0) + 1; c.dp[key] = (c.dp[key] || 0) + dv;
    return dv;
  }
  /* quita un ✗ de `key`, devolviendo `back` puntos (o el promedio de lo que
     restó ese punto si no se sabe). false si no había. */
  function removeTache(c, key, back) {
    if (!c || !c.x || !c.x[key]) return false;
    c.dp = c.dp || {};
    if (key === ABSENT_KEY) { delete c.x[key]; delete c.att; return true; }
    if (isAbsent(c)) return false;
    if (back == null) back = Math.round((c.dp[key] || 0) / c.x[key]);
    c.t = Math.min(DAY_MAX, (c.t != null ? c.t : DAY_MAX) + back);
    c.x[key]--; c.dp[key] = Math.max(0, (c.dp[key] || 0) - back);
    if (!c.x[key]) { delete c.x[key]; delete c.dp[key]; }
    return true;
  }

  /* ---- lectura de daily_progress (con conversión de formatos viejos) ---- */
  function intOf(v) { return (v && v.integerValue != null) ? parseInt(v.integerValue, 10) : null; }
  function cellFrom(taches, absent) {
    var c = { t: DAY_MAX, x: {}, dp: {}, rv: 1 };
    if (absent) { c.x[ABSENT_KEY] = 1; c.att = "F"; }
    Object.keys(taches).forEach(function (k) {
      var n = taches[k];
      if (!n || k === ABSENT_KEY) return;
      c.x[k] = n; c.dp[k] = n * TACHE_DEFAULT;
      c.t -= n * TACHE_DEFAULT;
    });
    c.t = Math.max(0, c.t);
    return c;
  }
  /* rúbrica de 7 criterios -> punto nuevo (reading/writing no tienen) */
  var RUBRIC_TO_POINT = { participacion: "participacion", speaking: "fluidez", listening: "auditiva",
                          gramatica: "gramatica", vocabulario: "vocabulario" };
  /* 16 aspectos ✓/✗ -> punto nuevo */
  var ASPECT_TO_POINT = {
    puntualidad: "puntualidad", tarea: "tarea",
    participacion: "participacion", actitud: "participacion", trabajo_clase: "participacion",
    uso_ingles: "participacion", material: "participacion",
    speaking: "fluidez", fluidez: "fluidez", pronunciacion: "pronunciacion",
    listening: "auditiva", gramatica: "gramatica", vocabulario: "vocabulario"
  };
  function readDay(af) {
    var att = af.att && af.att.stringValue;
    var isNew = af.rv || af.t || af.x || af.dp;
    if (isNew) {
      var c = { x: {}, dp: {}, rv: 1 };
      var t = intOf(af.t);
      var xm = (af.x && af.x.mapValue && af.x.mapValue.fields) || {};
      var dm = (af.dp && af.dp.mapValue && af.dp.mapValue.fields) || {};
      var lost = 0;
      Object.keys(xm).forEach(function (k) {
        if (POINT_KEYS.indexOf(k) < 0) return;
        var n = intOf(xm[k]);
        if (!(n > 0)) return;
        c.x[k] = n;
        if (k !== ABSENT_KEY) {
          var p = intOf(dm[k]);
          c.dp[k] = (p != null && p >= 0) ? p : n * TACHE_DEFAULT;
          lost += c.dp[k];
        }
      });
      c.t = (t != null && !isNaN(t)) ? Math.max(0, Math.min(DAY_MAX, t)) : Math.max(0, DAY_MAX - lost);
      if (att === "F" || c.x[ABSENT_KEY]) { c.att = "F"; c.x[ABSENT_KEY] = 1; }
      return c;
    }
    if (att) {   // formato anterior: att/hw/r
      if (att === "J") return null;
      var tx = {};
      if (att === "R") tx.puntualidad = 1;
      var hw = intOf(af.hw);
      if (hw === 1) tx.tarea = 1; else if (hw === 0) tx.tarea = 2;
      var rf = (af.r && af.r.mapValue && af.r.mapValue.fields) || {};
      Object.keys(RUBRIC_TO_POINT).forEach(function (k) {
        var lv = intOf(rf[k]);
        if (lv >= 1 && lv <= 4 && lv < 4) {
          var p = RUBRIC_TO_POINT[k];
          tx[p] = (tx[p] || 0) + (4 - lv);
        }
      });
      return cellFrom(tx, att === "F");
    }
    /* formato más viejo: {_activo, aspecto:false} */
    var ty = {}, absent = !!(af.asistencia && af.asistencia.booleanValue === false);
    Object.keys(ASPECT_TO_POINT).forEach(function (k) {
      if (af[k] && af[k].booleanValue === false) {
        var p = ASPECT_TO_POINT[k];
        ty[p] = (ty[p] || 0) + 1;
      }
    });
    return cellFrom(ty, absent);
  }

  function readDaysMap(dm) {
    var days = {};
    Object.keys(dm || {}).forEach(function (d) {
      var day = parseInt(d, 10);
      if (!(day >= 1 && day <= COURSE_DAYS)) return;
      var af = (dm[d] && dm[d].mapValue && dm[d].mapValue.fields) || {};
      var c = readDay(af);
      if (c) days[day] = c;
    });
    return days;
  }
  /* daily_progress/{sid}: cycles.<clave> = { days, group, levelName }. El
     mapa `days` del nivel superior es de antes de los ciclos = ciclo puente
     (mientras el puente no tenga entrada propia). Devuelve `cycles` (todos,
     id -> { days, group, levelName }) y `days` = los del ciclo seleccionado,
     el MISMO objeto que cycles[sel].days (editar uno edita el otro). */
  function readDailyDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    var name = (doc && doc.name) || "";
    var cyc = {}, cm = mapFields(f.cycles);
    Object.keys(cm).forEach(function (k) {
      var c = cycleByKey(k); if (!c) return;
      var cf = mapFields(cm[k]);
      cyc[c.id] = { days: readDaysMap(mapFields(cf.days)), group: strIn(cf, "group"), levelName: strIn(cf, "levelName") };
    });
    if (!cyc[PUENTE_ID] && f.days) {
      var old = readDaysMap(mapFields(f.days));
      if (Object.keys(old).length) cyc[PUENTE_ID] = { days: old, group: "", levelName: "" };
    }
    return {
      sid: name.slice(name.lastIndexOf("/") + 1), alias: s("alias"), studentUid: s("studentUid"),
      cycles: cyc,
      days: daysFor({ cycles: cyc }, CUR),
      updatedAt: (f.updatedAt && f.updatedAt.timestampValue) || "",
      updatedBy: s("updatedBy")
    };
  }

  function intMap(m, allowZero) {
    var out = {};
    Object.keys(m || {}).forEach(function (k) {
      var n = parseInt(m[k], 10);
      if (POINT_KEYS.indexOf(k) < 0 || isNaN(n) || n < 0 || (!allowZero && n === 0)) return;
      out[k] = { integerValue: String(n) };
    });
    return { mapValue: { fields: out } };
  }
  function daysToFs(days) {
    var fields = {};
    Object.keys(days || {}).forEach(function (d) {
      var day = parseInt(d, 10), c = days[d];
      if (!(day >= 1 && day <= COURSE_DAYS) || !c) return;
      var t = parseInt(c.t, 10);
      var cf = {
        t: { integerValue: String(isNaN(t) ? DAY_MAX : Math.max(0, Math.min(DAY_MAX, t))) },
        x: intMap(c.x, false),
        dp: intMap(c.dp, true),
        rv: { integerValue: "1" }
      };
      if (isAbsent(c)) cf.att = { stringValue: "F" };
      fields[String(day)] = { mapValue: { fields: cf } };
    });
    return { mapValue: { fields: fields } };
  }

  function fetchDailyAll(sids) {
    return batchGetBySid(DAILY_COLLECTION, sids).then(function (docs) {
      if (docs === null) return null;
      var map = {};
      Object.keys(docs).forEach(function (id) { map[id] = readDailyDoc(docs[id]); });
      return map;
    });
  }

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

  /* días de un ciclo dentro de un registro de readDailyDoc (crea la entrada
     vacía si falta, para que el llamador pueda editarla en su lugar). */
  function daysFor(rec, cid) {
    if (!rec) return {};
    rec.cycles = rec.cycles || {};
    var e = rec.cycles[cid] || (rec.cycles[cid] = { days: {}, group: "", levelName: "" });
    return e.days || (e.days = {});
  }

  /* upsert del registro diario de un alumno en el ciclo `cid` (por defecto el
     seleccionado). El mapa days de ESE ciclo se reemplaza entero (el llamador
     manda su estado completo); los demás ciclos no se tocan. Solo profe/admin.
     Solo se guardan los días revisados (rv). data.group / data.levelName
     quedan como foto del ciclo para el historial. En el puente se borra el
     `days` del nivel superior (formato de antes), que ya pasó a su ciclo. */
  function saveDaily(sid, data, cid) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    var c = cycleById(cid || CUR); if (!c) return Promise.resolve(false);
    var src = (data && data.days) || {}, days = {};
    Object.keys(src).forEach(function (d) { if (src[d] && src[d].rv) days[d] = src[d]; });
    var ck = {};
    ck[c.key] = { mapValue: { fields: {
      days: daysToFs(days),
      group: { stringValue: String((data && data.group) || "").slice(0, 40) },
      levelName: { stringValue: String((data && data.levelName) || "").slice(0, 60) }
    } } };
    var fields = {
      cycles: { mapValue: { fields: ck } },
      alias: { stringValue: String((data && data.alias) || "").slice(0, 24) },
      studentUid: { stringValue: String((data && data.studentUid) || "") },
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    var paths = ["cycles." + c.key, "alias", "studentUid", "updatedAt", "updatedBy"];
    if (c.id === PUENTE_ID) paths.push("days");
    var mask = paths.map(function (k) {
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
       reviewed   clases revisadas · absences faltas · attPct % asistencia
       clase      promedio de Clase (FALTA = 0), null sin clases revisadas
       perDay     { d: { score|null, absent } } solo días revisados
       lost       { punto: { x: taches, pts: puntos restados } } en todo el curso
       lostTotal  puntos restados en total */
  function dailyStats(days) {
    days = days || {};
    var sum = 0, n = 0, abs = 0, perDay = {}, lost = {}, lostTotal = 0;
    for (var d = 1; d <= COURSE_DAYS; d++) {
      var c = days[d];
      if (!c || !c.rv) continue;
      n++;
      if (isAbsent(c)) { abs++; perDay[d] = { score: null, absent: true }; continue; }
      var s = dayScore(c);
      sum += s;
      perDay[d] = { score: s, absent: false };
      Object.keys(c.x || {}).forEach(function (k) {
        if (k === ABSENT_KEY || !c.x[k]) return;
        var L = lost[k] || (lost[k] = { x: 0, pts: 0 });
        L.x += c.x[k]; L.pts += (c.dp && c.dp[k]) || 0;
        lostTotal += (c.dp && c.dp[k]) || 0;
      });
    }
    return {
      reviewed: n, absences: abs, present: n - abs,
      attPct: n ? Math.round(100 * (n - abs) / n) : null,
      clase: n ? Math.round(sum / n) : null,
      perDay: perDay, lost: lost, lostTotal: lostTotal
    };
  }

  /* ---- construcción de la boleta (funciones puras, sin red) ---- */
  function bestAvg(best) {
    var ids = Object.keys(best);
    if (!ids.length) return null;
    var sum = 0;
    ids.forEach(function (id) { sum += best[id]; });
    return Math.round(sum / ids.length);
  }

  /* rosterMap: sid -> alumno de fetchRoster. attempts: filas de
     VESPER_RESULTS.fetchAll (fecha DESC). grades: mapa por sid de fetchGrades.
     Devuelve una fila por alumno: { key, sid, name, alias, group, levelName,
     levelNum, studentUid, level, lastDate, finalExam, notes, legacy,
     examsAvg, examsCount, lessonsAvg, lessonsCount (PRÁCTICA en la app) }.
     Los intentos viejos sin sid (solo los ve el admin) forman filas "legacy:"
     sin captura posible. */
  function buildRoster(rosterMap, attempts, grades) {
    var by = {};
    function entry(key) {
      if (!by[key]) {
        by[key] = { key: key, sid: "", name: "", alias: "", group: "",
                    levelName: "", levelNum: null, studentUid: "", level: "", matricula: "", cycles: {},
                    examsBest: {}, examsCount: 0, lessonsBest: {}, lessonsCount: 0,
                    finalExam: null, legacy: null, notes: "", lastDate: "" };
      }
      return by[key];
    }
    Object.keys(rosterMap || {}).forEach(function (sid) {
      var st = rosterMap[sid], e = entry(sid);
      e.sid = sid; e.name = st.name || ""; e.group = st.group || "";
      e.levelName = st.levelName || "";
      e.matricula = st.matricula || "";
      e.levelNum = (st.level != null) ? st.level : null;
    });
    (attempts || []).forEach(function (r) {
      if (!r || r.examType === "placement") return; // diagnóstico: no califica
      var key = r.sid ||
                (r.email ? "legacy:" + String(r.email).trim().toLowerCase()
                         : (r.studentUid ? "legacy-uid:" + r.studentUid : ""));
      if (!key) return;
      var e = entry(key);
      if (r.sid) e.sid = r.sid;
      if (!e.alias && r.alias) e.alias = r.alias;
      if (!e.studentUid && r.studentUid) e.studentUid = r.studentUid;
      if (!e.group && r.group) e.group = r.group;
      if (!e.level && r.level) e.level = r.level;
      if (!e.lastDate && r.date) e.lastDate = r.date;
      if (!e.name && r.email) e.name = String(r.email).trim().toLowerCase();
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
    Object.keys(grades || {}).forEach(function (sid) {
      var g = grades[sid], e = entry(sid);
      e.sid = sid;
      e.finalExam = (g.finalExam != null) ? g.finalExam : null;
      e.legacy = g.legacy || null;
      e.notes = g.notes || "";
      e.cycles = g.cycles || {};
      if (!e.alias && g.alias) e.alias = g.alias;
      if (!e.studentUid && g.studentUid) e.studentUid = g.studentUid;
    });
    return Object.keys(by).map(function (k) {
      var e = by[k];
      return {
        key: e.key, sid: e.sid,
        name: e.name || e.alias || "Estudiante",
        alias: e.alias, group: e.group,
        levelName: e.levelName, levelNum: e.levelNum, matricula: e.matricula,
        studentUid: e.studentUid, level: e.level, lastDate: e.lastDate,
        examsAvg: bestAvg(e.examsBest), examsCount: e.examsCount,
        lessonsAvg: bestAvg(e.lessonsBest), lessonsCount: e.lessonsCount,
        finalExam: e.finalExam, legacy: e.legacy, notes: e.notes, cycles: e.cycles
      };
    });
  }

  /* Calificación de UN alumno (función pura). row = fila de buildRoster,
     stats = dailyStats(sus días). Devuelve:
       parts    [{ key, label, weight, value|null }]  Clase y Examen final
       clase, final
       grade    promedio ponderado de lo que tiene dato (null si nada)
       coverage % de la calificación ya evaluado (60 sin final, 100 con final)
       closed   ¿ya hay examen final? Solo entonces hay veredicto.
       passed   true/false si closed; null mientras sigue
       status   "none" | "open" | "pass" | "fail"
       alerts   [texto] · atRisk · label */
  function computeGrade(row, stats) {
    row = row || {};
    stats = stats || dailyStats({});
    var clase = stats.clase, fin = (row.finalExam != null) ? row.finalExam : null;
    var tot = 0, ws = 0;
    if (clase != null) { tot += clase * WEIGHTS.clase; ws += WEIGHTS.clase; }
    if (fin != null) { tot += fin * WEIGHTS.final; ws += WEIGHTS.final; }
    var grade = ws ? Math.round(tot / ws) : null;
    var closed = fin != null;
    var passed = (closed && grade != null) ? grade >= PASS_THRESHOLD : null;
    var alerts = [];
    if (stats.attPct != null && stats.absences >= 2 && stats.attPct < MIN_ATTENDANCE) {
      alerts.push("Asistencia de " + stats.attPct + "% (mínimo " + MIN_ATTENDANCE + "%)");
    }
    if (!closed && grade != null && grade < PASS_THRESHOLD) {
      alerts.push("Avance de " + grade + ", por debajo de " + PASS_THRESHOLD);
    }
    return {
      parts: [
        { key: "clase", label: "Clase", weight: WEIGHTS.clase, value: clase },
        { key: "final", label: "Examen final", weight: WEIGHTS.final, value: fin }
      ],
      clase: clase, final: fin,
      grade: grade, coverage: Math.round(100 * ws),
      closed: closed, passed: passed,
      status: grade == null ? "none" : (!closed ? "open" : (passed ? "pass" : "fail")),
      alerts: alerts, atRisk: !closed && alerts.length > 0,
      label: grade == null ? "" : (grade >= 90 ? "Excelente" : grade >= 80 ? "Muy bien" :
                                   grade >= PASS_THRESHOLD ? "Bien" : "Insuficiente")
    };
  }

  /* ---- historial académico: un renglón por ciclo (mes) ----
     grade = fila de readDoc (o null), daily = registro de readDailyDoc (o
     null). Devuelve los ciclos con algún dato, del más viejo al más nuevo:
       [{ id, cycle, month, name, label, group, levelName, stats, grade }]
     grade es computeGrade() de ese ciclo. `opts.upTo` (id) corta ahí;
     `opts.all` incluye también los ciclos sin datos hasta hoy. */
  function history(grade, daily, opts) {
    opts = opts || {};
    var gc = (grade && grade.cycles) || {}, dc = (daily && daily.cycles) || {};
    var today = isoOf(new Date()), out = [];
    cycles().some(function (c) {
      var g = gc[c.id] || null, d = dc[c.id] || null;
      var days = (d && d.days) || {}, st = dailyStats(days);
      var has = st.reviewed > 0 || (g && (g.finalExam != null || g.notes));
      if (has || (opts.all && c.start <= today)) {
        out.push({
          id: c.id, cycle: c, month: c.month, name: c.name, label: c.label,
          group: (d && d.group) || (g && g.group) || "",
          levelName: (d && d.levelName) || (g && g.levelName) || "",
          stats: st, finalExam: g ? g.finalExam : null, notes: g ? g.notes : "",
          grade: computeGrade({ finalExam: g ? g.finalExam : null }, st), hasData: !!has
        });
      }
      return opts.upTo && c.id === opts.upTo;
    });
    return out;
  }

  /* matrícula del alumno con sesión (la siembra vesper_auth.js desde su doc
     students/{correo}; la asigna portal_escuela.html). "" si aún no tiene. */
  function myMatricula() {
    try { return String((JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {}).matricula || ""); }
    catch (e) { return ""; }
  }

  /* ---- piezas de vista compartidas ---- */
  /* tono de una nota: g (≥90) · w (≥70) · b (<70) */
  function tone(v) { return v == null ? "" : v >= 90 ? "g" : v >= PASS_THRESHOLD ? "w" : "b"; }

  var CSS =
    ".vgb-hist{display:flex;gap:4px;flex-wrap:wrap}" +
    ".vgb-hist span{min-width:36px;height:32px;padding:0 4px;border-radius:8px;display:grid;place-items:center;" +
      "font-size:.74rem;font-weight:800;background:#f3eee2;color:#5d6470;font-variant-numeric:tabular-nums}" +
    ".vgb-hist span.g{background:#dff0e6;color:#1f6a42}" +
    ".vgb-hist span.w{background:#fbefd0;color:#8a6412}" +
    ".vgb-hist span.b,.vgb-hist span.fa{background:#f7e3e3;color:#a23030}" +
    ".vgb-hist span.fa{font-size:.56rem;letter-spacing:.02em}" +
    ".vgb-hist span.cur{outline:2px solid #C9A84C;outline-offset:1px}" +
    ".vgb-hist span.fut{opacity:.45}" +
    "html.vesper-dark .vgb-hist span{background:rgba(255,255,255,.08);color:rgba(255,255,255,.6)}" +
    "html.vesper-dark .vgb-hist span.g{background:rgba(65,197,149,.2);color:#7fe0b9}" +
    "html.vesper-dark .vgb-hist span.w{background:rgba(226,170,70,.2);color:#f0c670}" +
    "html.vesper-dark .vgb-hist span.b,html.vesper-dark .vgb-hist span.fa{background:rgba(224,112,101,.2);color:#f3a399}";

  function injectCss() {
    if (document.getElementById("vgb-css")) return;
    var st = document.createElement("style");
    st.id = "vgb-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* «Clase por clase»: un cuadrito por clase hasta opts.upTo (por defecto
     la clase de hoy, mínimo las revisadas). Revisada = su nota o FALTA;
     sin revisar = «·» (o «hoy» en opts.cur). */
  function historyHtml(days, opts) {
    days = days || {}; opts = opts || {};
    var dates = classDates(), last = 0, d;
    for (d = 1; d <= COURSE_DAYS; d++) if (days[d] && days[d].rv) last = d;
    var upTo = Math.max(last, opts.upTo || courseClock().day || 0, opts.cur || 0);
    upTo = Math.min(COURSE_DAYS, Math.max(1, upTo));
    var h = '<div class="vgb-hist">';
    for (d = 1; d <= upTo; d++) {
      var c = days[d], rv = !!(c && c.rv), abs = rv && isAbsent(c), v = rv && !abs ? dayScore(c) : null;
      var lab = !rv ? (d === opts.cur ? "hoy" : "·") : abs ? "FALTA" : v;
      var cls = abs ? "fa" : rv ? tone(v) : "";
      if (d === opts.cur) cls += " cur";
      h += '<span class="' + cls + '" title="Clase ' + d + " · " + fmtDay(dates[d - 1]) +
           (rv ? (abs ? " · faltó" : " · " + v + " de 100") : " · sin revisar") + '">' + lab + '</span>';
    }
    return h + '</div>';
  }

  start();
  return {
    COURSE_DAYS: COURSE_DAYS, DAY_MAX: DAY_MAX, PUENTE_ID: PUENTE_ID,
    POINTS: POINTS, ABSENT_KEY: ABSENT_KEY, TACHE_OPTIONS: TACHE_OPTIONS, TACHE_DEFAULT: TACHE_DEFAULT,
    WEIGHTS: WEIGHTS, COMPONENTS: COMPONENTS,
    PASS_THRESHOLD: PASS_THRESHOLD, MIN_ATTENDANCE: MIN_ATTENDANCE,
    points: points, savePointLabels: savePointLabels, resetPointLabels: resetPointLabels,
    tacheValue: tacheValue, setTacheValue: setTacheValue,
    cycles: cycles, cycleById: cycleById, currentCycleId: currentCycleId,
    cycleId: cycleId, cycle: cycle, setCycle: setCycle, daysFor: daysFor,
    classDates: classDates, courseClock: courseClock, fmtDay: fmtDay,
    available: available, signedIn: signedIn, isAdminUser: isAdminUser, isStaffUser: isStaffUser,
    fetchRoster: fetchRoster, fetchMyGroupIds: fetchMyGroupIds,
    fetchGrades: fetchGrades, fetchMyGrade: fetchMyGrade, saveGrade: saveGrade, deleteStudent: deleteStudent,
    fetchDailyAll: fetchDailyAll, fetchMyDaily: fetchMyDaily, saveDaily: saveDaily,
    newDay: newDay, isAbsent: isAbsent, dayScore: dayScore, addTache: addTache, removeTache: removeTache,
    dailyStats: dailyStats, buildRoster: buildRoster, computeGrade: computeGrade,
    history: history, myMatricula: myMatricula,
    injectCss: injectCss, tone: tone, historyHtml: historyHtml,
    _readDailyDoc: readDailyDoc, _readDoc: readDoc, _daysToFs: daysToFs   // para pruebas
  };
})();
