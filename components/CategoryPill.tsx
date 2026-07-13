import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  selected?: string;
  onSelect: (categoryId: string | undefined) => void;
}

export default function CategoryPill({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.pill, !selected && styles.pillActive]}
        onPress={() => onSelect(undefined)}
      >
        <Text style={[styles.label, !selected && styles.labelActive]}>All</Text>
      </TouchableOpacity>

      {CATEGORIES.map((cat) => {
        const active = selected === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(active ? undefined : cat.id)}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightMedium,
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.textInverse,
  },
});
