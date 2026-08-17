import { toClientDto } from "@/lib/api/dto/client.dto";
import { ok } from "@/lib/api/response";
import { requireClientSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";

/**
 * GET /api/v1/clients/me
 *
 * The signed-in client. 401 when there is no live session.
 */
export async function GET() {
  try {
    const session = await requireClientSession();
    return ok({ client: toClientDto(session.client) });
  } catch (error) {
    return handleApiError(error);
  }
}
