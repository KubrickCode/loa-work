import { expect, test } from "@playwright/test";

test.describe("아이템 시세 아코디언", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/item-price-list");
  });

  test("재련 재료 아코디언이 기본으로 펼쳐져 있음", async ({ page }) => {
    const accordion = page.getByRole("button", { name: "재련 재료" });
    await expect(accordion).toHaveAttribute("aria-expanded", "true");
  });

  test("아코디언 클릭 시 접힘", async ({ page }) => {
    const accordion = page.getByRole("button", { name: "재련 재료" });
    await accordion.click();

    await expect(accordion).toHaveAttribute("aria-expanded", "false");
  });

  test("접힌 아코디언 클릭 시 펼쳐짐", async ({ page }) => {
    const accordion = page.getByRole("button", { name: "재련 재료" });

    // 접기
    await accordion.click();
    await expect(accordion).toHaveAttribute("aria-expanded", "false");

    // 펼치기
    await accordion.click();
    await expect(accordion).toHaveAttribute("aria-expanded", "true");
  });
});
