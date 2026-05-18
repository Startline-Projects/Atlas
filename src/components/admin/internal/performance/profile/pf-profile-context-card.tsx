/* Profile Manager context card — last 1:1 + next review + notes prose + optional improvement plan list (needs-support only). */

import type { PfProfileContextData } from '@/lib/mock-data/admin/performance-data';

interface PfProfileContextCardProps {
  data: PfProfileContextData;
}

export function PfProfileContextCard({ data }: PfProfileContextCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[12px] px-[16px] border-b border-b-[var(--line-soft)]">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
          LAST 1:1
        </div>
        <div className="font-mono text-[12px] text-[var(--ink)] font-semibold tracking-[0.02em]">
          {data.lastOneOnOne}
        </div>
      </div>

      <div className="py-[12px] px-[16px] border-b border-b-[var(--line-soft)]">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
          NEXT REVIEW
        </div>
        <div className="font-mono text-[12px] text-[var(--ink)] font-semibold tracking-[0.02em]">
          {data.nextReview}
        </div>
      </div>

      <div
        className="py-[14px] px-[16px] bg-[var(--paper-deep)] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.6] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: data.notesHtml }}
      />

      {data.improvementPlan && data.improvementPlan.length > 0 && (
        <div className="py-[14px] px-[16px] border-t border-t-[var(--line-soft)]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--amber)] font-bold mb-[10px]">
            IMPROVEMENT PLAN · 8 WEEKS
          </div>
          <ol className="flex flex-col gap-[8px] m-0 p-0 list-none">
            {data.improvementPlan.map((step, idx) => (
              <li
                key={idx}
                className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] pl-[14px] relative before:content-['•'] before:absolute before:left-0 before:top-0 before:text-[var(--amber)] before:font-bold"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
