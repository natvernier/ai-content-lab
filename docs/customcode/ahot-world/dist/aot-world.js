/* Ahead of Thyme · /world · v0.1.5
   Source: https://github.com/natvernier/ai-content-lab/tree/main/docs/customcode/ahot-world
   Runs only on the /world page of ahatofthyme.com. Reads the main site, never writes to it.
   Everything it draws lives in one Shadow DOM root (#aot-world), so site scripts and styles cannot touch it. */
(function(){
'use strict';
if(window.__aotWorld)return;window.__aotWorld='0.1.5';
const CSS=":host{--ground:#fff4d5;--raised:#fffdf3;--ink:#160601;--muted:#3f2c2d;--hair:#e4d5b4;--edge:#b9a489;--limone:#ffe21a;--on-limone:#160601;--glass:rgba(255,253,243,.86);--glass-edge:rgba(255,255,255,.7);--disc-on:0;--bulb:#fffdf3;--glow:0;--focus:#004aac;--serif:'Libre Bodoni','Bodoni 72',Didot,Georgia,serif;--sans:'Barlow','Helvetica Neue',Arial,sans-serif;--cond:'Barlow Condensed','Arial Narrow',sans-serif;--m:40px;--lamp:112px;} :host([data-theme=\"dark\"]){--ground:#14100c;--raised:#1e1812;--ink:#f6eedc;--muted:#bcac95;--hair:#2c241b;--edge:#4a4034;--limone:#e2be4a;--glass:rgba(20,16,12,.8);--glass-edge:rgba(255,255,255,.14);--disc-on:1;--bulb:#fbe3a0;--glow:1;--focus:#e2be4a;color-scheme:dark} @media (max-width:640px){:host{--m:16px;--lamp:90px}} @media (max-height:500px){:host{--m:16px;--lamp:66px}} [hidden]{display:none!important} .aot{background:var(--ground);color:var(--ink);font-family:var(--sans);font-size:15px;overflow:hidden;transition:background .4s} button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer} :focus-visible{outline:2px solid var(--focus);outline-offset:3px;border-radius:6px} .glass{background:var(--glass);border:1px solid var(--glass-edge);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 6px 24px rgba(22,6,1,.08)} #world{position:fixed;inset:0;overflow:hidden;touch-action:none;cursor:grab} #world.drag{cursor:grabbing} #stage{position:absolute;inset:0} .it{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform,opacity;isolation:isolate;visibility:hidden} .it img{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none;pointer-events:none} .it::before{content:\"\";position:absolute;left:50%;top:50%;width:var(--ds,86%);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:#fff4d5;opacity:var(--disc-on);z-index:-1;transition:opacity .4s} .it.blur img{filter:blur(1.6px)} .it.rowit{display:grid;place-items:center;visibility:visible;--ds:92%} .it.rowit img{width:100%;height:100%;object-fit:contain} .it.rowit{cursor:pointer} .rowit .cap{position:absolute;left:50%;top:calc(100% + 14px);transform:translateX(-50%);width:calc(100% + 40px);max-width:calc(100vw - 32px);text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px} .rowit .cap b{font-weight:600;font-size:19px;line-height:1.2;text-wrap:balance} .rowit .cap b span{box-decoration-break:clone;-webkit-box-decoration-break:clone;transition:box-shadow .2s} .rowit .cap small{font-size:13px;color:var(--muted)} @media (hover:hover){.rowit:hover .cap b span{box-shadow:inset 0 -3px 0 var(--limone)}} @media (max-width:640px){.rowit .cap b{font-size:17px}} .it.txt{font-size:22px;color:var(--muted);white-space:nowrap} .it.txt::before{display:none} .it.txt span::before{content:\"\";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--limone);margin-right:10px;vertical-align:middle} #tag{position:absolute;left:0;top:0;z-index:200000;display:flex;gap:10px;align-items:baseline;padding:10px 16px;border-radius:999px;pointer-events:none;white-space:nowrap;max-width:calc(100vw - 32px)} #tag b{font-weight:600;font-size:17px} #tag small{font-size:13px;color:var(--muted)} @media (max-width:640px){#tag{flex-direction:column;gap:0;border-radius:18px;white-space:normal}} #list{position:fixed;inset:0;overflow-y:auto;overscroll-behavior:contain;padding-left:max(var(--m),env(safe-area-inset-left,0px));padding-right:max(var(--m),env(safe-area-inset-right,0px));padding-block:132px calc(var(--lamp) + 70px)} .lgrid{max-width:1360px;margin:0 auto;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:56px} .lhead h1{font-family:var(--serif);font-weight:400;font-size:clamp(44px,7vw,84px);line-height:.95;margin:0 0 12px;text-wrap:balance} .lhead p{margin:0;color:var(--muted);max-width:44ch;line-height:1.45} .lhead p.intro{font-family:var(--serif);font-style:italic;font-size:16px} .preview{position:sticky;top:132px;display:flex;flex-direction:column;gap:14px;margin-top:28px;min-height:280px} .pv-img{position:relative;width:min(100%,320px);isolation:isolate} .pv-img img{width:100%;height:auto;display:block} .pv-img::before{content:\"\";position:absolute;left:50%;top:50%;width:88%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:#fff4d5;opacity:var(--disc-on);z-index:-1} .pv-cap{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600} .pv-txt{font-family:var(--serif);font-style:italic;color:var(--muted);line-height:1.45;max-width:46ch} .label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted)} .cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 44px} .kind{margin-bottom:22px} .khead{display:flex;justify-content:space-between;padding-bottom:6px;border-bottom:1px solid var(--hair);margin-bottom:4px} .row{display:flex;align-items:baseline;gap:8px;width:100%;min-height:34px;text-align:left} .row .nm{font-family:var(--serif);font-size:20px} .row .ld{flex:1;border-bottom:1px dotted var(--edge);transform:translateY(-5px);min-width:8px} .row .ct{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums} .row.on .nm{box-shadow:inset 0 -3px 0 var(--limone)} .row.zero{opacity:.4} .toc .row{min-height:64px;border-top:1px solid var(--hair);align-items:center;gap:18px} .toc .row:last-child{border-bottom:1px solid var(--hair)} .toc .num{font-family:var(--cond);font-size:20px;color:var(--muted);width:30px} .toc .ttl{flex:1;font-weight:600;font-size:21px;line-height:1.05} .toc .ct{font-family:var(--cond);font-size:20px;font-weight:600} .inline{display:none;padding:10px 0 18px 0} @media (hover:none),(max-width:900px){.row{min-height:44px} .inline.show{display:flex;gap:14px;align-items:flex-start} .inline .pv-img{width:120px;flex:none}} @media (max-width:900px){.lgrid{grid-template-columns:1fr;gap:28px} .preview{display:none}} @media (max-width:640px){.cols{grid-template-columns:1fr} #list{padding-block:118px calc(var(--lamp) + 60px)}} .hud{position:fixed;z-index:300000} .tl{top:calc(var(--m)*.75 + env(safe-area-inset-top,0px));left:max(var(--m),env(safe-area-inset-left,0px));display:flex;flex-direction:column;align-items:flex-start;gap:10px} .wm{font-family:var(--serif);font-style:italic;font-size:26px;line-height:1} .pill{padding:8px 14px;border-radius:999px;font-weight:600;font-size:14px} .lvl b{display:block;font-family:var(--serif);font-weight:400;font-size:30px;line-height:1} .lvl small{color:var(--muted);font-size:13px} .tr{top:calc(var(--m)*.75 - 4px + env(safe-area-inset-top,0px));right:max(var(--m),env(safe-area-inset-right,0px));display:flex;gap:8px} .round{width:48px;height:48px;border-radius:50%;display:grid;place-items:center} .bl{left:calc(max(var(--m),env(safe-area-inset-left,0px)) - 4px);bottom:0;width:calc(var(--lamp)*.64);height:var(--lamp)} .bl svg{width:100%;height:100%;overflow:visible} .br{right:max(var(--m),env(safe-area-inset-right,0px));bottom:calc(var(--m) + env(safe-area-inset-bottom,0px))} .legal{right:calc(max(var(--m),env(safe-area-inset-right,0px)) + 72px);bottom:calc(var(--m) + 14px + env(safe-area-inset-bottom,0px));font-size:12px;color:var(--muted)} .bc{left:50%;transform:translateX(-50%);bottom:calc(var(--m) + 6px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:8px} .seg{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 10px} .seg button{padding:6px 12px;border-radius:999px;border:1px solid var(--edge);font-size:13px} .seg button[aria-pressed=\"true\"]{background:var(--limone);color:var(--on-limone);border-color:var(--limone)} #toast{position:fixed;left:50%;bottom:calc(var(--m) + 64px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:400000;padding:10px 16px;border-radius:12px;font-size:14px;max-width:calc(100vw - 32px);text-align:center} #hint{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(var(--m) + 64px + env(safe-area-inset-bottom,0px));z-index:250000;padding:9px 16px;border-radius:999px;font-size:14px;white-space:nowrap;max-width:calc(100vw - 32px);overflow:hidden;text-overflow:ellipsis;transition:opacity .6s} #hint.gone{opacity:0;pointer-events:none} @media (max-width:640px){#hint{bottom:calc(var(--lamp) + 14px + env(safe-area-inset-bottom,0px));white-space:normal;text-align:center;width:max-content;box-sizing:border-box;border-radius:18px;line-height:1.35}} @media (max-height:500px){#hint{top:calc(var(--m)*.75 + 4px + env(safe-area-inset-top,0px));bottom:auto;max-width:calc(100vw - 420px);white-space:normal;text-align:center;width:max-content;box-sizing:border-box;border-radius:18px;line-height:1.35}} #straight{position:fixed;left:50%;top:calc(var(--m)*.75 + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:300001} #loader{position:fixed;inset:0;display:grid;place-items:center;z-index:500000;background:var(--ground);font-family:var(--serif);font-style:italic;font-size:20px} @media (max-width:640px){.legal{display:none} .wm{font-size:22px}} @media (max-height:500px){.legal{display:none} .lvl b{font-size:22px}} @media (prefers-reduced-motion: reduce){*{transition:none!important}} #recipe{position:fixed;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;background:var(--ground)} .rp{max-width:1360px;margin:0 auto;padding:130px max(var(--m),env(safe-area-inset-right,0px)) 40px max(var(--m),env(safe-area-inset-left,0px))} .rp-hero{display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:24px 80px;align-items:start} .rp-intro{grid-column:1;padding-top:60px} .kick{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;margin:0 0 14px} .rp h1{font-family:var(--serif);font-weight:400;font-size:clamp(40px,5.2vw,64px);line-height:1.02;margin:0 0 16px;max-width:12ch;text-wrap:balance} .place{font-family:var(--serif);font-style:italic;font-size:15px;margin:0 0 8px} .src{font-size:14px;margin:0}.src span{color:var(--muted);margin-right:6px}.src b{font-weight:600} .rp-media{grid-column:2;grid-row:1 / span 2;position:relative;margin:0;width:400px;justify-self:end} .rp-media .main{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:2px;box-shadow:0 10px 30px rgba(22,6,1,.12)} .rp-media .side{position:absolute;isolation:isolate} .rp-media .side img{display:block;width:100%;height:auto} .rp-media .side::before{content:\"\";position:absolute;left:50%;top:50%;width:80%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:#fff4d5;opacity:var(--disc-on);z-index:-1} .rp-media .side.combo{width:290px;left:-190px;bottom:-42px} .rp-media .side.pip{width:96px;left:-34px;bottom:-24px} .rp-media .side.pip::before{width:120%} .dash{grid-column:1;display:flex;flex-wrap:wrap;gap:18px 36px;margin:0;padding:22px 0 0;border-top:1px solid var(--hair);max-width:560px} .dash div{display:flex;flex-direction:column} .dash b{font-family:var(--cond);font-weight:600;font-size:34px;line-height:1}.dash b small{font-family:var(--sans);font-weight:400;font-size:12px;margin-left:3px} .dash span{font-size:12px;color:var(--muted);margin-top:4px} .oven{grid-column:1;font-size:13px;color:var(--muted);margin:-6px 0 0;max-width:560px} .lab{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;padding-bottom:10px;border-bottom:1px solid var(--hair);margin-bottom:6px} .lab span:last-child{color:var(--muted)} .rp-cols{display:grid;grid-template-columns:480px minmax(0,1fr);gap:40px 140px;margin-top:150px} .rp-cols.b{margin-top:110px;align-items:start} .ing-list h6{font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;margin:18px 0 4px;color:var(--ink)} .ing-list ul{list-style:none;margin:0;padding:0} .ing-list li{font-size:15px;padding:12px 0;border-bottom:1px solid var(--hair)} .ing-list strong{font-weight:600} .steps{list-style:none;margin:0;padding:0} .steps li{display:grid;grid-template-columns:60px 1fr;padding:14px 0 12px;font-family:var(--serif);font-size:17px;line-height:1.55} .steps li span{font-family:var(--cond);font-size:16px;font-weight:600;padding-top:3px} .steps em{font-style:italic} .doors{margin-top:40px} .doors .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;margin-top:14px} .door,.plink{display:flex;align-items:center;gap:14px;text-align:left;background:var(--glass);border:1px solid var(--glass-edge);box-shadow:0 6px 24px rgba(22,6,1,.06);border-radius:16px;padding:8px 14px 8px 8px;min-height:76px;transition:box-shadow .2s,transform .2s} .door:hover,.plink:hover{box-shadow:0 8px 28px rgba(22,6,1,.14);transform:translateY(-1px)} .door .cut,.plink .cut{position:relative;flex:none;width:60px;height:60px;display:grid;place-items:center;isolation:isolate} .plink .cut{width:88px;height:88px} .door .cut::before,.plink .cut::before,.mitem .cut::before{content:\"\";position:absolute;inset:4%;border-radius:50%;background:#fff4d5;opacity:var(--disc-on);z-index:-1} .door img,.plink img{max-width:100%;max-height:100%;object-fit:contain} .door b,.plink b{display:block;font-weight:600;font-size:17px;line-height:1.2} .door small,.plink small{display:block;font-size:13px;color:var(--muted);margin-top:3px} .plink .k{font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted)} .note{background:#fffdf3;color:#160601;padding:30px 34px;box-shadow:0 14px 34px rgba(22,6,1,.16);transform:rotate(-7deg);max-width:480px;margin:20px 0 0 -12px} .note h3{font-family:var(--serif);font-style:italic;font-weight:400;font-size:22px;margin:0 0 12px} .note p{margin:0 0 12px;font-size:15px;line-height:1.5}.note strong{font-weight:600} .pair .txt{font-family:var(--serif);font-size:17px;line-height:1.55;margin:16px 0 18px} .pair .txt p{margin:0} .pair .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px} .mem{max-width:720px;margin:120px auto 0} .mem .k{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600} .mem h2{font-family:var(--serif);font-weight:400;font-size:34px;line-height:1.15;margin:12px 0 22px} .mem .body{font-family:var(--serif);font-size:17px;line-height:1.7}.mem .body p{margin:0} .play{display:inline-flex;align-items:center;gap:12px;margin-top:28px;padding:10px 20px 10px 10px;border-radius:999px;background:var(--glass);border:1px solid var(--glass-edge);text-decoration:none;color:inherit} .play i{width:34px;height:34px;border-radius:50%;background:var(--limone);display:grid;place-items:center;font-style:normal;color:var(--on-limone);font-size:12px} .play em{display:block;font-family:var(--serif);font-size:14px}.play small{font-size:12px;color:var(--muted)} .tags{margin-top:110px} .tags .pills{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 18px} .tags .pills span{font-size:13px;padding:7px 12px;border:1px solid var(--edge);border-radius:999px} .credit{font-size:13px;color:var(--muted);margin:0} .more{margin-top:70px;padding-top:24px;border-top:1px solid var(--hair)} .more .head{display:flex;align-items:center;justify-content:space-between;gap:16px} .more .head .k{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600} .more .head .r{display:flex;align-items:center;gap:8px} .more .all{font-size:17px;padding:8px 6px} .more .arr{width:44px;height:44px;border-radius:50%;background:var(--glass);border:1px solid var(--glass-edge);font-size:20px;display:grid;place-items:center} .track{--peek:56px;display:flex;gap:48px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none;margin:22px calc(-1 * max(var(--m),env(safe-area-inset-left,0px)));padding:0 max(var(--m),env(safe-area-inset-left,0px)) 6px calc(max(var(--m),env(safe-area-inset-left,0px)) + var(--peek));scroll-padding-left:calc(max(var(--m),env(safe-area-inset-left,0px)) + var(--peek))} .rpfade{position:fixed;left:0;right:0;z-index:299000;pointer-events:none} .rpfade.t{top:0;height:118px;background:linear-gradient(to bottom,var(--ground) 62%,transparent)} .rpfade.b{bottom:0;height:96px;background:linear-gradient(to top,var(--ground) 45%,transparent)} .aot.is-recipe .legal{display:none} #menu,#search{display:none!important} .track::-webkit-scrollbar{display:none} :host{--ai-fill:rgba(255,253,243,.94)} :host([data-theme=\"dark\"]){--ai-fill:rgba(20,16,12,.92)} .ai{position:absolute;z-index:4;display:inline-block;box-sizing:border-box;padding:3px 7px;border-radius:5px;border:1px solid var(--glass-edge);background:var(--ai-fill);color:var(--ink);font:600 11px/13px var(--sans);letter-spacing:.08em;cursor:pointer;user-select:none;-webkit-user-select:none;transform-origin:0 0;transition:background-color .15s,color .15s,border-color .15s;pointer-events:auto} .ai::after{content:\"\";position:absolute;inset:-9px} .ai:hover,.ai[aria-expanded=\"true\"]{background:var(--ink);color:var(--ground);border-color:var(--ink)} .ai:focus-visible{outline:2px solid var(--focus);outline-offset:2px} .ai.tl{left:10px;top:10px}.ai.tr{right:10px;top:10px}.ai.sm{left:2px;top:2px} .ai.fl{left:14%;top:12%} .ai.below{left:50%;top:calc(100% + 6px);transform:translateX(-50%)} .it .ai{display:none}.it.ail .ai{display:inline-block} #aiCard{position:fixed;left:0;top:0;z-index:10000;box-sizing:border-box;width:264px;max-width:calc(100vw - 16px);padding:12px 14px;border-radius:10px;border:1px solid var(--edge);background:var(--raised);box-shadow:0 14px 30px -14px rgba(40,25,5,.45),0 2px 6px -2px rgba(40,25,5,.12);color:var(--ink);text-align:left;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .16s ease,transform .16s ease,visibility 0s linear .16s} #aiCard.open{opacity:1;visibility:visible;transform:none;transition:opacity .16s ease,transform .16s ease} #aiCard .t{margin:0;font:600 14px/18px var(--sans)} #aiCard .d{margin:4px 0 8px;font:400 13px/1.35 var(--sans);color:var(--muted)} #aiCard a{font:600 13px/16px var(--sans);color:var(--focus);text-decoration:none} #aiCard a:hover{text-decoration:underline;text-underline-offset:3px} @media (prefers-reduced-motion:reduce){.ai,#aiCard,#aiCard.open{transition:none}#aiCard{transform:none}} .mitem{flex:none;width:200px;scroll-snap-align:start;text-align:center} .mitem .cut{position:relative;width:200px;height:200px;display:grid;place-items:center;isolation:isolate} .mitem img{max-width:100%;max-height:100%;object-fit:contain} .mitem b{display:block;font-weight:600;font-size:17px;line-height:1.2;margin-top:12px;padding:0 4px} .mitem small{display:block;font-size:13px;color:var(--muted);margin-top:3px} .mitem b,.mitem small{position:relative;z-index:1} @media (hover:hover){.mitem:hover b span{box-shadow:inset 0 -3px 0 var(--limone)}} .offworld{font-size:14px;color:var(--muted);margin:14px 0 0} .pager{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:20px;margin-top:40px;padding-top:24px;border-top:1px solid var(--hair)} .pager button{font-size:17px;text-align:left;padding:6px 0}.pager button:last-child{text-align:right} .pager button span{color:var(--muted);margin-right:6px}.pager button b{font-weight:600} .pager .pos{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted)} .rp-foot{text-align:center;font-size:13px;color:var(--muted);margin:70px 0 0;padding-bottom:calc(var(--lamp) + 10px)} @media (max-width:1100px){.rp-cols{grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:40px 60px}} @media (max-width:900px){.rp{padding-top:118px} .rp-hero{grid-template-columns:1fr;gap:20px} .rp-intro{padding-top:0} .rp-media{grid-column:1;grid-row:auto;justify-self:start;width:min(100%,420px);margin:10px 0 50px} .rp-media .side.combo{width:66%;left:-4%;bottom:-48px} .rp-media .side.pip{left:-6px} .rp-cols,.rp-cols.b{grid-template-columns:1fr;margin-top:60px;gap:60px} .note{transform:none;margin:0} .doors .grid,.pair .cards{grid-template-columns:1fr} .mem{margin-top:70px} .more .arr{display:none} .mitem{width:150px}.mitem .cut{width:150px;height:150px}.mitem b{font-size:15px} .track{gap:24px;--peek:32px} .pager{grid-template-columns:1fr;gap:8px}.pager .pos{order:-1}.pager button:last-child{text-align:left}} :host{display:block;position:fixed;inset:0;z-index:20} .aot{position:absolute;inset:0} .legal a{color:inherit;text-decoration:none} .legal a:hover{text-decoration:underline;text-underline-offset:3px} .rp-foot a{color:inherit;text-decoration:none} .rp-foot a:hover{text-decoration:underline;text-underline-offset:3px} .mcard{position:relative;flex:none;scroll-snap-align:start} .pcard{position:relative} .ai.pl{left:10px;top:calc(50% - 42px)} .rp-media .stamp{position:absolute;left:50%;top:0;transform:translate(-50%,-50%);z-index:3;padding:6px 14px;border:1.5px solid var(--ink);border-radius:4px;background:var(--raised);font:600 12px/14px var(--sans);letter-spacing:.12em;text-transform:uppercase;white-space:nowrap} .rp.is-loading .rp-cols,.rp.is-loading .tags,.rp.is-loading .mem{opacity:.35} .rp-note{margin:24px 0 0;font-size:14px;color:var(--muted)} .rp-note button{margin-left:8px;text-decoration:underline;text-underline-offset:3px} .rp-media .side.pip{width:clamp(130px,13.35vw,192px);left:clamp(-150px,calc(1060px - 100vw),-20px);bottom:-15px;z-index:2} @media (max-width:900px){.rp-media .side.pip{width:min(130px,28vw);left:0;bottom:-75px}.rp-media:has(.side.pip){margin-bottom:95px}} .khead{margin-bottom:14px} .toc>.label{margin-bottom:20px!important} .lgrid>div:first-child{position:sticky;top:0;align-self:start;z-index:2} @media (min-width:901px){.preview{position:static}} @media (max-width:900px){.lgrid>div:first-child{background:var(--ground);padding-bottom:10px;margin-bottom:-10px;box-shadow:0 -64px 0 var(--ground)} .lgrid>div:first-child::after{content:\"\";position:absolute;left:0;right:0;top:100%;height:22px;background:linear-gradient(var(--ground),transparent);pointer-events:none}} @media (max-height:640px){.lgrid>div:first-child{position:static}.preview{position:sticky;top:0}} @media (max-width:640px){.lgrid{gap:40px} .kind{margin-bottom:30px} .row{min-height:50px;padding:6px 0} .row .nm{font-size:19px;line-height:1.2} .toc .row{min-height:0;padding:16px 0;gap:14px;align-items:flex-start} .toc .num{font-size:17px;width:26px;padding-top:2px} .toc .ttl{font-size:18px;line-height:1.3} .toc .ct{font-size:15px;white-space:nowrap;padding-top:3px} .aot:not(.is-recipe) .legal{display:block;left:50%;right:auto;transform:translateX(-50%);bottom:calc(10px + env(safe-area-inset-bottom,0px));font-size:11px;white-space:nowrap}} @media (max-height:500px){.aot:not(.is-recipe) .legal{display:block;font-size:11px;bottom:calc(8px + env(safe-area-inset-bottom,0px))}} @media (max-width:900px){.more .arr{display:grid;width:40px;height:40px;font-size:18px}} #tag{pointer-events:auto;cursor:pointer} #pv .pv-img{cursor:pointer} .it img{opacity:0;transition:opacity .35s} .it img.on{opacity:1} @media (prefers-reduced-motion:reduce){.it img{transition:none}} :host{--line:66px;--wsw-r:24px} @media (max-width:991px){:host{--line:58.5px}} @media (max-width:767px){:host{--line:46px;--wsw-r:16px}} @media (max-height:500px){:host{--line:34px;--wsw-r:16px}} .tl{top:calc(var(--line) - 13px + env(safe-area-inset-top,0px))} @media (max-width:640px){.tl{top:calc(var(--line) - 11px + env(safe-area-inset-top,0px))}} .tr{top:calc(var(--line) - 22px + env(safe-area-inset-top,0px));right:max(var(--wsw-r),env(safe-area-inset-right,0px))} #straight{top:calc(var(--line) - 17px + env(safe-area-inset-top,0px))} a.wm{color:inherit;text-decoration:none;border-radius:4px} .wsw{position:relative} .wsw-btn{width:44px;height:44px;box-sizing:border-box;border-radius:50%;display:grid;place-items:center;color:var(--ink);background:var(--glass);border:1px solid var(--glass-edge);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 6px 16px -8px rgba(22,6,1,.18)} .wsw-btn svg{display:block;width:22px;height:22px} .wsw-menu{position:absolute;right:0;top:52px;width:170px;box-sizing:border-box;padding:6px;display:flex;flex-direction:column;gap:2px;background:var(--raised);border:1px solid var(--hair);border-radius:14px;box-shadow:0 14px 30px -14px rgba(22,6,1,.25)} .wsw-menu[hidden]{display:none} .wsw-menu a{display:flex;align-items:center;gap:10px;height:38px;box-sizing:border-box;padding:9px 14px 9px 10px;border-radius:10px;color:var(--ink);text-decoration:none;font-family:var(--sans);font-weight:600;font-size:14px;line-height:18px;letter-spacing:.02em} .wsw-menu a svg{display:block;flex:none;width:20px;height:20px;color:var(--muted)} .wsw-menu a[aria-current]{background:var(--limone);color:var(--on-limone)} .wsw-menu a[aria-current] svg{color:var(--on-limone)} @media (hover:hover){.wsw-menu a:not([aria-current]):hover{background:var(--hair)}} .wsw-menu a:focus-visible{outline-offset:-2px} .rp-media .main,.rp-media .side{opacity:0;visibility:hidden;transition:opacity .35s ease,visibility 0s linear .35s} .rp-media .main.ok,.rp-media .side.ok{opacity:1;visibility:visible;transition:opacity .35s ease} .rp-media .main.ph{display:block;width:100%;aspect-ratio:4/5;box-shadow:none}",HTML="<div id=\"loader\">Loading the illustrations …</div><div id=\"world\" aria-label=\"Ingredients in space. Scroll to fly forward or back, drag to slide sideways; the arrow keys work too.\"><div id=\"stage\"></div><div id=\"tag\" class=\"glass\" hidden><b></b><small></small></div></div><div id=\"list\" hidden></div><div id=\"recipe\" hidden></div><div class=\"rpfade t\" hidden></div><div class=\"rpfade b\" hidden></div><div id=\"hint\" class=\"glass\" aria-hidden=\"true\"></div><button id=\"straight\" class=\"pill glass\" hidden>Straight ahead</button><div class=\"hud tl\"><a class=\"wm\" id=\"wm\" href=\"#world\">A Hat of Thyme</a><button id=\"back\" class=\"pill glass\" hidden>← Ingredients</button><div id=\"lvl\" class=\"lvl\" hidden><b></b><small></small></div></div><div class=\"hud tr\"><!-- World switch: corner button with menu (Figma 857:3981, chosen 16 Nov). Same place in Classic, Cosmos and List. --><div class=\"wsw\" id=\"wsw\"><button class=\"wsw-btn\" id=\"wswBtn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"wswMenu\" title=\"Switch world\"><span id=\"wswIc\" aria-hidden=\"true\"></span></button><nav class=\"wsw-menu\" id=\"wswMenu\" aria-label=\"Worlds\" hidden><a id=\"wswClassic\" data-w=\"classic\" href=\"/ingredients\"></a><a id=\"wswCosmos\" data-w=\"cosmos\" href=\"#world\"></a><a id=\"wswList\" data-w=\"list\" href=\"#list\"></a></nav></div><button class=\"round glass\" id=\"menu\" aria-label=\"Menu\"><svg width=\"16\" height=\"12\" viewBox=\"0 0 16 12\" fill=\"currentColor\" aria-hidden=\"true\"><rect y=\"0\" width=\"16\" height=\"2\" rx=\"1\"/><rect y=\"5\" width=\"16\" height=\"2\" rx=\"1\"/><rect y=\"10\" width=\"16\" height=\"2\" rx=\"1\"/></svg></button></div><button class=\"hud bl\" id=\"lamp\" aria-label=\"Light on or off\"><!-- Street lamp (Mary Poppins), Figma \"AoT · Street lamp\" 834:1834, signed off 15 Nov --><svg viewBox=\"0 0 90 140\" aria-hidden=\"true\"><defs><radialGradient id=\"g\"><stop offset=\"0\" stop-color=\"#fbe3a0\" stop-opacity=\".9\"/><stop offset=\"1\" stop-color=\"#fbe3a0\" stop-opacity=\"0\"/></radialGradient></defs><ellipse cx=\"38\" cy=\"137\" rx=\"38\" ry=\"5\" fill=\"url(#g)\" style=\"opacity:var(--glow);transition:opacity .4s\"/><circle cx=\"60\" cy=\"110\" r=\"33\" fill=\"url(#g)\" style=\"opacity:calc(var(--glow)*.55);transition:opacity .4s\"/><circle cx=\"30\" cy=\"34\" r=\"29\" fill=\"url(#g)\" style=\"opacity:var(--glow);transition:opacity .4s\"/><g fill=\"currentColor\"><path d=\"M22 140H38L36 131H24Z\"/><rect x=\"23\" y=\"128.5\" width=\"14\" height=\"2.5\" rx=\".6\"/><path d=\"M26 128.5C26 124 27.4 121 28 118H32C32.6 121 34 124 34 128.5Z\"/><path d=\"M28 118H32L31.2 56H28.8Z\"/><rect x=\"27.2\" y=\"96\" width=\"5.6\" height=\"2\" rx=\".6\"/><rect x=\"27.6\" y=\"70\" width=\"4.8\" height=\"1.6\" rx=\".6\"/><rect x=\"27.4\" y=\"53.6\" width=\"5.2\" height=\"2.6\" rx=\".6\"/><rect x=\"15\" y=\"51.2\" width=\"30\" height=\"1.6\" rx=\".8\"/><circle cx=\"15\" cy=\"52\" r=\"2\"/><circle cx=\"45\" cy=\"52\" r=\"2\"/><path d=\"M27 51H33L34.5 46H25.5Z\"/><rect x=\"23.5\" y=\"44\" width=\"13\" height=\"2\" rx=\".6\"/></g><path d=\"M25 44H35L39.5 25H20.5Z\" fill=\"var(--bulb)\" stroke=\"currentColor\" stroke-width=\"1.25\" stroke-linejoin=\"round\"/><path d=\"M30 41C27.6 38.2 28.4 34.6 30 31.6C31.6 34.6 32.4 38.2 30 41Z\" fill=\"var(--limone)\" style=\"opacity:var(--glow);transition:opacity .4s\"/><path d=\"M28.3 44L26.8 25M31.7 44L33.2 25\" fill=\"none\" stroke=\"currentColor\" stroke-width=\".9\" stroke-linecap=\"round\"/><g fill=\"currentColor\"><rect x=\"18.5\" y=\"22.5\" width=\"23\" height=\"2.5\" rx=\".6\"/><path d=\"M19.5 22.5C24.5 21.5 27.5 17 30 12C32.5 17 35.5 21.5 40.5 22.5Z\"/><circle cx=\"30\" cy=\"10.2\" r=\"1.9\"/><rect x=\"29.4\" y=\"4\" width=\"1.2\" height=\"5\" rx=\".6\"/></g><image href=\"{{PIP_LAMP}}\" x=\"46\" y=\"82\" width=\"28\" height=\"55\"/></svg></button><div class=\"hud legal\"><a href=\"/impressum\">Impressum</a> · <a href=\"/privacy\">Privacy</a> · <a href=\"/how-i-use-ai\">How I use AI</a></div><button class=\"hud br round glass\" id=\"search\" aria-label=\"Search\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><circle cx=\"8.5\" cy=\"8.5\" r=\"6\"/><path d=\"M13 13l5 5\" stroke-linecap=\"round\"/></svg></button><div id=\"aiCard\" role=\"dialog\" aria-modal=\"false\" aria-labelledby=\"aiCardT\"><p class=\"t\" id=\"aiCardT\"></p><p class=\"d\"></p><a target=\"_blank\" rel=\"noopener\"></a></div><div id=\"toast\" class=\"glass\" hidden role=\"status\"></div>",WEBP={"6af0646ebaf5a4c9cac8689c": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97e4bc3d7b8cc7ca271_6af0646ebaf5a4c9cac8689c_potato.webp", "w": 464, "h": 508}, "6af0646ebaf5a4c9cac86893": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97fb7328336612140e6_6af0646ebaf5a4c9cac86893_rice.webp", "w": 464, "h": 508}, "6af05d5bad34c8b5a303ba18": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97fb732833661214113_6af05d5bad34c8b5a303ba18_artichoke.webp", "w": 464, "h": 508}, "6af05d5bad34c8b5a303b9ef": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97f3be594877597a98f_6af05d5bad34c8b5a303b9ef_tomato.webp", "w": 464, "h": 508}, "6aefa204e4e365276807c41d": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97fa95502ba31e6ffca_6aefa204e4e365276807c41d_poultry.webp", "w": 464, "h": 508}, "6aefa203aeef0714dbd30f9c": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97ffb507f9678202498_6aefa203aeef0714dbd30f9c_pear.webp", "w": 464, "h": 508}, "6aefa202e4e365276807c31d": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f97fb73283366121415f_6aefa202e4e365276807c31d_cherry.webp", "w": 464, "h": 508}, "6aefa20137b8a1b48337834d": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98085279ad5ccec5fd3_6aefa20137b8a1b48337834d_lime.webp", "w": 464, "h": 508}, "6af06f1dc9e95dfb70073397": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f981fb507f96782025ef_6af06f1dc9e95dfb70073397_garden-vegetables.webp", "w": 464, "h": 508}, "6aefa2042f6e637080d9e899": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f981e266fff34cb6d146_6aefa2042f6e637080d9e899_egg.webp", "w": 464, "h": 508}, "6ae7a1167e6c6546018f44e8": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f981f4cd507ac245ba52_6ae7a1167e6c6546018f44e8_beans-lentils-and-tofu.webp", "w": 464, "h": 508}, "6ae7a1167e6c6546018f44df": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9812e25964c62f2a9a4_6ae7a1167e6c6546018f44df_chilli.webp", "w": 464, "h": 508}, "6ae7a1167e6c6546018f44ee": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98485279ad5ccec6074_6ae7a1167e6c6546018f44ee_spices.webp", "w": 464, "h": 508}, "6af05d5c89500e2a98e71fb0": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98585279ad5ccec6093_6af05d5c89500e2a98e71fb0_flour.webp", "w": 464, "h": 508}, "6ae7a1167e6c6546018f44eb": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9851bf9aae0706081ec_6ae7a1167e6c6546018f44eb_wine-and-spirits.webp", "w": 464, "h": 508}, "6af0646ebaf5a4c9cac8689f": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98557cc4e346e86177f_6af0646ebaf5a4c9cac8689f_pasta.webp", "w": 464, "h": 508}, "6aefa2054e266a7755601b3f": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98585279ad5ccec60d6_6aefa2054e266a7755601b3f_game-and-meat.webp", "w": 464, "h": 508}, "6ade385527cf9de2fe4b146b": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9850daa057aa1337d2a_6ade385527cf9de2fe4b146b_coffee.webp", "w": 464, "h": 508}, "6ade385527cf9de2fe4b146e": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f985b45fc109ea565a97_6ade385527cf9de2fe4b146e_cheese.webp", "w": 464, "h": 508}, "6ade1a5748ce866d0fd6698f": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98543df4fe7b475e579_6ade1a5748ce866d0fd6698f_ginger.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6c2": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9864bc3d7b8cc7ca520_6adce5cbb6313926f257d6c2_truffle.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6c6": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f986fb507f96782027fa_6adce5cbb6313926f257d6c6_fish.webp", "w": 464, "h": 508}, "6ae7a1167e6c6546018f44f1": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f987e266fff34cb6d2ba_6ae7a1167e6c6546018f44f1_cream.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6c9": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f987fb507f967820281d_6adce5cbb6313926f257d6c9_asparagus.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6d1": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f987e266fff34cb6d2d3_6adce5cbb6313926f257d6d1_prawns.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6e0": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98743df4fe7b475e5d6_6adce5cbb6313926f257d6e0_nuts.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6d9": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9871a4392c3cbbcced2_6adce5cbb6313926f257d6d9_coconut.webp", "w": 464, "h": 508}, "6adce5cbb6313926f257d6dd": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9871e952ac993a34e77_6adce5cbb6313926f257d6dd_berries.webp", "w": 464, "h": 508}, "6adcc8fe495427bd1989bdcb": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f98757cc4e346e861835_6adcc8fe495427bd1989bdcb_basil.webp", "w": 464, "h": 508}, "6adce5ccb6313926f257d6e8": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9871a4392c3cbbccf44_6adce5ccb6313926f257d6e8_chocolate.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7ea5": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f987493d5c0653fa5e91_6ac278df8478b8fb9d8c7ea5_thyme.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7e9f": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9881bf9aae07060843f_6ac278df8478b8fb9d8c7e9f_orange.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7e9c": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f988e266fff34cb6d327_6ac278df8478b8fb9d8c7e9c_chestnut.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7ea2": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f988d4ef89928819ef6d_6ac278df8478b8fb9d8c7ea2_mussels-and-clams.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7eab": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9881e952ac993a34ef7_6ac278df8478b8fb9d8c7eab_pumpkin.webp", "w": 464, "h": 508}, "6ac278df8478b8fb9d8c7ea8": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9887c1ee3f7da016e1e_6ac278df8478b8fb9d8c7ea8_apple.webp", "w": 464, "h": 508}, "6ac278c62768374fac59eca3": {"u": "https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9f9882e25964c62f2ab9d_6ac278c62768374fac59eca3_lemon.webp", "w": 464, "h": 508}},PIP_LAMP="https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6af9fc14859d3e65d88d3b20_aot_pip-lamp.webp";
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
/* image fields cannot be bound to attributes in Webflow: they come as hidden <img data-aot-…> (lazy, never loaded); empty ones carry w-dyn-bind-empty and a placeholder */
function attr(e,k){const v=e.getAttribute('data-'+k);if(v)return v.trim();const im=e.querySelector('img[data-aot-'+k+']');if(!im||im.classList.contains('w-dyn-bind-empty'))return '';const s=im.getAttribute('src')||'';return /\/plugins\/Basic\/assets\/placeholder/.test(s)?'':s;}
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
const S={level:'ing',mode:'world',w:null,r:null,blur:true,seed:(Math.random()*1e9)|0,last:{}};
/* Coming from the Classic world switch: /world?view=list#… opens the List view (v0.1.4). The parameter is read once and removed. */
let viewList=false;try{const u=new URL(location.href);if(u.searchParams.get('view')==='list'){viewList=true;S.mode='sorted';u.searchParams.delete('view');history.replaceState(history.state,'',u.pathname+u.search+u.hash);}}catch(e){}
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
  /* phones: start close to one big ingredient, it is more inviting (Nathalie, 15 Nov) */
  if(innerWidth<=640){const st=items.find(x=>x.d.s==='lemon'&&x.img)||items.filter(x=>x.img).sort((a,b)=>b.d.c-a.d.c)[0];
    if(st){const f=Math.min(innerWidth,innerHeight*1.45)*0.95,sc=innerWidth*0.66/st.w,d=f/sc;st.y=-30;tgt.x=cam.x=st.x;tgt.z=cam.z=st.z+d;ensureImg(st);}}
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
  if(pointers.size===1){downPos={x:e.clientX,y:e.clientY};moved=0;axis=null;ax0=0;ay0=0;rowStart=rowT;const el=e.target.closest('.it');downIt=el?items[+el.dataset.i]:(!rowMode&&e.target.closest('#tag')?(selected||hover):null);world.classList.add('drag');}
  else if(pointers.size===2){const p=[...pointers.values()];pinch0=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}kick();});
world.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId)){if(e.pointerType==='mouse'&&!rowMode){const el=e.target.closest('.it');if(!el&&e.target.closest('#tag'))return;hoverOn(el?items[+el.dataset.i]:null);}return;}
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
    const col=ks=>ks.map(ki=>'<div class="kind"><div class="khead label"><span>'+esc(KINDS[ki].toUpperCase())+'</span><span>'+byKind[ki].length+'</span></div>'+byKind[ki].map(x=>'<button class="row'+(x.c===0?' zero':'')+'" data-s="'+esc(x.s)+'"><span class="nm">'+esc(x.n)+'</span><span class="ld"></span><span class="ct">'+x.c+'</span></button>').join('')+'</div>').join('');
    h='<div class="lgrid"><div><div class="lhead"><h1>Ingredients</h1><p>'+ING.length+' ingredients in six kinds, one per recipe.</p></div><div class="preview" id="pv"></div></div><div><div class="cols"><div>'+col([0,1,2])+'</div><div>'+col([3,4,5])+'</div></div></div></div>';
  }else{
    const w=S.w;
    h='<div class="lgrid"><div><div class="lhead"><h1>'+esc(w.n)+'</h1>'+(w.t?'<p class="intro">'+esc(w.t)+'</p>':'')+'</div><div class="preview" id="pv"></div></div><div class="toc"><div class="label" style="margin-bottom:10px">Contents</div>'+w.rec.map((x,i)=>'<button class="row" data-s="'+esc(x.s)+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><span class="ttl">'+esc(x.n)+'</span><span class="ct">'+(x.i!=null?plural(x.i,'ingredient','ingredients'):'')+'</span></button>').join('')+'</div></div>';
  }
  list.innerHTML=h;list.scrollTop=0;
  const first=S.level==='ing'?(WORLD.slice().sort((a,b)=>b.c-a.c)[0]):S.w.rec[0];preview(first);
}
function info(s){return S.level==='ing'?BYS[s]:REC[s];}
function preview(d){
  if(!d)return;let src=d.img,cap='',txt='';
  if(S.level==='ing'){cap=d.n+' · '+d.k+' · '+plural(d.c,'recipe','recipes');txt=d.t;}
  const pv=R.getElementById('pv');if(pv){pv.innerHTML=src?pvHTML(src,cap,txt):'<div class="pv-cap">'+esc(cap)+'</div>';pv.dataset.s=d.s;}
  list.querySelectorAll('.row').forEach(r=>r.classList.toggle('on',r.dataset.s===d.s));
}
list.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const r=e.target.closest('.row');if(r)preview(info(r.dataset.s));});
list.addEventListener('click',e=>{
  /* one tap opens, on the name or on the picture (Nathalie, 15 Nov) */
  const r=e.target.closest('.row')||(e.target.closest('.pv-img')&&e.target.closest('#pv'));if(!r)return;const d=info(r.dataset.s);if(!d)return;
  if(S.level==='ing'){if(d.c>0)location.hash=d.s+(S.mode==='sorted'?'-list':'');else toast('No recipes with '+d.n+' yet.');}
  else location.hash='recipe/'+d.s;
});

/* ---------- routing ---------- */
function route(){
  aiClose();wswOpen(false);
  const h=decodeURIComponent(location.hash.replace(/^#/,''));
  if(h.startsWith('recipe/')&&REC[h.slice(7)]){showRecipe(REC[h.slice(7)]);return;}
  rp.hidden=true;S.r=null;$('back').textContent='← Ingredients';
  A.classList.remove('is-recipe');R.querySelectorAll('.rpfade').forEach(n=>n.hidden=true);
  let m;
  if(h==='list'){S.level='ing';S.mode='sorted';S.w=null;}
  else if(h==='world'){S.level='ing';S.mode='world';S.w=null;}
  else if((m=/^(.+)-list$/.exec(h))&&BYS[m[1]]&&BYS[m[1]].c){S.level='dish';S.mode='sorted';S.w=BYS[m[1]];}
  else if(BYS[h]&&BYS[h].c){S.level='dish';S.mode='world';S.w=BYS[h];}
  /* unknown address, an ingredient without recipes or a recipe that is not in the world: one level up, i.e. the start, in the view asked for */
  else{S.level='ing';S.mode=(/-list$/.test(h)||viewList||reduced())?'sorted':'world';S.w=null;}
  viewList=false;wswSync();
  $('back').hidden=S.level!=='dish';
  const lv=$('lvl');lv.hidden=!(S.level==='dish'&&S.mode==='world');if(S.w){lv.querySelector('b').textContent=S.w.n;lv.querySelector('small').textContent=plural(S.w.c,'recipe','recipes');}
  world.hidden=S.mode!=='world';list.hidden=S.mode!=='sorted';$('hint').hidden=S.mode!=='world'||interacted;
  /* lists: rows fade out under the logo and above the legal line, as on the recipe page (review 15 Nov) */
  R.querySelectorAll('.rpfade').forEach(n=>n.hidden=S.mode!=='sorted');
  if(S.mode==='world')buildWorld();else buildList();
  if(S.level==='dish'&&S.mode==='world'){const last=S.last[S.w.s];const i=last?S.w.rec.findIndex(d=>d.s===last):-1;if(i>=0){rowT=rowX=i*rowStep();kick();}}
}
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
  S.level='recipe';S.r=r;S.last[r.w.s]=r.s;viewList=false;
  world.hidden=true;list.hidden=true;rp.hidden=false;$('hint').hidden=true;$('lvl').hidden=true;wswSync();
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
  /* while the page text loads, the picture place is kept empty (no cut-out first, then the real picture) */
  const mainImg=loading?'':(x.img||r.img||''),edited=!!x.photo;
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
    '<figure class="rp-media">'+(mainImg?'<img class="main" src="'+esc(mainImg)+'" alt="">'+aiPill(edited?'edited':'generated','tr'):(loading?'<span class="main ph"></span>':''))+side+'</figure><div class="dash">'+dash+'</div>'+(x.oven?'<p class="oven">Oven: '+esc(x.oven)+'</p>':'')+'</header>'+
    '<section class="rp-cols"><div><div class="lab"><span>Ingredients</span><span>'+(r.i!=null?r.i:'')+'</span></div><div class="ing-list">'+(x.ingredients||'')+'</div></div>'+(x.method?'<div><div class="lab"><span>Method</span><span></span></div><ol class="steps">'+steps(x.method)+'</ol></div>':'<div></div>')+'</section>'+
    '<section class="rp-cols b">'+noteH+pairH+'</section>'+memH+
    /* "Filed under" and the hashtag list are not shown in /world (Nathalie, 15 Nov); the image credit stays */
    (x.credit?'<section class="tags"><p class="credit">Image: '+esc(x.credit)+'</p></section>':'')+
    moreH+pagerH+'<p class="rp-foot">2026 © A Hat of Thyme · <a href="/impressum">Impressum</a> · <a href="/privacy">Privacy</a> · <a href="/how-i-use-ai">How I use AI</a></p></article>';
  /* pictures fade in once loaded; Pip and his night disc wait for the main picture, so nothing shows half-built (review 17 Nov) */
  const fig=rp.querySelector('.rp-media');
  if(fig){const m=fig.querySelector('img.main'),sd=fig.querySelector('.side'),si=sd&&sd.querySelector('img');
    const st=im=>!im?'none':im.complete?(im.naturalWidth?'ok':'bad'):'wait';
    const show=()=>{const a=st(m),b=st(si);if(a==='ok')m.classList.add('ok');if(sd&&b==='ok'&&a!=='wait')sd.classList.add('ok');};
    [m,si].forEach(im=>{if(im){im.addEventListener('load',show);im.addEventListener('error',show);}});show();}
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

/* ---------- world switch: Classic · Cosmos · List (corner button, Figma 857:3981, v0.1.4) ----------
   Rule (user flow 851:3694): same place in the other world, else one level up, else its start.
   Cosmos ↔ List keep the place (all ingredients, one ingredient, one recipe). Classic: all ingredients → /ingredients,
   one ingredient → /ingredient/<slug>, one recipe → /recipe/<slug>. The logo leads to the start of its own world. */
const IC={
 classic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.75" y="3.75" width="7" height="7" rx="1.75"/><rect x="13.25" y="3.75" width="7" height="7" rx="1.75"/><rect x="3.75" y="13.25" width="7" height="7" rx="1.75"/><rect x="13.25" y="13.25" width="7" height="7" rx="1.75"/></svg>',
 cosmos:'<svg viewBox="0 0 25 24" fill="none" stroke="currentColor"><path stroke-width="1.25" d="M10.85 7.83C13.91 6.71 16.82 6.13 19.02 6.07C20.13 6.03 21.02 6.14 21.66 6.35C22.31 6.56 22.59 6.85 22.69 7.11C22.78 7.37 22.75 7.77 22.39 8.35C22.04 8.93 21.42 9.58 20.55 10.27C18.83 11.64 16.22 13.05 13.15 14.17C10.09 15.29 7.18 15.88 4.98 15.94C3.87 15.97 2.98 15.86 2.34 15.65C1.69 15.44 1.41 15.15 1.31 14.89C1.22 14.63 1.25 14.23 1.61 13.65C1.96 13.07 2.58 12.42 3.45 11.73C5.17 10.36 7.78 8.95 10.85 7.83Z"/><circle cx="12" cy="11" r="4.75" stroke-width="1.5"/><circle cx="22.78" cy="6.9" r="1.75" fill="currentColor" stroke="none"/></svg>',
 list:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="6.5" r="1.5"/><rect x="8.5" y="5.75" width="12" height="1.5" rx=".75"/><circle cx="5" cy="12" r="1.5"/><rect x="8.5" y="11.25" width="12" height="1.5" rx=".75"/><circle cx="5" cy="17.5" r="1.5"/><rect x="8.5" y="16.75" width="12" height="1.5" rx=".75"/></svg>'};
const WNAME={classic:'Classic',cosmos:'Cosmos',list:'List'};
const wsw=$('wsw'),wswBtn=$('wswBtn'),wswMenu=$('wswMenu'),wswLinks=[...wswMenu.querySelectorAll('a')];
wswLinks.forEach(a=>{a.innerHTML=IC[a.dataset.w]+'<span>'+WNAME[a.dataset.w]+'</span>';});
function wswSync(){
  const cur=S.mode==='sorted'?'list':'cosmos',enc=encodeURIComponent;
  $('wswIc').innerHTML=IC[cur];
  wswBtn.setAttribute('aria-label','World: '+WNAME[cur]+'. Switch world');
  const at=S.level==='recipe'&&S.r?'recipe/'+S.r.s:null;
  $('wswClassic').href=S.level==='recipe'&&S.r?'/recipe/'+enc(S.r.s):S.level==='dish'&&S.w?'/ingredient/'+enc(S.w.s):'/ingredients';
  $('wswCosmos').href='#'+(at||(S.level==='dish'&&S.w?S.w.s:'world'));
  $('wswList').href='#'+(at||(S.level==='dish'&&S.w?S.w.s+'-list':'list'));
  wswLinks.forEach(a=>{if(a.dataset.w===cur)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('wm').href=S.mode==='sorted'?'#list':'#world';
}
function wswOpen(on){
  if(!wswMenu)return;wswMenu.hidden=!on;wswBtn.setAttribute('aria-expanded',String(!!on));
}
wswBtn.addEventListener('click',()=>{const on=wswMenu.hidden;wswOpen(on);if(on){const c=wswMenu.querySelector('[aria-current]')||wswLinks[0];try{if(wswBtn.matches(':focus-visible'))c.focus();}catch(e){}}});
wswMenu.addEventListener('click',e=>{
  const a=e.target.closest('a');if(!a)return;
  /* the recipe page is the same page in Cosmos and List: switching keeps it and only changes where "back" leads */
  if(S.level==='recipe'&&a.dataset.w!=='classic'){e.preventDefault();S.mode=a.dataset.w==='list'?'sorted':'world';wswSync();wswOpen(false);wswBtn.focus();return;}
  wswOpen(false);
});
wsw.addEventListener('keydown',e=>{
  if(wswMenu.hidden)return;
  if(e.key==='Escape'||e.key==='Esc'){e.preventDefault();e.stopPropagation();wswOpen(false);wswBtn.focus();return;}
  if(e.key==='ArrowDown'||e.key==='ArrowUp'||e.key==='Home'||e.key==='End'){
    e.preventDefault();e.stopPropagation();const i=wswLinks.indexOf(R.activeElement),n=wswLinks.length;
    const j=e.key==='Home'?0:e.key==='End'?n-1:e.key==='ArrowDown'?(i+1+n)%n:(i<0?n-1:(i-1+n)%n);wswLinks[j].focus();}
});
wsw.addEventListener('focusout',e=>{const t=e.relatedTarget;if(t&&!wsw.contains(t))wswOpen(false);});
D0.addEventListener('pointerdown',e=>{if(!wswMenu.hidden&&!e.composedPath().includes(wsw))wswOpen(false);},true);

/* ---------- go ---------- */
addEventListener('hashchange',route);
route();
if(/[?&]aot-debug\b/.test(location.search))window.AOT={version:'0.1.5',S,ING,REC,done,cam,tgt,items:()=>items,rowCur};
}
})();
