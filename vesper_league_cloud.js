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
 *   uid()                  -> uid de la sesión ("" sin sesión)
 *   fetchPlacement()       -> Promise<{status,tier,div,week,last}> (ver abajo)
 *   pushScore(weekId, xp)  -> sube tu XP semanal (PATCH, con rebote)
 *   fetchBoard(weekId[, div]) -> Promise<[{uid,alias,xp,div,tier,rank,isMe}]|null>
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
          placeMem = null;
          /* una lectura por sesión (luego sale de sessionStorage): así el
             tier del chip del mapa ya es el de la nube */
          if (currentUser) fetchPlacement();
        });
      }).catch(function () { /* sin red a Firebase: queda solo simulado */ });
    } catch (e) {}
  }

  function signedIn() { return !!currentUser; }
  function uid() { return currentUser ? currentUser.uid : ""; }

  /* ---- colocación: league_place/{uid} (la escribe _scripts/league_admin.py) ----
     Resuelve { status, tier, div, week, last }:
       "ok"    200: la colocación de la nube.
       "none"  404: aún sin colocar -> bronce-1, tier 0 (lo que la regla acepta).
       "old"   403: las reglas nuevas no están publicadas -> lo de siempre
               (tabla global, escritura { alias, xp, ts }).
       "error" sin red o sin sesión: no se cachea; se reintenta la próxima vez.
     Se cachea en la sesión del navegador (sessionStorage, por uid y semana,
     3 h) para no gastar una lectura por página. */
  var PLACE_TTL = 3 * 3600000;
  var placeMem = null, placeInflight = null;
  function placeKey() { return "vesper_league_place:" + uid(); }
  function curWeek() {
    try { if (window.VESPER_LEAGUE && VESPER_LEAGUE.weekId) return VESPER_LEAGUE.weekId(); } catch (e) {}
    return "";
  }
  function placeFresh(c) {
    return !!c && c.uid === uid() && c.wk === curWeek() && (Date.now() - (c.at || 0)) < PLACE_TTL;
  }
  function cachedPlacement() {
    if (placeFresh(placeMem)) return placeMem.p;
    try {
      var c = JSON.parse(sessionStorage.getItem(placeKey()) || "null");
      if (placeFresh(c)) { placeMem = c; return c.p; }
    } catch (e) {}
    return null;
  }
  function storePlacement(p) {
    placeMem = { uid: uid(), wk: curWeek(), at: Date.now(), p: p };
    try { sessionStorage.setItem(placeKey(), JSON.stringify(placeMem)); } catch (e) {}
    /* vesper_league.js sincroniza el tier local con esto */
    try { window.dispatchEvent(new CustomEvent("vesper-league-place", { detail: p })); } catch (e) {}
  }
  function invalidatePlacement() {
    placeMem = null;
    try { sessionStorage.removeItem(placeKey()); } catch (e) {}
  }
  function intOf(v) { var n = parseInt((v || {}).integerValue, 10); return isNaN(n) ? null : n; }
  var NO_PLACE = { status: "none", tier: 0, div: "bronce-1", week: "", last: null };
  function readPlacement(doc) {
    var f = (doc && doc.fields) || {};
    var tier = intOf(f.tier), div = (f.div || {}).stringValue || "";
    /* 0..5 (Bronce..Soberana), igual que leagueDivOk en firestore.rules */
    if (tier == null || tier < 0 || tier > 5 || !div) return NO_PLACE;
    var last = null, lf = ((f.last || {}).mapValue || {}).fields;
    /* result "idle" = no jugó esa semana (league_admin.py): no hay nada que contar */
    var lres = lf ? (lf.result || {}).stringValue : "";
    if (lf && (lf.week || {}).stringValue && (lres === "up" || lres === "down" || lres === "stay")) {
      last = { week: lf.week.stringValue, rank: intOf(lf.rank),
               fromTier: intOf(lf.fromTier), result: lres };
    }
    return { status: "ok", tier: tier, div: div, week: (f.week || {}).stringValue || "", last: last };
  }
  function fetchPlacement() {
    if (!signedIn()) return Promise.resolve({ status: "error" });
    var c = cachedPlacement();
    if (c) return Promise.resolve(c);
    if (placeInflight) return placeInflight;
    var me = uid();
    placeInflight = currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/league_place/" + encodeURIComponent(me), {
        headers: { "Authorization": "Bearer " + token }
      }).then(function (r) {
        if (r.status === 200) return r.json().then(readPlacement);
        if (r.status === 404) return NO_PLACE;
        if (r.status === 403) return { status: "old" };
        return { status: "error" };
      });
    }).then(function (p) {
      placeInflight = null;
      if (p.status !== "error" && uid() === me) storePlacement(p);
      return p;
    }, function () { placeInflight = null; return { status: "error" }; });
    return placeInflight;
  }

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

  /* ---- codificación Firestore REST ---- */
  /* place: colocación leída con 200/404 -> también div y tier (la regla los
     compara con league_place/{uid}). Con 403 o sin leerla: la forma vieja. */
  function toFs(alias, xp, place) {
    var doc = { fields: {
      alias: { stringValue: String(alias || "") },
      xp: { integerValue: String(Math.max(0, Math.round(xp || 0))) },
      ts: { stringValue: new Date().toISOString() }
    } };
    if (place && (place.status === "ok" || place.status === "none")) {
      doc.fields.div = { stringValue: place.div };
      doc.fields.tier = { integerValue: String(place.tier) };
    }
    return doc;
  }
  function readDoc(doc) {
    var f = (doc && doc.fields) || {};
    var name = doc && doc.name ? ("" + doc.name) : "";
    var uid = name ? name.slice(name.lastIndexOf("/") + 1) : "";
    var alias = (f.alias || {}).stringValue || "";
    if (!alias || aliasProblem(alias)) alias = "Estudiante";
    return { uid: uid, alias: alias,
      xp: parseInt((f.xp || {}).integerValue || "0", 10),
      div: (f.div || {}).stringValue || "", tier: intOf(f.tier) };
  }

  /* Los mismos topes que firestore.rules (leagues/{week}/members): si se
     mandara más, la regla rechazaría la escritura entera y la tabla del
     alumno se quedaría congelada. Lo que no cabe en una escritura sube en
     la siguiente. */
  var LEAGUE_FIRST_MAX = 3000, LEAGUE_STEP = 600, LEAGUE_WEEK_MAX = 20000;
  function sentKey(weekId) { return "vesper_league_sent_" + weekId; }
  function lastSent(weekId) {
    try { var v = parseInt(localStorage.getItem(sentKey(weekId)) || "", 10); return isNaN(v) ? -1 : v; }
    catch (e) { return -1; }
  }
  function clampForRules(weekId, xp) {
    var last = lastSent(weekId);
    var cap = last < 0 ? LEAGUE_FIRST_MAX : last + LEAGUE_STEP;
    return Math.max(0, Math.min(Math.round(xp || 0), cap, LEAGUE_WEEK_MAX));
  }

  /* PATCH con rebote (~1.2s) para no escribir en cada ejercicio */
  function pushScore(weekId, xp, retried) {
    if (!signedIn() || !weekId) return;
    /* página aún en el registro de otra cuenta (vesper_cuenta.js): no subir su XP */
    if (window.VesperCuenta && VesperCuenta.ns() !== currentUser.uid) return;
    clearTimeout(pushTimer);
    var alias = aliasOf();
    pushTimer = setTimeout(function () {
      var send = clampForRules(weekId, xp);
      var me = currentUser;
      if (!me) return;
      fetchPlacement().then(function (place) {
        var withDiv = !!place && (place.status === "ok" || place.status === "none");
        return me.getIdToken().then(function (token) {
          return fetch(memberDoc(weekId, me.uid), {
            method: "PATCH",
            headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
            body: JSON.stringify(toFs(alias, send, place))
          });
        }).then(function (res) {
          if (!res.ok) {
            /* 403 con división: la colocación en caché quedó vieja (p. ej.
               league_admin.py cerró la semana o sembró). Se relee una vez. */
            if (res.status === 403 && withDiv && !retried) { invalidatePlacement(); pushScore(weekId, xp, true); }
            return;
          }
          try { localStorage.setItem(sentKey(weekId), String(send)); } catch (e) {}
          if (send < Math.min(Math.round(xp || 0), LEAGUE_WEEK_MAX)) pushScore(weekId, xp);
        });
      }).catch(function () { /* nunca bloquees el progreso local por un fallo de red */ });
    }, retried ? 0 : 1200);
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
  /* Con `div` (ligas reales, 2026-11-25): solo los miembros de esa división
     (filtro div == X, hasta 100, también por runQuery). Sin orderBy: una
     división cabe entera y se ordena aquí. Devuelve la división completa
     (sin el corte a 50 de la tabla global). */
  function fetchBoard(weekId, div) {
    if (!signedIn() || !weekId) return Promise.resolve(null);
    var q = div
      ? { from: [{ collectionId: "members" }],
          where: { fieldFilter: { field: { fieldPath: "div" }, op: "EQUAL", value: { stringValue: String(div) } } },
          limit: 100 }
      : { from: [{ collectionId: "members" }],
          orderBy: [{ field: { fieldPath: "xp" }, direction: "DESCENDING" }],
          limit: 100 };
    return currentUser.getIdToken().then(function (token) {
      return fetch(base() + "/leagues/" + encodeURIComponent(weekId) + ":runQuery", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ structuredQuery: q })
      })
        .then(function (r) {
          if (r.status !== 200) return null;
          return r.json().then(function (j) {
            var docs = (j || []).filter(function (x) { return x && x.document; })
                                .map(function (x) { return x.document; });
            var rows = docs.map(readDoc).filter(function (x) { return x.uid; });
            rows.sort(function (a, b) { return b.xp - a.xp; });
            if (!div) rows = rows.slice(0, 50);
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
  return { available: available, signedIn: signedIn, uid: uid, aliasOf: aliasOf, pushScore: pushScore,
           fetchBoard: fetchBoard, fetchPlacement: fetchPlacement, invalidatePlacement: invalidatePlacement,
           aliasProblem: aliasProblem };
})();
