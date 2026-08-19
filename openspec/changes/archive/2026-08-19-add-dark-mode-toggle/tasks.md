## 1. Dark palette CSS

- [x] 1.1 Add a `[data-theme="dark"]` (or `html[data-theme="dark"]`) override block in `assets/css/style.css` defining the Slate & Teal values for `--bg`, `--card-bg`, `--text`, `--muted`, `--border`, `--accent`
- [x] 1.2 Verify every existing rule in `style.css` (hero, links, sections, skills-grid, footer, etc.) already reads from these variables and needs no direct edits

## 2. Theme toggle control

- [x] 2.1 Add a toggle button/control to `.links` in `index.html`, beside the LinkedIn and Resume links
- [x] 2.2 Style the toggle using the existing `.links a`-style variables so it's legible in both themes
- [x] 2.3 Add `aria-pressed` (or equivalent) state and an accessible label that reflects current theme / action

## 3. Theme resolution and persistence script

- [x] 3.1 Add an inline script in `_layouts/default.html`'s `<head>`, before the stylesheet link, that resolves the theme in this order: stored `localStorage` preference → `prefers-color-scheme: dark` → light
- [x] 3.2 Set `data-theme` on `<html>` synchronously from that script so the correct palette applies before first paint
- [x] 3.3 Wrap `localStorage` reads/writes in try/catch so unavailable storage degrades to OS-preference-only behaviour without throwing
- [x] 3.4 Add a click handler for the toggle control that flips `data-theme` between `light` and `dark`, writes the explicit choice to `localStorage`, and updates the toggle's own label/`aria-pressed` state

## 4. Scope verification

- [x] 4.1 Confirm `_layouts/resume.html` does not include the new inline script and `resume.css` is untouched
- [x] 4.2 Manually verify the resume page renders unchanged (light, print-optimized) regardless of any stored landing-page theme preference

## 5. Manual verification

- [x] 5.1 Load the landing page with OS set to dark and no stored preference — confirm it renders dark with no flash of light
- [x] 5.2 Load the landing page with OS set to light and no stored preference — confirm it renders light
- [x] 5.3 Click the toggle in both directions — confirm immediate switch and correct persisted state on reload
- [x] 5.4 Check the toggle and header links are legible and correctly styled in both themes, including at a 390px-wide viewport
- [x] 5.5 Simulate `localStorage` being unavailable (e.g. private browsing restrictions) and confirm the toggle still works for the current view without a visible error
