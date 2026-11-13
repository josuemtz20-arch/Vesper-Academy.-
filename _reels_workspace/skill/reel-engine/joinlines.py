# usage: python3 joinlines.py out.wav out.json line1.wav [gap=0.6] line2.wav ...   (default gap 0.35)
import sys, subprocess, re, json
out, js = sys.argv[1:3]; args = sys.argv[3:]
def bounds(f):
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
    log=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=noise=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
    a=0.0; b=dur
    if st and st[0]<0.02 and en: a=en[0]
    if st and st[-1]>a+0.1 and (len(en)<len(st) or en[-1]>=dur-0.3): b=st[-1]
    return max(0,a-0.04), min(dur,b+0.06)
t=0.25; gap=None; chunks=[]; filt=[]; ins=[]; k=0
for a in args:
    if a.startswith('gap='): gap=float(a[4:]); continue
    s,e=bounds(a); g=0.25 if k==0 else (gap if gap is not None else 0.35); gap=None
    t+= 0 if k==0 else g
    ins+=['-i',a]
    filt.append(f"[{k}]atrim={s}:{e},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,afade=t=in:d=0.015,afade=t=out:st={e-s-0.03}:d=0.03,adelay={int((g if k else 0.25)*1000)}[s{k}]")
    chunks.append({'i':k,'start':round(t,3),'end':round(t+e-s,3),'file':a.split('/')[-1]}); t+=e-s; k+=1
filt.append(''.join(f'[s{i}]' for i in range(k))+f"concat=n={k}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=7,aresample=48000[out]")
subprocess.run(['ffmpeg','-loglevel','error','-y',*ins,'-filter_complex',';'.join(filt),'-map','[out]',out],check=True)
d={'duration':round(t,3),'chunks':chunks}; json.dump(d,open(js,'w'),indent=1)
for c in chunks: print(c['i'],c['start'],c['end'],round(c['end']-c['start'],2),c['file'])
print('total',d['duration'])
