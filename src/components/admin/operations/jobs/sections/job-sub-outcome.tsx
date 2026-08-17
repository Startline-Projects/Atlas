import Link from 'next/link';
import type { JobProfile, JobOutcomeBlock } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobSubOutcomeProps {
  job: JobProfile;
}

function OutcomeBlockView({ block }: { block: JobOutcomeBlock }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px]">
        {block.label}
      </div>
      <div
        className={cn(
          'font-display font-medium text-[var(--ink)] tracking-[-0.01em] leading-[1.1] mb-[4px]',
          block.valueSizeSm ? 'text-[16px]' : 'text-[22px]',
          block.valueColor === 'super' && 'text-[var(--super)]',
          block.valueColor === 'success' && 'text-[var(--success)]'
        )}
      >
        {block.value}
        {block.vSuffix && (
          <span className="text-[13px] text-[var(--ink-mute)] font-normal"> {block.vSuffix}</span>
        )}
      </div>
      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.4]">
        {block.meta}
      </div>
    </div>
  );
}

export function JobSubOutcome({ job }: JobSubOutcomeProps) {
  const { outcome } = job;

  const emphasisColorClass =
    outcome.actionsTextEmphasisColor === 'success'
      ? 'text-[var(--success)]'
      : outcome.actionsTextEmphasisColor === 'amber'
        ? 'text-[var(--amber)]'
        : 'text-[var(--danger)]';

  return (
    <section
      id="job-section-outcome"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            05 · 05
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Outcome &amp; progress
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {outcome.statusText}
        </span>
      </div>

      {/* admin.html line 11227: .job-outcome-card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[22px] px-[26px]">
        <div className="grid grid-cols-[1.4fr_1fr] gap-[22px] max-[720px]:grid-cols-1">
          <OutcomeBlockView block={outcome.blocks[0]} />
          <OutcomeBlockView block={outcome.blocks[1]} />
        </div>

        {/* Progress bar */}
        <div className="mt-[14px]">
          <div className="h-[8px] bg-[var(--cream-deep)] rounded-[4px] overflow-hidden relative">
            <div
              className="h-full rounded-[4px]"
              style={{
                width: `${outcome.progressPct}%`,
                background: 'linear-gradient(90deg, var(--super) 0%, var(--lime) 100%)',
              }}
            />
          </div>
          <div className="flex justify-between mt-[6px] font-mono text-[9.5px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-semibold">
            {outcome.stops.map((stop, i) => (
              <span
                key={i}
                className={cn(
                  'flex-1 text-center',
                  i === 0 && 'text-left',
                  i === outcome.stops.length - 1 && 'text-right',
                  stop.done && 'text-[var(--success)]'
                )}
              >
                {stop.label}
              </span>
            ))}
          </div>
        </div>

        {/* Filled-state engagement link */}
        {outcome.filledLink && (
          <Link
            href={`/admin/operations/engagements/${outcome.filledLink.engagementId}`}
            data-job-action="open-engagement"
            className="flex items-center gap-[10px] py-[12px] px-[14px] bg-[var(--success-bg)] border border-[var(--success)] rounded-[var(--r-sm)] mt-[16px] cursor-pointer no-underline text-inherit transition-colors duration-[120ms] ease hover:bg-[rgba(46,125,84,0.12)]"
          >
            <span aria-hidden="true" className="flex-shrink-0 text-[var(--success)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <strong className="text-[var(--ink)] font-semibold text-[13px]">{outcome.filledLink.label}</strong>
              <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] mt-[2px]">
                {outcome.filledLink.detail}
              </div>
            </div>
            <span aria-hidden="true" className="flex-shrink-0 text-[var(--success)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        )}

        {/* Actions footer */}
        <div className="mt-[18px] pt-[16px] border-t border-dashed border-[var(--line-soft)] flex items-center justify-between flex-wrap gap-[10px]">
          <span className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
            {outcome.actionsTextPrefix}
            <strong className={cn(emphasisColorClass, 'font-semibold')}>{outcome.actionsTextEmphasis}</strong>
            {outcome.actionsTextSuffix}
          </span>
          <button
            type="button"
            data-job-action="open-similar-jobs"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(`[job-outcome] compare-similar clicked for ${job.id}`);
            }}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            {outcome.compareLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
