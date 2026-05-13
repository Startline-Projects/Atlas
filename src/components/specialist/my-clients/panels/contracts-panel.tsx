"use client";

/**
 * ContractsPanel — sheet-side Layer B wrapper.
 *
 * Session 9 Checkpoint 1 refactor:
 *   - The list-rendering body moved to
 *     `clients-shared/contracts-list-body.tsx` (Layer A — shared
 *     with the C2 dedicated `/specialist/clients/[id]/contracts`
 *     page).
 *   - This file (Layer B) keeps sheet chrome (`SheetPanelShell` +
 *     "Back to client" affordance) AND mounts the document-preview
 *     modal state. Function-as-prop passes downward to the shared
 *     body which forwards to `ContractCard`'s `onViewDocument`.
 *
 * "View document" buttons consume `PreviewUnavailableModal` with
 * `kind="document"` and a per-contract subject name — keeps the
 * document-not-yet-stored gap honest. Same pattern as the
 * review-queue intro-video transcript modal (commit 6241650).
 *
 * Pre-refactor behavior preserved exactly — same DOM, same subtitle
 * formula, same empty-state copy (now sourced from
 * `ContractsListBody`'s `ContractsEmptyState`).
 *
 * Client Component (owns the document-preview modal state).
 */

import { useState } from "react";
import {
  PreviewUnavailableModal,
  type PreviewUnavailableKind,
} from "@/components/specialist/shell/preview-unavailable-modal";
import { ContractsListBody } from "@/components/specialist/clients-shared";
import {
  getClientContracts,
  type ClientContract,
} from "@/lib/mock-data/specialist/client-contracts";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { SheetPanelShell } from "./sheet-panel-shell";

type DocPreview = {
  kind: PreviewUnavailableKind;
  subjectName: string;
} | null;

export function ContractsPanel({
  client,
  onBack,
}: {
  client: ManagedClient;
  onBack: () => void;
}) {
  const contracts = getClientContracts(client.id);
  const [docPreview, setDocPreview] = useState<DocPreview>(null);

  const activeCount = contracts.filter(
    (c) => c.status === "active" || c.status === "expiring-soon",
  ).length;
  const totalBilled = contracts.reduce((sum, c) => sum + c.totalBilled, 0);

  const subtitle = buildSubtitle(activeCount, totalBilled, contracts.length);

  const handleViewDocument = (c: ClientContract) =>
    setDocPreview({
      kind: "document",
      subjectName: `${client.companyName} · ${c.role}`,
    });

  return (
    <>
      <SheetPanelShell title="Contracts" subtitle={subtitle} onBack={onBack}>
        <ContractsListBody
          contracts={contracts}
          onViewDocument={handleViewDocument}
        />
      </SheetPanelShell>

      <PreviewUnavailableModal
        open={docPreview !== null}
        kind={docPreview?.kind ?? "document"}
        subjectName={docPreview?.subjectName ?? ""}
        onClose={() => setDocPreview(null)}
      />
    </>
  );
}

function buildSubtitle(
  activeCount: number,
  totalBilled: number,
  total: number,
): string {
  if (total === 0) return "No contracts on file";
  const billedLabel = totalBilled >= 1000
    ? `$${(totalBilled / 1000).toFixed(1)}k billed`
    : `$${totalBilled.toLocaleString("en-US")} billed`;
  return `${activeCount} active · ${billedLabel} all-time`;
}
