export type OfferStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'expired';

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  message?: string;
  status: OfferStatus;
  createdAt: string;
  respondedAt?: string;
}
