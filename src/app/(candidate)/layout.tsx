/**
 * Signed-in candidate surface layout. Server Component.
 *
 * Focused single-column funnel layout: light sticky topbar + centered
 * content on cream. No sidebar — the candidate surface is a guided
 * path (dashboard → English test → result → retake), not a console.
 */
import { CandidateTopbar } from "@/components/candidate/shell/candidate-topbar";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream min-h-screen">
      <CandidateTopbar />
      <main className="mx-auto max-w-[1060px] px-6 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
