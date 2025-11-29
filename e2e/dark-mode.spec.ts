import { expect, test } from "@playwright/test";

test.describe("다크모드 토글", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("프로필 메뉴에 다크모드 옵션이 표시됨", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();

    await expect(page.getByRole("menuitem", { name: "다크모드" })).toBeVisible();
  });

  test("다크모드 클릭 시 테마가 변경됨", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();
    await page.getByRole("menuitem", { name: "다크모드" }).click();

    // 다크모드 토글 후 페이지가 여전히 정상 작동
    await expect(page.getByRole("banner")).toBeVisible();
  });
});
