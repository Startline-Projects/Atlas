import type { AccountStatus, RoleCategory } from "@/lib/domain/candidate";
import type { Client, TeamSize } from "@/lib/domain/client";

/**
 * The over-the-wire shape of a client — dates as ISO strings, the auth
 * provider id never included.
 */
export interface ClientDto {
  id: string;
  email: string;
  contactName: string;
  companyName: string;
  country: string | null;
  countryCode: string | null;
  teamSize: TeamSize | null;
  hiringCategories: RoleCategory[];
  status: AccountStatus;
  emailVerifiedAt: string | null;
  lastActiveAt: string | null;
  createdAt: string;
}

export function toClientDto(client: Client): ClientDto {
  return {
    id: client.id,
    email: client.email,
    contactName: client.contactName,
    companyName: client.companyName,
    country: client.country,
    countryCode: client.countryCode,
    teamSize: client.teamSize,
    hiringCategories: client.hiringCategories,
    status: client.status,
    emailVerifiedAt: client.emailVerifiedAt?.toISOString() ?? null,
    lastActiveAt: client.lastActiveAt?.toISOString() ?? null,
    createdAt: client.createdAt.toISOString(),
  };
}
