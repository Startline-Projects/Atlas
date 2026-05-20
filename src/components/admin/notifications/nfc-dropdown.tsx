'use client';

/* admin.html bell-icon dropdown markup lines 34382-34455 + CSS 1939-2140
   Trigger: bell button click toggles open · click outside / Escape closes · item click navigates + closes
   Distinct from full-page nt-* widgets — uses simpler notif-* class family (icon urgent/today/week + categoryTag rows) */

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { NfcDropdownData, NfcDropdownIconVariant } from '@/lib/mock-data/admin/notifications-data';
import { BellIcon } from '@/components/ui/icons';

interface NfcDropdownProps {
  data: NfcDropdownData;
  badgeCount: number;
}

const iconVariantClasses: Record<NfcDropdownIconVariant, string> = {
  urgent: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  today: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  week: 'bg-[rgba(214,242,77,0.3)] text-[var(--ink)]',
};

function renderIcon(variant: NfcDropdownIconVariant) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (variant === 'urgent') {
    // octagon-alert
    return (
      <svg {...common}>
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  if (variant === 'today') {
    // triangle-alert
    return (
      <svg {...common}>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
      </svg>
    );
  }
  // week — activity-pulse
  return (
    <svg {...common}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function NfcDropdown({ data, badgeCount }: NfcDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { showAction } = useAdminActionToast();

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleMarkAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    showAction(`All ${badgeCount} notifications marked read`);
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications, ${badgeCount} unread`}
        aria-expanded={open}
        aria-haspopup="menu"
        title="Notifications"
        className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
      >
        <BellIcon className="w-[18px] h-[18px]" />
        <span className="absolute top-[6px] right-[6px] min-w-4 h-4 px-1 bg-[var(--color-danger)] text-white rounded-full text-[9.5px] font-bold font-mono grid place-items-center border-2 border-[var(--color-cream)]">
          {badgeCount}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Notifications dropdown"
          className="absolute top-full right-0 mt-[6px] w-[380px] max-w-[calc(100vw-32px)] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-lg z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between py-[14px] px-[18px] border-b border-b-[var(--line-soft)]">
            <h3 className="font-display text-[16px] font-medium text-[var(--ink)] m-0">
              {data.headerTitle}
              <span className="font-mono text-[11px] text-[var(--ink-mute)] font-medium tracking-[0.04em] ml-[6px]">
                {data.unreadCountText}
              </span>
            </h3>
            <button
              type="button"
              onClick={handleMarkAll}
              className="text-[11.5px] text-[var(--ink-soft)] font-mono tracking-[0.06em] uppercase bg-transparent border-0 py-[4px] px-[6px] rounded-[3px] cursor-pointer transition-colors hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
            >
              {data.markAllLabel}
            </button>
          </div>

          {/* List */}
          <ul className="list-none m-0 p-0 max-h-[380px] overflow-y-auto">
            {data.items.map((item, idx) => (
              <li
                key={idx}
                role="menuitem"
                tabIndex={0}
                onClick={() => navigate(item.href)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(item.href);
                  }
                }}
                className="relative flex items-start gap-[12px] py-[12px] px-[18px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--cream-deep)]"
              >
                {item.isUnread && (
                  <span
                    className="absolute left-[6px] top-[18px] w-[6px] h-[6px] rounded-full bg-[var(--lime-deep)]"
                    aria-hidden
                  />
                )}
                <div
                  className={`w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0 mt-[1px] ${iconVariantClasses[item.iconVariant]}`}
                  aria-hidden
                >
                  {renderIcon(item.iconVariant)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[var(--ink)] font-medium leading-[1.4] mb-[2px]">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-[6px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)]">
                    <span>{item.time}</span>
                    <span className="opacity-50">·</span>
                    <span>{item.categoryTag}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="py-[12px] px-[18px] border-t border-t-[var(--line-soft)] text-center">
            <button
              type="button"
              role="menuitem"
              onClick={() => navigate(data.footerHref)}
              className="text-[12.5px] text-[var(--ink-soft)] font-mono tracking-[0.04em] border-0 border-b border-b-dotted border-b-[var(--line-strong)] bg-transparent cursor-pointer transition-colors hover:text-[var(--ink)] hover:border-b-[var(--ink)]"
            >
              {data.footerLinkLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
