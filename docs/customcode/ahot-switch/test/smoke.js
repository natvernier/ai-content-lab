// Smoke test for the Classic world switch against a local stand-in of the live header and site-wide code.
// The same files are served under a staging host and under the live host, so the live guard is tested as well.
// Run: python3 test/make_mock.py <site_code_pages.json> test/lamp-embed-1.2.html && cp dist/aot-switch.js test/mock/ && node test/smoke.js
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const STAGE='https://ahot-staging.webflow.io',LIVE='https://www.ahatofthyme.com';
/* serves test/mock (today: Classic start at /, World at /world) or test/mock-new (World at /, Classic at /classic); unknown paths get the 404 page, as on Webflow */
const serve=async(ctx,dir='mock')=>{const MOCK=path.join(__dirname,dir);for(const h of [STAGE,LIVE])await ctx.route(h+'/**',r=>{let u=decodeURIComponent(new URL(r.request().url()).pathname);let f=path.join(MOCK,u);
  if(!path.extname(f))f=path.join(f,'index.html');let st=200;if(!fs.existsSync(f)){f=path.join(MOCK,'404','index.html');st=404;if(!fs.existsSync(f))return r.fulfill({status:404,body:'nf'});}
  r.fulfill({status:st,contentType:f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8',body:fs.readFileSync(f)});});
  await ctx.route(/fonts\.(googleapis|gstatic)\.com|cdn\.prod\.website-files\.com/,r=>r.abort());};
const exists=(dir,href)=>{const u=new URL(href,STAGE);const f=path.join(__dirname,dir,decodeURIComponent(u.pathname),'index.html');return fs.existsSync(f);};
(async()=>{
 const b=await chromium.launch();const out={},fails=[];
 const ok=(n,c,d)=>{out[n]=c?'ok':'FAIL '+JSON.stringify(d);if(!c)fails.push(n);};
 const errs=[];
 const geo=p=>p.evaluate(()=>{const h=document.getElementById('aot-switch'),hd=document.querySelector('.site-header'),l=document.querySelector('.lt-lamp'),n=document.querySelector('.site-nav'),wm=document.querySelector('.wordmark');
   const r=e=>{if(!e)return null;const x=e.getBoundingClientRect();return {l:+x.left.toFixed(1),r:+x.right.toFixed(1),t:+x.top.toFixed(1),b:+x.bottom.toFixed(1),w:+x.width.toFixed(1),h:+x.height.toFixed(1)};};
   const R=h&&h.shadowRoot,btn=R&&R.querySelector('.btn'),menu=R&&R.querySelector('.menu');
   return {host:!!h,inHeader:!!(h&&hd&&hd.contains(h)),cls:document.documentElement.classList.contains('aot-sw'),css:!!document.getElementById('aot-switch-css'),vw:innerWidth,
     btn:r(btn),hdr:r(hd),pad:hd?parseFloat(getComputedStyle(hd).paddingTop):0,lamp:r(l),nav:n&&getComputedStyle(n).display!=='none'?r(n):null,wm:r(wm),menu:menu&&!menu.hidden?r(menu):null,
     links:R?[...R.querySelectorAll('a')].map(a=>({w:a.dataset.w,href:a.getAttribute('href'),cur:a.hasAttribute('aria-current'),t:a.textContent})):[],
     exp:btn&&btn.getAttribute('aria-expanded'),bg:btn&&getComputedStyle(btn).backgroundColor,mg:document.querySelector('.theme-switch')?getComputedStyle(document.querySelector('.theme-switch')).marginRight:null};});
 // ---------- live host: the script must do nothing ----------
 const lc=await b.newContext({viewport:{width:1440,height:900}});await serve(lc);const lp=await lc.newPage();lp.on('pageerror',e=>errs.push('live: '+e.message));
 for(const w of [1440,820,390]){await lp.setViewportSize({width:w,height:900});await lp.goto(LIVE+'/ingredient/lemon');await lp.waitForTimeout(500);
   const g=await geo(lp);ok(`live ${w}: nothing added (no button, no style, no class, lamp untouched)`,!g.host&&!g.css&&!g.cls&&g.mg==='0px',g);}
 const liveGeo={};for(const w of [1440,820,390]){await lp.setViewportSize({width:w,height:900});await lp.goto(LIVE+'/');await lp.waitForTimeout(400);liveGeo[w]=await geo(lp);}
 await lc.close();
 // ---------- staging, desktop ----------
 const c=await b.newContext({viewport:{width:1440,height:900}});await serve(c);const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 await p.goto(STAGE+'/');await p.waitForTimeout(500);
 let g=await geo(p);const cy=g=>+(g.btn.t+g.btn.h/2).toFixed(1),hcy=g=>+(g.hdr.t+(g.hdr.h-1)/2).toFixed(1);
 ok('desktop: button inside the header, 44 px, 24 px from the right',g.inHeader&&g.btn.w===44&&Math.round(g.vw-g.btn.r)===24,g);
 ok('desktop: centred on the nav line (66.5 px)',Math.abs(cy(g)-66.5)<=1&&g.nav&&Math.abs(cy(g)-(g.nav.t+g.nav.h/2))<=1,{cy:cy(g),nav:g.nav});
 ok('desktop: header layout unchanged (wordmark, nav, lamp at the same place as live)',JSON.stringify([g.wm,g.nav,g.lamp,g.hdr])===JSON.stringify([liveGeo[1440].wm,liveGeo[1440].nav,liveGeo[1440].lamp,liveGeo[1440].hdr]),{stage:[g.nav,g.lamp],live:[liveGeo[1440].nav,liveGeo[1440].lamp]});
 ok('desktop: lamp keeps clear of the button',g.lamp.r<=g.btn.l-12,{lamp:g.lamp,btn:g.btn});
 ok('home: Classic current, Cosmos and List lead to their starts',g.links.map(l=>l.w+'='+l.href+(l.cur?'*':'')).join()==='classic=/*,cosmos=/world#world,list=/world#list',g.links);
 await p.click('#aot-switch >> .btn');await p.waitForTimeout(150);g=await geo(p);
 ok('menu opens under the button: 8 px gap, 170 px, right-aligned, Classic · Cosmos · List',g.menu&&Math.round(g.menu.t-g.btn.b)===8&&Math.round(g.menu.w)===170&&Math.round(g.menu.r)===Math.round(g.btn.r)&&g.exp==='true'&&g.links.map(l=>l.t).join()==='Classic,Cosmos,List',{menu:g.menu,btn:g.btn});
 await p.keyboard.press('Escape');await p.waitForTimeout(100);g=await geo(p);const esc=!g.menu;
 await p.click('#aot-switch >> .btn');await p.mouse.click(600,500);await p.waitForTimeout(100);g=await geo(p);const outside=!g.menu;
 await p.click('#aot-switch >> .btn');await p.mouse.wheel(0,300);await p.waitForTimeout(400);g=await geo(p);const scrolled=!g.menu;
 ok('menu closes on Escape, a click outside and scrolling',esc&&outside&&scrolled,{esc,outside,scrolled});
 await p.click('#aot-switch >> .btn');await p.click('#aot-switch >> a[data-w="classic"]');await p.waitForTimeout(100);g=await geo(p);
 ok('Classic row just closes the menu (you are here)',!g.menu&&new URL(p.url()).pathname==='/',p.url());
 // header shrinks: the button follows the line
 await p.evaluate(()=>scrollTo(0,800));await p.waitForTimeout(900);g=await geo(p);
 ok('shrunk header: button still centred on the header line, lamp clear',Math.abs(cy(g)-hcy(g))<=1&&g.lamp.r<=g.btn.l-12,{cy:cy(g),hcy:hcy(g),hdr:g.hdr});
 // places
 const at=async u=>{await p.goto(STAGE+u);await p.waitForTimeout(300);return (await geo(p)).links.map(l=>l.w+'='+l.href).join();};
 ok('ingredient → same ingredient in Cosmos and List',await at('/ingredient/lemon')==='classic=/,cosmos=/world#lemon,list=/world#lemon-list');
 ok('recipe → same recipe in Cosmos and List',await at('/recipe/citron-presse')==='classic=/,cosmos=/world#recipe/citron-presse,list=/world?view=list#recipe/citron-presse');
 ok('Classic-only page → starts',await at('/impressum')==='classic=/,cosmos=/world#world,list=/world#list');
 ok('all ingredients → starts (all ingredients)',await at('/ingredients')==='classic=/,cosmos=/world#world,list=/world#list');
 await p.goto(STAGE+'/world');await p.waitForTimeout(300);g=await geo(p);
 ok('/world is left alone (it has its own switch)',!g.host&&!g.css,g);
 // keyboard
 await p.goto(STAGE+'/');await p.waitForTimeout(300);await p.focus('#aot-switch >> .btn');await p.keyboard.press('Enter');await p.waitForTimeout(100);
 await p.keyboard.press('ArrowDown');const kf=await p.evaluate(()=>document.getElementById('aot-switch').shadowRoot.activeElement.dataset.w);
 ok('keyboard: Enter opens on Classic, arrow down moves to Cosmos',kf==='cosmos',kf);
 // night
 await p.keyboard.press('Escape');await p.evaluate(()=>document.documentElement.classList.add('theme-night'));await p.waitForTimeout(100);g=await geo(p);
 ok('night: the button takes the site night glass',g.bg==='rgba(20, 16, 12, 0.8)',g.bg);
 await p.evaluate(()=>document.documentElement.classList.remove('theme-night'));
 await c.close();
 // ---------- tablet and phone ----------
 for(const [w,h,right,line,mob] of [[820,1180,24,58.5,false],[768,1024,24,58.5,false],[390,844,16,46,true],[360,740,16,46,true]]){
   const m=await b.newContext({viewport:{width:w,height:h},isMobile:mob,hasTouch:mob});await serve(m);const q=await m.newPage();q.on('pageerror',e=>errs.push(w+': '+e.message));
   await q.goto(STAGE+'/ingredient/lemon');await q.waitForTimeout(600);const t=await geo(q);
   ok(`${w}: button ${right} px from the right, centred on the ${line} px line`,Math.round(t.vw-t.btn.r)===right&&Math.abs(cy(t)-line)<=1,{cy:cy(t),btn:t.btn});
   ok(`${w}: lamp moved aside, 12 px clear of the button, nothing overlaps`,t.lamp.r<=t.btn.l-12+0.5&&(!t.nav||t.nav.r<=t.lamp.l)&&t.wm.r<=t.lamp.l,{lamp:t.lamp,btn:t.btn,nav:t.nav,wm:t.wm});
   if(mob){await q.tap('#aot-switch >> .btn');await q.waitForTimeout(150);const o=await geo(q);
     ok(`${w}: menu fits on the screen`,o.menu&&o.menu.l>=8&&o.menu.r<=w,o.menu);}
   await m.close();}
 // ---------- new structure: World is the start page (/), Classic start at /classic ----------
 for(const host of [STAGE,LIVE]){
   const n=await b.newContext({viewport:{width:1440,height:900}});await serve(n,'mock-new');const np=await n.newPage();np.on('pageerror',e=>errs.push('new: '+e.message));
   const tag=host===LIVE?'new structure, live host':'new structure, staging';
   await np.goto(host+'/');await np.waitForTimeout(300);let g=await geo(np);
   ok(`${tag}: / is the World, no Classic switch there`,!g.host&&await np.evaluate(()=>!!document.getElementById('aot-world')),g);
   const at2=async u=>{await np.goto(host+u);await np.waitForTimeout(300);const x=await geo(np);return x;};
   g=await at2('/classic');
   ok(`${tag}: Classic start /classic has the switch; Classic row is /classic, Cosmos /#world, List /#list`,g.host&&g.links.map(l=>l.w+'='+l.href).join()==='classic=/classic,cosmos=/#world,list=/#list',g.links);
   g=await at2('/ingredient/lemon');
   ok(`${tag}: ingredient → /#lemon and /#lemon-list`,g.links.map(l=>l.href).join()==='/classic,/#lemon,/#lemon-list',g.links);
   g=await at2('/recipe/citron-presse');
   ok(`${tag}: recipe → /#recipe/… and /?view=list#recipe/…`,g.links.map(l=>l.href).join()==='/classic,/#recipe/citron-presse,/?view=list#recipe/citron-presse',g.links);
   const all=[];for(const u of ['/classic','/ingredient/lemon','/recipe/citron-presse','/impressum','/ingredients']){const x=await at2(u);x.links.forEach(l=>all.push(l.href));}
   const bad=all.filter(h=>!exists('mock-new',h));
   ok(`${tag}: every switch link lands on a page that exists (no 404)`,bad.length===0,{bad,all:[...new Set(all)]});
   await np.goto(host+'/world#lemon');await np.waitForTimeout(600);
   ok(`${tag}: an old /world#lemon address forwards to /#lemon`,new URL(np.url()).pathname==='/'&&new URL(np.url()).hash==='#lemon',np.url());
   await n.close();
 }
 // new structure, phone: bottom bar and phone menu mark Start on /classic and lead there
 {const n=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await serve(n,'mock-new');const np=await n.newPage();np.on('pageerror',e=>errs.push('new phone: '+e.message));
   await np.goto(STAGE+'/classic');await np.waitForTimeout(700);
   const nv=await np.evaluate(()=>{const st=document.querySelector('[data-bnav-tab=start]'),mo=document.querySelector('[data-bnav-tab=more]');const nd=[...document.querySelectorAll('.nd-c')].map(a=>({h:a.getAttribute('href'),cur:a.classList.contains('is-cur'),t:a.textContent.trim()}));
     const css=[...document.querySelectorAll('style')].map(s=>s.textContent).join('');return {start:st&&st.classList.contains('is-active'),startCur:st&&st.getAttribute('aria-current'),startHref:st&&st.getAttribute('href'),more:mo&&mo.classList.contains('is-active'),nd,stampRule:css.indexOf('a .lt-stamp,a .status-stamp.is-teaser{display:none')>=0};});
   const ndStart=nv.nd.find(x=>/Start/.test(x.t));
   ok('new structure, phone: phone menu Start leads to /classic and is marked there',ndStart&&ndStart.h==='/classic'&&ndStart.cur,nv.nd);
   ok('new structure, phone: hidden bottom bar (fallback) also leads to /classic',nv.startHref==='/classic',nv);
   ok('new structure: start-page stamp rule applies on /classic',!nv.stampRule,nv.stampRule);
   await np.goto(STAGE+'/impressum');await np.waitForTimeout(500);
   const nv2=await np.evaluate(()=>[...document.querySelectorAll('.nd-c.is-cur')].map(a=>a.getAttribute('href')));
   ok('new structure, phone: other pages keep their own mark (Impressum: Start not marked)',nv2.indexOf('/classic')<0,nv2);
   await n.close();}
 // today's structure with the new site code: everything as before
 {const n=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await serve(n,'mock');const np=await n.newPage();
   await np.goto(LIVE+'/');await np.waitForTimeout(600);
   const ov=await np.evaluate(()=>{const nd=[...document.querySelectorAll('.nd-c')].map(a=>a.getAttribute('href')+(a.classList.contains('is-cur')?'*':''));return {nd,sw:!!document.getElementById('aot-switch')};});
   ok('today\'s live structure with the new site code: phone menu Start is / and marked, no switch',ov.nd[0]==='/*'&&!ov.sw,ov);
   await n.close();}
 ok('no errors',errs.length===0,errs.slice(0,4));
 await b.close();
 console.log(JSON.stringify(out,null,1));console.log(fails.length?'FAILED: '+fails.length:'ALL OK');process.exit(fails.length?1:0);
})().catch(e=>{console.error(e);process.exit(2);});
