import { Condition } from '../types/listing';
import { Colors } from './colors';

export const CONDITIONS: Condition[] = [
  'New with tags',
  'New without tags',
  'Like new',
  'Good',
  'Fair',
];

export const CONDITION_COLORS: Record<Condition, { bg: string; text: string }> = {
  'New with tags': { bg: Colors.successLight, text: Colors.success },
  'New without tags': { bg: Colors.infoLight, text: Colors.info },
  'Like new': { bg: '#EDE9FE', text: '#7C3AED' },
  'Good': { bg: Colors.warningLight, text: Colors.warning },
  'Fair': { bg: Colors.borderLight, text: Colors.textSecondary },
};
