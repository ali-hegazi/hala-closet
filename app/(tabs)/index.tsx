import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { useListings, useFeaturedListings } from '../../hooks/useListings';
import { formatPrice } from '../../utils/formatPrice';
import CategoryPill from '../../components/CategoryPill';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';

const { width } = Dimensions.get('window');
const FEATURED_WIDTH = width * 0.72;

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const featured = useFeaturedListings();
  const listings = useListings({ category: selectedCategory });
  const recent = listings.filter((l) => l.status === 'active').slice(0, 20);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Hala Closet</Text>
            <Text style={styles.tagline}>Buy and sell pre-loved fashion in the UAE</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/(tabs)/inbox')}
            >
              <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <SearchBar
          value=""
          onChangeText={() => {}}
          onPress={() => router.push('/(tabs)/search')}
          editable={false}
        />

        {/* Categories */}
        <CategoryPill selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Featured */}
        {featured.length > 0 && !selectedCategory && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured picks</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featured}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.featuredCard}
                  activeOpacity={0.92}
                  onPress={() => router.push(`/listing/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.photos[0] }}
                    style={styles.featuredImage}
                    contentFit="cover"
                    transition={200}
                  />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredBrand} numberOfLines={1}>
                      {item.brand}
                    </Text>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.featuredPrice}>{formatPrice(item.price)}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Recent */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? 'Listings' : 'Just listed'}
            </Text>
          </View>
          <View style={styles.grid}>
            {recent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </View>
          {recent.length === 0 && (
            <Text style={styles.emptyText}>Nothing in this category yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logo: {
    fontSize: Typography.xl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 1,
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
  section: { marginBottom: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.weightSemibold,
  },
  featuredList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featuredCard: {
    width: FEATURED_WIDTH,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: FEATURED_WIDTH * 0.75,
    backgroundColor: Colors.surface,
  },
  featuredInfo: { padding: 12 },
  featuredBrand: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  featuredPrice: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: Typography.base,
    paddingVertical: 32,
  },
});
