## ADDED Requirements

### Requirement: Header identifies the site owner and provides contact/resume links
The page header SHALL display the owner's name, professional title, and location, and SHALL provide a link to the owner's LinkedIn profile and a link to download the resume PDF.

#### Scenario: Visitor loads the page
- **WHEN** a visitor loads the profile page
- **THEN** the header shows "Jeffry Ma", the title "Software Development Manager", the location "Vancouver, BC, Canada", a "LinkedIn" link to `https://www.linkedin.com/in/jef2k85`, and a "Download Resume" link to the resume PDF asset

### Requirement: Page presents summary, experience, skills, and education sections
The page SHALL present, in order, a Summary section, an Experience section listing roles in reverse-chronological order (most recent first), a Skills section grouped by category, and an Education & Certifications section.

#### Scenario: Visitor scans the page
- **WHEN** a visitor scrolls through the profile page
- **THEN** they encounter, in order: Summary, Experience (roles newest to oldest, each with company, dates, title, and bullet highlights), Skills (grouped into categories such as Languages, AWS, Methodologies, Testing), and Education & Certifications

### Requirement: Resume PDF is the source of truth for content consistency
The resume PDF at `assets/JeffryMa_Resume.pdf` SHALL be treated as the source of truth for the owner's professional history, and for any item that appears on both the page and the PDF (e.g., a role's dates, title, or company), the two SHALL state that item consistently — not necessarily with identical wording, but without contradiction; the page MAY omit items present in the PDF (e.g., showing only highlight bullets instead of the PDF's full bullet list), but SHALL NOT state an item the PDF also covers in a conflicting way.

#### Scenario: Both the page and the PDF mention the same role's dates
- **WHEN** the resume PDF lists a role's start and end dates
- **THEN** the page's entry for that same role states the same start and end dates

#### Scenario: Page shows a condensed highlight not on the PDF's exact wording
- **WHEN** the page summarizes a bullet from the PDF in different wording
- **THEN** the summarized bullet SHALL NOT contradict the facts (numbers, outcomes, dates) stated in the PDF's corresponding bullet

#### Scenario: Current compliance gap — no automated enforcement
- **WHEN** the PDF or the page content is updated by the owner
- **THEN** there is currently no automated check that flags a resulting inconsistency; this requirement is enforced by manual authoring discipline only, not by tooling

### Requirement: No personal contact details are published anywhere on the site or resume PDF
At no time SHALL the published page (`index.html` and any other page added later) or the resume PDF at `assets/JeffryMa_Resume.pdf` contain an email address, a phone number, or a physical/mailing address (street address, unit/suite number, or postal/zip code), in any section, link, or embedded metadata; contact SHALL be routed through the LinkedIn link only. City/region-level location (e.g., "Vancouver, BC, Canada", as already required by the header requirement) is NOT a physical/mailing address for purposes of this requirement and remains permitted. This requirement applies to every future revision of the page and every future upload of the resume PDF, not just the version in place when this requirement was written.

#### Scenario: Visitor looks for a way to contact the owner
- **WHEN** a visitor looks at the header links, any page section, or the downloadable resume PDF
- **THEN** they find a LinkedIn link and a city/region-level location, but no email address, no phone number, and no street address, unit number, or postal/zip code anywhere

#### Scenario: Resume PDF is replaced with a new upload
- **WHEN** the owner uploads a new version of `assets/JeffryMa_Resume.pdf`
- **THEN** the new PDF's extracted text SHALL NOT contain an email address, a phone number, or a street address, unit number, or postal/zip code

#### Scenario: Spec-drift audit detects a violation
- **WHEN** a future spec-drift audit (per the reconciling-spec-drift skill) checks this requirement against the current site content and the current resume PDF's extracted text
- **THEN** the audit SHALL flag a violation if it finds an email address, a phone number, or a street address, unit number, or postal/zip code in either surface, citing the specific file and location found — while treating city/region-level location as compliant, not a violation

### Requirement: Layout is responsive down to small mobile viewports
The page SHALL remain readable without horizontal overflow at viewport widths as narrow as 390px, including wrapping the header's contact/resume links and each experience role's company/dates row onto multiple lines when needed.

#### Scenario: Visitor loads the page on a narrow mobile viewport
- **WHEN** a visitor loads the page at a 390px-wide viewport
- **THEN** all text wraps within the viewport with no horizontal clipping or scrolling, and the header links and role company/dates rows reflow onto additional lines as needed
