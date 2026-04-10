# CLAUDE.md — DEV Portfolio Website

> **Read First:** Before acting on anything in this file, read and apply the global rules at:
> `My Drive/1-Projects/CLAUDE.md`
> All sessions are rooted in that file. Project-specific rules below extend — never override — the global rules.

---

## Project Purpose

Public-facing portfolio website for Robert Williams at https://rob-jw.github.io/portfolio/. The site is hosted on GitHub Pages from the `main` branch of `Rob-JW/portfolio`.

The site exists to give recruiters, hiring managers, and industry contacts a succinct, credible overview of Rob's professional background and current direction: a transitioning military engineering leader building a portfolio in cyber security.

### Vision (Future Scope — Not Today)

The site will grow into a hub containing:

- **Qualifications** — academic, professional, and certification record
- **Projects** — labs, tools, automation, and personal builds
- **Write-ups** — HTB / THM lab walkthroughs and methodology documentation
- **Blog** — short-form posts on study progress, career transition, and technical topics
- **Roadmap** — current study plan and certification pathway
- **Resources** — curated links that bridge engineering and cyber

These pages do not exist yet. They are the direction, not the current scope.

---

## Current Scope

Single-page site with these sections in `index.html`:

- **Hero** — headline, subtitle, primary CTAs, skills radar card
- **About** — narrative bio
- **Overview** (mislabelled as Projects) — 6 hover cards pointing at the future pages
- **Contact** — LinkedIn, GitHub, email links

Active work before any new pages are added: **tweak and harden what exists** — code quality, visuals, accessibility, performance, content.

---

## Tech Stack & Constraints

| Area | Choice | Why |
| :--- | :--- | :--- |
| HTML | Vanilla HTML5 | Zero build, zero tooling, GitHub Pages compatible |
| CSS | Vanilla CSS with custom properties | Theme switching via `data-theme` attribute |
| JavaScript | Vanilla ES6+, no framework | Site is small; no runtime dependency desirable |
| Charts | Chart.js (CDN) | Radar chart — retained as only runtime dependency |
| Icons | Font Awesome (CDN) | Widely recognised brand icons (LinkedIn, GitHub) |
| Fonts | System UI stack | Zero-cost, native feel, fast render |
| Hosting | GitHub Pages | Free, custom domain possible later, CI via push |

### Hard rules

- **No build step.** No Node, no bundler, no SASS, no TypeScript compile. A fresh clone must run from `index.html` with zero commands.
- **No frameworks.** No React, Vue, Svelte, Next, Astro, htmx, Alpine. This is a vanilla project on purpose.
- **Minimal dependencies.** Only Chart.js and Font Awesome via CDN. Adding another dependency requires an explicit decision recorded in `plan.md`.
- **No trackers, no analytics, no third-party scripts** other than the above.
- **All assets must be either in-repo or from a trusted CDN** (jsdelivr, cloudflare, googleapis). Pin versions where the CDN supports it.
- **Pure HTTPS.** No http:// links that carry data or credentials.

---

## Quality Bars

Every change must meet all five bars. Raise a flag in the session before introducing a regression against any of them.

### 1. Code Quality
- Consistent indentation (tabs, matching the current files).
- Named functions over inlined logic where the behaviour is non-trivial.
- No dead code, no commented-out blocks left behind.
- Keep `script.js` organised by feature (theme, nav, radar, hover cards) with a single `DOMContentLoaded` entry point.
- Comment the *why*, not the *what*.

### 2. Accessibility
- Semantic HTML first — `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`, proper heading hierarchy.
- All interactive elements keyboard-accessible.
- Focus states visible (never rely solely on `:hover`).
- ARIA only where native semantics fall short (e.g. the tablist on the radar toggle).
- Colour contrast: WCAG AA minimum (4.5:1 for body text, 3:1 for large text and UI components).
- Respect `prefers-reduced-motion`.
- `aria-label` on canvases and icon-only buttons.

### 3. Visual Consistency
- Theme-driven colours via CSS custom properties (`--accent`, `--bg`, etc.) — no hardcoded hex outside `:root`.
- Both light and dark themes must be equally polished — never "dark is the real one, light is a fallback".
- Chart colours read live from CSS vars and re-sync on theme change.
- Typography: one system UI stack, consistent scale.
- Spacing: use `rem` and a predictable rhythm.

### 4. Performance
- First paint under 1 second on a cold load over broadband.
- No render-blocking scripts except where unavoidable (Chart.js is deferred by being at body-end).
- Images (when added) must be optimised and served at intrinsic dimensions.
- Font Awesome imported as CSS — consider trimming to specific icons when the icon count is known.
- No layout shift above 0.1 CLS.

### 5. Content
- Facts must be accurate. Rob is a WO1 ASM REME with 24 years service — not a "Senior Engineering Officer" (current hero copy is wrong and needs fixing).
- UK English spelling throughout (colour, organise, behaviour).
- No filler, no clichés, no "passionate about coding" filler text.
- Every claim backed by evidence Rob can show.

---

## Session Startup

1. Read this file and the global `CLAUDE.md` at `1-Projects/CLAUDE.md`.
2. Read `plan.md` to restore context on current work.
3. `git pull origin main` — the remote may be ahead if Rob has committed from the browser or another machine.
4. Ask Rob which area of work we are on today (code quality / visual / a11y / performance / content / new page).

---

## Workflow Rules

### Plan before acting
Any non-trivial change (anything beyond a typo or a one-line fix) gets a short block in `plan.md` before code is written. The plan is agreed before editing starts.

### Verify before committing
No commit until the change has been verified in a browser. That means:
- `open index.html` in Safari or Chrome
- Test the specific behaviour changed
- Test at least one mobile viewport (≤600px)
- Switch themes and confirm the change holds in both
- Tab through to confirm keyboard navigation is not broken

### Commit discipline
- One commit per logical change. No kitchen-sink commits.
- Commit messages: imperative mood, summary line ≤70 chars, body explaining *why* when not obvious.
- Always push immediately after commit — local-only commits are not backed up.
- Never force push to `main`.

### Session end
- Summarise changes made.
- Update `plan.md` status.
- Run the session-wrapup security scan over modified files.
- Commit any `plan.md` / `CLAUDE.md` updates separately from code changes.

---

## File Layout

```
DEV–Portfolio_Website/
├── CLAUDE.md           This file — project-specific rules
├── plan.md             Current work plan and roadmap
├── README.md           Public-facing repo README (GitHub)
├── index.html          Single-page site markup
├── style.css           All styling, theme variables, responsive rules
├── script.js           Theme, nav, radar chart, hover cards
├── assests.asci        [Typo — rename to assets.txt or remove, unused]
└── .git/               Git repo — remote origin/main → github.com/Rob-JW/portfolio
```

Known naming issues to fix during the review:
- `assests.asci` — misspelled and unreferenced. Delete or rename.
- `section1` CSS class — meaningless generic name, likely needs renaming by purpose.

---

## Review Plan (Placeholder — fill in `plan.md`)

The current overhaul will progress through, in approximately this order:

1. **Content audit** — fix factual inaccuracies in the hero and about sections.
2. **Code quality pass** — tidy HTML structure, dead code removal, file organisation.
3. **Accessibility pass** — semantic HTML, keyboard flows, contrast, ARIA.
4. **Visual refresh** — spacing, rhythm, component polish, interaction design.
5. **Performance pass** — asset loading, CLS, first paint.
6. **Final review** — cross-browser, mobile, theme toggle, full QA sweep.

Each pass gets its own plan block and its own commit sequence. No stage begins until the previous is verified.
