---
description: "Add a new measurement unit to ValueCalcer across shared logic, both platform UIs, and tests."
agent: "agent"
argument-hint: "unit label, value, type, and multiplier (e.g. 'oz, oz, weight, 28.3495')"
---
Add a new unit to ValueCalcer. The user will provide the unit details.

## Steps

1. **Add to UNITS array** in [shared/calculators.ts](shared/calculators.ts) — include `label`, `value`, `type` (volume/weight/length/area), and `toBaseMultiplier`.
2. **Update `UnitType`** in [shared/types.ts](shared/types.ts) if the unit introduces a new type not already in the union.
3. **Add tests** in [__tests__/calculators.test.ts](__tests__/calculators.test.ts) — at minimum test `getEffectiveSize` for the new unit and `calculatePricePerUnit` with it.
4. **Run `npm test`** to verify all tests pass.
5. If the unit needs special base-unit label formatting, update `getBaseUnitLabel` in `shared/calculators.ts`.
