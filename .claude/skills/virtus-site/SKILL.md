---
name: virtus-site
description: Build or extend pages of the Virtus Ventures website. Use whenever creating a new page, restructuring an existing one, or changing site-wide layout, type, or motion. Encodes the scroll architecture, section rhythm, component set, and motion rules so pages stay consistent with index.html.
---

# Building Virtus pages

Read `CLAUDE.md` first. It holds the tokens, the voice rules, and the prohibitions.
This file holds the construction method.

## The governing idea

Every page is a piece of writing that has been given a spatial form. The reader should
be able to scroll it like a document and come away having followed an argument. Layout
serves reading pace. That is the whole design philosophy, and any decision that makes a
page more scannable at the cost of making it less readable is the wrong decision.

## Page skeleton

Every page uses the identical shell. Copy it from `index.html` rather than rewriting it.

```
grain overlay (fixed, SVG turbulence, opacity .16, overlay blend)
reading spine (fixed, left, 1px, fills gold with scroll progress)
header (fixed, wordmark left, nav right, gains blur background past 40px scroll)
main
  opening block          full viewport height, sets the page's proposition
  body                   the page's actual content, in the measured column
  transition             one full-width moment that changes the reading texture
  closing block          a single next action
footer (nav columns, visible compliance copy)
```

The opening block always occupies `100svh` and always contains exactly three things: a
short display line, one paragraph of orientation, and at most two actions. Resist adding
a fourth element. The restraint at the top of the page is what makes the rest feel
considered.

## The measured column

Body content sits in `.col`, capped at `64ch`, left aligned, never centered. Section
padding is `clamp(80px, 12vh, 150px)` vertical. Sections separate with a single
`1px solid var(--line)` top border and nothing else. No decorative dividers, no
background color changes between sections.

## Component set

This is the complete inventory. Do not add components without being asked.

- `.movement` — a heading plus two or three paragraphs. The primary unit of every page.
- `.pull` — a single sentence at display size with a gold left rule. Maximum one per
  page section, and only when the sentence genuinely earns the emphasis. A pull quote
  that is merely a summary of the paragraph above it should be deleted.
- `.doors` — a two-column full-width split for genuine either/or audience routing.
  Used on the home page. Not a general-purpose card grid, and never more than two.
- `.btn` and `.btn.quiet` — the only two button treatments.
- `.standing` — the closing block. Heading, short paragraph, one action.

If a page needs something outside this set, the first question is whether the content
can be expressed in prose instead. Usually it can.

## The scroll mechanic

This is the part that carries the premium feel, and it works because it is restrained.

**Load sequence, once per page.** A gold hairline draws from 0 to 120px over 900ms on
`cubic-bezier(.16,.84,.44,1)`. Starting at 620ms, the hero elements switch to visible at
110ms intervals. They do not fade. They do not translate. They cut in, the way type is
set rather than the way a slide animates. The absence of a fade is the point and it is
what separates this from every template.

**Scroll reveal.** An IntersectionObserver at threshold .18 adds a class that flips
opacity from 0 to 1 with no transition. Unobserve after firing so nothing re-animates on
scroll back up. Hard cut, never a ramp.

**The reading spine.** A fixed 1px rule at the left edge fills gold in proportion to
document scroll progress. It is the only continuously moving element on the site. It
exists because the site is an argument and the reader benefits from knowing where in the
argument they are. Hidden below 820px where the margin does not exist.

**Everything respects `prefers-reduced-motion`.** Under reduce, the spine still tracks
position because that is information rather than decoration, but the rule renders at
full width immediately and all reveals start visible.

## Long-form pages

`thesis.html` is the longest page and needs pacing devices the others do not.

Break the argument into movements of roughly 250 to 400 words. Between movements, vary
the texture: a pull sentence, a wider full-bleed statement, a stretch of narrower
measure. The reader should feel the rhythm change without noticing a new component
appearing. Never let more than three consecutive `.movement` blocks run without a change
in texture, and never solve pacing by adding an image.

Give the page a visible end. Long arguments that simply stop feel unfinished, so close
with a `.standing` block that states what follows from the argument.

## Writing the copy

Draft the copy before laying out the page, not after. A section that exists because the
layout has a hole in it will read like it.

Sentences run long and connect to each other. Claims are specific or they are cut. The
firm is early stage and says so plainly, because the alternative is inflation and a
sophisticated reader detects inflation immediately. No em dashes.

Before shipping any page, read the copy aloud. If a sentence sounds like marketing, it
is marketing, and it should be rewritten as something a person would actually say.

## Media

The site carries no photographs. If a page feels visually thin, the fix is stronger
typographic contrast, a wider full-bleed statement, or more space, in that order. It is
never a photograph, an icon set, or an illustration.

Abstract motion is permitted in one place only: the home page opening block may carry a
slow gold-on-black canvas or SVG field that suggests signal and connection without
depicting anything literal. It must run under 5% of the frame's visual weight, pause
under reduced motion, and cost nothing on mobile. If it reads as decoration rather than
atmosphere, remove it.

## Review pass

After building any page, screenshot it at 1440px and 390px and look at the result before
reporting completion. Check specifically:

1. Does the opening block hold exactly three elements
2. Is any body text past 66 characters per line
3. Did a card grid, an all-caps label, or a monospace label appear
4. Is there more than one pull quote in a section
5. Does anything fade rather than cut
6. Does the page match `index.html` on type scale and spacing, or has it drifted
7. Is the compliance copy present and legible
8. Does keyboard tab order reach every link with a visible focus ring

Fix what fails before saying the page is done.
