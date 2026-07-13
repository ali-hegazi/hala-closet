import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarDays, MapPin, PackageOpen } from "lucide-react";
import { getSeller, listingsBySeller, reviewsForSeller } from "@/lib/data";
import { memberSince } from "@/lib/format";
import { ListingGrid } from "@/components/listing-card";
import { ReportButton } from "@/components/listing-actions";
import { Avatar, ButtonLink, EmptyState, Stars } from "@/components/ui";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seller = getSeller(id);
  return { title: seller ? `@${seller.handle}` : "Profile not found" };
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const seller = getSeller(id);
  if (!seller) notFound();
  const listings = listingsBySeller(seller.id);
  const reviews = reviewsForSeller(seller.id);

  const stats: [string, string][] = [
    ["Listings", String(listings.length)],
    ["Sold", String(seller.salesCount)],
    ["Followers", seller.followers.toLocaleString()],
    ["Following", seller.following.toLocaleString()],
  ];

  return (
    <div className="pb-8 pt-8">
      {/* Profile header */}
      <div className="flex flex-col gap-6 rounded-3xl border border-sand-200 bg-sand-25 p-6 sm:flex-row sm:items-center sm:p-8">
        <Avatar name={seller.name} size="xl" />
        <div className="flex-1">
          <h1 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink-900">
            {seller.name}
            {seller.verified && (
              <BadgeCheck size={20} className="text-teal-700" aria-label="Verified seller" />
            )}
          </h1>
          <p className="text-sm text-ink-500">@{seller.handle}</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1">
              <Stars rating={seller.rating} /> {seller.rating.toFixed(1)} ({seller.reviewCount})
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" />
              {seller.neighborhood}, {seller.emirate}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} aria-hidden="true" />
              Member since {memberSince(seller.joined)}
            </span>
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-700">
            {seller.bio}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <ButtonLink href={`/inbox?seller=${seller.id}`} variant="primary">
            Message
          </ButtonLink>
          <ButtonLink href="#" variant="outline">
            Follow
          </ButtonLink>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-sand-200 bg-sand-25 px-4 py-3.5 text-center"
          >
            <p className="font-display text-xl font-semibold text-teal-800">{value}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-semibold text-ink-900">
          Wardrobe
        </h2>
        {listings.length > 0 ? (
          <ListingGrid listings={listings} />
        ) : (
          <EmptyState
            icon={<PackageOpen size={26} aria-hidden="true" />}
            title="No listings yet"
            body="This seller hasn't listed anything at the moment. Follow them to hear when they do."
          />
        )}
      </section>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-semibold text-ink-900">
          Reviews
        </h2>
        {reviews.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="rounded-2xl border border-sand-200 bg-sand-25 p-4"
              >
                <div className="flex items-center justify-between">
                  <figcaption className="text-sm font-semibold text-ink-900">
                    {r.reviewer}
                  </figcaption>
                  <Stars rating={r.rating} />
                </div>
                <blockquote className="mt-2 text-sm leading-relaxed text-ink-700">
                  “{r.comment}”
                </blockquote>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-500">No reviews yet.</p>
        )}
      </section>

      <div className="mt-8">
        <ReportButton subject="user" />
      </div>
    </div>
  );
}
