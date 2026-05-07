"use client";

/**
 * Sourcing orchestrator. Full-bleed kanban (no rail — sidebar is one
 * level up).
 *
 * State owned here:
 *   - source filter chip (All / LinkedIn / Referral / Talent search / AI scout)
 *   - search input value
 *   - add-prospect modal open
 *
 * URL state via `?id=<prospect-...>` for the slide-over detail —
 * `useSearchParams` + `router.replace()` (not push), same pattern as
 * candidate-chat / disputes.
 *
 * Filter + search both run client-side over `sourcingProspects` —
 * the kanban-board + columns receive the filtered list and partition
 * by stage.
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Upload } from "lucide-react";

import {
  SOURCING_HEADER_SUBTITLE,
  getSourcingProspect,
  sourcingProspects,
  type SourcingSourceFilter,
} from "@/lib/mock-data/specialist/sourcing";
import {
  RosterHeader,
  RosterActionButton,
} from "@/components/specialist/people-shared";
import { SourcingStatStrip } from "./sourcing-stat-strip";
import { SourceFilterChips } from "./source-filter-chips";
import { KanbanBoard } from "./kanban-board";
import { ProspectDetailSheet } from "./prospect-detail-sheet";
import { AddProspectModal } from "./add-prospect-modal";

export function SourcingApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  const [activeSource, setActiveSource] =
    useState<SourcingSourceFilter["key"]>("all");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

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
            >
              Import list
            </RosterActionButton>
            <RosterActionButton
              variant="primary"
              icon={<Plus className="h-3 w-3" strokeWidth={1.7} />}
              onClick={() => setAddOpen(true)}
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
      />

      <ProspectDetailSheet
        prospect={activeProspect}
        open={!!activeProspect}
        onClose={handleSheetClose}
      />

      <AddProspectModal open={addOpen} onClose={() => setAddOpen(false)} />
    </main>
  );
}
