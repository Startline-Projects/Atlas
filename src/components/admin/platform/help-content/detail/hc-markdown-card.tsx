/* admin.html lines 63824-63873: markdown editor card — head (EN canonical + hmh-meta) + body with syntax highlighting via data-hc-md-* attribute selectors */

import type { HcMarkdownData } from '@/lib/mock-data/admin/help-content-data';

interface HcMarkdownCardProps {
  markdown: HcMarkdownData;
}

export function HcMarkdownCard({ markdown }: HcMarkdownCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Markdown head */}
      <div className="flex items-center justify-between gap-[10px] py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {markdown.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {markdown.headMeta}
        </div>
      </div>

      {/* Markdown body — syntax highlighter via attribute selectors */}
      <div
        className="py-[14px] px-[16px] font-mono text-[12px] leading-[1.7] tracking-[0.01em] text-[var(--ink)] whitespace-pre-wrap bg-[var(--paper-deep)] min-h-[320px] [&_[data-hc-md-heading-1]]:text-[var(--ink)] [&_[data-hc-md-heading-1]]:font-bold [&_[data-hc-md-heading-2]]:text-[var(--ink)] [&_[data-hc-md-heading-2]]:font-bold [&_[data-hc-md-link]]:text-[var(--super)] [&_[data-hc-md-link]]:font-bold [&_[data-hc-md-bold]]:text-[var(--ink)] [&_[data-hc-md-bold]]:font-bold [&_[data-hc-md-em]]:text-[var(--ink-soft)] [&_[data-hc-md-em]]:italic [&_[data-hc-md-code]]:bg-[var(--ink)] [&_[data-hc-md-code]]:text-[var(--paper)] [&_[data-hc-md-code]]:py-[1px] [&_[data-hc-md-code]]:px-[5px] [&_[data-hc-md-code]]:rounded-[3px] [&_[data-hc-md-code]]:text-[11px] [&_[data-hc-md-list]]:text-[var(--ink-soft)]"
        dangerouslySetInnerHTML={{ __html: markdown.bodyHtml }}
      />
    </div>
  );
}
