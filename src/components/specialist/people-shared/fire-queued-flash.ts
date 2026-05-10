"use client";

/**
 * useQueuedFlash — small hook that owns an `ApprovedFlash` state machine
 * for visual-only "queued" workflow actions (bulk message, suggest for
 * client, flag for re-cert, scheduled check-in, etc.).
 *
 * Standing convention: when a button advertises a workflow action whose
 * backend isn't yet wired, fire `fireQueuedFlash(message)` from the
 * click handler and render `<ApprovedFlash {...flash} />` somewhere in
 * the tree. The flash auto-dismisses after ~2.5s with a warn tone and
 * a consistent "· backend pending" sub-line so users get honest
 * acknowledgement without being misled into thinking the action
 * persisted.
 *
 * Hook returns:
 *   - `flash`: pass-through props for `<ApprovedFlash>`
 *   - `fireQueuedFlash(message, opts?)`: trigger a new flash
 *
 * Default sub-line is "· backend pending"; override via `opts.tail`.
 *
 * 6 known consumer sites (post-conversion polish):
 *   - my-candidates bulk: Message all / Add to list / Flag for re-cert / Pause
 *   - my-candidates sheet: Suggest for client match / Flag for re-cert
 *   - my-candidates SchedulingModal confirm (success-shaped copy)
 *   - my-candidates row kebab: Mark unavailable + same workflow items as sheet
 *
 * Filename matches the user-facing helper name (`fireQueuedFlash`); the
 * exported member is the React hook that wraps it. No standalone
 * non-hook trigger because the state lives in component-local React.
 *
 * Client Component (uses `useState` + `useEffect`).
 */

import { useCallback, useEffect, useState } from "react";

type FlashTone = "success" | "warn";

type FlashState = {
  open: boolean;
  /** Italic emphasized heading. */
  verb: React.ReactNode;
  /** Regular-weight tail after the verb. */
  tail: React.ReactNode;
  /** Smaller sub-line below the heading. */
  sub: string;
  /** Mono-uppercase smallest line (defaults to empty for queued flashes). */
  meta: string;
  tone: FlashTone;
};

const FLASH_HIDDEN: FlashState = {
  open: false,
  verb: "",
  tail: "",
  sub: "",
  meta: "",
  tone: "warn",
};

/** Default sub-line on queued flashes. Documented as a standing convention. */
export const QUEUED_FLASH_DEFAULT_SUB = "· backend pending";

/** Auto-dismiss delay in ms. */
const FLASH_DISMISS_MS = 2500;

export type FireQueuedFlashOpts = {
  /** Override the default "· backend pending" sub-line. */
  tail?: string;
};

export function useQueuedFlash() {
  const [flash, setFlash] = useState<FlashState>(FLASH_HIDDEN);

  /* Auto-dismiss after FLASH_DISMISS_MS. */
  useEffect(() => {
    if (!flash.open) return;
    const t = window.setTimeout(() => setFlash(FLASH_HIDDEN), FLASH_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [flash.open]);

  const fireQueuedFlash = useCallback(
    (message: string, opts?: FireQueuedFlashOpts) => {
      setFlash({
        open: true,
        verb: message,
        tail: "",
        sub: opts?.tail ?? QUEUED_FLASH_DEFAULT_SUB,
        meta: "",
        tone: "warn",
      });
    },
    [],
  );

  return { flash, fireQueuedFlash };
}
