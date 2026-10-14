# Flight through time

You scroll as usual, but instead of the page moving up, you travel forward: from what was cooked, past now, into what comes next.

**P1 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/flight-through-time)

That is why the things flying past are dishes. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Scroll or swipe, as on any page |
| Illusion | Motion parallax, aerial perspective, size, vection |
| Built with | HTML cards placed in 3D with plain JavaScript, one canvas for the edge particles |
| Effort | Medium |
| Wow | 3 of 3 |
| State | Graybox: the hatched cards stand in for watercolours, the solid ones for photos |

## What just happened
Scrolling still means more, and it still maps 1:1. What changed is the direction: the page became a corridor, and every pixel of scroll moves you a step forward along it. Dishes start small and pale in the distance, grow as you approach and slide past you to the edges.

Behind you lies what was already cooked, the solid cards. Ahead come the next dishes, then the backlog in thinner washes, and at the horizon an open question. The centre of the screen stays still. Only the edges flow, because movement at the edges is what makes you feel you are moving.

The List switch shows exactly the same content flat, for anyone in a hurry.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are dishes, seasons and a backlog. The patterns themselves are general: any timeline works, a project history, a reading list, a product roadmap.

### The illusion
Motion parallax and size: near things are big and move fast, far things are small and slow. Aerial perspective: far things are paler, so the backlog fades into the paper. Vection: the faint particles at the edges make your body read the scroll as travel.

### The rules it follows

- Scroll keeps its meaning, more, and maps 1:1. No hijacked speed, no forced stops.
- The centre stays still. Only the edges move, which keeps motion sickness low.
- A time gauge always says where you are: served, now, next up, backlog.
- A List switch shows the same content flat.
- Every card is real text, readable by search engines and screen readers.

### Calm mode
Calm mode removes the travel. Each part of the timeline appears as a plain row of cards that crossfades into the next as you scroll. If your device asks for reduced motion, the page starts calm.

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
    <div class="stage">
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
