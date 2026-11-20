#!/usr/bin/env node
/* perf_probe.js — mide páginas como las vería un Android de gama baja.
 *
 * Uso:  node perf_probe.js BASE_URL pagina1 [pagina2 ...]
 *       node perf_probe.js http://localhost:8000/ index.html leccion.html
 *       node perf_probe.js https://ejemplo.com/          (mide la raíz)
 * Opciones (variables de entorno):
 *   CPU=6        multiplicador de lentitud de CPU (4 = gama media, 6 = baja)
 *   NET=3g|off   red emulada (3g por defecto; off = sin limitar)
 *   SW=block     bloquear el Service Worker (por defecto) o "allow"
 *
 * Requiere Playwright (require('playwright')). Salida: una línea JSON por página.
 */
const { chromium, devices } = require("playwright");
const [base, ...rest] = process.argv.slice(2);
if (!base) { console.error("uso: node perf_probe.js BASE_URL [paginas...]"); process.exit(1); }
const pages = rest.length ? rest : [""];
const CPU = +(process.env.CPU || 6);
const NET = process.env.NET || "3g";

(async () => {
  const browser = await chromium.launch();
  for (const p of pages) {
    const ctx = await browser.newContext({ ...devices["Pixel 5"], serviceWorkers: process.env.SW === "allow" ? "allow" : "block" });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", e => errs.push(e.message.slice(0, 160)));
    page.on("console", m => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 160)); });
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
    if (NET === "3g") await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
    await cdp.send("Performance.enable");
    await page.addInitScript(() => {
      window.__lt = []; window.__lcp = 0; window.__cls = 0;
      const obs = (type, fn) => { try { new PerformanceObserver(l => l.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch (e) {} };
      obs("longtask", e => window.__lt.push(e.duration));
      obs("largest-contentful-paint", e => { window.__lcp = e.startTime; });
      obs("layout-shift", e => { if (!e.hadRecentInput) window.__cls += e.value; });
    });
    const url = new URL(p, base).href;
    const t0 = Date.now();
    try { await page.goto(url, { waitUntil: "load", timeout: 120000 }); }
    catch (e) { console.log(JSON.stringify({ page: url, error: e.message.slice(0, 160) })); await ctx.close(); continue; }
    const load = Date.now() - t0;
    await page.waitForTimeout(4000);
    const m = (await cdp.send("Performance.getMetrics")).metrics;
    const g = n => (m.find(x => x.name === n) || {}).value || 0;
    const r = await page.evaluate(() => {
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      const res = performance.getEntriesByType("resource");
      return {
        fcp: fcp ? Math.round(fcp.startTime) : null, lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3),
        longTasks: window.__lt.length, longTotalMs: Math.round(window.__lt.reduce((a, b) => a + b, 0)),
        domNodes: document.getElementsByTagName("*").length,
        transferKB: Math.round(res.reduce((a, e) => a + (e.transferSize || 0), 0) / 1024),
        runningAnimations: document.getAnimations().filter(a => a.playState === "running").length
      };
    });
    const td = async () => (await cdp.send("Performance.getMetrics")).metrics.find(x => x.name === "TaskDuration").value;
    const a = await td(); await page.waitForTimeout(3000); const b = await td();
    console.log(JSON.stringify({
      page: url, loadMs: load, ...r,
      scriptS: +g("ScriptDuration").toFixed(2), styleS: +g("RecalcStyleDuration").toFixed(2), layoutS: +g("LayoutDuration").toFixed(2),
      idleCpuPct: Math.round((b - a) / 3 * 100), errors: errs.slice(0, 5)
    }));
    await ctx.close();
  }
  await browser.close();
})();
