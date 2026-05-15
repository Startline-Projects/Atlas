import Link from 'next/link';
import type { DisputeProfile, LinkedCard } from '@/lib/mock-data/admin/dispute-profiles-data';

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--paper)' }} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LinkedCardView({ card }: { card: LinkedCard }) {
  const content = (
    <>
      {/* lk-avatar 42×42 */}
      <span
        aria-hidden="true"
        className="w-[42px] h-[42px] rounded-full grid place-items-center font-display text-[14px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
        style={{ background: card.avatarGradient }}
      >
        {card.avatarKind === 'icon' ? <FileIcon /> : card.initials}
      </span>
      {/* lk-info */}
      <div className="min-w-0">
        <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[2px]">
          {card.role}
        </div>
        <div className="text-[14px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
          {card.name}
          {card.realChip && (
            <span className="font-mono text-[10px] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[5px] rounded-[3px] font-semibold align-[2px] ml-[4px]">
              {card.realChip}
            </span>
          )}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
          {card.meta}
        </div>
      </div>
      {/* lk-arrow */}
      <span aria-hidden="true" className="text-[var(--ink-mute)] flex-shrink-0 group-hover:text-[var(--ink)] transition-colors duration-[120ms] ease">
        <ArrowIcon />
      </span>
    </>
  );

  const baseCls = 'group bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px] grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center cursor-pointer transition-[background,border-color] duration-[120ms] ease no-underline text-inherit hover:bg-[#FCF9F1] hover:border-[var(--line-strong)]';

  if (card.href.startsWith('/')) {
    return (
      <Link href={card.href} className={baseCls} data-disp-action={card.actionKey}>
        {content}
      </Link>
    );
  }
  return (
    <a href={card.href} className={baseCls} data-disp-action={card.actionKey}>
      {content}
    </a>
  );
}

export function DisputeSubLinked({ dispute }: { dispute: DisputeProfile }) {
  const linked = dispute.linkedContext;

  return (
    <section
      id="disp-section-linked"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">06 · 06</span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Linked context
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {linked.statusText}
        </span>
      </div>

      {/* admin.html lines 10247-51 — .eng-linked-grid 2-col → 1-col @720 */}
      <div className="grid grid-cols-2 gap-[12px] max-[720px]:grid-cols-1">
        {linked.cards.map((card, i) => (
          <LinkedCardView key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
