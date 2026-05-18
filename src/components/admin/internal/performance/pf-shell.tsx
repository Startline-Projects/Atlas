'use client';

/* Step 34 Performance Dashboards shell — header with period selector + stats strip + sections 01-02 (Pass B); 03-04 placeholder for Pass C/D */

import { useState } from 'react';
import { PfPageHeader } from './pf-page-header';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { PfSectionHeadComponent } from './pf-section-head';
import { PfManagerCard } from './pf-manager-card';
import { PfSpecialistTable } from './pf-specialist-table';
import { PfClusterGrid } from './pf-cluster-grid';
import { PfDeepDiveGrid } from './pf-deepdive-grid';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  PfPageMeta,
  PfPeriodTab,
  PfPeriodValue,
  PfHeaderAction,
  PfManagerData,
  PfSpecialistTableData,
  PfClusterGridData,
  PfDeepDiveGridData,
} from '@/lib/mock-data/admin/performance-data';

interface PfShellProps {
  meta: PfPageMeta;
  metaPulseHtml: string;
  periodTabs: PfPeriodTab[];
  actions: PfHeaderAction[];
  topStats: PrStat[];
  manager: PfManagerData;
  specialistTable: PfSpecialistTableData;
  clusterGrid: PfClusterGridData;
  deepDiveGrid: PfDeepDiveGridData;
}

const FR_SECTION_CLASSES =
  'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[18px]';

export function PfShell({
  meta,
  metaPulseHtml,
  periodTabs,
  actions,
  topStats,
  manager,
  specialistTable,
  clusterGrid,
  deepDiveGrid,
}: PfShellProps) {
  const initial = periodTabs.find((t) => t.active)?.value ?? 'q2';
  const [activePeriod, setActivePeriod] = useState<PfPeriodValue>(initial);

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <PfPageHeader
        title={meta.title}
        metaText={meta.metaText}
        metaPulseHtml={metaPulseHtml}
        periodTabs={periodTabs}
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      {/* Section 01 — Manager performance */}
      <section className={FR_SECTION_CLASSES}>
        <PfSectionHeadComponent head={manager.sectionHead} />
        <PfManagerCard manager={manager} />
      </section>

      {/* Section 02 — Specialist comparison */}
      <section className={FR_SECTION_CLASSES}>
        <PfSectionHeadComponent head={specialistTable.sectionHead} />
        <PfSpecialistTable data={specialistTable} />
      </section>

      {/* Section 03 — Cross-team metrics */}
      <section className={FR_SECTION_CLASSES}>
        <PfSectionHeadComponent head={clusterGrid.sectionHead} />
        <PfClusterGrid data={clusterGrid} />
      </section>

      {/* Section 04 — Specialist deep-dive */}
      <section className={FR_SECTION_CLASSES}>
        <PfSectionHeadComponent head={deepDiveGrid.sectionHead} />
        <PfDeepDiveGrid data={deepDiveGrid} />
      </section>
    </div>
  );
}
