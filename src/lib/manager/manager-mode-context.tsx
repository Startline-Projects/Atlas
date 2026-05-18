"use client";

/**
 * ManagerModeProvider + `useManagerMode()` — the mode state machine
 * for the Manager-as-Specialist-extension architecture (ADR 0001).
 *
 * ## Storage model
 *
 * The mode lives in `localStorage["atlas:managerMode"]`. We subscribe
 * via React's `useSyncExternalStore` — the blessed pattern for
 * external-store subscriptions — which gets us three things for free:
 *
 *   1. No `useEffect`-then-`setState` ping-pong on mount (which the
 *      `react-hooks/set-state-in-effect` rule rightly flags).
 *   2. **Cross-tab sync** — the `storage` event fires when another
 *      tab writes the same key, and our subscribe callback updates
 *      every mounted consumer.
 *   3. SSR-safe — `getServerSnapshot` returns the default; the
 *      client snapshot reads localStorage synchronously on mount.
 *      Brief hydration flash when the user's saved mode differs from
 *      the default; acceptable for Step 1's tiny toggle. Documented
 *      in CONVERSION_LOG §"Known friction".
 *
 * ## API
 *
 *   - `mode: "manager" | "specialist"` — read from any client
 *     component via `useManagerMode().mode`
 *   - `setMode(next)` — writes localStorage + notifies subscribers in
 *     the current tab (since the `storage` event doesn't fire on the
 *     tab that wrote)
 *
 * ## Graceful fallback
 *
 * Safari private mode and some embedded WebViews throw on
 * `localStorage` access. The try/catches swallow; the in-memory
 * `currentMemoryMode` still works (just doesn't persist).
 *
 * ## Why a Provider at all if the store is module-level
 *
 * Strictly, the Provider isn't necessary — `useSyncExternalStore`
 * reads directly from the module-level store. We keep the Provider
 * shape anyway so:
 *
 *   - `useManagerMode()` consumers get a clear error if they're
 *     mounted outside the Specialist layout (the contract)
 *   - Future expansion (e.g. per-route mode override, scoped
 *     resets) can land without a Context-introduction migration
 */

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ManagerMode = "manager" | "specialist";

const STORAGE_KEY = "atlas:managerMode";
const DEFAULT_MODE: ManagerMode = "manager";

/* ============================================================
   External store
   ============================================================ */

/* Module-level memory mirror. Used as the snapshot returned by
   `getSnapshot` so consumers get a stable reference (recomputing
   from localStorage on every snapshot call would break referential
   equality and re-render every consumer per RAF). */
let currentMemoryMode: ManagerMode = DEFAULT_MODE;
let memoryHydrated = false;

const listeners = new Set<() => void>();

function readFromStorage(): ManagerMode {
  if (typeof window === "undefined") return DEFAULT_MODE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "manager" || stored === "specialist") return stored;
  } catch {
    /* localStorage unavailable — fall back to default */
  }
  return DEFAULT_MODE;
}

function emit() {
  listeners.forEach((cb) => cb());
}

function handleStorageEvent(e: StorageEvent) {
  if (e.key !== STORAGE_KEY && e.key !== null) return;
  const next = readFromStorage();
  if (next === currentMemoryMode) return;
  currentMemoryMode = next;
  emit();
}

function subscribe(callback: () => void): () => void {
  /* First subscriber wires up the cross-tab storage listener AND
     hydrates the memory mirror from localStorage. Subsequent
     subscribers share the same listener. */
  if (listeners.size === 0 && typeof window !== "undefined") {
    if (!memoryHydrated) {
      currentMemoryMode = readFromStorage();
      memoryHydrated = true;
    }
    window.addEventListener("storage", handleStorageEvent);
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

function getSnapshot(): ManagerMode {
  /* If subscribe hasn't been called yet (shouldn't happen but defend
     against it), hydrate lazily so the first render reflects localStorage. */
  if (!memoryHydrated && typeof window !== "undefined") {
    currentMemoryMode = readFromStorage();
    memoryHydrated = true;
  }
  return currentMemoryMode;
}

function getServerSnapshot(): ManagerMode {
  return DEFAULT_MODE;
}

function writeMode(next: ManagerMode) {
  if (next === currentMemoryMode) return;
  currentMemoryMode = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* swallow — in-memory write still propagates */
  }
  /* `storage` event only fires in OTHER tabs; emit manually so
     consumers in THIS tab re-render. */
  emit();
}

/* ============================================================
   Provider + hook
   ============================================================ */

type ManagerModeContextValue = {
  mode: ManagerMode;
  setMode: (next: ManagerMode) => void;
};

const ManagerModeContext = createContext<ManagerModeContextValue | undefined>(
  undefined,
);

export function ManagerModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setMode = useCallback((next: ManagerMode) => writeMode(next), []);

  return (
    <ManagerModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ManagerModeContext.Provider>
  );
}

export function useManagerMode(): ManagerModeContextValue {
  const ctx = useContext(ManagerModeContext);
  if (!ctx) {
    throw new Error(
      "useManagerMode must be used inside <ManagerModeProvider>. " +
        "Provider is mounted in (specialist)/layout.tsx — this hook " +
        "should not be called from non-Specialist routes.",
    );
  }
  return ctx;
}
