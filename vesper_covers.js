/* Vesper Academy — generated lesson cover art.
   Shared by audio_library.html (lesson cards) and lesson.html (banner) so the
   same lesson always shows the same artwork in both places. No image files:
   covers are deterministic brand gradients + the lesson's themed icon. */
window.VesperCovers = (function () {
  "use strict";

  /* curated gradients in the Vesper navy/gold family: [from, to, accent] */
  var PALETTES = [
    ["#243654", "#10243e", "#c5a059"], /* navy */
    ["#3a2d4a", "#241a33", "#d9bd84"], /* plum */
    ["#1d4044", "#10262b", "#c5a059"], /* teal */
    ["#235c3f", "#12301f", "#d9bd84"], /* green */
    ["#5c3a23", "#2e1c10", "#e3c35f"], /* bronze */
    ["#23405c", "#101f2e", "#d9bd84"], /* steel blue */
    ["#5c2330", "#2e1018", "#e3c35f"], /* burgundy */
    ["#44285c", "#1f1230", "#d9bd84"], /* violet */
    ["#2d5c5a", "#10302e", "#e3c35f"], /* pine */
    ["#5c4d23", "#302810", "#f0e3b8"], /* olive gold */
    ["#23565c", "#102b2e", "#d9bd84"], /* lagoon */
    ["#3f2d1f", "#201610", "#c5a059"]  /* espresso */
  ];

  /* keyword → icon, for lessons whose data has no icon of its own (Core Basics) */
  var ICON_WORDS = [
    [/family|tree|people/i, "fa-people-roof"],
    [/weather|rain|storm|cloud/i, "fa-cloud-sun"],
    [/color|cloth|fashion|wear/i, "fa-shirt"],
    [/job|profession|work|office/i, "fa-briefcase"],
    [/food|eat|meal|restaurant|cook/i, "fa-utensils"],
    [/number|count|math/i, "fa-hashtag"],
    [/time|clock|hour|schedule|routine/i, "fa-clock"],
    [/travel|trip|airport|holiday|vacation/i, "fa-plane"],
    [/city|direction|street|place|map/i, "fa-map-location-dot"],
    [/house|home|room|furniture/i, "fa-house"],
    [/shop|buy|money|price|market/i, "fa-cart-shopping"],
    [/body|health|doctor|sick/i, "fa-heart-pulse"],
    [/animal|pet|zoo/i, "fa-paw"],
    [/music|song|sing/i, "fa-music"],
    [/sport|game|play|hobby/i, "fa-futbol"],
    [/school|class|study|learn|teacher/i, "fa-graduation-cap"],
    [/phone|call|message/i, "fa-phone"],
    [/feel|emotion|adjective/i, "fa-face-smile"],
    [/question|who|what|where|when|why|how/i, "fa-circle-question"],
    [/describ|person|friend/i, "fa-user"],
    [/nature|park|garden|plant/i, "fa-tree"],
    [/transport|bus|train|car/i, "fa-bus"],
    [/past|memor|story|histor/i, "fa-book"],
    [/future|plan|dream/i, "fa-rocket"],
    [/daily|day|morning|night/i, "fa-sun"]
  ];

  function hash(str) {
    str = String(str);
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function hexA(hex, alpha) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alpha + ")";
  }

  function palette(seed) { return PALETTES[hash(seed) % PALETTES.length]; }

  /* deterministic cover background: same seed → same art everywhere */
  function coverStyle(seed) {
    var p = palette(seed);
    var angle = 115 + (hash(seed + "a") % 50);
    var spotX = 15 + (hash(seed + "x") % 60);
    return {
      from: p[0], to: p[1], accent: p[2],
      css: "background:" +
        "radial-gradient(120% 90% at " + spotX + "% -20%, " + hexA(p[2], 0.30) + ", transparent 55%)," +
        "radial-gradient(80% 80% at 85% 115%, " + hexA(p[2], 0.16) + ", transparent 60%)," +
        "linear-gradient(" + angle + "deg," + p[0] + "," + p[1] + ");"
    };
  }

  function iconFor(title, fallback) {
    for (var i = 0; i < ICON_WORDS.length; i++) {
      if (ICON_WORDS[i][0].test(title || "")) return ICON_WORDS[i][1];
    }
    return fallback || "fa-headphones-simple";
  }

  /* cover block markup for the audio hub cards (CSS lives in audio_library.html) */
  function coverHTML(seed, iconClass, label) {
    var c = coverStyle(seed);
    return '<div class="vc-cover" style="' + c.css + '">' +
        '<i class="fas ' + iconClass + ' vc-ghost"></i>' +
        '<span class="vc-medal" style="color:' + c.accent + ';border-color:' + hexA(c.accent, 0.55) + '">' +
          '<i class="fas ' + iconClass + '"></i></span>' +
        (label ? '<span class="vc-badge">' + label + '</span>' : '') +
      '</div>';
  }

  return { coverStyle: coverStyle, coverHTML: coverHTML, iconFor: iconFor, palette: palette, hash: hash };
})();
