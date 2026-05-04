"use client";

import { useEffect } from "react";
import { ArrowRight, Lock, X } from "lucide-react";

type SignupModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SignupModal({ open, onClose }: SignupModalProps) {
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
      aria-labelledby="signup-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-paper border-line shadow-lg relative w-full max-w-[480px] rounded-xl border p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-ink-mute hover:bg-cream-deep absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        >
          <X className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>

        <div className="text-ink-mute mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Signup required
        </div>
        <h3
          id="signup-modal-title"
          className="display mb-2 text-[28px] leading-tight"
        >
          Create a free account to continue.
        </h3>
        <p className="text-ink-soft mb-6 text-[15px] leading-[1.55]">
          Browsing is free. Watching videos, saving, and messaging require a
          30-second signup.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            className="border-line hover:border-ink hover:bg-cream group flex w-full items-center justify-between rounded-md border p-4 text-left transition-colors"
          >
            <div>
              <div className="text-ink font-medium">I&rsquo;m hiring</div>
              <div className="text-ink-mute text-[13px]">
                Sign up as a Client
              </div>
            </div>
            <ArrowRight
              className="text-ink-mute group-hover:text-ink h-4 w-4"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="border-line hover:border-ink hover:bg-cream group flex w-full items-center justify-between rounded-md border p-4 text-left transition-colors"
          >
            <div>
              <div className="text-ink font-medium">
                I&rsquo;m looking for work
              </div>
              <div className="text-ink-mute text-[13px]">
                Apply as a Candidate
              </div>
            </div>
            <ArrowRight
              className="text-ink-mute group-hover:text-ink h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>
        <p className="text-ink-mute mt-5 text-center text-[13px]">
          Already have an account?{" "}
          <a href="#" className="text-ink underline-offset-2 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
