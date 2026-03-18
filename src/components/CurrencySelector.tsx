import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CURRENCIES } from '../../shared/calculators';
import { colors, spacing, fontSize, borderRadius } from '../../shared/theme';

interface Props {
  value: string;
  onChange: (currencyCode: string) => void;
}

export default function CurrencySelector({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {CURRENCIES.map(currency => (
        <TouchableOpacity
          key={currency.code}
          style={[styles.chip, value === currency.code && styles.chipActive]}
          onPress={() => onChange(currency.code)}
        >
          <Text style={[styles.chipText, value === currency.code && styles.chipTextActive]}>
            {currency.symbol}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
