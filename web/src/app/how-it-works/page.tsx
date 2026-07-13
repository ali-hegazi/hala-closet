import type { Metadata } from "next";
import {
  Banknote,
  Camera,
  Handshake,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = { title: "How it works" };

const BUY_STEPS = [
  {
    Icon: Search,
    title: "Find it",
    body: "Search by brand, size, condition and emirate. Save searches and get alerted when something new matches.",
  },
  {
    Icon: MessageCircle,
    title: "Agree it",
    body: "Chat with the seller, ask for extra photos, and make an offer right inside the conversation.",
  },
  {
    Icon: Handshake,
    title: "Get it",
    body: "Meet in person, use cash on delivery, or arrange a courier — whatever works for both of you.",
  },
];

const SELL_STEPS = [
  {
    Icon: Camera,
    title: "Snap & list",
    body: "Good light, plain background, honest condition notes. Listing takes under two minutes.",
  },
  {
    Icon: Banknote,
    title: "Price it right",
    body: "We show original retail next to your price so buyers see the deal. Open to offers moves items faster.",
  },
  {
    Icon: ShieldCheck,
    title: "Build your reputation",
    body: "Every sale earns a review. Verified sellers with strong ratings sell faster and for more.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16 pt-10">
      <h1 className="font-display text-4xl font-semibold text-ink-900">
        How Hala works
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-500">
        Hala (هلا) is how you say a warm hello in the Gulf — and it&apos;s how
        secondhand fashion should feel. Simple, local and personal.
      </p>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-2xl font-semibold text-ink-900">Buying</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {BUY_STEPS.map(({ Icon, title, body }, i) => (
            <div key={title} className="rounded-2xl border border-sand-200 bg-sand-25 p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-teal-100 font-display font-semibold text-teal-800">
                  {i + 1}
                </span>
                <Icon size={20} className="text-teal-700" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-2xl font-semibold text-ink-900">Selling</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {SELL_STEPS.map(({ Icon, title, body }, i) => (
            <div key={title} className="rounded-2xl border border-sand-200 bg-sand-25 p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-terra-100 font-display font-semibold text-terra-700">
                  {i + 1}
                </span>
                <Icon size={20} className="text-terra-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="trust" className="mt-10 rounded-3xl bg-teal-800 p-7 text-sand-25 sm:p-9">
        <h2 className="font-display text-2xl font-semibold">Trust & safety</h2>
        <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-teal-100">
          <li>
            <strong className="text-sand-25">Verified sellers</strong> — ID-checked badge
            so you know who you&apos;re dealing with.
          </li>
          <li>
            <strong className="text-sand-25">Ratings on every profile</strong> — real
            reviews from completed sales.
          </li>
          <li>
            <strong className="text-sand-25">Report anything</strong> — counterfeit,
            misleading or prohibited items are removed fast.
          </li>
          <li>
            <strong className="text-sand-25">Meet safely</strong> — we recommend public
            places like malls, and daylight hours for first meet-ups.
          </li>
        </ul>
        <div className="mt-6">
          <ButtonLink href="/sell" variant="accent" size="lg">
            List your first item
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
