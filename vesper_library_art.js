/* =====================================================================
 * VESPER · ARTE DE LA BIBLIOTECA DE AUDIO (2026-11-09)
 * ---------------------------------------------------------------------
 * Una lámina pintada por colección, para que la biblioteca deje de ser
 * "barras de audio" y cada nivel se vea como lo que es. Lo usan
 * audio_library.html (tarjetas + banda de la colección abierta) y
 * lesson.html (cabecera del reproductor), así la lección abre con la
 * MISMA escena que la tarjeta en la que el alumno hizo clic.
 *
 *   VesperLibArt.key(col)        "level:1" → "level_1" (null si no hay arte)
 *   VesperLibArt.card(col)       ruta 720 px (tarjeta)
 *   VesperLibArt.wide(col)       ruta 1376 px (banda y cabecera)
 *   VesperLibArt.line(col)       [inglés, español]: lo que Vesper escribe a mano
 *   VesperLibArt.colFromParams(URLSearchParams)   la colección de una lección
 *
 * Arte: niveles 1–6 = los mundos ilustrados del mapa (El Hogar … El
 * Castillo); Basics y las colecciones profesionales = escenas Higgsfield
 * (gpt_image_2_5, 21:9). Fuente y script: _scripts/audio_hub/.
 * Diagnóstico (solo profesor) no lleva lámina: se queda con su banda.
 * ===================================================================== */
window.VesperLibArt = (function () {
  "use strict";
  var BASE = "assets/images/library/";
  var KEYS = {
    "level:1": "level_1", "level:2": "level_2", "level:3": "level_3",
    "level:4": "level_4", "level:5": "level_5", "level:6": "level_6",
    "basics:1": "basics_1", "basics:2": "basics_2", "basics:3": "basics_3", "basics:4": "basics_4",
    "bizpath:b1": "bizpath_b1", "business": "business", "bizpath:c1": "bizpath_c1",
    "political": "political", "cert": "cert"
  };
  /* Vesper habla en inglés (el contenido) y la glosa va en español (la
     guía). Political va de usted, como todo ese curso. */
  var LINES = {
    "basics:1": ["One small word at a time.", "Una palabra a la vez."],
    "basics:2": ["Say what you do every day.", "Di lo que haces cada día."],
    "basics:3": ["Tell me where you've been.", "Cuéntame dónde has estado."],
    "basics:4": ["Now let's put it in writing.", "Ahora, a escribirlo."],
    "level:1": ["Listen first, then read along.", "Escucha primero y luego lee."],
    "level:2": ["Real people, real problems.", "Gente real, problemas reales."],
    "level:3": ["Listen for the argument.", "Escucha el argumento."],
    "level:4": ["Hear how a story is built.", "Escucha cómo se arma una historia."],
    "level:5": ["The future is talking. Listen.", "El futuro está hablando: escucha."],
    "level:6": ["Culture, in its own words.", "La cultura, con sus propias palabras."],
    "bizpath:b1": ["Sound clear at work.", "Suena claro en el trabajo."],
    "business": ["Listen like you're in the room.", "Escucha como si estuvieras en la junta."],
    "bizpath:c1": ["Now you lead the room.", "Ahora tú diriges la sala."],
    "political": ["Who is speaking? Listen closely.", "¿Quién habla? Escuche con atención."],
    "cert": ["Catch the trap before it catches you.", "Detecta la trampa antes de que te atrape."]
  };
  function key(col) { return KEYS[col] || null; }
  function card(col) { var k = key(col); return k ? BASE + k + "_sm.jpg" : null; }
  function wide(col) { var k = key(col); return k ? BASE + k + ".jpg" : null; }
  function line(col) { return LINES[col] || null; }
  /* La colección de una lección de lesson.html, sacada de su URL. */
  function colFromParams(p) {
    if (p.get("diag") !== null) return "diag";
    if (p.get("basics") !== null) return "basics:" + (parseInt(p.get("basics"), 10) || 1);
    var f = (p.get("audio") || "").split("/").pop();
    if (f) {
      if (/^corporate_b1_/.test(f)) return "bizpath:b1";
      if (/^corporate_c1_/.test(f)) return "bizpath:c1";
      if (/^corporate_b2_/.test(f)) return "business";
      if (/^political_/.test(f)) return "political";
      if (/^cert_prep_/.test(f)) return "cert";
      return null;
    }
    return "level:" + (parseInt(p.get("level") || "1", 10) || 1);
  }
  return { key: key, card: card, wide: wide, line: line, colFromParams: colFromParams };
})();
