import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Condition } from '../types/listing';
import { CONDITION_COLORS } from '../constants/conditions';
import { Typography } from '../constants/typography';

interface Props {
  condition: Condition;
  small?: boolean;
}

export default function ConditionBadge({ condition, small }: Props) {
  const colors = CONDITION_COLORS[condition];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, small && styles.small]}>
      <Text style={[styles.text, { color: colors.text }, small && styles.smallText]}>
        {condition}
      </Text>
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
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
  },
  smallText: {
    fontSize: Typography.xs,
  },
});
