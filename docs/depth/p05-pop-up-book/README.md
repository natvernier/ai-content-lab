# Pop-up book

Each scroll step opens one spread. The cut-outs fold up from the paper and stand, and their shadows grow beneath them.

**P5 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p05-pop-up-book/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/pop-up-book)

That is why the book has a spread for every season. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Scroll, as on any page |
| Illusion | Shadow separation, light through paper |
| Built with | CSS 3D folding and inline SVG cut-outs, about 90 lines of JavaScript |
| Effort | Small to medium |
| Wow | 2 of 3 |
| State | Graybox: flat gray silhouettes stand in for the painted cut-outs |

## What just happened
A spread lies closed. As you scroll, the page opens and the paper cut-outs on it fold up, one after the other, until they stand. The little figure always stands up last. Scroll on and the page turns, the cut-outs fold flat again, and the next season opens.

One spread is one section. The counter below always says which one is open and how many there are, so nothing is hidden behind the motion.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are seasons, pears and a figure in an apron. The patterns themselves are general: any short sequence of sections works, the chapters of a report, the steps of an onboarding, the rooms of a house.

### The illusion
Shadow separation: as a cut-out rises, its shadow drifts away from it, grows and softens, and that alone reads as height. The folding hinge at the bottom of every cut-out keeps the paper honest: it never floats, it stands.

### The rules it follows

- One page is one section, and a counter always shows where you are.
- Scroll stays 1:1 and runs backwards: scroll up and the cut-outs lie down again.
- Nothing is hidden: every word on a spread is real text.
- You can skip the book with one link.
- It is the cleanest fit for painted art: the paintings stay flat, only the paper moves.

### Calm mode
Calm mode shows every spread already open, with the cut-outs standing, and crossfades from one spread to the next as you scroll. If your device asks for reduced motion, the page starts calm.

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
