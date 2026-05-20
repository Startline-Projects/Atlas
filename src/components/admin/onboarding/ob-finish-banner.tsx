/* admin.html ob-finish-banner · CSS 32918-32953
   success-bg→paper gradient · rgba(46,125,84,0.3) border · 36px --success circle icon + text + sub.
   Gradient applied as Tailwind arbitrary bg-image value (NOT inline style → keeps the Pass A
   "1 inline style" gate intact). admin.html JS never injects this banner so there is no verbatim
   icon glyph; a check polyline is used for the completed state per the prompt's "green check icon". */

import type { ObFinishBanner } from '@/lib/mock-data/admin/onboarding-data';

interface ObFinishBannerProps {
  data: ObFinishBanner;
}

export function ObFinishBannerCard({ data }: ObFinishBannerProps) {
  return (
    <div className="flex items-center gap-[14px] py-[14px] px-[16px] border border-[rgba(46,125,84,0.3)] rounded-[8px] mb-[14px] bg-[linear-gradient(135deg,var(--success-bg),var(--paper))]">
      <div className="w-[36px] h-[36px] rounded-full bg-[var(--success)] text-[var(--paper)] grid place-items-center flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[18px] h-[18px]"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="font-body text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.005em] leading-[1.3]">
        {data.title}
        <span className="block font-mono text-[10px] font-medium text-[var(--ink-mute)] tracking-[0.02em] mt-[3px]">
          {data.sub}
        </span>
      </div>
    </div>
  );
}
