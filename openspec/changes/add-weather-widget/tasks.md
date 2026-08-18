## 1. Markup

- [ ] 1.1 Add a weather widget placeholder element to the hero section in `index.html`, near the existing location line
- [ ] 1.2 Give the placeholder a stable id/hook for the script to target and leave it empty by default (so silent-failure is the natural default state)

## 2. Data fetching

- [ ] 2.1 Add a small script (inline `<script>` or new `assets/js/weather.js`) that calls the Open-Meteo current-weather endpoint with hardcoded Vancouver, BC coordinates
- [ ] 2.2 Parse the response for current temperature and a short condition description
- [ ] 2.3 On fetch error, timeout, or unparseable response, leave the placeholder empty and exit without throwing or logging visibly on the page

## 3. Rendering

- [ ] 3.1 On successful response, inject the temperature and condition description into the placeholder element
- [ ] 3.2 Ensure only current conditions are rendered — no forecast fields

## 4. Styling

- [ ] 4.1 Add CSS rules for the widget in `assets/css/style.css` reusing existing custom properties (`--accent`, `--muted`, `--card-bg`, `--border`)
- [ ] 4.2 Verify the widget's appearance is visually consistent with the rest of the hero section (spacing, font, colour)

## 5. Verification

- [ ] 5.1 Load the page locally (per `preview.sh`) and confirm the widget shows current Vancouver temperature and conditions
- [ ] 5.2 Simulate a failed/blocked request (e.g., via browser devtools network blocking) and confirm the page shows no error state, placeholder text, or broken UI
- [ ] 5.3 Confirm no API key, token, or credential appears anywhere in the added code
- [ ] 5.4 Confirm no geolocation permission prompt appears on page load
