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
  BriefsPanel,
  ContractsPanel,
  InviteClientFormModal,
  PausePanel,
  TagsPanel,
  TalentMatchPanel,
  type ComposeBriefPayload,
  type InvitePayload,
  type PausePayload,
} from "./panels";
import { ClientRow } from "./client-row";
import { ClientSheetContent } from "./client-sheet-content";

const COLUMNS: ReadonlyArray<ColumnDef> = [
  { key: "client", label: "Client" },
  { key: "health", label: "Health" },
  { key: "active-hires", label: "Active hires", align: "center" },
  { key: "spend", label: "Total spend", align: "right" },
  { key: "rating", label: "Rating", align: "right" },
  { key: "brief", label: "Last brief" },
  { key: "actions", label: "" },
];

/**
 * Sheet-body mode for the slide-over sheet. Owned by MyClientsApp.
 *
 *   - "overview"      → render <ClientSheetContent> (hero / stats / actions)
 *   - panel kinds     → render the corresponding inline panel
 *
 * The kebab items on each row open the sheet AND set the mode in one
 * render (`setSheetId(c.id)` + `setSheetMode({mode:"panel",kind:...})`)
 * — clicking "View contracts" from a row lands ON the contracts list,
 * not on overview-where-you-have-to-click-again.
 *
 * Cross-client reset: whenever sheetId changes via the `openClient`
 * helper, sheetMode resets to "overview".
 */
type ClientPanelKind =
  | "contracts"
  | "briefs"
  | "briefs-new"
  | "talent-match"
  | "pause"
  | "tags";

type SheetMode =
  | { mode: "overview" }
  | { mode: "panel"; kind: ClientPanelKind };

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
  const [sheetMode, setSheetMode] = useState<SheetMode>({ mode: "overview" });
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  /* Queued-flash trigger — used for BULK acknowledgements + panel
     confirms (send-brief / suggest-talent / pause / invite). Single-
     entity workflow actions on the sheet/kebab now open inline PANELS
     instead of the WorkflowUnavailableModal. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

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

  /* ============================================================
     Sheet open/close helpers — keep mode in sync with the client
     ============================================================ */

  /** Open a client's sheet at overview (used by row click + attention card). */
  const openClientOverview = (id: string) => {
    setSheetId(id);
    setSheetMode({ mode: "overview" });
  };

  /** Open a client's sheet AND jump straight to a panel (kebab actions). */
  const openClientPanel = (id: string, kind: ClientPanelKind) => {
    setSheetId(id);
    setSheetMode({ mode: "panel", kind });
  };

  /** Close the sheet entirely (X / Esc / backdrop). */
  const closeSheet = () => {
    setSheetId(null);
    setSheetMode({ mode: "overview" });
  };

  /** Return from a panel to the client's overview. */
  const backToOverview = () => setSheetMode({ mode: "overview" });

  /* ============================================================
     Workflow handlers — fire queued flash + return to overview
     (or close the modal) on confirm
     ============================================================ */

  const handleSendBrief = (
    client: ManagedClient,
    payload: ComposeBriefPayload,
  ) => {
    fireQueuedFlash(
      `Brief queued for ${client.companyName} · ${payload.role}`,
    );
    setSheetMode({ mode: "overview" });
  };

  const handleSuggestTalent = (
    result: { candidate: { fullName: string } },
    client: ManagedClient,
  ) => {
    fireQueuedFlash(
      `Suggested ${result.candidate.fullName} for ${client.companyName}`,
    );
  };

  const handlePauseConfirm = (
    client: ManagedClient,
    payload: PausePayload,
  ) => {
    fireQueuedFlash(
      `Pause queued for ${client.companyName} · ${payload.graceDays}-day grace`,
    );
    setSheetMode({ mode: "overview" });
  };

  const handleInviteConfirm = (payload: InvitePayload) => {
    fireQueuedFlash(`Invite link queued for ${payload.companyName}`);
    setInviteOpen(false);
  };

  /* ============================================================
     Row + sheet callbacks
     ============================================================ */

  /* Sheet (overview) buttons → open the corresponding panel. The
     `ClientSheetCallbacks` type signatures take a `ManagedClient` arg,
     but these implementations don't need it — the panel reads the
     active client from `sheetClient` (the sheet always belongs to
     ONE client). Omitting the parameter is type-safe via TS's
     contravariant function-arity rule. */
  const sheetCallbacks = {
    onViewContracts: () => setSheetMode({ mode: "panel", kind: "contracts" }),
    onOpenBriefs: () => setSheetMode({ mode: "panel", kind: "briefs" }),
    onSuggestTalent: () =>
      setSheetMode({ mode: "panel", kind: "talent-match" }),
    onPauseClient: () => setSheetMode({ mode: "panel", kind: "pause" }),
  };

  /* Row kebab → open sheet + jump to panel in one click. */
  const rowCallbacks = {
    onSendBrief: (c: ManagedClient) => openClientPanel(c.id, "briefs-new"),
    onSuggestTalent: (c: ManagedClient) =>
      openClientPanel(c.id, "talent-match"),
    onViewContracts: (c: ManagedClient) =>
      openClientPanel(c.id, "contracts"),
    onTagClient: (c: ManagedClient) => openClientPanel(c.id, "tags"),
    onPauseClient: (c: ManagedClient) => openClientPanel(c.id, "pause"),
  };

  /* Bulk-action handlers — fire flash with N-clients copy + clear selection. */
  const fireBulkFlash = (verb: string) => {
    fireQueuedFlash(`${verb} queued for ${selected.size} clients`);
    setSelected(new Set());
  };

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
                  setInviteOpen(true);
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
          onCardClick={openClientOverview}
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
          onRowOpen={openClientOverview}
          empty={{
            title: "No clients match your filters",
            subtitle: "Try clearing the search or selecting a different cohort.",
          }}
        />
      </RosterShell>

      <RosterBulkBar
        count={selected.size}
        actions={[
          { key: "brief", label: "Send brief request", onClick: () => fireBulkFlash("Send brief request") },
          { key: "list", label: "Add to list", onClick: () => fireBulkFlash("Add to list") },
          { key: "tag", label: "Tag", onClick: () => fireBulkFlash("Tag") },
          { key: "pause", label: "Pause", tone: "danger", onClick: () => fireBulkFlash("Pause") },
        ]}
        onClear={() => setSelected(new Set())}
      />

      <RosterSheet
        open={sheetClient !== null && sheetClient !== undefined}
        onClose={closeSheet}
        ariaLabel="Client detail"
      >
        {sheetClient ? (
          sheetMode.mode === "overview" ? (
            <ClientSheetContent c={sheetClient} callbacks={sheetCallbacks} />
          ) : sheetMode.kind === "contracts" ? (
            <ContractsPanel client={sheetClient} onBack={backToOverview} />
          ) : sheetMode.kind === "briefs" ? (
            <BriefsPanel
              client={sheetClient}
              onBack={backToOverview}
              onSendBrief={handleSendBrief}
            />
          ) : sheetMode.kind === "briefs-new" ? (
            <BriefsPanel
              client={sheetClient}
              onBack={backToOverview}
              initialMode="compose"
              onSendBrief={handleSendBrief}
            />
          ) : sheetMode.kind === "talent-match" ? (
            <TalentMatchPanel
              client={sheetClient}
              onBack={backToOverview}
              onSuggest={handleSuggestTalent}
            />
          ) : sheetMode.kind === "pause" ? (
            <PausePanel
              client={sheetClient}
              onBack={backToOverview}
              onConfirm={handlePauseConfirm}
            />
          ) : sheetMode.kind === "tags" ? (
            /* key forces remount per client so applied-set lazy-init
               picks up the right canonical assignments. */
            <TagsPanel
              key={sheetClient.id}
              client={sheetClient}
              onBack={backToOverview}
            />
          ) : null
        ) : null}
      </RosterSheet>

      <InviteClientFormModal
        key={inviteOpen ? "open" : "closed"}
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInviteConfirm}
      />

      <ApprovedFlash {...flash} />
    </>
  );
}
