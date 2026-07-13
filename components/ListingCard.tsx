import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Listing } from '../types/listing';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { formatPrice } from '../utils/formatPrice';
import { formatRelativeDate } from '../utils/formatDate';
import { useFavourites } from '../hooks/useFavourites';
import ConditionBadge from './ConditionBadge';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  listing: Listing;
  onPress?: () => void;
}

export default function ListingCard({ listing, onPress }: Props) {
  const router = useRouter();
  const { isFavourited, toggle } = useFavourites();
  const favourited = isFavourited(listing.id);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/listing/${listing.id}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: listing.photos[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {listing.status !== 'active' && (
          <View style={styles.soldOverlay}>
            <Text style={styles.soldText}>
              {listing.status === 'reserved' ? 'Reserved' : 'Sold'}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favouriteBtn}
          onPress={(e) => {
            e.stopPropagation();
            toggle(listing.id);
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favourited ? 'heart' : 'heart-outline'}
            size={20}
            color={favourited ? Colors.error : Colors.textInverse}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {listing.brand}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>
        <View style={styles.conditionRow}>
          <ConditionBadge condition={listing.condition} small />
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(listing.price)}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={11} color={Colors.textTertiary} />
            <Text style={styles.location} numberOfLines={1}>
              {listing.emirate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.25,
    backgroundColor: Colors.surface,
  },
  soldOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldText: {
    color: Colors.textInverse,
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    letterSpacing: 0.5,
  },
  favouriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,
  },
  info: {
    padding: 10,
  },
  brand: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weightMedium,
    lineHeight: 18,
    marginBottom: 6,
  },
  conditionRow: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weightBold,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  location: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
  },
});
