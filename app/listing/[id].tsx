import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { getListingById } from '../../data/mockListings';
import { getUserById } from '../../data/mockUsers';
import { formatPrice } from '../../utils/formatPrice';
import { formatRelativeDate } from '../../utils/formatDate';
import { useFavourites } from '../../hooks/useFavourites';
import { useConversations } from '../../hooks/useConversations';
import ConditionBadge from '../../components/ConditionBadge';
import StatusBadge from '../../components/StatusBadge';
import SellerCard from '../../components/SellerCard';
import ReportSheet from '../../components/ReportSheet';

const { width } = Dimensions.get('window');

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const listing = getListingById(id);
  const { isFavourited, toggle } = useFavourites();
  const { startConversation } = useConversations();

  if (!listing) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Listing not found.</Text>
      </SafeAreaView>
    );
  }

  const seller = getUserById(listing.sellerId);
  const favourited = isFavourited(listing.id);
  const isMine = listing.sellerId === 'me';
  const isActive = listing.status === 'active';

  // Navigate to existing conversation or create a new one.
  const handleMessage = () => {
    if (!seller) return;
    const conv = startConversation(listing.id, seller.id);
    router.push(`/chat/${conv.id}`);
  };

  const handleOffer = () => {
    router.push(`/modal/make-offer?listingId=${listing.id}`);
  };

  const handleMarkReserved = () => {
    Alert.alert('Mark as reserved', 'Reserve this listing for the current buyer?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reserve', style: 'default' },
    ]);
  };

  const handleMarkSold = () => {
    Alert.alert('Mark as sold', 'This will move the listing to your sold items.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Mark sold', style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Photo carousel ── */}
        <View style={styles.imageContainer}>
          <FlatList
            data={listing.photos}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => `photo-${i}`}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              setPhotoIndex(idx);
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.photo} contentFit="cover" />
            )}
          />

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favBtn} onPress={() => toggle(listing.id)}>
            <Ionicons
              name={favourited ? 'heart' : 'heart-outline'}
              size={22}
              color={favourited ? Colors.error : Colors.textPrimary}
            />
          </TouchableOpacity>

          {listing.photos.length > 1 && (
            <View style={styles.dotsRow}>
              {listing.photos.map((_, i) => (
                <View key={i} style={[styles.dot, i === photoIndex && styles.dotActive]} />
              ))}
            </View>
          )}

          {listing.status !== 'active' && (
            <View style={styles.statusOverlay}>
              <StatusBadge status={listing.status} />
            </View>
          )}
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(listing.price)}</Text>
            <StatusBadge status={listing.status} />
          </View>

          <Text style={styles.title}>{listing.title}</Text>

          <View style={styles.metaRow}>
            <ConditionBadge condition={listing.condition} />
            <View style={styles.metaChip}>
              <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.metaText}>
                {listing.emirate}{listing.area ? `, ${listing.area}` : ''}
              </Text>
            </View>
            <View style={styles.metaChip}>
              <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{formatRelativeDate(listing.createdAt)}</Text>
            </View>
          </View>

          {/* Item details */}
          <View style={styles.detailsCard}>
            <DetailRow label="Brand"     value={listing.brand} />
            <DetailRow label="Category"  value={`${listing.category} › ${listing.subcategory}`} />
            <DetailRow label="Size"      value={listing.size} />
            <DetailRow label="Condition" value={listing.condition} last />
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{listing.description}</Text>

          <Text style={styles.sectionTitle}>Delivery options</Text>
          <View style={styles.deliveryList}>
            {listing.delivery.map((opt) => (
              <View key={opt} style={styles.deliveryRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.deliveryText}>{opt}</Text>
              </View>
            ))}
          </View>

          {/* Seller card */}
          {seller && (
            <>
              <Text style={styles.sectionTitle}>Seller</Text>
              <SellerCard
                user={seller}
                showMessage={!isMine && isActive}
                onMessage={handleMessage}
              />
            </>
          )}

          {/* Safety notice */}
          <View style={styles.safetyCard}>
            <Ionicons name="shield-checkmark-outline" size={18} color={Colors.info} />
            <Text style={styles.safetyText}>
              Always meet in a safe public place. Hala Closet does not handle payments or
              shipping — arrange these directly with the seller.
            </Text>
          </View>

          {/* Seller-only: manage listing status */}
          {isMine && (
            <View style={styles.sellerControls}>
              <Text style={styles.sectionTitle}>Manage listing</Text>
              {listing.status === 'active' && (
                <TouchableOpacity style={styles.manageBtn} onPress={handleMarkReserved}>
                  <Ionicons name="bookmark-outline" size={18} color={Colors.warning} />
                  <Text style={[styles.manageBtnText, { color: Colors.warning }]}>
                    Mark as reserved
                  </Text>
                </TouchableOpacity>
              )}
              {(listing.status === 'active' || listing.status === 'reserved') && (
                <TouchableOpacity style={styles.manageBtn} onPress={handleMarkSold}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={Colors.success} />
                  <Text style={[styles.manageBtnText, { color: Colors.success }]}>
                    Mark as sold
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.reportBtn} onPress={() => setShowReport(true)}>
            <Ionicons name="flag-outline" size={14} color={Colors.textTertiary} />
            <Text style={styles.reportText}>Report this listing</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* ── Buyer action bar ── */}
      {!isMine && isActive && (
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.messageAction} onPress={handleMessage}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
            <Text style={styles.messageActionText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerAction} onPress={handleOffer}>
            <Text style={styles.offerActionText}>Make offer</Text>
          </TouchableOpacity>
        </View>
      )}

      <ReportSheet visible={showReport} onClose={() => setShowReport(false)} type="listing" />
    </SafeAreaView>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function DetailRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[detailStyles.row, !last && detailStyles.rowBorder]}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  label: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
  },
  value: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weightSemibold,
    flexShrink: 1,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  notFound: { textAlign: 'center', marginTop: 32, color: Colors.textSecondary },

  // Photo carousel
  imageContainer: { position: 'relative' },
  photo: { width, height: width * 1.1, backgroundColor: Colors.surface },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  favBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
  dotActive: { backgroundColor: Colors.textInverse, width: 14 },
  statusOverlay: { position: 'absolute', bottom: 20, left: 16 },

  // Body
  body: { padding: 16 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: { fontSize: Typography.xxl, fontWeight: Typography.weightBold, color: Colors.textPrimary },
  title: {
    fontSize: Typography.lg,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 26,
  },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metaText: { fontSize: Typography.xs, color: Colors.textSecondary },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  deliveryList: { gap: 8, marginBottom: 20 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  deliveryText: { fontSize: Typography.sm, color: Colors.textPrimary },
  safetyCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.infoLight,
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  safetyText: { flex: 1, fontSize: Typography.xs, color: Colors.info, lineHeight: 18 },

  // Seller manage controls
  sellerControls: { marginBottom: 8 },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  manageBtnText: { fontSize: Typography.base, fontWeight: Typography.weightSemibold },

  // Report
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  reportText: { fontSize: Typography.sm, color: Colors.textTertiary },

  // Buyer action bar
  actionBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  messageAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },
  messageActionText: {
    fontSize: Typography.base,
    fontWeight: Typography.weightSemibold,
    color: Colors.primary,
  },
  offerAction: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  offerActionText: {
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
    color: Colors.textInverse,
  },
});
