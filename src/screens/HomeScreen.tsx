import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ProductOption } from '../../shared/types';
import { compareProducts, UNITS } from '../../shared/calculators';
import { colors, spacing, fontSize, borderRadius } from '../../shared/theme';
import ProductCard from '../components/ProductCard';
import UnitSelector from '../components/UnitSelector';

const createOption = (id: string, index: number, unit: string): ProductOption => ({
  id,
  name: `Option ${index + 1}`,
  size: 0,
  unit,
  price: 0,
});

export default function HomeScreen() {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>💰 ValueCalcer</Text>
        <Text style={styles.subtitle}>Find the best value for money</Text>
      </View>

      <View style={styles.unitRow}>
        <Text style={styles.unitLabel}>Unit:</Text>
        <UnitSelector value={unit} onChange={handleUnitChange} />
      </View>

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

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { padding: spacing.lg },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.white },
  subtitle: { fontSize: fontSize.md, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs },
  unitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  unitLabel: { fontSize: fontSize.md, fontWeight: '600', color: colors.text, marginRight: spacing.sm },
  addButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  addButtonText: { color: colors.white, fontSize: fontSize.lg, fontWeight: '600' },
});
