'use client';

import { UNITS } from '../../../shared/calculators';
import { UnitType } from '../../../shared/types';

interface Props {
  value: string;
  onChange: (unit: string) => void;
}

const UNIT_TYPES: UnitType[] = ['volume', 'weight', 'length', 'area'];
const TYPE_LABELS: Record<UnitType, string> = {
  volume: 'Volume',
  weight: 'Weight',
  length: 'Length',
  area: 'Area',
};

export default function UnitSelector({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {UNIT_TYPES.map(type => (
        <optgroup key={type} label={TYPE_LABELS[type]}>
          {UNITS.filter(u => u.type === type).map(unit => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
