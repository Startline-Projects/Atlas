/**
 * Phase 16c — §05 Post-mortem section.
 *
 * admin.html markup: L41119-41173
 * admin.html CSS:    L17194-17274 (.si-postmortem, .si-pm-pill, .si-postmortem-grid)
 *
 * Two states: pending (dashed border, centered text, button) or
 * published (paper-deep, head + 2×2 grid blocks).
 * Optional reference example in native <details> collapsible.
 * Pill in section head right-aligned (new pattern for §05).
 */
import type {
  IncidentPostMortemData,
  IncidentDetailSection,
  PostMortemPendingData,
  PostMortemPublishedData,
  PostMortemTextSegment,
} from '@/lib/mock-data/admin/incidents-data';

/* ---- segment renderer ---- */

function renderPMSegments(segments: PostMortemTextSegment[]) {
  return segments.map((seg, i) =>
    seg.kind === 'strong'
      ? <strong key={i} className="text-[var(--ink)] font-bold">{seg.text}</strong>
      : <span key={i}>{seg.text}</span>
  );
}

/* ---- pending body ---- */

function PendingBody({ data }: { data: PostMortemPendingData }) {
  return (
    <>
      <div className="border border-dashed border-[var(--line)] bg-[var(--paper)] rounded-[var(--r-sm)] text-center p-[32px_24px]">
        <div className="font-mono text-[12px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] mb-[12px]">
          <strong className="text-[var(--ink-soft)]">{data.pendingLines[0]}</strong>
          <br />
          {data.pendingLines[1]}
          <br /><br />
          {renderPMSegments(data.ownerSegments)}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] p-[8px_14px_8px_12px] font-mono text-[11px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          data-si-action="open-template"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)]" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          {data.buttonLabel}
        </button>
      </div>
    </>
  );
}

/* ---- published body ---- */

function PublishedBody({ data }: { data: PostMortemPublishedData }) {
  return (
    <div className="bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] p-[16px_18px]">
      {/* Head */}
      <div className="flex items-center justify-between gap-[12px] mb-[12px] flex-wrap">
        <h4 className="font-display text-[14px] font-medium tracking-[-0.01em] m-0 text-[var(--ink)]">
          {data.title}
        </h4>
        <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold bg-[var(--success-bg)] text-[var(--success)] p-[3px_8px] rounded-[4px]">
          {data.pillLabel}
        </span>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
        {data.blocks.map((block) => (
          <div key={block.label} className="p-[12px_14px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[var(--r-sm)]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
              {block.label}
            </div>
            <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em]">
              {renderPMSegments(block.segments)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- main component ---- */

interface IncidentSectionPostMortemProps {
  section: IncidentDetailSection;
  data: IncidentPostMortemData;
}

export function IncidentSectionPostMortem({ section, data }: IncidentSectionPostMortemProps) {
  const isPending = data.primary.status === 'pending';
  const pillLabel = data.primary.pillLabel;

  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header — pill right-aligned */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            05
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
        <span className={`font-mono text-[9.5px] tracking-[0.08em] uppercase font-bold p-[3px_8px] rounded-[4px] ${
          isPending
            ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
            : 'bg-[var(--success-bg)] text-[var(--success)]'
        }`}>
          {pillLabel}
        </span>
      </div>

      {/* Primary body */}
      {data.primary.status === 'pending' ? (
        <PendingBody data={data.primary} />
      ) : (
        <PublishedBody data={data.primary} />
      )}

      {/* Reference example (collapsed by default) */}
      {data.reference && (
        <details className="mt-[14px]">
          <summary className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-mute)] uppercase cursor-pointer py-[8px] font-bold">
            {data.reference.summaryLabel}
          </summary>
          <div className="mt-[8px]">
            <PublishedBody data={data.reference.data} />
          </div>
        </details>
      )}
    </section>
  );
}
