/**
 * Phase 14a — Reports & Analytics top-level shell.
 *
 * Holds activeTab + activeDateRange state.
 * admin.html markup: L38007-39163 (this phase: L38007-38309 = Tab 1 only)
 */
'use client';

import { useState } from 'react';
import { ReportsPageHeader } from './reports-page-header';
import { ReportsTabs } from './reports-tabs';
import { ReportsTabPlatform } from './tabs/reports-tab-platform';
import { ReportsTabTrustSafety } from './tabs/reports-tab-trust-safety';
import { ReportsTabPerformance } from './tabs/reports-tab-performance';
import { ReportsTabFinancial } from './tabs/reports-tab-financial';
import { ReportsTabCompliance } from './tabs/reports-tab-compliance';
import { ReportsCustomBuilderEl } from './reports-custom-builder';
import type {
  ReportsAnalyticsData,
  ReportsTabKey,
  ReportsDateRangeKey,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsAnalyticsShellProps {
  data: ReportsAnalyticsData;
}

export function ReportsAnalyticsShell({ data }: ReportsAnalyticsShellProps) {
  const [activeTab, setActiveTab] = useState<ReportsTabKey>(data.tabActive);
  const [activeDateRange, setActiveDateRange] = useState<ReportsDateRangeKey>(data.dateRangeActive);

  return (
    // rep-wrap — L14102-14107 — max-w 1320 (not 1400)
    <div className="w-full mx-auto max-w-[1320px] pt-[28px] px-[32px] pb-[64px] max-[720px]:pt-[22px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <ReportsPageHeader
        pageMeta={data.pageMeta}
        options={data.dateRangeOptions}
        active={activeDateRange}
        onChange={setActiveDateRange}
      />
      <ReportsTabs tabs={data.tabs} active={activeTab} onChange={setActiveTab} />

      {/* Tab content — conditional render across all 5 tabs. */}
      {activeTab === 'platform' && <ReportsTabPlatform data={data.platform} />}
      {activeTab === 'trust-safety' && <ReportsTabTrustSafety data={data.trustSafety} />}
      {activeTab === 'performance' && <ReportsTabPerformance data={data.performance} />}
      {activeTab === 'financial' && <ReportsTabFinancial data={data.financial} />}
      {activeTab === 'compliance' && <ReportsTabCompliance data={data.compliance} />}

      {/* Custom Report Builder — sibling of all tab content per admin.html L38842. Visible regardless of active tab. */}
      <ReportsCustomBuilderEl data={data.customBuilder} />
    </div>
  );
}
