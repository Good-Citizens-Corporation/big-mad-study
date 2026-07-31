import { test, expect, type Page } from "@playwright/test";

/**
 * BM-E2E-04 — SLICE-04 (issue #12).
 * Entry-flow telemetry fires in a real browser, carrying no PII.
 */

const gherkinSteps = {
  landing: {
    load: "GIVEN a visitor loads `/`",
    fired:
      "WHEN the app initializes → THEN landingViewed fires with non-PII props",
    once: "WHEN they return to `/` → THEN landingViewed does not fire again",
  },
  cta: {
    click: "GIVEN a visitor clicks the primary screener CTA",
    fired:
      "WHEN the click happens → THEN startScreenerClicked fires with location_on_page",
  },
  supporting: {
    visit: "GIVEN a visitor navigates to /about",
    fired: "WHEN the page renders → THEN aboutPageViewed fires",
  },
  privacy: {
    audit: "GIVEN telemetry is enabled",
    clean: "WHEN every recorded event is inspected → THEN none carries PII",
  },
};

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

type RecordedEvent = { name: string; props: Record<string, unknown> };

const events = (page: Page): Promise<RecordedEvent[]> =>
  page.evaluate(
    () =>
      (window as { __bmTelemetry?: RecordedEvent[] }).__bmTelemetry ??
      ([] as RecordedEvent[]),
  );

const namesOf = async (page: Page) => (await events(page)).map((e) => e.name);

test("BM-E2E-04 – Entry-flow telemetry fires and stays free of PII", async ({
  page,
}) => {
  await runStep(gherkinSteps.landing.load, async () => {
    await page.goto("/");
  });

  await runStep(gherkinSteps.landing.fired, async () => {
    await expect(async () => {
      expect(await namesOf(page)).toContain("landingViewed");
    }).toPass({ timeout: 5000 });

    const landing = (await events(page)).find(
      (e) => e.name === "landingViewed",
    );
    expect(Object.keys(landing?.props ?? {}).sort()).toEqual([
      "device_type",
      "referrer_category",
    ]);
    expect(landing?.props.referrer_category).toBe("direct");
  });

  await runStep(gherkinSteps.landing.once, async () => {
    // Detour via /methods, not /about — visiting /about here would burn its
    // own once-per-session flag before the step that asserts it.
    await page.goto("/methods");
    await page.goto("/");
    const landingCount = (await namesOf(page)).filter(
      (n) => n === "landingViewed",
    ).length;
    expect(landingCount).toBe(0); // fresh buffer after reload; session guard held
  });

  await runStep(gherkinSteps.supporting.visit, async () => {
    await page.goto("/about");
  });

  await runStep(gherkinSteps.supporting.fired, async () => {
    await expect(async () => {
      expect(await namesOf(page)).toContain("aboutPageViewed");
    }).toPass({ timeout: 5000 });
  });

  await runStep(gherkinSteps.cta.click, async () => {
    await page.goto("/");
    // Do not follow the navigation: /start does not exist yet.
    await page
      .locator("section#top")
      .getByRole("link", { name: "Start here" })
      .click({ noWaitAfter: true });
  });

  await runStep(gherkinSteps.cta.fired, async () => {
    await expect(async () => {
      expect(await namesOf(page)).toContain("startScreenerClicked");
    }).toPass({ timeout: 5000 });

    const click = (await events(page)).find(
      (e) => e.name === "startScreenerClicked",
    );
    expect(click?.props).toHaveProperty("location_on_page", "top");
  });

  await runStep(gherkinSteps.privacy.audit, async () => {
    // Clear the session guard first, otherwise the reload produces an empty
    // buffer and the audit below would vacuously pass.
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    await expect(async () => {
      expect((await namesOf(page)).length).toBeGreaterThan(0);
    }).toPass({ timeout: 5000 });
  });

  await runStep(gherkinSteps.privacy.clean, async () => {
    const recorded = await events(page);
    expect(recorded.length).toBeGreaterThan(0);

    const forbidden = /email|phone|(^|_)name($|_)|address|(^|_)ip($|_)/i;
    for (const event of recorded) {
      for (const key of Object.keys(event.props)) {
        expect(key, `${event.name}.${key}`).not.toMatch(forbidden);
      }
    }
  });
});
