'use client';

import { useState } from 'react';
import { pendingRefunds } from '@/lib/mock-data/admin/refunds-data';
import { RefundPendingCard } from './refund-pending-card';

const filterChips = [
  { id: 'all', label: 'All', count: '4' },
  { id: 'dispute', label: 'Dispute', count: '1' },
  { id: 'quality', label: 'Quality', count: '1' },
  { id: 'cancellation', label: 'Cancel', count: '1' },
  { id: 'fraud', label: 'Fraud', count: '1' },
];

export function RefundsPendingList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? pendingRefunds
    : pendingRefunds.filter((r) => r.reasonChip === activeFilter);

  return (
    <section className="mb-[28px]">
      {/* Section header */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            Pending refunds
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            awaiting admin approval · 48h SLA from request · ordered by time pending
          </div>
        </div>
        <div className="inline-flex gap-[6px] flex-wrap">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id)}
                className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] font-medium border rounded-full cursor-pointer tracking-[-0.005em] transition-all ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                    : 'bg-[var(--paper-deep)] text-[var(--ink-mute)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                }`}
              >
                {chip.label}
                <span
                  className={`font-mono text-[9.5px] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] ${
                    isActive
                      ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]'
                      : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending cards list */}
      <div className="flex flex-col gap-[14px]">
        {filtered.map((refund) => (
          <RefundPendingCard key={refund.id} refund={refund} />
        ))}
      </div>
    </section>
  );
}
