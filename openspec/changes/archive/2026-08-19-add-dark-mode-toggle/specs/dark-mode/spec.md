## ADDED Requirements

### Requirement: Landing page supports a dark colour palette
The landing page (`index.html`) SHALL support a dark colour palette, applied via CSS custom property overrides scoped to a `data-theme="dark"` state on the document, without altering the resume page's styling.

#### Scenario: Dark theme is active
- **WHEN** the landing page's `<html>` element has `data-theme="dark"`
- **THEN** the background, card, text, muted-text, border, and accent colours all resolve to the dark palette values, and the resume page's styling is unaffected regardless of this state

### Requirement: Theme defaults to the visitor's OS preference
When no stored theme preference exists for the visitor, the landing page SHALL resolve its initial theme from the `prefers-color-scheme` media feature: dark if the OS/browser reports a dark preference, light otherwise.

#### Scenario: First-time visitor with OS dark mode enabled
- **WHEN** a visitor with no stored theme preference and an OS/browser dark-mode preference loads the landing page
- **THEN** the landing page renders in the dark palette

#### Scenario: First-time visitor with OS light mode enabled
- **WHEN** a visitor with no stored theme preference and an OS/browser light-mode preference (or no preference) loads the landing page
- **THEN** the landing page renders in the light palette

### Requirement: Visitor can manually override the theme via a toggle control
The landing page SHALL provide a toggle control that switches between the light and dark palettes on click, overriding whatever theme was previously active (whether OS-derived or a prior manual choice).

#### Scenario: Visitor clicks the toggle from light
- **WHEN** the landing page is showing the light palette and the visitor clicks the theme toggle
- **THEN** the page immediately switches to the dark palette

#### Scenario: Visitor clicks the toggle from dark
- **WHEN** the landing page is showing the dark palette and the visitor clicks the theme toggle
- **THEN** the page immediately switches to the light palette

### Requirement: Manual theme choice persists across visits
Once a visitor manually toggles the theme, that explicit choice SHALL be persisted (e.g. via `localStorage`) and SHALL take precedence over the OS preference on subsequent page loads until the visitor toggles again.

#### Scenario: Returning visitor after a manual override
- **WHEN** a visitor previously toggled to dark manually, then later reloads the landing page or returns in a new session, regardless of their current OS preference
- **THEN** the landing page loads in the dark palette

#### Scenario: Storage is unavailable
- **WHEN** `localStorage` access throws or is unavailable in the visitor's browser
- **THEN** the toggle SHALL still switch the theme for the current page view, falling back to OS-preference-only behaviour on the next load without erroring visibly

### Requirement: Theme is applied before first paint to avoid a flash of the wrong theme
The resolved theme (stored preference or OS preference) SHALL be applied to the document before the page's first visible paint, so visitors do not see a brief flash of the light palette before it switches to dark (or vice versa).

#### Scenario: Visitor with a stored dark preference loads the page
- **WHEN** a visitor with a stored dark theme preference loads the landing page
- **THEN** the page never visibly renders the light palette before settling on dark

### Requirement: Dark mode is scoped to the landing page only
The dark theme mechanism SHALL apply only to the landing page and SHALL NOT affect the resume page, which remains light-only and print-optimized regardless of any stored landing-page theme preference.

#### Scenario: Visitor with dark theme preference visits the resume page
- **WHEN** a visitor who has set a dark theme preference on the landing page navigates to the resume page
- **THEN** the resume page renders in its standard light, print-optimized styling, unaffected by the stored preference
