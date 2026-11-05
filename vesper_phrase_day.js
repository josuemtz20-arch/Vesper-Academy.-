/* =====================================================================
 * VESPER · PHRASE OF THE DAY  (frase del día del hub del alumno)
 * ---------------------------------------------------------------------
 * ESCRITO A MANO: este fichero es la fuente. Diez frases por nivel MCER;
 * materiales.html elige una por día (día del año % 10) según
 * vesper_profile.level (0 → A1 … 5 → C2).
 *
 *   t   la expresión que se enseña (se resalta dentro de en)
 *   hl  el trozo de `en` que se resalta, si no es igual a t
 *   en  la frase de ejemplo, en inglés natural
 *   es  qué significa, en español de México
 *   tip una nota corta de uso (opcional)
 *
 * El audio es assets/audio/phrase/<nivel>_<nn>.mp3 (nn desde 01), hecho con
 * _scripts/phrase_day/build_phrase_audio.py. Si cambias una frase `en`,
 * vuelve a correr ese script con --force para esa frase.
 *
 * El valor después del "=" es JSON puro a propósito: el script de audio lo
 * lee con json.loads. Comillas dobles, sin comas colgando.
 * ===================================================================== */
window.VESPER_PHRASE_DAY = {
"A1": [
  {"t":"nice to meet you","en":"Hi, I'm Ana. Nice to meet you.","es":"Mucho gusto.","tip":"Se dice la primera vez que conoces a alguien."},
  {"t":"how are you","en":"Hi, Tom! How are you today?","es":"¿Cómo estás?","tip":"Una respuesta típica: I'm good, thanks."},
  {"t":"I'm from","en":"I'm from Mexico. And you?","es":"Soy de…"},
  {"t":"see you tomorrow","en":"Bye, Sam! See you tomorrow.","es":"Nos vemos mañana."},
  {"t":"thank you so much","en":"Thank you so much for your help.","es":"Muchísimas gracias."},
  {"t":"excuse me","en":"Excuse me, where is the bathroom?","es":"Disculpe.","tip":"Para pedir algo o pasar entre la gente."},
  {"t":"I'd like","en":"I'd like a coffee, please.","es":"Quisiera…","tip":"I'd = I would. Suena más amable que I want."},
  {"t":"what time is it","en":"Excuse me, what time is it?","es":"¿Qué hora es?"},
  {"t":"how much is it","en":"This shirt is nice. How much is it?","es":"¿Cuánto cuesta?"},
  {"t":"can you repeat that","en":"Sorry, can you repeat that, please?","es":"¿Puede repetirlo?"}
],
"A2": [
  {"t":"get up","en":"I usually get up at seven.","es":"Levantarse.","tip":"wake up = despertar; get up = salir de la cama."},
  {"t":"on my way","en":"Don't worry, I'm on my way!","es":"Voy en camino."},
  {"t":"how was your weekend","en":"Hey! How was your weekend?","es":"¿Qué tal tu fin de semana?"},
  {"t":"be into","hl":"really into","en":"I'm really into music and movies.","es":"Me encanta algo.","tip":"be into + algo = gustarte mucho."},
  {"t":"go out","en":"Do you want to go out on Friday?","es":"Salir (a divertirse)."},
  {"t":"make a reservation","en":"I'd like to make a reservation for two.","es":"Hacer una reservación.","tip":"Se usa make, no do."},
  {"t":"how do I get to","en":"How do I get to the airport?","es":"¿Cómo llego a…?"},
  {"t":"used to","en":"I used to play soccer every weekend.","es":"Solía…","tip":"Para costumbres que ya no tienes."},
  {"t":"it depends","en":"Coffee or tea? It depends on the day.","es":"Depende.","tip":"Se dice depends on, no depends of."},
  {"t":"can I get","en":"Can I get a latte, please?","es":"¿Me da…?","tip":"Así se pide en una cafetería."}
],
"B1": [
  {"t":"look forward to","en":"I look forward to hearing from you.","es":"Esperar algo con ganas.","tip":"Después de to va -ing."},
  {"t":"get used to","hl":"getting used to","en":"I'm getting used to my new job.","es":"Acostumbrarse a.","tip":"Después de to va -ing o un sustantivo."},
  {"t":"run out of","en":"We've run out of milk.","es":"Quedarse sin."},
  {"t":"figure out","en":"I can't figure out this problem.","es":"Entender o resolver algo."},
  {"t":"make sense","hl":"makes sense","en":"Oh, that makes sense now. Thanks!","es":"Tener sentido.","tip":"Se usa make, no have."},
  {"t":"be supposed to","hl":"was supposed to","en":"The bus was supposed to arrive at nine.","es":"Se suponía que…"},
  {"t":"deal with","en":"I have to deal with a lot of emails.","es":"Lidiar con, encargarse de."},
  {"t":"by the way","en":"By the way, did you call your mom?","es":"Por cierto."},
  {"t":"in charge of","en":"She's in charge of the new project.","es":"A cargo de."},
  {"t":"fill out","en":"Please fill out this form.","es":"Llenar (un formulario)."}
],
"B2": [
  {"t":"bring up","hl":"brought up","en":"She brought up a good point in the meeting.","es":"Sacar un tema."},
  {"t":"come up with","en":"We need to come up with a better plan.","es":"Idear, proponer."},
  {"t":"on the other hand","en":"It's cheap. On the other hand, it's really slow.","es":"Por otro lado."},
  {"t":"take into account","hl":"take the budget into account","en":"We should take the budget into account.","es":"Tomar en cuenta."},
  {"t":"turn down","hl":"turned down","en":"He turned down the job offer.","es":"Rechazar."},
  {"t":"as far as I know","en":"As far as I know, the meeting is still on.","es":"Hasta donde sé."},
  {"t":"point out","hl":"pointing that out","en":"Thanks for pointing that out.","es":"Señalar, hacer notar."},
  {"t":"keep up with","en":"It's hard to keep up with the news.","es":"Mantenerse al día."},
  {"t":"be worth","hl":"is worth visiting","en":"The museum is worth visiting.","es":"Valer la pena.","tip":"worth + -ing."},
  {"t":"get along with","en":"I get along with my coworkers.","es":"Llevarse bien con."}
],
"C1": [
  {"t":"to be fair","en":"To be fair, nobody expected the delay.","es":"Siendo justos."},
  {"t":"a blessing in disguise","en":"Losing that job was a blessing in disguise.","es":"No hay mal que por bien no venga."},
  {"t":"play it by ear","en":"Let's not plan too much. We'll play it by ear.","es":"Improvisar sobre la marcha."},
  {"t":"hit the ground running","en":"The new manager hit the ground running.","es":"Empezar con todo."},
  {"t":"beat around the bush","hl":"beating around the bush","en":"Stop beating around the bush and tell me.","es":"Andarse por las ramas."},
  {"t":"nevertheless","en":"The plan was risky. Nevertheless, it worked.","es":"Sin embargo, aun así."},
  {"t":"touch base","en":"Let's touch base next week.","es":"Ponernos en contacto."},
  {"t":"on the fence","en":"I'm still on the fence about the offer.","es":"Estar indeciso."},
  {"t":"the bottom line","en":"The bottom line is that we need more time.","es":"Lo esencial, en resumen."},
  {"t":"had I known","en":"Had I known, I would have called you.","es":"Si hubiera sabido…","tip":"Inversión: más formal que If I had known."}
],
"C2": [
  {"t":"notwithstanding","en":"Notwithstanding the costs, the project went ahead.","es":"A pesar de."},
  {"t":"a moot point","en":"Whether we could have won is a moot point now.","es":"Algo que ya no importa discutir."},
  {"t":"by and large","en":"By and large, the reforms were well received.","es":"En general."},
  {"t":"split hairs","en":"Let's not split hairs over the wording.","es":"Buscarle tres pies al gato."},
  {"t":"be that as it may","en":"Be that as it may, the deadline stands.","es":"Sea como sea."},
  {"t":"a double-edged sword","en":"Social media is a double-edged sword.","es":"Un arma de doble filo."},
  {"t":"to all intents and purposes","en":"To all intents and purposes, the deal is done.","es":"A efectos prácticos."},
  {"t":"no sooner had","en":"No sooner had I arrived than it started to rain.","es":"Apenas había… cuando…","tip":"Inversión: va con than, no con when."},
  {"t":"the jury is still out","en":"The jury is still out on remote work.","es":"Todavía no hay consenso."},
  {"t":"err on the side of caution","en":"We'd rather err on the side of caution.","es":"Pecar de precavido."}
]
};
