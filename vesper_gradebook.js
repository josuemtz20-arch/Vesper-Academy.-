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
 *   - colección `gradebook/{sid}`: un doc por alumno con la parte manual.
 *     Escriben SOLO profes/admin; lee el dueño y el profe (ver
 *     firestore.rules / FIRESTORE_GRADEBOOK_RULES.md).
 *
 * Privacidad y grupos (2026-07-07): el roster ya NO se deriva de los
 * intentos — se lee de la colección `roster/{sid}` (espejo SIN CORREO de la
 * allowlist, mantenido por upload_manuals.py): así TODOS los alumnos
 * registrados aparecen en la boleta desde el día uno, con su NOMBRE. El
 * `sid` es un hash opaco del correo (mismo cálculo que sid_of() en el
 * script admin), de modo que el profesor nunca ve correos. Cada profesor
 * solo puede leer los alumnos de SUS grupos (teachers/{correo}.groups vs
 * roster/{sid}.group — lo exigen las reglas); el admin ve todo.
 *
 * Degrada en silencio: sin Firebase, sin sesión o sin la regla publicada
 * (403), fetchGrades() resuelve null y saveGrade() false — la página
 * muestra su aviso sin romperse.
 *
 * window.VESPER_GRADEBOOK:
 *   WEIGHTS / PASS_THRESHOLD  -> pesos de la final y umbral de aprobación
 *   available()               -> ¿hay Firebase configurado?
 *   signedIn()                -> ¿hay sesión verificada?
 *   fetchRoster()             -> Promise<{sid: alumno}|null> (roster/ por grupos)
 *   fetchGrades(sids)         -> Promise<{sid: fila}|null> (batchGet, lectura profe)
 *   fetchMyGrade()            -> Promise<fila|null> (el alumno lee SU boleta)
 *   saveGrade(sid, data)      -> Promise<bool> (upsert de la parte manual)
 *   buildRoster(rosterMap, attempts, grades) -> [fila por alumno] (función pura)
 *   computeFinal(row)         -> { final:int|null, passed:bool|null } (pura)
 *
 * Progreso diario (rúbrica del curso: COURSE_DAYS días × DAILY_ASPECTS,
 * ✓/✗ por celda; su promedio ALIMENTA la Participación de la boleta):
 *   COURSE_DAYS / DAILY_ASPECTS -> configuración de la rúbrica
 *   fetchDailyAll()           -> Promise<{correo: rec}|null> (lectura profe)
 *   fetchMyDaily()            -> Promise<rec|null> (el alumno lee SU rúbrica)
 *   saveDaily(email, data)    -> Promise<bool> (upsert de la rúbrica)
 *   dailyStats(days)          -> { avg, cells, daysTouched } (función pura)
 * ============================================================ */
window.VESPER_GRADEBOOK = (function () {
  var DB_ID = "teachermanuals";
  var COLLECTION = "gradebook";
  var DAILY_COLLECTION = "daily_progress";

  /* Pesos de la calificación final (deben sumar 1). Si un componente no
     existe aún (p. ej. alumno sin exámenes), se excluye y los pesos
     restantes se renormalizan — la falta de datos NO cuenta como cero. */
  var WEIGHTS = { exams: 0.5, lessons: 0.3, participation: 0.2 };
  var PASS_THRESHOLD = 70; // % mínimo para "Aprobado" en la final

  /* Rúbrica de progreso diario: duración normal de un curso y aspectos que
     el profesor evalúa cada día con ✓/✗ (✓=100, ✗=0; sin marcar no cuenta).
     Es la MISMA rúbrica para todos los niveles. Para añadir o quitar un
     aspecto basta editar esta lista: la cuadrícula del profesor y del alumno,
     la gráfica y los promedios se adaptan solos. Las 'key' son estables (son
     los campos en Firestore): no las cambies para no perder lo ya capturado. */
  var COURSE_DAYS = 20;
  var DAILY_ASPECTS = [
    { key: "asistencia",    label: "Asistencia" },
    { key: "puntualidad",   label: "Puntualidad" },
    { key: "material",      label: "Material" },
    { key: "tarea",         label: "Tarea" },
    { key: "participacion", label: "Participación" },
    { key: "actitud",       label: "Actitud" },
    { key: "trabajo_clase", label: "Trabajo en clase" },
    { key: "uso_ingles",    label: "Uso del inglés" },
    { key: "speaking",      label: "Speaking" },
    { key: "pronunciacion", label: "Pronunciación" },
    { key: "fluidez",       label: "Fluidez" },
    { key: "listening",     label: "Listening" },
    { key: "reading",       label: "Reading" },
    { key: "writing",       label: "Writing" },
    { key: "gramatica",     label: "Gramática" },
    { key: "vocabulario",   label: "Vocabulario" }
  ];

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
     participacion / examsGrade / lessonsGrade son los tres números que captura
     el PROFESOR (0..100). examsGrade/lessonsGrade son la nota de registro de
     Exámenes y Lecciones: el profesor confirma (o corrige) el promedio de
     práctica del alumno. Si aún no las confirma, quedan null y NO cuentan. */
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    function s(k) { return (f[k] && f[k].stringValue) || ""; }
    function iOrNull(k) {
      return (f[k] && f[k].integerValue != null) ? clampPct(f[k].integerValue) : null;
    }
    var name = (doc && doc.name) || "";
    return {
      sid: name.slice(name.lastIndexOf("/") + 1),
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

  /* upsert de la parte manual de un alumno. PATCH con updateMask crea el
     doc si no existe; el mask DEBE listar cada campo enviado para no borrar
     los demás. Solo profe/admin (lo exige la regla de Firestore).
     Los tres componentes numéricos (participacion, examsGrade, lessonsGrade)
     son OPCIONALES por llamada: se incluyen en el updateMask solo si vienen
     como número 0..100, así una llamada que toca un componente no borra los
     otros. La regla valida cada uno solo si está presente. */
  function saveGrade(sid, data) {
    sid = String(sid || "").trim();
    if (!sid || !signedIn()) return Promise.resolve(false);
    data = data || {};
    var fields = {
      notes: { stringValue: String(data.notes || "").slice(0, 500) },
      alias: { stringValue: String(data.alias || "").slice(0, 24) },
      studentUid: { stringValue: String(data.studentUid || "") },
      updatedAt: { timestampValue: new Date().toISOString() },
      updatedBy: { stringValue: String(currentUser.email || "").toLowerCase() }
    };
    ["participacion", "examsGrade", "lessonsGrade"].forEach(function (k) {
      var v = clampPct(data[k]);
      if (v != null) fields[k] = { integerValue: String(v) };
    });
    var mask = Object.keys(fields).map(function (k) {
      return "updateMask.fieldPaths=" + k;
    }).join("&");
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/" + COLLECTION + "/" + sid + "?" + mask, {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: fields })
      }).then(function (r) { return r.status === 200; });
    }).catch(function () { return false; });
  }

  /* ---- progreso diario (modelo "todo bueno, restar taches") ----
     Cada día que TUVO CLASE arranca con los 16 aspectos en bueno (✓). El
     profesor solo marca ✗ (tache) donde el alumno falló; cada tache baja
     puntos. Es lo más simple: no hay que marcar las 16 casillas por día.
     Almacenamiento en days[d]:
       - la PRESENCIA de la clave del día = hubo clase (día activo).
       - `_activo:true` marca el día (para que un día sin taches se guarde).
       - `aspectKey:false` = un tache en ese aspecto.
       - los aspectos buenos NO se guardan (bueno = ausente). */
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
      var cell = {}; // día con clase (presencia); solo guardamos los taches
      DAILY_ASPECTS.forEach(function (a) {
        if (af[a.key] && af[a.key].booleanValue === false) cell[a.key] = false;
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
      var day = parseInt(d, 10);
      if (!(day >= 1 && day <= COURSE_DAYS)) return;
      // cada día presente = hubo clase; marcamos _activo y solo los taches
      var cellFields = { _activo: { booleanValue: true } };
      DAILY_ASPECTS.forEach(function (a) {
        if ((days[d] || {})[a.key] === false) cellFields[a.key] = { booleanValue: false };
      });
      fields[String(day)] = { mapValue: { fields: cellFields } };
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

  /* estadística de la rúbrica: cada día con clase aporta los 16 aspectos en
     bueno (✓=100) y cada tache (✗) resta uno. -> { avg, cells, daysTouched }
     donde daysTouched = días con clase. avg alimenta la Participación. */
  function dailyStats(days) {
    var N = DAILY_ASPECTS.length;
    var ok = 0, total = 0, held = 0;
    Object.keys(days || {}).forEach(function (d) {
      var day = parseInt(d, 10);
      if (!(day >= 1 && day <= COURSE_DAYS)) return;
      var cell = days[d] || {}, taches = 0;
      DAILY_ASPECTS.forEach(function (a) { if (cell[a.key] === false) taches++; });
      held++; total += N; ok += (N - taches);
    });
    return {
      avg: total ? Math.round(100 * ok / total) : null,
      cells: total,
      daysTouched: held
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
     level, examsAvg, examsCount, lessonsAvg, lessonsCount, participacion,
     examsGrade, lessonsGrade, notes, lastDate }.
     Los intentos viejos sin sid (solo los ve el admin) forman filas "legacy"
     identificadas por correo/uid, sin captura manual posible. */
  function buildRoster(rosterMap, attempts, grades) {
    var by = {};
    function entry(key) {
      if (!by[key]) {
        by[key] = { key: key, sid: "", name: "", alias: "", group: "",
                    levelName: "", levelNum: null, studentUid: "", level: "",
                    examsBest: {}, examsCount: 0, lessonsBest: {}, lessonsCount: 0,
                    participacion: null, examsGrade: null, lessonsGrade: null,
                    notes: "", lastDate: "" };
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

    /* 3) la parte manual ya capturada (por sid) */
    Object.keys(grades || {}).forEach(function (sid) {
      var g = grades[sid];
      var e = entry(sid);
      e.sid = sid;
      e.participacion = g.participacion;
      e.examsGrade = g.examsGrade;      // nota de exámenes confirmada por el profe
      e.lessonsGrade = g.lessonsGrade;  // nota de lecciones confirmada por el profe
      e.notes = g.notes || "";
      if (!e.alias && g.alias) e.alias = g.alias;
      if (!e.studentUid && g.studentUid) e.studentUid = g.studentUid;
    });

    return Object.keys(by).map(function (k) {
      var e = by[k];
      return {
        key: e.key, sid: e.sid,
        name: e.name || e.alias || "Estudiante",
        alias: e.alias, group: e.group,
        levelName: e.levelName, levelNum: e.levelNum,
        studentUid: e.studentUid, level: e.level, lastDate: e.lastDate,
        // Promedios de PRÁCTICA (autocalificados por el alumno; referencia, no nota).
        examsAvg: bestAvg(e.examsBest), examsCount: e.examsCount,
        lessonsAvg: bestAvg(e.lessonsBest), lessonsCount: e.lessonsCount,
        // Notas de REGISTRO (las confirma el profesor) y participación.
        examsGrade: e.examsGrade, lessonsGrade: e.lessonsGrade,
        participacion: e.participacion, notes: e.notes
      };
    });
  }

  /* Final ponderada. INTEGRIDAD: la nota de registro se calcula SOLO con datos
     capturados por el profesor — Exámenes/Lecciones CONFIRMADOS
     (examsGrade/lessonsGrade) y Participación. Los promedios automáticos
     (examsAvg/lessonsAvg) los escribe el propio alumno al autocalificarse, así
     que son PRÁCTICA y NO entran en la final. Los componentes que el profesor
     aún no confirma se excluyen y los pesos se renormalizan con los presentes
     (la falta de dato no cuenta como cero). */
  function computeFinal(row) {
    var parts = [
      { w: WEIGHTS.exams, v: (row.examsGrade != null ? row.examsGrade : null) },
      { w: WEIGHTS.lessons, v: (row.lessonsGrade != null ? row.lessonsGrade : null) },
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
    COURSE_DAYS: COURSE_DAYS, DAILY_ASPECTS: DAILY_ASPECTS,
    available: available, signedIn: signedIn, isAdminUser: isAdminUser,
    fetchRoster: fetchRoster,
    fetchGrades: fetchGrades, fetchMyGrade: fetchMyGrade, saveGrade: saveGrade,
    fetchDailyAll: fetchDailyAll, fetchMyDaily: fetchMyDaily,
    saveDaily: saveDaily, dailyStats: dailyStats,
    buildRoster: buildRoster, computeFinal: computeFinal
  };
})();
