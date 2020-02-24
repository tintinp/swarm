#!/usr/bin/env bash
set -e

echo "building..."

# Build the production dist folder
mkdir -p dist-server
rsync -avz --exclude='*.js' --exclude='*.snap' --exclude='__tests__' --exclude='node_modules' lib/ dist/
babel lib -d dist --source-maps --ignore "**/*.test.js" --ignore "**/__mocks__" --ignore "**/__snapshots__" --ignore "**/__tests__"

echo "build complete"