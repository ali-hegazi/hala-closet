"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Check, ChevronLeft, ChevronRight, PartyPopper, X } from "lucide-react";
import {
  BRANDS,
  CATEGORIES,
  COLORS,
  CONDITIONS,
  EMIRATES,
  NEIGHBORHOODS,
  SIZES,
} from "@/lib/catalog";
import type { Emirate } from "@/lib/types";
import { formatAED } from "@/lib/format";
import { Button, ButtonLink, Input, Label, Select, Textarea } from "@/components/ui";

const STEPS = ["Photos & category", "Item details", "Price & delivery", "Review"];

// Stand-in photos until Supabase Storage upload is wired up.
const SAMPLE_PHOTOS = [
  "photo-1521572163474-6864f9cf17ab",
  "photo-1483985988355-763728e1935b",
  "photo-1445205170230-053b83016050",
  "photo-1441986300917-64674bd600d8",
].map((id) => `https://images.unsplash.com/${id}?q=80&w=400&auto=format&fit=crop`);

interface Draft {
  photos: string[];
  category: string;
  subcategory: string;
  title: string;
  description: string;
  brand: string;
  size: string;
  condition: string;
  color: string;
  price: string;
  openToOffers: boolean;
  emirate: Emirate;
  neighborhood: string;
  delivery: string[];
}

const INITIAL: Draft = {
  photos: [],
  category: "",
  subcategory: "",
  title: "",
  description: "",
  brand: "",
  size: "",
  condition: "",
  color: "",
  price: "",
  openToOffers: true,
  emirate: "Dubai",
  neighborhood: "",
  delivery: ["meetup"],
};

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(INITIAL);
  const [published, setPublished] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const category = CATEGORIES.find((c) => c.slug === draft.category);

  const stepValid = [
    draft.photos.length >= 1 && !!draft.category,
    !!draft.title && !!draft.condition && !!draft.size,
    Number(draft.price) > 0 && !!draft.neighborhood && draft.delivery.length > 0,
    true,
  ][step];

  if (published) {
    return (
      <div className="mx-auto max-w-lg pb-16 pt-16 text-center">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-success-100 text-success-600">
          <PartyPopper size={30} aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          Your item is live!
        </h1>
        <p className="mt-3 text-ink-500">
          “{draft.title}” is now listed for {formatAED(Number(draft.price))}.
          Buyers in {draft.emirate} will see it first. (Demo mode: listings
          publish for real once Supabase is connected.)
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <ButtonLink href="/search" variant="primary">
            Browse the market
          </ButtonLink>
          <Button
            variant="outline"
            onClick={() => {
              setDraft(INITIAL);
              setStep(0);
              setPublished(false);
            }}
          >
            List another item
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pb-12 pt-6">
      <h1 className="font-display text-3xl font-semibold text-ink-900">Sell an item</h1>
      <p className="mt-1 text-sm text-ink-500">
        Good photos and honest descriptions sell up to three times faster.
      </p>

      {/* Stepper */}
      <ol className="mt-6 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={`h-1.5 rounded-full ${
                i <= step ? "bg-teal-700" : "bg-sand-200"
              }`}
            />
            <span
              className={`hidden text-xs font-semibold sm:block ${
                i <= step ? "text-teal-800" : "text-ink-400"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-7 rounded-3xl border border-sand-200 bg-sand-25 p-5 sm:p-7">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <Label>Photos (minimum 1, up to 4)</Label>
              <p className="mb-3 text-xs text-ink-500">
                Camera upload arrives with the app — for now pick sample photos
                to see how your listing will look.
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {SAMPLE_PHOTOS.map((src) => {
                  const selected = draft.photos.includes(src);
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        set(
                          "photos",
                          selected
                            ? draft.photos.filter((p) => p !== src)
                            : [...draft.photos, src]
                        )
                      }
                      aria-pressed={selected}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-cover bg-center transition-colors ${
                        selected ? "border-teal-700" : "border-sand-200 hover:border-sand-300"
                      }`}
                      style={{ backgroundImage: `url(${src})` }}
                    >
                      {selected && (
                        <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-teal-700 text-sand-25">
                          <Check size={13} aria-hidden="true" />
                        </span>
                      )}
                      <span className="sr-only">Sample photo</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-400">
                <Camera size={13} aria-hidden="true" />
                {draft.photos.length} selected
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-cat">Category</Label>
                <Select
                  id="s-cat"
                  value={draft.category}
                  onChange={(e) => {
                    set("category", e.target.value);
                    set("subcategory", "");
                  }}
                >
                  <option value="">Choose…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </div>
              {category && (
                <div>
                  <Label htmlFor="s-sub">Subcategory</Label>
                  <Select
                    id="s-sub"
                    value={draft.subcategory}
                    onChange={(e) => set("subcategory", e.target.value)}
                  >
                    <option value="">Choose…</option>
                    {category.subcategories.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="s-title">Title</Label>
              <Input
                id="s-title"
                value={draft.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Zara satin slip midi dress"
                maxLength={70}
              />
            </div>
            <div>
              <Label htmlFor="s-desc">Description</Label>
              <Textarea
                id="s-desc"
                rows={4}
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Condition details, fit, why you're selling — honesty builds trust and reviews."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-brand">Brand</Label>
                <Select
                  id="s-brand"
                  value={draft.brand}
                  onChange={(e) => set("brand", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="s-size">Size</Label>
                <Select
                  id="s-size"
                  value={draft.size}
                  onChange={(e) => set("size", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="s-cond">Condition</Label>
                <Select
                  id="s-cond"
                  value={draft.condition}
                  onChange={(e) => set("condition", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="s-color">Colour</Label>
                <Select
                  id="s-color"
                  value={draft.color}
                  onChange={(e) => set("color", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-price">Price (AED)</Label>
                <Input
                  id="s-price"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={draft.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="120"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-700">
                  <input
                    type="checkbox"
                    checked={draft.openToOffers}
                    onChange={(e) => set("openToOffers", e.target.checked)}
                    className="size-4.5 accent-teal-700"
                  />
                  Open to offers
                </label>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-emirate">Emirate</Label>
                <Select
                  id="s-emirate"
                  value={draft.emirate}
                  onChange={(e) => {
                    set("emirate", e.target.value as Emirate);
                    set("neighborhood", "");
                  }}
                >
                  {EMIRATES.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="s-area">Neighbourhood</Label>
                <Select
                  id="s-area"
                  value={draft.neighborhood}
                  onChange={(e) => set("neighborhood", e.target.value)}
                >
                  <option value="">Choose…</option>
                  {NEIGHBORHOODS[draft.emirate].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label>Delivery options</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  ["meetup", "Meet in person"],
                  ["courier", "Courier delivery"],
                  ["cash-on-delivery", "Cash on delivery"],
                ].map(([value, label]) => {
                  const on = draft.delivery.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        set(
                          "delivery",
                          on
                            ? draft.delivery.filter((d) => d !== value)
                            : [...draft.delivery, value]
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        on
                          ? "border-teal-700 bg-teal-50 text-teal-800"
                          : "border-sand-300 bg-sand-25 text-ink-500 hover:border-ink-400"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-ink-900">
              Ready to publish?
            </h2>
            <dl className="divide-y divide-sand-200 rounded-2xl border border-sand-200">
              {(
                [
                  ["Title", draft.title],
                  ["Category", `${category?.label ?? ""} · ${draft.subcategory || "—"}`],
                  ["Brand / size", `${draft.brand || "No brand"} · ${draft.size}`],
                  ["Condition", draft.condition],
                  ["Price", `${formatAED(Number(draft.price))}${draft.openToOffers ? " (open to offers)" : ""}`],
                  ["Location", `${draft.neighborhood}, ${draft.emirate}`],
                  ["Photos", `${draft.photos.length} selected`],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="text-right font-medium text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ink-400">
              By publishing you confirm the item is yours, authentic, and
              permitted for sale in the UAE. Counterfeit items are removed and
              repeat offenders banned.
            </p>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-7 flex items-center justify-between">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft size={17} aria-hidden="true" /> Back
            </Button>
          ) : (
            <Link href="/" className="text-sm font-medium text-ink-400 hover:text-ink-700">
              <X size={15} className="mr-1 inline" aria-hidden="true" />
              Cancel
            </Link>
          )}
          {step < STEPS.length - 1 ? (
            <Button disabled={!stepValid} onClick={() => setStep((s) => s + 1)}>
              Continue <ChevronRight size={17} aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="accent" size="lg" onClick={() => setPublished(true)}>
              Publish listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
