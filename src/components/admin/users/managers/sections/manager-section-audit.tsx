'use client';

import { Fragment } from 'react';
import type {
  ManagerProfile,
  ManagerAuditDay,
  ManagerAuditEvent,
  ManagerAuditDetailSegment,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionAuditProps {
  profile: ManagerProfile;
}

// admin.html lines 3785-3791 — data-cat dot color overrides
function dotBgClass(cat: ManagerAuditEvent['cat']): string {
  switch (cat) {
    case 'suspension':
    case 'ban':
      return 'bg-[var(--danger)]';
    case 'refund':
      return 'bg-[var(--success)]';
    case 'dispute':
      return 'bg-[var(--amber)]';
    case 'override':
      return 'bg-[var(--super)]';
    case 'signin':
      return 'bg-[var(--lime-deep)]';
    case 'export':
      return 'bg-[var(--ink-soft)]';
    default:
      return 'bg-[var(--ink)]';
  }
}

// admin.html lines 3858-3879 + 8448-8449 — timeline-tag variants (10 total: base 8 + manager NEW delivered + received)
function tagVariantClass(variant: ManagerAuditEvent['tagVariant']): string {
  switch (variant) {
    case 'signin':
      return 'bg-[rgba(214,242,77,0.3)] text-[var(--ink)]';
    case 'override':
      return 'bg-[rgba(110,63,224,0.15)] text-[var(--super)]';
    case 'suspension':
    case 'ban':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'refund':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'dispute':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'export':
      return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
    case 'investigation':
      return 'bg-[var(--navy-bg)] text-[var(--navy)]';
    case 'delivered':
      return 'bg-[rgba(214,242,77,0.4)] text-[var(--ink)]';
    case 'received':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    default:
      return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

// admin.html lines 3854-3856 — outcome variants
function outcomeVariantClass(variant: ManagerAuditDetailSegment['outcomeVariant']): string {
  switch (variant) {
    case 'partial':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'escalated':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'success':
    default:
      return 'bg-[var(--success-bg)] text-[var(--success)]';
  }
}

function DetailSegment({ seg }: { seg: ManagerAuditDetailSegment }) {
  if (seg.type === 'sep') {
    return <span className="text-[var(--line-strong)]">{seg.text}</span>;
  }
  if (seg.type === 'refId') {
    return (
      <span className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--cream-deep)] py-[1px] px-[6px] rounded-[3px] tracking-[0.02em]">
        {seg.text}
      </span>
    );
  }
  if (seg.type === 'outcome') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-[4px] font-mono text-[10.5px] tracking-[0.04em] uppercase font-semibold py-[1px] px-[7px] rounded-[3px]',
          outcomeVariantClass(seg.outcomeVariant)
        )}
      >
        {seg.text}
      </span>
    );
  }
  return <span>{seg.text}</span>;
}

// admin.html lines 3755-3791 — timeline-entry (3-col grid + relative + ::before/::after as child spans)
function TimelineEntry({ event, isLast }: { event: ManagerAuditEvent; isLast: boolean }) {
  return (
    <div
      data-cat={event.cat}
      className={cn(
        'relative grid grid-cols-[70px_minmax(0,1fr)_auto] gap-[18px] pt-[14px] pr-[20px] pb-[14px] pl-[18px] border-b border-dashed border-[var(--line-soft)] transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]',
        'max-[540px]:grid-cols-[auto_1fr] max-[540px]:grid-rows-[auto_auto] max-[540px]:gap-x-[12px] max-[540px]:gap-y-[6px]',
        isLast && 'border-b-0'
      )}
    >
      {/* admin.html line 3766: ::before — vertical track line */}
      <span
        aria-hidden="true"
        className="absolute left-[84px] top-0 bottom-0 w-[1px] bg-[var(--line-soft)] max-[540px]:hidden"
      />
      {/* admin.html line 3775: ::after — 7px dot */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[81px] top-[18px] w-[7px] h-[7px] rounded-full shadow-[0_0_0_3px_var(--paper)] max-[540px]:hidden',
          dotBgClass(event.cat)
        )}
      />

      {/* timeline-time — multi-line preserved */}
      <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium pt-[3px] text-right whitespace-pre-line max-[540px]:text-left max-[540px]:pt-0">
        {event.time}
      </span>

      {/* timeline-content */}
      <div className="pl-[14px] min-w-0 max-[540px]:pl-0 max-[540px]:col-span-full">
        <div className="text-[13.5px] text-[var(--ink)] leading-[1.4] mb-[4px]">
          <span className="font-medium">{event.verb}</span>
          {event.target && (
            <>
              {' · '}
              <span className="text-[var(--ink)] font-semibold">{event.target}</span>
            </>
          )}
        </div>
        <div className="text-[12px] text-[var(--ink-mute)] leading-[1.5] flex flex-wrap gap-y-[4px] gap-x-[12px] items-center">
          {event.details.map((seg, idx) => (
            <Fragment key={idx}>
              <DetailSegment seg={seg} />
            </Fragment>
          ))}
        </div>
      </div>

      {/* timeline-tag */}
      <span
        className={cn(
          'font-mono text-[9px] tracking-[0.14em] uppercase py-[3px] px-[8px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0 self-start mt-[2px]',
          'max-[540px]:col-start-2 max-[540px]:justify-self-end',
          tagVariantClass(event.tagVariant)
        )}
      >
        {event.tagLabel}
      </span>
    </div>
  );
}

function TimelineDayHeader({ day, isFirst }: { day: ManagerAuditDay; isFirst: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-[10px] px-[18px] py-[10px] bg-[var(--paper-deep)] border-y border-[var(--line-soft)] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold',
        isFirst && 'border-t-0'
      )}
    >
      <span>{day.dateLabel}</span>
      <span className="ml-auto text-[10px] text-[var(--ink-mute)] font-medium tracking-[0.06em]">
        {day.countLabel}
      </span>
    </div>
  );
}

export function ManagerSectionAudit({ profile }: ManagerSectionAuditProps) {
  const auditLog = profile.auditLog;
  if (!auditLog) {
    return null;
  }

  const { sectionStatus, days, footerLabel, loadMoreLabel, loadMoreAction, emptyState } = auditLog;
  const totalEvents = days.reduce((sum, d) => sum + d.events.length, 0);

  return (
    // admin.html line 20410: <section id="mgr-section-audit">
    <section
      id="mgr-section-audit"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 20411-20417 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            08 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Audit log
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

      {totalEvents === 0 && emptyState ? (
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            {emptyState.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            {emptyState.detail}
          </div>
        </div>
      ) : (
        // admin.html line 20419: .timeline (single unified card)
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          {days.map((day, dayIdx) => {
            const isLastDay = dayIdx === days.length - 1;
            return (
              <Fragment key={dayIdx}>
                <TimelineDayHeader day={day} isFirst={dayIdx === 0} />
                {day.events.map((event, evIdx) => {
                  const isLastEvent = isLastDay && evIdx === day.events.length - 1;
                  return <TimelineEntry key={evIdx} event={event} isLast={isLastEvent} />;
                })}
              </Fragment>
            );
          })}

          {/* admin.html lines 20553-20556: timeline-footer */}
          {(footerLabel || loadMoreLabel) && (
            <div className="flex items-center justify-between flex-wrap gap-[10px] px-[18px] py-[14px] border-t border-[var(--line-soft)] text-[12px] text-[var(--ink-mute)]">
              {footerLabel && <span>{footerLabel}</span>}
              {loadMoreLabel && (
                <button
                  type="button"
                  data-mgr-action={loadMoreAction ?? 'load-more-audit'}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      // eslint-disable-next-line no-console
                      console.log('[manager-audit] load-more clicked');
                    }
                  }}
                  className="bg-transparent border border-[var(--line)] rounded-full py-[6px] px-[16px] font-mono text-[11px] tracking-[0.04em] text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)] hover:border-[var(--ink-mute)]"
                >
                  {loadMoreLabel}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
