'use client';

/* Global mock-action toast — most admin buttons are fixture decoration (no backend).
   This provider confirms a click was registered via a transient toast in the bottom-right. */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AdminActionToast {
  id: number;
  message: string;
}

interface AdminActionToastContextValue {
  showAction: (message: string) => void;
}

const AdminActionToastCtx = createContext<AdminActionToastContextValue>({
  showAction: () => {
    /* noop default */
  },
});

export function useAdminActionToast() {
  return useContext(AdminActionToastCtx);
}

export function AdminActionToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<AdminActionToast[]>([]);

  const showAction = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <AdminActionToastCtx.Provider value={{ showAction }}>
      {children}
      <div className="fixed bottom-[24px] right-[24px] flex flex-col gap-[8px] z-50 max-w-[400px] pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-[var(--ink)] text-[var(--paper)] py-[10px] px-[16px] rounded-[var(--r-md)] shadow-lg font-mono text-[11.5px] tracking-[0.02em] font-semibold pointer-events-auto"
          >
            <span className="opacity-60 text-[9px] uppercase tracking-[0.16em] mr-[8px]">
              MOCK ACTION
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </AdminActionToastCtx.Provider>
  );
}
