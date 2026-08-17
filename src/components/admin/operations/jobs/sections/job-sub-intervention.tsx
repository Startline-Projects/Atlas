import { Fragment } from 'react';
import type { JobProfile, InterventionEntry, InterventionTagVariant } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobSubInterventionProps {
  job: JobProfile;
}

// admin.html lines 3873-3878 — timeline-tag variants
function tagVariantClass(variant: InterventionTagVariant): string {
  switch (variant) {
    case 'signin': return 'bg-[rgba(214,242,77,0.3)] text-[var(--ink)]';
    case 'override': return 'bg-[rgba(110,63,224,0.15)] text-[var(--super)]';
    case 'default':
    default:
      return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

// admin.html lines 3787-3790 — timeline-entry::after dot color per data-cat
function entryDotClass(cat?: 'signin' | 'override'): string {
  switch (cat) {
    case 'signin': return 'bg-[var(--lime-deep)]';
    case 'override': return 'bg-[var(--super)]';
    default: return 'bg-[var(--ink)]';
  }
}

function TimelineEntryView({ entry, isLast }: { entry: InterventionEntry; isLast: boolean }) {
  return (
    <div
      data-cat={entry.dataCat}
      className={cn(
        'relative grid grid-cols-[70px_minmax(0,1fr)_auto] gap-[18px] pt-[14px] pr-[20px] pb-[14px] pl-[18px] border-b border-dashed border-[var(--line-soft)] transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] max-[540px]:grid-cols-[auto_1fr] max-[540px]:gap-x-[12px]',
        isLast && 'border-b-0'
      )}
    >
      {/* Track line */}
      <span aria-hidden="true" className="absolute left-[84px] top-0 bottom-0 w-[1px] bg-[var(--line-soft)] max-[540px]:hidden" />
      {/* Dot */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[81px] top-[18px] w-[7px] h-[7px] rounded-full shadow-[0_0_0_3px_var(--paper)] max-[540px]:hidden',
          entryDotClass(entry.dataCat)
        )}
      />

      <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium pt-[3px] text-right whitespace-pre-line max-[540px]:text-left max-[540px]:pt-0">
        {entry.time}
      </span>

      <div className="pl-[14px] min-w-0 max-[540px]:pl-0 max-[540px]:col-span-full">
        <div className="text-[13.5px] text-[var(--ink)] leading-[1.4] mb-[4px]">
          <span className="font-medium">{entry.verb}</span>
          {' · '}
          <span className="font-semibold">{entry.target}</span>
        </div>
        <div className="text-[12px] text-[var(--ink-mute)] leading-[1.5] flex flex-wrap gap-y-[4px] gap-x-[12px] items-center">
          <span>{entry.details}</span>
          {entry.refId && (
            <>
              <span aria-hidden="true" className="text-[var(--line-strong)]">·</span>
              <span className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--cream-deep)] py-[1px] px-[6px] rounded-[3px] tracking-[0.02em]">
                {entry.refId}
              </span>
            </>
          )}
        </div>
      </div>

      <span
        className={cn(
          'font-mono text-[9px] tracking-[0.14em] uppercase py-[3px] px-[8px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0 self-start mt-[2px] max-[540px]:col-start-2 max-[540px]:justify-self-end',
          tagVariantClass(entry.tagVariant)
        )}
      >
        {entry.tagLabel}
      </span>
    </div>
  );
}

export function JobSubIntervention({ job }: JobSubInterventionProps) {
  const { intervention } = job;

  return (
    <section
      id="job-section-intervention"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 05
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Specialist intervention history
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {intervention.statusText}
        </span>
      </div>

      {/* admin.html line 11192: .job-intervention-card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium">{intervention.title}</div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {intervention.metaLine}
          </div>
        </div>

        {/* Timeline — bg-transparent + border-0 + m-0 nesting override */}
        <div>
          {intervention.days.map((day, dayIdx) => {
            const isLastDay = dayIdx === intervention.days.length - 1;
            return (
              <Fragment key={dayIdx}>
                <div
                  className={cn(
                    'flex items-center gap-[10px] px-[18px] py-[10px] bg-[var(--paper-deep)] border-y border-[var(--line-soft)] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold',
                    dayIdx === 0 && 'border-t-0'
                  )}
                >
                  <span>{day.dateLabel}</span>
                  <span className="ml-auto text-[10px] text-[var(--ink-mute)] font-medium tracking-[0.06em]">
                    {day.countLabel}
                  </span>
                </div>
                {day.entries.map((entry, evIdx) => {
                  const isLastEntry = isLastDay && evIdx === day.entries.length - 1;
                  return <TimelineEntryView key={evIdx} entry={entry} isLast={isLastEntry} />;
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
