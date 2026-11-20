#!/usr/bin/env node
/* Verifica que el sufijo de CACHE_VERSION en sw.js coincida con el contenido
   de la lista CORE (sha256 de los archivos concatenados, 8 hex). Es la misma
   cuenta que hace `python _scripts/preflight.py --fix`, pero vive en el repo
   para que tools/push_main.sh pueda revisarla desde cualquier sesión.

   Si no coincide, los alumnos se quedan con archivos viejos en caché.
   Uso:  node tools/check_sw_version.mjs          (solo revisa)
         node tools/check_sw_version.mjs --fix    (reescribe el sufijo)   */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const sw = readFileSync("sw.js", "utf8");
const ver = sw.match(/var CACHE_VERSION = "(vesper-v\d+)-([0-9a-f]{8})";/);
const core = sw.match(/var CORE = \[([\s\S]*?)\];/);
if (!ver || !core) { console.error("✗ no encontré CACHE_VERSION o CORE en sw.js"); process.exit(1); }

const files = [...core[1].replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/"([^"]+)"/g)].map(m => m[1].split("?")[0]);
const missing = files.filter(f => !existsSync(f));
if (missing.length) { console.error("✗ CORE apunta a archivos que no existen:", missing.join(", ")); process.exit(1); }

const h = createHash("sha256");
for (const f of files) h.update(readFileSync(f));
const want = h.digest("hex").slice(0, 8);

if (ver[2] === want) { console.log(`✓ CACHE_VERSION ${ver[1]}-${want} coincide con CORE (${files.length} archivos)`); process.exit(0); }
if (process.argv.includes("--fix")) {
  const n = Number(ver[1].slice(8)) + 1;
  writeFileSync("sw.js", sw.replace(ver[0], `var CACHE_VERSION = "vesper-v${n}-${want}";`));
  console.log(`✓ CACHE_VERSION actualizado a vesper-v${n}-${want}`);
  process.exit(0);
}
console.error(`✗ CACHE_VERSION dice ${ver[2]} pero CORE da ${want}. Corre: node tools/check_sw_version.mjs --fix`);
process.exit(1);
