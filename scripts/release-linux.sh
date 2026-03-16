#!/bin/bash
set -e

echo "Building Linux release (Tauri)..."
cd web
npm run build
npm run tauri:build
cd ..
echo "Linux release build complete."
