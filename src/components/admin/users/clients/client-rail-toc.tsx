'use client';

import React, { useState, useEffect } from 'react';
import type { ClientQuickFacts } from '@/lib/mock-data/admin/client-profiles-data';
import { cn } from '@/lib/utils/cn';

type TocKey = keyof ClientQuickFacts['tocMeta'];

interface ClientRailTocProps {
  tocMeta?: ClientQuickFacts['tocMeta'];
}

export function ClientRailToc({ tocMeta }: ClientRailTocProps) {
  const [activeKey, setActiveKey] = useState<TocKey>('identity');

  // Scroll-spy: IntersectionObserver targets all 8 cl-section-* elements
  // (mirrors candidate-rail-toc.tsx pattern, swapped cd-section- → cl-section-)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id^="cl-section-"]');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by position from top
          const sorted = visibleEntries.sort((a, b) => {
            return (
              (a.target as HTMLElement).getBoundingClientRect().top -
              (b.target as HTMLElement).getBoundingClientRect().top
            );
          });

          const topElement = sorted[0]?.target;
          if (topElement) {
            const key = topElement.id.replace('cl-section-', '') as TocKey;
            setActiveKey(key);
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // 8 sections per admin.html lines 18144–18166
  const sections: { num: string; key: TocKey; label: string }[] = [
    { num: '01', key: 'identity', label: 'Identity' },
    { num: '02', key: 'onboarding', label: 'Onboarding' },
    { num: '03', key: 'profile', label: 'Profile' },
    { num: '04', key: 'history', label: 'Hiring history' },
    { num: '05', key: 'financial', label: 'Financial' },
    { num: '06', key: 'communications', label: 'Communications' },
    { num: '07', key: 'signals', label: 'T&S signals' },
    { num: '08', key: 'audit', label: 'Audit log' },
  ];

  const handleTocClick = (key: TocKey, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(`cl-section-${key}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveKey(key);
    }
  };

  // admin.html lines 5541-5543: toc-meta variant colors
  const getMetaColor = (variant: 'ok' | 'warn' | 'danger' | 'neutral') => {
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
  };

  return (
    // admin.html line 18141: <nav class="cd-toc">
    <nav
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] overflow-hidden"
      aria-label="On this page"
    >
      {/* admin.html line 18142: <h4>On this page</h4> */}
      <h4 className="px-[16px] pb-[10px] font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold border-b border-dashed border-[var(--line-soft)] mb-[6px]">
        On this page
      </h4>
      {/* admin.html line 18143: <ul class="cd-toc-list"> */}
      <ul className="list-none p-0 m-0">
        {sections.map((section) => {
          const isActive = activeKey === section.key;
          const meta = tocMeta?.[section.key];

          return (
            <li key={section.key}>
              {/* admin.html line 18144: <a class="cd-toc-item ..."> */}
              <a
                href={`#cl-section-${section.key}`}
                onClick={(e) => handleTocClick(section.key, e)}
                className={cn(
                  'grid grid-cols-[22px_minmax(0,1fr)_auto] gap-[8px] items-center',
                  'px-[16px] py-[7px] text-[12.5px] no-underline cursor-pointer',
                  'transition-[background-color,color] duration-[120ms] ease border-l-[2px]',
                  isActive
                    ? 'bg-[var(--cream-deep)] text-[var(--ink)] border-l-[var(--ink)] font-semibold'
                    : 'text-[var(--ink-soft)] border-l-transparent hover:bg-[#FCF9F1] hover:text-[var(--ink)]'
                )}
              >
                {/* admin.html line 18145: <span class="toc-num"> */}
                <span
                  className={cn(
                    'font-mono text-[10px] tracking-[0.06em] font-medium',
                    isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]'
                  )}
                >
                  {section.num}
                </span>
                {/* admin.html line 18145 inner: <span class="toc-label"> */}
                <span className="truncate">{section.label}</span>
                {/* admin.html line 18145 inner: <span class="toc-meta ..."> */}
                {meta && (
                  <span
                    className={cn(
                      'font-mono text-[10px] tracking-[0.02em] whitespace-nowrap',
                      getMetaColor(meta.variant)
                    )}
                  >
                    {meta.label}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
