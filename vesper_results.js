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
 *   record(result)     -> registra un intento (local + nube si hay sesión;
 *                         result.cloud === false: solo local)
 *   idToken()          -> Promise<token|null> de la sesión verificada
 *   fetchAll({limit, fresh}) -> Promise<[fila]|null>  (profe: solo SUS grupos;
 *                         admin: todo). fresh:true ignora la caché.
 *   fetchMine({fresh}) -> Promise<[fila]|null>  (el alumno lee SUS intentos)
 *   clearCache()       -> borra la caché de lecturas de este dispositivo
 *   localAll()         -> intentos guardados en este dispositivo
 *   isAdminUser()      -> ¿la sesión es la cuenta admin?
 *   fetchMyGroups()    -> Promise<[grupo]> del profesor con sesión
 *   computeSid(email)  -> Promise<sid> (hash opaco, igual que el script admin)
 *   whenReady()        -> Promise<bool>: resuelve cuando Firebase ya dijo si
 *                         hay sesión verificada (true) o no (false)
 *   identity()         -> Promise<{sid, group}|null> del alumno con sesión
 *
 * Simulacros de entrevista (entrevista.html, 2026-11-10): cuando el alumno
 * elige "Enviar a mi profesor", el reporte se guarda AQUÍ como un intento con
 * examType "placement" (el único tipo que no cuenta para la boleta) y examId
 * "interview:<puesto>". El reporte va dentro de `detail`, con type "iv:...".
 * No hizo falta tocar las reglas: la de exam_results ya deja que el alumno
 * cree lo suyo y que solo lo lean él, el staff y los profesores de su grupo.
 * portal_calificaciones.html los reconoce por el examId y los pinta aparte.
 *
 * Caché de lecturas (2026-11-11): fetchAll() y fetchMine() bajaban TODOS los
 * intentos (hasta 1000 por grupo) cada vez que se abría una página, y
 * Firestore cobra una lectura por documento. Como un intento no cambia nunca
 * (update/delete: if false), ahora se guardan en IndexedDB de este
 * dispositivo y en cada visita solo se piden los nuevos (createdAt > última
 * sincronización). Ver "caché de lecturas" más abajo para los detalles y lo
 * que hace falta en Firestore (un índice compuesto) para que el profesor y
 * el alumno la aprovechen; sin el índice todo funciona como antes.
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
  /* whenReady(): se resuelve UNA vez, con la primera respuesta de Firebase
     sobre la sesión (o false si no hay Firebase o no hay red). */
  var readyResolve = null;
  var readyPromise = new Promise(function (resolve) { readyResolve = resolve; });
  function whenReady() { return readyPromise; }

  function start() {
    if (started) return;
    if (!available()) { readyResolve(false); return; }
    started = true;
    try {
      window.VesperAuth.initFirebase().then(function (auth) {
        authInst = auth;
        auth.onAuthStateChanged(function (user) {
          currentUser = (user && user.emailVerified) ? user : null;
          identityCache = null;   /* otro usuario: otra identidad */
          /* sin sesión no debe quedar en el dispositivo lo que leyó el anterior */
          if (!currentUser) clearCache();
          readyResolve(!!currentUser);
        });
      }).catch(function () { readyResolve(false); /* sin red a Firebase: queda solo-local */ });
    } catch (e) { readyResolve(false); }
  }

  function signedIn() { return !!currentUser; }

  /* token de la sesión verificada (o null): lo manda leccion_app.js al Worker
     para que ÉL guarde la nota de los exámenes que califica (examFinish). */
  function idToken() {
    if (!currentUser) return Promise.resolve(null);
    return currentUser.getIdToken().catch(function () { return null; });
  }

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

  /* group y sid AUTORITATIVOS para la nube: los del doc students/{correo}
     del propio alumno (la regla de exam_results exige que coincidan; ver
     firestore.rules, 2026-10-28). Se leen justo antes de subir porque el
     perfil local puede estar viejo (cambio de grupo) o sin sembrar (las
     páginas públicas, como leccion.html, no pasan por el gate que lo
     siembra). Sin doc students/ (admin o profesor probando): "" y "", lo
     único que la regla acepta en ese caso. Una lectura por página y usuario. */
  var identityCache = null;
  function myIdentity(token) {
    if (identityCache) return identityCache;
    var email = String(currentUser.email || "").trim().toLowerCase();
    identityCache = fetch(base() + "/students/" + encodeURIComponent(email), {
      headers: { "Authorization": "Bearer " + token }
    }).then(function (r) {
      if (r.status === 404) return { sid: "", group: "" };
      if (r.status !== 200) throw new Error("students " + r.status);
      return r.json().then(function (doc) {
        var f = (doc && doc.fields) || {};
        return {
          sid: (f.sid && f.sid.stringValue) || "",
          group: (f.group && f.group.stringValue) || ""
        };
      });
    });
    /* si falla (red), no se cachea: el siguiente intento vuelve a probar */
    identityCache.catch(function () { identityCache = null; });
    return identityCache;
  }

  /* sid + grupo del alumno con sesión, o null (sin sesión o sin red). Para
     quien necesita saber ANTES de subir si algún profesor verá el intento:
     sin grupo, solo lo ven el propio alumno y el staff. */
  function identity() {
    if (!currentUser) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) { return myIdentity(token); })
      .catch(function () { return null; });
  }

  /* grupo del perfil local: solo para el espejo en este dispositivo */
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
    /* score <= total: la regla rechaza un intento incoherente */
    var score = Math.min(total, Math.max(0, parseInt(r.score, 10) || 0));
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
      group: myGroup(),    // en record() se sustituye por el de students/
      /* tamaños dentro de los límites de la regla de exam_results */
      examType: String(r.examType || "lesson"),
      examId: String(r.examId || "").slice(0, 120),
      level: String(r.level || "").slice(0, 40),
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
    var name = (doc && doc.name) || "";
    return {
      id: name.slice(name.lastIndexOf("/") + 1),   /* id del doc: evita duplicados en la caché */
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
    /* cloud:false = la nota la escribe el servidor (exámenes de nivel y jefes);
       las reglas ya no aceptan esas desde el navegador */
    if (result && result.cloud === false) return Promise.resolve(false);
    if (!signedIn()) return Promise.resolve(false);
    return currentUser.getIdToken().then(function (token) {
      return myIdentity(token).then(function (id) {
        /* copia para la nube: el espejo local ya se guardó tal cual */
        var cloud = JSON.parse(JSON.stringify(rec));
        cloud.sid = id.sid;
        cloud.group = id.group;
        return fetch(collPath(), {
          method: "POST",
          headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
          body: JSON.stringify(toFs(cloud))
        }).then(function (r) { return r.status === 200; });
      });
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

  /* ---- caché de lecturas (IndexedDB) ----
     Qué guarda: las filas que devolvió la última lectura completa más las
     nuevas, por usuario (clave "all:<uid>" o "mine:<uid>"). Se borra al
     cerrar sesión (aquí y en vesper_auth.js) y nunca se lee con otro uid.

     Cómo se pone al día: una query con `createdAt > última sincronización
     menos SYNC_OVERLAP_MS`. El traslape existe porque createdAt lo pone el
     reloj de quien crea el intento (el del alumno en las lecciones, el del
     Worker en los exámenes): un intento de un dispositivo con la hora
     atrasada menos que el traslape entra igual; los repetidos se descartan
     por id.

     Cuándo se vuelve a leer todo: sin caché, si cambió el alcance (otros
     grupos), si se pide un límite mayor que el guardado, si la caché tiene
     más de FULL_MAX_AGE_MS (recoge intentos con la hora muy mal y los que el
     admin haya borrado), si llegan `limit` filas nuevas de golpe, o con
     {fresh:true} (el botón "Actualizar" de los portales).

     Índice: para el admin la query incremental usa un solo campo y funciona
     sin más. Para el profesor (group == g) y el alumno (studentUid == uid)
     necesita un índice compuesto en Firestore (consola → Firestore →
     Índices → colección exam_results):
         group ASC, createdAt DESC          (profesor)
         studentUid ASC, createdAt DESC     (alumno)
     Mientras no existan, Firestore responde 400 y se lee todo como antes;
     se recuerda NOINCR_RETRY_MS para no repetir el intento en cada visita.

     Solo se cachea exam_results. roster/, gradebook/ y daily_progress/ NO:
     cambian (los edita el profesor) y una copia vieja haría que una captura
     pisara la de otro profesor.

     Sin IndexedDB (modo privado de algunos navegadores) todo degrada a la
     lectura completa de siempre. */
  var CACHE_DB = "vesper_results_cache";
  var CACHE_STORE = "kv";
  var CACHE_V = 1;
  var FULL_MAX_AGE_MS = 7 * 24 * 3600 * 1000;
  var SYNC_OVERLAP_MS = 12 * 3600 * 1000;
  var NOINCR_RETRY_MS = 24 * 3600 * 1000;
  /* marca en localStorage de que la base existe: así clearCache() no abre
     IndexedDB en el navegador de cada visitante sin cuenta */
  var CACHE_FLAG = "vesper_results_cache_on";

  var dbPromise = null;
  function cacheDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve) {
      try {
        var req = window.indexedDB.open(CACHE_DB, 1);
        req.onupgradeneeded = function () {
          try { req.result.createObjectStore(CACHE_STORE); } catch (e) {}
        };
        req.onsuccess = function () {
          var db = req.result;
          /* otra pestaña (o el cierre de sesión) quiere borrar la base */
          db.onversionchange = function () { try { db.close(); } catch (e) {} dbPromise = null; };
          resolve(db);
        };
        req.onerror = function () { resolve(null); };
        req.onblocked = function () { resolve(null); };
      } catch (e) { resolve(null); }
    });
    return dbPromise;
  }
  /* las tres resuelven siempre (nunca rechazan): la caché es opcional */
  function cacheGet(key) {
    return cacheDb().then(function (db) {
      if (!db) return null;
      return new Promise(function (resolve) {
        try {
          var req = db.transaction(CACHE_STORE, "readonly").objectStore(CACHE_STORE).get(key);
          req.onsuccess = function () { resolve(req.result || null); };
          req.onerror = function () { resolve(null); };
        } catch (e) { resolve(null); }
      });
    });
  }
  function cachePut(key, value) {
    try { localStorage.setItem(CACHE_FLAG, "1"); } catch (e) {}
    return cacheDb().then(function (db) {
      if (!db) return;
      return new Promise(function (resolve) {
        try {
          var tx = db.transaction(CACHE_STORE, "readwrite");
          tx.objectStore(CACHE_STORE).put(value, key);
          tx.oncomplete = function () { resolve(); };
          tx.onerror = tx.onabort = function () { resolve(); };
        } catch (e) { resolve(); }
      });
    });
  }
  function clearCache() {
    var had = true;
    try { had = !!localStorage.getItem(CACHE_FLAG); localStorage.removeItem(CACHE_FLAG); } catch (e) {}
    if (!had && !dbPromise) return Promise.resolve();   /* nunca se creó */
    return cacheDb().then(function (db) {
      if (!db) return;
      return new Promise(function (resolve) {
        try {
          var tx = db.transaction(CACHE_STORE, "readwrite");
          tx.objectStore(CACHE_STORE).clear();
          tx.oncomplete = function () { resolve(); };
          tx.onerror = tx.onabort = function () { resolve(); };
        } catch (e) { resolve(); }
      });
    });
  }

  function byDateDesc(a, b) { return (b.date || "") < (a.date || "") ? -1 : 1; }

  /* -> { status, rows }: rows es null si Firestore no respondió 200 */
  function runQuery(token, query) {
    return fetch(base() + ":runQuery", {
      method: "POST",
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ structuredQuery: query })
    }).then(function (r) {
      if (r.status !== 200) return { status: r.status, rows: null };
      return r.json().then(function (rows) {
        return { status: 200, rows: (rows || []).filter(function (x) { return x.document; }).map(function (x) {
          return readDoc(x.document);
        }) };
      });
    });
  }

  function eqFilter(field, value) {
    return { fieldFilter: { field: { fieldPath: field }, op: "EQUAL", value: { stringValue: value } } };
  }
  /* la query "solo lo nuevo" de una parte (eq = filtro de igualdad o null) */
  function sinceQuery(eq, sinceIso, limit) {
    var since = { fieldFilter: {
      field: { fieldPath: "createdAt" }, op: "GREATER_THAN", value: { timestampValue: sinceIso }
    } };
    return {
      from: [{ collectionId: COLLECTION }],
      where: eq ? { compositeFilter: { op: "AND", filters: [eq, since] } } : since,
      orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
      limit: limit
    };
  }

  /* Lectura con caché. spec:
       key      clave de la caché (incluye el uid)
       scope    qué abarca (si cambia, la caché no sirve)
       limit    filas pedidas (y tope por query)
       fresh    true = ignora la caché
       parts    un filtro de igualdad por query (null = sin filtro)
       full     function(eq) -> structuredQuery de la lectura completa
     Resuelve [fila] por fecha desc, o null si ninguna query respondió. */
  function cachedRows(token, spec) {
    var limit = spec.limit;
    return cacheGet(spec.key).then(function (cached) {
      var now = Date.now();
      var c = (cached && cached.v === CACHE_V && cached.scope === spec.scope &&
               Array.isArray(cached.rows)) ? cached : null;
      /* el fallo de la query incremental se recuerda aunque se lea todo */
      var noIncrAt = (c && c.noIncrAt) || 0;
      var tryIncr = !noIncrAt || now - noIncrAt > NOINCR_RETRY_MS || now < noIncrAt;
      var usable = c && !spec.fresh &&
        (c.limit >= limit || c.complete) &&
        now - c.fullAt < FULL_MAX_AGE_MS &&
        c.syncAt <= now + 60000;   /* reloj movido hacia atrás: no fiarse */

      function full() {
        var t0 = Date.now();
        return Promise.all(spec.parts.map(function (eq) {
          return runQuery(token, spec.full(eq));
        })).then(function (parts) {
          if (parts.every(function (p) { return p.rows === null; })) return null;
          var rows = [], whole = true;
          parts.forEach(function (p) {
            if (!p.rows) { whole = false; return; }
            rows = rows.concat(p.rows);
          });
          rows.sort(byDateDesc);
          /* complete = no quedó nada fuera: ninguna query llenó su tope y la
             suma cabe. Solo entonces la caché sirve para un límite mayor. */
          var complete = whole && rows.length <= limit &&
            parts.every(function (p) { return p.rows.length < limit; });
          rows = rows.slice(0, limit);
          /* una lectura a medias (falló la query de algún grupo) no se guarda */
          if (whole) {
            cachePut(spec.key, {
              v: CACHE_V, scope: spec.scope, limit: limit, complete: complete,
              fullAt: t0, syncAt: t0, noIncrAt: noIncrAt, rows: rows
            });
          }
          return rows;
        });
      }

      if (!usable || !tryIncr) return full();

      var t0 = now;
      var sinceIso = new Date(c.syncAt - SYNC_OVERLAP_MS).toISOString();
      return Promise.all(spec.parts.map(function (eq) {
        return runQuery(token, sinceQuery(eq, sinceIso, limit));
      })).then(function (parts) {
        var failed = parts.filter(function (p) { return p.rows === null; });
        if (failed.length) {
          /* 400 = falta el índice compuesto (ver arriba); 403 = la regla no
             acepta esta query. En ambos casos insistir en cada visita solo
             añade una petición fallida: se recuerda y se lee todo. */
          if (failed.some(function (p) { return p.status === 400 || p.status === 403; })) {
            noIncrAt = Date.now();
            try {
              console.warn("[Vesper] exam_results: Firestore rechazó la lectura incremental (" +
                failed[0].status + "; con 400 falta un índice compuesto). Se leen todos los " +
                "intentos. Ver vesper_results.js, \"caché de lecturas\".");
            } catch (e) {}
          }
          return full();
        }
        /* llegaron `limit` de golpe: puede haber más nuevos que no cupieron */
        if (parts.some(function (p) { return p.rows.length >= limit; })) return full();

        var seen = {}, rows = [];
        parts.forEach(function (p) {
          p.rows.forEach(function (r) { if (r.id && !seen[r.id]) { seen[r.id] = 1; rows.push(r); } });
        });
        c.rows.forEach(function (r) { if (!r.id || !seen[r.id]) { if (r.id) seen[r.id] = 1; rows.push(r); } });
        rows.sort(byDateDesc);
        /* una caché completa lo sigue siendo: guarda todo, aunque pase de su
           límite (la próxima lectura completa la vuelve a acotar) */
        if (!c.complete) rows = rows.slice(0, c.limit);
        cachePut(spec.key, {
          v: CACHE_V, scope: spec.scope, limit: c.limit, complete: c.complete,
          fullAt: c.fullAt, syncAt: t0, noIncrAt: 0, rows: rows
        });
        return rows.slice(0, limit);
      });
    });
  }

  /* lectura del profe. El ADMIN lee toda la colección (query ordenada); un
     PROFESOR solo puede leer intentos de SUS grupos, así que se lanza una
     query filtrada `group == g` por cada grupo (sin orderBy para no exigir
     índice compuesto) y se ordena aquí. Resuelve null si no hay sesión o si
     falta la regla (403); [] si el profesor no tiene grupos asignados.
     Con caché (ver arriba): {fresh:true} obliga a leer todo. */
  function fetchAll(opts) {
    opts = opts || {};
    var limit = Math.max(1, Math.min(1000, parseInt(opts.limit, 10) || 500));
    if (!signedIn()) return Promise.resolve(null);
    var uid = currentUser.uid;

    return currentUser.getIdToken().then(function (token) {
      if (isAdminUser()) {
        return cachedRows(token, {
          key: "all:" + uid, scope: "admin", limit: limit, fresh: !!opts.fresh,
          parts: [null],
          full: function () {
            return {
              from: [{ collectionId: COLLECTION }],
              orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
              limit: limit
            };
          }
        });
      }
      return fetchMyGroups().then(function (groups) {
        if (!groups.length) return [];
        return cachedRows(token, {
          key: "all:" + uid, scope: "g:" + groups.slice().sort().join("\u0001"),
          limit: limit, fresh: !!opts.fresh,
          parts: groups.map(function (g) { return eqFilter("group", g); }),
          full: function (eq) {
            return { from: [{ collectionId: COLLECTION }], where: eq, limit: limit };
          }
        });
      });
    }).catch(function () { return null; });
  }

  /* lectura del ALUMNO: solo SUS intentos (la regla lo permite vía el filtro
     studentUid == uid; sin orderBy para no requerir índice compuesto — se
     ordena aquí por fecha desc). Resuelve null sin sesión o con error.
     Con caché (ver arriba): {fresh:true} obliga a leer todo. */
  function fetchMine(opts) {
    opts = opts || {};
    if (!signedIn()) return Promise.resolve(null);
    var uid = currentUser.uid;
    return currentUser.getIdToken().then(function (token) {
      return cachedRows(token, {
        key: "mine:" + uid, scope: "mine", limit: 1000, fresh: !!opts.fresh,
        parts: [eqFilter("studentUid", uid)],
        full: function (eq) {
          return { from: [{ collectionId: COLLECTION }], where: eq, limit: 1000 };
        }
      });
    }).catch(function () { return null; });
  }

  start();
  return {
    available: available, signedIn: signedIn, aliasOf: aliasOf, idToken: idToken,
    record: record, fetchAll: fetchAll, fetchMine: fetchMine, localAll: localAll,
    isAdminUser: isAdminUser, fetchMyGroups: fetchMyGroups, computeSid: computeSid,
    whenReady: whenReady, identity: identity, clearCache: clearCache
  };
})();
