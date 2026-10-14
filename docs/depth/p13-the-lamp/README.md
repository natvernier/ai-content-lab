# The lamp

Your cursor is a soft lamp over the paper. Move it and the shadows of the cut-outs swing away from the light.

**P13 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/the-lamp)

That is why the cut-outs on the paper are a pear, a bottle and a cup. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Move the cursor, tap or touch and hold on a phone, or the arrow keys |
| Illusion | Light, shadow, light through paper |
| Built with | CSS gradients and drop shadows, about 70 lines of plain JavaScript |
| Effort | Small to medium |
| Wow | 2 of 3 |
| State | Graybox: flat gray silhouettes stand in for the painted cut-outs |

## What just happened
The pool of light follows your hand, and every cut-out casts its shadow away from it. Things that stand higher off the paper throw longer, softer shadows, so the flat sheet gains a few millimetres of height.

Switch the table to night and only the lamp lights it. The paper near the light glows at its edges, the rest falls into the dark. It is pure decoration: every word on the page reads the same with or without it.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are a pear, a bottle, a cup and a leaf. The patterns themselves are general: any layered artwork works, a cut-paper header, product photos on a background, a set of icons.

### The illusion
Light and shadow: a shadow that moves against the light is the oldest depth cue there is. Light through paper: edges that glow towards the lamp make the cut-outs read as thin sheets standing in the light.

### The rules it follows

- Decoration only, never needed to read anything.
- The lamp follows the hand directly, nothing moves by itself.
- On a phone, a tap or a touch and hold places the lamp. The page still scrolls.
- Arrow keys move the lamp for keyboard users.
- Night is the site theme: the switch here turns the whole page dark or light, and the table follows.

### Calm mode
Calm mode stops the lamp from following the cursor. It moves only where you click or tap, and the shadows change without easing. If your device asks for reduced motion, the page starts calm.

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
