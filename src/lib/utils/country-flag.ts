/**
 * countryFlag — ISO 3166-1 alpha-2 country code → emoji flag.
 *
 * Uses the Unicode regional-indicator-symbol formula: two consecutive
 * letters in the range U+1F1E6 (A) through U+1F1FF (Z) form the
 * flag glyph in supporting fonts. No lookup table needed; works for
 * every valid ISO-2 code.
 *
 * Examples:
 *   countryFlag("US") → "🇺🇸"
 *   countryFlag("BR") → "🇧🇷"
 *   countryFlag("SE") → "🇸🇪"
 *
 * Defensive: returns empty string for invalid input rather than
 * throwing, so a missing/typo country code degrades gracefully in
 * UI rather than crashing the render.
 */

const A_CODE = "A".charCodeAt(0);
const REGIONAL_BASE = 0x1f1e6;

export function countryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "";
  const code = countryCode.toUpperCase();
  const c0 = code.charCodeAt(0);
  const c1 = code.charCodeAt(1);
  /* Validate both chars are letters A-Z. */
  if (c0 < A_CODE || c0 > A_CODE + 25) return "";
  if (c1 < A_CODE || c1 > A_CODE + 25) return "";
  return String.fromCodePoint(
    REGIONAL_BASE + (c0 - A_CODE),
    REGIONAL_BASE + (c1 - A_CODE),
  );
}
