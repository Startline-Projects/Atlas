/* admin.html lines 62330-62351: dsr-subject-card pattern repurposed as integration account card.
   h3 + gradient avatar + name + sub id + dsm-row meta list + action button. */

import type { IntAccountCardData } from '@/lib/mock-data/admin/integrations-data';

interface IntAccountCardProps {
  data: IntAccountCardData;
}

export function IntAccountCard({ data }: IntAccountCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
        {data.title}
      </h3>

      {/* Avatar + identity */}
      <div className="flex items-center gap-[10px] mb-[14px]">
        <div
          className="w-[40px] h-[40px] rounded-[8px] grid place-items-center font-display text-[15px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
          style={{ background: data.avatarGradient }}
        >
          {data.avatarInitial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em]">{data.name}</div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] break-all">
            {data.subId}
          </div>
        </div>
      </div>

      {/* Meta rows */}
      <div className="flex flex-col mb-[14px]">
        {data.metaRows.map((row, idx) => {
          const valueColor =
            row.variant === 'success'
              ? 'text-[var(--success)]'
              : row.variant === 'warn'
              ? 'text-[var(--amber)]'
              : row.variant === 'danger'
              ? 'text-[var(--danger)]'
              : 'text-[var(--ink-soft)]';
          return (
            <div
              key={idx}
              className="flex justify-between items-baseline gap-[12px] py-[6px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12px]"
            >
              <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
                {row.label}
              </span>
              <span className={`font-body font-semibold tracking-[-0.01em] text-right ${valueColor}`}>
                {row.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action */}
      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
      >
        {data.actionLabel}
      </button>
    </div>
  );
}
