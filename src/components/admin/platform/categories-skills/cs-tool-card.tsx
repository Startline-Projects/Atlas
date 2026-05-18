/* admin.html lines 61246-61300 (and similar): single tool card with logo + name + meta */

import type { CsTool } from '@/lib/mock-data/admin/categories-skills-data';

interface CsToolCardProps {
  tool: CsTool;
}

export function CsToolCard({ tool }: CsToolCardProps) {
  return (
    <div className="flex items-center gap-[10px] py-[12px] px-[14px] border-r border-r-[var(--line-soft)] border-b border-b-[var(--line-soft)] cursor-pointer transition-colors hover:bg-[var(--paper-deep)] [&:nth-child(4n)]:border-r-0 max-[1080px]:[&:nth-child(4n)]:border-r max-[1080px]:[&:nth-child(3n)]:border-r-0 max-[720px]:[&:nth-child(3n)]:border-r max-[720px]:[&:nth-child(2n)]:border-r-0 max-[480px]:[&:nth-child(2n)]:border-r-0">
      <div
        className="w-[32px] h-[32px] rounded-[6px] grid place-items-center font-display text-[12px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
        style={{ background: tool.logoGradient }}
      >
        {tool.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
          {tool.name}
        </div>
        <div
          className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: tool.metaHtml }}
        />
      </div>
    </div>
  );
}
