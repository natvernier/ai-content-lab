# Assembly

The parts of a dish float apart in empty space. Scroll and they come together into the dish. Scroll back and it comes apart again.

**P6 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/assembly)

That is why the parts are meringue, chestnut and cream. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Scroll, as on any page |
| Illusion | Motion parallax, object constancy |
| Built with | Inline SVG parts moved by plain JavaScript, about 80 lines |
| Effort | Large |
| Wow | 3 of 3 |
| State | Graybox: gray shapes stand in for painted ingredient cut-outs |

## What just happened
Five parts were floating in the paper space, each at its own depth and each with its name next to it. Scrolling pulled them in one after the other, base first and the dusting last, until they stacked into a Monte Bianco. Every part kept its identity all the way, nothing was swapped for a finished picture.

The name of the dish and the skip button were there from the start. You never had to sit through the assembly to learn what it was.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are a Monte Bianco and its five parts. The patterns themselves are general: anything with components works, a product and its parts, a team and its roles, an argument and its premises.

### The illusion
Motion parallax: while the parts float, the near ones drift faster than the far ones, so the empty space reads as deep. Object constancy: each part travels to its place instead of appearing there, so you can follow every one of them.

### The rules it follows

- The name of the dish and a skip button are visible from the start.
- Scroll stays 1:1 and runs backwards: scroll up and the dish comes apart.
- Every part keeps a real text label while it travels.
- A progress line says how far the dish is assembled.
- Nothing plays by itself.

### Calm mode
Calm mode drops the travel. The parts appear in their final places one after the other as you scroll, so the dish still builds up, it just does not fly. If your device asks for reduced motion, the page starts calm.

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
