/* ============================================================
 * lead_server.js — escrituras públicas (sin cuenta) que pasan por el Worker.
 * ------------------------------------------------------------
 * 2026-11-25. Antes book_placement.html, chat.html y entrevista.html
 * escribían DIRECTO en Firestore (placement_results y app_events), con reglas
 * que aceptaban `create` sin sesión. La forma estaba acotada, pero no la
 * cantidad: un script podía crear documentos en bucle y agotar la cuota diaria
 * de escrituras de toda la escuela (Firestore Enterprise, por bytes). App
 * Check pide configurarlo en la consola, así que el freno va aquí:
 *
 *   POST /lead/placement  resultado del examen diagnóstico (lead sin cuenta)
 *   POST /report/ai       "Reportar" una respuesta de la IA (chat, entrevista)
 *
 * Cada ruta valida la MISMA forma que aceptaban las reglas, cuenta por IP y
 * en un tope global (contadores estrictos: si el contador falla, 503, no se
 * escribe) y escribe con la cuenta de servicio (FIREBASE_SA). `createdAt` lo
 * pone el servidor. Las reglas de esas dos colecciones pasan a `create: if
 * false`; el orden de publicación está en _propuestas/seguridad-2026-11-25.
 *
 * Local (EXAM_DEV=1 sin FIREBASE_SA): no escribe; devuelve el documento que
 * habría escrito (dryRun), como /exam/finish.
 * ============================================================ */
"use strict";

import { saAccessToken, fsBase } from "./exam_grader.js";

export const LEAD_RATE_DEFAULTS = {
  /* por IP. Un salón que termina el diagnóstico al mismo tiempo comparte IP:
     15 por minuto y 40 al día (revisión 2026-11-25; antes 4 y 20). */
  RL_LEAD_PER_MIN: 15, RL_LEAD_PER_DAY: 40,
  /* todas las IPs, por día: muy por encima de los leads reales y muy por
     debajo de la cuota de escrituras (~40 K unidades al día). */
  RL_LEAD_GLOBAL_PER_DAY: 300,
  RL_REPORT_PER_MIN: 5, RL_REPORT_PER_DAY: 30,
  RL_REPORT_GLOBAL_PER_DAY: 300
};

const LEAD_KEYS = ["name", "email", "phone", "level", "levelName", "correct", "total",
                   "skipped", "scores", "origin", "createdAt"];
const SCORE_KEYS = ["Pre-A1", "A1", "A2", "B1", "B2", "B2+", "C1", "C2"];
const REPORT_REASONS = ["ofensiva", "incorrecta", "otro"];
const REPORT_PAGES = ["chat.html", "entrevista.html"];

const isStr = (v, max) => typeof v === "string" && v.length <= max;
const isInt = (v, lo, hi) => typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi;
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

/* Misma forma que el bloque placement_results de firestore.rules (2026-11-20).
 * Devuelve el registro limpio o null. `createdAt` del cliente se acepta (la
 * página lo manda) pero no se usa: un teléfono con el reloj mal no debe
 * cambiar la fecha del lead. */
export function cleanLead(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return null;
  if (!Object.keys(b).every((k) => LEAD_KEYS.indexOf(k) >= 0)) return null;
  if (!isStr(b.name, 120) || !b.name.length) return null;
  if (!isStr(b.email, 200) || !isStr(b.phone, 60)) return null;
  if (!b.email.length && !b.phone.length) return null;
  if (!isStr(b.level, 20)) return null;
  if (!isInt(b.total, 0, 200) || !isInt(b.correct, 0, b.total)) return null;
  if (has(b, "levelName") && !isStr(b.levelName, 60)) return null;
  if (has(b, "skipped") && !isInt(b.skipped, 0, 200)) return null;
  if (has(b, "origin") && !isStr(b.origin, 80)) return null;
  let scores = {};
  if (has(b, "scores")) {
    const s = b.scores;
    if (!s || typeof s !== "object" || Array.isArray(s)) return null;
    const ks = Object.keys(s);
    if (ks.length > 12 || !ks.every((k) => SCORE_KEYS.indexOf(k) >= 0 && isInt(s[k], 0, 200))) return null;
    scores = s;
  }
  return {
    name: b.name, email: b.email, phone: b.phone, level: b.level,
    levelName: has(b, "levelName") ? b.levelName : "",
    correct: b.correct, total: b.total,
    skipped: has(b, "skipped") ? b.skipped : 0,
    scores: scores,
    origin: has(b, "origin") ? b.origin : ""
  };
}

/* Misma forma que app_events en firestore.rules, solo para event "ai_report"
 * (lo único que se escribe hoy: vesper_analytics tiene cloud:false). */
export function cleanReport(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return null;
  if (REPORT_REASONS.indexOf(b.reason) < 0 || REPORT_PAGES.indexOf(b.page) < 0) return null;
  let text = typeof b.text === "string" ? b.text.slice(0, 480) : "";
  const vid = typeof b.vid === "string" ? b.vid.slice(0, 32) : "";
  const sid = typeof b.sid === "string" ? b.sid.slice(0, 32) : "";
  /* el texto escapado (comillas, saltos) puede pasar de 600: se recorta el
     texto, no se rechaza el reporte */
  let props = JSON.stringify({ reason: b.reason, text: text });
  while (props.length > 600 && text.length) {
    text = text.slice(0, text.length - Math.max(1, Math.ceil((props.length - 600) / 6)));   // un carácter escapado ocupa hasta 6
    props = JSON.stringify({ reason: b.reason, text: text });
  }
  return { event: "ai_report", props: props, vid: vid, sid: sid, page: b.page };
}

function leadDoc(r, ts) {
  const S = (v) => ({ stringValue: String(v) }), I = (v) => ({ integerValue: String(v) });
  return { fields: {
    name: S(r.name), email: S(r.email), phone: S(r.phone),
    level: S(r.level), levelName: S(r.levelName),
    correct: I(r.correct), total: I(r.total), skipped: I(r.skipped),
    scores: { mapValue: { fields: Object.keys(r.scores).reduce((m, k) => { m[k] = I(r.scores[k]); return m; }, {}) } },
    origin: S(r.origin),
    createdAt: { timestampValue: ts }
  } };
}

function reportDoc(r, ts) {
  const S = (v) => ({ stringValue: String(v) });
  return { fields: {
    event: S(r.event), props: S(r.props), vid: S(r.vid), sid: S(r.sid), page: S(r.page),
    createdAt: { timestampValue: ts }
  } };
}

/* Crea un documento con id automático. Lanza si Firestore no lo acepta. */
async function createDoc(env, col, doc) {
  const token = await saAccessToken(env);
  const r = await fetch(fsBase() + "/" + col, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(doc)
  });
  if (!r.ok) throw new Error(col + " " + r.status + " " + (await r.text()).slice(0, 200));
}

const TOO_FAST = (rl) => [429, { error: "Demasiados envíos desde tu red. Inténtalo más tarde.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];

/* `rate(key, perMin, perDay)` es el contador por IP (strictRate con la IP);
 * `rateRaw` el mismo contador sin IP (para el tope global). */
async function write(env, rate, rateRaw, limitOf, what, col, doc) {
  const P = what === "lead" ? "RL_LEAD" : "RL_REPORT";
  const rl = await rate(what, limitOf(P + "_PER_MIN"), limitOf(P + "_PER_DAY"));
  if (!rl.ok) return TOO_FAST(rl);
  const g = await rateRaw(what + "-global", 0, limitOf(P + "_GLOBAL_PER_DAY"));
  if (!g.ok) return [429, { error: "Hoy ya no se reciben más envíos. Inténtalo mañana.", code: "rate_limited", retryAfter: g.retryAfter || 3600 }];
  if (!env.FIREBASE_SA) {
    if (env.EXAM_DEV === "1") return [200, { ok: true, dryRun: true, doc: doc }];
    return [503, { error: "El servidor no puede guardar ahora.", code: "unavailable", retryAfter: 60 }];
  }
  try { await createDoc(env, col, doc); }
  catch (e) {
    console.error(what + ":", e && e.message);
    return [502, { error: "No se pudo guardar.", code: "save_failed" }];
  }
  return [200, { ok: true }];
}

export async function handleLead(path, body, env, rate, rateRaw, limitOf) {
  const ts = new Date().toISOString();
  if (path === "/lead/placement") {
    const rec = cleanLead(body);
    if (!rec) return [400, { error: "Datos del resultado inválidos.", code: "bad_lead" }];
    return write(env, rate, rateRaw, limitOf, "lead", "placement_results", leadDoc(rec, ts));
  }
  if (path === "/report/ai") {
    const rec = cleanReport(body);
    if (!rec) return [400, { error: "Reporte inválido.", code: "bad_report" }];
    return write(env, rate, rateRaw, limitOf, "report", "app_events", reportDoc(rec, ts));
  }
  return [404, { error: "No existe." }];
}
