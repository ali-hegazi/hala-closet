"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Globe,
  MapPin,
  ShieldAlert,
  Trash2,
  UserRound,
} from "lucide-react";
import { EMIRATES } from "@/lib/catalog";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";

const SECTIONS = [
  { id: "profile", label: "Profile", Icon: UserRound },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "language", label: "Language & region", Icon: Globe },
  { id: "addresses", label: "Addresses", Icon: MapPin },
  { id: "payments", label: "Payments", Icon: CreditCard },
  { id: "privacy", label: "Privacy & safety", Icon: ShieldAlert },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Toggle({
  label,
  hint,
  defaultChecked = true,
}: {
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between gap-4 rounded-xl px-1 py-2.5 text-left"
    >
      <span>
        <span className="block text-sm font-medium text-ink-900">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-ink-500">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-teal-700" : "bg-sand-300"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-sand-25 shadow transition-transform ${
            on ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function SavedNote() {
  return (
    <p className="mt-4 text-xs text-ink-400">
      Demo mode — changes preview here and persist for real once accounts are
      connected to Supabase.
    </p>
  );
}

export default function SettingsPage() {
  const [section, setSection] = useState<SectionId>("profile");

  return (
    <div className="pb-12 pt-6">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink-900">Settings</h1>
      <div className="grid gap-6 md:grid-cols-[230px_1fr]">
        <nav aria-label="Settings sections" className="scroll-row -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:flex-col md:px-0">
          {SECTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              aria-current={section === id}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                section === id
                  ? "bg-teal-50 text-teal-800"
                  : "text-ink-500 hover:bg-sand-100 hover:text-ink-900"
              }`}
            >
              <Icon size={17} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>

        <div className="rounded-3xl border border-sand-200 bg-sand-25 p-5 sm:p-7">
          {section === "profile" && (
            <div className="max-w-md space-y-4">
              <h2 className="font-display text-xl font-semibold text-ink-900">Profile</h2>
              <div>
                <Label htmlFor="p-name">Display name</Label>
                <Input id="p-name" defaultValue="Layla Al Mansouri" />
              </div>
              <div>
                <Label htmlFor="p-handle">Username</Label>
                <Input id="p-handle" defaultValue="laylascloset" />
              </div>
              <div>
                <Label htmlFor="p-bio">Bio</Label>
                <Textarea
                  id="p-bio"
                  rows={3}
                  defaultValue="Decluttering a very full Jumeirah wardrobe. Everything steamed and ready to wear."
                />
              </div>
              <div>
                <Label htmlFor="p-emirate">Home emirate</Label>
                <Select id="p-emirate" defaultValue="Dubai">
                  {EMIRATES.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </Select>
              </div>
              <Button>Save changes</Button>
              <SavedNote />
            </div>
          )}

          {section === "notifications" && (
            <div className="max-w-lg">
              <h2 className="mb-1 font-display text-xl font-semibold text-ink-900">
                Notifications
              </h2>
              <p className="mb-4 text-sm text-ink-500">
                Choose what we tell you about, and when.
              </p>
              <div className="divide-y divide-sand-200">
                <Toggle label="New messages" hint="Buyers and sellers replying to you" />
                <Toggle label="Offers on your items" hint="Never miss a deal" />
                <Toggle label="Price drops on favourites" />
                <Toggle
                  label="Saved search alerts"
                  hint="When new items match a search you saved"
                />
                <Toggle
                  label="Quiet during prayer times"
                  hint="Pause push notifications around the five daily prayers"
                />
                <Toggle
                  label="Marketing & tips"
                  hint="Occasional selling tips and Hala news"
                  defaultChecked={false}
                />
              </div>
              <SavedNote />
            </div>
          )}

          {section === "language" && (
            <div className="max-w-md space-y-4">
              <h2 className="font-display text-xl font-semibold text-ink-900">
                Language & region
              </h2>
              <div>
                <Label htmlFor="l-lang">Language</Label>
                <Select id="l-lang" defaultValue="en">
                  <option value="en">English</option>
                  <option value="ar">العربية (coming soon)</option>
                </Select>
                <p className="mt-1.5 text-xs text-ink-500">
                  Full Arabic with right-to-left layout is on the roadmap — the
                  design is already RTL-ready.
                </p>
              </div>
              <div>
                <Label htmlFor="l-currency">Currency</Label>
                <Select id="l-currency" defaultValue="aed" disabled>
                  <option value="aed">AED — UAE Dirham</option>
                </Select>
              </div>
              <SavedNote />
            </div>
          )}

          {section === "addresses" && (
            <div className="max-w-md">
              <h2 className="mb-4 font-display text-xl font-semibold text-ink-900">
                Addresses
              </h2>
              <div className="rounded-2xl border border-sand-200 p-4">
                <p className="text-sm font-semibold text-ink-900">Home</p>
                <p className="mt-0.5 text-sm text-ink-500">
                  Villa 12, Street 8b, Jumeirah 1, Dubai
                </p>
                <p className="mt-0.5 text-xs text-ink-400">Default for courier delivery</p>
              </div>
              <Button variant="outline" className="mt-4">
                Add address
              </Button>
              <SavedNote />
            </div>
          )}

          {section === "payments" && (
            <div className="max-w-md">
              <h2 className="mb-1 font-display text-xl font-semibold text-ink-900">
                Payments
              </h2>
              <p className="mb-4 text-sm text-ink-500">
                Today, buyers and sellers settle directly — cash on delivery,
                bank transfer, or in person.
              </p>
              <div className="rounded-2xl bg-teal-50 p-4 text-sm leading-relaxed text-teal-800">
                <strong>Coming soon:</strong> in-app card payments plus Tabby
                and Tamara instalments, with buyer protection held in escrow
                until you confirm delivery.
              </div>
              <SavedNote />
            </div>
          )}

          {section === "privacy" && (
            <div className="max-w-lg">
              <h2 className="mb-4 font-display text-xl font-semibold text-ink-900">
                Privacy & safety
              </h2>
              <div className="divide-y divide-sand-200">
                <Toggle label="Show my emirate on listings" />
                <Toggle
                  label="Show my profile in search engines"
                  defaultChecked={false}
                />
                <Toggle label="Read receipts in chat" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-bold text-ink-900">Blocked users</h3>
                <p className="mt-1 text-sm text-ink-500">
                  You haven&apos;t blocked anyone. Blocked users can&apos;t
                  message you or see your listings.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-danger-100 bg-danger-100/40 p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-danger-600">
                  <Trash2 size={15} aria-hidden="true" /> Delete account
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Permanently removes your profile, listings and messages. This
                  cannot be undone.
                </p>
                <Button variant="danger" size="sm" className="mt-3">
                  Delete my account
                </Button>
              </div>
              <SavedNote />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
