'use client';

import { useState } from 'react';
import type { EngagementItem } from '@/lib/mock-data/admin/candidate-profiles-data';

interface EngagementsTabsProps {
  activeItems: EngagementItem[];
  pastItems: EngagementItem[];
}

export function EngagementsTabs({ activeItems, pastItems }: EngagementsTabsProps) {
  const [tab, setTab] = useState<'active' | 'past'>('active');
  const items = tab === 'active' ? activeItems : pastItems;

  return (
    <>
      {/* Tab buttons */}
      <div className="flex gap-0 border-b border-[var(--line)] mt-[20px] mb-[14px]">
        <button
          type="button"
          onClick={() => setTab('active')}
          className={`px-[16px] py-[10px] font-body text-[12.5px] font-medium bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px] ${
            tab === 'active'
              ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
              : 'text-[var(--ink-mute)] border-b-transparent hover:text-[var(--ink)]'
          }`}
        >
          Active{' '}
          <span className={`font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold ${tab === 'active' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'}`}>
            {activeItems.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab('past')}
          className={`px-[16px] py-[10px] font-body text-[12.5px] font-medium bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px] ${
            tab === 'past'
              ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
              : 'text-[var(--ink-mute)] border-b-transparent hover:text-[var(--ink)]'
          }`}
        >
          Past{' '}
          <span className={`font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold ${tab === 'past' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'}`}>
            {pastItems.length}
          </span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[20px]">
        <div className="grid gap-[12px] items-center p-[10px_16px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold max-[880px]:grid-cols-[1fr_auto] max-[880px]:gap-[6px]" style={{ gridTemplateColumns: '2fr 1.4fr 0.8fr 0.8fr 1fr 1fr 28px' }}>
          <div>Client</div>
          <div>Role</div>
          <div>Rate</div>
          <div>Hrs/wk</div>
          <div>Started</div>
          <div>Total paid</div>
          <div></div>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="grid gap-[12px] items-center p-[10px_16px] border-b border-dashed border-[var(--line-soft)] text-[12.5px] cursor-pointer transition-all duration-[120ms] ease hover:bg-[#FCF9F1] last:border-b-0 max-[880px]:grid-cols-[1fr_auto] max-[880px]:gap-[6px]" style={{ gridTemplateColumns: '2fr 1.4fr 0.8fr 0.8fr 1fr 1fr 28px' }}>
            <div className="font-semibold text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">{item.client}</div>
            <div className="text-[var(--ink-soft)] whitespace-nowrap overflow-hidden text-ellipsis max-[880px]:hidden">{item.role}</div>
            <div className="font-mono text-[11.5px] text-[var(--ink)] tracking-[0.02em] max-[880px]:hidden">{item.rate}</div>
            <div className="font-mono text-[11.5px] text-[var(--ink)] tracking-[0.02em] max-[880px]:hidden">{item.hoursPerWeek}</div>
            <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
              {item.startDate}
              {item.endDate && <div className="text-[10px] text-[var(--ink-mute)]">to {item.endDate}</div>}
            </div>
            <div className="font-mono text-[11.5px] text-[var(--ink)] font-semibold tracking-[0.02em]">{item.totalPaid}</div>
            <div>
              <button type="button" className="p-[4px] hover:text-[var(--ink)]" aria-label="Row actions">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
