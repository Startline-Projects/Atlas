'use client';

import { useState } from 'react';
import type { CommunicationThread } from '@/lib/mock-data/admin/candidate-profiles-data';
import { AVATAR_GRADIENTS } from '@/lib/mock-data/admin/candidate-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ClientCommFilterTabsProps {
  threads: CommunicationThread[];
  totalCaption?: string;
}

type FilterType = 'all' | 'specialist' | 'talent' | 'admin';

export function ClientCommFilterTabs({ threads, totalCaption }: ClientCommFilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filter predicate per tab (admin.html line 17804-17806 data-cl-comm-filter values)
  const filteredThreads =
    activeFilter === 'all'
      ? threads
      : threads.filter((t) => {
          if (activeFilter === 'specialist') return t.role === 'specialist';
          if (activeFilter === 'talent') return t.role === 'talent';
          if (activeFilter === 'admin') return t.role === 'admin';
          return true;
        });

  const counts = {
    all: threads.length,
    specialist: threads.filter((t) => t.role === 'specialist').length,
    talent: threads.filter((t) => t.role === 'talent').length,
    admin: threads.filter((t) => t.role === 'admin').length,
  };

  // admin.html line 4402-4437: .filter-chip default + .active variant
  const chipBase =
    'inline-flex items-center gap-[6px] py-[7px] pl-[14px] pr-[12px] font-body text-[12.5px] border rounded-full cursor-pointer whitespace-nowrap transition-all duration-[150ms] ease';
  const chipInactive =
    'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink-mute)] hover:text-[var(--ink)]';
  const chipActive = 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]';

  return (
    <>
      {/* admin.html line 17802: <div class="cd-comm-filter-row"> */}
      <div className="flex items-center gap-[8px] mb-[14px] flex-wrap">
        {/* admin.html line 17803: All chip with chip-value count */}
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={cn(chipBase, activeFilter === 'all' ? chipActive : chipInactive)}
        >
          All <span className="font-semibold">{counts.all}</span>
        </button>

        {/* admin.html line 17804: With Specialist */}
        <button
          type="button"
          onClick={() => setActiveFilter('specialist')}
          className={cn(chipBase, activeFilter === 'specialist' ? chipActive : chipInactive)}
        >
          With Specialist
        </button>

        {/* admin.html line 17805: With talent */}
        <button
          type="button"
          onClick={() => setActiveFilter('talent')}
          className={cn(chipBase, activeFilter === 'talent' ? chipActive : chipInactive)}
        >
          With talent
        </button>

        {/* admin.html line 17806: Admin notes */}
        <button
          type="button"
          onClick={() => setActiveFilter('admin')}
          className={cn(chipBase, activeFilter === 'admin' ? chipActive : chipInactive)}
        >
          Admin notes
        </button>

        {/* admin.html line 17807: <span class="total"> */}
        {totalCaption && (
          <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] ml-auto">
            {totalCaption}
          </span>
        )}
      </div>

      {/* admin.html line 17810: <div class="cd-comm-list"> */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {filteredThreads.length === 0 ? (
          <div className="px-[18px] py-[24px] text-center font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            No threads match this filter.
          </div>
        ) : (
          filteredThreads.map((thread) => (
            // admin.html line 17811: <div class="cd-comm-thread">
            <div
              key={thread.threadId}
              className="grid gap-[14px] px-[18px] py-[14px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
              style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}
            >
              {/* admin.html line 17812: <div class="thread-avatar av-N"> */}
              <div
                className="w-[36px] h-[36px] rounded-full grid place-items-center font-display text-[13px] font-medium text-white flex-shrink-0"
                style={{ background: AVATAR_GRADIENTS[thread.avatar] }}
                aria-hidden="true"
              >
                {thread.initials}
              </div>

              {/* admin.html line 17813: <div class="thread-body"> */}
              <div className="min-w-0">
                {/* admin.html line 17814: <div class="thread-head"> */}
                <div className="flex items-baseline justify-between gap-[8px] mb-[3px]">
                  <div className="flex items-baseline gap-[4px] min-w-0">
                    {/* admin.html line 17815: <div class="thread-name"> */}
                    <span className="text-[13px] font-semibold text-[var(--ink)] truncate">
                      {thread.name}
                    </span>
                    {/* admin.html line 17815 inner: <span class="thread-role"> */}
                    <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[1px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0 [vertical-align:1px]">
                      {thread.role === 'specialist' && 'Specialist'}
                      {thread.role === 'talent' && 'Talent'}
                      {thread.role === 'admin' && 'Admin'}
                      {thread.role === 'client' && 'Client'}
                    </span>
                  </div>
                  {/* admin.html line 17816: <div class="thread-time"> */}
                  <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
                    {thread.time}
                  </span>
                </div>
                {/* admin.html line 17818: <div class="thread-preview"> (2-line clamp) */}
                <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.45] line-clamp-2">
                  {thread.lastMessage}
                </div>
              </div>

              {/* admin.html line 17820: <div class="thread-meta"> */}
              <div className="flex flex-col gap-[4px] items-end flex-shrink-0">
                {/* admin.html line 17821: <span class="msg-count"> */}
                <span className="font-mono text-[10px] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[7px] py-[2px] rounded-full font-semibold tracking-[0.02em]">
                  {thread.messageCount}
                </span>
                {/* admin.html line 17822: <span class="unread-dot"> */}
                {thread.unread && (
                  <span
                    className="w-[7px] h-[7px] rounded-full bg-[var(--lime-deep)]"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
