import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ProductOption, ComparisonResult } from '../../shared/types';
import { formatPricePerUnit } from '../../shared/calculators';
import { colors, spacing, fontSize, borderRadius } from '../../shared/theme';

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

  return (
    <View style={[styles.card, isBest && (isTopBest ? styles.cardBestTop : styles.cardBestSecondary)]}>
      {isBest && (
        <View style={[styles.badge, isTopBest ? styles.badgeTop : styles.badgeSecondary]}>
          <Text style={styles.badgeText}>🏆 {isPlural ? 'Best Values' : 'Best Value'}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={option.name}
          onChangeText={v => onUpdate(option.id, { name: v })}
          placeholder={`Option ${index + 1}`}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Size ({option.unit})</Text>
        <TextInput
          style={styles.input}
          value={option.size === 0 ? '' : String(option.size)}
          onChangeText={v => onUpdate(option.id, { size: parseFloat(v) || 0 })}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price ({currencySymbol})</Text>
        <TextInput
          style={styles.input}
          value={option.price === 0 ? '' : String(option.price)}
          onChangeText={v => onUpdate(option.id, { price: parseFloat(v) || 0 })}
          placeholder="0.00"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.resultRow}>
        <Text style={[styles.result, isBest && styles.resultBest]}>
          {result ? formatPricePerUnit(result.pricePerBaseUnit, option.unit, currencySymbol) : '—'}
        </Text>
        {canRemove && (
          <TouchableOpacity onPress={() => onRemove(option.id)} style={styles.removeButton}>
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBestTop: { borderColor: colors.successDark, backgroundColor: colors.successLight },
  cardBestSecondary: { borderColor: colors.success, backgroundColor: colors.successLighter },
  badge: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  badgeTop: { backgroundColor: colors.successDark },
  badgeSecondary: { backgroundColor: colors.success },
  badgeText: { color: colors.white, fontWeight: 'bold', fontSize: fontSize.sm },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  label: { width: 90, fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '500' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: fontSize.md,
    color: colors.text,
  },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  result: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  resultBest: { color: colors.success },
  removeButton: { padding: spacing.xs },
  removeText: { color: colors.error, fontWeight: 'bold', fontSize: fontSize.lg },
});
