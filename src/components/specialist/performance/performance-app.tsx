"use client";

/**
 * Performance orchestrator. Full-page dashboard like pool-health.
 *
 * State:
 *   - URL: `?period=month|quarter|year` (read via useSearchParams,
 *     swapped via router.replace not push)
 *   - Local: active tab key (Overview / Metrics / Peer ranking /
 *     Feedback / Goals)
 *
 * Tabs render only the active section's content (per source HTML
 * `[data-perf-tab]` switch). Mock data is one snapshot for the
 * "quarter" period; switching the period toggle is a visual swap
 * only this session — service-layer would re-fetch per period.
 */

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Download } from "lucide-react";

import {
  PERFORMANCE_PERIODS,
  PERFORMANCE_TABS,
  performanceSnapshot,
  type PerformancePeriod,
  type PerformanceTabKey,
} from "@/lib/mock-data/specialist/performance";
import { currentUser } from "@/lib/mock-data/specialist/current-user";
import {
  PeriodToggle,
  type PeriodOption,
} from "@/components/specialist/operations-shared";
import {
  RosterHeader,
  RosterActionButton,
} from "@/components/specialist/people-shared";
import { ReviewTabs } from "@/components/specialist/queue-shared/review-tabs";
import type { TabDef } from "@/lib/mock-data/specialist/queue-types";

import { PerformanceHero } from "./performance-hero";
import { KpiCard } from "./kpi-card";
import { CmpBars } from "./cmp-bars";
import { ScoreTrendChart } from "./score-trend-chart";
import { StrengthGrowthList } from "./strength-growth-list";
import { PeerRankList } from "./peer-rank-list";
import { GoalList } from "./goal-list";
import { FeedbackList } from "./feedback-list";

const PERIOD_OPTIONS: ReadonlyArray<PeriodOption<PerformancePeriod>> =
  PERFORMANCE_PERIODS.map((p) => ({ key: p.key, label: p.label }));

const TABS: ReadonlyArray<TabDef> = PERFORMANCE_TABS.map((t) => ({
  key: t.key,
  label: t.label,
}));

function parsePeriod(raw: string | null): PerformancePeriod {
  if (raw === "month" || raw === "quarter" || raw === "year") return raw;
  return performanceSnapshot.activePeriod;
}

export function PerformanceApp() {
  const router = useRouter();
  const params = useSearchParams();

  const period = parsePeriod(params.get("period"));
  const [activeTab, setActiveTab] = useState<PerformanceTabKey>("overview");

  const s = performanceSnapshot;

  const handlePeriodChange = useCallback(
    (next: PerformancePeriod) => {
      const qs = new URLSearchParams(params.toString());
      qs.set("period", next);
      router.replace(`/specialist/performance?${qs.toString()}`);
    },
    [params, router],
  );

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key as PerformanceTabKey);
  }, []);

  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <RosterHeader
        eyebrow="Self-evaluation"
        title={{ lead: "Your", italic: "performance" }}
        subtitle={`${currentUser.fullName} · ${currentUser.category} specialist · ${currentUser.tenureMonths} months at Atlas · review window ${s.reviewWindowLabel}`}
        actions={
          <>
            <PeriodToggle<PerformancePeriod>
              options={PERIOD_OPTIONS}
              active={period}
              onChange={handlePeriodChange}
              ariaLabel="Performance period"
            />
            <RosterActionButton
              icon={<Download className="h-3 w-3" strokeWidth={1.5} />}
            >
              Export
            </RosterActionButton>
          </>
        }
      />

      <PerformanceHero hero={s.hero} />

      <ReviewTabs
        tabs={TABS}
        activeKey={activeTab}
        onChange={handleTabChange}
        ariaLabel="Performance sections"
      />

      <div className="px-10 pt-6 pb-15 max-md:px-5">
        {activeTab === "overview" ? (
          <OverviewTab snapshot={s} />
        ) : null}
        {activeTab === "metrics" ? <MetricsTab snapshot={s} /> : null}
        {activeTab === "peer-ranking" ? (
          <PeerRankingTab snapshot={s} />
        ) : null}
        {activeTab === "feedback" ? <FeedbackTab snapshot={s} /> : null}
        {activeTab === "goals" ? <GoalsTab snapshot={s} /> : null}
      </div>
    </main>
  );
}

/* ============================================================
   Tab content
   ============================================================ */

function OverviewTab({ snapshot }: { snapshot: typeof performanceSnapshot }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Row 1 — 4 KPI cards */}
      <div className="grid grid-cols-12 gap-3.5">
        {snapshot.kpis.map((kpi, i) => (
          <KpiCard key={i} kpi={kpi} />
        ))}
      </div>
      {/* Row 2 — comparison + trend */}
      <div className="grid grid-cols-12 gap-3.5">
        <CmpBars rows={snapshot.comparison} />
        <ScoreTrendChart trend={snapshot.trend} />
      </div>
      {/* Row 3 — strengths + growth areas */}
      <div className="grid grid-cols-12 gap-3.5">
        <StrengthGrowthList
          label="Strengths"
          title="What you do well"
          items={snapshot.strengths}
        />
        <StrengthGrowthList
          label="Growth areas"
          title="Where to invest"
          items={snapshot.growthAreas}
        />
      </div>
      {/* Row 4 — peer ranking + goals */}
      <div className="grid grid-cols-12 gap-3.5">
        <PeerRankList
          peers={snapshot.peerRanking}
          comparisonsAnonymous={snapshot.peerComparisonsAnonymous}
        />
        <GoalList goals={snapshot.goals} />
      </div>
      {/* Row 5 — full-width feedback */}
      <div className="grid grid-cols-12 gap-3.5">
        <FeedbackList cards={snapshot.feedback} />
      </div>
    </div>
  );
}

function MetricsTab({ snapshot }: { snapshot: typeof performanceSnapshot }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-12 gap-3.5">
        {snapshot.kpis.map((kpi, i) => (
          <KpiCard key={i} kpi={kpi} />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-3.5">
        <CmpBars rows={snapshot.comparison} />
        <ScoreTrendChart trend={snapshot.trend} />
      </div>
    </div>
  );
}

function PeerRankingTab({ snapshot }: { snapshot: typeof performanceSnapshot }) {
  return (
    <div className="grid grid-cols-12 gap-3.5">
      <PeerRankList
        peers={snapshot.peerRanking}
        comparisonsAnonymous={snapshot.peerComparisonsAnonymous}
      />
    </div>
  );
}

function FeedbackTab({ snapshot }: { snapshot: typeof performanceSnapshot }) {
  return (
    <div className="grid grid-cols-12 gap-3.5">
      <FeedbackList cards={snapshot.feedback} />
    </div>
  );
}

function GoalsTab({ snapshot }: { snapshot: typeof performanceSnapshot }) {
  return (
    <div className="grid grid-cols-12 gap-3.5">
      <GoalList goals={snapshot.goals} />
    </div>
  );
}
