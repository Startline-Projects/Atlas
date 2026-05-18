"use client";

/**
 * RecruitmentSprintsApp — orchestrator for `/specialist/recruitment-sprints`.
 *
 * Owns:
 *   - `focusedSprintId` — initial deep-link target from `?launch=`
 *     searchParam. Resolved via `findSprintByCategoryId()`. Auto-
 *     clears after 2s so the ring fades.
 *
 * `?launch=<category-id>` semantics (Q3 lock):
 *   - Matching active sprint found → scroll-to-card + lime ring
 *   - No matching sprint (e.g. ?launch=virtual-assistants) → silently
 *     clear `?launch=` from URL via `router.replace()` to prevent
 *     shareable URL confusion. Page renders normally without ring.
 */

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  activeSprints,
  findSprintByCategoryId,
  type SprintId,
} from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { RsHeader } from "./rs-header";
import { RsGoalBanner } from "./rs-goal-banner";
import { RsTotalsStrip } from "./rs-totals-strip";
import { RsSprintsGrid } from "./rs-sprints-grid";
import { RsCrossSprintSection } from "./rs-cross-sprint-section";
import { RsSprintHistory } from "./rs-sprint-history";

const FOCUS_RING_DURATION_MS = 2000;

export function RecruitmentSprintsApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* Lazy initializer — reads `?launch=<category-id>` ONCE on mount.
     Resolves to a sprint id via `findSprintByCategoryId()`. */
  const [focusedSprintId, setFocusedSprintId] = useState<SprintId | null>(() => {
    const launchCategory = searchParams.get("launch");
    if (!launchCategory) return null;
    const sprint = findSprintByCategoryId(launchCategory);
    return sprint?.id ?? null;
  });

  /* Per Q3 refinement: if `?launch=` was set but no matching sprint
     exists, silently clear the URL param. Prevents shareable URL
     confusion ("why doesn't this page do anything when I click that link?"). */
  useEffect(() => {
    const launchCategory = searchParams.get("launch");
    if (launchCategory && !findSprintByCategoryId(launchCategory)) {
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardRefs = useRef<Map<SprintId, HTMLElement>>(new Map());

  useEffect(() => {
    if (!focusedSprintId) return;
    const el = cardRefs.current.get(focusedSprintId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
    const clear = window.setTimeout(() => {
      setFocusedSprintId(null);
    }, FOCUS_RING_DURATION_MS);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clear);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerCardRef = (id: SprintId, el: HTMLElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <RsHeader sprints={activeSprints} />
      <RsGoalBanner />
      <RsTotalsStrip sprints={activeSprints} />
      <RsSprintsGrid
        sprints={activeSprints}
        focusedSprintId={focusedSprintId}
        registerCardRef={registerCardRef}
      />
      <RsCrossSprintSection />
      <RsSprintHistory />
    </div>
  );
}
