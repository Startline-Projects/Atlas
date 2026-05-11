/**
 * SheetPanelShell — chrome for every inline panel that replaces the
 * client-overview body inside the slide-over sheet.
 *
 *   ┌──────────────────────────────────────────────┐
 *   │ ← Back to client          [optional action] │  ← shell header
 *   ├──────────────────────────────────────────────┤
 *   │ Contracts                                    │  ← title block
 *   │ 3 active · $84.2k YTD                        │     (subtitle)
 *   ├──────────────────────────────────────────────┤
 *   │ {children — panel body, scrolls inside the   │
 *   │  parent sheet's natural overflow}            │
 *   └──────────────────────────────────────────────┘
 *
 * 6 immediate consumers in this commit (Session 7):
 *   - contracts-panel
 *   - briefs-panel (list + new-brief modes share the shell)
 *   - talent-match-panel
 *   - pause-panel
 *   - tags-panel
 *
 * Pre-emptive extraction past the 2-consumer threshold. Scoped to
 * `my-clients/panels/` for now; if a candidate-side equivalent arrives
 * in a later session, promote to `people-shared/`.
 *
 * Server Component — pure composition.
 */

import { ChevronLeft } from "lucide-react";

type SheetPanelShellProps = {
  /** Panel title — e.g. "Contracts" / "Open briefs" / "Suggest talent". */
  title: string;
  /** Sub-line under the title — e.g. "3 active · $84.2k YTD". Optional. */
  subtitle?: string;
  /** Callback fired when the user clicks "Back to client". */
  onBack: () => void;
  /** Optional right-side action button (e.g. "+ New brief"). */
  headerAction?: React.ReactNode;
  children: React.ReactNode;
};

export function SheetPanelShell({
  title,
  subtitle,
  onBack,
  headerAction,
  children,
}: SheetPanelShellProps) {
  return (
    <div className="flex flex-col">
      {/* Shell header — Back affordance + optional action */}
      <div className="border-line-soft flex items-center justify-between gap-3 border-b px-6 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-ink-mute hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1 rounded-md py-1 pr-2 pl-1 text-[12.5px] font-medium transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Back to client
        </button>
        {headerAction ? (
          <div className="flex-shrink-0">{headerAction}</div>
        ) : null}
      </div>

      {/* Title block */}
      <div className="border-line-soft border-b px-6 py-4">
        <h3
          className="font-display text-ink m-0 text-[20px] font-medium leading-tight tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {title}
        </h3>
        {subtitle ? (
          <div className="text-ink-mute mt-0.5 text-[12.5px]">{subtitle}</div>
        ) : null}
      </div>

      {/* Body — flows in the parent sheet's overflow-y */}
      <div className="flex flex-col px-6 py-5">{children}</div>
    </div>
  );
}
