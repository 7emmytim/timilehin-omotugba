# Plain reader mode: design reference

Status: approved
PRD: [plain-reader-mode.md](../prds/plain-reader-mode.md)
Mockup: [editorial-mockup-light.html](editorial-mockup-light.html) (open it
through the dev server, or straight from disk; images load from `public/`)

This replaces the first version of this doc, which kept the dark editor
palette and described the layout in words only.

## Direction

Editorial, type-led and light. References: the "Poulo" site in the
[Awwwards portfolio gallery](https://www.awwwards.com/websites/portfolio/)
and the big-type developer portfolio shots on
[Dribbble](https://dribbble.com/search/developer-portfolio-website). Three
directions were compared (two-column sticky profile, editorial, bento grid)
and editorial was picked because it tells a story with real screenshots, which
works best for visitors who don't read code.

Rejected along the way, kept for reference:
- [editorial-mockup.html](editorial-mockup.html): the dark version with a
  hero photo.
- [switch-options.html](switch-options.html): three switch designs (toggle,
  floating button, nav link). The toggle won.

## Tokens

The plain page is light. The editor view stays dark and keeps the existing
Sage tokens untouched. New tokens for the plain page:

| Token | Value | Use |
| --- | --- | --- |
| paper | #f7f6f2 | page background (warm off-white) |
| paper-raised | #ffffff | cards, facts strip, screenshot frames |
| paper-sunk | #efeee8 | subtle fills |
| rule | #e4e2db | all lines and borders |
| ink | #14151a | headings and body text (16.9:1) |
| ink-75 | #3a3d46 | body copy |
| ink-60 | #5b5f6b | secondary text (5.9:1, AA) |
| leaf | #2a6e4c | accent text, primary button (5.7:1, AA) |
| leaf-dim | #e7f1eb | "Open to work" pill fill |
| leaf-line | #c5dfd0 | link underlines, pill border |

The contact panel reuses the editor's dark `editor` background and Sage
`accent` (#7cc4a0), as a nod to the code view.

Fonts: Instrument Sans for everything, Instrument Serif italic for one
accent word per heading ("enjoy", "use", "worked", "Let's talk."),
JetBrains Mono only for project numbers and the switch's `dev` label.

## Page, top to bottom

1. **Header** (sticky, 68px, blurred paper background, bottom rule). Avatar
   and name on the left. Work, Experience, Contact links (desktop only).
   The Dev mode toggle on the right.
2. **Hero**. "Open to work" pill and "Frontend developer · Abuja, Nigeria".
   Headline "I build websites and apps people *enjoy* using." up to 104px.
   Lede and buttons on one row under it: "View résumé →" (leaf, filled),
   "Email me" (white, outlined), LinkedIn and GitHub as text links. No photo.
3. **Facts strip**. Four facts on a white band: 4+ years, 4 products, Remote,
   Full-time.
4. **Selected work**. Heading "Products people *use* every day". One row per
   project, screenshot and text alternating sides. Screenshot in a white
   frame with three grey dots and a soft shadow. Text: number, name, tag
   chips, one-sentence description, "What I did", "Visit site ↗".
5. **Experience**. Sticky left column with heading "Where I've *worked*",
   a line about the résumé and "Download résumé ↓". Right column: one row per
   role with dates, title at company, type, and one plain sentence.
6. **Contact**. Dark rounded panel: "Hiring for a frontend role? *Let's
   talk.*", a line about availability, the email as a large underlined link,
   then phone, LinkedIn, GitHub and résumé. Photo on the right, 4:5, desktop
   only.
7. **Footer**. Copyright and "Prefer code? View as code →".

## Dev mode toggle

A labelled on/off switch (`role="switch"`). Label "Dev mode" on desktop,
`dev` in mono on phones. 38×22 track, white knob with a tiny `</>`.

- Plain page: off, grey track. Turning it on opens the editor view.
- Editor title bar: the same toggle, on, Sage track. Turning it off returns
  to the plain page. It replaces the old two-icon `ModeSwitch`.
- Title text: "See this page as the source code a developer would read".

## Phones (under 860px)

- Header 60px, name stays, nav hidden, toggle shows `dev`.
- Hero: 40px top padding. Buttons are two equal halves, links below.
- Facts: 2×2 grid with row lines only, on the page background.
- Projects stack, screenshot first, 4:3 crop anchored top-left so the
  product's own headline stays readable, no browser dots.
- Experience stacks, dates above titles.
- Contact: no photo, smaller padding, email at 16px.
- Section spacing 64px.

## States

- Screenshot fails to load: white frame with the project name centred.
- Missing description or role in data: that line is left out, no gap.
- Résumé: desktop opens a `<dialog>` with the PDF, Download and Close.
  Phones open the PDF directly.
- First paint: plain page renders first; a stored dev preference switches
  after mount (unchanged from today).

## Accessibility

- All text pairs above meet AA (checked with the WCAG formula).
- One `h1`, `h2` per section, `h3` per project and role.
- Landmarks: header, nav, main, footer.
- The toggle has a text label and `aria-checked`.
- Focus ring visible on every control. Reduced motion turns off smooth
  scrolling and the screenshot hover lift.

## Content to confirm before shipping

Draft copy in the mockup that needs Timilehin's corrections:
- "What I did" for each project, and "made them faster" for Africa Exchange.
- Project descriptions for GMS and Light House Inverter.
- "I usually reply within a day".
- Volomn's real dates. `experiences.json` has a placeholder ("Jan 2023 -
  Jun 2023", shown as "2023") until the real ones are known.
- A sharper photo (current one is 326×507).
