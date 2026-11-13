({
 series:'ERROR TÍPICO', level:'A2',
 lines:[
  {lang:'es',text:'En una junta, te presentas así:'},
  {lang:'en',text:'Actually, I work in sales.'},
  {lang:'es',text:'Casi… Actually no significa actualmente.'},
  {lang:'es',text:'Significa en realidad, o de hecho.'},
  {lang:'es',text:'Para decir actualmente, usa currently.'},
  {lang:'en',text:'Currently, I work in sales.'},
  {lang:'es',text:'Y actually úsalo para aclarar o corregir:'},
  {lang:'en',text:'Actually, the meeting is on Friday.'},
  {lang:'es',text:'Haz tu examen de nivel gratis.',nosub:true},
  {lang:'es',text:'Link en bio.',nosub:true},
  {lang:'en',text:'Speak Better, Speak Vesper.'}
 ],
 gold:['currently','realidad','hecho','aclarar','corregir'], red:['casi'],
 end:'L8-0.25', endBlinkFrom:'L10e+0.15',
 zoom:[{t:'L2',d:1.3,s:1.1},{t:'L5e',d:1.2,s:1.1}],
 scenes:[
  {start:-1,end:'L2-0.2',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Weekly meeting</span><b>09:00</b></div>
        <div class="tile"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble bad" style="left:-40px;top:-120px;font-size:54px" data-in="L1-0.05" data-anim="pop"><span data-type="L1">Actually, I work in sales.</span></div>
    </div>`},
  {start:'L2-0.2',end:'L4-0.2',html:`
    <div style="position:relative;width:100%;height:100%">
      <div class="big md" style="position:absolute;left:0;right:0;top:10px" data-type="L2-0.05~L2+0.35" data-nocaret><span data-circle="L2+0.4~L2+0.9">Actually</span>, I work in sales</div>
      <div class="anno red" style="left:10px;top:-58px;transform:rotate(-8deg)" data-hand="L2+0.1~L2+0.6">casi…</div>
      <div class="hand" style="position:absolute;left:0;right:0;top:260px;font-size:72px;color:#F4EEDC"><span data-hand="L2%0.4~L2e"><span style="color:#E6CD82">actually</span> ≠ <span style="color:#FF6B6B">actualmente</span></span></div>
      <div style="position:absolute;left:0;right:0;top:390px;display:flex;justify-content:center"><div class="stamp" data-stamp="L3-0.1">PARECE, PERO NO</div></div>
      <div class="hand" style="position:absolute;left:0;right:0;top:520px;font-size:66px;color:#E6CD82" data-hand="L3+0.2~L3e">= en realidad / de hecho</div>
    </div>`},
  {start:'L4-0.2',end:'L5-0.15',html:`
    <div class="board"><span class="lvl">A2</span>
      <div class="chalk sm" data-chalk="L4-0.2~L4+0.5">‘<span data-strike="L4+0.55~L4+0.85">Actually</span>, I work in sales.’</div>
      <svg width="60" height="70" viewBox="0 0 60 70" data-draw="L4+0.85~L4+1.05"><path d="M30 4 L30 60 M14 44 L30 62 L46 44" fill="none" stroke="#F1EFE6" stroke-width="5" stroke-linecap="round"/></svg>
      <div class="chalk md" data-chalk="L4+1.05~L4e">actualmente = <span class="g" data-under="L4e~L4e+0.3">currently</span></div>
    </div>`},
  {start:'L5-0.15',end:'L6+0.5',html:`
    <div style="position:relative;margin-top:90px">
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>Weekly meeting</span><b>09:00</b></div>
        <div class="tile ok"><img src="{IMG}/mascot/skins/calico.png"><span class="you">Tú</span></div></div>
      <div class="bubble good" style="left:-30px;top:-120px;font-size:54px" data-in="L5-0.15" data-anim="pop"><span data-type="L5">Currently, I work in sales.</span></div>
      <div class="check" style="position:absolute;right:30px;top:110px" data-in="L5e-0.15" data-anim="pop">{OK}</div>
      <div class="eso" style="position:absolute;right:70px;bottom:-120px" data-in="L5e-0.05" data-anim="pop">¡ESO!</div>
    </div>`},
  {start:'L6+0.5',end:'L8-0.25',html:`
    <div class="paper"><div class="tape"></div>
      <div class="row title" data-hand="L6+0.5~L6%0.72">Úsalo para <span class="g">aclarar</span> o <span class="g">corregir</span>:</div>
      <div class="row" data-hand="L6%0.72~L6e+0.3"><span class="es">— La junta es el jueves, ¿no?</span></div>
      <div class="row" data-hand="L7~L7%0.55"><span class="en">Actually, the meeting</span></div>
      <div class="row" data-hand="L7%0.5~L7e"><span class="en">is on Friday.</span></div>
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
  {t:'L5e',pose:'correct',g:'jump'},
  {t:'L6+0.5',pose:'thinking',g:'tilt'},
  {t:'L7',pose:'presenting'},
  {t:'L8-0.25',pose:'welcome',g:'wave'}
 ]
})
