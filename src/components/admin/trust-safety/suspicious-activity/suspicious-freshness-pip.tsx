import type { SuspiciousFreshness } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousFreshnessPipProps {
  state: SuspiciousFreshness;
  timeText: string;
}

export function SuspiciousFreshnessPip({ state, timeText }: SuspiciousFreshnessPipProps) {
  if (state === 'new') {
    return (
      <>
        <style>{`
          @keyframes sa-pulse-new {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold rounded-full bg-[rgba(110,63,224,0.12)] text-[var(--super)]">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--super)] flex-shrink-0"
            style={{ animation: 'sa-pulse-new 1.4s ease-in-out infinite' }}
          />
          New · {timeText}
        </span>
      </>
    );
  }

  if (state === 'recent') {
    return (
      <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold rounded-full bg-[var(--paper-deep)] text-[var(--ink-soft)] border border-[var(--line)]">
        {timeText}
      </span>
    );
  }

  if (state === 'older') {
    return (
      <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold rounded-full bg-transparent text-[var(--ink-mute)] border border-dashed border-[var(--line)]">
        {timeText}
      </span>
    );
  }

  // escalated
  return (
    <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold rounded-full bg-[var(--danger-bg)] text-[var(--danger)]">
      Escalated
    </span>
  );
}
