import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListingStatus } from '../types/listing';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

const STATUS_CONFIG: Record<ListingStatus, { label: string; bg: string; text: string }> = {
  active: { label: 'Available', bg: Colors.successLight, text: Colors.success },
  reserved: { label: 'Reserved', bg: Colors.warningLight, text: Colors.warning },
  sold: { label: 'Sold', bg: Colors.borderLight, text: Colors.textSecondary },
  removed: { label: 'Removed', bg: Colors.errorLight, text: Colors.error },
};

interface Props {
  status: ListingStatus;
}

export default function StatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: Typography.xs,
    fontWeight: Typography.weightBold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
