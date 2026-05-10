import Link from "next/link";
import {
  Calendar,
  MailQuestion,
  MessageSquare,
  Plus,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { quickActions } from "@/lib/mock-data/specialist/dashboard-cards";

const ICONS: Record<(typeof quickActions)[number]["iconKey"], LucideIcon> = {
  plus: Plus,
  pool: Waves,
  calendar: Calendar,
  "candidate-msg": MessageSquare,
  "client-msg": MailQuestion,
};

export function QuickActionsCard() {
  return (
    <div className="bg-paper border-line rounded-md border px-4 py-4">
      <div className="text-ink-mute mb-3 flex items-center justify-between gap-2 font-mono text-[9.5px] tracking-[0.16em] uppercase">
        Quick actions
      </div>
      <div className="flex flex-col gap-1">
        {quickActions.map((action, i) => {
          const Icon = ICONS[action.iconKey];
          const isPrimary = i === 0;
          const className = [
            "group flex w-full cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
            isPrimary
              ? "bg-ink text-paper border-ink hover:bg-black mb-1.5"
              : "border-transparent text-ink hover:bg-cream",
          ].join(" ");
          const iconClassName = [
            "h-4 w-4 flex-shrink-0",
            isPrimary ? "text-lime" : "text-ink-mute group-hover:text-ink",
          ].join(" ");
          const inner = (
            <>
              <Icon
                className={iconClassName}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {action.label}
            </>
          );
          if (action.href) {
            return (
              <Link key={action.key} href={action.href} className={className}>
                {inner}
              </Link>
            );
          }
          return (
            <button key={action.key} type="button" className={className}>
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}
