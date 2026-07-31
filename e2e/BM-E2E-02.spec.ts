import { test, expect } from "@playwright/test";

/**
 * BM-E2E-02 — SLICE-02 (issue #10).
 * Visitor can read the intro and find the ethical/data-handling explanation.
 */

const gherkinSteps = {
  intro: {
    open: "GIVEN a visitor lands on `/`",
    hero: "WHEN the page loads → THEN the hero names the study",
    about:
      "WHEN they read the first section → THEN it explains what the study is about",
    bullets:
      "THEN it answers who it's for, time commitment, and what they get back",
  },
  provenance: {
    scan: "GIVEN a visitor wants to know who's behind this",
    named:
      "WHEN they scan the landing page → THEN Good Citizens is named and linked",
  },
  ethics: {
    look: "GIVEN a visitor cares about ethics",
    find: "WHEN they look for more detail → THEN a data-handling link is offered",
    follow: "WHEN they follow it → THEN they land on the methods page",
  },
  telemetry: {
    fired:
      "GIVEN telemetry is wired → WHEN an info section enters the viewport → THEN landingInfoSectionViewed is emitted",
  },
};

const acVerboseFlag = (process.env.AC_VERBOSE ?? "").toLowerCase();
const logPasses = acVerboseFlag === "1" || acVerboseFlag === "true";

const runStep = async (description: string, fn: () => Promise<void>) => {
  try {
    await fn();
    if (logPasses) {
      console.info(`[AC PASS] ${description}`);
    }
  } catch (error) {
    console.error(`[AC FAIL] ${description}`);
    throw error;
  }
};

test("BM-E2E-02 – Visitor reads the intro and finds the data-handling explanation", async ({
  page,
}) => {
  await runStep(gherkinSteps.intro.open, async () => {
    await page.goto("/");
  });

  await runStep(gherkinSteps.intro.hero, async () => {
    await expect(
      page.getByRole("heading", { name: "The Big-Mad Behavioral Study" }),
    ).toBeVisible();
  });

  const about = page.locator("section#about-the-study");

  await runStep(gherkinSteps.intro.about, async () => {
    await expect(
      about.getByRole("heading", { name: "What this study is about" }),
    ).toBeVisible();
  });

  await runStep(gherkinSteps.intro.bullets, async () => {
    const bullets = about.getByRole("listitem");
    await expect(bullets).toHaveCount(4);
    const text = (await bullets.allTextContents()).join(" ");
    expect(text).toMatch(/who it's for/i);
    expect(text).toMatch(/time commitment/i);
    expect(text).toMatch(/what you get back/i);
  });

  const behind = page.locator("section#whos-behind-this");

  await runStep(gherkinSteps.provenance.scan, async () => {
    await behind.scrollIntoViewIfNeeded();
  });

  await runStep(gherkinSteps.provenance.named, async () => {
    await expect(
      behind.getByRole("heading", { name: "Who's behind this" }),
    ).toBeVisible();
    await expect(
      behind.getByRole("link", { name: "Good Citizens" }),
    ).toHaveAttribute("href", "https://goodcitizens.us");
  });

  await runStep(gherkinSteps.telemetry.fired, async () => {
    const events = await page.evaluate(
      () =>
        (window as { __bmTelemetry?: { name: string }[] }).__bmTelemetry ?? [],
    );
    expect(events.some((e) => e.name === "landingInfoSectionViewed")).toBe(
      true,
    );
  });

  const dataLink = about.getByRole("link", { name: "How we handle data" });

  await runStep(gherkinSteps.ethics.look, async () => {
    await about.scrollIntoViewIfNeeded();
  });

  await runStep(gherkinSteps.ethics.find, async () => {
    await expect(dataLink).toBeVisible();
    await expect(dataLink).toHaveAttribute("href", "/methods");
  });

  await runStep(gherkinSteps.ethics.follow, async () => {
    await dataLink.click();
    await expect(page).toHaveURL(/\/methods$/);
    await expect(
      page.getByRole("heading", { name: "Research Methods" }),
    ).toBeVisible();
  });
});
