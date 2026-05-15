'use client';

import { useEffect, useRef, useState } from 'react';
import type { SectionNavItem } from '@/lib/mock-data/admin/refunds-data';

interface RefundsSectionNavProps {
  sections: SectionNavItem[];
}

export function RefundsSectionNav({ sections }: RefundsSectionNavProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (section: SectionNavItem) => {
    setActive(section.id);
    const element = document.getElementById(section.id);
    if (element) {
      // Suppress observer for the duration of the programmatic scroll
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const offset = 128;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Smooth scroll typically completes in ~500ms. Add buffer = 900ms total.
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 900);
    }
  };

  /* Auto-update active chip as user scrolls. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // SUPPRESS during programmatic scroll
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const section = sections.find((s) => s.id === id);
            if (section) setActive(section.id);
          }
        });
      },
      {
        rootMargin: '-140px 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections]);

  return (
    <nav
      aria-label="Refunds page sections"
      className="flex gap-[6px] flex-wrap p-[10px_14px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] mb-[22px] sticky top-[60px] z-30 shadow-[0_2px_8px_rgba(14,14,12,0.04)]"
    >
      {sections.map((section, idx) => (
        <span key={section.id} className="inline-flex items-center">
          <button
            type="button"
            onClick={() => handleClick(section)}
            className={`font-mono text-[11px] font-semibold tracking-[0.04em] py-[5px] px-[12px] rounded-full cursor-pointer transition-all border-0 ${
              active === section.id
                ? 'bg-[var(--ink)] text-[var(--paper)]'
                : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
            }`}
          >
            {section.label}
          </button>
          {idx < sections.length - 1 && (
            <span className="text-[var(--line-strong)] font-mono text-[10px] py-[5px] px-[2px] select-none">·</span>
          )}
        </span>
      ))}
    </nav>
  );
}
