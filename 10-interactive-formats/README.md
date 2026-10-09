# 10 · Interactive formats

Content you can operate, not just read.

## Core idea

Most content formats in this repository are static: a post, a carousel, a briefing, an FAQ.

Some ideas only land when the reader can act on them. A permission chain is easier to understand when you can follow one task through it. A depth pattern is easier to judge when you can scroll it yourself.

This module collects interactive formats: small, live pages that let a reader try an idea instead of reading about it.

The goal is not to decorate content with motion.

The goal is to choose an interactive format when the interaction carries the meaning, and to keep it reviewable, accessible and reusable like any other format in this lab.

## Why this belongs in the content lab

Building interactive formats used to need a front-end team. AI-assisted coding has made the code cheap.

The rest did not get cheaper: deciding what should move and why, tuning it until it feels right, keeping it accessible, and making sure the same idea still works where nothing can move.

That is editorial and design judgment. It is the same discipline this lab applies to every other format: source, purpose, audience, review, format, publish, evaluate.

## One original, many renderings

An interactive format is the original. Every channel gets a rendering of it.

```txt
live demo (the original)
→ short screen recording   (LinkedIn native video, Substack video)
→ three-keyframe strip     (carousels, and readers with motion turned off)
→ link back to the live demo
```

Substack and LinkedIn cannot run custom code, so the interaction lives on pages published from this repository. The channels carry the story and point back to it.

This is the format-variation principle of this lab applied to motion: the format changes, the meaning stays.

## Rules for every interactive format

* **Ordinary devices, ordinary gestures.** Scroll, swipe, tap, drag, pinch. No headset, no app.
* **The reader drives.** Nothing plays on a timer. Scroll stays 1:1 and never changes direction.
* **Words stay real text.** Readable before any motion starts, readable to search engines and screen readers.
* **Calm is a full mode.** If the device asks for reduced motion, the page starts calm. A switch on every page turns calm mode on or off. Nothing is lost in calm mode.
* **Always a way out.** A skip link, a visible place in the sequence, a working back button.
* **Graybox first.** Gray shapes stand in for the art until the motion has proven itself.
* **Neutral examples.** Content is generic or fictionalized, like everywhere in this repository.

## Collections

| Collection | What it is | State |
|---|---|---|
| [Depth patterns](depth-patterns/) | Fourteen ways a flat page can feel deep, on the laptop and phone you already have | 14 of 14 live |
| Explorable AI literacy | Interactive versions of AI literacy explainers, starting with how one task becomes a permission chain | Planned |

Live pages: https://natvernier.github.io/ai-content-lab/

## Portfolio connections

* **Trend radar.** Immersive and spatial interfaces on ordinary screens are an emerging pattern: browsers now ship scroll-driven animation and view transitions, and AI lowers the cost of building them. When the topic moves up the maturity model, it belongs in `ai-trend-radar-lab/02-trend-topics/`.
* **Governance.** Motion is an accessibility risk. Calm mode and "motion is never needed to read the content" are quality gates, in the sense of `ai-governance-risk-toolkit/08-quality-gates-and-escalation/`.
* **Adoption.** Interactive explainers are one way to make AI literacy formats stick, which feeds `05-internal-communication-use-cases/`.
