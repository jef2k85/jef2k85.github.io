## Context

The site is a fully static Jekyll page hosted on GitHub Pages with no build-time secrets and no server component — anything shipped to the browser (including any API key) is public forever in the repo. The page currently has zero JavaScript anywhere. This change introduces the first client-side script and the first external runtime dependency (a third-party API call at page load). The primary purpose of this change is to serve as a demo of the OpenSpec workflow, so the feature is intentionally small in scope.

## Goals / Non-Goals

**Goals:**
- Show live current weather for Vancouver, BC on the landing page with zero signup and zero API key.
- Match the existing visual design (colours, spacing, typography) rather than importing a third-party widget's UI.
- Keep the implementation small enough to be a clean OpenSpec demo (one capability, few requirements).

**Non-Goals:**
- No forecast (multi-day or hourly) — current conditions only.
- No user-supplied location or geolocation prompt — Vancouver is hardcoded.
- No visible error/loading UI — failures are silent (widget simply doesn't render).
- No build step, bundler, or dependency manager — plain `<script>`, no npm.
- No caching, retry logic, or offline support.

## Decisions

- **Data source: Open-Meteo** (`https://api.open-meteo.com/v1/forecast`). Chosen over OpenWeatherMap/WeatherAPI because it requires no API key or account — the only option that satisfies the "zero signup" constraint without also being a foreign-styled iframe embed. Alternatives considered: OpenWeatherMap (needs a key, which would be public in this repo), weatherwidget.io-style iframe embeds (zero key, but foreign UI that doesn't match the page's CSS and has nothing worth speccing), wttr.in (no key, but a community project with no reliability guarantee and limited styling control).
- **Location: hardcoded coordinates** for Vancouver, BC, passed directly in the API request URL. Avoids a geolocation permission prompt, which is unnecessary complexity/friction for a personal page with one fixed location in its header already.
- **Rendering: vanilla JS, no framework.** A single small `<script>` (inline in `index.html` or a new `assets/js/weather.js`) performs one `fetch()` on page load and injects the result into a placeholder element. No dependency manager or bundler is introduced, consistent with the rest of the site.
- **Placement: inside the hero section**, near the existing location line, since the widget is inherently tied to "Vancouver, BC, Canada" already shown there.
- **Failure mode: silent no-render.** If the fetch fails, times out, or returns unexpected data, the script leaves the placeholder empty (or removes it) rather than showing an error message or a stale cached value. This keeps the non-goal list honest (no caching/retry) and avoids a broken-looking UI state for a low-stakes demo feature.
- **Styling: new CSS rules added to `assets/css/style.css`**, reusing existing custom properties (`--accent`, `--muted`, `--card-bg`, `--border`) so the widget looks native rather than bolted on.
- **Condition text: local WMO weather-code lookup table.** Confirmed via a manual `curl` against `https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current_weather=true` that `current_weather=true` returns `temperature` directly but only a numeric `weathercode` (WMO code, e.g. `0` for clear sky) — no text description. The script needs a small hardcoded code→text map (e.g. `0` → "Clear sky", `61` → "Rain", etc., covering Open-Meteo's documented WMO code set) to satisfy the "short condition description" requirement, rather than relying on a field the API doesn't provide.

## Risks / Trade-offs

- [Open-Meteo has an outage or changes its response shape] → Silent failure means the widget just disappears; acceptable for a demo/personal page, not acceptable if this were a production feature relied upon by users.
- [No caching means every page load hits the API] → Traffic on a personal landing page is low; not a real concern at this scale.
- [Introducing the site's first JavaScript sets a precedent] → Scoped narrowly (one small script, one purpose) so it doesn't imply a broader move to a JS-heavy site.
- [Hardcoded coordinates become stale if the owner moves] → Low risk/cost to update; consistent with the header's location text already being hardcoded.
