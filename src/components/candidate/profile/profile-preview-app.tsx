"use client";

import { ArrowLeft, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ApiClientError, candidateProfileApi } from "@/lib/api-client";
import type { CandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";

import { ClientProfileView } from "./client-profile-view";
import { FormBanner } from "./form-primitives";

/** "Preview in client mode" — the candidate's own profile, rendered as a client will see it. */
export function ProfilePreviewApp() {
  const [view, setView] = useState<CandidateProfileViewDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    candidateProfileApi
      .get()
      .then((v) => {
        if (!cancelled) setView(v);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        if (e instanceof ApiClientError && e.status === 401) {
          window.location.assign("/candidate/signin?next=/candidate/profile/preview");
          return;
        }
        setError(e instanceof ApiClientError ? e.message : "Could not load your profile.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <FormBanner message={error} />;

  if (!view) {
    return (
      <div className="text-ink-mute flex items-center gap-2 py-16 text-[14px]">
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
        Loading preview…
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-6">
      <div className="bg-ink text-paper flex flex-wrap items-center justify-between gap-3 rounded-xl px-5 py-3.5">
        <span className="inline-flex items-center gap-2 text-[13.5px]">
          <Eye className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          Client mode — this is what a client sees when they open your profile.
          <span className="bg-lime text-ink ml-1 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.12em] uppercase">
            {view.strength.score}% complete
          </span>
        </span>
        <Link
          href="/candidate/profile"
          className="text-paper hover:bg-paper/10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          Back to editing
        </Link>
      </div>

      <ClientProfileView profile={view.profile} />
    </div>
  );
}
