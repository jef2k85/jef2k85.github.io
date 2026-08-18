## Context

The site is a single-page Jekyll site on GitHub Pages (static hosting only — no custom server code, and Jekyll plugins limited to the `github-pages` gem allowlist). Today `assets/JeffryMa_Resume.pdf` is a hand-authored binary treated as the source of truth, while `index.html` duplicates most of the same Experience/Skills/Education content by hand with no automated consistency check (`openspec/specs/profile-page/spec.md`, "Resume PDF is the source of truth" requirement). The owner wants two genuinely distinct pages — a landing page and a resume page — both editable as text, with the resume page becoming the new source of truth, and no CI/build pipeline of any kind (per explicit instruction).

## Goals / Non-Goals

**Goals:**
- Eliminate the binary PDF as an artifact to hand-maintain.
- Make the resume content easy to hand-edit as plain text.
- Give the resume page a dedicated print stylesheet so browser Print/Save-as-PDF produces a clean printed résumé.
- Keep the landing page and resume page visually and structurally independent (different layouts/themes), sharing only the constraint that overlapping facts must agree.

**Non-Goals:**
- No CI/build step, no generated PDF file, no automated consistency-checking pipeline between the two pages.
- No dynamic/server-rendered "PDF on demand" — GitHub Pages cannot execute server code at request time; the print button relies entirely on the visitor's browser print dialog.
- Not attempting pixel-perfect replication of the old PDF's exact layout — the print stylesheet targets "clean and professional," not a specific existing template.

## Decisions

### 1. Resume content is authored as plain Markdown, not YAML/JSON data
`resume.md` will use a light, consistent heading convention that kramdown (the site's existing Markdown processor, per `_config.yml`) turns into predictable, styleable HTML:

```markdown
### Amazon Canada — Software Development Manager
*March 2022 – Present*

- Leading a team of 7 SDEs...
- Drove an 87% reduction...
```

Kramdown emits `<h3>`, a `<p><em>...</em></p>` immediately following it (a standalone italic line becomes its own paragraph), and a `<ul>` — enough hooks for CSS to style the dates line via an adjacent-sibling selector (`h3 + p`), without needing a templating loop. This was chosen over a `_data/resume.yml` (structured front-matter/data file rendered by a Liquid loop) because the owner explicitly prioritized editing ease ("if my goals can be achieved by markdown, we can use it") and a structured-data + Liquid-loop layout is more machinery than a one-owner, hand-edited site needs. If a future need arises for stricter structural validation or reuse across more than two pages, revisit with `_data/resume.yml`.

**Alternative considered**: `_data/resume.yml` with arrays of roles/bullets, looped by `_layouts/resume.html`. Rejected for now — more setup for a single consumer page, and Markdown-first was the stated preference.

### 2. Two independent layouts, no shared partial required
`_layouts/default.html` continues to serve the landing page (`index.md` — renamed from `.html` to `.md` for consistency, kramdown will process the front-matter-having Markdown file the same way). A new `_layouts/resume.html` serves `resume.md`. They intentionally do not share a header/nav partial — the proposal explicitly allows different themes. Both still use `assets/css/style.css` as a base include, but `_layouts/resume.html` adds its own stylesheet (e.g., `assets/css/resume.css`) scoped to the resume page only, containing both its screen styles and its `@media print` rules.

**Alternative considered**: one shared layout with a `page.type` flag branching internal markup. Rejected — adds conditional complexity to chase "shared" that the requirements don't actually call for, and forecloses the "need not follow the same format/theme" flexibility.

### 3. Print stylesheet lives with the resume layout, not globally
`@media print` rules go in `assets/css/resume.css`, scoped by wrapping the resume page's markup in a container class (e.g. `.resume-page`) so print rules can't leak onto the landing page and vice versa. Print rules: hide the print button itself, hide any nav/decorative chrome, set print-friendly margins/font sizes, and use `page-break-inside: avoid` on each role block so entries don't split awkwardly across pages.

### 4. Print CTA replaces the PDF download link
The resume page includes a button:
```html
<button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
```
This is the only mechanism for producing a PDF — genuinely on-demand (visitor-triggered), but browser-rendered rather than server-generated, which is the only option available on static GitHub Pages hosting.

### 5. URL and file layout
`resume.md` at the repo root with `permalink: /resume/` in its front matter (front matter also sets `layout: resume`, `title: ...`). This keeps the URL clean without needing a `resume/index.md` subdirectory, consistent with Jekyll convention.

### 6. Landing page scope reduction
`index.html`/`index.md` keeps: hero (name/title/location/links), a short summary/highlights section, and new room for non-resume content (hobbies/side projects) the owner may add later — this proposal doesn't invent that content, just makes room in the spec/structure for it. The full Experience/Skills/Education sections move to `resume.md`. The "Download Resume" link becomes a link to `/resume/` (wording may change to e.g. "View Resume").

### 7. Spec split: `resume-page` (new) vs `profile-page` (narrowed)
Matches the proposal. `profile-page`'s PDF-source-of-truth requirement and its full-content-sections requirement are replaced; a new `resume-page` spec owns the resume's existence, content rules, print behavior, and its role as source of truth. Site-wide rules (no contact details, responsive down to 390px) are duplicated as page-scoped requirements in both specs rather than factored into a third "shared" capability — two capabilities is simpler than three for a two-page site, and OpenSpec deltas apply per-file anyway.

## Risks / Trade-offs

- **[Risk]** Kramdown's default HTML output for headings/emphasis could change or vary if `_config.yml`'s markdown settings change later, breaking the CSS hooks. → **Mitigation**: keep the heading convention documented in a comment at the top of `resume.md`, and note in the spec that the convention (not just the rendered look) is part of the contract.
- **[Risk]** Manually keeping the landing page and resume page factually consistent with no CI gate can drift over time. → **Mitigation**: explicitly accepted by the owner; the `reconciling-spec-drift` skill remains available for on-demand AI-assisted audits.
- **[Risk]** Browser print output varies slightly across browsers (margins, font rendering). → **Mitigation**: acceptable given no PDF pipeline was wanted; keep print CSS conservative (standard fonts, generous margins) to minimize variance.

## Migration Plan

1. Add `resume.md` (new content, moved/expanded from current `index.html` sections) + `_layouts/resume.html` + `assets/css/resume.css`.
2. Rewrite `index.html` (or convert to `index.md`) to the narrowed landing-page content; update its resume link.
3. Delete `assets/JeffryMa_Resume.pdf`.
4. Update `openspec/specs/profile-page/spec.md` via the delta in this change; add `openspec/specs/resume-page/spec.md`.
5. No rollback tooling needed beyond git revert — purely static content changes.

## Open Questions

None outstanding — remaining decisions (Markdown vs. data, print CTA, PDF/spec cleanup) were resolved with the owner during exploration.
