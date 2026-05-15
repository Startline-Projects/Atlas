'use client';

import type { JobProfile, MatchCandidate, MatchRankBadge, ScoreBarVariant } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobSubMatchProps {
  job: JobProfile;
}

// admin.html lines 10910-10912 — rank badge gradients
function rankBadgeStyle(badge: MatchRankBadge): React.CSSProperties | undefined {
  switch (badge) {
    case 'gold': return { background: 'linear-gradient(135deg, #F0CC4F, #B8911E)' };
    case 'silver': return { background: 'linear-gradient(135deg, #CECEC1, #898776)' };
    case 'bronze': return { background: 'linear-gradient(135deg, #C9A47A, #8B5C3C)' };
    case 'default': return undefined;
  }
}

function rankBadgeTextClass(badge: MatchRankBadge): string {
  switch (badge) {
    case 'gold': return 'text-[var(--ink)]';
    case 'silver':
    case 'bronze':
    case 'default':
    default:
      return 'text-[var(--paper)]';
  }
}

// admin.html lines 10992-10995 — score-bar fill variants
function scoreBarFillClass(variant: ScoreBarVariant): string {
  switch (variant) {
    case 'high': return 'bg-[var(--success)]';
    case 'mid': return 'bg-[#B8D43E]'; // lime-deep fallback per CSS line 10993
    case 'low': return 'bg-[var(--amber)]';
    case 'poor': return 'bg-[var(--danger)]';
  }
}

function MatchRow({ c, jobId }: { c: MatchCandidate; jobId: string }) {
  return (
    <div className="grid grid-cols-[auto_1.6fr_2.4fr_auto_auto] gap-[16px] items-center py-[14px] px-[22px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 hover:bg-[#FCF9F1] cursor-pointer transition-colors duration-[120ms] ease max-[880px]:grid-cols-1 max-[880px]:gap-[10px]">
      {/* jmr-rank */}
      <span
        className={cn(
          'font-mono text-[11px] w-[22px] h-[22px] rounded-full grid place-items-center font-semibold tracking-[0.04em] flex-shrink-0',
          c.rankBadge === 'default' && 'bg-[var(--ink)]',
          rankBadgeTextClass(c.rankBadge)
        )}
        style={rankBadgeStyle(c.rankBadge)}
      >
        {c.rank}
      </span>

      {/* jmr-candidate */}
      <div className="flex items-center gap-[10px] min-w-0">
        <div
          aria-hidden="true"
          className="w-[36px] h-[36px] rounded-full grid place-items-center font-display text-[12px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
          style={{ background: c.avatarGradient }}
        >
          {c.avatarInitials}
        </div>
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
            {c.name}
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
            {c.meta}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="grid grid-cols-4 gap-[10px] max-[720px]:grid-cols-2">
        {c.scoreBars.map((bar, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-semibold">
              {bar.label}
            </div>
            <div className="font-mono text-[11px] font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">
              {bar.value} / 100
            </div>
            <div className="h-[4px] bg-[var(--cream-deep)] rounded-[2px] overflow-hidden mt-[2px]">
              <div
                className={cn('h-full rounded-[2px] transition-[width] duration-300 ease', scoreBarFillClass(bar.variant))}
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total score */}
      <div className="flex flex-col items-center text-center flex-shrink-0">
        <div
          className={cn(
            'font-display text-[24px] font-medium tracking-[-0.02em] leading-[1] [font-variant-numeric:tabular-nums]',
            c.totalIsHigh ? 'text-[var(--success)]' : 'text-[var(--ink)]'
          )}
        >
          {c.total}
        </div>
        <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mt-[2px]">
          total
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // eslint-disable-next-line no-console
          console.log(`[job-match] action clicked for ${c.candidateId} on ${jobId}: ${c.actionLabel}`);
        }}
        className={cn(
          'inline-flex items-center gap-[4px] font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold py-[4px] px-[9px] rounded-full border cursor-pointer whitespace-nowrap flex-shrink-0 transition-[background,color] duration-[120ms] ease',
          c.actionIsCurated
            ? 'bg-[var(--lime)] text-[var(--ink)] border-[var(--lime)] hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)]'
            : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]'
        )}
      >
        {c.actionLabel}
      </button>
    </div>
  );
}

export function JobSubMatch({ job }: JobSubMatchProps) {
  const { matchBreakdown } = job;

  return (
    <section
      id="job-section-match"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 05
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Match score breakdown
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {matchBreakdown.candidates.length} of 5 curated · awaiting client review
        </span>
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium tracking-[-0.01em] flex items-center gap-[10px] flex-wrap">
            {matchBreakdown.title}
            {matchBreakdown.hasFoundingCohort && (
              <span className="inline-flex items-center gap-[6px] font-mono text-[10.5px] tracking-[0.12em] uppercase font-semibold py-[3px] px-[9px] rounded-full bg-[rgba(110,63,224,0.12)] text-[var(--super)]">
                ★ Founding-cohort included
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            Avg score: <strong className="text-[var(--super)] font-semibold text-[13px]">{matchBreakdown.avgScore}</strong> · {matchBreakdown.progressLabel}
          </div>
        </div>

        {matchBreakdown.candidates.map((c) => (
          <MatchRow key={c.candidateId} c={c} jobId={job.id} />
        ))}
      </div>
    </section>
  );
}
