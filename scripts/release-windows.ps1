Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Building Windows release (Tauri)..."
Set-Location web
npm run build
npm run tauri:build
Write-Host "Windows release build complete."

