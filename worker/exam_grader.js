/* ============================================================
 * exam_grader.js — el Worker califica los exámenes de nivel y los jefes.
 * ------------------------------------------------------------
 * Las respuestas NUNCA llegan al navegador antes de contestar: el sitio
 * publica las preguntas sin claves (vesper_level_exams.js /
 * vesper_boss_exams.js) y este módulo guarda las claves (exam_keys.json,
 * generado por _scripts/exams/split_exams.js y fuera de git).
 *
 * Flujo (todo POST JSON, mismo CORS que el chat):
 *   /exam/start  {kind:"exam"|"boss", level, version, ids?}
 *        -> {attemptId, total}. En el jefe el cliente muestrea y manda `ids`;
 *           aquí se valida que sean del banco y del tamaño correcto.
 *   /exam/answer {attemptId, id, response}
 *        -> {correct, reveal}. Solo cuenta la PRIMERA respuesta de cada
 *           pregunta (queda en el Durable Object ExamAttempt); `reveal` trae
 *           la clave y la explicación para que la app muestre "Era: …".
 *   /exam/finish {attemptId, idToken?, alias?}
 *        -> {score, total, percent, passed, threshold, saved}. La nota la
 *           calcula el Worker con lo registrado; si hay sesión verificada la
 *           guarda él mismo en Firestore (exam_results, gradedBy "worker")
 *           con la cuenta de servicio. Las reglas ya no aceptan esas notas
 *           escritas desde el navegador.
 *
 * La calificación replica EXACTAMENTE la de leccion_app.js (norm(), índices
 * originales de las opciones, orden de palabras). Si cambias una, cambia la
 * otra: _scripts/exams/test_grader.js compara ambas.
 * ============================================================ */
"use strict";

import { DurableObject } from "cloudflare:workers";
import KEYS from "./exam_keys.json";

const PROJECT_ID = "vesper-academy";
const FS_DB = "teachermanuals";
/* apiKey PÚBLICA de Firebase (la misma de vesper_auth.js): solo sirve para
   que Identity Toolkit valide el idToken del alumno. */
const FIREBASE_API_KEY = "AIzaSyAsCJW97LyNpmvey1Mo0wiGMufQIV7uxio";
const ATTEMPT_TTL_MS = 24 * 3600 * 1000;
const DETAIL_CAP = 60;            // igual que vesper_results.js y la regla
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SKILL_RANK = { grammar: 0, vocab: 1, use: 2, reading: 3, listening: 4 };

export const EXAM_RATE_DEFAULTS = {
  RL_EXAM_START_PER_MIN: 10, RL_EXAM_START_PER_DAY: 200,
  RL_EXAM_ANSWER_PER_MIN: 90, RL_EXAM_ANSWER_PER_DAY: 3000
};

/* ---------- calificación (espejo de leccion_app.js) ---------- */

export function norm(s) {
  return ("" + (s == null ? "" : s)).toLowerCase()
    .replace(/[’‘'`]/g, "")
    .replace(/[.,!?;:¿¡"]/g, " ")
    .replace(/\s+/g, " ").trim();
}

function isInt(v) { return typeof v === "number" && Number.isInteger(v); }
function typedOk(answers, text) {
  if (typeof text !== "string") return null;
  const val = norm(text);
  return answers.some((a) => norm(a) === val);
}

/* Devuelve true/false, o null si la respuesta no tiene la forma esperada. */
export function grade(ex, r) {
  r = r || {};
  switch (ex.type) {
    case "multiple_choice":
    case "find_error":
      return isInt(r.choice) ? r.choice === ex.correctIndex : null;
    case "listening":
      if (Array.isArray(ex.options)) return isInt(r.choice) ? r.choice === ex.correctIndex : null;
      return typedOk(ex.answers || [ex.text], r.text);
    case "true_false":
      return (r.choice === 0 || r.choice === 1) ? ((r.choice === 1) === !!ex.answer) : null;
    case "fill_blank":
      return typedOk(ex.answers || (ex.answer != null ? [ex.answer] : []), r.text);
    case "translate":
    case "type_answer":
      return typedOk(ex.answers || [], r.text);
    case "word_order": {
      const w = r.words, c = ex.correctOrder || [];
      if (!Array.isArray(w) || w.length !== (ex.words || []).length) return null;
      for (let i = 0; i < w.length; i++) if (w[i] !== c[i]) return false;
      return true;
    }
    case "reading": {
      const qs = ex.questions || [], p = r.picks;
      if (!Array.isArray(p) || p.length !== qs.length || !p.every(isInt)) return null;
      return qs.every((q, i) => p[i] === q.correctIndex);
    }
    default:
      return null;
  }
}

/* Lo que la app necesita DESPUÉS de contestar para pintar el feedback. */
export function reveal(ex) {
  const pick = (o, ks) => { const out = {}; for (const k of ks) if (o[k] !== undefined) out[k] = o[k]; return out; };
  if (ex.type === "reading") {
    return { questions: (ex.questions || []).map((q) => pick(q, ["correctIndex", "explanation"])) };
  }
  return pick(ex, ["correctIndex", "answer", "answers", "correctOrder", "explanation", "correction"]);
}

function bankOf(kind, level) {
  const b = KEYS[kind] && KEYS[kind][level];
  return b && b.items ? b : null;
}

/* ---------- Durable Object: un intento ---------- */
export class ExamAttempt extends DurableObject {
  async init(a) {
    if (await this.ctx.storage.get("a")) return { ok: false, error: "exists" };
    await this.ctx.storage.put("a", { kind: a.kind, level: a.level, ids: a.ids, answered: {}, order: [], created: Date.now(), result: null });
    await this.ctx.storage.setAlarm(Date.now() + ATTEMPT_TTL_MS);
    return { ok: true };
  }
  /* registra el veredicto; si la pregunta ya se contestó, gana el primero */
  async answer(id, ok) {
    const a = await this.ctx.storage.get("a");
    if (!a) return { error: "no_attempt" };
    if (a.result) return { error: "finished" };
    if (a.ids.indexOf(id) < 0) return { error: "not_in_attempt" };
    if (Object.prototype.hasOwnProperty.call(a.answered, id)) return { ok: a.answered[id], first: false };
    a.answered[id] = ok; a.order.push(id);
    await this.ctx.storage.put("a", a);
    return { ok: ok, first: true };
  }
  async state() { return (await this.ctx.storage.get("a")) || null; }
  async close(result) {
    const a = await this.ctx.storage.get("a");
    if (!a) return null;
    if (a.result) return { first: false, result: a.result };   // segundo finish: misma nota, sin reescribir
    a.result = result;
    await this.ctx.storage.put("a", a);
    return { first: true, result: result };
  }
  async alarm() { await this.ctx.storage.deleteAll(); }
}

/* ---------- utilidades ---------- */

function randomId() {
  const b = new Uint8Array(16); crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}
/* attemptId = "<kind>.<level>.<hex>": el Worker sabe qué banco usar sin
   preguntarle al DO; el hex aleatorio es lo que lo hace inadivinable. */
function parseAttempt(s) {
  const m = /^(exam|boss)\.(A1|A2|B1|B2|C1|C2)\.([0-9a-f]{32})$/.exec(typeof s === "string" ? s : "");
  return m ? { kind: m[1], level: m[2], id: s } : null;
}
function attemptStub(env, attemptId) {
  return env.EXAM_ATTEMPTS.get(env.EXAM_ATTEMPTS.idFromName("att:" + attemptId));
}

function exText(ex) {
  return ex.question || ex.sentence || ex.statement || ex.prompt || ex.title
    || (ex.words ? (ex.correctOrder || ex.words).join(" ") : "") || "";
}

/* ---------- Firestore con la cuenta de servicio ---------- */

let saCache = null;   // { token, exp } por isolate

function pemToDer(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const bin = atob(b64), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}
function b64urlStr(s) { return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function b64urlBuf(buf) {
  let bin = ""; const u = new Uint8Array(buf);
  for (let i = 0; i < u.length; i++) bin += String.fromCharCode(u[i]);
  return b64urlStr(bin);
}

async function saAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (saCache && saCache.exp - 60 > now) return saCache.token;
  if (!env.FIREBASE_SA) throw new Error("FIREBASE_SA no configurado");
  const sa = JSON.parse(env.FIREBASE_SA);
  const head = b64urlStr(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64urlStr(JSON.stringify({
    iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore",
    aud: sa.token_uri || "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
  }));
  const key = await crypto.subtle.importKey("pkcs8", pemToDer(sa.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(head + "." + claim));
  const r = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") +
          "&assertion=" + head + "." + claim + "." + b64urlBuf(sig)
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error("token SA " + r.status);
  saCache = { token: j.access_token, exp: now + (j.expires_in || 3600) };
  return saCache.token;
}

const fsBase = () => "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/" + FS_DB + "/documents";

/* ¿quién es? Identity Toolkit valida el idToken (firma, caducidad, proyecto). */
async function lookupUser(env, idToken) {
  if (env.EXAM_DEV === "1" && typeof idToken === "string" && idToken.indexOf("dev:") === 0) {
    return { uid: "dev-uid", email: idToken.slice(4).toLowerCase(), verified: true };
  }
  if (typeof idToken !== "string" || idToken.length < 20 || idToken.length > 4096) return null;
  const r = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + FIREBASE_API_KEY, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: idToken })
  });
  if (!r.ok) return null;
  const u = ((await r.json()).users || [])[0];
  if (!u || !u.localId) return null;
  return { uid: u.localId, email: String(u.email || "").trim().toLowerCase(), verified: !!u.emailVerified };
}

async function studentIdentity(token, email) {
  const r = await fetch(fsBase() + "/students/" + encodeURIComponent(email), { headers: { Authorization: "Bearer " + token } });
  if (r.status === 404) return { sid: "", group: "" };
  if (!r.ok) throw new Error("students " + r.status);
  const f = ((await r.json()).fields) || {};
  return { sid: (f.sid && f.sid.stringValue) || "", group: (f.group && f.group.stringValue) || "" };
}

/* mismo documento que toFs() de vesper_results.js, + gradedBy */
function toFsDoc(rec) {
  const S = (v) => ({ stringValue: String(v) }), I = (v) => ({ integerValue: String(v) });
  return { fields: {
    studentUid: S(rec.studentUid), alias: S(rec.alias), sid: S(rec.sid), group: S(rec.group),
    examType: S(rec.examType), examId: S(rec.examId), level: S(rec.level),
    score: I(rec.score), total: I(rec.total), percent: I(rec.percent),
    passed: { booleanValue: rec.passed }, threshold: I(rec.threshold),
    detail: { arrayValue: { values: rec.detail.map((d) => ({ mapValue: { fields: {
      q: S(d.q), type: S(d.type), skill: S(d.skill), correct: { booleanValue: d.correct } } } })) } },
    createdAt: { timestampValue: rec.clientTs }, clientTs: S(rec.clientTs),
    gradedBy: S("worker")
  } };
}

async function saveResult(env, user, alias, res) {
  if (!user || !user.verified || !user.email) return { saved: false, why: "no_session" };
  /* en local (EXAM_DEV=1) no se escribe: sin cuenta de servicio, o con
     EXAM_DRY_WRITE=1 (entonces sí pide el token y lee students/, para probar
     la autenticación sin dejar notas falsas en producción) */
  const hasSa = !!env.FIREBASE_SA;
  const dry = env.EXAM_DEV === "1" && (!hasSa || env.EXAM_DRY_WRITE === "1");
  if (!hasSa && !dry) return { saved: false, why: "no_service_account" };
  let token = null, who = { sid: "", group: "" };
  if (hasSa) { token = await saAccessToken(env); who = await studentIdentity(token, user.email); }
  const rec = Object.assign({}, res, {
    studentUid: user.uid, alias: alias, sid: who.sid, group: who.group, clientTs: new Date().toISOString()
  });
  const doc = toFsDoc(rec);
  if (dry) return { saved: false, why: "dry_run", doc: doc, saChecked: hasSa };
  const r = await fetch(fsBase() + "/exam_results", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(doc)
  });
  if (!r.ok) throw new Error("exam_results " + r.status + " " + (await r.text()).slice(0, 200));
  return { saved: true };
}

/* ---------- endpoints ---------- */

function cleanAlias(a) {
  return String(typeof a === "string" ? a : "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 24) || "Estudiante";
}

async function start(env, body) {
  const kind = body.kind, level = body.level;
  if ((kind !== "exam" && kind !== "boss") || LEVELS.indexOf(level) < 0) return [400, { error: "Examen inválido." }];
  if (body.version !== KEYS.version) {
    return [409, { error: "Hay una versión nueva de los exámenes. Recarga la página.", code: "stale" }];
  }
  const bank = bankOf(kind, level);
  if (!bank) return [404, { error: "No hay examen para ese nivel." }];
  const all = Object.keys(bank.items);
  let ids;
  if (kind === "exam") ids = all;
  else {
    ids = body.ids;
    const want = Math.min(bank.size || 8, all.length);
    if (!Array.isArray(ids) || ids.length !== want || new Set(ids).size !== ids.length
        || !ids.every((id) => typeof id === "string" && Object.prototype.hasOwnProperty.call(bank.items, id))) {
      return [400, { error: "Selección de preguntas inválida." }];
    }
    if (bank.toefl) {
      for (const t of ["reading", "listening"]) {
        if (all.some((id) => bank.items[id].type === t) && !ids.some((id) => bank.items[id].type === t)) {
          return [400, { error: "Selección de preguntas inválida." }];
        }
      }
    }
  }
  const attemptId = kind + "." + level + "." + randomId();
  const r = await attemptStub(env, attemptId).init({ kind, level, ids });
  if (!r.ok) return [500, { error: "No se pudo abrir el examen." }];
  return [200, { attemptId: attemptId, total: ids.length }];
}

async function answer(env, body) {
  const at = parseAttempt(body.attemptId);
  if (!at) return [400, { error: "Intento inválido." }];
  const bank = bankOf(at.kind, at.level);
  const ex = bank && typeof body.id === "string" && Object.prototype.hasOwnProperty.call(bank.items, body.id) ? bank.items[body.id] : null;
  if (!ex) return [400, { error: "Pregunta inválida." }];
  const ok = grade(ex, body.response);
  if (ok === null) return [400, { error: "Respuesta con formato inválido." }];
  const st = await attemptStub(env, at.id).answer(body.id, ok);
  if (st.error === "no_attempt") return [404, { error: "El examen caducó. Empieza de nuevo.", code: "expired" }];
  if (st.error) return [409, { error: "Esa pregunta no es de este examen.", code: st.error }];
  return [200, { correct: st.ok, first: st.first, reveal: reveal(ex) }];
}

async function finish(env, body) {
  const at = parseAttempt(body.attemptId);
  if (!at) return [400, { error: "Intento inválido." }];
  const stub = attemptStub(env, at.id);
  const a = await stub.state();
  if (!a) return [404, { error: "El examen caducó.", code: "expired" }];
  const bank = bankOf(at.kind, at.level);
  let res = a.result;
  if (!res) {
    const answered = a.order.length;
    const total = at.kind === "boss" ? Math.max(1, Math.min(a.ids.length, answered)) : a.ids.length;
    const correct = a.order.filter((id) => a.answered[id] === true).length;
    const percent = Math.round(100 * correct / Math.max(1, total));
    const threshold = bank.pass;
    let ids = at.kind === "boss" ? a.order.slice() : a.ids.slice();
    if (at.kind === "exam") {
      const pos = {}; a.ids.forEach((id, i) => { pos[id] = i; });
      const rk = (id) => { const s = bank.items[id].skill; return (s in SKILL_RANK) ? SKILL_RANK[s] : 9; };
      ids.sort((x, y) => (rk(x) - rk(y)) || (pos[x] - pos[y]));
    }
    res = {
      examType: at.kind, examId: at.kind + ":" + at.level, level: at.level,
      score: correct, total: total, percent: percent, threshold: threshold, passed: percent >= threshold,
      detail: ids.slice(0, DETAIL_CAP).map((id) => {
        const ex = bank.items[id];
        return { q: String(exText(ex)).slice(0, 200), type: ex.type || "", skill: ex.skill || "", correct: a.answered[id] === true };
      })
    };
    /* el DO decide quién llegó primero (dos finish a la vez): solo ese guarda */
    const closed = await stub.close(res);
    if (!closed) return [404, { error: "El examen caducó.", code: "expired" }];
    if (!closed.first) return [200, Object.assign({}, closed.result, { saved: false, why: "already_finished" })];
    /* guardar en Firestore solo la primera vez, si hay sesión */
    let save = { saved: false, why: "no_session" };
    if (body.idToken) {
      try { save = await saveResult(env, await lookupUser(env, body.idToken), cleanAlias(body.alias), res); }
      catch (e) { console.error("exam save:", e && e.message); save = { saved: false, why: "save_failed" }; }
    }
    return [200, Object.assign({}, res, save)];
  }
  return [200, Object.assign({}, res, { saved: false, why: "already_finished" })];
}

/* punto de entrada desde el fetch del Worker. `rate(key, perMin, perDay)`
   es el contador por IP del chat (RateLimiter). */
export async function handleExam(path, body, env, rate, limitOf) {
  if (!env.EXAM_ATTEMPTS) return [503, { error: "Exámenes no configurados en el servidor." }];
  if (path === "/exam/start" || path === "/exam/answer") {
    const isStart = path === "/exam/start";
    const rl = await rate(isStart ? "exam-start" : "exam-answer",
      limitOf(isStart ? "RL_EXAM_START_PER_MIN" : "RL_EXAM_ANSWER_PER_MIN"),
      limitOf(isStart ? "RL_EXAM_START_PER_DAY" : "RL_EXAM_ANSWER_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    return isStart ? start(env, body) : answer(env, body);
  }
  if (path === "/exam/finish") return finish(env, body);
  return [404, { error: "No existe." }];
}
