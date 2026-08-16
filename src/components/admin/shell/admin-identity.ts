/**
 * The slice of the admin session the console chrome needs. Plain data (no
 * `Date`s) so a Server Component can hand it to Client Components as a prop.
 */
export interface AdminIdentity {
  fullName: string;
  email: string;
  /** "Operations Admin" — shown under the name in the avatar menu. */
  title: string;
}

/** "Aïsha Okafor" → "AO". */
export function adminInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
