'use client';

import { RefundsPageHeader } from './refunds-page-header';
import { RefundsSectionNav } from './refunds-section-nav';
import { RefundsStatsStrip } from './refunds-stats-strip';
import { RefundsPendingList } from './refunds-pending-list';
import { RefundsIssuedTable } from './refunds-issued-table';
import { RefundsManualForm } from './refunds-manual-form';
import { RefundAnalyticsGrid } from './refund-analytics-grid';
import { RefundInsights } from './refund-insights';
import { refundsSectionNav } from '@/lib/mock-data/admin/refunds-data';

export function RefundsShell() {
  return (
    <div className="max-w-[1320px] mx-auto pt-[28px] px-[32px] pb-[64px] max-[720px]:pt-[22px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <RefundsPageHeader />

      {/* Section navigation */}
      <RefundsSectionNav sections={refundsSectionNav} />

      {/* Stats strip */}
      <RefundsStatsStrip />

      {/* Section 1: Pending Queue */}
      <section className="mb-[28px]" id="pending">
        <RefundsPendingList />
      </section>

      {/* Section 2: Recently Issued */}
      <section className="mb-[28px]" id="issued">
        <RefundsIssuedTable />
      </section>

      {/* Section 3: Manual Refund */}
      <section className="mb-[28px]" id="manual">
        <RefundsManualForm />
      </section>

      {/* Section 4: Analytics */}
      <section className="mb-[28px]" id="analytics">
        <RefundAnalyticsGrid />
        <RefundInsights />
      </section>
    </div>
  );
}