import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { CATEGORIES } from '../../constants/categories';
import { EMIRATES } from '../../constants/emirates';
import { CONDITIONS } from '../../constants/conditions';
import { DELIVERY_OPTIONS } from '../../constants/delivery';
import { Condition, DeliveryOption } from '../../types/listing';

const { width } = Dimensions.get('window');

const PROHIBITED_ITEMS = [
  'Counterfeit or replica goods',
  'Stolen goods',
  'Weapons or dangerous items',
  'Alcohol or tobacco products',
  'Medicines or supplements',
  'Used underwear',
  'Adult or explicit content',
  'Anything illegal in the UAE',
];

const SIZES = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One size',
  'UK 4', 'UK 6', 'UK 8', 'UK 10', 'UK 12',
  'EU 34', 'EU 36', 'EU 38', 'EU 40', 'EU 42',
];

// Placeholder images used for photo simulation until a camera/library picker is wired up.
// Replace addPhoto() with an expo-image-picker call when ready.
const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
];

// 8 steps in order
type Step =
  | 'category'
  | 'subcategory'
  | 'photos'
  | 'details'
  | 'pricing'
  | 'review'
  | 'declaration'
  | 'publish';

const STEPS: Step[] = [
  'category',
  'subcategory',
  'photos',
  'details',
  'pricing',
  'review',
  'declaration',
  'publish',
];

const STEP_TITLES: Record<Step, string> = {
  category:    'Choose category',
  subcategory: 'Choose subcategory',
  photos:      'Add photos',
  details:     'Item details',
  pricing:     'Pricing & delivery',
  review:      'Review listing',
  declaration: 'Seller declaration',
  publish:     '',
};

export default function CreateListingModal() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('category');

  // form state
  const [category, setCategory]       = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [photos, setPhotos]            = useState<string[]>([]);
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand]             = useState('');
  const [size, setSize]               = useState('');
  const [condition, setCondition]     = useState<Condition | ''>('');
  const [price, setPrice]             = useState('');
  const [emirate, setEmirate]         = useState('');
  const [area, setArea]               = useState('');
  const [delivery, setDelivery]       = useState<DeliveryOption[]>([]);
  const [declared, setDeclared]       = useState(false);

  const stepIndex       = STEPS.indexOf(step);
  const totalVisible    = STEPS.length - 1; // 'publish' is not a real UI step
  const selectedCat     = CATEGORIES.find((c) => c.id === category);

  // ── navigation ──────────────────────────────────────────────
  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    if (stepIndex === 0) {
      router.dismiss();
    } else {
      setStep(STEPS[stepIndex - 1]);
    }
  };

  const handlePublish = () => {
    Alert.alert(
      'Listing published! 🎉',
      'Your item is now live on Hala Closet.',
      [{ text: 'Done', onPress: () => router.dismiss() }],
    );
  };

  // ── per-step gate ────────────────────────────────────────────
  const canProceed: Record<Step, boolean> = {
    category:    !!category,
    subcategory: !!subcategory,
    photos:      photos.length >= 2,
    details:     title.trim().length > 2 && !!brand && !!size && !!condition,
    pricing:     price.length > 0 && !!emirate && delivery.length > 0,
    review:      true,
    declaration: declared,
    publish:     true,
  };

  // ── helpers ──────────────────────────────────────────────────
  const toggleDelivery = (opt: DeliveryOption) =>
    setDelivery((prev) =>
      prev.includes(opt) ? prev.filter((d) => d !== opt) : [...prev, opt],
    );

  const addPhoto = () => {
    if (photos.length >= 8) return;
    const next = PLACEHOLDER_PHOTOS[photos.length % PLACEHOLDER_PHOTOS.length];
    setPhotos((prev) => [...prev, next]);
  };

  const removePhoto = (index: number) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  // ── render ───────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={stepIndex === 0 ? 'close' : 'arrow-back'}
            size={24}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{STEP_TITLES[step]}</Text>

        <Text style={styles.stepCount}>
          {stepIndex + 1}/{totalVisible}
        </Text>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${((stepIndex + 1) / totalVisible) * 100}%` },
          ]}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ══════════════════════════════════════════
              STEP 1 — CATEGORY
          ══════════════════════════════════════════ */}
          {step === 'category' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepSubtitle}>
                What are you selling? Choose the main category.
              </Text>

              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => {
                  const active = category === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[styles.categoryCard, active && styles.categoryCardActive]}
                      onPress={() => {
                        setCategory(cat.id);
                        setSubcategory('');
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                      <Text
                        style={[
                          styles.categoryLabel,
                          active && styles.categoryLabelActive,
                        ]}
                      >
                        {cat.label}
                      </Text>
                      {active && (
                        <View style={styles.categoryCheck}>
                          <Ionicons name="checkmark" size={12} color={Colors.textInverse} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — SUBCATEGORY
          ══════════════════════════════════════════ */}
          {step === 'subcategory' && selectedCat && (
            <View style={styles.stepContent}>
              {/* Selected category breadcrumb */}
              <TouchableOpacity style={styles.breadcrumb} onPress={goBack}>
                <Ionicons name="arrow-back" size={14} color={Colors.accent} />
                <Text style={styles.breadcrumbText}>
                  {selectedCat.emoji} {selectedCat.label}
                </Text>
                <Text style={styles.breadcrumbChange}>Change</Text>
              </TouchableOpacity>

              <Text style={styles.stepSubtitle}>
                Now pick the most specific subcategory.
              </Text>

              <View style={styles.subcategoryList}>
                {selectedCat.subcategories.map((sub) => {
                  const active = subcategory === sub;
                  return (
                    <TouchableOpacity
                      key={sub}
                      style={[styles.subcategoryRow, active && styles.subcategoryRowActive]}
                      onPress={() => setSubcategory(sub)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.subcategoryLabel,
                          active && styles.subcategoryLabelActive,
                        ]}
                      >
                        {sub}
                      </Text>
                      <View
                        style={[styles.subcategoryRadio, active && styles.subcategoryRadioActive]}
                      >
                        {active && <View style={styles.subcategoryRadioDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 3 — PHOTOS
          ══════════════════════════════════════════ */}
          {step === 'photos' && (
            <View style={styles.stepContent}>
              {/* Helper text + progress */}
              <View style={styles.photoRequirementRow}>
                <Ionicons
                  name={photos.length >= 2 ? 'checkmark-circle' : 'camera-outline'}
                  size={18}
                  color={photos.length >= 2 ? Colors.success : Colors.textTertiary}
                />
                <Text
                  style={[
                    styles.photoRequirementText,
                    photos.length >= 2 && styles.photoRequirementMet,
                  ]}
                >
                  {photos.length >= 2
                    ? `${photos.length} photo${photos.length > 1 ? 's' : ''} added — good to go!`
                    : `Add at least 2 clear photos so buyers can trust the listing. (${photos.length}/2 added)`}
                </Text>
              </View>

              {/* Photo grid */}
              <View style={styles.photoGrid}>
                {photos.map((uri, index) => (
                  <View key={`photo-${index}`} style={styles.photoThumb}>
                    <Image source={{ uri }} style={styles.photoThumbImage} contentFit="cover" />
                    <TouchableOpacity
                      style={styles.photoRemoveBtn}
                      onPress={() => removePhoto(index)}
                      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                    >
                      <Ionicons name="close-circle" size={22} color={Colors.textInverse} />
                    </TouchableOpacity>
                  </View>
                ))}

                {photos.length < 8 && (
                  <TouchableOpacity style={styles.addPhotoBtn} onPress={addPhoto}>
                    <Ionicons name="camera-outline" size={28} color={Colors.textTertiary} />
                    <Text style={styles.addPhotoText}>Add photo</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.photoCountHint}>
                {photos.length}/8 photos · First photo will be the cover image
              </Text>

              {/* Prohibited items reminder */}
              <View style={styles.prohibitedCard}>
                <View style={styles.prohibitedHeader}>
                  <Ionicons name="warning-outline" size={16} color={Colors.warning} />
                  <Text style={styles.prohibitedTitle}>Prohibited items reminder</Text>
                </View>
                <Text style={styles.prohibitedIntro}>
                  The following are not permitted on Hala Closet:
                </Text>
                {PROHIBITED_ITEMS.map((item) => (
                  <View key={item} style={styles.prohibitedRow}>
                    <Text style={styles.prohibitedBullet}>•</Text>
                    <Text style={styles.prohibitedText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 4 — DETAILS
          ══════════════════════════════════════════ */}
          {step === 'details' && (
            <View style={styles.stepContent}>
              <Field label="Title *">
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="E.g. Zara Linen Wrap Dress"
                  placeholderTextColor={Colors.textTertiary}
                  maxLength={80}
                />
                <Text style={styles.charCount}>{title.length}/80</Text>
              </Field>

              <Field label="Description">
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe the item — fit, fabric, any marks…"
                  placeholderTextColor={Colors.textTertiary}
                  multiline
                  maxLength={600}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>{description.length}/600</Text>
              </Field>

              <Field label="Brand *">
                <TextInput
                  style={styles.textInput}
                  value={brand}
                  onChangeText={setBrand}
                  placeholder="E.g. Zara, Nike, Louis Vuitton"
                  placeholderTextColor={Colors.textTertiary}
                />
              </Field>

              <Field label="Size *">
                <ChipPicker
                  items={SIZES.map((s) => ({ id: s, label: s }))}
                  selected={size}
                  onSelect={setSize}
                />
              </Field>

              <Field label="Condition *">
                <ChipPicker
                  items={CONDITIONS.map((c) => ({ id: c, label: c }))}
                  selected={condition}
                  onSelect={(v) => setCondition(v as Condition)}
                />
              </Field>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 5 — PRICING & DELIVERY
          ══════════════════════════════════════════ */}
          {step === 'pricing' && (
            <View style={styles.stepContent}>
              <Field label="Price (AED) *">
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.priceCurrency}>AED</Text>
                  <TextInput
                    style={styles.priceInput}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="0"
                    placeholderTextColor={Colors.textTertiary}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
              </Field>

              <Field label="Emirate *">
                <ChipPicker
                  items={EMIRATES.map((e) => ({ id: e, label: e }))}
                  selected={emirate}
                  onSelect={setEmirate}
                />
              </Field>

              <Field label="Area / Neighbourhood (optional)">
                <TextInput
                  style={styles.textInput}
                  value={area}
                  onChangeText={setArea}
                  placeholder="E.g. Jumeirah, Downtown, Khalidiyah"
                  placeholderTextColor={Colors.textTertiary}
                />
              </Field>

              <Field label="Delivery options *">
                <View style={styles.deliveryList}>
                  {DELIVERY_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={styles.deliveryRow}
                      onPress={() => toggleDelivery(opt)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          delivery.includes(opt) && styles.checkboxChecked,
                        ]}
                      >
                        {delivery.includes(opt) && (
                          <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
                        )}
                      </View>
                      <Text style={styles.deliveryLabel}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Field>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 6 — REVIEW
          ══════════════════════════════════════════ */}
          {step === 'review' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepSubtitle}>
                Check everything looks right before you publish.
              </Text>

              <View style={styles.reviewCard}>
                <ReviewRow
                  label="Category"
                  value={`${selectedCat?.emoji ?? ''} ${selectedCat?.label ?? ''} › ${subcategory}`}
                  onEdit={() => setStep('category')}
                />
                <ReviewRow
                  label="Title"
                  value={title || '—'}
                  onEdit={() => setStep('details')}
                />
                <ReviewRow
                  label="Brand"
                  value={brand || '—'}
                  onEdit={() => setStep('details')}
                />
                <ReviewRow
                  label="Size"
                  value={size || '—'}
                  onEdit={() => setStep('details')}
                />
                <ReviewRow
                  label="Condition"
                  value={condition || '—'}
                  onEdit={() => setStep('details')}
                />
                <ReviewRow
                  label="Price"
                  value={price ? `AED ${price}` : '—'}
                  onEdit={() => setStep('pricing')}
                />
                <ReviewRow
                  label="Location"
                  value={[emirate, area].filter(Boolean).join(', ') || '—'}
                  onEdit={() => setStep('pricing')}
                />
                <ReviewRow
                  label="Delivery"
                  value={delivery.length ? delivery.join(', ') : '—'}
                  onEdit={() => setStep('pricing')}
                  last
                />
              </View>

              {description.trim().length > 0 && (
                <View style={styles.reviewDescCard}>
                  <View style={styles.reviewDescHeader}>
                    <Text style={styles.reviewDescTitle}>Description</Text>
                    <TouchableOpacity onPress={() => setStep('details')}>
                      <Text style={styles.editLink}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.reviewDescText}>{description}</Text>
                </View>
              )}

              <View style={styles.reviewPhotosNote}>
                <Ionicons name="images-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.reviewPhotosText}>
                  {photos.length > 0
                    ? `${photos.length} photo${photos.length > 1 ? 's' : ''} added`
                    : 'No photos added yet'}
                </Text>
                <TouchableOpacity onPress={() => setStep('photos')}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ══════════════════════════════════════════
              STEP 7 — DECLARATION
          ══════════════════════════════════════════ */}
          {step === 'declaration' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepSubtitle}>
                Before publishing, please confirm the following.
              </Text>

              <View style={styles.declarationCard}>
                <Text style={styles.declarationTitle}>Seller declaration</Text>
                {[
                  'The item is genuine and authentic',
                  'I own this item and have the right to sell it',
                  'The photos and description accurately represent the item',
                  'The item does not appear on Hala Closet\'s prohibited items list',
                ].map((statement) => (
                  <View key={statement} style={styles.declarationItem}>
                    <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                    <Text style={styles.declarationText}>{statement}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.agreeRow}
                onPress={() => setDeclared(!declared)}
              >
                <View style={[styles.checkbox, declared && styles.checkboxChecked]}>
                  {declared && (
                    <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
                  )}
                </View>
                <Text style={styles.agreeText}>
                  I confirm that all of the above statements are true and I accept
                  responsibility for this listing.
                </Text>
              </TouchableOpacity>

              <View style={styles.legalNote}>
                <Ionicons name="shield-outline" size={15} color={Colors.textSecondary} />
                <Text style={styles.legalNoteText}>
                  Listing counterfeit, prohibited, or misrepresented items may result in
                  account suspension and reporting to UAE authorities.
                </Text>
              </View>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* ── Footer CTA ── */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextBtn, !canProceed[step] && styles.nextBtnDisabled]}
            onPress={step === 'declaration' ? handlePublish : goNext}
            disabled={!canProceed[step]}
          >
            <Text style={styles.nextBtnText}>
              {step === 'declaration' ? 'Publish listing' : 'Continue'}
            </Text>
            {step !== 'declaration' && (
              <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={fieldStyles.container}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ChipPicker({
  items,
  selected,
  onSelect,
}: {
  items: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={chipStyles.wrap}>
      {items.map((item) => {
        const active = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[chipStyles.chip, active && chipStyles.chipActive]}
            onPress={() => onSelect(item.id)}
          >
            <Text style={[chipStyles.label, active && chipStyles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
  last,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  last?: boolean;
}) {
  return (
    <View style={[reviewStyles.row, !last && reviewStyles.rowBorder]}>
      <Text style={reviewStyles.label}>{label}</Text>
      <View style={reviewStyles.right}>
        <Text style={reviewStyles.value} numberOfLines={2}>
          {value}
        </Text>
        <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={reviewStyles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Style sheets ──────────────────────────────────────────────

const fieldStyles = StyleSheet.create({
  container: { marginBottom: 22 },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
});

const chipStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  label: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
  },
  labelActive: { color: Colors.textInverse },
});

const reviewStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  label: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
    width: 80,
    flexShrink: 0,
    paddingTop: 1,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 12,
    paddingLeft: 8,
  },
  value: {
    flex: 1,
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weightSemibold,
    textAlign: 'right',
  },
  edit: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.weightSemibold,
  },
});

const CARD_SIZE = (width - 20 * 2 - 12) / 2; // 2-col grid with 20px side padding, 12px gap

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  stepCount: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
    minWidth: 32,
    textAlign: 'right',
  },

  // progress
  progressTrack: { height: 3, backgroundColor: Colors.border },
  progressFill: { height: 3, backgroundColor: Colors.primary },

  body: { flex: 1 },
  stepContent: { padding: 20 },
  stepSubtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },

  // ── category grid ──
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: CARD_SIZE,
    aspectRatio: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'relative',
  },
  categoryCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  categoryEmoji: { fontSize: 32 },
  categoryLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.textSecondary,
  },
  categoryLabelActive: { color: Colors.primary },
  categoryCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── subcategory list ──
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentLight,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  breadcrumbText: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.accent,
  },
  breadcrumbChange: {
    fontSize: Typography.xs,
    color: Colors.accent,
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  subcategoryList: { gap: 0 },
  subcategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  subcategoryRowActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  subcategoryLabel: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weightMedium,
  },
  subcategoryLabelActive: {
    color: Colors.primary,
    fontWeight: Typography.weightSemibold,
  },
  subcategoryRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcategoryRadioActive: { borderColor: Colors.primary },
  subcategoryRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },

  // ── photos ──
  photoRequirementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  photoRequirementText: {
    flex: 1,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  photoRequirementMet: {
    color: Colors.success,
    fontWeight: Typography.weightMedium,
  },
  photoThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoThumbImage: {
    width: '100%',
    height: '100%',
  },
  photoRemoveBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 11,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCountHint: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    marginTop: 8,
    marginBottom: 20,
  },
  prohibitedCard: {
    backgroundColor: Colors.warningLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.warning + '40',
  },
  prohibitedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  prohibitedTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightBold,
    color: Colors.warning,
  },
  prohibitedIntro: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  prohibitedRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  prohibitedBullet: { fontSize: Typography.xs, color: Colors.warning },
  prohibitedText: { fontSize: Typography.xs, color: Colors.textSecondary, flex: 1 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  addPhotoBtn: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.surface,
  },
  addPhotoText: { fontSize: Typography.xs, color: Colors.textTertiary },


  // ── details ──
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  textArea: { minHeight: 100 },
  charCount: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    textAlign: 'right',
    marginTop: 4,
  },

  // ── pricing ──
  priceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 14,
  },
  priceCurrency: {
    fontSize: Typography.lg,
    color: Colors.textSecondary,
    marginRight: 8,
    fontWeight: Typography.weightBold,
  },
  priceInput: {
    flex: 1,
    fontSize: Typography.xl,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    paddingVertical: 14,
    padding: 0,
  },
  deliveryList: { gap: 10 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  deliveryLabel: { fontSize: Typography.base, color: Colors.textPrimary, flex: 1 },

  // ── review ──
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  reviewDescCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  reviewDescHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewDescTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.weightSemibold,
    color: Colors.textPrimary,
  },
  editLink: {
    fontSize: Typography.sm,
    color: Colors.accent,
    fontWeight: Typography.weightSemibold,
  },
  reviewDescText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  reviewPhotosNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
  },
  reviewPhotosText: {
    flex: 1,
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },

  // ── declaration ──
  declarationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  declarationTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  declarationItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  declarationText: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
    flex: 1,
  },
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 20 },
  agreeText: { flex: 1, fontSize: Typography.sm, color: Colors.textPrimary, lineHeight: 20 },
  legalNote: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 10,
    padding: 12,
    alignItems: 'flex-start',
  },
  legalNoteText: {
    flex: 1,
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // ── footer ──
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 8 : 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: {
    color: Colors.textInverse,
    fontSize: Typography.base,
    fontWeight: Typography.weightBold,
  },
});
