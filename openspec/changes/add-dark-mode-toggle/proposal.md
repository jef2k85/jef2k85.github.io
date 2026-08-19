## Why

The landing page is light-only, which is uncomfortable for visitors browsing in low light and out of step with visitor OS preferences. Adding a dark theme with a manual toggle lets the site respect visitor preference by default while still giving them control.

## What Changes

- Add a dark colour palette (Slate & Teal) for the landing page, expressed as a second set of CSS custom property values that override `style.css`'s existing `:root` variables.
- Add a theme toggle button in the hero header, positioned beside the LinkedIn/Resume links.
- Theme selection is driven by a `data-theme` attribute on `<html>`:
  - Default (no stored preference): follow the visitor's OS `prefers-color-scheme`.
  - Manual toggle click: overrides OS preference and persists the choice in `localStorage`.
- Add a small inline script in `<head>` that applies the resolved theme before first paint, to avoid a flash of the wrong theme.
- The resume page (`resume.css`, `resume.html` layout) is explicitly **out of scope** — it remains light-only and print-optimized regardless of the landing page's theme state.

## Capabilities

### New Capabilities
- `dark-mode`: Theme resolution (OS preference vs. stored override), the dark colour palette, the toggle control's behaviour, persistence, and no-flash application on load — scoped to the landing page only.

### Modified Capabilities
- `profile-page`: The header now includes a theme toggle control alongside the existing LinkedIn and Resume links.

## Impact

- `assets/css/style.css`: add dark palette variable overrides (e.g. via `[data-theme="dark"]` selector and/or `prefers-color-scheme` media query), no structural changes to existing light values.
- `_layouts/default.html`: add inline no-flash theme-resolution script in `<head>`.
- `index.html`: add toggle button markup in `.links` beside the LinkedIn/Resume links.
- New small JS: theme resolution + toggle click handler + `localStorage` persistence (no build step available, so plain inline/external script).
- No impact to `resume.css`, `_layouts/resume.html`, or any resume content.
