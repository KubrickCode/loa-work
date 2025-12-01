import { expect, test } from "@playwright/test";

test.describe("Table Empty State", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("should show empty state message when search has no results", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", { name: "검색..." });

    await searchInput.fill("NonExistentContent123456789");
    await searchInput.press("Enter");

    await expect(page.getByText("조회된 데이터가 없습니다")).toBeVisible();

    const rowCount = await page.locator("table tbody tr").count();
    expect(rowCount).toBe(1);
  });

  test("should restore table when clearing search after empty state", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", { name: "검색..." });

    // Search non-existent content
    await searchInput.fill("NonExistentContent123456789");
    await searchInput.press("Enter");
    await expect(page.getByText("조회된 데이터가 없습니다")).toBeVisible();

    // Clear search
    await searchInput.clear();
    await searchInput.press("Enter");

    // Table should be restored
    await expect(async () => {
      const rowCount = await page.locator("table tbody tr").count();
      expect(rowCount).toBeGreaterThan(1);
    }).toPass({ timeout: 5000 });
  });
});
