import { Fragment } from 'react';
import type {
  ManagerProfile,
  ActivityDay,
  ActivityLegendItem,
  ManagerActivityGrid,
  TodayReportSegment,
  ManagerTodayReport,
  ManagerActivityCompact,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionActivityProps {
  profile: ManagerProfile;
}

// admin.html lines 7454-7456 — excused diagonal stripe pattern
const EXCUSED_BG_STYLE: React.CSSProperties = {
  background: 'var(--cream-deep)',
  backgroundImage:
    'linear-gradient(45deg, transparent 40%, var(--line-strong) 40%, var(--line-strong) 60%, transparent 60%)',
};

// admin.html lines 7451-7461 — day-cell variant class/style
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

// admin.html lines 7480-7485 — legend swatch variant
function swatchClass(status: NonNullable<ActivityLegendItem['status']>): string {
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

// admin.html lines 7400-7486 — sp-activity-card 30-day grid
function ManagerActivityCard({
  grid,
  bgVariant,
}: {
  grid: ManagerActivityGrid;
  bgVariant?: 'paper-deep';
}) {
  return (
    <div
      className="border border-[var(--line)] rounded-[var(--r-md)] px-[20px] py-[18px] mb-[14px]"
      style={{
        background: bgVariant === 'paper-deep' ? 'var(--paper-deep)' : 'var(--paper)',
      }}
    >
      {/* admin.html line 7407: sp-activity-head */}
      <div className="flex items-baseline justify-between flex-wrap gap-[8px] mb-[14px]">
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0">
          {grid.title}
        </h4>
        {/* admin.html line 7423: adherence — mono 11px ink with display 16px success strong */}
        <span className="font-mono text-[11px] text-[var(--ink)] tracking-[0.02em]">
          <strong className="font-display text-[16px] font-medium text-[var(--success)] mr-[4px]">
            {grid.adherencePct}
          </strong>
          {grid.adherenceLabel}
        </span>
      </div>

      {/* admin.html line 7436: sp-activity-grid 30-col */}
      {grid.days.length > 0 && (
        <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px] mb-[12px]">
          {grid.days.map((day, idx) => (
            <span
              key={idx}
              {...(day.title ? { title: day.title, 'aria-label': day.title } : {})}
              className={cn(
                'aspect-square rounded-[2px] relative cursor-pointer transition-transform duration-[120ms] ease hover:scale-[1.4] hover:z-[2]',
                day.status === 'excused' ? 'bg-[var(--cream-deep)]' : dayCellClass(day.status)
              )}
              style={day.status === 'excused' ? EXCUSED_BG_STYLE : undefined}
            />
          ))}
        </div>
      )}

      {/* admin.html line 7462: sp-activity-legend */}
      <div className="flex flex-wrap gap-y-[4px] gap-x-[14px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
        {grid.legend.map((item, idx) => (
          <LegendItemView key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

function LegendItemView({ item }: { item: ActivityLegendItem }) {
  if (item.type === 'note') {
    return (
      <span
        className="inline-flex items-center gap-[5px]"
        style={{
          ...(item.color ? { color: item.color } : {}),
          ...(item.bold ? { fontWeight: 600 } : {}),
        }}
      >
        {item.label}
      </span>
    );
  }
  // swatch
  return (
    <span className="inline-flex items-center gap-[5px]">
      <span
        className={cn(
          'w-[10px] h-[10px] rounded-[2px]',
          item.status === 'excused' ? 'bg-[var(--cream-deep)]' : item.status ? swatchClass(item.status) : ''
        )}
        style={item.status === 'excused' ? EXCUSED_BG_STYLE : undefined}
        aria-hidden="true"
      />
      {item.label}
    </span>
  );
}

// admin.html lines 7400-7486 (compact variant) — only head + legend, no grid
function CompactCard({ compact }: { compact: ManagerActivityCompact }) {
  return (
    <div
      className="border border-[var(--line)] rounded-[var(--r-md)] px-[20px] py-[18px] mb-[14px]"
      style={{ background: 'var(--paper-deep)' }}
    >
      <div className="flex items-baseline justify-between flex-wrap gap-[8px] mb-[14px]">
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0">
          {compact.title}
        </h4>
        <span className="font-mono text-[11px] text-[var(--ink)] tracking-[0.02em]">
          <strong className="font-display text-[16px] font-medium text-[var(--success)] mr-[4px]">
            {compact.adherencePct}
          </strong>
          {compact.adherenceLabel}
        </span>
      </div>
      <div className="flex flex-wrap gap-y-[4px] gap-x-[14px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
        <span className="inline-flex items-center gap-[5px]">{compact.summary}</span>
      </div>
    </div>
  );
}

// admin.html lines 6558-6582 — cd-fin-card today's report
function TodayReportCard({ report }: { report: ManagerTodayReport }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[14px]">
      {/* admin.html line 6564: card-head */}
      <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
        <span>{report.dateLabel}</span>
        <span className="font-mono text-[10.5px] text-[var(--ink-soft)] normal-case tracking-normal">
          {report.metaLabel}
        </span>
      </div>
      {/* admin.html line 19907: body div with inline 14/18 padding 13px line-height 1.55 ink-soft */}
      <div className="px-[18px] py-[14px] text-[13px] leading-[1.55] text-[var(--ink-soft)]">
        {report.body.map((seg: TodayReportSegment, idx) => (
          <Fragment key={idx}>
            {seg.type === 'br' ? (
              <br />
            ) : seg.type === 'highlight' ? (
              <strong className="text-[var(--ink)] font-semibold">{seg.text}</strong>
            ) : (
              seg.text
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function ManagerSectionActivity({ profile }: ManagerSectionActivityProps) {
  const activity = profile.activity;
  if (!activity) {
    return null;
  }

  const { sectionStatus, managerGrid, todayReport, personalCompact } = activity;

  return (
    // admin.html line 19847: <section id="mgr-section-activity">
    <section
      id="mgr-section-activity"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 19848-19854 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Daily activity audit
          </h2>
        </div>
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

      {/* Block A — Manager 30-day grid (admin.html lines 19857-19899) */}
      <ManagerActivityCard grid={managerGrid} />

      {/* Block B — Today's Manager daily report (admin.html lines 19902-19912) */}
      <TodayReportCard report={todayReport} />

      {/* Block C — Personal Specialist activity compact (admin.html lines 19915-19923) */}
      <CompactCard compact={personalCompact} />
    </section>
  );
}
