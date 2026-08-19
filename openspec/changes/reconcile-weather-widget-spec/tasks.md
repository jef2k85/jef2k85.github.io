## 1. Pre-flight re-verify

- [ ] 1.1 Re-check `assets/js/weather.js` still hardcodes Vancouver, BC coordinates, uses
  Open-Meteo `current_weather=true` only (no forecast params), and returns without rendering on
  fetch failure / non-ok response / unparseable data (weather.js:57-87 at audit time).
- [ ] 1.2 Re-check `index.html` still wires `#weather-widget` into `loadWeather()` inside the
  `.hero` header, alongside the name/title/location/links content already covered by the
  existing `profile-page` header requirement (index.html:11,36-39 at audit time).

## 2. Review

- [ ] 2.1 Confirm the new `### Requirement:` header in `specs/profile-page/spec.md` doesn't
  collide with or restate the existing "Header identifies the site owner..." requirement — they
  should read as independent, additive requirements.
- [ ] 2.2 Confirm both new scenarios have exactly four `####` hashtags.
- [ ] 2.3 Open the PR for review.

## 3. Follow-up tracking (not part of this change)

- [ ] 3.1 Decide whether JS unit-test conventions (`package.json`, `vitest.config.js`,
  `*.test.js` pattern introduced alongside the weather widget) warrant their own OpenSpec
  capability/spec, or should stay undocumented tooling. No prior spec covered this, so it is a
  gap to decide on, not something this change should silently spec as intended.

## 4. Promotion

- [ ] 4.1 After merge, run `/opsx:sync` (or archive this change) to fold the `profile-page` delta
  into `openspec/specs/profile-page/spec.md`, then archive the change.
