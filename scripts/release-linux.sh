#!/bin/bash
set -e

echo "Building Linux release (Tauri)..."
cd web
npm run build
cd src-tauri
cargo tauri build
echo "Linux release build complete."
