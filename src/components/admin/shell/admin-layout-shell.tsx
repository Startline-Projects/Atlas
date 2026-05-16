'use client';

import { useState } from 'react';
import { AdminTopbar } from './admin-topbar';
import { AdminSidebar } from './admin-sidebar';

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-[264px_minmax(0,1fr)] max-[1080px]:grid-cols-[220px_minmax(0,1fr)] max-[880px]:grid-cols-[1fr] bg-[var(--color-cream)]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0">
        <AdminTopbar onHamburgerClick={() => setSidebarOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
