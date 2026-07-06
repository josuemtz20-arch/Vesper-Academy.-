/* ============================================================
   VESPER ACADEMY — Control de acceso del sitio
   ------------------------------------------------------------
   Cómo funciona:
   - Las páginas protegidas cargan este script en su <head>.
   - Si el visitante no tiene sesión iniciada (Firebase Auth),
     se le redirige a login.html.
   - Registrarse NO da acceso: el correo debe estar AUTORIZADO.
     La autorización se consulta en Firestore (allowlist en
     students/ o teachers/) con el idToken del propio usuario —
     la MISMA fuente de verdad que ya protege manuales y libros.
     Para dar acceso a alguien basta con añadirlo a esa allowlist
     (un comando de _scripts/upload_manuals.py): tiene efecto
     INMEDIATO y ya NO hace falta editar este archivo ni desplegar.
   - El admin (adminEmail) entra siempre.
   - approvedEmailHashes queda como RESPALDO legado: si Firestore
     no responde se usa esta lista de hashes SHA-256. Puede vaciarse
     cuando todos estén migrados a la allowlist de Firestore.
   - Las páginas de publicPages no requieren sesión.
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
      "vesper_landing.html",
      "vesper_promo.html",
      "vesper_web.html"
    ],
    /* SHA-256 de ("vesper-academy-v1|" + correo en minúsculas).
       Añade una línea por persona autorizada. */
    approvedEmailHashes: [
      "1181f429e6707d5b37cec24a77203cf30374fa337062d3f5d8c0abfe50b99dc9",  /* admin */
      "f77b653bf19243e8d70722a5e50ea3e86d4347ddc489224e083439e2137714bc"   /* profesora 1 */
    ],
    salt: "vesper-academy-v1|",
    /* Mapa de accesos al portal de profesores: contraseña INDIVIDUAL por maestro.
       Clave  = SHA-256("vesper-academy-v1|" + correo en minúsculas).
       Valor  = SHA-256("vesper-academy-v1|teacher|" + contraseña del maestro).
       Genera ambos hashes en access_admin.html → "Añadir / editar maestro".
       Para revocar a un maestro: borra su línea. */
    teachers: {
      "1181f429e6707d5b37cec24a77203cf30374fa337062d3f5d8c0abfe50b99dc9": "2c4227a42e5c7f6131a34e68e31cd6f9b78b2140ad789c7485e5d1ff76145ab1",  /* admin */
      "f77b653bf19243e8d70722a5e50ea3e86d4347ddc489224e083439e2137714bc": "fe28e97393299e8fcf7322f6e02bdf91cc915ccd24007fd0c8f99b26e4288a00"   /* profesora 1 */
    },
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

  function teacherHash(password) {
    return sha256Hex(CONFIG.salt + "teacher|" + String(password));
  }

  /* Acceso al portal de profesores: correo + contraseña individual. */
  function verifyTeacherLogin(email, password) {
    return Promise.all([
      emailHash(email),
      teacherHash(password)
    ]).then(function (r) {
      var stored = CONFIG.teachers[r[0]];
      return !!stored && stored === r[1];
    });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  var firebaseReady = null;
  function initFirebase() {
    if (!firebaseReady) {
      firebaseReady = loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js")
        .then(function () { return loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"); })
        .then(function () {
          if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase);
          return firebase.auth();
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
     que el admin creó con `add-student --level`: nivel (0=A0 … 5=C1+) y
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
  function isApprovedUser(user) {
    var email = String(user.email || "").trim().toLowerCase();
    if (email && email === String(CONFIG.adminEmail).trim().toLowerCase()) {
      return Promise.resolve(true);
    }
    var cacheKey = "vesper_ok|" + email;
    try { if (sessionStorage.getItem(cacheKey) === "1") return Promise.resolve(true); } catch (e) {}

    return isApprovedRemote(user).then(function (ok) {
      if (ok) {
        try { sessionStorage.setItem(cacheKey, "1"); } catch (e) {}
        return true;
      }
      return isApproved(email); /* respaldo legado */
    }).catch(function () {
      return isApproved(email); /* sin red hacia Firestore: usar respaldo */
    });
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

  /* API compartida para login.html y access_admin.html */
  window.VesperAuth = {
    config: CONFIG,
    isConfigured: isConfigured,
    initFirebase: initFirebase,
    emailHash: emailHash,
    isApproved: isApproved,
    isApprovedUser: isApprovedUser,
    isTeacher: isTeacher,
    teacherHash: teacherHash,
    verifyTeacherLogin: verifyTeacherLogin
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

  /* ── Puerta de acceso ── */
  if (isLocal || isPublic) return;

  if (!isConfigured) { showOpenAccessNotice(); return; }

  showSplash();
  var failSafe = setTimeout(reveal, REVEAL_MS);

  initFirebase().then(function (auth) {
    auth.onAuthStateChanged(function (user) {
      if (!user) { redirectToLogin(); return; }
      if (!user.emailVerified) { redirectToLogin("verify"); return; }
      isApprovedUser(user).then(function (ok) {
        if (ok) {
          reveal();
          addLogoutChip(user.email);
        } else {
          redirectToLogin("pending");
        }
      });
    });
  }).catch(function () {
    /* sin red hacia Firebase: mejor mostrar login que una página en blanco */
    redirectToLogin();
  });
})();
