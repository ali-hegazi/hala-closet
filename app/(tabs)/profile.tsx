import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { ME } from '../../data/mockUsers';
import { MOCK_LISTINGS } from '../../data/mockListings';
import { formatRelativeDate } from '../../utils/formatDate';
import ListingCard from '../../components/ListingCard';
import EmptyState from '../../components/EmptyState';
import ReportSheet from '../../components/ReportSheet';

type Tab = 'active' | 'sold' | 'reserved';

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [showReport, setShowReport] = useState(false);

  const myListings = MOCK_LISTINGS.filter((l) => l.sellerId === 'me');

  const filteredListings = myListings.filter((l) => {
    if (activeTab === 'active') return l.status === 'active';
    if (activeTab === 'sold') return l.status === 'sold';
    if (activeTab === 'reserved') return l.status === 'reserved';
    return false;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRow}>
            <Image source={{ uri: ME.avatar }} style={styles.avatar} contentFit="cover" />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{ME.name}</Text>
          <Text style={styles.username}>@{ME.username}</Text>
          {ME.bio && <Text style={styles.bio}>{ME.bio}</Text>}

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ME.totalListings}</Text>
              <Text style={styles.statLabel}>Listed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ME.totalSold}</Text>
              <Text style={styles.statLabel}>Sold</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{ME.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{ME.emirate}</Text>
            <Text style={styles.dot}>·</Text>
            <Ionicons name="calendar-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.infoText}>Joined {formatRelativeDate(ME.joinedAt)}</Text>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* My listings */}
        <View style={styles.listingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My listings</Text>
            <TouchableOpacity onPress={() => router.push('/modal/create-listing')}>
              <View style={styles.newListingBtn}>
                <Ionicons name="add" size={16} color={Colors.textInverse} />
                <Text style={styles.newListingText}>New</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {(['active', 'reserved', 'sold'] as Tab[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredListings.length === 0 ? (
            <EmptyState
              icon="bag-outline"
              title={`No ${activeTab} listings`}
              subtitle={activeTab === 'active' ? "Tap 'New' to list your first item." : undefined}
            />
          ) : (
            <View style={styles.grid}>
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </View>
          )}
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuRow}
              onPress={item.label === 'Report an issue' ? () => setShowReport(true) : undefined}
            >
              <Ionicons name={item.icon as any} size={20} color={Colors.textSecondary} />
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ReportSheet visible={showReport} onClose={() => setShowReport(false)} type="user" />
    </SafeAreaView>
  );
}

type MenuItem = { label: string; icon: string; danger?: boolean };

const MENU_ITEMS: MenuItem[] = [
  { label: 'Favourites',       icon: 'heart-outline' },
  { label: 'Purchase history', icon: 'bag-handle-outline' },
  { label: 'Notifications',    icon: 'notifications-outline' },
  { label: 'Help & support',   icon: 'help-circle-outline' },
  { label: 'Report an issue',  icon: 'flag-outline' },
  { label: 'Log out',          icon: 'log-out-outline', danger: true },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarRow: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.border,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  name: {
    fontSize: Typography.lg,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  username: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  bio: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stat: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.border },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  infoText: { fontSize: Typography.xs, color: Colors.textSecondary },
  dot: { color: Colors.textTertiary },
  editBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  editBtnText: {
    color: Colors.primary,
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
  },
  listingsSection: { marginBottom: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  newListingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  newListingText: {
    color: Colors.textInverse,
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: Typography.sm, color: Colors.textSecondary, fontWeight: Typography.weightMedium },
  tabTextActive: { color: Colors.textInverse },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  menu: {
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 40,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuLabel: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  menuLabelDanger: { color: Colors.error },
});
