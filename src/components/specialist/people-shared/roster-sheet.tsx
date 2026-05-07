"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type RosterSheetProps = {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  /** Composed content: hero / stats / sections / actions stacked. */
  children: React.ReactNode;
};

/**
 * Slide-over right panel shell. Listens for Esc, locks body scroll,
 * fades the backdrop. Page composes the content via children.
 */
export function RosterSheet({
  open,
  onClose,
  ariaLabel,
  children,
}: RosterSheetProps) {
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

  return (
    <>
      <button
        type="button"
        aria-label="Close panel"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[89] cursor-default bg-[rgba(14,14,12,0.22)] transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-label={ariaLabel}
        aria-hidden={!open}
        className={cn(
          "bg-paper border-line fixed top-0 right-0 bottom-0 z-[90] flex w-[440px] max-w-[92vw] flex-col overflow-y-auto border-l shadow-[-16px_0_56px_rgba(14,14,12,0.10)] transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-ink-mute hover:bg-cream-deep hover:text-ink absolute top-3.5 right-3.5 z-[1] grid h-8 w-8 place-items-center rounded-md transition-colors"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        {children}
      </aside>
    </>
  );
}
