/**
 * Date formatting shared by the client and candidate surfaces. Pure —
 * safe in Server and Client Components. Deterministic output for a given
 * `now`, so Server Components can pass the render time and avoid
 * hydration drift.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

const MONTH_DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const MONTH_DAY_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** "Today", "Yesterday", "3 days ago", then "Aug 2" / "Aug 2, 2025". */
export function formatRelativeDay(value: string | Date, now: Date = new Date()): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const days = Math.floor((now.getTime() - date.getTime()) / DAY_MS);

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days} days ago`;
  return date.getFullYear() === now.getFullYear()
    ? MONTH_DAY.format(date)
    : MONTH_DAY_YEAR.format(date);
}

/** "Aug 2, 2026" — for places that want the exact day. */
export function formatDay(value: string | Date): string {
  return MONTH_DAY_YEAR.format(typeof value === "string" ? new Date(value) : value);
}
