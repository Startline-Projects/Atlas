import type {
  EnglishTestOverviewDto,
  PaymentDto,
  PublicTestQuestionDto,
  TestAttemptDto,
} from "@/lib/api/dto/english-test.dto";
import type { RetakeCheckoutStart } from "@/lib/domain/english-test";

import { apiFetch } from "./http";

/**
 * Typed calls into the English-test endpoints — ARCHITECTURE §6 step 7.
 *
 * Every read takes an optional `init` so a Server Component can pass
 * `serverInit()` (cookie forwarding); Client Components omit it.
 */

const BASE = "/api/v1/candidates/me/english-test";

export const englishTestApi = {
  overview(init?: RequestInit): Promise<EnglishTestOverviewDto> {
    return apiFetch<EnglishTestOverviewDto>(BASE, {
      method: "GET",
      cache: "no-store",
      ...init,
    });
  },

  questions(): Promise<{ questions: PublicTestQuestionDto[] }> {
    return apiFetch<{ questions: PublicTestQuestionDto[] }>(`${BASE}/questions`, {
      method: "GET",
      cache: "no-store",
    });
  },

  submit(answers: ReadonlyArray<number | null>): Promise<{ attempt: TestAttemptDto }> {
    return apiFetch<{ attempt: TestAttemptDto }>(`${BASE}/attempts`, {
      method: "POST",
      json: { answers },
    });
  },

  attempt(id: string, init?: RequestInit): Promise<{ attempt: TestAttemptDto }> {
    return apiFetch<{ attempt: TestAttemptDto }>(
      `${BASE}/attempts/${encodeURIComponent(id)}`,
      { method: "GET", cache: "no-store", ...init },
    );
  },

  startRetakeCheckout(returnPath: string): Promise<RetakeCheckoutStart> {
    return apiFetch<RetakeCheckoutStart>(`${BASE}/retake/checkout`, {
      method: "POST",
      json: { returnPath },
    });
  },

  confirmRetakeCheckout(
    sessionId: string,
    init?: RequestInit,
  ): Promise<{ payment: PaymentDto }> {
    return apiFetch<{ payment: PaymentDto }>(`${BASE}/retake/confirm`, {
      method: "POST",
      json: { sessionId },
      ...init,
    });
  },
};
