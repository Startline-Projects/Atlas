'use client';

/* admin.html lines 63263-63378 (etc): category section — head (eyebrow + h2 + actions) with dashed bottom-border + article list */

import { HcArticleRowComponent } from './hc-article-row';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { HcCategorySection } from '@/lib/mock-data/admin/help-content-data';

interface HcCatSectionProps {
  section: HcCategorySection;
}

export function HcCatSection({ section }: HcCatSectionProps) {
  const { showAction } = useAdminActionToast();
  return (
    <section className="mb-[28px] last:mb-0">
      {/* Head */}
      <div className="flex items-center justify-between gap-[12px] pb-[12px] mb-[12px] border-b border-b-dashed border-b-[var(--line)] flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
            {section.eyebrow}
          </div>
          <h2 className="font-display text-[19px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 leading-[1.2]">
            {section.title}
          </h2>
        </div>
        {section.headActions.length > 0 && (
          <div className="inline-flex gap-[6px]">
            {section.headActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => showAction(`${action.label} · ${section.title}`)}
                className="inline-flex items-center gap-[6px] py-[6px] px-[11px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Article list */}
      <div className="flex flex-col gap-[14px]">
        {section.articles.map((article) => (
          <HcArticleRowComponent key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
