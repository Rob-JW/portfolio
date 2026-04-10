# Portfolio — Skills Matrix Rework

> **Read First:** Before acting on anything in this file, read and apply the global rules at:
> `My Drive/1-Projects/CLAUDE.md`
> All sessions are rooted in that file. Project-specific rules below extend — never override — the global rules.

---

## Outstanding — Next Session (first thing 2026-04-11)

Six items requested by Rob at end of 2026-04-10 session. All are polish — none require structural changes.

1. **Add personal link to contact methods.** `https://robwilliams.link/` should appear alongside LinkedIn, GitHub, and email in the contact block at the bottom of every page (index.html + 6 sub-pages).
2. **Populate sub-page content.** Replace boilerplate on `projects.html`, `roadmap.html`, `backlog.html`, `write-ups.html`, `learning-resources.html` with real content drawn from Rob's CPSA study, CV, and HTB/THM lab work. Qualifications page already has real content.
3. **About section — reduce word count.** Current two-paragraph block is too long. Tighten to ~2 concise sentences per paragraph while preserving the rank, KSE framing, qualifications, and CPSA booking.
4. **Hero button hover effect.** The current hover on `.btn.primary` / `.btn.ghost` feels slightly off. Revisit — maybe a stronger colour swap, cleaner translate, or a pixel bevel pulse. Both buttons should feel consistent.
5. **Reduce hero bottom padding.** Currently the hero's bottom padding (matching top, `clamp(1.5rem, 3vw + 0.5rem, 2.5rem)`) creates too much space between the buttons and the About section below. Pull it back — target around half the current value. *Note: earlier in this session Rob said it was too tight, so I bumped it. He's now saying I overshot. Don't take it to zero.*
6. **Increase hero-actions top padding.** Space between the "Core-Loop: Focused Learning · Discipline · Consistency" line and the buttons needs more breathing room. Currently `margin-top: 1rem` on `.hero-actions` — bump to ~1.5–2rem.

---

## Context

Portfolio site lives at `Rob-JW/portfolio` on GitHub, served via GitHub Pages at https://rob-jw.github.io/portfolio/. Current skills matrix uses Chart.js radar with two modes (Cyber / Code) but has multiple issues: chart too small, labels too small, unused scale range, destroy/rebuild on mode switch, stale content in Code mode, leftover debug elements.

## Goal

Rework the skills radar so it:
- Presents Rob's two genuine profiles: **Cyber** (in development) and **General** (engineering leadership, peak).
- Looks polished and readable at all viewport sizes.
- Transitions smoothly between modes.
- Is accessible (keyboard + screen reader).
- Drops debug cruft (JS Delivr attribution link, beta badge).

## Non-Goals (This Session)

- Full TryHackMe-style matrix (4 career paths × 4 experience levels). Flagged as future roadmap item — see `Roadmap` below.
- Content changes to any section other than the skills radar.
- Dependency changes (Chart.js stays).

---

## Scope — In

1. Replace `code` mode with `general` mode (new labels, values, toggle button text).
2. Rebalance Cyber mode values to reflect honest current state (Option C).
3. Chart visual improvements: larger chart, larger labels, scale adjusted, theme-driven colours.
4. Smooth data transitions on mode switch (update datasets in place, no destroy/rebuild).
5. Accessibility on toggle buttons: `role="tab"`, `aria-selected`, keyboard arrow navigation.
6. Combined tooltip (current + target for same axis).
7. `prefers-reduced-motion` respected.
8. Remove `beta` badge.
9. Remove JS Delivr link + wrapper.

## Scope — Out

- New pages or sections.
- Tooling / build system changes.
- Content on About, Projects, Contact, or Overview cards.

---

## Data

### Cyber Mode (Option C — honest rebaseline)

| # | Label | Current | Target (12mo) | Rationale |
|---|-------|---------|---------------|-----------|
| 1 | Network Fundamentals | 40 | 65 | Security+ done; CPSA Domain B first pass complete. Known gaps: RFC 1918, VLAN hopping. |
| 2 | Linux CLI | 25 | 60 | Biggest mock weakness (~10 errors/test). CPSA Unix domain not yet started. |
| 3 | Windows / AD | 30 | 60 | Security+ covered; CPSA Domain E not started; HTB Blue completed. |
| 4 | Web Security | 30 | 55 | Security+ covered OWASP; CPSA Domain H not started. |
| 5 | Scripting (Bash/Python) | 25 | 50 | Minimal current depth; needed for CPSA labs + OSCP. |
| 6 | DFIR & Logging | 20 | 55 | Grows with CySA+ (Sep 2026). Currently limited. |

### General Mode (new)

| # | Label | Current | Target (12mo) | Rationale |
|---|-------|---------|---------------|-----------|
| 1 | Leadership | 88 | 90 | WO1 ASM. 110 personnel. Peak — minimal growth room. |
| 2 | Engineering Governance | 88 | 88 | 1,700+ platforms, 4 regions, Air Assault formation. Peak, stable. |
| 3 | Quality & Audit | 75 | 88 | ISO 9001 Lead Auditor (2025); ISO 27001 Lead Implementer Oct–Dec 2026. |
| 4 | Process Transformation | 82 | 85 | Marketplace initiative (16 AA BCT → 1 Div pitch). LSS Green Belt 2026. |
| 5 | Defence Acquisition | 80 | 80 | DE&S 2019–22, sole military SME on Bulldog through-life support. Stable. |
| 6 | Operational Delivery | 85 | 85 | TELIC 09, HERRICK 13, RUMAN, SWIFT RESPONSE 22, TOTEMIC 100% availability. Peak. |

**Note on scale asymmetry:** Cyber values sit in 20–65 range; General sits in 75–90. This is deliberate and honest — Cyber is in-development, General is peak. The radar will visually reflect that gap.

---

## Technical Approach

### File touchpoints
- `index.html` — remove beta badge, JS Delivr link wrapper. Update toggle button text Code → General. Add `role="tablist"` / `role="tab"` / `aria-selected` attributes.
- `script.js` — rename `code` mode to `general`; new labels and values; refactor `buildRadar` to `updateRadar` (update datasets in place); add keyboard nav on toggles; add combined tooltip.
- `style.css` — chart wrapper larger; adjust font size for point labels; respect `prefers-reduced-motion`; remove `.link-wrapper` / `.link-style` (or leave unused if used elsewhere).

### Chart.js config changes
- `scales.r.suggestedMax`: 100 → 95 (fits peak General values; keeps room without wasted space)
- `scales.r.ticks.stepSize`: 20 → 25
- `scales.r.pointLabels.font.size`: 8 → 11
- `scales.r.grid.color` / `angleLines.color`: use `getComputedStyle(...)` to read CSS vars (`--border-strong`, `--text-muted`)
- `options.animation.duration`: 600ms (or 0 if `prefers-reduced-motion`)
- Tooltip `mode`: `'index'` with `intersect: false` for combined current+target display

### Smooth transitions
Instead of `radarChart.destroy()` + `new Chart(...)`, update `chart.data.labels` and `chart.data.datasets[*].data` in place, then call `chart.update()`. Chart.js animates the transition natively.

### Accessibility
- `.toggle-row` → `role="tablist"`
- `.toggle-button` → `role="tab"`, `aria-selected="true|false"`, `tabindex="0|-1"` (roving tabindex)
- Arrow Left/Right on focused tab switches mode
- Canvas: add `aria-label` describing current mode

---

## Verification

Before commit:
1. Open `index.html` in browser — confirm chart renders.
2. Click Cyber / General buttons — confirm smooth transition, correct labels + data.
3. Tab to toggle buttons, use Arrow keys — confirm keyboard nav works.
4. Resize window down to 600px — confirm responsive behaviour holds.
5. DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` — confirm animations disabled.
6. Screen reader quick check — confirm toggle state announced.

## Commit & Push

Single commit on success:
> `Rework skills radar: General mode replaces Code, smooth transitions, a11y, larger readable chart`

Push to `origin/main`.

---

## Content Audit Pass (Active — 2026-04-10)

First of the six overhaul passes defined in `CLAUDE.md`. Scope: fix factual inaccuracies, typos, stale references, and weak positioning in the existing page content. No structural HTML / CSS / JS changes.

### Issues identified

1. **Hero subtitle — factually wrong.** Says "Senior Engineering Officer with HM Armed Forces". Rob is a Warrant Officer Class 1 (non-commissioned, not commissioned). Must be corrected.
2. **Skills paragraph — stale.** Still references "Code" mode after the radar was reworked to "General".
3. **About section — multiple typos + stale numbers.** "20+ years" (actually 24), "outsode" → "outside", "fundemental" → "fundamental", "Consistancy" → "Consistency", "KSE" jargon unexplained.
4. **About section — qualifications stale.** Missing Lean Six Sigma Green Belt. CPSA no longer "in progress" — it is booked for 25 July 2026.
5. **Contact positioning — undersells.** "Junior cyber roles, SOC work" significantly undersells a WO1 with SC clearance and 24 years of engineering leadership. Should position for security consulting and defence-sector roles.
6. **Qualifications card — stale.** Same as #4.
7. **No `<meta name="description">`.** Missing for SEO and social previews.

### Verification

- Refresh `index.html` in browser.
- Read all visible copy through top to bottom — confirm no typos remain.
- View page source — confirm meta description present.
- Switch themes — copy should be legible in both.

### Commit

Commit this pass together with the Structure & Responsive Pass below, since both touch `index.html` and Rob wants a single reviewable state.

---

## Structure & Responsive Pass (Active — 2026-04-10)

Triggered by the content audit review. Scope: reorder the page, move the radar out of the hero, size the radar properly, and modernise responsive scaling.

### Issues identified

1. **Semantic mess in hero.** The Skills `<section>` is nested inside `.hero-actions > div`, which is semantically wrong. Sections should not live inside button rows.
2. **Section order.** Skills (inside hero) appears before About. About should come first — the reader meets the person before seeing the skills data.
3. **Radar cramped.** Card max-width 440px, chart 400×400. Cramped because it's forced into a two-column hero layout sharing space with text.
4. **"Overview" is the wrong heading.** The section contains six forward-looking cards — placeholders for future pages. "Overview" doesn't describe the intent.
5. **Responsive scaling is partial.** Hero `h1` uses `clamp()` but section `h2`, padding, and spacing are fixed. Chart wrapper uses fixed pixel sizes instead of `aspect-ratio`. Toggle button touch target ~28px — below WCAG AA 44×44 recommendation.

### Changes

**HTML (`index.html`)**
- Strip `<section id="skills">` out of `.hero-actions`.
- Remove `.hero-chart` and its contents from the hero section.
- Hero becomes text-only: eyebrow, h1, subtitle, focus, CTAs.
- New dedicated `<section id="skills" class="section">` after About, containing the skills intro paragraph and the radar card at full width.
- Rename the six-cards section: `id="projects"` → `id="building"`, `<h2>Overview</h2>` → `<h2>Building</h2>`.
- Update nav link `<a href="#projects">Projects</a>` → `<a href="#building">Building</a>`.

**CSS (`style.css`)**
- `.hero`: remove flex layout, become single-column block with fluid vertical padding.
- `.hero-text`: drop `flex: 1.1`, keep `max-width: 640px` for readable line length.
- Delete `.hero-chart` rules (no longer used).
- `.pixel-card`: `max-width: 440px` → `max-width: 640px`.
- `.chart-wrapper`: `max-width: 400px; height: 400px` → `max-width: 560px; width: 100%; aspect-ratio: 1 / 1; height: auto`. Industry-standard fluid square.
- `.toggle-button`: bump padding to ~44px touch target.
- `.section h2`: fluid with `clamp(1.4rem, 1.6vw + 0.9rem, 1.9rem)` and slightly larger baseline for better hierarchy.
- `.section`: fluid vertical padding with `clamp()`.
- Remove `.section1` block — unused after the section is removed from the hero.
- Remove `.card-badge` block — unused since the beta badge was removed.
- Remove `.hero-chart` from the `@media (max-width: 900px)` responsive rules.

### Rationale for "Building"

Echoes the hero tagline `Core-Loop: Learn · Build · Deploy`. Honest about the current state (the cards point at work-in-progress areas). Alternatives considered: "In Progress" (honest but flat), "What's Next" (forward-looking), "Focus" (ties to Focus/Discipline/Consistency theme).

### Verification

- Refresh `index.html` in browser.
- Confirm new page order: Hero → About → Skills (big radar) → Building → Contact.
- Confirm "Overview" no longer appears; heading reads "Building".
- Confirm nav link "Projects" is now "Building" and scrolls to the correct section.
- Confirm radar is larger and square at all viewport widths.
- Test at 1024, 768, 600, 375 widths — layout holds, no horizontal scroll, no clipping.
- Tab through the page — no orphaned focus states, toggle buttons keyboard-reachable with correct touch size.
- Switch themes — layout holds in both.

### Commit

Single combined commit covering both passes:
> `Content audit and page restructure — correct rank, update quals, bigger radar, reorder sections`

---

## Roadmap (Not This Session)

- TryHackMe-style expansion: 4 career paths × 4 experience levels (Foundational / Security Analyst / Penetration Tester / Security Engineer × Entry / Junior / Mid / Senior). Adds a level dropdown overlaying a reference polygon for each level's expected skill profile. Significantly larger data model and UI work.
- New pages: Qualifications, Projects, Write-ups, Blog, Roadmap, Resources (see `CLAUDE.md` → Vision).
