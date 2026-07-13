"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Heart } from "lucide-react";

// Demo persistence: localStorage. In production this becomes the
// `favourites` table in Supabase keyed by the signed-in user.

const STORAGE_KEY = "hala.favourites";

interface FavouritesContextValue {
  ids: string[];
  isFavourite: (id: string) => boolean;
  toggle: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextValue>({
  ids: [],
  isFavourite: () => false,
  toggle: () => {},
});

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // corrupted storage — start fresh
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavourite = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <FavouritesContext.Provider value={{ ids, isFavourite, toggle }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}

export function FavouriteButton({
  listingId,
  className,
  withLabel = false,
}: {
  listingId: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { isFavourite, toggle } = useFavourites();
  const fav = isFavourite(listingId);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(listingId);
      }}
      aria-pressed={fav}
      aria-label={fav ? "Remove from favourites" : "Add to favourites"}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-sand-25/90 p-2 text-ink-700 shadow-sm backdrop-blur transition-colors hover:text-terra-600 cursor-pointer"
      }
    >
      <Heart
        size={18}
        className={fav ? "fill-terra-600 text-terra-600" : ""}
        aria-hidden="true"
      />
      {withLabel && (
        <span className="text-sm font-semibold">
          {fav ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
