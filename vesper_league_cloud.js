/* ============================================================
 * vesper_league_cloud.js — Leaderboard REAL de la liga (Firestore REST).
 *
 * Convierte la liga semanal de rivales simulados (vesper_league.js) en una
 * tabla con usuarios REALES cuando el alumno tiene sesión verificada. Reusa el
 * mismo patrón REST que vesper_sync.js (DB "teachermanuals", token de
 * VesperAuth) sobre la colección semanal `leagues/{weekId}/members/{uid}`:
 *   - cada quien escribe SOLO su propia entrada { alias, xp, ts }
 *     (ts = hora del servidor, REQUEST_TIME)
 *   - la leen y escriben solo alumnos/profesores de la allowlist y staff
 *     (2026-11-20); una cuenta fuera de la allowlist ve la liga simulada
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
 *   pushScore(weekId, xp)  -> sube tu XP semanal (documents:commit, con rebote
 *                             y >30 s entre escrituras, como exige la regla)
 *   fetchBoard(weekId)     -> Promise<[{uid,alias,xp,rank,isMe}]|null>
 *   aliasProblem(texto)    -> "" si el alias se puede usar; si no, el motivo
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

  /* ---- filtro del alias (auditoría O2) ----
     El alias es texto libre que ven los demás alumnos. Se rechazan:
       - groserías e insultos comunes (español de México e inglés), también
         escritos con números o símbolos (p3nd3j0, put@) o con letras repetidas;
       - datos de contacto: correos, links, teléfonos, @usuario.
     Palabras cortas (puta, joto, culo…) solo cuentan como palabra suelta,
     para no bloquear nombres como Maricarmen o Computadora; las raíces
     largas (pendej, chingad…) cuentan aunque vayan pegadas.
     Se aplica al SUBIR el alias y también al PINTAR la tabla, así que un
     alias feo que alguien haya escrito antes tampoco se ve. */
  var BAD_WORDS = ["puta", "puto", "putas", "putos", "joto", "jotos", "culo", "culos", "marica", "maricon",
    "perra", "zorra", "naco", "pito", "nalgas", "ojete", "mamon", "mamona", "idiota", "baboso",
    "sexo", "sexy", "porn", "fag", "dick", "cock", "slut", "ass", "nazi", "kkk"];
  var BAD_STEMS = ["pendej", "verga", "chingad", "chingon", "chingar", "chinga", "cabron", "culer",
    "mierda", "pinche", "malparid", "panocha", "mamada", "estupid", "imbecil", "huevon", "putito",
    "putit", "prostitut", "fuck", "shit", "bitch", "cunt", "pussy", "nigg", "whore", "asshole",
    "bastard", "porno", "hitler", "rapist", "violador", "suicid"];
  var LEET = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s", "!": "i" };
  function squeeze(s) { return s.replace(/(.)\1+/g, "$1"); }   /* puuuta -> puta */
  function plain(s) {
    s = String(s || "").toLowerCase();
    try { s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); } catch (e) {}   /* sin acentos */
    return s.replace(/[013457@$!]/g, function (c) { return LEET[c]; });
  }
  function aliasProblem(raw) {
    var s = String(raw || "").trim();
    if (!s) return "";
    if (/@[a-z]|https?:|www\.|\.(com|mx|net|org|me|io|gg|ly)\b|wa\.me|t\.me/i.test(s)) return "Sin correos, links ni @usuarios.";
    if ((s.match(/\d/g) || []).length >= 7) return "Sin números de teléfono.";
    /* palabras: separa por espacios/símbolos y por mayúsculas (ElPutoAmo) */
    var words = s.replace(/([a-záéíóúñ])([A-ZÁÉÍÓÚÑ])/g, "$1 $2").split(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9@$!]+/);
    for (var i = 0; i < words.length; i++) {
      var w = plain(words[i]).replace(/[^a-z]/g, "");
      if (w && (BAD_WORDS.indexOf(w) !== -1 || BAD_WORDS.indexOf(squeeze(w)) !== -1)) return "Ese alias no se puede usar.";
    }
    var all = plain(s).replace(/[^a-z]/g, "");
    var sq = squeeze(all);
    for (var j = 0; j < BAD_STEMS.length; j++) {
      if (all.indexOf(BAD_STEMS[j]) !== -1 || sq.indexOf(squeeze(BAD_STEMS[j])) !== -1) return "Ese alias no se puede usar.";
    }
    return "";
  }

  /* alias público: el que el alumno puso en Configuración (si pasa el
     filtro), o un código estable derivado del uid (sin exponer el correo). */
  function aliasOf() {
    var alias = "";
    try {
      var prof = JSON.parse(localStorage.getItem("vesper_profile") || "null");
      alias = (prof && prof.vesper && prof.vesper.leagueAlias) ? ("" + prof.vesper.leagueAlias).trim() : "";
    } catch (e) {}
    if (alias && !aliasProblem(alias)) return alias.slice(0, 24);
    var uid = (currentUser && currentUser.uid) ? currentUser.uid : "";
    return "Estudiante#" + (uid ? uid.slice(-4) : "0000");
  }

  /* ---- codificación Firestore REST ----
     `ts` ya NO lo pone el navegador: la regla (2026-11-20) exige que sea la
     hora del servidor (request.time). Por REST eso solo se puede pedir con la
     transformación REQUEST_TIME de documents:commit (un PATCH normal no
     admite transformaciones). Ver writeOf(). */
  function toFs(alias, xp) {
    return { fields: {
      alias: { stringValue: String(alias || "") },
      xp: { integerValue: String(Math.max(0, Math.round(xp || 0))) }
    } };
  }
  /* Escritura de documents:commit: `update` SIN updateMask reemplaza el doc
     entero por { alias, xp } y luego updateTransforms pone ts = hora del
     servidor. Es lo mismo que hacía el PATCH de antes, más el ts del servidor. */
  function writeOf(weekId, uid, alias, xp) {
    var name = "projects/" + projectId() + "/databases/" + DB_ID + "/documents/leagues/" +
               weekId + "/members/" + uid;
    return { update: { name: name, fields: toFs(alias, xp).fields },
             updateTransforms: [{ fieldPath: "ts", setToServerValue: "REQUEST_TIME" }] };
  }
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    var name = doc && doc.name ? ("" + doc.name) : "";
    var uid = name ? name.slice(name.lastIndexOf("/") + 1) : "";
    var alias = (f.alias || {}).stringValue || "";
    if (!alias || aliasProblem(alias)) alias = "Estudiante";
    return { uid: uid, alias: alias,
      xp: parseInt((f.xp || {}).integerValue || "0", 10) };
  }

  /* Los mismos topes que firestore.rules (leagues/{week}/members): si se
     mandara más, la regla rechazaría la escritura entera y la tabla del
     alumno se quedaría congelada. Lo que no cabe en una escritura sube en
     la siguiente. LEAGUE_MIN_GAP: la regla exige > 30 s entre escrituras;
     se espera un poco más (31 s) contados desde que ESTE navegador recibió
     la respuesta, que siempre es después de la hora que guardó el servidor. */
  var LEAGUE_FIRST_MAX = 3000, LEAGUE_STEP = 600, LEAGUE_WEEK_MAX = 20000;
  var LEAGUE_MIN_GAP_MS = 31000, PUSH_DEBOUNCE_MS = 1200;
  function sentKey(weekId) { return "vesper_league_sent_" + weekId; }
  function sentAtKey(weekId) { return "vesper_league_sent_at_" + weekId; }
  function lastSent(weekId) {
    try { var v = parseInt(localStorage.getItem(sentKey(weekId)) || "", 10); return isNaN(v) ? -1 : v; }
    catch (e) { return -1; }
  }
  function lastSentAt(weekId) {
    try { var v = parseInt(localStorage.getItem(sentAtKey(weekId)) || "", 10); return isNaN(v) ? 0 : v; }
    catch (e) { return 0; }
  }
  function clampForRules(weekId, xp) {
    var last = lastSent(weekId);
    var cap = last < 0 ? LEAGUE_FIRST_MAX : last + LEAGUE_STEP;
    return Math.max(0, Math.min(Math.round(xp || 0), cap, LEAGUE_WEEK_MAX));
  }
  /* cuánto falta para poder escribir otra vez (mínimo el rebote de 1.2 s) */
  function waitFor(weekId) {
    var gap = lastSentAt(weekId) + LEAGUE_MIN_GAP_MS - Date.now();
    if (gap > LEAGUE_MIN_GAP_MS) gap = LEAGUE_MIN_GAP_MS;   /* reloj movido hacia atrás */
    return Math.max(PUSH_DEBOUNCE_MS, gap);
  }

  /* Escritura con rebote: espera al menos 1.2 s (para no escribir en cada
     ejercicio) y, si la última escritura fue hace < 31 s, lo que falte.
     Si la regla la rechaza (otro dispositivo escribió hace poco, o la cuenta
     no está en la allowlist), reintenta UNA vez pasado el intervalo; si
     vuelve a fallar, deja de intentar en esta página (la liga simulada y el
     progreso local siguen igual). */
  var failures = 0;
  function pushScore(weekId, xp) {
    if (!signedIn() || !weekId || failures >= 2) return;
    clearTimeout(pushTimer);
    var alias = aliasOf();
    pushTimer = setTimeout(function () {
      if (!currentUser) return;
      var send = clampForRules(weekId, xp);
      currentUser.getIdToken().then(function (token) {
        fetch(base() + ":commit", {
          method: "POST",
          headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
          body: JSON.stringify({ writes: [writeOf(weekId, currentUser.uid, alias, send)] })
        }).then(function (res) {
          if (!res.ok) {
            failures++;
            try { localStorage.setItem(sentAtKey(weekId), String(Date.now())); } catch (e) {}
            pushScore(weekId, xp);   /* espera el intervalo completo y prueba otra vez */
            return;
          }
          failures = 0;
          try {
            localStorage.setItem(sentKey(weekId), String(send));
            localStorage.setItem(sentAtKey(weekId), String(Date.now()));
          } catch (e) {}
          if (send < Math.min(Math.round(xp || 0), LEAGUE_WEEK_MAX)) pushScore(weekId, xp);
        }).catch(function () { /* nunca bloquees el progreso local por un fallo de red */ });
      }).catch(function () {});
    }, waitFor(weekId));
  }

  /* Tabla de la semana: Firestore la devuelve ya ORDENADA por xp (de mayor a
     menor) y luego corta en 100, así que con más de 100 jugadores llegan los
     100 primeros y no 100 cualesquiera. No hace falta crear un índice (la base
     es edición Enterprise; comprobado en vivo el 2026-11-04 con runQuery).
     El sort de abajo queda como red. Marca tu fila por uid.
     Resuelve null si no hay sesión, falta la regla (403) o hay error.
     Se lee con runQuery sobre leagues/{week} y NO con GET de la colección
     (listDocuments): con las reglas publicadas el 2026-10-28 ese GET responde
     403 aunque la regla permita leer, mientras que runQuery con la misma
     sesión responde 200 (comprobado en producción). */
  function fetchBoard(weekId) {
    if (!signedIn() || !weekId) return Promise.resolve(null);
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/leagues/" + encodeURIComponent(weekId) + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: "members" }],
          orderBy: [{ field: { fieldPath: "xp" }, direction: "DESCENDING" }],
          limit: 100
        } })
      })
        .then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(function (j) {
            var docs = (j || []).filter(function (x) { return x && x.document; })
                                .map(function (x) { return x.document; });
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
  return { available: available, signedIn: signedIn, aliasOf: aliasOf, pushScore: pushScore, fetchBoard: fetchBoard,
           aliasProblem: aliasProblem };
})();
