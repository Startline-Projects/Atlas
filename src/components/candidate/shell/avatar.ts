/**
 * Avatar helpers for candidates without a photo. Pure functions — safe in
 * Server and Client Components alike.
 */

/** Two-letter initials: "Lina Haddad" → "LH", "Cher" → "C". */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * The same soft pastel pairs the marketing hero cards use for their avatars
 * (`hero.tsx`) plus the mock candidate's, so a real candidate's placeholder
 * looks like the rest of the brand. Picked by a stable hash of the id: the
 * same candidate always gets the same colours; two candidates rarely share.
 */
const GRADIENTS: ReadonlyArray<{ from: string; to: string }> = [
  { from: "#a4b5d8", to: "#4d6699" },
  { from: "#FFD6A5", to: "#FFA07A" },
  { from: "#A8C8FF", to: "#6A8EFF" },
  { from: "#D6F24D", to: "#A8D821" },
  { from: "#e9c8e2", to: "#9a5b8f" },
  { from: "#bfe3c0", to: "#3f8f5a" },
];

export function avatarGradientFor(seed: string): { from: string; to: string } {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  // GRADIENTS is a non-empty literal, so the index always resolves.
  return GRADIENTS[hash % GRADIENTS.length] ?? { from: "#a4b5d8", to: "#4d6699" };
}
