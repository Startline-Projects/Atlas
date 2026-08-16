import { NextResponse } from "next/server";

/**
 * The success half of the wire contract; `handleApiError` owns the other half.
 * Everything is wrapped in `data` so a response can grow a sibling key (paging,
 * warnings) without breaking clients that already read it.
 */
export interface ApiSuccessBody<T> {
  data: T;
}

export function ok<T>(data: T, status = 200): NextResponse<ApiSuccessBody<T>> {
  return NextResponse.json({ data }, { status });
}

export function created<T>(data: T): NextResponse<ApiSuccessBody<T>> {
  return ok(data, 201);
}
