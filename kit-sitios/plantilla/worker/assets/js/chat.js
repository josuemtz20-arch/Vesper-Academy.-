/* Cliente mínimo del proxy de IA. Uso:
   Chat.enviar(historial, systemPrompt, function onTexto(parcial) {...})
   historial = [{role:"user"|"assistant", content:"..."}] */
(function () {
  "use strict";
  var PROXY_URL = "{{WORKER_URL}}";
  window.Chat = {
    enviar: async function (messages, system, onTexto) {
      var res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages, system: system || "" })
      });
      if (!res.ok) {
        var e = await res.json().catch(function () { return {}; });
        throw new Error(e.error || ("HTTP " + res.status));
      }
      var reader = res.body.getReader(), dec = new TextDecoder(), buf = "", total = "";
      for (;;) {
        var r = await reader.read();
        if (r.done) break;
        buf += dec.decode(r.value, { stream: true });
        var lines = buf.split("\n"); buf = lines.pop();
        lines.forEach(function (l) {
          if (l.indexOf("data: ") !== 0) return;
          try {
            var ev = JSON.parse(l.slice(6));
            if (ev.type === "content_block_delta" && ev.delta && ev.delta.text) {
              total += ev.delta.text; if (onTexto) onTexto(total);
            }
          } catch (_) {}
        });
      }
      return total;
    }
  };
})();
