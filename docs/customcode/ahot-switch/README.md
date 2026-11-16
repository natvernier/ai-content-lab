# Ahead of Thyme · world switch for the Classic site

The corner button that connects the three worlds of [A Hat of Thyme](https://www.ahatofthyme.com): **Classic** (the main site), **Cosmos** and **List** (both on `/world`, see [`../ahot-world`](../ahot-world)).
Design: Figma component set "AoT · World corner button (C)" (857:3981), chosen by Nathalie on 16 Nov 2026: a round 44 px glass button with the current world's icon, opening a small card with Classic · Cosmos · List. Same place in all three worlds: 24 px from the right (16 px on phones), centred on the line of the Classic header copy.

## Staging only

The script returns at once unless the page is served from `*.webflow.io`. ahatofthyme.com stays exactly as it is, even if the site is published to the live domains (tested: the same page under the live host gets no element, no style, no class).

## What it adds (and nothing else)

| Piece | Where |
|---|---|
| `<div id="aot-switch">` with a Shadow DOM root | appended inside `.site-header`, absolutely positioned, so it follows the header when it shrinks (hdr-min) and does not move anything in the flex row |
| `<style id="aot-switch-css">` | position of that element; on tablets (≤ 991 px) and phones (≤ 767 px) the ceiling lamp anchor gets `margin-right: 48px` / `52px` (only under `html.aot-sw`), so the lamp keeps 12 px clear of the button |
| `html.aot-sw` | marks that the switch is present |

Pages without `.site-header` get the button fixed at the same place. `/world` is skipped (it has its own switch). Colours come from the site variables (`--_colour---*`), so day and night follow `html.theme-night`.

## Where each world leads (same place, else one level up, else the start)

| Classic page | Cosmos | List |
|---|---|---|
| `/ingredient/<slug>` | `/world#<slug>` | `/world#<slug>-list` |
| `/recipe/<slug>` | `/world#recipe/<slug>` | `/world?view=list#recipe/<slug>` |
| any other page (Start, Recipes, /ingredients, tags, sources, Next up, Served, Crossword, About, legal …) | `/world#world` | `/world#list` |

`/world` falls back one level when a place does not exist there (an ingredient without recipes → all ingredients; a recipe without a main ingredient → the start), in the view that was asked for. The Classic row closes the menu (you are there); the Classic logo keeps leading to the Classic start.

## Build, test, release

```sh
python3 build/build.py 1.0.0                     # dist/aot-switch.js + .min.js
python3 test/make_mock.py site_code_pages.json test/lamp-embed-1.2.html   # stand-in of the live header + site-wide code (not in the repo)
cp dist/aot-switch.js test/mock/ && node test/smoke.js                     # 30 checks: live guard, positions on 1440/820/768/390/360, lamp clear, menu, links, keyboard, night
```

Current release (16 Nov 2026): v1.0.0, `https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6afb8d0cef9fcc4615c6ea82_aot-switch-1.0.0.js`, registered script `aotswitch` 1.0.0 (SRI sha384), applied site-wide, footer (after `lthead` 1.0.5 and `ltbundle` 1.3.2, which stay as they were); published to staging only.

Rollback: remove the site script `aotswitch` (`remove_site_script`), publish to staging.
