import { expect, test } from "@playwright/test";

test.describe("키보드 네비게이션", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("Tab 키로 네비게이션 요소 간 이동 가능", async ({ page }) => {
    await page.goto("/");

    // Tab으로 로고 링크로 이동
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "로직장 홈으로 이동" })).toBeFocused();

    // Tab으로 컨텐츠별 시급 버튼으로 이동
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "컨텐츠별 시급" })).toBeFocused();

    // Tab으로 컨텐츠별 보상 버튼으로 이동
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "컨텐츠별 보상" })).toBeFocused();

    // Tab으로 아이템 시세 버튼으로 이동
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "아이템 시세" })).toBeFocused();
  });

  test("Enter 키로 버튼 활성화 가능", async ({ page }) => {
    await page.goto("/");

    // Tab으로 컨텐츠별 보상 버튼으로 이동
    await page.keyboard.press("Tab"); // 로고
    await page.keyboard.press("Tab"); // 컨텐츠별 시급
    await page.keyboard.press("Tab"); // 컨텐츠별 보상

    // Enter로 활성화
    await page.keyboard.press("Enter");

    // 페이지 이동 확인
    await expect(page).toHaveURL("/content-reward-list");
  });
});
