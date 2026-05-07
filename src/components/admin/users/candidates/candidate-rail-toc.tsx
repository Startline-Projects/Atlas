'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

export function CandidateRailToc() {
  const [activeKey, setActiveKey] = useState('identity');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id^="cd-section-"]');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by position from top
          const sorted = visibleEntries.sort((a, b) => {
            return (a.target as HTMLElement).getBoundingClientRect().top -
              (b.target as HTMLElement).getBoundingClientRect().top;
          });

          const topElement = sorted[0]?.target;
          if (topElement) {
            const key = topElement.id.replace('cd-section-', '');
            setActiveKey(key);
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sections = [
    { num: '01', key: 'identity', label: 'Identity', meta: '✓', metaVariant: 'ok' as const },
    { num: '02', key: 'pipeline', label: 'Pipeline', meta: '10 / 10', metaVariant: 'ok' as const },
    { num: '03', key: 'profile', label: 'Profile', meta: 'live', metaVariant: 'plain' as const },
    { num: '04', key: 'engagements', label: 'Engagements', meta: '3 active', metaVariant: 'plain' as const },
    { num: '05', key: 'financial', label: 'Financial', meta: '$48.2K', metaVariant: 'plain' as const },
    { num: '06', key: 'communications', label: 'Communications', meta: '241', metaVariant: 'plain' as const },
    { num: '07', key: 'audit', label: 'Audit log', meta: '52', metaVariant: 'plain' as const },
    { num: '08', key: 'signals', label: 'T&S signals', meta: '1 flag', metaVariant: 'warn' as const },
    { num: '09', key: 'privacy', label: 'Privacy', meta: 'clear', metaVariant: 'ok' as const },
  ];

  const handleTocClick = (key: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(`cd-section-${key}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveKey(key);
    }
  };

  return (
    <nav
      className="bg-[var(--paper)] border border-[var(--line)]
                 rounded-[var(--r-md)] p-[14px_0] overflow-hidden"
      aria-label="On this page"
    >
      <h4 className="px-[16px] pb-[10px] font-mono text-[10px] tracking-[0.16em]
                     uppercase text-[var(--ink-mute)] font-semibold
                     border-b border-dashed border-[var(--line-soft)] mb-[6px]">
        On this page
      </h4>
      <ul className="list-none p-0 m-0">
        {sections.map((section) => {
          const isActive = activeKey === section.key;

          return (
            <li key={section.key}>
              <a
                href={`#cd-section-${section.key}`}
                onClick={(e) => handleTocClick(section.key, e)}
                className={cn(
                  'grid grid-cols-[22px_minmax(0,1fr)_auto] gap-[8px] items-center',
                  'p-[7px_16px] text-[12.5px] no-underline cursor-pointer',
                  'transition-all duration-[120ms] ease border-l-[2px]',
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
                  {section.num}
                </span>
                <span className="truncate">
                  {section.label}
                </span>
                <span
                  className={cn(
                    'font-mono text-[10px] tracking-[0.02em] whitespace-nowrap',
                    section.metaVariant === 'ok' && 'text-[var(--success)]',
                    section.metaVariant === 'warn' && 'text-[var(--amber)]',
                    section.metaVariant === 'plain' && 'text-[var(--ink-mute)]'
                  )}
                >
                  {section.meta}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
