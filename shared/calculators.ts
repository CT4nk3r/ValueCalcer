import { ProductOption, ComparisonResult, Unit } from './types';

export const UNITS: Unit[] = [
  { label: 'ml', value: 'ml', type: 'volume', toBaseMultiplier: 1 },
  { label: 'L', value: 'l', type: 'volume', toBaseMultiplier: 1000 },
  { label: 'g', value: 'g', type: 'weight', toBaseMultiplier: 1 },
  { label: 'kg', value: 'kg', type: 'weight', toBaseMultiplier: 1000 },
  { label: 'cm', value: 'cm', type: 'length', toBaseMultiplier: 1 },
  { label: 'm', value: 'm', type: 'length', toBaseMultiplier: 100 },
  { label: 'cm² (diameter)', value: 'cm_dia', type: 'area', toBaseMultiplier: 1 },
  { label: 'cm²', value: 'cm2', type: 'area', toBaseMultiplier: 1 },
];

export function getEffectiveSize(size: number, unitValue: string): number {
  if (unitValue === 'cm_dia') {
    return Math.PI * Math.pow(size / 2, 2);
  }
  const unit = UNITS.find(u => u.value === unitValue);
  return size * (unit?.toBaseMultiplier ?? 1);
}

export function calculatePricePerUnit(option: ProductOption): number {
  const effectiveSize = getEffectiveSize(option.size, option.unit);
  if (effectiveSize === 0 || option.price === 0) return Infinity;
  return option.price / effectiveSize;
}

export function compareProducts(options: ProductOption[]): ComparisonResult[] {
  const results = options.map(opt => ({
    id: opt.id,
    pricePerBaseUnit: calculatePricePerUnit(opt),
    isBestValue: false,
  }));

  const validResults = results.filter(r => isFinite(r.pricePerBaseUnit));
  if (validResults.length > 0) {
    const minPrice = Math.min(...validResults.map(r => r.pricePerBaseUnit));
    results.forEach(r => {
      r.isBestValue = isFinite(r.pricePerBaseUnit) && r.pricePerBaseUnit === minPrice;
    });
  }

  return results;
}

export function formatPricePerUnit(pricePerUnit: number, unitValue: string): string {
  if (!isFinite(pricePerUnit)) return '—';
  const unit = UNITS.find(u => u.value === unitValue);
  const baseLabel = unitValue === 'cm_dia' ? 'cm²' : (unit?.label ?? unitValue);
  return `€${pricePerUnit.toFixed(4)} / ${baseLabel}`;
}
