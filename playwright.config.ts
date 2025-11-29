import { defineConfig, devices } from "@playwright/test";

import { AUTH_FILE, BACKEND_URL, FRONTEND_URL } from "./e2e/constants";

const WEBSERVER_TIMEOUT_MS = 3 * 60 * 1000;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: FRONTEND_URL,
    trace: process.env.CI ? "on-first-retry" : "on",
    screenshot: process.env.CI ? "only-on-failure" : "on",
    video: process.env.CI ? "retain-on-failure" : "on",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      testMatch: /.*\.auth\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_FILE,
      },
    },
    {
      name: "chromium-no-auth",
      testIgnore: /.*\.auth\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command:
        'cd src/backend && DATABASE_URL="postgres://postgres:postgres@localhost:5432/test?pool_timeout=60" PRISMA_CLIENT_ENGINE_TYPE=binary PORT=3001 NODE_ENV=development GOOGLE_CLIENT_ID=dummy GOOGLE_CLIENT_SECRET=dummy DISCORD_CLIENT_ID=dummy DISCORD_CLIENT_SECRET=dummy KAKAO_CLIENT_ID=dummy KAKAO_CLIENT_SECRET=dummy DISCORD_GOLD_EXCHANGE_RATE_WEBHOOK_URL=https://discord.com/api/webhooks/dummy pnpm start:dev',
      url: `${BACKEND_URL}/graphql`,
      reuseExistingServer: !process.env.CI,
      timeout: WEBSERVER_TIMEOUT_MS,
    },
    {
      command: "cd src/frontend && PLAYWRIGHT=1 pnpm dev",
      url: FRONTEND_URL,
      reuseExistingServer: !process.env.CI,
      timeout: WEBSERVER_TIMEOUT_MS,
    },
  ],
});
