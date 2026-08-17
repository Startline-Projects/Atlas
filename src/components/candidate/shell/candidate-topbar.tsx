/**
 * Light topbar for the signed-in candidate surface. Server Component.
 *
 * Deliberately minimal — candidates in the vetting funnel get a
 * focused, single-column experience, not the specialist console
 * chrome (no sidebar, no queue chips).
 *
 * Receives the session from the guarded layout: there is no anonymous
 * rendering of this bar any more, so there is no mock fallback either.
 */
import { Briefcase, LifeBuoy, UserRound } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import type { CandidateSession } from "@/lib/auth";
import { roleCategoryLabel } from "@/lib/domain/candidate";

import { avatarGradientFor, initialsOf } from "@/lib/utils/avatar";
import { SignOutButton } from "./sign-out-button";

export function CandidateTopbar({ session }: { session: CandidateSession }) {
  const { candidate } = session;
  const gradient = avatarGradientFor(candidate.id);
  const subtitle = [
    roleCategoryLabel(candidate.roleCategory),
    candidate.country,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <header className="bg-cream/95 border-line-soft sticky top-0 z-[10] border-b backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[64px] max-w-[1060px] items-center justify-between gap-4 px-6 sm:px-8">
        <div className="flex items-center gap-5">
          <Logo href="/candidate/dashboard" className="text-[22px]" />
          <nav aria-label="Candidate" className="hidden items-center gap-1 sm:flex">
            <Link
              href="/candidate/dashboard"
              className="text-ink-soft hover:bg-cream-deep hover:text-ink rounded-full px-3 py-1.5 text-[13px] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/candidate/jobs"
              className="text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors"
            >
              <Briefcase className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Jobs
            </Link>
            <Link
              href="/candidate/profile"
              className="text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors"
            >
              <UserRound className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="mailto:talent@atlasworld.co"
            className="text-ink-mute hover:bg-cream-deep hover:text-ink hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors sm:inline-flex"
          >
            <LifeBuoy className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Support
          </a>
          <span className="bg-paper border-line flex items-center gap-2.5 rounded-full border py-1 pr-1.5 pl-1">
            <span
              aria-hidden="true"
              className="text-ink grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              }}
            >
              {initialsOf(candidate.fullName)}
            </span>
            <span className="flex flex-col pr-2 leading-tight">
              <span className="text-ink text-[13px] font-medium">{candidate.fullName}</span>
              <span className="text-ink-mute text-[11px]">{subtitle}</span>
            </span>
            <SignOutButton />
          </span>
        </div>
      </div>
    </header>
  );
}
