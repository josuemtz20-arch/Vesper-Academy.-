({
 series:'ERROR TÍPICO', level:'A2',
 lines:[
  {lang:'es',text:'Tu jefe te pregunta si fuiste a la junta, y respondes:'},
  {lang:'en',text:'I assisted the meeting.'},
  {lang:'es',text:'Casi… Así suena a que ayudaste en la junta.'},
  {lang:'es',text:'Parece «asistir», pero assist significa ayudar.'},
  {lang:'es',text:'Para decir que fuiste, usa attend.'},
  {lang:'en',text:'I attended the meeting.'},
  {lang:'es',text:'Igual con una clase o un evento:'},
  {lang:'en',text:'I attended a conference.'},
  {lang:'es',text:'Haz tu examen de nivel gratis.',nosub:true},
  {lang:'es',text:'Link en bio.',nosub:true},
  {lang:'en',text:'Speak Better, Speak Vesper.'}
 ],
 gold:['attend','ayudaste','ayudar','fuiste'], red:['casi','assist','«asistir»,'],
 end:'L8-0.25', endBlinkFrom:'L10e+0.15',
 zoom:[{t:'L2',d:1.3,s:1.1},{t:'L5e-0.05',d:1.2,s:1.1}],
 scenes:[
  {start:-1,end:'L2-0.2',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Weekly meeting</span><b>09:00</b></div>
        <div class="tile"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble bad" style="left:-30px;top:-120px" data-in="L1-0.05" data-anim="pop"><span data-type="L1">I assisted the meeting!</span></div>
    </div>`},
  {start:'L2-0.2',end:'L4-0.2',html:`
    <div style="position:relative;width:100%;height:100%">
      <div class="big md" style="position:absolute;left:0;right:0;top:10px" data-type="L2-0.05~L2+0.35" data-nocaret>I <span data-circle="L2+0.4~L2+0.9">assisted</span> the meeting</div>
      <div class="anno red" style="left:10px;top:-58px;transform:rotate(-8deg)" data-hand="L2+0.1~L2+0.6">casi…</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:250px;font-size:60px;color:#E6CD82" data-hand="L2%0.45~L2e">suena a «ayudaste en la junta»</div>
      <div style="position:absolute;left:0;right:0;top:370px;display:flex;justify-content:center"><div class="stamp" data-stamp="L3+0.05">PARECE, PERO NO</div></div>
      <div class="hand" style="position:absolute;left:0;right:0;top:500px;font-size:88px;color:#F4EEDC"><span data-hand="L3%0.45~L3e"><span style="color:#FF6B6B">assist</span> = ayudar</span></div>
    </div>`},
  {start:'L4-0.2',end:'L5-0.15',html:`
    <div class="board"><span class="lvl">A2</span>
      <div class="chalk sm" data-chalk="L4-0.2~L4+0.45">‘I <span data-strike="L4+0.5~L4+0.8">assisted</span> the meeting.’</div>
      <svg width="60" height="70" viewBox="0 0 60 70" data-draw="L4+0.8~L4+1.0"><path d="M30 4 L30 60 M14 44 L30 62 L46 44" fill="none" stroke="#F1EFE6" stroke-width="5" stroke-linecap="round"/></svg>
      <div class="chalk md" data-chalk="L4+1.0~L4e">ir a la junta = <span class="g" data-under="L4e~L4e+0.3">attend</span></div>
    </div>`},
  {start:'L5-0.15',end:'L6+0.5',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Weekly meeting</span><b>09:00</b></div>
        <div class="tile ok"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble good" style="left:-30px;top:-120px" data-in="L5-0.15" data-anim="pop"><span data-type="L5">I attended the meeting!</span></div>
      <div class="check" style="position:absolute;right:30px;top:110px" data-in="L5e-0.15" data-anim="pop">{OK}</div>
      <div class="eso" style="position:absolute;right:70px;bottom:-120px" data-in="L5e-0.05" data-anim="pop">¡ESO!</div>
    </div>`},
  {start:'L6+0.5',end:'L8-0.25',html:`
    <div class="paper"><div class="tape"></div>
      <div class="row title" data-hand="L6+0.5~L6%0.8">Úsalo igual con <span class="g">eventos</span>:</div>
      <div class="row" data-hand="L6%0.8~L6e+0.25"><span class="es">una clase</span><span class="arr">→</span><span class="en">attend a class</span></div>
      <div class="row" data-hand="L6e~L7+0.1"><span class="es">un evento</span><span class="arr">→</span><span class="en">attend an event</span></div>
      <div class="row" data-hand="L7~L7e"><span class="es">congreso</span><span class="arr">→</span><span class="en">I attended a conference.</span></div>
    </div>`},
  {start:'L8-0.25',end:'END',cls:'end',html:`
    <img class="crest" src="{IMG}/va_crest_cream.png" data-in="L8-0.25" data-anim="pop">
    <h1 data-type="L8">Haz tu examen<br>de nivel <span class="g">gratis</span></h1>
    <div class="btn" data-in="L9-0.15" data-anim="pop">Link en bio</div>
    <div class="slogan" data-type="L10">Speak Better, Speak Vesper</div>`}
 ],
 cat:[
  {t:-1,pose:'correcting'},
  {t:'L1-0.2',pose:'surprised',g:'tilt'},
  {t:'L2',pose:'incorrect',g:'shake'},
  {t:'L3',pose:'explaining',g:'tilt'},
  {t:'L4-0.15',pose:'presenting'},
  {t:'L5e-0.05',pose:'correct',g:'jump'},
  {t:'L6+0.5',pose:'explaining'},
  {t:'L7',pose:'presenting'},
  {t:'L8-0.25',pose:'welcome',g:'wave'}
 ]
})
