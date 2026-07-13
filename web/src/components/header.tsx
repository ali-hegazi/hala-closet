"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import {
  Heart,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { Logo } from "./logo";
import { CATEGORIES } from "@/lib/catalog";

function SearchForm({ className }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search");
      }}
    >
      <div className="relative w-full">
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search brands, items, sizes…"
          aria-label="Search listings"
          className="h-11 w-full rounded-full border border-sand-200 bg-sand-100/60 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-teal-600 focus:bg-sand-25"
        />
      </div>
    </form>
  );
}

const NAV_ICONS = [
  { href: "/favourites", label: "Favourites", Icon: Heart },
  { href: "/inbox", label: "Inbox", Icon: MessageCircle },
  { href: "/profile/s1", label: "Profile", Icon: User },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 shadow-header backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <Logo />
        <Suspense>
          <SearchForm className="hidden flex-1 md:block md:max-w-xl" />
        </Suspense>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 md:flex">
          {NAV_ICONS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className="rounded-full p-2.5 text-ink-700 transition-colors hover:bg-sand-100 hover:text-teal-800"
            >
              <Icon size={20} aria-hidden="true" />
            </Link>
          ))}
          <Link
            href="/sell"
            className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-terra-600 px-4 text-sm font-semibold text-sand-25 shadow-sm transition-colors hover:bg-terra-700"
          >
            <Plus size={17} aria-hidden="true" /> Sell now
          </Link>
        </nav>
        <button
          type="button"
          className="ml-auto rounded-full p-2.5 text-ink-700 hover:bg-sand-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Category strip */}
      <div className="border-t border-sand-200/70">
        <nav
          aria-label="Categories"
          className="scroll-row mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6"
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/search?category=${c.slug}`}
              className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-700 transition-colors hover:bg-teal-50 hover:text-teal-800"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand-200 bg-sand-25 px-4 py-4 md:hidden">
          <Suspense>
            <SearchForm className="mb-3" />
          </Suspense>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ICONS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-sand-200 px-3.5 py-3 text-sm font-medium text-ink-700 hover:border-teal-700"
              >
                <Icon size={18} aria-hidden="true" /> {label}
              </Link>
            ))}
          </div>
          <Link
            href="/sell"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-11 items-center justify-center gap-1.5 rounded-full bg-terra-600 text-sm font-semibold text-sand-25"
          >
            <Plus size={17} aria-hidden="true" /> Sell now
          </Link>
        </div>
      )}
    </header>
  );
}
