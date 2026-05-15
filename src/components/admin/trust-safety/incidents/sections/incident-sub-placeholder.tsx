/**
 * Phase 16a — Generic section placeholder for incident detail sections.
 *
 * Clone of FraudSubPlaceholder with incident-specific section number mapping.
 * Same chrome (card + sh-num pill + h2 + sh-meta + dashed-border empty body).
 */
import type { IncidentDetailSection, IncidentSectionId } from '@/lib/mock-data/admin/incidents-data';

const SECTION_NUMS: Record<IncidentSectionId, string> = {
  notification: '01',
  description: '02',
  actions: '03',
  timeline: '04',
  postmortem: '05',
};

interface IncidentSubPlaceholderProps {
  section: IncidentDetailSection;
  message?: string;
}

export function IncidentSubPlaceholder({ section, message }: IncidentSubPlaceholderProps) {
  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            {SECTION_NUMS[section.id]}
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
          {message ?? section.placeholderMessage}
        </span>
      </div>
    </section>
  );
}
