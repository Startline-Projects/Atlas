import type {
  DisputeProfile,
  DisputeStatus,
  DisputeStatusPillVariant,
  DisputeSlaVariant,
  DisputeHeroStat,
} from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';

interface DisputeHeroProps {
  dispute: DisputeProfile;
}

// 6 status gradient variants for top bar
function topBarGradient(status: DisputeStatus): string {
  switch (status) {
    case 'open':
      return 'var(--amber)';
    case 'progress':
      return 'linear-gradient(90deg, var(--super) 0%, var(--lime) 100%)';
    case 'mediation':
      return 'var(--lime)';
    case 'escalated':
      return 'var(--danger)';
    case 'urgent':
      return 'var(--danger)';
    case 'resolved':
      return 'var(--success)';
  }
}

// admin.html lines 11398-11440 — status pill variants verbatim
function statusPillClass(variant: DisputeStatusPillVariant): string {
  switch (variant) {
    case 'disp-open':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'disp-progress':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'disp-mediation':
      return 'bg-[var(--lime)] text-[var(--ink)]';
    case 'disp-escalated':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'disp-urgent':
      return 'bg-[var(--danger)] text-[var(--paper)] font-bold';
    case 'disp-resolved':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'disp-closed':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

function statusPillPrefix(variant: DisputeStatusPillVariant): string | null {
  switch (variant) {
    case 'disp-escalated': return '↑';
    case 'disp-urgent':    return '⚠';
    case 'disp-resolved':  return '✓';
    default: return null;
  }
}

function slaBadgeClass(variant: DisputeSlaVariant): string {
  switch (variant) {
    case 'ok':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'warn':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'danger':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'done':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'expired':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

function heroStatValueColor(c?: DisputeHeroStat['valueColor']): string {
  switch (c) {
    case 'success': return 'text-[var(--success)]';
    case 'amber': return 'text-[var(--amber)]';
    case 'danger': return 'text-[var(--danger)]';
    case 'super': return 'text-[var(--super)]';
    default: return 'text-[var(--ink)]';
  }
}

function StatTile({ stat }: { stat: DisputeHeroStat }) {
  const isSm = stat.valueSize === 'sm';
  return (
    <div className="py-[14px] px-[16px] border-r border-dashed border-[var(--line-soft)] text-center last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
        {stat.label}
      </div>
      <div
        className={cn(
          'font-display font-medium tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1]',
          isSm ? 'text-[14px]' : 'text-[18px]',
          heroStatValueColor(stat.valueColor)
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

export function DisputeHero({ dispute }: DisputeHeroProps) {
  return (
    <div
      data-status={dispute.status}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: topBarGradient(dispute.status) }}
      />

      <div className="py-[24px] px-[28px] pb-[20px] grid grid-cols-[1fr_auto] gap-[16px] items-start max-[720px]:grid-cols-1">
        <div className="min-w-0">
          {/* Meta row: status pill + SLA + opened meta */}
          <div className="flex items-center gap-[8px] flex-wrap mb-[10px]">
            <span
              className={cn(
                'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
                statusPillClass(dispute.statusPillVariant)
              )}
            >
              {statusPillPrefix(dispute.statusPillVariant) && (
                <span aria-hidden="true" className="font-bold">{statusPillPrefix(dispute.statusPillVariant)}</span>
              )}
              {dispute.statusPillText}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-[5px] py-[2px] px-[8px] rounded-[3px] font-mono text-[9.5px] tracking-[0.08em] font-semibold whitespace-nowrap',
                slaBadgeClass(dispute.slaBadge.variant)
              )}
            >
              <span aria-hidden="true" className="w-[5px] h-[5px] rounded-full bg-current" />
              {dispute.slaBadge.text}
            </span>
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              {dispute.openedMeta}
            </span>
          </div>

          {/* Title with inline italic */}
          <h1 className="font-display text-[30px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[14px] text-[var(--ink)]">
            {dispute.titlePrefix}
            <em className="italic font-medium">{dispute.titleItalic}</em>
            {dispute.titleSuffix}
          </h1>

          {/* Parties: VS pattern (inline, NOT center divider) */}
          <div className="flex items-center gap-[14px] flex-wrap">
            {/* Claimant */}
            <div className="flex items-center gap-[10px] min-w-0">
              <span
                aria-hidden="true"
                className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
                style={{ background: dispute.claimant.avatarGradient }}
              >
                {dispute.claimant.avatarInitials}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold text-[var(--ink)] whitespace-nowrap">
                  {dispute.claimant.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                  Claimant · {dispute.claimant.metaTrail}
                </div>
              </div>
            </div>

            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold px-[6px] py-[2px] bg-[var(--cream-deep)] rounded-[3px]">
              VS
            </span>

            {/* Respondent */}
            <div className="flex items-center gap-[10px] min-w-0">
              <span
                aria-hidden="true"
                className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
                style={{ background: dispute.respondent.avatarGradient }}
              >
                {dispute.respondent.avatarInitials}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold text-[var(--ink)] whitespace-nowrap">
                  {dispute.respondent.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                  Respondent · {dispute.respondent.metaTrail}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[10px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {dispute.contextMeta}
          </div>
        </div>

        <div className="text-right max-[720px]:text-left">
          <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[3px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium inline-block mt-[6px]">
            {dispute.atlasId}
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-5 gap-0 border-t border-[var(--line)] bg-[var(--paper-deep)] max-[720px]:grid-cols-2">
        {dispute.heroStats.map((stat, idx) => (
          <StatTile key={idx} stat={stat} />
        ))}
      </div>

      {/* Always-visible banner */}
      <div
        className={cn(
          'py-[12px] px-[28px] border-t border-[var(--line)] flex items-start gap-[12px]',
          dispute.banner.variant === 'amber'
            ? 'bg-[var(--amber-bg)]'
            : dispute.banner.variant === 'danger'
              ? 'bg-[var(--danger-bg)]'
              : 'bg-[var(--success-bg)]'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex-shrink-0 mt-[1px]',
            dispute.banner.variant === 'amber'
              ? 'text-[var(--amber)]'
              : dispute.banner.variant === 'danger'
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
          <strong className="font-semibold text-[var(--ink)] text-[13px]">{dispute.banner.title}</strong>
          <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-[3px] tracking-[0.02em]">
            {dispute.banner.meta}
          </div>
        </div>
      </div>
    </div>
  );
}
