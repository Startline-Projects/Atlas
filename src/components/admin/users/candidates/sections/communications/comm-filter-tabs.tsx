'use client';

import { useState } from 'react';
import type { CommunicationThread } from '@/lib/mock-data/admin/candidate-profiles-data';
import { AVATAR_GRADIENTS } from '@/lib/mock-data/admin/candidate-profiles-data';
import { cn } from '@/lib/utils/cn';

interface CommunicationFilterTabsProps {
  threads: CommunicationThread[];
  totalCaption?: string;
}

type FilterType = 'all' | 'specialist' | 'clients' | 'admin';

export function CommunicationFilterTabs({ threads, totalCaption }: CommunicationFilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredThreads =
    activeFilter === 'all'
      ? threads
      : threads.filter(t => {
          if (activeFilter === 'specialist') return t.role === 'specialist';
          if (activeFilter === 'clients') return t.role === 'client';
          if (activeFilter === 'admin') return t.role === 'admin';
          return true;
        });

  const counts = {
    all: threads.length,
    specialist: threads.filter(t => t.role === 'specialist').length,
    clients: threads.filter(t => t.role === 'client').length,
    admin: threads.filter(t => t.role === 'admin').length,
  };

  return (
    <>
      {/* Filter Row */}
      <div className="flex items-center gap-[8px] mb-[14px] flex-wrap">
        {/* ALL */}
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={cn(
            'inline-flex items-center gap-[6px] py-[7px] pl-[14px] pr-[12px]',
            'font-body text-[12.5px] bg-[var(--paper)]',
            'border border-[var(--line)] rounded-full',
            'text-[var(--ink-soft)] cursor-pointer whitespace-nowrap',
            'transition-all duration-[150ms] ease',
            activeFilter === 'all'
              ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
              : 'hover:border-[var(--ink-mute)] hover:text-[var(--ink)]'
          )}
        >
          All <span className="font-semibold">{counts.all}</span>
        </button>

        {/* WITH SPECIALIST */}
        <button
          type="button"
          onClick={() => setActiveFilter('specialist')}
          className={cn(
            'inline-flex items-center gap-[6px] py-[7px] pl-[14px] pr-[12px]',
            'font-body text-[12.5px] bg-[var(--paper)]',
            'border border-[var(--line)] rounded-full',
            'text-[var(--ink-soft)] cursor-pointer whitespace-nowrap',
            'transition-all duration-[150ms] ease',
            activeFilter === 'specialist'
              ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
              : 'hover:border-[var(--ink-mute)] hover:text-[var(--ink)]'
          )}
        >
          With Specialist
        </button>

        {/* WITH CLIENTS */}
        <button
          type="button"
          onClick={() => setActiveFilter('clients')}
          className={cn(
            'inline-flex items-center gap-[6px] py-[7px] pl-[14px] pr-[12px]',
            'font-body text-[12.5px] bg-[var(--paper)]',
            'border border-[var(--line)] rounded-full',
            'text-[var(--ink-soft)] cursor-pointer whitespace-nowrap',
            'transition-all duration-[150ms] ease',
            activeFilter === 'clients'
              ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
              : 'hover:border-[var(--ink-mute)] hover:text-[var(--ink)]'
          )}
        >
          With clients
        </button>

        {/* ADMIN NOTES */}
        <button
          type="button"
          onClick={() => setActiveFilter('admin')}
          className={cn(
            'inline-flex items-center gap-[6px] py-[7px] pl-[14px] pr-[12px]',
            'font-body text-[12.5px] bg-[var(--paper)]',
            'border border-[var(--line)] rounded-full',
            'text-[var(--ink-soft)] cursor-pointer whitespace-nowrap',
            'transition-all duration-[150ms] ease',
            activeFilter === 'admin'
              ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
              : 'hover:border-[var(--ink-mute)] hover:text-[var(--ink)]'
          )}
        >
          Admin notes
        </button>

        {/* TOTAL CAPTION (right-aligned) */}
        {totalCaption && (
          <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] ml-auto">
            {totalCaption}
          </span>
        )}
      </div>

      {/* Communications List */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {filteredThreads.map(thread => (
          <div
            key={thread.threadId}
            className="grid gap-[14px] px-[18px] py-[14px] border-b border-dashed border-[var(--line-soft)] cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] last:border-b-0"
            style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}
          >
            {/* Avatar */}
            <div
              className="w-[36px] h-[36px] rounded-full grid place-items-center font-display text-[13px] font-medium text-white flex-shrink-0"
              style={{ background: AVATAR_GRADIENTS[thread.avatar] }}
              aria-hidden="true"
            >
              {thread.initials}
            </div>

            {/* Body: Head + Preview */}
            <div className="min-w-0">
              {/* Head: Name + Role + Time */}
              <div className="flex items-baseline justify-between gap-[8px] mb-[3px]">
                <div className="flex items-baseline gap-[4px]">
                  <span className="text-[13px] font-semibold text-[var(--ink)]">
                    {thread.name}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[9.5px] tracking-[0.12em] uppercase',
                      'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
                      'px-[6px] py-[1px] rounded-[3px]',
                      'font-semibold whitespace-nowrap flex-shrink-0',
                      '[vertical-align:1px]'
                    )}
                  >
                    {thread.role === 'specialist' && 'Specialist'}
                    {thread.role === 'client' && 'Client'}
                    {thread.role === 'admin' && 'Admin'}
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
                  {thread.time}
                </span>
              </div>

              {/* Preview (2-line clamp) */}
              <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.45] line-clamp-2">
                {thread.lastMessage}
              </div>
            </div>

            {/* Meta: Message count + Unread dot */}
            <div className="flex flex-col gap-[4px] items-end flex-shrink-0">
              <span className="font-mono text-[10px] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[7px] py-[2px] rounded-full font-semibold tracking-[0.02em]">
                {thread.messageCount}
              </span>
              {thread.unread && (
                <span
                  className="w-[7px] h-[7px] rounded-full bg-[var(--lime-deep)]"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
