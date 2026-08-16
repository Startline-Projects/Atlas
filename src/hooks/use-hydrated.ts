"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during server rendering and the very first client render, `true`
 * once React has hydrated and event handlers are live.
 *
 * Use it to keep forms from being submitted natively before `onSubmit` is
 * attached — a click or Enter in that window would otherwise send the fields
 * as a GET query string (password included) instead of calling the API.
 * Disabling the submit button also blocks implicit (Enter-key) submission.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
