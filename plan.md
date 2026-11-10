# Portfolio — Skills Matrix Rework

> **Read First:** Before acting on anything in this file, read and apply the global rules at:
> `My Drive/1-Projects/CLAUDE.md`
> All sessions are rooted in that file. Project-specific rules below extend — never override — the global rules.

---

## Outstanding — Updated 2026-05-02

**Status as of 2026-05-02 (pre-publish site refresh session):** Items 1, 3, 4, 5, 6 resolved. Item 2 partially resolved (roadmap populated; 4 placeholder sub-pages remain).

1. ~~Add personal link to contact methods~~ — **DONE 2026-05-02.** `https://robwilliams.link/` added as fourth contact icon (`fa-globe`, between GitHub and email) on index.html. Contact section rolled out to all 6 sub-pages with the same 4-icon list.
2. **Populate sub-page content.** Real content needed on `projects.html`, `backlog.html`, `write-ups.html`, `learning-resources.html`. *Roadmap.html populated 2026-05-02 with vertical zigzag certification path (8 stations, status-driven rails, hover/tap popups). Qualifications already has real content. 4 placeholder pages remain.*
3. ~~About section — reduce word count~~ — **DONE 2026-05-02.** Tightened to 2 sentences per paragraph. Rank corrected to include ASM. KSE framing, qualifications, and CPSA booking preserved.
4. ~~Hero button hover effect~~ — **DONE 2026-05-02.** Both `.btn.primary` and `.btn.ghost` now resolve to the same hover state — cyan fill (`var(--accent-2)`), `#022c22` text, `var(--shadow-pixel)` lift, `translateY(-1px)`. Consistent across both buttons.
5. ~~Reduce hero bottom padding~~ — **DONE 2026-05-02.** Padding split into 3-value shorthand; bottom halved to `clamp(0.75rem, 1.5vw + 0.25rem, 1.25rem)`. Top breathing room preserved.
6. ~~Increase hero-actions top padding~~ — **DONE 2026-05-02.** `margin-top: 1.75rem` (up from `1rem`).

### Also resolved this session
- New page: roadmap.html (vertical zigzag, status rails, popups, glow pulse)
- Cleanup: deleted unreferenced `assests.asci`, removed orphan `.section1` CSS selector
- Project CLAUDE.md file layout refreshed to reflect current sub-page count and add `qbank/` analogue (n/a here — that's CPSA project)

### Still outstanding (next session)
- Item 2 remainder: real content for `projects.html`, `backlog.html`, `write-ups.html`. *`learning-resources.html` partially populated 2026-05-13 with "Hands-on lab platforms" section (Vulnhub, TryHackMe, HackTheBox, Kali, UTM); three placeholder pages remain.*
- **Roadmap page polish** (flagged by Rob 2026-05-02 post-publish): "needs some work" — specifics TBD next session. Likely candidates worth raising: spacing/rhythm between cards, popup positioning on edge nodes, mobile single-column rail offset, in-progress glow intensity, contrast of dashed planned segments in light mode. Wait for Rob's specifics before changing anything.
- ~~Browser-side verification of 2026-05-13 changes~~ — **DONE 2026-05-27.** Rob confirmed all links work and scaling holds correctly across all aspect ratios. Pushed-before-verified gap now closed.
- **`script.js` ESLint cleanup** (2026-05-13): `/* global Chart */` directive added at top of `script.js` to declare the Chart.js CDN global and resolve `no-undef` under `eslint:recommended`. Runtime behaviour unchanged. Pattern is standard for declaring known externals — leave in place even if a formal lint config is added later.

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

## Site-Wide Mono Font Pass (Active — 2026-05-27)

Triggered by Rob 2026-05-27: "Change the font across the whole site to mono to look more like terminal text." Scope is intentionally everything — body, headings, nav, buttons, tables, cards. The terminal aesthetic only lands if it's consistent.

### Decisions

1. **Font stack:** System monospace — `ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, "Courier New", monospace`. Zero new CDN dependencies, native render on each OS, no FOUT (Flash of Unstyled Text). Honours project hard rule on minimal dependencies.
2. **Scope:** Apply at `html, body` so the change cascades to every element on every page. No per-page override needed.
3. **Logo and `code` blocks left as-is.** Both already use `"Courier New", Courier, monospace`. Leaving them gives the logo its distinct typewriter character against the slicker system mono in the body, and keeps inline `<code>` in the revision tables visually marked.

### File touchpoints

- `style.css` — single rule change at `html, body` (line ~62).

### Risks

- Monospace characters are wider than proportional → headings, nav labels, and button text may wrap differently. Need to check at multiple viewport widths.
- Chart.js point-labels currently inherit nothing automatically — they may still render in Helvetica unless `script.js` reads the body font into the chart config. Out of scope this pass — flag for follow-up if visually jarring.

### Verification

- Refresh all sub-pages in browser. Confirm font has switched everywhere.
- Tab through nav, buttons — confirm no overflow or wrap regressions.
- Both themes — confirm legibility holds in light and dark.
- Mobile (≤600px) — confirm no horizontal scroll introduced by wider mono characters.

### Commit

> `Switch site font to system monospace stack — terminal aesthetic`

---

## Roadmap Card Polish — Underline + Qualification Icons (Active — 2026-05-27)

Triggered by Rob 2026-05-27 after roadmap page review. Two related changes bundled together because both touch `.node-card` markup and styles.

### Decisions

1. **Underline animation:** Port the nav-header underline (`style.css:233-257`) onto `.node-card`. Layer it on top of the existing hover state (lift + soft fill + cyan border swap) — does not replace.
2. **Wipe direction mirrored.** Odd-numbered cards (left side, text-align: right) wipe from the right (`transform-origin: right`). Even-numbered cards (right side, text-align: left) wipe from the left (`transform-origin: left`). The underline starts at the same edge the text reads from.
3. **Qualification icons:** Add a Font Awesome icon inside each station card, beside the title. Status marker on the rail (check / bolt / circle / star) stays — it does the at-a-glance status job. Icon inside the card represents what was earned.
4. **Icon colour:** `--accent-2` (cyan) across the board. Status is conveyed by border + rail marker; icon represents the qualification itself, not its state.
5. **Icon placement:** Outer edge of each card (opposite the rail). Odd cards: icon on left, text on right. Even cards: text on left, icon on right. Visually balances the zigzag.

### Icon assignments

| # | Station | Font Awesome class | Rationale |
|---|---------|--------------------|-----------|
| 1 | ISO 9001 Lead Auditor | `fa-solid fa-clipboard-check` | Audit / QMS checklist |
| 2 | LEAN Six Sigma Green Belt | `fa-solid fa-chart-line` | Process improvement, statistical analysis |
| 3 | City & Guilds Graduateship | `fa-solid fa-graduation-cap` | Degree-equivalent academic qualification |
| 4 | CREST CPSA | `fa-solid fa-user-secret` | Penetration testing |
| 5 | ISO 27001 Lead Implementer | `fa-solid fa-lock` | Information security / ISMS |
| 6 | CompTIA CySA+ | `fa-solid fa-magnifying-glass-chart` | Threat hunting, log analysis |
| 7 | OSCP | `fa-solid fa-terminal` | CLI-heavy hands-on offensive sec |
| 8 | Endpoint (Consultant) | `fa-solid fa-star` (unchanged) | Destination marker, not a card |

### File touchpoints

- `style.css` — add `.node-card { display: flex; ... }`, `.node-card::after { ... }` underline pseudo, `.node-icon { ... }`, mirrored `transform-origin` and `flex-direction` rules for `:nth-child(odd|even)`.
- `roadmap.html` — wrap each station's title+meta in `<div class="node-text">`, prepend the icon `<i>` element. 7 station cards touched. Endpoint untouched.

### Verification

- Refresh `roadmap.html` in browser.
- Hover each card in turn — confirm underline wipes in from the correct edge per card position.
- Hover-out — confirm underline wipes out smoothly.
- Confirm new icons render beside each title, on the outer edge.
- Tab through the cards — confirm `:focus-visible` triggers the underline (need to wire the focus state).
- Both themes.
- Mobile (≤700px) — at this breakpoint cards collapse to a single column with the rail on the left. Underline direction should remain consistent (all wipe from left, since `text-align` resets to left).
- `prefers-reduced-motion` — confirm animation is disabled.

### Commits

Two logical commits:
1. `Add qualification icons to roadmap station cards`
2. `Port nav underline hover animation to roadmap cards`

### Follow-up refinement (2026-05-27, same session)

After initial implementation, Rob flagged two issues:

1. **Underline was always green.** Should reflect status — green (`--accent`) for achieved goals, blue (`--accent-2`) for everything still to be earned (in-progress + planned).
2. **Underline sat behind the card border**, making it hard to see. Decision: strip the card chrome entirely — no background, no border, no box-shadow. Hover state becomes underline-only, no lift, no fill, no border swap. Click-pulse `:active` rule removed too (it animated `box-shadow` back to `--shadow-pixel`, which would have re-introduced the pixel shadow on every click).
3. The marker-lift companion (`.node-card:hover ~ .node-marker`) was also removed for consistency with "leaving just the underline animation effect on hover."

Net result: each station card now reads as text + icon, with the wipe-in underline as the only hover affordance. Status is conveyed by:
- The rail marker on the central rail (check / bolt / circle / star)
- The underline colour (green for achieved, blue otherwise)
- The dashed marker border on planned stations

Folded into the same logical commit as the original hover-animation port — no separate commit.

---

## Full Site Review & Content Build (COMPLETE — 2026-07-06)

**Status:** All 7 phases delivered and pushed (`168ece1..fe66805`). Rob
reviewed rendered pages and approved push 2026-07-06. Audit finding of
note: the three DEV/LAB project folders were empty templates — projects.html
built honestly around this site as the one live project + a labelled
pipeline (see lessons.md L040). Placeholder pages eliminated: backlog
removed (merged to roadmap), projects and write-ups populated, index hub
renamed Overview, CPSA Revision surfaced to homepage card. Blog live with
three posts; source drafts in `1-Projects/Blog Posts/`.

**Remaining follow-ups (next session):**
- Verify live GitHub Pages deploy on a real mobile device (both themes)
- Font Awesome subset (parked on roadmap.html as a public backlog item)
- Next blog post cadence — draft after next milestone (CPSA exam 25 Jul)

Triggered by Rob 2026-07-06: complete review of the portfolio codebase across errors, modern front-end practice, visual design, UX, typography/icons, and end-user copy — plus blog content.

### Decisions agreed up front

1. **Blog home:** `write-ups.html` becomes **"Write-ups & Blog"**. No new pages. Blog posts drafted from recent session history / logs, OPSEC-filtered per L014, and **reviewed by Rob before anything is committed or pushed** (default-deny publication rule).
2. **Typography:** Hybrid. Monospace stays on headings, nav, labels, buttons, and code — terminal identity preserved. Body paragraphs move to a clean system sans-serif for long-form readability (About, blog, write-ups).
3. **Placeholders:** `projects.html` gets real content drafted from actual work (Network Scanner, Python Utilities, AD lab, this site). `backlog.html` merges into `roadmap.html` and is removed; nav updated everywhere.
4. **Blog Posts folder** in `1-Projects` is empty — all posts are fresh drafts.

### Phases (each verified before the next begins)

| # | Phase | Scope | Output |
|---|-------|-------|--------|
| 1 | **Audit** | Subagent review of all 8 pages + CSS + JS: errors, dead code, semantics, a11y, responsive, performance, copy | Findings report — Rob sees it before fixes start |
| 2 | **Fix pass** | Errors + code quality + a11y + modern-CSS corrections from audit | One commit per logical fix group |
| 3 | **Typography & visual pass** | Hybrid font stack, spacing rhythm, icon audit (Font Awesome relevance + trim), theme consistency | Commit |
| 4 | **Copy pass** | All visible wording rewritten from the visitor's point of view — interesting, scannable, exploration-inviting. UK English. Facts per L003/L014 | Commit |
| 5 | **Content build** | projects.html populated; backlog→roadmap merge + page removal; write-ups.html → Write-ups & Blog shell | Commit(s) |
| 6 | **Blog drafts** | 2–3 posts drafted from recent work (CPSA study journey, EDC method, building this site). OPSEC filter applied. **Rob reviews each before inclusion** | Draft → Rob approval → commit |
| 7 | **Final QA** | Browser verify: all pages, both themes, ≤600px viewport, keyboard nav, reduced-motion | Push to origin/main only after Rob's go |

### Hard gates

- Nothing pushed until Rob has reviewed the rendered result (L029 spirit: inspect before irreversible).
- No clearance references anywhere public (L014).
- No new dependencies without a recorded decision (project hard rule).

## Roadmap (Not This Session)

- TryHackMe-style expansion: 4 career paths × 4 experience levels (Foundational / Security Analyst / Penetration Tester / Security Engineer × Entry / Junior / Mid / Senior). Adds a level dropdown overlaying a reference polygon for each level's expected skill profile. Significantly larger data model and UI work.
- New pages: Qualifications, Projects, Write-ups, Blog, Roadmap, Resources (see `CLAUDE.md` → Vision).
- Chart.js radar labels: pass body `font-family` into chart config so radar labels switch to mono with the site. Deferred from the 2026-05-27 mono pass — only worth doing if the Helvetica default looks visually jarring against the rest of the page.
