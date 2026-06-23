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

  return { tier: tier, globe: globe, repaso: repaso, gem: gem, heart: heart,
    heartEmpty: heartEmpty, snowflake: snowflake, bolt: bolt, store: store };
})();
