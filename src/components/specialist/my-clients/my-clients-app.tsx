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
  CLIENT_COHORTS,
  CLIENT_HEADER_SUBTITLE,
  CLIENT_SIZE_FILTERS,
  CLIENT_SORT_OPTIONS,
  clientAttentionCards,
  managedClients,
  type ManagedClient,
} from "@/lib/mock-data/specialist/my-clients";
import {
  WorkflowUnavailableModal,
  type WorkflowKind,
} from "@/components/specialist/shell/workflow-unavailable-modal";
import { ClientRow } from "./client-row";
import { ClientSheetContent } from "./client-sheet-content";

/** Identifier for the open workflow modal — kind + subject. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

/** Body-less invite acknowledgement uses a generic subject. */
const INVITE_SUBJECT = "the new client";

const COLUMNS: ReadonlyArray<ColumnDef> = [
  { key: "client", label: "Client" },
  { key: "health", label: "Health" },
  { key: "active-hires", label: "Active hires", align: "center" },
  { key: "spend", label: "Total spend", align: "right" },
  { key: "rating", label: "Rating", align: "right" },
  { key: "brief", label: "Last brief" },
  { key: "actions", label: "" },
];

function applyFilters(
  clients: ReadonlyArray<ManagedClient>,
  args: { cohort: string; size: string; search: string },
): ReadonlyArray<ManagedClient> {
  return clients.filter((c) => {
    if (args.cohort !== "all" && c.cohort !== args.cohort) return false;
    if (args.size !== "all" && c.size !== args.size) return false;
    if (args.search) {
      const q = args.search.toLowerCase();
      if (
        !c.companyName.toLowerCase().includes(q) &&
        !c.industry.toLowerCase().includes(q) &&
        !c.city.toLowerCase().includes(q) &&
        !c.countryName.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

function sortClients(
  clients: ReadonlyArray<ManagedClient>,
  sortKey: string,
): ReadonlyArray<ManagedClient> {
  const sorted = [...clients];
  switch (sortKey) {
    case "name":
      return sorted.sort((a, b) => a.companyName.localeCompare(b.companyName));
    case "spend":
      return sorted.sort((a, b) => b.totalSpendDollars - a.totalSpendDollars);
    case "hires":
      return sorted.sort((a, b) => b.activeHires - a.activeHires);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "recent":
    default:
      return sorted.sort(
        (a, b) => a.daysSinceLastBrief - b.daysSinceLastBrief,
      );
  }
}

export function MyClientsApp() {
  const [cohort, setCohort] = useState<string>("all");
  const [size, setSize] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string>("recent");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetId, setSheetId] = useState<string | null>(null);

  /* Queued-flash trigger — used for BULK acknowledgements only here.
     Single-entity workflow actions (sheet + kebab + Invite header)
     use WorkflowUnavailableModal instead — see honesty-of-treatment
     scaling rule in CONVERSION_LOG. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

  /* Workflow modal state — null when closed; { workflow, subjectName } when open. */
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  const cohortCounts = useMemo(() => {
    const counts: Record<string, number> = { all: managedClients.length };
    for (const c of CLIENT_COHORTS) {
      if (c.key === "all") continue;
      counts[c.key] = managedClients.filter((m) => m.cohort === c.key).length;
    }
    return counts;
  }, []);

  const visible = useMemo(
    () => sortClients(applyFilters(managedClients, { cohort, size, search }), sortKey),
    [cohort, size, search, sortKey],
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

  const sheetClient =
    sheetId !== null ? managedClients.find((c) => c.id === sheetId) : null;

  /* Row + sheet workflow callbacks — all open WorkflowUnavailableModal
     with the kind-specific copy + the client's company name. */
  const openWorkflow = (workflow: WorkflowKind, subjectName: string) =>
    setWorkflowModal({ workflow, subjectName });

  const handleSendBrief = (c: ManagedClient) =>
    openWorkflow("send-brief", c.companyName);
  const handleSuggestTalent = (c: ManagedClient) =>
    openWorkflow("suggest-talent", c.companyName);
  const handleViewContracts = (c: ManagedClient) =>
    openWorkflow("contracts", c.companyName);
  const handleOpenBriefs = (c: ManagedClient) =>
    openWorkflow("briefs", c.companyName);
  const handleTagClient = (c: ManagedClient) =>
    openWorkflow("tag-client", c.companyName);
  const handlePauseClient = (c: ManagedClient) =>
    openWorkflow("pause-client", c.companyName);

  const rowCallbacks = {
    onSendBrief: handleSendBrief,
    onSuggestTalent: handleSuggestTalent,
    onViewContracts: handleViewContracts,
    onTagClient: handleTagClient,
    onPauseClient: handlePauseClient,
  };
  const sheetCallbacks = {
    onViewContracts: handleViewContracts,
    onOpenBriefs: handleOpenBriefs,
    onSuggestTalent: handleSuggestTalent,
    onPauseClient: handlePauseClient,
  };

  /* Bulk-action handlers — fire flash with N-clients copy + clear selection.
     Multi-target acknowledgement (no specific entity) → flash, not modal. */
  const fireBulkFlash = (verb: string) => {
    fireQueuedFlash(`${verb} queued for ${selected.size} clients`);
    setSelected(new Set());
  };

  /* Header "Invite client" handler — opens WorkflowUnavailableModal.
     Workflow-style action that warrants drilling into a feature surface,
     not just a flash acknowledgement. */
  const handleInviteClient = () => openWorkflow("invite-client", INVITE_SUBJECT);

  const attentionCardData: ReadonlyArray<AttentionCardData> = useMemo(
    () =>
      clientAttentionCards
        .map((card) => {
          const c = managedClients.find((m) => m.id === card.clientId);
          if (!c) return null;
          return {
            id: c.id,
            avatarGlyph: c.logoInitials,
            avatarStyle: "logo" as const,
            avatarVariant: c.logoGradient,
            title: <>{c.companyName}</>,
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
          title={{ lead: "My", italic: "clients" }}
          subtitle={CLIENT_HEADER_SUBTITLE}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleInviteClient();
                }}
              >
                Invite client
              </RosterActionButton>
            </>
          }
        />

        <RosterCohorts
          cohorts={CLIENT_COHORTS.map((c) => ({
            key: c.key,
            label: c.label,
            tone: "tone" in c ? c.tone : undefined,
          }))}
          counts={cohortCounts}
          active={cohort}
          onChange={setCohort}
        />

        <RosterFilters
          searchPlaceholder="Search by company, industry, or HQ…"
          searchValue={search}
          onSearchChange={setSearch}
          selects={[
            {
              config: {
                id: "size",
                ariaLabel: "Company size",
                options: CLIENT_SIZE_FILTERS.map((o) => ({
                  key: o.key,
                  label: o.label,
                })),
              },
              value: size,
              onChange: setSize,
            },
            {
              config: {
                id: "sort",
                ariaLabel: "Sort",
                options: CLIENT_SORT_OPTIONS.map((o) => ({
                  key: o.key,
                  label: o.label,
                })),
              },
              value: sortKey,
              onChange: setSortKey,
            },
          ]}
          resultCountLabel={`Showing ${visible.length} of ${managedClients.length}`}
        />

        <RosterAttentionStrip
          label="⚠ Attention this week"
          sub={`Disputes, churn signals, and expansion opportunities · ${attentionCardData.length} flagged`}
          cards={attentionCardData}
          onCardClick={setSheetId}
        />

        <RosterTable<ManagedClient>
          columns={COLUMNS}
          rows={visible}
          selectedIds={selected}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          allSelected={allSelected}
          someSelected={someSelected}
          renderRow={(c) => <ClientRow c={c} callbacks={rowCallbacks} />}
          onRowOpen={setSheetId}
          empty={{
            title: "No clients match your filters",
            subtitle: "Try clearing the search or selecting a different cohort.",
          }}
        />
      </RosterShell>

      <RosterBulkBar
        count={selected.size}
        actions={[
          {
            key: "brief",
            label: "Send brief request",
            onClick: () => fireBulkFlash("Send brief request"),
          },
          {
            key: "list",
            label: "Add to list",
            onClick: () => fireBulkFlash("Add to list"),
          },
          {
            key: "tag",
            label: "Tag",
            onClick: () => fireBulkFlash("Tag"),
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
        open={sheetClient !== null && sheetClient !== undefined}
        onClose={() => setSheetId(null)}
        ariaLabel="Client detail"
      >
        {sheetClient ? (
          <ClientSheetContent c={sheetClient} callbacks={sheetCallbacks} />
        ) : null}
      </RosterSheet>

      <WorkflowUnavailableModal
        open={workflowModal !== null}
        workflow={workflowModal?.workflow ?? "contracts"}
        subjectName={workflowModal?.subjectName ?? ""}
        onClose={() => setWorkflowModal(null)}
      />

      <ApprovedFlash {...flash} />
    </>
  );
}
