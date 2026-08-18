## Why

This repository shipped its first working skeleton (a Jekyll-based personal profile page hosted on
GitHub Pages, plus a Docker-based local preview script) without any OpenSpec specs. OpenSpec is now
being instituted here, so the already-shipped behavior needs to be documented as the baseline before
any future change can be proposed as a diff against it.

## What Changes

- Document the published profile page as a new capability: page structure/sections, the resume PDF
  as source of truth for content consistency, contact links, and responsive styling.
- Document the local preview tooling as a new capability: Docker-based Jekyll build/serve script.
- No code changes — this is a documentation-only baseline (retrofit specs for already-shipped
  behavior, per the reconciling-spec-drift skill's retrofit-gap handling).

## Capabilities

### New Capabilities
- `profile-page`: The published static site at jef2k85.github.io — page sections (header/contact
  links, summary, experience, skills, education/certifications), the requirement that
  `assets/JeffryMa_Resume.pdf` is the source of truth for content consistency between the PDF and
  the site, and responsive/minimalist styling.
- `local-preview`: The `preview.sh` script that builds and serves the Jekyll site locally via Docker
  (matching the GitHub Pages build environment) for the site owner to review changes before pushing.

### Modified Capabilities
(none — no existing specs)

## Impact

- Affected paths (read-only, for spec derivation): `index.html`, `_layouts/default.html`,
  `assets/css/style.css`, `assets/JeffryMa_Resume.pdf`, `_config.yml`, `Gemfile`, `preview.sh`.
- No runtime/code changes. Adds `openspec/specs/profile-page/spec.md` and
  `openspec/specs/local-preview/spec.md` once this change is archived.
