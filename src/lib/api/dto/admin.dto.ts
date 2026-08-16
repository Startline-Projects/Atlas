import type { AdminUser } from "@/lib/domain/admin";
import type { AccountStatus } from "@/lib/domain/candidate";

/** Over-the-wire admin. Same reasoning as `CandidateDto`: JSON has no `Date`. */
export interface AdminDto {
  id: string;
  email: string;
  fullName: string;
  title: string;
  status: AccountStatus;
  lastActiveAt: string | null;
  createdAt: string;
}

export function toAdminDto(admin: AdminUser): AdminDto {
  return {
    id: admin.id,
    email: admin.email,
    fullName: admin.fullName,
    title: admin.title,
    status: admin.status,
    lastActiveAt: admin.lastActiveAt?.toISOString() ?? null,
    createdAt: admin.createdAt.toISOString(),
  };
}
