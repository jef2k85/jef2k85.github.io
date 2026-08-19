## Why

The "Added Weather Widget" commit (27c4bca) shipped a live current-conditions widget in the
landing page header — new files `assets/js/weather.js`, `assets/js/weather.test.js`, plus
`package.json`/`vitest.config.js` for a JS test runner — without going through OpenSpec. The
`profile-page` spec's header requirement (written before this commit, in the
`establish-initial-specs` archive) documents only the name/title/location/links/theme-toggle
content of the header; it says nothing about the weather widget. This is a doc-only reconciliation:
no behavior changes, the spec is brought up to date with what already shipped.

## What Changes

- Add a requirement to the `profile-page` spec documenting that the header displays live current
  weather conditions for Vancouver, BC (via Open-Meteo, current-conditions only, no forecast),
  and that it renders nothing (not an error message) when the fetch fails or the response is
  unusable.
- No code changes. No new capability spec for the JS unit-test tooling itself (see Non-goals).

## Non-goals

- Not introducing a spec for JS unit-test conventions (`package.json`/`vitest.config.js`,
  `*.test.js` pattern). No such capability/spec existed before this commit either, so there is
  nothing to reconcile against — tracked as a follow-up decision, not fixed here.
- Not changing the widget's behavior (hardcoded Vancouver coordinates, silent failure, no API
  key). These are existing implementation choices, not bugs, and are simply being documented as
  they stand.
- Not touching `local-preview`, `resume-page`, or `dark-mode` specs — the weather widget does not
  affect Docker preview, the resume page, or the dark-mode toggle's documented behavior.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `profile-page`: add a requirement documenting the header's live weather widget (source, scope,
  and no-op-on-failure behavior).

## Impact

- Affected spec: `openspec/specs/profile-page/spec.md`.
- Affected code (already shipped, no changes needed): `assets/js/weather.js`, `index.html`,
  `assets/css/style.css` (`.weather-widget` rules).
