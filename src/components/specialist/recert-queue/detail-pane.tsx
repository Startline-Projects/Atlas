"use client";

import { useState } from "react";
import { ReviewHeader } from "@/components/specialist/queue-shared/review-header";
import { ReviewTabs } from "@/components/specialist/queue-shared/review-tabs";
import type { RecertCandidate } from "@/lib/mock-data/specialist/recert-queue";
import {
  AntiCheatSection,
  AssessmentSection,
  ChangesSection,
  EngagementSection,
  FeedbackSection,
  NotesSection,
  OverviewSection,
  RecertInterviewSection,
  ReferencesSection,
} from "./sections";

/** Map from tab key to the section's DOM id so tab clicks can scroll-jump. */
const TAB_TO_ID: Record<string, string> = {
  overview: "rcs-overview",
  engagement: "rcs-engagement",
  feedback: "rcs-feedback",
  changes: "rcs-changes",
  interview: "rcs-interview",
  references: "rcs-references",
  "anti-cheat": "rcs-anti-cheat",
  assessment: "rcs-assessment",
  notes: "rcs-notes",
};

type DetailPaneProps = {
  candidate: RecertCandidate;
  position: { current: number; total: number };
  onPrev?: () => void;
  onNext?: () => void;
};

/**
 * Re-mounted by the parent on candidate change via `key={candidate.id}`,
 * so `activeTab` resets to "overview" naturally without a useEffect.
 */
export function DetailPane({
  candidate,
  position,
  onPrev,
  onNext,
}: DetailPaneProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const id = TAB_TO_ID[key];
    if (id) {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cert progress: bar fills proportional to days remaining (matches
  // source HTML's per-row hardcoded values like style="--progress: 8%"
  // for 14 days — roughly daysRemaining * 0.6, clamped).
  const certPct = Math.max(
    3,
    Math.min(100, Math.round(candidate.certExpiresInDays * 0.6)),
  );

  return (
    <>
      <ReviewHeader
        crumbs={[
          { label: "Dashboard", href: "/specialist/dashboard" },
          { label: "Re-cert queue", href: "/specialist/recert-queue" },
          { label: `${position.current} of ${position.total}` },
        ]}
        position={position}
        onPrev={onPrev}
        onNext={onNext}
        initials={candidate.initials}
        avatarGradient={candidate.avatarGradient}
        name={candidate.fullName}
        age={candidate.age}
        countryFlag={candidate.countryFlag}
        tags={[
          { label: candidate.category },
          { label: `${candidate.city}, ${candidate.countryName}` },
          { label: `${candidate.monthsInPool} months in pool` },
          { label: `${candidate.currentTier} tier` },
          {
            label: `★ ${candidate.averageRating.toFixed(1)} rating`,
            tone: "success",
          },
        ]}
        progress={{
          text: (
            <>
              Cert expires{" "}
              <strong className="font-semibold">
                in {candidate.certExpiresInDays} days
              </strong>
            </>
          ),
          progressPct: certPct,
          tone: candidate.certBand,
        }}
      />

      <ReviewTabs
        tabs={candidate.tabs}
        activeKey={activeTab}
        onChange={handleTabChange}
        ariaLabel="Re-cert sections"
      />

      <div className="container-page mx-auto max-w-none px-6 sm:px-9">
        <OverviewSection c={candidate} />
        <EngagementSection c={candidate} />
        <FeedbackSection c={candidate} />
        <ChangesSection c={candidate} />
        <RecertInterviewSection c={candidate} />
        <ReferencesSection c={candidate} />
        <AntiCheatSection c={candidate} />
        <AssessmentSection c={candidate} />
        <NotesSection />
      </div>
    </>
  );
}
