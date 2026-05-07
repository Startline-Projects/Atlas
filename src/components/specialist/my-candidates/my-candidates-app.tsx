"use client";

import { Download, Plus } from "lucide-react";
import { useMemo, useState } from "react";
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
  type AttentionCardData,
  type ColumnDef,
} from "@/components/specialist/people-shared";
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
                onClick={(e) => e.preventDefault()}
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
          renderRow={(c) => <CandidateRow c={c} />}
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
            onClick: () => setSelected(new Set()),
          },
          {
            key: "list",
            label: "Add to list",
            onClick: () => setSelected(new Set()),
          },
          {
            key: "recert",
            label: "Flag for re-cert",
            onClick: () => setSelected(new Set()),
          },
          {
            key: "pause",
            label: "Pause",
            tone: "danger",
            onClick: () => setSelected(new Set()),
          },
        ]}
        onClear={() => setSelected(new Set())}
      />

      <RosterSheet
        open={sheetCandidate !== null && sheetCandidate !== undefined}
        onClose={() => setSheetId(null)}
        ariaLabel="Candidate detail"
      >
        {sheetCandidate ? <CandidateSheetContent c={sheetCandidate} /> : null}
      </RosterSheet>
    </>
  );
}
