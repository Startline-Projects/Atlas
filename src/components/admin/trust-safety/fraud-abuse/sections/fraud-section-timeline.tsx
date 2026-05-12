/**
 * Phase 15c — §05 Timeline of events (Server component).
 *
 * admin.html CSS: .fr-timeline + .fr-tl-event (L16358-16417)
 * admin.html markup: L40052-40127
 *
 * 10 events newest-first. Vertical line via ::before equivalent (absolute div).
 * Variant dots: danger=red border, warn=amber border, system=ink filled, danger-system=red border + ink fill.
 * Events 1-7 have actor span (700 ink, or italic ink-mute for system). Events 8-10 no actor.
 */
import type { FraudTimelineData, FraudEventVariant } from '@/lib/mock-data/admin/fraud-alerts-data';

function dotStyle(variant: FraudEventVariant): React.CSSProperties {
  /* Defaults: 12×12 r-full border 2px ink bg paper */
  const base: React.CSSProperties = {
    position: 'absolute',
    left: '-23px',
    top: '6px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid var(--ink)',
    background: 'var(--paper)',
    zIndex: 1,
  };
  switch (variant) {
    case 'danger':
      return { ...base, borderColor: 'var(--danger)' };
    case 'warn':
      return { ...base, borderColor: 'var(--amber)' };
    case 'system':
      return { ...base, background: 'var(--ink)', borderColor: 'var(--ink)' };
    case 'danger-system':
      return { ...base, background: 'var(--ink)', borderColor: 'var(--danger)' };
    case 'default':
    default:
      return base;
  }
}

interface FraudSectionTimelineProps {
  data: FraudTimelineData;
}

export function FraudSectionTimeline({ data }: FraudSectionTimelineProps) {
  return (
    <section
      data-fraud-section="timeline"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            05
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              Timeline of events
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              all relevant events from Jan 18 (account creation) → today · {data.totalEvents} audit entries
            </div>
          </div>
        </div>
      </div>

      {/* Timeline body */}
      <div className="relative pl-[24px]">
        {/* Vertical line — replaces .fr-timeline::before */}
        <div className="absolute left-[7px] top-[6px] bottom-[6px] w-[2px] bg-[var(--line)]" aria-hidden="true" />

        {data.events.map((event, i) => (
          <div
            key={i}
            className={`relative ${i < data.events.length - 1 ? 'pb-[18px]' : 'pb-0'}`}
          >
            {/* Dot */}
            <span style={dotStyle(event.variant)} aria-hidden="true" />

            {/* tl-time */}
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[3px]">
              {event.time}
            </div>

            {/* tl-title */}
            <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[3px]">
              {event.actor && (
                <>
                  <span className={
                    event.actorIsSystem
                      ? 'text-[var(--ink-mute)] italic font-bold'
                      : 'text-[var(--ink)] font-bold'
                  }>
                    {event.actor}
                  </span>{' '}
                </>
              )}
              {event.title}
            </div>

            {/* tl-detail */}
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5]">
              {event.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
