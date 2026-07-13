/**
 * Favourites context — stores favourited listing IDs in memory.
 *
 * To migrate to Supabase:
 * 1. On mount, fetch the user's favourites: supabase.from('favourites').select('listing_id').
 * 2. In toggle(), insert or delete from the `favourites` table.
 */
import { createContext, useContext, useState, useCallback, ReactNode, createElement } from 'react';

interface FavouritesContextType {
  favourites: Set<string>;
  toggle: (listingId: string) => void;
  isFavourited: (listingId: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  const toggle = useCallback((listingId: string) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) {
        next.delete(listingId);
      } else {
        next.add(listingId);
      }
      return next;
    });
  }, []);

  const isFavourited = useCallback(
    (listingId: string) => favourites.has(listingId),
    [favourites],
  );

  return createElement(FavouritesContext.Provider, { value: { favourites, toggle, isFavourited } }, children);
}

export function useFavourites(): FavouritesContextType {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used within FavouritesProvider');
  return ctx;
}
