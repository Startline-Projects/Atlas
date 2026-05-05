/**
 * Specialist console layout — Server Component.
 *
 * Composes:
 *   1. Staff ribbon (sticky top, dark bar with audit notice)
 *   2. Topbar (logo, search, notifications, messages, avatar)
 *   3. Two-column shell: Sidebar (Client — usePathname for active state)
 *      + main content (route children)
 *
 * Marketing route group is unaffected; /specialist/* is its own surface.
 */

import { Sidebar } from "@/components/specialist/shell/sidebar";
import { StaffRibbon } from "@/components/specialist/shell/staff-ribbon";
import { Topbar } from "@/components/specialist/shell/topbar";

export default function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream min-h-screen">
      <StaffRibbon />
      <Topbar />
      <div className="grid min-h-[calc(100vh-36px-57px)] grid-cols-1 md:grid-cols-[232px_minmax(0,1fr)]">
        <Sidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
