'use client';

/* admin.html ticker foot — markup lines 68308-68311 + CSS 33168-33193.
   Stats + "Manage subscriptions →" link (router.push → /admin/realtime). */

import { useRouter } from 'next/navigation';

export function RtTickerFoot({
  stats,
  linkLabel,
  linkHref,
}: {
  stats: string;
  linkLabel: string;
  linkHref: string;
}) {
  const router = useRouter();

  return (
    <div className="py-[10px] px-[16px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex items-center justify-between gap-[8px]">
      <div className="font-mono text-[9.5px] tracking-[0.04em] text-[var(--ink-mute)] font-bold">
        {stats}
      </div>
      <button
        type="button"
        onClick={() => router.push(linkHref)}
        className="font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--ink)] underline cursor-pointer bg-transparent border-0 p-0 hover:text-[var(--super)]"
      >
        {linkLabel}
      </button>
    </div>
  );
}
