"use client";

/**
 * User menu — anchored under the topbar avatar pill. ~260px wide.
 *
 *   Header  · avatar tile + display name + role/category caption
 *   Body    · menu items (Settings, My profile, Help & support)
 *   Footer  · Sign out (subtle red text, e.preventDefault)
 *
 * Settings + Help routes navigate via Next.js <Link>. "My profile" is
 * a placeholder — no `/specialist/me` route exists; documented in
 * CONVERSION_LOG as future polish. "Sign out" is e.preventDefault
 * pending the auth integration.
 *
 * Closes on Esc, click outside, item click.
 *
 * Client Component.
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LifeBuoy, LogOut, Settings, UserCircle2 } from "lucide-react";
import { currentUser } from "@/lib/mock-data/specialist/current-user";

const TRIGGER_KEY = "user";
const PANEL_GAP = 8;

type Position = { top: number; right: number };

export function TopbarUserMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  /* Compute viewport-fixed position from the trigger's bounding rect.
     Same portal pattern as RowOverflowMenu (39359bf) and the
     notifications + messages panels — escapes ancestor overflow:hidden
     clipping that was cutting off the bottom of the menu (Sign out
     row was being clipped on scroll). Trigger ref caches the queried
     element (see notifications panel comment for lint rationale). */
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
      role="menu"
      aria-label="Account menu"
      style={{ top: position.top, right: position.right }}
      className="border-line bg-paper fixed z-[20] w-[260px] overflow-hidden rounded-xl border shadow-[0_8px_24px_rgba(14,14,12,0.12)]"
    >
      {/* Header — avatar + display name + role caption */}
      <header className="border-line-soft flex items-center gap-3 border-b px-4 py-3">
        <span
          aria-hidden="true"
          className="font-display text-ink grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[15px] font-medium"
          style={{
            background: `linear-gradient(135deg, ${currentUser.avatarGradient.from}, ${currentUser.avatarGradient.to})`,
          }}
        >
          {currentUser.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div
            className="font-display truncate text-[14px] font-medium leading-tight text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {currentUser.fullName}
          </div>
          <div className="mt-0.5 truncate font-mono text-[10px] tracking-[0.06em] uppercase text-ink-mute">
            Specialist · {currentUser.category}
          </div>
        </div>
      </header>

      {/* Body — primary actions */}
      <ul className="m-0 flex list-none flex-col p-1">
        <MenuLink
          href="/specialist/settings"
          icon={Settings}
          label="Settings"
          onClose={onClose}
        />
        <MenuButton
          icon={UserCircle2}
          label="My profile"
          onClose={onClose}
          /* No /specialist/me route — visual-only placeholder. */
        />
        <MenuLink
          href="/specialist/help"
          icon={LifeBuoy}
          label="Help & support"
          onClose={onClose}
        />
      </ul>

      {/* Footer — sign out */}
      <footer className="border-line-soft border-t p-1">
        <button
          type="button"
          role="menuitem"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="text-danger hover:bg-danger-bg flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] font-medium transition-colors"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} aria-hidden="true" />
          Sign out
        </button>
      </footer>
    </div>
  );

  return createPortal(panel, document.body);
}

/* ============================================================
   Internal: row primitives
   ============================================================ */

function MenuLink({
  href,
  icon: Icon,
  label,
  onClose,
}: {
  href: string;
  icon: typeof Settings;
  label: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        role="menuitem"
        onClick={onClose}
        className="text-ink hover:bg-cream flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors"
      >
        <Icon
          className="text-ink-mute h-4 w-4 flex-shrink-0"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

function MenuButton({
  icon: Icon,
  label,
  onClose,
}: {
  icon: typeof Settings;
  label: string;
  onClose: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="menuitem"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="text-ink hover:bg-cream flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] font-medium transition-colors"
      >
        <Icon
          className="text-ink-mute h-4 w-4 flex-shrink-0"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        {label}
      </button>
    </li>
  );
}
