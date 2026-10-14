/* Turn and tilt · P15 of the Depth patterns by Nathalie Vernier, https://www.natvernier.com/depth-patterns/turn-and-tilt
   https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p15-turn-and-tilt · MIT licence · needs the depth kit (../kit/) */
(()=>{
const k=window.NVDKit(),track=document.getElementById("track"),scrub=document.getElementById("scrub"),live=document.getElementById("turnstate");
const names=["Front","Right side","Back","Left side","Front"],TAU=Math.PI*2,MAXT=20*Math.PI/180,BASE=22*Math.PI/180,A0=.5,A1=1.3,Y0=.06,Y1=.44,N=96;
let turn=0,tilt=0,goal=0,raf=0,drag=false;
const lum=h=>{h=h.replace("#","");h.length===3&&(h=[...h].map(x=>x+x).join(""));return(parseInt(h.slice(0,2),16)*.3+parseInt(h.slice(2,4),16)*.59+parseInt(h.slice(4,6),16)*.11)/255};
function dish(c,cx,cy,S,th,el){
  const ink=k.col.ink,paper=k.col.paper,dk=lum(paper)<.5,lo=dk?paper:ink,hi=dk?ink:paper,tone=v=>k.mix(lo,hi,v);
  const ct=Math.cos(th),st=Math.sin(th),ce=Math.cos(el),se=Math.sin(el);
  const pt=(x,y,z)=>{const x1=x*ct+z*st,z1=-x*st+z*ct;return[cx+x1*S,cy-(y*ce-z1*se)*S]};
  const nv=(x,y,z)=>{const x1=x*ct+z*st,z1=-x*st+z*ct;return[x1,y*ce-z1*se,y*se+z1*ce]};
  const lit=n=>Math.max(0,-.42*n[0]+.62*n[1]+.66*n[2]);
  const poly=(ps,fill,stroke)=>{c.beginPath();ps.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.25;c.stroke()}};
  const ring=(r,y,a0,a1,n)=>{const o=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;o.push(pt(Math.cos(a)*r,y,Math.sin(a)*r))}return o};
  const span=TAU-(A1-A0);
  c.lineJoin="round";
  // shadow on the table
  c.fillStyle=dk?"rgba(0,0,0,.4)":"rgba(32,38,39,.13)";c.beginPath();c.ellipse(cx+S*.1,cy+S*.07,S*1.72,Math.max(2,S*1.72*se),0,0,TAU);c.fill();
  // plate
  poly(ring(1.5,0,0,TAU,N),tone(dk?.4:.82),tone(dk?.7:.42));
  poly(ring(1.2,.012,0,TAU,N),tone(dk?.34:.88));
  // cut faces of the missing slice
  for(const[a,s]of[[A0,1],[A1,-1]]){const n=nv(-Math.sin(a)*s,0,Math.cos(a)*s);if(n[2]>0)poly([pt(0,Y0,0),pt(Math.cos(a),Y0,Math.sin(a)),pt(Math.cos(a),Y1,Math.sin(a)),pt(0,Y1,0)],tone((dk?.5:.4)+.3*lit(n)))}
  // crust wall
  for(let i=0;i<N;i++){const a=A1+span*i/N,b=A1+span*(i+1)/N,am=(a+b)/2,n=nv(Math.cos(am),0,Math.sin(am));if(n[2]<=0)continue;const f=tone((dk?.34:.3)+.42*lit(n));poly([pt(Math.cos(a),Y0,Math.sin(a)),pt(Math.cos(b),Y0,Math.sin(b)),pt(Math.cos(b),Y1,Math.sin(b)),pt(Math.cos(a),Y1,Math.sin(a))],f,f)}
  // top
  poly([pt(0,Y1,0)].concat(ring(1,Y1,A1,A0+TAU,N)),tone(dk?.56:.58),tone(dk?.82:.3));
  poly([pt(0,Y1,0)].concat(ring(.84,Y1,A1+.06,A0+TAU-.06,N)),tone(dk?.66:.74));
  // pear slices
  for(let j=0;j<7;j++){const a=A1+.42+j*(span-.84)/6,ca=Math.cos(a),sa=Math.sin(a),ps=[];for(let t=0;t<24;t++){const u=t/24*TAU,rr=.5+.27*Math.cos(u),tt=.12*Math.sin(u)*(1-.35*Math.cos(u));ps.push(pt(ca*rr-sa*tt,Y1+.004,sa*rr+ca*tt))}poly(ps,tone(dk?.46:.5),tone(dk?.8:.28))}
  // the verve dot: one marker that shows which way the dish faces
  const d=pt(Math.cos(4.1)*.2,Y1+.1,Math.sin(4.1)*.2);c.fillStyle=k.col.signal;c.beginPath();c.arc(d[0],d[1],S*.11,0,TAU);c.fill();c.strokeStyle=tone(dk?.2:.25);c.lineWidth=1.25;c.stroke();
}
function draw(c,W,H){
  c.clearRect(0,0,W,H);const m=W<768;
  if(k.calm){const s=Math.min(m?W*.3/3.7:W*.19/3.9,H*.13),y=H*(m?.62:.52),xs=m?[W*.2,W*.5,W*.8]:[W*.48,W*.67,W*.86];
    ["Front","Side","Back"].forEach((t,i)=>{dish(c,xs[i],y,s,i*Math.PI/2,BASE);c.fillStyle=k.col["ink-soft"];c.font='14px "Outfit",system-ui,sans-serif';c.textAlign="center";c.fillText(t,xs[i],y+s*1.05+16)});return}
  dish(c,m?W/2:W*.66,H*(m?.6:.52),Math.min(W,H)*(m?.2:.19),turn,BASE+tilt);
}
const D=k.canvas(document.getElementById("turn"),draw);
function loop(){tilt+=(goal-tilt)*.16;if(Math.abs(goal-tilt)>.002){D.redraw();raf=requestAnimationFrame(loop)}else{tilt=goal;D.redraw();raf=0}}
const aim=v=>{goal=k.clamp(v,-MAXT,MAXT);if(k.calm){tilt=goal;return}raf||(raf=requestAnimationFrame(loop))};
addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const r=track.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;aim((.5-e.clientY/innerHeight)*2*MAXT)},{passive:true});
document.documentElement.addEventListener("mouseleave",()=>aim(0));
function E(){const e=k.progress(track);e>.005&&k.hintGone();k.dim(e>.04);turn=e*TAU;const i=Math.round(e*4);k.step(i,e);drag||(scrub.value=Math.round(e*360));scrub.setAttribute("aria-valuetext",names[i]);live.textContent!==names[i]&&(live.textContent=names[i]);D.redraw()}
scrub.addEventListener("input",()=>{drag=true;k.scrollToProgress(track,scrub.value/360);k.hintGone();requestAnimationFrame(()=>{drag=false})});
scrub.addEventListener("keydown",e=>{const t={ArrowRight:1,ArrowLeft:-1}[e.key],u={ArrowUp:1,ArrowDown:-1}[e.key];
  if(t){e.preventDefault();const f=scrub.value/90,g=t>0?Math.floor(f+1e-6)+1:Math.ceil(f-1e-6)-1;k.scrollToProgress(track,k.clamp(g/4))}
  else if(u){e.preventDefault();aim(goal+u*MAXT/4)}});
k.onScroll(E);k.onCalm(E);k.ready();D.size();E();
})();
