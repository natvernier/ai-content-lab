# Anamorphic arrival

Scattered fragments line up into one picture from exactly one point of view, then come apart into the first teasers.

**P8 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/anamorphic-arrival)

That is why the pieces become a pear. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | The first scroll after arriving |
| Illusion | Anamorphosis, motion parallax |
| Built with | One canvas, about 200 lines of plain JavaScript, no library |
| Effort | Medium |
| Wow | 3 of 3 |
| State | Graybox: the gray squares stand in for painted fragments |

## What just happened
The fragments were never flat. Each one hangs at its own depth. Scrolling turns the camera, and at one angle, and only at that angle, the depths cancel out and the pieces read as a single pear. Keep scrolling and the picture breaks into what the page is actually for: the first three things to look at.

The scroll is never taken from you. One pixel of scroll is one step of the camera, it runs backwards when you scroll back, and nothing plays on a timer.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are pears, tarts and seasons. The patterns themselves are general: swap the pear for your own picture and the teasers for your own first three things.

### The illusion
Anamorphosis: a picture that only exists from one viewpoint. Motion parallax does the rest. Near fragments move more than far ones, so your eye reads the space before it reads the picture.

### The rules it follows

- The title is real text, readable before the first scroll and to screen readers.
- Scroll stays 1:1 and never changes direction.
- A progress line says where you are: scattered, one picture, first teasers.
- You can skip it, and calm mode replaces the camera move with a plain crossfade.
- It is decoration of an arrival, never the only way to reach the content.

### Calm mode
Turn it on with the switch at the top, or let your system decide: if your device asks for reduced motion, the page starts calm. Same picture, same teasers, no travel.

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
