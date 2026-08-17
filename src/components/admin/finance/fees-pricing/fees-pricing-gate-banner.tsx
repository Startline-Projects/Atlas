import { FP_GATE_TEXT_HTML } from '@/lib/mock-data/admin/fees-pricing-data';

/** Render text with **bold** segments converted to <strong> tags. */
function renderBoldSegments(text: string) {
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

export function FeesPricingGateBanner() {
  return (
    <div className="flex items-center gap-[12px] p-[12px_16px] bg-[rgba(110,63,224,0.05)] border border-[rgba(110,63,224,0.25)] border-l-[3px] border-l-[var(--super)] rounded-[var(--r-sm)] mb-[22px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5]">
      <div className="w-[28px] h-[28px] rounded-full bg-[var(--super)] text-[var(--paper)] grid place-items-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div>{renderBoldSegments(FP_GATE_TEXT_HTML)}</div>
    </div>
  );
}
