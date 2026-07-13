import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Listing } from '../types/listing';
import ListingCard from './ListingCard';
import EmptyState from './EmptyState';

interface Props {
  listings: Listing[];
  emptyTitle?: string;
  emptySubtitle?: string;
  ListHeaderComponent?: React.ComponentType | React.ReactElement | null;
}

export default function ListingGrid({
  listings,
  emptyTitle = 'Nothing here yet',
  emptySubtitle = 'Check back soon.',
  ListHeaderComponent,
}: Props) {
  if (listings.length === 0) {
    return (
      <View style={styles.emptyWrapper}>
        {ListHeaderComponent
          ? React.isValidElement(ListHeaderComponent)
            ? ListHeaderComponent
            : React.createElement(ListHeaderComponent as React.ComponentType)
          : null}
        <EmptyState title={emptyTitle} subtitle={emptySubtitle} icon="bag-outline" />
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => <ListingCard listing={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 12,
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  emptyWrapper: {
    flex: 1,
  },
});
