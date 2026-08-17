import { FP_PASSTHROUGH_CARDS } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[var(--ink)] font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function FpPassThrough() {
  return (
    <section id="fp-section-passthrough" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Pass-through fees"
        meta="Atlas does not mark these up · they apply to all transactions and are paid by the party initiating"
      />
      <div className="grid grid-cols-2 max-[880px]:grid-cols-1 gap-[14px]">
        {FP_PASSTHROUGH_CARDS.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-[14px] p-[16px_18px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-md)]"
          >
            <div
              className="w-[36px] h-[36px] rounded-[8px] grid place-items-center font-display text-[14px] font-bold text-[var(--paper)] flex-shrink-0"
              style={{ background: card.gradient }}
            >
              {card.logoText}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-[var(--ink)] tracking-[-0.01em] mb-[2px]">
                {card.name}
              </div>
              <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5]">
                {renderBoldText(card.metaHtml)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
