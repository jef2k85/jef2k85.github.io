## ADDED Requirements

### Requirement: Header displays live current weather conditions for Vancouver, BC
The page header SHALL display the current weather (temperature and a short text description)
for Vancouver, BC, fetched from the Open-Meteo API's current-conditions data at page load. The
header SHALL NOT display forecast data (e.g., tomorrow's or tonight's conditions), only the
current reading. If the weather request fails, the response is not usable, or the weather code
is unrecognized, the widget SHALL render nothing (no error message, no stale/placeholder text).

#### Scenario: Visitor loads the page and the weather request succeeds
- **WHEN** a visitor loads the landing page and the Open-Meteo current-conditions request
  succeeds
- **THEN** the header shows the rounded temperature in Celsius and a short text description of
  the current conditions for Vancouver, BC, and shows no forecast data

#### Scenario: Weather request fails or returns unusable data
- **WHEN** the Open-Meteo request fails, is rejected, times out, or returns a response missing
  a numeric temperature or weather code (or a weather code with no known description)
- **THEN** the header's weather widget renders nothing — no error message, spinner, or stale
  value is shown
