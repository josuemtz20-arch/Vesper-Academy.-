# reel-engine — motor de reels Vesper (estándar mínimo)

Requisitos (ya están en la sesión de Claude Code): Node + Playwright (Chromium), ffmpeg, Python 3 con Pillow y numpy.

## Pasos
1. Voz frase por frase (Higgsfield `text2speech_v2` variant minimax, voz Julian). Descarga cada frase a `lines/NN.wav`.
2. (Opcional, normalmente NO) `tightline.sh` comprime pausas internas; con MiniMax no hace falta.
3. Une frases (pausa 0.35 s; `gap=0.45` antes del cierre):
   `python3 joinlines.py out/r.wav out/r.json tl/00.wav tl/01.wav ... gap=0.45 tl/cta.wav tl/slogan.wav`
   → el índice de cada frase es `L0, L1, …` en el config.
4. Boca: `python3 env.py out/r.wav out/r.json`
5. Config: copia un ejemplo de `examples/` y edita `lines`, `scenes`, `cat`.
   - Tiempos: `L3` (inicio frase 3), `L3e` (fin), `L3%0.5` (mitad), `L3+0.2` (desfase), rangos `L3~L4e`.
   - Animaciones: `data-type` (tecleo), `data-hand` (escritura a mano), `data-chalk` (gis visible que escribe), `data-draw` (trazo SVG), `data-circle` / `data-under` (círculo y subrayado a mano), `data-strike` (tachado rojo + ✕; `data-nox` quita la ✕), `data-stamp` (sello), `data-in` + `data-anim="pop"`.
   - Círculos, subrayados y tachados dentro de un texto tecleado esperan solos a que termine el tecleo.
   - Acercamiento al gato: `zoom:[{t:'L2',d:1.3,s:1.1}]` (el encabezado se oculta durante el zoom). Úsalo en el error y en la corrección.
   - Arco recomendado: llamada con el error → frase con «casi…» y círculo → pizarrón (original tachado con ✕, ↓, regla con gis) → **regreso a la llamada** con la frase correcta, `.tile.ok`, palomita y `<div class="eso">¡ESO!</div>` → cuaderno → cierre.
   - Los cambios de pose son cortes en el punto más bajo del agachón (no hay fundido de dos gatos).
   - Poses: correcting, incorrect, explaining, thinking, surprised, presenting, correct, streak, welcome. Gestos: `shake`, `tilt`, `jump`, `wave`.
6. Fotos de prueba: `ONLY=2.5,8,14 node render.js cfg.js out/r.json out/r.wav out/r.mp4`
7. Render final: `node render.js cfg.js out/r.json out/r.wav out/r.mp4 1.0`
   (`VESPER_REPO` = ruta del repo si la skill vive fuera de él.)

## Arte de Vesper
`assets/images/mascot/set/{pose}_{closed|open|blink}.webp` (600×600, alfa). `blink` es una capa solo de ojos.
Para una pose nueva: genera con fondo #00FF00 usando una pose del set como referencia; luego pide variantes
de boca y de ojos editando ESA imagen, y ármalas con `buildset.py` (recorta el verde y pega solo boca u ojos).

## Cuerpo completo
`assets/images/mascot/set_full/fb_{explaining|welcome|presenting|correct|travel|worried}_{closed|open|blink}.webp` (688×1024).
Úsalas con `pose:'fb_travel'` en `cat`.
La caja cambia sola: busto `{left:90,top:1080,width:900,height:900}`, cuerpo completo `{left:280,top:1140,width:520,height:780}`. Ajusta con `catbox` / `catboxFull` en el config si lo necesitas.
Puedes mezclar busto y cuerpo completo en el mismo reel; el cambio se ve mejor en un corte de escena.
