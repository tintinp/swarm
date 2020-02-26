#!/usr/bin/env bash
set -e
echo "Running in dev mode..."
bin/flight-visualizer-server.js | pino-pretty -c -l
