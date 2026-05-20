'use client';

/* admin.html lines 67642-67982 + CSS 32311-32450: single result card
   3-col grid [36px_1fr_auto] · canonical modifier (super-tinted) · router.push on click
   Avatar: initials (colored gradient) for users / icon SVG for non-user entities
   Title with inline <mark> + super-purple gsr-id · meta with <strong>+<mark> · crumb · relevance + status side */

import { useRouter } from 'next/navigation';
import type {
  GsResult,
  GsAvatarIconKey,
} from '@/lib/mock-data/admin/search-results-data';
import { GsStatusPill } from './gs-status-pill';

interface GsResultProps {
  result: GsResult;
}

function renderAvatarIcon(key: GsAvatarIconKey) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (key) {
    case 'triangle':
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>;
    case 'ban':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>;
    case 'bar-chart':
      return <svg {...common}><polyline points="4 4 4 20 20 20" /><polyline points="4 12 12 4 16 8 20 4" /></svg>;
    case 'lock':
      return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'clipboard':
      return <svg {...common}><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>;
    case 'speech':
      return <svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case 'bell':
      return <svg {...common}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>;
    default:
      return null;
  }
}

const MARK_TITLE =
  '[&_mark]:bg-[rgba(232,118,58,0.22)] [&_mark]:text-[var(--ink)] [&_mark]:py-[1px] [&_mark]:px-[2px] [&_mark]:rounded-[2px] [&_mark]:font-bold';
const MARK_META =
  '[&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_mark]:bg-[rgba(232,118,58,0.18)] [&_mark]:text-[var(--ink)] [&_mark]:py-[1px] [&_mark]:px-[2px] [&_mark]:rounded-[2px] [&_mark]:font-bold';

export function GsResult({ result }: GsResultProps) {
  const router = useRouter();
  const navigate = () => router.push(result.href);

  const cardClasses = result.isCanonical
    ? 'bg-[rgba(110,63,224,0.025)] border-[rgba(110,63,224,0.25)]'
    : 'bg-[var(--paper)] border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--paper-deep)]';

  const relevanceClasses = result.isCanonical
    ? 'bg-[var(--super)] text-[var(--paper)]'
    : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      aria-label={`Open ${result.idLabel ?? result.title}`}
      className={`relative grid grid-cols-[36px_minmax(0,1fr)_auto] gap-[12px] items-start py-[12px] px-[16px] border rounded-[var(--r-md)] mb-[8px] last:mb-0 cursor-pointer transition-colors ${cardClasses}`}
    >
      {/* Avatar */}
      {result.avatar.kind === 'initials' ? (
        <div
          className="w-[36px] h-[36px] rounded-full grid place-items-center flex-shrink-0 font-display text-[13px] font-bold text-[var(--paper)] tracking-[-0.01em]"
          style={{ background: result.avatar.gradient }}
        >
          {result.avatar.initials}
        </div>
      ) : (
        <div className="w-[36px] h-[36px] rounded-full bg-[var(--paper-deep)] border border-[var(--line)] grid place-items-center flex-shrink-0 [&_svg]:w-[16px] [&_svg]:h-[16px] text-[var(--ink-soft)]">
          {result.avatar.iconKey && renderAvatarIcon(result.avatar.iconKey)}
        </div>
      )}

      {/* Text */}
      <div className="min-w-0">
        <div className={`text-[14px] font-bold text-[var(--ink)] tracking-[-0.005em] leading-[1.3] flex items-center gap-[6px] flex-wrap ${MARK_TITLE}`}>
          <span dangerouslySetInnerHTML={{ __html: result.title }} />
          {result.idLabel && (
            <span className="font-mono text-[11px] font-bold text-[var(--super)] tracking-[0.02em]">
              {result.idLabel}
            </span>
          )}
        </div>
        <div
          className={`font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] mt-[4px] ${MARK_META}`}
          dangerouslySetInnerHTML={{ __html: result.metaHtml }}
        />
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[6px] font-semibold uppercase">
          {result.crumb.map((step, idx) => (
            <span key={idx}>
              {idx > 0 && <span className="mx-[5px] text-[var(--line-strong)]">›</span>}
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Side */}
      <div className="flex flex-col items-end gap-[6px] flex-shrink-0">
        <span className={`font-mono text-[9.5px] font-bold tracking-[0.04em] py-[2px] px-[7px] rounded-full ${relevanceClasses}`}>
          {result.relevance}
        </span>
        <GsStatusPill status={result.status} label={result.statusLabel} />
      </div>
    </div>
  );
}
