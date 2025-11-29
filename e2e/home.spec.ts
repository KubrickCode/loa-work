import { expect, test } from "@playwright/test";

test.describe("홈 페이지", () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // 비로그인 상태로 테스트

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지가 정상적으로 로드됨", async ({ page }) => {
    await expect(page).toHaveTitle(/로직장/);
  });

  test("백엔드에서 골드 환율을 표시함", async ({ page }) => {
    const exchangeRateButton = page.getByRole("button", {
      name: /골드 환율 설정/,
    });
    await expect(exchangeRateButton).toBeVisible();
    await expect(exchangeRateButton).toContainText(/\d+:\d+/);
  });

  test("백엔드에서 컨텐츠 시급 목록을 로드함", async ({ page }) => {
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });
});
