import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Recycle, ShieldCheck } from "lucide-react";
import {
  designerPicks,
  newestListings,
  trendingInEmirate,
  underPrice,
} from "@/lib/data";
import { CATEGORIES } from "@/lib/catalog";
import { ListingGrid, ListingRow } from "@/components/listing-card";
import { ButtonLink } from "@/components/ui";

function SectionHeading({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-teal-800 hover:text-teal-600"
      >
        See all <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

const VALUE_PROPS = [
  {
    Icon: ShieldCheck,
    title: "Trade with confidence",
    body: "Ratings, reviews and verified sellers on every profile.",
  },
  {
    Icon: MapPin,
    title: "All seven emirates",
    body: "Filter by emirate and neighbourhood — meet up or ship by courier.",
  },
  {
    Icon: Recycle,
    title: "Fashion, second time around",
    body: "Give great pieces a second life and keep them out of landfill.",
  },
  {
    Icon: BadgeCheck,
    title: "Pay your way",
    body: "Cash on delivery, meet in person, or cards — whatever suits you.",
  },
];

export default function Home() {
  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="mt-6 overflow-hidden rounded-3xl bg-teal-800 text-sand-25">
        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-teal-700"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-28 size-72 rounded-full bg-teal-900/60"
          />
          <div className="relative max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-terra-500">
              أهلاً وسهلاً · Welcome
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Your wardrobe&apos;s next chapter starts here.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-teal-100">
              Hala is the UAE&apos;s marketplace for pre-loved fashion. Buy and
              sell everything from designer bags to everyday abayas — across
              all seven emirates.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/search" variant="accent" size="lg">
                Start browsing
              </ButtonLink>
              <ButtonLink
                href="/sell"
                size="lg"
                className="border border-teal-100/40 bg-transparent text-sand-25 hover:bg-teal-700"
              >
                Sell an item
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section aria-label="Browse by category" className="mt-10">
        <div className="scroll-row -mx-4 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/search?category=${c.slug}`}
              className="shrink-0 rounded-2xl border border-sand-200 bg-sand-25 px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-teal-700 hover:shadow-card"
            >
              <span className="text-sm font-semibold text-ink-900">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          title="New in"
          subtitle="Fresh listings from wardrobes across the UAE"
          href="/search?sort=newest"
        />
        <ListingRow listings={newestListings(8)} />
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Trending in Dubai"
          subtitle="What buyers in your emirate are eyeing"
          href="/search?emirate=Dubai"
        />
        <ListingRow listings={trendingInEmirate("Dubai", 8)} />
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Under AED 100"
          subtitle="Small prices, great finds"
          href="/search?max=100"
        />
        <ListingRow listings={underPrice(100, 8)} />
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Designer corner"
          subtitle="Authenticated luxury, priced to move"
          href="/search?category=designer"
        />
        <ListingRow listings={designerPicks(8)} />
      </section>

      {/* Value props */}
      <section
        aria-label="Why Hala"
        className="mt-14 rounded-3xl bg-sand-100/70 px-6 py-10 sm:px-10"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map(({ Icon, title, body }) => (
            <div key={title}>
              <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          title="Fresh finds"
          subtitle="A little of everything, updated all day"
          href="/search"
        />
        <ListingGrid listings={newestListings(12)} />
        <div className="mt-8 text-center">
          <ButtonLink href="/search" variant="outline" size="lg">
            Browse everything
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
