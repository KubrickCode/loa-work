import { expect, test } from "@playwright/test";

test.describe("컨텐츠별 보상 페이지", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("네비게이션을 통해 페이지가 정상적으로 로드됨", async ({ page }) => {
    await page.getByRole("button", { name: "컨텐츠별 보상" }).click();

    await expect(page).toHaveURL("/content-reward-list");
    await expect(page).toHaveTitle(/컨텐츠별 보상.*로직장/);
  });

  test("테이블 헤더가 올바르게 표시됨", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    const expectedHeaders = [
      "관리",
      "종류",
      "레벨",
      "이름",
      "골드",
      "운명의 파편",
      "운명의 돌파석",
      "운명의 파괴석",
      "운명의 수호석",
      "1레벨 보석",
      "용암의 숨결",
      "빙하의 숨결",
      "실링",
      "카드 경험치",
    ];

    for (const header of expectedHeaders) {
      await expect(
        page.locator("th").filter({ hasText: new RegExp(`^${header}$`) })
      ).toBeVisible();
    }
  });

  test("테이블 데이터가 로드됨", async ({ page }) => {
    await page.goto("/content-reward-list");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });
});
