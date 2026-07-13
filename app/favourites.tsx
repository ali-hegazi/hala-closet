import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { useFavourites } from '../hooks/useFavourites';
import { MOCK_LISTINGS } from '../data/mockListings';
import ListingGrid from '../components/ListingGrid';

export default function FavouritesScreen() {
  const router = useRouter();
  const { favourites } = useFavourites();
  const favListings = MOCK_LISTINGS.filter((l) => favourites.has(l.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
        <View style={{ width: 22 }} />
      </View>

      <ListingGrid
        listings={favListings}
        emptyTitle="No favourites yet"
        emptySubtitle="Tap the heart on any listing to save it here."
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
});
