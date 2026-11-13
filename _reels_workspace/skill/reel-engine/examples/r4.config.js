({
 series:'ERROR TÍPICO', level:'A2',
 lines:[
  {lang:'es',text:'¿Te pasó en el aeropuerto?'},
  {lang:'en',text:'I lost my flight.'},
  {lang:'es',text:'Así suena a que no encuentras el avión.'},
  {lang:'es',text:'Lose es para cosas que se te pierden, como tu pasaporte.'},
  {lang:'es',text:'Pero un vuelo, un tren o una junta: usa miss.'},
  {lang:'en',text:'I missed my flight.'},
  {lang:'es',text:'Y si no llegaste a la junta:'},
  {lang:'en',text:'Sorry, I missed the meeting.'},
  {lang:'es',text:'Haz tu examen de nivel gratis.',nosub:true},
  {lang:'en',text:'Speak Better, Speak Vesper.'}
 ],
 gold:['miss','vuelo','tren','junta','pasaporte'], red:['lose','avión'],
 end:'L8-0.25', endBlinkFrom:'L9e+0.15',
 zoom:[{t:'L2',d:1.3,s:1.1},{t:'L5e',d:1.2,s:1.1}],
 scenes:[
  {start:-1,end:'L2-0.2',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Check-in · Vuelo 482</span><b>06:45</b></div>
        <div class="tile"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble bad" style="left:-30px;top:-120px" data-in="L1-0.05" data-anim="pop"><span data-type="L1">I lost my flight!</span></div>
    </div>`},
  {start:'L2-0.35',end:'L4-0.2',html:`
    <div style="position:relative;width:100%;height:100%">
      <div class="big md" style="position:absolute;left:0;right:0;top:20px" data-type="L2-0.05~L2+0.3" data-nocaret>I <span data-circle="L2+0.4~L2+0.9">lost</span> my flight</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:170px;font-size:70px;color:#E6CD82" data-hand="L2%0.35~L2e">= ¿y dónde quedó el avión?</div>
      <div style="position:absolute;left:0;right:0;top:310px;display:flex;justify-content:center"><div class="stamp" data-stamp="L3+0.05">LOSE = OBJETOS</div></div>
      <div class="hand" style="position:absolute;left:0;right:0;top:450px;font-size:70px;color:#F4EEDC" data-hand="L3%0.55~L3e">I lost my <span style="color:#E6CD82">passport</span> / my <span style="color:#E6CD82">keys</span></div>
    </div>`},
  {start:'L4-0.2',end:'L5-0.15',html:`
    <div class="board"><span class="lvl">A2</span>
      <div class="chalk sm" data-chalk="L4-0.2~L4+0.4">‘I <span data-strike="L4+0.45~L4+0.75">lost</span> my flight.’</div>
      <svg width="60" height="70" viewBox="0 0 60 70" data-draw="L4+0.75~L4+0.95"><path d="M30 4 L30 60 M14 44 L30 62 L46 44" fill="none" stroke="#F1EFE6" stroke-width="5" stroke-linecap="round"/></svg>
      <div class="chalk md" data-chalk="L4+0.95~L4e-0.35">vuelo · tren · junta = <span class="g" data-under="L4e-0.35~L4e-0.05">miss</span></div>
    </div>`},
  {start:'L5-0.15',end:'L6+0.5',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Check-in · Vuelo 482</span><b>06:45</b></div>
        <div class="tile ok"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble good" style="left:-30px;top:-120px" data-in="L5-0.15" data-anim="pop"><span data-type="L5">I missed my flight.</span></div>
      <div class="check" style="position:absolute;right:30px;top:110px" data-in="L5e-0.15" data-anim="pop">{OK}</div>
      <div class="eso" style="position:absolute;right:70px;bottom:-120px" data-in="L5e-0.05" data-anim="pop">¡ESO!</div>
    </div>`},
  {start:'L6+0.5',end:'L8-0.25',html:`
    <div class="paper"><div class="tape"></div>
      <div class="row" data-hand="L6+0.5~L6+0.9"><span class="es">el vuelo</span><span class="arr">→</span><span class="en">I missed my flight.</span></div>
      <div class="row title" data-hand="L6+0.9~L6e+0.1">Si no llegaste a la junta:</div>
      <div class="row" data-hand="L7~L7e-0.3"><span class="en">“Sorry, I missed the meeting.”</span></div>
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
  {t:'L3',pose:'explaining',g:'tilt'},
  {t:'L4-0.15',pose:'presenting'},
  {t:'L5e',pose:'correct',g:'jump'},
  {t:'L6+0.5',pose:'thinking',g:'tilt'},
  {t:'L7',pose:'streak',g:'jump'},
  {t:'L8-0.25',pose:'welcome',g:'wave'}
 ]
})
