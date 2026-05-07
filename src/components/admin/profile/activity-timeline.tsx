'use client';

import { useState } from 'react';
import { ACTIVITY_TIMELINE_DATA } from '@/lib/mock-data/admin/profile-data';

const tagStyles: Record<string, string> = {
  SUSPENSION: 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]',
  BAN: 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]',
  REFUND: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  DISPUTE: 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]',
  APPEAL: 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]',
  OVERRIDE: 'bg-[rgba(110,63,224,0.15)] text-[var(--color-super)]',
  'SIGN-IN': 'bg-[rgba(214,242,77,0.3)] text-[var(--color-ink)]',
  EXPORT: 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]',
  INVESTIGATION: 'bg-[var(--color-navy-bg)] text-[var(--color-navy)]',
};

const outcomeStatusStyles: Record<string, string> = {
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  partial: 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]',
  escalated: 'bg-[rgba(110,63,224,0.12)] text-[var(--color-super)]',
};

export default function ActivityTimeline() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <section className="dash-section">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.2] flex items-baseline gap-3">
          My recent activity
          <span className="font-mono text-[11.5px] tracking-[0.1em] uppercase text-[var(--color-ink-mute)] font-medium bg-[var(--color-paper)] px-[9px] py-[3px] border border-[var(--color-line)] rounded-[3px] relative -top-[2px]">
            {ACTIVITY_TIMELINE_DATA.summary.today} TODAY · {ACTIVITY_TIMELINE_DATA.summary.thisMonth} THIS MONTH
          </span>
        </h2>
        <a
          href="#comp-audit"
          className="text-[12.5px] text-[var(--color-ink-soft)] border-b border-dashed border-[var(--color-line-strong)] pb-[1px] cursor-pointer transition-colors hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]"
          data-profile-action="open-audit"
        >
          Open in audit log →
        </a>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-1.5 mb-[18px]" role="tablist" aria-label="Filter activity by category">
        {ACTIVITY_TIMELINE_DATA.filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`py-1.5 px-3 font-mono text-[10.5px] tracking-[0.08em] uppercase border rounded-full cursor-pointer transition-all flex items-center gap-1.5 ${
              activeFilter === filter.id
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                : 'bg-[var(--color-paper)] text-[var(--color-ink-mute)] border-[var(--color-line)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-mute)]'
            }`}
            data-filter={filter.id}
            role="tab"
          >
            {filter.label}
            <span
              className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-semibold ${
                activeFilter === filter.id
                  ? 'bg-[rgba(251,248,242,0.2)] text-[var(--color-paper)]'
                  : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Timeline container */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
        {ACTIVITY_TIMELINE_DATA.entries.map((dayGroup) => {
          // Filter activities for this day group
          const filteredActivities = dayGroup.activities.filter(activity => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'suspension') {
              return activity.category === 'suspension' || activity.category === 'ban';
            }
            return activity.category === activeFilter;
          });

          // Hide day group if no filtered activities
          if (filteredActivities.length === 0) return null;

          return (
            <div key={dayGroup.day}>
              {/* Day header */}
              <div className="py-[10px] px-[18px] bg-[var(--color-paper-deep)] border-t border-b border-[var(--color-line-soft)] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] font-semibold flex items-center gap-2.5">
                <span>
                  {dayGroup.day} {dayGroup.day !== dayGroup.date && `· ${dayGroup.date}`}
                </span>
                <span className="ml-auto text-[10px] text-[var(--color-ink-mute)] font-medium tracking-[0.06em]">
                  {filteredActivities.length} actions
                </span>
              </div>

              {/* Timeline entries for this day */}
              {filteredActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[70px_minmax(0,1fr)_auto] gap-[18px] py-[14px] px-[18px] border-b border-dashed border-[var(--color-line-soft)] relative hover:bg-[#FCF9F1] transition-colors last:border-b-0"
                  data-cat={activity.category}
                >
                {/* Time column (left) */}
                <span className="font-mono text-[10.5px] text-[var(--color-ink-mute)] tracking-[0.04em] font-medium text-right pt-0.75">
                  {activity.time}
                </span>

                {/* Content column (center) */}
                <div className="min-w-0 pl-[14px]">
                  {/* Action line */}
                  <div className="text-[13.5px] text-[var(--color-ink)] leading-[1.4] mb-1">
                    <span className="font-medium">{activity.verb}</span>
                    {activity.target && <span className="font-semibold"> {activity.target}</span>}
                    {activity.targetTwo && (
                      <>
                        {activity.verb !== 'Approved refund of' && activity.verb !== 'Override approved for' && (
                          <span className="font-medium"> to</span>
                        )}
                        {activity.verb === 'Override approved for' && <span className="font-medium"> — {activity.targetTwo}</span>}
                        {activity.verb === 'Approved refund of' && <span className="font-medium"> to</span>}
                        {activity.verb === 'Approved refund of' && <span className="font-medium"> {activity.targetTwo}</span>}
                      </>
                    )}
                  </div>

                  {/* Detail line with metadata */}
                  <div className="text-[12px] text-[var(--color-ink-mute)] leading-[1.5] flex flex-wrap gap-y-1 gap-x-3">
                    <span>{activity.detail}</span>
                    <span className="text-[var(--color-line-strong)]">·</span>
                    <span
                      className={`inline-flex items-center gap-[4px] font-mono text-[10.5px] tracking-[0.04em] uppercase font-semibold py-[1px] px-[7px] rounded-[3px] ${
                        outcomeStatusStyles[activity.outcomeStatus]
                      }`}
                    >
                      {activity.outcome}
                    </span>
                    {activity.refId && (
                      <>
                        <span className="text-[var(--color-line-strong)]">·</span>
                        <span className="font-mono text-[11px] text-[var(--color-ink-soft)] bg-[var(--color-cream-deep)] py-0.5 px-1.5 rounded-sm">
                          {activity.refId}
                        </span>
                        <span className="text-[var(--color-line-strong)]">·</span>
                      </>
                    )}
                    <a
                      href="#comp-audit"
                      className="text-[var(--color-ink-soft)] border-b border-dashed border-[var(--color-line-strong)] pb-0.5 inline-flex items-center gap-0.75 cursor-pointer hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors"
                    >
                      Audit →
                    </a>
                  </div>
                </div>

                {/* Tag column (right) */}
                <span
                  className={`font-mono text-[9px] tracking-[0.14em] uppercase py-[3px] px-[8px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0 mt-[2px] self-start ${
                    tagStyles[activity.tag] || 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
                  }`}
                >
                  {activity.tag}
                </span>
              </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {ACTIVITY_TIMELINE_DATA.entries.every(group =>
        group.activities.filter(a => {
          if (activeFilter === 'all') return true;
          if (activeFilter === 'suspension') return a.category === 'suspension' || a.category === 'ban';
          return a.category === activeFilter;
        }).length === 0
      ) && (
        <div className="py-[56px] px-[28px] text-center text-[var(--color-ink-mute)] text-[13.5px]">
          <div className="w-[52px] h-[52px] mx-auto mb-[14px] rounded-full bg-[var(--color-cream-deep)] flex items-center justify-center text-[var(--color-ink-mute)]" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <h4 className="font-display text-[18px] text-[var(--color-ink)] mb-[6px] font-medium tracking-[-0.01em]">No actions match this filter</h4>
          <p className="leading-[1.55] max-w-[400px] mx-auto">Try adjusting the filter or expanding the date range. Your full audit log lives in Compliance → Audit Logs.</p>
        </div>
      )}

      {/* Footer */}
      <div className="py-[14px] px-[18px] border-t border-[var(--color-line-soft)] flex items-center justify-between text-[12px] text-[var(--color-ink-mute)] flex-wrap gap-2.5">
        <span>{ACTIVITY_TIMELINE_DATA.footerText}</span>
        <button
          type="button"
          className="bg-none border border-[var(--color-line)] rounded-full py-1.5 px-4 font-mono text-[11px] tracking-[0.04em] text-[var(--color-ink-soft)] cursor-pointer transition-all hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-mute)]"
          data-profile-action="load-more-activity"
        >
          Load more
        </button>
      </div>
    </section>
  );
}
