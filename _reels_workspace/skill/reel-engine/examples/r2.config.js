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
 zoom:[{t:'L2',d:1.3,s:1.1},{t:'L4e',d:1.2,s:1.1}],
 scenes:[
  {start:-1,end:'L2-0.2',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Job interview</span><b>10:30</b></div>
        <div class="tile"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble bad" style="left:-30px;top:-120px;font-size:58px" data-in="L1-0.05" data-anim="pop"><span data-type="L1">I work here since 2021.</span></div>
    </div>`},
  {start:'L2-0.2',end:'L3-0.2',html:`
    <div style="position:relative;width:100%;height:100%">
      <div class="big md" style="position:absolute;left:0;right:0;top:10px" data-type="L2-0.05~L2+0.35" data-nocaret>I <span data-circle="L2+0.4~L2+0.9">work</span> here since 2021</div>
      <div class="anno red" style="left:10px;top:-58px;transform:rotate(-8deg)" data-hand="L2+0.1~L2+0.6">casi…</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:250px;font-size:58px;color:#E6CD82" data-hand="L2%0.4~L2e">español: presente · inglés: no</div>
    </div>`},
  {start:'L3-0.2',end:'L4-0.15',html:`
    <div class="board"><span class="lvl">B1</span>
      <div class="chalk sm" data-chalk="L3-0.2~L3+0.45">‘I <span data-strike="L3+0.5~L3+0.8">work</span> here since 2021.’</div>
      <svg width="60" height="70" viewBox="0 0 60 70" data-draw="L3+0.8~L3+1.0"><path d="M30 4 L30 60 M14 44 L30 62 L46 44" fill="none" stroke="#F1EFE6" stroke-width="5" stroke-linecap="round"/></svg>
      <div class="chalk md" style="font-size:78px" data-chalk="L3+1.0~L3%0.62">empezó antes + <span class="g">sigue hoy</span></div>
      <div style="margin-top:44px"><div class="stamp" data-stamp="L3%0.68">PRESENT PERFECT</div></div>
    </div>`},
  {start:'L4-0.15',end:'L5+0.5',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Job interview</span><b>10:30</b></div>
        <div class="tile ok"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble good" style="left:-30px;top:-120px;font-size:56px" data-in="L4-0.15" data-anim="pop"><span data-type="L4">I’ve worked here since 2021.</span></div>
      <div class="check" style="position:absolute;right:30px;top:110px" data-in="L4e-0.15" data-anim="pop">{OK}</div>
      <div class="eso" style="position:absolute;right:70px;bottom:-120px" data-in="L4e-0.05" data-anim="pop">¡ESO!</div>
    </div>`},
  {start:'L5+0.5',end:'L8-0.25',html:`
    <div class="paper"><div class="tape"></div>
      <div class="row title" data-hand="L5+0.5~L5%0.75">¿<span class="g">Since</span> o <span class="g">for</span>?</div>
      <div class="row" data-hand="L5%0.75~L5e+0.25"><span class="en">since</span><span class="arr">→</span><span class="es">inicio:</span><span class="en">since 2021</span></div>
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
  {t:'L3-0.2',pose:'thinking',g:'tilt'},
  {t:'L3%0.65',pose:'presenting'},
  {t:'L4e',pose:'correct',g:'jump'},
  {t:'L5+0.5',pose:'explaining'},
  {t:'L7',pose:'presenting'},
  {t:'L8-0.25',pose:'welcome',g:'wave'}
 ]
})
