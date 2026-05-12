/**
 * Phase 16a — Incident detail hero.
 *
 * admin.html: L40671-40760
 *
 * Reuses fraud-hero chrome (4px severity top border, flat stats grid, actions in hero-top).
 * NEW: Type badge in id-row, 3-kind subtitle segments (text/strong/link), 5-item More menu
 * with 2 sections (Coordination / Lifecycle).
 */
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import type {
  IncidentProfile,
  IncidentSeverity,
  IncidentStatusKey,
  IncidentSubtitleSegment,
  IncidentValueColor,
  IncidentMoreItem,
  IncidentMoreIconKey,
  IncidentHeroAction,
  IncidentHeroIconKey,
} from '@/lib/mock-data/admin/incidents-data';
import { IncidentTypeBadge } from './incident-type-badge';

const SEVERITY_TOP_BORDER: Record<IncidentSeverity, string> = {
  critical: 'border-t-[var(--danger)]',
  high: 'border-t-[var(--amber)]',
  medium: 'border-t-[var(--lime-deep)]',
  low: 'border-t-[var(--ink-mute)]',
};

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  high: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  medium: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  low: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const STATUS_PILL: Record<IncidentStatusKey, string> = {
  new: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  investigating: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  mitigated: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  closed: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const VALUE_COLOR: Record<IncidentValueColor, string> = {
  danger: 'text-[var(--danger)]',
  amber: 'text-[var(--amber)]',
  success: 'text-[var(--success)]',
};

/* Hero action SVG dictionary */
function HeroActionIcon({ iconKey }: { iconKey: IncidentHeroIconKey }) {
  const cls = 'w-[13px] h-[13px] flex-shrink-0';
  switch (iconKey) {
    case 'refresh':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>);
    case 'envelope':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
    case 'shield':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
    case 'plus':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
    case 'download':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
  }
}

/* More menu icons */
function MoreIcon({ iconKey }: { iconKey: IncidentMoreIconKey }) {
  const cls = 'w-[13px] h-[13px] flex-shrink-0';
  switch (iconKey) {
    case 'clock':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
    case 'chat-people':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2"/></svg>);
    case 'file':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
    case 'check':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>);
    case 'circle-x':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9 9l6 6M15 9l-6 6"/></svg>);
  }
}

function SubtitleRenderer({ segments }: { segments: IncidentSubtitleSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'text') return <span key={i}>{seg.text}</span>;
        if (seg.kind === 'strong') return <strong key={i} className="text-[var(--ink)] font-bold">{seg.text}</strong>;
        return (
          <Link
            key={i}
            href={seg.href}
            className="text-[var(--ink-soft)] underline cursor-pointer font-semibold hover:text-[var(--ink)]"
          >
            {seg.text}
          </Link>
        );
      })}
    </>
  );
}

interface IncidentHeroProps {
  incident: IncidentProfile;
}

export function IncidentHero({ incident }: IncidentHeroProps) {
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

  const coordinationItems = incident.moreItems.filter((m) => m.section === 'coordination');
  const lifecycleItems = incident.moreItems.filter((m) => m.section === 'lifecycle');

  function actionButtonClass(action: IncidentHeroAction): string {
    const base = 'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 ease [&>svg]:flex-shrink-0';
    switch (action.variant) {
      case 'warn':
        return `${base} bg-[var(--paper)] text-[var(--amber)] border-[var(--amber)] [&>svg]:text-[var(--amber)] hover:bg-[var(--amber-bg)]`;
      case 'danger':
        return `${base} bg-[var(--paper)] text-[var(--danger)] border-[var(--danger)] [&>svg]:text-[var(--danger)] hover:bg-[var(--danger-bg)]`;
      case 'primary':
        return `${base} bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-black`;
      default:
        return `${base} bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] [&>svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)]`;
    }
  }

  return (
    <div className={`bg-[var(--paper)] border border-[var(--line)] border-t-[4px] ${SEVERITY_TOP_BORDER[incident.severity]} rounded-[var(--r-md)] py-[22px] px-[26px] mb-[22px] relative overflow-hidden`}>
      <div className="flex items-start justify-between gap-[18px] flex-wrap mb-[14px]">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {/* ID row */}
          <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
            <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
              {incident.atlasId}
            </span>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] ${SEVERITY_BADGE[incident.severity]}`}>
              {incident.severity === 'critical' && (
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-pulse" />
              )}
              {incident.severity}
            </span>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${STATUS_PILL[incident.status]}`}>
              {incident.statusLabel}
            </span>
            <IncidentTypeBadge type={incident.typeKey} {...(incident.typeIconKey ? { iconKey: incident.typeIconKey } : {})} label={incident.typeLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {incident.detectedFullUtc}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] leading-[1.2] m-0 mb-[6px] text-[var(--ink)]">
            {incident.title}
          </h1>

          {/* Subtitle */}
          <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
            <SubtitleRenderer segments={incident.subtitleSegments} />
          </div>
        </div>

        {/* Right: actions */}
        <div className="inline-flex gap-[8px] flex-wrap items-start">
          {incident.actions.map((action) => (
            <button
              key={action.key}
              type="button"
              data-si-action={action.key}
              onClick={() => console.log('[si-action]', action.key)}
              className={actionButtonClass(action)}
            >
              <HeroActionIcon iconKey={action.iconKey} />
              {action.label}
            </button>
          ))}

          {/* More dropdown */}
          {incident.moreItems.length > 0 && (
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
                <div className="absolute top-full right-0 mt-[4px] w-[230px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-[0_8px_24px_rgba(14,14,12,0.12)] z-20 py-[6px]" role="menu">
                  {coordinationItems.length > 0 && (
                    <>
                      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold py-[6px] px-[14px]">Coordination</div>
                      {coordinationItems.map((item: IncidentMoreItem) => (
                        <button
                          key={item.key}
                          type="button"
                          role="menuitem"
                          onClick={() => { console.log('[si-more]', item.key); setMoreOpen(false); }}
                          className="w-full flex items-center gap-[8px] text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                        >
                          <MoreIcon iconKey={item.iconKey} />
                          {item.label}
                        </button>
                      ))}
                    </>
                  )}
                  {coordinationItems.length > 0 && lifecycleItems.length > 0 && (
                    <div className="h-[1px] bg-[var(--line-soft)] my-[4px]" aria-hidden="true" />
                  )}
                  {lifecycleItems.length > 0 && (
                    <>
                      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold py-[6px] px-[14px]">Lifecycle</div>
                      {lifecycleItems.map((item: IncidentMoreItem) => (
                        <button
                          key={item.key}
                          type="button"
                          role="menuitem"
                          onClick={() => { console.log('[si-more]', item.key); setMoreOpen(false); }}
                          className="w-full flex items-center gap-[8px] text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                        >
                          <MoreIcon iconKey={item.iconKey} />
                          {item.label}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero stats — flat 4-col grid with border-right dividers */}
      <div className="grid grid-cols-4 gap-0 mt-[16px] pt-[14px] border-t border-[var(--line-soft)] max-[720px]:grid-cols-2">
        {incident.heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`pr-[16px] ${i < incident.heroStats.length - 1 ? 'border-r border-[var(--line-soft)]' : ''} ${i > 0 ? 'pl-[16px]' : ''}`}
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
              {stat.label}
            </div>
            <div className={`font-display text-[18px] font-medium tracking-[-0.01em] leading-[1.1] ${stat.valueColor ? VALUE_COLOR[stat.valueColor] : 'text-[var(--ink)]'}`}>
              {stat.value}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
              {stat.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
