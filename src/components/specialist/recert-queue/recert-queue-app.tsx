"use client";

import { useEffect, useMemo, useState } from "react";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { DecisionBar } from "@/components/specialist/queue-shared/decision-bar";
import { QueueRail } from "@/components/specialist/queue-shared/queue-rail";
import { QueueShell } from "@/components/specialist/queue-shared/queue-shell";
import {
  RECERT_BULK_APPROVE_MIN,
  RECERT_DEFAULT_CANDIDATE_ID,
  RECERT_FILTERS,
  recertBulkApprovableCount,
  recertCandidates,
  type RecertCandidate,
} from "@/lib/mock-data/specialist/recert-queue";
import { DetailPane } from "./detail-pane";
import { OffboardModal, PauseModal, RecertifyModal } from "./modals";
import { RecertQueueRow } from "./recert-queue-row";

type ModalKind = "none" | "recertify" | "pause" | "offboard";

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

export function RecertQueueApp() {
  const [selectedId, setSelectedId] = useState<string>(
    RECERT_DEFAULT_CANDIDATE_ID,
  );
  const [modal, setModal] = useState<ModalKind>("none");
  const [flash, setFlash] = useState<FlashState>(FLASH_HIDDEN);

  const candidate: RecertCandidate = useMemo(
    () =>
      recertCandidates.find((c) => c.id === selectedId) ?? recertCandidates[0]!,
    [selectedId],
  );

  const position = useMemo(() => {
    const idx = recertCandidates.findIndex((c) => c.id === selectedId);
    return {
      current: Math.max(0, idx) + 1,
      total: recertCandidates.length,
    };
  }, [selectedId]);

  const goPrev = () => {
    const idx = recertCandidates.findIndex((c) => c.id === selectedId);
    if (idx > 0) setSelectedId(recertCandidates[idx - 1]!.id);
  };
  const goNext = () => {
    const idx = recertCandidates.findIndex((c) => c.id === selectedId);
    if (idx >= 0 && idx < recertCandidates.length - 1) {
      setSelectedId(recertCandidates[idx + 1]!.id);
    }
  };

  useEffect(() => {
    if (!flash.open) return;
    const timer = window.setTimeout(() => setFlash(FLASH_HIDDEN), 2000);
    return () => window.clearTimeout(timer);
  }, [flash.open]);

  const closeModal = () => setModal("none");

  const handleRecertify = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Re-certified.",
      tail: ` ${candidate.firstName} stays live.`,
      sub: "Tier action applied · loading next…",
      meta: `RECERT #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "success",
    });
  };

  const handlePause = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Paused.",
      tail: ` ${candidate.firstName} has 14 days.`,
      sub: "Action items sent · auto re-review at end of window.",
      meta: `PAUSE #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "warn",
    });
  };

  const handleOffboard = () => {
    closeModal();
    setFlash({
      open: true,
      verb: "Off-boarded.",
      tail: "",
      sub: "Audit logged · grace window applied to active engagements.",
      meta: `OFFBOARD #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "warn",
    });
  };

  const showBulkAction = recertBulkApprovableCount >= RECERT_BULK_APPROVE_MIN;

  const handleBulkApprove = () => {
    setFlash({
      open: true,
      verb: "Bulk re-certified.",
      tail: ` ${recertBulkApprovableCount} candidates advanced.`,
      sub: "Audit log captured each decision.",
      meta: `BULK #2K8F-MIG · ${new Date().toISOString().slice(0, 10)}`,
      tone: "success",
    });
  };

  return (
    <>
      <QueueShell
        rail={
          <QueueRail
            title="Re-cert queue"
            count={recertCandidates.length}
            countTone="warn"
            subtitle="Pool refresh due · top 3 shown"
            filters={RECERT_FILTERS.map((f) => ({ key: f.key, label: f.label }))}
            candidates={recertCandidates}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderRow={(c) => <RecertQueueRow c={c} />}
            emptyState={{
              title: "No re-certs due.",
              subtitle: "Pool refresh on schedule.",
            }}
            bulkAction={{
              visible: showBulkAction,
              label: `Approve ${recertBulkApprovableCount} clean re-certs`,
              onClick: handleBulkApprove,
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
          destructiveIcon="arrow-right"
          neutralIcon="pause"
          onDestructive={() => setModal("offboard")}
          onNeutral={() => setModal("pause")}
          onPrimary={() => setModal("recertify")}
        />
      </QueueShell>

      <RecertifyModal
        candidateName={candidate.fullName}
        open={modal === "recertify"}
        onClose={closeModal}
        onConfirm={handleRecertify}
      />
      <PauseModal
        candidateName={candidate.fullName}
        open={modal === "pause"}
        onClose={closeModal}
        onConfirm={handlePause}
      />
      <OffboardModal
        candidateName={candidate.fullName}
        open={modal === "offboard"}
        onClose={closeModal}
        onConfirm={handleOffboard}
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
