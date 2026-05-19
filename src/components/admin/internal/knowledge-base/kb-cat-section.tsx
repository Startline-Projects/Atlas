'use client';

/* admin.html lines 66283-66697: category section — head (eyebrow + h2 + actions) with dashed bottom-border + doc list
   Mirrors Step 33's HcCatSection patterns; renders KbDocCard instead of HcArticleRow */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { KbCategorySectionData } from '@/lib/mock-data/admin/knowledge-base-data';
import { KbDocCard } from './kb-doc-card';

interface KbCatSectionProps {
  section: KbCategorySectionData;
}

export function KbCatSection({ section }: KbCatSectionProps) {
  const { showAction } = useAdminActionToast();
  return (
    <section className="mb-[28px] last:mb-0">
      <div className="flex items-center justify-between gap-[12px] pb-[12px] mb-[12px] border-b border-b-dashed border-b-[var(--line)] flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
            {section.eyebrow}
          </div>
          <h2 className="font-display text-[19px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 leading-[1.2]">
            {section.title}
          </h2>
        </div>
        <div className="inline-flex gap-[6px]">
          <button
            type="button"
            onClick={() => showAction(`Reorder · ${section.title}`)}
            className="inline-flex items-center gap-[6px] py-[6px] px-[11px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
          >
            Reorder
          </button>
          <button
            type="button"
            onClick={() => showAction(`${section.headActionLabel} · ${section.title}`)}
            className="inline-flex items-center gap-[6px] py-[6px] px-[11px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
          >
            {section.headActionLabel}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        {section.docs.map((doc) => (
          <KbDocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}
