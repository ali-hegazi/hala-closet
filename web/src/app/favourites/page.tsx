"use client";

import { Heart } from "lucide-react";
import { LISTINGS } from "@/lib/data";
import { useFavourites } from "@/components/favourites";
import { ListingGrid } from "@/components/listing-card";
import { ButtonLink, EmptyState } from "@/components/ui";

export default function FavouritesPage() {
  const { ids } = useFavourites();
  const favourites = LISTINGS.filter((l) => ids.includes(l.id));

  return (
    <div className="pb-8 pt-6">
      <h1 className="mb-1 font-display text-3xl font-semibold text-ink-900">
        Favourites
      </h1>
      <p className="mb-6 text-sm text-ink-500">
        Items you&apos;ve saved. We&apos;ll keep them here for you.
      </p>
      {favourites.length > 0 ? (
        <ListingGrid listings={favourites} />
      ) : (
        <EmptyState
          icon={<Heart size={26} aria-hidden="true" />}
          title="Nothing saved yet"
          body="Tap the heart on any listing and it will appear here — perfect for comparing finds before you commit."
          action={
            <ButtonLink href="/search" variant="primary" size="sm">
              Start browsing
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
