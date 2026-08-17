"use client";

import { Loader2, XCircle } from "lucide-react";
import { useState } from "react";

import { ApiClientError, clientsApi } from "@/lib/api-client";

/**
 * Withdraws a posting. Two clicks (arm, then confirm) instead of a modal —
 * closing is reversible only by posting again, so a stray click must not do
 * it. Hard-navigates on success so the server-rendered page shows the new
 * status.
 */
export function CloseJobButton({ jobId }: { jobId: string }) {
  const [armed, setArmed] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (pending) return;
    if (!armed) {
      setArmed(true);
      return;
    }
    setPending(true);
    setError(null);
    try {
      await clientsApi.closeJob(jobId);
      window.location.assign(`/client/jobs/${jobId}?closed=1`);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Something went wrong.");
      setPending(false);
      setArmed(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        {armed && !pending && (
          <button
            type="button"
            onClick={() => setArmed(false)}
            className="text-ink-mute hover:text-ink rounded-full px-3 py-1.5 text-[13px] transition-colors"
          >
            Keep it open
          </button>
        )}
        <button
          type="button"
          onClick={handleClick}
          disabled={pending}
          className={
            armed
              ? "btn bg-danger text-cream hover:bg-danger/90 disabled:opacity-70"
              : "btn btn-outline"
          }
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          )}
          <span>{pending ? "Closing" : armed ? "Yes, close this role" : "Close role"}</span>
        </button>
      </div>
      {error && (
        <p role="alert" className="text-danger text-[12.5px]">
          {error}
        </p>
      )}
    </div>
  );
}
