# Ahead of Thyme · /world

The spatial "parallel universe" of [A Hat of Thyme](https://www.ahatofthyme.com), Nathalie Vernier's recipe library: one page, `/world`, where the ingredients float in space, each ingredient opens an endless row of its recipes, and each recipe opens as a page. The main site stays exactly as it is; `/world` only reads from it.

Design: Figma, signed off by Nathalie on 15 Nov 2026 (AoT · Cosmos · hi-fi, v2 + crossmedia frames).

## What runs where

| Piece | Where | What it does |
|---|---|---|
| `dist/aot-world.min.js` | Webflow asset CDN, registered as a hosted script, applied **only to the /world page, footer** | Draws everything inside one Shadow DOM root (`#aot-world`) |
| Hidden CMS lists | On the /world page (Webflow Designer) | The index: ingredients and recipes with a few fields as `data-` attributes |
| Recipe pages | The main site's `/recipe/<slug>` | Read on demand for level 3 (text, photo, pairing, tags); nothing is written |
| WebP copies | Webflow asset folder `aot-world` | The 37 ingredient cut-outs, 1.46 MB instead of 3.1 MB (`build/assets.json`) |

The script must sit in the **page footer**: it runs before the site footer bundle and leaves a hidden `.nd-w` placeholder, so the main site's phone menu does not build itself on `/world`.

## Principles

1. **Lean.** Exactly the signed-off v1; measure on staging, then improve. No framework, no build chain beyond minifying.
2. **Isolation.** One Shadow DOM root; site scripts and site styles cannot reach in. No change to main-site pages, classes, components, site code or CMS (read only).
3. **Fail safe.** A missing part hides only that section; a failed page load shows a calm note with "Try again"; the page never breaks.
4. **Budgets.** Code ≤ 35 KB compressed (v0.1.0: 18.7 KB); first picture on level 1 < 1.5 s on 4G; 60 fps target; a prefetched recipe opens < 0.3 s; idle CPU near zero.
5. **Motion on the compositor.** Only `transform` and `opacity` animate; one loop that sleeps when nothing moves; reads before writes.
6. **Progressive loading.** Nearest pictures first; level 2 loads only what is near the screen; prefetch text, not pictures; nothing extra on Save-Data or 2G.
7. **Parity.** Same content and visibility as the main site: Webflow's empty and conditional markers (`w-dyn-bind-empty`, `w-condition-invisible`, `w-dyn-empty`) and the state rules (Next up / Planned hide dashboard, method, playlist, stamp, dish photo; the note is "The plan").
8. **Accessible.** The list view is an equal alternative; keyboard; reduced motion starts in the list; no button inside a button.
9. **Reversible.** Each version is a separate file on the CDN; rollback = apply the previous version on the page.
10. **Private.** No tracking, no cookies; reads `lt-theme` and `html.theme-night` from the main site, writes `lt-theme` only when the lamp is clicked (as the main site does).

## The /world page in Webflow (contract)

```html
<div id="aot-world"></div>                       <!-- host; the script draws into its shadow root -->
<div class="aot-data" style="display:none">       <!-- hidden index -->
  <!-- Ingredients collection list, all items -->
  <div data-aot-ing data-s="{slug}" data-n="{name}" data-k="{kind}" data-t="{intro}" data-i="{card cut-out URL}"></div>
  <!-- Recipes collection lists: filter "Main ingredient · auto" is set, sorted by name, limit 100,
       start at 1 / 101 / 201 / 301 / 401 (add a sixth list beyond 500 recipes) -->
  <div data-aot-rec data-s="{slug}" data-n="{name}" data-mi="{main ingredient · auto}" data-c="{ingredient count}"
       data-d="{dish cut-out URL}" data-p="{place caption}" data-kp="{kcal per portion}" data-cb="{pairing image (dish + Pip)}"></div>
</div>
```

Webflow cannot bind image fields to attributes, so the three images come as hidden `<img data-aot-i>` (ingredient card cut-out), `<img data-aot-d>` (dish cut-out) and `<img data-aot-cb>` (dish + Pip) inside the item: lazy and never loaded while the wrapper is hidden; empty ones (`w-dyn-bind-empty`, placeholder) are ignored. The recipe lists have no filter: recipes without a main ingredient are skipped by the script. Page settings: `noindex`, excluded from the sitemap.

Addresses: `/world#world`, `/world#list`, `/world#<ingredient>`, `/world#<ingredient>-list`, `/world#recipe/<slug>`; `?view=list` opens a recipe (or a missing place) in the List view.

## Recipe reader (selectors of the main recipe template, read 15 Nov 2026)

| Part | Selector |
|---|---|
| State | `.glass-sheet[data-state]` |
| Kicker, title | `.kicker`, `h1.recipe-title` |
| Source | first filled child of `.source-line` |
| Memory, playlist | `.memory-headline`, `.rt-memory`, `.playlist-intro`, `a.playlist[href]`, `.playlist-name` |
| Dashboard | `.dashboard .gauge` (time, serves, kcal per 100 g) |
| Ingredients, oven, note | `.ingredients-col .rt-ingredients`, `.ingredients-col .oven-note`, `.ingredients-col .rt-note` |
| Photo / illustration, Pip | `.print-large img.dish-photo` / `img.illu-photo`, `img.mascot-top` |
| Image credit, stamp | `.illu-caption`, `.status-stamp` |
| Pairing | `.pairing-item` → `.rt-body`, `a.pc-card[data-pc-card][href^="/recipe/"]` |
| Method | `.method .rt-method` |
| Hashtags | `.tags .chip` |

From the index instead of the page (not shown on the main recipe page or cheaper there): place caption, kcal per portion, ingredient count, dish cut-out, dish + Pip image.

## Build, test, release

```sh
python3 build/build.py 0.1.0                      # dist/aot-world.js + .min.js, prints sizes
python3 test/make_mock.py recipes.json cms_rest.json site_code_pages.json   # local stand-in from a read-only CMS export (not in the repo)
python3 -m http.server 8790 -d test/mock & node test/smoke.js              # 68 checks, incl. the main site's real site-wide code
```

Current release (21 Nov 2026): v0.1.8, `https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6b021514b5fe8f7c747c5219_aot-world-0.1.8.js`, registered script `aotworld` 0.1.8 (SRI sha384), on the World page (`/world`), footer; published to staging only. Previous: v0.1.7 (asset 6afba3490297774b771309f2).

v0.1.8 (Nathalie, 21 Nov): in List mode the recipe opens as one ruled index card (Figma 883:3419 desktop, 888:3351 phone, night 888:3523 / 888:3638; source `src/card.css` + `buildCard()` in `src/world.js`). Card head: "Lemon · 02 of 08", title, the photo (or the illustration) as a tilted polaroid with the AI label; no kicker, place, source or numbers (Nathalie's edit). Ruled body under a limone line, every line 32 px: ingredients to tick off (kept while browsing, not stored), method, pairing (linked recipes as text lines), Note to self in Corinthia. Below: the memory and the image credit, all recipes of the ingredient as a numbered list (this one marked), previous / next. The polaroid border stays paper at night. Switching Cosmos ↔ List on a recipe redraws it in place. Cosmos keeps the open page as before. 68 checks.

v0.1.7 (Nathalie's review, 17 Nov): recipe page of an ingredient with few recipes: "More with …" shows the other recipes once when they fit (no copies, no arrows; endless only when the cards overflow); with two recipes the pager shows only "Next" (Previous would be the same recipe).

v0.1.6 (17 Nov): the World page is the start page (`/`), Classic lives at `/classic` (Nathalie's choice). The script was already path-agnostic; only the fallback link (when the view cannot start) leads to `/classic` when served at `/`. Addresses: `/#world`, `/#list`, `/#<ingredient>`, `/#<ingredient>-list`, `/#recipe/<slug>`, `/?view=list#…`; old `/world…` addresses are forwarded by the Classic switch script.

v0.1.5 (Nathalie's review, 17 Nov): recipe page: while the page text loads, the picture place stays empty (no cut-out first); the picture fades in once loaded, and Pip with his night disc fades in only after it, so the disc never shows alone; Pip half the size (192 px on wide screens, 130 px on phones, where he sits at the picture's left edge).

v0.1.4 (16 Nov): world switch, the corner button chosen by Nathalie (Figma 857:3981): Classic · Cosmos · List in one round button top right, in place of the two-way toggle; it stays on the recipe page too. Same place in the other world, else one level up, else the start (all ingredients → /ingredients, an ingredient → /ingredient/<slug>, a recipe → /recipe/<slug>; on the recipe page Cosmos/List keep the recipe and only change where "back" leads). Button and wordmark sit on the Classic header line (66 px from the top, 58.5 px on tablets, 46 px on phones; 24 / 16 px from the right). The wordmark is a link to the start of its own world (#world or #list). `/world?view=list#…` (from the Classic switch) opens the List view; the parameter is removed after reading. The Classic side: [`../ahot-switch`](../ahot-switch).

v0.1.3 (15 Nov): street lamp (Mary Poppins, Figma 834:1834) instead of the floor lamp; world on touch: first tap shows the label, then the picture or the label opens; lists: one tap on the name or on the preview picture opens (no inline step); More with …: arrows on phones and tablets too.

v0.1.2 (Nathalie's review, 15 Nov): no "served" stamp on recipe photos; no "Filed under" hashtag list (image credit stays); Pip on the recipe page four times bigger (384 px, shrinks on narrower screens, hangs below the picture on phones); list headline and intro stay in place while the list scrolls, more room under the group heads, rows fade out under the logo and above the legal line; phones: roomier lists, legal links visible, the world opens close to one big ingredient (Lemon).

Release: upload `dist/aot-world.min.js` to the Webflow asset folder `aot-world` (`build/wf_s3_upload.py` after `create_asset`), register it as a hosted script with its SRI hash and a new version, apply it to the /world page footer, publish to staging (webflow.io) first.

## Licence

Code: MIT (see the repository licence). Not covered: recipe texts, photographs and illustrations; they stay on ahatofthyme.com and are never stored here.
