'use client';

import { useState } from 'react';
import { AdminTopbar } from './admin-topbar';
import { AdminSidebar } from './admin-sidebar';

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-[264px_minmax(0,1fr)] max-[1080px]:grid-cols-[220px_minmax(0,1fr)] max-[880px]:grid-cols-[1fr] bg-[var(--color-cream)]">
      {/* Sidebar (fixed on mobile, sticky on desktop) */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content column (topbar + main) */}
      <div className="flex flex-col">
        {/* Topbar */}
        <AdminTopbar onHamburgerClick={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
