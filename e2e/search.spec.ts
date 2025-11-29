import { expect, test } from "@playwright/test";

test.describe("검색 기능", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("검색 입력란이 표시됨", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "검색..." })).toBeVisible();
  });

  test("검색어 입력 시 테이블이 필터링됨", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: "검색..." });
    const initialCount = await page.locator("table tbody tr").count();

    await searchInput.fill("베히모스");
    await searchInput.press("Enter");

    // 검색 결과가 필터링되어 행 수가 줄어듦
    await expect(async () => {
      const count = await page.locator("table tbody tr").count();
      expect(count).toBeLessThan(initialCount);
    }).toPass({ timeout: 10000 });

    await expect(page.locator("table tbody tr").first()).toContainText(
      "베히모스"
    );
  });

  test("검색어 삭제 시 전체 목록이 복원됨", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: "검색..." });

    await searchInput.fill("베히모스");
    await page.waitForTimeout(500);

    await searchInput.clear();
    await page.waitForTimeout(500);

    // 전체 목록이 복원됨
    const tableRows = await page.locator("table tbody tr").count();
    expect(tableRows).toBeGreaterThan(1);
  });
});
