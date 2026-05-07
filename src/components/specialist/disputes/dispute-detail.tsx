"use client";

/**
 * Dispute detail pane — header + parties + tab strip + tab-routed
 * content + sticky decision bar.
 *
 * Tab content:
 *   - overview  → status banner + Section 01 (claim cards) + Section 02 (atlas summary) + Section 03 (timeline excerpt) + Section 04 (evidence preview)
 *   - timeline  → full timeline only
 *   - evidence  → full evidence ledger only
 *   - decision  → decision summary (if resolved/escalated) OR placeholder for the unresolved decision form
 *   - audit     → audit log placeholder
 *
 * Active tab state lives here (default "overview").
 *
 * Client Component (owns activeTab + escalation modal triggers).
 */

import { useState } from "react";
import {
  DISPUTE_DECISION_LABEL,
  type Dispute,
} from "@/lib/mock-data/specialist/disputes";
import type { TabDef } from "@/lib/mock-data/specialist/queue-types";
import { ReviewTabs } from "@/components/specialist/queue-shared/review-tabs";
import { SectionFrame } from "@/components/specialist/queue-shared/section-frame";
import { DisputeHeader } from "./dispute-header";
import { PartiesCard } from "./parties-card";
import { DisputeStatusBanner } from "./dispute-status-banner";
import { ClaimCards } from "./claim-cards";
import { AtlasSummary } from "./atlas-summary";
import { DisputeTimeline } from "./dispute-timeline";
import { EvidenceLedger } from "./evidence-ledger";
import { DisputeDecisionBar } from "./dispute-decision-bar";

type Props = {
  dispute: Dispute;
  /** Triggered by header "Escalate to admin" — opens the modal in the parent. */
  onRequestEscalate: () => void;
};

export function DisputeDetail({ dispute, onRequestEscalate }: Props) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const isResolved = dispute.filterKey === "resolved";

  const tabs: ReadonlyArray<TabDef> = [
    { key: "overview", label: "Overview" },
    {
      key: "timeline",
      label: "Timeline",
      badge: { kind: "number", value: dispute.timelineTotalCount },
    },
    {
      key: "evidence",
      label: "Evidence",
      badge: { kind: "number", value: dispute.evidenceTotalCount },
    },
    { key: "decision", label: "Decision" },
    {
      key: "audit",
      label: "Audit log",
      badge: { kind: "number", value: dispute.auditLogTotalCount },
    },
  ];

  const handleSaveDraft = () => {
    // No-op visual feedback this session — no persistence.
  };

  const handleOpenDecisionForm = () => {
    // No-op this session — decision form is out of scope.
    // Future-session: routes to /specialist/disputes/decide?id=...
  };

  return (
    <div className="bg-cream flex min-w-0 flex-1 flex-col">
      <DisputeHeader dispute={dispute} onEscalate={onRequestEscalate} />
      <PartiesCard
        claimant={dispute.claimant}
        respondent={dispute.respondent}
      />
      <ReviewTabs
        tabs={tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
        ariaLabel="Dispute sections"
      />

      <div className="container-page mx-auto flex max-w-none flex-1 flex-col px-9 pb-24 max-md:px-5">
        {activeTab === "overview" ? (
          <OverviewTab dispute={dispute} />
        ) : null}
        {activeTab === "timeline" ? (
          <SectionFrame
            num="01"
            title="Full timeline"
            meta={
              <span>
                {dispute.timeline.length} of {dispute.timelineTotalCount} events
              </span>
            }
          >
            <DisputeTimeline items={dispute.timeline} />
          </SectionFrame>
        ) : null}
        {activeTab === "evidence" ? (
          <SectionFrame
            num="01"
            title="Evidence ledger"
            meta={
              <span>
                {dispute.evidenceReviewedCount} of {dispute.evidenceTotalCount}{" "}
                reviewed
              </span>
            }
          >
            <EvidenceLedger
              items={dispute.evidence}
              totalCount={dispute.evidenceTotalCount}
              reviewedCount={dispute.evidenceReviewedCount}
            />
          </SectionFrame>
        ) : null}
        {activeTab === "decision" ? (
          <DecisionTab dispute={dispute} />
        ) : null}
        {activeTab === "audit" ? (
          <SectionFrame
            num="01"
            title="Audit log"
            meta={
              <span className="font-mono">
                {dispute.auditLogTotalCount} entries · admin-readable
              </span>
            }
          >
            <div className="bg-paper border-line rounded-lg border px-5 py-4 text-[13px] leading-[1.55] text-ink-mute">
              The full audit log carries every state change, every message,
              and every decision touch on this case. It is not surfaced as
              an interactive panel this session — when services land, the
              audit-log tab will render the full chronological list with
              actor / action / target / timestamp filtering.
            </div>
          </SectionFrame>
        ) : null}
      </div>

      <DisputeDecisionBar
        slaLabel={dispute.slaLabel}
        evidenceReviewedCount={dispute.evidenceReviewedCount}
        evidenceTotalCount={dispute.evidenceTotalCount}
        onSaveDraft={handleSaveDraft}
        onOpenDecisionForm={handleOpenDecisionForm}
        isResolved={isResolved}
      />
    </div>
  );
}

/* ============================================================
   Overview tab — 4 sections
   ============================================================ */

function OverviewTab({ dispute }: { dispute: Dispute }) {
  return (
    <>
      <div className="pt-7">
        <DisputeStatusBanner banner={dispute.statusBanner} />
      </div>
      <SectionFrame
        num="01"
        title="Claim summary"
        meta={
          <span>
            {dispute.claims.length} statement
            {dispute.claims.length === 1 ? "" : "s"}
          </span>
        }
      >
        <ClaimCards claims={dispute.claims} />
      </SectionFrame>
      <SectionFrame
        num="02"
        title="Atlas summary"
        meta={
          <span>{dispute.atlasSummary.recommendation.label}</span>
        }
      >
        <AtlasSummary summary={dispute.atlasSummary} />
      </SectionFrame>
      <SectionFrame
        num="03"
        title="Recent activity"
        meta={
          <span>
            {dispute.timeline.length} of {dispute.timelineTotalCount} events
          </span>
        }
      >
        <DisputeTimeline items={dispute.timeline} />
      </SectionFrame>
      <SectionFrame
        num="04"
        title="Evidence ledger"
        meta={
          <span>
            {dispute.evidenceReviewedCount} of {dispute.evidenceTotalCount}{" "}
            reviewed
          </span>
        }
      >
        <EvidenceLedger
          items={dispute.evidence}
          totalCount={dispute.evidenceTotalCount}
          reviewedCount={dispute.evidenceReviewedCount}
        />
      </SectionFrame>
    </>
  );
}

/* ============================================================
   Decision tab — resolved cases show the decision; unresolved
   cases show a placeholder pointing at the future decision form
   ============================================================ */

function DecisionTab({ dispute }: { dispute: Dispute }) {
  if (dispute.decision) {
    const { decision } = dispute;
    return (
      <SectionFrame
        num="01"
        title="Decision recorded"
        status={{ label: "Resolved", tone: "success" }}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-paper border-line rounded-lg border p-5">
            <div className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
              Decision
            </div>
            <div className="mt-1 text-[16px] font-medium text-ink">
              {DISPUTE_DECISION_LABEL[decision.option]}
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
              {decision.decidedBy} · {decision.decidedAtLabel}
            </div>
          </div>
          <div className="bg-cream border-line-soft rounded-lg border p-5">
            <div className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
              Rationale
            </div>
            <p
              className="font-display mt-1.5 text-[14px] italic leading-[1.55] text-ink-soft"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {decision.rationale}
            </p>
          </div>
        </div>
      </SectionFrame>
    );
  }
  if (dispute.escalation) {
    const { escalation } = dispute;
    return (
      <SectionFrame
        num="01"
        title="Escalated to admin"
        status={{ label: "Admin handling", tone: "warn" }}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-paper border-line rounded-lg border border-l-[3px] border-l-amber p-5">
            <div className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-amber">
              Escalation reason
            </div>
            <p
              className="font-display mt-1.5 text-[14px] italic leading-[1.55] text-ink-soft"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {escalation.reason}
            </p>
            <div className="mt-3 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
              {escalation.escalatedBy} · {escalation.escalatedAtLabel}
            </div>
            {escalation.assignedAdmin ? (
              <div className="mt-1 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
                Assigned admin: {escalation.assignedAdmin}
              </div>
            ) : null}
          </div>
        </div>
      </SectionFrame>
    );
  }
  return (
    <SectionFrame
      num="01"
      title="Decision form"
      meta={
        <span className="font-mono text-[11px] uppercase">Out of scope · Session 5</span>
      }
    >
      <div className="bg-paper border-line rounded-lg border px-5 py-6 text-[13.5px] leading-[1.55] text-ink-mute">
        <p>
          The decision form is the next step. When services land, this tab
          will surface the 8-option PDF decision picker (Side with client /
          Side with candidate / Partial split / Refund full / Refund partial
          / Replace candidate / Dismiss / Escalate) plus a required
          rationale textarea.
        </p>
        <p className="mt-3">
          Until then, use the &ldquo;Open decision form&rdquo; button in the
          decision bar at the bottom of this view to indicate intent. The
          button is wired but does not yet route anywhere.
        </p>
      </div>
    </SectionFrame>
  );
}
