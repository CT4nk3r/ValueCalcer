'use client';

import { ProductOption, ComparisonResult } from '../../../shared/types';
import { formatPricePerUnit } from '../../../shared/calculators';

interface Props {
  option: ProductOption;
  result?: ComparisonResult;
  onUpdate: (id: string, updates: Partial<ProductOption>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  index: number;
  currencySymbol: string;
}

export default function ProductCard({ option, result, onUpdate, onRemove, canRemove, index, currencySymbol }: Props) {
  const isBest = result?.isBestValue ?? false;
  const isTopBest = result?.isTopQuantityBestValue ?? false;
  const isPlural = (result?.bestValueCount ?? 0) > 1;

  const cardClasses = isBest
    ? isTopBest
      ? 'border-emerald-500 bg-green-100'
      : 'border-green-400 bg-green-50'
    : 'border-gray-200 hover:border-blue-300';

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm border-2 p-6 transition-all duration-200 ${cardClasses}`}>
      {isBest && (
        <div className={`absolute -top-3 left-4 text-white text-xs font-bold px-3 py-1 rounded-full ${
          isTopBest ? 'bg-emerald-600' : 'bg-green-500'
        }`}>
          🏆 {isPlural ? 'Best Values' : 'Best Value'}
        </div>
      )}

      {canRemove && (
        <button
          onClick={() => onRemove(option.id)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 font-bold text-lg leading-none"
          title="Remove"
          aria-label={`Remove ${option.name}`}
        >
          ✕
        </button>
      )}

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name</label>
        <input
          type="text"
          value={option.name}
          onChange={e => onUpdate(option.id, { name: e.target.value })}
          placeholder={`Option ${index + 1}`}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Size ({option.unit})</label>
          <input
            type="number"
            value={option.size === 0 ? '' : option.size}
            onChange={e => onUpdate(option.id, { size: parseFloat(e.target.value) || 0 })}
            placeholder="0"
            min="0"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{currencySymbol}</span>
            <input
              type="number"
              value={option.price === 0 ? '' : option.price}
              onChange={e => onUpdate(option.id, { price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <div className={`text-center py-3 rounded-xl font-bold text-lg ${
        isBest
          ? isTopBest ? 'bg-emerald-600 text-white' : 'bg-green-400 text-white'
          : 'bg-gray-100 text-gray-700'
      }`}>
        {result ? formatPricePerUnit(result.pricePerBaseUnit, option.unit, currencySymbol) : '—'}
      </div>
    </div>
  );
}
