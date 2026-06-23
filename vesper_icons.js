/* ============================================================
 * vesper_icons.js — Set de iconos SVG de marca (sin emojis).
 *
 * Reemplaza los emojis de los "medallones" (ligas, repaso, tienda, gemas)
 * por SVG inline coherentes con HUB_ICN/ACH_ICON (viewBox 24x24). Colores
 * horneados en sólido (sin gradientes) para evitar colisiones de IDs al
 * repetir un icono en la misma página.
 *
 * window.VESPER_ICN:
 *   tier(id)     medallón de liga por tier (bronce/plata/oro/zafiro/diamante)
 *   globe        liga global (tabla real)
 *   repaso       repaso espaciado (flechas cíclicas, hereda currentColor)
 *   gem          gema/divisa (turquesa)
 *   heart        corazón lleno (vida)
 *   heartEmpty   corazón vacío (vida gastada)
 *   snowflake    congelar racha
 *   bolt         boost de XP
 *   store(id)    icono de artículo de tienda por id
 * ============================================================ */
window.VESPER_ICN = (function () {
  /* medallón metálico (bronce/plata/oro): disco + estrella */
  function metal(face, edge, star) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<circle cx="12" cy="12" r="8.6" fill="' + face + '" stroke="' + edge + '" stroke-width="1"/>'
      + '<circle cx="12" cy="12" r="6.2" fill="none" stroke="' + edge + '" stroke-width=".7" opacity=".55"/>'
      + '<path d="M12 7.7l1.4 2.85 3.15.46-2.28 2.2.54 3.12L12 14.97l-2.35 1.36.54-3.12-2.28-2.2 3.15-.46z" fill="' + star + '"/></svg>';
  }
  /* gema facetada (zafiro/diamante y la divisa) */
  function gemSvg(face, edge) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<path d="M6 4.6h12l3.4 4.5L12 20.8 2.6 9.1z" fill="' + face + '" stroke="' + edge + '" stroke-width="1" stroke-linejoin="round"/>'
      + '<path d="M6 4.6 9 9.1h6l3-4.5M2.6 9.1h18.8M12 20.8 9 9.1M12 20.8l3-11.7" stroke="#ffffff" stroke-width=".7" opacity=".45" fill="none"/></svg>';
  }

  var TIER = {
    bronce:   metal("#d08a4e", "#9c5f2c", "#fbe6cf"),
    plata:    metal("#cdd2da", "#9aa1ad", "#ffffff"),
    oro:      metal("#ecc657", "#b8911f", "#fff7df"),
    zafiro:   gemSvg("#4f7fe0", "#2f55ad"),
    diamante: gemSvg("#73d9e0", "#3aa6b3")
  };
  function tier(id) { return TIER[id] || TIER.bronce; }

  var globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">'
    + '<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.6 2.5 2.6 14.7 0 17.2M12 3.4c-2.6 2.5-2.6 14.7 0 17.2"/></svg>';

  var repaso = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M4.6 9.2a7.6 7.6 0 0 1 12.9-2.8L20 8.9"/><path d="M20 4.4v4.5h-4.5"/>'
    + '<path d="M19.4 14.8a7.6 7.6 0 0 1-12.9 2.8L4 15.1"/><path d="M4 19.6v-4.5h4.5"/></svg>';

  var gem = gemSvg("#1fb8cc", "#0f7c8a");

  var heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.5 13C2.3 10.8 2.3 7.3 4.6 5.3 6.5 3.6 9.3 4 11 5.9l1 1.05 1-1.05c1.7-1.9 4.5-2.3 6.4-.6 2.3 2 2.3 5.5.1 7.7z" fill="#e0455a"/></svg>';
  var heartEmpty = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.5 4.5 13C2.3 10.8 2.3 7.3 4.6 5.3 6.5 3.6 9.3 4 11 5.9l1 1.05 1-1.05c1.7-1.9 4.5-2.3 6.4-.6 2.3 2 2.3 5.5.1 7.7z" stroke="#c9b9bd" stroke-width="1.6"/></svg>';

  var snowflake = '<svg viewBox="0 0 24 24" fill="none" stroke="#3f8ad6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M12 3v18M3.8 7.5l16.4 9M20.2 7.5 3.8 16.5"/>'
    + '<path d="M12 6.4 9.7 4.7M12 6.4l2.3-1.7M12 17.6l-2.3 1.7M12 17.6l2.3 1.7"/>'
    + '<path d="M5.7 9.4 5 6.8M5.7 9.4 3.1 9.9M18.3 14.6l.7 2.6M18.3 14.6l2.6-.5M5.7 14.6 3.1 14.1M5.7 14.6 5 17.2M18.3 9.4l2.6.5M18.3 9.4 19 6.8"/></svg>';

  var bolt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 13.2h6l-1 8.8 9-12h-6z" fill="#e8b23a" stroke="#b8911f" stroke-width=".8" stroke-linejoin="round"/></svg>';

  function store(id) {
    if (id === "hearts") return heart;
    if (id === "freeze") return snowflake;
    if (id === "xpboost") return bolt;
    return gem;
  }

  /* ---- iconos de línea (currentColor), estilo HUB_ICN ---- */
  function ln(d, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (extra && extra.w || 1.8)
      + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  function fl(d) { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + d + '</svg>'; }

  var flame = fl('<path d="M13 2c.4 2.9-1.1 4.4-2.6 5.9C9 9.3 8 10.9 8 13a4.5 4.5 0 0 0 9 0c0-1.4-.5-2.6-1.3-3.6-.3.9-1 1.5-1.9 1.7 1-2.3.3-4.9-1.8-7.1z"/>');
  var star = fl('<path d="M12 3.2l2.5 5.1 5.6.5-4.2 3.7 1.2 5.5L12 16.9l-5.1 2.8 1.2-5.5-4.2-3.7 5.6-.5z"/>');
  var sparkle = fl('<path d="M12 2.5c.5 3.7 1.8 5 5.5 5.5-3.7.5-5 1.8-5.5 5.5-.5-3.7-1.8-5-5.5-5.5 3.7-.5 5-1.8 5.5-5.5z"/><circle cx="18.5" cy="16.5" r="1.7"/>');
  var lock = ln('<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>');
  var unlock = ln('<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.5-1.9"/>');
  var crown = fl('<path d="M3 7.5l3.4 3 3.1-4.6c.6-.9 2-.9 2.6 0l3.1 4.6 3.4-3c.9-.8 2.3 0 2.1 1.2l-1.7 8.6c-.1.6-.7 1.1-1.4 1.1H5c-.7 0-1.3-.5-1.4-1.1L1.9 8.7C1.7 7.5 3.1 6.7 4 7.5z" transform="translate(.5 .5) scale(.92)"/>');
  var trophy = ln('<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 5.5H4.5A2.5 2.5 0 0 0 7 9M17 5.5h2.5A2.5 2.5 0 0 1 17 9"/><path d="M12 13v3M9 20h6M10 20l.5-4h3l.5 4"/>');
  var target = ln('<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>', { w: 1.7 });
  var heartBroken = ln('<path d="M12 20.5 4.5 13C2.3 10.8 2.3 7.3 4.6 5.3 6.5 3.6 9.3 4 11 5.9l1 1.05 1-1.05c1.7-1.9 4.5-2.3 6.4-.6 2.3 2 2.3 5.5.1 7.7z"/><path d="M12 6.5l-2 3 3 2-2 3" fill="none"/>');
  var bulb = ln('<path d="M9 17.5h6M9.5 20h5"/><path d="M12 3.5a6 6 0 0 1 3.6 10.8c-.5.4-.8 1-.8 1.6H9.2c0-.6-.3-1.2-.8-1.6A6 6 0 0 1 12 3.5z"/>');
  var speaker = ln('<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.8a7.5 7.5 0 0 1 0 10.4"/>');
  var rewind = ln('<path d="M11 7l-5 5 5 5M18 7l-5 5 5 5"/>');
  var mic = ln('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5M9 20.5h6"/>');
  var check = ln('<path d="M5 12.5l4.2 4.2L19 7"/>', { w: 2.2 });
  var checkCircle = ln('<circle cx="12" cy="12" r="8.4"/><path d="M8 12.2l2.7 2.7L16 9.2"/>');
  var play = fl('<path d="M8 5.5v13l11-6.5z"/>');
  var book = ln('<path d="M12 6.5C10.5 5 8 4.5 4.5 4.8v12.4C8 17 10.5 17.5 12 19M12 6.5C13.5 5 16 4.5 19.5 4.8v12.4C16 17 13.5 17.5 12 19M12 6.5V19"/>');
  var arrowUp = ln('<path d="M12 19V6M6.5 11L12 5.5 17.5 11"/>', { w: 2 });
  var arrowDown = ln('<path d="M12 5v13M6.5 13 12 18.5 17.5 13"/>', { w: 2 });
  var paw = fl('<ellipse cx="6.6" cy="11" rx="1.7" ry="2.2"/><ellipse cx="10" cy="8" rx="1.8" ry="2.4"/><ellipse cx="14" cy="8" rx="1.8" ry="2.4"/><ellipse cx="17.4" cy="11" rx="1.7" ry="2.2"/><path d="M12 12.4c-2.5 0-4.4 1.9-4.4 3.9 0 1.5 1.1 2.5 2.6 2.5.9 0 1.4-.4 1.8-.4s.9.4 1.8.4c1.5 0 2.6-1 2.6-2.5 0-2-1.9-3.9-4.4-3.9z"/>');
  var shieldLn = ln('<path d="M12 2.8l7 2.6v5.2c0 4.7-3.1 7.6-7 9.1-3.9-1.5-7-4.4-7-9.1V5.4z"/>');
  /* iconos de Configuración */
  var idcard = ln('<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.5 16.2c.5-1.6 1.7-2.4 3-2.4s2.5.8 3 2.4M14 9.5h4M14 12.5h4M14 15.5h2.5"/>');
  var palette = ln('<path d="M12 3.5c4.7 0 8.5 3.4 8.5 7.5 0 2.5-2 4-4.2 4h-1.6c-1 0-1.7.8-1.7 1.7 0 .4.2.8.4 1.1.3.4.5.8.5 1.2 0 .9-.8 1.5-1.9 1.5C7.3 21.5 3.5 17 3.5 11.5S7.3 3.5 12 3.5z"/><circle cx="8" cy="11" r="1.1" fill="currentColor"/><circle cx="12" cy="8" r="1.1" fill="currentColor"/><circle cx="16" cy="11" r="1.1" fill="currentColor"/>');
  var access = ln('<circle cx="12" cy="4.5" r="1.6"/><path d="M5 8.5h14M12 8.5v6M12 14.5l-2.5 5M12 14.5l2.5 5"/>');
  var swords = ln('<path d="M14.5 3.5H19V8l-7.5 7.5M9.5 3.5H5V8l7.5 7.5"/><path d="M16 14l4 4-1.5 1.5-4-4M8 14l-4 4 1.5 1.5 4-4"/>');
  var cart = ln('<circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/><path d="M3 4h2.2l2.3 11h10l1.8-7.5H6.2"/>');
  var compass = ln('<circle cx="12" cy="12" r="8.4"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none"/>');
  var sliders = ln('<path d="M5 6h9M17 6h2M5 12h2M10 12h9M5 18h11M19 18h0"/><circle cx="15.5" cy="6" r="1.8"/><circle cx="8.5" cy="12" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>');
  var textsize = ln('<path d="M4 18l4-11 4 11M5.2 14.5h5.6M14 18l3-8 3 8M15 15.4h4"/>');

  return { tier: tier, globe: globe, repaso: repaso, gem: gem, heart: heart,
    heartEmpty: heartEmpty, snowflake: snowflake, bolt: bolt, store: store,
    flame: flame, star: star, sparkle: sparkle, lock: lock, unlock: unlock,
    crown: crown, trophy: trophy, target: target, heartBroken: heartBroken,
    bulb: bulb, speaker: speaker, rewind: rewind, mic: mic, check: check,
    checkCircle: checkCircle, play: play, book: book, arrowUp: arrowUp,
    arrowDown: arrowDown, paw: paw, shieldLn: shieldLn,
    idcard: idcard, palette: palette, access: access, swords: swords,
    cart: cart, compass: compass, sliders: sliders, textsize: textsize };
})();
