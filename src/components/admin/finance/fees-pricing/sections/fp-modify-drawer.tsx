import { FP_MODIFY } from '@/lib/mock-data/admin/fees-pricing-data';
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

export function FpModifyDrawer() {
  return (
    <section id="fp-section-modify" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Modify fee structure"
        meta="all changes require Super Admin password re-entry · 7-day announcement notice to users · audit logged"
      />

      <div className="bg-[var(--paper)] border-[1.5px] border-[var(--super)] rounded-[var(--r-md)] mb-[24px] overflow-hidden relative">
        {/* Top strip */}
        <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--super)]" />

        {/* Head */}
        <div className="flex items-start justify-between gap-[14px] p-[16px_20px] border-b border-b-[var(--line-soft)] bg-[rgba(110,63,224,0.04)] flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--super)] font-bold mb-[3px]">
              {FP_MODIFY.eyebrow}
            </div>
            <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] mb-[3px] text-[var(--ink)] leading-[1.2] m-0">
              {FP_MODIFY.title}
            </h3>
            <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.04em]">
              {FP_MODIFY.meta}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
        </div>

        {/* Body — before / arrow / after */}
        <div className="grid grid-cols-[1fr_auto_1fr] max-[720px]:grid-cols-1 gap-[18px] items-stretch p-[22px_20px]">
          {/* Before */}
          <div className="bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] p-[14px_16px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
              Current value
            </div>
            <div className="font-display text-[38px] font-medium text-[var(--ink)] tracking-[-0.025em] leading-none tabular-nums flex items-baseline gap-[6px] mb-[10px]">
              {FP_MODIFY.beforeValue}
              <span className="font-mono text-[14px] font-semibold text-[var(--ink-mute)] tracking-[0.04em]">
                {FP_MODIFY.beforeUnit}
              </span>
            </div>
            <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] mt-[8px]">
              {renderBoldText(FP_MODIFY.beforeMetaHtml)}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col justify-center items-center text-[var(--super)] max-[720px]:rotate-90 max-[720px]:justify-self-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          {/* After */}
          <div className="border-[var(--super)] border bg-[rgba(110,63,224,0.04)] rounded-[var(--r-sm)] p-[14px_16px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--super)] font-bold mb-[8px]">
              Proposed value
            </div>
            <div className="font-display text-[38px] font-medium text-[var(--ink)] tracking-[-0.025em] leading-none tabular-nums flex items-baseline gap-[6px] mb-[10px]">
              {FP_MODIFY.afterValue}
              <span className="font-mono text-[14px] font-semibold text-[var(--ink-mute)] tracking-[0.04em]">
                {FP_MODIFY.afterUnit}
              </span>
            </div>
            <div className="flex gap-[4px] items-stretch border border-[var(--line)] rounded-[4px] bg-[var(--paper)] overflow-hidden max-w-[200px]">
              <input
                type="text"
                defaultValue={FP_MODIFY.afterInput}
                className="flex-1 min-w-0 border-0 py-[8px] px-[10px] font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] bg-transparent outline-none tabular-nums"
              />
              <div className="grid place-items-center px-[10px] bg-[var(--cream-deep)] border-l border-l-[var(--line)] font-mono text-[11px] font-bold text-[var(--ink-soft)]">
                %
              </div>
            </div>
            <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] mt-[8px]">
              <span className="text-[var(--success)] font-bold">↑ +2pt</span>
              {' · estimated '}
              <strong className="text-[var(--ink)] font-bold">+$27.7K / quarter</strong>
              {' revenue impact'}
            </div>
          </div>
        </div>

        {/* Config grid */}
        <div className="px-[20px] pb-[16px] grid grid-cols-2 max-[720px]:grid-cols-1 gap-[16px]">
          <div>
            <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[6px] flex items-center gap-[6px]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Effective date
            </div>
            <input
              type="date"
              defaultValue={FP_MODIFY.configEffectiveDate}
              className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[8px] px-[10px] font-body text-[12.5px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em]"
            />
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
              {FP_MODIFY.configEffectiveHint}
            </div>
          </div>

          <div>
            <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[6px] flex items-center gap-[6px]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21 12 17.7 6 21 7 14.1 2 9.3 9 8.5 12 2" />
              </svg>
              Reason for change · required
            </div>
            <textarea
              defaultValue={FP_MODIFY.configReason}
              placeholder="Why is this change being made? · displayed in audit log · supports markdown"
              className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[8px] px-[10px] font-body text-[12.5px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] min-h-[50px] resize-y leading-[1.5]"
            />
          </div>
        </div>

        {/* Impact card */}
        <div className="px-[20px] pb-[16px]">
          <div className="p-[16px_18px] bg-[var(--amber-bg)] border border-[rgba(232,118,58,0.3)] border-l-[3px] border-l-[var(--amber)] rounded-[var(--r-sm)]">
            <h4 className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[10px] m-0">
              Estimated impact (based on last 90d activity)
            </h4>
            <div className="grid grid-cols-3 max-[720px]:grid-cols-1 gap-[12px]">
              {FP_MODIFY.impactCells.map((cell) => (
                <div key={cell.label} className="p-[8px_10px] bg-[var(--paper)] rounded-[var(--r-sm)]">
                  <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
                    {cell.label}
                  </div>
                  <div className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-none tabular-nums">
                    {cell.value}
                  </div>
                  <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px]">
                    {cell.meta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm bar */}
        <div className="flex items-center justify-between gap-[14px] p-[14px_20px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex-wrap">
          <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] flex-1 min-w-[200px]">
            {renderBoldText(FP_MODIFY.confirmHtml)}
          </div>
          <div className="inline-flex gap-[8px]">
            <button
              type="button"
              className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap hover:bg-black transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Confirm + enter password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
