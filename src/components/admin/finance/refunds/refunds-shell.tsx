'use client';

import { RefundsPageHeader } from './refunds-page-header';
import { RefundsSectionNav } from './refunds-section-nav';
import { RefundsStatsStrip } from './refunds-stats-strip';
import { RefundsPendingList } from './refunds-pending-list';
import { RefundsIssuedTable } from './refunds-issued-table';
import { refundsSectionNav } from '@/lib/mock-data/admin/refunds-data';

export function RefundsShell() {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Page header */}
      <RefundsPageHeader />

      {/* Main content wrapper */}
      <div className="flex-1 overflow-y-auto p-[22px_28px]">
        <div className="max-w-full mx-auto">
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

          {/* Section 3: Manual Refund (Pass B) */}
          <section className="mb-[28px]" id="manual">
            <div className="flex items-end justify-between gap-3.5 flex-wrap mb-3.5 pb-3 border-b border-[var(--line)]">
              <div>
                <h2 className="font-display text-[22px] font-medium letter-spacing-[-0.02em] mb-1 text-[var(--ink)]">
                  Manual refund
                </h2>
                <div className="font-mono text-[10.5px] text-[var(--ink-mute)] letter-spacing-[0.04em]">
                  coming in Pass B
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Analytics (Pass B) */}
          <section className="mb-[28px]" id="analytics">
            <div className="flex items-end justify-between gap-3.5 flex-wrap mb-3.5 pb-3 border-b border-[var(--line)]">
              <div>
                <h2 className="font-display text-[22px] font-medium letter-spacing-[-0.02em] mb-1 text-[var(--ink)]">
                  Analytics
                </h2>
                <div className="font-mono text-[10.5px] text-[var(--ink-mute)] letter-spacing-[0.04em]">
                  coming in Pass B
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}