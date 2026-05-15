/**
 * ContractsListBody — pure rendering of a contracts list (Layer A).
 *
 * Owns: list rendering + empty state (per Session 9 Q5 lock — empty
 * state travels with the body so sheet and page surfaces stay
 * visually consistent).
 *
 * Does NOT own:
 *   - Modal state (consumer mounts its own `PreviewUnavailableModal`
 *     and passes `onViewDocument`)
 *   - Title / subtitle / chrome (sheet uses `SheetPanelShell`; page
 *     uses the `/specialist/clients/[id]/...` layout shell)
 *
 * No `"use client"` — function-as-prop is supplied by the consumer
 * (always a Client Component owning the modal state). Bundles into
 * the consumer's bundle automatically.
 *
 * Layer A / Layer B convention (NEW in Session 9):
 *   - Layer A in `clients-shared/` = stateless body shared by sheet
 *     and dedicated page
 *   - Layer B in `my-clients/panels/` = sheet chrome wrapper that
 *     mounts state + renders Layer A
 *   - Layer B equivalents for dedicated pages land in Checkpoint 2.
 */

import type { ClientContract } from "@/lib/mock-data/specialist/client-contracts";
import { ContractCard } from "@/components/specialist/my-clients/panels/contract-card";

type ContractsListBodyProps = {
  contracts: ReadonlyArray<ClientContract>;
  onViewDocument: (c: ClientContract) => void;
};

export function ContractsListBody({
  contracts,
  onViewDocument,
}: ContractsListBodyProps) {
  if (contracts.length === 0) return <ContractsEmptyState />;
  return (
    <div className="flex flex-col gap-2.5">
      {contracts.map((c) => (
        <ContractCard key={c.id} contract={c} onViewDocument={onViewDocument} />
      ))}
    </div>
  );
}

/** Exported so the C2 page-level Layer B wrapper can override if
 *  needed; default copy matches the pre-refactor sheet behavior. */
export function ContractsEmptyState() {
  return (
    <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[13px]">
      <p className="m-0">No contracts on file yet.</p>
      <p className="mt-1 m-0 text-[12px]">
        Contracts appear here once the first brief is filled and signed.
      </p>
    </div>
  );
}
