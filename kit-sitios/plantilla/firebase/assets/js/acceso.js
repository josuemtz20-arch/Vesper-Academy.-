/* Control de acceso (Firebase Auth + allowlist en Firestore).
   - Las páginas protegidas cargan este script en <head> (después del SDK).
   - Sin sesión → login.html. Con sesión pero sin correo verificado o sin
     documento miembros/{correo} → login.html?estado=sin-acceso.
   - ESTO ES SOLO LA PUERTA DE LA INTERFAZ. El código es público: la seguridad
     real son las reglas de firestore.rules. Nunca pongas datos privados en el
     HTML; cárgalos de Firestore, donde las reglas deciden.
   - La apiKey de Firebase web es pública a propósito; no es un secreto. */
(function () {
  "use strict";
  var CONFIG = {
    firebase: {
      apiKey: "{{FIREBASE_API_KEY}}",
      authDomain: "{{FIREBASE_PROJECT_ID}}.firebaseapp.com",
      projectId: "{{FIREBASE_PROJECT_ID}}",
      appId: "{{FIREBASE_APP_ID}}"
    },
    paginasPublicas: [{{PAGINAS_PUBLICAS}}],
    login: "login.html"
  };

  var configurado = CONFIG.firebase.apiKey.indexOf("PEGAR") !== 0;
  var pagina = (location.pathname.split("/").pop() || "index.html");
  var publica = CONFIG.paginasPublicas.indexOf(pagina) !== -1 || pagina === CONFIG.login;

  window.Acceso = {
    listo: null,
    usuario: null,
    salir: function () { return firebase.auth().signOut().then(function () { location.href = CONFIG.login; }); }
  };

  if (!configurado) {
    console.warn("[acceso] Firebase sin configurar: sitio ABIERTO. Pega la config en acceso.js.");
    window.Acceso.listo = Promise.resolve(null);
    return;
  }
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase);

  if (!publica) document.documentElement.style.visibility = "hidden";

  window.Acceso.listo = new Promise(function (resolve) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (publica) { window.Acceso.usuario = user; resolve(user); return; }
      if (!user) { location.replace(CONFIG.login + "?volver=" + encodeURIComponent(pagina)); return; }
      if (!user.emailVerified) { location.replace(CONFIG.login + "?estado=verifica"); return; }
      firebase.firestore().collection("miembros").doc(user.email.toLowerCase()).get()
        .then(function (doc) {
          if (!doc.exists) throw new Error("sin-acceso");
          window.Acceso.usuario = user;
          document.documentElement.style.visibility = "";
          resolve(user);
        })
        .catch(function () { location.replace(CONFIG.login + "?estado=sin-acceso"); });
    });
  });
})();
