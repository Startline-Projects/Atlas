import type { JobProfile, JobDescriptionSection, JobCompItem } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobSubDescProps {
  job: JobProfile;
}

function DescSectionView({ section, isFirst }: { section: JobDescriptionSection; isFirst: boolean }) {
  return (
    <div
      className={cn(
        !isFirst && 'mt-[22px] pt-[16px] border-t border-dashed border-[var(--line-soft)]'
      )}
    >
      <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0 mb-[8px] pt-[4px]">
        {section.heading}
      </h4>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-[13.5px] text-[var(--ink-soft)] leading-[1.55] m-0 mb-[8px]">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className={cn('list-none m-0 p-0', section.bulletsChecks && 'checks')}>
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className={cn(
                'text-[13px] text-[var(--ink-soft)] leading-[1.5] py-[4px] pl-[22px] relative',
                section.bulletsChecks
                  ? "before:content-['✓'] before:absolute before:left-[4px] before:text-[var(--success)] before:font-bold before:text-[11px]"
                  : "before:content-['→'] before:absolute before:left-[4px] before:text-[var(--ink-mute)] before:font-mono before:font-semibold before:text-[11px]"
              )}
            >
              {b.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CompItemView({ item }: { item: JobCompItem }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[3px]">
        {item.label}
      </div>
      <div
        className={cn(
          'font-display font-medium text-[var(--ink)] tracking-[-0.01em]',
          item.valueSize === 'sm' ? 'text-[14px]' : 'text-[16px]'
        )}
      >
        {item.value}
        {item.vSuffix && (
          <span className="text-[11px] text-[var(--ink-mute)] font-normal">{item.vSuffix}</span>
        )}
      </div>
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
        {item.meta}
      </div>
    </div>
  );
}

export function JobSubDesc({ job }: JobSubDescProps) {
  const { description } = job;

  return (
    <section
      id="job-section-desc"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 05
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Job description
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {description.statusText}
        </span>
      </div>

      {/* admin.html line 10734: .job-desc-card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium">{description.jdTitle}</div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {description.jdMeta}
          </div>
        </div>

        <div className="py-[18px] px-[22px]">
          {description.introSections.map((section, i) => (
            <DescSectionView key={i} section={section} isFirst={i === 0} />
          ))}

          {/* Compensation block */}
          <div className="mt-[22px] pt-[16px] border-t border-dashed border-[var(--line-soft)]">
            <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0 mb-[8px] pt-[4px]">
              Compensation &amp; logistics
            </h4>
            <div className="mt-[16px] py-[14px] px-[16px] bg-[var(--paper-deep)] border border-dashed border-[var(--line)] rounded-[var(--r-sm)] grid grid-cols-3 gap-[12px] max-[720px]:grid-cols-1">
              {description.compBlock.map((item, i) => (
                <CompItemView key={i} item={item} />
              ))}
            </div>
          </div>

          {description.closingHeading && (
            <div className="mt-[22px] pt-[16px] border-t border-dashed border-[var(--line-soft)]">
              <h4 className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0 mb-[8px] pt-[4px]">
                {description.closingHeading}
              </h4>
              {description.closingParagraphs?.map((p, i) => (
                <p key={i} className="text-[13.5px] text-[var(--ink-soft)] leading-[1.55] m-0 mb-[8px]">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
