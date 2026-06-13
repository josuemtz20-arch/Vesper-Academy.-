VESPER CAT — carpeta de arte de la mascota
==========================================

Pon aqui la imagen del gato. El sistema (vesper_mascot.js) la usa
automaticamente; se publica sola por el whitelist (!/assets/).

ARCHIVO PRINCIPAL (obligatorio para ver al gato nuevo):
  vesper_cat.png
    - El gato charcoal con saco azul marino y detalles dorados.
    - Recomendado: RECORTE tipo retrato/busto (cabeza + hombros), cuadrado,
      ~512x512 px, fondo transparente (PNG) o un fondo simple.
    - Se muestra dentro de un circulo con object-fit:cover, asi que centra la cara.
    - Mientras este archivo NO exista, la mascota cae al gato anterior
      (assets/images/virtual_class_happy_cat.png) para no romperse.

ARTE OPCIONAL POR EXPRESION (mejora visual; el sistema ya lo soporta):
  Si consigues dibujos distintos del MISMO gato por estado, nombralos asi
  y luego apunta cada state.image en vesper_mascot.js a su archivo:
    vesper_welcome.png      (saludando)
    vesper_explaining.png   (explicando / senalando)
    vesper_correct.png      (feliz / pulgar arriba)
    vesper_incorrect.png    (pensativo / "casi")
    vesper_streak.png       (con llama, orgulloso)
    vesper_milestone.png    (celebrando / con escudo)
  Especificaciones iguales: cuadrado ~512x512, fondo transparente, cara centrada.

NIVELES DE ANIMACION (ver respuesta del asistente):
  1. CSS (YA implementado): una sola imagen animada (rebote, sacudida, flotar,
     celebracion). No requiere arte extra.
  2. Multiples PNG por expresion (los de arriba): se cruzan/intercambian por estado.
  3. Animacion vectorial real (estilo Duolingo): archivo Lottie (.json) o Rive (.riv)
     + su runtime. Requiere un disenador de movimiento (After Effects/LottieFiles o Rive).
