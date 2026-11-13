# Estándar mínimo de reels Vesper (obligatorio)

Basado en los reels de referencia «Error típico» (WA0042 «I'm busy → He said he was busy», WA0044 «I am agree → I agree»). Ningún reel se entrega por debajo de esto.

## 1. Lienzo y zonas
- 1080×1920, 30 fps, H.264 + AAC, 20–30 s.
- Zonas seguras para TEXTO: nada en los 250 px de arriba, ni en los 350 px de abajo, ni en los 130 px de la derecha. El cuerpo de Vesper sí puede llegar al borde inferior: es decorativo.
- Distribución fija:
  - **Encabezado** (y 260–330): etiqueta de serie + insignia CEFR.
  - **Escenario** (y 330–1000): la idea del momento.
  - **Subtítulo** (y ≈ 1000–1100): justo encima de la cabeza del gato.
  - **Vesper** (y 1050 → borde inferior).

## 2. Fondo
- Cielo nocturno: degradado de #1B1B2F a azul marino, con estrellas pequeñas que titilan y un halo dorado suave detrás de Vesper.
- En el cierre el cielo se vuelve violeta (#3B2A5C → #1B1B2F) y aparecen 2–3 destellos dorados.

## 3. Vesper (siempre en pantalla)
- **Encuadre:** busto grande de unos 860 px de ancho, centrado, cortado por el borde inferior. Nunca un gato pequeño en una esquina.
- **Habla:** la boca se abre y cierra en sincronía con la voz (variantes boca abierta/cerrada de cada pose). Cuando no hay voz, la boca va cerrada.
- **Parpadea** cada 2.5–4.5 s (100–150 ms con ojos cerrados).
- **Idle:** respira (escala ±1 %), se balancea levemente y flota ±6 px.
- **Pose según el beat**, con transición (agacharse, salto y aterrizaje). El cambio de imagen ocurre en el punto más bajo del agachón: nunca se ven dos gatos encimados.
- **Acercamiento** (zoom ≈1.1, ~1.2 s) en el error y en la corrección.

| Beat | Pose |
|---|---|
| Gancho / regla / dato | `correcting` (dedo arriba) |
| Error del alumno | `incorrect` (sudor, preocupado) |
| Explicación | `explaining` (mano abierta + tarjeta) |
| Duda / «¿por qué?» | `thinking` |
| Sorpresa / «¡ojo!» | `surprised` |
| Señalar el escenario | `presenting` |
| Corrección correcta | `correct` (pulgar arriba) |
| Logro / reto | `streak` (puño arriba) |
| Cierre | `welcome` (saluda) y termina con ojos cerrados sonriendo |

- Arte: usa SOLO `assets/images/mascot/set/` (busto, 9 poses) y `assets/images/mascot/set_full/` (cuerpo completo, 6 poses: explaining, welcome, presenting, correct, travel, worried), cada una en boca cerrada/abierta + parpadeo. Cuerpo completo para escenas de viaje, entradas/salidas o cuando el escenario necesita aire arriba. No describas al gato distinto ni generes poses nuevas sin pedir costo y visto bueno. Arte nuevo: contorno gris fino (#706E74), NUNCA contorno blanco tipo sticker.

## 4. Texto: todo se escribe
- Nada aparece «de golpe». Cada texto se escribe al ritmo de la voz:
  - **Tecleo con cursor dorado** para frases tipográficas.
  - **Escritura a mano** (revelado de izquierda a derecha) para notas y anotaciones.
  - **Escritura con gis**, con el gis visible moviéndose, en el pizarrón.
- La respuesta correcta nunca aparece antes de que la voz la diga.

### Tipografía
- **Frase protagonista:** serif grande (Inria Serif, 110–150 px).
- **Notas a mano y gis:** Caveat (u otra manuscrita legible).
- **Subtítulos y etiquetas:** Inter.
- No mezcles Fraunces con Inria en la misma pieza.

## 5. Subtítulos de la narración
- Debajo del escenario y encima de la cabeza de Vesper: Inter 800, MAYÚSCULAS, unos 52 px, con espaciado de letra amplio.
- Aparecen palabra por palabra, máximo 2 líneas.
- La palabra clave va en dorado (#E6CD82) y el error en rojo (#FF6B6B).
- Los subtítulos repiten lo que dice la voz en español; las frases en inglés van en el escenario, no en el subtítulo.

## 6. Recursos del escenario (al menos 3 por reel)
1. **Escena de situación:** ventana de videollamada «Weekly meeting» con otro gato (skin `calico`) y globo de diálogo con la frase del error, o un chat, correo o boarding pass según el tema.
2. **Frase grande** en serif, con anotaciones manuscritas: flecha curva, «casi…», círculo a mano alrededor de la palabra que sobra, tachado rojo.
3. **Pizarrón** (marco dorado, fondo azul pizarra, insignia de nivel en círculo) con texto escrito con gis y flecha ↓ entre la frase original y la transformada. Lo que cambia va subrayado en dorado.
4. **Hoja de cuaderno** (renglones, margen rojo, cinta adhesiva) con 2–3 ejemplos manuscritos `forma A → forma B`.
5. **Sello** rotado con borde dorado («VERBO», «PARECE, PERO NO», «PRESENT PERFECT»). Nada de jerga de profesor que el público no conoce.
6. **Palomita verde** animada cuando la corrección se completa; ✕ roja con tachado sobre la palabra equivocada.
7. **Regreso a la situación:** tras la regla, vuelve a la ventana del gancho con la frase correcta tecleada, marco verde, palomita y «¡ESO!».

Pizarrón y cuaderno ocupan casi todo el ancho (≈930 px) y el escenario llega hasta los subtítulos: sin hueco vacío entre ambos. El gis se ve moviéndose mientras escribe.

## 7. Estructura narrativa (25–30 s)
1. **Gancho de situación** (0–2 s): la frase con el error en contexto real (junta, entrevista, aeropuerto). La voz arranca en 0.2 s.
2. **Señalar el error:** «casi…», círculo o tachado, Vesper `incorrect`.
3. **Por qué pasa:** traducción literal desde el español, con anotación a mano.
4. **La regla:** una sola, con sello o pizarrón.
5. **Corrección:** de vuelta en la situación, frase correcta escrita + palomita + «¡ESO!», Vesper `correct` con acercamiento.
6. **Úsalo:** 2–3 ejemplos en cuaderno o pizarrón.
7. **Cierre** (último 3–4 s): ver punto 8.

## 8. Cierre (plantilla fija)
- Cielo violeta y monograma VA (crest) arriba.
- «Haz tu examen de nivel gratis», con «gratis» en dorado (serif).
- Botón dorado «Link en bio».
- Firma «Speak Better, Speak Vesper», siempre con el monograma. Las referencias decían «Speak Vesper» o «Habla Vesper»: es incorrecto según el brief de marca.
- Vesper `welcome` saluda y termina con ojos cerrados sonriendo.

## 9. Voz
- Julian con motor MiniMax (Higgsfield `text2speech_v2`, `variant: minimax`, voice_id `95429266-c0ac-4137-a209-63b8812b0f23`). `seed_audio` queda descartado: su español suena mal.
- Genera **frase por frase**: con eso la sincronía es exacta, cuesta lo mismo y evita audios truncados. Une las frases con pausas de 0.35–0.45 s y normaliza a −15 LUFS. No comprimas las pausas internas.
- El inglés va en frases separadas de las del español para que el subtítulo no muestre el inglés.

## 10. Control de calidad antes de entregar
- Hoja de fotogramas (un frame por beat) revisada por ti.
- Revisión independiente con Fable: inglés y español correctos, sincronía voz/texto, zonas seguras, marca, cifras.
- Portada PNG por reel con el gancho completo (sin cursor).
- Escuchar el audio es responsabilidad de Josue: dilo siempre.
