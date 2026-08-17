import type {
  JobProfile,
  JobStatus,
  JobStatusPillVariant,
  JobHeroStat,
} from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobHeroProps {
  job: JobProfile;
}

// admin.html lines 10558-10568 — ::before gradient per status
function topBarGradient(status: JobStatus): string {
  switch (status) {
    case 'open':
      return 'linear-gradient(90deg, var(--super) 0%, var(--lime) 100%)';
    case 'paused':
      return 'var(--amber)';
    case 'filled':
      return 'var(--success)';
    case 'closed':
      return 'var(--ink-mute)';
    case 'investigate':
      return 'var(--danger)';
  }
}

// admin.html lines 10366-10406 — 7 status pill variants
function statusPillClass(variant: JobStatusPillVariant): string {
  switch (variant) {
    case 'job-open':
    case 'job-filled':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'job-shortlisted':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'job-sourcing':
      return 'bg-[var(--lime)] text-[var(--ink)]';
    case 'job-paused':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'job-closed':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'job-investigate':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
  }
}

function statusPillPrefix(variant: JobStatusPillVariant): string | null {
  switch (variant) {
    case 'job-shortlisted': return '★';
    case 'job-filled': return '✓';
    case 'job-investigate': return '⚑';
    default: return null;
  }
}

function StatTile({ stat }: { stat: JobHeroStat }) {
  const isSm = stat.valueSize === 'sm';
  return (
    <div className="py-[14px] px-[16px] border-r border-dashed border-[var(--line-soft)] text-center last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
        {stat.label}
      </div>
      <div
        className={cn(
          'font-display font-medium tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1] text-[var(--ink)]',
          isSm ? 'text-[14px]' : 'text-[18px]',
          stat.valueColor === 'success' && 'text-[var(--success)]'
        )}
      >
        {stat.value}
        {stat.vSuffix && (
          <span className="text-[11px] text-[var(--ink-mute)] font-normal">{stat.vSuffix}</span>
        )}
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.02em] text-[var(--ink-mute)] mt-[3px]">
        {stat.meta}
      </div>
    </div>
  );
}

export function JobHero({ job }: JobHeroProps) {
  return (
    // admin.html line 22602: .job-hero
    <div
      data-status={job.status}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] relative overflow-hidden"
    >
      {/* ::before top gradient bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: topBarGradient(job.status) }}
      />

      {/* job-hero-top */}
      <div className="py-[24px] px-[28px] pb-[20px] grid grid-cols-[1fr_auto] gap-[16px] items-start max-[720px]:grid-cols-1">
        <div className="min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-[8px] flex-wrap mb-[10px]">
            <span
              className={cn(
                'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
                statusPillClass(job.statusPillVariant)
              )}
            >
              {statusPillPrefix(job.statusPillVariant) && (
                <span aria-hidden="true" className={job.statusPillVariant === 'job-filled' ? 'font-bold' : ''}>
                  {statusPillPrefix(job.statusPillVariant)}
                </span>
              )}
              {job.statusPillText}
            </span>
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              {job.postedMeta}
            </span>
          </div>

          <h1 className="font-display text-[30px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[12px] text-[var(--ink)]">
            {job.title}
          </h1>

          {/* Client */}
          <div className="flex items-center gap-[10px] flex-wrap">
            <span
              aria-hidden="true"
              className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
              style={{ background: job.client.avatarGradient }}
            >
              {job.client.avatarInitials}
            </span>
            <span className="text-[14px] font-semibold text-[var(--ink)]">{job.client.name}</span>
            {job.client.realLegalEntity && (
              <span className="font-mono text-[9px] tracking-[0.12em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[6px] rounded-[3px] font-semibold uppercase">
                REAL: {job.client.realLegalEntity}
              </span>
            )}
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              {job.client.metaTrail}
            </span>
          </div>
        </div>

        {/* Right: id-mono chip */}
        <div className="text-right max-[720px]:text-left">
          <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[3px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium inline-block mt-[6px]">
            {job.atlasId}
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-5 gap-0 border-t border-[var(--line)] bg-[var(--paper-deep)] max-[720px]:grid-cols-2">
        {job.heroStats.map((stat, idx) => (
          <StatTile key={idx} stat={stat} />
        ))}
      </div>

      {/* Conditional banner */}
      {job.banner && (
        <div
          className={cn(
            'py-[12px] px-[28px] border-t border-[var(--line)] flex items-start gap-[12px]',
            job.banner.variant === 'amber'
              ? 'bg-[var(--amber-bg)]'
              : job.banner.variant === 'danger'
                ? 'bg-[var(--danger-bg)]'
                : 'bg-[var(--success-bg)]'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'flex-shrink-0 mt-[1px]',
              job.banner.variant === 'amber'
                ? 'text-[var(--amber)]'
                : job.banner.variant === 'danger'
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--success)]'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <div className="min-w-0">
            <strong className="font-semibold text-[var(--ink)] text-[13px]">{job.banner.title}</strong>
            <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-[3px] tracking-[0.02em]">
              {job.banner.meta}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
