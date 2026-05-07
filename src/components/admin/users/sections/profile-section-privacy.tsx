'use client';

import React from 'react';
import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ProfileSectionPrivacyProps {
  profile: CandidateProfile;
}

export function ProfileSectionPrivacy({ profile }: ProfileSectionPrivacyProps) {
  const { privacy } = profile;

  const getIconSvg = (icon: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      document: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      download: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      trash: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ),
      alert: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    };
    return iconMap[icon] || null;
  };

  const getValueColor = (variant?: string) => {
    switch (variant) {
      case 'success':
        return 'text-[var(--success)]';
      case 'warn':
        return 'text-[var(--amber)]';
      case 'danger':
        return 'text-[var(--danger)]';
      default:
        return 'text-[var(--ink)]';
    }
  };

  const getStatusPillVariant = (variant?: string) => {
    switch (variant) {
      case 'warn':
        return 'bg-[var(--amber-bg)] text-[var(--amber)]';
      case 'danger':
        return 'bg-[var(--danger-bg)] text-[var(--danger)]';
      case 'neutral':
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
      default:
        return 'bg-[var(--success-bg)] text-[var(--success)]';
    }
  };

  return (
    <section
      id="cd-section-privacy"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[16px]">
          <span className="font-display text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium">
            09 · 09
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--ink)]">
            Data privacy &amp; legal
          </h2>
        </div>
        {privacy.statusPill && (
          <span
            className={cn(
              'inline-flex items-center gap-[6px]',
              'font-mono text-[10px] tracking-[0.14em] uppercase font-semibold',
              'px-[9px] py-[3px] rounded-full',
              'before:content-[\'\'] before:w-[5px] before:h-[5px]',
              'before:rounded-full before:bg-[currentColor]',
              getStatusPillVariant(privacy.statusPill.variant)
            )}
          >
            {privacy.statusPill.label}
          </span>
        )}
      </div>

      {/* Privacy Grid */}
      <div className="grid grid-cols-2 gap-[14px] max-[880px]:grid-cols-1">
        {privacy.items && privacy.items.length > 0 ? (
          privacy.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[16px] py-[14px]"
            >
              {/* Label with Icon */}
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px] flex items-center gap-[7px]">
                <span className="text-[var(--ink-mute)] flex-shrink-0" aria-hidden="true">
                  {getIconSvg(item.icon)}
                </span>
                {item.label}
              </div>

              {/* Value */}
              <div
                className={cn(
                  'font-display [font-variation-settings:\'opsz\'_48] text-[17px] font-medium tracking-[-0.01em] mb-[4px]',
                  getValueColor(item.valueVariant)
                )}
              >
                {item.value}
              </div>

              {/* Detail */}
              <div className="font-mono text-[11px] text-[var(--ink-mute)]">
                {item.detail}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[28px] py-[56px] text-center text-[13.5px] text-[var(--ink-mute)]">
            <div className="mb-[14px] text-[52px]">—</div>
            No privacy records
          </div>
        )}
      </div>
    </section>
  );
}
