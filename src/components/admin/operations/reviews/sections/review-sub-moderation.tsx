/**
 * Phase 13b-2 — §05 Moderation History section.
 * Replaces ReviewSubPlaceholder for rev-section-moderation when moderationData exists.
 *
 * admin.html markup: L37720-37804
 * admin.html CSS: L13914-13975
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReviewModerationData,
  ReviewModEvent,
  ModActionSegment,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';

interface ReviewSubModerationProps {
  data: ReviewModerationData;
  sectionStatus: ReviewSectionStatus;
}

function statusPillClass(v: ReviewSectionStatus['statusVariant']): string {
  switch (v) {
    case 'warn': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'danger': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'neutral': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'default':
    default: return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

// Dot variant colors — L13929-13941
function dotVariantClass(v: ReviewModEvent['variant']): string {
  switch (v) {
    case 'system': return 'before:bg-[var(--super)] before:border-[var(--super)]';
    case 'admin': return 'before:bg-[var(--ink)] before:border-[var(--ink)]';
    case 'danger': return 'before:bg-[var(--danger)] before:border-[var(--danger)]';
    case 'default':
    default: return 'before:bg-[var(--paper)] before:border-[var(--line-strong)]';
  }
}

function ActionSegments({ segments }: { segments: ModActionSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'strong') {
          return <strong key={i} className="text-[var(--ink)] font-semibold">{seg.text}</strong>;
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}

function ModEventRow({ event }: { event: ReviewModEvent }) {
  return (
    <div
      className={cn(
        // rv-mod-event — L13925-13941
        'relative pt-[8px] pb-[14px]',
        // ::before dot — L13929-13941
        "before:content-[''] before:absolute before:left-[-22px] before:top-[13px] before:w-[12px] before:h-[12px] before:rounded-full before:border-2 before:z-[1]",
        dotVariantClass(event.variant)
      )}
    >
      {/* rme-head — L13942-13947 */}
      <div className="flex items-baseline gap-[10px] flex-wrap mb-[4px]">
        {/* rme-actor — L13949-13953 */}
        <span className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
          {event.actor}
        </span>
        {/* rme-action — L13955-13959 */}
        <span className="text-[13px] text-[var(--ink-soft)]">
          <ActionSegments segments={event.actionSegments} />
        </span>
        {/* rme-time — L13960-13965 */}
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] ml-auto">
          {event.time}
        </span>
      </div>
      {/* rme-detail — L13967-13975 */}
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55]">
        {event.detail}
      </div>
    </div>
  );
}

export function ReviewSubModeration({ data, sectionStatus }: ReviewSubModerationProps) {
  return (
    <section
      id="rev-section-moderation"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            05 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Moderation history
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current",
            statusPillClass(sectionStatus.statusVariant)
          )}
        >
          {sectionStatus.statusText}
        </span>
      </div>

      {/* rv-mod-timeline — L13914-13924 */}
      <div className="relative pl-[24px] before:content-[''] before:absolute before:left-[7px] before:top-[6px] before:bottom-[6px] before:w-[2px] before:bg-[var(--line)]">
        {data.events.map((event, idx) => (
          <ModEventRow key={idx} event={event} />
        ))}
      </div>
    </section>
  );
}
