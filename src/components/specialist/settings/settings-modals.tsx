"use client";

/**
 * Settings modal wiring. Single ReviewModal shell shared across all
 * 4 modal kinds — same single-config pattern as reviews-approvals
 * decision modals (cleaner than 4 separate modal components).
 *
 *   change-password    — form: current / new / confirm
 *   manage-2fa         — visual: shows authenticator backup codes
 *   transfer-pool      — danger confirm with warning copy
 *   request-deletion   — danger confirm with longer warning copy
 *
 * Confirm callbacks fire the parent's approved-flash trigger.
 *
 * Client Component.
 */

import { useState } from "react";
import {
  Check,
  KeyRound,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";
import {
  dangerZoneActions,
  type DangerZoneAction,
} from "@/lib/mock-data/specialist/settings";

export type SettingsModalKind =
  | "change-password"
  | "manage-2fa"
  | "transfer-pool"
  | "request-deletion"
  | null;

const MODAL_CONFIG: Record<
  Exclude<SettingsModalKind, null>,
  {
    title: string;
    iconTone: "default" | "warn" | "danger" | "success";
    icon: React.ReactNode;
    confirmLabel: string;
    confirmTone: "default" | "danger" | "success";
    flashVerb: string;
    flashTail: string;
    flashTone: "success" | "warn";
  }
> = {
  "change-password": {
    title: "Change password",
    iconTone: "default",
    icon: <KeyRound className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Update password",
    confirmTone: "default",
    flashVerb: "Updated.",
    flashTail: "Password changed.",
    flashTone: "success",
  },
  "manage-2fa": {
    title: "Manage 2-factor authentication",
    iconTone: "success",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Regenerate backup codes",
    confirmTone: "default",
    flashVerb: "Regenerated.",
    flashTail: "Backup codes refreshed.",
    flashTone: "success",
  },
  "transfer-pool": {
    title: "Initiate pool transfer",
    iconTone: "warn",
    icon: <Users className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Initiate transfer",
    confirmTone: "danger",
    flashVerb: "Initiated.",
    flashTail: "Pool transfer routed to admin.",
    flashTone: "warn",
  },
  "request-deletion": {
    title: "Request account deletion",
    iconTone: "danger",
    icon: <Trash2 className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Request deletion",
    confirmTone: "danger",
    flashVerb: "Requested.",
    flashTail: "Admin will reach out within 48h.",
    flashTone: "warn",
  },
};

const DANGER_BY_KEY: Record<DangerZoneAction["key"], SettingsModalKind> = {
  "transfer-pool": "transfer-pool",
  "request-deletion": "request-deletion",
};

export { DANGER_BY_KEY };

export function SettingsModals({
  kind,
  onClose,
  onConfirm,
}: {
  kind: SettingsModalKind;
  onClose: () => void;
  onConfirm: (kind: NonNullable<SettingsModalKind>) => void;
}) {
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  if (kind === null) return null;
  const cfg = MODAL_CONFIG[kind];

  return (
    <ReviewModal
      open
      onClose={onClose}
      iconTone={cfg.iconTone}
      icon={cfg.icon}
      title={cfg.title}
      ariaLabel={cfg.title}
      body={<ModalBody kind={kind} />}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-lg border px-4 py-2 text-[13px] transition-colors"
          >
            Cancel
          </button>
          <ConfirmButton
            tone={cfg.confirmTone}
            onClick={() => {
              onConfirm(kind);
              setPwCurrent("");
              setPwNew("");
              setPwConfirm("");
            }}
          >
            {cfg.confirmLabel}
          </ConfirmButton>
        </>
      }
    />
  );

  /* ============================================================
     Per-kind body content
     ============================================================ */
  function ModalBody({ kind }: { kind: NonNullable<SettingsModalKind> }) {
    if (kind === "change-password") {
      return (
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
              Current password
            </span>
            <input
              type="password"
              value={pwCurrent}
              onChange={(e) => setPwCurrent(e.target.value)}
              className="bg-cream border-line rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none focus:border-ink-mute focus:bg-paper"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
              New password
            </span>
            <input
              type="password"
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className="bg-cream border-line rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none focus:border-ink-mute focus:bg-paper"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
              Confirm new password
            </span>
            <input
              type="password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              className="bg-cream border-line rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none focus:border-ink-mute focus:bg-paper"
            />
          </label>
          <p className="text-[11.5px] text-ink-mute">
            Atlas requires 12+ characters with at least one uppercase, one
            number, and one symbol. You&apos;ll be signed out of other sessions
            after the change.
          </p>
        </div>
      );
    }
    if (kind === "manage-2fa") {
      return (
        <div className="flex flex-col gap-3 text-[13px] leading-[1.55] text-ink-soft">
          <p className="m-0">
            Two-factor authentication is{" "}
            <strong className="text-success font-semibold">enabled</strong>.
            Atlas requires 2FA for all specialists per compliance.
          </p>
          <div className="border-line-soft bg-cream rounded-lg border p-3">
            <div className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
              Backup codes
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <Check
                className="h-3.5 w-3.5 text-success"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>10 unused codes · last regenerated 47 days ago</span>
            </div>
          </div>
          <p className="m-0 text-[12px] text-ink-mute">
            Regenerating invalidates your existing codes. Save the new ones
            somewhere safe before signing out.
          </p>
        </div>
      );
    }
    if (kind === "transfer-pool") {
      const action = dangerZoneActions.find((a) => a.key === "transfer-pool");
      return (
        <div className="flex flex-col gap-3 text-[13px] leading-[1.55] text-ink-soft">
          <p className="m-0">{action?.confirmCopy}</p>
          <div className="bg-amber/10 border-l-amber rounded-md border-l-[3px] px-3 py-2 text-[12.5px] text-ink-soft">
            <strong className="font-semibold text-ink">Heads up:</strong> the
            14-day handoff window is non-negotiable for compliance — your
            account stays active during the window.
          </div>
        </div>
      );
    }
    // request-deletion
    const action = dangerZoneActions.find((a) => a.key === "request-deletion");
    return (
      <div className="flex flex-col gap-3 text-[13px] leading-[1.55] text-ink-soft">
        <p className="m-0">{action?.confirmCopy}</p>
        <div className="bg-danger-bg border-l-danger rounded-md border-l-[3px] px-3 py-2 text-[12.5px] text-ink-soft">
          <strong className="font-semibold text-danger">Cannot be undone:</strong>{" "}
          personal data is wiped within 30 days. Audit logs persist for 7 years
          per compliance.
        </div>
      </div>
    );
  }
}

/* ============================================================
   Confirm button — tone-keyed
   ============================================================ */

function ConfirmButton({
  tone,
  onClick,
  children,
}: {
  tone: "default" | "danger" | "success";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "bg-danger text-paper hover:bg-danger/90"
      : tone === "success"
        ? "bg-success text-paper hover:bg-success/90"
        : "bg-ink text-paper hover:bg-ink-soft";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${cls}`}
    >
      {children}
    </button>
  );
}
