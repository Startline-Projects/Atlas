"use client";

import { useState } from "react";
import { ReviewHeader } from "@/components/specialist/queue-shared/review-header";
import { ReviewTabs } from "@/components/specialist/queue-shared/review-tabs";
import type { ReviewQueueCandidate } from "@/lib/mock-data/specialist/review-queue";
import {
  AntiCheatSection,
  AssessmentSection,
  IntroVideoSection,
  InterviewSection,
  NotesSection,
  OverviewSection,
  ProfileSection,
  ReferencesSection,
  WorkSamplesSection,
} from "./sections";

type DetailPaneProps = {
  candidate: ReviewQueueCandidate;
  position: { current: number; total: number };
  onPrev?: () => void;
  onNext?: () => void;
};

/** Map from tab key to the section's DOM id so tab clicks can scroll-jump. */
const TAB_TO_ID: Record<string, string> = {
  overview: "rs-overview",
  "interview-1": "rs-interview-1",
  "interview-2": "rs-interview-2",
  profile: "rs-profile",
  video: "rs-video",
  references: "rs-references",
  samples: "rs-samples",
  "anti-cheat": "rs-anti-cheat",
  assessment: "rs-assessment",
  notes: "rs-notes",
};

/**
 * Note: this component is re-mounted by the parent on candidate change
 * via `key={candidate.id}`, so `activeTab` naturally resets to "overview"
 * without a useEffect. See `review-queue-app.tsx`.
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

  // SLA progress: 24h is 0%, breached is 100%.
  const slaPct = Math.min(
    100,
    Math.round((candidate.hoursSinceSubmission / 24) * 100),
  );

  return (
    <>
      <ReviewHeader
        crumbs={[
          { label: "Dashboard", href: "/specialist/dashboard" },
          { label: "Review queue", href: "/specialist/review-queue" },
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
          { label: candidate.languagesShort },
          { label: candidate.hourlyRate },
          { label: `★ ${candidate.composite} composite`, tone: "lime" },
        ]}
        progress={{
          text: (
            <>
              SLA:{" "}
              <strong className="font-semibold">
                {candidate.slaHoursRemaining > 0
                  ? `${candidate.slaHoursRemaining}h left`
                  : "breached"}
              </strong>{" "}
              of 24h
            </>
          ),
          progressPct: slaPct,
          tone: candidate.slaBand,
        }}
      />

      <ReviewTabs
        tabs={candidate.tabs}
        activeKey={activeTab}
        onChange={handleTabChange}
        ariaLabel="Review sections"
      />

      <div className="container-page mx-auto max-w-none px-6 sm:px-9">
        <OverviewSection c={candidate} />
        <InterviewSection c={candidate} which="interview1" num="02" />
        <InterviewSection c={candidate} which="interview2" num="03" />
        <ProfileSection c={candidate} />
        <IntroVideoSection c={candidate} />
        <ReferencesSection c={candidate} />
        <WorkSamplesSection c={candidate} />
        <AntiCheatSection c={candidate} />
        <AssessmentSection c={candidate} />
        <NotesSection />
      </div>
    </>
  );
}
