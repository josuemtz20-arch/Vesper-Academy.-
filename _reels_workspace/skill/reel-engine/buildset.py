import numpy as np, os, sys
from PIL import Image, ImageFilter
S=600
def key(path):
    im=np.array(Image.open(path).convert('RGB').resize((S,S),Image.LANCZOS)).astype(float)
    r,g,b=im[...,0],im[...,1],im[...,2]
    gd=g-np.maximum(r,b)
    a=np.clip(1-(gd-30)/80,0,1)
    # despill
    g2=np.minimum(g,np.maximum(r,b)+10); im[...,1]=np.where(gd>0,g2,g)
    out=np.dstack([im,a*255])
    return out
def load(path):
    if path.endswith('_g.png') or 'green' in path: return key(path)
    return np.array(Image.open(path).convert('RGBA').resize((S,S),Image.LANCZOS)).astype(float)
def align(base,e):
    alpha=base[...,3]>128; best=(1e9,0,0)
    for dx in range(-6,7):
        for dy in range(-6,7):
            s=np.roll(np.roll(e,dy,0),dx,1); d=np.abs(s[...,:3]-base[...,:3]).mean(-1)[alpha].mean()
            if d<best[0]: best=(d,dx,dy)
    return np.roll(np.roll(e,best[2],0),best[1],1),best
def patch(base,edit,thr,win,grow=15,blur=5):
    e,best=align(base,edit)
    diff=np.abs(e[...,:3]-base[...,:3]).mean(-1)
    H=S; w=np.zeros((S,S),bool); y0,y1,x0,x1=win; w[int(H*y0):int(H*y1),int(H*x0):int(H*x1)]=True
    m=(diff>thr)&w&(base[...,3]>128)
    mi=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MaxFilter(grow)).filter(ImageFilter.GaussianBlur(blur))
    mk=np.array(mi).astype(float)/255*(base[...,3]/255)
    return e,mk,best
def save(arr,p): Image.fromarray(np.clip(arr,0,255).astype('uint8'),'RGBA').save(p)
out=sys.argv[1]; os.makedirs(out,exist_ok=True)
# pose: (base file, base mouth state, mouth-variant file, blink file)
P={
 'explaining':('explaining.png','closed','raw/explaining_open.png','raw/explaining_blink.png'),
 'correcting':('correcting.png','closed','raw/correcting_open.png','raw/correcting_blink.png'),
 'incorrect':('incorrect.png','closed','raw/incorrect_open.png','raw/incorrect_blink.png'),
 'correct':('correct.png','open','raw/correct_closed.png','raw/correct_blink.png'),
 'welcome':('welcome.png','open','raw/welcome_closed.png','raw/welcome_blink.png'),
 'streak':('streak.png','open','raw/streak_closed.png','raw/streak_blink.png'),
 'thinking':('raw/thinking_g.png','closed','raw/thinking_open_g.png','raw/thinking_blink_g.png'),
 'surprised':('raw/surprised_g.png','open','raw/surprised_closed_g.png','raw/surprised_blink_g.png'),
 'presenting':('raw/presenting_g.png','closed','raw/presenting_open_g.png','raw/presenting_blink_g.png'),
}
only=sys.argv[2:] or list(P)
for name in only:
    bf,st,mf,kf=P[name]
    if not os.path.exists(mf) or not os.path.exists(kf): print('skip',name); continue
    base=load(bf); mv=load(mf); bl=load(kf)
    e,mk,b1=patch(base,mv,22,(0.36,0.75,0.25,0.78))
    other=base.copy(); other[...,:3]=base[...,:3]*(1-mk[...,None])+e[...,:3]*mk[...,None]
    ost='open' if st=='closed' else 'closed'
    save(base,f'{out}/{name}_{st}.png'); save(other,f'{out}/{name}_{ost}.png')
    e2,mk2,b2=patch(base,bl,45,(0.15,0.55,0.15,0.85),grow=21,blur=6)
    ov=np.dstack([e2[...,:3],mk2*255])
    save(ov,f'{out}/{name}_blink.png')
    print(name,'mouth shift',b1[1:],round(b1[0],1),'blink shift',b2[1:],round(b2[0],1),'blink px',int((mk2>.5).sum()))
