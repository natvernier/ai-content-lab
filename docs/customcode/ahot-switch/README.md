# Ahead of Thyme · world switch for the Classic site

The corner button that connects the three worlds of [A Hat of Thyme](https://www.ahatofthyme.com): **Classic** (the main site), **Cosmos** and **List** (both on `/world`, see [`../ahot-world`](../ahot-world)).
Design: Figma component set "AoT · World corner button (C)" (857:3981), chosen by Nathalie on 16 Nov 2026: a round 44 px glass button with the current world's icon, opening a small card with Classic · Cosmos · List. Same place in all three worlds: 24 px from the right (16 px on phones), centred on the line of the Classic header copy.

## Where it runs

On every Classic page, on staging and live (v1.2.0, 21 Nov 2026). The site was published live with the switch on 17 Nov; since 21 Nov Classic is the start page again (`/`) and the World lives at `/world`. The script reads the structure from the Classic header logo (`/` → World at `/world`; `/classic` → World at `/`), so it works with either. Old addresses of the other structure forward to `/` (`/classic` when Classic is at `/`, `/world` when the World is at `/`).

## What it adds (and nothing else)

| Piece | Where |
|---|---|
| `<div id="aot-switch">` with a Shadow DOM root | appended inside `.site-header`, absolutely positioned, so it follows the header when it shrinks (hdr-min) and does not move anything in the flex row |
| `<style id="aot-switch-css">` | position of that element; on tablets (≤ 991 px) and phones (≤ 767 px) the ceiling lamp anchor gets `margin-right: 48px` / `52px` (only under `html.aot-sw`), so the lamp keeps 12 px clear of the button |
| `html.aot-sw` | marks that the switch is present |

Pages without `.site-header` get the button fixed at the same place. `/world` is skipped (it has its own switch). Colours come from the site variables (`--_colour---*`), so day and night follow `html.theme-night`.

## Where each world leads (same place, else one level up, else the start)

World sits at `/` once Classic has moved to `/classic` (before that at `/world`; written as W below).

| Classic page | Cosmos | List |
|---|---|---|
| `/ingredient/<slug>` | `W#<slug>` | `W#<slug>-list` |
| `/recipe/<slug>` | `W#recipe/<slug>` | `W?view=list#recipe/<slug>` |
| any other page (Classic start, Recipes, /ingredients, tags, sources, Next up, Served, Crossword, About, legal …) | `W#world` | `W#list` |

Old `/world…` addresses forward to the World at `/` (same hash). The Classic row is the Classic start (from the logo) and only closes the menu.

`/world` falls back one level when a place does not exist there (an ingredient without recipes → all ingredients; a recipe without a main ingredient → the start), in the view that was asked for. The Classic row closes the menu (you are there); the Classic logo keeps leading to the Classic start.

## Build, test, release

```sh
python3 build/build.py 1.0.0                     # dist/aot-switch.js + .min.js
python3 test/make_mock.py site_code_pages.json test/lamp-embed-1.2.html   # stand-in of the live header + site-wide code (not in the repo)
python3 test/make_mock.py site_code_pages.json test/lamp-embed-1.2.html new head.html lthead.js ltbundle.js   # test/mock-new: World at /, Classic at /classic
cp dist/aot-switch.js test/mock/ && cp dist/aot-switch.js test/mock-new/ && node test/smoke.js   # 48 checks: live guard, positions, lamp, menu, links, keyboard, night, both structures, no 404 targets
```

Current release (21 Nov 2026): v1.2.0, `https://cdn.prod.website-files.com/6abd72766c3c81fe4fab265c/6b01889cff859a0d724aa3ff_aot-switch-1.2.0.js`, registered script `aotswitch` 1.2.0 (SRI sha384), site-wide footer. 1.2.0: no webflow.io-only guard any more (the switch is part of the live site); `/classic` forwards to `/` when Classic is the start page.

With it (17 Nov): `lthead` 1.0.6 (start-page stamp rule also on /classic) and `ltbundle` 1.3.3 (phone menu Start = Classic start from the logo, marked there; phone tilt on /classic, never on the World page). Both behave exactly as before while the Classic start is still `/`.

Rollback: remove the site script `aotswitch` (`remove_site_script`), publish to staging.
