'use client';

import { useState, useMemo } from 'react';
import type { JobProfile, InterestCandidate, InterestStatus } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobSubInterestProps {
  job: JobProfile;
}

type TabKey = 'all' | 'reviewed' | 'pending';

function statusChipClass(status: InterestStatus): string {
  switch (status) {
    case 'reviewed': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'pending': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'shortlisted': return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'passed': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] line-through';
  }
}

function statusChipLabel(status: InterestStatus): string {
  switch (status) {
    case 'reviewed': return 'Reviewed';
    case 'pending': return 'Pending';
    case 'shortlisted': return 'Shortlisted';
    case 'passed': return 'Passed';
  }
}

function InterestRow({ c }: { c: InterestCandidate }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-[10px] items-center py-[11px] px-[18px] border-b border-dashed border-[var(--line-soft)] border-r border-r-dashed border-r-[var(--line-soft)] text-[12.5px] [&:nth-child(2n)]:border-r-0 max-[720px]:border-r-0">
      <div
        aria-hidden="true"
        className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
        style={{ background: c.avatarGradient }}
      >
        {c.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
          {c.name}
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
          {c.meta}
        </div>
      </div>
      <span className="font-mono text-[11px] font-semibold text-[var(--ink-soft)] tracking-[0.02em] [font-variant-numeric:tabular-nums] whitespace-nowrap">
        {c.score === null ? '— / 100' : `${c.score} / 100`}
      </span>
      <span
        className={cn(
          'font-mono text-[8.5px] tracking-[0.12em] uppercase font-semibold py-[2px] px-[7px] rounded-[3px] whitespace-nowrap',
          statusChipClass(c.status)
        )}
      >
        {statusChipLabel(c.status)}
      </span>
    </div>
  );
}

export function JobSubInterest({ job }: JobSubInterestProps) {
  const { otherInterest } = job;
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return otherInterest.candidates;
    return otherInterest.candidates.filter((c) => c.status === activeTab);
  }, [otherInterest.candidates, activeTab]);

  const handleOpenList = () => {
    // eslint-disable-next-line no-console
    console.log(`[job-interest] full-list clicked for ${job.id}`);
  };

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: otherInterest.totalCount },
    { key: 'reviewed', label: 'Reviewed', count: otherInterest.reviewedCount },
    { key: 'pending', label: 'Pending', count: otherInterest.pendingCount },
  ];

  return (
    <section
      id="job-section-interest"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 05
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Other candidates · {otherInterest.totalCount} expressed interest
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {otherInterest.reviewedCount} reviewed · {otherInterest.pendingCount} pending
        </span>
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium">{otherInterest.title}</div>
          <div className="inline-flex gap-[6px]">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  data-job-interest-tab={tab.key}
                  className={cn(
                    'inline-flex items-center gap-[5px] font-mono text-[10.5px] tracking-[0.04em] py-[5px] px-[10px] border rounded-full cursor-pointer transition-[background,color] duration-[120ms] ease',
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                      : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]'
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      'text-[9px] py-[1px] px-[5px] rounded-full tracking-[0.04em]',
                      isActive
                        ? 'bg-[rgba(255,255,255,0.18)]'
                        : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 max-[720px]:grid-cols-1">
          {filtered.map((c) => (
            <InterestRow key={c.candidateId} c={c} />
          ))}
        </div>

        <div className="py-[12px] px-[18px] border-t border-[var(--line)] bg-[var(--paper-deep)] flex items-center justify-between flex-wrap gap-[8px]">
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {otherInterest.footerLabel}
          </span>
          <button
            type="button"
            onClick={handleOpenList}
            data-job-action="full-interest-list"
            className="inline-flex items-center gap-[6px] py-[6px] px-[12px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-soft)] bg-[var(--paper)] border border-[var(--line)] rounded-full cursor-pointer transition-colors duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            {otherInterest.fullListLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
