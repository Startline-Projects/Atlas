/**
 * Phase 15a — Investigation progress tracker.
 *
 * admin.html CSS: .fr-tracker + .fr-tr-step (L16516-16620)
 * admin.html markup: L40198-40270
 *
 * Padding 18px 20px. h3 display 14px 500. tr-percent mono 11px 700 ink.
 * Head has border-bottom dashed line-soft mb-14.
 * Progress bar 4px bg cream-deep, fill bg ink.
 * Steps: grid 24px 1fr, gap-10, py-8.
 * Dots: 24×24. Done = ink bg + ✓. Current = paper bg, ink border, ink color, shadow.
 * Pending = paper bg, line border, ink-mute number.
 * Connector: ::after from left:11px.
 * Current meta = super color.
 */
import type { FraudInvestigationStep } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudInvestigationTrackerProps {
  steps: FraudInvestigationStep[];
  progress: { done: number; total: number };
}

export function FraudInvestigationTracker({ steps, progress }: FraudInvestigationTrackerProps) {
  const pct = Math.round((progress.done / progress.total) * 100);

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      {/* Head — with dashed bottom border */}
      <div className="flex items-baseline justify-between gap-[8px] pb-[12px] border-b border-dashed border-[var(--line-soft)] mb-[14px]">
        <h3 className="font-display text-[14px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          Investigation progress
        </h3>
        <span className="font-mono text-[11px] font-bold text-[var(--ink)] tracking-[0.02em]">
          {progress.done} / {progress.total} · {pct}%
        </span>
      </div>

      {/* Progress bar — 4px */}
      <div className="h-[4px] bg-[var(--cream-deep)] rounded-full overflow-hidden mb-[16px]">
        <div
          className="h-full bg-[var(--ink)] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Steps — grid 24px 1fr */}
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const stepNumber = i + 1;
          return (
            <div
              key={step.label}
              className="grid grid-cols-[24px_1fr] gap-[10px] py-[8px] relative items-start"
            >
              {/* Vertical connector line via ::after equivalent */}
              {i < steps.length - 1 && (
                <div className="absolute left-[11px] top-[26px] bottom-[-8px] w-[2px] bg-[var(--line)] z-0" />
              )}

              {/* Dot — 24×24 */}
              <div className="relative z-[1]">
                {step.done ? (
                  <span className="w-[24px] h-[24px] rounded-full bg-[var(--ink)] border-[2px] border-[var(--ink)] text-[var(--paper)] grid place-items-center font-mono text-[10px] font-bold flex-shrink-0">
                    ✓
                  </span>
                ) : step.current ? (
                  <span className="w-[24px] h-[24px] rounded-full bg-[var(--paper)] border-[2px] border-[var(--ink)] text-[var(--ink)] grid place-items-center font-mono text-[10px] font-bold flex-shrink-0 shadow-[0_0_0_3px_rgba(14,14,12,0.10)]">
                    {stepNumber}
                  </span>
                ) : (
                  <span className="w-[24px] h-[24px] rounded-full bg-[var(--paper)] border-[2px] border-[var(--line)] text-[var(--ink-mute)] grid place-items-center font-mono text-[10px] font-bold flex-shrink-0">
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Content */}
              <div>
                <div className={`text-[12.5px] font-semibold tracking-[-0.01em] leading-[1.3] ${
                  step.done || step.current ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]'
                }`}>
                  {step.label}
                </div>
                <div className={`font-mono text-[9.5px] tracking-[0.02em] mt-[2px] font-medium ${
                  step.current ? 'text-[var(--super)]' : 'text-[var(--ink-mute)]'
                }`}>
                  {step.meta}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
