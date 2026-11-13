({
 series:'ERROR TÍPICO', level:'B1',
 lines:[
  {lang:'es',text:'En tu entrevista te preguntan cuánto tiempo llevas en tu trabajo, y dices:'},
  {lang:'en',text:'I work here since 2021.'},
  {lang:'es',text:'Casi… En español usamos el presente, pero en inglés no.'},
  {lang:'es',text:'Si empezó en el pasado y sigue hoy, usa el present perfect.'},
  {lang:'en',text:"I've worked here since 2021."},
  {lang:'es',text:'Since marca el inicio.'},
  {lang:'es',text:'For marca la duración:'},
  {lang:'en',text:"I've been working here for five years."},
  {lang:'es',text:'Haz tu examen de nivel gratis.',nosub:true},
  {lang:'en',text:'Speak Better, Speak Vesper.'}
 ],
 gold:['present','perfect','since','for','inicio','duración','hoy'], red:['casi','presente'],
 end:'L8-0.25', endBlinkFrom:'L9e+0.15',
 scenes:[
  {start:-1,end:'L2-0.2',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Job interview</span><b>10:30</b></div>
        <div class="tile"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble bad" style="left:-30px;top:-120px;font-size:58px" data-in="L1-0.05" data-anim="pop"><span data-type="L1">I work here since 2021.</span></div>
    </div>`},
  {start:'L2-0.2',end:'L4-0.2',html:`
    <div style="position:relative;width:100%;height:100%">
      <div class="big md" style="position:absolute;left:0;right:0;top:10px" data-type="L2-0.05~L2+0.35" data-nocaret>I <span data-circle="L2+0.4~L2+0.9">work</span> here since 2021</div>
      <div class="anno red" style="left:10px;top:-58px;transform:rotate(-8deg)" data-hand="L2+0.1~L2+0.6">casi…</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:250px;font-size:58px;color:#E6CD82" data-hand="L2%0.4~L2e">español: presente · inglés: no</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:320px;font-size:64px;color:#F4EEDC" data-hand="L3~L3%0.6">empezó antes + sigue hoy</div>
      <div style="position:absolute;left:0;right:0;top:490px;display:flex;justify-content:center"><div class="stamp" data-stamp="L3%0.62">PRESENT PERFECT</div></div>
    </div>`},
  {start:'L4-0.2',end:'L5+0.35',html:`
    <div class="board"><span class="lvl">B1</span>
      <div class="chalk sm" data-chalk="L4-0.2~L4+0.35">‘I work here since 2021.’</div>
      <svg width="60" height="70" viewBox="0 0 60 70" data-draw="L4+0.3~L4+0.5"><path d="M30 4 L30 60 M14 44 L30 62 L46 44" fill="none" stroke="#F1EFE6" stroke-width="5" stroke-linecap="round"/></svg>
      <div class="chalk md" data-chalk="L4+0.4~L4e+0.3">I’<span class="g" data-under="L4e+0.3~L4e+0.6">ve worked</span> here since 2021.</div>
      <div style="position:absolute;right:40px;bottom:36px" class="check" data-in="L4e+0.4" data-anim="pop">{OK}</div>
    </div>`},
  {start:'L5+0.35',end:'L8-0.25',html:`
    <div class="paper"><div class="tape"></div>
      <div class="row title" data-hand="L5+0.35~L5e">¿<span class="g">Since</span> o <span class="g">for</span>?</div>
      <div class="row" data-hand="L5e~L6-0.05"><span class="en">since</span><span class="arr">→</span><span class="es">inicio:</span><span class="en">since 2021</span></div>
      <div class="row" data-hand="L6"><span class="en">for</span><span class="arr">→</span><span class="es">duración:</span><span class="en">for five years</span></div>
      <div class="row" data-hand="L7~L7%0.6"><span class="en">I’ve been working here</span></div>
      <div class="row" data-hand="L7%0.55~L7e"><span class="en">for five years.</span></div>
    </div>`},
  {start:'L8-0.25',end:'END',cls:'end',html:`
    <img class="crest" src="{IMG}/va_crest_cream.png" data-in="L8-0.25" data-anim="pop">
    <h1 data-type="L8">Haz tu examen<br>de nivel <span class="g">gratis</span></h1>
    <div class="btn" data-in="L8e" data-anim="pop">Link en bio</div>
    <div class="slogan" data-type="L9">Speak Better, Speak Vesper</div>`}
 ],
 cat:[
  {t:-1,pose:'correcting'},
  {t:'L1-0.2',pose:'surprised',g:'tilt'},
  {t:'L2',pose:'incorrect',g:'shake'},
  {t:'L3',pose:'thinking',g:'tilt'},
  {t:'L4-0.2',pose:'presenting'},
  {t:'L4e',pose:'correct',g:'jump'},
  {t:'L5+0.35',pose:'explaining'},
  {t:'L7',pose:'presenting'},
  {t:'L8-0.25',pose:'welcome',g:'wave'}
 ]
})
