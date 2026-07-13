export function formatAED(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
}

export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const days = Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
}

export function memberSince(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AE", {
    month: "long",
    year: "numeric",
  });
}
