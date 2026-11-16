// Smoke test for /world against the local stand-in (test/mock), with the main site's real site-wide code loaded.
// Run: python3 -m http.server 8790 -d test/mock & node test/smoke.js
const {chromium}=require('playwright');
const BASE=process.env.BASE||'http://localhost:8790';
(async()=>{
 const b=await chromium.launch();const out={},fails=[];
 const ok=(name,cond,detail)=>{out[name]=cond?'ok':('FAIL '+(detail!==undefined?JSON.stringify(detail):''));if(!cond)fails.push(name);};
 const errs=[];
 const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/aot/.test(m.text()))errs.push(m.text());});
 const sh=(fn,arg)=>p.evaluate(fn,arg);
 await p.goto(BASE+'/world/?aot-debug#world');await p.waitForTimeout(1500);
 const l1=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {items:R.querySelectorAll('.it').length,loaded:R.querySelectorAll('.it img.on').length,ndw:!!document.querySelector('.nd-w'),ndb:!!document.querySelector('.nd-b'),aiInShadow:R.querySelectorAll('.ail').length,version:window.__aotWorld};});
 ok('L1 builds the world (36 ingredients with recipes)',l1.items===36,l1);
 ok('L1 pictures load',l1.loaded>=5,l1.loaded);
 ok('phone menu of the main site stays off',l1.ndw&&!l1.ndb,l1);
 ok('main-site AI label does not reach into /world',l1.aiInShadow===0,l1.aiInShadow);
 // theme follows the main site's class
 await sh(()=>document.documentElement.classList.add('theme-night'));await p.waitForTimeout(50);
 const th1=await sh(()=>document.getElementById('aot-world').dataset.theme);
 await sh(()=>document.documentElement.classList.remove('theme-night'));await p.waitForTimeout(50);
 const th2=await sh(()=>document.getElementById('aot-world').dataset.theme);
 ok('day/night follows html.theme-night',th1==='dark'&&th2==='light',[th1,th2]);
 // idle: the loop sleeps
 const cdp=await c.newCDPSession(p);await cdp.send('Performance.enable');await p.waitForTimeout(1500);
 const m0=await cdp.send('Performance.getMetrics');await p.waitForTimeout(2000);const m1=await cdp.send('Performance.getMetrics');
 const g=(m,k)=>m.metrics.find(x=>x.name===k).value;const idleMs=Math.round((g(m1,'TaskDuration')-g(m0,'TaskDuration'))*1000/2);
 ok('idle CPU near zero (ms per s)',idleMs<15,idleMs);
 // level 2, biggest world
 await sh(()=>location.hash='cream');await p.waitForTimeout(900);
 const l2=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {rows:R.querySelectorAll('.rowit').length,pills:R.querySelectorAll('.rowit .ai').length,lvl:R.getElementById('lvl').textContent};});
 ok('L2 Cream & Butter row',l2.rows>=30&&l2.pills===0,l2);
 await p.waitForTimeout(1500);
 const pre=await sh(()=>window.AOT.done.size);
 ok('centred recipe and neighbours are prefetched',pre>=1,pre);
 // level 3 with photo
 await sh(()=>location.hash='recipe/lemon-and-thyme-vin-de-citron');await p.waitForTimeout(1200);
 const l3=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;const q=s=>R.querySelector(s);return {h1:q('.rp h1')&&q('.rp h1').textContent,kick:q('.kick')&&q('.kick').textContent,place:q('.place')&&q('.place').textContent,src:q('.src b')&&q('.src b').textContent,
   steps:R.querySelectorAll('.steps li').length,ing:!!(q('.ing-list')&&q('.ing-list').textContent.trim()),photoPill:q('.rp-media > .ai')&&q('.rp-media > .ai').dataset.ai,stamp:q('.stamp')&&q('.stamp').textContent,pos:q('.pager .pos')&&q('.pager .pos').textContent,
   more:R.querySelectorAll('.mcard').length,nested:R.querySelectorAll('button .ai').length,credit:q('.credit')&&q('.credit').textContent,tags:R.querySelectorAll('.pills span').length,loading:!!q('.rp.is-loading')};});
 ok('L3 reads the recipe page',l3.h1==='Lemon & Thyme Vin de Citron'&&l3.steps>=3&&l3.ing&&!l3.loading,l3);
 ok('L3 place line from the index',/By the sea/.test(l3.place||''),l3.place);
 ok('L3 photo labelled Edited, no stamp (review 15 Nov)',l3.photoPill==='edited'&&!l3.stamp,l3);
 ok('no Filed-under list, credit stays',l3.tags===0&&/Image:/.test(l3.credit||''),l3);
 ok('L3 pager and More-with row',/^Lemon · \d+ of 8$/.test(l3.pos||'')&&l3.more===21,l3);
 ok('no AI pill inside a button',l3.nested===0,l3.nested);
 // pill opens the card and never navigates
 await p.click('.rp-media > .ai');await p.waitForTimeout(250);
 const card=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {open:R.getElementById('aiCard').classList.contains('open'),t:R.querySelector('#aiCard .t').textContent,hash:location.hash};});
 ok('AI card opens with the main site text',card.open&&/photograph/i.test(card.t)&&card.hash==='#recipe/lemon-and-thyme-vin-de-citron',card);
 await p.keyboard.press('Escape');
 // pairing: Citron pressé → Moules card, repeated text hidden
 await sh(()=>location.hash='recipe/citron-presse');await p.waitForTimeout(1200);
 const pr=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {cards:[...R.querySelectorAll('.plink b')].map(x=>x.textContent),txt:(R.querySelector('.pair .txt')||{textContent:''}).textContent,img:R.querySelector('.rp-media > .ai')&&R.querySelector('.rp-media > .ai').dataset.ai,pip:!!R.querySelector('.side.pip .ai.below')};});
 ok('pairing card links Moules marinières',pr.cards.some(x=>/Moules/i.test(x)),pr);
 ok('no-photo recipe: illustration Generated, Pip labelled below',pr.img==='generated'&&pr.pip,pr);
 const pw=await sh(()=>{const e=document.getElementById('aot-world').shadowRoot.querySelector('.side.pip');return e?Math.round(e.getBoundingClientRect().width):0;});
 ok('Pip four times bigger on the recipe page (384 px)',pw===384,pw);
 // Next up recipe: the main site hides method, dashboard, playlist, stamp
 await sh(()=>location.hash='recipe/apfelstrudel');await p.waitForTimeout(1200);
 const nu=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {steps:R.querySelectorAll('.steps li').length,dash:R.querySelectorAll('.dash > div').length,note:(R.querySelector('.note h3')||{textContent:''}).textContent,play:!!R.querySelector('.play')};});
 ok('Next up parity (no method, dashboard, playlist)',nu.steps===0&&nu.dash<=1&&!nu.play,nu);
 // sorted lists show the pill
 await sh(()=>location.hash='list');await p.waitForTimeout(600);
 const li=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {rows:R.querySelectorAll('.row').length,pill:R.querySelectorAll('.pv-img .ai').length,zero:R.querySelectorAll('.row.zero').length};});
 ok('ingredient list with preview pill, Truffle greyed',li.rows===37&&li.pill===1&&li.zero===1,li);
 await sh(()=>location.hash='lemon-list');await p.waitForTimeout(600);
 const ll=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot;return {rows:R.querySelectorAll('.toc .row').length,h1:R.querySelector('.lhead h1').textContent};});
 ok('Lemon recipe list',ll.rows===8&&ll.h1==='Lemon',ll);
 await p.click('#pv .pv-img img');await p.waitForTimeout(500);
 const pvh=await sh(()=>location.hash);
 ok('list preview picture opens its recipe',/^#recipe\//.test(pvh),pvh);
 // missing recipe page → calm error, retry button
 await p.route('**/recipe/sgroppino*',r=>r.fulfill({status:404,body:'not found'}));
 await sh(()=>location.hash='recipe/sgroppino');await p.waitForTimeout(1000);
 const er=await sh(()=>!!document.getElementById('aot-world').shadowRoot.querySelector('[data-retry]'));
 ok('a missing page shows a calm note with "Try again"',er,er);
 // world switch (corner button, v0.1.4): same place as in Classic, centred on the header line with the wordmark
 const SW=()=>sh(()=>{const R=document.getElementById('aot-world').shadowRoot,g=id=>R.getElementById(id),b=g('wswBtn').getBoundingClientRect(),w=g('wm').getBoundingClientRect();
   const cur=R.querySelector('#wswMenu [aria-current]');return {bx:Math.round(innerWidth-b.right),by:+(b.top+b.height/2).toFixed(1),bw:Math.round(b.width),wy:+(w.top+w.height/2).toFixed(1),wm:g('wm').getAttribute('href'),
   open:!g('wswMenu').hidden,exp:g('wswBtn').getAttribute('aria-expanded'),cur:cur&&cur.dataset.w,classic:g('wswClassic').getAttribute('href'),cosmos:g('wswCosmos').getAttribute('href'),list:g('wswList').getAttribute('href'),
   ic:!!g('wswIc').querySelector('svg'),hash:location.hash,mode:window.AOT.S.mode,level:window.AOT.S.level,label:g('wswBtn').getAttribute('aria-label')};});
 await sh(()=>location.hash='lemon');await p.waitForTimeout(700);
 let w1=await SW();
 ok('switch: round 44 px button 24 px from the right, centred on the 66 px line',w1.bw===44&&w1.bx===24&&Math.abs(w1.by-66)<=1,w1);
 ok('switch: wordmark centred on the same line and leads to the Cosmos start',Math.abs(w1.wy-66)<=1.5&&w1.wm==='#world',w1);
 ok('switch: closed, shows Cosmos, links keep the place (Lemon)',!w1.open&&w1.exp==='false'&&w1.ic&&w1.cur==='cosmos'&&w1.classic==='/ingredient/lemon'&&w1.list==='#lemon-list'&&/Cosmos/.test(w1.label),w1);
 await p.click('#wswBtn');await p.waitForTimeout(150);
 const w2=await SW();
 const mb=await sh(()=>{const R=document.getElementById('aot-world').shadowRoot,m=R.getElementById('wswMenu').getBoundingClientRect(),b=R.getElementById('wswBtn').getBoundingClientRect();return {gap:Math.round(m.top-b.bottom),right:Math.round(b.right-m.right),w:Math.round(m.width),rows:[...R.querySelectorAll('#wswMenu a')].map(a=>a.textContent)};});
 ok('switch: menu opens under the button (Classic · Cosmos · List)',w2.open&&w2.exp==='true'&&mb.gap===8&&mb.right===0&&mb.w===170&&mb.rows.join()==='Classic,Cosmos,List',{w2,mb});
 await p.click('#wswList');await p.waitForTimeout(600);
 let w3=await SW();
 ok('switch: List keeps the place (#lemon-list), menu closes, logo leads to the list start',w3.hash==='#lemon-list'&&!w3.open&&w3.cur==='list'&&w3.wm==='#list'&&w3.cosmos==='#lemon',w3);
 await sh(()=>location.hash='list');await p.waitForTimeout(500);
 w3=await SW();
 ok('switch: all ingredients ↔ /ingredients',w3.classic==='/ingredients'&&w3.cosmos==='#world',w3);
 await sh(()=>location.hash='recipe/lemon-and-thyme-vin-de-citron');await p.waitForTimeout(900);
 let w4=await SW();
 ok('switch: stays on the recipe page, Classic opens the same recipe',w4.level==='recipe'&&w4.bw===44&&w4.classic==='/recipe/lemon-and-thyme-vin-de-citron'&&w4.cur==='list',w4);
 await p.click('#wswBtn');await p.click('#wswCosmos');await p.waitForTimeout(200);
 w4=await SW();
 ok('switch on the recipe: Cosmos keeps the recipe and only changes the way back',w4.hash==='#recipe/lemon-and-thyme-vin-de-citron'&&w4.mode==='world'&&w4.cur==='cosmos'&&!w4.open,w4);
 await p.click('#back');await p.waitForTimeout(600);
 ok('… and back leads to the Lemon row',await sh(()=>location.hash)==='#lemon');
 await p.click('#wswBtn');await p.keyboard.press('Escape');await p.waitForTimeout(100);
 const esc=await SW();
 await p.click('#wswBtn');await p.mouse.click(700,760);await p.waitForTimeout(150);
 const outside=await SW();
 ok('switch: Escape and a click outside close the menu',!esc.open&&!outside.open&&outside.hash==='#lemon',{esc:esc.open,outside:outside.open,hash:outside.hash});
 ok('no errors from /world',errs.length===0,errs.slice(0,3));
 await c.close();
 // entering from the Classic switch: ?view=list opens the List view at the same place, else one level up
 const ent=await b.newContext({viewport:{width:1280,height:800}});const ep=await ent.newPage();const eerr=[];ep.on('pageerror',e=>eerr.push(e.message));
 const at=async u=>{await ep.goto(BASE+u);await ep.waitForTimeout(1000);return ep.evaluate(()=>({S:{mode:window.AOT.S.mode,level:window.AOT.S.level,w:window.AOT.S.w&&window.AOT.S.w.s},url:location.pathname+location.search+location.hash,
   cur:(document.getElementById('aot-world').shadowRoot.querySelector('#wswMenu [aria-current]')||{dataset:{}}).dataset.w}));};
 let e1=await at('/world/?view=list&aot-debug#recipe/lemon-and-thyme-vin-de-citron');
 ok('from Classic: recipe opens in List, view parameter removed',e1.S.level==='recipe'&&e1.S.mode==='sorted'&&e1.cur==='list'&&!/view=/.test(e1.url),e1);
 e1=await at('/world/?view=list&aot-debug#no-such-recipe-xyz');
 ok('from Classic: unknown place → start of the List',e1.S.level==='ing'&&e1.S.mode==='sorted',e1);
 e1=await at('/world/?aot-debug#truffle-list');
 ok('from Classic: ingredient without recipes → all ingredients (List)',e1.S.level==='ing'&&e1.S.mode==='sorted',e1);
 e1=await at('/world/?aot-debug#truffle');
 ok('from Classic: ingredient without recipes → all ingredients (Cosmos)',e1.S.level==='ing'&&e1.S.mode==='world',e1);
 ok('entry: no errors',eerr.length===0,eerr.slice(0,3));
 await ent.close();
 // phone: tap a recipe in the row, then the recipe opens
 const m=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const q=await m.newPage();const merr=[];q.on('pageerror',e=>merr.push(e.message));
 await q.goto(BASE+'/world/#lemon');await q.waitForTimeout(1200);
 const t=await q.evaluate(()=>{const R=document.getElementById('aot-world').shadowRoot;let best=null,bd=1e9;R.querySelectorAll('.rowit').forEach(e=>{const r=e.getBoundingClientRect();const d=Math.abs(r.left+r.width/2-innerWidth/2);if(d<bd){bd=d;best=e;}});const r=best.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
 await q.touchscreen.tap(t.x,t.y);await q.waitForTimeout(1200);
 const mh=await q.evaluate(()=>({hash:location.hash,h1:(document.getElementById('aot-world').shadowRoot.querySelector('.rp h1')||{}).textContent}));
 ok('phone: tap in the row opens the recipe',/^#recipe\//.test(mh.hash)&&!!mh.h1,mh);
 await q.evaluate(()=>location.hash='world');await q.waitForTimeout(1200);
 const ms=await q.evaluate(()=>{const R=document.getElementById('aot-world').shadowRoot;const lg=R.querySelector('.legal');const big=Math.max(...[...R.querySelectorAll('.it')].filter(e=>e.style.visibility!=='hidden').map(e=>e.getBoundingClientRect().width));return {legal:lg&&getComputedStyle(lg).display!=='none'&&lg.getBoundingClientRect().width>0,big:Math.round(big)};});
 ok('phone: legal links visible on the world',ms.legal,ms);
 ok('phone: starts with one big ingredient (≥ 55 % of the width)',ms.big>=390*0.55,ms);
 // phone, world: first tap shows the label, a tap on the label opens (review 15 Nov)
 const it={x:195,y:390}; /* the phone start puts the Lemon in the middle */
 await q.touchscreen.tap(it.x,it.y);await q.waitForTimeout(400);
 const tg=await q.evaluate(()=>{const t=document.getElementById('aot-world').shadowRoot.getElementById('tag');const r=t.getBoundingClientRect();return {shown:!t.hidden,x:r.left+r.width/2,y:r.top+r.height/2,name:t.querySelector('b').textContent,hash:location.hash};});
 ok('phone world: first tap shows the label, no jump',tg.shown&&tg.hash==='#world',tg);
 await q.touchscreen.tap(tg.x,tg.y);await q.waitForTimeout(700);
 const th=await q.evaluate(()=>location.hash);
 ok('phone world: tap on the label opens the ingredient',th!=='#world'&&th.length>1,{th,name:tg.name});
 // phone, lists: one tap on the name opens
 await q.evaluate(()=>location.hash='lemon-list');await q.waitForTimeout(700);
 const rw=await q.evaluate(()=>{const r=document.getElementById('aot-world').shadowRoot.querySelector('.toc .row .ttl').getBoundingClientRect();return {x:r.left+10,y:r.top+r.height/2};});
 await q.touchscreen.tap(rw.x,rw.y);await q.waitForTimeout(900);
 const lh=await q.evaluate(()=>location.hash);
 ok('phone list: one tap on the name opens the recipe',/^#recipe\//.test(lh),lh);
 // phone: More with … has left and right arrows that move the row
 await q.evaluate(()=>location.hash='recipe/lemon-and-thyme-vin-de-citron');await q.waitForTimeout(1300);
 await q.evaluate(()=>{const R=document.getElementById('aot-world').shadowRoot;R.querySelector('.more').scrollIntoView({block:'center'});});await q.waitForTimeout(400);
 const s0=await q.evaluate(()=>{const R=document.getElementById('aot-world').shadowRoot;const a=[...R.querySelectorAll('.more .arr')].map(b=>b.getBoundingClientRect().width);return {arrows:a,sl:R.querySelector('.more .track').scrollLeft};});
 await q.evaluate(()=>document.getElementById('aot-world').shadowRoot.querySelector('.more .arr[data-dir="1"]').click());await q.waitForTimeout(800);
 const s1=await q.evaluate(()=>document.getElementById('aot-world').shadowRoot.querySelector('.more .track').scrollLeft);
 ok('phone: More with has left and right arrows that move the row',s0.arrows.length===2&&s0.arrows.every(w=>w>=40)&&s1>s0.sl,{s0,s1});
 const ps=await q.evaluate(()=>{const R=document.getElementById('aot-world').shadowRoot,b=R.getElementById('wswBtn').getBoundingClientRect(),w=R.getElementById('wm').getBoundingClientRect();return {bx:Math.round(innerWidth-b.right),by:+(b.top+b.height/2).toFixed(1),wy:+(w.top+w.height/2).toFixed(1),bw:Math.round(b.width)};});
 ok('phone: switch 16 px from the right, button and wordmark on the 46 px line',ps.bx===16&&ps.bw===44&&Math.abs(ps.by-46)<=1&&Math.abs(ps.wy-46)<=1.5,ps);
 ok('phone: no errors',merr.length===0,merr.slice(0,3));
 await m.close();
 // reduced motion starts in the list
 const rm=await b.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});const rp=await rm.newPage();
 await rp.goto(BASE+'/world/');await rp.waitForTimeout(900);
 const rl=await rp.evaluate(()=>!document.getElementById('aot-world').shadowRoot.getElementById('list').hidden);
 ok('reduced motion starts in the list',rl,rl);
 await rm.close();await b.close();
 console.log(JSON.stringify(out,null,1));console.log(fails.length?'FAILED: '+fails.length:'ALL OK');process.exit(fails.length?1:0);
})().catch(e=>{console.error(e);process.exit(2);});
