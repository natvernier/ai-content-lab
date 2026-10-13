# Semantic zoom

Zoom into a season and find its ingredients, into an ingredient and find its recipes, into a recipe and find the one detail painted precisely.

**P3 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/semantic-zoom)

That is why the zoom goes from autumn to a pear to a tart. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Click to go deeper, pinch or Ctrl and scroll, plus and minus keys, Esc to step out |
| Illusion | Infinite zoom, object constancy |
| Built with | Four HTML layers and the Web Animations API, about 150 lines of JavaScript |
| Effort | Large |
| Wow | 3 of 3 |
| State | Graybox: gray shapes stand in for the illustrations and their painted detail |

## What just happened
Each level lives inside the one before it. The thing you chose grows until it fills the view, and while it grows, the next level appears inside it. Going back reverses the same move, so you always see where you came from.

This is not a magnifying glass. Every level shows different information: a season shows its ingredients, an ingredient its recipes, a recipe its facts, and the deepest level the one area of the picture that was painted with care.

A breadcrumb above the view says how deep you are, and every step of it is a button back.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are autumn, a pear and a pear tart. The patterns themselves are general: any hierarchy works, a portfolio, a body of research, an organisation, a city and its streets.

### The illusion
Infinite zoom: inside every picture is the next one. Object constancy holds it together. The element you pick is never replaced, it grows into the next level, so your eye keeps its place.

### The rules it follows

- Zooming out always works, with the minus button, the minus key, Esc or the breadcrumb.
- A breadcrumb and a depth gauge show the level at all times.
- Pinch and Ctrl with scroll zoom. A plain scroll still scrolls the page.
- Each level is real text, so the words are there for search and screen readers at every depth.
- Every zoomable thing says so in words, not only with an icon.

### Calm mode
Calm mode keeps the levels and the breadcrumb but drops the zoom: one level crossfades into the next. If your device asks for reduced motion, the page starts calm.

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
