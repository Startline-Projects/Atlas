'use client';

import { Fragment, useEffect, useState } from 'react';
import type {
  ManagerProfile,
  ManagerTocItem,
  ManagerQuickFact,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerRailProps {
  rail: NonNullable<ManagerProfile['rail']>;
}

// admin.html lines 5541-5543 — toc-meta variants
function tocMetaClass(variant: ManagerTocItem['metaVariant']): string {
  switch (variant) {
    case 'ok':
      return 'text-[var(--success)]';
    case 'warn':
      return 'text-[var(--amber)]';
    case 'danger':
      return 'text-[var(--danger)]';
    default:
      return 'text-[var(--ink-mute)]';
  }
}

// Quick Facts dd inline color — extended with 'super' variant for Manager-tier permission tier
function ddInlineStyle(fact: ManagerQuickFact): React.CSSProperties | undefined {
  if (!fact.valueVariant) return undefined;
  const color =
    fact.valueVariant === 'success' ? 'var(--success)'
    : fact.valueVariant === 'warn'  ? 'var(--amber)'
    : fact.valueVariant === 'super' ? 'var(--super)'
    :                                 'var(--danger)';
  return fact.valueVariant === 'super' ? { color, fontWeight: 600 } : { color };
}

export function ManagerRail({ rail }: ManagerRailProps) {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === 'undefined') return rail.toc[0]?.sectionId ?? '';
    const hash = window.location.hash.replace(/^#/, '');
    const match = rail.toc.find((t) => t.sectionId === hash);
    return match?.sectionId ?? rail.toc[0]?.sectionId ?? '';
  });

  // Scroll-line tracker — Phase 7jk drift fix 2 pattern (replaces IntersectionObserver):
  //   (a) ACTIVATION_LINE 100px (80px sticky topbar + 20px breathing room) —
  //       active = section whose top is closest to but not below the line.
  //   (b) Page-bottom guard — at scrollY+innerHeight ≥ scrollHeight, force last section active.
  useEffect(() => {
    const sectionIds = rail.toc.map((t) => t.sectionId);
    const ACTIVATION_LINE = 100;
    let ticking = false;

    const updateActive = () => {
      ticking = false;

      // Page-bottom guard
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPos >= docHeight - 4) {
        const last = sectionIds[sectionIds.length - 1];
        if (last) setActiveId(last);
        return;
      }

      // Largest top <= ACTIVATION_LINE wins (closest to line from above)
      let candidate: { id: string; top: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= ACTIVATION_LINE) {
          if (!candidate || top > candidate.top) {
            candidate = { id, top };
          }
        }
      }

      if (candidate) {
        setActiveId(candidate.id);
      } else {
        // Page hasn't scrolled past first section yet
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

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rail.toc]);

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
    // admin.html line 20562: <aside class="cd-rail">
    <aside className="sticky top-[80px] flex flex-col gap-[16px] max-[1100px]:static max-[1100px]:order-[-1]">
      {/* admin.html line 20565: TOC nav */}
      <nav
        aria-label="On this page"
        className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-0 overflow-hidden"
      >
        <h4 className="px-[16px] pb-[10px] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold border-b border-dashed border-[var(--line-soft)] mb-[6px] m-0">
          On this page
        </h4>
        <ul className="list-none p-0 m-0">
          {rail.toc.map((item) => {
            const isActive = item.sectionId === activeId;
            return (
              <li key={item.sectionId}>
                <a
                  href={item.href}
                  data-mgr-toc={item.dataKey}
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
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px] tracking-[0.02em] whitespace-nowrap',
                      tocMetaClass(item.metaVariant)
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

      {/* admin.html line 20596: Quick Facts panel */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[16px]">
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px] pb-[8px] border-b border-dashed border-[var(--line-soft)] m-0">
          Quick facts
        </h4>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-y-[6px] gap-x-[12px]">
          {rail.quickFacts.map((fact, idx) => (
            <Fragment key={idx}>
              <dt className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] m-0">
                {fact.label}
              </dt>
              <dd
                className="m-0 font-mono text-[11.5px] text-[var(--ink)] tracking-[0.01em] font-medium"
                style={ddInlineStyle(fact)}
              >
                {fact.value}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </aside>
  );
}
