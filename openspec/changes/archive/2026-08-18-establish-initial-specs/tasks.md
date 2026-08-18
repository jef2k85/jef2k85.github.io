## 1. Pre-flight re-verify

- [x] 1.1 Re-check `profile-page` requirements against `index.html`, `_layouts/default.html`, and `assets/css/style.css` — confirm no edits landed since this change was drafted.
- [x] 1.2 Re-check the PDF-consistency requirement by re-diffing `assets/JeffryMa_Resume.pdf` content against `index.html` section by section (Summary, each role's dates/title, Education/Certifications).
- [x] 1.3 Re-check `local-preview` requirements against `preview.sh` and `.gitignore` — confirm no edits landed since this change was drafted.
- [x] 1.4 Extract text from `assets/JeffryMa_Resume.pdf` and scan `index.html` for email patterns (`@`), phone-number-like digit sequences, and street address/unit/postal-code text — confirm zero matches on both surfaces (city/region-level location such as "Vancouver, BC, Canada" is expected and compliant), per the "No personal contact details are published" requirement.

## 2. Review

- [x] 2.1 Confirm every `### Requirement:` in both delta specs has at least one `#### Scenario:` (exactly four hashtags).
- [x] 2.2 Confirm the PDF-consistency requirement's wording matches what the site owner asked for (source of truth = PDF, consistent but not necessarily identical wording, both directions).
- [x] 2.3 Run `openspec validate establish-initial-specs --strict` and resolve any reported issues.
- [x] 2.4 Open the PR (or, for solo repo-local work, get the site owner's sign-off) before archiving. (Sign-off: owner explicitly requested apply + archive + sync in one message.)

## 3. Follow-up tracking (not part of this change)

- [x] 3.1 Decide whether to add automated tooling (e.g., a CI check or script) that flags PDF/site content drift, since today the consistency requirement is enforced manually only. **Decision: defer.** Track as a separate future change if/when it becomes worth automating (e.g., a script that extracts PDF text and diffs key facts against `index.html`); not implemented as part of this documentation-only change.

## 4. Promotion

- [x] 4.1 After sign-off, run `openspec archive establish-initial-specs` to fold `specs/profile-page/spec.md` and `specs/local-preview/spec.md` into `openspec/specs/`.
- [x] 4.2 Confirm `openspec list --specs` shows both `profile-page` and `local-preview` after archiving.
