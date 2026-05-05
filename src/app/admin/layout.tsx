'use client';

import { AdminPreviewPanel } from '@/components/admin/admin-preview-panel';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AdminPreviewPanel />
    </>
  );
}
