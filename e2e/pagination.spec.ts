import { expect, test } from "@playwright/test";

test.describe("페이지네이션", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/item-price-list");
  });

  test("유물 각인서 섹션에 페이지네이션이 표시됨", async ({ page }) => {
    const pagination = page.getByRole("navigation", { name: "pagination" });
    await expect(pagination).toBeVisible();
  });

  test("페이지 버튼들이 표시됨", async ({ page }) => {
    const pagination = page.getByRole("navigation", { name: "pagination" });
    await expect(pagination.getByRole("button", { name: "page 1" })).toBeVisible();
  });

  test("다음 페이지 버튼 클릭 시 페이지가 변경됨", async ({ page }) => {
    const pagination = page.getByRole("navigation", { name: "pagination" });
    const nextButton = pagination.getByRole("button", { name: "next page" });

    await nextButton.click();

    // 페이지 2가 선택됨
    await expect(
      pagination.getByRole("button", { name: "page 2" })
    ).toBeVisible();
  });
});
