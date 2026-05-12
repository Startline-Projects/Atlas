/**
 * Phase 15a — Generic section placeholder for fraud detail sections.
 * Phase 15d — Adds optional `message` prop for contextual empty-state copy.
 *
 * admin.html CSS: .fr-section + .fr-section-head (L15982-16029)
 *
 * Card: bg paper, border line, r-md, padding 20px 24px, mb 16px.
 * Section head: flex items-end justify-between, mb 16px, pb 12px, border-b dashed.
 * Body: centered mute message in dashed-border-ish minimal state.
 */
import type { FraudDetailSection } from '@/lib/mock-data/admin/fraud-alerts-data';

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
  /** Contextual empty-state message. Defaults to "No data available for this alert." */
  message?: string;
}

export function FraudSubPlaceholder({ section, message }: FraudSubPlaceholderProps) {
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

      {/* Empty-state body */}
      <div className="flex flex-col items-center justify-center py-[28px] gap-[8px]">
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--cream-deep)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] text-center">
          {message ?? 'No data available for this alert.'}
        </span>
      </div>
    </section>
  );
}
