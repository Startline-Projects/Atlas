'use client';

import type { EngagementProfile } from '@/lib/mock-data/admin/engagement-profiles-data';

interface EngSubContractProps {
  engagement: EngagementProfile;
}

export function EngSubContract({ engagement }: EngSubContractProps) {
  const { contract } = engagement;

  const handleViewPdf = () => {
    // eslint-disable-next-line no-console
    console.log(`[engagement-contract] view-contract-pdf clicked for ${engagement.id}`);
  };
  const handleViewAmendments = () => {
    // eslint-disable-next-line no-console
    console.log(`[engagement-contract] view-amendments clicked for ${engagement.id}`);
  };

  return (
    // admin.html line 21753: cd-section pattern (py:36 0 + border-top + first:border-top:0 + scroll-margin:80)
    <section
      id="eng-section-contract"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Contract terms
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          Signed by both parties · {contract.amendments.length} amendment{contract.amendments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* admin.html line 9711: .eng-contract-card single unified */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head */}
        <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] flex items-center gap-[10px]">
            {contract.title}
            <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium">
              {contract.contractId}
            </span>
          </div>
          <div className="inline-flex gap-[8px]">
            <button
              type="button"
              onClick={handleViewPdf}
              data-eng-action="view-contract-pdf"
              className="font-mono text-[10.5px] text-[var(--ink-soft)] bg-[var(--paper)] border border-[var(--line)] py-[5px] px-[10px] rounded-full cursor-pointer tracking-[0.02em] transition-colors duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
            >
              View PDF →
            </button>
            <button
              type="button"
              onClick={handleViewAmendments}
              data-eng-action="view-amendments"
              className="font-mono text-[10.5px] text-[var(--ink-soft)] bg-[var(--paper)] border border-[var(--line)] py-[5px] px-[10px] rounded-full cursor-pointer tracking-[0.02em] transition-colors duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
            >
              Amendment history
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="py-[18px] px-[20px]">
          <dl className="grid grid-cols-2 gap-y-[14px] gap-x-[20px] max-[720px]:grid-cols-1 m-0">
            {contract.terms.map((term, idx) => (
              <div key={idx}>
                <dt className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
                  {term.dt}
                </dt>
                <dd className="text-[13px] text-[var(--ink)] m-0 leading-[1.4]">
                  {term.strongText ? (
                    <>
                      <span className="font-semibold">{term.strongText}</span> {term.dd}
                    </>
                  ) : (
                    term.dd
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-[14px] mt-[14px] pt-[14px] border-t border-dashed border-[var(--line-soft)] max-[720px]:grid-cols-1">
            {contract.signatures.map((sig, idx) => (
              <div
                key={idx}
                className="bg-[var(--paper-deep)] border border-dashed border-[var(--line)] rounded-[var(--r-sm)] py-[12px] px-[14px]"
              >
                <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[6px]">
                  {sig.label}
                </div>
                <div className="font-display text-[16px] font-medium italic text-[var(--ink)] tracking-[-0.01em] mb-[2px]">
                  {sig.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
                  {sig.meta}
                </div>
              </div>
            ))}
          </div>

          {/* Amendments */}
          {contract.amendments.length > 0 && (
            <div className="mt-[16px] pt-[14px] border-t border-dashed border-[var(--line-soft)]">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
                Amendments ({contract.amendments.length})
              </div>
              {contract.amendments.map((am, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[auto_1fr_auto] gap-[12px] items-center py-[8px] px-[12px] bg-[var(--paper-deep)] rounded-[var(--r-sm)] mb-[6px] last:mb-0 text-[12.5px]"
                >
                  <span className="font-mono text-[10px] bg-[var(--cream-deep)] text-[var(--ink-soft)] py-[2px] px-[7px] rounded-[3px] font-semibold tracking-[0.04em] whitespace-nowrap">
                    {am.num}
                  </span>
                  <span className="text-[var(--ink)]">{am.text}</span>
                  <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
                    {am.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
