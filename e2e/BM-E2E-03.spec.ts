import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";

/**
 * BM-E2E-03 — SLICE-03 (issue #11).
 * Accessibility baseline across every top-level page.
 *
 * This is the automated floor, not the whole story: axe catches roughly a
 * third of real barriers. The keyboard and heading checks below cover things
 * axe cannot see, and manual screen-reader passes remain necessary.
 */

const PAGES = [
  { path: "/", name: "landing" },
  { path: "/about", name: "about" },
  { path: "/methods", name: "methods" },
  { path: "/participants", name: "participants" },
];

const acVerboseFlag = (process.env.AC_VERBOSE ?? "").toLowerCase();
const logPasses = acVerboseFlag === "1" || acVerboseFlag === "true";

const runStep = async (description: string, fn: () => Promise<void>) => {
  try {
    await fn();
    if (logPasses) console.info(`[AC PASS] ${description}`);
  } catch (error) {
    console.error(`[AC FAIL] ${description}`);
    throw error;
  }
};

const scan = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

test.describe("BM-E2E-03 – Accessibility baseline", () => {
  for (const { path, name } of PAGES) {
    test(`${name} (${path}) has no WCAG A/AA violations`, async ({ page }) => {
      await runStep(
        `GIVEN a user with assistive technology opens ${path} WHEN the page is scanned THEN no WCAG A/AA violation is reported`,
        async () => {
          await page.goto(path);
          const results = await scan(page);

          // Name the rules rather than dumping the object — a bare count
          // tells a reader nothing about what broke.
          const summary = results.violations.map(
            (v) => `${v.id} (${v.impact}) ×${v.nodes.length}`,
          );
          expect(summary, `violations on ${path}`).toEqual([]);
        },
      );
    });

    test(`${name} (${path}) has exactly one h1 and no skipped heading levels`, async ({
      page,
    }) => {
      await runStep(
        `GIVEN a screen reader user navigates ${path} by heading WHEN they traverse the hierarchy THEN there is a single h1 and no level is skipped`,
        async () => {
          await page.goto(path);

          const levels = await page
            .locator("h1, h2, h3, h4, h5, h6")
            .evaluateAll((nodes) =>
              nodes.map((node) => Number(node.tagName.slice(1))),
            );

          expect(
            levels.filter((l) => l === 1),
            `h1 count on ${path}`,
          ).toHaveLength(1);
          expect(levels[0], `first heading on ${path}`).toBe(1);

          for (let i = 1; i < levels.length; i += 1) {
            expect(
              levels[i] - levels[i - 1],
              `heading jump at index ${i} on ${path} (${levels.join(",")})`,
            ).toBeLessThanOrEqual(1);
          }
        },
      );
    });
  }

  test("landmarks let a screen reader reach main content directly", async ({
    page,
  }) => {
    await runStep(
      "GIVEN a screen reader user visits any top-level page WHEN they navigate by landmark THEN banner, main and contentinfo are present exactly once",
      async () => {
        for (const { path } of PAGES) {
          await page.goto(path);
          await expect(page.getByRole("main"), `main on ${path}`).toHaveCount(
            1,
          );
          await expect(
            page.getByRole("contentinfo"),
            `contentinfo on ${path}`,
          ).toHaveCount(1);
          await expect(
            page.getByRole("banner"),
            `banner on ${path}`,
          ).toHaveCount(1);
        }
      },
    );
  });

  test("keyboard focus is always visible and never trapped", async ({
    page,
  }) => {
    await runStep(
      "GIVEN a keyboard-only user tabs through the landing page WHEN focus moves THEN it is visible, ordered, and escapable",
      async () => {
        await page.goto("/");

        const seen: string[] = [];

        for (let i = 0; i < 25; i += 1) {
          await page.keyboard.press("Tab");

          const focused = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement | null;
            if (!el || el === document.body) return null;

            // The Next.js dev-tools overlay is focusable and unstyled, but it
            // exists only because this harness runs `yarn dev`. It is not part
            // of the product and no visitor will ever reach it.
            if (el.tagName.toLowerCase() === "nextjs-portal") {
              return { tag: "nextjs-portal", label: "", hasIndicator: true };
            }

            const style = getComputedStyle(el);
            const outlineWidth = parseFloat(style.outlineWidth || "0");
            return {
              tag: el.tagName.toLowerCase(),
              label: (el.textContent ?? "").trim().slice(0, 40),
              // Any of these is an acceptable focus affordance.
              hasIndicator:
                (style.outlineStyle !== "none" && outlineWidth > 0) ||
                style.boxShadow !== "none" ||
                style.textDecorationLine.includes("underline"),
            };
          });

          if (!focused) break;

          expect(
            focused.hasIndicator,
            `no visible focus indicator on <${focused.tag}> "${focused.label}"`,
          ).toBe(true);

          seen.push(`${focused.tag}:${focused.label}`);
        }

        // Something must be reachable, and tabbing must not cycle forever on
        // one element — the signature of a focus trap.
        expect(seen.length).toBeGreaterThan(3);
        expect(new Set(seen).size).toBeGreaterThan(1);
      },
    );
  });
});
