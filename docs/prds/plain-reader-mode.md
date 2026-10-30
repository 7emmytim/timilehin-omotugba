# Plain reader mode

Status: approved

## Problem

The portfolio is built to look like a code editor. Reader mode (the default)
already uses plain-language content, but it still sits inside the full editor
frame: title bar, activity bar, file explorer, tab strip, line numbers,
minimap, status bar, and monospace fonts on headings, buttons and labels.

A visitor who doesn't write code lands on something that looks like a tool
they don't use. They have to work out where the content is, what the side
panels are for and whether anything is clickable. The switch between modes is
two small icons in the title bar, so most people won't find it.

## Who it's for

- Recruiters and hiring managers screening candidates. They spend under a
  minute, often on a phone, and want to know: what does this person do, what
  have they built, how do I contact them, where's the résumé.
- Potential clients and non-technical founders. Same questions, plus "can I
  see the actual products?"
- Developers and engineering leads. They still get the editor view, which is
  the part of the site that shows personality and craft.

## Scope

In scope:

- A new layout for reader mode that looks like a normal website, with none of
  the editor frame.
- The same four sections as today (about, selected work, experience, contact),
  restyled for plain reading.
- A short description for each project in Selected work, written for a
  non-technical reader. `projects.json` has a `description` field that is
  empty today.
- An obvious way to switch to the editor view from the plain page, and back.
- Résumé access from the plain page (open and download).
- Works on phones and desktop, light on motion, keyboard usable.

Out of scope:

- Any change to dev mode. The editor view stays exactly as it is, including
  the terminal, minimap and file explorer.
- New sections (blog, testimonials, case studies).
- Rewriting experience descriptions. They are already in plain language.
- A light theme. Can be its own change later.
- Analytics changes. Mixpanel autocapture already records the switch clicks.

## User stories

1. As a recruiter on my phone, I open the link and immediately see a name, a
   one-line role, a short intro and buttons for the résumé and contact.
2. As a recruiter, I can scroll through projects and understand what each one
   is in one sentence, without knowing the tech stack.
3. As a recruiter, I can open or download the résumé without leaving the page
   or getting a blank box on mobile.
4. As a client, I can tap through to each live product.
5. As a developer, I can see a clear "View as code" option on the plain page
   and land in the current editor view.
6. As someone in the editor view, I can get back to the plain page with one
   obvious click.
7. As a returning visitor, I come back to whichever view I picked last.

## Acceptance criteria

- Reader mode renders without the title bar, activity bar, explorer, tab
  strip, line-number gutter, minimap and status bar.
- Body text, headings and buttons use the regular sans-serif font, with a
  serif italic for one accent word per heading. Monospace appears only as
  small detail: project numbers and the toggle's `dev` label on phones.
- The page scrolls as a normal page (the window scrolls), not inside a fixed
  pane. Browser back/forward and anchor links work.
- A sticky header with the name and links to Work, Experience and Contact
  stays reachable on scroll. Phones drop the section links rather than add a
  menu.
- Each project shows a screenshot, name, tags, a one-sentence description,
  what Timilehin did, and the live link.
- Experience entries show title, company, dates and one plain sentence. Skill
  chips are dropped from the plain page; they stay in the dev view.
- Year counts ("N years") are worked out from the January 2021 start date,
  not typed in, so they stay correct.
- The Dev mode toggle is visible without scrolling on desktop and phone, and
  has a text label, not only an icon.
- The editor view shows the same toggle switched on; turning it off returns
  to the plain page.
- The chosen view still persists in localStorage the way it does today, and
  first-time visitors still get reader mode.
- `?view=code` opens the editor view and `?view=simple` opens the plain page,
  overriding and replacing the stored preference.
- Résumé: desktop can open it in the page or a new tab, and download it.
  Phones get a direct open/download, no iframe.
- Colour contrast meets WCAG AA for text, and controls have at least 3:1
  against the page. All controls are reachable and visible with keyboard
  focus.
- `yarn lint` and `yarn build` pass.

## Decisions

1. Recruiters come first. The intro copy and the main button are written for
   someone screening a candidate ("View résumé" stays the primary action).
   Clients are still served by the project links and contact section.
2. Changed during Design: the plain page is light (warm off-white with a
   darker green accent), not the dark editor palette. Light reads better for
   non-technical visitors and makes switching to the dark editor feel like a
   real change of mode. Shared fonts and the green accent keep the two views
   related. See the design reference.
3. Add `?view=code` (and `?view=simple`) to open a specific view. A URL
   param wins over the stored preference for that visit and becomes the new
   stored preference.
4. Claude drafts the project one-liners from each live site, and Timilehin
   edits them before they ship.
5. Mixpanel runs with `autocapture: true` and no custom events, so clicks on
   the view switch are already captured. No custom event is added. The
   switch buttons get clear text labels so autocapture records something
   readable.

6. Changed during Design: the view switch is a "Dev mode" on/off toggle,
   used in both views, instead of a "View as code" button and a separate
   "Simple view" button.
7. Changed during Design: experience entries get one plain-language
   sentence each instead of clamped long descriptions, and projects get a
   "What I did" line. The long descriptions stay in the data for the dev view.

## Open questions

None.
