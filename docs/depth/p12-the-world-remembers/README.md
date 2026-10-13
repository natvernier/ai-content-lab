# The world remembers

Wherever you go, a faint trail stays behind. Come back a week later and the page starts where you left it.

**P12 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p12-the-world-remembers/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/the-world-remembers)

That is why the places on the map are ingredients. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | None. It happens across visits. Here you can visit places and fast-forward a week |
| Illusion | Memory: a world that changes because you were there |
| Built with | Local storage, one canvas and about 110 lines of plain JavaScript |
| Effort | Small |
| Wow | 1–2 of 3 |
| State | Graybox: a soft gray line stands in for a watercolour trail |

## What just happened
Each place you open leaves a faint mark, and the marks join into a trail. Close the page and come back, or press the button that skips a week, and the page greets you where you left off. Every place you visited also hangs as a small badge in your sky.

This is the quietest pattern of the fifteen. It is not spectacular, it is personal: the space feels deep because it holds your own history.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are lemons, pears, pumpkins and chestnuts. The patterns themselves are general: anything people return to works, a course, a long read, a documentation site, a shop.

### The illusion
Memory: a place that changes because you were there feels more real than one that resets every time. The trail is a second layer of depth, made of time instead of space.

### The rules it follows

- Stored only on this device, never sent anywhere.
- A visible forget button removes everything at once.
- The greeting offers both ways: continue where you were, or start fresh.
- Nothing depends on it. Without a trail the page simply starts at the beginning.
- The trail is decoration and never covers a word.

### Calm mode
Calm mode draws the trail at once instead of letting it grow. If your device asks for reduced motion, the page starts calm.

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
