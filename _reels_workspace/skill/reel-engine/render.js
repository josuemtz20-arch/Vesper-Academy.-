// node render.js config.js timing.json audio.wav out.mp4 [tail]
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path'); const {execFileSync}=require('child_process');
const [cfg,timing,audio,out,tailA]=process.argv.slice(2); const fps=30, tail=+(tailA||1.2);
const REPO=process.env.VESPER_REPO||path.resolve(__dirname,'../../..');
(async()=>{
  const T=JSON.parse(fs.readFileSync(timing)); const dur=T.duration+tail; const env=T.env||[]; delete T.env;
  let html=fs.readFileSync(__dirname+'/template.html','utf8').replace(/FONTDIR/g,'file://'+__dirname+'/fonts').replace("'IMGDIR'","'file://"+REPO+"/assets/images'")
    .replace('window.REEL=/*CONFIG*/null;','window.TIMING='+JSON.stringify(T)+';window.ENV='+JSON.stringify(env)+';\nwindow.REEL='+fs.readFileSync(cfg,'utf8')+';');
  const pf=path.resolve(out).replace(/\.mp4$/,'.html'); fs.writeFileSync(pf,html);
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  p.on('pageerror',e=>console.error('PAGEERR',e.message));
  await p.goto('file://'+pf); await p.waitForFunction(()=>window.READY===true,{timeout:20000}); await p.waitForTimeout(300);
  const fdir=pf.replace(/\.html$/,'_frames'); fs.rmSync(fdir,{recursive:true,force:true}); fs.mkdirSync(fdir);
  const only=process.env.ONLY? process.env.ONLY.split(',').map(Number):null;
  const n=Math.ceil(dur*fps);
  if(only){ if(process.env.COVER) await p.evaluate(()=>{window.COVER=true;}); for(const t of only){ await p.evaluate(t=>window.render(t),t); await p.screenshot({path:`${fdir}/t_${t}.png`}); } await b.close(); console.log('stills in',fdir); return; }
  for(let i=0;i<n;i++){ await p.evaluate(t=>window.render(t),i/fps); await p.screenshot({path:`${fdir}/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92}); }
  await b.close();
  execFileSync('ffmpeg',['-loglevel','error','-y','-framerate',String(fps),'-i',`${fdir}/f%05d.jpg`,'-i',audio,'-af',`apad=whole_dur=${dur}`,
    '-c:v','libx264','-pix_fmt','yuv420p','-profile:v','high','-crf','18','-preset','medium','-r',String(fps),'-c:a','aac','-b:a','192k','-ar','48000','-t',String(dur),'-movflags','+faststart',out]);
  fs.rmSync(fdir,{recursive:true,force:true}); console.log('done',out,dur.toFixed(2)+'s',n,'frames');
})();
