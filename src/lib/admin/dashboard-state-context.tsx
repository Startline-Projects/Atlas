'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DashboardViewMode = 'default' | 'all-clear' | 'critical-only';
type DashboardAlertFilter = 'all' | 'urgent' | 'today' | 'week';
type DashboardActivityFilter = 'all' | 'me' | 'suspension' | 'refund' | 'dispute' | 'override';
type DashboardSystemStatus = 'ok' | 'warn' | 'down';
type DashboardUserRole = 'super' | 'ops' | 'trust' | 'readonly';

export interface DashboardState {
  viewMode: DashboardViewMode;
  alertFilter: DashboardAlertFilter;
  activityFilter: DashboardActivityFilter;
  systemStatus: DashboardSystemStatus;
  userRole: DashboardUserRole;
}

interface DashboardStateContextType {
  state: DashboardState;
  setState: (newState: Partial<DashboardState>) => void;
}

const DashboardStateContext = createContext<DashboardStateContextType | undefined>(undefined);

export function DashboardStateProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<DashboardState>({
    viewMode: 'default',
    alertFilter: 'all',
    activityFilter: 'all',
    systemStatus: 'ok',
    userRole: 'ops',
  });

  const setState = (newState: Partial<DashboardState>) => {
    setStateRaw((prev) => ({ ...prev, ...newState }));
  };

  return (
    <DashboardStateContext.Provider value={{ state, setState }}>
      {children}
    </DashboardStateContext.Provider>
  );
}

export function useDashboardState() {
  const context = useContext(DashboardStateContext);
  if (!context) {
    throw new Error('useDashboardState must be used within DashboardStateProvider');
  }
  return context;
}
