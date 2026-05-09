import { Fragment } from 'react';
import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { cn } from '@/lib/utils/cn';

interface SpecialistSectionActivityProps {
  profile: SpecialistProfile;
}

type ActivityDay = NonNullable<SpecialistProfile['activity']>['days'][number];
type ActivityLegendItem = NonNullable<SpecialistProfile['activity']>['legend'][number];
type TodayBodySegment = NonNullable<NonNullable<SpecialistProfile['activity']>['todaySubmission']>['body'][number];

// admin.html lines 7454-7456, 7483-7485: excused diagonal stripe pattern
const EXCUSED_BG_STYLE: React.CSSProperties = {
  background: 'var(--cream-deep)',
  backgroundImage:
    'linear-gradient(45deg, transparent 40%, var(--line-strong) 40%, var(--line-strong) 60%, transparent 60%)',
};

// Day cell color/style by status (admin.html lines 7451-7461)
function dayCellClass(status: ActivityDay['status']): string {
  switch (status) {
    case 'submitted':
      return 'bg-[var(--success)]';
    case 'late':
      return 'bg-[var(--amber)]';
    case 'missed':
      return 'bg-[var(--danger)]';
    case 'future':
      return 'bg-[var(--paper-deep)] border border-dashed border-[var(--line-soft)]';
    case 'excused':
    default:
      return ''; // styled inline
  }
}

// Legend swatch class by status (admin.html lines 7480-7485)
function swatchClass(status: ActivityLegendItem['status']): string {
  switch (status) {
    case 'submitted':
      return 'bg-[var(--success)]';
    case 'late':
      return 'bg-[var(--amber)]';
    case 'missed':
      return 'bg-[var(--danger)]';
    case 'excused':
    default:
      return ''; // styled inline
  }
}

export function SpecialistSectionActivity({ profile }: SpecialistSectionActivityProps) {
  const activity = profile.activity;
  if (!activity) {
    return null;
  }

  const { sectionStatus, cardTitle, adherencePct, adherenceLabel, adherenceColor, days, legend, todaySubmission, emptyState } = activity;

  // Inactive state — render empty state instead of activity card + today's submission
  const isEmpty = days.length === 0 && emptyState;

  return (
    // admin.html line 18712: <section id="sp-section-activity">
    <section
      id="sp-section-activity"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px]"
    >
      {/* Section header — admin.html lines 18713-18719 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Daily activity audit
          </h2>
        </div>
        {/* admin.html line 18718: status pill */}
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor]",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {isEmpty ? (
        // Inactive specialists — empty state (replaces both blocks)
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            {emptyState!.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            {emptyState!.detail}
          </div>
        </div>
      ) : (
        <>
          {/* Block A — Activity card with 30-day heatmap (admin.html lines 18721-18765) */}
          <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[20px] py-[18px] mb-[14px]">
            {/* admin.html line 18722: sp-activity-head */}
            <div className="flex items-baseline justify-between flex-wrap gap-[8px] mb-[14px]">
              {/* admin.html line 18723: h4 */}
              <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0">
                {cardTitle}
              </h4>
              {/* admin.html line 18724: .adherence with strong + label */}
              <span className="font-mono text-[11px] text-[var(--ink)] tracking-[0.02em]">
                <strong
                  className="font-display text-[16px] font-medium mr-[4px]"
                  style={{ color: adherenceColor ?? 'var(--success)' }}
                >
                  {adherencePct}
                </strong>
                {adherenceLabel}
              </span>
            </div>
            {/* admin.html line 18727: .sp-activity-grid (30-col) */}
            <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px] mb-[12px]">
              {days.map((day, idx) => (
                <span
                  key={idx}
                  title={day.title}
                  aria-label={day.title}
                  className={cn(
                    'aspect-square rounded-[2px] relative cursor-pointer transition-transform duration-[120ms] ease hover:scale-[1.4] hover:z-[2]',
                    day.status === 'excused' ? 'bg-[var(--cream-deep)]' : dayCellClass(day.status)
                  )}
                  style={day.status === 'excused' ? EXCUSED_BG_STYLE : undefined}
                />
              ))}
            </div>
            {/* admin.html line 18759: .sp-activity-legend */}
            <div className="flex flex-wrap gap-y-[4px] gap-x-[14px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
              {legend.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-[5px]">
                  <span
                    className={cn(
                      'w-[10px] h-[10px] rounded-[2px]',
                      item.status === 'excused' ? 'bg-[var(--cream-deep)]' : swatchClass(item.status)
                    )}
                    style={item.status === 'excused' ? EXCUSED_BG_STYLE : undefined}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Block B — Today's submission detail card (admin.html lines 18768-18776) — only when defined */}
          {todaySubmission && (
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
              {/* admin.html line 18769: card-head */}
              <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                <span>{todaySubmission.dateLabel}</span>
                <span className="font-mono text-[10.5px] text-[var(--ink-soft)] normal-case tracking-normal">
                  {todaySubmission.metaLabel}
                </span>
              </div>
              {/* admin.html line 18773: body wrapper (inline 14/18 padding, 13px line-height 1.55, ink-soft) */}
              <div className="px-[18px] py-[14px] text-[13px] leading-[1.55] text-[var(--ink-soft)]">
                {todaySubmission.body.map((seg: TodayBodySegment, idx) => (
                  <Fragment key={idx}>
                    {seg.type === 'highlight' ? (
                      <strong className="text-[var(--ink)] font-semibold">{seg.text}</strong>
                    ) : (
                      seg.text
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
