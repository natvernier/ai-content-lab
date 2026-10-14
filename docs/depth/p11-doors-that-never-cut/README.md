# Doors that never cut

Open a teaser and its picture flies to its place on the recipe while the title glides into the headline. Nothing jumps.

**P11 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/doors-that-never-cut)

That is why the doors open onto recipes. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Any click or tap that opens something, and the back button |
| Illusion | Object constancy |
| Built with | The FLIP technique and the Web Animations API, about 90 lines of plain JavaScript |
| Effort | Small |
| Wow | 2 of 3 |
| State | Graybox: hatched boxes stand in for the dish pictures |

## What just happened
The picture you clicked did not vanish and reappear. It travelled from the teaser to its place at the top of the recipe, and the title slid into the headline on the way. Going back runs the same move in reverse, into the same teaser.

It takes under half a second. That is long enough for the eye to follow and short enough that nobody waits for it. The back button of the browser works too, because every open recipe has its own address.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are three dishes waiting to be cooked next. The patterns themselves are general: every link between a list and its detail benefits, in a shop, a portfolio, an inbox, a search result. It is the cheapest pattern of the fifteen and could go onto any site today.

### The illusion
Object constancy: things do not teleport in the real world, so when a picture travels to its new place, your brain keeps it as the same object. You never have to look for where you are.

### The rules it follows

- Short: under half a second, so it helps orientation and never delays it.
- The back button and Esc return to the same teaser.
- Every open recipe has its own address.
- Without support, or in calm mode, it is an ordinary change of view.
- Focus moves with you: to the headline on the way in, to the teaser on the way out.

### Calm mode
Calm mode replaces the flight with a short crossfade. You still land on the recipe and come back to the teaser you opened. If your device asks for reduced motion, the page starts calm.

## Use it in your own page

No build step, no dependencies, no tracking. You need five files:

| File | What it is |
|---|---|
| [`../kit/depth-kit.css`](../kit/depth-kit.css) | Shared by all patterns: colours, type, stage, calm switch, notes |
| [`../kit/depth-kit.js`](../kit/depth-kit.js) | Shared by all patterns: `NVDKit()`, calm mode, theme colours, scroll progress, canvas helper |
| [`pattern.html`](pattern.html) | The demo markup |
| [`pattern.css`](pattern.css) | The demo styles |
| [`pattern.js`](pattern.js) | The demo script |

```html
<link rel="stylesheet" href="depth-kit.css">
<link rel="stylesheet" href="pattern.css">

<div id="nvd">
  <button class="calm" type="button" aria-pressed="false" id="calm"><span class="knob" aria-hidden="true"></span>Calm mode</button>
  <section class="track" id="track">
    <div class="stage solo split">
      <div class="title"><h1>Your title</h1><p>Your line</p></div>
      <!-- paste pattern.html here -->
    </div>
  </section>
</div>

<script src="depth-kit.js"></script>
<script src="pattern.js"></script>
```

[`index.html`](index.html) is the complete page and the best reference.

**Make it yours.** Swap the gray shapes for your own pictures and words. Colours and type are custom properties on `#nvd`: `--paper`, `--ink`, `--ink-soft`, `--rule`, `--signal`, `--signal-text`, `--card`, `--serif`, `--sans`. Light and dark follow the device, or `data-theme="light|dark"` on `<html>`.

**Keep the calm mode.** It follows `prefers-reduced-motion`, and the reader's choice is remembered in `localStorage` (`depth-calm`).

## Try it on CodePen

The [`codepen/`](codepen/) folder holds the same demo as three panes, kit included: paste `index.html` into HTML, `style.css` into CSS and `script.js` into JS.

## Credit

Depth patterns by Nathalie Vernier, [natvernier.com](https://www.natvernier.com/). Code under the [MIT licence](../LICENSE), texts and pictures under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Fonts: [Newsreader](https://fonts.google.com/specimen/Newsreader) and [Outfit](https://fonts.google.com/specimen/Outfit), SIL Open Font License, loaded from Google Fonts.
