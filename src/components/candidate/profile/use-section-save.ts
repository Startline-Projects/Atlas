"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ApiClientError } from "@/lib/api-client";
import type { CandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";

/**
 * Save-state for one builder section: pending flag, banner error, per-field
 * errors keyed the way the API returns them ("2.endDate"), and a short-lived
 * "Saved" flag. On success the fresh view (profile + strength) is handed up so
 * the strength meter updates without a refetch.
 */
export function useSectionSave(
  onSaved: (view: CandidateProfileViewDto) => void,
) {
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );

  const run = useCallback(
    async (request: () => Promise<CandidateProfileViewDto>) => {
      if (pending) return false;
      setPending(true);
      setError(null);
      setFieldErrors({});
      setSaved(false);

      try {
        const view = await request();
        onSaved(view);
        setSaved(true);
        if (savedTimer.current) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSaved(false), 2500);
        return true;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setFieldErrors(err.fields);
          setError(
            Object.keys(err.fields).length > 0
              ? "Some fields need attention."
              : err.message,
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
        return false;
      } finally {
        setPending(false);
      }
    },
    [onSaved, pending],
  );

  const clearFieldError = useCallback((key: string) => {
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return { pending, saved, error, fieldErrors, run, clearFieldError, setError };
}
