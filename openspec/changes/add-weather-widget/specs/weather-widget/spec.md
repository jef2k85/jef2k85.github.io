## ADDED Requirements

### Requirement: Landing page displays current Vancouver weather conditions
The landing page SHALL display current weather conditions for Vancouver, BC, fetched client-side from a no-authentication weather API, including at minimum the current temperature and a short condition description.

#### Scenario: Visitor loads the landing page and the weather API responds successfully
- **WHEN** a visitor loads the landing page and the weather API request succeeds
- **THEN** the page displays the current temperature and a short condition description for Vancouver, BC

### Requirement: Weather data source requires no signup or API key
The weather widget SHALL use only a weather data API that requires no account signup and no API key, since any key embedded in this static site's client-side code would be publicly exposed in the repository.

#### Scenario: Reviewing the widget's implementation
- **WHEN** the widget's data-fetching code is inspected
- **THEN** it contains no API key, token, or credential, and calls an API that does not require authentication

### Requirement: Location is fixed to Vancouver, BC with no user input
The weather widget SHALL use a hardcoded Vancouver, BC coordinate for its weather request and SHALL NOT prompt the visitor for geolocation permission or accept a user-supplied location.

#### Scenario: Visitor loads the landing page
- **WHEN** a visitor loads the landing page
- **THEN** no browser geolocation permission prompt appears, and the displayed weather is for Vancouver, BC

### Requirement: Widget shows current conditions only, no forecast
The weather widget SHALL display only current conditions and SHALL NOT display multi-day or hourly forecast data.

#### Scenario: Visitor views the weather widget
- **WHEN** a visitor views the weather widget on the landing page
- **THEN** they see only current conditions, with no forecast for future hours or days

### Requirement: Widget fails silently when weather data is unavailable
If the weather API request fails, times out, or returns data the widget cannot parse, the widget SHALL render nothing (no error message, no stale/cached value, no broken UI element).

#### Scenario: Weather API is unreachable
- **WHEN** a visitor loads the landing page and the weather API request fails or times out
- **THEN** no weather widget content, error message, or placeholder is visible on the page

#### Scenario: Weather API returns an unparseable response
- **WHEN** a visitor loads the landing page and the weather API returns a response the widget cannot parse
- **THEN** no weather widget content, error message, or placeholder is visible on the page

### Requirement: Widget visually matches the existing page design
The weather widget SHALL be styled using the landing page's existing CSS custom properties (e.g., colour tokens for accent, muted text, card background, and border) rather than a third-party embedded widget's own styling, so it visually matches the rest of the page.

#### Scenario: Visitor views the landing page
- **WHEN** a visitor views the landing page with the weather widget visible
- **THEN** the widget's colours and typography are visually consistent with the rest of the page rather than appearing as a foreign embedded element
