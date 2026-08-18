## 1. Resume page content and layout

- [x] 1.1 Create `resume.md` with front matter (`layout: resume`, `permalink: /resume/`, `title: ...`) and the full Summary, Experience, Skills, and Education & Certifications content, using the heading convention from design.md (`### Company — Title`, `*Dates*`, bullet list)
- [x] 1.2 Create `_layouts/resume.html` rendering the resume content with its own theme (distinct from `_layouts/default.html`), wrapping content in a `.resume-page` container and including the "Print / Save as PDF" button (`onclick="window.print()"`)
- [x] 1.3 Create `assets/css/resume.css` with screen styles for the resume layout (company/dates row via `h3 + em` or similar), scoped under `.resume-page`
- [x] 1.4 Add `@media print` rules to `assets/css/resume.css`: hide the print button and any nav chrome, set print-friendly margins/fonts, and avoid awkward page breaks within a role entry (`page-break-inside: avoid`)
- [x] 1.5 Link `assets/css/resume.css` from `_layouts/resume.html`

## 2. Landing page reduction

- [x] 2.1 Rewrite `index.html` (or convert to `index.md`) to keep only the hero and a short summary/highlights section, removing the full Experience/Skills/Education sections
- [x] 2.2 Update the header's resume link to point to `/resume/` instead of `assets/JeffryMa_Resume.pdf`, and update its label if needed (e.g., "View Resume")
- [x] 2.3 Verify the landing page's remaining facts (years of experience, current role, etc.) are consistent with what `resume.md` states

## 3. Cleanup

- [x] 3.1 Delete `assets/JeffryMa_Resume.pdf`
- [x] 3.2 Search the repo for any other reference to `assets/JeffryMa_Resume.pdf` and update/remove them

## 4. Verification

- [x] 4.1 Run the site locally (`bundle exec jekyll serve` or `preview.sh`) and confirm `/` renders the landing page and `/resume/` renders the resume page
- [x] 4.2 Use the browser's print preview on `/resume/` to confirm nav/print-button are hidden and the layout is clean and paginated sensibly
- [x] 4.3 Check both pages at a 390px viewport width for horizontal overflow, per the responsive requirements in both specs
- [x] 4.4 Confirm neither page contains an email address, phone number, or street/unit/postal address
- [x] 4.5 Run an AI-assisted consistency check (e.g., via the reconciling-spec-drift skill) comparing landing page and resume page overlapping facts
