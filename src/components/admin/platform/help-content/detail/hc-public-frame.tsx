'use client';

/* admin.html lines 63888-63930: full public-site mock frame — topbar (logo + search pill) + breadcrumb + title + meta + body + helpful footer */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { HcPublicPreviewData } from '@/lib/mock-data/admin/help-content-data';

interface HcPublicFrameProps {
  preview: HcPublicPreviewData;
}

export function HcPublicFrame({ preview }: HcPublicFrameProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div className="max-w-[680px] mx-auto bg-[var(--paper)] font-body text-[var(--ink)]">
      {/* Topbar */}
      <div className="flex items-center justify-between py-[14px] px-[24px] bg-[var(--paper)] border-b border-b-[var(--line-soft)]">
        <div className="font-display text-[16px] font-medium tracking-[-0.025em] text-[var(--ink)]">
          {preview.siteLogo}
        </div>
        <div className="inline-flex items-center gap-[6px] py-[5px] px-[10px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-full font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {preview.searchPlaceholder}
        </div>
      </div>

      {/* Breadcrumb */}
      <div
        className="pt-[12px] px-[24px] pb-[4px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] [&_a]:text-[var(--ink-soft)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: preview.publicCrumbHtml }}
      />

      {/* Title */}
      <div className="pt-[4px] px-[24px] pb-[16px] font-display text-[26px] font-medium tracking-[-0.025em] leading-[1.2] text-[var(--ink)]">
        {preview.publicTitle}
      </div>

      {/* Meta */}
      <div className="px-[24px] pb-[18px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] border-b border-b-[var(--line-soft)]">
        {preview.publicMeta}
      </div>

      {/* Body */}
      <div
        className="pt-[22px] px-[24px] pb-[20px] font-body text-[14.5px] leading-[1.7] text-[var(--ink-soft)] tracking-[-0.005em] [&_h2]:font-display [&_h2]:text-[18px] [&_h2]:font-medium [&_h2]:text-[var(--ink)] [&_h2]:tracking-[-0.015em] [&_h2]:mt-[18px] [&_h2]:mb-[8px] [&_h2]:leading-[1.25] [&_h2:first-child]:mt-0 [&_p]:m-0 [&_p]:mb-[12px] [&_strong]:text-[var(--ink)] [&_strong]:font-semibold [&_em]:italic [&_ol]:pl-[22px] [&_ol]:m-0 [&_ol]:mb-[12px] [&_ul]:pl-[22px] [&_ul]:m-0 [&_ul]:mb-[12px] [&_li]:mb-[5px] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-semibold [&_a]:cursor-pointer [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:py-[1px] [&_code]:px-[5px] [&_code]:rounded-[3px] [&_[data-hc-video]]:my-[18px] [&_[data-hc-video]]:py-[32px] [&_[data-hc-video]]:px-[16px] [&_[data-hc-video]]:bg-[var(--paper-deep)] [&_[data-hc-video]]:rounded-[6px] [&_[data-hc-video]]:text-center [&_[data-hc-video]]:!text-[var(--ink-mute)] [&_[data-hc-video]]:font-mono [&_[data-hc-video]]:text-[11px] [&_[data-hc-video]]:tracking-[0.04em]"
        dangerouslySetInnerHTML={{ __html: preview.publicBodyHtml }}
      />

      {/* Helpful footer */}
      <div className="py-[18px] px-[24px] bg-[var(--paper-deep)] border-t border-t-[var(--line-soft)] text-center">
        <div className="font-body text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.005em] mb-[10px]">
          {preview.helpfulQuestion}
        </div>
        <div className="inline-flex gap-[8px]">
          <button
            type="button"
            onClick={() => showAction(`Recorded vote: ${preview.helpfulYes}`)}
            className="py-[6px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-mono text-[11px] font-bold tracking-[0.04em] text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] transition-colors"
          >
            {preview.helpfulYes}
          </button>
          <button
            type="button"
            onClick={() => showAction(`Recorded vote: ${preview.helpfulNo}`)}
            className="py-[6px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-mono text-[11px] font-bold tracking-[0.04em] text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] transition-colors"
          >
            {preview.helpfulNo}
          </button>
        </div>
      </div>
    </div>
  );
}
