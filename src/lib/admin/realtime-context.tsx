'use client';

/* Real-time updates state — Step 41 (Scope 40).
   Mounted in the (admin) layout so the topbar pill + ticker toggle (Pass A) and the
   right-edge ticker panel (Pass B) share one source of truth.
   tickerOpen drives the slide-out; connectionState/latencyMs drive the topbar pill. */

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { RtConnectionState } from '@/lib/mock-data/admin/realtime-data';

interface RtRealtimeContextValue {
  tickerOpen: boolean;
  connectionState: RtConnectionState;
  latencyMs: number;
  openTicker: () => void;
  closeTicker: () => void;
  setConnectionState: (state: RtConnectionState) => void;
  setLatency: (ms: number) => void;
}

const RtRealtimeContext = createContext<RtRealtimeContextValue | null>(null);

export function RtRealtimeProvider({ children }: { children: ReactNode }) {
  const [tickerOpen, setTickerOpen] = useState(false);
  const [connectionState, setConnectionStateValue] =
    useState<RtConnectionState>('live');
  const [latencyMs, setLatencyMs] = useState(14);

  const openTicker = () => setTickerOpen(true);
  const closeTicker = () => setTickerOpen(false);
  const setConnectionState = (state: RtConnectionState) =>
    setConnectionStateValue(state);
  const setLatency = (ms: number) => setLatencyMs(ms);

  return (
    <RtRealtimeContext.Provider
      value={{
        tickerOpen,
        connectionState,
        latencyMs,
        openTicker,
        closeTicker,
        setConnectionState,
        setLatency,
      }}
    >
      {children}
    </RtRealtimeContext.Provider>
  );
}

export function useRtRealtime() {
  const ctx = useContext(RtRealtimeContext);
  if (!ctx) {
    throw new Error('useRtRealtime must be used within RtRealtimeProvider');
  }
  return ctx;
}
