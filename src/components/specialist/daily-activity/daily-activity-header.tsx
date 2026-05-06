"use client";

/**
 * Daily-activity page header. RosterHeader + period-toggle (Client
 * island) + Export-log button.
 *
 * Period toggle is Today / 7 days / 30 days. Like pool-health, the
 * underlying snapshot doesn't actually re-fetch when the toggle
 * changes (mock data only models one period); the toggle is local
 * state. When services land, the toggle re-fetches the snapshot.
 *
 * Client Component because of the period-toggle's useState.
 */

import { useState } from "react";
import { Download } from "lucide-react";

import {
  ACTIVITY_PERIODS,
  type ActivityPeriod,
} from "@/lib/mock-data/specialist/daily-activity";
import {
  RosterHeader,
  RosterActionButton,
} from "@/components/specialist/people-shared";
import { PeriodToggle } from "@/components/specialist/operations-shared";

export function DailyActivityHeader({
  initialPeriod,
}: {
  initialPeriod: ActivityPeriod;
}) {
  const [period, setPeriod] = useState<ActivityPeriod>(initialPeriod);

  return (
    <RosterHeader
      eyebrow="Personal log"
      title={{ lead: "Daily", italic: "activity" }}
      subtitle="Your decisions, messages, and actions · audited & timestamped"
      actions={
        <>
          <PeriodToggle<ActivityPeriod>
            options={ACTIVITY_PERIODS}
            active={period}
            onChange={setPeriod}
            ariaLabel="Activity period"
          />
          <RosterActionButton
            icon={<Download className="h-3 w-3" strokeWidth={1.5} />}
          >
            Export log
          </RosterActionButton>
        </>
      }
    />
  );
}
