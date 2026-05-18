/* admin.html lines 62704-62719: SMS + WhatsApp stub panes — centered card with title + body */

import type { TmStubPaneContent } from '@/lib/mock-data/admin/templates-data';

interface TmStubPaneProps {
  content: TmStubPaneContent;
}

export function TmStubPane({ content }: TmStubPaneProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
      <div className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
        {content.title}
      </div>
      <div
        className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[520px] mx-auto [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
      />
    </div>
  );
}
