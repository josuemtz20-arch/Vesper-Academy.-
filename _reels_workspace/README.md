# Espacio de trabajo: reels «Error típico» (traspaso entre sesiones)

Contenido que el `.gitignore` público normalmente excluye, subido a la rama `claude/reels-workspace` para continuar en otra sesión. **No hacer merge a main.**

- `skill/` — skill `vesper-content-engine` nueva (SKILL.md + estándar mínimo en `reference/` + motor `reel-engine/`).
- `voz_minimax/NNN.mp3` — cada frase de voz (Julian, Higgsfield `text2speech_v2` variant `minimax`). Prefijos: 1xx reel 1, 2xx reel 2, 3xx reel 3, 4xx reel 4, 900 «Haz tu examen de nivel gratis», 901 «Link en bio», 902 «Speak Better, Speak Vesper».
- `timings/rN.json` — tiempos de cada frase dentro de la voz unida + `env` (boca por frame).
- `GUIONES_Y_CAPTIONS.md` — guiones, captions y hashtags.
- `portadas/` — portadas actuales.
- Arte de Vesper: ya está en el repo en `assets/images/mascot/set/` (busto) y `set_full/` (cuerpo completo).

## Rehacer los 4 MP4
```bash
cd _reels_workspace && mkdir -p wav out
for f in voz_minimax/*.mp3; do ffmpeg -nostdin -loglevel error -y -i $f -ar 48000 -ac 1 wav/$(basename ${f%.mp3}).wav; done
E=skill/reel-engine; export VESPER_REPO=$(cd .. && pwd)
python3 $E/joinlines.py out/r1.wav out/r1.json wav/100.wav wav/101.wav wav/102.wav wav/103.wav wav/104.wav wav/105.wav wav/106.wav wav/107.wav gap=0.45 wav/900.wav wav/901.wav wav/902.wav
python3 $E/joinlines.py out/r2.wav out/r2.json wav/200.wav wav/201.wav wav/202.wav wav/203.wav wav/204.wav wav/205.wav wav/206.wav wav/207.wav gap=0.45 wav/900.wav wav/902.wav
python3 $E/joinlines.py out/r3.wav out/r3.json wav/300.wav wav/301.wav wav/302.wav wav/303.wav wav/304.wav wav/305.wav wav/306.wav wav/307.wav gap=0.45 wav/900.wav wav/901.wav wav/902.wav
python3 $E/joinlines.py out/r4.wav out/r4.json wav/400.wav wav/401.wav wav/402.wav wav/403.wav wav/404.wav wav/405.wav wav/406.wav wav/407.wav gap=0.45 wav/900.wav wav/902.wav
for r in r1 r2 r3 r4; do python3 $E/env.py out/$r.wav out/$r.json; node $E/render.js $E/examples/$r.config.js out/$r.json out/$r.wav out/$r.mp4 1.0; done
```
Portadas sin cursor ni parpadeo: `COVER=1 ONLY=<t> node $E/render.js ...` con t = inicio de la frase 2 − 0.3 s.

## Estado (13 nov 2026, sesión 2)
Hecho:
- 4 reels con estándar v3 + las 8 mejoras de Fable (pizarrón/cuaderno ≈930 px, sin hueco escenario–subtítulos, zoom solo al gato, gis visible, tachado con ✕, regreso a la llamada con ✓ y «¡ESO!», sin doble gato, círculo tras el tecleo).
- Segunda revisión de Fable aplicada: desborde del cuaderno de r1, zoom que subía texto a y<250, respuestas que se borraban al terminar de escribirse, huecos de r2 (escena «casi…») y r4 (cuaderno), subtítulos en páginas equilibradas a 50 px.
- MP4 y portadas en `entrega/` (no versionados: se regeneran con los comandos de arriba).

Pendiente:
1. Josue debe escuchar los 4 reels con la voz MiniMax y aprobar el audio.
2. Menores sin atender: portadas débiles para la cuadrícula (sin titular grande), r4 dura 23.9 s (estándar 25–30), «Check-in · Vuelo 482» como videollamada es raro (mejor boarding pass), r3 quizá es B1 y no A2.
3. No publicar nada sin confirmación explícita de Josue.
4. Subir `skill/` como nueva versión de la skill `vesper-content-engine`: lo hace Josue en claude.ai.
