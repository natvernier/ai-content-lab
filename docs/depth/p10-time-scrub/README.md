# Time scrub

Scroll, or drag the thin time line, and a pear goes from whole to halved to poached to fanned out on a tart.

**P10 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p10-time-scrub/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/time-scrub)

That is why the thing that changes is a pear. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Scroll, drag the time line, or use the arrow keys on it |
| Illusion | Object constancy, light |
| Built with | One canvas and a range input, about 130 lines of plain JavaScript |
| Effort | Medium per dish |
| Wow | 2 of 3 |
| State | Graybox: drawn shapes stand in for three to five painted frames per dish |

## What just happened
This is the same pear all the way through. It splits, darkens in the syrup, and its halves become the slices fanned on top of the tart. Because nothing is swapped for a new picture, you can follow one object through time.

The time line under the picture is a real control. Drag it, or tab to it and use the arrow keys to step from one stage to the next. Moving it scrolls the page, so the scroll position and the time line never disagree.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are a pear on its way into a tart. The patterns themselves are general: any process with a few clear stages works, a building going up, a product being assembled, a day passing from morning light to night.

### The illusion
Object constancy: the pear never disappears and reappears, it changes. Your eye stays on it the whole time, and that continuity is what makes a few drawings feel like time passing.

### The rules it follows

- A visible time line that also works with the arrow keys.
- Scroll and the time line are the same thing: moving one moves the other.
- Every stage has a name, and the current one is always marked.
- Scroll stays 1:1 and runs backwards.
- In a real build each stage is a painted frame, kept consistent with image edits.

### Calm mode
Calm mode keeps the stages but drops the in-between motion. Each stage crossfades into the next instead of moving. If your device asks for reduced motion, the page starts calm.

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
