/**
 * Two-column shell for chat pages: conv-rail (320px sticky) + main pane.
 *
 * Sits INSIDE the (specialist) layout — the existing 232px sidebar and
 * 36px ribbon + ~57px topbar already live one level up. Sticky offsets
 * follow the standing convention: `top-[calc(36px+57px)]` and
 * `h-[calc(100vh-36px-57px)]`.
 *
 * Below 1180px (xl-ish) the rail narrows to 280px (matches the source
 * CSS @media (max-width: 1180px) rule on `.dash-shell.cc-shell`).
 *
 * Below 880px the rail is hidden — the main pane takes the full width.
 * URL-driven thread switching means a future mobile back button can
 * just navigate back to a no-id state to "show the rail again", but
 * that's a 6.4 polish item; not in scope this session.
 *
 * Server Component — no state of its own.
 */
export function ChatShell({
  rail,
  main,
}: {
  rail: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="hidden md:block">{rail}</div>
      <div className="min-w-0">{main}</div>
    </div>
  );
}
