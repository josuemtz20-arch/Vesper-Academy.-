import sys, numpy as np
from PIL import Image, ImageFilter
# usage: patch.py base.png edit.png out.png [region: mouth|eyes]
base=Image.open(sys.argv[1]).convert('RGBA'); edit=Image.open(sys.argv[2]).convert('RGB').resize(base.size,Image.LANCZOS)
region=sys.argv[4]
b=np.array(base).astype(float); e=np.array(edit).astype(float)
alpha=b[...,3]>128
# best small shift
best=(1e9,0,0)
for dx in range(-6,7):
  for dy in range(-6,7):
    s=np.roll(np.roll(e,dy,0),dx,1); d=np.abs(s-b[...,:3]).mean(-1)[alpha].mean()
    if d<best[0]: best=(d,dx,dy)
e=np.roll(np.roll(e,best[2],0),best[1],1)
diff=np.abs(e-b[...,:3]).mean(-1)
H,W=diff.shape
# restrict search window by region (face area)
win=np.zeros_like(diff,bool)
if region=='mouth': win[int(H*.40):int(H*.66), int(W*.30):int(W*.72)]=True
else: win[int(H*.25):int(H*.52), int(W*.22):int(W*.80)]=True
m=(diff>28)&win&alpha
mi=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(5))
mk=np.array(mi).astype(float)/255*alpha
out=b.copy(); out[...,:3]=b[...,:3]*(1-mk[...,None])+e*mk[...,None]
Image.fromarray(out.astype('uint8'),'RGBA').save(sys.argv[3])
ys,xs=np.where(mk>0.5)
print(sys.argv[3].split('/')[-1],'shift',best[1:],'score',round(best[0],1),'bbox',(xs.min(),ys.min(),xs.max(),ys.max()) if len(xs) else None)
