/* ============================================================
   VESPER ACADEMY — Control de acceso del sitio
   ------------------------------------------------------------
   Cómo funciona:
   - Las páginas protegidas cargan este script en su <head>.
   - Si el visitante no tiene sesión iniciada (Firebase Auth),
     se le redirige a login.html.
   - Nivel gratis (2026-11-24, decisión de Josue): quien se registra y
     verifica su correo entra SOLA, sin aprobación, a las páginas de
     publicPages (app de lecciones, liga, perfil, tienda, onboarding,
     examen de nivel). Ver accessLevel():
       "enrolled" -> en la allowlist de Firestore (students/ o
                     teachers/) o admin: abre todo;
       "free"     -> sesión con correo verificado, sin allowlist: en las
                     páginas de pago ve la pantalla «Tu cuenta es
                     gratuita… inscríbete» (showEnrollScreen);
       "none"     -> sin sesión o sin verificar: va a login.html.
     Inscribir a alguien = añadirlo a la allowlist (un comando de
     _scripts/upload_manuals.py o school_admin.py): efecto INMEDIATO,
     sin editar este archivo ni desplegar.
     chat.html y entrevista.html siguen públicas: el Worker que paga la
     API no pide token, así que cerrarlas aquí no protegería el gasto (eso
     se haría en el Worker) y rompería la landing, el atajo de la TWA y
     el botón del gato en leccion.html.
   - El admin (adminEmail) entra siempre.
   - approvedEmailHashes queda como RESPALDO legado: si Firestore
     no responde se usa esta lista de hashes SHA-256. Puede vaciarse
     cuando todos estén migrados a la allowlist de Firestore.
   - Las páginas de publicPages no requieren sesión.
   - Áreas de profesor (portal_profesores.html, vesper_engine.html):
     además de lo anterior, VesperAuth.teacherAccess() exige el doc
     teachers/{correo} o roles/{correo}. Ya NO hay contraseña de
     profesor (se retiró el 2026-10-28: era un hash público
     comprobado en el navegador, sin valor de seguridad).
   - Todo esto es la PUERTA de la interfaz. La seguridad real son
     las reglas de Firestore (firestore.rules): el código de este
     archivo es público y cualquiera puede leerlo o saltárselo.
   - Mientras firebase no esté configurado (valores PEGAR_*),
     el sitio queda ABIERTO y muestra un aviso. Pega aquí la
     configuración de tu proyecto Firebase para activar el candado.
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = {
    firebase: {
      apiKey: "AIzaSyAsCJW97LyNpmvey1Mo0wiGMufQIV7uxio",
      authDomain: "vesper-academy.firebaseapp.com",
      projectId: "vesper-academy",
      storageBucket: "vesper-academy.firebasestorage.app",
      messagingSenderId: "22637551941",
      appId: "1:22637551941:web:7c0be59428b5087cd35e2c"
    },
    publicPages: [
      "index.html",
      "login.html",
      "access_admin.html",
      "book_placement.html",
      "leccion.html",
      "liga.html",
      "tienda.html",
      "onboarding.html",
      "perfil.html",
      "eliminar-cuenta.html",
      /* simulador de entrevista: público; solo carga este script si el
         alumno ya tiene sesión, para ofrecerle "Enviar a mi profesor" */
      "entrevista.html"
    ],
    /* SHA-256 de ("vesper-academy-v1|" + correo en minúsculas).
       Añade una línea por persona autorizada. */
    approvedEmailHashes: [
      "1181f429e6707d5b37cec24a77203cf30374fa337062d3f5d8c0abfe50b99dc9",  /* admin */
      "f77b653bf19243e8d70722a5e50ea3e86d4347ddc489224e083439e2137714bc"   /* profesora 1 */
    ],
    salt: "vesper-academy-v1|",
    /* (2026-10-28) Aquí vivía `teachers`: una contraseña de profesor por
       maestro, guardada como SHA-256 con sal pública en este archivo PÚBLICO
       y comprobada en el navegador. No protegía nada en el servidor y un
       SHA-256 plano se fuerza con diccionario en segundos, así que se
       eliminó. Ahora el portal de profesores y el Vesper Engine solo exigen
       la sesión de Firebase + el doc teachers/{correo} (o roles/{correo});
       ver teacherAccess() abajo. Los datos los siguen protegiendo las
       reglas de Firestore. */
    /* Base de Firestore donde vive la allowlist (debe coincidir con DB_ID en
       _scripts/upload_manuals.py y en manual.html / libro.html). */
    dbId: "teachermanuals",
    /* El administrador entra siempre, aunque no tenga doc en la allowlist. */
    adminEmail: "josuemtz20@gmail.com",
    loginPage: "login.html"
  };

  var page = decodeURIComponent((location.pathname.split("/").pop() || "index.html")) || "index.html";
  var isLocal = location.protocol === "file:" ||
                location.hostname === "localhost" || location.hostname === "127.0.0.1";
  var isConfigured = CONFIG.firebase.apiKey.indexOf("PEGAR_") === -1;
  var isPublic = CONFIG.publicPages.indexOf(page) !== -1;

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  function emailHash(email) {
    return sha256Hex(CONFIG.salt + String(email).trim().toLowerCase());
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  /* Lo personal que se borra del dispositivo al cerrar sesión: correo y uid
     del perfil, la conversación con la IA y el código Pro. En una tableta
     compartida, el siguiente alumno no lo ve. */
  var PERSONAL_KEYS = ["vesper_profile", "vesper_chat_history", "vesper_pro_code", "vesper_student_ok", "vesper_exam_pending"];
  function clearPersonalData() {
    for (var i = 0; i < PERSONAL_KEYS.length; i++) {
      try { localStorage.removeItem(PERSONAL_KEYS[i]); } catch (e) {}
    }
    try { sessionStorage.removeItem("vesper_chat_session"); } catch (e) {}
    /* la caché de isApprovedUser («sí» y «no», clave vesper_ok|correo) */
    try {
      for (var j = sessionStorage.length - 1; j >= 0; j--) {
        var k = sessionStorage.key(j);
        if (k && k.indexOf("vesper_ok|") === 0) sessionStorage.removeItem(k);
      }
    } catch (e) {}
    approvalInFlight = {};
  }

  var firebaseReady = null;
  function initFirebase() {
    if (!firebaseReady) {
      firebaseReady = loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js")
        .then(function () { return loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"); })
        .then(function () {
          if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase);
          var auth = firebase.auth();
          /* Hay tres botones de "Cerrar sesión" (perfil.html, el chip de esta
             puerta y el modal de vesper_sync.js) y todos usan esta misma
             instancia: se envuelve signOut() una vez y los tres limpian. */
          if (!auth.__vesperSignOut) {
            var plainSignOut = auth.signOut.bind(auth);
            auth.__vesperSignOut = true;
            auth.signOut = function () {
              /* Antes de salir, sube lo que vesper_cuenta.js aún no mandó a
                 la nube (Forja, repaso, gemas, libro), con un tope de 3 s
                 para que «Cerrar sesión» nunca se quede colgado sin red. */
              var C = window.VesperCuenta, pend = Promise.resolve();
              if (C && C.nube && C.nube.vaciar) {
                pend = Promise.race([
                  Promise.resolve(C.nube.vaciar("forzar")).catch(function () {}),
                  new Promise(function (r) { setTimeout(r, 3000); })
                ]);
              }
              return pend.then(function () {
                clearPersonalData();
                return plainSignOut();
              });
            };
          }
          /* Registro de progreso por cuenta (vesper_cuenta.js): cambia de
             registro cuando cambia la sesión. Su oyente se registra antes que
             los de vesper_sync.js y compañía, que reciben la instancia después. */
          if (window.VesperCuenta && VesperCuenta._conectar) VesperCuenta._conectar(auth, CONFIG.firebase.projectId, PERSONAL_KEYS);
          return auth;
        });
    }
    return firebaseReady;
  }

  function isApproved(email) {
    return emailHash(email).then(function (h) {
      return CONFIG.approvedEmailHashes.indexOf(h) !== -1;
    });
  }

  /* MI propio documento de una colección de la allowlist (o null si no
     existe). Las reglas de Firestore permiten a cada usuario leer su propio
     doc (students/ y teachers/). Mismo patrón REST que manual.html /
     libro.html. */
  function fsGetOwnDoc(token, collection, email) {
    var url = "https://firestore.googleapis.com/v1/projects/" +
              CONFIG.firebase.projectId + "/databases/" + CONFIG.dbId +
              "/documents/" + collection + "/" + encodeURIComponent(email);
    return fetch(url, { headers: { "Authorization": "Bearer " + token } })
      .then(function (r) { return r.status === 200 ? r.json() : null; });
  }

  function fsDocExists(token, collection, email) {
    return fsGetOwnDoc(token, collection, email).then(function (doc) { return !!doc; });
  }

  /* Siembra el perfil local (vesper_profile) desde el doc students/{correo}
     que el admin creó con `add-student --level`: nivel (0=Pre-A1 … 5=C1+) y
     nombre. Solo RELLENA lo vacío — nunca pisa lo que el alumno eligió. */
  function seedProfileFromStudentDoc(doc) {
    try {
      var f = (doc && doc.fields) || {};
      var p = JSON.parse(localStorage.getItem("vesper_profile") || "{}") || {};
      var changed = false;
      if (typeof p.level !== "number" && f.level) {
        var lv = parseInt(f.level.integerValue != null ? f.level.integerValue
                                                       : f.level.doubleValue, 10);
        if (!isNaN(lv) && lv >= 0 && lv <= 5) { p.level = lv; changed = true; }
      }
      if (!p.name && f.name && f.name.stringValue) {
        p.name = String(f.name.stringValue).slice(0, 60);
        changed = true;
      }
      /* sid y grupo los administra el admin (no son elección del alumno):
         se refrescan siempre. Los usa vesper_results.js para etiquetar cada
         intento sin exponer el correo del alumno a los profesores. */
      var sid = (f.sid && f.sid.stringValue) || "";
      var grp = (f.group && f.group.stringValue) || "";
      if (sid && p.sid !== sid) { p.sid = sid; changed = true; }
      if (p.group !== grp) { p.group = grp; changed = true; }
      /* matrícula: la asigna portal_escuela.html; se ve en mi_boleta.html */
      var mat = (f.matricula && f.matricula.stringValue) || "";
      if ((p.matricula || "") !== mat) { p.matricula = mat; changed = true; }
      if (changed) localStorage.setItem("vesper_profile", JSON.stringify(p));
    } catch (e) {}
  }

  /* Aprobado si su correo está en students/ o teachers/ de Firestore. */
  function isApprovedRemote(user) {
    var email = String(user.email || "").trim().toLowerCase();
    return user.getIdToken().then(function (token) {
      return fsGetOwnDoc(token, "students", email).then(function (doc) {
        if (doc) { seedProfileFromStudentDoc(doc); return true; }
        return fsDocExists(token, "teachers", email);
      });
    });
  }

  /* Aprobación final (la usan la puerta y login.html):
       1) el admin entra siempre;
       2) allowlist en Firestore  -> fuente de verdad, efecto inmediato;
       3) respaldo: lista de hashes legada (si Firestore no responde).
     Cachea el "sí" en sessionStorage para no repetir la consulta al navegar. */
  /* Publica QUIÉN ha entrado, para el resto de la app. Hoy lo usa
     vesper_cosmetics.js: al admin le abre el guardarropa entero para que pueda
     probar los 6 pelajes y los 7 accesorios sin completar 100 lecciones.
     Se refleja en sessionStorage porque vesper_cosmetics.js se evalúa ANTES de
     que Firebase resuelva la sesión: en la primera carga el dato llega por el
     evento, y en las siguientes ya está disponible de forma síncrona.
     No es una barrera de seguridad y no pretende serlo: es cosmético, y el
     acceso real al contenido lo gobiernan las reglas de Firestore. */
  function publishIdentity(user) {
    var email = String(user.email || "").trim().toLowerCase();
    var admin = !!email && email === String(CONFIG.adminEmail).trim().toLowerCase();
    window.VESPER_AUTH = { email: email, isAdmin: admin };
    try { sessionStorage.setItem("vesper_is_admin", admin ? "1" : "0"); } catch (e) {}
    try {
      window.dispatchEvent(new CustomEvent("vesper:auth", { detail: { email: email, isAdmin: admin } }));
    } catch (e) {}
  }
  function forgetIdentity() {
    window.VESPER_AUTH = null;
    try { sessionStorage.removeItem("vesper_is_admin"); } catch (e) {}
  }

  function isApprovedUser(user) {
    var email = String(user.email || "").trim().toLowerCase();
    if (email && email === String(CONFIG.adminEmail).trim().toLowerCase()) {
      return Promise.resolve(true);
    }
    var cacheKey = "vesper_ok|" + email;
    try {
      var c = sessionStorage.getItem(cacheKey);
      if (c === "1") return Promise.resolve(true);
      /* el «no» también se cachea, 5 min (2026-11-25): una cuenta gratuita
         hacía 2-4 lecturas 404 por página (puerta + barra). Se guarda solo
         si Firestore contestó; sin red no se cachea nada. Al inscribirla,
         entra a más tardar en 5 min o al cerrar e iniciar sesión. */
      var m = /^0\|(\d+)$/.exec(c || "");
      if (m && Date.now() - parseInt(m[1], 10) < NO_CACHE_MS) return Promise.resolve(false);
    } catch (e) {}
    /* una sola consulta por página aunque la pidan la puerta y vesper_nav.js */
    if (approvalInFlight[email]) return approvalInFlight[email];

    var p = isApprovedRemote(user).then(function (ok) {
      if (ok) {
        try { sessionStorage.setItem(cacheKey, "1"); } catch (e) {}
        return true;
      }
      return isApproved(email).then(function (legacy) { /* respaldo legado */
        if (!legacy) { try { sessionStorage.setItem(cacheKey, "0|" + Date.now()); } catch (e) {} }
        return legacy;
      });
    }).catch(function () {
      return isApproved(email); /* sin red hacia Firestore: usar respaldo */
    });
    approvalInFlight[email] = p;
    return p;
  }
  var NO_CACHE_MS = 5 * 60 * 1000;
  var approvalInFlight = {};

  /* Nivel de acceso de una sesión (ver la cabecera):
       "none"     -> sin usuario o con el correo sin verificar;
       "enrolled" -> admin, students/{correo} o teachers/{correo};
       "free"     -> todo lo demás (cuenta gratuita).
     Sin red hacia Firestore, isApprovedUser cae a la lista legada, así que un
     inscrito sin conexión puede salir "free": la pantalla de inscripción lo
     dice («¿Ya te inscribiste?»). Decide solo la PANTALLA. Libros, exámenes,
     manuales y boletas los protegen además las reglas de Firestore (no
     cambian con esto). OJO, riesgo conocido y previo: audio_library.html y
     lesson.html solo las cuida esta interfaz; sus mp3 y datos son archivos
     estáticos y públicos en git, así que quien tenga la URL los abre igual. */
  function accessLevel(user) {
    if (!user || !user.emailVerified) return Promise.resolve("none");
    return isApprovedUser(user).then(function (ok) { return ok ? "enrolled" : "free"; },
                                     function () { return "free"; });
  }

  function onDomReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else { fn(); }
  }

  function showOpenAccessNotice() {
    onDomReady(function () {
      var d = document.createElement("div");
      d.style.cssText = "position:fixed;bottom:0;left:0;right:0;z-index:99999;" +
        "background:#7a1f1f;color:#fff;font:14px/1.4 sans-serif;padding:10px 16px;text-align:center;";
      d.innerHTML = "&#128275; Acceso abierto: el control de acceso a&uacute;n no est&aacute; activado " +
        "(falta conectar Firebase en vesper_auth.js). " +
        "<button style='margin-left:10px;cursor:pointer'>Cerrar</button>";
      d.querySelector("button").onclick = function () { d.remove(); };
      document.body.appendChild(d);
    });
  }

  function addLogoutChip(email) {
    onDomReady(function () {
      var d = document.createElement("div");
      d.className = "vsp-logout-chip";
      d.style.cssText = "position:fixed;bottom:14px;right:14px;z-index:99999;background:#15152b;" +
        "color:#f5efe2;font:12px/1 sans-serif;padding:8px 12px;border-radius:20px;opacity:.85;" +
        "box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;";
      d.title = email;
      d.textContent = "Cerrar sesión";
      d.onclick = function () {
        /* va a login.html: que vesper_cuenta.js no recargue esta página encima */
        if (window.VesperCuenta && VesperCuenta.saliendo) VesperCuenta.saliendo();
        firebase.auth().signOut().then(function () { location.href = CONFIG.loginPage; });
      };
      document.body.appendChild(d);
    });
  }

  function redirectToLogin(reason) {
    var next = page + (location.search || "");
    var url = CONFIG.loginPage + "?" + (reason ? reason + "=1&" : "") +
              "next=" + encodeURIComponent(next);
    location.replace(url);
  }

  /* ¿El usuario con sesión es profesor o admin? El admin entra siempre; el
     resto debe tener su doc en teachers/{correo en minúsculas} (misma
     allowlist que ya gobierna manuales). Solo lectura; resuelve bool.
     La usa el panel de calificaciones (portal_calificaciones.html). */
  function isTeacher(user) {
    if (!user) return Promise.resolve(false);
    var email = String(user.email || "").trim().toLowerCase();
    if (email && email === String(CONFIG.adminEmail).trim().toLowerCase()) {
      return Promise.resolve(true);
    }
    return user.getIdToken().then(function (token) {
      return fsDocExists(token, "teachers", email);
    }).catch(function () { return false; });
  }

  /* ¿Existe MI doc en `collection`? true (200) / false (404 o 403) y lanza
     error con cualquier otro estado o sin red, para distinguir "no eres" de
     "no se pudo comprobar". */
  function ownDocStatus(token, collection, email) {
    var url = "https://firestore.googleapis.com/v1/projects/" +
              CONFIG.firebase.projectId + "/databases/" + CONFIG.dbId +
              "/documents/" + collection + "/" + encodeURIComponent(email);
    return fetch(url, { headers: { "Authorization": "Bearer " + token } })
      .then(function (r) {
        if (r.status === 200) return true;
        if (r.status === 404 || r.status === 403) return false;
        throw new Error("HTTP " + r.status);
      });
  }

  /* Puerta de las áreas de profesor (portal_profesores.html,
     vesper_engine.html). Sustituye a la antigua contraseña de profesor.
     Resuelve:
       "ok"      -> admin, doc teachers/{correo} o cualquier roles/{correo}
                    (coordinación también usa el portal);
       "denied"  -> sesión verificada pero sin esos docs (p. ej. un alumno);
       "offline" -> no se pudo comprobar (sin red a Firestore).
     En localhost / file:// / sin configurar resuelve "ok", igual que la
     puerta general (dormida en desarrollo).
     OJO: esto decide solo qué PANTALLA se ve. Manuales, roster, boletas y
     resultados los protegen las reglas de Firestore con el mismo criterio,
     así que por eso la página degrada abierta ("offline") sin riesgo. */
  function teacherAccess() {
    if (isLocal || !isConfigured) return Promise.resolve("ok");
    return initFirebase().then(function (auth) {
      return new Promise(function (resolve) {
        var seen = false, off = null;
        off = auth.onAuthStateChanged(function (user) {
          if (seen) return;
          seen = true;
          if (off) off();
          if (!user || !user.emailVerified) { resolve("denied"); return; }
          var email = String(user.email || "").trim().toLowerCase();
          if (email && email === String(CONFIG.adminEmail).trim().toLowerCase()) {
            resolve("ok"); return;
          }
          user.getIdToken().then(function (token) {
            return ownDocStatus(token, "teachers", email).then(function (t) {
              return t || ownDocStatus(token, "roles", email);
            });
          }).then(function (ok) { resolve(ok ? "ok" : "denied"); },
                  function () { resolve("offline"); });
        });
      });
    }).catch(function () { return "offline"; });
  }

  /* API compartida para login.html, access_admin.html y las áreas de
     profesor. (teacherHash / verifyTeacherLogin se retiraron el 2026-10-28:
     usa teacherAccess().) */
  window.VesperAuth = {
    config: CONFIG,
    isConfigured: isConfigured,
    initFirebase: initFirebase,
    emailHash: emailHash,
    isApproved: isApproved,
    isApprovedUser: isApprovedUser,
    accessLevel: accessLevel,
    isTeacher: isTeacher,
    teacherAccess: teacherAccess
  };

  /* ── Esqueleto de carga ──
     En vez de ocultar TODO el documento (pantalla en blanco hasta que Firebase
     + Firestore respondan, antes hasta 12 s), oscurecemos solo el contenido
     protegido y mostramos la marca + un spinner. El splash se monta en
     <html> (no en <body>, que aún no existe cuando corre este <head> script)
     para pintarse cuanto antes. Filosofía fail-open intacta: si el backend
     tarda más de REVEAL_MS, revelamos igualmente (mejor contenido que blanco). */
  var REVEAL_MS = 6000;
  var splashEl = null;

  function injectGateStyles() {
    if (document.getElementById("vsp-gate-style")) return;
    var css = document.createElement("style");
    css.id = "vsp-gate-style";
    css.textContent =
      "html.vsp-gating body{visibility:hidden!important}" +
      "#vsp-splash{position:fixed;inset:0;z-index:2147483647;visibility:visible!important;" +
        "display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;" +
        "background:#1B1B2F;color:#f5f2eb;" +
        "font-family:'Inter',system-ui,-apple-system,Segoe UI,sans-serif;" +
        "transition:opacity .35s ease}" +
      "#vsp-splash.vsp-hide{opacity:0;pointer-events:none}" +
      "#vsp-splash img{width:60px;height:60px;object-fit:contain}" +
      "#vsp-splash .vsp-ring{width:32px;height:32px;border-radius:50%;" +
        "border:3px solid rgba(197,160,89,.25);border-top-color:#c5a059;" +
        "animation:vsp-spin .8s linear infinite}" +
      "#vsp-splash .vsp-msg{font-size:.9rem;letter-spacing:.04em;color:rgba(245,242,235,.72)}" +
      "@keyframes vsp-spin{to{transform:rotate(360deg)}}" +
      "@media (prefers-reduced-motion:reduce){" +
        "#vsp-splash{transition:none}" +
        "#vsp-splash .vsp-ring{animation:none;border-top-color:rgba(197,160,89,.55)}}";
    (document.head || document.documentElement).appendChild(css);
  }

  function showSplash() {
    if (splashEl) return;
    injectGateStyles();
    document.documentElement.classList.add("vsp-gating");
    splashEl = document.createElement("div");
    splashEl.id = "vsp-splash";
    splashEl.setAttribute("role", "status");
    splashEl.setAttribute("aria-live", "polite");
    splashEl.innerHTML =
      '<img src="assets/images/vesper_logo_inverted.png" alt="Vesper Academy">' +
      '<div class="vsp-ring" aria-hidden="true"></div>' +
      '<div class="vsp-msg">Cargando tu campus&hellip;</div>';
    document.documentElement.appendChild(splashEl);
  }

  function reveal() {
    clearTimeout(failSafe);
    document.documentElement.classList.remove("vsp-gating");
    if (splashEl) {
      var s = splashEl; splashEl = null;
      s.classList.add("vsp-hide");
      setTimeout(function () { if (s && s.parentNode) s.parentNode.removeChild(s); }, 400);
    }
  }

  /* ── Pantalla «Tu cuenta es gratuita» (2026-11-24) ──
     La ve una cuenta "free" en una página de pago, en vez del antiguo
     login.html?pending=1 («espera la aprobación»). Tapa la página entera (el
     body sigue oculto con vsp-gating, así que nada de pago se pinta) y ofrece
     la app de lecciones, los planes y el WhatsApp que ya usa index.html. En
     modo app, vesper_app_mode.js oculta solos los enlaces a planes.html y a
     wa.me (CSS + MutationObserver), sin que haya que pedirlo aquí. */
  var ENROLL_WHAT = {
    "libro.html": "este libro",
    "exam.html": "este examen",
    "mi_boleta.html": "tu boleta",
    "materiales.html": "tus materiales de alumno",
    "audio_library.html": "la biblioteca de audio",
    "lesson.html": "esta lección de audio"
  };
  var WHATSAPP = "https://wa.me/525535699899?text=Hola%2C%20vengo%20de%20vesperacademy.com%20y%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20ingl%C3%A9s.";

  function injectEnrollStyles() {
    if (document.getElementById("vsp-enroll-style")) return;
    var css = document.createElement("style");
    css.id = "vsp-enroll-style";
    css.textContent =
      "#vsp-enroll{position:fixed;inset:0;z-index:2147483647;visibility:visible!important;overflow-y:auto;" +
        "display:flex;align-items:center;justify-content:center;padding:24px 16px;" +
        "background:radial-gradient(700px 380px at 80% -10%,rgba(201,168,76,.18),transparent 60%)," +
          "linear-gradient(160deg,#1f2342,#14122a 70%);color:#f5f2eb;" +
        "font-family:'Inter',system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.5}" +
      "#vsp-enroll .ve-card{width:100%;max-width:420px;text-align:center;padding:30px 24px 24px;" +
        "border:1px solid rgba(201,168,76,.35);border-radius:20px;background:rgba(20,18,42,.72);" +
        "box-shadow:0 20px 50px rgba(0,0,0,.35)}" +
      "#vsp-enroll img{width:112px;height:112px;object-fit:contain;display:block;margin:0 auto 6px}" +
      "#vsp-enroll .ve-k{margin:0 0 6px;font-size:.72rem;font-weight:700;letter-spacing:.22em;" +
        "text-transform:uppercase;color:#f3e2ab}" +
      "#vsp-enroll h1{margin:0 0 8px;font-family:'Inria Serif',Georgia,serif;font-weight:700;" +
        "font-size:1.6rem;line-height:1.2;color:#fff}" +
      "#vsp-enroll .ve-d{margin:0 0 20px;font-size:.98rem;color:rgba(245,242,235,.86)}" +
      "#vsp-enroll .ve-b{display:grid;gap:10px}" +
      "#vsp-enroll a.ve-go,#vsp-enroll a.ve-alt{display:flex;align-items:center;justify-content:center;" +
        "min-height:48px;padding:12px 18px;border-radius:12px;font-weight:700;font-size:.95rem;text-decoration:none}" +
      "#vsp-enroll a.ve-go{background:#C9A84C;color:#1B1B2F}" +
      "#vsp-enroll a.ve-go:hover,#vsp-enroll a.ve-go:focus-visible{background:#f3e2ab}" +
      "#vsp-enroll a.ve-alt{border:1px solid rgba(245,242,235,.28);color:#f5f2eb}" +
      "#vsp-enroll a.ve-alt:hover,#vsp-enroll a.ve-alt:focus-visible{border-color:#C9A84C;color:#f3e2ab}" +
      "#vsp-enroll a:focus-visible,#vsp-enroll button:focus-visible{outline:2px solid #f3e2ab;outline-offset:2px}" +
      "#vsp-enroll .ve-f{margin:18px 0 0;font-size:.82rem;color:rgba(245,242,235,.62)}" +
      "#vsp-enroll .ve-out{background:none;border:0;padding:6px 4px;min-height:44px;font:inherit;" +
        "color:rgba(245,242,235,.78);text-decoration:underline;text-underline-offset:3px;cursor:pointer}" +
      "#vsp-enroll .ve-out:hover{color:#f3e2ab}";
    (document.head || document.documentElement).appendChild(css);
  }

  function showEnrollScreen(auth) {
    clearTimeout(failSafe);
    injectGateStyles();
    injectEnrollStyles();
    document.documentElement.classList.add("vsp-gating");
    if (splashEl && splashEl.parentNode) splashEl.parentNode.removeChild(splashEl);
    splashEl = null;
    if (document.getElementById("vsp-enroll")) return;
    var what = ENROLL_WHAT[page] || "esta sección";
    var box = document.createElement("div");
    box.id = "vsp-enroll";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "vsp-enroll-t");
    box.innerHTML =
      '<div class="ve-card">' +
        '<img src="assets/images/mascot/vesper_cat_welcome.webp" alt="" width="112" height="112">' +
        '<p class="ve-k" lang="en">Students only</p>' +
        '<h1 id="vsp-enroll-t">Tu cuenta es gratuita</h1>' +
        '<p class="ve-d">Para abrir ' + what + ', inscr&iacute;bete. Mientras, la app de lecciones, ' +
          'la liga y el examen de nivel son tuyos sin costo.</p>' +
        '<div class="ve-b">' +
          '<a class="ve-go" href="leccion.html">Practicar en la app de lecciones</a>' +
          '<a class="ve-alt" href="planes.html">Ver planes y precios</a>' +
          '<a class="ve-alt" href="' + WHATSAPP + '" target="_blank" rel="noopener">Escr&iacute;benos por WhatsApp</a>' +
        '</div>' +
        '<p class="ve-f">&iquest;Ya te inscribiste? Recarga la p&aacute;gina en unos minutos.<br>' +
          '<button type="button" class="ve-out">Usar otra cuenta</button></p>' +
      '</div>';
    document.documentElement.appendChild(box);
    box.querySelector(".ve-out").onclick = function () {
      if (window.VesperCuenta && VesperCuenta.saliendo) VesperCuenta.saliendo();
      Promise.resolve(auth && auth.signOut()).then(function () { location.href = CONFIG.loginPage; },
                                                  function () { location.href = CONFIG.loginPage; });
    };
    try { box.querySelector(".ve-go").focus(); } catch (e) {}
  }

  /* ── Puerta de acceso ── */
  if (isLocal || isPublic) return;

  if (!isConfigured) { showOpenAccessNotice(); return; }

  showSplash();
  var failSafe = setTimeout(reveal, REVEAL_MS);

  initFirebase().then(function (auth) {
    auth.onAuthStateChanged(function (user) {
      if (!user) { forgetIdentity(); redirectToLogin(); return; }
      if (!user.emailVerified) { redirectToLogin("verify"); return; }
      publishIdentity(user);
      accessLevel(user).then(function (level) {
        if (level === "enrolled") {
          reveal();
          addLogoutChip(user.email);
        } else {
          /* cuenta gratuita en una página de pago: ya no se manda a
             login.html?pending=1, se le explica aquí mismo */
          showEnrollScreen(auth);
        }
      });
    });
  }).catch(function () {
    /* sin red hacia Firebase: mejor mostrar login que una página en blanco */
    redirectToLogin();
  });
})();
