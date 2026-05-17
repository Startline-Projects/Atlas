"use client";

/**
 * ManagerActionPlaceholderModal — generic "Coming in Step N" modal
 * for Manager-extension action buttons whose target workflow lands
 * in a later step.
 *
 * Per the two-tier CTA pattern locked in Step 3 Q2:
 *   - Navigation links (Open profile, View team, column footer →
 *     links) render as disabled spans — `cursor-not-allowed`.
 *   - **Action buttons** (Run sprint, Schedule 1:1, Submit now, etc.)
 *     render as real buttons that open THIS modal.
 *
 * ## Data-driven copy (per Step 3 lock)
 *
 * Modal body is derived from props, NOT hardcoded per call site:
 *
 *   - `cta.label`        → button text the user just clicked
 *   - `cta.landsInStep`  → step number lookup → feature name
 *   - `cta.description`  → optional override; replaces auto-derived body
 *
 * The step-features lookup map (`STEP_FEATURES`) is centralized here
 * — single file changes if step numbering shifts.
 *
 * ## A11y (per Step 3 Q7m verification)
 *
 *   - Focus trap: Tab cycles between Close (X) and "Got it" button
 *   - Esc closes
 *   - Click outside (backdrop) closes
 *   - Focus returns to the trigger element on close (the consumer
 *     must pass the trigger ref via the standard pattern — captured
 *     here by saving `document.activeElement` at open)
 *   - role="dialog" + aria-modal="true" + aria-labelledby for the
 *     title
 *
 * Mirrors `WorkflowUnavailableModal` from `specialist/shell/` in
 * shape and chrome — but kept as its own Manager-extension file per
 * the role-surface-boundary convention.
 */

import { useEffect, useRef } from "react";
import {
  type ManagerActionCTA,
  type ManagerActionStep,
} from "@/lib/mock-data/manager/manager-rail";

/** Step → feature name lookup. Single source of truth. If step
 *  numbering ever shifts, this map is the only file to update. */
const STEP_FEATURES: Record<ManagerActionStep, string> = {
  4: "My Team",
  5: "Specialist Detail",
  6: "Daily Activity Audit",
  7: "Team Disputes",
  8: "Pool Coordination",
  9: "Recruitment Sprints",
  10: "Team Reports",
  11: "Manager Daily Activity",
  14: "Help & resources",
};

type ManagerActionPlaceholderModalProps = {
  /** When non-null, the modal is open with the given CTA context. */
  cta: ManagerActionCTA | null;
  onClose: () => void;
};

export function ManagerActionPlaceholderModal({
  cta,
  onClose,
}: ManagerActionPlaceholderModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const gotItBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<Element | null>(null);
  const open = cta !== null;

  /* On open: capture trigger for focus restoration; focus the
     "Got it" button (primary action). On close: restore focus. */
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    /* Defer one tick so the dialog is mounted before focusing. */
    const t = window.setTimeout(() => {
      gotItBtnRef.current?.focus();
    }, 0);
    return () => {
      window.clearTimeout(t);
      /* On close, return focus to whatever was focused at open. */
      const prev = triggerRef.current;
      if (prev instanceof HTMLElement) {
        prev.focus();
      }
    };
  }, [open]);

  /* Esc to close + focus trap (Tab cycles Close ↔ Got-it). */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      /* Focus trap. Only 2 tabbable elements: closeBtn and gotItBtn. */
      const focusables = [closeBtnRef.current, gotItBtnRef.current].filter(
        (el): el is HTMLButtonElement => el !== null,
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !cta) return null;

  const feature = STEP_FEATURES[cta.landsInStep];
  const body =
    cta.description ??
    `${cta.label} lands in Step ${cta.landsInStep} — ${feature}.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manager-action-placeholder-title"
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[rgba(14,14,12,0.42)]"
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        className="bg-paper border-line relative z-10 w-full max-w-[440px] rounded-lg border p-6 shadow-[0_24px_48px_rgba(14,14,12,0.18)]"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2
            id="manager-action-placeholder-title"
            className="font-display text-ink m-0 text-[20px] font-medium leading-tight tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Not yet wired
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink grid h-7 w-7 place-items-center rounded-md transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="m3.5 3.5 7 7m0-7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p className="text-ink-soft m-0 mb-5 text-[14px] leading-[1.5]">
          {body}
        </p>
        <div className="flex justify-end">
          <button
            ref={gotItBtnRef}
            type="button"
            onClick={onClose}
            className="bg-ink text-paper hover:bg-ink-soft rounded-md px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
