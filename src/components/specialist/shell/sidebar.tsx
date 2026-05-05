"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { currentUser } from "@/lib/mock-data/specialist/current-user";
import {
  type NavItem,
  type NavSection,
  navItems,
} from "@/lib/mock-data/specialist/nav-items";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarProfile } from "./sidebar-profile";

const SECTIONS: ReadonlyArray<NavSection> = ["Workspace", "Operations"];

/** Pick the longest matching nav href so nested routes still highlight the parent. */
function activeKeyFor(pathname: string, items: ReadonlyArray<NavItem>): string | null {
  let bestMatch: NavItem | null = null;
  for (const item of items) {
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
      if (!bestMatch || item.href.length > bestMatch.href.length) {
        bestMatch = item;
      }
    }
  }
  return bestMatch?.key ?? null;
}

export function Sidebar() {
  const pathname = usePathname();
  const activeKey = useMemo(() => activeKeyFor(pathname, navItems), [pathname]);
  const itemsBySection = useMemo(() => {
    const grouped: Record<NavSection, NavItem[]> = {
      Workspace: [],
      Operations: [],
    };
    for (const item of navItems) grouped[item.section].push(item);
    return grouped;
  }, []);

  return (
    <aside
      className="bg-paper border-line-soft sticky top-[calc(36px+57px)] hidden h-[calc(100vh-36px-57px)] flex-col overflow-y-auto border-r px-3 py-4 md:flex"
      aria-label="Specialist navigation"
    >
      <nav className="flex flex-1 flex-col gap-px">
        {SECTIONS.map((section, sectionIndex) => (
          <div key={section} className="contents">
            <div
              className={
                sectionIndex === 0
                  ? "text-ink-mute px-2.5 pt-1 pb-1.5 font-mono text-[9px] tracking-[0.18em] uppercase"
                  : "border-line-soft text-ink-mute mt-2.5 border-t px-2.5 pt-3.5 pb-1.5 font-mono text-[9px] tracking-[0.18em] uppercase"
              }
            >
              {section}
            </div>
            {itemsBySection[section].map((item) => (
              <SidebarNavItem
                key={item.key}
                item={item}
                isActive={activeKey === item.key}
              />
            ))}
          </div>
        ))}
      </nav>
      <SidebarProfile
        category={currentUser.category}
        poolStatus={currentUser.poolStatus}
        poolLiveCount={currentUser.poolLiveCount}
      />
    </aside>
  );
}
