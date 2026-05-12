/**
 * Phase 16b — §04 Timeline of events.
 *
 * Clone of FraudSectionTimeline (Phase 15c) with incident-specific
 * section chrome: sh-num "04", custom sh-meta.
 *
 * admin.html CSS: L16372-16416 (.fr-timeline + .fr-tl-event)
 * admin.html markup: L41042-41116 (incident timeline)
 *
 * Supports all FraudEventVariant values including 'success' (added Phase 16b).
 */
import type { FraudTimelineData, FraudEventVariant } from '@/lib/mock-data/admin/fraud-alerts-data';
import type { IncidentDetailSection } from '@/lib/mock-data/admin/incidents-data';

function dotStyle(variant: FraudEventVariant): React.CSSProperties {
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
    case 'success':
      return { ...base, borderColor: 'var(--success)' };
    case 'system':
      return { ...base, background: 'var(--ink)', borderColor: 'var(--ink)' };
    case 'danger-system':
      return { ...base, background: 'var(--ink)', borderColor: 'var(--danger)' };
    case 'default':
    default:
      return base;
  }
}

interface IncidentSectionTimelineProps {
  section: IncidentDetailSection;
  data: FraudTimelineData;
}

export function IncidentSectionTimeline({ section, data }: IncidentSectionTimelineProps) {
  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            04
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              {section.title}
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {section.meta}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline body */}
      <div className="relative pl-[24px]">
        {/* Vertical line */}
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
