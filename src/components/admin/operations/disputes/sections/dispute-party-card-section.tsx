'use client';

import type { DisputeClaim, DisputeResponse, EvidenceItem } from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';
import { RichInline } from './dispute-rich';

interface PartyCardSectionProps {
  data: DisputeClaim | DisputeResponse;
  sectionId: string;
  sectionNum: string;
  sectionTitle: string;
  disputeId: string;
}

// admin.html lines 11933-11974 — evidence icon variants
function EvidenceIcon({ kind }: { kind: EvidenceItem['kind'] }) {
  switch (kind) {
    case 'pdf':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 'image':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    case 'csv':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'code':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export function DisputePartyCardSection({ data, sectionId, sectionNum, sectionTitle, disputeId }: PartyCardSectionProps) {
  const isClaim = data.headVariant === 'claim';
  // admin.html lines 11965-66 — head modifier 2px bottom-border
  const headBottomBorder = isClaim ? 'border-b-[2px] border-[var(--danger)]' : 'border-b-[2px] border-[var(--success)]';
  // admin.html lines 11985-92 — dpc-tag variants
  const tagClass = data.tagVariant === 'claimant'
    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
    : 'bg-[var(--success-bg)] text-[var(--success)]';

  // Discriminate to access optional claim-only fields
  const claimOnly = isClaim ? (data as DisputeClaim) : null;

  return (
    <section
      id={sectionId}
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* admin.html cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            {sectionNum}
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            {sectionTitle}
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {data.statusText}
        </span>
      </div>

      {/* admin.html line 11949 — .disp-party-card (single unified) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head with claim/response variant */}
        <div className={cn('py-[14px] px-[22px] bg-[var(--paper-deep)] flex items-center justify-between flex-wrap gap-[8px]', headBottomBorder)}>
          <div className="font-display text-[15px] font-medium tracking-[-0.01em] flex items-center gap-[10px]">
            <span className={cn('font-mono text-[9px] tracking-[0.12em] uppercase font-semibold py-[2px] px-[6px] rounded-[3px]', tagClass)}>
              {data.tagText}
            </span>
            {data.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {data.filedMeta}
          </div>
        </div>

        {/* Body */}
        <div className="py-[18px] px-[22px]">
          {/* Byline */}
          <div className="flex items-center gap-[10px] mb-[14px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
            <span
              aria-hidden="true"
              className="w-[36px] h-[36px] rounded-full grid place-items-center font-display text-[13px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
              style={{ background: data.byline.gradient }}
            >
              {data.byline.initials}
            </span>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-[var(--ink)]">{data.byline.name}</div>
              <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">{data.byline.role}</div>
            </div>
          </div>

          {/* Claim-only reason category */}
          {claimOnly?.reasonCategoryLabel && (
            <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.6] m-0 mb-[10px]">
              <strong className="font-semibold text-[var(--ink)]">Reason category:</strong> {claimOnly.reasonCategoryLabel} ·{' '}
              <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">{claimOnly.reasonCategoryMeta}</span>
            </p>
          )}

          {/* Body paragraphs (with optional bullets injected after first para for claim) */}
          {data.bodyParagraphs.map((p, i) => (
            <div key={i}>
              <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.6] m-0 mb-[10px] last:mb-0">
                <RichInline paragraph={p} />
              </p>
              {/* Insert claim bullets after first paragraph */}
              {claimOnly?.bullets && i === 0 && (
                <ul className="list-disc pl-[22px] my-[8px]">
                  {claimOnly.bullets.map((b, bi) => (
                    <li key={bi} className="text-[13.5px] text-[var(--ink-soft)] leading-[1.6] mb-[4px]">{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Quote */}
          <div className="my-[12px] py-[10px] px-[14px] bg-[var(--paper-deep)] border-l-[3px] border-[var(--line-strong)] italic text-[13px] text-[var(--ink-soft)] leading-[1.5]">
            {data.quote.text}
            <span className="block not-italic font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
              {data.quote.cite}
            </span>
          </div>

          {/* Amount chip */}
          <div className="inline-flex items-center gap-[8px] mt-[12px] py-[8px] px-[14px] bg-[var(--paper-deep)] border border-dashed border-[var(--line)] rounded-[var(--r-sm)] text-[12.5px] text-[var(--ink-soft)]">
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
              {data.amount.label}
            </span>
            <span className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] [font-variant-numeric:tabular-nums]">
              {data.amount.value}
            </span>
            <span className="font-mono text-[11px] text-[var(--ink-mute)]">
              {data.amount.suffix}
            </span>
          </div>

          {/* Evidence section */}
          {data.evidence.length > 0 && (
            <div className="mt-[16px] pt-[14px] border-t border-dashed border-[var(--line-soft)]">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
                {data.evidenceHead}
              </div>
              <div className="grid grid-cols-3 gap-[10px] max-[720px]:grid-cols-2">
                {data.evidence.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    data-disp-action="open-evidence"
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log(`[dispute-evidence] ${item.name} clicked for ${disputeId}`);
                    }}
                    className="text-left bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] py-[10px] px-[12px] flex flex-col gap-[4px] cursor-pointer transition-colors duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:border-[var(--line-strong)]"
                  >
                    <span className="w-[32px] h-[32px] rounded-[var(--r-sm)] bg-[var(--cream-deep)] grid place-items-center text-[var(--ink-mute)] mb-[4px]">
                      <EvidenceIcon kind={item.kind} />
                    </span>
                    <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
                      {item.meta}
                    </div>
                    {item.reviewed && (
                      <span className="inline-block font-mono text-[8.5px] tracking-[0.12em] uppercase bg-[var(--success)] text-[var(--paper)] py-[1px] px-[6px] rounded-[2px] font-semibold mt-[4px] self-start">
                        REVIEWED ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
