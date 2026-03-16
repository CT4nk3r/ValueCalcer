import {
  UNITS,
  getEffectiveSize,
  calculatePricePerUnit,
  compareProducts,
  formatPricePerUnit,
} from '../shared/calculators';
import { ProductOption } from '../shared/types';

describe('getEffectiveSize', () => {
  test('returns size * multiplier for ml', () => {
    expect(getEffectiveSize(500, 'ml')).toBe(500);
  });

  test('returns size * 1000 for L', () => {
    expect(getEffectiveSize(1, 'l')).toBe(1000);
  });

  test('returns size * 1000 for kg', () => {
    expect(getEffectiveSize(2, 'kg')).toBe(2000);
  });

  test('returns size * 100 for m', () => {
    expect(getEffectiveSize(1, 'm')).toBe(100);
  });

  test('calculates area from diameter for cm_dia', () => {
    const area = getEffectiveSize(10, 'cm_dia');
    expect(area).toBeCloseTo(Math.PI * 25, 5);
  });

  test('returns size * 1 for cm2', () => {
    expect(getEffectiveSize(50, 'cm2')).toBe(50);
  });
});

describe('calculatePricePerUnit', () => {
  const makeOption = (id: string, size: number, unit: string, price: number): ProductOption => ({
    id,
    name: id,
    size,
    unit,
    price,
  });

  test('calculates price per ml', () => {
    const option = makeOption('a', 500, 'ml', 2.5);
    expect(calculatePricePerUnit(option)).toBeCloseTo(0.005, 5);
  });

  test('calculates price per L converting to ml', () => {
    const option = makeOption('b', 1, 'l', 2.0);
    expect(calculatePricePerUnit(option)).toBeCloseTo(0.002, 5);
  });

  test('returns Infinity when size is 0', () => {
    const option = makeOption('c', 0, 'ml', 5);
    expect(calculatePricePerUnit(option)).toBe(Infinity);
  });

  test('returns Infinity when price is 0', () => {
    const option = makeOption('d', 500, 'ml', 0);
    expect(calculatePricePerUnit(option)).toBe(Infinity);
  });
});

describe('compareProducts', () => {
  test('identifies best value product', () => {
    const options: ProductOption[] = [
      { id: '1', name: 'A', size: 500, unit: 'ml', price: 2.0 },
      { id: '2', name: 'B', size: 750, unit: 'ml', price: 2.5 },
    ];
    const results = compareProducts(options);
    const resultA = results.find(r => r.id === '1')!;
    const resultB = results.find(r => r.id === '2')!;
    // A: 2.0/500 = 0.004, B: 2.5/750 ≈ 0.00333 → B is cheaper
    expect(resultB.isBestValue).toBe(true);
    expect(resultA.isBestValue).toBe(false);
  });

  test('handles all invalid options', () => {
    const options: ProductOption[] = [
      { id: '1', name: 'A', size: 0, unit: 'ml', price: 2.0 },
      { id: '2', name: 'B', size: 0, unit: 'ml', price: 2.5 },
    ];
    const results = compareProducts(options);
    results.forEach(r => expect(r.isBestValue).toBe(false));
  });

  test('handles mixed valid/invalid options', () => {
    const options: ProductOption[] = [
      { id: '1', name: 'A', size: 0, unit: 'ml', price: 2.0 },
      { id: '2', name: 'B', size: 500, unit: 'ml', price: 2.0 },
    ];
    const results = compareProducts(options);
    const resultB = results.find(r => r.id === '2')!;
    expect(resultB.isBestValue).toBe(true);
  });

  test('compares different units by converting to base', () => {
    const options: ProductOption[] = [
      { id: '1', name: 'A', size: 1, unit: 'l', price: 1.5 },  // 1.5/1000 per ml
      { id: '2', name: 'B', size: 200, unit: 'ml', price: 0.2 },  // 0.2/200 = 0.001 per ml
    ];
    const results = compareProducts(options);
    // A: 1.5/1000 = 0.0015, B: 0.2/200 = 0.001 → B is best
    const resultB = results.find(r => r.id === '2')!;
    expect(resultB.isBestValue).toBe(true);
  });
});

describe('formatPricePerUnit', () => {
  test('formats a valid price per unit', () => {
    const formatted = formatPricePerUnit(0.005, 'ml');
    expect(formatted).toBe('€0.0050 / ml');
  });

  test('returns dash for Infinity', () => {
    expect(formatPricePerUnit(Infinity, 'ml')).toBe('—');
  });

  test('uses cm² label for cm_dia unit', () => {
    const formatted = formatPricePerUnit(0.01, 'cm_dia');
    expect(formatted).toContain('cm²');
  });
});
