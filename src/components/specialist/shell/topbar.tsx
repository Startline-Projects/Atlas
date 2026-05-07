import Link from "next/link";
import { Bell, MessageSquare, Search, ChevronDown } from "lucide-react";
import { currentUser } from "@/lib/mock-data/specialist/current-user";

/**
 * Specialist console topbar. Server Component for now — the dropdowns
 * (notifications, messages, avatar menu) are interactive features that
 * future sessions will wire to a popover client component. For Session 1
 * the buttons are visual.
 *
 * Source HTML: lines 13847–13894.
 */
export function Topbar() {
  return (
    <header className="bg-cream/90 border-line-soft sticky top-9 z-[6] flex items-center justify-between gap-4 border-b px-4 py-2.5 backdrop-blur-md backdrop-saturate-[140%] sm:px-6">
      <div className="flex flex-shrink-0 items-center gap-2.5">
        <Link
          href="/specialist/dashboard"
          aria-label="Atlas — Specialist Dashboard"
          className="font-display text-ink flex items-center gap-2.5 text-[22px] font-medium tracking-[-0.02em]"
        >
          <span
            aria-hidden="true"
            className="bg-ink relative inline-block h-[26px] w-[26px] flex-shrink-0 rounded-full after:absolute after:inset-[5px] after:rounded-full after:bg-lime after:content-['']"
          />
          <span>Atlas</span>
          <span className="border-line text-ink-mute ml-1 rounded-[4px] border px-[7px] py-[3px] font-mono text-[9.5px] tracking-[0.18em] uppercase">
            Specialist
          </span>
        </Link>
      </div>

      <label className="bg-cream border-line-soft hover:border-line focus-within:border-ink relative hidden min-w-0 flex-1 items-center gap-2 rounded-md border px-3 py-2 transition-colors md:flex md:max-w-xl">
        <Search className="text-ink-mute h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="sr-only">Search</span>
        <input
          type="search"
          placeholder="Search candidates, clients, jobs, disputes…"
          className="text-ink placeholder:text-ink-mute min-w-0 flex-1 bg-transparent text-[13.5px] outline-none"
        />
        <kbd
          aria-hidden="true"
          className="bg-paper border-line-soft text-ink-mute hidden flex-shrink-0 rounded-[4px] border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block"
        >
          ⌘ K
        </kbd>
      </label>

      <div className="flex flex-shrink-0 items-center gap-1.5">
        <button
          type="button"
          aria-label="Notifications"
          className="text-ink-mute hover:bg-cream-deep hover:text-ink relative flex h-9 w-9 items-center justify-center rounded-md transition-colors"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
          <span
            aria-hidden="true"
            className="bg-danger text-paper absolute -top-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full px-1 font-mono text-[9px] font-semibold"
          >
            5
          </span>
        </button>
        <button
          type="button"
          aria-label="Messages"
          className="text-ink-mute hover:bg-cream-deep hover:text-ink relative flex h-9 w-9 items-center justify-center rounded-md transition-colors"
        >
          <MessageSquare
            className="h-[18px] w-[18px]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="bg-lime-deep text-ink absolute -top-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full px-1 font-mono text-[9px] font-semibold"
          >
            3
          </span>
        </button>
        <button
          type="button"
          aria-label="Account menu"
          className="border-line-soft hover:border-line ml-1 flex items-center gap-2 rounded-full border py-1 pr-2 pl-1 transition-colors"
        >
          <span
            aria-hidden="true"
            className="font-display text-ink grid h-7 w-7 place-items-center rounded-full text-[13px] font-medium"
            style={{
              background: `linear-gradient(135deg, ${currentUser.avatarGradient.from}, ${currentUser.avatarGradient.to})`,
            }}
          >
            {currentUser.initials.charAt(0)}
          </span>
          <span className="text-ink hidden text-[13px] font-medium sm:inline">
            {currentUser.firstName} {currentUser.lastName.charAt(0)}.
          </span>
          <ChevronDown
            className="text-ink-mute h-3 w-3"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
