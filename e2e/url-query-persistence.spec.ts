import { expect, test } from "@playwright/test";

test.describe("URL Query Parameter Persistence", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("should update URL when switching tabs on item price list", async ({
    page,
  }) => {
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();

    // Initial URL should not have tab parameter (default tab)
    expect(page.url()).not.toContain("tab=");

    // Click auction item tab
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.locator("table tbody tr").first().waitFor();

    // URL should now contain tab=auction-item
    expect(page.url()).toContain("tab=auction-item");
  });

  test("should persist tab selection after page refresh", async ({ page }) => {
    // Navigate directly to auction item tab
    await page.goto("/item-price-list?tab=auction-item");
    await page.locator("table tbody tr").first().waitFor();

    // Verify auction item tab is selected
    await expect(
      page.getByRole("tab", { name: "경매장 아이템" })
    ).toHaveAttribute("aria-selected", "true");

    // Refresh page
    await page.reload();
    await page.locator("table tbody tr").first().waitFor();

    // Tab should still be selected after refresh
    await expect(
      page.getByRole("tab", { name: "경매장 아이템" })
    ).toHaveAttribute("aria-selected", "true");
    expect(page.url()).toContain("tab=auction-item");
  });

  test("should persist extra item tab selection", async ({ page }) => {
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();

    // Click extra item tab
    await page.getByRole("tab", { name: "기타 아이템" }).click();

    // URL should contain tab=extra-item
    await expect(async () => {
      expect(page.url()).toContain("tab=extra-item");
    }).toPass({ timeout: 5000 });

    // Verify extra item tab is selected
    await expect(
      page.getByRole("tab", { name: "기타 아이템" })
    ).toHaveAttribute("aria-selected", "true");
  });
});
