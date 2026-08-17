/**
 * Skill vocabulary helpers — shared by every entity that tags itself with
 * skills (candidate profiles, jobs). Pure functions: no Prisma, no Zod.
 */

/**
 * The case/space-insensitive identity of a tag, so "React.js", "react js"
 * and " REACT-JS " all collapse into one searchable `react-js`.
 */
export function skillSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deduplicates free-text tags by slug, preserving first-seen order. */
export function dedupeSkillNames(names: ReadonlyArray<string>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of names) {
    const name = raw.trim();
    const slug = skillSlug(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(name);
  }
  return out;
}
