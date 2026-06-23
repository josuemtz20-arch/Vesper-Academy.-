/* ============================================================
 * vesper_opticons.js — Iconos SVG por OPCIÓN de Configuración.
 *
 * Da una imagen reconocible a cada opción (tono, estilo, idioma, ritmo,
 * corrección, enfoque, temas, nivel, meta, tamaño de texto) sin usar emojis.
 * Iconos de línea (currentColor, 24x24) coherentes con vesper_icons.js.
 *
 * window.VESPER_OPT.get(id) -> SVG string | "" (si no hay icono para ese id)
 * ============================================================ */
window.VESPER_OPT = (function () {
  function L(d, w) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.7)
      + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  function F(d) { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + d + '</svg>'; }
  function A(size) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="18" text-anchor="middle" '
      + 'font-family="Inria Serif,Georgia,serif" font-weight="700" font-size="' + size + '" fill="currentColor">A</text></svg>';
  }

  var briefcase = '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3.5 12.5h17"/>';
  var bubble2 = '<path d="M4 5h11v8H9l-3 3v-3H4z"/><path d="M17 9h3v8l-3-3h-5"/>';
  var palette = '<path d="M12 3.5c4.7 0 8.5 3.4 8.5 7.5 0 2.5-2 4-4.2 4h-1.6c-1 0-1.7.8-1.7 1.7 0 .4.2.8.4 1.1.3.4.5.8.5 1.2 0 .9-.8 1.5-1.9 1.5C7.3 21.5 3.5 17 3.5 11.5S7.3 3.5 12 3.5z"/><circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/>';
  var mic = '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5M9 20.5h6"/>';
  var compass = '<circle cx="12" cy="12" r="8.4"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none"/>';
  var sliders = '<path d="M5 6h9M17 6h2M5 12h2M10 12h9M5 18h11M19 18h0"/><circle cx="15.5" cy="6" r="1.8"/><circle cx="8.5" cy="12" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>';
  var book = '<path d="M12 6.5C10.5 5 8 4.5 4.5 4.8v12.4C8 17 10.5 17.5 12 19M12 6.5C13.5 5 16 4.5 19.5 4.8v12.4C16 17 13.5 17.5 12 19M12 6.5V19"/>';

  var MAP = {
    /* tonos */
    friendly: L('<circle cx="12" cy="12" r="8.5"/><path d="M8.8 14.2c.8.9 1.9 1.4 3.2 1.4s2.4-.5 3.2-1.4"/><circle cx="9.2" cy="10" r=".7" fill="currentColor"/><circle cx="14.8" cy="10" r=".7" fill="currentColor"/>'),
    professional: L(briefcase),
    motivating: F('<path d="M13 2c.4 2.9-1.1 4.4-2.6 5.9C9 9.3 8 10.9 8 13a4.5 4.5 0 0 0 9 0c0-1.4-.5-2.6-1.3-3.6-.3.9-1 1.5-1.9 1.7 1-2.3.3-4.9-1.8-7.1z"/>'),
    fun: L('<path d="M12 14.3c2.7 0 4.7-2.4 4.7-5.4S14.7 3.6 12 3.6 7.3 5.9 7.3 8.9s2 5.4 4.7 5.4z"/><path d="M12 14.3v2.4M12 16.7l-1.3 1.3M12 16.7l1.3 1.3"/>'),
    strict: L('<rect x="3" y="8.5" width="18" height="7" rx="1.5"/><path d="M7 8.5v2.4M11 8.5v3.2M15 8.5v2.4"/>'),
    socratic: L('<path d="M5 5h14v9H9l-3 3v-3H5z"/><path d="M10 8.4a2 2 0 0 1 3.7 1.1c0 1.3-1.7 1.6-1.7 2.6"/><circle cx="12" cy="13.4" r=".5" fill="currentColor"/>'),
    zen: L('<path d="M4 20C4 11 10 4.5 20 4c.6 9-5 16-14 16-.8 0-1.5-.1-2-.2z"/><path d="M8.5 15.5c2.5-2.5 5-4 8-5.5"/>'),
    /* estilos de enseñanza */
    stepbystep: L('<path d="M4 19h4v-4h4v-4h4V7h4"/>'),
    immersive: L('<path d="M3 8c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0M3 13c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0M3 18c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0"/>'),
    conversational: L(bubble2),
    errorbased: L('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.6-4.6"/>'),
    /* mezcla de idioma */
    en: L('<path d="M5 5.5h14v9h-8l-3.5 3.5V14.5H5z"/><path d="M9.6 12.5 12 7l2.4 5.5M10.3 11h3.4" stroke-width="1.4"/>'),
    en_es: L('<path d="M3.5 5h10v6.5H8L5 14.5V11.5H3.5z"/><path d="M11.5 9.5h9v6.5H17l-3 3V16h-2.5z"/>'),
    bilingual: L('<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8M12 3.6c2.6 2.5 2.6 14.7 0 16.8M12 3.6c-2.6 2.5-2.6 14.7 0 16.8"/>'),
    /* ritmo */
    slow: L('<path d="M7 4h10M7 20h10M8 4c0 4 8 4 8 8s-8 4-8 8M16 4c0 4-8 4-8 8s8 4 8 8"/>'),
    balanced: L('<path d="M12 4v16M6.5 20h11M4 9h16M8 9l-3.2 6.3a3.2 3.2 0 0 0 6.4 0zM16 9l3.2 6.3a3.2 3.2 0 0 1-6.4 0z"/>'),
    fast: L('<path d="M5 6l6 6-6 6M12 6l6 6-6 6"/>'),
    /* corrección */
    instant: F('<path d="M13 3 5 13.2h6l-1 8.8 9-12h-6z"/>'),
    end: L('<path d="M6 21V4M6 4.5c3-1.6 6 1.5 9 0v8c-3 1.5-6-1.6-9 0"/>'),
    major: F('<path d="M12 3.2l2.5 5.1 5.6.5-4.2 3.7 1.2 5.5L12 16.9l-5.1 2.8 1.2-5.5-4.2-3.7 5.6-.5z"/>'),
    /* enfoque */
    grammar: L('<path d="M5 6h14M5 10h14M5 14h9M5 18h11"/>'),
    vocab: L('<rect x="4" y="7" width="13" height="10" rx="1.5"/><path d="M8 4.5h10a1.5 1.5 0 0 1 1.5 1.5v9"/>'),
    conversation: L('<path d="M5 5h14v9H9l-3 3v-3H5z"/>'),
    pronunciation: L(mic),
    comprehension: L('<path d="M5 12a7 7 0 0 1 14 0"/><path d="M4.5 13.5a2 2 0 0 1 2-2H8v6H6.5a2 2 0 0 1-2-2zM19.5 13.5a2 2 0 0 0-2-2H16v6h1.5a2 2 0 0 0 2-2z"/>'),
    /* temas */
    dailylife: L('<path d="M5 8.5h11v4.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 9.5h2a2 2 0 0 1 0 4h-2M7 4.5v1.4M10 4.5v1.4M13 4.5v1.4"/>'),
    travel: L('<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M12 8v11"/>'),
    business: L(briefcase),
    tech: L('<rect x="3.5" y="5" width="17" height="11" rx="2"/><path d="M9 20h6M12 16v4"/>'),
    science: L('<path d="M9.5 3h5M10.8 3v6L5.8 18a1.5 1.5 0 0 0 1.3 2.2h9.8A1.5 1.5 0 0 0 18.2 18L13.2 9V3"/><path d="M8.2 14h7.6"/>'),
    history: L('<path d="M4 7l8-3 8 3M5 7v9.5M9 7v9.5M15 7v9.5M19 7v9.5M3.5 20h17M4 16.5h16"/>'),
    philosophy: L('<path d="M9 5a3 3 0 0 0-2.8 4A3 3 0 0 0 6 14.5 3 3 0 0 0 9.5 18 2.4 2.4 0 0 0 12 19.4 2.4 2.4 0 0 0 14.5 18 3 3 0 0 0 18 14.5 3 3 0 0 0 17.8 9 3 3 0 0 0 12 6 2.6 2.6 0 0 0 9 5zM12 6v13.4"/>'),
    arts: L(palette),
    music: L('<path d="M9 18V6.5l9-2V16"/><circle cx="6.6" cy="18" r="2.4"/><circle cx="15.6" cy="16" r="2.4"/>'),
    movies: L('<rect x="3.5" y="9" width="17" height="10.5" rx="1.5"/><path d="M3.9 9l2.3-4 3 1.4 3-1.4 3 1.4 3-1.4 1.9 3.5M8.5 6.6l1.2 2.4M13.5 5.6l1.2 2.4"/>'),
    anime: L('<circle cx="12" cy="12" r="2"/><path d="M12 10c0-2.8.9-4.8 0-6.8-.9 2-0 4 0 6.8zM12 14c0 2.8-.9 4.8 0 6.8.9-2 0-4 0-6.8zM10 12c-2.8 0-4.8.9-6.8 0 2-.9 4 0 6.8 0zM14 12c2.8 0 4.8.9 6.8 0-2-.9-4 0-6.8 0z"/>'),
    gaming: L('<rect x="3.5" y="8" width="17" height="9" rx="4.5"/><path d="M7.5 11v3M6 12.5h3M15.5 12h.02M17.5 13.5h.02"/>'),
    popculture: F('<path d="M12 2.5c.5 3.7 1.8 5 5.5 5.5-3.7.5-5 1.8-5.5 5.5-.5-3.7-1.8-5-5.5-5.5 3.7-.5 5-1.8 5.5-5.5z"/><circle cx="18.3" cy="16.6" r="1.6"/>'),
    sports: L('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.6l2.6 4-2.6 3.1-2.6-3.1zM4 10.2l4 1.1 1 4-3.2 2.1zM20 10.2l-4 1.1-1 4 3.2 2.1z"/>'),
    food: L('<path d="M7.5 3v8.5M5.5 3v4a2 2 0 0 0 4 0V3M7.5 11.5V21M16.5 3c-1.6 0-2.7 2.1-2.7 4.7s1.1 4.3 2.7 4.3v9"/>'),
    society: L('<circle cx="9" cy="9" r="2.5"/><path d="M4.5 18a4.5 4.5 0 0 1 9 0"/><circle cx="16.6" cy="9.5" r="2"/><path d="M15.2 14.2A4 4 0 0 1 20 18"/>'),
    health: L('<path d="M12 20.4 5.2 13.6a4.2 4.2 0 0 1 5.9-6l.9.9.9-.9a4.2 4.2 0 0 1 5.9 6l-1.7 1.7"/><path d="M6.8 13h2l1.4-3 2.1 5 1.4-2h2.5" stroke-width="1.4"/>'),
    finance: L('<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10h17M7 14.5h4"/>'),
    nature: L('<path d="M12 3.2c-2.6 2-4.2 4.1-4.2 6.2a4.2 4.2 0 0 0 8.4 0c0-2.1-1.6-4.2-4.2-6.2zM12 13.6V21M8.5 18h7"/>'),
    /* nivel (LEVELMODE) */
    adaptive: L(compass),
    manual: L(sliders),
    /* tipo de meta (GOALTYPE) */
    lessons: L(book),
    min: L('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.4V12l3.2 2.1"/>'),
    /* tamaño de texto (TEXTSCALE) */
    md: A(13), lg: A(17), xl: A(21)
  };

  function get(id) { return (id && MAP[id]) ? MAP[id] : ""; }
  return { get: get, MAP: MAP };
})();
