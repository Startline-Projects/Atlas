/* admin.html lines 65129-65491: full DETAIL view orchestrator
   Pass C: breadcrumb + hero + stats + fr-main (timeline + PM + action items)
   Pass D will fill fr-rail (commander + responders + related + SLO) */

import type { IcDetailData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcBreadcrumb } from './ic-breadcrumb';
import { IcDetailHeroCard } from './ic-detail-hero';
import { IcDetailStats } from './ic-detail-stats';
import { IcSectionHead } from './ic-section-head';
import { IcTimelineCard } from './ic-timeline-card';
import { IcPostmortemCard } from './ic-postmortem-card';
import { IcActionItemsCard } from './ic-action-items-card';
import { IcDetailRail } from './ic-detail-rail';

interface IcDetailShellProps {
  detail: IcDetailData;
}

const FR_SECTION_CLASSES =
  'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function IcDetailShell({ detail }: IcDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <IcBreadcrumb items={detail.breadcrumb} />
      <IcDetailHeroCard hero={detail.hero} />
      <IcDetailStats stats={detail.detailStats} />

      {/* fr-body 2-col — fr-main + fr-rail (sticky) */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        <div className="flex flex-col gap-[16px]">
          <section className={FR_SECTION_CLASSES}>
            <IcSectionHead head={detail.timeline.sectionHead} />
            <IcTimelineCard data={detail.timeline} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <IcSectionHead head={detail.postmortem.sectionHead} />
            <IcPostmortemCard data={detail.postmortem} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <IcSectionHead head={detail.actionItems.sectionHead} />
            <IcActionItemsCard data={detail.actionItems} />
          </section>
        </div>

        <IcDetailRail
          commander={detail.commander}
          responders={detail.responders}
          relatedLinks={detail.relatedLinks}
          sloSnapshot={detail.sloSnapshot}
        />
      </div>
    </div>
  );
}
