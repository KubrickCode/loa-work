import { expect, test } from "@playwright/test";

test.describe("404 Not Found 페이지", () => {
  test("존재하지 않는 URL 접근 시 404 페이지 표시", async ({ page }) => {
    await page.goto("/not-found-test");

    await expect(page).toHaveTitle("404 Not Found | 로직장");
    await expect(page.getByText("존재하지 않는 페이지입니다.")).toBeVisible();
  });

  test("404 페이지에서 네비게이션 정상 작동", async ({ page }) => {
    await page.goto("/non-existent-page");

    // 네비게이션 버튼들이 표시됨
    await expect(page.getByRole("button", { name: "컨텐츠별 시급" })).toBeVisible();
    await expect(page.getByRole("button", { name: "컨텐츠별 보상" })).toBeVisible();
    await expect(page.getByRole("button", { name: "아이템 시세" })).toBeVisible();

    // 로고 클릭 시 홈으로 이동
    await page.getByRole("link", { name: "로직장 홈으로 이동" }).click();
    await expect(page).toHaveURL("/");
  });
});
