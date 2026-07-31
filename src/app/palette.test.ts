import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contrast guard for the design system tokens.
 *
 * The values are read out of globals.css rather than duplicated here, so
 * editing a token to something unreadable fails this suite instead of
 * silently shipping. Ratios follow WCAG 2.1 relative luminance.
 */

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} not found in globals.css`);
  return match[1];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

const paper = token("paper");
const paperAlt = token("paper-alt");
const grounds: Array<[string, string]> = [
  ["paper", paper],
  ["paper-alt", paperAlt],
];

describe("palette contrast", () => {
  // These carry copy at normal size, so AAA is 7:1. --accent is in the list
  // because it sets the slide markers and the primary action label, not just
  // their borders.
  describe.each([
    ["ink", token("ink")],
    ["ink-soft", token("ink-soft")],
    ["accent", token("accent")],
  ])("%s", (_name, fg) => {
    it.each(grounds)("meets WCAG AAA on %s", (_ground, bg) => {
      expect(contrast(fg, bg)).toBeGreaterThanOrEqual(7);
    });
  });

  // 1.4.11 non-text contrast: --rule bounds interactive controls.
  describe("rule", () => {
    it.each(grounds)("meets 3:1 non-text contrast on %s", (_ground, bg) => {
      expect(contrast(token("rule"), bg)).toBeGreaterThanOrEqual(3);
    });
  });

  // Good Citizens' signal set, re-grounded for paper. These are reference
  // tokens for cohort labelling later, so AA is the bar rather than AAA.
  describe.each([
    ["signal-teal", token("signal-teal")],
    ["signal-yellow", token("signal-yellow")],
    ["signal-magenta", token("signal-magenta")],
    ["signal-green", token("signal-green")],
    ["signal-red", token("signal-red")],
  ])("%s", (_name, fg) => {
    it("meets WCAG AA on paper", () => {
      expect(contrast(fg, paper)).toBeGreaterThanOrEqual(4.5);
    });
  });

  // --hairline is deliberately below 3:1. It is decorative only, and this
  // asserts it stays that way: if it ever bounds a control, use --rule.
  it("keeps hairline decorative", () => {
    expect(contrast(token("hairline"), paper)).toBeLessThan(3);
  });
});
