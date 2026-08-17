'use client';

import { Fragment, useEffect, useState } from 'react';
import type {
  ReviewProfile,
  ReviewTocMetaVariant,
  ReviewQuickFact,
  ReviewerSnapshotStat,
} from '@/lib/mock-data/admin/review-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ReviewRailProps {
  review: ReviewProfile;
}

interface TocItem {
  num: string;
  label: string;
  meta: string;
  variant: ReviewTocMetaVariant;
  sectionId: string;
  dataKey: string;
}

function tocMetaClass(v: ReviewTocMetaVariant): string {
  switch (v) {
    case 'success': return 'text-[var(--success)]';
    case 'warn': return 'text-[var(--amber)]';
    case 'danger': return 'text-[var(--danger)]';
    case 'default':
    default: return 'text-[var(--ink-mute)]';
  }
}

function ddColorClass(c: ReviewQuickFact['ddColor']): string {
  switch (c) {
    case 'super': return 'text-[var(--super)]';
    case 'amber': return 'text-[var(--amber)]';
    case 'success': return 'text-[var(--success)]';
    case 'danger': return 'text-[var(--danger)]';
    case 'mute-strike': return 'text-[var(--ink-mute)] line-through';
    default: return 'text-[var(--ink)]';
  }
}

function snapshotValueColor(c?: ReviewerSnapshotStat['valueColor']): string {
  switch (c) {
    case 'danger': return 'text-[var(--danger)]';
    case 'warn': return 'text-[var(--amber)]';
    case 'success': return 'text-[var(--success)]';
    default: return 'text-[var(--ink)]';
  }
}

export function ReviewRail({ review }: ReviewRailProps) {
  const items: TocItem[] = [
    {
      num: '01', label: 'Review',
      meta: review.tocMetas.content,
      variant: review.tocMetaVariants.content ?? 'default',
      sectionId: 'rev-section-content', dataKey: 'content',
    },
    {
      num: '02', label: 'Context',
      meta: review.tocMetas.context,
      variant: review.tocMetaVariants.context ?? 'default',
      sectionId: 'rev-section-context', dataKey: 'context',
    },
    {
      num: '03', label: 'Pattern',
      meta: review.tocMetas.pattern,
      variant: review.tocMetaVariants.pattern ?? 'default',
      sectionId: 'rev-section-pattern', dataKey: 'pattern',
    },
    {
      num: '04', label: 'Flags',
      meta: review.tocMetas.flags,
      variant: review.tocMetaVariants.flags ?? 'default',
      sectionId: 'rev-section-flags', dataKey: 'flags',
    },
    {
      num: '05', label: 'History',
      meta: review.tocMetas.moderation,
      variant: review.tocMetaVariants.moderation ?? 'default',
      sectionId: 'rev-section-moderation', dataKey: 'moderation',
    },
    {
      num: '06', label: 'Audit log',
      meta: review.tocMetas.audit,
      variant: review.tocMetaVariants.audit ?? 'default',
      sectionId: 'rev-section-audit', dataKey: 'audit',
    },
  ];

  const [activeId, setActiveId] = useState<string>(items[0]?.sectionId ?? '');

  useEffect(() => {
    const sectionIds = items.map((t) => t.sectionId);
    const ACTIVATION_LINE = 100;
    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPos >= docHeight - 4) {
        const last = sectionIds[sectionIds.length - 1];
        if (last) setActiveId(last);
        return;
      }
      let candidate: { id: string; top: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= ACTIVATION_LINE && rect.bottom > ACTIVATION_LINE) {
          candidate = { id, top: rect.top };
        }
      }
      if (!candidate) {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= ACTIVATION_LINE) {
            if (!candidate || top > candidate.top) candidate = { id, top };
          }
        }
      }
      if (candidate) {
        setActiveId(candidate.id);
      } else {
        const first = sectionIds[0];
        if (first) setActiveId(first);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      const match = sectionIds.find((s) => s === hash);
      if (match) setActiveId(match);
    }

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review.id]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(sectionId);
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    }
  };

  const snap = review.reviewerSnapshot;

  return (
    <aside className="sticky top-[80px] flex flex-col gap-[16px] max-[1100px]:static max-[1100px]:order-[-1]">
      {/* TOC */}
      <nav
        aria-label="On this page"
        className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-0 overflow-hidden"
      >
        <h4 className="px-[16px] pb-[10px] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold border-b border-dashed border-[var(--line-soft)] mb-[6px] m-0">
          On this page
        </h4>
        <ul className="list-none p-0 m-0">
          {items.map((item) => {
            const isActive = item.sectionId === activeId;
            return (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  data-rev-toc={item.dataKey}
                  onClick={(e) => handleTocClick(e, item.sectionId)}
                  className={cn(
                    'grid grid-cols-[22px_minmax(0,1fr)_auto] gap-[8px] items-center py-[7px] px-[16px] text-[12.5px] no-underline cursor-pointer transition-[background-color,color] duration-[120ms] ease border-l-2',
                    isActive
                      ? 'bg-[var(--cream-deep)] text-[var(--ink)] border-l-[var(--ink)] font-semibold'
                      : 'text-[var(--ink-soft)] border-l-transparent hover:bg-[#FCF9F1] hover:text-[var(--ink)]'
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[10px] tracking-[0.06em] font-medium',
                      isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]'
                    )}
                  >
                    {item.num}
                  </span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
                  <span
                    className={cn(
                      'font-mono text-[10px] tracking-[0.02em] whitespace-nowrap',
                      tocMetaClass(item.variant)
                    )}
                  >
                    {item.meta}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Reviewer snapshot panel — admin.html CSS L13978-14091 */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px] flex flex-col gap-[12px]">
        {/* h4 — L13987-96: pb-10 border-b-dashed line-soft, NO mb (gap handles spacing) */}
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold pb-[10px] border-b border-dashed border-[var(--line-soft)] m-0">
          Reviewer snapshot
        </h4>
        {/* byline — L13998-14002: flex items-center gap-10 (no mb — parent gap handles) */}
        <div className="flex items-center gap-[10px]">
          <span
            aria-hidden="true"
            className="w-[36px] h-[36px] rounded-full grid place-items-center font-display text-[12px] text-[var(--paper)] font-medium flex-shrink-0"
            style={{ background: snap.gradient }}
          >
            {snap.initials}
          </span>
          <div className="min-w-0">
            {/* rrp-name — L14015-20: 14px 600 ink -0.01em */}
            <div className="text-[14px] font-semibold text-[var(--ink)] tracking-[-0.01em]">{snap.name}</div>
            {snap.realLabel && (
              // rrp-real — L14021-28: mono 10px super 600 0.02em mt-2
              <div className="font-mono text-[10px] text-[var(--super)] font-semibold tracking-[0.02em] mt-[2px]">
                {snap.realLabel}
              </div>
            )}
          </div>
        </div>
        {/* rrp-meta — L14029-36: mono 10.5px ink-mute 0.02em leading-1.55 (NO bottom border — stat-row has top border instead) */}
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55]">
          {snap.metaLine}
        </div>
        {/* rrp-stat-row — L14037-43: grid grid-cols-2 gap-10 pt-10 border-TOP dashed line-soft */}
        <div className="grid grid-cols-2 gap-[10px] pt-[10px] border-t border-dashed border-[var(--line-soft)]">
          {snap.stats.map((stat, idx) => (
            // rrp-stat-cell — L14044-48: FLAT flex flex-col gap-2 (no bg, no padding, no rounded, no text-center)
            <div key={idx} className="flex flex-col gap-[2px]">
              {/* rrp-stat-label — L14049-56: mono 9px 0.14em uppercase ink-mute 600 */}
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                {stat.label}
              </div>
              {/* rrp-stat-value — L14057-65: font-display 17px 500 ink -0.01em line-height 1 tabular-nums */}
              <div
                className={cn(
                  'font-display text-[17px] font-medium tracking-[-0.01em] leading-[1] [font-variant-numeric:tabular-nums]',
                  snapshotValueColor(stat.valueColor)
                )}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        {/* rrp-action — L14068-91: BUTTON STYLED — border + paper-deep bg + ink/paper hover inversion */}
        <a
          href={snap.actionHref}
          data-rev-action="open-reviewer-detail"
          className="mt-[4px] inline-flex items-center justify-center gap-[6px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-[var(--ink-soft)] py-[7px] px-[10px] border border-[var(--line)] rounded-[5px] bg-[var(--paper-deep)] no-underline cursor-pointer transition-[background,color,border-color] duration-[120ms] ease hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]"
        >
          {snap.actionLabel}
        </a>
      </div>

      {/* Quick facts */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[16px]">
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px] pb-[8px] border-b border-dashed border-[var(--line-soft)] m-0">
          Quick facts
        </h4>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-y-[6px] gap-x-[12px]">
          {review.quickFacts.map((fact, idx) => (
            <Fragment key={idx}>
              <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] m-0">
                {fact.dt}
              </dt>
              <dd
                className={cn(
                  'm-0 font-mono text-[11.5px] tracking-[0.01em]',
                  fact.ddBold ? 'font-semibold' : 'font-medium',
                  ddColorClass(fact.ddColor)
                )}
              >
                {fact.dd}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </aside>
  );
}
