## Why

The landing page is a good vehicle for demonstrating the OpenSpec workflow end-to-end, and a small, self-contained weather widget gives that demo just enough real shape (a data source decision, a display requirement, a failure mode, an explicit scope boundary) to be worth speccing, without requiring any signup or API key — a hard constraint since this is a fully static site on GitHub Pages where any embedded key would be public.

## What Changes

- Add a small current-conditions weather display to the landing page (`index.html`), sourced from Open-Meteo (no API key required).
- Location is a hardcoded Vancouver, BC coordinate — no geolocation prompt, no user input.
- Display is current conditions only (e.g., temperature and a short condition description) — no forecast.
- Widget is styled to match the existing page's CSS system (`assets/css/style.css`), not a third-party embed/iframe.
- If the API is unreachable or returns an error, the widget fails silently (renders nothing) rather than showing an error state or stale/cached data.
- This is the first client-side JavaScript introduced anywhere on the site.

## Capabilities

### New Capabilities
- `weather-widget`: Displays current weather conditions for Vancouver, BC on the landing page, fetched client-side from a no-key API, styled to match the site, with silent failure on error.

### Modified Capabilities
(none — this is additive content on the landing page and does not change any existing profile-page requirement)

## Impact

- `index.html`: adds a weather widget element and a small inline or linked `<script>` (first JS on the site).
- `assets/css/style.css` (or a new small stylesheet): adds styling for the widget to match existing design tokens (`--accent`, `--muted`, `--card-bg`, etc.).
- External dependency: Open-Meteo public API (no auth, CORS-enabled) called client-side at page load.
- No build pipeline, backend, or secrets involved.
