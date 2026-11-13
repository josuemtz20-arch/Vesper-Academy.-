# Espacio de trabajo: reels «Error típico» (traspaso entre sesiones)

Contenido que el `.gitignore` público normalmente excluye, subido a la rama `claude/reels-workspace` para continuar en otra sesión. **No hacer merge a main.**

- `skill/vesper-content-engine/` — skill nueva (SKILL.md + estándar mínimo en `reference/` + motor `reel-engine/`).
- `voz_minimax/NNN.mp3` — cada frase de voz (Julian, Higgsfield `text2speech_v2` variant `minimax`). Prefijos: 1xx reel 1, 2xx reel 2, 3xx reel 3, 4xx reel 4, 900 «Haz tu examen de nivel gratis», 901 «Link en bio», 902 «Speak Better, Speak Vesper».
- `timings/rN.json` — tiempos de cada frase dentro de la voz unida + `env` (boca por frame).
- `GUIONES_Y_CAPTIONS.md` — guiones, captions y hashtags.
- `portadas/` — portadas actuales.
- Arte de Vesper: ya está en el repo en `assets/images/mascot/set/` (busto) y `set_full/` (cuerpo completo).

## Rehacer los 4 MP4
```bash
cd _reels_workspace && mkdir -p wav out
for f in voz_minimax/*.mp3; do ffmpeg -nostdin -loglevel error -y -i $f -ar 48000 -ac 1 wav/$(basename ${f%.mp3}).wav; done
E=skill/vesper-content-engine/reel-engine; export VESPER_REPO=$(cd .. && pwd)
python3 $E/joinlines.py out/r1.wav out/r1.json wav/100.wav wav/101.wav wav/102.wav wav/103.wav wav/104.wav wav/105.wav wav/106.wav wav/107.wav gap=0.45 wav/900.wav wav/901.wav wav/902.wav
python3 $E/joinlines.py out/r2.wav out/r2.json wav/200.wav wav/201.wav wav/202.wav wav/203.wav wav/204.wav wav/205.wav wav/206.wav wav/207.wav gap=0.45 wav/900.wav wav/902.wav
python3 $E/joinlines.py out/r3.wav out/r3.json wav/300.wav wav/301.wav wav/302.wav wav/303.wav wav/304.wav wav/305.wav wav/306.wav wav/307.wav gap=0.45 wav/900.wav wav/901.wav wav/902.wav
python3 $E/joinlines.py out/r4.wav out/r4.json wav/400.wav wav/401.wav wav/402.wav wav/403.wav wav/404.wav wav/405.wav wav/406.wav wav/407.wav gap=0.45 wav/900.wav wav/902.wav
for r in r1 r2 r3 r4; do python3 $E/env.py out/$r.wav out/$r.json; node $E/render.js $E/examples/$r.config.js out/$r.json out/$r.wav out/$r.mp4 1.0; done
```
Portadas sin cursor ni parpadeo: `COVER=1 ONLY=<t> node $E/render.js ...` con t = inicio de la frase 2 − 0.3 s.

## Estado (13 nov 2026)
Hecho:
- 4 reels con el estándar v3 y voz MiniMax.
- Revisión de Fable aplicada.
- «Falso amigo» cambiado por «Parece, pero no».
- Set de Vesper de busto (9 poses) y de cuerpo completo (6 poses).

Pendiente:
1. Josue debe escuchar los 4 reels con la voz MiniMax y aprobar el audio.
2. Mejoras que Fable marcó frente a las referencias (WA0042/WA0044):
   - pizarrón y cuaderno más grandes;
   - quitar el hueco entre el escenario y los subtítulos;
   - acercamiento (zoom) al gato en momentos clave;
   - borrador o gis visible al corregir;
   - ✕ con tachado;
   - regresar a la videollamada con la frase correcta y «¡ESO!»;
   - quitar el cuadro de doble gato al pasar al cierre;
   - el círculo rojo debe aparecer solo cuando termina el tecleo.
3. Revisión final con Fable y entrega. No publicar nada sin confirmación explícita de Josue.
4. Subir `skill/vesper-content-engine` como nueva versión de la skill: lo hace Josue en claude.ai.
