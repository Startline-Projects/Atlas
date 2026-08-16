import type { ErrorCode } from "@/lib/errors/domain-error";
import type { ApiErrorBody } from "@/lib/errors/handle-api-error";

/**
 * The browser's view of an API failure.
 *
 * A plain class, not a `DomainError`: those carry a status and belong to the
 * server. This is what a form catches, and all it needs is a message and the
 * per-field detail to render.
 */
export class ApiClientError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly fields: Record<string, string>;

  constructor(
    message: string,
    code: ErrorCode,
    status: number,
    fields: Record<string, string> = {},
  ) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

/**
 * `fetch` with the project's envelope unwrapped: resolves to `data`, throws an
 * `ApiClientError` for anything else — including a network failure, so callers
 * only ever need one `catch`.
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const { json, ...rest } = init;

  let response: Response;
  try {
    response = await fetch(path, {
      ...rest,
      headers: {
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...rest.headers,
      },
      ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
    });
  } catch {
    throw new ApiClientError(
      "Could not reach the server. Check your connection and try again.",
      "INTERNAL",
      0,
    );
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const error = (body as ApiErrorBody | null)?.error;
    throw new ApiClientError(
      error?.message ?? "Something went wrong. Please try again.",
      error?.code ?? "INTERNAL",
      response.status,
      error?.fields ?? {},
    );
  }

  return (body as { data: T }).data;
}
