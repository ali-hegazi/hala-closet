import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Banknote,
  Handshake,
  Heart,
  MapPin,
  Truck,
} from "lucide-react";
import { getListing, getSeller, similarListings } from "@/lib/data";
import { formatAED, relativeDate } from "@/lib/format";
import { CONDITION_STYLES } from "@/lib/catalog";
import { Gallery } from "@/components/gallery";
import { ListingActions, ReportButton } from "@/components/listing-actions";
import { ListingRow } from "@/components/listing-card";
import { Avatar, Badge, ButtonLink, Stars } from "@/components/ui";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  return { title: listing ? listing.title : "Listing not found" };
}

const DELIVERY_LABELS = {
  meetup: { Icon: Handshake, label: "Meet in person" },
  courier: { Icon: Truck, label: "Courier delivery" },
  "cash-on-delivery": { Icon: Banknote, label: "Cash on delivery" },
} as const;

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();
  const seller = getSeller(listing.sellerId)!;
  const similar = similarListings(listing);

  const details: [string, string][] = [
    ["Brand", listing.brand],
    ["Size", listing.size],
    ["Colour", listing.color],
    ["Condition", listing.condition],
    ["Category", `${listing.subcategory}`],
    ["Listed", relativeDate(listing.postedAt)],
  ];

  return (
    <div className="pb-8 pt-6">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <Gallery images={listing.images} alt={listing.title} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
                {listing.title}
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                {listing.brand} · Size {listing.size}
              </p>
            </div>
            <Badge className={CONDITION_STYLES[listing.condition]}>
              {listing.condition}
            </Badge>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-teal-800">
              {formatAED(listing.price)}
            </span>
            {listing.originalPrice && (
              <span className="text-base text-ink-400 line-through">
                {formatAED(listing.originalPrice)}
              </span>
            )}
            {listing.openToOffers && (
              <Badge className="bg-terra-100 text-terra-700">Open to offers</Badge>
            )}
          </div>

          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin size={14} aria-hidden="true" />
            {listing.neighborhood}, {listing.emirate}
            <span aria-hidden="true">·</span>
            <Heart size={14} aria-hidden="true" /> {listing.likes} saves
          </p>

          <div className="mt-6">
            <ListingActions listingId={listing.id} />
          </div>

          {/* Delivery options */}
          <div className="mt-6 flex flex-wrap gap-2">
            {listing.delivery.map((d) => {
              const { Icon, label } = DELIVERY_LABELS[d];
              return (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1.5 text-xs font-semibold text-ink-700"
                >
                  <Icon size={14} aria-hidden="true" /> {label}
                </span>
              );
            })}
          </div>

          {/* Description */}
          <section className="mt-7">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-700">
              Description
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-700">
              {listing.description}
            </p>
          </section>

          {/* Details table */}
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-700">
              Details
            </h2>
            <dl className="divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-sand-25">
              {details.map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="font-medium text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Seller card */}
          <section className="mt-6">
            <Link
              href={`/profile/${seller.id}`}
              className="flex items-center gap-3.5 rounded-2xl border border-sand-200 bg-sand-25 p-4 transition-colors hover:border-teal-700"
            >
              <Avatar name={seller.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-semibold text-ink-900">
                  {seller.name}
                  {seller.verified && (
                    <BadgeCheck
                      size={16}
                      className="text-teal-700"
                      aria-label="Verified seller"
                    />
                  )}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-ink-500">
                  <Stars rating={seller.rating} />
                  {seller.rating.toFixed(1)} ({seller.reviewCount} reviews)
                </p>
              </div>
              <span className="text-sm font-semibold text-teal-800">
                View profile
              </span>
            </Link>
          </section>

          <div className="mt-5">
            <ReportButton subject="listing" />
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Similar items
            </h2>
            <ButtonLink
              href={`/search?category=${listing.category}`}
              variant="ghost"
              size="sm"
            >
              See more
            </ButtonLink>
          </div>
          <ListingRow listings={similar} />
        </section>
      )}
    </div>
  );
}
