'use client';

/* Per-step "Go to {section} →" link — Option A adaptation.
   admin.html steps through sections via switchView(hashTarget) (JS 81357-81361); on a dedicated
   route we instead surface an explicit nav link. The Pass A fixture already stores the full route
   in step.hashTarget and the ready label in step.hashLabel, so no slug→route resolver is needed. */

import { useRouter } from 'next/navigation';

interface ObGoToLinkProps {
  href: string;
  label: string;
}

export function ObGoToLink({ href, label }: ObGoToLinkProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className="inline-flex items-center gap-[6px] mt-[12px] font-mono text-[11px] font-bold text-[var(--super)] underline hover:text-[var(--ink)] cursor-pointer bg-transparent border-0 p-0"
    >
      {label}
    </button>
  );
}
