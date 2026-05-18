/* admin.html lines 61953-62380: full Stripe-canonical detail view
   Each main-column section wraps head + content card in fr-section
   (bg-paper + border + rounded-md + padding 20/24).
   Inside fr-section: IntSectionHead (with dashed bottom-border) +
   nested content card (in-config-card / in-event-log / etc).
   Pass C will populate fr-rail (right column) */

import { IntBreadcrumb } from './int-breadcrumb';
import { IntDetailHero } from './int-detail-hero';
import { IntDetailStats } from './int-detail-stats';
import { IntSectionHead } from './int-section-head';
import { IntConfigCard } from './int-config-card';
import { IntTestGrid } from './int-test-grid';
import { IntEventLog } from './int-event-log';
import { IntLinkedFeatures } from './int-linked-features';
import { IntDetailRail } from './int-detail-rail';
import type { IntDetailData } from '@/lib/mock-data/admin/integrations-data';

interface IntDetailShellProps {
  detail: IntDetailData;
  name: string;
}

const FR_SECTION_CLASSES = 'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function IntDetailShell({ detail, name }: IntDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <IntBreadcrumb items={detail.breadcrumb} />
      <IntDetailHero hero={detail.hero} name={name} />
      <IntDetailStats stats={detail.detailStats} />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        <div className="flex flex-col gap-[16px]">
          <section className={FR_SECTION_CLASSES}>
            <IntSectionHead head={detail.configHead} />
            <IntConfigCard rows={detail.configRows} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <IntSectionHead head={detail.testHead} />
            <IntTestGrid cells={detail.testCells} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <IntSectionHead head={detail.eventsHead} />
            <IntEventLog
              headTitle={detail.eventLogHeadTitle}
              headMeta={detail.eventLogHeadMeta}
              events={detail.events}
            />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <IntSectionHead head={detail.linkedHead} />
            <IntLinkedFeatures features={detail.linkedFeatures} />
          </section>
        </div>

        <IntDetailRail rail={detail.rail} />
      </div>
    </div>
  );
}
