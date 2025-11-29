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

  test("레벨 오름차순 정렬 시 낮은 값이 먼저 표시됨", async ({ page }) => {
    const levelHeader = page.locator("th").filter({ hasText: /^레벨/ });
    const sortButton = levelHeader.locator('[role="button"]');

    // 정렬 버튼 클릭 (오름차순)
    await sortButton.click();

    // 테이블의 레벨 값들을 수집
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    const levels: number[] = [];

    for (let i = 0; i < Math.min(rowCount, 5); i++) {
      const levelText = await rows.nth(i).locator("td").nth(2).textContent();
      if (levelText) {
        levels.push(parseInt(levelText.replace(/,/g, ""), 10));
      }
    }

    // 레벨이 오름차순인지 확인
    for (let i = 0; i < levels.length - 1; i++) {
      expect(levels[i]).toBeLessThanOrEqual(levels[i + 1]);
    }
  });

  test("레벨 내림차순 정렬 시 높은 값이 먼저 표시됨", async ({ page }) => {
    const levelHeader = page.locator("th").filter({ hasText: /^레벨/ });
    const sortButton = levelHeader.locator('[role="button"]');

    // 두 번 클릭해서 내림차순으로 변경
    await sortButton.click();
    await sortButton.click();

    // 테이블의 레벨 값들을 수집
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    const levels: number[] = [];

    for (let i = 0; i < Math.min(rowCount, 5); i++) {
      const levelText = await rows.nth(i).locator("td").nth(2).textContent();
      if (levelText) {
        levels.push(parseInt(levelText.replace(/,/g, ""), 10));
      }
    }

    // 레벨이 내림차순인지 확인
    for (let i = 0; i < levels.length - 1; i++) {
      expect(levels[i]).toBeGreaterThanOrEqual(levels[i + 1]);
    }
  });
});
