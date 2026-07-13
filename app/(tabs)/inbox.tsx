import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { useConversations } from '../../hooks/useConversations';
import { getUserById } from '../../data/mockUsers';
import { getListingById } from '../../data/mockListings';
import { formatRelativeDate } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import EmptyState from '../../components/EmptyState';

export default function InboxScreen() {
  const router = useRouter();
  const { conversations } = useConversations();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
      </View>

      {conversations.length === 0 ? (
        <EmptyState
          icon="chatbubbles-outline"
          title="No messages yet"
          subtitle="When you message a seller or receive an inquiry, it'll appear here."
        />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const otherUserId = item.buyerId === 'me' ? item.sellerId : item.buyerId;
            const otherUser = getUserById(otherUserId);
            const listing = getListingById(item.listingId);
            if (!otherUser || !listing) return null;

            return (
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.8}
                onPress={() => router.push(`/chat/${item.id}`)}
              >
                <Image source={{ uri: otherUser.avatar }} style={styles.avatar} contentFit="cover" />
                <View style={styles.content}>
                  <View style={styles.topRow}>
                    <Text style={styles.userName} numberOfLines={1}>
                      {otherUser.name}
                    </Text>
                    <Text style={styles.time}>{formatRelativeDate(item.lastMessageAt)}</Text>
                  </View>
                  <View style={styles.listingRow}>
                    <Image source={{ uri: listing.photos[0] }} style={styles.listingThumb} contentFit="cover" />
                    <View style={styles.listingInfo}>
                      <Text style={styles.listingTitle} numberOfLines={1}>{listing.title}</Text>
                      <Text style={styles.listingPrice}>{formatPrice(listing.price)}</Text>
                    </View>
                  </View>
                  <View style={styles.lastMsgRow}>
                    {item.unreadCount > 0 && <View style={styles.unreadDot} />}
                    <Text
                      style={[styles.lastMsg, item.unreadCount > 0 && styles.lastMsgUnread]}
                      numberOfLines={1}
                    >
                      {item.lastMessage || 'Start the conversation'}
                    </Text>
                    {item.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  list: { paddingBottom: 32 },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.surface,
    flexShrink: 0,
  },
  content: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: Typography.base,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    flex: 1,
  },
  time: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    marginLeft: 8,
  },
  listingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
  },
  listingThumb: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: Colors.border,
  },
  listingInfo: { flex: 1 },
  listingTitle: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weightMedium,
  },
  listingPrice: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  lastMsgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.accent,
    flexShrink: 0,
  },
  lastMsg: {
    flex: 1,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  lastMsgUnread: {
    color: Colors.textPrimary,
    fontWeight: Typography.weightMedium,
  },
  unreadBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    color: Colors.textInverse,
    fontSize: Typography.xs,
    fontWeight: Typography.weightBold,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: 74,
  },
});
