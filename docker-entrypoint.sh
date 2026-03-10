#!/bin/sh

# Generates a window.__env__ object from VITE_* environment variables
# and writes it to env-config.js so the built SPA can read them at runtime.

WWW_DIR="/usr/share/nginx/html"
OUTPUT_FILE="$WWW_DIR/env-config.js"

echo "window.__env__ = {" > $OUTPUT_FILE

env | grep '^VITE_' | while IFS='=' read -r name value; do
    escaped_value=$(echo "$value" | sed 's/"/\\"/g')
    echo "  \"$name\": \"$escaped_value\"," >> $OUTPUT_FILE
done

echo "};" >> $OUTPUT_FILE

# Inject a timestamp cache-buster into the env-config.js <script> tag in index.html.
# index.html is never browser-cached, so the new ?v= value is always seen, forcing
# the browser to fetch a fresh env-config.js on every container start.
CACHE_BUSTER=$(date +%s)
sed -i "s|env-config\.js[^\"]*|env-config.js?v=${CACHE_BUSTER}|g" $WWW_DIR/index.html

echo "Generated $OUTPUT_FILE with cache buster v=${CACHE_BUSTER}:"
cat $OUTPUT_FILE

exec "$@"
