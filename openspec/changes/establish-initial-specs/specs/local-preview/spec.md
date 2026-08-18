## ADDED Requirements

### Requirement: Preview script builds and serves the site via Docker
Running `./preview.sh` from the repo root SHALL build and serve the Jekyll site locally using the `jekyll/jekyll` Docker image, without requiring Ruby, Bundler, or Jekyll to be installed on the host machine.

#### Scenario: Owner runs the preview script on a machine without Ruby/Jekyll installed
- **WHEN** the owner runs `./preview.sh` from the repository root
- **THEN** a Docker container is started that installs the project's gems (`bundle install`) and runs `bundle exec jekyll serve`, without any host-side Ruby/Jekyll installation

### Requirement: Preview server listens on a fixed local port with live reload
The preview script SHALL serve the site on `http://localhost:4000` and SHALL enable Jekyll's live-reload so that source file changes are reflected without manually restarting the script.

#### Scenario: Owner edits a page while the preview is running
- **WHEN** the owner edits `index.html` or `assets/css/style.css` while `preview.sh` is running
- **THEN** the running server rebuilds and the browser reloads automatically via live-reload, without the owner restarting `preview.sh`

### Requirement: Preview script opens the site in the default browser automatically
The preview script SHALL automatically open `http://localhost:4000` in the owner's default browser shortly after starting the server.

#### Scenario: Owner runs the preview script
- **WHEN** the owner runs `./preview.sh`
- **THEN** their default browser opens to `http://localhost:4000` a few seconds after the script starts, without the owner manually navigating there

### Requirement: Preview build artifacts are excluded from version control
Build output produced by the preview script (the generated `_site/` directory and Bundler's `Gemfile.lock`, `.bundle/`, `vendor/`) SHALL be excluded from git via `.gitignore`, so that running the preview script does not introduce changes to commit.

#### Scenario: Owner runs the preview script and checks git status
- **WHEN** the owner runs `./preview.sh`, stops it, and then runs `git status`
- **THEN** none of `_site/`, `Gemfile.lock`, `.bundle/`, or `vendor/` appear as untracked or modified files
