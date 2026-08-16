/**
 * Light topbar for the signed-in candidate surface. Server Component.
 *
 * Deliberately minimal — candidates in the vetting funnel get a
 * focused, single-column experience, not the specialist console
 * chrome (no sidebar, no queue chips).
 *
 * Reads the real session when there is one. The mock candidate remains as
 * the fallback so the design-preview dashboard stories (`?state=`) still
 * render without signing in; that fallback goes when the layout is guarded.
 */
import { LifeBuoy, UserRound } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { getCandidateSession } from "@/lib/auth";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { currentCandidate } from "@/lib/mock-data/candidate";

import { SignOutButton } from "./sign-out-button";

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export async function CandidateTopbar() {
  const session = await getCandidateSession();

  const display = session
    ? {
        fullName: session.fullName,
        initials: initialsOf(session.fullName),
        subtitle: roleCategoryLabel(session.candidate.roleCategory),
        gradient: currentCandidate.avatarGradient,
      }
    : {
        fullName: currentCandidate.fullName,
        initials: currentCandidate.initials,
        subtitle: `${currentCandidate.appliedRole} · ${currentCandidate.category}`,
        gradient: currentCandidate.avatarGradient,
      };

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
                background: `linear-gradient(135deg, ${display.gradient.from}, ${display.gradient.to})`,
              }}
            >
              {display.initials}
            </span>
            <span className="flex flex-col leading-tight pr-2">
              <span className="text-ink text-[13px] font-medium">{display.fullName}</span>
              <span className="text-ink-mute text-[11px]">{display.subtitle}</span>
            </span>
            {session && <SignOutButton />}
          </span>
        </div>
      </div>
    </header>
  );
}
