# Plain reader mode: design reference

Status: approved
PRD: [plain-reader-mode.md](../prds/plain-reader-mode.md)

## Starting point

Everything reuses what the site already has. No new colours, fonts or icons.

- Colours: the existing Sage tokens in `styles/globals.css` (`editor`,
  `card`, `card-line`, `hover`, `fg`, `mute`, `accent`, `accent-fg`). The
  syntax colours and the editor-only surfaces (`title`, `activity`, `side`,
  `gutter`) are not used on the plain page.
- Font: Instrument Sans (`font-sans`) for everything. JetBrains Mono appears
  only on the "View as code" button, as a hint of what's behind it.
- Icons: the existing set in `src/icons` (Document, Mail, LinkedIn, GitHub,
  TransmitRight).
- Components: the four reader sections (`about`, `work`, `experience`,
  `contact`) keep their structure and data. Each loses its `font-mono`
  classes and gets slightly larger, more relaxed type.

What goes: title bar with traffic lights, activity bar, file explorer, tab
strip, line-number gutter, current-line highlight, minimap, status bar,
blinking caret, the inner scrolling pane.

## Layout

One centred column, max width about 960px, 24px side padding on phones and
40px on desktop. The window scrolls, not an inner pane.

Desktop:

```
┌──────────────────────────────────────────────────────────────┐
│ (avatar) Timilehin Omotugba   About Work Experience Contact  │  sticky header
│                                              [</> View as code]│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Timilehin Omotugba                                          │  hero
│  Frontend developer in Abuja, Nigeria · ● Open to work      │
│                                                              │
│  I build the parts of websites and apps that people see and  │
│  use. Four years of shipping real products: ...              │
│                                                              │
│  [View résumé]  [Email me]  LinkedIn  GitHub                 │
│                                                              │
│  SELECTED WORK ──────────────────────────────────────────    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                      │
│  │screenshot│ │screenshot│ │screenshot│                      │
│  │Name      │ │Name      │ │Name      │                      │
│  │Company   │ │Company   │ │Company   │                      │
│  │One line  │ │One line  │ │One line  │                      │
│  │Visit ↗   │ │Visit ↗   │ │Visit ↗   │                      │
│  └──────────┘ └──────────┘ └──────────┘                      │
│                                                              │
│  EXPERIENCE ─────────────────────────────────────────────    │
│  AF  Frontend Developer, AFEX                Jan 2021 - now  │
│      Full-time · Hybrid                                      │
│      Short description...                                    │
│      Next.js  TypeScript  ...  (small, muted)                │
│                                                              │
│  CONTACT ────────────────────────────────────────────────    │
│  Open to frontend roles...                                   │
│  [Email card] [Phone card] [LinkedIn card] [GitHub card]     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ © 2026 Timilehin Omotugba        Prefer code? View as code → │  footer
└──────────────────────────────────────────────────────────────┘
```

Phone (375px):

```
┌───────────────────────────┐
│ (av) Timilehin  [</> Code]│  sticky header, no section links
├───────────────────────────┤
│ Timilehin Omotugba        │
│ Frontend developer        │
│ Abuja · ● Open to work    │
│                           │
│ Intro paragraph           │
│                           │
│ [View résumé] full width  │
│ [Email me]    full width  │
│ LinkedIn · GitHub         │
│                           │
│ SELECTED WORK             │
│ ┌───────────────────────┐ │
│ │ screenshot            │ │  one card per row
│ │ Name / Company        │ │
│ │ One line              │ │
│ └───────────────────────┘ │
│ ...                       │
└───────────────────────────┘
```

## Pieces

### Header

- Sticky, `bg-editor/85` with a backdrop blur and a bottom `border-hair` line
  that only shows once the page has scrolled.
- Left: avatar (24px, round) and name. Clicking it scrolls to the top.
- Middle (desktop only, 768px and up): section links About, Work, Experience,
  Contact. The current section is `text-fg`, the rest `text-mute`. This
  reuses the scroll spy in `NavProvider`, pointed at the window instead of
  the editor pane.
- Right: the view switch (below).
- Phones drop the section links. The page is short enough to scroll, and a
  hamburger menu would be one more thing to learn.

### View switch

- Plain page: a bordered button, `</> View as code` on desktop and
  `</> Code` on phones. Mono font, `border-card-line`, hover `border-accent`.
  `title` text: "See this page as the source code a developer would read."
- Editor view: the current two-icon `ModeSwitch` is replaced in the title bar
  with a labelled button, `← Simple view`. This is the one change to dev
  mode, because the PRD needs a clear way back.
- Footer repeats it as a text link: "Prefer code? View as code →".
- Switching scrolls to the top. No animated transition between the views.

### Hero (about)

- Name: same size as today, `font-bold`, no caret.
- Role line: sans, `text-mute`, with a small accent dot and "Open to work",
  which moves here from the status bar.
- Intro: rewritten for a non-technical reader. Tool names (React, Next.js,
  TypeScript) move out of the first sentence. Draft: "I build the parts of
  websites and apps that people see and use. In four years I've shipped a
  commodities trading platform, a donation flow that takes payments in
  several currencies, and a grant management system for a national research
  institute."
- Buttons: "View résumé" stays the primary accent button. "Email me" becomes
  the second filled button (`bg-card`). LinkedIn and GitHub become plain
  icon-and-text links, so there are two clear actions instead of four equal
  ones.

### Selected work

- Same grid and screenshot cards as today.
- New: one-sentence description under the company name (`text-[14.5px]`,
  `text-fg/75`), from `projects.json`.
- The link line reads "Visit site ↗" instead of the bare domain.

### Experience

- Title and company on one line, dates right-aligned on desktop and under
  the title on phones.
- Type and location in sans `text-mute`.
- Skill chips stay but use sans, `text-mute`, no accent colour, so they read
  as a footnote.
- Descriptions are clamped to three lines with a "Read more" toggle. Several
  are long and full of terms like "Next.js middleware" and "Strapi CMS".
  Shortening that copy is a content task outside this design, flagged below.

### Contact

- Same cards. Labels in sans instead of mono uppercase. Values in sans.
- Email card first and slightly emphasised (`border-accent-line`), since the
  copy says email is fastest.

### Résumé

- On the plain page "View résumé" opens a full-screen overlay with the same
  iframe viewer, plus "Download" and "Close". Esc and the close button both
  dismiss it, and focus returns to the button.
- Phones (under 768px) skip the overlay and open the PDF directly, matching
  what `ResumeViewer` already does.

### Footer

- `border-t border-hair`, small `text-mute`: copyright and the "View as code"
  link.

## States

- Loading: the site is static. Screenshots use `next/image` and keep their
  16:10 box (`bg-card`) while loading, so nothing jumps.
- First paint: `ModeProvider` already renders reader mode first, so the plain
  page is what shows before the stored preference is read. A returning dev
  visitor sees one frame of the plain page before the editor. Acceptable for
  now, flagged in the plan.
- Empty: if a project has no description, the card shows without that line
  instead of an empty gap.
- Error: a screenshot that fails to load shows the `bg-card` box with the
  project name centred.
- Résumé on desktop: if the iframe can't render a PDF, the "Open in new tab"
  and "Download" links are still visible above it.

## Accessibility

- All text on `bg-editor` and `bg-card` meets AA. `text-mute` (#6a7187) on
  #101117 is about 4.0:1, under 4.5:1 for small text, so on the plain page it
  is used only for text 14px and larger or swapped for `text-fg/60`. To check
  during Build.
- Landmarks: `header`, `nav` (section links), `main`, `footer`.
- One `h1` (the name), `h2` for each section heading (today they're `p`
  tags), `h3` for project and job titles.
- The view switch is a real button with a visible text label.
- Focus ring: the existing `:focus-visible` accent outline.
- Respects `prefers-reduced-motion` for smooth scrolling and card hover zoom.

## Content flagged for later

- Experience descriptions are long and technical. A plain-language rewrite
  would help non-technical readers more than any styling. Not in this
  change.
- `experiences.json` gives Volomn the same dates as Helpa ("Aug 2022 - Nov
  2022, Apr 2024 - Dec 2024"). Looks like a copy-paste mistake.
