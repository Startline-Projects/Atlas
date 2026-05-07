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

/** True when `pathname` falls under (or equals) `prefix`. */
function matches(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Pick the longest matching nav href so nested routes still highlight the
 * parent. Also considers each item's `additionalActivePathPrefixes` so
 * dynamic routes without a sidebar entry (e.g. `/specialist/candidates/[id]`)
 * can highlight a related parent (e.g. "My candidates").
 */
function activeKeyFor(pathname: string, items: ReadonlyArray<NavItem>): string | null {
  let bestMatch: NavItem | null = null;
  let bestPrefixLen = -1;
  for (const item of items) {
    const prefixes: ReadonlyArray<string> = [
      item.href,
      ...(item.additionalActivePathPrefixes ?? []),
    ];
    for (const p of prefixes) {
      if (matches(pathname, p) && p.length > bestPrefixLen) {
        bestMatch = item;
        bestPrefixLen = p.length;
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
