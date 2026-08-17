/**
 * Phase 16a — NEW PRIMITIVE: IncidentTypeBadge
 *
 * admin.html CSS: .si-type (L16681-16706)
 * admin.html markup: L40437-40632 (used per-row)
 *
 * 7 color variants (breach/unauthorized/malware/login/phishing/ddos/vendor)
 * + 8 SVG icon paths (above 7 + 'people' override for SI-0006).
 * Base: inline-flex gap-6 py-3 px-9 mono 10px 600 0.04em r-4 bg paper-deep border line-soft color ink-soft.
 */
import type { IncidentTypeKey, IncidentTypeIconKey } from '@/lib/mock-data/admin/incidents-data';

const VARIANT_CLASSES: Record<IncidentTypeKey, string> = {
  breach:       'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
  unauthorized: 'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)]',
  malware:      'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
  login:        'text-[var(--ink-soft)] border-[var(--line-soft)] bg-[var(--paper-deep)]',
  phishing:     'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)]',
  ddos:         'text-[var(--super)] border-[rgba(110,63,224,0.25)] bg-[rgba(110,63,224,0.05)]',
  vendor:       'text-[var(--ink-mute)] border-[var(--line-soft)] bg-[var(--paper-deep)]',
};

function TypeIcon({ iconKey }: { iconKey: IncidentTypeIconKey }) {
  const cls = 'w-[11px] h-[11px] flex-shrink-0';
  switch (iconKey) {
    case 'breach':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>);
    case 'unauthorized':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3-4-3-9-3-9 1.34-9 3z"/></svg>);
    case 'malware':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="0.5"/></svg>);
    case 'login':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
    case 'phishing':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
    case 'ddos':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>);
    case 'vendor':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
    case 'people':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>);
  }
}

interface IncidentTypeBadgeProps {
  type: IncidentTypeKey;
  iconKey?: IncidentTypeIconKey;
  label: string;
}

export function IncidentTypeBadge({ type, iconKey, label }: IncidentTypeBadgeProps) {
  const resolvedIcon: IncidentTypeIconKey = iconKey ?? type;
  return (
    <span
      className={`inline-flex items-center gap-[6px] py-[3px] px-[9px] font-mono text-[10px] font-semibold tracking-[0.04em] rounded-[4px] border ${VARIANT_CLASSES[type]}`}
    >
      <TypeIcon iconKey={resolvedIcon} />
      {label}
    </span>
  );
}
