"use client";

/**
 * ModeToggle — segmented control that flips between Specialist Mode
 * and Manager Mode in place (no navigation). Mounts ONLY on the
 * dashboard page per scope MD §1 ("toggle is only visible on the
 * dashboard view"). Hidden on every other Specialist route.
 *
 * ## Role gate
 *
 * Returns `null` when `useSessionRole() !== "manager"`. Non-Manager
 * Specialist users never see this component. This is the core
 * "purely additive for non-Managers" guarantee of ADR 0001.
 *
 * ## Visual treatment (locked Session 1)
 *
 *   - Container: `bg-cream-deep border-line rounded-lg p-1 inline-flex`
 *   - Segments: `px-4 py-3 text-[13px] font-medium rounded-md`
 *     (~42px tall — exceeds the 40px AA touch target per scope MD §1)
 *   - Active: `bg-ink text-paper`
 *   - Inactive: `text-ink-mute hover:text-ink`
 *   - **Lime accent on active Manager segment** — a 6px lime dot
 *     LEFT of the "Manager View" label, locking lime as the
 *     Manager color (reinforces the visual cue used throughout
 *     the prototype's 14 steps). Active Specialist segment stays
 *     neutral bg-ink (no lime).
 *
 * ## Keyboard support
 *
 *   - ArrowLeft / ArrowRight — cycle focus + activate
 *   - Home — jump to first segment (Specialist)
 *   - End — jump to last segment (Manager)
 *   - Tab — moves out of the tablist
 *
 * Each segment is `role="tab"` with `aria-selected`. The wrapper is
 * `role="tablist"` with `aria-label`. Screen readers announce tab
 * activation natively; no `aria-live` region needed (see
 * CONVERSION_LOG §"Deliberate omission — aria-live announce region").
 *
 * ## Temporary "Current mode" indicator
 *
 * Step 1 only — small ink-mute mono label right of the toggle so
 * the mode change is visible while no real content forks yet exist.
 * Removed in Step 3 when dashboard sections start forking by mode.
 */

import { useRef } from "react";
import {
  useManagerMode,
  type ManagerMode,
} from "@/lib/manager/manager-mode-context";
import { useSessionRole } from "@/lib/manager/use-session-role";
import { cn } from "@/lib/utils/cn";

type SegmentDef = { mode: ManagerMode; label: string };

/* Order locked: Specialist first (Home), Manager last (End). Matches
   the scope MD §1 layout sketch. */
const SEGMENTS: ReadonlyArray<SegmentDef> = [
  { mode: "specialist", label: "My Specialist View" },
  { mode: "manager", label: "Manager View" },
];

export function ModeToggle() {
  const role = useSessionRole();
  const { mode, setMode } = useManagerMode();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  /* Role gate — non-Managers see nothing. See ADR 0001. */
  if (role !== "manager") return null;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowLeft") {
      nextIdx = (idx - 1 + SEGMENTS.length) % SEGMENTS.length;
    } else if (e.key === "ArrowRight") {
      nextIdx = (idx + 1) % SEGMENTS.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = SEGMENTS.length - 1;
    }
    if (nextIdx === null) return;
    e.preventDefault();
    const segment = SEGMENTS[nextIdx];
    if (!segment) return;
    setMode(segment.mode);
    refs.current[nextIdx]?.focus();
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div
        role="tablist"
        aria-label="Switch between Specialist and Manager view"
        className="bg-cream-deep border-line inline-flex gap-1 rounded-lg border p-1"
      >
        {SEGMENTS.map((seg, idx) => {
          const isActive = mode === seg.mode;
          const isManagerActive = isActive && seg.mode === "manager";
          return (
            <button
              key={seg.mode}
              ref={(el) => {
                refs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setMode(seg.mode)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-4 py-3 text-[13px] font-medium transition-colors",
                isActive
                  ? "bg-ink text-paper"
                  : "text-ink-mute hover:text-ink",
              )}
            >
              {isManagerActive ? (
                <span
                  aria-hidden="true"
                  className="bg-lime inline-block h-1.5 w-1.5 rounded-full"
                />
              ) : null}
              {seg.label}
            </button>
          );
        })}
      </div>

      {/* Temporary Step 1 indicator. Removed in Step 3 when real
          dashboard content forks make the mode visually obvious. */}
      <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.14em] uppercase">
        Current mode: {mode === "manager" ? "Manager" : "Specialist"}
      </span>
    </div>
  );
}
