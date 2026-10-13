# Glass controls

Search, filters and the way out float as a thin layer of glass in front of the painted world. Filters work like lenses: what does not match steps back.

**P14 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p14-glass-controls/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/glass-controls)

That is why the world behind the glass is full of recipes. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | None. It is the control layer: search, filters, list and the way back |
| Illusion | Depth through blur and transparency |
| Built with | CSS backdrop blur and about 70 lines of plain JavaScript |
| Effort | Small |
| Wow | 2 of 3 |
| State | Graybox: gray shapes and hatched cards stand in for the painted world |

## What just happened
Everything you can operate sits on one thin sheet of frosted glass, and everything you look at lies behind it. The glass blurs what passes under it, so you always know which layer is which without a single border.

Filters are lenses, not scissors. Pick a season and what does not match pales and softens but keeps its place, so the world does not reshuffle under your eyes. Only when you ask for matches only does the rest step out of the way.

On a phone the same glass moves to the bottom of the screen, where the thumb is.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are seasons, pumpkins and a library full of recipes. The patterns themselves are general: any interface over rich content works, a map, a photo archive, a dashboard over a chart.

### The illusion
Depth through blur and transparency: frosted glass shows that something is behind it without letting it compete. The control layer reads as the nearest one, and the content as the world beyond.

### The rules it follows

- Glass for controls only. Content never sits on glass.
- Fixed places: the compass is always in the same spot, at the top on a laptop and at the bottom on a phone.
- Enough contrast behind the glass: it is frosted, not clear.
- Filters as lenses: what does not match steps back but stays in place.
- Every control has a word on it, not only an icon.

### Calm mode
Calm mode removes the softening and fading transitions. Filters still work as lenses, they just change at once. If your device asks for reduced motion, the page starts calm.

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
