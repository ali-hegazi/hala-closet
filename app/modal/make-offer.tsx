import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
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
import { useOffers } from '../../hooks/useOffers';
import { useConversations } from '../../hooks/useConversations';

export default function MakeOfferModal() {
  const { listingId } = useLocalSearchParams<{ listingId: string }>();
  const router = useRouter();
  const { makeOffer } = useOffers();
  const { startConversation, sendMessage } = useConversations();

  const listing = getListingById(listingId);
  const seller = listing ? getUserById(listing.sellerId) : undefined;

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  if (!listing || !seller) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Listing not found.</Text>
      </SafeAreaView>
    );
  }

  const parsedAmount = parseInt(amount, 10);
  const isValid = !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount < listing.price;

  const handleSubmit = () => {
    if (!isValid) return;

    const offer = makeOffer({
      listingId: listing.id,
      buyerId: 'me',
      sellerId: seller.id,
      amount: parsedAmount,
      message: note || undefined,
    });

    const conv = startConversation(listing.id, seller.id);
    sendMessage(
      conv.id,
      `Offer: ${formatPrice(parsedAmount)}${note ? ` — "${note}"` : ''}`,
      true,
      offer.id,
    );

    router.dismiss();
    setTimeout(() => router.push(`/chat/${conv.id}`), 100);
  };

  const percentage = parsedAmount && listing.price
    ? Math.round((parsedAmount / listing.price) * 100)
    : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make an offer</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {/* Listing preview */}
          <View style={styles.listingPreview}>
            <Image source={{ uri: listing.photos[0] }} style={styles.listingImage} contentFit="cover" />
            <View style={styles.listingInfo}>
              <Text style={styles.listingBrand}>{listing.brand}</Text>
              <Text style={styles.listingTitle} numberOfLines={2}>{listing.title}</Text>
              <Text style={styles.listedPrice}>Listed at {formatPrice(listing.price)}</Text>
            </View>
          </View>

          {/* Amount input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Your offer (AED)</Text>
            <View style={styles.amountInputWrapper}>
              <Text style={styles.currency}>AED</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor={Colors.textTertiary}
                keyboardType="numeric"
                autoFocus
                maxLength={6}
              />
            </View>
            {percentage && (
              <Text style={[styles.percentageHint, percentage >= 80 ? styles.hintGood : styles.hintWarn]}>
                {percentage}% of listed price{percentage < 70 ? ' — seller may decline' : ''}
              </Text>
            )}
            {parsedAmount >= listing.price && amount.length > 0 && (
              <Text style={styles.hintError}>Offer must be below the listed price</Text>
            )}
          </View>

          {/* Optional note */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Note to seller (optional)</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="E.g. Can pick up this week"
              placeholderTextColor={Colors.textTertiary}
              multiline
              maxLength={200}
            />
          </View>

          {/* Info card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              The seller will be notified and can accept, decline, or counter your offer in chat. Payment and collection are arranged between you and the seller.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            <Text style={styles.submitText}>
              {isValid ? `Send offer — ${formatPrice(parsedAmount)}` : 'Enter a valid offer amount'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  body: { flex: 1, paddingHorizontal: 20 },
  listingPreview: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 20,
  },
  listingImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    flexShrink: 0,
  },
  listingInfo: { flex: 1, justifyContent: 'center' },
  listingBrand: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  listingTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  listedPrice: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  inputSection: { marginBottom: 24 },
  inputLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  currency: {
    fontSize: Typography.xl,
    fontWeight: Typography.weightBold,
    color: Colors.textTertiary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: Typography.xxxl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    paddingVertical: 16,
    padding: 0,
  },
  percentageHint: {
    fontSize: Typography.xs,
    marginTop: 8,
  },
  hintGood: { color: Colors.success },
  hintWarn: { color: Colors.warning },
  hintError: { color: Colors.error, fontSize: Typography.xs, marginTop: 8 },
  noteInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoText: { flex: 1, fontSize: Typography.xs, color: Colors.textSecondary, lineHeight: 18 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 8 : 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitText: {
    color: Colors.textInverse,
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
  },
});
