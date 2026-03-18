import { ProductOption, ComparisonResult, Unit, Currency } from './types';

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', label: 'Euro (€)' },
  { code: 'USD', symbol: '$', label: 'US Dollar ($)' },
  { code: 'GBP', symbol: '£', label: 'British Pound (£)' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen (¥)' },
  { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc (CHF)' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Złoty (zł)' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona (kr)' },
  { code: 'HUF', symbol: 'Ft', label: 'Hungarian Forint (Ft)' },
  { code: 'CZK', symbol: 'Kč', label: 'Czech Koruna (Kč)' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee (₹)' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real (R$)' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira (₺)' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];

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
  const results: ComparisonResult[] = options.map(opt => ({
    id: opt.id,
    pricePerBaseUnit: calculatePricePerUnit(opt),
    isBestValue: false,
    bestValueCount: 0,
    isTopQuantityBestValue: false,
  }));

  const validResults = results.filter(r => isFinite(r.pricePerBaseUnit));
  if (validResults.length > 0) {
    const minPrice = Math.min(...validResults.map(r => r.pricePerBaseUnit));
    const bestResults = results.filter(r => isFinite(r.pricePerBaseUnit) && r.pricePerBaseUnit === minPrice);
    const bestCount = bestResults.length;

    bestResults.forEach(r => {
      r.isBestValue = true;
      r.bestValueCount = bestCount;
    });

    if (bestCount > 1) {
      const maxEffectiveSize = Math.max(
        ...bestResults.map(r => {
          const opt = options.find(o => o.id === r.id)!;
          return getEffectiveSize(opt.size, opt.unit);
        }),
      );
      bestResults.forEach(r => {
        const opt = options.find(o => o.id === r.id)!;
        r.isTopQuantityBestValue = getEffectiveSize(opt.size, opt.unit) === maxEffectiveSize;
      });
    } else {
      bestResults[0].isTopQuantityBestValue = true;
    }
  }

  return results;
}

function getBaseUnitLabel(unitValue: string): string {
  if (unitValue === 'cm_dia') {
    return 'cm²';
  }
  const unit = UNITS.find(u => u.value === unitValue);
  if (!unit) {
    return unitValue;
  }
  switch (unit.type) {
    case 'volume':
      return 'ml';
    case 'weight':
      return 'g';
    case 'length':
      return 'cm';
    case 'area':
      return 'cm²';
    default:
      return unit.label ?? unitValue;
  }
}

export function formatPricePerUnit(pricePerUnit: number, unitValue: string, currencySymbol: string = '€'): string {
  if (!isFinite(pricePerUnit)) return '—';
  const baseLabel = getBaseUnitLabel(unitValue);
  return `${currencySymbol}${pricePerUnit.toFixed(4)} / ${baseLabel}`;
}
