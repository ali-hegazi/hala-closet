/**
 * Mock offer data — replace with Supabase query:
 *   supabase.from('offers').select('*').eq('listing_id', listingId)
 */
import { Offer } from '../types/offer';

export const MOCK_OFFERS: Offer[] = [
  {
    id: 'o1',
    listingId: 'l1',
    buyerId: 'me',
    sellerId: 'u1',
    amount: 100,
    message: 'Would you accept AED 100?',
    status: 'pending',
    createdAt: '2024-06-11T10:22:00Z',
  },
  {
    id: 'o2',
    listingId: 'l6',
    buyerId: 'me',
    sellerId: 'u2',
    amount: 400,
    status: 'accepted',
    createdAt: '2024-06-09T12:05:00Z',
    respondedAt: '2024-06-09T12:10:00Z',
  },
];
