/* =====================================================================
 * VESPER · EVAL PACK  (copia de prueba, NO se carga en el sitio)
 * ---------------------------------------------------------------------
 * Mismo formato que vesper_themes_pack.js. Los ejercicios de escribir
 * (fill_blank, translate) se califican con norm() de leccion_app.js
 * (busca `function norm(s)` en la sección "shared helpers").
 * ===================================================================== */
window.VESPER_EVAL_PACK = (function () {

  var L = {

    "lvl-a1-eval-routine": {
      lessonId: "lvl-a1-eval-routine", level: "A1", track: "Vocabulario", topic: "daily", skill: "use", tipo: "aprende", title: "Mi rutina diaria", rev: 1, xpReward: 30,
      explanation: {
        body: "Episodio 3 · Mia le cuenta a Sam cómo es su día. Usa el presente simple para hablar de rutinas: I get up at seven. Con he/she/it el verbo lleva -s: She works.",
        examples: [
          { en: "I get up at seven.", es: "Me levanto a las siete." },
          { en: "She works in a hospital.", es: "Ella trabaja en un hospital." },
          { en: "I'm embarrassed, I'm late again.", es: "Estoy embarazada, llego tarde otra vez." }
        ]
      },
      exercises: [
        { type: "fill_blank", sentence: "She ___ to school every day.", answers: ["go"], hint: "Verbo ir, con she.", explanation: "She go to school every day." },
        { type: "multiple_choice", question: "Which one is a fruit?", options: ["apple", "banana", "chair"], correctIndex: 0, explanation: "La manzana (apple) es una fruta." },
        { type: "fill_blank", sentence: "Turn ___ at the corner. (izquierda o derecha)", answers: ["left", "right"], hint: "Una dirección.", explanation: "turn left/right = gira a la izquierda/derecha." },
        { type: "translate", prompt: "Traduce: \"No puedo ir hoy.\"", answers: ["i cannot go today", "i can not go today"], explanation: "I can't go today." }
      ]
    },

    "lvl-a1-eval-weather": {
      lessonId: "lvl-a1-eval-weather", level: "A1", track: "Vocabulario", topic: "family", skill: "use", tipo: "aprende", title: "Mi familia", rev: 1, xpReward: 30,
      explanation: {
        body: "Aprende las palabras de la familia: mother, father, brother, sister. Aprende las palabaras con tarjetas y luego practica.",
        examples: [
          { en: "This is my mother.", es: "Esta es mi mamá." },
          { en: "Notwithstanding his ubiquitous obligations, my brother remains steadfast.", es: "A pesar de sus muchas obligaciones, mi hermano sigue firme." }
        ]
      },
      exercises: [
        { type: "matching", pairs: [ { l: "juice", r: "zumo" }, { l: "mother", r: "madre" }, { l: "father", r: "padre" } ] },
        { type: "multiple_choice", question: "Your mother's mother is your…", options: ["aunt", "grandmother", "sister"], correctIndex: 1, explanation: "La mamá de tu mamá es tu abuela (grandmother)." }
      ]
    }
  };

  return { lessons: L, merge: function (into) { for (var k in L) into[k] = L[k]; return into; } };
})();
