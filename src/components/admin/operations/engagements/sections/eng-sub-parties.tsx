import Link from 'next/link';
import type { EngagementProfile, EngagementPartiesParty } from '@/lib/mock-data/admin/engagement-profiles-data';

interface EngSubPartiesProps {
  engagement: EngagementProfile;
}

function PartyCard({ party }: { party: EngagementPartiesParty }) {
  return (
    // admin.html line 10253: .eng-linked-card — individual card with hover state
    <Link
      href={party.hrefPath}
      data-eng-action={party.role === 'Client' ? 'open-client' : 'open-candidate'}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px] grid grid-cols-[auto_1fr_auto] gap-[12px] items-center cursor-pointer transition-[background,border-color] duration-[120ms] ease no-underline text-inherit hover:bg-[#FCF9F1] hover:border-[var(--line-strong)] [&:hover_.lk-arrow]:text-[var(--ink)]"
    >
      <div
        aria-hidden="true"
        className="w-[42px] h-[42px] rounded-full grid place-items-center font-display text-[14px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
        style={{ background: party.avatarGradient }}
      >
        {party.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[2px]">
          {party.role} · {party.shortId}
        </div>
        <div className="text-[14px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
          {party.name}
          {party.realLegalEntity && (
            <span
              className="font-mono text-[10px] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[5px] rounded-[3px] font-semibold ml-[4px]"
              style={{ verticalAlign: '2px' }}
            >
              REAL: {party.realLegalEntity}
            </span>
          )}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
          {party.meta}
        </div>
      </div>
      <span aria-hidden="true" className="lk-arrow text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[120ms] ease">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}

export function EngSubParties({ engagement }: EngSubPartiesProps) {
  const { parties } = engagement;

  return (
    <section
      id="eng-section-parties"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            06 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Both parties
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          Click either to open full profile
        </span>
      </div>

      {/* admin.html line 10247: .eng-linked-grid — 2-col flat grid */}
      <div className="grid grid-cols-2 gap-[12px] max-[720px]:grid-cols-1">
        <PartyCard party={parties.client} />
        <PartyCard party={parties.candidate} />
      </div>
    </section>
  );
}
