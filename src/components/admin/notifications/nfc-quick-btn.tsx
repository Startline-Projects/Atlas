'use client';

/* admin.html lines 67186-67191 (etc) + CSS 32076-32087: 24px icon-only square button with hover inversion (paper→ink)
   Open kind: navigates via router.push(href) — same target as parent row click (intentional redundant affordance)
   Archive kind: fires toast (no archive route) */

import { useRouter } from 'next/navigation';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';

type NfcQuickKind = 'open' | 'archive';

interface NfcQuickBtnProps {
  kind: NfcQuickKind;
  ariaLabel: string;
  href?: string; // required for kind="open"
  archiveToastLabel?: string; // required for kind="archive"
}

export function NfcQuickBtn({
  kind,
  ariaLabel,
  href,
  archiveToastLabel,
}: NfcQuickBtnProps) {
  const router = useRouter();
  const { showAction } = useAdminActionToast();

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (kind === 'open' && href) {
      router.push(href);
    } else if (kind === 'archive') {
      showAction(archiveToastLabel ?? 'Notification archived');
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
        }
      }}
      aria-label={ariaLabel}
      className="inline-grid place-items-center w-[24px] h-[24px] border border-[var(--line)] bg-[var(--paper)] rounded-[4px] text-[var(--ink-soft)] cursor-pointer transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
    >
      {kind === 'open' ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
        </svg>
      )}
    </button>
  );
}
