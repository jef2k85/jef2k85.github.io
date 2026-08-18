## 1. Test tooling (local-only)

- [x] 1.1 Add `package.json` with Vitest + jsdom as devDependencies and a `test` script
- [x] 1.2 Add `vitest.config.js` configured for the jsdom environment
- [x] 1.3 Add `node_modules/` to `.gitignore`

## 2. Weather logic (TDD: `assets/js/weather.js`)

- [x] 2.1 Write failing tests for `describeWeatherCode` (WMO code → text lookup, e.g. `0` → "Clear sky"; unmapped code → `null`), then implement
- [x] 2.2 Write failing tests for `parseCurrentWeather` (extracts `current_weather.temperature` + mapped description from a well-formed response; returns `null` on missing fields, wrong types, or unmapped weathercode), then implement
- [x] 2.3 Write failing tests for `buildForecastUrl` (returns the Open-Meteo URL with hardcoded Vancouver, BC coordinates, no API key/token in the URL), then implement
- [x] 2.4 Write failing tests for `renderWeather` (given a container element + parsed data, sets text with temperature and description; given `null` data, leaves/clears the container with no error text), then implement
- [x] 2.5 Write failing tests for `loadWeather` (orchestrates fetch → parse → render using an injected fetch function; on fetch rejection, non-OK response, or parse failure, resolves without throwing and leaves the container untouched/empty), then implement

## 3. Markup

- [x] 3.1 Add a weather widget placeholder element to the hero section in `index.html`, near the existing location line
- [x] 3.2 Give the placeholder a stable id/hook for the script to target and leave it empty by default (so silent-failure is the natural default state)
- [x] 3.3 Wire up `loadWeather` via `<script type="module">` importing `assets/js/weather.js`, targeting the placeholder

## 4. Styling

- [x] 4.1 Add CSS rules for the widget in `assets/css/style.css` reusing existing custom properties (`--accent`, `--muted`, `--card-bg`, `--border`)
- [x] 4.2 Verify the widget's appearance is visually consistent with the rest of the hero section (spacing, font, colour)

## 5. Verification

- [x] 5.1 Run `npm test` and confirm all Vitest tests pass
- [x] 5.2 Load the page locally and confirm the widget shows current Vancouver temperature and conditions
- [x] 5.3 Simulate a failed/blocked request and confirm the page shows no error state, placeholder text, or broken UI
- [x] 5.4 Confirm no API key, token, or credential appears anywhere in the added code
- [x] 5.5 Confirm no geolocation permission prompt appears on page load
