## MODIFIED Requirements

### Requirement: Header identifies the site owner and provides contact/resume links
The page header SHALL display the owner's name, professional title, and location, and SHALL provide a link to the owner's LinkedIn profile and a link to the owner's resume page.

#### Scenario: Visitor loads the page
- **WHEN** a visitor loads the landing page
- **THEN** the header shows "Jeffry Ma", the title "Software Development Manager", the location "Vancouver, BC, Canada", a "LinkedIn" link to `https://www.linkedin.com/in/jef2k85`, and a resume link to `/resume/`

### Requirement: Landing page presents a short front-door view, not the full resume
The landing page SHALL present a hero (name, title, location, links) and a short summary/highlights section, and MAY present additional content that does not belong on a resume (e.g., hobbies, side projects). The landing page SHALL NOT present the full Experience, Skills, or Education & Certifications sections — that detail belongs to the resume page.

#### Scenario: Visitor scans the landing page
- **WHEN** a visitor scrolls through the landing page
- **THEN** they encounter a hero and a short summary/highlights section, and do not encounter a full Experience, Skills, or Education & Certifications listing

#### Scenario: Landing page includes non-resume content
- **WHEN** the owner adds a hobbies or side-projects section to the landing page
- **THEN** that content is permitted even though it does not appear on the resume page

### Requirement: Landing page content must stay consistent with the resume page where it overlaps
Where the landing page states a fact that also appears on the resume page (e.g., years of experience, current role, company), the two SHALL NOT contradict each other; identical wording is not required, only factual consistency. The landing page MAY include facts the resume page does not (e.g., hobbies, side projects), and is not required to include everything the resume page contains.

#### Scenario: Landing page and resume page both state years of experience
- **WHEN** the landing page's summary states a number of years of experience
- **THEN** the resume page SHALL NOT state a conflicting number for the same point in time

#### Scenario: Consistency is manually/AI-authored, not automated
- **WHEN** the landing page or resume page content is updated
- **THEN** there is no CI/build pipeline that gates the change on consistency; verification is done by manual review or on-demand AI-assisted checks (e.g., via the reconciling-spec-drift skill), not automated enforcement

### Requirement: No personal contact details are published anywhere on the site
At no time SHALL the landing page (`index.html`/`index.md`) or the resume page contain an email address, a phone number, or a physical/mailing address (street address, unit/suite number, or postal/zip code), in any section, link, or embedded metadata; contact SHALL be routed through the LinkedIn link only. City/region-level location (e.g., "Vancouver, BC, Canada") is NOT a physical/mailing address for purposes of this requirement and remains permitted. This requirement applies to every future revision of either page.

#### Scenario: Visitor looks for a way to contact the owner
- **WHEN** a visitor looks at the header links, any landing-page section, or the resume page
- **THEN** they find a LinkedIn link and a city/region-level location, but no email address, no phone number, and no street address, unit number, or postal/zip code anywhere

#### Scenario: Spec-drift audit detects a violation
- **WHEN** a future spec-drift audit (per the reconciling-spec-drift skill) checks this requirement against the current landing page and resume page content
- **THEN** the audit SHALL flag a violation if it finds an email address, a phone number, or a street address, unit number, or postal/zip code in either surface, citing the specific file and location found — while treating city/region-level location as compliant, not a violation

## REMOVED Requirements

### Requirement: Resume PDF is the source of truth for content consistency
**Reason**: The PDF (`assets/JeffryMa_Resume.pdf`) has been removed entirely. The resume page (`resume.md`, see the `resume-page` capability) is now the source of truth for professional-history facts.
**Migration**: See the `resume-page` capability's "Resume page is the source of truth for overlapping facts" requirement, and this file's new "Landing page content must stay consistent with the resume page where it overlaps" requirement.
