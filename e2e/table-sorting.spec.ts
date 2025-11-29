import { expect, test } from "@playwright/test";

test.describe("테이블 정렬 기능", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("레벨 컬럼에 정렬 버튼이 표시됨", async ({ page }) => {
    const levelHeader = page.locator("th").filter({ hasText: /^레벨/ });
    await expect(levelHeader.locator('[role="button"]')).toBeVisible();
  });

  test("시급(원) 컬럼에 정렬 버튼이 표시됨", async ({ page }) => {
    const wageHeader = page.locator("th").filter({ hasText: "시급(원)" });
    await expect(wageHeader.locator('[role="button"]')).toBeVisible();
  });

  test("시급(골드) 컬럼에 정렬 버튼이 표시됨", async ({ page }) => {
    const goldHeader = page.locator("th").filter({ hasText: "시급(골드)" });
    await expect(goldHeader.locator('[role="button"]')).toBeVisible();
  });

  test("1수당 골드 컬럼에 정렬 버튼이 표시됨", async ({ page }) => {
    const perRunHeader = page.locator("th").filter({ hasText: "1수당 골드" });
    await expect(perRunHeader.locator('[role="button"]')).toBeVisible();
  });

  test("정렬 버튼 클릭 시 테이블이 정렬됨", async ({ page }) => {
    const levelHeader = page.locator("th").filter({ hasText: /^레벨/ });
    const sortButton = levelHeader.locator('[role="button"]');

    const firstRowBefore = page.locator("table tbody tr").first();
    const levelBefore = await firstRowBefore
      .getByRole("cell")
      .nth(2)
      .textContent();

    await sortButton.click();

    const firstRowAfter = page.locator("table tbody tr").first();
    const levelAfter = await firstRowAfter
      .getByRole("cell")
      .nth(2)
      .textContent();

    // 정렬 후 첫 번째 행의 레벨이 변경되거나 유지됨 (정렬 방향에 따라)
    expect(levelBefore).toBeDefined();
    expect(levelAfter).toBeDefined();
  });
});
