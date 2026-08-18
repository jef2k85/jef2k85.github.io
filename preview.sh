#!/usr/bin/env bash
# Serve this Jekyll site locally via Docker, matching GitHub Pages' build environment.
# Usage: ./preview.sh
set -euo pipefail

cd "$(dirname "$0")"

PORT=4000
URL="http://localhost:${PORT}"

echo "Building and serving site at ${URL} (Ctrl+C to stop)..."
( sleep 2 && open "${URL}" ) &

docker run --rm \
  -v "$PWD:/srv/jekyll" \
  -p "${PORT}:${PORT}" \
  jekyll/jekyll:latest \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --port ${PORT} --livereload"
