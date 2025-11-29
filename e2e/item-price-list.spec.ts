import { expect, test } from "@playwright/test";

test.describe("아이템 시세 페이지", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/item-price-list");
  });

  test("기본 탭(거래소 아이템)이 선택되어 있음", async ({ page }) => {
    const marketTab = page.getByRole("tab", { name: "거래소 아이템" });
    await expect(marketTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "재련 재료" })).toBeVisible();
  });

  test("경매장 아이템 탭 클릭 시 URL과 콘텐츠가 변경됨", async ({ page }) => {
    await page.getByRole("tab", { name: "경매장 아이템" }).click();

    await expect(page).toHaveURL(/tab=auction-item/);

    const auctionTab = page.getByRole("tab", { name: "경매장 아이템" });
    await expect(auctionTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "겁화의 보석" })).toBeVisible();
  });

  test("기타 아이템 탭 클릭 시 URL과 콘텐츠가 변경됨", async ({ page }) => {
    await page.getByRole("tab", { name: "기타 아이템" }).click();

    await expect(page).toHaveURL(/tab=extra-item/);

    const extraTab = page.getByRole("tab", { name: "기타 아이템" });
    await expect(extraTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "기타 아이템" })).toBeVisible();
  });

  test("각 탭에 테이블 데이터가 로드됨", async ({ page }) => {
    // 거래소 아이템 탭
    let tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);

    // 경매장 아이템 탭
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);

    // 기타 아이템 탭
    await page.getByRole("tab", { name: "기타 아이템" }).click();
    tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });
});
