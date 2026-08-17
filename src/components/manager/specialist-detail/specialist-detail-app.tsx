"use client";

/**
 * SpecialistDetailApp — orchestrator for `/specialist/team/[id]`.
 *
 * Owns active-tab state. Reads `?tab=...` searchParam ONCE on
 * mount for initial state (per Step 5 Q1 lock); local React state
 * takes over after clicks (no URL sync, no history push).
 *
 * Hero "Log coaching note" button passes `onSetTab` callback up
 * to flip the active tab to "coaching" in-place.
 */

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { SdBackLink } from "./sd-back-link";
import { SdHero } from "./sd-hero";
import { SdMetaBar } from "./sd-meta-bar";
import { SdStatsStrip } from "./sd-stats-strip";
import { SdTabs, type SdTabKey } from "./sd-tabs";
import { SdTabOverview } from "./sd-tab-overview";
import { SdTabPerformance } from "./sd-tab-performance";
import { SdTabWorkload } from "./sd-tab-workload";
import { SdTabDaily } from "./sd-tab-daily";
import { SdTabCoaching } from "./sd-tab-coaching";
import { SdTabCommunication } from "./sd-tab-communication";
import { SdTabWork } from "./sd-tab-work";

const VALID_TABS: ReadonlyArray<SdTabKey> = [
  "overview",
  "performance",
  "workload",
  "daily",
  "coaching",
  "communication",
  "work",
];

function parseInitialTab(raw: string | null): SdTabKey {
  if (raw && (VALID_TABS as ReadonlyArray<string>).includes(raw)) {
    return raw as SdTabKey;
  }
  return "overview";
}

export function SpecialistDetailApp({
  specialist,
}: {
  specialist: Specialist;
}) {
  const searchParams = useSearchParams();
  /* useState lazy initializer — runs once. Reads `?tab=` for the
     initial state (deep-link from dashboard urgent cards etc.).
     After this, local state owns the active tab. */
  const [activeTab, setActiveTab] = useState<SdTabKey>(() =>
    parseInitialTab(searchParams.get("tab")),
  );

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <SdBackLink />
      <SdHero specialist={specialist} onSetTab={setActiveTab} />
      <SdMetaBar specialist={specialist} />
      <SdStatsStrip specialist={specialist} />
      <SdTabs active={activeTab} onChange={setActiveTab} />
      <TabPanel active={activeTab} specialist={specialist} />
    </div>
  );
}

function TabPanel({
  active,
  specialist,
}: {
  active: SdTabKey;
  specialist: Specialist;
}) {
  switch (active) {
    case "overview":
      return <SdTabOverview specialist={specialist} />;
    case "performance":
      return <SdTabPerformance />;
    case "workload":
      return <SdTabWorkload specialist={specialist} />;
    case "daily":
      return <SdTabDaily specialist={specialist} />;
    case "coaching":
      return <SdTabCoaching specialist={specialist} />;
    case "communication":
      return <SdTabCommunication specialist={specialist} />;
    case "work":
      return <SdTabWork specialist={specialist} />;
  }
}
