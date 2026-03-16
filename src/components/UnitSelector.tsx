import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { UNITS } from '../../shared/calculators';
import { colors, spacing, fontSize, borderRadius } from '../../shared/theme';
import { UnitType } from '../../shared/types';

interface Props {
  value: string;
  onChange: (unit: string) => void;
}

const UNIT_TYPES: UnitType[] = ['volume', 'weight', 'length', 'area'];

export default function UnitSelector({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {UNIT_TYPES.map(type => (
        <View key={type} style={styles.group}>
          <Text style={styles.groupLabel}>{type}</Text>
          <View style={styles.row}>
            {UNITS.filter(u => u.type === type).map(unit => (
              <TouchableOpacity
                key={unit.value}
                style={[styles.chip, value === unit.value && styles.chipActive]}
                onPress={() => onChange(unit.value)}
              >
                <Text style={[styles.chipText, value === unit.value && styles.chipTextActive]}>
                  {unit.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0 },
  group: { marginRight: spacing.lg },
  groupLabel: { fontSize: fontSize.sm, color: colors.textSecondary, textTransform: 'capitalize', marginBottom: 2 },
  row: { flexDirection: 'row' },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: fontSize.sm, color: colors.text },
  chipTextActive: { color: colors.white, fontWeight: 'bold' },
});
