import { expect, test } from "@playwright/test";

test.describe("푸터 팝업", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("수집 현황 클릭 시 팝업이 표시됨", async ({ page }) => {
    await page.getByText("수집 현황").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/거래소 아이템/)).toBeVisible();
  });

  test("수집 현황 팝업에 업데이트 시간이 표시됨", async ({ page }) => {
    await page.getByText("수집 현황").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText(/경매장 아이템/)).toBeVisible();
  });

  test("후원 안내 클릭 시 팝업이 표시됨", async ({ page }) => {
    await page.getByText("후원 안내").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
  });
});
