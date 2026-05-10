"use client";

/**
 * Notifications panel — anchored under the topbar bell icon. ~360px wide.
 *
 *   Header  · "Notifications" + "Mark all as read" (e.preventDefault)
 *   Body    · scrollable list of TopbarNotification rows
 *             icon (kind-keyed) + title + detail + when + unread dot
 *   Footer  · "View all notifications →" (e.preventDefault)
 *
 * Closes on Esc, click outside, item click, window resize, window scroll.
 *
 * **Portaled to document.body** — same precedent as RowOverflowMenu
 * (commit 39359bf). The popover renders OUTSIDE the topbar's stacking
 * context to escape any ancestor `overflow:hidden` clipping (which
 * was hiding the panel's bottom rows on scroll). Position is computed
 * from the trigger's `getBoundingClientRect()` via `useLayoutEffect`
 * and applied as `position: fixed` viewport coords. The trigger lives
 * in topbar.tsx with `data-topbar-trigger="notifications"` — we
 * `querySelector` it on open. Click-outside detection still uses the
 * same data-attribute exclusion to avoid closing on the trigger fire.
 *
 * z-[20] sits ABOVE the topbar (z-[6]) — required because the
 * trigger is anchored INSIDE the topbar; even though the panel
 * positions below the topbar visually (`top: triggerRect.bottom + 8`),
 * the topbar's higher z-index would otherwise paint over the panel's
 * top edge during scroll/render transitions. RowOverflowMenu uses
 * z-[5] (correctly below topbar) because its trigger is in page
 * content. Rule: popover z-index follows the trigger's context —
 * trigger in content → z-[5]; trigger in topbar → z-[20]; modal
 * backdrop → z-[40+]. See CONVERSION_LOG.
 *
 * Visual-only: "Mark all as read" + "View all notifications" do not
 * mutate state — they're pending services. Item rows DO navigate when
 * `href` is set (links into review-queue, disputes, recert, etc.).
 *
 * Client Component.
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  RefreshCcw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  topbarNotifications,
  type TopbarNotification,
  type TopbarNotificationKind,
} from "@/lib/mock-data/specialist/topbar-feed";
import { cn } from "@/lib/utils/cn";

const TRIGGER_KEY = "notifications";
const PANEL_GAP = 8;

type Position = { top: number; right: number };

const KIND_ICON: Record<TopbarNotificationKind, LucideIcon> = {
  review: Bell,
  approved: CheckCircle2,
  dispute: AlertTriangle,
  recert: RefreshCcw,
  system: Sparkles,
};

const KIND_TONE: Record<TopbarNotificationKind, string> = {
  review: "bg-amber/15 text-amber",
  approved: "bg-success-bg text-success",
  dispute: "bg-danger-bg text-danger",
  recert: "bg-navy/10 text-navy",
  system: "bg-cream-deep text-ink-soft",
};

export function TopbarNotificationsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  /* Cache the trigger element in a ref so the useLayoutEffect can read
     it without re-querying. Mirrors the ref-based shape of
     RowOverflowMenu's wrapperRef (which the lint rule
     `react-hooks/set-state-in-effect` accepts), avoiding the false
     positive that fires when setState follows a `document.querySelector`
     call in the same effect. */
  const triggerRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  /* Compute viewport-fixed position from the trigger's bounding rect.
     Trigger lives in topbar.tsx — found via data-attribute on first
     open and cached in `triggerRef`. */
  useLayoutEffect(() => {
    if (!isOpen) return;
    if (!triggerRef.current) {
      triggerRef.current = document.querySelector<HTMLElement>(
        `[data-topbar-trigger="${TRIGGER_KEY}"]`,
      );
    }
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + PANEL_GAP,
      right: window.innerWidth - rect.right,
    });
  }, [isOpen]);

  /* Click-outside + Esc + resize/scroll to close. */
  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      const target = e.target as Node;
      if (ref.current.contains(target)) return;
      if (
        target instanceof HTMLElement &&
        target.closest(`[data-topbar-trigger="${TRIGGER_KEY}"]`)
      ) {
        return;
      }
      onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onScrollOrResize() {
      onClose();
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onScrollOrResize);
    /* Capture-phase scroll catches nested scroll containers too. */
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  const panel = (
    <div
      ref={ref}
      role="dialog"
      aria-label="Notifications"
      style={{ top: position.top, right: position.right }}
      className="border-line bg-paper fixed z-[20] w-[360px] overflow-hidden rounded-xl border shadow-[0_8px_24px_rgba(14,14,12,0.12)]"
    >
      {/* Header */}
      <header className="border-line-soft flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex flex-col">
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
            Inbox
          </span>
          <h2
            className="font-display mt-0.5 text-[15px] font-medium leading-none tracking-[-0.01em] text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Notifications
          </h2>
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="text-ink-soft hover:text-ink font-mono text-[10.5px] tracking-[0.04em] uppercase transition-colors"
        >
          Mark all as read
        </button>
      </header>

      {/* Body */}
      <ul className="m-0 flex max-h-[420px] list-none flex-col overflow-y-auto p-0">
        {topbarNotifications.map((n) => (
          <NotificationRow key={n.id} notification={n} onClose={onClose} />
        ))}
      </ul>

      {/* Footer */}
      <footer className="border-line-soft border-t px-4 py-2.5">
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="text-ink-soft hover:text-ink w-full text-left font-mono text-[10.5px] tracking-[0.04em] uppercase transition-colors"
        >
          View all notifications →
        </button>
      </footer>
    </div>
  );

  return createPortal(panel, document.body);
}

function NotificationRow({
  notification,
  onClose,
}: {
  notification: TopbarNotification;
  onClose: () => void;
}) {
  const Icon = KIND_ICON[notification.kind];
  const iconClasses = KIND_TONE[notification.kind];

  const inner = (
    <>
      {/* Unread indicator gutter */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-3.5 left-1.5 inline-block h-1.5 w-1.5 rounded-full",
          notification.read ? "bg-transparent" : "bg-lime-deep",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-md",
          iconClasses,
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className={cn(
              "truncate text-[13px] leading-tight text-ink",
              notification.read ? "font-normal" : "font-semibold",
            )}
          >
            {notification.title}
          </span>
          <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute flex-shrink-0">
            {notification.when}
          </span>
        </div>
        <p className="mt-1 m-0 line-clamp-2 text-[12px] leading-[1.45] text-ink-soft">
          {notification.detail}
        </p>
      </div>
    </>
  );

  const className =
    "relative flex w-full items-start gap-3 border-b border-line-soft px-4 py-3 text-left transition-colors hover:bg-cream last:border-b-0";

  if (notification.href) {
    return (
      <li>
        <Link
          href={notification.href}
          onClick={onClose}
          className={className}
        >
          {inner}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <button type="button" onClick={onClose} className={className}>
        {inner}
      </button>
    </li>
  );
}
