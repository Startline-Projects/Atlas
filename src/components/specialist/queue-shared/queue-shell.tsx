/**
 * Two-column shell for queue pages: queue rail (260px sticky) + main.
 *
 * Sits INSIDE the (specialist) layout — the existing 232px sidebar
 * already lives one level up. Below 1280px (xl) the rail collapses
 * (matches the source CSS `display: none !important` rule on
 * `.review-queue-rail`); only the main column is visible.
 *
 * Server Component — no state of its own.
 */
export function QueueShell({
  rail,
  children,
}: {
  rail: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)]">
      <div className="hidden xl:block">{rail}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
