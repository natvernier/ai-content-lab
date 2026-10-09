# Depth patterns

Fourteen ways a flat page can feel deep, on the laptop and phone you already have.

**Live:** https://natvernier.github.io/ai-content-lab/depth/

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
| P1 | [Flight through time](https://natvernier.github.io/ai-content-lab/depth/p01-flight-through-time/) | Scroll forward instead of down | M · 3 | Live |
| P3 | [Semantic zoom](https://natvernier.github.io/ai-content-lab/depth/p03-semantic-zoom/) | Pinch or zoom one level deeper | L · 3 | Live |
| P7 | [Window](https://natvernier.github.io/ai-content-lab/depth/p07-window/) | Move the mouse or tilt the phone | S–M · 2–3 | Live |
| P8 | [Anamorphic arrival](https://natvernier.github.io/ai-content-lab/depth/p08-anamorphic-arrival/) | The first scroll after arriving | M · 3 | Live |

### Depth you can hold

Things unfold, turn or travel when you touch them. Nothing jumps.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P2 | [Focus and fan](https://natvernier.github.io/ai-content-lab/depth/p02-focus-and-fan/) | Tap one thing; its options fan out | M · 2–3 | Live |
| P4 | [The lazy Susan](https://natvernier.github.io/ai-content-lab/depth/p04-lazy-susan/) | Swipe sideways, one season per gesture | M · 2 | Live |
| P5 | [Pop-up book](https://natvernier.github.io/ai-content-lab/depth/p05-pop-up-book/) | Each scroll step opens one spread | S–M · 2 | Live |
| P6 | [Assembly](https://natvernier.github.io/ai-content-lab/depth/p06-assembly/) | Scroll; the parts come together | L · 3 | Live |
| P10 | [Time scrub](https://natvernier.github.io/ai-content-lab/depth/p10-time-scrub/) | Drag a time line under a picture | M · 2 | Live |
| P11 | [Doors that never cut](https://natvernier.github.io/ai-content-lab/depth/p11-doors-that-never-cut/) | Any click that opens something | S · 2 | Live |

### Depth you only feel

Quiet layers. Decoration only, never needed to read anything.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P9 | [Constellation](https://natvernier.github.io/ai-content-lab/depth/p09-constellation/) | Drag, pinch, hover a star | M–L · 3 | Live |
| P12 | [The world remembers](https://natvernier.github.io/ai-content-lab/depth/p12-the-world-remembers/) | None; it happens across visits | S · 1–2 | Live |
| P13 | [The lamp](https://natvernier.github.io/ai-content-lab/depth/p13-the-lamp/) | Move the cursor, or touch and hold | S–M · 2 | Live |
| P14 | [Glass controls](https://natvernier.github.io/ai-content-lab/depth/p14-glass-controls/) | None; it is the control layer | S · 2 | Live |

## Conventions in short

* At most three depths, each drawn differently, not just bigger.
* Closer means more relevant. Text always faces you, flat and sharp.
* One gesture, one meaning, everywhere.
* Fixed places: things do not move when you filter or come back.
* Filters work like lenses. Matches come forward, the rest dims in place.
* Stable centre, still horizon. Objects move, the world does not.
* Painted or gray world, glass controls: only the interface layer is glass.

## How a pattern is built

Each live pattern is one self-contained `index.html` under `docs/depth/`. No build step, no dependencies, no tracking. Open it in a browser to run it.

Every page carries the same small kit inline: calm mode (it follows the system's reduced-motion setting and has its own switch), 1:1 scroll progress, light and dark colours, and a skip link. The three keyframes of each pattern sit next to it in `frames/`.

All fourteen are live as graybox demos. Gray shapes stand in for the art on purpose, so the motion can be judged on its own. The next step is painted art, pattern by pattern.

## Publishing

Each pattern becomes a live page, a 10 to 15 second recording, and a three-keyframe strip. The series runs on LinkedIn under #DepthMatters, with longer essays on Substack. See the module README for the channel logic.
