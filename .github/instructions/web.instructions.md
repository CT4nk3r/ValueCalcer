---
description: "Use when editing Next.js web app or Tauri desktop shell — Tailwind styling, static export, client components."
applyTo: "web/**"
---
# Web Platform Rules

- Use **Tailwind CSS utility classes** for all styling — no CSS modules or inline style objects.
- Add `'use client'` directive at the top of any component or page that uses hooks, event handlers, or browser APIs.
- The Next.js app uses **static export** (`output: 'export'`) — no server-side features (`getServerSideProps`, API routes, `cookies()`, `headers()`).
- Import shared logic from `../../../shared/` (relative) — never duplicate calculators or types locally.
- `web/src/components/ThemeInjector.tsx` calls `injectCSSVariables()` from `shared/theme.ts` — use CSS variables (`var(--color-*)`) when referencing theme colors outside Tailwind.
- Tauri shell (`web/src-tauri/`) is minimal Rust glue — avoid modifying it unless adding native desktop capabilities.
