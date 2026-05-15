/**
 * Phase 16c — §02 Incident description (rich prose narrative).
 *
 * admin.html markup: L40906-40932
 * admin.html CSS:    inline styles on wrapper div (L40918)
 *
 * 4 paragraphs with 6-kind DescriptionSegment discriminated union:
 * text / strong / strong-amber / strong-success / code / link.
 */
import type {
  IncidentDescriptionData,
  IncidentDetailSection,
  DescriptionSegment,
  DescriptionParagraph,
} from '@/lib/mock-data/admin/incidents-data';

function renderSegment(seg: DescriptionSegment, i: number) {
  switch (seg.kind) {
    case 'strong':
      return <strong key={i} className="text-[var(--ink)] font-bold">{seg.text}</strong>;
    case 'strong-amber':
      return <strong key={i} className="text-[var(--amber)] font-bold">{seg.text}</strong>;
    case 'strong-success':
      return <strong key={i} className="text-[var(--success)] font-bold">{seg.text}</strong>;
    case 'code':
      return <code key={i} className="font-mono text-[12px] bg-[var(--cream-deep)] p-[1px_5px] rounded-[3px]">{seg.text}</code>;
    case 'link':
      return <a key={i} className="text-[var(--ink)] underline font-semibold cursor-pointer" data-si-action={seg.actionKey}>{seg.text}</a>;
    case 'text':
    default:
      return <span key={i}>{seg.text}</span>;
  }
}

function renderParagraph(para: DescriptionParagraph, idx: number, isLast: boolean) {
  return (
    <p key={idx} className={isLast ? 'm-0' : 'm-0 mb-[12px]'}>
      {para.segments.map((seg, i) => renderSegment(seg, i))}
    </p>
  );
}

interface IncidentSectionDescriptionProps {
  section: IncidentDetailSection;
  data: IncidentDescriptionData;
}

export function IncidentSectionDescription({ section, data }: IncidentSectionDescriptionProps) {
  return (
    <section
      data-si-section={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section header */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            02
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

      {/* Prose body */}
      <div className="text-[13.5px] text-[var(--ink-soft)] leading-[1.65] tracking-[-0.005em]">
        {data.paragraphs.map((para, i) =>
          renderParagraph(para, i, i === data.paragraphs.length - 1)
        )}
      </div>
    </section>
  );
}
