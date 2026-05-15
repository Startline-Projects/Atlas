'use client';

import { Fragment, useEffect, useState } from 'react';
import type { EngagementProfile } from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngagementRailProps {
  engagement: EngagementProfile;
}

interface TocItem {
  num: string;
  label: string;
  meta: string;
  ok: boolean;
  sectionId: string;
  dataKey: string;
}

function tocMetaClass(ok: boolean): string {
  return ok ? 'text-[var(--success)]' : 'text-[var(--ink-mute)]';
}

export function EngagementRail({ engagement }: EngagementRailProps) {
  const items: TocItem[] = [
    { num: '01', label: 'Contract', meta: engagement.tocMetas.contract, ok: engagement.tocOkFlags.contract, sectionId: 'eng-section-contract', dataKey: 'contract' },
    { num: '02', label: 'Time tracker', meta: engagement.tocMetas.tracker, ok: engagement.tocOkFlags.tracker, sectionId: 'eng-section-tracker', dataKey: 'tracker' },
    { num: '03', label: 'Payments', meta: engagement.tocMetas.payments, ok: engagement.tocOkFlags.payments, sectionId: 'eng-section-payments', dataKey: 'payments' },
    { num: '04', label: 'Communication', meta: engagement.tocMetas.comm, ok: engagement.tocOkFlags.comm, sectionId: 'eng-section-comm', dataKey: 'comm' },
    { num: '05', label: 'Disputes', meta: engagement.tocMetas.disputes, ok: engagement.tocOkFlags.disputes, sectionId: 'eng-section-disputes', dataKey: 'disputes' },
    { num: '06', label: 'Both parties', meta: engagement.tocMetas.parties, ok: engagement.tocOkFlags.parties, sectionId: 'eng-section-parties', dataKey: 'parties' },
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
      // Find the section that *straddles* the activation line — i.e., the section whose
      // top has crossed the line AND whose bottom is still below it. This guarantees the
      // active section is the one the user is actually reading, not a later compact section
      // (e.g. a short empty-state) that also has top below the line.
      let candidate: { id: string; top: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= ACTIVATION_LINE && rect.bottom > ACTIVATION_LINE) {
          candidate = { id, top: rect.top };
        }
      }
      // Defensive fallback: if no section straddles the line (rare edge case at exact boundary
      // or with tiny gaps), fall back to the last section whose top is above the line.
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

    // Honor URL hash on mount
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
  }, [engagement.id]);

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
                  data-eng-toc={item.dataKey}
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
                      tocMetaClass(item.ok)
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
          {engagement.quickFacts.map((fact, idx) => (
            <Fragment key={idx}>
              <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] m-0">
                {fact.dt}
              </dt>
              <dd
                className="m-0 font-mono text-[11.5px] text-[var(--ink)] tracking-[0.01em] font-medium"
                style={fact.ddColor === 'success' ? { color: 'var(--success)' } : undefined}
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
