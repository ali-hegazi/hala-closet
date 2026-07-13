import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatAED } from "@/lib/format";
import { CONDITION_STYLES } from "@/lib/catalog";
import { Badge } from "./ui";
import { FavouriteButton } from "./favourites";

export function ListingCard({
  listing,
  priority = false,
}: {
  listing: Listing;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-sand-25 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute right-2.5 top-2.5">
          <FavouriteButton listingId={listing.id} />
        </div>
        {listing.status !== "active" && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-ink-900/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sand-25">
            {listing.status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[15px] font-bold text-teal-800">
            {formatAED(listing.price)}
          </span>
          {listing.originalPrice && (
            <span className="text-xs text-ink-400 line-through">
              {formatAED(listing.originalPrice)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-1 text-sm font-medium text-ink-900">
          {listing.title}
        </h3>
        <p className="text-xs text-ink-500">
          {listing.brand} · {listing.size}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Badge className={CONDITION_STYLES[listing.condition]}>
            {listing.condition}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-ink-400">
            <MapPin size={12} aria-hidden="true" />
            {listing.emirate}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ListingGrid({ listings }: { listings: Listing[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((l, i) => (
        <ListingCard key={l.id} listing={l} priority={i < 4} />
      ))}
    </div>
  );
}

export function ListingRow({ listings }: { listings: Listing[] }) {
  return (
    <div className="scroll-row -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4">
      {listings.map((l) => (
        <div key={l.id} className="w-[46vw] shrink-0 sm:w-56">
          <ListingCard listing={l} />
        </div>
      ))}
    </div>
  );
}
