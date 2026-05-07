'use client';

import { useRef, useEffect, useState } from 'react';
import { TOPBAR } from '@/lib/mock-data/admin/topbar-data';
import {
  HamburgerIcon,
  SearchIcon,
  HelpIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  SettingsIcon,
  KeyboardIcon,
  LogoutIcon,
} from '@/components/ui/icons';

export function AdminTopbar({ onHamburgerClick }: { onHamburgerClick?: () => void }) {
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };

    if (avatarDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [avatarDropdownOpen]);

  return (
    <div className="dash-topbar sticky top-0 z-40 bg-[rgba(243,238,227,0.92)] backdrop-blur-[12px] border-b border-[var(--color-line)] px-7 py-[11px] flex items-center gap-4">
      {/* Left: Hamburger + Role Pill */}
      <div className="flex items-center gap-[14px] flex-shrink-0">
        <button
          onClick={onHamburgerClick}
          className="hidden max-[880px]:inline-flex w-9 h-9 items-center justify-center rounded-[6px] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
          aria-label="Open navigation"
        >
          <HamburgerIcon className="w-5 h-5" />
        </button>

        <span className="inline-flex items-center gap-2 px-3 py-[5px] pl-[10px] bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full font-mono text-[10.5px] uppercase tracking-widest font-semibold">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime)] flex-shrink-0"
            style={{ animation: 'pulse-soft 2s infinite' }}
            aria-hidden="true"
          />
          {TOPBAR.role.label}
        </span>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-[480px] relative hidden md:block">
        <SearchIcon className="absolute left-[13px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[var(--color-ink-mute)] pointer-events-none" />
        <input
          type="text"
          className="w-full py-[9px] px-[14px] pl-9 text-[13.5px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] placeholder:opacity-70 focus:outline-none focus:border-[var(--color-ink)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(14,14,12,0.06)] transition-all"
          placeholder={TOPBAR.search.placeholder}
          aria-label="Global admin search"
        />
        <span className="absolute right-[14px] top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--color-ink-mute)] bg-[var(--color-cream)] px-1.5 py-0.5 rounded border border-[var(--color-line)] pointer-events-none">
          {TOPBAR.search.kbd}
        </span>
      </div>

      {/* Right: Help + Notifications + Avatar */}
      <div className="flex items-center gap-1 flex-shrink-0 relative">
        {/* Help Icon */}
        <a
          href="#"
          className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
          aria-label="Help and documentation"
          title="Help"
        >
          <HelpIcon className="w-[18px] h-[18px]" />
        </a>

        {/* Notifications Bell */}
        <button
          className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
          aria-label={`Notifications, ${TOPBAR.notifications.badge} unread`}
          title="Notifications"
        >
          <BellIcon className="w-[18px] h-[18px]" />
          <span className="absolute top-[6px] right-[6px] min-w-4 h-4 px-1 bg-[var(--color-danger)] text-white rounded-full text-[9.5px] font-bold font-mono grid place-items-center border-2 border-[var(--color-cream)]">
            {TOPBAR.notifications.badge}
          </span>
        </button>

        {/* Avatar Button + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
            className="inline-flex items-center gap-2 px-[10px] py-1 pl-1 rounded-full hover:bg-[var(--color-cream-deep)] transition-colors ml-1"
            aria-label="Open account menu"
            aria-haspopup="true"
            aria-expanded={avatarDropdownOpen}
          >
            <span
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 text-[var(--color-paper)] font-display text-[12.5px] font-medium"
              style={{ background: 'linear-gradient(135deg, #D9A77F, #8B5A3C)' }}
            >
              {TOPBAR.avatar.initials}
            </span>
            <ChevronDownIcon className="w-3 h-3 text-[var(--color-ink-mute)] hidden md:block" />
          </button>

          {/* Avatar Dropdown */}
          {avatarDropdownOpen && (
            <div
              className="absolute top-[calc(100%_+_6px)] right-0 w-80 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] shadow-lg z-60 opacity-100 pointer-events-auto transform translate-y-0 transition-all"
              role="menu"
              aria-label="Account menu"
            >
              {/* Header */}
              <div className="px-[18px] py-[14px] border-b border-[var(--color-line-soft)]">
                <div className="text-[14.5px] font-semibold text-[var(--color-ink)] leading-tight">
                  {TOPBAR.avatar.fullName}
                </div>
                <div className="inline-flex items-center gap-1 mt-1.5 font-mono text-[9.5px] uppercase tracking-widest text-[var(--color-ink-soft)] font-semibold px-[7px] py-0.5 pl-1.5 bg-[var(--color-cream-deep)] rounded-sm">
                  <span
                    className="w-1 h-1 rounded-full bg-[var(--color-ink)]"
                    aria-hidden="true"
                  />
                  {TOPBAR.avatar.role}
                </div>
                <div className="text-[12.5px] text-[var(--color-ink-mute)] mt-2 font-mono tracking-tight">
                  {TOPBAR.avatar.email}
                </div>
              </div>

              {/* Section 1: Profile, Permissions, Settings */}
              <div className="px-1.5 py-1.5 flex flex-col gap-0.5">
                {[TOPBAR.dropdownItems[0], TOPBAR.dropdownItems[1], TOPBAR.dropdownItems[2]].map(
                  (item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-[9px] rounded-sm text-[13.5px] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
                    >
                      {item.id === 'profile' && (
                        <UserIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-ink-mute)]" />
                      )}
                      {item.id === 'permissions' && (
                        <svg
                          className="w-4 h-4 flex-shrink-0 text-[var(--color-ink-mute)]"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                      )}
                      {item.id === 'settings' && (
                        <SettingsIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-ink-mute)]" />
                      )}
                      {item.label}
                    </a>
                  )
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--color-line-soft)] mx-0" />

              {/* Section 2: Help, Shortcuts */}
              <div className="px-1.5 py-1.5 flex flex-col gap-0.5">
                {[TOPBAR.dropdownItems[3], TOPBAR.dropdownItems[4]].map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-[9px] rounded-sm text-[13.5px] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {item.id === 'help' && (
                      <HelpIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-ink-mute)]" />
                    )}
                    {item.id === 'shortcuts' && (
                      <KeyboardIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-ink-mute)]" />
                    )}
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--color-line-soft)] mx-0" />

              {/* Section 3: Sign Out */}
              <div className="px-1.5 py-1.5">
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-[9px] rounded-sm text-[13.5px] text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] transition-colors"
                >
                  <LogoutIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-danger)]" />
                  {TOPBAR.dropdownItems[5].label}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
