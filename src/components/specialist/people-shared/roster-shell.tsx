/**
 * Page-level wrapper for the roster (list + slide-over) views.
 * Replaces the queue's `QueueShell` for views that don't need the
 * 3-column queue rail. Provides the cream-background main column
 * with vertical stack of header / cohorts / filters / attention /
 * table / bulk-bar / sheet (the children's order).
 *
 * Server Component — no state.
 */
export function RosterShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">{children}</main>
  );
}
