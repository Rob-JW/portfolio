# Portfolio — Skills Matrix Rework

> **Read First:** Before acting on anything in this file, read and apply the global rules at:
> `My Drive/1-Projects/CLAUDE.md`
> All sessions are rooted in that file. Project-specific rules below extend — never override — the global rules.

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

## Roadmap (Not This Session)

- TryHackMe-style expansion: 4 career paths × 4 experience levels (Foundational / Security Analyst / Penetration Tester / Security Engineer × Entry / Junior / Mid / Senior). Adds a level dropdown overlaying a reference polygon for each level's expected skill profile. Significantly larger data model and UI work.
