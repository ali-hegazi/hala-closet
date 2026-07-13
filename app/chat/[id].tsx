import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { useConversations } from '../../hooks/useConversations';
import { getUserById } from '../../data/mockUsers';
import { getListingById } from '../../data/mockListings';
import { formatPrice } from '../../utils/formatPrice';
import { formatMessageTime } from '../../utils/formatDate';
import ReportSheet from '../../components/ReportSheet';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getConversation, sendMessage, markRead } = useConversations();
  const [text, setText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const listRef = useRef<FlatList>(null);

  const conversation = getConversation(id);
  if (!conversation) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Conversation not found.</Text>
      </SafeAreaView>
    );
  }

  const otherUserId = conversation.buyerId === 'me' ? conversation.sellerId : conversation.buyerId;
  const otherUser = getUserById(otherUserId);
  const listing = getListingById(conversation.listingId);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(conversation.id, trimmed);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        {otherUser && (
          <View style={styles.headerUser}>
            <Image source={{ uri: otherUser.avatar }} style={styles.headerAvatar} contentFit="cover" />
            <View>
              <Text style={styles.headerName}>{otherUser.name}</Text>
              <Text style={styles.headerSub}>@{otherUser.username}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity onPress={() => setShowReport(true)}>
          <Ionicons name="ellipsis-horizontal" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Listing context */}
      {listing && (
        <TouchableOpacity
          style={styles.listingBanner}
          onPress={() => router.push(`/listing/${listing.id}`)}
          activeOpacity={0.85}
        >
          <Image source={{ uri: listing.photos[0] }} style={styles.listingThumb} contentFit="cover" />
          <View style={styles.listingBannerInfo}>
            <Text style={styles.listingBannerTitle} numberOfLines={1}>{listing.title}</Text>
            <Text style={styles.listingBannerPrice}>{formatPrice(listing.price)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <FlatList
          ref={listRef}
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item }) => {
            const isMe = item.senderId === 'me';
            return (
              <View style={[styles.bubbleWrapper, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
                {item.isOffer ? (
                  <View style={[styles.offerBubble, isMe ? styles.offerBubbleMe : styles.offerBubbleThem]}>
                    <View style={styles.offerTag}>
                      <Ionicons name="pricetag-outline" size={12} color={Colors.accent} />
                      <Text style={styles.offerTagText}>Offer</Text>
                    </View>
                    <Text style={[styles.offerAmount, isMe && styles.offerAmountMe]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.bubbleTime, isMe ? styles.bubbleTimeMe : styles.bubbleTimeThem]}>
                      {formatMessageTime(item.createdAt)}
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                    <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.bubbleTime, isMe ? styles.bubbleTimeMe : styles.bubbleTimeThem]}>
                      {formatMessageTime(item.createdAt)}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />

        {/* Input */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.offerBtn}
            onPress={() => router.push(`/modal/make-offer?listingId=${conversation.listingId}`)}
          >
            <Ionicons name="pricetag-outline" size={18} color={Colors.accent} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Message…"
            placeholderTextColor={Colors.textTertiary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Ionicons name="send" size={18} color={text.trim() ? Colors.textInverse : Colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <ReportSheet visible={showReport} onClose={() => setShowReport(false)} type="user" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUser: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surface },
  headerName: { fontSize: Typography.base, fontWeight: Typography.weightSemibold, color: Colors.textPrimary },
  headerSub: { fontSize: Typography.xs, color: Colors.textSecondary },
  listingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listingThumb: { width: 40, height: 40, borderRadius: 8, backgroundColor: Colors.border },
  listingBannerInfo: { flex: 1 },
  listingBannerTitle: { fontSize: Typography.sm, fontWeight: Typography.weightMedium, color: Colors.textPrimary },
  listingBannerPrice: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  messageList: { paddingHorizontal: 14, paddingVertical: 16, gap: 8 },
  bubbleWrapper: { maxWidth: '80%' },
  bubbleLeft: { alignSelf: 'flex-start' },
  bubbleRight: { alignSelf: 'flex-end' },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.surface, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: Typography.base, color: Colors.textPrimary, lineHeight: 22 },
  bubbleTextMe: { color: Colors.textInverse },
  bubbleTime: { fontSize: 10, marginTop: 4 },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.6)', textAlign: 'right' },
  bubbleTimeThem: { color: Colors.textTertiary },
  offerBubble: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
  },
  offerBubbleMe: { borderColor: Colors.accent, backgroundColor: Colors.accentLight },
  offerBubbleThem: { borderColor: Colors.border, backgroundColor: Colors.surface },
  offerTag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  offerTagText: { fontSize: Typography.xs, color: Colors.accent, fontWeight: Typography.weightSemibold, textTransform: 'uppercase' },
  offerAmount: { fontSize: Typography.lg, fontWeight: Typography.weightBold, color: Colors.textPrimary },
  offerAmountMe: { color: Colors.textPrimary },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
    backgroundColor: Colors.background,
  },
  offerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sendBtnDisabled: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
});
