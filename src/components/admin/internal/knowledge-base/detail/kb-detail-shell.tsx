/* admin.html lines 66714-67072: full DETAIL view orchestrator
   Pass B: breadcrumb + hero + verify-banner + stats
   Pass C: + fr-main (Section 01 Frontmatter + Section 02 Markdown body)
            Reuses Step 33 HcSectionHead + HcFrontmatterCard + HcMarkdownCard via cross-step imports
   Pass D will fill fr-rail (preview card + linked cases + revision history) */

import type { KbDetailData } from '@/lib/mock-data/admin/knowledge-base-data';
import { KbBreadcrumb } from './kb-breadcrumb';
import { KbDetailHeroCard } from './kb-detail-hero';
import { KbVerifyBanner } from './kb-verify-banner';
import { KbDetailStats } from './kb-detail-stats';
import { HcSectionHead } from '@/components/admin/platform/help-content/detail/hc-section-head';
import { HcFrontmatterCard } from '@/components/admin/platform/help-content/detail/hc-frontmatter-card';
import { HcMarkdownCard } from '@/components/admin/platform/help-content/detail/hc-markdown-card';
import { KbDetailRail } from './kb-detail-rail';

interface KbDetailShellProps {
  detail: KbDetailData;
}

const FR_SECTION_CLASSES =
  'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function KbDetailShell({ detail }: KbDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <KbBreadcrumb items={detail.breadcrumb} />
      <KbDetailHeroCard hero={detail.hero} />
      <KbVerifyBanner banner={detail.verifyBanner} />
      <KbDetailStats stats={detail.detailStats} />

      {/* fr-body 2-col — fr-main filled in Pass C, fr-rail stub for Pass D */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        <div className="flex flex-col gap-[16px]">
          <section className={FR_SECTION_CLASSES}>
            <HcSectionHead head={detail.frontmatter.sectionHead} />
            <HcFrontmatterCard frontmatter={detail.frontmatter} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <HcSectionHead head={detail.markdownBody.sectionHead} />
            <HcMarkdownCard markdown={detail.markdownBody} />
          </section>
        </div>

        <KbDetailRail
          preview={detail.previewCard}
          categorization={detail.categorization}
        />
      </div>
    </div>
  );
}
