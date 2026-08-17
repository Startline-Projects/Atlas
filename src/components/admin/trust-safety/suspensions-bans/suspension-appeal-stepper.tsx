import type { SbAppealStep } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionAppealStepperProps {
  steps: SbAppealStep[];
  state: 'under-review' | 'approved' | 'denied' | 'none';
}

export function SuspensionAppealStepper({ steps, state }: SuspensionAppealStepperProps) {
  const currentRingClass =
    state === 'approved'
      ? 'shadow-[0_0_0_3px_rgba(46,125,84,0.18)] border-[var(--success)]'
      : state === 'denied'
        ? 'shadow-[0_0_0_3px_rgba(194,65,43,0.18)] border-[var(--danger)]'
        : 'shadow-[0_0_0_3px_rgba(232,118,58,0.18)] border-[var(--amber)]';

  return (
    <div className="grid grid-cols-4 max-[720px]:grid-cols-2 gap-[8px] mb-[18px] relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const isDone = step.status === 'done';
        const isCurrent = step.status === 'current';

        const circleClasses = isDone
          ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]'
          : isCurrent
            ? 'bg-[var(--paper)] text-[var(--amber)]'
            : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-mute)]';

        const nameColor = isDone || isCurrent ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]';
        const whenColor = isCurrent ? 'text-[var(--amber)]' : 'text-[var(--ink-mute)]';

        return (
          <div key={i} className="flex flex-col items-start py-[10px] relative">
            {/* connector line to next step */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute top-[18px] left-[calc(50%_+_14px)] right-[calc(-50%_+_14px)] h-[2px] z-0 ${isDone ? 'bg-[var(--ink)]' : 'bg-[var(--line)]'}`}
              />
            )}
            <div
              className={`w-[28px] h-[28px] rounded-full border-2 grid place-items-center font-mono text-[11px] font-bold relative z-[1] mb-[6px] ${circleClasses} ${isCurrent ? currentRingClass : ''}`}
            >
              {i + 1}
            </div>
            <div className={`text-[11.5px] font-semibold tracking-[-0.01em] leading-[1.3] ${nameColor}`}>
              {step.label}
            </div>
            <div className={`font-mono text-[9px] tracking-[0.04em] font-semibold mt-[2px] ${whenColor}`}>
              {step.when}
            </div>
          </div>
        );
      })}
    </div>
  );
}
