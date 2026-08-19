## Context

The weather widget (`assets/js/weather.js`, wired into `index.html`'s header) shipped in commit
27c4bca without an OpenSpec change. `git log --follow -p` on `weather.js` shows a single creation
commit with no later edits, and the `profile-page` spec's header requirement predates that commit
(archived under `establish-initial-specs` the day before). So this is genuine drift — the spec was
accurate when written, the code changed after — not a retrofit gap.

## Goals / Non-Goals

**Goals:**
- Document the weather widget as an `ADDED Requirement` on the existing `profile-page` capability,
  matching what the shipped code actually does (source, scope, failure behavior).

**Non-Goals:**
- Not creating a separate `weather-widget` capability. The widget is presented inline in the page
  header alongside the other header content that `profile-page` already governs, and is small
  enough (one file, one DOM node) that a dedicated spec would just fragment the header's
  documentation across two files.
- Not specifying JS test-tooling conventions (`package.json`, `vitest.config.js`) — no prior
  capability covered this, so it isn't drift; tracked as a follow-up in tasks.md.

## Decisions

- **Delta granularity**: `ADDED Requirements` under `profile-page`, not `MODIFIED`. The existing
  header requirement ("identifies the site owner and provides contact/resume links") is still
  fully true; the widget is an additional, independent piece of header content, not a change to
  that requirement's meaning.
- **Requirement scope**: cover source (Open-Meteo, Vancouver BC, current conditions only, no
  forecast), and the no-op-on-failure behavior (silent — no error message shown), since both are
  observable behaviors a future contributor could otherwise change without noticing they were
  intentional.

## Risks / Trade-offs

- [Code may have moved since the audit] → tasks.md includes a pre-flight re-verify step against
  the current `weather.js`/`index.html` before merge.
