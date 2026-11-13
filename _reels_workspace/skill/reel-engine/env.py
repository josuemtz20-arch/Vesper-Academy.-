# python3 env.py voice.wav timing.json  -> adds "env" (mouth open per frame @30fps)
import sys, json, subprocess, numpy as np
wav, js = sys.argv[1:3]
raw = subprocess.run(['ffmpeg','-loglevel','error','-i',wav,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(float)/32768
hop = 16000//30; n = len(x)//hop
rms = np.array([np.sqrt((x[i*hop:(i+1)*hop]**2).mean()) for i in range(n)])
sm = np.convolve(rms, np.ones(2)/2, mode='same'); mx = np.percentile(sm, 98) or 1
v = sm/mx; out=[]; st=0; run=0
for i,val in enumerate(v):
    if st==0 and val>0.30: st=1; run=0
    elif st==1 and val<0.18: st=0
    o = st
    if st==1:
        run+=1
        if run%5==4: o=0   # flap: close briefly during long vowels
    out.append(int(o))
d = json.load(open(js)); d['env']=out; json.dump(d, open(js,'w'))
print('frames',n,'open ratio',round(sum(out)/max(1,n),2))
