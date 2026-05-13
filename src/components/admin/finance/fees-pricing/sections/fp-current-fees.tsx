import { FP_CURRENT_FEES, type FpFeeCard } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

/** Render text with **bold** segments + [link text] brackets converted. */
function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[var(--ink)] font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <a key={i} className="text-[var(--ink-soft)] underline cursor-pointer font-semibold">
          {part.slice(1, -1)}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function FeeCard({ card }: { card: FpFeeCard }) {
  const isHeadline = card.variant === 'headline';
  const isDisabled = card.variant === 'disabled';

  const baseClasses =
    'rounded-[var(--r-md)] p-[18px_20px] relative flex flex-col gap-[8px]';
  const variantClasses = isHeadline
    ? 'border-[var(--ink)] border-[1.5px]'
    : isDisabled
      ? 'bg-[var(--paper-deep)] border border-dashed border-[var(--line)]'
      : 'bg-[var(--paper)] border border-[var(--line)]';

  return (
    <div
      className={`${baseClasses} ${variantClasses}`}
      style={isHeadline ? { background: 'linear-gradient(135deg, #fffaf0, var(--paper))' } : undefined}
    >
      {/* Headline top strip */}
      {isHeadline && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--ink)] rounded-tl-[var(--r-md)] rounded-tr-[var(--r-md)]"
        />
      )}

      {/* Head */}
      <div className="flex items-start justify-between gap-[12px] mb-[4px]">
        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          {card.eyebrow}
        </span>
        <button
          type="button"
          className="font-mono text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.06em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-[4px] py-[4px] px-[9px] cursor-pointer transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)] inline-flex items-center gap-[4px]"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          {card.editLabel}
        </button>
      </div>

      {/* Label */}
      <div className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-[1.25] mb-[6px]">
        {card.label}
      </div>

      {/* Value */}
      <div
        className={`font-display font-medium text-[var(--ink)] tracking-[-0.025em] leading-none tabular-nums flex items-baseline gap-[6px] mb-[4px] ${
          isHeadline ? 'text-[48px]' : 'text-[38px]'
        }`}
      >
        {card.value}
        <span className="font-mono text-[14px] font-semibold text-[var(--ink-mute)] tracking-[0.04em]">
          {card.unit}
        </span>
      </div>

      {/* Meta */}
      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5]">
        {renderRichText(card.metaHtml)}
      </div>

      {/* Since */}
      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[6px] pt-[8px] border-t border-dashed border-t-[var(--line-soft)]">
        {renderRichText(card.sinceHtml)}
      </div>
    </div>
  );
}

export function FpCurrentFees() {
  return (
    <section id="fp-section-current" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Current fee structure"
        meta="in effect since Apr 18 2026 · applied to all engagements and re-certifications"
        action={
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] self-center">
            v2.4 · 23 historical changes
          </span>
        }
      />
      <div className="grid grid-cols-2 max-[880px]:grid-cols-1 gap-[14px]">
        {FP_CURRENT_FEES.map((card) => (
          <FeeCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
