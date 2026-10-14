# Focus and fan

Ingredients lie on the table. Pick one and the view dives onto it while its recipes fan out around it like a hand of cards.

**P2 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/focus-and-fan)

That is why the things on the table are ingredients. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Click or tap one ingredient, Esc or Back to step out |
| Illusion | Focus and depth of field, shadow separation, inertia |
| Built with | Plain HTML buttons and CSS transforms, about 120 lines of JavaScript |
| Effort | Medium |
| Wow | 2–3 of 3 |
| State | Graybox: gray circles stand in for the painted ingredient cut-outs |

## What just happened
Nothing jumped. The ingredient you picked travelled to the centre, everything else blurred, paled and drifted outwards, and the recipes came out of it in an arc. The step back works the same way in reverse, with the button, the Esc key or the browser back button.

The fan is a list in disguise. Tab through it and the cards come in reading order, each one a real button with a real name. Hover or focus lifts a card, and its shadow drifts away from it, the way a card leaves a table.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are pumpkins, pears and chestnuts. The patterns themselves are general: any set of things with children works, a shelf of topics and their articles, a team and its projects.

### The illusion
Depth of field: only the plane you chose stays sharp, so the eye reads everything blurred as further away. Shadow separation: when something lifts, its shadow drifts, grows and softens. A small overshoot when the cards land gives them weight.

### The rules it follows

- One gesture, one meaning: a click on an ingredient always means look closer.
- There is always a way back: a labelled button, Esc and the browser back button.
- Every place has its own address. The URL ends in the ingredient, so a shared link opens the same fan.
- The fan keeps keyboard order and readable names.
- Motion lasts under half a second and is never needed to read anything.

### Calm mode
Calm mode keeps the focus but drops the travel. The other ingredients fade, the cards appear in place, nothing flies. If your device asks for reduced motion, the page starts calm.

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
