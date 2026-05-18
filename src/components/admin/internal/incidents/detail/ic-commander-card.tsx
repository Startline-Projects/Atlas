/* admin.html lines 65420-65436: dsr-subject-card pattern hand-translated
   paper outer + paper-deep avatar+name+id head + dsm-row body (5 rows) */

import type { IcCommanderData } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcCommanderCardProps {
  data: IcCommanderData;
}

export function IcCommanderCard({ data }: IcCommanderCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <h4 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.01em] m-0">
          {data.title}
        </h4>
      </div>
      <div className="flex items-center gap-[12px] py-[14px] px-[16px] border-b border-b-[var(--line-soft)]">
        <div
          className="w-[44px] h-[44px] rounded-full grid place-items-center font-display text-[16px] font-medium text-[var(--paper)] tracking-[-0.02em] flex-shrink-0"
          style={{ background: data.subject.avatarGradient }}
        >
          {data.subject.avatarInitials}
        </div>
        <div className="min-w-0">
          <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[1px] leading-[1.2]">
            {data.subject.name}
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold">
            {data.subject.idText}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[6px] py-[10px] px-[16px]">
        {data.rows.map((row, idx) => {
          const valueColor =
            row.valueVariant === 'success'
              ? 'text-[var(--success)]'
              : row.valueVariant === 'warn'
              ? 'text-[var(--amber)]'
              : 'text-[var(--ink)]';
          return (
            <div
              key={idx}
              className="flex justify-between gap-[10px] items-baseline"
            >
              <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold">
                {row.label}
              </span>
              <span
                className={`font-mono text-[11px] font-bold tracking-[0.02em] text-right ${valueColor}`}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
