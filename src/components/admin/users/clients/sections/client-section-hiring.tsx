'use client';

import { useState } from 'react';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionHiringProps {
  profile: ClientProfile;
}

export function ClientSectionHiring({ profile }: ClientSectionHiringProps) {
  const hiring = profile.hiringHistory;
  const [tab, setTab] = useState<'active' | 'past'>('active');

  if (!hiring) {
    return null;
  }

  const { sectionStatus, active, past } = hiring;
  const items = tab === 'active' ? active : past;
  const bothEmpty = active.length === 0 && past.length === 0;

  return (
    // admin.html line 17603: <section class="cd-section" id="cl-section-history">
    <section
      id="cl-section-history"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17604: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        {/* admin.html line 17605: <div class="head-left"> */}
        <div className="flex items-baseline gap-[14px] min-w-0">
          {/* admin.html line 17606: <span class="cd-section-num"> */}
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 08
          </span>
          {/* admin.html line 17607: <h2> */}
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Hiring history
          </h2>
        </div>

        {/* admin.html line 17609: <span class="cd-section-status"> */}
        <span
          className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'neutral'
                ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                : 'bg-[var(--success-bg)] text-[var(--success)]'
          }`}
        >
          {sectionStatus.label}
        </span>
      </div>

      {bothEmpty ? (
        // Empty-state for cl-005 Open Tundra (pending — no hires)
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            No hires yet
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            Onboarding in progress · hires will appear here once verified status is granted
          </div>
        </div>
      ) : (
        <>
          {/* admin.html line 17612: <div class="cd-eng-tabs" role="tablist"> */}
          <div className="flex gap-0 border-b border-[var(--line)] mb-[14px]" role="tablist">
            {/* admin.html line 17613: Active tab */}
            <button
              type="button"
              role="tab"
              onClick={() => setTab('active')}
              className={`px-[16px] py-[10px] font-body text-[12.5px] bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px] ${
                tab === 'active'
                  ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
                  : 'text-[var(--ink-mute)] border-b-transparent font-medium hover:text-[var(--ink)]'
              }`}
            >
              Active{' '}
              <span
                className={`font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold ${
                  tab === 'active'
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                }`}
              >
                {active.length}
              </span>
            </button>

            {/* admin.html line 17614: Past tab */}
            <button
              type="button"
              role="tab"
              onClick={() => setTab('past')}
              className={`px-[16px] py-[10px] font-body text-[12.5px] bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px] ${
                tab === 'past'
                  ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
                  : 'text-[var(--ink-mute)] border-b-transparent font-medium hover:text-[var(--ink)]'
              }`}
            >
              Past{' '}
              <span
                className={`font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold ${
                  tab === 'past'
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                }`}
              >
                {past.length}
              </span>
            </button>
          </div>

          {items.length === 0 ? (
            // Empty-active sub-state for cl-001 Acme (suspended)
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[16px] py-[40px] text-center font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
              {tab === 'active'
                ? 'No active engagements · account suspended'
                : 'No past engagements'}
            </div>
          ) : (
            // admin.html line 17617: <div class="cd-eng-table">
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
              {/* admin.html line 17618: <div class="eng-head"> */}
              <div
                className="grid gap-[12px] items-center px-[16px] py-[10px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold max-[880px]:grid-cols-[1fr_auto] max-[880px]:gap-[6px]"
                style={{ gridTemplateColumns: '2fr 1.4fr 0.8fr 0.8fr 1fr 1fr 28px' }}
              >
                <div>Talent</div>
                <div className="max-[880px]:hidden">Role</div>
                <div className="max-[880px]:hidden">Rate</div>
                <div className="max-[880px]:hidden">Hrs/wk</div>
                <div>Started</div>
                <div>Total paid</div>
                <div></div>
              </div>

              {items.map((eng, idx) => (
                // admin.html line 17627: <div class="eng-row">
                <div
                  key={idx}
                  className="grid gap-[12px] items-center px-[16px] py-[10px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] max-[880px]:grid-cols-[1fr_auto] max-[880px]:gap-[6px]"
                  style={{ gridTemplateColumns: '2fr 1.4fr 0.8fr 0.8fr 1fr 1fr 28px' }}
                >
                  {/* admin.html line 17628: <div class="eng-client"> (talent name on client side) */}
                  <div className="font-semibold text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
                    {eng.talentName}
                  </div>
                  {/* admin.html line 17629: <div class="eng-role"> */}
                  <div className="text-[var(--ink-soft)] whitespace-nowrap overflow-hidden text-ellipsis max-[880px]:hidden">
                    {eng.role}
                  </div>
                  {/* admin.html line 17630: <div class="eng-rate"> */}
                  <div className="font-mono text-[11.5px] text-[var(--ink)] tracking-[0.02em] max-[880px]:hidden">
                    {eng.rate}
                  </div>
                  {/* admin.html line 17631: <div class="eng-hours"> */}
                  <div className="font-mono text-[11.5px] text-[var(--ink)] tracking-[0.02em] max-[880px]:hidden">
                    {eng.hoursPerWeek}
                  </div>
                  {/* admin.html line 17632: <div class="eng-dates"> */}
                  <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
                    {eng.startedDate}
                  </div>
                  {/* admin.html line 17633: <div class="eng-paid"> */}
                  <div className="font-mono text-[11.5px] text-[var(--ink)] tracking-[0.02em] font-semibold">
                    {eng.totalPaid}
                  </div>
                  {/* admin.html line 17634: <button class="row-actions-btn"> */}
                  <div>
                    <button
                      type="button"
                      aria-label="Row actions"
                      className="w-[28px] h-[28px] grid place-items-center bg-transparent border-0 rounded-full text-[var(--ink-mute)] cursor-pointer transition-[background-color,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
