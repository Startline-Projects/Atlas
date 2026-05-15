import { reasonBarsData } from '@/lib/mock-data/admin/refunds-data';
import type { ReasonVariant } from '@/lib/mock-data/admin/refunds-data';

const dotColors: Record<ReasonVariant, string> = {
  dispute: 'bg-[var(--super)]',
  quality: 'bg-[var(--amber)]',
  cancellation: 'bg-[var(--lime-deep)]',
  billing: 'bg-[var(--ink-mute)]',
  fraud: 'bg-[var(--danger)]',
};

const fillColors: Record<ReasonVariant, string> = {
  dispute: 'var(--super)',
  quality: 'var(--amber)',
  cancellation: 'var(--lime-deep)',
  billing: 'var(--ink-mute)',
  fraud: 'var(--danger)',
};

export function RefundReasonBars() {
  const d = reasonBarsData;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
      <h3 className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.2]">
        {d.title}
      </h3>
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[16px]">
        {d.meta}
      </div>

      <div className="flex flex-col gap-[10px]">
        {d.rows.map((row) => (
          <div
            key={row.variant}
            className="grid grid-cols-[140px_1fr_60px] gap-[12px] items-center max-[480px]:grid-cols-[100px_1fr_50px]"
          >
            <div className="flex items-center gap-[6px] text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">
              <span className={`w-[8px] h-[8px] rounded-[2px] flex-shrink-0 ${dotColors[row.variant]}`} />
              {row.label}
            </div>
            <div className="h-[8px] bg-[var(--cream-deep)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${row.percent}%`, backgroundColor: fillColors[row.variant] }}
              />
            </div>
            <div className="text-right font-mono text-[11.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums">
              {row.percent}%
              <span className="block text-[9.5px] text-[var(--ink-mute)] font-medium mt-[1px]">{row.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
