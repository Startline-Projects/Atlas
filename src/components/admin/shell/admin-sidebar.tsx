'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_NAV } from '@/lib/mock-data/admin/sidebar-nav-data';
import { ChevronDownIcon, SidebarSearchIcon, SidebarCloseIcon, MoreDotsIcon } from '@/components/ui/icons';

export function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState('');
  const [hash, setHash] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(['platform', 'internal'])
  );

  // Track hash changes for Users sub-tabs
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Toggle group collapse
  const toggleGroup = (groupId: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupId)) {
      newCollapsed.delete(groupId);
    } else {
      newCollapsed.add(groupId);
    }
    setCollapsedGroups(newCollapsed);
  };

  // Active state detection — handles both regular routes and hash-based sub-tabs
  const isActive = (itemPathname: string | null) => {
    if (itemPathname === null) return false;

    // Check if pathname contains a hash fragment (e.g., /admin/users#clients)
    const hashIndex = itemPathname.indexOf('#');
    if (hashIndex !== -1) {
      // Extract path and fragment
      const itemPath = itemPathname.substring(0, hashIndex);
      const itemFragment = itemPathname.substring(hashIndex);
      // Match when path matches AND hash matches (or hash is empty and item is #candidates)
      if (pathname === itemPath) {
        return hash === itemFragment || (hash === '' && itemFragment === '#candidates');
      }
      return false;
    }

    // Regular route matching (no hash)
    // Special case for Candidates: also match /admin/users/candidates/[id] detail routes
    if (itemPathname === '/admin/users/candidates') {
      return pathname === '/admin/users/candidates'
          || pathname.startsWith('/admin/users/candidates/')
          || (pathname === '/admin/users' && hash === '#candidates');
    }

    // Special case for Clients: also match /admin/users/clients/[id] detail routes
    if (itemPathname === '/admin/users/clients') {
      return pathname === '/admin/users/clients'
          || pathname.startsWith('/admin/users/clients/');
    }

    // Special case for Specialists: also match /admin/users/specialists/[id] detail routes
    if (itemPathname === '/admin/users/specialists') {
      return pathname === '/admin/users/specialists'
          || pathname.startsWith('/admin/users/specialists/');
    }

    // Special case for Managers: also match /admin/users/managers/[id] detail routes
    if (itemPathname === '/admin/users/managers') {
      return pathname === '/admin/users/managers'
          || pathname.startsWith('/admin/users/managers/');
    }

    // Special case for Admins: master-detail at /admin/users/admins (no descendant routes — selectedAdminId is local state)
    if (itemPathname === '/admin/users/admins') {
      return pathname === '/admin/users/admins'
          || pathname.startsWith('/admin/users/admins/');
    }

    // Active Engagements: list view + detail descendant routes
    if (itemPathname === '/admin/operations/engagements') {
      return pathname === '/admin/operations/engagements'
          || pathname.startsWith('/admin/operations/engagements/');
    }

    // Job Postings: list view + detail descendant routes
    if (itemPathname === '/admin/operations/jobs') {
      return pathname === '/admin/operations/jobs'
          || pathname.startsWith('/admin/operations/jobs/');
    }

    // Disputes: list view + detail descendant routes
    if (itemPathname === '/admin/operations/disputes') {
      return pathname === '/admin/operations/disputes'
          || pathname.startsWith('/admin/operations/disputes/');
    }

    // Reviews: list view + detail descendant routes
    if (itemPathname === '/admin/operations/reviews') {
      return pathname === '/admin/operations/reviews'
          || pathname.startsWith('/admin/operations/reviews/');
    }

    // Fraud & Abuse: list view + detail descendant routes
    if (itemPathname === '/admin/trust-safety/fraud-abuse') {
      return pathname === '/admin/trust-safety/fraud-abuse'
          || pathname.startsWith('/admin/trust-safety/fraud-abuse/');
    }

    return pathname === itemPathname;
  };

  // Filter logic: when filtering, show all matching items and expand all groups
  const filteredGroups = SIDEBAR_NAV.groups.map((group) => ({
    ...group,
    isCollapsed: filterQuery ? false : collapsedGroups.has(group.groupId),
    items: group.items.filter((item) =>
      !filterQuery || item.label.toLowerCase().includes(filterQuery.toLowerCase())
    ),
  }));

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`dash-sidebar sticky top-0 h-screen overflow-y-auto flex flex-col bg-[var(--color-paper)] border-r border-[var(--color-line)] text-[13.5px] scrollbar-thin scrollbar-thumb-[var(--color-line)] scrollbar-track-transparent max-[880px]:fixed max-[880px]:w-[280px] max-[880px]:left-0 max-[880px]:top-0 max-[880px]:h-screen max-[880px]:z-80 max-[880px]:transition-transform max-[880px]:duration-250 max-[880px]:ease-[cubic-bezier(0.2,0.7,0.3,1)] max-[880px]:shadow-[4px_0_24px_rgba(14,14,12,0.12)] ${
          isOpen ? 'max-[880px]:translate-x-0' : 'max-[880px]:-translate-x-full'
        }`}
      >
        {/* Header: Logo + Close Button */}
        <div className="flex items-center justify-between px-5 pt-[18px] pb-[14px] border-b border-[var(--color-line-soft)]">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-[9px] text-[21px]"
            aria-label="Atlas Admin home"
          >
            <span
              className="w-[26px] h-[26px] bg-[var(--color-ink)] rounded-full relative flex-shrink-0 after:absolute after:inset-[6px] after:rounded-full after:bg-[var(--color-lime)] after:content-['']"
              aria-hidden="true"
            />
            <span>Atlas</span>
            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[var(--color-ink)] bg-[var(--color-paper)] px-[7px] py-[3px] pb-[2px] border border-[var(--color-line)] rounded-[3px] ml-[2px] font-semibold">Admin</span>
          </Link>
          <button
            onClick={onClose}
            className="hidden max-[880px]:inline-flex w-8 h-8 rounded-[6px] items-center justify-center text-[var(--color-ink-mute)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] transition-colors"
            id="sidebarCloseBtn"
            aria-label="Close sidebar"
          >
            <SidebarCloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-4 py-[14px] pb-2 border-b border-[var(--color-line-soft)]">
          <div className="relative">
            <SidebarSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-[var(--color-ink-mute)] pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter sidebar…"
              aria-label="Filter sidebar items"
              className="w-full py-2 px-3 pl-8 text-[13px] bg-[var(--color-cream)] border border-[var(--color-line)] rounded-[6px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] placeholder:opacity-60 focus:outline-none focus:border-[var(--color-ink)] focus:bg-white transition-all"
              id="sidebarSearch"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9.5px] text-[var(--color-ink-mute)] bg-[var(--color-paper)] px-1.5 py-0.5 rounded border border-[var(--color-line)] pointer-events-none">
              /
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-[6px] pb-4 flex flex-col gap-0.5">
          {/* Top-level Dashboard */}
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] font-semibold text-[13px] transition-all mb-2 pt-2 ${
              isActive(SIDEBAR_NAV.topLevel.pathname)
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                : 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]'
            }`}
          >
            <SIDEBAR_NAV.topLevel.icon
              className={`w-[15px] h-[15px] flex-shrink-0 ${
                isActive(SIDEBAR_NAV.topLevel.pathname)
                  ? 'text-[var(--color-lime)]'
                  : 'text-[var(--color-ink-mute)]'
              }`}
            />
            <span className="flex-1">{SIDEBAR_NAV.topLevel.label}</span>
          </Link>

          {/* Groups */}
          {filteredGroups.map((group) => (
            <div key={group.groupId} className="mt-3 flex flex-col gap-0.5">
              {/* Group Label (Collapsible) */}
              <button
                onClick={() => toggleGroup(group.groupId)}
                className="flex items-center justify-between px-2.5 pt-[8px] pb-[6px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--color-ink-mute)] hover:text-[var(--color-ink-soft)] cursor-pointer user-select-none transition-colors"
              >
                <span>{group.label}</span>
                <ChevronDownIcon
                  className={`w-[10px] h-[10px] opacity-50 transition-transform ${
                    group.isCollapsed ? '-rotate-90' : ''
                  }`}
                />
              </button>

              {/* Group Items */}
              {!group.isCollapsed && (
                <ul className="flex flex-col gap-0.5 list-none">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    const itemActive = isActive(item.pathname);
                    const hasHash = item.pathname.includes('#');
                    const isRealRoute = item.pathname.startsWith('/') && !hasHash;

                    const linkClasses = `flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13px] font-medium transition-all no-underline ${
                      itemActive
                        ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                        : 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]'
                    }`;

                    const iconClasses = `w-[15px] h-[15px] flex-shrink-0 ${
                      itemActive
                        ? 'text-[var(--color-lime)]'
                        : 'text-[var(--color-ink-mute)]'
                    }`;

                    const countBadge = 'count' in item && item.count && (
                      <span
                        className={`font-mono text-[9.5px] px-1.5 py-0.5 rounded-[3px] font-semibold tracking-tight flex-shrink-0 ${
                          itemActive
                            ? 'bg-[var(--color-lime)] text-[var(--color-ink)]'
                            : 'countType' in item && item.countType === 'urgent'
                              ? 'bg-[var(--color-danger)] text-white'
                              : 'countType' in item && item.countType === 'warn'
                                ? 'bg-[var(--color-amber)] text-white'
                                : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
                        }`}
                      >
                        {item.count}
                      </span>
                    );

                    return (
                      <li key={item.id}>
                        {isRealRoute ? (
                          <Link href={item.pathname} className={linkClasses}>
                            <ItemIcon className={iconClasses} />
                            <span className="flex-1">{item.label}</span>
                            {countBadge}
                          </Link>
                        ) : (
                          <a href={item.pathname} className={linkClasses}>
                            <ItemIcon className={iconClasses} />
                            <span className="flex-1">{item.label}</span>
                            {countBadge}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Footer: User Profile */}
        <button className="flex items-center gap-2.5 px-[14px] py-3 border-t border-[var(--color-line-soft)] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors cursor-pointer">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[var(--color-paper)] font-display text-[13px] font-medium"
            style={{ background: 'linear-gradient(135deg, #D9A77F, #8B5A3C)' }}
          >
            {SIDEBAR_NAV.footer.avatarInitials}
          </span>
          <span className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold truncate">
              {SIDEBAR_NAV.footer.name}
            </div>
            <div className="font-mono text-[9.5px] uppercase tracking-tight text-[var(--color-ink-mute)] mt-0.5">
              {SIDEBAR_NAV.footer.role}
            </div>
          </span>
          <MoreDotsIcon className="w-3.5 h-3.5 flex-shrink-0 text-[var(--color-ink-mute)]" />
        </button>
      </aside>

      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 max-[880px]:block hidden bg-[rgba(14,14,12,0.45)] z-70 transition-opacity duration-250 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
