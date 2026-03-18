export type UnitType = 'volume' | 'weight' | 'length' | 'area';

export interface Unit {
  label: string;
  value: string;
  type: UnitType;
  toBaseMultiplier: number;
}

export interface Currency {
  code: string;
  symbol: string;
  label: string;
}

export interface ProductOption {
  id: string;
  name: string;
  size: number;
  unit: string;
  price: number;
}

export interface ComparisonResult {
  id: string;
  pricePerBaseUnit: number;
  isBestValue: boolean;
  bestValueCount: number;
  isTopQuantityBestValue: boolean;
}
