import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { isProduction } from "@/lib/config";

import { DomainError, RateLimitedError } from "./domain-error";
import type { ErrorCode } from "./domain-error";
import { fieldsFromZod } from "./zod-fields";

/**
 * The one wire shape for a failed request. The API client narrows on `code`,
 * the signup form reads `fields` — nothing parses `message` to decide control
 * flow.
 */
export interface ApiErrorBody {
  error: {
    code: ErrorCode;
    message: string;
    fields?: Record<string, string>;
  };
}

/**
 * Maps a thrown value to a response. Anything that is not a `DomainError` is
 * a bug, so it is logged in full and reported as an opaque 500 — an internal
 * message must never reach the browser.
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorBody> {
  if (error instanceof DomainError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.fields ? { fields: error.fields } : {}),
        },
      },
      {
        status: error.status,
        ...(error instanceof RateLimitedError
          ? { headers: { "Retry-After": String(error.retryAfterSeconds) } }
          : {}),
      },
    );
  }

  // A Zod failure that escaped the boundary parse — still the caller's fault.
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION" as const,
          message: "The submitted data is invalid.",
          fields: fieldsFromZod(error),
        },
      },
      { status: 400 },
    );
  }

  console.error("[api] unhandled error", error);

  return NextResponse.json(
    {
      error: {
        code: "INTERNAL" as const,
        message: isProduction
          ? "Something went wrong on our side. Please try again."
          : `Unhandled error: ${String(error)}`,
      },
    },
    { status: 500 },
  );
}
