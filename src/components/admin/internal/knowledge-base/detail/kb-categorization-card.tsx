'use client';

/* admin.html lines 66989-67064: categorization sidecar — 4 blocks
   1. LINKED CASES (5 KbLinkedCaseRow)
   2. LINKED RUNBOOKS (3 link rows pointing to /admin/internal/knowledge-base/{id})
   3. CROSS-STEP LINKS (html bodyHtml with <a> tags)
   4. REVISION HISTORY (html bodyHtml with current v6 highlighted + full history button) */

import Link from 'next/link';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { KbCategorizationData } from '@/lib/mock-data/admin/knowledge-base-data';
import { KbLinkedCaseRow } from './kb-linked-case';

interface KbCategorizationCardProps {
  data: KbCategorizationData;
}

const BLOCK_BASE =
  'py-[12px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0';
const LABEL_CLASSES =
  'font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]';

export function KbCategorizationCard({ data }: KbCategorizationCardProps) {
  const { showAction } = useAdminActionToast();

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Block 1 — Linked cases */}
      <div className={BLOCK_BASE}>
        <div className={LABEL_CLASSES}>{data.linkedCasesLabel}</div>
        <div className="flex flex-col">
          {data.linkedCases.map((lc) => (
            <KbLinkedCaseRow key={lc.id} linkedCase={lc} />
          ))}
        </div>
      </div>

      {/* Block 2 — Linked runbooks */}
      <div className={BLOCK_BASE}>
        <div className={LABEL_CLASSES}>{data.runbookLinksLabel}</div>
        <div className="flex flex-col">
          {data.runbookLinks.map((rl) => (
            <Link
              key={rl.id}
              href={`/admin/internal/knowledge-base/${rl.id}`}
              className="block py-[6px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0 font-body text-[12px] text-[var(--ink-soft)] tracking-[-0.005em] no-underline transition-colors hover:text-[var(--ink)]"
            >
              {rl.title}
              <span className="block font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] font-semibold">
                {rl.meta}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Block 3 — Cross-step links */}
      <div className={BLOCK_BASE}>
        <div className={LABEL_CLASSES}>{data.crossStepLinksLabel}</div>
        <div
          className="font-body text-[12px] font-medium text-[var(--ink-soft)] leading-[1.7] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: data.crossStepLinksHtml }}
        />
      </div>

      {/* Block 4 — Revision history */}
      <div className={BLOCK_BASE}>
        <div className={LABEL_CLASSES}>{data.revisionLabel}</div>
        <div
          className="font-mono text-[11px] leading-[1.7] font-medium text-[var(--ink-soft)] [&_strong]:font-bold [&_strong]:text-[var(--ink-soft)] [&_[data-kb-rev-current]]:text-[var(--ink)]"
          dangerouslySetInnerHTML={{ __html: data.revisionHtml }}
        />
        <button
          type="button"
          onClick={() => showAction(data.revisionActionLabel)}
          className="mt-[10px] w-full inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.revisionActionLabel}
        </button>
      </div>
    </div>
  );
}
