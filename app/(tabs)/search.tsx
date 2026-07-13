import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { useListings } from '../../hooks/useListings';
import { FilterValues } from '../../components/FilterSheet';
import SearchBar from '../../components/SearchBar';
import FilterSheet from '../../components/FilterSheet';
import ListingGrid from '../../components/ListingGrid';
import CategoryPill from '../../components/CategoryPill';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterValues>({});
  const [showFilter, setShowFilter] = useState(false);

  const listings = useListings({ query, ...filters });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.searchRow}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          autoFocus={false}
        />
        <TouchableOpacity
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={activeFilterCount > 0 ? Colors.textInverse : Colors.textPrimary}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ListingGrid
        listings={listings}
        emptyTitle={query ? `No results for "${query}"` : 'Start searching'}
        emptySubtitle={query ? 'Try a different brand or keyword.' : 'Type a brand, item, or keyword above.'}
        ListHeaderComponent={
          <CategoryPill
            selected={filters.category}
            onSelect={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
          />
        }
      />

      <FilterSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        values={filters}
        onApply={setFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    position: 'relative',
  },
  filterBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.accent,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: Colors.textInverse,
    fontSize: 9,
    fontWeight: Typography.weightBold,
  },
});
