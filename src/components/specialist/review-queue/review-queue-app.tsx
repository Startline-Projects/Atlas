"use client";

import { useEffect, useMemo, useState } from "react";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { DecisionBar } from "@/components/specialist/queue-shared/decision-bar";
import { QueueRail } from "@/components/specialist/queue-shared/queue-rail";
import { QueueShell } from "@/components/specialist/queue-shared/queue-shell";
import {
  REVIEW_DEFAULT_CANDIDATE_ID,
  REVIEW_FILTERS,
  reviewQueueCandidates,
  type ReviewQueueCandidate,
} from "@/lib/mock-data/specialist/review-queue";
import { DetailPane } from "./detail-pane";
import { ApproveModal, RejectModal, RevisionsModal } from "./modals";
import { ReviewQueueRow } from "./review-queue-row";

type ModalKind = "none" | "approve" | "revisions" | "reject";

type FlashState = {
  open: boolean;
  verb: string;
  tail: string;
  sub: string;
  meta: string;
  tone: "success" | "warn";
};

const FLASH_HIDDEN: FlashState = {
  open: false,
  verb: "",
  tail: "",
  sub: "",
  meta: "",
  tone: "success",
};

export function ReviewQueueApp() {
  const [selectedId, setSelectedId] = useState<string>(
    REVIEW_DEFAULT_CANDIDATE_ID,
  );
  const [modal, setModal] = useState<ModalKind>("none");
  const [flash, setFlash] = useState<FlashState>(FLASH_HIDDEN);

  const candidate: ReviewQueueCandidate = useMemo(
    () =>
      reviewQueueCandidates.find((c) => c.id === selectedId) ??
      reviewQueueCandidates[0]!,
    [selectedId],
  );

  const position = useMemo(() => {
    const idx = reviewQueueCandidates.findIndex((c) => c.id === selectedId);
    return {
      current: Math.max(0, idx) + 1,
      total: reviewQueueCandidates.length,
    };
  }, [selectedId]);

  const goPrev = () => {
    const idx = reviewQueueCandidates.findIndex((c) => c.id === selectedId);
    if (idx > 0) setSelectedId(reviewQueueCandidates[idx - 1]!.id);
  };
  const goNext = () => {
    const idx = reviewQueueCandidates.findIndex((c) => c.id === selectedId);
    if (idx >= 0 && idx < reviewQueueCandidates.length - 1) {
      setSelectedId(reviewQueueCandidates[idx + 1]!.id);
    }
  };

  // Auto-dismiss the flash overlay after ~2s.
  useEffect(() => {
    if (!flash.open) return;
    const timer = window.setTimeout(() => setFlash(FLASH_HIDDEN), 2000);
    return () => window.clearTimeout(timer);
  }, [flash.open]);

  const closeModal = () => setModal("none");

  const handleApprove = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Approved.",
      tail: ` ${candidate.firstName}'s live.`,
      sub: "Loading next candidate…",
      meta: `REVIEW #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "success",
    });
  };

  const handleRevisions = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Revisions sent.",
      tail: "",
      sub: `${candidate.firstName} will see the checklist on their dashboard.`,
      meta: `REV #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "warn",
    });
  };

  const handleReject = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Rejected.",
      tail: "",
      sub: "Audit logged. Specialist queue refreshed.",
      meta: `REJECT #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "warn",
    });
  };

  return (
    <>
      <QueueShell
        rail={
          <QueueRail
            title="Review queue"
            count={reviewQueueCandidates.length}
            countTone="danger"
            subtitle="Awaiting your decision"
            filters={REVIEW_FILTERS.map((f) => ({ key: f.key, label: f.label }))}
            candidates={reviewQueueCandidates}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderRow={(c) => <ReviewQueueRow c={c} />}
            emptyState={{
              title: "Queue clear.",
              subtitle: "Nothing waiting on you right now.",
            }}
          />
        }
      >
        <DetailPane
          key={candidate.id}
          candidate={candidate}
          position={position}
          onPrev={goPrev}
          onNext={goNext}
        />

        <DecisionBar
          config={candidate.decisionBar}
          onDestructive={() => setModal("reject")}
          onNeutral={() => setModal("revisions")}
          onPrimary={() => setModal("approve")}
        />
      </QueueShell>

      <ApproveModal
        candidateName={candidate.fullName}
        open={modal === "approve"}
        onClose={closeModal}
        onConfirm={handleApprove}
      />
      <RevisionsModal
        candidateName={candidate.fullName}
        open={modal === "revisions"}
        onClose={closeModal}
        onConfirm={handleRevisions}
      />
      <RejectModal
        candidateName={candidate.fullName}
        open={modal === "reject"}
        onClose={closeModal}
        onConfirm={handleReject}
      />

      <ApprovedFlash
        open={flash.open}
        verb={flash.verb}
        tail={flash.tail}
        sub={flash.sub}
        meta={flash.meta}
        tone={flash.tone}
      />
    </>
  );
}
