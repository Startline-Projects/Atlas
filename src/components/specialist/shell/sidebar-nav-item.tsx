"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/mock-data/specialist/nav-items";
import { cn } from "@/lib/utils/cn";
import { SidebarIcon } from "./sidebar-icons";

type SidebarNavItemProps = {
  item: NavItem;
  isActive: boolean;
};

const BADGE_TONE_CLASS: Record<NonNullable<NavItem["badge"]>["tone"], string> = {
  default:
    "bg-cream text-ink-soft border-line-soft",
  urgent: "bg-danger text-paper border-danger",
  attention: "bg-amber text-paper border-amber",
  lime: "bg-lime text-ink border-lime-deep",
};

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-[13.5px] font-medium transition-colors",
        isActive
          ? "bg-ink text-paper"
          : "text-ink-soft hover:bg-cream-deep hover:text-ink",
        item.mobileHide && "max-md:hidden",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <SidebarIcon
        iconKey={item.iconKey}
        className={cn(
          "h-4 w-4 flex-shrink-0 transition-colors",
          isActive
            ? "text-lime"
            : "text-ink-mute group-hover:text-ink-soft",
        )}
      />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge ? (
        <span
          className={cn(
            "flex-shrink-0 rounded-[3px] border px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-[0.06em]",
            isActive
              ? "bg-paper/10 text-paper border-paper/15"
              : BADGE_TONE_CLASS[item.badge.tone],
          )}
        >
          {item.badge.value}
        </span>
      ) : null}
    </Link>
  );
}
