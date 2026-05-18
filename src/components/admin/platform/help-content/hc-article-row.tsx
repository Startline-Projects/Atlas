'use client';

/* admin.html lines 63278-63375 (and across all 4 sections): 5-col article row clickable to /admin/platform/help-content/[id].
   Row variants: draft (amber tint) / review-needed (super tint) / archived (opacity-60). */

import { useRouter } from 'next/navigation';
import { HcStatusPill } from './hc-status-pill';
import { HcTagChip } from './hc-tag-chip';
import { HcHelpfulBar } from './hc-helpful-bar';
import type { HcArticleRow } from '@/lib/mock-data/admin/help-content-data';

interface HcArticleRowProps {
  article: HcArticleRow;
}

export function HcArticleRowComponent({ article }: HcArticleRowProps) {
  const router = useRouter();
  const navigate = () => router.push(`/admin/platform/help-content/${article.id}`);

  const variantClasses =
    article.rowVariant === 'draft'
      ? 'bg-[rgba(232,118,58,0.03)] border-[rgba(232,118,58,0.2)]'
      : article.rowVariant === 'review-needed'
      ? 'bg-[rgba(110,63,224,0.03)] border-[rgba(110,63,224,0.18)]'
      : article.rowVariant === 'archived'
      ? 'bg-[var(--paper)] border-[var(--line)] opacity-60'
      : 'bg-[var(--paper)] border-[var(--line)]';

  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)_140px_100px_90px_30px] gap-[16px] items-center py-[14px] px-[18px] border rounded-[var(--r-md)] cursor-pointer transition-all hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)] max-[980px]:grid-cols-[minmax(0,1fr)_auto] ${variantClasses}`}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Open article ${article.title}`}
    >
      {/* COL 1: Title block + tags + slug */}
      <div className="min-w-0">
        <div className="text-[14px] font-bold text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.3] flex items-center gap-[6px] flex-wrap">
          {article.title}
          {article.tags.length > 0 && (
            <span className="flex gap-[4px] flex-wrap">
              {article.tags.map((tag, idx) => (
                <HcTagChip key={idx} label={tag.label} variant={tag.variant} />
              ))}
            </span>
          )}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] font-medium">
          {article.slug}
        </div>
      </div>

      {/* COL 2: Views + meta — hidden at 980px */}
      <div className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums max-[980px]:hidden">
        {article.views.value}
        <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {article.views.meta}
        </span>
      </div>

      {/* COL 3: Helpfulness bar — hidden at 980px */}
      <div className="max-[980px]:hidden">
        <HcHelpfulBar helpful={article.helpful} />
      </div>

      {/* COL 4: Modified + author — hidden at 980px */}
      <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] max-[980px]:hidden">
        {article.modified.date}
        <span className="block text-[9.5px] font-bold text-[var(--ink)] tracking-[0.02em] mt-[2px]">
          {article.modified.author}
        </span>
      </div>

      {/* COL 5: Status pill */}
      <div className="grid place-items-center">
        <HcStatusPill status={article.status} label={article.statusLabel} />
      </div>
    </div>
  );
}
