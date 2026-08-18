## Why

The site currently ships a hand-authored PDF (`assets/JeffryMa_Resume.pdf`) as the professional-history source of truth, while `index.html` hand-duplicates most of that same content (Experience, Skills, Education) for the web. The `profile-page` spec already documents this as an unenforced compliance gap — nothing keeps the PDF and the page in sync. Maintaining a binary PDF is also just tedious to edit compared to text. Splitting the resume into its own Markdown/data-backed page removes the PDF entirely, makes editing trivial, and gives the landing page room to be a distinct front door (with content a resume shouldn't carry, like hobbies or side projects) instead of a mirror of the resume.

## What Changes

- Remove `assets/JeffryMa_Resume.pdf` from the site. **BREAKING**: the "Download Resume" link on the landing page no longer serves a PDF file.
- Add a new resume page at `/resume/`, authored in Markdown (or lightweight structured data, per design.md), rendered through its own dedicated layout distinct from the landing page's theme.
- Add a print stylesheet (`@media print`) for the resume page so browser Print/Save-as-PDF produces a clean, resume-formatted printout — plus a "Print / Save as PDF" button (`window.print()`) replacing the old PDF download link.
- Shrink the landing page (`index.html`/`index.md`) down from a full resume mirror to a shorter personal front page: hero, short summary/highlights, links, and room for non-resume content (hobbies, side projects). Its "Download Resume" link now points to `/resume/` instead of the PDF asset.
- Establish the new resume page as the source of truth for professional-history facts. Where landing-page content overlaps with the resume (years of experience, current role, etc.), it must stay factually consistent with the resume — not necessarily identical wording. The landing page may include content the resume doesn't (hobbies, projects); the resume may include detail the landing page doesn't. No CI/build pipeline enforces this — it remains a manually/AI-reviewed authoring discipline.

## Capabilities

### New Capabilities
- `resume-page`: The dedicated `/resume/` page — its Markdown/data-backed content, its own layout/theme, its print stylesheet and print CTA, its role as source of truth for overlapping facts, and the site-wide contact-detail and responsiveness rules as they apply to this page.

### Modified Capabilities
- `profile-page`: Narrows scope to the landing page only — removes the full Experience/Skills/Education sections and the "Resume PDF is the source of truth" requirement (and its unenforced-compliance-gap scenario), replaces the resume link target with `/resume/`, and adds room for landing-page-only content (hobbies, side projects) plus the "must stay consistent with the resume page where overlapping" rule. The existing no-contact-details and responsive-layout requirements carry over unchanged in spirit but are re-scoped to the landing page.

## Impact

- Deletes `assets/JeffryMa_Resume.pdf`.
- Adds `resume.md` (or equivalent data file) and a new `_layouts/resume.html` (or similar), plus a print stylesheet, likely under `assets/css/`.
- Rewrites `index.html`/`index.md` content and its resume link.
- Updates `openspec/specs/profile-page/spec.md` (delta) and adds `openspec/specs/resume-page/spec.md` (new).
- No CI/build changes; no new dependencies. Jekyll/kramdown already used, no plugins beyond the `github-pages` gem allowlist.
