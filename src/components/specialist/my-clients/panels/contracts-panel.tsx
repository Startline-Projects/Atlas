"use client";

/**
 * ContractsPanel — inline replacement for the prior
 * `WorkflowUnavailableModal kind="contracts"` treatment.
 *
 * Shows 3-5 contracts for the active client, stacked. Empty state when
 * the client has no contracts yet (Helios Robotics is the canonical
 * onboarding-stalled empty case).
 *
 * "View document" buttons consume the existing `PreviewUnavailableModal`
 * primitive with `kind="document"` and a per-contract subject name —
 * keeps the document-not-yet-stored gap honest. Same pattern as the
 * review-queue intro-video transcript modal (commit 6241650).
 *
 * Client Component (owns the document-preview modal state).
 */

import { useState } from "react";
import {
  PreviewUnavailableModal,
  type PreviewUnavailableKind,
} from "@/components/specialist/shell/preview-unavailable-modal";
import {
  getClientContracts,
  type ClientContract,
} from "@/lib/mock-data/specialist/client-contracts";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { SheetPanelShell } from "./sheet-panel-shell";
import { ContractCard } from "./contract-card";

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
      <SheetPanelShell
        title="Contracts"
        subtitle={subtitle}
        onBack={onBack}
      >
        {contracts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-2.5">
            {contracts.map((c) => (
              <ContractCard
                key={c.id}
                contract={c}
                onViewDocument={handleViewDocument}
              />
            ))}
          </div>
        )}
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

function EmptyState() {
  return (
    <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[13px]">
      <p className="m-0">No contracts on file yet.</p>
      <p className="mt-1 m-0 text-[12px]">
        Contracts appear here once the first brief is filled and signed.
      </p>
    </div>
  );
}
