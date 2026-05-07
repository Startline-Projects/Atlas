'use client';

import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { CommunicationFilterTabs } from './communications/comm-filter-tabs';
import { cn } from '@/lib/utils/cn';

interface ProfileSectionCommunicationsProps {
  profile: CandidateProfile;
}

export function ProfileSectionCommunications({ profile }: ProfileSectionCommunicationsProps) {
  return (
    <section
      id="cd-section-communications"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[16px]">
          <span className="font-display text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium">
            06 · 09
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--ink)]">Communications</h2>
        </div>
        <span className={cn(
          "inline-flex items-center gap-[6px]",
          "font-mono text-[10px] tracking-[0.14em] uppercase",
          "font-semibold px-[9px] py-[3px] rounded-full",
          "bg-[var(--success-bg)] text-[var(--success)]",
          "before:content-[''] before:w-[5px] before:h-[5px]",
          "before:rounded-full before:bg-[currentColor]"
        )}>
          {profile.communications.totalMessages} messages · {profile.communications.threads} threads
        </span>
      </div>

      {/* Filter Tabs and List */}
      {profile.communications.items.length > 0 ? (
        <CommunicationFilterTabs
          threads={profile.communications.items}
          {...(profile.communications.totalCaption && { totalCaption: profile.communications.totalCaption })}
        />
      ) : (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden py-[56px] px-[28px] text-center text-[13.5px] text-[var(--ink-mute)]">
          <div className="mb-[14px] text-[52px]">—</div>
          No communications yet
        </div>
      )}
    </section>
  );
}
