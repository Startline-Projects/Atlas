import type { NextRequest } from "next/server";

import { toCandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError, ValidationError } from "@/lib/errors";
import { candidateProfileService } from "@/lib/services/candidate-profile";
import { uploadKindSchema } from "@/lib/validators/candidate-profile";

/**
 * POST /api/v1/candidates/me/uploads  (multipart: `kind`, `file`)
 *
 * Stores an image and returns its public URL. `kind=avatar` also saves it as
 * the profile photo; `kind=portfolio` just returns the URL for the builder to
 * attach to a portfolio item.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateSession();

    const form = await request.formData();
    const kind = uploadKindSchema.safeParse(form.get("kind"));
    const file = form.get("file");
    if (!kind.success) {
      throw new ValidationError(kind.error.issues[0]?.message ?? "Unknown upload kind.");
    }
    if (!(file instanceof File) || file.size === 0) {
      throw new ValidationError("Choose an image to upload.", {
        file: "Choose an image to upload.",
      });
    }

    const result = await candidateProfileService.uploadImage(
      session.userId,
      kind.data,
      {
        bytes: new Uint8Array(await file.arrayBuffer()),
        contentType: file.type,
        size: file.size,
      },
    );

    return ok({
      url: result.url,
      view: result.view ? toCandidateProfileViewDto(result.view) : null,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
