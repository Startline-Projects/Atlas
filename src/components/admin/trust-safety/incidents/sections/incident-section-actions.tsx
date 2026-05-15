/**
 * Phase 16b — §03 Actions taken chronological log.
 *
 * admin.html markup: L40934-41040
 * admin.html CSS:    L17110-17192 (.si-actions-list / .si-action-row)
 *
 * 3-col grid rows (32px num / 90px time / 1fr body).
 * State variants: completed (success), in-progress (super glow), pending (ink).
 * Text segments for inline code. Actor segments for compound bold.
 */
import type {
  IncidentActionsData,
  IncidentDetailSection,
  ActionRowData,
  ActionTextSegment,
  ActionActorSegment,
} from '@/lib/mock-data/admin/incidents-data';

/* ---- num-circle variant classes ---- */

function numClasses(status: ActionRowData['status']): string {
  const base = 'w-[28px] h-[28px] rounded-full grid place-items-center font-mono text-[11px] font-bold flex-shrink-0';
  switch (status) {
    case 'completed':
      return `${base} bg-[var(--success)] text-[var(--paper)]`;
    case 'in-progress':
      return `${base} bg-[var(--paper)] text-[var(--super)] border-2 border-[var(--super)] shadow-[0_0_0_3px_rgba(110,63,224,0.15)]`;
    case 'pending':
    default:
      return `${base} bg-[var(--ink)] text-[var(--paper)]`;
  }
}

/* ---- segment renderers ---- */

function renderTextSegments(segments: ActionTextSegment[]) {
  return segments.map((seg, i) =>
    seg.kind === 'code' ? (
      <code key={i} className="font-mono text-[11px] bg-[var(--cream-deep)] p-[1px_4px] rounded-[3px]">
        {seg.text}
      </code>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

function renderActorSegments(segments: ActionActorSegment[]) {
  return segments.map((seg, i) =>
    seg.kind === 'strong' ? (
      <strong key={i} className="text-[var(--ink-soft)] font-bold">{seg.text}</strong>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

/* ---- component ---- */

interface IncidentSectionActionsProps {
  section: IncidentDetailSection;
  data: IncidentActionsData;
}

export function IncidentSectionActions({ section, data }: IncidentSectionActionsProps) {
  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            03
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

      {/* Actions list */}
      <div className="flex flex-col">
        {data.actions.map((action, i) => (
          <div
            key={action.num}
            className={`grid grid-cols-[32px_90px_1fr] gap-[14px] items-start py-[12px] ${
              i < data.actions.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''
            }`}
          >
            {/* Number circle */}
            <div className={numClasses(action.status)}>
              {action.num}
            </div>

            {/* Timestamp */}
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] font-semibold pt-[5px]">
              {action.time}
            </div>

            {/* Body */}
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[3px]">
                {renderTextSegments(action.titleSegments)}
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
                {renderTextSegments(action.detailSegments)}
              </div>
              <span className="inline-flex items-center gap-[6px] mt-[6px] font-body text-[11px] text-[var(--ink-mute)] tracking-[-0.005em]">
                <span
                  className="w-[18px] h-[18px] rounded-full grid place-items-center font-display text-[8px] text-[var(--paper)] font-medium flex-shrink-0"
                  style={{ background: action.actor.gradient }}
                >
                  {action.actor.initials}
                </span>
                {renderActorSegments(action.actor.segments)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
