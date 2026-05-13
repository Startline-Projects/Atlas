import type { SbNotificationTouch } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionNotificationTouchProps {
  touch: SbNotificationTouch;
}

function ChannelIcon({ channel }: { channel: SbNotificationTouch['channel'] }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (channel === 'email') {
    return (
      <svg {...common}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  if (channel === 'whatsapp') {
    return (
      <svg {...common}>
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    );
  }
  if (channel === 'in-app') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    );
  }
  // sms
  return (
    <svg {...common}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function SuspensionNotificationTouch({ touch }: SuspensionNotificationTouchProps) {
  const iconBox =
    touch.variant === 'success'
      ? 'bg-[var(--success-bg)] text-[var(--success)] border-[rgba(46,125,84,0.3)]'
      : touch.variant === 'warn'
        ? 'bg-[var(--amber-bg)] text-[var(--amber)] border-[rgba(232,118,58,0.3)]'
        : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)]';
  const statusColor = touch.variant === 'warn' ? 'text-[var(--amber)]' : 'text-[var(--success)]';

  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)_auto] gap-[12px] items-center p-[10px_12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)]">
      <div className={`w-[28px] h-[28px] rounded-[6px] border grid place-items-center flex-shrink-0 ${iconBox}`}>
        <ChannelIcon channel={touch.channel} />
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
          {touch.name}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4] mt-[2px]">
          {touch.detail}
        </div>
      </div>
      <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] font-semibold text-right">
        {touch.time}
        <span className={`block text-[9px] tracking-[0.06em] uppercase font-bold mt-[2px] ${statusColor}`}>
          {touch.status}
        </span>
      </div>
    </div>
  );
}
