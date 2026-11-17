/* Ahead of Thyme · world switch for the Classic site · v1.1.0
   Source: https://github.com/natvernier/ai-content-lab/tree/main/docs/customcode/ahot-switch
   Corner button with menu: Classic · Cosmos · List (Figma 857:3981 "AoT · World corner button (C)", chosen by Nathalie on 16 Nov 2026).
   Runs on *.webflow.io, and on any host once the new structure is published (World is the start page, the Classic
   start lives at /classic: read from the Classic header logo). On today's live site (logo → "/") it does nothing.
   Skips the World page (#aot-world; it has its own switch). Old /world addresses forward to the World at "/" (v1.1.0).
   It only adds: one element inside the site header (a Shadow DOM root, so site styles cannot reach it) and one small style.
   On tablets and phones the ceiling lamp moves 48 / 52 px to the left to make room; nothing else in the header changes.
   Rule (user flow 851:3694): same place in the other world, else one level up, else its start. */
(function(){
'use strict';
var D=document,W=window,L=location;
if(W.__aotSwitch)return;W.__aotSwitch='1.1.0';
var P=(L.pathname.replace(/\/+$/,'')||'/'),HREF=null,CLASSIC='/';

/* ---------- where things are: the Classic logo knows the Classic start; World sits at "/" once Classic has moved ---------- */
function plan(){
  if(D.getElementById('aot-world'))return false;                       /* the World page has its own switch */
  var logo=D.querySelector('.site-header a.wordmark');
  CLASSIC=((logo&&logo.getAttribute('href'))||'/').replace(/(.)\/+$/,'$1');
  var moved=CLASSIC!=='/';                                              /* new structure: World is the start page */
  if(!moved&&!/\.webflow\.io$/i.test(L.hostname))return false;         /* today's live site: nothing happens */
  var WB=moved?'/':'/world';
  if(/^\/world$/i.test(P)&&(moved||/\.webflow\.io$/i.test(L.hostname))){L.replace('/'+L.search+L.hash);return false;}   /* old /world links (the World page itself returned above) */
  var m,cos='#world',lst='#list',view='';
  if((m=/^\/ingredient\/([^\/]+)$/i.exec(P))){cos='#'+m[1];lst='#'+m[1]+'-list';}
  else if((m=/^\/recipe\/([^\/]+)$/i.exec(P))){cos=lst='#recipe/'+m[1];view='?view=list';}
  HREF={cosmos:WB+cos,list:WB+view+lst};
  return true;
}

var IC={
 classic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.75" y="3.75" width="7" height="7" rx="1.75"/><rect x="13.25" y="3.75" width="7" height="7" rx="1.75"/><rect x="3.75" y="13.25" width="7" height="7" rx="1.75"/><rect x="13.25" y="13.25" width="7" height="7" rx="1.75"/></svg>',
 cosmos:'<svg viewBox="0 0 25 24" fill="none" stroke="currentColor"><path stroke-width="1.25" d="M10.85 7.83C13.91 6.71 16.82 6.13 19.02 6.07C20.13 6.03 21.02 6.14 21.66 6.35C22.31 6.56 22.59 6.85 22.69 7.11C22.78 7.37 22.75 7.77 22.39 8.35C22.04 8.93 21.42 9.58 20.55 10.27C18.83 11.64 16.22 13.05 13.15 14.17C10.09 15.29 7.18 15.88 4.98 15.94C3.87 15.97 2.98 15.86 2.34 15.65C1.69 15.44 1.41 15.15 1.31 14.89C1.22 14.63 1.25 14.23 1.61 13.65C1.96 13.07 2.58 12.42 3.45 11.73C5.17 10.36 7.78 8.95 10.85 7.83Z"/><circle cx="12" cy="11" r="4.75" stroke-width="1.5"/><circle cx="22.78" cy="6.9" r="1.75" fill="currentColor" stroke="none"/></svg>',
 list:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="6.5" r="1.5"/><rect x="8.5" y="5.75" width="12" height="1.5" rx=".75"/><circle cx="5" cy="12" r="1.5"/><rect x="8.5" y="11.25" width="12" height="1.5" rx=".75"/><circle cx="5" cy="17.5" r="1.5"/><rect x="8.5" y="16.75" width="12" height="1.5" rx=".75"/></svg>'};

/* light-DOM rules: where the host sits, and room for the lamp on tablets and phones (only where the switch is shown, html.aot-sw) */
var PAGE_CSS='#aot-switch{position:absolute;top:0;bottom:0;right:24px;display:flex;align-items:center;z-index:5;pointer-events:none}'
 +'#aot-switch.aot-fixed{position:fixed;top:44px;bottom:auto;height:44px;z-index:890}'
 +'@media (max-width:991px){html.aot-sw .site-header .theme-switch.lt-has-lamp{margin-right:48px}}'
 +'@media (max-width:767px){#aot-switch{right:16px}#aot-switch.aot-fixed{top:24px}html.aot-sw .site-header .theme-switch.lt-has-lamp{margin-right:52px}}'
 +'@media print{#aot-switch{display:none}}';

/* inside the Shadow DOM: the site's colour variables reach in, so day and night follow html.theme-night */
var CSS=':host{all:initial}'
 +'.wsw{position:relative;pointer-events:auto;font-family:Barlow,"Helvetica Neue",Arial,sans-serif;'
 +'--ink:var(--_colour---ink,#160601);--muted:var(--_colour---ink-muted,#3f2c2d);--raised:var(--_colour---raised,#fffdf3);--hair:var(--_colour---hairline,#e4d5b4);'
 +'--glass:var(--_colour---glass-fill,rgba(255,253,243,.85));--glass-edge:var(--_colour---glass-edge,rgba(255,255,255,.7));--limone:var(--_colour---limone,#ffe21a);--focus:var(--_colour---focus-ring,#004aac)}'
 +'button{font:inherit;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}'
 +':focus{outline:none}:focus-visible{outline:2px solid var(--focus);outline-offset:3px}'
 +'.btn{width:44px;height:44px;box-sizing:border-box;padding:0;border-radius:50%;display:grid;place-items:center;color:var(--ink);background:var(--glass);border:1px solid var(--glass-edge);'
 +'-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:0 6px 16px -8px rgba(22,6,1,.18)}'
 +'.btn svg{display:block;width:22px;height:22px}'
 +'.menu{position:absolute;right:0;top:52px;width:170px;box-sizing:border-box;padding:6px;display:flex;flex-direction:column;gap:2px;background:var(--raised);'
 +'border:1px solid var(--hair);border-radius:14px;box-shadow:0 14px 30px -14px rgba(22,6,1,.25)}'
 +'.menu[hidden]{display:none}'
 +'a{display:flex;align-items:center;gap:10px;height:38px;box-sizing:border-box;padding:9px 14px 9px 10px;border-radius:10px;color:var(--ink);text-decoration:none;'
 +'font-weight:600;font-size:14px;line-height:18px;letter-spacing:.02em;-webkit-tap-highlight-color:transparent}'
 +'a svg{display:block;flex:none;width:20px;height:20px;color:var(--muted)}'
 +'a[aria-current]{background:var(--limone);color:#160601}a[aria-current] svg{color:#160601}'
 +'a:focus-visible{outline-offset:-2px;border-radius:10px}'
 +'@media (hover:hover){a:not([aria-current]):hover{background:var(--hair)}}';

function build(){
  if(D.getElementById('aot-switch')||!plan())return;
  var hdr=D.querySelector('.site-header');
  var st=D.createElement('style');st.id='aot-switch-css';st.textContent=PAGE_CSS;D.head.appendChild(st);
  var host=D.createElement('div');host.id='aot-switch';
  if(hdr){D.documentElement.classList.add('aot-sw');hdr.appendChild(host);}
  else{host.className='aot-fixed';D.body.appendChild(host);}
  var R=host.attachShadow({mode:'open'});
  R.innerHTML='<style>'+CSS+'</style><div class="wsw"><button class="btn" type="button" aria-expanded="false" aria-controls="m" aria-label="World: Classic. Switch world" title="Switch world">'+IC.classic+'</button>'
   +'<nav class="menu" id="m" aria-label="Worlds" hidden>'
   +'<a data-w="classic" href="'+CLASSIC+'" aria-current="page">'+IC.classic+'<span>Classic</span></a>'
   +'<a data-w="cosmos" href="'+HREF.cosmos+'">'+IC.cosmos+'<span>Cosmos</span></a>'
   +'<a data-w="list" href="'+HREF.list+'">'+IC.list+'<span>List</span></a></nav></div>';
  var box=R.querySelector('.wsw'),btn=R.querySelector('.btn'),menu=R.querySelector('.menu'),links=[].slice.call(R.querySelectorAll('a'));
  /* Classic is where you are: its row just closes the menu */
  links[0].addEventListener('click',function(e){e.preventDefault();open(false);btn.focus();});
  function onScroll(){open(false);}
  function open(on){
    menu.hidden=!on;btn.setAttribute('aria-expanded',String(!!on));
    if(on)W.addEventListener('scroll',onScroll,{passive:true});else W.removeEventListener('scroll',onScroll);
  }
  btn.addEventListener('click',function(){var on=menu.hidden;open(on);if(on){var fv=false;try{fv=btn.matches(':focus-visible');}catch(x){}if(fv)links[0].focus();}});
  box.addEventListener('keydown',function(e){
    if(menu.hidden)return;var k=e.key;
    if(k==='Escape'||k==='Esc'){e.preventDefault();e.stopPropagation();open(false);btn.focus();return;}
    if(k==='ArrowDown'||k==='ArrowUp'||k==='Home'||k==='End'){
      e.preventDefault();var i=links.indexOf(R.activeElement),n=links.length;
      var j=k==='Home'?0:k==='End'?n-1:k==='ArrowDown'?(i+1+n)%n:(i<0?n-1:(i-1+n)%n);links[j].focus();}
  });
  box.addEventListener('focusout',function(e){var t=e.relatedTarget;if(t&&!box.contains(t))open(false);});
  D.addEventListener('pointerdown',function(e){if(!menu.hidden&&e.composedPath().indexOf(box)<0)open(false);},true);
}
try{if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',build);else build();}catch(e){try{console.warn('[aot-switch]',e);}catch(x){}}
})();
