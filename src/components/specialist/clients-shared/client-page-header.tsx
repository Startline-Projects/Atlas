/**
 * ClientPageHeader — top band on every `/specialist/clients/[id]/...`
 * page. Server Component.
 *
 * Renders:
 *   1. Breadcrumb (`Dashboard / My clients / {companyName}` for the
 *      overview; sub-pages add a 4th segment via the `section` prop
 *      in C2/C3).
 *   2. Identity row — logo (gradient bucket) + companyName + trust
 *      tier pill + VIP star (if `isVip`) + verified badge (if
 *      `verified`).
 *   3. Meta strip — pre-composed `metaLine` field
 *      ("B2B SaaS · 200 employees · San Francisco, USA").
 *
 * NOT sticky — scrolls under the topbar + sub-nav. Matches
 * `RosterHeader` / `DisputeHeader` / `ReviewHeader` precedent.
 *
 * No action buttons on right side (Checkpoint 1 lock; revisit when
 * product validates need).
 *
 * Server Component — pure composition.
 */

import Link from "next/link";
import { CheckCircle, Star } from "lucide-react";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";

const LOGO_GRADIENT: Record<ManagedClient["logoGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
};

type ClientPageHeaderProps = {
  client: ManagedClient;
  /** Optional 4th breadcrumb segment for child pages. C1 overview
   *  passes nothing → breadcrumb stops at `companyName`. C2 list
   *  pages pass `{ label: "Contracts" }` etc. */
  section?: { label: string };
};

export function ClientPageHeader({ client, section }: ClientPageHeaderProps) {
  return (
    <header className="bg-cream border-line-soft border-b px-6 pt-5 pb-6 sm:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="text-ink-mute flex items-center gap-1.5 text-[12px]">
          <li>
            <Link
              href="/specialist/dashboard"
              className="hover:text-ink transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/specialist/my-clients"
              className="hover:text-ink transition-colors"
            >
              My clients
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className={section ? "" : "text-ink"}>
            {section ? (
              <Link
                href={`/specialist/clients/${client.id}`}
                className="hover:text-ink transition-colors"
              >
                {client.companyName}
              </Link>
            ) : (
              <span aria-current="page">{client.companyName}</span>
            )}
          </li>
          {section ? (
            <>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">
                {section.label}
              </li>
            </>
          ) : null}
        </ol>
      </nav>

      {/* Identity row */}
      <div className="flex flex-wrap items-center gap-4">
        <div
          aria-hidden="true"
          className={cn(
            "grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl font-mono text-[18px] font-semibold tracking-[0.04em]",
            LOGO_GRADIENT[client.logoGradient],
          )}
        >
          {client.logoInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1
              className="font-display text-ink m-0 text-[28px] font-medium leading-tight tracking-[-0.015em]"
              style={{ fontVariationSettings: '"opsz" 72' }}
            >
              {client.companyName}
            </h1>
            <TrustTierPill tier={client.trustTier} />
            {client.isVip ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(214,242,77,0.20)] text-lime-deep px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase">
                <Star className="h-2.5 w-2.5" strokeWidth={2.4} aria-hidden="true" />
                VIP
              </span>
            ) : null}
            {client.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success-bg text-success px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase">
                <CheckCircle className="h-2.5 w-2.5" strokeWidth={2.2} aria-hidden="true" />
                Verified
              </span>
            ) : null}
          </div>
          <p className="text-ink-mute mt-1 m-0 text-[13px]">{client.metaLine}</p>
        </div>
      </div>
    </header>
  );
}

function TrustTierPill({ tier }: { tier: ManagedClient["trustTier"] }) {
  const cls =
    tier === "Top Client"
      ? "bg-[rgba(214,242,77,0.20)] text-lime-deep"
      : tier === "Trusted"
        ? "bg-success-bg text-success"
        : "bg-cream-deep text-ink-soft";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
        cls,
      )}
    >
      {tier}
    </span>
  );
}
