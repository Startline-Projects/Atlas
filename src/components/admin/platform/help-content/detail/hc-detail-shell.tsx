/* admin.html lines 63663-63992: full How-to-schedule-vetting-call canonical detail view.
   Pass B: breadcrumb + hero + detail-stats.
   Pass C: fr-main 2 fr-section cards — Frontmatter + Markdown editor with syntax highlighting.
   Pass D will populate fr-rail (public preview + categorization + related). */

import { HcBreadcrumb } from './hc-breadcrumb';
import { HcDetailHero } from './hc-detail-hero';
import { HcDetailStats } from './hc-detail-stats';
import { HcSectionHead } from './hc-section-head';
import { HcFrontmatterCard } from './hc-frontmatter-card';
import { HcMarkdownCard } from './hc-markdown-card';
import { HcDetailRail } from './hc-detail-rail';
import type { HcDetailData } from '@/lib/mock-data/admin/help-content-data';

interface HcDetailShellProps {
  detail: HcDetailData;
}

const FR_SECTION_CLASSES = 'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function HcDetailShell({ detail }: HcDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <HcBreadcrumb items={detail.breadcrumb} />
      <HcDetailHero hero={detail.hero} />
      <HcDetailStats stats={detail.detailStats} />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        {/* LEFT — main: frontmatter + markdown sections */}
        <div className="flex flex-col gap-[16px]">
          <section className={FR_SECTION_CLASSES}>
            <HcSectionHead head={detail.frontmatter.sectionHead} />
            <HcFrontmatterCard frontmatter={detail.frontmatter} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <HcSectionHead head={detail.markdown.sectionHead} />
            <HcMarkdownCard markdown={detail.markdown} />
          </section>
        </div>

        {/* RIGHT — rail with public preview + categorization */}
        <HcDetailRail preview={detail.preview} categorization={detail.categorization} />
      </div>
    </div>
  );
}
