'use client';

/* admin.html lines 63935-63985: categorization sidecar — 4 blocks (Related articles / Linked from / Compliance links / Revision history) */

import Link from 'next/link';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { HcCategorizationData, HcCategorizationBlock } from '@/lib/mock-data/admin/help-content-data';

interface HcCategorizationCardProps {
  categorization: HcCategorizationData;
}

export function HcCategorizationCard({ categorization }: HcCategorizationCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {categorization.blocks.map((block, idx) => (
        <Block key={idx} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: HcCategorizationBlock }) {
  const { showAction } = useAdminActionToast();
  return (
    <div className="py-[12px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
        {block.label}
      </div>

      {block.kind === 'related' && block.relatedLinks && (
        <div className="flex flex-col">
          {block.relatedLinks.map((link) => (
            <Link
              key={link.id}
              href={`/admin/platform/help-content/${link.id}`}
              className="block py-[6px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0 font-body text-[12px] text-[var(--ink-soft)] tracking-[-0.005em] no-underline transition-colors hover:text-[var(--ink)]"
            >
              {link.title}
              <span className="block font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] font-semibold">
                {link.meta}
              </span>
            </Link>
          ))}
        </div>
      )}

      {block.kind === 'html' && block.bodyHtml && (
        <div
          className="font-body text-[13px] font-semibold text-[var(--ink)] tracking-[-0.005em] leading-[1.4] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer [&_[data-hc-sub-mono]]:font-mono [&_[data-hc-sub-mono]]:text-[9.5px] [&_[data-hc-sub-mono]]:!text-[var(--ink-mute)] [&_[data-hc-sub-mono]]:tracking-[0.02em] [&_[data-hc-sub-mono]]:mt-[4px] [&_[data-hc-sub-mono]]:font-medium [&_[data-hc-cat-prose]]:text-[12px] [&_[data-hc-cat-prose]]:font-medium [&_[data-hc-cat-prose]]:!text-[var(--ink-soft)] [&_[data-hc-revision]]:font-mono [&_[data-hc-revision]]:text-[11px] [&_[data-hc-revision]]:leading-[1.7] [&_[data-hc-revision]]:font-medium [&_[data-hc-revision]]:!text-[var(--ink-soft)] [&_[data-hc-revision]_strong]:!text-[var(--ink-soft)] [&_[data-hc-revision]_strong]:font-bold [&_[data-hc-rev-current]]:!text-[var(--ink)]"
          dangerouslySetInnerHTML={{ __html: block.bodyHtml }}
        />
      )}

      {block.actionLabel && (
        <button
          type="button"
          onClick={() => block.actionLabel && showAction(block.actionLabel)}
          className="mt-[10px] w-full inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {block.actionLabel}
        </button>
      )}
    </div>
  );
}
