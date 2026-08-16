/**
 * Domain errors — ARCHITECTURE §7.4.
 *
 * Services throw these. Route handlers never build an error response by hand;
 * they hand the thrown value to `handleApiError()`, which is the single place
 * that decides a status code and a wire shape.
 */

export type ErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "CONFLICT"
  | "BUSINESS_RULE"
  | "UPSTREAM"
  | "INTERNAL";

export abstract class DomainError extends Error {
  abstract readonly code: ErrorCode;
  abstract readonly status: number;

  /**
   * Field-level detail, keyed by form field name. The signup form reads this
   * to put a message under the right input instead of in the summary banner.
   */
  readonly fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string>) {
    super(message);
    this.name = new.target.name;
    if (fields) this.fields = fields;
  }
}

export class ValidationError extends DomainError {
  readonly code = "VALIDATION" as const;
  readonly status = 400;
}

/** No valid session — the caller has to sign in (again). */
export class UnauthorizedError extends DomainError {
  readonly code = "UNAUTHORIZED" as const;
  readonly status = 401;
}

export class NotFoundError extends DomainError {
  readonly code = "NOT_FOUND" as const;
  readonly status = 404;
}

export class ForbiddenError extends DomainError {
  readonly code = "FORBIDDEN" as const;
  readonly status = 403;
}

/** A uniqueness constraint the user can act on — e.g. the email is taken. */
export class ConflictError extends DomainError {
  readonly code = "CONFLICT" as const;
  readonly status = 409;
}

export class BusinessRuleError extends DomainError {
  readonly code = "BUSINESS_RULE" as const;
  readonly status = 422;
}

/** A third party (Supabase, Stripe, …) failed us. Never the caller's fault. */
export class UpstreamError extends DomainError {
  readonly code = "UPSTREAM" as const;
  readonly status = 502;
}
