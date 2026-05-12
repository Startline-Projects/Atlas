/**
 * Phase 15a — Generic section placeholder for all 6 fraud detail sections.
 *
 * admin.html CSS: .fr-section + .fr-section-head (L15982-16029)
 *
 * Card: bg paper, border line, r-md, padding 20px 24px, mb 16px.
 * Section head: flex items-end justify-between, mb 16px, pb 12px, border-b dashed.
 * sh-num: mono 9.5px, bg cream-deep, color ink-mute, py-2 px-6, rounded-3, bold.
 * h2: display 18px 500 tracking -0.01em.
 * sh-meta: mono 10.5px ink-mute tracking 0.04em mt-4.
 */
import type { FraudDetailSection } from '@/lib/mock-data/admin/fraud-alerts-data';

/** Map section id to 2-digit number */
const SECTION_NUMS: Record<string, string> = {
  signals: '01',
  'related-accounts': '02',
  anomalies: '03',
  documents: '04',
  timeline: '05',
  notes: '06',
};

interface FraudSubPlaceholderProps {
  section: FraudDetailSection;
}

export function FraudSubPlaceholder({ section }: FraudSubPlaceholderProps) {
  return (
    <section
      data-fraud-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header — fr-section-head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            {SECTION_NUMS[section.id] || '??'}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              {section.title}
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {section.meta}
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder body */}
      <div className="flex flex-col items-center justify-center py-[32px] gap-[10px]">
        <div className="w-[40px] h-[40px] rounded-full bg-[var(--cream-deep)] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] text-center">
          Section content will be built in a subsequent phase
        </span>
      </div>
    </section>
  );
}
