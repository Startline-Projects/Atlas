/**
 * Light topbar for the signed-in client surface. Server Component.
 *
 * Same focused single-column chrome as the candidate portal — the client
 * MVP is a short path (dashboard → post a job → review), not a console.
 * Receives the session from the guarded layout: no anonymous rendering.
 */
import { LifeBuoy, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import type { ClientSession } from "@/lib/auth";
import { CLIENT_HOME_PATH } from "@/lib/auth/redirects";
import { avatarGradientFor, initialsOf } from "@/lib/utils/avatar";

import { ClientSignOutButton } from "./sign-out-button";

export function ClientTopbar({ session }: { session: ClientSession }) {
  const { client } = session;
  const gradient = avatarGradientFor(client.id);
  const subtitle = [client.companyName, client.country].filter(Boolean).join(" · ");

  return (
    <header className="bg-cream/95 border-line-soft sticky top-0 z-[10] border-b backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[64px] max-w-[1060px] items-center justify-between gap-4 px-6 sm:px-8">
        <div className="flex items-center gap-5">
          <Logo href={CLIENT_HOME_PATH} className="text-[22px]" />
          <nav aria-label="Client" className="hidden items-center gap-1 sm:flex">
            <Link
              href={CLIENT_HOME_PATH}
              className="text-ink-soft hover:bg-cream-deep hover:text-ink rounded-full px-3 py-1.5 text-[13px] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/client/jobs/new"
              className="text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors"
            >
              <PlusCircle className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Post a job
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="mailto:hello@atlas.co"
            className="text-ink-mute hover:bg-cream-deep hover:text-ink hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors sm:inline-flex"
          >
            <LifeBuoy className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Support
          </a>
          <span className="bg-paper border-line flex items-center gap-2.5 rounded-full border py-1 pr-1.5 pl-1">
            <span
              aria-hidden="true"
              className="text-ink grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold"
              style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
            >
              {initialsOf(client.contactName)}
            </span>
            <span className="flex flex-col pr-2 leading-tight">
              <span className="text-ink text-[13px] font-medium">{client.contactName}</span>
              <span className="text-ink-mute text-[11px]">{subtitle}</span>
            </span>
            <ClientSignOutButton />
          </span>
        </div>
      </div>
    </header>
  );
}
