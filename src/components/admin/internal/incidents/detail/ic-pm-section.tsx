/* admin.html lines 65316-65355 + CSS 30662-30720: single post-mortem section card with default / blameless variants */

import type { IcPmSection } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcPmSectionCardProps {
  section: IcPmSection;
}

export function IcPmSectionCard({ section }: IcPmSectionCardProps) {
  const isBlameless = section.variant === 'blameless';

  const cardClasses = isBlameless
    ? 'bg-[var(--paper)] border !border-[rgba(110,63,224,0.3)] rounded-[var(--r-md)] overflow-hidden mb-[14px] last:mb-0'
    : 'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[14px] last:mb-0';

  const headClasses = isBlameless
    ? 'flex items-center justify-between gap-[10px] py-[12px] px-[18px] bg-[linear-gradient(to_right,rgba(110,63,224,0.06),var(--paper-deep))] border-b border-b-[var(--line-soft)]'
    : 'flex items-center justify-between gap-[10px] py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]';

  return (
    <div className={cardClasses}>
      <div className={headClasses}>
        <h4 className="font-display text-[14px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {section.title}
        </h4>
        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          {section.eyebrow}
        </span>
      </div>
      <div
        className="py-[14px] px-[20px] font-body text-[13.5px] leading-[1.65] text-[var(--ink-soft)] tracking-[-0.005em] [&_p]:m-0 [&_p]:mb-[10px] [&_p:last-child]:mb-0 [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:border [&_code]:border-[var(--line-soft)] [&_code]:py-[1px] [&_code]:px-[5px] [&_code]:rounded-[3px] [&_code]:text-[var(--ink)]"
        dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
      />
    </div>
  );
}
