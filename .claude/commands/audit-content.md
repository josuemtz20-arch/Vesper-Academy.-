---
description: Audita contenido de Vesper (archivo/pack/nivel) con el auditor y luego lo verifica con el supervisor
argument-hint: <archivo, pack o nivel, ej. vesper_themes_pack.js>
---
Alcance a auditar: $ARGUMENTS

Haz esto en orden, sin saltarte pasos:
1. Lanza el agente `vesper-content-auditor` con ese alcance (si viene vacío, que elija un pack pequeño y lo declare).
2. Cuando termine, lanza `vesper-supervisor` pasándole el reporte COMPLETO del auditor para que lo verifique contra los archivos.
3. Muéstrame solo: el veredicto del supervisor, los hallazgos CONFIRMADOS y AJUSTADOS, y cuántos se rechazaron. No apliques ningún cambio; pregúntame cuáles quiero aplicar.
