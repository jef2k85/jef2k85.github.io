# resume-page Specification

## Purpose
TBD - created by change markdown-backed-resume-page. Update Purpose after archive.

## Requirements

### Requirement: Resume page exists as a dedicated, Markdown-backed page at /resume/
The site SHALL provide a resume page at the `/resume/` URL, authored as Markdown content (`resume.md`) rendered through its own dedicated layout, distinct from the landing page's layout/theme. The resume page's layout and visual design are NOT required to match the landing page's layout or theme.

#### Scenario: Visitor navigates to the resume page
- **WHEN** a visitor navigates to `/resume/`
- **THEN** they see a resume page rendered from Markdown content, using a layout and visual theme independent of the landing page

### Requirement: Resume page presents comprehensive professional history
The resume page SHALL present, in order, a Summary, an Experience section listing roles in reverse-chronological order (most recent first, each with company, dates, title, and highlight bullets), a Skills section grouped by category, and an Education & Certifications section. The resume page MAY include more detail in any of these sections than the landing page shows.

#### Scenario: Visitor scans the resume page
- **WHEN** a visitor scrolls through the resume page
- **THEN** they encounter, in order: Summary, Experience (roles newest to oldest, each with company, dates, title, and highlight bullets), Skills (grouped into categories), and Education & Certifications

### Requirement: Resume page is the source of truth for overlapping facts
For any professional-history fact that appears on both the resume page and the landing page (e.g., a role's dates, title, company, or years of experience), the resume page's statement SHALL be treated as authoritative; the landing page SHALL NOT state that fact in a way that contradicts the resume page. There is no automated (CI/build) enforcement of this — it is verified through manual authoring discipline or on-demand AI-assisted review (e.g., via the reconciling-spec-drift skill).

#### Scenario: A role's dates appear on both pages
- **WHEN** the resume page states a role's start and end dates
- **THEN** the landing page's mention of that same role (if any) SHALL state the same dates, not necessarily in identical wording

#### Scenario: No automated consistency gate exists
- **WHEN** the resume page or the landing page is updated
- **THEN** no CI/build pipeline blocks the change on cross-page consistency; enforcement relies on manual review or on-demand AI-assisted audits only

### Requirement: Resume page provides a print-optimized view and a print CTA
The resume page SHALL include a dedicated print stylesheet (`@media print` rules) that produces a clean, print-formatted layout — free of navigation chrome and the print button itself — when the page is printed or saved as PDF via the browser. The resume page SHALL include a visible "Print / Save as PDF" control that invokes the browser's print function.

#### Scenario: Visitor prints the resume page
- **WHEN** a visitor prints the resume page or saves it as a PDF via the browser's print dialog
- **THEN** the output omits navigation chrome and the print button, and presents the resume content in a clean, print-formatted layout

#### Scenario: Visitor uses the print CTA
- **WHEN** a visitor clicks the "Print / Save as PDF" control on the resume page
- **THEN** the browser's print dialog opens, showing the print-optimized layout

### Requirement: No personal contact details are published on the resume page
At no time SHALL the resume page contain an email address, a phone number, or a physical/mailing address (street address, unit/suite number, or postal/zip code), in any section, link, or embedded metadata; contact SHALL be routed through the LinkedIn link only. City/region-level location (e.g., "Vancouver, BC, Canada") is NOT a physical/mailing address for purposes of this requirement and remains permitted.

#### Scenario: Visitor looks for a way to contact the owner on the resume page
- **WHEN** a visitor reads any section of the resume page
- **THEN** they find no email address, no phone number, and no street address, unit number, or postal/zip code anywhere on the page

### Requirement: Resume page layout is responsive down to small mobile viewports
The resume page SHALL remain readable without horizontal overflow at viewport widths as narrow as 390px, including wrapping any multi-column elements (e.g., a role's company/dates row) onto multiple lines when needed. This requirement applies to the on-screen view; the print stylesheet is exempt from this constraint since print output targets paper/PDF page sizes, not mobile viewports.

#### Scenario: Visitor loads the resume page on a narrow mobile viewport
- **WHEN** a visitor loads the resume page at a 390px-wide viewport
- **THEN** all text wraps within the viewport with no horizontal clipping or scrolling, and each role's company/dates row reflows onto additional lines as needed
