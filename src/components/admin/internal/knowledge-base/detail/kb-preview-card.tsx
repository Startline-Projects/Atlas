/* admin.html lines 66949-66986: preview card — head (h3 + meta) + body (phase eyebrow + N step-checks + dashed-top footer) */

import type { KbPreviewCardData } from '@/lib/mock-data/admin/knowledge-base-data';
import { KbStepCheck } from './kb-step-check';

interface KbPreviewCardProps {
  data: KbPreviewCardData;
}

export function KbPreviewCard({ data }: KbPreviewCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {data.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {data.headMeta}
        </div>
      </div>
      <div className="py-[18px] px-[20px] bg-[var(--paper)]">
        <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
          {data.sectionEyebrow}
        </div>
        {data.steps.map((step, idx) => (
          <KbStepCheck key={idx} text={step.text} isComplete={step.isComplete} />
        ))}
        <div className="mt-[10px] pt-[10px] border-t border-t-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {data.footerText}
        </div>
      </div>
    </div>
  );
}
