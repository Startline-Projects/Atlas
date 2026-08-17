import Link from 'next/link';
import type { TxDetailProfile } from '@/lib/mock-data/admin/transactions-data';
import { TransactionsHero } from './transactions-hero';
import { TransactionsRail } from './transactions-rail';
import { TxMoneyFlowDiagram } from './sections/tx-money-flow-diagram';
import { TxProcessorCard } from './sections/tx-processor-card';
import { TxErrorCard } from './sections/tx-error-card';
import { TxAuditList } from './sections/tx-audit-list';
import { TxRefundDrawer } from './sections/tx-refund-drawer';

interface TransactionsDetailShellProps {
  profile: TxDetailProfile;
}

export function TransactionsDetailShell({ profile }: TransactionsDetailShellProps) {
  const statusFilterLabel =
    profile.status === 'failed'
      ? 'Failed'
      : profile.status === 'refunded'
        ? 'Refunded'
        : profile.status === 'pending'
          ? 'Pending'
          : profile.status === 'processing'
            ? 'Processing'
            : 'Completed';

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-mute)] mb-[18px] flex-wrap">
        <Link href="/admin/finance/transactions" className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]">
          Transactions
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <Link href="/admin/finance/transactions" className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]">
          {statusFilterLabel}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">{profile.breadcrumbCurrent}</span>
      </div>

      <TransactionsHero profile={profile} />

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] max-[1100px]:grid-cols-1 gap-[24px] items-start">
        <main className="min-w-0">
          {/* Error card (above sections, only if error) */}
          {profile.error && <TxErrorCard error={profile.error} />}

          {/* Refund drawer (showcase piece — above numbered sections) */}
          {profile.refundDrawer && <TxRefundDrawer drawer={profile.refundDrawer} />}

          {/* §01 Money flow */}
          <TxMoneyFlowDiagram
            sectionNum="01"
            meta={profile.flowSectionMeta}
            nodes={profile.flowNodes}
            arrows={profile.flowArrows}
            settlement={profile.settlementBreakdown}
          />

          {/* §02 Processor references */}
          <TxProcessorCard
            sectionNum="02"
            meta={profile.processorSectionMeta}
            processors={profile.processors}
          />

          {/* §03 Audit trail */}
          <TxAuditList
            sectionNum="03"
            meta={profile.auditSectionMeta}
            entries={profile.audit}
          />
        </main>

        <TransactionsRail profile={profile} />
      </div>
    </div>
  );
}
