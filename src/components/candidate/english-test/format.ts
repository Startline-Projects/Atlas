/**
 * Display helpers for the English-test surface. Pure — safe in Server and
 * Client Components.
 */

/**
 * "Aug 16, 2026 · 17:20 UTC". Server-rendered, so we cannot know the
 * candidate's zone; an explicit UTC stamp is honest, a silent local time
 * would be whichever machine rendered it.
 */
const TAKEN_AT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export function formatTakenAt(iso: string): string {
  const parts = TAKEN_AT.formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("month")} ${get("day")}, ${get("year")} · ${get("hour")}:${get("minute")} UTC`;
}

/** "$10.00" from integer cents. */
export function formatUsdCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
