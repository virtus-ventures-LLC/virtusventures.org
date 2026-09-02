# Virtus Ventures — Website Project

Read this file at the start of every session. It is the brief. Do not deviate from it
without being told to.

## What this is

The public website for Virtus Ventures LLC, a venture relationship firm in Annapolis,
Maryland. The firm works the gap between undiscovered technical operators in the
Baltimore–Washington corridor and the venture capital that should have found them first.

The site is a thesis, not a brochure. Its primary job is to make an argument well enough
that a limited partner, a fund principal, or a serious founder finishes reading it and
concludes the firm has judgment. Everything else on the site is secondary to that.

## Audience, in priority order

1. Limited partners and fund principals evaluating an emerging manager with no track record
2. Technical founders deciding whether to bring their company to us
3. Ecosystem partners: state economic development, university tech transfer, regional programs

## Stack

Plain HTML, CSS, and vanilla JavaScript. No framework, no build step, no bundler.
Seven static pages. Deployed to Cloudflare Pages from git.

Rationale: a seven-page marketing site gains nothing from a build pipeline and loses
debuggability, load speed, and portability. Do not introduce React, Tailwind, or a
static site generator.

## Pages

- `index.html` — home. The reference implementation of the design system.
- `thesis.html` — the long-form argument. The center of gravity of the whole site.
- `founders.html` — what the firm does for operators
- `funds.html` — what the firm does for capital
- `about.html` — the firm and the team
- `shop.html` — merch, linking out to the Shopify storefront
- `contact.html` — intake form

`index.html` is the canonical style reference. When building any other page, match it.
Do not invent new components, new spacing values, or new type sizes for a new page.

## Design tokens

```
--ink:   #000000   page background, true black
--raise: #121110   raised surface, hover states
--paper: #EDE7DC   primary text, warm off-white
--muted: #8C857A   secondary text
--faint: #57524A   non-text only. 2.71:1 on black, fails AA. Never use for readable copy.
--gold:  #C8A97A   the single accent
--brass: #8A6F3D   deeper gold, for rules and quiet borders
--line:  rgba(237,231,220,0.10)  hairline borders
```

Gold is never a background fill except on a primary button. There is no second accent
color. Do not add one.

## Typography

- Newsreader (Google Fonts) for all editorial text, display and body. Weights 200–500.
  Chosen because the site's job is long-form reading.
- Archivo (Google Fonts) for navigation, buttons, and interface labels only.
- No third typeface. No monospace.

Banned faces: Inter, Roboto, Open Sans, Montserrat, Lato, Poppins, Cormorant.

Body line length stays under 66 characters. Body line-height 1.72. H1 uses
`clamp(2.4rem, 6.4vw, 5.6rem)` at weight 200 with `-0.022em` tracking.

## Hard prohibitions

These exist because they are the tells that make a site read as machine-made, and
because a firm asking for institutional trust cannot afford to read that way.

- No stock photography, and no AI-generated photorealistic imagery of people, offices,
  cities, handshakes, or screens. If a photograph would be needed, use type and space
  instead.
- No all-caps eyebrow labels above headings
- No `01 / 02 / 03` numbered markers unless the content is genuinely a sequence
- No monospace faces used as small data labels
- No arrows appended to link or button text
- No meta strings joined with middle dots
- No card grids. Content is prose in a measured column, or full-width blocks.
- No em dashes anywhere in body copy. This is a firm voice rule, not a style preference.
- No purple, no gradient washes, no parallax, no particle fields, no glassmorphism
- No fade-and-slide-up entrance on every section

## Logo

The official lockup is a gold gradient pinwheel square with a black diamond center
holding a serif V, with the VIRTUS VENTURES wordmark. It is a supplied asset file.
Never recreate, redraw, approximate, or regenerate it. If the file is not present in
`/assets/brand/`, stop and ask for it.

## Motion

One orchestrated moment, not scattered effects.

On load: a gold hairline draws across, then the hero lines cut in at 110ms intervals
with no fade. On scroll: elements hard-cut into place, no opacity ramps. A gold reading
spine runs down the left edge and fills with scroll progress, because the site is an
argument and the reader should feel their position in it.

`prefers-reduced-motion` is respected everywhere. Nothing on this site moves unprompted
except the spine.

## Voice

Longer flowing sentences with connective transitions. Earnest and plain. Never staccato
fragments, never clever, never buzzwords. The firm is early and says so directly rather
than inflating. Write like a person explaining something they have thought hard about.

No em dashes. Use commas, or start a new sentence.

## Compliance

Securities disclosure language lives in visible footer body copy on every page, not
buried and not in reduced-size gray text. The firm's regulatory posture is a confidence
signal, so it is stated plainly.

## Quality floor

Responsive to 360px. Visible keyboard focus on every interactive element. WCAG 2.1 AA
contrast. Semantic HTML. No third-party tracking scripts. Fonts preconnected.
