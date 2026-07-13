"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LocateFixed, SlidersHorizontal, X } from "lucide-react";
import {
  BRANDS,
  CATEGORIES,
  COLORS,
  CONDITIONS,
  EMIRATES,
  SIZES,
  SORT_OPTIONS,
} from "@/lib/catalog";
import { Button, Input, Label, Select } from "./ui";

const FILTER_KEYS = [
  "category",
  "subcategory",
  "brand",
  "size",
  "condition",
  "color",
  "emirate",
  "min",
  "max",
] as const;

export function Filters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locating, setLocating] = useState(false);

  const get = (key: string) => params.get(key) ?? "";
  const activeCount = FILTER_KEYS.filter((k) => params.get(k)).length;

  function apply(updates: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.push(`${pathname}?${next.toString()}`);
  }

  function clearAll() {
    const next = new URLSearchParams();
    const q = params.get("q");
    if (q) next.set("q", q);
    router.push(next.size ? `${pathname}?${next.toString()}` : pathname);
  }

  // Browser geolocation → nearest emirate by simple centroid distance.
  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    const CENTROIDS: [string, number, number][] = [
      ["Dubai", 25.2048, 55.2708],
      ["Abu Dhabi", 24.4539, 54.3773],
      ["Sharjah", 25.3463, 55.4209],
      ["Ajman", 25.4052, 55.5136],
      ["Ras Al Khaimah", 25.7895, 55.9432],
      ["Fujairah", 25.1288, 56.3265],
      ["Umm Al Quwain", 25.5647, 55.5534],
    ];
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let best = CENTROIDS[0];
        let bestD = Infinity;
        for (const c of CENTROIDS) {
          const d = (c[1] - latitude) ** 2 + (c[2] - longitude) ** 2;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
        setLocating(false);
        apply({ emirate: best[0] });
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  }

  const category = CATEGORIES.find((c) => c.slug === get("category"));

  const controls = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="f-category">Category</Label>
        <Select
          id="f-category"
          value={get("category")}
          onChange={(e) => apply({ category: e.target.value, subcategory: "" })}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      {category && (
        <div>
          <Label htmlFor="f-sub">Subcategory</Label>
          <Select
            id="f-sub"
            value={get("subcategory")}
            onChange={(e) => apply({ subcategory: e.target.value })}
          >
            <option value="">All {category.label}</option>
            {category.subcategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="f-brand">Brand</Label>
        <Select
          id="f-brand"
          value={get("brand")}
          onChange={(e) => apply({ brand: e.target.value })}
        >
          <option value="">All brands</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="f-size">Size</Label>
          <Select
            id="f-size"
            value={get("size")}
            onChange={(e) => apply({ size: e.target.value })}
          >
            <option value="">Any</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="f-color">Colour</Label>
          <Select
            id="f-color"
            value={get("color")}
            onChange={(e) => apply({ color: e.target.value })}
          >
            <option value="">Any</option>
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="f-condition">Condition</Label>
        <Select
          id="f-condition"
          value={get("condition")}
          onChange={(e) => apply({ condition: e.target.value })}
        >
          <option value="">Any condition</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="f-emirate">Emirate</Label>
          <button
            type="button"
            onClick={useMyLocation}
            disabled={locating}
            className="mb-1.5 inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-600 disabled:opacity-60"
          >
            <LocateFixed size={13} aria-hidden="true" />
            {locating ? "Locating…" : "Use my location"}
          </button>
        </div>
        <Select
          id="f-emirate"
          value={get("emirate")}
          onChange={(e) => apply({ emirate: e.target.value })}
        >
          <option value="">All emirates</option>
          {EMIRATES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Price (AED)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Min"
            aria-label="Minimum price in AED"
            defaultValue={get("min")}
            onBlur={(e) => apply({ min: e.target.value })}
            onKeyDown={(e) =>
              e.key === "Enter" && apply({ min: (e.target as HTMLInputElement).value })
            }
          />
          <span className="text-ink-400">–</span>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Max"
            aria-label="Maximum price in AED"
            defaultValue={get("max")}
            onBlur={(e) => apply({ max: e.target.value })}
            onKeyDown={(e) =>
              e.key === "Enter" && apply({ max: (e.target as HTMLInputElement).value })
            }
          />
        </div>
      </div>

      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="w-full">
          <X size={15} aria-hidden="true" /> Clear all filters ({activeCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Toolbar: result count + sort + mobile filter toggle */}
      <div className="mb-5 flex items-center justify-between gap-3 lg:col-start-2 lg:row-start-1">
        <p className="text-sm text-ink-500">
          <span className="font-semibold text-ink-900">{resultCount}</span>{" "}
          {resultCount === 1 ? "item" : "items"}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            Sort results
          </label>
          <Select
            id="sort"
            value={get("sort") || "relevance"}
            onChange={(e) => apply({ sort: e.target.value })}
            className="h-10 w-auto min-w-44"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </Button>
        </div>
      </div>

      {/* Mobile filter panel */}
      {mobileOpen && (
        <div className="mb-6 rounded-2xl border border-sand-200 bg-sand-25 p-4 lg:hidden">
          {controls}
        </div>
      )}

      {/* Desktop sidebar (positioned by parent grid) */}
      <aside
        aria-label="Filters"
        className="hidden lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:block"
      >
        <div className="sticky top-32 rounded-2xl border border-sand-200 bg-sand-25 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink-900">
            Filters
          </h2>
          {controls}
        </div>
      </aside>
    </>
  );
}
