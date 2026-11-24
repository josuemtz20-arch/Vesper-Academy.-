/* ============================================================
 * exam_grader.js — el Worker califica los exámenes de nivel y los jefes.
 * ------------------------------------------------------------
 * Las respuestas NUNCA llegan al navegador antes de contestar: el sitio
 * publica las preguntas sin claves (vesper_level_exams.js /
 * vesper_boss_exams.js) y este módulo guarda las claves (exam_keys.json,
 * generado por _scripts/exams/split_exams.js y fuera de git).
 *
 * Flujo (todo POST JSON, mismo CORS que el chat):
 *   /exam/start  {kind:"exam"|"boss", level, version, idToken?}
 *        -> {attemptId, total, ids?}. El intento recuerda el uid de quien lo
 *           abre (si trae sesión). En el jefe las preguntas las SORTEA el
 *           Worker y vuelven en `ids` (2026-11-23; antes las escogía el
 *           cliente, que podía pedir justo las que ya conocía).
 *   /exam/answer {attemptId, id, response}
 *        -> jefe: {correct, first, reveal}; examen de nivel: {recorded, first}.
 *           Solo cuenta la PRIMERA respuesta de cada pregunta (queda en el
 *           Durable Object ExamAttempt). El examen de nivel es un banco fijo y
 *           chico: no devuelve ni la clave ni ✓/✗ (con el veredicto por
 *           pregunta, 3-4 intentos reconstruían la clave; 2026-11-23).
 *   /exam/finish {attemptId, idToken?, alias?}
 *        -> {score, total, percent, passed, threshold, saved} + en el jefe
 *           `detail` por pregunta; en el examen de nivel `bySkill` en su lugar
 *           (ver publicResult). La nota la
 *           calcula el Worker con lo registrado y la guarda él mismo en
 *           Firestore (exam_results, gradedBy "worker") con la cuenta de
 *           servicio, SOLO si el idToken es de la misma cuenta que abrió el
 *           intento. Las reglas no aceptan esas notas desde el navegador.
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
  RL_EXAM_ANSWER_PER_MIN: 90, RL_EXAM_ANSWER_PER_DAY: 3000,
  /* examen de nivel: banco fijo; tope de intentos nuevos al día (frena la cosecha de claves).
     Con idToken verificado se cuenta por uid (moderado); sin sesión, por IP.
     2026-11-23: el tope por IP bajó de 150 a 20. Aunque /exam/answer ya no dice ✓/✗,
     la NOTA FINAL sigue siendo un oráculo (cambiar una respuesta por intento y ver si
     sube); con 150 al día la clave salía en 1-2 días, con 20 tarda semanas. Costo: una
     escuela o un NAT de operador (CGNAT en celular) comparte IP; esos alumnos deben
     entrar con su cuenta (contador por uid, no por IP). Se sube con [vars] sin tocar código. */
  RL_EXAM_LEVEL_START_PER_DAY: 12,
  RL_EXAM_LEVEL_START_PER_DAY_IP: 20
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
    /* uid: la cuenta que abrió el intento ("" si fue sin sesión). Solo esa
       cuenta puede guardar la nota en /exam/finish. */
    await this.ctx.storage.put("a", { kind: a.kind, level: a.level, ids: a.ids, uid: a.uid || "", answered: {}, order: [], created: Date.now(), result: null });
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
/* entero uniforme en [0, n) con crypto (sin sesgo de módulo) */
function randInt(n) {
  const lim = Math.floor(0x100000000 / n) * n, b = new Uint32Array(1);
  do { crypto.getRandomValues(b); } while (b[0] >= lim);
  return b[0] % n;
}
function shuffled(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = randInt(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
/* Muestreo del jefe: el mismo criterio que buildBossExam() de leccion_app.js
   (TOEFL: 1 lectura + 1 listening garantizados, y el resto al azar). Lo hace
   el SERVIDOR para que el alumno no pueda escoger las preguntas que ya vio. */
function sampleBoss(bank) {
  const all = Object.keys(bank.items), size = Math.min(bank.size || 8, all.length);
  let picked;
  if (bank.toefl) {
    const one = (t) => shuffled(all.filter((id) => bank.items[id].type === t)).slice(0, 1);
    const rest = shuffled(all.filter((id) => bank.items[id].type !== "reading" && bank.items[id].type !== "listening"));
    picked = one("reading").concat(one("listening"), rest).slice(0, size);
  } else picked = shuffled(all).slice(0, size);
  return shuffled(picked);
}
/* local (wrangler dev sin cuenta de servicio): el script de pruebas necesita
   abrir el jefe con ids escogidos para recorrer TODO el banco */
function isDevEnv(env) { return env.EXAM_DEV === "1" && !env.FIREBASE_SA; }
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

export async function saAccessToken(env) {
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

export const fsBase = () => "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/" + FS_DB + "/documents";

/* ¿quién es? Identity Toolkit valida el idToken (firma, caducidad, proyecto). */
export async function lookupUser(env, idToken) {
  /* tokens "dev:" solo en local: con cuenta de servicio real (producción) se
     ignoran aunque alguien deje EXAM_DEV=1 puesto por error */
  if (env.EXAM_DEV === "1" && !env.FIREBASE_SA && typeof idToken === "string" && idToken.indexOf("dev:") === 0) {
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
  const raw = String(u.email || "").trim(), email = raw.toLowerCase();
  /* Solo ASCII imprimible: toLowerCase() convierte el signo Kelvin (U+212A) en
     "k" (y hay otros casos así), y un correo con él podría caer en el doc
     students/{correo} de OTRA persona. Se mira ANTES y después de pasar a
     minúsculas: después solo, el Kelvin ya es una "k" ASCII y pasaría.
     Sin correo (cuenta sin email) sigue igual. */
  const ASCII = /^[\x21-\x7e]+$/;
  if (raw && !(ASCII.test(raw) && ASCII.test(email))) {
    const at = email.lastIndexOf("@");
    console.warn("lookupUser: correo con caracteres fuera de ASCII, se rechaza (uid " + String(u.localId).slice(0, 6)
      + "…, dominio " + (at >= 0 ? email.slice(at + 1).replace(/[^\x21-\x7e]/g, "?") : "?") + ")");
    return null;
  }
  return { uid: u.localId, email: email, verified: !!u.emailVerified };
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

/* Valida kind/level/version antes de gastar una consulta a Identity Toolkit. */
function startCheck(body) {
  const kind = body.kind, level = body.level;
  if ((kind !== "exam" && kind !== "boss") || LEVELS.indexOf(level) < 0) return [400, { error: "Examen inválido." }];
  if (body.version !== KEYS.version) {
    return [409, { error: "Hay una versión nueva de los exámenes. Recarga la página.", code: "stale" }];
  }
  if (!bankOf(kind, level)) return [404, { error: "No hay examen para ese nivel." }];
  return null;
}

async function start(env, body, user) {
  const bad = startCheck(body);
  if (bad) return bad;
  const kind = body.kind, level = body.level, bank = bankOf(kind, level);
  const all = Object.keys(bank.items);
  let ids;
  if (kind === "exam") ids = all;
  else if (!(isDevEnv(env) && body.devIds)) {
    /* Jefe: las preguntas las sortea el Worker y se las manda a la app (que
       tiene el banco sin claves). Los `ids` que mande el cliente se ignoran:
       antes podía escoger justo las que ya había visto con su clave. */
    ids = sampleBoss(bank);
  } else {
    /* solo en local: el script de pruebas escoge (devIds) para recorrer el banco */
    ids = body.devIds;
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
  const r = await attemptStub(env, attemptId).init({ kind, level, ids, uid: (user && user.verified && user.uid) || "" });
  if (!r.ok) return [500, { error: "No se pudo abrir el examen." }];
  const out = { attemptId: attemptId, total: ids.length };
  if (kind === "boss") out.ids = ids;   // la app pinta ESTAS preguntas, en este orden
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
  /* Examen de nivel: banco fijo y chico (26–31 preguntas, todas en cada
     intento), así que NO sale ni la clave ni el veredicto: solo "registrada".
     Con ✓/✗ por pregunta bastaban 3-4 intentos (todo A, todo B, todo C…) para
     reconstruir la clave de la opción múltiple y sacar 100 con la cuenta
     (2026-11-23). La nota llega al final, con un resumen por habilidad.
     El jefe sí revela ("Era: …"): sus preguntas las sortea el Worker. */
  if (at.kind === "exam") return [200, { recorded: true, first: st.first }];
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
    /* Las no contestadas cuentan como malas: antes el jefe dividía entre las
       contestadas y bastaba UNA buena + /exam/finish para sacar 100. */
    const total = Math.max(1, a.ids.length);
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
    if (at.kind === "exam") res.bySkill = skillSummary(bank, a.ids, a.answered);
    /* el DO decide quién llegó primero (dos finish a la vez): solo ese guarda */
    const closed = await stub.close(res);
    if (!closed) return [404, { error: "El examen caducó.", code: "expired" }];
    if (!closed.first) return [200, Object.assign(publicResult(closed.result), { saved: false, why: "already_finished" })];
    /* guardar en Firestore solo la primera vez, si hay sesión */
    /* y solo si quien cierra es la MISMA cuenta que abrió el intento: un
       intento abierto sin sesión (o con otra cuenta) no se guarda nunca */
    let save = { saved: false, why: "no_session" };
    if (body.idToken) {
      try {
        const user = await lookupUser(env, body.idToken);
        if (!a.uid) save = { saved: false, why: "anonymous_start" };
        else if (!user || user.uid !== a.uid) save = { saved: false, why: "not_owner" };
        else save = await saveResult(env, user, cleanAlias(body.alias), res);
      }
      catch (e) { console.error("exam save:", e && e.message); save = { saved: false, why: "save_failed" }; }
    }
    return [200, Object.assign(publicResult(res), publicSave(res, save))];
  }
  return [200, Object.assign(publicResult(res), { saved: false, why: "already_finished" })];
}

/* Resumen por habilidad del examen de nivel: {grammar:{correct,total},…}.
   Cuenta sobre TODAS las preguntas del intento (las no contestadas, malas). */
function skillSummary(bank, ids, answered) {
  const out = {};
  ids.forEach((id) => {
    const s = (bank.items[id] && bank.items[id].skill) || "otro";
    if (!out[s]) out[s] = { correct: 0, total: 0 };
    out[s].total++;
    if (answered[id] === true) out[s].correct++;
  });
  return out;
}
/* Lo que el NAVEGADOR recibe al cerrar. En el examen de nivel se quita la
   lista por pregunta (`detail`, con `correct`): junto con un intento hecho a
   propósito (todo A, todo B…) volvía a soltar la clave. Queda la nota y el
   resumen por habilidad. El documento de Firestore (toFsDoc) SÍ guarda
   `detail` completo: los profesores lo usan.
   Riesgo residual: el alumno puede leer su propio exam_results (regla de
   lectura del dueño) y ahí está `detail`. Solo pasa con intentos guardados,
   que exigen cuenta verificada y abrir el intento con ella, y esos tienen
   tope de RL_EXAM_LEVEL_START_PER_DAY (12) al día por uid; sin sesión (tope
   por IP) no se guarda nada y no hay `detail` que leer. */
function publicResult(res) {
  const out = Object.assign({}, res);
  if (res.examType === "exam") delete out.detail;
  return out;
}
/* en local (dry_run) `save.doc` es el documento que se habría escrito: en el
   examen de nivel va sin `detail` por la misma razón */
function publicSave(res, save) {
  if (res.examType !== "exam" || !save || !save.doc || !save.doc.fields) return save;
  const fields = Object.assign({}, save.doc.fields);
  delete fields.detail;
  return Object.assign({}, save, { doc: Object.assign({}, save.doc, { fields: fields }) });
}

/* punto de entrada desde el fetch del Worker. `rate(key, perMin, perDay)`
   es el contador por IP del chat (RateLimiter). */
export async function handleExam(path, body, env, rate, limitOf, rateRaw) {
  if (!env.EXAM_ATTEMPTS) return [503, { error: "Exámenes no configurados en el servidor." }];
  if (path === "/exam/start" || path === "/exam/answer") {
    const isStart = path === "/exam/start";
    const rl = await rate(isStart ? "exam-start" : "exam-answer",
      limitOf(isStart ? "RL_EXAM_START_PER_MIN" : "RL_EXAM_ANSWER_PER_MIN"),
      limitOf(isStart ? "RL_EXAM_START_PER_DAY" : "RL_EXAM_ANSWER_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    /* examen de nivel (banco fijo): tope diario de intentos nuevos. Ya no
       devuelve ni clave ni veredicto por pregunta, pero el tope sigue frenando
       que se "cosechen" notas finales con intentos a propósito. Solo cuenta
       cuando el inicio fue válido (los 400/409 no gastan cupo). */
    if (!isStart) return answer(env, body);
    /* ¿quién abre el intento? Se guarda su uid: solo esa cuenta podrá guardar la nota */
    const bad = startCheck(body);
    if (bad) return bad;
    let user = null;
    if (body.idToken) { try { user = await lookupUser(env, body.idToken); } catch (e) { user = null; } }
    const out = await start(env, body, user);
    if (out[0] !== 200 || body.kind !== "exam") return out;
    /* examen de nivel: tope diario de intentos nuevos. Con uid verificado,
       clave solo por uid (sin IP, para que el tope no se reinicie al cambiar
       de red); si no, solo IP con tope alto (esos intentos ya no se guardan) */
    const rl2 = user && user.uid
      ? await (rateRaw || rate)("exam-level-uid:" + user.uid, 0, limitOf("RL_EXAM_LEVEL_START_PER_DAY"))
      : await rate("exam-level-start", 0, limitOf("RL_EXAM_LEVEL_START_PER_DAY_IP"));
    /* si excede, el intento ya creado queda huérfano (el cliente nunca recibe su id) y caduca solo */
    if (!rl2.ok) return [429, { error: "Hoy ya hiciste varios intentos del examen de nivel. Vuelve mañana.", code: "rate_limited", retryAfter: rl2.retryAfter || 3600 }];
    return out;
  }
  if (path === "/exam/finish") {
    const rl = await rate("exam-finish", limitOf("RL_EXAM_START_PER_MIN"), limitOf("RL_EXAM_START_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    return finish(env, body);
  }
  return [404, { error: "No existe." }];
}
