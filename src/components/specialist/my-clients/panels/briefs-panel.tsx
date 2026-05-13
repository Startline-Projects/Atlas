"use client";

/**
 * BriefsPanel — inline replacement for the prior
 * `WorkflowUnavailableModal kind="briefs"` and `kind="send-brief"`.
 *
 * Two display modes:
 *   - `list` (default): tab strip (Open / Closed) + BriefCard list.
 *     Header action: "+ New brief" toggles to `compose` mode.
 *   - `compose`: simple form (role / scope / budget / shortlist seed).
 *     Submit fires `useQueuedFlash` warn-tone via the orchestrator's
 *     callback. Cancel returns to `list`.
 *
 * The kebab-item "Send brief" opens this panel pre-set to `compose`
 * mode via the `initialMode` prop. The "View briefs" sheet button
 * uses default `list`.
 *
 * Client Component (mode + form state).
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import { BriefsListBody } from "@/components/specialist/clients-shared";
import {
  getClientBriefs,
  splitBriefs,
} from "@/lib/mock-data/specialist/client-briefs";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";
import { SheetPanelShell } from "./sheet-panel-shell";

type Mode = "list" | "compose";
type Tab = "open" | "closed";

export type BriefsPanelProps = {
  client: ManagedClient;
  onBack: () => void;
  /** Pre-set the panel into compose mode (from the kebab "Send brief"). */
  initialMode?: Mode;
  /** Fired when the composer submits; parent fires the queued flash. */
  onSendBrief: (client: ManagedClient, payload: ComposeBriefPayload) => void;
};

export type ComposeBriefPayload = {
  role: string;
  scope: string;
  budgetMin: number;
  budgetMax: number;
  budgetType: "hourly" | "monthly";
};

export function BriefsPanel({
  client,
  onBack,
  initialMode = "list",
  onSendBrief,
}: BriefsPanelProps) {
  const [mode, setMode] = useState<Mode>(initialMode);

  if (mode === "compose") {
    return (
      <ComposeView
        client={client}
        onBack={onBack}
        onCancel={() => setMode("list")}
        onSubmit={(payload) => {
          onSendBrief(client, payload);
          setMode("list");
        }}
      />
    );
  }
  return <ListView client={client} onBack={onBack} onCompose={() => setMode("compose")} />;
}

/* ============================================================
   List view — tabs + BriefCards
   ============================================================ */

function ListView({
  client,
  onBack,
  onCompose,
}: {
  client: ManagedClient;
  onBack: () => void;
  onCompose: () => void;
}) {
  const briefs = getClientBriefs(client.id);
  const { open, closed } = splitBriefs(briefs);
  const [tab, setTab] = useState<Tab>(open.length > 0 ? "open" : "closed");
  const visible = tab === "open" ? open : closed;

  return (
    <SheetPanelShell
      title="Briefs"
      subtitle={`${open.length} open · ${closed.length} closed · ${client.briefsTotal} all-time`}
      onBack={onBack}
      headerAction={
        <button
          type="button"
          onClick={onCompose}
          className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors"
        >
          <Plus className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          New brief
        </button>
      }
    >
      {/* Tabs */}
      <nav
        aria-label="Briefs tabs"
        role="tablist"
        className="border-line-soft mb-3 flex items-center gap-1 border-b"
      >
        <Tab label="Open" count={open.length} active={tab === "open"} onClick={() => setTab("open")} />
        <Tab label="Closed" count={closed.length} active={tab === "closed"} onClick={() => setTab("closed")} />
      </nav>

      {/* List — Layer A body. Tab-aware empty state stays in this
          (sheet-side) wrapper since copy depends on the active tab
          which is a sheet-only concept. */}
      <BriefsListBody briefs={visible} emptyState={<EmptyState tab={tab} />} />
    </SheetPanelShell>
  );
}

function Tab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-[12.5px] font-medium transition-colors",
        active ? "text-ink" : "text-ink-mute hover:text-ink",
      )}
    >
      {label}
      <span
        className={cn(
          "ml-1.5 inline-flex items-center rounded-[3px] px-1 py-px font-mono text-[10px] font-medium tracking-[0.04em]",
          active ? "bg-ink text-paper" : "bg-cream-deep text-ink-mute",
        )}
      >
        {count}
      </span>
      {active ? (
        <span
          aria-hidden="true"
          className="bg-ink absolute right-0 -bottom-px left-0 h-[2px]"
        />
      ) : null}
    </button>
  );
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[13px]">
      {tab === "open" ? (
        <>
          <p className="m-0">No open briefs.</p>
          <p className="mt-1 m-0 text-[12px]">
            Use &ldquo;+ New brief&rdquo; to start sourcing for this client.
          </p>
        </>
      ) : (
        <p className="m-0">No closed briefs yet.</p>
      )}
    </div>
  );
}

/* ============================================================
   Compose view — minimal form (role / scope / budget)
   ============================================================ */

function ComposeView({
  client,
  onBack,
  onCancel,
  onSubmit,
}: {
  client: ManagedClient;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: (payload: ComposeBriefPayload) => void;
}) {
  const [role, setRole] = useState("");
  const [scope, setScope] = useState("");
  const [budgetMin, setBudgetMin] = useState<number>(45);
  const [budgetMax, setBudgetMax] = useState<number>(55);
  const [budgetType, setBudgetType] = useState<"hourly" | "monthly">("hourly");

  const canSubmit = role.trim().length > 0 && scope.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      role: role.trim(),
      scope: scope.trim(),
      budgetMin,
      budgetMax,
      budgetType,
    });
  };

  return (
    <SheetPanelShell
      title="New brief"
      subtitle={`Drafting for ${client.companyName}`}
      onBack={onBack}
    >
      <div className="flex flex-col gap-3.5">
        <FieldShell label="Role" htmlFor="brief-role">
          <input
            id="brief-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Senior Operations Lead"
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
          />
        </FieldShell>

        <FieldShell label="Scope" htmlFor="brief-scope">
          <textarea
            id="brief-scope"
            value={scope}
            onChange={(e) => setScope(e.target.value.slice(0, 320))}
            rows={3}
            placeholder="1-2 sentences on the role, time-zone needs, must-have skills."
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3 py-2 text-[13.5px] leading-[1.5] outline-none focus:ring-[3px]"
          />
          <div className="text-ink-mute mt-1 text-[10.5px]">{scope.length} / 320</div>
        </FieldShell>

        <FieldShell label="Budget">
          <div className="flex items-center gap-2.5">
            <div className="flex-1">
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value) || 0)}
                min={0}
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </div>
            <span className="text-ink-mute text-[12px]">to</span>
            <div className="flex-1">
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value) || 0)}
                min={0}
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </div>
            <select
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value as "hourly" | "monthly")}
              className="border-line bg-paper text-ink hover:bg-cream-deep cursor-pointer rounded-md border py-2 pr-7 pl-3 text-[12.5px] transition-colors"
            >
              <option value="hourly">/hr</option>
              <option value="monthly">/mo</option>
            </select>
          </div>
        </FieldShell>

        {/* Footer actions */}
        <div className="border-line-soft mt-2 flex items-center justify-end gap-2 border-t pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
          >
            Send to {client.companyName}
          </button>
        </div>
      </div>
    </SheetPanelShell>
  );
}

function FieldShell({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-ink-soft mb-1.5 block text-[12.5px] font-medium"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
