"use client";

/**
 * Sourcing orchestrator. Full-bleed kanban (no rail — sidebar is one
 * level up).
 *
 * State owned here:
 *   - source filter chip (All / LinkedIn / Referral / Talent search / AI scout)
 *   - search input value
 *   - add-prospect modal { open, defaultStage }
 *   - workflow modal { workflow, subjectName } — header "Import list"
 *   - useQueuedFlash for all card / sheet / modal-submit acknowledgements
 *
 * URL state via `?id=<prospect-...>` for the slide-over detail —
 * `useSearchParams` + `router.replace()` (not push), same pattern as
 * candidate-chat / disputes.
 *
 * Filter + search both run client-side over `sourcingProspects` —
 * the kanban-board + columns receive the filtered list and partition
 * by stage.
 *
 * Stage-aware milestone flash (per Step 9 audit Q4 decision, locked):
 * the Advance handler is shared across stages but the flash COPY
 * varies — Sourced/Contacted/Engaged use generic "Advanced." while
 * Engaged → Applied uses milestone copy ("Converted. {name} joins
 * the Atlas pool · welcome flow pending"). Same hover-action visual
 * across all cards; semantic weight lives in the message string.
 * Convention: when a workflow action has the same UI affordance
 * across stages but one stage is a milestone, vary the flash copy by
 * stage rather than introducing a separate affordance. Visual
 * symmetry wins over editorial weight by gesture.
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Upload } from "lucide-react";

import {
  SOURCING_HEADER_SUBTITLE,
  SOURCING_STAGES,
  getSourcingProspect,
  sourcingProspects,
  type SourcingProspect,
  type SourcingSourceFilter,
  type SourcingStage,
} from "@/lib/mock-data/specialist/sourcing";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import {
  RosterHeader,
  RosterActionButton,
  useQueuedFlash,
} from "@/components/specialist/people-shared";
import {
  WorkflowUnavailableModal,
  type WorkflowKind,
} from "@/components/specialist/shell/workflow-unavailable-modal";
import { SourcingStatStrip } from "./sourcing-stat-strip";
import { SourceFilterChips } from "./source-filter-chips";
import { KanbanBoard } from "./kanban-board";
import { ProspectDetailSheet } from "./prospect-detail-sheet";
import {
  AddProspectModal,
  type AddProspectPayload,
} from "./add-prospect-modal";

/* Stage transition map for the Advance handler. Applied has no next
   stage — clicking Advance on an Applied prospect fires a benign info
   flash rather than silently no-op'ing (no-op = misleading
   affordance). */
const NEXT_STAGE: Record<SourcingStage, SourcingStage | null> = {
  sourced: "contacted",
  contacted: "engaged",
  engaged: "applied",
  applied: null,
};

/** Identifier for the open workflow modal — kind + subject. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

/** Extract first-name token for flash messages. Most prospects are
 *  "First Last"; a few are mononym. The split-on-space heuristic is
 *  good enough for flash copy. */
function firstName(p: SourcingProspect): string {
  return p.name.split(" ")[0] ?? p.name;
}

/** Lookup a stage's display title ("Sourced" / "Contacted" / etc). */
function stageTitle(key: SourcingStage): string {
  return SOURCING_STAGES.find((s) => s.key === key)?.title ?? key;
}

export function SourcingApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  const [activeSource, setActiveSource] =
    useState<SourcingSourceFilter["key"]>("all");
  const [search, setSearch] = useState("");

  /* AddProspectModal state — single slot tracks both open/closed AND
     which stage to pre-fill. Header "+ Add prospect" opens with the
     default ("sourced"); per-column "+" buttons open with the column's
     own stage. Modal is re-keyed on (open, stage) so the lazy-init
     `useState(defaultStage)` picks up fresh defaults per remount —
     same precedent as SchedulingModal. */
  const [addState, setAddState] = useState<{
    open: boolean;
    defaultStage: SourcingStage;
  }>({ open: false, defaultStage: "sourced" });

  /* Workflow modal state — currently only the header "Import list" uses
     it (kind="import-prospects"). Slot is generic so future sourcing
     workflow buttons can reuse the mount. */
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  /* Queued-flash for all card hover-actions, sheet footer actions, and
     AddProspectModal submit. Mix of success-tone (Advance, AddProspect)
     and warn-tone (Message, Reject, Add note). */
  const { flash, fireQueuedFlash } = useQueuedFlash();

  /* Active prospect resolved from the URL id. */
  const activeProspect = useMemo(() => {
    if (!idFromUrl) return undefined;
    return getSourcingProspect(idFromUrl);
  }, [idFromUrl]);

  /* Source counts — derived from the unfiltered prospects array. */
  const sourceCounts = useMemo(() => {
    const counts: Record<SourcingSourceFilter["key"], number> = {
      all: sourcingProspects.length,
      linkedin: 0,
      referral: 0,
      search: 0,
      scout: 0,
    };
    for (const p of sourcingProspects) {
      counts[p.source] += 1;
    }
    return counts;
  }, []);

  /* Filtered + searched prospects fed to the board. */
  const visibleProspects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sourcingProspects.filter((p) => {
      if (activeSource !== "all" && p.source !== activeSource) return false;
      if (q.length > 0) {
        const hay = [
          p.name,
          p.location,
          p.currentRole ?? "",
          p.reason,
          ...(p.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeSource, search]);

  /* Selection: open the slide-over for the given id. */
  const handleSelect = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params.toString());
      next.set("id", id);
      router.replace(`/specialist/sourcing?${next.toString()}`);
    },
    [params, router],
  );

  const handleSheetClose = useCallback(() => {
    const next = new URLSearchParams(params.toString());
    next.delete("id");
    const qs = next.toString();
    router.replace(`/specialist/sourcing${qs.length > 0 ? `?${qs}` : ""}`);
  }, [params, router]);

  /* Header "+ Add prospect" → defaults to "sourced". */
  const openAddFromHeader = useCallback(() => {
    setAddState({ open: true, defaultStage: "sourced" });
  }, []);

  /* Column-header "+" → pre-fills that column's stage. */
  const openAddFromColumn = useCallback((stage: SourcingStage) => {
    setAddState({ open: true, defaultStage: stage });
  }, []);

  const closeAdd = useCallback(() => {
    setAddState((prev) => ({ ...prev, open: false }));
  }, []);

  /* Header "Import list" — opens WorkflowUnavailableModal. CSV ingest
     has no clicked entity, so subjectName is a generic noun. */
  const openImport = useCallback(() => {
    setWorkflowModal({
      workflow: "import-prospects",
      subjectName: "prospect pipeline",
    });
  }, []);

  /* ---- Card hover-action + sheet footer-action handlers ---- */

  /* Stage-aware Advance — see top-of-file convention note. The Engaged
     → Applied transition is the milestone (prospect joins the Atlas
     pool); other transitions use generic "Advanced." copy. */
  const handleAdvance = useCallback(
    (p: SourcingProspect) => {
      const next = NEXT_STAGE[p.stage];
      const first = firstName(p);
      if (next === null) {
        /* Applied: terminal state. Honest acknowledgement rather than
           silent no-op. */
        fireQueuedFlash(
          `${first} is already in the pool — view profile to continue`,
        );
        return;
      }
      if (next === "applied") {
        /* MILESTONE — Engaged → Applied is the conversion moment. */
        fireQueuedFlash(
          `Converted. ${first} joins the Atlas pool · welcome flow pending`,
          { tone: "success" },
        );
        return;
      }
      fireQueuedFlash(
        `Advanced. ${first} → ${stageTitle(next)}`,
        { tone: "success" },
      );
    },
    [fireQueuedFlash],
  );

  const handleMessage = useCallback(
    (p: SourcingProspect) => {
      fireQueuedFlash(
        `Message queued for ${firstName(p)} — outbound thread lands with sourcing-messaging service`,
      );
    },
    [fireQueuedFlash],
  );

  const handleReject = useCallback(
    (p: SourcingProspect) => {
      fireQueuedFlash(
        `Rejected. ${firstName(p)} removed from pipeline · audit-tracked`,
      );
    },
    [fireQueuedFlash],
  );

  /* Sheet-only — Add note. No card-level equivalent (the hover row has
     Advance / Message / Reject; Note lives only in the slide-over). */
  const handleAddNote = useCallback(
    (p: SourcingProspect) => {
      fireQueuedFlash(
        `Note saved on ${firstName(p)} — note service not yet wired`,
      );
    },
    [fireQueuedFlash],
  );

  /* AddProspectModal submit acknowledgement. */
  const handleAddSubmit = useCallback(
    (payload: AddProspectPayload) => {
      fireQueuedFlash(
        `Added ${payload.name} to ${stageTitle(payload.stage)} — pipeline service not yet wired`,
        { tone: "success" },
      );
    },
    [fireQueuedFlash],
  );

  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <RosterHeader
        eyebrow="Pipeline"
        title={{ lead: "Sourcing", italic: "pipeline" }}
        subtitle={SOURCING_HEADER_SUBTITLE}
        actions={
          <>
            <RosterActionButton
              icon={<Upload className="h-3 w-3" strokeWidth={1.5} />}
              onClick={openImport}
            >
              Import list
            </RosterActionButton>
            <RosterActionButton
              variant="primary"
              icon={<Plus className="h-3 w-3" strokeWidth={1.7} />}
              onClick={openAddFromHeader}
            >
              Add prospect
            </RosterActionButton>
          </>
        }
      />

      <SourcingStatStrip />

      <SourceFilterChips
        active={activeSource}
        counts={sourceCounts}
        search={search}
        onSearchChange={setSearch}
        onChange={setActiveSource}
        visibleCount={visibleProspects.length}
      />

      <KanbanBoard
        prospects={visibleProspects}
        onSelect={handleSelect}
        onColumnAdd={openAddFromColumn}
        onAdvance={handleAdvance}
        onMessage={handleMessage}
        onReject={handleReject}
      />

      <ProspectDetailSheet
        prospect={activeProspect}
        open={!!activeProspect}
        onClose={handleSheetClose}
        onAdvance={handleAdvance}
        onMessage={handleMessage}
        onAddNote={handleAddNote}
        onReject={handleReject}
      />

      <AddProspectModal
        key={addState.open ? `open-${addState.defaultStage}` : "closed"}
        open={addState.open}
        defaultStage={addState.defaultStage}
        onClose={closeAdd}
        onAdd={handleAddSubmit}
      />

      <WorkflowUnavailableModal
        open={workflowModal !== null}
        workflow={workflowModal?.workflow ?? "import-prospects"}
        subjectName={workflowModal?.subjectName ?? ""}
        onClose={() => setWorkflowModal(null)}
      />

      <ApprovedFlash {...flash} />
    </main>
  );
}
