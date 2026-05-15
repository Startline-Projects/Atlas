'use client';

import type { EngagementProfile, TrackerDay, TrackerDayState } from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngSubTrackerProps {
  engagement: EngagementProfile;
}

// admin.html lines 9964-9999 — day-thumb variants
function dayThumbClass(state: TrackerDayState): string {
  switch (state) {
    case 'weekend':
      return 'bg-[var(--cream-deep)] opacity-60';
    case 'empty':
      return 'bg-[repeating-linear-gradient(45deg,var(--paper-deep)_0_6px,var(--cream-deep)_6px_12px)]';
    case 'logged':
    case 'locked':
    default:
      return 'bg-[linear-gradient(135deg,#d6d2c5_0%,#b5af9c_100%)]';
  }
}

function DayCard({ day, engagementId }: { day: TrackerDay; engagementId: string }) {
  const isInteractive = day.state === 'logged' || day.state === 'locked';
  const showSvg = day.state === 'logged' || day.state === 'locked';

  return (
    <div className="relative bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden">
      {day.state === 'locked' && (
        <span
          aria-hidden="true"
          className="absolute top-[6px] right-[6px] font-mono text-[7.5px] bg-[rgba(0,0,0,0.65)] text-[var(--paper)] py-[1px] px-[5px] rounded-[3px] tracking-[0.06em] font-semibold z-10"
        >
          🔒 LOCKED
        </span>
      )}
      <div className="pt-[7px] pr-[10px] pb-[6px] pl-[10px] border-b border-dashed border-[var(--line-soft)] flex items-baseline justify-between">
        <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-semibold">
          {day.label}
        </span>
        <span
          className={cn(
            'font-mono text-[10.5px] font-semibold',
            day.state === 'weekend' || day.state === 'empty'
              ? 'text-[var(--ink-mute)] font-normal'
              : 'text-[var(--ink)]'
          )}
        >
          {day.hours}
        </span>
      </div>
      <div
        data-eng-action={isInteractive ? 'open-screenshots' : undefined}
        onClick={
          isInteractive
            ? () => {
                // eslint-disable-next-line no-console
                console.log(`[engagement-tracker] open-screenshots clicked for ${engagementId} · ${day.label}`);
              }
            : undefined
        }
        className={cn(
          'aspect-[1.4/1] relative grid place-items-center transition-[filter] duration-[120ms] ease',
          dayThumbClass(day.state),
          isInteractive && 'cursor-pointer hover:brightness-[0.94]'
        )}
      >
        {showSvg && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[rgba(0,0,0,0.32)]"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
        {(day.shotCount || day.shotCountLabel) && (
          <span
            className={cn(
              'absolute bottom-[4px] right-[4px] font-mono text-[8.5px] py-[1px] px-[6px] rounded-[3px] tracking-[0.04em] font-semibold text-[var(--paper)]',
              day.shotCountLabel ? 'bg-[rgba(0,0,0,0.3)]' : 'bg-[rgba(0,0,0,0.55)]'
            )}
          >
            {day.shotCountLabel ?? `${day.shotCount} shots`}
          </span>
        )}
      </div>
    </div>
  );
}

export function EngSubTracker({ engagement }: EngSubTrackerProps) {
  const { tracker } = engagement;

  const handleFullHistory = () => {
    // eslint-disable-next-line no-console
    console.log(`[engagement-tracker] full-tracker-history clicked for ${engagement.id}`);
  };

  return (
    <section
      id="eng-section-tracker"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Time tracker history
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          Last 7 days · {tracker.summary.thisWeek} logged
        </span>
      </div>

      {/* admin.html line 9881: .eng-tracker-card single unified */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head */}
        <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)]">
            {tracker.weekTitle}
          </div>
          <div className="inline-flex items-center gap-[14px]">
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                This week
              </div>
              <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1]">
                {tracker.summary.thisWeek}{' '}
                <span className="text-[11px] text-[var(--ink-mute)] font-normal">
                  {tracker.summary.thisWeekMax}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                Screenshots
              </div>
              <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1]">
                {tracker.summary.screenshots}{' '}
                <span className="text-[11px] text-[var(--ink-mute)] font-normal">captured</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                Adjustments
              </div>
              <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1]">
                {tracker.summary.adjustments}{' '}
                <span className="text-[11px] text-[var(--ink-mute)] font-normal">approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-day grid */}
        <div className="grid grid-cols-7 gap-[8px] py-[18px] px-[20px] max-[720px]:grid-cols-2">
          {tracker.days.map((day, idx) => (
            <DayCard key={idx} day={day} engagementId={engagement.id} />
          ))}
        </div>

        {/* Foot */}
        <div className="py-[12px] px-[20px] border-t border-[var(--line-soft)] bg-[var(--paper-deep)] flex items-center justify-between flex-wrap gap-[8px]">
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {tracker.noteText}
          </span>
          <button
            type="button"
            onClick={handleFullHistory}
            data-eng-action="full-tracker-history"
            className="font-mono text-[10.5px] text-[var(--ink-soft)] bg-transparent border-0 cursor-pointer py-[4px] px-[8px] rounded-[var(--r-sm)] transition-[background,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            {tracker.fullHistoryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
