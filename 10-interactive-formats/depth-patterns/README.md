# Depth patterns

Fifteen ways a flat page can feel deep, on the laptop and phone you already have.

**Live:** https://www.natvernier.com/depth-patterns · **Code:** https://github.com/natvernier/ai-content-lab/tree/main/docs/depth

I built the series while making [A Hat of Thyme](https://natvernier.com/projects/a-hat-of-thyme), my recipe library. That is why the examples are pears, pumpkins and seasons. The patterns themselves work for any content.

## The thesis

Depth is information, not decoration.

What is near and sharp matters now. What is far and pale can wait. Depth tells you where you are without a map.

Research on parallax, scroll-jacking and 3D interfaces is mostly critical. Read closely, it is critical of specific failures: hijacked scrolling, hidden navigation, free 3D for reading, and motion you cannot stop. These patterns are designed around exactly those failures.

## The patterns

Grouped by how the depth reaches you. Effort runs S to L, wow runs 1 to 3.

### Depth you travel through

The page becomes a space, and the scroll moves you through it.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P1 | [Flight through time](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p01-flight-through-time) | Scroll forward instead of down | M · 3 | Live |
| P3 | [Semantic zoom](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p03-semantic-zoom) | Pinch or zoom one level deeper | L · 3 | Live |
| P7 | [Window](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p07-window) | Move the mouse or tilt the phone | S–M · 2–3 | Live |
| P8 | [Anamorphic arrival](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p08-anamorphic-arrival) | The first scroll after arriving | M · 3 | Live |

### Depth you can hold

Things unfold, turn or travel when you touch them. Nothing jumps.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P2 | [Focus and fan](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p02-focus-and-fan) | Tap one thing; its options fan out | M · 2–3 | Live |
| P4 | [The lazy Susan](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p04-lazy-susan) | Swipe sideways, one season per gesture | M · 2 | Live |
| P5 | [Pop-up book](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p05-pop-up-book) | Each scroll step opens one spread | S–M · 2 | Live |
| P6 | [Assembly](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p06-assembly) | Scroll; the parts come together | L · 3 | Live |
| P10 | [Time scrub](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p10-time-scrub) | Drag a time line under a picture | M · 2 | Live |
| P11 | [Doors that never cut](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p11-doors-that-never-cut) | Any click that opens something | S · 2 | Live |
| P15 | [Turn and tilt](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p15-turn-and-tilt) | Scroll to turn, the mouse to tilt | S · 2 | Live |

### Depth you only feel

Quiet layers. Decoration only, never needed to read anything.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P9 | [Constellation](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p09-constellation) | Drag, pinch, hover a star | M–L · 3 | Live |
| P12 | [The world remembers](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p12-the-world-remembers) | None; it happens across visits | S · 1–2 | Live |
| P13 | [The lamp](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p13-the-lamp) | Move the cursor, or touch and hold | S–M · 2 | Live |
| P14 | [Glass controls](https://github.com/natvernier/ai-content-lab/tree/main/docs/depth/p14-glass-controls) | None; it is the control layer | S · 2 | Live |

## Conventions in short

* At most three depths, each drawn differently, not just bigger.
* Closer means more relevant. Text always faces you, flat and sharp.
* One gesture, one meaning, everywhere.
* Fixed places: things do not move when you filter or come back.
* Filters work like lenses. Matches come forward, the rest dims in place.
* Stable centre, still horizon. Objects move, the world does not.
* Painted or gray world, glass controls: only the interface layer is glass.

## How a pattern is built

Each pattern has its own folder under [`docs/depth/`](../../docs/depth/). No build step, no dependencies, no tracking.

```txt
docs/depth/
  kit/depth-kit.css      shared by all fifteen: colours, type, stage, calm switch, notes
  kit/depth-kit.js       shared by all fifteen: calm mode, theme colours, 1:1 scroll progress, canvas helper
  p01-flight-through-time/
    index.html           the live page
    pattern.html         the demo markup on its own
    pattern.css          the demo styles
    pattern.js           the demo script
    codepen/             the same demo as three panes for CodePen, kit included
    frames/              three keyframes and a phone frame
    README.md            what it does, the rules it follows, how to use it
```

Calm mode follows the system's reduced-motion setting and has its own switch. Light and dark follow the device.

All fifteen are live as graybox demos. Gray shapes stand in for the art on purpose, so the motion can be judged on its own. The next step is painted art, pattern by pattern.

## Use them

Take any pattern into your own page: the kit's two files plus the pattern's three. Each pattern README shows the markup. To try one first, paste its `codepen/` panes into a new pen.

The demos load two open fonts from Google Fonts, Newsreader and Outfit (SIL Open Font License). No licensed fonts or other licensed assets ship with them.

## Author

Designed and built by **Nathalie Vernier**, AI transformation and enablement, Berlin.
[natvernier.com](https://www.natvernier.com) · [Depth patterns on natvernier.com](https://www.natvernier.com/depth-patterns) · [LinkedIn](https://www.linkedin.com/in/nathalievernier/)

## Licence and credit

Code under the [MIT licence](../../docs/depth/LICENSE). Texts and frames under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Free to use and adapt, also commercially; please credit:

> Depth patterns by Nathalie Vernier, natvernier.com

Not included in either licence: the portrait of Nathalie Vernier and the natvernier.com brand.

## Publishing

Each pattern becomes a live page, a 10 to 15 second recording, and a three-keyframe strip. The series runs on LinkedIn under #DepthMatters, with longer essays on Substack. See the module README for the channel logic.
