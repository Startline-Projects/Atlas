'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UsersHeader } from '@/components/admin/users/users-header';
import { UsersTabs } from '@/components/admin/users/users-tabs';
import { UsersStats } from '@/components/admin/users/users-stats';
import { UsersToolbar } from '@/components/admin/users/users-toolbar';
import { UsersTable } from '@/components/admin/users/users-table';
import { BulkActionBar } from '@/components/admin/users/bulk-action-bar';
import { ManagerTab } from '@/components/admin/users/manager-tab';
import { USERS_DATA } from '@/lib/mock-data/admin/users-data';
import type { CandidateUser } from '@/lib/mock-data/admin/users-data';

type TabName = 'candidates' | 'clients' | 'specialists' | 'manager' | 'admins';

interface UsersShellProps {
  initialTab?: TabName;
  /**
   * Real candidates, read from the database by the page. When present they
   * replace the mock rows; the other tabs stay on mock data until their own
   * slice lands.
   */
  candidateRows?: CandidateUser[] | undefined;
}

export function UsersShell({ initialTab, candidateRows }: UsersShellProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>(initialTab ?? 'candidates');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Single place that decides mock vs. real, so every consumer below —
  // the table, select-all, the bulk bar count — agrees on what is on screen.
  const rowsFor = (tab: 'candidates' | 'clients' | 'specialists' | 'admins') =>
    tab === 'candidates' && candidateRows ? candidateRows : USERS_DATA[tab].rows;

  // The mock pagination line quotes a fixed 22,108. Once the rows are real the
  // count has to be too, or the table contradicts itself on screen.
  const tableConfigFor = (
    tab: 'candidates' | 'clients' | 'specialists' | 'admins',
  ) => {
    const config = USERS_DATA[tab].tableConfig;
    if (tab !== 'candidates' || !candidateRows) return config;

    const total = candidateRows.length;
    return {
      ...config,
      pagination: {
        ...config.pagination,
        text: `Showing ${total} of ${total} candidate${total === 1 ? '' : 's'}`,
      },
    };
  };

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

  // Tab change handler: update state, clear selection, and navigate
  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
    setSelectedRows(new Set());

    // Candidates uses real route; others use hash-based routing for now
    if (tab === 'candidates') {
      router.push('/admin/users/candidates');
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

  // Select all handler: select or deselect all rows
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      if (activeTab !== 'manager') {
        setSelectedRows(new Set(rowsFor(activeTab).map((r) => r.id)));
      }
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
          />
          {selectedRows.size > 0 && (
            <BulkActionBar
              count={selectedRows.size}
              actions={USERS_DATA[activeTab].tableConfig.bulkActions!}
              onClear={handleClearSelection}
            />
          )}
          <UsersTable
            rows={rowsFor(activeTab)}
            tableConfig={tableConfigFor(activeTab)}
            selectedRows={selectedRows}
            onSelectionChange={handleRowSelect}
            onSelectAll={handleSelectAll}
            activeTab={activeTab}
          />
        </>
      )}

      {/* Manager Tab: Singleton card */}
      {activeTab === 'manager' && <ManagerTab />}

      {/* Admins Tab: Stats + Toolbar + Table (no bulk bar) */}
      {activeTab === 'admins' && (
        <>
          <UsersStats stats={USERS_DATA.admins.stats} />
          <UsersToolbar
            filters={USERS_DATA.admins.filters}
            searchPlaceholder={USERS_DATA.admins.tableConfig.searchPlaceholder}
            primaryCta={USERS_DATA.admins.tableConfig.primaryCta}
          />
          <UsersTable
            rows={USERS_DATA.admins.rows}
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
