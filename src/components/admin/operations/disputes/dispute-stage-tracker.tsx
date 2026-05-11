import type { DisputeStageTracker as TrackerData, DisputeStage, DisputeStageState } from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';

interface DisputeStageTrackerProps {
  tracker: TrackerData;
}

// admin.html lines 11881-11922 — dot states
function dotClass(state: DisputeStageState): string {
  switch (state) {
    case 'done':
      return 'bg-[var(--success)] border-[var(--success)] text-[var(--paper)]';
    case 'current':
      // admin.html line 11910 — static ring (animation replaced with static per Tailwind-only constraint)
      return 'bg-[var(--super)] border-[var(--super)] text-[var(--paper)] shadow-[0_0_0_4px_rgba(110,63,224,0.18)]';
    case 'skipped':
      return 'bg-[var(--cream-deep)] border-dashed border-[var(--line)] text-[var(--ink-mute)]';
    case 'pending':
    default:
      // admin.html lines 11885-11894 — pending: paper bg + line-strong border
      return 'bg-[var(--paper)] border-[var(--line-strong)] text-[var(--ink-mute)]';
  }
}

// admin.html lines 11935-11936 — label color for done/current
function labelClass(state: DisputeStageState): string {
  switch (state) {
    case 'done':
    case 'current':
      return 'text-[var(--ink)]';
    default:
      return 'text-[var(--ink-mute)]';
  }
}

// admin.html line 11946 — current meta is super-purple bold
function metaClass(state: DisputeStageState): string {
  if (state === 'current') return 'text-[var(--super)] font-semibold';
  return 'text-[var(--ink-mute)]';
}

function StageCard({ stage }: { stage: DisputeStage }) {
  return (
    // admin.html lines 11875-11880 — .disp-stage: relative z-1, NO background (so track shows through)
    <div className="relative z-[1] text-center px-[6px] flex flex-col items-center">
      <span
        aria-hidden="true"
        className={cn(
          // admin.html lines 11882-11894 — .ds-dot: 24×24 rounded-full 2px border mono 10px
          'w-[24px] h-[24px] rounded-full border-2 grid place-items-center font-mono text-[10px] font-semibold mb-[8px]',
          dotClass(stage.state)
        )}
      >
        {stage.state === 'done' ? (
          // admin.html line 11901 — ::after content "✓"
          <span className="text-[12px] font-bold leading-none">✓</span>
        ) : (
          stage.num
        )}
      </span>
      <div
        className={cn(
          // admin.html lines 11923-11934 — .ds-label
          'font-mono text-[9.5px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap overflow-hidden text-ellipsis mb-[2px] max-w-full',
          labelClass(stage.state)
        )}
      >
        {stage.label}
      </div>
      <div
        className={cn(
          // admin.html lines 11937-11944 — .ds-meta
          'font-mono text-[9px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis max-w-full',
          metaClass(stage.state)
        )}
      >
        {stage.meta}
      </div>
    </div>
  );
}

export function DisputeStageTracker({ tracker }: DisputeStageTrackerProps) {
  return (
    // admin.html lines 11826-11832 — .disp-stage-tracker
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] pt-[22px] px-[26px] pb-[20px] mb-[18px]">
      {/* admin.html lines 11833-11840 — head */}
      <div className="flex items-baseline justify-between gap-[8px] mb-[18px] flex-wrap">
        <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
          {tracker.headLabel}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
          {tracker.metaPrefix}
          <strong className="font-semibold text-[var(--ink)]">{tracker.metaEmphasis}</strong>
          {tracker.metaSuffix}
        </div>
      </div>

      {/* admin.html lines 11857-11874 — .disp-stages: relative grid-cols-5 with ::before horizontal track at top:12px left:10% right:10% h:2px bg cream-deep z-0 */}
      <div
        className={cn(
          'relative grid grid-cols-5 gap-0 max-[720px]:grid-cols-1 max-[720px]:gap-[16px]',
          // Horizontal track line (admin.html line 11864 .disp-stages::before)
          "before:content-[''] before:absolute before:top-[12px] before:left-[10%] before:right-[10%] before:h-[2px] before:bg-[var(--cream-deep)] before:z-0",
          'max-[720px]:before:hidden'
        )}
      >
        {tracker.stages.map((stage, idx) => (
          <StageCard key={idx} stage={stage} />
        ))}
      </div>
    </div>
  );
}
