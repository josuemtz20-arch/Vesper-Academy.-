/* ============================================================
 * exam_grader.js — el Worker califica los exámenes de nivel, los jefes y
 * los exámenes por curso (exam.html).
 * ------------------------------------------------------------
 * Las respuestas NUNCA llegan al navegador antes de contestar: el sitio
 * publica las preguntas sin claves (vesper_level_questions.js /
 * vesper_boss_questions.js) y este módulo guarda las claves (exam_keys.json,
 * generado por _scripts/exams/split_exams.js y fuera de git). Los exámenes
 * por curso viven en Firestore (exams/{id}); los lee el Worker con la cuenta
 * de servicio y al alumno solo le llegan las preguntas, sin `answer`.
 *
 * Flujo de leccion.html (todo POST JSON, mismo CORS que el chat):
 *   /exam/start  {kind:"exam"|"boss", level, version, ids?, idToken?}
 *        -> {attemptId, total, graded?}. En el jefe el cliente muestrea y
 *           manda `ids`; aquí se valida que sean del banco y del tamaño
 *           correcto. Con idToken el intento queda a nombre de ese uid (solo
 *           ese uid podrá guardar la nota al terminar).
 *   /exam/answer {attemptId, id, response}
 *        Solo cuenta la PRIMERA respuesta de cada pregunta (queda en el
 *        Durable Object ExamAttempt).
 *        - jefe ("boss", práctica de juego): -> {correct, first, reveal};
 *          `reveal` trae la clave y la explicación para pintar "Era: …".
 *        - examen de nivel ("exam", formal): -> {ok:true, first}. NADA de
 *          veredicto ni clave: antes un intento de usar y tirar cosechaba
 *          todas las respuestas y el siguiente sacaba 100.
 *   /exam/finish {attemptId, idToken?, alias?}
 *        -> {score, total, percent, passed, threshold, skills?, saved, why?}.
 *           La nota la calcula el Worker con lo registrado. `skills` (solo
 *           examen de nivel) es el desglose {destreza: {c, t}}; la respuesta
 *           nunca trae claves ni el detalle por pregunta.
 *
 * Flujo de exam.html (examen por curso, examId "exam:<bookId>"):
 *   /exam/course/start  {examId, idToken}
 *        -> {attemptId, total, exam:{title, desc, level, pass, sections}, graded}
 *           El Worker comprueba que la cuenta pueda abrir ese curso (espejo de
 *           studentBookAllowed() de firestore.rules, o profesor/admin) y
 *           devuelve las secciones SIN claves.
 *   /exam/course/finish {attemptId, idToken, answers:[índice|null, …], alias?}
 *        -> {score, total, percent, passed, threshold, sections:[{c,t}|null],
 *            saved, why?}. Califica aquí y guarda exam_results.
 *   Writing/Speaking (secciones "open") no se mandan ni se califican aquí:
 *   las evalúa el profesor y no tocan la nota automática.
 *
 * Guardar la nota (exam_results, gradedBy "worker", con la cuenta de
 * servicio; las reglas ya no aceptan estas notas escritas desde el navegador)
 * exige: sesión verificada al terminar, el MISMO uid que abrió el intento y,
 * en el examen de nivel y los de curso, cupo en el tope de intentos
 * calificados por cuenta (EXAM_CAP_* / COURSE_EXAM_CAP_*, por defecto 3 cada
 * 7 días por examen). Pasado el tope se devuelve la nota con saved:false,
 * why:"attempt_cap". El contador es otra instancia del mismo Durable Object
 * ExamAttempt, con nombre "cap:<uid>:<kind>:<nivel|curso>".
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
/* el mismo admin de respaldo que bootstrapAdmin() en firestore.rules */
const BOOTSTRAP_ADMIN = "josuemtz20@gmail.com";
const ATTEMPT_TTL_MS = 24 * 3600 * 1000;
const DETAIL_CAP = 60;            // igual que vesper_results.js y la regla
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SKILL_RANK = { grammar: 0, vocab: 1, use: 2, reading: 3, listening: 4 };
const COURSE_ID_RE = /^[A-Za-z0-9_-]{1,100}$/;

export const EXAM_RATE_DEFAULTS = {
  RL_EXAM_START_PER_MIN: 10, RL_EXAM_START_PER_DAY: 200,
  RL_EXAM_ANSWER_PER_MIN: 90, RL_EXAM_ANSWER_PER_DAY: 3000
};
/* Tope de intentos CALIFICADOS (los que se guardan) por cuenta y examen.
   Se cambian con [vars] en wrangler.toml; MAX = 0 quita el tope. */
export const EXAM_CAP_DEFAULTS = {
  EXAM_CAP_MAX: 3, EXAM_CAP_DAYS: 7,
  COURSE_EXAM_CAP_MAX: 3, COURSE_EXAM_CAP_DAYS: 7
};
export function capConf(env, course) {
  const p = course ? "COURSE_EXAM_CAP_" : "EXAM_CAP_";
  const read = (k) => {
    const v = env && env[k] != null && env[k] !== "" ? Number(env[k]) : NaN;
    return isFinite(v) && v >= 0 ? v : EXAM_CAP_DEFAULTS[k];
  };
  const days = read(p + "DAYS") || EXAM_CAP_DEFAULTS[p + "DAYS"];
  return { max: Math.floor(read(p + "MAX")), windowMs: Math.round(days * 24 * 3600 * 1000) };
}

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

/* ---------- Durable Object: un intento (o un contador de tope) ----------
   Instancias "att:<attemptId>": un intento. Instancias "cap:<uid>:…": las
   marcas de tiempo de los intentos calificados de esa cuenta en ese examen. */
export class ExamAttempt extends DurableObject {
  async init(a) {
    if (await this.ctx.storage.get("a")) return { ok: false, error: "exists" };
    const rec = Object.assign({}, a, { answered: {}, order: [], created: Date.now(), result: null });
    await this.ctx.storage.put("a", rec);
    await this.ctx.storage.setAlarm(Date.now() + ATTEMPT_TTL_MS);
    return { ok: true };
  }
  /* registra el veredicto; si la pregunta ya se contestó, gana el primero */
  async answer(id, ok) {
    const a = await this.ctx.storage.get("a");
    if (!a) return { error: "no_attempt" };
    if (a.result) return { error: "finished" };
    if (!Array.isArray(a.ids) || a.ids.indexOf(id) < 0) return { error: "not_in_attempt" };
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
  /* --- tope de intentos calificados (ventana deslizante) --- */
  async capList(windowMs) {
    const now = Date.now();
    return ((await this.ctx.storage.get("cap")) || []).filter((t) => now - t < windowMs);
  }
  async capPeek(max, windowMs) {
    const t = await this.capList(windowMs);
    return { max: max, used: t.length, left: Math.max(0, max - t.length), resetAt: t.length ? t[0] + windowMs : 0 };
  }
  /* toma un lugar si queda. El DO atiende una llamada a la vez, así que dos
     finish simultáneos no pueden pasarse del tope. */
  async capTake(max, windowMs) {
    const now = Date.now(), t = await this.capList(windowMs);
    if (t.length >= max) return { ok: false, max: max, used: t.length, left: 0, resetAt: t[0] + windowMs };
    t.push(now);
    await this.ctx.storage.put("cap", t);
    /* cuando venza la marca más nueva ya no queda nada que contar */
    await this.ctx.storage.setAlarm(now + windowMs);
    return { ok: true, ts: now, max: max, used: t.length, left: max - t.length, resetAt: t[0] + windowMs };
  }
  /* devuelve el lugar si al final la nota no se guardó (falló Firestore) */
  async capRefund(ts) {
    const t = (await this.ctx.storage.get("cap")) || [];
    const i = t.indexOf(ts);
    if (i >= 0) { t.splice(i, 1); await this.ctx.storage.put("cap", t); }
    return { ok: i >= 0 };
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
/* examen por curso: "course.<hex>" (el examId queda guardado en el DO) */
function parseCourseAttempt(s) {
  return typeof s === "string" && /^course\.[0-9a-f]{32}$/.test(s) ? s : null;
}
function attemptStub(env, attemptId) {
  return env.EXAM_ATTEMPTS.get(env.EXAM_ATTEMPTS.idFromName("att:" + attemptId));
}
/* contador del tope: misma clase de DO, otra instancia por cuenta y examen */
function capStub(env, uid, kind, which) {
  return env.EXAM_ATTEMPTS.get(env.EXAM_ATTEMPTS.idFromName("cap:" + uid + ":" + kind + ":" + which));
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
  /* en local: "dev:<correo>" o "dev:<correo>#<uid>" (para probar el uid distinto) */
  if (env.EXAM_DEV === "1" && typeof idToken === "string" && idToken.indexOf("dev:") === 0) {
    const parts = idToken.slice(4).split("#");
    return { uid: parts[1] || "dev-uid", email: parts[0].toLowerCase(), verified: true };
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

/* lee un documento con la cuenta de servicio: sus `fields`, o null si no existe */
async function fsGet(token, path) {
  const r = await fetch(fsBase() + "/" + path, { headers: { Authorization: "Bearer " + token } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(path.split("/")[0] + " " + r.status);
  return ((await r.json()).fields) || {};
}
const fsStr = (f, k) => (f && f[k] && typeof f[k].stringValue === "string") ? f[k].stringValue : "";

async function studentIdentity(token, email) {
  const f = await fsGet(token, "students/" + encodeURIComponent(email));
  return { sid: fsStr(f, "sid"), group: fsStr(f, "group") };
}

/* ¿Puede esta cuenta abrir el examen del curso `id`? Espejo de las reglas:
   studentBookAllowed(id) (alumno en students/; si su doc trae `books`, solo
   esos cursos) || isTeacherUser() || isAdmin(). */
async function courseAccess(token, email, id) {
  const enc = encodeURIComponent(email);
  const st = await fsGet(token, "students/" + enc);
  if (st) {
    if (!("books" in st)) return true;
    const vals = (st.books.arrayValue && st.books.arrayValue.values) || [];
    if (vals.some((v) => v.stringValue === id)) return true;
  }
  if (await fsGet(token, "teachers/" + enc)) return true;
  if (email === BOOTSTRAP_ADMIN) return true;
  return fsStr(await fsGet(token, "roles/" + enc), "role") === "admin";
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

/* uid verificado del idToken, o "" (sin sesión, token inválido o correo sin verificar) */
async function verifiedUid(env, idToken) {
  if (!idToken) return "";
  try { const u = await lookupUser(env, idToken); return u && u.verified ? u.uid : ""; }
  catch (e) { return ""; }
}

/* Cuántos intentos calificados le quedan (solo informativo, no reserva nada). */
async function capInfo(env, uid, kind, which) {
  const c = capConf(env, kind === "course");
  if (!uid || kind === "boss" || c.max <= 0) return undefined;
  try { return await capStub(env, uid, kind, which).capPeek(c.max, c.windowMs); }
  catch (e) { return undefined; }
}

/* Guarda la nota del intento `a` si se puede. Reglas:
   - sesión verificada al terminar, y el MISMO uid que abrió el intento
     (un intento abierto sin sesión, o por otra cuenta, no se guarda);
   - examen de nivel y de curso: cupo en el tope de intentos calificados;
     el lugar se toma ANTES de escribir y se devuelve si Firestore falla. */
async function gradedSave(env, a, body, res, which) {
  if (!body.idToken) return { saved: false, why: "no_session" };
  const user = await lookupUser(env, body.idToken);
  if (!user || !user.verified || !user.email) return { saved: false, why: "no_session" };
  if (!a.uid || user.uid !== a.uid) return { saved: false, why: "session_mismatch" };
  let slot = null, capOut;
  const c = capConf(env, a.kind === "course");
  if (a.kind !== "boss" && c.max > 0) {
    const stub = capStub(env, user.uid, a.kind, which);
    slot = await stub.capTake(c.max, c.windowMs);
    capOut = { max: slot.max, used: slot.used, left: slot.left, resetAt: slot.resetAt };
    if (!slot.ok) return { saved: false, why: "attempt_cap", cap: capOut };
    try {
      const s = await saveResult(env, user, cleanAlias(body.alias), res);
      return Object.assign(s, { cap: capOut });
    } catch (e) {
      try { await stub.capRefund(slot.ts); } catch (er) {}
      throw e;
    }
  }
  return saveResult(env, user, cleanAlias(body.alias), res);
}
async function gradedSaveSafe(env, a, body, res, which) {
  try { return await gradedSave(env, a, body, res, which); }
  catch (e) { console.error("exam save:", e && e.message); return { saved: false, why: "save_failed" }; }
}
/* la respuesta al navegador: sin el detalle por pregunta (ese va solo a Firestore) */
function publicResult(res, extra) {
  const out = Object.assign({}, res, extra || {});
  delete out.detail;
  return out;
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
  /* el intento queda a nombre de quien lo abre: solo ese uid podrá guardarlo */
  const uid = await verifiedUid(env, body.idToken);
  const attemptId = kind + "." + level + "." + randomId();
  const r = await attemptStub(env, attemptId).init({ kind, level, ids, uid });
  if (!r.ok) return [500, { error: "No se pudo abrir el examen." }];
  const out = { attemptId: attemptId, total: ids.length };
  const g = await capInfo(env, uid, kind, level);
  if (g) out.graded = g;
  return [200, out];
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
  /* examen de nivel: a ciegas hasta el final (ni veredicto ni clave) */
  if (at.kind === "exam") return [200, { ok: true, first: st.first }];
  return [200, { correct: st.ok, first: st.first, reveal: reveal(ex) }];
}

/* desglose por destreza del examen de nivel: {grammar: {c, t}, …} */
function skillBreakdown(bank, a) {
  const out = {};
  a.ids.forEach((id) => {
    const sk = (bank.items[id] && bank.items[id].skill) || "otro";
    if (!out[sk]) out[sk] = { c: 0, t: 0 };
    out[sk].t++;
    if (a.answered[id] === true) out[sk].c++;
  });
  return out;
}

async function finish(env, body) {
  const at = parseAttempt(body.attemptId);
  if (!at) return [400, { error: "Intento inválido." }];
  const stub = attemptStub(env, at.id);
  const a = await stub.state();
  if (!a) return [404, { error: "El examen caducó.", code: "expired" }];
  const bank = bankOf(at.kind, at.level);
  if (!bank) return [404, { error: "No hay examen para ese nivel." }];
  const extra = at.kind === "exam" ? { skills: skillBreakdown(bank, a) } : {};
  if (a.result) return [200, publicResult(a.result, Object.assign(extra, { saved: false, why: "already_finished" }))];
  const answered = a.order.length;
  const total = at.kind === "boss" ? Math.max(1, Math.min(a.ids.length, answered)) : a.ids.length;
  const correct = a.order.filter((id) => a.answered[id] === true).length;
  const percent = Math.round(100 * correct / Math.max(1, total));
  const threshold = bank.pass;
  const ids = at.kind === "boss" ? a.order.slice() : a.ids.slice();
  if (at.kind === "exam") {
    const pos = {}; a.ids.forEach((id, i) => { pos[id] = i; });
    const rk = (id) => { const s = bank.items[id].skill; return (s in SKILL_RANK) ? SKILL_RANK[s] : 9; };
    ids.sort((x, y) => (rk(x) - rk(y)) || (pos[x] - pos[y]));
  }
  const res = {
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
  if (!closed.first) return [200, publicResult(closed.result, Object.assign(extra, { saved: false, why: "already_finished" }))];
  const save = await gradedSaveSafe(env, a, body, res, at.level);
  return [200, publicResult(res, Object.assign(extra, save))];
}

/* ---------- exámenes por curso (exam.html) ----------
   Documento exams/{id}: campo `data` = JSON {title, desc, level?, pass?,
   sections:[{title, instructions?, passage?, audio?, type?, tasks?,
   questions:[{q, options:[…], answer:<índice>}]}]}. Las secciones
   type "open" (Writing/Speaking) traen `tasks` y las califica el profesor. */

/* separa lo que ve el alumno de la clave. Las preguntas cerradas se numeran
   en el orden en que exam.html las pinta (sección por sección). */
export function splitCourseExam(EX) {
  const key = [], secOf = [], qtext = [], sections = [];
  (EX.sections || []).forEach((sec, si) => {
    const s = {};
    for (const k of ["title", "instructions", "passage", "audio", "type"]) if (typeof sec[k] === "string") s[k] = sec[k];
    if (sec.type === "open") {
      s.tasks = (sec.tasks || []).filter((t) => typeof t === "string");
    } else {
      s.questions = (sec.questions || []).map((q) => {
        key.push(isInt(q.answer) ? q.answer : -1);
        secOf.push(si);
        qtext.push(String(q.q || "").replace(/<[^>]*>/g, "").slice(0, 200));
        return { q: String(q.q || ""), options: (Array.isArray(q.options) ? q.options : []).map(String) };
      });
    }
    sections.push(s);
  });
  return {
    pub: { title: String(EX.title || ""), desc: String(EX.desc || ""), level: String(EX.level || ""),
           pass: isInt(EX.pass) ? EX.pass : 60, sections: sections },
    key: key, secOf: secOf, qtext: qtext
  };
}

/* califica las respuestas del alumno contra la clave del intento */
export function gradeCourse(a, answers) {
  if (!Array.isArray(answers) || answers.length !== a.key.length
      || !answers.every((v) => v === null || isInt(v))) return null;
  const nsec = a.secOf.length ? Math.max.apply(null, a.secOf) + 1 : 0;
  const sections = [];
  for (let i = 0; i < nsec; i++) sections.push(null);
  let correct = 0;
  const detail = a.key.map((k, i) => {
    const si = a.secOf[i];
    if (!sections[si]) sections[si] = { c: 0, t: 0 };
    sections[si].t++;
    const ok = k >= 0 && answers[i] === k;
    if (ok) { correct++; sections[si].c++; }
    return { q: a.qtext[i] || "", type: "multiple_choice", skill: "", correct: ok };
  });
  const total = a.key.length;
  const percent = total ? Math.round(100 * correct / total) : 0;
  return {
    res: {
      examType: "exam", examId: "exam:" + a.examId, level: a.level || "",
      score: correct, total: total, percent: percent, threshold: a.pass, passed: percent >= a.pass,
      detail: detail.slice(0, DETAIL_CAP)
    },
    sections: sections
  };
}

async function courseStart(env, body) {
  const examId = body.examId;
  if (typeof examId !== "string" || !COURSE_ID_RE.test(examId)) return [400, { error: "Examen inválido." }];
  const user = body.idToken ? await lookupUser(env, body.idToken) : null;
  if (!user || !user.email) return [401, { error: "Inicia sesión para presentar el examen.", code: "no_session" }];
  if (!user.verified) return [403, { error: "Verifica tu correo y vuelve a entrar.", code: "unverified" }];
  if (!env.FIREBASE_SA) return [503, { error: "Exámenes por curso no configurados en el servidor." }];
  const token = await saAccessToken(env);
  if (!(await courseAccess(token, user.email, examId))) {
    return [403, { error: "Tu cuenta no puede abrir este examen.", code: "forbidden" }];
  }
  const doc = await fsGet(token, "exams/" + encodeURIComponent(examId));
  if (!doc) return [404, { error: "Este examen aún no está disponible.", code: "not_found" }];
  let EX = null;
  try { EX = JSON.parse(fsStr(doc, "data")); } catch (e) { EX = null; }
  if (!EX || !Array.isArray(EX.sections)) return [500, { error: "El examen está incompleto en el servidor.", code: "bad_exam" }];
  const sp = splitCourseExam(EX);
  const attemptId = "course." + randomId();
  /* la clave se queda en el DO del intento; al navegador va solo `pub` */
  const r = await attemptStub(env, attemptId).init({
    kind: "course", examId: examId, uid: user.uid, level: sp.pub.level, pass: sp.pub.pass,
    key: sp.key, secOf: sp.secOf, qtext: sp.qtext
  });
  if (!r.ok) return [500, { error: "No se pudo abrir el examen." }];
  const out = { attemptId: attemptId, total: sp.key.length, exam: sp.pub };
  const g = await capInfo(env, user.uid, "course", examId);
  if (g) out.graded = g;
  return [200, out];
}

async function courseFinish(env, body) {
  const attId = parseCourseAttempt(body.attemptId);
  if (!attId) return [400, { error: "Intento inválido." }];
  const stub = attemptStub(env, attId);
  const a = await stub.state();
  if (!a || a.kind !== "course") return [404, { error: "El examen caducó. Recarga la página.", code: "expired" }];
  if (a.result) return [200, publicResult(a.result.res, { sections: a.result.sections, saved: false, why: "already_finished" })];
  const g = gradeCourse(a, body.answers);
  if (!g) return [400, { error: "Respuestas con formato inválido." }];
  const closed = await stub.close(g);
  if (!closed) return [404, { error: "El examen caducó. Recarga la página.", code: "expired" }];
  if (!closed.first) return [200, publicResult(closed.result.res, { sections: closed.result.sections, saved: false, why: "already_finished" })];
  const save = await gradedSaveSafe(env, a, body, g.res, a.examId);
  return [200, publicResult(g.res, Object.assign({ sections: g.sections }, save))];
}

/* punto de entrada desde el fetch del Worker. `rate(key, perMin, perDay)`
   es el contador por IP del chat (RateLimiter). */
export async function handleExam(path, body, env, rate, limitOf) {
  if (!env.EXAM_ATTEMPTS) return [503, { error: "Exámenes no configurados en el servidor." }];
  const ROUTES = {
    "/exam/start": [start, "START"], "/exam/answer": [answer, "ANSWER"],
    "/exam/course/start": [courseStart, "START"], "/exam/course/finish": [courseFinish, "ANSWER"]
  };
  const rt = ROUTES[path];
  if (rt) {
    const rl = await rate(rt[1] === "START" ? "exam-start" : "exam-answer",
      limitOf("RL_EXAM_" + rt[1] + "_PER_MIN"), limitOf("RL_EXAM_" + rt[1] + "_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    return rt[0](env, body);
  }
  if (path === "/exam/finish") return finish(env, body);
  return [404, { error: "No existe." }];
}
