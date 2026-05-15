'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UsersHeader } from '@/components/admin/users/users-header';
import { UsersTabs } from '@/components/admin/users/users-tabs';
import { UsersStats } from '@/components/admin/users/users-stats';
import { UsersToolbar } from '@/components/admin/users/users-toolbar';
import { UsersTable } from '@/components/admin/users/users-table';
import { BulkActionBar } from '@/components/admin/users/bulk-action-bar';
import { ManagerTab } from '@/components/admin/users/manager-tab';
import { USERS_DATA } from '@/lib/mock-data/admin/users-data';

type TabName = 'candidates' | 'clients' | 'specialists' | 'manager' | 'admins';

interface UsersShellProps {
  initialTab?: TabName;
}

// Searchable string fields per tab — applied case-insensitively against searchQuery
const SEARCHABLE_FIELDS: Record<Exclude<TabName, 'manager'>, string[]> = {
  candidates: ['name', 'email', 'country', 'title'],
  clients: ['name', 'email', 'industry', 'country'],
  specialists: ['name', 'email', 'region', 'category'],
  admins: ['name', 'email', 'role'],
};

export function UsersShell({ initialTab }: UsersShellProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>(initialTab ?? 'candidates');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Read hash on mount to set initial activeTab, and listen for hash changes
  // Only sync from hash if NO initialTab was provided (real route takes precedence)
  useEffect(() => {
    if (initialTab) return; // Skip hash listener if initialTab prop provided

    const updateTabFromHash = () => {
      const hash = window.location.hash.substring(1); // Remove '#' prefix
      const validTabs: TabName[] = ['candidates', 'clients', 'specialists', 'manager', 'admins'];
      if (hash && validTabs.includes(hash as TabName)) {
        setActiveTab(hash as TabName);
      } else {
        setActiveTab('candidates');
      }
    };

    // Set initial tab from hash
    updateTabFromHash();

    // Listen for hash changes (e.g., sidebar clicks)
    window.addEventListener('hashchange', updateTabFromHash);
    return () => window.removeEventListener('hashchange', updateTabFromHash);
  }, [initialTab]);

  // Filtered rows: applies searchQuery against tab-specific searchable fields
  const filteredRows = useMemo(() => {
    if (activeTab === 'manager') return [];
    const tabData = USERS_DATA[activeTab];
    if (!tabData || !('rows' in tabData)) return [];
    if (!searchQuery.trim()) return tabData.rows;
    const q = searchQuery.toLowerCase();
    const fields = SEARCHABLE_FIELDS[activeTab] ?? [];
    return tabData.rows.filter((row) =>
      fields.some((field) => {
        const value = (row as unknown as Record<string, unknown>)[field];
        return typeof value === 'string' && value.toLowerCase().includes(q);
      })
    );
  }, [activeTab, searchQuery]);

  // Tab change handler: update state, clear selection + search, and navigate
  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
    setSelectedRows(new Set());
    setSearchQuery('');

    // Real routes for candidates / clients / specialists. Manager tab uses 'managers' route segment.
    // Admins tab stays inline on /admin/users — row click navigates to /admin/users/admins#{rowId}.
    if (tab === 'candidates' || tab === 'clients' || tab === 'specialists') {
      router.push(`/admin/users/${tab}`);
    } else if (tab === 'manager') {
      router.push('/admin/users/managers');
    } else {
      router.push('/admin/users#' + tab);
    }
  };

  // Selection change handler: toggle row selection
  const handleRowSelect = (id: string, selected: boolean) => {
    const newSelection = new Set(selectedRows);
    if (selected) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedRows(newSelection);
  };

  // Select all handler: selects only currently filtered (visible) rows
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedRows(new Set(filteredRows.map((r) => r.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // Clear selection handler: empty the selection set
  const handleClearSelection = () => {
    setSelectedRows(new Set());
  };

  return (
    <main className="w-full max-w-[1400px] mx-auto min-w-0 pt-7 pr-8 pb-20 pl-8">
      <UsersHeader />
      <UsersTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Stats strip + Toolbar + Bulk Bar + Table — Candidates, Clients, and Specialists tabs */}
      {(activeTab === 'candidates' || activeTab === 'clients' || activeTab === 'specialists') && (
        <>
          <UsersStats stats={USERS_DATA[activeTab].stats} />
          <UsersToolbar
            filters={USERS_DATA[activeTab].filters}
            searchPlaceholder={USERS_DATA[activeTab].tableConfig.searchPlaceholder}
            {...(USERS_DATA[activeTab].tableConfig.exportLabel ? { exportLabel: USERS_DATA[activeTab].tableConfig.exportLabel } : {})}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {selectedRows.size > 0 && (
            <BulkActionBar
              count={selectedRows.size}
              actions={USERS_DATA[activeTab].tableConfig.bulkActions!}
              onClear={handleClearSelection}
            />
          )}
          <UsersTable
            rows={filteredRows as typeof USERS_DATA[typeof activeTab]['rows']}
            tableConfig={USERS_DATA[activeTab].tableConfig}
            selectedRows={selectedRows}
            onSelectionChange={handleRowSelect}
            onSelectAll={handleSelectAll}
            activeTab={activeTab}
          />
        </>
      )}

      {/* Manager Tab: Singleton card */}
      {activeTab === 'manager' && <ManagerTab />}

      {/* Admins tab: inline list view. Row click navigates to /admin/users/admins#{rowId}. */}
      {activeTab === 'admins' && (
        <>
          <UsersStats stats={USERS_DATA.admins.stats} />
          <UsersToolbar
            filters={USERS_DATA.admins.filters}
            searchPlaceholder={USERS_DATA.admins.tableConfig.searchPlaceholder}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <UsersTable
            rows={filteredRows as typeof USERS_DATA.admins.rows}
            tableConfig={USERS_DATA.admins.tableConfig}
            selectedRows={selectedRows}
            onSelectionChange={handleRowSelect}
            onSelectAll={handleSelectAll}
            activeTab="admins"
          />
        </>
      )}
    </main>
  );
}
