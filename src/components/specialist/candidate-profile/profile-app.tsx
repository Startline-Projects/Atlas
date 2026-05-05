"use client";

import { useState } from "react";
import type { CandidateProfile } from "@/lib/mock-data/specialist/candidate-profile";
import { ProfileHero } from "./profile-hero";
import { ProfileStats } from "./profile-stats";
import {
  ProfileTabs,
  type ProfileTabDef,
  type ProfileTabKey,
} from "./profile-tabs";
import {
  AntiCheatSection,
  BioSection,
  EngagementsSection,
  FeedbackSection,
  TimelineSection,
  VitalFactsSection,
  VouchesSection,
} from "./profile-sections";

const TAB_TO_ID: Record<ProfileTabKey, string> = {
  overview: "cps-overview",
  engagements: "cps-engagements",
  feedback: "cps-feedback",
  activity: "cps-activity",
};

export function ProfileApp({ profile }: { profile: CandidateProfile }) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("overview");

  const tabs: ReadonlyArray<ProfileTabDef> = [
    { key: "overview", label: "Overview" },
    { key: "engagements", label: "Engagements", count: profile.engagements.length },
    { key: "feedback", label: "Feedback & ratings" },
    { key: "activity", label: "Activity timeline" },
  ];

  const handleTabChange = (key: ProfileTabKey) => {
    setActiveTab(key);
    if (typeof document !== "undefined") {
      document
        .getElementById(TAB_TO_ID[key])
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <ProfileHero p={profile} />
      <ProfileStats p={profile} />
      <ProfileTabs tabs={tabs} activeKey={activeTab} onChange={handleTabChange} />
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 px-6 pt-6 pb-15 sm:px-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        <div className="flex min-w-0 flex-col gap-4">
          <BioSection p={profile} />
          <EngagementsSection p={profile} />
          <FeedbackSection p={profile} />
          <TimelineSection p={profile} />
        </div>
        <aside className="flex min-w-0 flex-col gap-4">
          <VitalFactsSection p={profile} />
          <VouchesSection p={profile} />
          <AntiCheatSection p={profile} />
        </aside>
      </div>
    </main>
  );
}
