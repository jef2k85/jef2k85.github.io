## MODIFIED Requirements

### Requirement: Header identifies the site owner and provides contact/resume links
The page header SHALL display the owner's name, professional title, and location, and SHALL provide a link to the owner's LinkedIn profile, a link to the owner's resume page, and a control that toggles the landing page's colour theme between light and dark.

#### Scenario: Visitor loads the page
- **WHEN** a visitor loads the landing page
- **THEN** the header shows "Jeffry Ma", the title "Software Development Manager", the location "Vancouver, BC, Canada", a "LinkedIn" link to `https://www.linkedin.com/in/jef2k85`, a resume link to `/resume/`, and a theme toggle control positioned beside those links

#### Scenario: Visitor uses the theme toggle
- **WHEN** a visitor clicks the theme toggle control in the header
- **THEN** the landing page's colour theme switches between light and dark, and the header's own links remain legible and correctly styled in both states
