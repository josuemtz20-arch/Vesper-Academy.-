/* ============================================================
   VESPER ACADEMY — Control de acceso del sitio
   ------------------------------------------------------------
   Cómo funciona:
   - Las páginas protegidas cargan este script en su <head>.
   - Si el visitante no tiene sesión iniciada (Firebase Auth),
     se le redirige a login.html.
   - Registrarse NO da acceso: el correo debe estar en la lista
     de aprobados (approvedEmailHashes). Los correos se guardan
     como hash SHA-256 para no exponerlos en el repositorio.
   - Genera el hash de un correo en access_admin.html.
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
      "vesper_landing.html",
      "vesper_promo.html",
      "vesper_web.html"
    ],
    /* SHA-256 de ("vesper-academy-v1|" + correo en minúsculas).
       Añade una línea por persona autorizada. */
    approvedEmailHashes: [
      "1181f429e6707d5b37cec24a77203cf30374fa337062d3f5d8c0abfe50b99dc9"  /* admin */
    ],
    salt: "vesper-academy-v1|",
    /* SHA-256 de ("vesper-academy-v1|teacher|" + contraseña).
       Capa extra para el portal de profesores (portal_profesores.html).
       Genera un hash nuevo en access_admin.html para cambiar la contraseña.
       Contraseña inicial: vesper-profes-2026  (cámbiala). */
    teacherPassHash: "5b68def981b072a1d2787e14b881f79bbd0d40fa5694ac2697de7dfe46950b66",
    /* Correos autorizados para el portal de profesores (mismo hash que approvedEmailHashes:
       SHA-256 de "vesper-academy-v1|" + correo en minúsculas). El acceso al portal exige
       correo de esta lista + la contraseña de profesor. Genera hashes en access_admin.html. */
    teacherEmailHashes: [
      "1181f429e6707d5b37cec24a77203cf30374fa337062d3f5d8c0abfe50b99dc9"  /* josuemtz20@gmail.com (admin) */
    ],
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

  function verifyTeacher(password) {
    return teacherHash(password).then(function (h) {
      return h === CONFIG.teacherPassHash;
    });
  }

  /* Acceso al portal de profesores: exige correo autorizado + contraseña correcta. */
  function verifyTeacherLogin(email, password) {
    return Promise.all([
      emailHash(email),
      teacherHash(password)
    ]).then(function (r) {
      var emailOk = (CONFIG.teacherEmailHashes || []).indexOf(r[0]) !== -1;
      var passOk = r[1] === CONFIG.teacherPassHash;
      return emailOk && passOk;
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
      d.style.cssText = "position:fixed;bottom:14px;right:14px;z-index:99999;background:#10243e;" +
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

  /* API compartida para login.html y access_admin.html */
  window.VesperAuth = {
    config: CONFIG,
    isConfigured: isConfigured,
    initFirebase: initFirebase,
    emailHash: emailHash,
    isApproved: isApproved,
    teacherHash: teacherHash,
    verifyTeacher: verifyTeacher,
    verifyTeacherLogin: verifyTeacherLogin
  };

  /* ── Puerta de acceso ── */
  if (isLocal || isPublic) return;

  if (!isConfigured) { showOpenAccessNotice(); return; }

  /* Oculta el contenido hasta confirmar la sesión (evita el parpadeo) */
  document.documentElement.style.visibility = "hidden";
  var failSafe = setTimeout(function () {
    document.documentElement.style.visibility = "";
  }, 12000); /* si Firebase no responde, no dejar la página en blanco */

  initFirebase().then(function (auth) {
    auth.onAuthStateChanged(function (user) {
      if (!user) { redirectToLogin(); return; }
      if (!user.emailVerified) { redirectToLogin("verify"); return; }
      isApproved(user.email).then(function (ok) {
        if (ok) {
          clearTimeout(failSafe);
          document.documentElement.style.visibility = "";
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
