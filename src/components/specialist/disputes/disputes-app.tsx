"use client";

/**
 * Disputes orchestrator. URL state via `?id=<DSP-...>`, read with
 * `useSearchParams`, swapped via `useRouter().replace()` (not push) so
 * back-button history doesn't pollute with every selection — same
 * pattern as candidate-chat from Session 4.
 *
 * State owned here:
 *   - The active dispute (derived from URL id, falls back to default)
 *   - Escalation modal open
 *   - `useQueuedFlash` — SINGLE source of truth for all dispute flash
 *     acknowledgements (escalation confirm + every action wired in
 *     the Step 10 polish: Export PDF, Save draft, etc.). Two
 *     ApprovedFlash mounts would visually conflict if user fires two
 *     actions within the auto-dismiss window — migrating escalation
 *     to the hook keeps the surface to one mount. Cosmetic trade-off:
 *     the prior escalation flash carried a separate `meta` line
 *     ("ESCALATION · DSP-...") that the queued-flash shape doesn't
 *     have. Case id is now interpolated into the heading instead.
 *
 * The detail pane (`DisputeDetail`) owns its own active-tab state +
 * preview-modal state. Action handlers (Export PDF / Save draft /
 * jump-to-tab / preview attachment) live there. `DisputesApp` passes
 * `fireQueuedFlash` down so DisputeDetail can fire from its handlers
 * without duplicating the hook.
 *
 * Reuse:
 *   - QueueShell — 3-col shell (sidebar one level up)
 *   - QueueRail — generic rail with filters + search-less list
 *   - useQueuedFlash + ApprovedFlash — consumed for ALL flash actions
 *   - SectionFrame, ReviewTabs, ReviewModal, NotesCard —
 *     consumed by the detail pane and the escalation modal
 *   - PreviewUnavailableModal — Step 10 added consumer (mounted in
 *     DisputeDetail; lives there because previewState lives there)
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
import { useQueuedFlash } from "@/components/specialist/people-shared";
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

  /* Single queued-flash for ALL dispute action acknowledgements. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

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
    /* `reason` text would be persisted by the service layer once wired;
       not needed for the visual flash. */
    () => {
      if (!activeDispute) return;
      setEscalationOpen(false);
      fireQueuedFlash(
        `Escalated. ${activeDispute.caseId} sent to admin.`,
        { tone: "warn", tail: "Admin will review and pick up from here." },
      );
    },
    [activeDispute, fireQueuedFlash],
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
            fireQueuedFlash={fireQueuedFlash}
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

      <ApprovedFlash {...flash} />
    </>
  );
}
