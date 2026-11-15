"""Build a local stand-in for the Webflow site from a read-only CMS export:
  mock/world/index.html          /world with the hidden index lists (same attributes as on Webflow) + the main site's site-wide code
  mock/recipe/<slug>/index.html  recipe pages with the main recipe template's classes and Webflow's empty/conditional markers
Usage: python3 test/make_mock.py <recipes.json> <cms_rest.json> <site_code_pages.json>
The export files are not part of the repository (they hold the full CMS content)."""
import html, json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
M = os.path.join(ROOT, 'mock')
rec = json.load(open(sys.argv[1]))['items']
rest = json.load(open(sys.argv[2]))
site = json.load(open(sys.argv[3]))
e = lambda s: html.escape(str(s if s is not None else ''), quote=True)

cols = rest['collections']
cols = cols.get('collections', cols) if isinstance(cols, dict) else cols
def fields(cid):
    for c in cols:
        if c.get('id') == cid:
            return c.get('fields', [])
    return []
def options(cid, slug):
    for f in fields(cid):
        if f.get('slug') == slug:
            return {o['id']: o['name'] for o in (f.get('validations') or {}).get('options', [])}
    return {}
STATE = options('6abd7c4e6afd8d358ce37e39', 'state') or {'e0c798a36820573ad2c9d8647b3e8c53': 'Served', '06b9abe178479bfdeb0bc2bf1ca3a3f6': 'Backlog', '8d7ffe40b54d036f18d01fb1ce541ec1': 'Next up'}
KIND = options('6abd7c4d6afd8d358ce37d29', 'kind') or {'4a9660d47073542b5e44a9bcb80a3602': 'Fruits', 'dd062bc8928830008bd40699955098d2': 'Vegetables', '90e00ad34d43fceac6543133cb705943': 'Herbs & Spices', 'eb69af9c78ebd1b58c5136afbdd142e2': 'From the sea', 'a0274e8f0e5e7773f66a45c21df14442': 'From Animals', 'f1f626410ff4a62f7d484d4f76cfb67d': 'More'}
TAGS = {t['id']: t['fieldData'].get('name', '') for t in rest['hashtags']}
SRC = {s['id']: s['fieldData'].get('name', '') for s in rest['sources']}
pub = [r for r in rec if not r.get('isDraft') and not r.get('isArchived')]
BYID = {r['id']: r['fieldData']['slug'] for r in pub}
url = lambda v: (v or {}).get('url') if isinstance(v, dict) else None

# Webflow renders bound images as <img>; empty ones get w-dyn-bind-empty and a placeholder
PH='https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg'
def img(k,u):
    return f'<img data-aot-{k}="1" loading="lazy" src="{e(u)}" alt="">' if u else f'<img data-aot-{k}="1" loading="lazy" src="{PH}" alt="" class="w-dyn-bind-empty">'

# /world index (hidden lists, exactly the attributes the Webflow lists will carry)
ing_items = []
for g in rest['ingredients']:
    fd = g['fieldData']
    if g.get('isDraft') or g.get('isArchived'):
        continue
    ing_items.append(f'<div data-aot-ing data-s="{e(fd["slug"])}" data-n="{e(fd["name"])}" data-k="{e(KIND.get(fd.get("kind"), ""))}" '
                     f'data-t="{e(fd.get("intro", ""))}">{img("i", url(fd.get("card-cut-out")))}</div>')
rec_items = []
for r in sorted(pub, key=lambda r: r['fieldData']['name'].lower()):
    fd = r['fieldData']
    rec_items.append(f'<div data-aot-rec data-s="{e(fd["slug"])}" data-n="{e(fd["name"])}" data-mi="{e(fd.get("main-ingredient") or "")}" '
                     f'data-c="{e(fd.get("ingredient-count") if fd.get("ingredient-count") is not None else "")}" '
                     f'data-p="{e(fd.get("place-caption", ""))}" data-kp="{e(fd.get("kcal-per-portion") if fd.get("kcal-per-portion") is not None else "")}" '
                     f'>{img("d", url(fd.get("dish-cut-out")))}{img("cb", url(fd.get("pairing-image")))}</div>')
# five lists of up to 100, as on Webflow
lists = ''.join(f'<div class="aot-list">{"".join(rec_items[i:i + 100])}</div>' for i in range(0, len(rec_items), 100))
hosted = site['hostedFiles']
os.makedirs(os.path.join(M, 'world'), exist_ok=True)
open(os.path.join(M, 'world', 'index.html'), 'w', encoding='utf-8').write(f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>World · A Hat of Thyme</title>
{site["siteHeadFreeform"]}
<script>{hosted["lthead-1.0.5.js"]}</script>
</head><body class="body">
<div id="aot-world"></div>
<div hidden="hidden" aria-hidden="true" data-aot-index="1"><div class="aot-list">{"".join(ing_items)}</div>{lists}</div>
<script src="/aot-world.js"></script>
{site["siteFooterFreeform"]}
<script>{hosted["ltbundle-1.3.2.js"]}</script>
</body></html>''')

# recipe pages with the template's structure
def bind(cls, val, tag='div'):
    return f'<{tag} class="{cls}{"" if val else " w-dyn-bind-empty"}">{e(val) if val else ""}</{tag}>'
def richb(cls, val):
    return f'<div class="{cls} w-richtext{"" if val else " w-dyn-bind-empty"}">{val or ""}</div>'
n = 0
for r in pub:
    fd = r['fieldData']
    slug = fd['slug']
    state = STATE.get(fd.get('state'), '')
    photo, illu, pip = url(fd.get('result-photo')), url(fd.get('illustration')), url(fd.get('mascot-cut-out'))
    tags = ''.join(f'<div role="listitem" class="w-dyn-item"><a class="chip" href="/tag/x"><div>#{e(TAGS.get(t, ""))}</div><div></div></a></div>' for t in (fd.get('hashtags') or []))
    def pair(kind, txt, link):
        s = BYID.get(link) if link else None
        card = f'<a class="pc-card" data-pc-card="{kind}" href="/recipe/{e(s)}"><img class="pc-image" src=""><div class="pc-caption"><div class="pc-name">x</div></div></a>' if s else \
               f'<a class="pc-card w-condition-invisible" data-pc-card="{kind}" href="#"></a>'
        return f'<div class="pairing-item{"" if (txt or s) else " w-condition-invisible"}"><h2 class="section-title">Pairing {kind}</h2><div>{richb("rt-body", txt)}</div>{card}</div>'
    src_name = SRC.get(fd.get('source'), '') if isinstance(fd.get('source'), str) else ''
    page = f'''<!DOCTYPE html><html><head><meta charset="utf-8"><title>{e(fd["name"])}</title></head><body>
<div class="page-wrap"><img class="mascot-top{"" if pip else " w-dyn-bind-empty"}" src="{e(pip or "")}">
<main class="recipe"><div class="caption-row"><a class="caption-pill" href="/recipes"></a></div>
<article class="glass-sheet" data-state="{e(state)}"><section class="story"><div class="story-text">
{bind("kicker", fd.get("kicker"))}<h1 class="recipe-title">{e(fd["name"])}</h1>
{bind("memory-headline", fd.get("memory-headline"), "p")}<div>{richb("rt-memory", fd.get("memory-body"))}</div>
{bind("playlist-intro", fd.get("playlist-intro"))}
<a class="playlist{"" if fd.get("playlist-link") else " w-condition-invisible"}" data-playlist="true" href="{e(fd.get("playlist-link") or "#")}"><div class="record"></div><div class="playlist-text">{bind("playlist-name", fd.get("playlist-name"))}<div class="playlist-meta">Press to play.</div></div></a>
</div></section></article>
<div class="dashboard"><div class="gauge"><div class="gauge-label">{e(fd.get("time-label") or "")}</div><div class="gauge-value"><div class="gauge-num">{e(fd.get("time") or "")}</div><div class="gauge-unit">min</div></div></div>
<div class="gauge"><div class="gauge-label">serves</div><div class="gauge-value"><div class="gauge-num">{e(fd.get("serves") or "")}</div><div class="gauge-unit">people</div></div></div>
<div class="gauge gauge-wide"><div class="gauge-label">energy per 100g</div><div class="gauge-value"><div class="gauge-num">{e(fd.get("kcal-per-100-g") or "")}</div><div class="gauge-unit">kcal</div></div></div></div>
<section class="head"><div class="ingredients-col"><h2 class="section-title">{e(fd.get("ingredient-count") or "")} ingredients</h2>{bind("oven-note", fd.get("oven-note"))}
<div>{richb("rt-ingredients", fd.get("ingredients"))}</div><div class="note-label">Note to self:</div><div class="plan-label">The plan:</div><div>{richb("rt-note", fd.get("note-to-self"))}</div></div>
<div class="dish-col"><div class="print-large"><img class="dish-photo{"" if photo else " w-dyn-bind-empty"}" src="{e(photo or "")}"><img class="illu-photo{"" if illu else " w-dyn-bind-empty"}" src="{e(illu or "")}"></div>
<div class="record-strip">{bind("illu-caption", fd.get("image-credit"))}<div class="source-line"><div>{e(src_name)}</div><div></div><div></div></div></div>{bind("status-stamp", fd.get("status-stamp"))}</div></section>
<section class="pairing">{pair("dish", fd.get("pairing-dish"), fd.get("pairing-dish-link"))}{pair("drink", fd.get("pairing-drink"), fd.get("pairing-drink-link"))}</section>
<section class="method"><div class="ck-head"><h2 class="section-title">Method</h2></div><div>{richb("rt-method", fd.get("method"))}</div></section>
<div class="tags"><div class="w-dyn-list"><div class="tag-list w-dyn-items">{tags}</div></div></div>
</main></div></body></html>'''
    d = os.path.join(M, 'recipe', slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(page)
    n += 1
print(json.dumps({'ingredients': len(ing_items), 'recipes_in_index': len(rec_items), 'recipe_pages': n, 'states': sorted(set(STATE.values())), 'kinds': sorted(set(KIND.values()))}))
