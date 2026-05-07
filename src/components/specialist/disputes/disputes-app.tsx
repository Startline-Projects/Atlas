"use client";

/**
 * Disputes orchestrator. URL state via `?id=<DSP-...>`, read with
 * `useSearchParams`, swapped via `useRouter().replace()` (not push) so
 * back-button history doesn't pollute with every selection — same
 * pattern as candidate-chat from Session 4.
 *
 * State owned here:
 *   - The active dispute (derived from URL id, falls back to default)
 *   - Escalation modal open + the most recently escalated case for the
 *     approved-flash trigger
 *
 * The detail pane (`DisputeDetail`) owns its own active-tab state so
 * switching disputes doesn't lose tab position when you come back.
 *
 * Reuse:
 *   - QueueShell — 3-col shell (sidebar one level up)
 *   - QueueRail — generic rail with filters + search-less list
 *   - SectionFrame, ReviewTabs, ReviewModal, ApprovedFlash, NotesCard —
 *     consumed by the detail pane and the escalation modal
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  DISPUTES_HEADER_SUBTITLE,
  DISPUTE_FILTERS,
  DISPUTE_DEFAULT_ID,
  disputes,
  type Dispute,
  type DisputeRowLite,
} from "@/lib/mock-data/specialist/disputes";
import { QueueShell } from "@/components/specialist/queue-shared/queue-shell";
import { QueueRail } from "@/components/specialist/queue-shared/queue-rail";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { DisputeRow } from "./dispute-row";
import { DisputeDetail } from "./dispute-detail";
import { EscalationModal } from "./escalation-modal";

/**
 * Project the lite row + state into the QueueRail-required `filterTags`
 * shape ("all" + filterKey). Keeps the rail generic and the dispute
 * mock data small.
 */
type RailRow = DisputeRowLite & {
  filterTags: ReadonlyArray<string>;
};

function toRailRow(d: Dispute): RailRow {
  return {
    ...d,
    filterTags: ["all", d.filterKey],
  };
}

const RAIL_ROWS: ReadonlyArray<RailRow> = disputes.map(toRailRow);

const FILTERS = DISPUTE_FILTERS.map((f) => ({ key: f.key, label: f.label }));

export function DisputesApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  /* Resolve active dispute. Default = first row (Sofia / Quill primary). */
  const activeDispute = useMemo<Dispute | undefined>(() => {
    const id = idFromUrl ?? DISPUTE_DEFAULT_ID;
    return disputes.find((d) => d.id === id);
  }, [idFromUrl]);

  /* Escalation flow state */
  const [escalationOpen, setEscalationOpen] = useState(false);
  const [flashOpen, setFlashOpen] = useState(false);
  const [flashCaseId, setFlashCaseId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params.toString());
      next.set("id", id);
      router.replace(`/specialist/disputes?${next.toString()}`);
    },
    [params, router],
  );

  const handleRequestEscalate = useCallback(() => {
    if (!activeDispute) return;
    setEscalationOpen(true);
  }, [activeDispute]);

  const handleConfirmEscalate = useCallback(
    // The `reason` text would be persisted by the service layer once
    // wired; we don't need it for the visual approved-flash flow.
    () => {
      if (!activeDispute) return;
      setEscalationOpen(false);
      setFlashCaseId(activeDispute.caseId);
      setFlashOpen(true);
      // Auto-dismiss the flash after a moment — matches Session 2's
      // approved-flash pattern (visible for ~2s, then fades).
      setTimeout(() => {
        setFlashOpen(false);
      }, 2000);
    },
    [activeDispute],
  );

  return (
    <>
      <QueueShell
        rail={
          <QueueRail<RailRow>
            title="Disputes"
            count={disputes.length}
            countTone="danger"
            subtitle={DISPUTES_HEADER_SUBTITLE}
            filters={FILTERS}
            defaultFilterKey="all"
            candidates={RAIL_ROWS}
            selectedId={activeDispute?.id ?? ""}
            onSelect={handleSelect}
            renderRow={(row) => <DisputeRow row={row} />}
            emptyState={{
              title: "No disputes match",
              subtitle: "Try a different filter.",
            }}
          />
        }
      >
        {activeDispute ? (
          <DisputeDetail
            dispute={activeDispute}
            onRequestEscalate={handleRequestEscalate}
          />
        ) : (
          <div className="bg-cream flex min-h-[calc(100vh-36px-57px)] flex-1 items-center justify-center p-10">
            <div className="max-w-[360px] text-center text-ink-mute">
              <h3
                className="font-display mb-2 text-[22px] font-normal tracking-tight text-ink"
                style={{ fontVariationSettings: '"opsz" 96' }}
              >
                No <em className="italic text-ink-soft">case</em> selected
              </h3>
              <p className="text-[13.5px] leading-[1.55]">
                Pick a dispute from the list, or check the &ldquo;All&rdquo;
                filter if you don&apos;t see one.
              </p>
            </div>
          </div>
        )}
      </QueueShell>

      <EscalationModal
        open={escalationOpen}
        caseId={activeDispute?.caseId ?? ""}
        onClose={() => setEscalationOpen(false)}
        onConfirm={handleConfirmEscalate}
      />

      <ApprovedFlash
        open={flashOpen}
        verb="Escalated."
        tail={flashCaseId ? `${flashCaseId} sent to admin.` : "Sent to admin."}
        sub="Admin will review and pick up from here."
        meta={
          flashCaseId
            ? `ESCALATION · ${flashCaseId}`
            : "ESCALATION"
        }
        tone="warn"
      />
    </>
  );
}
