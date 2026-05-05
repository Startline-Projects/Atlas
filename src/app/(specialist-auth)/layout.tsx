/**
 * Centered-card layout for specialist auth flows. Server Component.
 *
 * Structure (per HTML lines 13186–13215, 13573):
 *   - cream page background with a subtle dotted grain
 *   - centered editorial header (eyebrow + display heading + lead) — provided by each page
 *   - white form card (provided by each page via children)
 *   - thin footer with version + help mailto
 *
 * Intentionally NO staff ribbon, NO sidebar, NO topbar. Auth surfaces
 * are unauthenticated; no console chrome should leak before sign-in.
 */
import { Logo } from "@/components/ui/logo";

export default function SpecialistAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(14,14,12,0.03) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="relative z-[1] mx-auto flex min-h-screen max-w-[480px] flex-col px-6 pt-12 pb-10 sm:px-8 sm:pt-14">
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
            ATLAS · v2.4.1 · prod
          </span>
          <span>
            Need help?{" "}
            <a
              href="mailto:internal@atlasworld.co"
              className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
            >
              internal@atlasworld.co
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}
