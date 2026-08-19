## Context

`assets/css/style.css` already centralizes colour as CSS custom properties on `:root` (`--accent`, `--text`, `--muted`, `--bg`, `--card-bg`, `--border`), and every rule in that file consumes those variables rather than hardcoded colours. `resume.css` does the opposite — colours are hardcoded hex values throughout, and the page is explicitly print-optimized (serif font, `@media print` rules). This asymmetry is why the landing page is a natural fit for a variable-swap dark theme and the resume page is explicitly excluded from this change.

There is no build step or bundler in this project (plain Jekyll + static assets), so any theme-switching script must be plain, dependency-free JS referenced directly from the layout.

## Goals / Non-Goals

**Goals:**
- Landing page (`index.html` via `_layouts/default.html`) supports a light and a dark palette, switchable at runtime.
- Default theme follows the visitor's OS `prefers-color-scheme` when no explicit choice has been made.
- A visible toggle button, placed beside the LinkedIn/Resume links in the hero header, lets the visitor override the OS default.
- The override persists across page loads/sessions via `localStorage`.
- No flash-of-wrong-theme on initial page load.

**Non-Goals:**
- The resume page (`resume.css`, `_layouts/resume.html`) is not themed and is unaffected by this change; it stays light/print-optimized regardless of the landing page's stored theme preference.
- No build tooling, CSS preprocessor, or JS framework is introduced.
- No animated theme-transition effects beyond default CSS property changes.

## Decisions

**Theme mechanism: `data-theme` attribute on `<html>` + CSS variable overrides**
`style.css` gains a `[data-theme="dark"] { --bg: ...; --text: ...; ... }` block (or `html[data-theme="dark"]`) that overrides the existing `:root` variable values. Every existing rule already reads from these variables, so no other selector in `style.css` needs to change.
- Alternative considered: swapping an entire second stylesheet via `<link>` href change — rejected, causes a visible reflow/flash and duplicates rules unnecessarily given the variables already exist.

**Default resolution order: stored preference → OS preference → light**
On load, an inline script in `_layouts/default.html`'s `<head>` (before the stylesheet or as early as possible) checks `localStorage.getItem('theme')`; if unset, it falls back to `window.matchMedia('(prefers-color-scheme: dark)')`. It sets `document.documentElement.setAttribute('data-theme', resolved)` synchronously before first paint.
- Alternative considered: CSS-only `@media (prefers-color-scheme: dark)` block with no JS — rejected because it cannot support a manual override button; a hybrid is needed regardless, so the attribute-based approach is used for both the auto and manual cases to keep one code path.

**Toggle button placement and behaviour**
The toggle is added as a fourth control inside `.links` in `index.html`, next to LinkedIn and the Resume link (per proposal). Clicking it flips `data-theme` between `light` and `dark`, writes the explicit choice to `localStorage.setItem('theme', ...)`, and updates its own label/icon/`aria-pressed` state to reflect the new theme.
- Alternative considered: fixed-position floating button — rejected per explicit user direction to place it beside the existing links.

**Palette values (Slate & Teal)**
```
--bg: #14181b       --card-bg: #1c2226     --text: #e8eaec
--muted: #9aa4ab     --border: #2c3338      --accent: #3ea6b0
```
Chosen to preserve the existing teal brand accent (brightened for dark-background contrast) rather than introducing a different hue family, minimizing visual disconnect between light and dark modes.

**Scope boundary enforcement**
`resume.css` and `_layouts/resume.html` are not touched by this change. The `data-theme` attribute is only ever set by the default layout's script; the resume layout does not include that script or reference the dark variables, so the resume page cannot inherit a dark theme even if a visitor has one set for the landing page (they are also on different layouts/documents, so there is no shared `<html>` element to leak state through).

## Risks / Trade-offs

- **Inline script in `<head>` blocks nothing visible but adds a small synchronous script before CSS load** → acceptable; it's a few lines and prevents the more visible problem (flash of wrong theme).
- **`localStorage` unavailable (privacy mode edge cases) throws on read/write** → wrap `localStorage` access in try/catch and silently fall back to OS-preference-only behaviour for that session.
- **Toggle button needs to be styled for both themes** → use the same CSS variables as other `.links a` controls so it inherits correct contrast automatically in both palettes.

## Open Questions

None outstanding — placement, default behaviour, and palette were confirmed in exploration prior to this proposal.
