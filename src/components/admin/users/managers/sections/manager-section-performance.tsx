'use client';

import { useState } from 'react';
import type {
  ManagerProfile,
  ManagerPerfMode,
  PersonalPerfTab,
  ManagerialPerfTab,
  StatTile,
  TrendChart,
  BreakdownRow,
  ChannelRow,
  ManagerAuditRating,
  ManagerDecisionRow,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionPerformanceProps {
  profile: ManagerProfile;
}

// admin.html lines 8132-8176 — mgr-mode-toggle pill segmented control
function ModeToggle({
  mode,
  onChange,
  personalCount,
  managerialCount,
}: {
  mode: ManagerPerfMode;
  onChange: (m: ManagerPerfMode) => void;
  personalCount: number;
  managerialCount: number;
}) {
  return (
    <div
      role="tablist"
      aria-label="Switch between Mateo's two roles"
      className="inline-flex bg-[var(--paper-deep)] border border-[var(--line)] rounded-full p-[4px] mb-[16px] gap-[2px]"
    >
      {([
        { key: 'personal' as const, label: 'Personal Specialist work', count: personalCount },
        { key: 'managerial' as const, label: 'Managerial work',        count: managerialCount },
      ]).map((item) => {
        const active = mode === item.key;
        return (
          <button
            key={item.key}
            type="button"
            data-mgr-mode={item.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={cn(
              'font-body text-[12.5px] py-[7px] px-[16px] rounded-full border-0 cursor-pointer font-medium transition-[background-color,color,box-shadow] duration-[150ms] ease inline-flex items-center gap-[6px]',
              active
                ? 'bg-[var(--ink)] text-[var(--paper)] shadow-[0_1px_3px_rgba(0,0,0,0.12)]'
                : 'bg-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
            )}
          >
            {item.label}
            <span
              className={cn(
                'font-mono text-[9.5px] py-[1px] px-[6px] rounded-full tracking-[0.04em]',
                active
                  ? 'bg-[rgba(255,255,255,0.18)] text-inherit'
                  : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
              )}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// admin.html lines 6384-6422 — cd-eng-tabs underlined tab bar (mirror Phase 7c)
function SubTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  dataAttr,
}: {
  tabs: Array<{ key: T; label: string; count: number }>;
  activeTab: T;
  onChange: (t: T) => void;
  dataAttr: string;
}) {
  return (
    <div role="tablist" className="flex gap-0 border-b border-[var(--line)] mb-[16px]">
      {tabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            {...{ [dataAttr]: tab.key }}
            onClick={() => onChange(tab.key)}
            className={cn(
              'px-[16px] py-[10px] font-body text-[12.5px] bg-transparent border-0 border-b-2 cursor-pointer inline-flex items-center gap-[8px] whitespace-nowrap transition-[color,border-color] duration-[150ms] ease mb-[-1px]',
              active
                ? 'text-[var(--ink)] border-b-[var(--ink)] font-semibold'
                : 'text-[var(--ink-mute)] border-b-transparent font-medium hover:text-[var(--ink)]'
            )}
          >
            {tab.label}{' '}
            <span
              className={cn(
                'font-mono text-[10px] px-[7px] py-[2px] rounded-full font-semibold',
                active
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// admin.html lines 4291-4355 — users-stats unified card with internal vertical dividers (mirror Phase 7c)
function StatGridView({ stats }: { stats: StatTile[] }) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px] max-[720px]:grid-cols-2">
      {stats.map((s, idx) => (
        <div
          key={idx}
          className="px-[20px] py-[16px] border-r border-[var(--line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-[var(--line-soft)]"
        >
          {/* admin.html line 4311: us-label */}
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[7px]">
            {s.label}
          </div>
          {/* admin.html line 4319: us-value (Fraunces opsz 64, 24px) */}
          <div
            className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]"
            style={s.valueOverrideStyle}
          >
            {s.value}
            {s.vSuffix && (
              <span className="font-mono text-[13px] text-[var(--ink-mute)] font-normal">{s.vSuffix}</span>
            )}
            {s.delta && (
              <span
                className={cn(
                  'font-mono text-[11px] font-semibold tracking-[0.02em]',
                  s.delta.variant === 'up'
                    ? 'text-[var(--success)]'
                    : s.delta.variant === 'down'
                      ? 'text-[var(--danger)]'
                      : 'text-[var(--ink-mute)]'
                )}
              >
                {s.delta.label}
              </span>
            )}
          </div>
          {/* admin.html line 4347: us-meta */}
          <div
            className={cn(
              'mt-[7px] font-mono text-[10.5px] tracking-[0.04em]',
              s.metaVariant === 'warn'
                ? 'text-[var(--amber)]'
                : s.metaVariant === 'danger'
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--ink-mute)]'
            )}
          >
            {s.meta}
          </div>
        </div>
      ))}
    </div>
  );
}

// sp-trend-chart (Phase 7c reuse)
function TrendChartView({ chart }: { chart: TrendChart }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[18px] py-[16px] mb-[14px]">
      <div className="flex items-baseline justify-between flex-wrap gap-[8px] mb-[12px]">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
          {chart.title}
        </span>
        <span className="font-mono text-[11px] text-[var(--ink)] tracking-[0.02em] inline-flex items-baseline gap-[6px]">
          {chart.metaTotal}
          {chart.metaDelta && (
            <span
              className={cn(
                'font-mono text-[11px] font-semibold tracking-[0.02em]',
                chart.metaDelta.variant === 'up' ? 'text-[var(--success)]' : 'text-[var(--danger)]'
              )}
            >
              {chart.metaDelta.label}
            </span>
          )}
        </span>
      </div>
      {/* admin.html line 7301: sp-bar-grid 4-col 100px height */}
      <div className="grid grid-cols-4 gap-[14px] items-end h-[100px] px-[4px]">
        {chart.bars.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center justify-end h-full gap-[6px] relative">
            {/* admin.html line 7318: sp-bar-value — mono 10.5px ink semibold above bar */}
            <span className="font-mono text-[10.5px] text-[var(--ink)] tracking-[0.02em] font-semibold mb-[2px]">
              {bar.value}
            </span>
            {/* admin.html line 7326: sp-bar — lime→lime-deep gradient (default), cream→line (muted), amber→#B85B22 (warn) */}
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
            {/* admin.html line 7339: sp-bar-label — mono 9px uppercase ink-mute */}
            <span className="font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.06em] uppercase mt-[4px] whitespace-nowrap">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// admin.html lines 7350-7390 — sp-breakdown unified 2x2 card with dashed internal borders
function BreakdownView({ rows }: { rows: BreakdownRow[] }) {
  return (
    <div className="grid grid-cols-2 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[12px] overflow-hidden max-[720px]:grid-cols-1">
      {rows.map((r, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_auto_auto] gap-[10px] items-center px-[14px] py-[11px] border-r border-b border-dashed border-[var(--line-soft)] text-[12.5px] [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 max-[720px]:border-r-0"
        >
          {/* admin.html line 7378: b-label */}
          <span className="text-[var(--ink-soft)]">{r.label}</span>
          {/* admin.html line 7379: b-value — mono 12px ink semibold tabular-nums */}
          <span className="font-mono text-[12px] text-[var(--ink)] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums]">
            {r.value}
          </span>
          {/* admin.html line 7387: b-pct — mono 9.5px chip on cream-deep */}
          <span className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] bg-[var(--cream-deep)] px-[6px] py-[2px] rounded-[3px] font-semibold">
            {r.percent}
          </span>
        </div>
      ))}
    </div>
  );
}

// admin.html lines 7489-7537 — sp-channels unified card with internal dashed dividers
function ChannelsView({ channels }: { channels: ChannelRow[] }) {
  return (
    // admin.html line 7489: sp-channels — paper bg + line border + r-md + mt-12 + overflow-hidden
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[12px] overflow-hidden">
      {channels.map((c, idx) => (
        // admin.html line 7496: sp-channel-row — grid 1fr/100px/auto/auto, gap 12, dashed bottom, last:border-0
        <div
          key={idx}
          className="grid grid-cols-[minmax(0,1fr)_100px_auto_auto] gap-[12px] items-center px-[16px] py-[12px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
        >
          {/* admin.html lines 19725-19729: ch-name + cd-doc-meta detail (inline body font, 10.5px, ink-mute) */}
          <div className="min-w-0">
            <div className="text-[var(--ink)] font-semibold">{c.name}</div>
            <div className="text-[10.5px] text-[var(--ink-mute)] mt-[1px]">{c.detail}</div>
          </div>
          {/* admin.html line 7510: ch-bar — 6px cream-deep track, 999px radius */}
          <div className="h-[6px] bg-[var(--cream-deep)] rounded-full overflow-hidden">
            {/* admin.html line 7516: ch-bar-fill — solid lime-deep */}
            <div
              className="h-full bg-[var(--lime-deep)] rounded-full transition-[width] duration-[400ms] ease"
              style={{ width: `${c.barPct}%` }}
            />
          </div>
          {/* admin.html line 7521: ch-pct — mono 11.5px ink semibold tabular-nums min-w-36 right-aligned */}
          <span className="font-mono text-[11.5px] text-[var(--ink)] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums] min-w-[36px] text-right">
            {c.pct}
          </span>
          {/* admin.html line 7531: ch-meta — mono 10.5px ink-mute nowrap */}
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
            {c.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

// admin.html lines 8373-8445 — mgr-audit-rating callout
function AuditRatingCallout({ rating }: { rating: ManagerAuditRating }) {
  const empty = Math.max(0, 5 - rating.starsFilled);
  const verdictColor =
    rating.verdictVariant === 'warn'
      ? 'text-[var(--amber)]'
      : rating.verdictVariant === 'danger'
        ? 'text-[var(--danger)]'
        : 'text-[var(--success)]';
  return (
    <div
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[18px] items-center px-[22px] py-[18px] mt-[14px] border border-[var(--line)] rounded-[var(--r-md)] max-[720px]:grid-cols-1"
      style={{
        background:
          'linear-gradient(135deg, rgba(214, 242, 77, 0.12) 0%, rgba(232, 118, 58, 0.06) 100%)',
      }}
    >
      {/* admin.html line 19604: rating-block */}
      <div className="text-center">
        <div className="font-display text-[36px] font-medium tracking-[-0.02em] leading-none text-[var(--ink)] [font-variant-numeric:tabular-nums]">
          {rating.ratingNum}
          <span className="text-[18px] text-[var(--ink-mute)] font-normal">{rating.ratingDenom}</span>
        </div>
        <div className="text-[var(--amber)] text-[14px] tracking-[1px] mt-[4px]">
          {'★'.repeat(rating.starsFilled)}
          {empty > 0 && <span className="text-[var(--line-strong)]">{'★'.repeat(empty)}</span>}
        </div>
      </div>
      {/* admin.html line 19608: rating-detail */}
      <div className="min-w-0">
        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
          {rating.label}
        </div>
        <div className={cn('font-display text-[18px] font-medium tracking-[-0.01em] mb-[4px]', verdictColor)}>
          {rating.verdict}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          {rating.by}
        </div>
      </div>
      {/* admin.html line 19613: rating-cta */}
      <button
        type="button"
        data-mgr-action={rating.ctaAction}
        onClick={() => {
          if (typeof window !== 'undefined') {
            // eslint-disable-next-line no-console
            console.log(`[manager-performance] ${rating.ctaAction} clicked`);
          }
        }}
        className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--paper)] border border-[var(--line)] py-[6px] px-[12px] rounded-full cursor-pointer transition-colors duration-[150ms] ease hover:bg-[var(--cream-deep)] whitespace-nowrap"
      >
        {rating.ctaLabel}
      </button>
    </div>
  );
}

// SVG path data for the 4 decision-row icon types — verbatim from admin.html lines 19676-19710
function DecisionIconSvg({ icon }: { icon: ManagerDecisionRow['icon'] }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (icon === 'check') {
    return (
      <svg {...common} strokeWidth="2.4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (icon === 'users') {
    return (
      <svg {...common} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  }
  if (icon === 'activity') {
    return (
      <svg {...common} strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  // chart (default variant) — admin.html line 19706
  return (
    <svg {...common} strokeWidth="2">
      <path d="M3 3v18h18" />
      <polyline points="7 14 12 9 17 14" />
    </svg>
  );
}

// admin.html lines 8321-8369 — mgr-decision-list / mgr-decision-row
function DecisionRowView({ row }: { row: ManagerDecisionRow }) {
  const iconClass =
    row.iconVariant === 'success'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : row.iconVariant === 'amber'
        ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
        : row.iconVariant === 'navy'
          ? 'bg-[var(--navy-bg)] text-[var(--navy)]'
          : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  return (
    <button
      type="button"
      data-mgr-action={row.action}
      onClick={() => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log(`[manager-performance] ${row.action} clicked: "${row.title}"`);
        }
      }}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[14px] items-center w-full text-left px-[16px] py-[12px] border-b border-l-0 border-r-0 border-t-0 border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] cursor-pointer transition-colors duration-[120ms] ease bg-transparent hover:bg-[#FCF9F1]"
    >
      <span
        className={cn(
          'w-[30px] h-[30px] rounded-full grid place-items-center flex-shrink-0',
          iconClass
        )}
        aria-hidden="true"
      >
        <DecisionIconSvg icon={row.icon} />
      </span>
      <div className="min-w-0">
        <div className="font-semibold text-[var(--ink)]">{row.title}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {row.meta}
        </div>
      </div>
      <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">
        {row.time}
      </span>
    </button>
  );
}

function DecisionListView({ decisions }: { decisions: ManagerDecisionRow[] }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[12px] overflow-hidden">
      {decisions.map((row, idx) => (
        <DecisionRowView key={idx} row={row} />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ManagerSectionPerformance({ profile }: ManagerSectionPerformanceProps) {
  const performance = profile.performance;
  const [mode, setMode] = useState<ManagerPerfMode>('personal');
  const [personalTab, setPersonalTab] = useState<PersonalPerfTab>('reviews');
  const [managerialTab, setManagerialTab] = useState<ManagerialPerfTab>('coaching');

  if (!performance) {
    return null;
  }

  const { sectionStatus, modeToggle, personal, managerial } = performance;

  return (
    // admin.html line 19474: <section id="mgr-section-performance">
    <section
      id="mgr-section-performance"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 19475-19481 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Performance summary
          </h2>
        </div>
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

      {/* Mode toggle — admin.html lines 19484-19493 */}
      <ModeToggle
        mode={mode}
        onChange={setMode}
        personalCount={modeToggle.personalCount}
        managerialCount={modeToggle.managerialCount}
      />

      {/* PERSONAL MODE — admin.html lines 19495-19598 */}
      {mode === 'personal' && (
        <div data-mgr-mode-content="personal">
          <SubTabs<PersonalPerfTab>
            tabs={[
              { key: 'reviews',  label: 'Reviews',  count: personal.reviews.tabCount },
              { key: 'disputes', label: 'Disputes', count: personal.disputes.tabCount },
              { key: 'sourcing', label: 'Sourcing', count: personal.sourcing.tabCount },
              { key: 'pool',     label: 'Pool',     count: personal.pool.tabCount },
            ]}
            activeTab={personalTab}
            onChange={setPersonalTab}
            dataAttr="data-mgr-perf-tab"
          />

          {personalTab === 'reviews' && (
            <div data-mgr-perf-content="reviews">
              <StatGridView stats={personal.reviews.stats} />
              {personal.reviews.trend && <TrendChartView chart={personal.reviews.trend} />}
              {personal.reviews.breakdown && <BreakdownView rows={personal.reviews.breakdown} />}
            </div>
          )}
          {personalTab === 'disputes' && (
            <div data-mgr-perf-content="disputes">
              <StatGridView stats={personal.disputes.stats} />
              {personal.disputes.trend && <TrendChartView chart={personal.disputes.trend} />}
              {personal.disputes.breakdown && <BreakdownView rows={personal.disputes.breakdown} />}
            </div>
          )}
          {personalTab === 'sourcing' && (
            <div data-mgr-perf-content="sourcing">
              <StatGridView stats={personal.sourcing.stats} />
              {personal.sourcing.trend && <TrendChartView chart={personal.sourcing.trend} />}
              {/* No breakdown for sourcing — admin.html lines 19572-19588 */}
            </div>
          )}
          {personalTab === 'pool' && (
            <div data-mgr-perf-content="pool">
              <StatGridView stats={personal.pool.stats} />
              {/* No trend, no breakdown for pool — admin.html lines 19590-19597 */}
            </div>
          )}
        </div>
      )}

      {/* MANAGERIAL MODE — admin.html lines 19600-19754 */}
      {mode === 'managerial' && (
        <div data-mgr-mode-content="managerial">
          {/* Audit rating callout — admin.html lines 19603-19614 */}
          <AuditRatingCallout rating={managerial.auditRating} />

          <div className="mt-[16px]">
            <SubTabs<ManagerialPerfTab>
              tabs={[
                { key: 'coaching',     label: 'Coaching & 1:1s',  count: managerial.coaching.tabCount },
                { key: 'delivered',    label: 'Reviews delivered', count: managerial.delivered.tabCount },
                { key: 'strategic',    label: 'Strategic',         count: managerial.strategic.tabCount },
                { key: 'coordination', label: 'Coordination',      count: managerial.coordination.tabCount },
              ]}
              activeTab={managerialTab}
              onChange={setManagerialTab}
              dataAttr="data-mgr-perf-tab"
            />
          </div>

          {managerialTab === 'coaching' && (
            <div data-mgr-perf-content="coaching">
              <StatGridView stats={managerial.coaching.stats} />
              <TrendChartView chart={managerial.coaching.trend} />
              <BreakdownView rows={managerial.coaching.breakdown} />
            </div>
          )}
          {managerialTab === 'delivered' && (
            <div data-mgr-perf-content="delivered">
              <StatGridView stats={managerial.delivered.stats} />
              {/* No trend chart for delivered — admin.html lines 19651-19664 */}
              <BreakdownView rows={managerial.delivered.breakdown} />
            </div>
          )}
          {managerialTab === 'strategic' && (
            <div data-mgr-perf-content="strategic">
              <StatGridView stats={managerial.strategic.stats} />
              <DecisionListView decisions={managerial.strategic.decisions} />
            </div>
          )}
          {managerialTab === 'coordination' && (
            <div data-mgr-perf-content="coordination">
              <StatGridView stats={managerial.coordination.stats} />
              <ChannelsView channels={managerial.coordination.channels} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
