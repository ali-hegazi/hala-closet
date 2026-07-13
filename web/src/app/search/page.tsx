import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { searchListings } from "@/lib/data";
import { CATEGORIES } from "@/lib/catalog";
import { ListingGrid } from "@/components/listing-card";
import { Filters } from "@/components/filters";
import { ButtonLink, EmptyState } from "@/components/ui";

export const metadata: Metadata = {
  title: "Search",
};

type Search = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  const min = first(sp.min);
  const max = first(sp.max);

  const results = searchListings({
    q,
    category,
    subcategory: first(sp.subcategory),
    brand: first(sp.brand),
    size: first(sp.size),
    condition: first(sp.condition),
    color: first(sp.color),
    emirate: first(sp.emirate),
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
    sort: first(sp.sort),
  });

  const categoryLabel = CATEGORIES.find((c) => c.slug === category)?.label;
  const heading = q
    ? `Results for “${q}”`
    : categoryLabel ?? "Browse everything";

  return (
    <div className="pb-8 pt-6">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink-900">
        {heading}
      </h1>
      <div className="lg:grid lg:grid-cols-[270px_1fr] lg:items-start lg:gap-8">
        <Filters resultCount={results.length} />
        <div className="lg:col-start-2 lg:row-start-2">
          {results.length > 0 ? (
            <ListingGrid listings={results} />
          ) : (
            <EmptyState
              icon={<SearchX size={26} aria-hidden="true" />}
              title="Nothing matched"
              body="Try removing a filter or two, or search for something broader — new items are listed every day."
              action={
                <ButtonLink href="/search" variant="outline" size="sm">
                  Clear search
                </ButtonLink>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
