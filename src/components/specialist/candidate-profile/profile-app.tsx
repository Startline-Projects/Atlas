"use client";

import { useState } from "react";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { useQueuedFlash } from "@/components/specialist/people-shared";
import {
  SchedulingModal,
  formatSchedulePartsForFlash,
  type SchedulePayload,
} from "@/components/specialist/shell/scheduling-modal";
import {
  WorkflowUnavailableModal,
  type WorkflowKind,
} from "@/components/specialist/shell/workflow-unavailable-modal";
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

/** Identifier for the open workflow modal — kind + subject. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

export function ProfileApp({ profile }: { profile: CandidateProfile }) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("overview");

  /* Hero workflow modals. SchedulingModal is its own state slot because
     it has real picker UI; the other two share a kind/subject state slot
     dispatched into WorkflowUnavailableModal. Mirrors my-candidates-app. */
  const [scheduling, setScheduling] = useState<boolean>(false);
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  /* Queued-flash trigger — used only for the SchedulingModal confirm path
     here. The other two hero actions render WorkflowUnavailableModal
     ("Got it"-only acknowledgement) and don't fire a flash. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

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

  /* Hero action handlers. */
  const handleSchedule = () => setScheduling(true);
  const handleSuggestForClient = () =>
    setWorkflowModal({ workflow: "suggest-for-client", subjectName: profile.fullName });
  const handleFlagForRecert = () =>
    setWorkflowModal({ workflow: "flag-recert", subjectName: profile.fullName });

  /* SchedulingModal confirm — success-tone flash with backend-honesty in
     the message string ("invite pending") and the sub-line. Locked in
     across both SchedulingModal consumers (this + my-candidates). See
     SchedulingModal tone-consistency decision in CONVERSION_LOG. */
  const handleScheduleConfirm = (payload: SchedulePayload) => {
    const parts = formatSchedulePartsForFlash(payload);
    fireQueuedFlash(
      `Scheduled. ${profile.firstName} · ${parts}${payload.videoCall ? " · video link queued" : ""}`,
      { tone: "success", tail: "Invite pending — scheduling service not yet wired" },
    );
    setScheduling(false);
  };

  return (
    <>
      <main className="bg-cream flex min-w-0 flex-1 flex-col">
        <ProfileHero
          p={profile}
          onSchedule={handleSchedule}
          onSuggestForClient={handleSuggestForClient}
          onFlagForRecert={handleFlagForRecert}
        />
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

      <SchedulingModal
        key={scheduling ? "open" : "closed"}
        open={scheduling}
        subjectName={profile.fullName}
        onClose={() => setScheduling(false)}
        onSchedule={handleScheduleConfirm}
      />

      <WorkflowUnavailableModal
        open={workflowModal !== null}
        workflow={workflowModal?.workflow ?? "suggest-for-client"}
        subjectName={workflowModal?.subjectName ?? ""}
        onClose={() => setWorkflowModal(null)}
      />

      <ApprovedFlash {...flash} />
    </>
  );
}
