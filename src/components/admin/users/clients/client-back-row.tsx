import Link from 'next/link';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientBackRowProps {
  profile: ClientProfile;
}

export function ClientBackRow({ profile }: ClientBackRowProps) {
  return (
    // admin.html line 17098: <div class="cd-back-row">
    <div className="flex items-center gap-[14px] mb-[18px] flex-wrap">
      {/* admin.html line 17099: <button type="button" class="cd-back-link"> */}
      <Link
        href="/admin/users/clients"
        className="inline-flex items-center gap-[6px] text-[12.5px] text-[var(--ink-mute)] pt-[6px] pr-[10px] pb-[6px] pl-[6px] bg-transparent border-0 rounded-[var(--r-sm)] font-body transition-[background_color] transition-[color] duration-[150ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
      >
        {/* admin.html line 17100: <svg ...><line .../><polyline .../></svg> */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-[150ms] ease hover:-translate-x-[2px]"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {/* admin.html line 17101 */}
        Back to clients
      </Link>

      {/* admin.html line 17103: <div class="cd-breadcrumb"> */}
      <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase inline-flex items-center gap-[8px]">
        {/* admin.html line 17104 */}
        <span className="text-[var(--ink-soft)]">/admin</span>
        {/* admin.html line 17105 */}
        <span className="text-[var(--line-strong)]">·</span>
        {/* admin.html line 17106 */}
        <span className="text-[var(--ink-soft)]">users</span>
        {/* admin.html line 17107 */}
        <span className="text-[var(--line-strong)]">·</span>
        {/* admin.html line 17108 */}
        <span className="text-[var(--ink-soft)]">clients</span>
        {/* admin.html line 17109 */}
        <span className="text-[var(--line-strong)]">·</span>
        {/* admin.html line 17110 */}
        <span className="text-[var(--ink)] font-semibold">{profile.atlasId}</span>
      </div>
      {/* admin.html line 17111 */}
    </div>
  );
}
