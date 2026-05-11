"use client";

/**
 * PausePanel — inline replacement for the prior
 * `WorkflowUnavailableModal kind="pause-client"` treatment.
 *
 * Shows consequences before the user confirms:
 *   - Active hires affected (count from client.activeHires)
 *   - Estimated monthly revenue impact (sum of active contract terms)
 *   - Grace-window picker (7 / 14 / 30 days)
 *   - Optional note
 *
 * Confirm fires `useQueuedFlash` warn-tone via the parent. Cancel
 * returns to client overview via the shell's Back affordance.
 *
 * Disabled-until-rationale pattern (note required) matches the
 * pattern locked across RevisionsModal / PauseModal / OffboardModal —
 * forcing reflection on permanent-ish actions is consistent across
 * the conversion.
 *
 * Client Component (form state).
 */

import { useState } from "react";
import { AlertTriangle, Pause } from "lucide-react";
import {
  getClientContracts,
  type ContractTerms,
} from "@/lib/mock-data/specialist/client-contracts";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";
import { SheetPanelShell } from "./sheet-panel-shell";

const GRACE_OPTIONS = [7, 14, 30] as const;
type Grace = (typeof GRACE_OPTIONS)[number];

export type PausePayload = {
  graceDays: Grace;
  note: string;
};

function estimateMonthlyRevenue(terms: ContractTerms): number {
  if (terms.kind === "hourly") {
    return terms.rate * terms.estimatedMonthlyHours;
  }
  return terms.monthlyAmount;
}

export function PausePanel({
  client,
  onBack,
  onConfirm,
}: {
  client: ManagedClient;
  onBack: () => void;
  onConfirm: (client: ManagedClient, payload: PausePayload) => void;
}) {
  const [graceDays, setGraceDays] = useState<Grace>(14);
  const [note, setNote] = useState("");

  const contracts = getClientContracts(client.id);
  const activeContracts = contracts.filter(
    (c) => c.status === "active" || c.status === "expiring-soon",
  );
  const monthlyRevenue = activeContracts.reduce(
    (sum, c) => sum + estimateMonthlyRevenue(c.terms),
    0,
  );
  const monthlyRevenueLabel =
    monthlyRevenue >= 1000
      ? `$${(monthlyRevenue / 1000).toFixed(1)}k/mo`
      : `$${monthlyRevenue.toLocaleString("en-US")}/mo`;

  const canConfirm = note.trim().length > 0;

  return (
    <SheetPanelShell title="Pause client" subtitle={client.companyName} onBack={onBack}>
      {/* Top alert */}
      <div className="border-l-amber bg-amber/8 mb-4 flex items-start gap-2.5 rounded-md border-l-[3px] px-3.5 py-3">
        <AlertTriangle
          className="text-amber mt-0.5 h-4 w-4 flex-shrink-0"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <div className="text-ink-soft text-[12.5px] leading-[1.5]">
          Pausing {client.companyName} stops new client matches and freezes
          briefs in progress. Active hires continue billing through the grace
          window; new briefs queue but don&apos;t go out.
        </div>
      </div>

      {/* Consequences */}
      <div className="border-line bg-cream/40 mb-4 grid grid-cols-3 gap-3 rounded-md border p-3.5">
        <Stat label="Active hires" value={String(client.activeHires)} />
        <Stat label="Active contracts" value={String(activeContracts.length)} />
        <Stat label="Est. monthly" value={monthlyRevenueLabel} />
      </div>

      {/* Grace window picker */}
      <div className="mb-4">
        <label className="text-ink-soft mb-1.5 block text-[12.5px] font-medium">
          Grace window for active engagements
        </label>
        <div className="flex gap-1.5">
          {GRACE_OPTIONS.map((d) => {
            const isActive = graceDays === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setGraceDays(d)}
                aria-pressed={isActive}
                className={cn(
                  "border-line bg-paper text-ink-soft inline-flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-[12.5px] font-medium transition-colors",
                  isActive
                    ? "bg-ink text-paper border-ink"
                    : "hover:bg-cream-deep hover:border-ink-mute",
                )}
              >
                {d} days
              </button>
            );
          })}
        </div>
        <p className="text-ink-mute mt-1.5 text-[11px] leading-[1.4]">
          Existing hires continue billing through the grace window; the
          client is notified at pause and again at the window&apos;s end.
        </p>
      </div>

      {/* Required note */}
      <div className="mb-4">
        <label
          htmlFor="pause-note"
          className="text-ink-soft mb-1.5 block text-[12.5px] font-medium"
        >
          Reason for pause <span className="text-ink-mute">(required)</span>
        </label>
        <textarea
          id="pause-note"
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 240))}
          rows={3}
          placeholder="Brief reason · stays internal in the audit log."
          className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3 py-2 text-[13.5px] leading-[1.5] outline-none focus:ring-[3px]"
        />
        <div className="text-ink-mute mt-1 text-[10.5px]">{note.length} / 240</div>
      </div>

      {/* Footer actions */}
      <div className="border-line-soft flex items-center justify-end gap-2 border-t pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(client, { graceDays, note: note.trim() })}
          disabled={!canConfirm}
          className="bg-amber text-paper hover:bg-amber/85 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-amber"
        >
          <Pause className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
          Pause {client.companyName}
        </button>
      </div>
    </SheetPanelShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-mute mb-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div className="font-display text-ink text-[18px] font-medium leading-none tracking-[-0.01em]">
        {value}
      </div>
    </div>
  );
}
