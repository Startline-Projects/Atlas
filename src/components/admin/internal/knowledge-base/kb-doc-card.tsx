'use client';

/* admin.html lines 66298-66694 + CSS 31544-31680: single doc row card
   6-col grid (title-block / views / verified / modified / status / trailing) — collapses to 2-col at 980px
   Row-tint variants: default / stale (amber) / draft (super lighter) / critical-stale (danger) */

import { useRouter } from 'next/navigation';
import type {
  KbDocRow,
  KbDocVariant,
} from '@/lib/mock-data/admin/knowledge-base-data';
import { KbTag } from './kb-tag';
import { KbVerifiedDot } from './kb-verified-dot';
import { KbStatusPill } from './kb-status-pill';

interface KbDocCardProps {
  doc: KbDocRow;
}

const cardBg: Record<KbDocVariant, string> = {
  default: 'bg-[var(--paper)] border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)]',
  stale: 'bg-[rgba(232,118,58,0.04)] border-[rgba(232,118,58,0.22)] hover:border-[rgba(232,118,58,0.4)] hover:bg-[rgba(232,118,58,0.07)]',
  draft: 'bg-[rgba(110,63,224,0.03)] border-[rgba(110,63,224,0.18)] hover:border-[rgba(110,63,224,0.35)] hover:bg-[rgba(110,63,224,0.06)]',
  'critical-stale': 'bg-[rgba(194,65,43,0.04)] border-[rgba(194,65,43,0.25)] hover:border-[rgba(194,65,43,0.45)] hover:bg-[rgba(194,65,43,0.07)]',
};

export function KbDocCard({ doc }: KbDocCardProps) {
  const router = useRouter();
  const navigate = () =>
    router.push(`/admin/internal/knowledge-base/${doc.id}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      aria-label={`Open document ${doc.title}`}
      className={`grid grid-cols-[minmax(0,1fr)_140px_130px_110px_90px_30px] gap-[14px] items-center py-[14px] px-[18px] border rounded-[var(--r-md)] cursor-pointer transition-colors max-[980px]:grid-cols-[minmax(0,1fr)_auto] ${cardBg[doc.variant]}`}
    >
      {/* Title block */}
      <div className="min-w-0">
        <div className="flex items-center gap-[6px] flex-wrap mb-[4px] text-[14px] font-bold text-[var(--ink)] tracking-[-0.01em] leading-[1.3]">
          {doc.badge && (
            <span
              className={
                doc.badge === '★'
                  ? 'text-[var(--amber)]'
                  : 'text-[var(--danger)]'
              }
              aria-hidden
            >
              {doc.badge}
            </span>
          )}
          <span>{doc.title}</span>
          <span className="flex gap-[4px] flex-wrap">
            {doc.tags.map((tag, idx) => (
              <KbTag key={idx} label={tag.label} variant={tag.variant} />
            ))}
          </span>
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] font-medium">
          {doc.slug}
        </div>
      </div>

      {/* Views col */}
      <div className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums max-[980px]:hidden">
        {doc.views}
        <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {doc.viewsMeta}
        </span>
      </div>

      {/* Verified-block col */}
      <div className="max-[980px]:hidden">
        <div className="font-mono text-[11.5px] font-bold text-[var(--ink)] tracking-[0.02em] flex items-center gap-[6px]">
          <KbVerifiedDot variant={doc.verifiedDot} />
          {doc.verifiedDate}
        </div>
        <div className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] pl-[14px] font-mono">
          {doc.verifiedMeta}
        </div>
      </div>

      {/* Modified col */}
      <div className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] max-[980px]:hidden">
        {doc.modifiedDate}
        <span className="block text-[9.5px] font-bold text-[var(--ink)] tracking-[0.02em] mt-[2px]">
          {doc.modifiedAuthor}
        </span>
      </div>

      {/* Status col */}
      <div className="grid place-items-center">
        <KbStatusPill variant={doc.statusVariant} label={doc.statusLabel} />
      </div>

      {/* Trailing reserved col (matches admin.html 6-col grid; markup leaves it empty) */}
      <div className="max-[980px]:hidden" aria-hidden />
    </div>
  );
}
