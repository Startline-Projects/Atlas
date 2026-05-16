import type { PrPolicyVersion } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrPolicyTimelineProps {
  versions: PrPolicyVersion[];
}

export function PrPolicyTimeline({ versions }: PrPolicyTimelineProps) {
  return (
    <div className="flex flex-col">
      {versions.map((version, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-[14px_90px_minmax(0,1fr)_110px] gap-[14px] py-[16px] border-b border-b-dashed border-b-[var(--line)] last:border-b-0 relative max-[720px]:grid-cols-[14px_minmax(0,1fr)] max-[720px]:gap-[10px] max-[720px]:py-[14px]`}
        >
          {/* Dot */}
          <div
            className={`w-[12px] h-[12px] rounded-full mt-[4px] flex-shrink-0 ${
              version.isCurrent
                ? 'bg-[var(--success)] shadow-[0_0_0_3px_rgba(46,177,76,0.12)]'
                : 'bg-[var(--ink-mute)]'
            }`}
          />

          {/* Date */}
          <div className="max-[720px]:hidden">
            <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] font-bold pt-[3px]">
              {version.date}
            </div>
            <span className="block text-[9.5px] text-[var(--ink-mute)] font-medium mt-[2px] tracking-[0.04em]">
              {version.dateRel}
            </span>
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-[8px] flex-wrap">
              <h3 className="font-display text-[14.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px] leading-[1.25]">
                {version.version}
              </h3>
              {version.isCurrent && (
                <span className="inline-block font-mono text-[8.5px] tracking-[0.1em] uppercase font-bold py-[2px] px-[7px] bg-[rgba(46,177,76,0.12)] text-[var(--success)] rounded-[3px] align-middle">
                  Current
                </span>
              )}
            </div>
            <div
              className="font-body text-[12.5px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em] mb-[5px] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: version.summaryHtml }}
            />
            <div
              className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: version.approverHtml }}
            />
          </div>

          {/* Ack */}
          <div className="text-right max-[720px]:hidden">
            <div className="font-display text-[22px] font-medium text-[var(--ink)] tracking-[-0.025em] leading-[1] tabular-nums">
              {version.ackRate}
            </div>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mt-[3px]">
              Acknowledged
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
