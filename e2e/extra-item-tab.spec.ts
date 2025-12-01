import { expect, test } from "@playwright/test";

test.describe("기타 아이템 탭 (비로그인)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("비로그인 시 기타 아이템 탭 정상 동작", async ({ page }) => {
    await page.goto("/item-price-list?tab=extra-item");

    const extraRegion = page.getByRole("region", { name: "기타 아이템" });
    await expect(extraRegion).toBeVisible({ timeout: 15000 });

    const table = extraRegion.locator("table");
    await expect(table).toBeVisible();

    const rows = table.locator("tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
  });

  test("비로그인 상태에서 탭 전환 정상 동작", async ({ page }) => {
    await page.goto("/item-price-list");

    await page.getByRole("tab", { name: "기타 아이템" }).click();
    await expect(
      page.getByRole("region", { name: "기타 아이템" }),
    ).toBeVisible();

    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await expect(page.getByRole("button", { name: "겁화의 보석" })).toBeVisible();
  });
});
