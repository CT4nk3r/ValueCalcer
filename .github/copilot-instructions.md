# Project Guidelines

## Overview

ValueCalcer is a cross-platform price-per-unit comparison tool. Users add products with a name, size, unit, and price — the app highlights the best value. It targets **Android** (React Native), **Web** (Next.js on Vercel), and **Desktop** (Tauri wrapping the Next.js app).

## Architecture

```
shared/          ← Platform-agnostic domain logic (types, calculators, theme)
src/             ← React Native mobile app
  components/      ProductCard, UnitSelector (RN StyleSheet)
  screens/         HomeScreen (single-screen app)
web/             ← Next.js web app (static export)
  src/app/         App Router pages & layout
  src/components/  ProductCard, UnitSelector, AddButton, ThemeInjector (Tailwind)
  src-tauri/       Tauri shell for desktop builds (Rust, minimal)
```

**Shared code rule**: All business logic (unit conversion, price calculation, comparison) lives in `shared/`. Platform code imports from `shared/` — never duplicate logic in `src/` or `web/`.

- `shared/types.ts` — core interfaces: `ProductOption`, `ComparisonResult`, `Unit`
- `shared/calculators.ts` — `getEffectiveSize`, `calculatePricePerUnit`, `compareProducts`, `formatPricePerUnit`
- `shared/theme.ts` — color/spacing/fontSize tokens + `injectCSSVariables()` for web

## Build and Test

| Task | Command | Directory |
|------|---------|-----------|
| Run RN (Android) | `npm run android` | root |
| Start Metro bundler | `npm start` | root |
| Run tests | `npm test` | root |
| Lint | `npm run lint` | root |
| Web dev server | `npm run dev` | `web/` |
| Web production build | `npm run build` | `web/` |
| Desktop build (Windows) | `npm run tauri:build` | `web/` |
| Sync versions | `node scripts/sync-versions.js` | root |

Tests use **Jest + ts-jest**, files in `__tests__/*.test.ts`. Test shared logic only — no component tests currently.

## Conventions

- **TypeScript everywhere** — strict mode enabled in both tsconfigs.
- **Functional components** with hooks (`useState`, `useCallback`). No class components.
- **Currency**: Euro (€) — hardcoded in `formatPricePerUnit` and component placeholders.
- **Minimum 2 product cards** — remove buttons hidden when only 2 options remain.
- **Unit selector is global** — changing it updates all cards at once.
- **Web styling**: Tailwind CSS utility classes, no CSS modules.
- **Mobile styling**: React Native `StyleSheet.create`, importing tokens from `shared/theme.ts`.
- **Next.js**: App Router with `'use client'` directives on interactive pages/components. Static export (`output: 'export'`).
- **ID generation**: `Date.now().toString()` for new product options at runtime.

## Versioning

Version is defined in root `package.json`. Run `node scripts/sync-versions.js` to propagate it to `web/package.json` and `web/src-tauri/tauri.conf.json`.
