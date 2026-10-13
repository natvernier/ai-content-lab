# Constellation

Every recipe is a star, placed by how close it is to the others. Clusters form by themselves: chestnuts, citrus, warm drinks.

**P9 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live](https://natvernier.github.io/ai-content-lab/depth/p09-constellation/) · [On natvernier.com](https://www.natvernier.com/depth-patterns/constellation)

That is why the stars are recipes. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Drag to move the sky, hover or tap a star, open a cluster, pinch or the plus and minus buttons to zoom |
| Illusion | Depth through brightness and size, parallax between star layers |
| Built with | One canvas, HTML labels, search and list, about 200 lines of plain JavaScript |
| Effort | Medium to large |
| Wow | 3 of 3 |
| State | Graybox: hand-placed positions stand in for positions computed from embeddings |

## What just happened
Each star is a recipe. Recipes that share taste, ingredients and season sit close together, so clusters appear without anyone drawing them. Hover a star and fine lines reach to its nearest neighbours, so you see why it sits where it sits.

Brightness carries meaning: what was already cooked shines, what comes next glows faintly, the backlog is just visible. Drag the sky and the stars move at three different speeds, which is all it takes for a flat sky to look deep.

The map is never the only way in. The search field and the list show the same recipes as plain text.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are recipes grouped by taste and season. The patterns themselves are general: any collection with a notion of similarity works, articles, songs, products, people with skills. In a real build the positions come from embeddings, computed once when a new item is added.

### The illusion
Depth through brightness and size: bright and large reads as near, faint and small as far. Parallax between three star layers turns the flat sky into a volume as soon as it moves.

### The rules it follows

- Search and a list view are always there. The map is an extra, never the only way.
- Every cluster has a readable label, and every label is a button.
- A plain scroll still scrolls the page. Zoom needs a pinch, Ctrl with scroll, or the buttons.
- Brightness has one meaning: how close a recipe is to being cooked.
- Everything is reachable with the keyboard: arrow keys move the sky, Enter steps from star to star.

### Calm mode
Calm mode keeps the sky still. Panning and zooming jump straight to the new view instead of gliding, and the stars stop drifting with the layers. If your device asks for reduced motion, the page starts calm.

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
