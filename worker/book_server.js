/* ============================================================
 * book_server.js — el Worker entrega las páginas de los libros Canva.
 * ------------------------------------------------------------
 * POR QUÉ: cada página guardada en Firestore costaba 35–50 unidades de
 * lectura de un tope diario (~50 000) que comparten TODOS los alumnos; con
 * unos 100–150 alumnos leyendo el mismo día se acababa y nadie abría libros.
 * Ahora las páginas son JPG en Cloudflare R2 (sin costo de salida) y
 * Firestore solo se consulta una vez por libro abierto, para el permiso.
 * Plan: book/_reportes/plan-libros-fuera-de-firestore-2026-11-20.md
 *
 * Flujo:
 *   POST /book/open {idToken, id, ver?}
 *        -> {pages, ver, vk, u, e, s}. Valida la sesión (Identity Toolkit),
 *           aplica la MISMA regla que firestore.rules para studentbooks/
 *           (alumno con el libro en `books` o sin `books`, profesor, admin) y
 *           firma un permiso de BOOK_TTL_S atado a ese libro y esa versión.
 *           Si `ver` no coincide con la de R2 responde 409 ("stale"): el libro
 *           se volvió a publicar en Firestore y R2 aún no, y la carcasa usa
 *           Firestore como antes.
 *   GET  /book/page?id=&n=&vk=&u=&e=&s=
 *        -> el JPG. Solo revisa la firma: no llama a Google ni a Firestore.
 *
 * R2 (binding BOOKS, bucket vesper-libros):
 *   books/{id}/meta.json         {id, title, pages, ver, vk, uploadedAt}
 *   books/{id}/{vk}/{n}.jpg      página n (1..pages); vk = ver sin símbolos
 * Una versión nueva se sube en su propia carpeta y la meta se escribe AL
 * FINAL, así que un corte a medias nunca mezcla páginas de dos versiones.
 *
 * Sin binding BOOKS, sin meta o con cualquier error, /book/open responde
 * algo distinto de 200 y la carcasa lee de Firestore como siempre.
 * ============================================================ */
"use strict";

import { saAccessToken, fsBase, lookupUser } from "./exam_grader.js";

const FOUNDER = "josuemtz20@gmail.com";   // igual que bootstrapAdmin() en las reglas
const BOOK_TTL_S = 2 * 3600;              // permiso firmado: 2 horas (decisión 2026-11-20)
const ID_RE = /^[a-z0-9_]{1,64}$/;
const VK_RE = /^[0-9A-Za-z]{1,64}$/;
const MAX_PAGES = 1000;

export const BOOK_RATE_DEFAULTS = { RL_BOOK_OPEN_PER_MIN: 30, RL_BOOK_OPEN_PER_DAY: 1000 };

export const verKey = (ver) => String(ver || "").replace(/[^0-9A-Za-z]/g, "").slice(0, 64) || "v0";

function isDev(env) { return env.EXAM_DEV === "1" && !env.FIREBASE_SA; }

function signingKey(env) {
  if (env.BOOK_SIGNING_KEY) return env.BOOK_SIGNING_KEY;
  if (isDev(env)) return "dev-only-book-key";
  return "";
}

function b64url(buf) {
  let bin = ""; const u = new Uint8Array(buf);
  for (let i = 0; i < u.length; i++) bin += String.fromCharCode(u[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function signBook(secret, id, vk, uid, exp) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(["book", id, vk, uid, exp].join("|")));
  return b64url(sig);
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/* ---------- permiso: espejo de studentbooks/ en firestore.rules ----------
 *   studentBookAllowed(id) || isTeacherUser() || isAdmin()
 * Se lee en ese orden (los alumnos son la mayoría): casi siempre 1 lectura. */
async function getDocFields(token, path) {
  const r = await fetch(fsBase() + "/" + path, { headers: { Authorization: "Bearer " + token } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(path.split("/")[0] + " " + r.status);
  return (await r.json()).fields || {};
}

export function studentAllows(fields, id) {
  if (!fields) return false;
  if (!("books" in fields)) return true;              // sin `books` = todos los libros
  const vals = ((fields.books || {}).arrayValue || {}).values || [];
  return vals.some((v) => v && v.stringValue === id);
}

async function bookAllowed(env, email, id) {
  if (email === FOUNDER) return true;
  if (isDev(env)) {
    /* local: BOOK_DEV_ACCESS = {"correo": ["libro", ...] | "*" | "teacher"} */
    let m = {};
    try { m = JSON.parse(env.BOOK_DEV_ACCESS || "{}"); } catch (e) { m = {}; }
    const a = m[email];
    return a === "*" || a === "teacher" || (Array.isArray(a) && a.indexOf(id) !== -1);
  }
  const token = await saAccessToken(env);
  const enc = encodeURIComponent(email);
  if (studentAllows(await getDocFields(token, "students/" + enc), id)) return true;
  if (await getDocFields(token, "teachers/" + enc)) return true;
  const role = await getDocFields(token, "roles/" + enc);
  return !!(role && role.role && role.role.stringValue === "admin");
}

/* ---------- POST /book/open ---------- */
export async function handleBookOpen(body, env, rate, limitOf) {
  const id = String(body.id || "");
  if (!ID_RE.test(id)) return [400, { error: "Libro inválido.", code: "bad_id" }];
  if (!env.BOOKS) return [503, { error: "Almacén de libros no configurado.", code: "no_r2" }];

  const rl = await rate("book-open", limitOf("RL_BOOK_OPEN_PER_MIN"), limitOf("RL_BOOK_OPEN_PER_DAY"));
  if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];

  const secret = signingKey(env);
  if (!secret) return [503, { error: "Falta la clave de firma.", code: "no_key" }];

  const user = await lookupUser(env, body.idToken);
  if (!user) return [401, { error: "Sesión inválida o caducada.", code: "auth" }];
  if (!user.verified || !user.email) return [403, { error: "Correo sin verificar.", code: "unverified" }];

  const metaObj = await env.BOOKS.get("books/" + id + "/meta.json");
  if (!metaObj) return [404, { error: "Este libro aún no está en el almacén nuevo.", code: "no_r2" }];
  let meta;
  try { meta = JSON.parse(await metaObj.text()); } catch (e) { return [500, { error: "Meta dañada.", code: "bad_meta" }]; }
  const pages = parseInt(meta.pages, 10) || 0;
  const vk = String(meta.vk || verKey(meta.ver));
  if (!pages || pages > MAX_PAGES || !VK_RE.test(vk)) return [500, { error: "Meta dañada.", code: "bad_meta" }];
  if (body.ver && String(body.ver) !== String(meta.ver)) {
    return [409, { error: "El libro cambió y el almacén nuevo aún no.", code: "stale" }];
  }

  if (!(await bookAllowed(env, user.email, id))) {
    return [403, { error: "Tu cuenta no tiene acceso a este libro.", code: "forbidden" }];
  }

  const e = Math.floor(Date.now() / 1000) + BOOK_TTL_S;
  const s = await signBook(secret, id, vk, user.uid, e);
  return [200, { pages: pages, ver: meta.ver, vk: vk, u: user.uid, e: e, s: s }];
}

/* ---------- GET /book/page ---------- */
export async function handleBookPage(url, env) {
  const q = url.searchParams;
  const id = q.get("id") || "", vk = q.get("vk") || "", u = q.get("u") || "", s = q.get("s") || "";
  const n = parseInt(q.get("n") || "", 10), e = parseInt(q.get("e") || "", 10);
  if (!ID_RE.test(id) || !VK_RE.test(vk) || !/^[A-Za-z0-9_-]{1,128}$/.test(u) ||
      !(n >= 1 && n <= MAX_PAGES) || !e || s.length > 100) {
    return [400, null, "bad_request"];
  }
  if (e < Math.floor(Date.now() / 1000)) return [401, null, "expired"];
  if (e > Math.floor(Date.now() / 1000) + BOOK_TTL_S + 60) return [403, null, "bad_sig"];
  const secret = signingKey(env);
  if (!secret || !env.BOOKS) return [503, null, "no_r2"];
  if (!safeEqual(s, await signBook(secret, id, vk, u, e))) return [403, null, "bad_sig"];
  const obj = await env.BOOKS.get("books/" + id + "/" + vk + "/" + n + ".jpg");
  if (!obj) return [404, null, "no_page"];
  return [200, obj, ""];
}

/* ============================================================
 * POST /doc/get {idToken, kind, id, ver}  ->  el HTML completo
 * ------------------------------------------------------------
 * Para los documentos que son UN HTML (no páginas): manuales del profesor
 * (kind "manual", Firestore manuals/) y libros HTML del alumno (kind "book",
 * Firestore studentbooks/ sin format canva-pages, p. ej. Practice 1).
 * manual.html / libro.html siguen leyendo la meta de Firestore (1 unidad) y
 * mandan su updatedAt como `ver`; si R2 tiene esa misma versión se entrega
 * desde aquí, si no (409/404/error) leen los trozos de Firestore como antes.
 * Permiso: manual -> profesor o admin (match /manuals en las reglas);
 *          book   -> la misma regla de studentbooks/ que /book/open.
 * R2: docs/{kind}/{id}/meta.json {ver, vk, bytes} + docs/{kind}/{id}/{vk}.html
 * ============================================================ */
async function teacherOrAdmin(env, email) {
  if (email === FOUNDER) return true;
  if (isDev(env)) {
    let m = {};
    try { m = JSON.parse(env.BOOK_DEV_ACCESS || "{}"); } catch (e) { m = {}; }
    return m[email] === "teacher";
  }
  const token = await saAccessToken(env);
  const enc = encodeURIComponent(email);
  if (await getDocFields(token, "teachers/" + enc)) return true;
  const role = await getDocFields(token, "roles/" + enc);
  return !!(role && role.role && role.role.stringValue === "admin");
}

export async function handleDocGet(body, env, rate, limitOf) {
  const kind = String(body.kind || ""), id = String(body.id || "");
  if (kind !== "manual" && kind !== "book") return [400, { error: "Tipo inválido.", code: "bad_kind" }];
  if (!ID_RE.test(id)) return [400, { error: "Documento inválido.", code: "bad_id" }];
  if (!env.BOOKS) return [503, { error: "Almacén no configurado.", code: "no_r2" }];

  const rl = await rate("doc-get", limitOf("RL_BOOK_OPEN_PER_MIN"), limitOf("RL_BOOK_OPEN_PER_DAY"));
  if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];

  const user = await lookupUser(env, body.idToken);
  if (!user) return [401, { error: "Sesión inválida o caducada.", code: "auth" }];
  if (!user.verified || !user.email) return [403, { error: "Correo sin verificar.", code: "unverified" }];

  const dir = "docs/" + kind + "/" + id + "/";
  const metaObj = await env.BOOKS.get(dir + "meta.json");
  if (!metaObj) return [404, { error: "Aún no está en el almacén nuevo.", code: "no_r2" }];
  let meta;
  try { meta = JSON.parse(await metaObj.text()); } catch (e) { return [500, { error: "Meta dañada.", code: "bad_meta" }]; }
  const vk = String(meta.vk || verKey(meta.ver));
  if (!VK_RE.test(vk)) return [500, { error: "Meta dañada.", code: "bad_meta" }];
  if (!body.ver || String(body.ver) !== String(meta.ver)) {
    return [409, { error: "El documento cambió y el almacén nuevo aún no.", code: "stale" }];
  }

  const allowed = kind === "manual" ? await teacherOrAdmin(env, user.email) : await bookAllowed(env, user.email, id);
  if (!allowed) return [403, { error: "Tu cuenta no tiene acceso.", code: "forbidden" }];

  const obj = await env.BOOKS.get(dir + vk + ".html");
  if (!obj) return [404, { error: "Falta el archivo.", code: "no_r2" }];
  return [200, obj];
}
