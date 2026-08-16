import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The proportional system, held to its own claims.
 *
 * The design system asserts that its type scale is geometric on √2, that its
 * vertical rhythm uses the same progression, and that its human-factors
 * floors are real. Those are checkable statements, so they are checked here
 * rather than trusted, the same discipline the palette suite applies to
 * contrast, and the same reason: a proportional system nobody can verify is
 * decoration wearing the vocabulary of rigour.
 */

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`token --${name} not found in globals.css`);
  return match[1].trim();
}

const rem = (name: string): number => {
  const raw = token(name);
  const value = Number.parseFloat(raw);
  if (!raw.endsWith("rem") || Number.isNaN(value)) {
    throw new Error(`--${name} is "${raw}", expected a rem length`);
  }
  return value;
};

const ROOT2 = Math.SQRT2;
const ROOT3 = Math.sqrt(3);
const PHI = (1 + Math.sqrt(5)) / 2;

// The tokens are rounded to 4dp for legibility, so compare on ratio.
const closeTo = (actual: number, expected: number, tolerance = 0.001) =>
  Math.abs(actual / expected - 1) < tolerance;

describe("ratios are the constants they claim to be", () => {
  it.each([
    ["ratio-diagonal", ROOT2, "√2"],
    ["ratio-vesica", ROOT3, "√3"],
    ["ratio-golden", PHI, "φ"],
  ])("--%s equals %s", (name, expected) => {
    expect(closeTo(Number.parseFloat(token(name)), expected)).toBe(true);
  });
});

describe("the type scale is geometric on √2", () => {
  const steps = [
    "step-data",
    "step-body",
    "step-lead",
    "step-title",
    "step-display",
    "step-specimen",
  ];

  it("has every adjacent pair in the ratio √2", () => {
    const sizes = steps.map(rem);
    for (let i = 1; i < sizes.length; i += 1) {
      const ratio = sizes[i] / sizes[i - 1];
      expect(
        closeTo(ratio, ROOT2, 0.002),
        `${steps[i]} / ${steps[i - 1]} = ${ratio.toFixed(4)}, expected √2`,
      ).toBe(true);
    }
  });

  it("lands exact doublings on every second step, which is why √2 was chosen", () => {
    expect(rem("step-title") / rem("step-body")).toBeCloseTo(2, 3);
    expect(rem("step-specimen") / rem("step-title")).toBeCloseTo(2, 3);
    expect(rem("step-specimen") / rem("step-body")).toBeCloseTo(4, 3);
  });

  it("keeps body text at or above 1rem, below which mobile browsers zoom", () => {
    expect(rem("step-body")).toBeGreaterThanOrEqual(1);
  });
});

describe("vertical rhythm follows the same progression", () => {
  it("steps by √2 throughout", () => {
    const names = [
      "rhythm",
      "rhythm-2",
      "rhythm-3",
      "rhythm-4",
      "rhythm-5",
      "rhythm-6",
      "rhythm-7",
      "rhythm-8",
      "rhythm-9",
    ];
    const values = names.map(rem);
    for (let i = 1; i < values.length; i += 1) {
      const ratio = values[i] / values[i - 1];
      expect(
        closeTo(ratio, ROOT2, 0.002),
        `${names[i]} / ${names[i - 1]} = ${ratio.toFixed(4)}`,
      ).toBe(true);
    }
  });

  it("shares its root with the type scale rather than running a parallel system", () => {
    // rhythm-3 is the 1rem body step; the two scales are the same scale.
    expect(rem("rhythm-3")).toBeCloseTo(rem("step-body"), 4);
  });
});

describe("human-factors floors are real", () => {
  it("keeps the measure inside the 45–75 character band", () => {
    const ch = (name: string) => Number.parseFloat(token(name));
    expect(ch("measure-min")).toBeGreaterThanOrEqual(45);
    expect(ch("measure")).toBeGreaterThanOrEqual(45);
    expect(ch("measure")).toBeLessThanOrEqual(75);
    expect(ch("measure-max")).toBeLessThanOrEqual(75);
  });

  it("sets the touch-target floor at 44px or more", () => {
    expect(rem("target-min") * 16).toBeGreaterThanOrEqual(44);
  });

  it("sets body leading at 1.5 or more, per WCAG 1.4.12", () => {
    expect(Number.parseFloat(token("leading-body"))).toBeGreaterThanOrEqual(
      1.5,
    );
  });
});

describe("no orphan values", () => {
  it("derives every specimen font-size from a scale step", () => {
    const specimenBlock = css.slice(css.indexOf(".specimen-ordinal"));
    const sizes = [...specimenBlock.matchAll(/font-size:\s*([^;]+);/g)].map(
      (m) => m[1],
    );
    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) {
      expect(
        size.includes("var(--step-") || size.includes("var(--text-"),
        `font-size "${size}" is not drawn from the scale`,
      ).toBe(true);
    }
  });
});

describe("full-screen slides avoid the ways this pattern breaks", () => {
  const slideBlock = css.slice(
    css.indexOf(".slide-viewport {"),
    css.indexOf(".specimen {"),
  );

  it("sizes by min-block-size, never a fixed height, so tall content cannot clip", () => {
    expect(slideBlock).toContain("min-block-size");
    expect(/[^-]block-size:\s*100/.test(slideBlock)).toBe(false);
  });

  it("uses svh rather than vh, which on mobile is taller than the visible area", () => {
    expect(slideBlock).toContain("100svh");
    // vh survives only inside the @supports fallback for older engines.
    const outsideFallback = slideBlock.slice(0, slideBlock.indexOf("@supports"));
    expect(outsideFallback).not.toContain("100vh");
  });

  it("places content by dividing free space, not the viewport", () => {
    // Flex spacers in the ratio 1 : phi. Dividing the viewport height instead
    // pushes content below the fold on short screens.
    expect(slideBlock).toContain("flex: var(--ratio-golden)");
    expect(slideBlock).not.toContain("calc(100svh / var(--ratio-golden)");
  });

  it("snaps by proximity, never mandatory, and not at all under reduced motion", () => {
    // Check declarations, not prose: the comment explaining why mandatory is
    // wrong contains the word, and an assertion that cannot tell the
    // difference would fail on its own documentation.
    const declarations = [
      ...slideBlock.matchAll(/scroll-snap-type:\s*([^;]+);/g),
    ].map((m) => m[1].trim());
    expect(declarations).toContain("y proximity");
    expect(declarations.some((d) => d.includes("mandatory"))).toBe(false);
    expect(slideBlock).toContain("prefers-reduced-motion");
  });
});
