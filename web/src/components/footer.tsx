import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Women", href: "/search?category=women" },
      { label: "Men", href: "/search?category=men" },
      { label: "Modest Wear", href: "/search?category=modest-wear" },
      { label: "Designer", href: "/search?category=designer" },
      { label: "Under AED 100", href: "/search?max=100" },
    ],
  },
  {
    heading: "Sell",
    links: [
      { label: "List an item", href: "/sell" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Seller verification", href: "/how-it-works#trust" },
    ],
  },
  {
    heading: "Hala",
    links: [
      { label: "About", href: "/how-it-works" },
      { label: "Settings", href: "/settings" },
      { label: "Sign in", href: "/auth/sign-in" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-sand-200 bg-sand-100/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
            The UAE&apos;s marketplace for pre-loved fashion. Buy and sell
            across all seven emirates — from designer bags in Dubai to kids&apos;
            bundles in Sharjah.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-700">
              {col.heading}
            </h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-500 transition-colors hover:text-teal-800"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-sand-200/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-ink-400 sm:px-6">
          <p>© 2026 Hala. Made with love in the Emirates.</p>
          <p dir="rtl" lang="ar">هلا — سوق الأزياء المستعملة في الإمارات</p>
        </div>
      </div>
    </footer>
  );
}
