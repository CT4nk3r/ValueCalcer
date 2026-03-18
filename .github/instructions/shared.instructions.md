---
description: "Use when editing shared business logic — calculators, types, theme tokens. Must stay platform-agnostic."
applyTo: "shared/**"
---
# Shared Code Rules

- Code in `shared/` must be **platform-agnostic** — no imports from `react-native`, `next`, or DOM APIs (except behind `typeof document` guards like `injectCSSVariables`).
- All unit conversion, price calculation, and comparison logic lives here — never duplicate in `src/` or `web/`.
- When modifying `calculators.ts`, add or update corresponding tests in `__tests__/calculators.test.ts`.
- The `UNITS` array defines all supported units with `toBaseMultiplier` for conversion — new units must include `label`, `value`, `type`, and `toBaseMultiplier`.
- Currency is hardcoded as Euro (€) in `formatPricePerUnit`.
