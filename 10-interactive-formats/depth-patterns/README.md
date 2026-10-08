# Depth patterns

Fourteen ways a flat page can feel deep, on the laptop and phone you already have.

**Live:** https://natvernier.github.io/ai-content-lab/depth/

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
| P1 | Flight through time | Scroll forward instead of down | M · 3 | Storyboard |
| P3 | Semantic zoom | Pinch or zoom one level deeper | L · 3 | Storyboard |
| P7 | Window | Move the mouse or tilt the phone | S–M · 2–3 | Storyboard |
| P8 | [Anamorphic arrival](https://natvernier.github.io/ai-content-lab/depth/p08-anamorphic-arrival/) | The first scroll after arriving | M · 3 | Live |

### Depth you can hold

Things unfold, turn or travel when you touch them. Nothing jumps.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P2 | Focus and fan | Tap one thing; its options fan out | M · 2–3 | Storyboard |
| P4 | The lazy Susan | Swipe sideways, one season per gesture | M · 2 | Storyboard |
| P5 | Pop-up book | Each scroll step opens one spread | S–M · 2 | Storyboard |
| P6 | Assembly | Scroll; the parts come together | L · 3 | Storyboard |
| P10 | Time scrub | Drag a time line under a picture | M · 2 | Storyboard |
| P11 | Doors that never cut | Any click that opens something | S · 2 | Storyboard |

### Depth you only feel

Quiet layers. Decoration only, never needed to read anything.

| ID | Pattern | Gesture | Effort · wow | State |
|---|---|---|---|---|
| P9 | Constellation | Drag, pinch, hover a star | M–L · 3 | Storyboard |
| P12 | The world remembers | None; it happens across visits | S · 1–2 | Storyboard |
| P13 | The lamp | Move the cursor, or touch and hold | S–M · 2 | Storyboard |
| P14 | Glass controls | None; it is the control layer | S · 2 | Storyboard |

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

Build order: P8 first, then P11, P13 and P7, roughly two patterns a month.

## Publishing

Each pattern becomes a live page, a 10 to 15 second recording, and a three-keyframe strip. The series runs on LinkedIn under #DepthMatters, with longer essays on Substack. See the module README for the channel logic.
