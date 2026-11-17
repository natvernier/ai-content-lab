"""Build a local stand-in for Classic pages: the live Site header (classes and sizes read from Webflow on 16 Nov 2026,
lamp 1.2 embed), the main site's site-wide code (freeform head/footer, lthead, ltbundle) and the switch.
Usage: python3 test/make_mock.py <site_code_pages.json> <lamp_embed.html> [new|newcode <head.html> <lthead.js> <ltbundle.js>]
"new" builds test/mock-new: World is the start page (/), Classic start at /classic, with the given site code versions.
The tests serve these files under a staging host and under the live host (Playwright routes), so the live guard is tested too."""
import json, os, sys
ROOT = os.path.dirname(os.path.abspath(__file__)); M = os.path.join(ROOT, 'mock')
site = json.load(open(sys.argv[1])); lamp = open(sys.argv[2], encoding='utf-8').read()
NEW = len(sys.argv) > 3 and sys.argv[3] == 'new'
CODE = len(sys.argv) > 3
HEAD = open(sys.argv[4], encoding='utf-8').read() if CODE else site['siteHeadFreeform']
LTHEAD = open(sys.argv[5], encoding='utf-8').read() if CODE else site['hostedFiles']['lthead-1.0.5.js']
LTBUNDLE = open(sys.argv[6], encoding='utf-8').read() if CODE else site['hostedFiles']['ltbundle-1.3.2.js']
if NEW: M = os.path.join(ROOT, 'mock-new')
HOME = '/classic' if NEW else '/'
WF_CSS = '''
:root{--_colour---ground:#FFF4D5;--_colour---raised:#FFFDF3;--_colour---paper:#FFFDF3;--_colour---ink:#160601;--_colour---ink-muted:#3F2C2D;--_colour---hairline:#E4D5B4;--_colour---edge:#B9A489;
--_colour---glass-fill:rgba(255,253,243,.85);--_colour---glass-edge:rgba(255,255,255,.7);--_colour---limone:#FFE21A;--_colour---focus-ring:#004AAC;--_colour---accent:#004AAC}
html.theme-night{--_colour---ground:#14100C;--_colour---raised:#1E1812;--_colour---paper:#1E1812;--_colour---ink:#F6EEDC;--_colour---ink-muted:#BCAC95;--_colour---hairline:#2C241B;--_colour---edge:#4A4034;
--_colour---glass-fill:rgba(20,16,12,.8);--_colour---glass-edge:rgba(255,255,255,.14);--_colour---limone:#E2BE4A;--_colour---focus-ring:#E2BE4A}
body{margin:0;font-family:Barlow,"Helvetica Neue",Arial,sans-serif;color:var(--_colour---ink);background:var(--_colour---ground)}
.site-header{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:22px;padding:28px 130px;backdrop-filter:blur(18px);background-color:var(--_colour---ground);border-bottom:1px solid var(--_colour---hairline)}
.wordmark{display:flex;margin-right:auto;flex-direction:column;align-items:flex-start;gap:14px;color:var(--_colour---ink);text-decoration:none}
.wordmark-name{font-family:"Libre Bodoni",Georgia,serif;font-size:40px;line-height:50px;font-style:italic;font-weight:400}
.wordmark-sub{font-family:Barlow,Arial,sans-serif;color:var(--_colour---ink-muted);font-size:11px;line-height:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.site-nav{display:flex;gap:18px}
.nav-link{font-size:15px;line-height:20px;font-weight:600;text-decoration:none;color:var(--_colour---ink)}
.theme-switch{display:block;width:24px;height:24px;padding:0;flex:0 0 auto;border-radius:50%;background-image:linear-gradient(90deg,#160601 50%,#FFFDF3 50%);transform:rotate(-20deg);color:var(--_colour---ink);font-size:0;line-height:0;cursor:pointer;border:1.5px solid #160601}
@media (max-width:991px){.site-header{padding:20px 32px}}
@media (max-width:767px){.site-header{padding:16px 20px;flex-wrap:wrap;column-gap:16px;row-gap:12px}.site-nav{width:100%;order:3;gap:16px;overflow-x:auto}.wordmark{gap:10px}.wordmark-name{font-size:30px;line-height:38px}.wordmark-sub{display:block;font-size:10px;line-height:12px;letter-spacing:.16em}}
main{padding:60px 130px}main p{max-width:640px;font-size:18px;line-height:1.6}
@media (max-width:991px){main{padding:40px 32px}}@media (max-width:767px){main{padding:24px 20px}}
'''
HEADER = ('<header class="site-header"><a class="wordmark" href="' + HOME + '"><div class="wordmark-name">A Hat of Thyme</div><div class="wordmark-sub">a personal recipe library</div></a>'
          '<nav class="site-nav"><a class="nav-link" href="' + HOME + '">Home</a><a class="nav-link" href="/recipes">Recipes</a><a class="nav-link" href="/crossword">Crossword</a></nav>'
          '<a class="theme-switch" href="#" data-lamp="1">Theme</a><div class="lt-lamp-embed w-embed">' + lamp + '</div></header>')
# bottom nav (Site footer component markup, ids and classes as on Webflow)
BNAV = ('<div class="site-footer"><nav class="bnav" data-bnav="1"><a class="bnav-tab" data-bnav-tab="start" href="' + HOME + '"><span class="bnav-ic"></span>Start</a>'
        '<a class="bnav-tab" data-bnav-tab="recipes" href="/recipes"><span class="bnav-ic"></span>Recipes</a><a class="bnav-tab" data-bnav-tab="crossword" href="/crossword"><span class="bnav-ic"></span>Crossword</a>'
        '<a class="bnav-tab" data-bnav-tab="more" href="#" aria-controls="bnav-sheet" aria-expanded="false"><span class="bnav-ic"></span>More</a></nav>'
        '<div class="bnav-scrim"></div><div class="bnav-sheet" id="bnav-sheet"><div class="bnav-links"><a class="bnav-row" href="/ingredients">Ingredients</a><a class="bnav-row" href="/about">About</a></div></div></div>')
WORLD_STUB = '<div id="aot-world"></div><p>World stand-in</p>'
PAGES = {'': 'Home', 'ingredient/lemon': 'Lemon', 'recipe/citron-presse': 'Citron pressé', 'impressum': 'Impressum', 'ingredients': 'Ingredients', 'world': 'World'}
if NEW: PAGES = {'classic': 'Classic', 'ingredient/lemon': 'Lemon', 'recipe/citron-presse': 'Citron pressé', 'impressum': 'Impressum', 'ingredients': 'Ingredients', '': 'World', '404': 'Not found'}
for path, title in PAGES.items():
    body = ''.join(f'<p>{title}. Paragraph {i + 1} of the stand-in content, long enough to scroll the page and let the header shrink.</p>' for i in range(30))
    world = (NEW and path == '') or (not NEW and path == 'world')
    inner = WORLD_STUB if world else f'{HEADER}<main><h1>{title}</h1>{body}</main>{BNAV}'
    html = (f'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title} · A Hat of Thyme</title>'
            f'<style>{WF_CSS}</style>{HEAD}<script>{LTHEAD}</script></head><body>{inner}'
            f'{site["siteFooterFreeform"]}<script>{LTBUNDLE}</script><script src="/aot-switch.js"></script></body></html>')
    d = os.path.join(M, path); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html)
print('pages', len(PAGES))
