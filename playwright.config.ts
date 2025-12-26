import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
