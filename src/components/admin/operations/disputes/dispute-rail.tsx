'use client';

import { Fragment, useEffect, useState } from 'react';
import type { DisputeProfile, DisputeQuickFact } from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';

interface DisputeRailProps {
  dispute: DisputeProfile;
}

interface TocItem {
  num: string;
  label: string;
  meta: string;
  ok: boolean;
  metaVariant?: 'warn';
  sectionId: string;
  dataKey: string;
}

function tocMetaClass(ok: boolean, variant?: 'warn'): string {
  if (variant === 'warn') return 'text-[var(--amber)]';
  return ok ? 'text-[var(--success)]' : 'text-[var(--ink-mute)]';
}

function ddColorClass(c?: DisputeQuickFact['ddColor']): string {
  switch (c) {
    case 'super': return 'text-[var(--super)]';
    case 'amber': return 'text-[var(--amber)]';
    case 'success': return 'text-[var(--success)]';
    default: return 'text-[var(--ink)]';
  }
}

export function DisputeRail({ dispute }: DisputeRailProps) {
  const items: TocItem[] = [
    {
      num: '01', label: 'Claim',
      meta: dispute.tocMetas.claim, ok: dispute.tocOkFlags.claim,
      ...(dispute.tocMetaVariants.claim && { metaVariant: dispute.tocMetaVariants.claim }),
      sectionId: 'disp-section-claim', dataKey: 'claim',
    },
    {
      num: '02', label: 'Response',
      meta: dispute.tocMetas.response, ok: dispute.tocOkFlags.response,
      ...(dispute.tocMetaVariants.response && { metaVariant: dispute.tocMetaVariants.response }),
      sectionId: 'disp-section-response', dataKey: 'response',
    },
    {
      num: '03', label: 'Investigation',
      meta: dispute.tocMetas.investigation, ok: dispute.tocOkFlags.investigation,
      ...(dispute.tocMetaVariants.investigation && { metaVariant: dispute.tocMetaVariants.investigation }),
      sectionId: 'disp-section-investigation', dataKey: 'investigation',
    },
    {
      num: '04', label: 'Decision',
      meta: dispute.tocMetas.decision, ok: dispute.tocOkFlags.decision,
      ...(dispute.tocMetaVariants.decision && { metaVariant: dispute.tocMetaVariants.decision }),
      sectionId: 'disp-section-decision', dataKey: 'decision',
    },
    {
      num: '05', label: 'Audit log',
      meta: dispute.tocMetas.audit, ok: dispute.tocOkFlags.audit,
      ...(dispute.tocMetaVariants.audit && { metaVariant: dispute.tocMetaVariants.audit }),
      sectionId: 'disp-section-audit', dataKey: 'audit',
    },
    {
      num: '06', label: 'Linked',
      meta: dispute.tocMetas.linked, ok: dispute.tocOkFlags.linked,
      ...(dispute.tocMetaVariants.linked && { metaVariant: dispute.tocMetaVariants.linked }),
      sectionId: 'disp-section-linked', dataKey: 'linked',
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
  }, [dispute.id]);

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

  return (
    <aside className="sticky top-[80px] flex flex-col gap-[16px] max-[1100px]:static max-[1100px]:order-[-1]">
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
                  data-disp-toc={item.dataKey}
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
                      tocMetaClass(item.ok, item.metaVariant)
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

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[16px]">
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px] pb-[8px] border-b border-dashed border-[var(--line-soft)] m-0">
          Quick facts
        </h4>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-y-[6px] gap-x-[12px]">
          {dispute.quickFacts.map((fact, idx) => (
            <Fragment key={idx}>
              <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] m-0">
                {fact.dt}
              </dt>
              <dd
                className={cn(
                  'm-0 font-mono text-[11.5px] tracking-[0.01em] font-medium',
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
