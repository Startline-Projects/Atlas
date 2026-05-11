/**
 * Phase 12a placeholder for 6 dispute sections. Replaced one-by-one in Phase 12b
 * with real content (Claim / Response / Investigation / Decision / Audit / Linked).
 * Uses cd-section pattern (py:36 + border-top + scroll-mt:80px).
 */

interface DisputeSubPlaceholderProps {
  sectionId: string;
  num: string;
  title: string;
  status: string;
  phase: string;
}

export function DisputeSubPlaceholder({ sectionId, num, title, status, phase }: DisputeSubPlaceholderProps) {
  return (
    <section
      id={sectionId}
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            {num}
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            {title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {status}
        </span>
      </div>
      <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em] uppercase">
          Phase {phase} will build this section
        </div>
      </div>
    </section>
  );
}
