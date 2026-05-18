/* Profile hero — large 64px avatar gradient + identity + grade badge.
   Background tints based on grade (success/amber/neutral) or rowVariant needs-support override. */

import { PfGradeBadge } from '../pf-grade-badge';
import type { PfProfileHero } from '@/lib/mock-data/admin/performance-data';

interface PfProfileHeroProps {
  hero: PfProfileHero;
}

export function PfProfileHeroComponent({ hero }: PfProfileHeroProps) {
  const variant = hero.rowVariant === 'needs-support' ? 'amber' : hero.gradeVariant;

  const wrapperClasses =
    variant === 'success'
      ? 'border-[var(--success)] bg-gradient-to-r from-[var(--success-bg)] to-[var(--paper)]'
      : variant === 'amber'
      ? 'border-[var(--amber)] bg-gradient-to-r from-[var(--amber-bg)] to-[var(--paper)]'
      : 'border-[var(--line)] bg-[var(--paper)]';

  const gradeEyebrowColor =
    variant === 'success'
      ? 'text-[var(--success)]'
      : variant === 'amber'
      ? 'text-[var(--amber)]'
      : 'text-[var(--ink-mute)]';

  return (
    <div className={`border rounded-[var(--r-md)] mb-[18px] py-[22px] px-[26px] flex items-center gap-[18px] flex-wrap ${wrapperClasses}`}>
      {/* Avatar */}
      <div
        className="w-[64px] h-[64px] rounded-full grid place-items-center font-display text-[24px] font-medium text-[var(--paper)] tracking-[-0.02em] flex-shrink-0"
        style={{ background: hero.avatar.gradient }}
      >
        {hero.avatar.initials}
      </div>

      {/* Identity */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
          {hero.eyebrow}
        </div>
        <h1 className="font-display text-[24px] font-medium tracking-[-0.02em] text-[var(--ink)] m-0 mb-[6px] leading-[1.15]">
          {hero.name}
        </h1>
        <div
          className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: hero.metaHtml }}
        />
      </div>

      {/* Grade */}
      <div className="text-center flex-shrink-0">
        <PfGradeBadge grade={hero.grade} />
        <div className={`font-mono text-[9px] tracking-[0.12em] uppercase font-bold mt-[6px] ${gradeEyebrowColor}`}>
          GRADE · Q2
        </div>
      </div>
    </div>
  );
}
