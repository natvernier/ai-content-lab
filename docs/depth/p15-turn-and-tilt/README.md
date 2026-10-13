# Turn and tilt

Scroll and the dish turns in space. Move the mouse up or down and it tips towards you or away.

**P15 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p15-turn-and-tilt/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/turn-and-tilt)

That is why the thing that turns is a pear tart. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Scroll to turn, move the mouse up or down to tilt, or use the arrow keys |
| Illusion | Structure from motion, on two axes |
| Built with | One canvas and a range input, about 100 lines of plain JavaScript |
| Effort | Small |
| Wow | 2 of 3 |
| State | Graybox: a drawn tart on a plate stands in for the painted dish |

## What just happened
Scroll and the dish on the table turns in space, one full turn across the length of the scene, so you see the tart from the front, the side and the back before you read a word about it. Nothing else moves: the page stays where it is and the object does the travelling.

Move the mouse up or down and the same object tips towards you or away, by about twenty degrees at most. That is enough to look onto the top of the tart or under its rim, and little enough that it never becomes a 3D viewer you have to steer.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe collection. Every pattern was storyboarded for that site first, which is why the example is a pear tart on a plate. The pattern itself is general: anything with a front and a back works, a product, a book, a device, a building model.

### The illusion
Structure from motion: an object that turns shows its sides one after another, and the eye assembles them into a solid. The small tilt adds a second axis, and that is what separates a turning picture from a thing you could pick up.

### The rules it follows

- Nothing depends on it. Without scroll or mouse the dish is an ordinary picture, seen from the front.
- Scroll turns it, and only scroll: it never spins on its own.
- The tilt stops at about 20 degrees up and 20 down, and eases back when the mouse leaves.
- The arrow keys do both: left and right turn, up and down tilt.
- On phones the turn follows the scroll, and there is no tilt.

### Calm mode
Calm mode keeps the dish still and shows three fixed views side by side instead: front, side, back. If your device asks for reduced motion, the page starts calm.

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
