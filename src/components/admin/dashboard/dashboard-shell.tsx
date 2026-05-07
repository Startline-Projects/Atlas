'use client';

import { ReactNode } from 'react';

interface DashboardShellProps {
  header: ReactNode;
  alertsSection?: ReactNode;
  healthSection?: ReactNode;
  financialSection?: ReactNode;
  operationsAndActivity?: ReactNode;
  rail?: ReactNode;
}

export function DashboardShell({
  header,
  alertsSection,
  healthSection,
  financialSection,
  operationsAndActivity,
  rail,
}: DashboardShellProps) {
  return (
    <div className="grid items-start gap-0 grid-cols-[minmax(0,1fr)_280px] max-[1240px]:grid-cols-[minmax(0,1fr)_260px] max-[1080px]:grid-cols-1">
      {/* MAIN COLUMN */}
      <main className="pt-7 pr-7 pb-20 pl-7">
        {/* Page header */}
        {header}

        {/* Alerts section — placeholder for Phase 2b */}
        {alertsSection && (
          <div className="dash-section">{alertsSection}</div>
        )}

        {/* Health section — placeholder for Phase 2c */}
        {healthSection && (
          <section className="dash-section">{healthSection}</section>
        )}

        {/* Financial section — placeholder for Phase 2c */}
        {financialSection && (
          <section className="dash-section">{financialSection}</section>
        )}

        {/* Operations + Activity — placeholder for Phase 2d */}
        {operationsAndActivity && (
          <section className="dash-section">{operationsAndActivity}</section>
        )}
      </main>

      {/* RIGHT RAIL — placeholder for Phase 2e */}
      {rail && (
        <aside className="sticky top-[60px] self-start max-h-[calc(100vh-60px)] overflow-y-auto flex flex-col gap-[22px] pt-7 pr-6 pb-20 pl-2 text-[13px] max-[1080px]:static max-[1080px]:max-h-none max-[1080px]:overflow-visible max-[1080px]:flex-row max-[1080px]:flex-wrap max-[1080px]:gap-4 max-[1080px]:pt-0 max-[1080px]:px-4 max-[1080px]:pb-5">
          {rail}
        </aside>
      )}
    </div>
  );
}
