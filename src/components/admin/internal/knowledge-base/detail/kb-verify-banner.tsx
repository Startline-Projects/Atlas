'use client';

/* admin.html lines 66758-66772 + CSS 31715-31776: UNIQUE verification banner widget
   3 variants by freshness: fresh (success) / aging (amber) / stale (danger)
   gradient bg + colored icon circle + eyebrow + h3 + meta + action button */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  KbVerifyBannerData,
  KbVerifyBannerVariant,
} from '@/lib/mock-data/admin/knowledge-base-data';

interface KbVerifyBannerProps {
  banner: KbVerifyBannerData;
}

const bannerClasses: Record<KbVerifyBannerVariant, string> = {
  fresh:
    'bg-[linear-gradient(135deg,var(--success-bg),var(--paper))] border-[rgba(46,125,84,0.3)]',
  aging:
    'bg-[linear-gradient(135deg,var(--amber-bg),var(--paper))] border-[rgba(232,118,58,0.3)]',
  stale:
    'bg-[linear-gradient(135deg,var(--danger-bg),var(--paper))] border-[rgba(194,65,43,0.35)]',
};

const iconBg: Record<KbVerifyBannerVariant, string> = {
  fresh: 'bg-[var(--success)]',
  aging: 'bg-[var(--amber)]',
  stale: 'bg-[var(--danger)]',
};

const eyebrowColor: Record<KbVerifyBannerVariant, string> = {
  fresh: 'text-[var(--success)]',
  aging: 'text-[var(--amber)]',
  stale: 'text-[var(--danger)]',
};

export function KbVerifyBanner({ banner }: KbVerifyBannerProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div
      className={`flex items-center gap-[14px] py-[14px] px-[18px] border rounded-[var(--r-md)] mb-[18px] ${bannerClasses[banner.variant]}`}
    >
      <div
        className={`w-[36px] h-[36px] rounded-full text-[var(--paper)] grid place-items-center flex-shrink-0 ${iconBg[banner.variant]}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`font-mono text-[9px] tracking-[0.16em] uppercase font-bold mb-[3px] ${eyebrowColor[banner.variant]}`}
        >
          {banner.eyebrow}
        </div>
        <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[2px] leading-[1.25]">
          {banner.h3Title}
        </h3>
        <div
          className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: banner.metaHtml }}
        />
      </div>
      <div className="inline-flex gap-[6px] flex-shrink-0">
        <button
          type="button"
          onClick={() => showAction(`${banner.actionLabel} — opening verification workflow`)}
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {banner.actionLabel}
        </button>
      </div>
    </div>
  );
}
