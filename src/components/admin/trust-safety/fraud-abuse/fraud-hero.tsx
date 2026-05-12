/**
 * Phase 15a — Fraud alert hero section (with actions inside).
 *
 * admin.html CSS: .fr-hero + .fr-hero-stats + .fr-hero-actions (L15933-15972)
 * admin.html markup: L39557-39643
 *
 * Border-top 4px, padding 22px 26px, mb 22px.
 * hero-top: flex justify-between. Left = id-row + title + subtitle. Right = actions.
 * Stats: 4-col flat grid, gap-0, border-top line-soft, border-right dividers.
 * Subtitle: MONO 11.5px (NOT body 13.5px), with <a> cross-links.
 * Stat value 18px (NOT 22px), label 9px tracking 0.16em.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import type { FraudAlertProfile, FraudSeverityKey } from '@/lib/mock-data/admin/fraud-alerts-data';

const SEVERITY_TOP_BORDER: Record<FraudSeverityKey, string> = {
  critical: 'border-t-[var(--danger)]',
  high: 'border-t-[var(--amber)]',
  medium: 'border-t-[var(--lime-deep)]',
  low: 'border-t-[var(--ink-mute)]',
};

const SEVERITY_BADGE: Record<FraudSeverityKey, string> = {
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  high: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  medium: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  low: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const STATUS_PILL: Record<string, string> = {
  investigating: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  open: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  resolved: 'bg-[var(--success-bg)] text-[var(--success)]',
  dismissed: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

/** Value color classes — admin.html uses .hs-value.danger and .hs-value.warn */
function statValueColor(label: string): string {
  if (label === 'Confidence') return 'text-[var(--danger)]';
  if (label === 'Financial impact') return 'text-[var(--amber)]';
  return 'text-[var(--ink)]';
}

interface FraudHeroProps {
  alert: FraudAlertProfile;
}

export function FraudHero({ alert }: FraudHeroProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [moreOpen]);

  return (
    <div className={`bg-[var(--paper)] border border-[var(--line)] border-t-[4px] ${SEVERITY_TOP_BORDER[alert.severity]} rounded-[var(--r-md)] py-[22px] px-[26px] mb-[22px] relative overflow-hidden`}>
      {/* hero-top: flex with content left, actions right */}
      <div className="flex items-start justify-between gap-[18px] flex-wrap mb-[14px]">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {/* ID row */}
          <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
            <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
              {alert.atlasId}
            </span>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] ${SEVERITY_BADGE[alert.severity]}`}>
              {alert.severity === 'critical' && (
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-pulse" />
              )}
              {alert.severity}
            </span>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${STATUS_PILL[alert.status]}`}>
              {alert.statusLabel}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              Detected {alert.detected} · {alert.detectedAgo}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] leading-[1.2] m-0 mb-[6px] text-[var(--ink)]">
            {alert.title}
          </h1>

          {/* Subtitle — mono 11.5px */}
          <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
            {alert.subtitle}
          </div>
        </div>

        {/* Right: actions — fr-hero-actions */}
        <div className="inline-flex gap-[8px] flex-wrap items-start">
          {alert.actions.map((action) => (
            <button
              key={action.key}
              type="button"
              data-fraud-action={action.key}
              onClick={() => console.log('[fraud-action]', action.key)}
              className={`inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 ease [&>svg]:flex-shrink-0 ${
                action.variant === 'primary'
                  ? 'bg-[var(--paper)] text-[var(--amber)] border-[var(--amber)] [&>svg]:text-[var(--amber)] hover:bg-[var(--amber-bg)]'
                  : action.variant === 'danger'
                    ? 'bg-[var(--paper)] text-[var(--danger)] border-[var(--danger)] [&>svg]:text-[var(--danger)] hover:bg-[var(--danger-bg)]'
                    : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] [&>svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
              }`}
            >
              {action.label}
            </button>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((p) => !p)}
              className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap transition-all duration-150 ease hover:border-[var(--ink)] hover:text-[var(--ink)]"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
            >
              More
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-[4px] w-[220px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-[0_8px_24px_rgba(14,14,12,0.12)] z-20 py-[6px]" role="menu">
                <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold py-[6px] px-[14px]">Investigation</div>
                <button type="button" role="menuitem" onClick={() => { console.log('[fraud-more] reassign'); setMoreOpen(false); }} className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer">Reassign investigator</button>
                <button type="button" role="menuitem" onClick={() => { console.log('[fraud-more] escalate'); setMoreOpen(false); }} className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--amber)] hover:bg-[var(--cream)] transition-colors cursor-pointer">Escalate to Super Admin</button>
                <div className="h-[1px] bg-[var(--line-soft)] my-[4px]" aria-hidden="true" />
                <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold py-[6px] px-[14px]">External</div>
                <button type="button" role="menuitem" onClick={() => { console.log('[fraud-more] file-legal'); setMoreOpen(false); }} className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer">File legal report</button>
                <button type="button" role="menuitem" onClick={() => { console.log('[fraud-more] regulatory'); setMoreOpen(false); }} className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer">Document for regulatory</button>
                <div className="h-[1px] bg-[var(--line-soft)] my-[4px]" aria-hidden="true" />
                <button type="button" role="menuitem" onClick={() => { console.log('[fraud-more] dismiss'); setMoreOpen(false); }} className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer">Dismiss as false positive</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero stats — flat 4-col grid with border-right dividers */}
      <div className="grid grid-cols-4 gap-0 mt-[16px] pt-[14px] border-t border-[var(--line-soft)] max-[720px]:grid-cols-2">
        {alert.heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`pr-[16px] ${i < alert.heroStats.length - 1 ? 'border-r border-[var(--line-soft)]' : ''} ${i > 0 ? 'pl-[16px]' : ''}`}
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
              {stat.label}
            </div>
            <div className={`font-display text-[18px] font-medium tracking-[-0.01em] leading-[1.1] ${statValueColor(stat.label)}`}>
              {stat.value}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
