import { test, expect } from "@playwright/test";

const gherkinSteps = {
  landing: {
    open: "GIVEN a visitor opens `/`",
    landmarks:
      "WHEN navigating by landmarks and headings → THEN they encounter the expected landmarks",
    hero: "WHEN the page loads → THEN the hero heading + nav links are visible",
  },
  aboutNav: {
    click: "GIVEN a visitor clicks the About nav link",
    when: "WHEN they navigate to the target route",
    then: "THEN they see a simple, non-error page with a clear page title for About the Study",
  },
  methodsNav: {
    click: "GIVEN a visitor clicks the Methods nav link",
    when: "WHEN they navigate to the target route",
    then: "THEN they see a simple, non-error page with a clear page title for Research Methods",
  },
  participantsNav: {
    click: "GIVEN a visitor clicks the Participants nav link",
    when: "WHEN they navigate to the target route",
    then: "THEN they see a simple, non-error page with a clear page title for Participants",
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

test("BM-E2E-01 – Landing → About → Methods → Participants navigation happy path", async ({
  page,
}) => {
  await runStep(gherkinSteps.landing.open, async () => {
    await page.goto("/");
  });

  await runStep(gherkinSteps.landing.landmarks, async () => {
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  let primaryNav = page.getByRole("navigation", { name: "Primary" });

  await runStep(gherkinSteps.landing.hero, async () => {
    await expect(
      page.getByRole("heading", { name: "Welcome to the Big Mad Study" }),
    ).toBeVisible();
    primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(
      primaryNav.getByRole("link", { name: "Methods" }),
    ).toBeVisible();
    await expect(
      primaryNav.getByRole("link", { name: "Participants" }),
    ).toBeVisible();
  });

  await runStep(gherkinSteps.aboutNav.click, async () => {
    await primaryNav.getByRole("link", { name: "About" }).click();
  });
  await runStep(gherkinSteps.aboutNav.when, async () => {
    await expect(page).toHaveURL(/\/about$/);
  });
  await runStep(gherkinSteps.aboutNav.then, async () => {
    await expect(
      page.getByRole("heading", { name: "About the Study" }),
    ).toBeVisible();
  });

  await runStep(gherkinSteps.methodsNav.click, async () => {
    await primaryNav.getByRole("link", { name: "Methods" }).click();
  });
  await runStep(gherkinSteps.methodsNav.when, async () => {
    await expect(page).toHaveURL(/\/methods$/);
  });
  await runStep(gherkinSteps.methodsNav.then, async () => {
    await expect(
      page.getByRole("heading", { name: "Research Methods" }),
    ).toBeVisible();
  });

  await runStep(gherkinSteps.participantsNav.click, async () => {
    await primaryNav.getByRole("link", { name: "Participants" }).click();
  });
  await runStep(gherkinSteps.participantsNav.when, async () => {
    await expect(page).toHaveURL(/\/participants$/);
  });
  await runStep(gherkinSteps.participantsNav.then, async () => {
    await expect(
      page.getByRole("heading", { name: "Participants" }),
    ).toBeVisible();
  });
});
