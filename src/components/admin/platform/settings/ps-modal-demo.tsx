'use client';

import type { PsDemoModalData } from '@/lib/mock-data/admin/platform-settings-data';

interface PsModalDemoProps {
  data: PsDemoModalData;
}

export function PsModalDemo({ data }: PsModalDemoProps) {
  return (
    <div className="bg-[var(--paper)] border-2 border-[var(--super)] rounded-[var(--r-md)] mb-[22px] overflow-hidden relative">
      {/* Demo label */}
      <div className="absolute top-0 left-0 bg-[var(--super)] text-[var(--paper)] font-mono text-[8.5px] font-bold tracking-[0.16em] uppercase px-[12px] py-[4px] rounded-br-[var(--r-sm)]">
        Demo · Confirmation Modal Pattern
      </div>

      {/* Modal head */}
      <div className="flex items-start gap-[14px] py-[32px] px-[24px] pb-[14px] border-b border-dashed border-[var(--line)]">
        <div className="w-[36px] h-[36px] rounded-full bg-[var(--amber-bg)] text-[var(--amber)] grid place-items-center flex-shrink-0 border border-[var(--amber)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <g dangerouslySetInnerHTML={{ __html: data.headIcon }} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] font-bold text-[var(--ink-mute)] mb-[3px]">
            {data.headEyebrow}
          </div>
          <h3 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[4px] leading-[1.3]">
            {data.headTitle}
          </h3>
          <div
            className="font-body text-[13px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: data.headDetailHtml }}
          />
        </div>
      </div>

      {/* Modal body */}
      <div className="px-[24px] py-[18px]">
        {/* Diff section */}
        <div className="grid grid-cols-[1fr_32px_1fr] gap-0 mb-[18px] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden max-[720px]:grid-cols-1">
          {/* Before */}
          <div className="bg-[rgba(194,65,43,0.04)] px-[18px] py-[14px]">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] font-bold text-[var(--danger)] mb-[8px]">
              {data.diffBefore.eyebrow}
            </div>
            <div className="font-display text-[26px] font-medium tracking-[-0.025em] leading-[1] tabular-nums mb-[4px] text-[var(--danger)] line-through opacity-70">
              {data.diffBefore.value}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
              {data.diffBefore.meta}
            </div>
          </div>

          {/* Arrow */}
          <div className="grid place-items-center bg-[var(--paper-deep)] text-[var(--ink-mute)] border-l border-r border-dashed border-[var(--line)] max-[720px]:hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          {/* After */}
          <div className="bg-[rgba(46,125,84,0.04)] px-[18px] py-[14px]">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] font-bold text-[var(--success)] mb-[8px]">
              {data.diffAfter.eyebrow}
            </div>
            <div className="font-display text-[26px] font-medium tracking-[-0.025em] leading-[1] tabular-nums mb-[4px] text-[var(--success)]">
              {data.diffAfter.value}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
              {data.diffAfter.meta}
            </div>
          </div>
        </div>

        {/* Impact section */}
        <div className="bg-[var(--amber-bg)] border border-[rgba(232,118,58,0.25)] rounded-[var(--r-sm)] px-[16px] py-[14px] mb-[18px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--amber)] flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)]">
              {data.impactTitle}
            </span>
          </div>
          <div className="flex flex-col gap-[6px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55]">
            {data.impactItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-[8px]">
                <span className="text-[var(--amber)] font-bold flex-shrink-0">•</span>
                <span
                  className="[&_strong]:text-[var(--ink)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal options */}
        <div className="flex flex-col gap-[10px] bg-[var(--paper-deep)] rounded-[var(--r-sm)] px-[16px] py-[14px] mb-[18px]">
          {data.modalOptions.map((option) => (
            <div key={option.id} className="flex items-start gap-[10px]">
              <input
                type="checkbox"
                id={option.id}
                defaultChecked={option.checked}
                className="w-[16px] h-[16px] mt-[3px] flex-shrink-0 accent-[var(--ink)] cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div
                  className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em] leading-[1.3] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: option.titleHtml }}
                />
                <div
                  className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px] leading-[1.5] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: option.descHtml }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Audit preview */}
        <div className="bg-[var(--ink)] text-[rgba(251,248,242,0.85)] font-mono text-[10.5px] rounded-[var(--r-sm)] px-[14px] py-[12px] tracking-[0.04em] leading-[1.65] overflow-x-auto whitespace-pre-wrap">
          <span className="block text-[rgba(251,248,242,0.5)] text-[8.5px] tracking-[0.18em] uppercase font-bold mb-[6px]">
            {data.auditPreview[0] && 'AUDIT LOG ENTRY · PREVIEW'}
          </span>
          {data.auditPreview.map((entry, idx) => (
            <div key={idx}>
              <span className="text-[rgba(251,248,242,0.55)]">{entry.key}:</span>
              <span className={`ml-[8px] ${
                entry.variant === 'danger' ? 'text-[#ff8b6f]' :
                entry.variant === 'success' ? 'text-[#7adba4]' :
                'text-[rgba(251,248,242,0.95)]'
              }`}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal footer */}
      <div className="flex items-center justify-between gap-[12px] px-[24px] py-[14px] bg-[var(--paper-deep)] border-t border-[var(--line-soft)] flex-wrap">
        <div
          className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] flex-1 min-w-[200px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: data.footerMetaHtml }}
        />
        <div className="inline-flex gap-[6px]">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
          >
            {data.footerCancelLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--super)] border border-[var(--super)] text-[var(--paper)] hover:bg-[#5F2FD0] cursor-pointer transition-all whitespace-nowrap"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {data.footerConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
