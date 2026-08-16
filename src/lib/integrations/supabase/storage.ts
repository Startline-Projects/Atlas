import { UpstreamError } from "@/lib/errors/domain-error";

import { getServiceSupabaseClient } from "./supabase.client";

/**
 * Supabase Storage — public image buckets for avatars and portfolio pieces.
 *
 * Uploads go through the service-role client on the server (the browser never
 * talks to Storage directly), so RLS on the buckets can stay closed and the
 * API route is the only place a file can enter. Buckets are created on first
 * use, so a fresh Supabase project needs no manual setup.
 */

export const STORAGE_BUCKETS = {
  avatars: "avatars",
  portfolio: "portfolio",
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

const ensured = new Set<string>();

async function ensurePublicBucket(bucket: string): Promise<void> {
  if (ensured.has(bucket)) return;

  const supabase = getServiceSupabaseClient();
  const { data } = await supabase.storage.getBucket(bucket);
  if (!data) {
    const { error } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
    });
    // A concurrent request may have created it first — that is not a failure.
    if (error && !/already exists/i.test(error.message)) {
      throw new UpstreamError(`Could not prepare storage: ${error.message}`);
    }
  }
  ensured.add(bucket);
}

export interface UploadPublicFileInput {
  bucket: StorageBucket;
  /** Path inside the bucket, e.g. `user_123/avatar-1699999999.png`. */
  path: string;
  bytes: Uint8Array;
  contentType: string;
}

/** Uploads (or overwrites) and returns the permanent public URL. */
export async function uploadPublicFile(
  input: UploadPublicFileInput,
): Promise<string> {
  await ensurePublicBucket(input.bucket);

  const supabase = getServiceSupabaseClient();
  const { error } = await supabase.storage
    .from(input.bucket)
    .upload(input.path, input.bytes, {
      contentType: input.contentType,
      upsert: true,
      cacheControl: "31536000",
    });

  if (error) {
    throw new UpstreamError(`Could not upload the file: ${error.message}`);
  }

  return supabase.storage.from(input.bucket).getPublicUrl(input.path).data
    .publicUrl;
}
