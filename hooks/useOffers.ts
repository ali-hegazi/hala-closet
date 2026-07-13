/**
 * Offers context — manages offer state in memory.
 *
 * To migrate to Supabase:
 * 1. Replace MOCK_OFFERS initial state with a fetch from the `offers` table.
 * 2. Replace makeOffer() with supabase.from('offers').insert(...).
 * 3. Replace respondToOffer() with supabase.from('offers').update({ status }).eq('id', offerId).
 */
import { createContext, useContext, useState, useCallback, ReactNode, createElement } from 'react';
import { Offer, OfferStatus } from '../types/offer';
import { MOCK_OFFERS } from '../data/mockOffers';

interface OffersContextType {
  offers: Offer[];
  makeOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => Offer;
  respondToOffer: (offerId: string, status: 'accepted' | 'rejected') => void;
  cancelOffer: (offerId: string) => void;
  getOffersForListing: (listingId: string) => Offer[];
}

const OffersContext = createContext<OffersContextType | null>(null);

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);

  const makeOffer = useCallback((data: Omit<Offer, 'id' | 'createdAt' | 'status'>): Offer => {
    const newOffer: Offer = {
      ...data,
      id: `o${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOffers((prev) => [...prev, newOffer]);
    return newOffer;
  }, []);

  const respondToOffer = useCallback((offerId: string, status: 'accepted' | 'rejected') => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId ? { ...o, status, respondedAt: new Date().toISOString() } : o,
      ),
    );
  }, []);

  const cancelOffer = useCallback((offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'cancelled' as OfferStatus } : o)),
    );
  }, []);

  const getOffersForListing = useCallback(
    (listingId: string) => offers.filter((o) => o.listingId === listingId),
    [offers],
  );

  return createElement(
    OffersContext.Provider,
    { value: { offers, makeOffer, respondToOffer, cancelOffer, getOffersForListing } },
    children,
  );
}

export function useOffers(): OffersContextType {
  const ctx = useContext(OffersContext);
  if (!ctx) throw new Error('useOffers must be used within OffersProvider');
  return ctx;
}
