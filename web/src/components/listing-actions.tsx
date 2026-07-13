"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flag, MessageCircle, ShoppingBag, Tag } from "lucide-react";
import { Button } from "./ui";
import { FavouriteButton } from "./favourites";

export function ListingActions({ listingId }: { listingId: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2.5">
      <Button
        variant="accent"
        size="lg"
        onClick={() => router.push(`/inbox?listing=${listingId}&intent=buy`)}
      >
        <ShoppingBag size={18} aria-hidden="true" /> Buy now
      </Button>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          variant="primary"
          onClick={() => router.push(`/inbox?listing=${listingId}&intent=offer`)}
        >
          <Tag size={17} aria-hidden="true" /> Make an offer
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/inbox?listing=${listingId}&intent=message`)}
        >
          <MessageCircle size={17} aria-hidden="true" /> Message
        </Button>
      </div>
      <FavouriteButton
        listingId={listingId}
        withLabel
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-sand-300 bg-sand-25 text-ink-700 transition-colors hover:border-terra-600 hover:text-terra-600 cursor-pointer"
      />
    </div>
  );
}

const REPORT_REASONS = [
  "Counterfeit or replica item",
  "Prohibited item",
  "Misleading photos or description",
  "Scam or suspicious behaviour",
  "Offensive content",
];

export function ReportButton({ subject }: { subject: "listing" | "user" }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="text-sm font-medium text-success-600">
        Thanks — our team will review this {subject} shortly.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 transition-colors hover:text-danger-600"
      >
        <Flag size={14} aria-hidden="true" /> Report this {subject}
      </button>
      {open && (
        <div className="mt-3 rounded-2xl border border-sand-200 bg-sand-25 p-4">
          <p className="mb-2 text-sm font-semibold text-ink-900">
            Why are you reporting this {subject}?
          </p>
          <div className="space-y-1">
            {REPORT_REASONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSent(true)}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink-700 transition-colors hover:bg-danger-100 hover:text-danger-600"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
