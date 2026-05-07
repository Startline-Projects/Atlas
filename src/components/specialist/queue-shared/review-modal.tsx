"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  /** Header icon — colour-coded by intent. */
  iconTone?: "default" | "warn" | "danger" | "success";
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  /** ARIA label for the modal — defaults to the title rendered as a string when possible. */
  ariaLabel?: string;
};

const ICON_TONE = {
  default: "bg-cream-deep text-ink",
  warn: "bg-amber/14 text-amber",
  danger: "bg-danger-bg text-danger",
  success: "bg-success-bg text-success",
} as const;

export function ReviewModal({
  open,
  onClose,
  iconTone = "default",
  icon,
  title,
  subtitle,
  body,
  footer,
  ariaLabel,
}: ReviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? "Modal"}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-paper border-line shadow-card relative w-full max-w-[520px] rounded-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-line-soft flex items-start gap-4 border-b px-6 pt-5 pb-4">
          <div
            aria-hidden="true"
            className={cn(
              "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full",
              ICON_TONE[iconTone],
            )}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="font-display text-ink mb-1 text-[20px] leading-tight font-medium tracking-[-0.01em]"
            >
              {title}
            </h3>
            {subtitle ? (
              <p className="text-ink-soft text-[13px] leading-[1.55]">
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-mute hover:bg-cream-deep hover:text-ink grid h-8 w-8 flex-shrink-0 place-items-center rounded-md transition-colors"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-6 py-5">{body}</div>
        <div className="border-line-soft flex items-center justify-end gap-2 border-t px-6 pt-4 pb-5">
          {footer}
        </div>
      </div>
    </div>
  );
}
