import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

const LISTING_REASONS = [
  'Counterfeit or replica item',
  'Prohibited item',
  'Misleading photos or description',
  'Wrong category',
  'Spam',
  'Other',
];

const USER_REASONS = [
  'Scam or fraud',
  'Harassment or abuse',
  'Fake account',
  'Spam',
  'Other',
];

interface Props {
  visible: boolean;
  onClose: () => void;
  type: 'listing' | 'user';
}

export default function ReportSheet({ visible, onClose, type }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const reasons = type === 'listing' ? LISTING_REASONS : USER_REASONS;

  const handleSubmit = () => {
    onClose();
    setSelected(null);
    Alert.alert(
      'Report submitted',
      'Thank you for helping keep Hala Closet safe. Our team will review this shortly.',
      [{ text: 'OK' }],
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Report {type === 'listing' ? 'listing' : 'user'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.body}>
          <Text style={styles.subtitle}>
            Why are you reporting this {type}?
          </Text>
          {reasons.map((reason) => (
            <TouchableOpacity
              key={reason}
              style={styles.row}
              onPress={() => setSelected(reason)}
            >
              <Text style={styles.reasonText}>{reason}</Text>
              <View style={[styles.radio, selected === reason && styles.radioSelected]}>
                {selected === reason && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitBtn, !selected && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!selected}
          >
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
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
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  reasonText: {
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitBtn: {
    backgroundColor: Colors.error,
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
