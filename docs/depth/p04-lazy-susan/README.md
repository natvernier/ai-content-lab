# The lazy Susan

A round table turns around you, one season per gesture. The season in front is large and sharp, the others wait small and pale behind it.

**P4 of the [Depth patterns](../) by [Nathalie Vernier](https://www.natvernier.com/)** · [Try it live on natvernier.com](https://www.natvernier.com/depth-patterns/lazy-susan)

That is why the table carries the four seasons. The series comes from [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my recipe library.

| | |
|---|---|
| Gesture | Swipe or drag sideways, scroll sideways on a trackpad, arrow keys or the season labels |
| Illusion | Size, motion parallax, aerial perspective |
| Built with | HTML cards placed on a 3D ring with plain JavaScript |
| Effort | Medium |
| Wow | 2 of 3 |
| State | Graybox: hatched cards stand in for the painted seasons |

## What just happened
Every gesture turns the table by exactly one quarter, no matter how hard you swipe. The season in front becomes large and sharp, the one behind small and pale, and the two at the sides wait half turned. A small overshoot when it stops gives the table weight.

It opened on the current season. In October that is autumn, so autumn faced you before you did anything.

### Where it comes from
Depth patterns started as design work for [A Hat of Thyme](https://www.natvernier.com/projects/a-hat-of-thyme), my personal recipe library. Every pattern was storyboarded for that site first, which is why the examples are the four seasons and what to cook in them. The patterns themselves are general: any small set of equal choices works, four plans, four teams, four chapters. More than six and it stops being a table and starts being a carousel.

### The illusion
Size and aerial perspective: closer is bigger, further is paler. Motion parallax: while the table turns, the front cards move faster than the back ones, so the circle reads as depth.

### The rules it follows

- One gesture, one meaning: sideways always means the next season, never anything else.
- Arrows and season labels for mouse users, arrow keys for the keyboard.
- It opens on the current season.
- A label always says which season faces you and how many there are.
- The vertical scroll is never taken: only a sideways move turns the table.

### Calm mode
Calm mode stops the turning. The next season simply crossfades in front of you. If your device asks for reduced motion, the page starts calm.

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
