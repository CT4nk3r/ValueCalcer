Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Building Windows release (Tauri)..."
Set-Location web
npm run build
Set-Location src-tauri
cargo tauri build
Write-Host "Windows release build complete."
