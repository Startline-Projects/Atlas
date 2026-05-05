import { currentUser } from "@/lib/mock-data/specialist/current-user";

/**
 * Right-rail card shown only when the specialist is in a video session.
 * Returns `null` when `currentUser.onCall === false` so the rail simply
 * folds down to its other cards. To preview the on-call state during
 * design review, flip `currentUser.onCall` to `true` in mock-data.
 *
 * The candidate name + elapsed timer are decorative copy here (no real
 * call info exists in mock data yet); future sessions will swap this
 * for live session data when realtime wires up.
 */
export function OnCallCard() {
  if (!currentUser.onCall) return null;
  return (
    <div className="bg-ink text-paper rounded-md px-4 py-3.5">
      <div className="text-lime mb-2.5 flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] uppercase">
        <span
          aria-hidden="true"
          className="bg-lime inline-block h-1.5 w-1.5 animate-pulse rounded-full"
        />
        On call
      </div>
      <div className="font-display mb-1 text-[18px] font-medium tracking-[-0.01em]">
        Sofia Reyes
      </div>
      <div className="text-paper/65 mb-3 font-mono text-[12px] tracking-[0.04em] tabular-nums">
        12:34
      </div>
      <div className="flex gap-1.5">
        <button
          type="button"
          className="bg-paper/8 text-paper border-paper/12 hover:bg-paper/15 flex-1 cursor-pointer rounded-md border px-3 py-2 text-[12px] font-medium transition-colors"
        >
          Mute
        </button>
        <button
          type="button"
          className="bg-danger text-paper hover:bg-danger/85 flex-1 cursor-pointer rounded-md border-0 px-3 py-2 text-[12px] font-medium transition-colors"
        >
          End call
        </button>
      </div>
    </div>
  );
}
