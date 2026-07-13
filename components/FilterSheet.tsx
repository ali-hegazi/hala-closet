import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { CATEGORIES } from '../constants/categories';
import { EMIRATES } from '../constants/emirates';
import { CONDITIONS } from '../constants/conditions';
import { Condition } from '../types/listing';

export interface FilterValues {
  category?: string;
  emirate?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  values: FilterValues;
  onApply: (values: FilterValues) => void;
}

export default function FilterSheet({ visible, onClose, values, onApply }: Props) {
  const [local, setLocal] = useState<FilterValues>(values);

  const reset = () => setLocal({});
  const apply = () => {
    onApply(local);
    onClose();
  };

  const toggle = <K extends keyof FilterValues>(key: K, val: FilterValues[K]) =>
    setLocal((prev) => ({ ...prev, [key]: prev[key] === val ? undefined : val }));

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={reset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <Section title="Category">
            <Chips
              items={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
              selected={local.category}
              onSelect={(v) => toggle('category', v)}
            />
          </Section>

          <Section title="Location">
            <Chips
              items={EMIRATES.map((e) => ({ id: e, label: e }))}
              selected={local.emirate}
              onSelect={(v) => toggle('emirate', v)}
            />
          </Section>

          <Section title="Condition">
            <Chips
              items={CONDITIONS.map((c) => ({ id: c, label: c }))}
              selected={local.condition}
              onSelect={(v) => toggle('condition', v)}
            />
          </Section>

          <Section title="Price (AED)">
            <View style={styles.priceRow}>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Min</Text>
                <TextInput
                  style={styles.priceField}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={Colors.textTertiary}
                  value={local.minPrice?.toString() ?? ''}
                  onChangeText={(t) =>
                    setLocal((prev) => ({
                      ...prev,
                      minPrice: t ? parseInt(t, 10) : undefined,
                    }))
                  }
                />
              </View>
              <Text style={styles.priceSep}>–</Text>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Max</Text>
                <TextInput
                  style={styles.priceField}
                  keyboardType="numeric"
                  placeholder="Any"
                  placeholderTextColor={Colors.textTertiary}
                  value={local.maxPrice?.toString() ?? ''}
                  onChangeText={(t) =>
                    setLocal((prev) => ({
                      ...prev,
                      maxPrice: t ? parseInt(t, 10) : undefined,
                    }))
                  }
                />
              </View>
            </View>
          </Section>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyBtn} onPress={apply}>
            <Text style={styles.applyText}>Show results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title}</Text>
      {children}
    </View>
  );
}

function Chips({
  items,
  selected,
  onSelect,
}: {
  items: { id: string; label: string }[];
  selected?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={chipStyles.wrap}>
      {items.map((item) => {
        const active = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[chipStyles.chip, active && chipStyles.chipActive]}
            onPress={() => onSelect(item.id)}
          >
            <Text style={[chipStyles.label, active && chipStyles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  resetText: {
    fontSize: Typography.base,
    color: Colors.accent,
    fontWeight: Typography.weightMedium,
  },
  body: { flex: 1 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyText: {
    color: Colors.textInverse,
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  priceInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  priceLabel: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  priceField: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    padding: 0,
  },
  priceSep: { fontSize: Typography.lg, color: Colors.textTertiary },
});

const sectionStyles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  title: { fontSize: Typography.base, fontWeight: Typography.weightBold, color: Colors.textPrimary, marginBottom: 12 },
});

const chipStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 24, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  label: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.weightMedium },
  labelActive: { color: Colors.textInverse },
});
