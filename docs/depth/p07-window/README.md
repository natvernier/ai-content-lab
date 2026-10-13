# Window

An ordinary picture becomes a window. Move the mouse or tilt the phone and the scene inside shifts, as if you leaned in to look.

**P7 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p07-window/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/window)

That is why there is a pear tart behind the glass. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Move the mouse over the picture, tilt the phone, or use the arrow keys |
| Illusion | Head-coupled perspective, portal |
| Built with | Four SVG layers and about 90 lines of plain JavaScript |
| Effort | Small to medium |
| Wow | 2–3 of 3 |
| State | Graybox: four flat gray layers stand in for a painted illustration split by depth |

## What just happened
Without movement this is an ordinary picture. Move across it and the layers inside shift by different amounts: the leaf in front a lot, the tart a little, the wall behind hardly at all. Your eye reads that difference as depth, and the frame becomes a window you are looking through.

The figure at the left edge is looking out of the picture. Lean that way and the window widens onto what it is looking at: the next recipe. The same widening is a button, so nobody needs a mouse or a steady hand to get there.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are a pear tart and the Tarte Tatin next to it. The patterns themselves are general: any picture split into a few layers works, a product shot, a portrait with its background, a landscape.

### The illusion
Head-coupled perspective: the scene moves as if your head moved, near layers more than far ones. The portal does the rest: a frame you look through always reads as a space behind it.

### The rules it follows

- Nothing depends on it. Without movement the picture is an ordinary picture.
- The widening has a labelled button and works with the keyboard.
- The movement is small and follows your hand directly, it never runs on its own.
- On phones, tilt only starts after you ask for it.
- It could live on any existing page first, with no other changes.

### Calm mode
Calm mode keeps the layers still. The window still widens onto the next recipe, but it fades open instead of sliding. If your device asks for reduced motion, the page starts calm.

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
