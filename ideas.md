# Virtus Ventures Website Design Direction

## Ground-truth reference

The supplied launch specification and the September 2026 Virtus Ventures Brand Kit are the canonical references. When a template convention conflicts with them, the Virtus references win. The site is a printed research note rendered for a screen, not a startup landing page, luxury brand page, or conventional venture capital portfolio site.

## Chosen design philosophy

**Design movement:** Editorial modernism informed by academic working papers, institutional research notes, and carefully typeset investment memoranda.

**Core principles:** The design demonstrates confidence through density and restraint. It is left aligned, text first, typographically rigorous, and structurally quiet. Hierarchy comes from rules, spacing, marginalia, and weight rather than display scale. Every visual element must support reading or orientation.

**Color philosophy:** The communication surface is warm paper, not black. Near-black ink carries the argument, Soft handles secondary information, and Brass appears only in rules and footnote markers because it does not meet the body-text contrast threshold on Paper. The black and gold identity is confined to the supplied logo artwork. No third color is introduced, including for validation states.

**Layout paradigm:** A publication shell uses a firm masthead, a single navigation line, and an asymmetric reading grid with a 170px annotation column beside a main measure capped at 64 characters. Below 860px, notes become inline annotations behind a 2px Brass rule. Sections are separated by hairlines rather than boxes or background changes.

**Signature elements:** Short institutional marginalia, numbered footnotes, and precise horizontal rules recur throughout the site. A single opening drop cap and at most one pull quote per page provide texture without turning prose into marketing modules.

**Interaction philosophy:** The material is stable and immediate. Links remain plainly underlined where they occur in prose. Navigation, controls, and form fields expose clear keyboard focus. There are no menus, overlays, icons, or decorative interaction patterns.

**Animation:** None. The only visual state changes are link and button hover treatment and keyboard focus rings. No entrance effects, fades, transforms, loading animations, parallax, counters, or motion libraries are used.

**Typography system:** Source Serif 4 sets all body copy and headings. IBM Plex Sans is limited to navigation, marginalia, captions, table headers, controls, and footnotes. Body text is 16.5px at 1.62 line height. Standard headings are 1.09rem at weight 600. Page titles use `clamp(1.65rem, 3.1vw, 2.15rem)` and remain left aligned. The reading measure is no wider than 64 characters.

**Brand essence:** Virtus Ventures is a venture relationship firm for overlooked technical operators and fund principals who need a more deliberate discovery mechanism. It is considered, literate, and unhurried.

**Brand voice:** Headlines name the argument rather than advertise an outcome. Calls to action sound like ordinary human requests, not conversion copy. Example lines: “The region is not short of capital.” and “Tell us what you are building, or what you have been unable to find.”

**Wordmark and logo:** The supplied black-ground raster lockup is preserved without recoloring, redrawing, shadow, rotation, or stretching. It appears at the specified compact masthead scale. Favicon crops are derived from the supplied square mark without changing the artwork.

**Signature brand color:** Paper `#F2EFE7` is the unmistakable communication surface. Brass `#8A6F3D` is a supporting structural accent only.

## Implementation constraints

The implementation must not include photographs, generated imagery, illustrations, icons, cards, feature grids, statistic tiles, gradients outside the supplied logo, shadows, dark mode, rounded decorative containers, or oversized hero typography. Copy must contain no em dashes, buzzwords, invented proof, invented biographies, credentials, testimonials, clients, or portfolio companies. The supplied compliance paragraph appears at readable body size on every route.

## Style Decisions

Because the supplied asset is the archival black-ground lockup rather than the light-ground transparent lockup named in the launch specification, the artwork will remain on its native black identity surface and be displayed compactly within the paper masthead. This preserves the supplied pixels and the brand kit's rule that the logo may live on black, while keeping the rest of the communication surface on Paper.

Contact controls are treated as ruled intake fields rather than boxed application components, so the form remains subordinate to the prose. Brass recurs as a structural mark above desktop marginalia and beside mobile marginalia, while remaining absent from body text. Team information is set as a continuation of the firm note with restrained hierarchy. The canonical `Bio pending.` text and the three explicit launch placeholders remain because the supplied launch prompt requires them until the owner provides final values.
