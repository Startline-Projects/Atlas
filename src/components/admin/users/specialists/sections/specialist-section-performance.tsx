'use client';

import { useState, Fragment } from 'react';
import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { cn } from '@/lib/utils/cn';

type TabKey = 'reviews' | 'disputes' | 'sourcing' | 'pool';

interface SpecialistSectionPerformanceProps {
  profile: SpecialistProfile;
}

// ============================================================
// HELPER 1 — StatGrid (admin.html lines 4291-4355)
// 4-tile users-stats with us-label / us-value (Fraunces opsz 64)
// + delta + v-suffix + us-meta (with optional warn/danger variant)
// ============================================================
type StatTile = NonNullable<SpecialistProfile['performance']>['reviews']['stats'][number];

function StatGrid({ stats }: { stats: StatTile[] }) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-0 max-[720px]:grid-cols-2">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="px-[20px] py-[16px] border-r border-[var(--line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-[var(--line-soft)]"
        >
          {/* admin.html line 4311: .us-label */}
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[7px]">
            {stat.label}
          </div>
          {/* admin.html line 4319: .us-value (Fraunces opsz 64) */}
          <div
            className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]"
            style={stat.valueOverrideStyle}
          >
            {stat.value}
            {stat.vSuffix && (
              <span className="text-[13px] text-[var(--ink-mute)] font-normal font-mono">
                {stat.vSuffix}
              </span>
            )}
            {stat.delta && (
              <span
                className={cn(
                  'font-mono text-[11px] font-semibold tracking-[0.02em]',
                  stat.delta.variant === 'up' && 'text-[var(--success)]',
                  stat.delta.variant === 'down' && 'text-[var(--danger)]',
                  stat.delta.variant === 'flat' && 'text-[var(--ink-mute)]'
                )}
              >
                {stat.delta.label}
              </span>
            )}
          </div>
          {/* admin.html line 4347: .us-meta (with .warn/.danger variants) */}
          <div
            className={cn(
              'mt-[7px] font-mono text-[10.5px] tracking-[0.04em]',
              stat.metaVariant === 'warn'
                ? 'text-[var(--amber)]'
                : stat.metaVariant === 'danger'
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--ink-mute)]'
            )}
          >
            {stat.meta}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// HELPER 2 — TrendChartView (admin.html lines 7266-7347)
// 4-bar chart with chart-head (title + meta with delta) + sp-bar-grid
// + 4 sp-bar-col with sp-bar-value, sp-bar (gradient), sp-bar-label
// ============================================================
type TrendChartType = NonNullable<SpecialistProfile['performance']>['reviews']['trend'];

function TrendChartView({ chart }: { chart: TrendChartType }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] pt-[16px] px-[18px] pb-[18px] mt-[12px]">
      {/* admin.html line 7273: .chart-head */}
      <div className="flex items-baseline justify-between mb-[14px] flex-wrap gap-[8px]">
        {/* admin.html line 7281: .chart-title */}
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
          {chart.title}
        </span>
        {/* admin.html line 7289: .chart-meta */}
        <span className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
          {chart.metaTotal}
          {chart.metaDelta && (
            <span
              className={cn(
                'font-semibold ml-[4px]',
                chart.metaDelta.variant === 'up' ? 'text-[var(--success)]' : 'text-[var(--danger)]'
              )}
            >
              {chart.metaDelta.label}
            </span>
          )}
        </span>
      </div>
      {/* admin.html line 7301: .sp-bar-grid */}
      <div className="grid grid-cols-4 gap-[14px] items-end h-[100px] px-[4px]">
        {chart.bars.map((bar, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-[6px] h-full justify-end relative"
          >
            {/* admin.html line 7318: .sp-bar-value */}
            <span className="font-mono text-[10.5px] font-semibold text-[var(--ink)] tracking-[0.02em] mb-[2px]">
              {bar.value}
            </span>
            {/* admin.html line 7326: .sp-bar (gradient — default lime, variants muted/warn) */}
            <div
              className="w-full rounded-t-[3px] min-h-[4px] transition-[height] duration-[300ms] ease"
              style={{
                height: `${bar.heightPct}%`,
                background:
                  bar.variant === 'muted'
                    ? 'linear-gradient(180deg, var(--cream-deep) 0%, var(--line-strong) 100%)'
                    : bar.variant === 'warn'
                      ? 'linear-gradient(180deg, var(--amber) 0%, #B85B22 100%)'
                      : 'linear-gradient(180deg, var(--lime) 0%, var(--lime-deep) 100%)',
              }}
            />
            {/* admin.html line 7339: .sp-bar-label */}
            <span className="font-mono text-[9px] tracking-[0.06em] text-[var(--ink-mute)] uppercase mt-[4px] whitespace-nowrap">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HELPER 3 — BreakdownView (admin.html lines 7350-7395)
// 2x2 grid of breakdown rows (label · value · pct pill)
// ============================================================
type BreakdownRowType = NonNullable<SpecialistProfile['performance']>['reviews']['breakdown'][number];

function BreakdownView({ rows }: { rows: BreakdownRowType[] }) {
  return (
    <div className="grid grid-cols-2 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[12px] overflow-hidden max-[720px]:grid-cols-1">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_auto_auto] gap-[10px] items-center px-[14px] py-[11px] border-r border-b border-dashed border-[var(--line-soft)] text-[12.5px] [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 max-[720px]:border-r-0 max-[720px]:[&:nth-last-child(-n+2)]:border-b max-[720px]:last:border-b-0"
        >
          {/* admin.html line 7378: .b-label */}
          <span className="text-[var(--ink-soft)]">{row.label}</span>
          {/* admin.html line 7379: .b-value */}
          <span className="font-mono text-[12px] text-[var(--ink)] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums]">
            {row.value}
          </span>
          {/* admin.html line 7387: .b-pct */}
          <span className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] bg-[var(--cream-deep)] px-[6px] py-[2px] rounded-[3px] font-semibold">
            {row.percent}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// HELPER 4 — ChannelsView (admin.html lines 7489-7537, Sourcing tab only)
// Channel rows with name+detail + bar + pct + meta
// ============================================================
type ChannelRowType = NonNullable<SpecialistProfile['performance']>['sourcing']['channels'][number];

function ChannelsView({ channels }: { channels: ChannelRowType[] }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[12px] overflow-hidden">
      {channels.map((ch, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_100px_auto_auto] gap-[12px] items-center px-[16px] py-[12px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] max-[720px]:grid-cols-[1fr_auto_auto] max-[720px]:gap-y-[8px]"
        >
          {/* admin.html line 7506: .ch-name + detail */}
          <div className="min-w-0">
            <div className="text-[var(--ink)] font-semibold">{ch.name}</div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
              {ch.detail}
            </div>
          </div>
          {/* admin.html line 7510: .ch-bar (cream-deep track) + ch-bar-fill (lime-deep) */}
          <div className="h-[6px] bg-[var(--cream-deep)] rounded-full overflow-hidden max-[720px]:hidden">
            <div
              className="h-full bg-[var(--lime-deep)] rounded-full"
              style={{ width: `${ch.barPct}%` }}
            />
          </div>
          {/* admin.html line 7521: .ch-pct */}
          <span className="font-mono text-[11.5px] text-[var(--ink)] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums] min-w-[36px] text-right">
            {ch.pct}
          </span>
          {/* admin.html line 7531: .ch-meta */}
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
            {ch.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT — SpecialistSectionPerformance
// ============================================================

export function SpecialistSectionPerformance({ profile }: SpecialistSectionPerformanceProps) {
  const [tab, setTab] = useState<TabKey>('reviews');

  const performance = profile.performance;

  if (!performance) {
    return null;
  }

  const { sectionStatus, reviews, disputes, sourcing, pool } = performance;

  // Tab definitions for header chips (admin.html lines 18329-18334)
  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'reviews', label: 'Reviews', count: reviews.tabCount },
    { key: 'disputes', label: 'Disputes', count: disputes.tabCount },
    { key: 'sourcing', label: 'Sourcing', count: sourcing.tabCount },
    { key: 'pool', label: 'Pool', count: pool.tabCount },
  ];

  return (
    // admin.html line 18319: <section id="sp-section-performance">
    <section
      id="sp-section-performance"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 18320: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Performance summary
          </h2>
        </div>
        {/* admin.html line 18325: status pill */}
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor]",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* admin.html line 18329: <div class="cd-eng-tabs"> — same pattern as Phase 6i hiring history */}
      <div className="flex gap-0 border-b border-[var(--line)] mb-[16px]" role="tablist">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              onClick={() => setTab(t.key)}
              className={cn(
                'px-[16px] py-[10px] font-body text-[12.5px] bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px]',
                isActive
                  ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
                  : 'text-[var(--ink-mute)] border-b-transparent font-medium hover:text-[var(--ink)]'
              )}
            >
              {t.label}{' '}
              <span
                className={cn(
                  'font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB PANELS — conditionally rendered based on activeTab */}
      {tab === 'reviews' && (
        <Fragment>
          <StatGrid stats={reviews.stats} />
          <TrendChartView chart={reviews.trend} />
          <BreakdownView rows={reviews.breakdown} />
        </Fragment>
      )}

      {tab === 'disputes' && (
        <Fragment>
          <StatGrid stats={disputes.stats} />
          <TrendChartView chart={disputes.trend} />
          <BreakdownView rows={disputes.breakdown} />
        </Fragment>
      )}

      {tab === 'sourcing' && (
        <Fragment>
          <StatGrid stats={sourcing.stats} />
          <TrendChartView chart={sourcing.trend} />
          <ChannelsView channels={sourcing.channels} />
        </Fragment>
      )}

      {tab === 'pool' && (
        <Fragment>
          <StatGrid stats={pool.stats} />
          <TrendChartView chart={pool.trend} />
          <BreakdownView rows={pool.breakdown} />
        </Fragment>
      )}
    </section>
  );
}
