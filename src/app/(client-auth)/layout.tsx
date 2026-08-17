/**
 * Centered-card layout for client auth flows (signup, signin). Server
 * Component. Mirrors `(candidate-auth)/layout.tsx` per the per-role surface
 * structure in AI_RULES.md §3.6.
 *
 * No topbar, no console chrome — auth surfaces are unauthenticated. A
 * visitor who already holds a *valid* client session is sent on to the
 * dashboard instead of being shown a form. (The proxy cannot do this: it
 * only sees that a cookie exists, and a stale one would loop.)
 */
import { redirect } from "next/navigation";

import { Logo } from "@/components/ui/logo";
import { CLIENT_HOME_PATH, getClientSession } from "@/lib/auth";

export default async function ClientAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getClientSession();
  if (session) redirect(CLIENT_HOME_PATH);

  return (
    <div className="bg-cream relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(rgba(14,14,12,0.03) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="relative z-[1] mx-auto flex min-h-screen max-w-[520px] flex-col px-6 pt-12 pb-10 sm:px-8 sm:pt-14">
        <div className="mb-10 flex justify-center sm:mb-12">
          <Logo />
        </div>
        <div className="flex-1">{children}</div>
        <footer className="text-ink-mute mt-10 flex flex-wrap items-center justify-between gap-2 text-[12.5px]">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="bg-success inline-block h-1.5 w-1.5 rounded-full"
            />
            ATLAS · Client portal
          </span>
          <span>
            Need help?{" "}
            <a
              href="mailto:hello@atlas.co"
              className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
            >
              hello@atlas.co
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
