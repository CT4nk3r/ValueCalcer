'use client';

import { useState, useCallback } from 'react';
import { ProductOption } from '../../../shared/types';
import { compareProducts, formatPricePerUnit } from '../../../shared/calculators';
import ProductCard from '../components/ProductCard';
import UnitSelector from '../components/UnitSelector';
import AddButton from '../components/AddButton';

const createOption = (id: string, index: number, unit: string): ProductOption => ({
  id,
  name: `Option ${index + 1}`,
  size: 0,
  unit,
  price: 0,
});

export default function Home() {
  const [unit, setUnit] = useState('ml');
  const [options, setOptions] = useState<ProductOption[]>([
    createOption('1', 0, 'ml'),
    createOption('2', 1, 'ml'),
  ]);

  const results = compareProducts(options);

  const handleUnitChange = useCallback((newUnit: string) => {
    setUnit(newUnit);
    setOptions(prev => prev.map(o => ({ ...o, unit: newUnit })));
  }, []);

  const handleUpdate = useCallback((id: string, updates: Partial<ProductOption>) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    if (updates.unit) {
      handleUnitChange(updates.unit);
    }
  }, [handleUnitChange]);

  const handleAdd = useCallback(() => {
    const newId = Date.now().toString();
    setOptions(prev => [...prev, createOption(newId, prev.length, unit)]);
  }, [unit]);

  const handleRemove = useCallback((id: string) => {
    setOptions(prev => prev.filter(o => o.id !== id));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10 px-4 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-2">💰 ValueCalcer</h1>
        <p className="text-blue-100 text-lg">Find the best value for money</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Unit Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <label htmlFor="unit-selector" className="block text-sm font-semibold text-gray-600 mb-2">Compare by unit:</label>
          <UnitSelector id="unit-selector" value={unit} onChange={handleUnitChange} />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => {
            const result = results.find(r => r.id === option.id);
            return (
              <ProductCard
                key={option.id}
                option={option}
                result={result}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
                canRemove={options.length > 2}
                index={index}
              />
            );
          })}
        </div>

        <AddButton onClick={handleAdd} />
      </main>

      <footer className="text-center text-gray-400 text-sm py-8">
        ValueCalcer — Compare smarter, save more.
      </footer>
    </div>
  );
}
