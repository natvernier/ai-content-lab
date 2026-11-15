/* Ahead of Thyme · /world · v__VERSION__
   Source: https://github.com/natvernier/ai-content-lab/tree/main/docs/customcode/ahot-world
   Runs only on the /world page of ahatofthyme.com. Reads the main site, never writes to it.
   Everything it draws lives in one Shadow DOM root (#aot-world), so site scripts and styles cannot touch it. */
(function(){
'use strict';
if(window.__aotWorld)return;window.__aotWorld='__VERSION__';
const CSS=__CSS__,HTML=__HTML__,WEBP=__WEBP__,PIP_LAMP=__PIP_LAMP__;
const D0=document,htmlEl=D0.documentElement;

/* The main site's phone menu builds itself only when no .nd-w exists yet: a hidden placeholder keeps it off /world.
   This script must sit in the page footer, which runs before the site footer bundle. */
try{
  if(!D0.querySelector('.nd-w')){const ph=D0.createElement('div');ph.className='nd-w';ph.hidden=true;ph.setAttribute('aria-hidden','true');D0.body.appendChild(ph);}
  const st=D0.createElement('style');st.textContent='.nd-w,.nd-s,.nd-b,#nd-list{display:none!important}';D0.head.appendChild(st);
}catch(e){}

function start(){try{boot();}catch(e){console.error('[aot-world]',e);fail();}}
if(D0.readyState==='loading')D0.addEventListener('DOMContentLoaded',start);else start();

function fail(){
  const h=D0.getElementById('aot-world');if(!h)return;
  const r=h.shadowRoot||h.attachShadow({mode:'open'});
  r.innerHTML='<p style="font:16px/1.5 Barlow,sans-serif;padding:40px;max-width:520px">This view could not start. <a href="/">A Hat of Thyme</a></p>';
}

function boot(){
/* ---------- index from the hidden CMS lists on /world (read only) ---------- */
const KINDS=['Fruits','Vegetables','Herbs & Spices','From the sea','From Animals','More'];
const norm=s=>String(s||'').trim().toLowerCase();
function attr(e,k){const v=e.getAttribute('data-'+k);if(v)return v.trim();const im=e.querySelector('img[data-aot-'+k+']');return im?(im.getAttribute('src')||''):'';}
function readIndex(){
  if(window.AOT_DATA)return window.AOT_DATA;
  const ing=[...D0.querySelectorAll('[data-aot-ing]')].map(e=>({s:attr(e,'s'),n:attr(e,'n'),k:attr(e,'k'),t:attr(e,'t'),img:attr(e,'i')}));
  const seen=new Set(),rec=[];
  D0.querySelectorAll('[data-aot-rec]').forEach(e=>{const s=attr(e,'s');if(!s||seen.has(s))return;seen.add(s);const c=attr(e,'c');
    rec.push({s,n:attr(e,'n'),mi:attr(e,'mi'),i:c===''?null:+c,img:attr(e,'d'),p:attr(e,'p'),kp:attr(e,'kp'),cb:attr(e,'cb')});});
  return {ing,rec};
}
/* small WebP copies of the ingredient cut-outs, keyed by the CMS file ID: a replaced image gets a new ID and falls back to its new original */
function webp(u){const m=/\/([0-9a-f]{24})_/.exec(u||'');const w=m&&WEBP[m[1]];return w?w.u:u;}
const idx=readIndex();
const ING=[],BYS={},BYN={},REC={};
idx.ing.forEach(g=>{if(!g.s||!g.n)return;const m=/\/([0-9a-f]{24})_/.exec(g.img||''),wm=m&&WEBP[m[1]];
  const o={s:g.s,n:g.n,k:KINDS.includes(g.k)?g.k:'More',t:g.t||'',img:g.img?webp(g.img):null,ar:wm?wm.h/wm.w:1.1,rec:[]};ING.push(o);BYS[o.s]=o;BYN[norm(o.n)]=o;});
idx.rec.forEach(r=>{const w=BYN[norm(r.mi)];if(!w||!r.s)return;const o={s:r.s,n:r.n||r.s,i:r.i,img:r.img||null,p:r.p||'',kp:r.kp||'',cb:r.cb||'',w};w.rec.push(o);REC[r.s]=o;});
ING.forEach(g=>{g.rec.sort((a,b)=>a.n.localeCompare(b.n));g.c=g.rec.length;});
const WORLD=ING.filter(g=>g.c>0);

/* ---------- shadow root ---------- */
const host=D0.getElementById('aot-world')||(()=>{const h=D0.createElement('div');h.id='aot-world';D0.body.appendChild(h);return h;})();
const R=host.shadowRoot||host.attachShadow({mode:'open'});
R.innerHTML='<style>'+CSS+'</style><div class="aot">'+HTML.replace('{{PIP_LAMP}}',PIP_LAMP)+'</div>';
const A=R.querySelector('.aot'),$=id=>R.getElementById(id);
const world=$('world'),stage=$('stage'),list=$('list'),tag=$('tag'),toastEl=$('toast'),rp=$('recipe');
$('loader').hidden=true;

/* ---------- day and night: shared with the main site (html.theme-night, localStorage lt-theme) ---------- */
function syncTheme(){host.dataset.theme=htmlEl.classList.contains('theme-night')?'dark':'light';}
syncTheme();new MutationObserver(syncTheme).observe(htmlEl,{attributes:true,attributeFilter:['class']});
$('lamp').onclick=()=>{const night=!htmlEl.classList.contains('theme-night');htmlEl.classList.toggle('theme-night',night);try{localStorage.setItem('lt-theme',night?'night':'day');}catch(e){}};

/* ---------- state ---------- */
const rmQuery=matchMedia('(prefers-reduced-motion: reduce)');
const conn=navigator.connection||{},lean=!!conn.saveData||/(^|-)2g/.test(conn.effectiveType||'');
const idle=window.requestIdleCallback?f=>requestIdleCallback(f,{timeout:1200}):f=>setTimeout(f,250);
const S={level:'ing',mode:'world',w:null,blur:true,seed:(Math.random()*1e9)|0,last:{}};
let items=[],D=9600,WX=2600,FAR=3600,NEAR=70,hover=null,selected=null,lastToast=0,lastInput=0,interacted=false,tagW=0;
const cam={x:0,z:0},tgt={x:0,z:0};
let rowMode=false,rowX=0,rowT=0,rowS=300,rowGap=80,rowSettled=null;
const CAPH=66;
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function reduced(){return rmQuery.matches;}
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
function toast(msg){toastEl.textContent=msg;toastEl.hidden=false;lastToast=performance.now();setTimeout(()=>{if(performance.now()-lastToast>2300)toastEl.hidden=true;},2400);}
function plural(n,one,many){return n+' '+(n===1?one:many);}

/* ---------- the loop sleeps when nothing moves ---------- */
let raf=0;
function kick(){if(!raf)raf=requestAnimationFrame(loop);}
function loop(now){
  raf=0;let moving=false;
  if(S.mode==='world'&&S.level!=='recipe'){
    if(rowMode)moving=renderRow(now);
    else{const k=reduced()?1:0.12;cam.z+=(tgt.z-cam.z)*k;cam.x+=(tgt.x-cam.x)*k;moving=Math.abs(tgt.z-cam.z)>0.5||Math.abs(tgt.x-cam.x)>0.5;render();}
  }
  if(moving||pointers.size)kick();
}

/* ---------- level 1: the ingredients in space ---------- */
function ensureImg(it){if(it.src||!it.img||!it.d.img)return;it.src=1;const im=it.img;im.decoding='async';
  im.onload=()=>{im.classList.add('on');if(im.naturalWidth){it.ar=im.naturalHeight/im.naturalWidth;if(!rowMode)it.el.style.setProperty('--ds',Math.max(it.w,it.w*it.ar)*0.86+'px');}};
  im.onerror=()=>{it.el.classList.add('txt');};im.src=it.d.img;}
function buildWorld(){
  interacted=false;setHint();$('hint').classList.remove('gone');$('hint').hidden=false;
  if(S.level==='dish'){buildRow();return;}
  rowMode=false;stage.innerHTML='';items=[];hover=null;selected=null;tag.hidden=true;
  const r=rng(S.seed),pool=WORLD,N=pool.length||1,gap=260;
  D=Math.max(3200,N*gap);WX=2600;FAR=Math.min(3600,D/2-60);
  pool.forEach((d,i)=>{
    const el=D0.createElement('div');el.className='it';
    const it={d,el,x:(r()-.5)*WX,y:(r()*2-1)*420,z:-(i+r()*.7)*(D/N),w:250*(0.82+r()*.36),ar:d.ar||1.1,blurOn:false,vis:false,op:-1,zb:-1,src:0};
    if(d.img){const im=D0.createElement('img');im.alt='';el.appendChild(im);it.img=im;el.style.width=it.w+'px';el.style.setProperty('--ds',Math.max(it.w,it.w*it.ar)*0.86+'px');}
    else{el.classList.add('txt');el.innerHTML='<span>'+esc(d.n)+'</span>';it.w=0;}
    el.dataset.i=items.length;stage.appendChild(el);items.push(it);
  });
  tgt.x=cam.x=0;tgt.z=cam.z=r()*D;
  render();kick();
  /* the rest of the 37 pictures load quietly once the first view stands */
  if(!lean)idle(()=>{let k=0;for(const it of items){if(!it.src){setTimeout(()=>ensureImg(it),k*60);k++;}}});
}
function render(){
  const W=innerWidth,H=innerHeight,cx=W/2,cy=H/2,f=Math.min(W,H*1.45)*0.95;
  for(const it of items){
    let rz=it.z-cam.z;rz=((rz%D)+D)%D;if(rz>D/2)rz-=D;
    let rx=it.x-cam.x;rx=((rx+WX/2)%WX+WX)%WX-WX/2;
    const d=-rz;let show=d>NEAR&&d<FAR,sc=0,sx=0,sy=0;
    if(show){sc=f/d;sx=cx+rx*sc;sy=cy+it.y*sc;const half=(it.w||120)*sc*.6;if(sx+half<-40||sx-half>W+40||sy+half<-40||sy-half>H+40)show=false;}
    if(!show){if(it.vis){it.el.style.visibility='hidden';it.vis=false;}continue;}
    if(!it.vis){it.el.style.visibility='visible';it.vis=true;ensureImg(it);}
    let o=1;if(d>FAR*.72)o=(FAR-d)/(FAR*.28);if(d<NEAR*4)o=Math.min(o,(d-NEAR)/(NEAR*3));
    if(Math.abs(o-it.op)>0.01){it.el.style.opacity=o.toFixed(2);it.op=o;}
    it.el.style.transform='translate3d('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px,0) scale('+sc.toFixed(4)+') translate(-50%,-50%)';
    const zb=(100000-d/16)|0;if(zb!==it.zb){it.el.style.zIndex=String(zb);it.zb=zb;}
    /* depth blur as signed off; switched with a margin so it never flickers */
    const b=S.blur&&(it.blurOn?d>FAR*.47:d>FAR*.53);if(b!==it.blurOn){it.el.classList.toggle('blur',b);it.blurOn=b;}
    it.sx=sx;it.sy=sy;it.sc=sc;
  }
  const t=selected||hover;
  if(t&&t.vis){tag.hidden=false;const hgt=(t.img?t.w*(t.img.naturalHeight/t.img.naturalWidth||t.ar||1):30)*t.sc;let x=t.sx-tagW/2,y=t.sy+hgt/2+10;x=Math.max(16,Math.min(innerWidth-16-tagW,x));y=Math.min(innerHeight-120,y);tag.style.transform='translate3d('+x.toFixed(0)+'px,'+y.toFixed(0)+'px,0)';}
  else if(!tag.hidden&&!t)tag.hidden=true;
}
function setTag(it){
  if(!it){tag.hidden=true;return;}
  const d=it.d;tag.querySelector('b').textContent=d.n;
  tag.querySelector('small').textContent=S.level==='ing'?plural(d.c,'recipe','recipes'):(d.i!=null?plural(d.i,'ingredient','ingredients'):'');
  tag.hidden=false;tagW=tag.offsetWidth;
}
function hoverOn(it){if(hover===it)return;hover=it;if(it)setTag(it);else if(selected)setTag(selected);kick();}

/* ---------- level 2: one ingredient's recipes in an endless row ---------- */
function rowMetrics(){const W=innerWidth,H=innerHeight;rowS=Math.round(Math.max(H<500?140:180,Math.min(W*0.62,H*0.42,340)));rowGap=Math.round(Math.max(28,Math.min(96,W*0.06)));}
function sizeRow(){rowMetrics();for(const it of items){it.el.style.width=rowS+'px';it.el.style.height=rowS+'px';}}
function buildRow(){
  rowMode=true;stage.innerHTML='';items=[];hover=null;selected=null;tag.hidden=true;
  S.w.rec.forEach((d,i)=>{const el=D0.createElement('div');el.className='it rowit';const im=D0.createElement('img');im.alt='';el.appendChild(im);
    const cap=D0.createElement('div');cap.className='cap';cap.innerHTML='<b><span></span></b><small></small>';cap.querySelector('span').textContent=d.n;
    cap.querySelector('small').textContent=d.i!=null?plural(d.i,'ingredient','ingredients'):'';el.appendChild(cap);
    el.dataset.i=i;stage.appendChild(el);items.push({d,el,img:im,i,vis:true,src:0});});
  rowX=rowT=0;rowSettled=null;sizeRow();kick();
}
function rowStep(){return rowS+rowGap;}
function renderRow(now){
  const W=innerWidth,H=innerHeight,step=rowStep(),cx=W/2,cy=H/2;
  const snapping=!pointers.size&&now-lastInput<=170;
  if(!pointers.size&&!snapping)rowT=Math.round(rowT/step)*step;
  rowX+=(rowT-rowX)*(reduced()?1:0.16);if(Math.abs(rowT-rowX)<0.3)rowX=rowT;
  const y=cy-(rowS+CAPH)/2,ring=items.length*step;
  /* endless: every recipe sits at its nearest place on a ring */
  for(const it of items){let off=((it.i*step-rowX)%ring+ring)%ring;if(off>ring/2)off-=ring;const x=cx+off-rowS/2;const vis=x+rowS+60>-40&&x-60<W+40;
    if(Math.abs(off)<W*1.2+step)ensureImg(it);
    if(vis!==it.vis){it.el.style.visibility=vis?'visible':'hidden';it.vis=vis;}if(!vis)continue;
    it.el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';it.sx=x+rowS/2;it.sy=cy;}
  const moving=rowX!==rowT||snapping||pointers.size>0;
  if(!moving){const c=rowCur();if(c&&rowSettled!==c){rowSettled=c;const n=items.length,i=c.i;prefetch([c.d.s,items[(i+1)%n].d.s,items[(i-1+n)%n].d.s]);}}
  return moving;
}
function rowMove(d){lastInput=performance.now();noteInput();rowT+=d;kick();}
function rowJump(k){lastInput=0;noteInput();rowT=(Math.round(rowT/rowStep())+k)*rowStep();kick();}
function rowCur(){const n=items.length;if(!n)return null;return items[((Math.round(rowT/rowStep())%n)+n)%n];}
function open(it){
  if(S.level==='ing'){if(it.d.c>0)location.hash=it.d.s;}
  else location.hash='recipe/'+it.d.s;
}

/* ---------- input ---------- */
const pointers=new Map();let downPos=null,moved=0,pinch0=0,downIt=null,axis=null,ax0=0,ay0=0,rowStart=0;
function focal(){return Math.min(innerWidth,innerHeight*1.45)*0.95;}
function side(dxPx){lastInput=performance.now();noteInput();tgt.x-=dxPx*1300/focal();kick();}
function fly(dz){lastInput=performance.now();noteInput();tgt.z+=dz;kick();}
function noteInput(){if(aiCur)aiClose();if(!interacted){interacted=true;$('hint').classList.add('gone');}}
world.addEventListener('pointerdown',e=>{world.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,t:e.pointerType});
  if(pointers.size===1){downPos={x:e.clientX,y:e.clientY};moved=0;axis=null;ax0=0;ay0=0;rowStart=rowT;const el=e.target.closest('.it');downIt=el?items[+el.dataset.i]:null;world.classList.add('drag');}
  else if(pointers.size===2){const p=[...pointers.values()];pinch0=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}kick();});
world.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId)){if(e.pointerType==='mouse'&&!rowMode){const el=e.target.closest('.it');hoverOn(el?items[+el.dataset.i]:null);}return;}
  const p=pointers.get(e.pointerId);const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
  /* touch: swiping down moves forward / to the next recipe (Nathalie, 15 Nov) */
  const inv=p.t==='mouse'?1:-1;
  if(pointers.size===1){moved+=Math.abs(dx)+Math.abs(dy);ax0+=dx;ay0+=dy;
    if(!axis&&Math.abs(ax0)+Math.abs(ay0)>10)axis=Math.abs(ax0)>=Math.abs(ay0)?'x':'y';
    if(rowMode){if(axis)rowMove(axis==='x'?-dx:-dy*inv);}
    else if(axis==='x')side(dx);else if(axis==='y')fly(dy*3.2*inv);}
  else if(pointers.size===2&&!rowMode){const q=[...pointers.values()];const dist=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y);fly(-(dist-pinch0)*6);pinch0=dist;moved=99;}
});
function up(e){
  if(!pointers.has(e.pointerId))return;const p=pointers.get(e.pointerId);pointers.delete(e.pointerId);if(pointers.size===0)world.classList.remove('drag');
  if(moved<8&&downIt){
    if(p.t==='mouse'||rowMode)open(downIt);
    else if(selected===downIt)open(downIt);else{selected=downIt;setTag(selected);}
  }else if(moved<8&&!downIt&&p.t!=='mouse'){selected=null;}
  else if(rowMode&&moved>=8&&pointers.size===0){/* a short swipe already steps to the next or previous recipe */
    const st=rowStep(),d=rowT-rowStart;if(Math.abs(d)>st*0.15){const i=Math.round(rowStart/st)+Math.sign(d)*Math.max(1,Math.round(Math.abs(d)/st));rowT=i*st;}}
  downIt=null;kick();
}
world.addEventListener('pointerup',up);world.addEventListener('pointercancel',up);
world.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!pointers.size)hoverOn(null);});
world.addEventListener('wheel',e=>{e.preventDefault();const k=e.deltaMode===1?40:1;if(rowMode){rowMove((Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*k);return;}if(Math.abs(e.deltaX)>Math.abs(e.deltaY))side(-e.deltaX*k*0.9);else fly(-e.deltaY*k*1.4);},{passive:false});
addEventListener('keydown',e=>{if(S.mode!=='world'||S.level==='recipe'||e.defaultPrevented)return;const k=e.key;
  if(rowMode){if(k==='Enter'){const c=rowCur();if(c)open(c);e.preventDefault();}else if(k==='ArrowRight'||k==='ArrowDown'){rowJump(1);e.preventDefault();}else if(k==='ArrowLeft'||k==='ArrowUp'){rowJump(-1);e.preventDefault();}else if(k==='Escape'){hoverOn(null);selected=null;}return;}
  if(k==='ArrowUp'){fly(-260);e.preventDefault();}else if(k==='ArrowDown'){fly(260);e.preventDefault();}else if(k==='ArrowLeft'){side(180);e.preventDefault();}else if(k==='ArrowRight'){side(-180);e.preventDefault();}else if(k==='Escape'){hoverOn(null);selected=null;}});
addEventListener('resize',()=>{if(S.mode==='world'){if(rowMode)sizeRow();kick();}if(aiCur)aiPlace();});

/* ---------- sorted lists ---------- */
function pvHTML(src,cap,txt){return '<div class="pv-img"><img src="'+esc(src)+'" alt="">'+aiPill('generated','tl')+'</div>'+(cap?'<div class="pv-cap">'+esc(cap)+'</div>':'')+(txt?'<div class="pv-txt">'+esc(txt)+'</div>':'');}
function buildList(){
  let h='';
  if(S.level==='ing'){
    const byKind=KINDS.map(k=>ING.filter(x=>x.k===k).sort((a,b)=>b.c-a.c||a.n.localeCompare(b.n)));
    const col=ks=>ks.map(ki=>'<div class="kind"><div class="khead label"><span>'+esc(KINDS[ki].toUpperCase())+'</span><span>'+byKind[ki].length+'</span></div>'+byKind[ki].map(x=>'<button class="row'+(x.c===0?' zero':'')+'" data-s="'+esc(x.s)+'"><span class="nm">'+esc(x.n)+'</span><span class="ld"></span><span class="ct">'+x.c+'</span></button><div class="inline" data-for="'+esc(x.s)+'"></div>').join('')+'</div>').join('');
    h='<div class="lgrid"><div><div class="lhead"><h1>Ingredients</h1><p>'+ING.length+' ingredients in six kinds, one per recipe.</p></div><div class="preview" id="pv"></div></div><div><div class="cols"><div>'+col([0,1,2])+'</div><div>'+col([3,4,5])+'</div></div></div></div>';
  }else{
    const w=S.w;
    h='<div class="lgrid"><div><div class="lhead"><h1>'+esc(w.n)+'</h1>'+(w.t?'<p class="intro">'+esc(w.t)+'</p>':'')+'</div><div class="preview" id="pv"></div></div><div class="toc"><div class="label" style="margin-bottom:10px">Contents</div>'+w.rec.map((x,i)=>'<button class="row" data-s="'+esc(x.s)+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><span class="ttl">'+esc(x.n)+'</span><span class="ct">'+(x.i!=null?plural(x.i,'ingredient','ingredients'):'')+'</span></button><div class="inline" data-for="'+esc(x.s)+'"></div>').join('')+'</div></div>';
  }
  list.innerHTML=h;list.scrollTop=0;
  const first=S.level==='ing'?(WORLD.slice().sort((a,b)=>b.c-a.c)[0]):S.w.rec[0];preview(first,false);
}
function info(s){return S.level==='ing'?BYS[s]:REC[s];}
function preview(d,inline){
  if(!d)return;let src=d.img,cap='',txt='';
  if(S.level==='ing'){cap=d.n+' · '+d.k+' · '+plural(d.c,'recipe','recipes');txt=d.t;}
  const pv=R.getElementById('pv');if(pv&&!inline)pv.innerHTML=src?pvHTML(src,cap,txt):'<div class="pv-cap">'+esc(cap)+'</div>';
  list.querySelectorAll('.row').forEach(r=>r.classList.toggle('on',r.dataset.s===d.s));
  if(inline){list.querySelectorAll('.inline').forEach(n=>{const on=n.dataset.for===d.s;n.classList.toggle('show',on);n.innerHTML=on&&src?pvHTML(src,'',S.level==='ing'?cap:''):'';});}
}
let listSel=null;
list.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const r=e.target.closest('.row');if(r)preview(info(r.dataset.s),false);});
list.addEventListener('click',e=>{
  const r=e.target.closest('.row');if(!r)return;const d=info(r.dataset.s);if(!d)return;
  const touchy=matchMedia('(hover: none)').matches||innerWidth<=900;
  if(touchy&&listSel!==d.s){listSel=d.s;preview(d,true);preview(d,false);return;}
  listSel=null;
  if(S.level==='ing'){if(d.c>0)location.hash=d.s+(S.mode==='sorted'?'-list':'');else toast('No recipes with '+d.n+' yet.');}
  else location.hash='recipe/'+d.s;
});

/* ---------- routing ---------- */
const tog=R.querySelector('.tog');
function route(){
  aiClose();
  const h=decodeURIComponent(location.hash.replace(/^#/,''));
  if(h.startsWith('recipe/')&&REC[h.slice(7)]){showRecipe(REC[h.slice(7)]);return;}
  rp.hidden=true;tog.style.visibility='';$('back').textContent='← Ingredients';
  A.classList.remove('is-recipe');R.querySelectorAll('.rpfade').forEach(n=>n.hidden=true);
  let m;
  if(h==='list'){S.level='ing';S.mode='sorted';S.w=null;}
  else if(h==='world'){S.level='ing';S.mode='world';S.w=null;}
  else if((m=/^(.+)-list$/.exec(h))&&BYS[m[1]]&&BYS[m[1]].c){S.level='dish';S.mode='sorted';S.w=BYS[m[1]];}
  else if(BYS[h]&&BYS[h].c){S.level='dish';S.mode='world';S.w=BYS[h];}
  else{S.level='ing';S.mode=reduced()?'sorted':'world';S.w=null;}
  $('tWorld').setAttribute('aria-pressed',String(S.mode==='world'));$('tSorted').setAttribute('aria-pressed',String(S.mode==='sorted'));
  $('back').hidden=S.level!=='dish';
  const lv=$('lvl');lv.hidden=!(S.level==='dish'&&S.mode==='world');if(S.w){lv.querySelector('b').textContent=S.w.n;lv.querySelector('small').textContent=plural(S.w.c,'recipe','recipes');}
  world.hidden=S.mode!=='world';list.hidden=S.mode!=='sorted';$('hint').hidden=S.mode!=='world'||interacted;
  if(S.mode==='world')buildWorld();else buildList();
  if(S.level==='dish'&&S.mode==='world'){const last=S.last[S.w.s];const i=last?S.w.rec.findIndex(d=>d.s===last):-1;if(i>=0){rowT=rowX=i*rowStep();kick();}}
}
$('tWorld').onclick=()=>{location.hash=S.level==='dish'?S.w.s:'world';};
$('tSorted').onclick=()=>{location.hash=S.level==='dish'?S.w.s+'-list':'list';};
$('back').onclick=()=>{
  if(S.level==='recipe'){const r=REC[decodeURIComponent(location.hash).replace('#recipe/','')];if(r){location.hash=r.w.s+(S.mode==='sorted'?'-list':'');return;}}
  location.hash=S.mode==='sorted'?'list':'world';};
function setHint(){const touch=matchMedia('(hover: none)').matches;$('hint').textContent=S.level==='dish'?(touch?'Swipe to move along the recipes · tap to open':'Scroll or drag to move along the recipes · click to open'):(touch?'Swipe down to move in, up to move back · sideways to look along':'Scroll to move closer or further · drag sideways to look along');}

/* ---------- level 3: the recipe, read from its page on the main site ---------- */
const done=new Map(),pending=new Map();
function fetchRecipe(slug){
  if(done.has(slug))return Promise.resolve(done.get(slug));
  if(pending.has(slug))return pending.get(slug);
  const p=fetch('/recipe/'+encodeURIComponent(slug),{credentials:'same-origin'}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text();})
    .then(t=>{const x=parseRecipe(t);done.set(slug,x);if(done.size>24)done.delete(done.keys().next().value);return x;})
    .finally(()=>pending.delete(slug));
  pending.set(slug,p);return p;
}
function prefetch(slugs){if(lean)return;idle(()=>{slugs.slice(0,3).forEach(s=>{if(REC[s]&&!done.has(s)&&!pending.has(s))fetchRecipe(s).catch(()=>{});});});}
const OKTAG={P:1,BR:1,UL:1,OL:1,LI:1,STRONG:1,B:1,EM:1,I:1,H4:1,H5:1,H6:1,A:1,BLOCKQUOTE:1};
function clean(src){const out=D0.createElement('div');(function walk(from,to){for(const n of from.childNodes){
  if(n.nodeType===3)to.appendChild(D0.createTextNode(n.nodeValue));
  else if(n.nodeType===1){if(OKTAG[n.tagName]){const e=D0.createElement(n.tagName);if(n.tagName==='A'){const h=n.getAttribute('href')||'';if(/^(https?:|\/(?!\/))/.test(h)){e.setAttribute('href',h);if(/^https?:/.test(h)){e.target='_blank';e.rel='noopener';}}}to.appendChild(e);walk(n,e);}else walk(n,to);}}})(src,out);
  return out.innerHTML.trim();}
/* Selectors of the main recipe template (read 15 Nov 2026). Parity: what the main site hides stays hidden here. */
function parseRecipe(htmlText){
  const doc=new DOMParser().parseFromString(htmlText,'text/html');
  const gone=el=>!el||!!el.closest('.w-condition-invisible,.w-dyn-bind-empty,.w-dyn-empty');
  const q=(sel,root)=>{const el=(root||doc).querySelector(sel);return gone(el)?null:el;};
  const txt=(sel,root)=>{const el=q(sel,root);return el?el.textContent.replace(/\s+/g,' ').trim():'';};
  const rich=(sel,root)=>{const el=q(sel,root);return el?clean(el):'';};
  const sheet=doc.querySelector('.glass-sheet');const state=sheet?(sheet.getAttribute('data-state')||''):'';
  const planned=/^(next up|planned)$/i.test(state.trim());
  const x={state,planned,kicker:txt('.kicker'),name:txt('h1.recipe-title'),memHead:txt('.memory-headline'),memBody:rich('.rt-memory'),
    oven:txt('.ingredients-col .oven-note'),ingredients:rich('.ingredients-col .rt-ingredients'),note:rich('.ingredients-col .rt-note'),
    credit:txt('.illu-caption'),tags:[...doc.querySelectorAll('.tags .chip')].filter(e=>!gone(e)).map(e=>e.textContent.replace(/\s+/g,' ').trim().replace(/^#/,'')).filter(Boolean)};
  const sl=q('.source-line');x.source=sl?[...sl.children].filter(e=>!gone(e)).map(e=>e.textContent.replace(/\s+/g,' ').trim()).filter(t=>t&&!/^source:?$/i.test(t))[0]||'':'';
  const pip=q('img.mascot-top');x.pip=pip?pip.getAttribute('src'):'';
  const ph=planned?null:q('.print-large img.dish-photo'),il=q('.print-large img.illu-photo');
  x.photo=ph?ph.getAttribute('src'):'';x.img=x.photo||(il?il.getAttribute('src'):'');
  if(!planned){
    x.stamp=txt('.status-stamp');x.method=rich('.method .rt-method');
    const g=[...doc.querySelectorAll('.dashboard .gauge')].filter(e=>!gone(e));
    const num=(e,i)=>{const n=[...e.querySelectorAll('.gauge-num')][i];return n?n.textContent.replace(/\s+/g,' ').trim():'';};
    if(g[0]){x.time=num(g[0],0);x.timeLabel=(g[0].querySelector('.gauge-label')||{}).textContent||'';x.timeLabel=x.timeLabel.trim();}
    if(g[1])x.serves=num(g[1],0);if(g[2])x.kcal100=num(g[2],0);
    const pl=q('.playlist');const href=pl&&pl.getAttribute('href');
    if(href&&href!=='#')x.playlist={link:href,intro:txt('.playlist-intro'),name:txt('.playlist-name')};
  }
  x.pairs=[...doc.querySelectorAll('.pairing-item')].filter(e=>!gone(e)).map(e=>{const c=q('.pc-card',e),h=c?c.getAttribute('href')||'':'';const m=/\/recipe\/([^/?#]+)/.exec(h);
    return {kind:c&&c.getAttribute('data-pc-card')==='drink'?'Drink':'Dish',text:rich('.rt-body',e),link:m?decodeURIComponent(m[1]):null};});
  return x;
}
function steps(h){const d=D0.createElement('div');d.innerHTML=h||'';let li=[...d.querySelectorAll('li')];if(!li.length)li=[...d.querySelectorAll('p')];return li.map((n,i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span><div>'+n.innerHTML+'</div></li>').join('');}
let recipeToken=0;
function showRecipe(r){
  S.level='recipe';S.last[r.w.s]=r.s;
  world.hidden=true;list.hidden=true;rp.hidden=false;$('hint').hidden=true;$('lvl').hidden=true;tog.style.visibility='hidden';
  $('back').hidden=false;$('back').textContent='← '+r.w.n;
  A.classList.add('is-recipe');R.querySelectorAll('.rpfade').forEach(n=>n.hidden=false);
  const token=++recipeToken;
  if(done.has(r.s))buildRecipe(r,done.get(r.s));
  else{buildRecipe(r,null);fetchRecipe(r.s).then(x=>{if(token===recipeToken)buildRecipe(r,x,true);}).catch(()=>{if(token===recipeToken)buildRecipe(r,{error:true},true);});}
  rp.scrollTop=0;
}
function buildRecipe(r,x,refill){
  const st=refill?rp.scrollTop:0;
  const w=r.w,L=w.rec,i=L.indexOf(r),loading=!x,err=x&&x.error;x=x&&!err?x:{};
  const t=(x.time||'').split(' '),big=t.shift(),rest=t.join(' ');
  const dash=[x.time?'<div><b>'+esc(big)+(rest?'<small>'+esc(rest)+'</small>':'')+'</b><span>'+esc(x.timeLabel||'')+'</span></div>':'',
    x.serves?'<div><b>'+esc(x.serves)+'</b><span>serves</span></div>':'',x.kcal100?'<div><b>'+esc(x.kcal100)+'<small>kcal</small></b><span>per 100 g</span></div>':'',
    !x.planned&&r.kp?'<div><b>'+esc(r.kp)+'<small>kcal</small></b><span>per portion</span></div>':'',r.i!=null&&!loading?'<div><b>'+r.i+'</b><span>ingredients</span></div>':''].join('');
  const mainImg=x.img||r.img||'',edited=!!x.photo;
  const side=x.photo&&r.cb?'<span class="side combo"><img src="'+esc(r.cb)+'" alt="">'+aiPill('generated','tl')+'</span>':(x.pip?'<span class="side pip"><img src="'+esc(x.pip)+'" alt="">'+aiPill('generated','below')+'</span>':'');
  const card=(kind,slug)=>{const y=REC[slug];if(!y)return '';return '<div class="pcard"><button class="plink" data-rec="'+esc(y.s)+'"><span class="cut">'+(y.img?'<img src="'+esc(y.img)+'" alt="">':'')+'</span><span><span class="k">'+kind+'</span><b>'+esc(y.n)+'</b><small>'+esc(y.w.n)+(y.i!=null?' · '+plural(y.i,'ingredient','ingredients'):'')+' →</small></span></button>'+(y.img?aiPill('generated','pl'):'')+'</div>';};
  const plain=h=>{const d=D0.createElement('div');d.innerHTML=h||'';return d.textContent.trim().toLowerCase();};
  /* pairing text is hidden when it only repeats the name of the linked recipe */
  const pairs=x.pairs||[];
  const pairTxt=pairs.map(p=>p.link&&REC[p.link]&&plain(p.text)===REC[p.link].n.trim().toLowerCase()?'':p.text).join('');
  const cards=pairs.map(p=>p.link?card(p.kind,p.link):'').join('');
  const pairH=(pairTxt||cards)?'<div class="pair"><div class="lab"><span>Pairs with</span><span></span></div>'+(pairTxt?'<div class="txt">'+pairTxt+'</div>':'')+(cards?'<div class="cards">'+cards+'</div>':'')+'</div>':'<div></div>';
  const noteH=x.note?'<div class="note"><h3>'+(x.planned?'The plan':'Note to self')+'</h3>'+x.note+'</div>':'<div></div>';
  const pl=x.playlist;
  const memH=(x.memHead||x.memBody)?'<section class="mem"><div class="k">A memory</div>'+(x.memHead?'<h2>'+esc(x.memHead)+'</h2>':'')+(x.memBody?'<div class="body">'+x.memBody+'</div>':'')+(pl?'<a class="play" href="'+esc(pl.link)+'" target="_blank" rel="noopener"><i>▶</i><span><em>'+esc(pl.intro||'')+'</em><small>'+esc(pl.name||'Playlist')+(/deezer/i.test(pl.link)?' · Deezer':'')+' ↗</small></span></a>':'')+'</section>':'';
  let moreH='',pagerH='';
  if(L.length>1&&i>=0){
    const seq=[];for(let k=1;k<L.length;k++)seq.push(L[(i+k)%L.length]);
    const one=seq.map(y=>'<div class="mcard"><button class="mitem" data-rec="'+esc(y.s)+'"><span class="cut">'+(y.img?'<img src="'+esc(y.img)+'" alt="" loading="lazy">':'')+'</span><b><span>'+esc(y.n)+'</span></b><small>'+(y.i!=null?plural(y.i,'ingredient','ingredients'):'')+'</small></button>'+(y.img?aiPill('generated','tl'):'')+'</div>').join('');
    moreH='<section class="more"><div class="head"><span class="k">More with '+esc(w.n)+'</span><span class="r"><button class="arr" data-dir="-1" aria-label="Previous recipes">‹</button><button class="arr" data-dir="1" aria-label="Next recipes">›</button></span></div><div class="track" data-n="'+seq.length+'">'+one+one+one+'</div></section>';
    const prev=L[(i-1+L.length)%L.length],next=L[(i+1)%L.length];
    pagerH='<nav class="pager"><button data-rec="'+esc(prev.s)+'"><span>← Previous</span><b>'+esc(prev.n)+'</b></button><span class="pos">'+esc(w.n)+' · '+(i+1)+' of '+L.length+'</span><button data-rec="'+esc(next.s)+'"><span>Next</span><b>'+esc(next.n)+' →</b></button></nav>';
  }
  const noteLine=loading?'':(err?'<p class="rp-note">This recipe could not be loaded right now.<button data-retry="'+esc(r.s)+'">Try again</button></p>':'');
  rp.innerHTML='<article class="rp'+(loading?' is-loading':'')+'"><header class="rp-hero"><div class="rp-intro">'+(x.kicker?'<p class="kick">'+esc(x.kicker)+'</p>':'')+'<h1>'+esc(x.name||r.n)+'</h1>'+(r.p?'<p class="place">'+esc(r.p)+'</p>':'')+(x.source?'<p class="src"><span>Source</span><b>'+esc(x.source)+'</b></p>':'')+noteLine+'</div>'+
    '<figure class="rp-media">'+(mainImg?'<img class="main" src="'+esc(mainImg)+'" alt="">'+aiPill(edited?'edited':'generated','tr'):'')+(x.stamp&&x.photo?'<span class="stamp">'+esc(x.stamp)+'</span>':'')+side+'</figure><div class="dash">'+dash+'</div>'+(x.oven?'<p class="oven">Oven: '+esc(x.oven)+'</p>':'')+'</header>'+
    '<section class="rp-cols"><div><div class="lab"><span>Ingredients</span><span>'+(r.i!=null?r.i:'')+'</span></div><div class="ing-list">'+(x.ingredients||'')+'</div></div>'+(x.method?'<div><div class="lab"><span>Method</span><span></span></div><ol class="steps">'+steps(x.method)+'</ol></div>':'<div></div>')+'</section>'+
    '<section class="rp-cols b">'+noteH+pairH+'</section>'+memH+
    (x.tags&&x.tags.length||x.credit?'<section class="tags">'+(x.tags&&x.tags.length?'<div class="lab"><span>Filed under</span><span></span></div><div class="pills">'+x.tags.map(y=>'<span>#'+esc(y)+'</span>').join('')+'</div>':'')+(x.credit?'<p class="credit">Image: '+esc(x.credit)+'</p>':'')+'</section>':'')+
    moreH+pagerH+'<p class="rp-foot">2026 © A Hat of Thyme · <a href="/impressum">Impressum</a> · <a href="/privacy">Privacy</a> · <a href="/how-i-use-ai">How I use AI</a></p></article>';
  const tr=rp.querySelector('.track');
  if(tr){const n=+tr.dataset.n,its=tr.children,pad=()=>parseFloat(getComputedStyle(tr).scrollPaddingLeft)||0;
    const setW=()=>its[n].offsetLeft-its[0].offsetLeft;
    requestAnimationFrame(()=>{tr.style.scrollBehavior='auto';tr.scrollLeft=its[n].offsetLeft-tr.offsetLeft-pad();});
    let to=0;tr.addEventListener('scroll',()=>{clearTimeout(to);to=setTimeout(()=>{const wd=setW();if(tr.scrollLeft<wd*0.5){tr.style.scrollBehavior='auto';tr.scrollLeft+=wd;}else if(tr.scrollLeft>wd*1.5){tr.style.scrollBehavior='auto';tr.scrollLeft-=wd;}},140);},{passive:true});}
  if(refill)rp.scrollTop=st;
  if(!loading&&!err&&L.length>1&&i>=0)prefetch([L[(i+1)%L.length].s,L[(i-1+L.length)%L.length].s]);
}
rp.addEventListener('click',e=>{
  const b=e.target.closest('[data-rec],[data-dir],[data-retry]');if(!b)return;
  if(b.dataset.rec){location.hash='recipe/'+b.dataset.rec;return;}
  if(b.dataset.retry){const r=REC[b.dataset.retry];if(r)showRecipe(r);return;}
  if(b.dataset.dir){const tr=rp.querySelector('.track');const it=tr.querySelector('.mcard');const stp=it.getBoundingClientRect().width+parseFloat(getComputedStyle(tr).columnGap||48);tr.style.scrollBehavior='smooth';tr.scrollBy({left:+b.dataset.dir*stp,behavior:reduced()?'auto':'smooth'});}
});

/* ---------- AI label: lists and recipe page only (Nathalie, 15 Nov), same texts and behaviour as the main site ---------- */
const AIL=window.LT_AI_LABEL||{generated:{title:'AI-generated watercolour',detail:'Nano Banana Pro via Higgsfield. Pip and the dish illustrations are painted by AI from my prompts.'},edited:{title:'My photograph, edited with AI',detail:'Light and background rebuilt with Nano Banana Pro. The food is shown as I cooked it.'},linkText:'How I use AI →',linkHref:'/how-i-use-ai'};
const aiCard=$('aiCard');let aiCur=null,aiPin=false,aiHide=0;
function aiPill(kind,pos){const k=AIL[kind]||AIL.generated;return '<span class="ai '+pos+'" role="button" tabindex="0" aria-label="AI – '+esc(k.title)+'" aria-expanded="false" aria-controls="aiCard" aria-haspopup="dialog" data-ai="'+kind+'">AI</span>';}
function aiPlace(){if(!aiCur)return;const r=aiCur.getBoundingClientRect();if(!r.width){aiClose();return;}
  const w=aiCard.offsetWidth,h=aiCard.offsetHeight,vw=D0.documentElement.clientWidth,vh=innerHeight,m=8;
  let x=aiCur.classList.contains('tr')?r.right-w:r.left;if(x+w>vw-m)x=r.right-w;x=Math.max(m,Math.min(x,vw-m-w));
  let y=r.bottom+6;if(y+h>vh-m&&r.top-6-h>=m)y=r.top-6-h;aiCard.style.left=Math.round(x)+'px';aiCard.style.top=Math.round(y)+'px';}
function aiOpen(b,pin){clearTimeout(aiHide);if(aiCur&&aiCur!==b){aiCur.setAttribute('aria-expanded','false');aiPin=false;}
  aiCur=b;if(pin)aiPin=true;const k=AIL[b.dataset.ai]||AIL.generated;
  aiCard.querySelector('.t').textContent=k.title;aiCard.querySelector('.d').textContent=k.detail;const a=aiCard.querySelector('a');a.textContent=AIL.linkText;a.href=AIL.linkHref;
  b.setAttribute('aria-expanded','true');aiCard.classList.add('open');aiPlace();}
function aiClose(){clearTimeout(aiHide);if(aiCur)aiCur.setAttribute('aria-expanded','false');aiCur=null;aiPin=false;aiCard.classList.remove('open');}
function aiLater(){clearTimeout(aiHide);aiHide=setTimeout(aiClose,180);}
const aiBtn=t=>t&&t.closest?t.closest('.ai'):null;
R.addEventListener('pointerdown',e=>{if(aiBtn(e.target))e.stopPropagation();},true);
R.addEventListener('click',e=>{const b=aiBtn(e.target);if(b){e.preventDefault();e.stopPropagation();if(aiCur===b&&aiPin)aiClose();else aiOpen(b,true);return;}if(aiCur&&!aiCard.contains(e.target))aiClose();},true);
R.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const b=aiBtn(e.target);if(!b)return;clearTimeout(aiHide);if(aiCur!==b&&!aiPin)aiOpen(b);});
R.addEventListener('pointerout',e=>{if(e.pointerType!=='mouse')return;const b=aiBtn(e.target);if(b&&aiCur===b&&!aiPin&&!(e.relatedTarget&&(b.contains(e.relatedTarget)||aiCard.contains(e.relatedTarget))))aiLater();});
aiCard.addEventListener('pointerenter',()=>clearTimeout(aiHide));
aiCard.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!aiPin)aiLater();});
R.addEventListener('focusin',e=>{const b=aiBtn(e.target);if(!b||aiCur===b)return;let fv=true;try{fv=b.matches(':focus-visible');}catch(x){}if(fv)aiOpen(b);});
R.addEventListener('focusout',e=>{if(!aiCur)return;const t=e.relatedTarget;if(!t||t===aiCur||aiCard.contains(t))return;if(e.target===aiCur||aiCard.contains(e.target))aiClose();});
R.addEventListener('keydown',e=>{const b=aiBtn(e.target);if(b&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();if(aiCur===b&&aiPin)aiClose();else aiOpen(b,true);return;}
  if(aiCur&&(e.key==='Escape'||e.key==='Esc')){const was=aiCur;aiClose();if(aiCard.contains(e.target))was.focus();e.stopPropagation();}},true);
D0.addEventListener('click',e=>{if(aiCur&&!e.composedPath().includes(host))aiClose();});
rp.addEventListener('scroll',()=>{if(aiCur)requestAnimationFrame(aiPlace);},{passive:true});

/* ---------- go ---------- */
addEventListener('hashchange',route);
route();
if(/[?&]aot-debug\b/.test(location.search))window.AOT={version:'__VERSION__',S,ING,REC,done,cam,tgt,items:()=>items,rowCur};
}
})();
