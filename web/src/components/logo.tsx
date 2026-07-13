import Link from "next/link";

/**
 * Hala brand mark: a garment tag tilted forward, its punched hole echoing the
 * Arabic letter ه — the first letter of هلا ("hala", a warm Gulf hello).
 */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27.5 8.6c2-2 5.2-2.1 7.3-.2l19.4 17.4c1.2 1.1 1.9 2.6 2 4.2l1.2 18.6c.2 3.6-2.7 6.6-6.3 6.6l-18.6.1c-1.6 0-3.2-.6-4.4-1.7L8.5 36.3c-2.2-2-2.3-5.4-.3-7.5L27.5 8.6Z"
        fill="var(--teal-700)"
      />
      <circle cx="41.5" cy="23.5" r="5" fill="var(--sand-50)" />
      <circle
        cx="41.5"
        cy="23.5"
        r="7.4"
        stroke="var(--terra-500)"
        strokeWidth="2.4"
      />
      <path
        d="M22 42c3.4 3.6 8.6 4.4 13 2"
        stroke="var(--sand-50)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ withArabic = true }: { withArabic?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Hala — home"
    >
      <LogoMark size={34} />
      <span className="flex items-baseline gap-2">
        <span className="font-display text-[1.65rem] font-semibold leading-none tracking-tight text-teal-800">
          Hala
        </span>
        {withArabic && (
          <span className="text-sm font-medium text-terra-600" dir="rtl">
            هلا
          </span>
        )}
      </span>
    </Link>
  );
}
