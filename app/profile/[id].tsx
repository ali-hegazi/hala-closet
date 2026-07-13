import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { getUserById } from '../../data/mockUsers';
import { getListingsBySeller } from '../../data/mockListings';
import { formatRelativeDate } from '../../utils/formatDate';
import ListingCard from '../../components/ListingCard';
import ReportSheet from '../../components/ReportSheet';

export default function PublicProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showReport, setShowReport] = useState(false);

  const user = getUserById(id);
  const listings = user ? getListingsBySeller(user.id).filter((l) => l.status !== 'removed') : [];

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>User not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowReport(true)}>
            <Ionicons name="flag-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} contentFit="cover" />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            {user.verified && (
              <Ionicons name="checkmark-circle" size={18} color={Colors.info} />
            )}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.totalListings}</Text>
              <Text style={styles.statLabel}>Listed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.totalSold}</Text>
              <Text style={styles.statLabel}>Sold</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text style={styles.statValue}>{user.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.statLabel}>{user.reviewCount} reviews</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{user.emirate}</Text>
            <Text style={styles.dot}>·</Text>
            <Ionicons name="calendar-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.metaText}>Member since {formatRelativeDate(user.joinedAt)}</Text>
          </View>
        </View>

        {/* Listings */}
        <View style={styles.listingsHeader}>
          <Text style={styles.listingsTitle}>
            Listings ({listings.length})
          </Text>
        </View>

        <View style={styles.grid}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ReportSheet visible={showReport} onClose={() => setShowReport(false)} type="user" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  profileSection: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.surface, marginBottom: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  name: { fontSize: Typography.xl, fontWeight: Typography.weightBold, color: Colors.textPrimary },
  username: { fontSize: Typography.sm, color: Colors.textSecondary, marginBottom: 8 },
  bio: { fontSize: Typography.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 16, maxWidth: 280 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stat: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: Typography.lg, fontWeight: Typography.weightBold, color: Colors.textPrimary },
  statLabel: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.border },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: Typography.xs, color: Colors.textSecondary },
  dot: { color: Colors.textTertiary },
  listingsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  listingsTitle: { fontSize: Typography.md, fontWeight: Typography.weightBold, color: Colors.textPrimary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
});
