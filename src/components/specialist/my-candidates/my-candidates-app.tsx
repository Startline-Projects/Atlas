"use client";

import { Download, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import {
  RosterActionButton,
  RosterAttentionStrip,
  RosterBulkBar,
  RosterCohorts,
  RosterFilters,
  RosterHeader,
  RosterShell,
  RosterSheet,
  RosterTable,
  useQueuedFlash,
  type AttentionCardData,
  type ColumnDef,
} from "@/components/specialist/people-shared";
import {
  SchedulingModal,
  formatSchedulePartsForFlash,
  type SchedulePayload,
} from "@/components/specialist/shell/scheduling-modal";
import {
  WorkflowUnavailableModal,
  type WorkflowKind,
} from "@/components/specialist/shell/workflow-unavailable-modal";
import {
  MANAGED_COHORTS,
  MANAGED_HEADER_SUBTITLE,
  MANAGED_SORT_OPTIONS,
  MANAGED_TIER_FILTERS,
  managedAttentionCards,
  managedCandidates,
  type ManagedCandidate,
} from "@/lib/mock-data/specialist/my-candidates";
import { CandidateRow } from "./candidate-row";
import { CandidateSheetContent } from "./candidate-sheet-content";

/** Identifier for the open workflow modal — kind + subject. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

const COLUMNS: ReadonlyArray<ColumnDef> = [
  { key: "candidate", label: "Candidate" },
  { key: "tier", label: "Tier" },
  { key: "status", label: "Status" },
  { key: "engagements", label: "Engagements" },
  { key: "rating", label: "Rating", align: "right" },
  { key: "hours", label: "Hours", align: "right" },
  { key: "cert", label: "Cert" },
  { key: "actions", label: "" },
];

function applyFilters(
  candidates: ReadonlyArray<ManagedCandidate>,
  args: { cohort: string; tier: string; search: string },
): ReadonlyArray<ManagedCandidate> {
  return candidates.filter((c) => {
    if (args.cohort !== "all" && !c.cohorts.includes(args.cohort as never))
      return false;
    if (args.tier !== "all" && c.tier.toLowerCase() !== args.tier) return false;
    if (args.search) {
      const q = args.search.toLowerCase();
      if (
        !c.fullName.toLowerCase().includes(q) &&
        !c.city.toLowerCase().includes(q) &&
        !c.countryName.toLowerCase().includes(q) &&
        !c.languagesShort.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

function sortCandidates(
  candidates: ReadonlyArray<ManagedCandidate>,
  sortKey: string,
): ReadonlyArray<ManagedCandidate> {
  const sorted = [...candidates];
  switch (sortKey) {
    case "name":
      return sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
    case "rating":
      return sorted.sort((a, b) => b.averageRating - a.averageRating);
    case "hours":
      return sorted.sort((a, b) => b.hoursLifetime - a.hoursLifetime);
    case "cert":
      return sorted.sort(
        (a, b) => a.certExpiresInDays - b.certExpiresInDays,
      );
    case "recent":
    default:
      return sorted;
  }
}

export function MyCandidatesApp() {
  const [cohort, setCohort] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string>("recent");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetId, setSheetId] = useState<string | null>(null);
  /** When non-null, the SchedulingModal is open for that candidate. */
  const [schedulingFor, setSchedulingFor] = useState<ManagedCandidate | null>(
    null,
  );
  /** Workflow modal state — null when closed; { workflow, subjectName } when open. */
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  /* Queued-flash trigger — used for BULK acknowledgements + Schedule
     confirm. Single-entity workflow actions (Suggest for client / Flag
     for re-cert / Mark unavailable) use WorkflowUnavailableModal —
     see honesty-of-treatment scaling rule in CONVERSION_LOG. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

  /** Counts used by the cohort chips — derive from the full mock list. */
  const cohortCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of MANAGED_COHORTS) {
      counts[c.key] = managedCandidates.filter((m) =>
        m.cohorts.includes(c.key as never),
      ).length;
    }
    counts.all = managedCandidates.length;
    return counts;
  }, []);

  const visible = useMemo(
    () => sortCandidates(applyFilters(managedCandidates, { cohort, tier, search }), sortKey),
    [cohort, tier, search, sortKey],
  );

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const visibleIds = useMemo(() => visible.map((c) => c.id), [visible]);

  const allSelected =
    visible.length > 0 && visibleIds.every((id) => selected.has(id));
  const someSelected =
    visibleIds.some((id) => selected.has(id)) && !allSelected;

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const id of visibleIds) next.delete(id);
      } else {
        for (const id of visibleIds) next.add(id);
      }
      return next;
    });

  const sheetCandidate =
    sheetId !== null
      ? managedCandidates.find((c) => c.id === sheetId)
      : null;

  /* Row + sheet workflow callbacks. Single-entity actions open
     WorkflowUnavailableModal with kind-specific copy. Schedule remains
     a SchedulingModal (it has real date+time picker UI, not a
     "feature in development" placeholder). */
  const openSchedule = (c: ManagedCandidate) => setSchedulingFor(c);
  const openWorkflow = (workflow: WorkflowKind, subjectName: string) =>
    setWorkflowModal({ workflow, subjectName });

  const handleSuggestForClient = (c: ManagedCandidate) =>
    openWorkflow("suggest-for-client", c.fullName);
  const handleFlagForRecert = (c: ManagedCandidate) =>
    openWorkflow("flag-recert", c.fullName);
  const handleMarkUnavailable = (c: ManagedCandidate) =>
    openWorkflow("mark-unavailable", c.fullName);

  const rowCallbacks = {
    onSchedule: openSchedule,
    onSuggestForClient: handleSuggestForClient,
    onFlagForRecert: handleFlagForRecert,
    onMarkUnavailable: handleMarkUnavailable,
  };
  const sheetCallbacks = {
    onSchedule: openSchedule,
    onSuggestForClient: handleSuggestForClient,
    onFlagForRecert: handleFlagForRecert,
  };

  /* SchedulingModal confirm handler — visual-only flash with selections.
     Success-tone (not warn): scheduling is a relationship-management
     action where the user has done the work (picked date+time and
     confirmed) — from their POV the action is done. Backend-honesty
     lives in the message string ("invite pending") and sub-line, not
     the tone. Locked across both SchedulingModal consumers (this +
     candidate-profile hero). See CONVERSION_LOG tone-consistency note. */
  const handleScheduleConfirm = (payload: SchedulePayload) => {
    if (!schedulingFor) return;
    const parts = formatSchedulePartsForFlash(payload);
    fireQueuedFlash(
      `Scheduled. ${schedulingFor.firstName} · ${parts}${payload.videoCall ? " · video link queued" : ""}`,
      { tone: "success", tail: "Invite pending — scheduling service not yet wired" },
    );
    setSchedulingFor(null);
  };

  /* Bulk-action handlers — fire flash with count + clear selection. */
  const fireBulkFlash = (verb: string) => {
    fireQueuedFlash(`${verb} queued for ${selected.size} candidates`);
    setSelected(new Set());
  };

  /** Attention card data — joins the static config with row identity. */
  const attentionCardData: ReadonlyArray<AttentionCardData> = useMemo(
    () =>
      managedAttentionCards
        .map((card) => {
          const c = managedCandidates.find((m) => m.id === card.candidateId);
          if (!c) return null;
          const variantMap: Record<string, number> = {
            warm: 5,
            navy: 1,
            olive: 2,
            terracotta: 3,
            purple: 4,
            teal: 5,
            caramel: 3,
            ice: 1,
            lime: 2,
          };
          const variant = c.avatarGradient
            ? variantMap[c.avatarGradient] ?? 1
            : 1;
          return {
            id: c.id,
            avatarGlyph: c.initials,
            avatarStyle: "gradient" as const,
            avatarVariant: variant,
            title: (
              <>
                {c.fullName}
                <span aria-hidden="true" className="text-[12px]">
                  {c.countryFlag}
                </span>
              </>
            ),
            detail: card.detail,
            tone: card.tone,
            tagLabel: card.tagLabel,
          } as AttentionCardData;
        })
        .filter((x): x is AttentionCardData => x !== null),
    [],
  );

  return (
    <>
      <RosterShell>
        <RosterHeader
          eyebrow="Roster"
          title={{ lead: "My", italic: "candidates" }}
          subtitle={MANAGED_HEADER_SUBTITLE}
          actions={
            <>
              <RosterActionButton
                icon={<Download className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />}
                onClick={(e) => e.preventDefault()}
              >
                Export
              </RosterActionButton>
              <RosterActionButton
                variant="primary"
                icon={<Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />}
                href="/specialist/sourcing"
              >
                Source new
              </RosterActionButton>
            </>
          }
        />

        <RosterCohorts
          cohorts={MANAGED_COHORTS.map((c) => ({
            key: c.key,
            label: c.label,
            tone: "tone" in c ? c.tone : undefined,
          }))}
          counts={cohortCounts}
          active={cohort}
          onChange={setCohort}
        />

        <RosterFilters
          searchPlaceholder="Search by name, location, or language…"
          searchValue={search}
          onSearchChange={setSearch}
          selects={[
            {
              config: {
                id: "tier",
                ariaLabel: "Tier filter",
                options: MANAGED_TIER_FILTERS.map((o) => ({
                  key: o.key,
                  label: o.label,
                })),
              },
              value: tier,
              onChange: setTier,
            },
            {
              config: {
                id: "sort",
                ariaLabel: "Sort",
                options: MANAGED_SORT_OPTIONS.map((o) => ({
                  key: o.key,
                  label: o.label,
                })),
              },
              value: sortKey,
              onChange: setSortKey,
            },
          ]}
          resultCountLabel={`Showing ${visible.length} of ${managedCandidates.length}`}
        />

        <RosterAttentionStrip
          label="⚠ Attention this week"
          sub={`Candidates with disputes, expiring certs, or rating drops · ${attentionCardData.length} flagged`}
          cards={attentionCardData}
          onCardClick={setSheetId}
        />

        <RosterTable<ManagedCandidate>
          columns={COLUMNS}
          rows={visible}
          selectedIds={selected}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          allSelected={allSelected}
          someSelected={someSelected}
          renderRow={(c) => <CandidateRow c={c} callbacks={rowCallbacks} />}
          onRowOpen={setSheetId}
          empty={{
            title: "No candidates match your filters",
            subtitle: "Try clearing the search or selecting a different cohort.",
          }}
        />
      </RosterShell>

      <RosterBulkBar
        count={selected.size}
        actions={[
          {
            key: "message",
            label: "Message all",
            onClick: () => fireBulkFlash("Bulk message"),
          },
          {
            key: "list",
            label: "Add to list",
            onClick: () => fireBulkFlash("Add-to-list"),
          },
          {
            key: "recert",
            label: "Flag for re-cert",
            onClick: () => fireBulkFlash("Bulk re-cert flag"),
          },
          {
            key: "pause",
            label: "Pause",
            tone: "danger",
            onClick: () => fireBulkFlash("Pause"),
          },
        ]}
        onClear={() => setSelected(new Set())}
      />

      <RosterSheet
        open={sheetCandidate !== null && sheetCandidate !== undefined}
        onClose={() => setSheetId(null)}
        ariaLabel="Candidate detail"
      >
        {sheetCandidate ? (
          <CandidateSheetContent c={sheetCandidate} callbacks={sheetCallbacks} />
        ) : null}
      </RosterSheet>

      <SchedulingModal
        key={schedulingFor?.id ?? "closed"}
        open={schedulingFor !== null}
        subjectName={schedulingFor?.fullName ?? ""}
        onClose={() => setSchedulingFor(null)}
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
