'use client';

import { CURRENCIES } from '../../../shared/calculators';

interface Props {
  id?: string;
  value: string;
  onChange: (currencyCode: string) => void;
}

export default function CurrencySelector({ id, value, onChange }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {CURRENCIES.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.label}
        </option>
      ))}
    </select>
  );
}
