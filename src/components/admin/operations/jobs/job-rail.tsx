'use client';

import { Fragment, useEffect, useState } from 'react';
import type { JobProfile } from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobRailProps {
  job: JobProfile;
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

export function JobRail({ job }: JobRailProps) {
  const items: TocItem[] = [
    { num: '01', label: 'Description', meta: job.tocMetas.desc, ok: job.tocOkFlags.desc, sectionId: 'job-section-desc', dataKey: 'desc' },
    { num: '02', label: 'Match scores', meta: job.tocMetas.match, ok: job.tocOkFlags.match, sectionId: 'job-section-match', dataKey: 'match' },
    { num: '03', label: 'Other interest', meta: job.tocMetas.interest, ok: job.tocOkFlags.interest, sectionId: 'job-section-interest', dataKey: 'interest' },
    { num: '04', label: 'Intervention', meta: job.tocMetas.intervention, ok: job.tocOkFlags.intervention, sectionId: 'job-section-intervention', dataKey: 'intervention' },
    { num: '05', label: 'Outcome', meta: job.tocMetas.outcome, ok: job.tocOkFlags.outcome, sectionId: 'job-section-outcome', dataKey: 'outcome' },
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
      // Straddle algorithm: section whose top is above the line AND bottom is below it
      let candidate: { id: string; top: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= ACTIVATION_LINE && rect.bottom > ACTIVATION_LINE) {
          candidate = { id, top: rect.top };
        }
      }
      // Defensive fallback
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
  }, [job.id]);

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
                  data-job-toc={item.dataKey}
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
          {job.quickFacts.map((fact, idx) => (
            <Fragment key={idx}>
              <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] m-0">
                {fact.dt}
              </dt>
              <dd
                className="m-0 font-mono text-[11.5px] text-[var(--ink)] tracking-[0.01em] font-medium"
                style={fact.ddColor === 'success' ? { color: 'var(--success)' } : undefined}
              >
                {fact.dd}
                {fact.ddSubMono && (
                  <>
                    <br />
                    <span className="font-mono text-[10px] text-[var(--super)] font-semibold">
                      {fact.ddSubMono}
                    </span>
                  </>
                )}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </aside>
  );
}
