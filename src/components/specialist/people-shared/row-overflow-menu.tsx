"use client";

/**
 * RowOverflowMenu — generic 3-dot ("More actions") popover for table rows
 * and chat-header action clusters. Discriminated-union item shape supports
 * link rows, action rows (with optional danger tone), and dividers.
 *
 * 3 known consumer files (extracted post-conversion):
 *   - my-candidates/candidate-row.tsx (per-row kebab — wired here)
 *   - my-clients/client-row.tsx       (per-row kebab — to be wired)
 *   - chat-shared/chat-header.tsx     (header More button — to be wired)
 *
 * Click-outside detection follows the topbar-popover precedent (commit
 * dd2d450): the menu wraps a trigger that carries
 * `data-overflow-trigger="<id>"`, and the document-level mousedown
 * listener uses that attribute to skip closing when the trigger itself
 * is clicked. Esc closes via document keydown.
 *
 * The trigger renders inside this component — by default a 3-dot
 * `<MoreHorizontal>` icon button matching the existing kebab styling.
 * Consumers with non-standard triggers (chat-header's `ActionIconButton`)
 * can pass `renderTrigger` to override.
 *
 * **Why portal:** the menu renders to `document.body` via
 * `createPortal`, escaping any opacity / overflow / transform stacking
 * context applied by ancestor containers. Concrete bug averted: the
 * candidate-row hover cluster wraps the kebab in
 * `<div class="opacity-40 group-hover:opacity-100">`. CSS `opacity`
 * cascades to ALL descendants regardless of explicit `bg-color` — so
 * `bg-paper` alone wasn't enough. Portaling solves it definitively
 * (same pattern Radix / Headless UI / Floating UI use).
 *
 * Position is computed from the wrapper's `getBoundingClientRect()` and
 * applied via `position: fixed` in viewport coords. Window resize and
 * scroll close the menu rather than reposition (simpler UX; matches
 * production overflow-menu patterns).
 *
 * z-[5] follows the sticky-stack convention: above page content, below
 * topbar (z-[6]) and cohort tabs (z-[7]). Modals (z-[200]+) and
 * approved-flash (z-[300]) layer above. Solid `bg-paper` (no alpha) is
 * required — translucent menu bgs bleed row content through (same trap
 * as the queue tab-strip hotfix a1b67f7).
 *
 * Client Component.
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * SSR safety: open starts `false`, so the menu's `createPortal` call
 * only runs after a user click — guaranteed to be client-side. No
 * `mounted` flag needed (and the codebase's strict
 * react-hooks/immutability lint rule rejects the
 * `useEffect(() => setMounted(true), [])` idiom).
 */

export type OverflowMenuItem =
  | {
      kind: "link";
      key: string;
      label: string;
      href: string;
      icon?: React.ReactNode;
    }
  | {
      kind: "action";
      key: string;
      label: string;
      onClick: () => void;
      icon?: React.ReactNode;
      tone?: "default" | "danger";
    }
  | { kind: "divider"; key: string };

type RenderTriggerProps = {
  open: boolean;
  toggle: () => void;
  /** Pass-through HTML attributes for the trigger element. */
  triggerProps: {
    "data-overflow-trigger": string;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
    "aria-label": string;
  };
};

type RowOverflowMenuProps = {
  /** Stable id for the data-overflow-trigger attribute (cross-trigger isolation). */
  triggerId: string;
  /** Aria label for the trigger ("More actions for Marie Okonkwo"). */
  triggerLabel: string;
  items: ReadonlyArray<OverflowMenuItem>;
  /** Optional override of the default 3-dot button. */
  renderTrigger?: (props: RenderTriggerProps) => React.ReactNode;
  /** Optional className for the default trigger button. */
  triggerClassName?: string;
  /** Stop event propagation on the trigger so a row-click handler doesn't fire too. Default true. */
  stopPropagation?: boolean;
};

type MenuPosition = { top: number; right: number };

const MENU_GAP = 4;

export function RowOverflowMenu({
  triggerId,
  triggerLabel,
  items,
  renderTrigger,
  triggerClassName,
  stopPropagation = true,
}: RowOverflowMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* Compute viewport-fixed position when the menu opens. Uses the wrapper's
     bounding rect (which encloses both the trigger and any custom render). */
  useLayoutEffect(() => {
    if (!open || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + MENU_GAP,
      right: window.innerWidth - rect.right,
    });
  }, [open]);

  /* Esc + click-outside + window resize/scroll close. */
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (menuRef.current.contains(target)) return;
      if (
        target instanceof HTMLElement &&
        target.closest(`[data-overflow-trigger="${triggerId}"]`)
      ) {
        return;
      }
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onScrollOrResize() {
      setOpen(false);
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
  }, [open, triggerId]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  const triggerProps = {
    "data-overflow-trigger": triggerId,
    "aria-haspopup": "menu" as const,
    "aria-expanded": open,
    "aria-label": triggerLabel,
  };

  const menu =
    open && position ? (
      <div
        ref={menuRef}
        role="menu"
        aria-label={triggerLabel}
        onClick={(e) => e.stopPropagation()}
        style={{ top: position.top, right: position.right }}
        className="border-line bg-paper fixed z-[5] w-[240px] overflow-hidden rounded-md border shadow-[0_8px_24px_rgba(14,14,12,0.12)]"
      >
        <ul className="m-0 flex list-none flex-col p-1">
          {items.map((item) => (
            <MenuItem key={item.key} item={item} onClose={close} />
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div ref={wrapperRef} className="inline-flex">
      {renderTrigger ? (
        renderTrigger({ open, toggle, triggerProps })
      ) : (
        <button
          type="button"
          {...triggerProps}
          onClick={(e) => {
            if (stopPropagation) e.stopPropagation();
            toggle();
          }}
          className={cn(
            "text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors",
            triggerClassName,
          )}
        >
          <MoreHorizontal
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      )}
      {menu ? createPortal(menu, document.body) : null}
    </div>
  );
}

/* ============================================================
   Per-item rendering
   ============================================================ */

const ACTION_TONE: Record<"default" | "danger", string> = {
  default: "text-ink hover:bg-cream",
  danger: "text-danger hover:bg-danger-bg",
};

function MenuItem({
  item,
  onClose,
}: {
  item: OverflowMenuItem;
  onClose: () => void;
}) {
  if (item.kind === "divider") {
    return (
      <li
        aria-hidden="true"
        role="separator"
        className="border-line-soft my-1 border-t"
      />
    );
  }
  if (item.kind === "link") {
    return (
      <li>
        <Link
          href={item.href}
          role="menuitem"
          onClick={onClose}
          className="text-ink hover:bg-cream flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors"
        >
          {item.icon ? (
            <span aria-hidden="true" className="text-ink-mute flex-shrink-0">
              {item.icon}
            </span>
          ) : null}
          {item.label}
        </Link>
      </li>
    );
  }
  // action
  const tone = item.tone ?? "default";
  return (
    <li>
      <button
        type="button"
        role="menuitem"
        onClick={(e) => {
          e.preventDefault();
          item.onClick();
          onClose();
        }}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] font-medium transition-colors",
          ACTION_TONE[tone],
        )}
      >
        {item.icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "flex-shrink-0",
              tone === "danger" ? "text-danger" : "text-ink-mute",
            )}
          >
            {item.icon}
          </span>
        ) : null}
        {item.label}
      </button>
    </li>
  );
}
