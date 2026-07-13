import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const buttonStyles = {
  primary:
    "bg-teal-700 text-sand-25 hover:bg-teal-800 active:bg-teal-900 shadow-sm",
  accent:
    "bg-terra-600 text-sand-25 hover:bg-terra-700 active:bg-terra-700 shadow-sm",
  outline:
    "border border-sand-300 bg-sand-25 text-ink-900 hover:border-teal-700 hover:text-teal-800",
  ghost: "text-ink-700 hover:bg-sand-100",
  danger: "bg-danger-100 text-danger-600 hover:bg-danger-600 hover:text-sand-25",
} as const;

const buttonSizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
} as const;

type ButtonVariant = keyof typeof buttonStyles;
type ButtonSize = keyof typeof buttonSizes;

const baseButton =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cx(baseButton, buttonStyles[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <Link
      className={cx(baseButton, buttonStyles[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cx(
        "h-11 w-full rounded-xl border border-sand-200 bg-sand-25 px-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-600",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cx(
        "h-11 w-full appearance-none rounded-xl border border-sand-200 bg-sand-25 px-3.5 pr-9 text-sm text-ink-900 focus:border-teal-600 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236f6656' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
      }}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cx(
        "w-full rounded-xl border border-sand-200 bg-sand-25 px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-600",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cx("mb-1.5 block text-sm font-semibold text-ink-700", className)}
      {...props}
    />
  );
}

const AVATAR_HUES = [
  "bg-teal-100 text-teal-800",
  "bg-terra-100 text-terra-700",
  "bg-sand-100 text-ink-700",
  "bg-success-100 text-success-600",
];

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = AVATAR_HUES[name.length % AVATAR_HUES.length];
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-lg",
    xl: "size-20 text-2xl",
  };
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold",
        hue,
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sand-300 bg-sand-25 px-6 py-16 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-sand-100 text-ink-500">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-500">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className={cx("inline-flex items-center gap-0.5 text-gold-500", className)}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
