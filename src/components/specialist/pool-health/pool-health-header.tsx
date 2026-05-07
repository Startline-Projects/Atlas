"use client";

/**
 * Pool-health page header. Reuses `RosterHeader` for the eyebrow +
 * title + subtitle + actions slot. The actions slot carries the
 * Client period-toggle + a decorative Export button.
 *
 * The toggle holds local state — no URL state, no data refetch this
 * session (mock data only models the active period). When services
 * land, swapping the toggle re-fetches the snapshot.
 *
 * Client Component because of the period-toggle's useState.
 */

import { useState } from "react";
import { Download } from "lucide-react";

import {
  POOL_HEALTH_PERIODS,
  type PoolHealthPeriod,
} from "@/lib/mock-data/specialist/pool-health";
import {
  RosterHeader,
  RosterActionButton,
} from "@/components/specialist/people-shared";
import { PeriodToggle } from "@/components/specialist/operations-shared";

export function PoolHealthHeader({
  category,
  liveCount,
  lastRefreshLabel,
  initialPeriod,
}: {
  category: string;
  liveCount: number;
  lastRefreshLabel: string;
  initialPeriod: PoolHealthPeriod;
}) {
  const [period, setPeriod] = useState<PoolHealthPeriod>(initialPeriod);

  return (
    <RosterHeader
      eyebrow="Strategic view"
      title={{ lead: "Pool", italic: "health" }}
      subtitle={`${category} · ${liveCount} live talents · last refresh ${lastRefreshLabel}`}
      actions={
        <>
          <PeriodToggle<PoolHealthPeriod>
            options={POOL_HEALTH_PERIODS}
            active={period}
            onChange={setPeriod}
            ariaLabel="Pool-health period"
          />
          <RosterActionButton
            icon={<Download className="h-3 w-3" strokeWidth={1.5} />}
          >
            Export
          </RosterActionButton>
        </>
      }
    />
  );
}
