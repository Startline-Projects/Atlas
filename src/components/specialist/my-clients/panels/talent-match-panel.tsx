"use client";

/**
 * TalentMatchPanel — inline replacement for the prior
 * `WorkflowUnavailableModal kind="suggest-talent"` treatment.
 *
 * Renders the top 5-8 ranked pool candidates for this client, computed
 * by `rankPoolForClient(clientId)` (deterministic mock; service swap
 * later). Each row has a "Suggest" button that fires a queued flash via
 * the parent — visual-only confirmation that the candidate has been
 * suggested for the client's open briefs.
 *
 * Empty state: when the client has no open briefs (no shortlist target),
 * the ranking returns a generic top-of-pool sweep instead. The UI
 * surfaces a small banner explaining the absence of brief context.
 *
 * Client Component (no internal state — pure render off props, but
 * uses callbacks).
 */

import { Info } from "lucide-react";
import {
  rankPoolForClient,
  type TalentMatchResult,
} from "@/lib/mock-data/specialist/client-talent-match";
import { getClientBriefs, splitBriefs } from "@/lib/mock-data/specialist/client-briefs";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { SheetPanelShell } from "./sheet-panel-shell";
import { TalentMatchRow } from "./talent-match-row";

export function TalentMatchPanel({
  client,
  onBack,
  onSuggest,
}: {
  client: ManagedClient;
  onBack: () => void;
  onSuggest: (result: TalentMatchResult, client: ManagedClient) => void;
}) {
  const ranked = rankPoolForClient(client.id);
  const briefs = getClientBriefs(client.id);
  const { open: openBriefs } = splitBriefs(briefs);
  const noBriefContext = openBriefs.length === 0;

  return (
    <SheetPanelShell
      title="Suggest talent"
      subtitle={
        ranked.length === 0
          ? "No suggestions available"
          : `${ranked.length} ranked from your ${ranked.length === 1 ? "pool match" : "pool"}${openBriefs.length > 0 ? ` · ${openBriefs.length} open brief${openBriefs.length === 1 ? "" : "s"}` : ""}`
      }
      onBack={onBack}
    >
      {noBriefContext && ranked.length > 0 ? (
        <div className="border-l-amber bg-amber/8 mb-3.5 flex items-start gap-2 rounded-md border-l-[3px] px-3 py-2.5 text-[12.5px] leading-[1.5]">
          <Info
            className="text-amber mt-0.5 h-3.5 w-3.5 flex-shrink-0"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <span className="text-ink-soft">
            No open briefs from {client.companyName}. Showing top pool
            candidates by tier and rating — open a brief to refine ranking
            against role requirements.
          </span>
        </div>
      ) : null}

      {ranked.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2.5">
          {ranked.map((r) => (
            <TalentMatchRow
              key={r.candidate.id}
              result={r}
              client={client}
              onSuggest={onSuggest}
            />
          ))}
        </div>
      )}
    </SheetPanelShell>
  );
}

function EmptyState() {
  return (
    <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[13px]">
      <p className="m-0">No pool candidates available for matching.</p>
      <p className="mt-1 m-0 text-[12px]">
        All eligible talents are currently in dispute or off-boarded.
      </p>
    </div>
  );
}
