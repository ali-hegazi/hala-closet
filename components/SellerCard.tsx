import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { User } from '../types/user';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  user: User;
  showMessage?: boolean;
  onMessage?: () => void;
}

export default function SellerCard({ user, showMessage, onMessage }: Props) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => router.push(`/profile/${user.id}`)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: user.avatar }} style={styles.avatar} contentFit="cover" />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            {user.verified && (
              <Ionicons name="checkmark-circle" size={15} color={Colors.info} />
            )}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
          <View style={styles.stats}>
            <Ionicons name="star" size={12} color="#FBBF24" />
            <Text style={styles.rating}>{user.rating.toFixed(1)}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.statText}>{user.totalSold} sold</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.statText}>{user.emirate}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {showMessage && (
        <TouchableOpacity style={styles.messageBtn} onPress={onMessage}>
          <Ionicons name="chatbubble-outline" size={16} color={Colors.primary} />
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.border,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: Typography.base,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
  },
  username: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rating: {
    fontSize: Typography.xs,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
  },
  dot: {
    color: Colors.textTertiary,
    fontSize: Typography.xs,
  },
  statText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.primary,
  },
});
