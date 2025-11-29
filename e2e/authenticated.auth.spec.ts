import { expect, test } from "@playwright/test";

import { E2E_USER_DISPLAY_NAME } from "./constants";

test.describe("로그인 상태 테스트", () => {
  test("로그인 후 사용자 정보가 헤더에 표시됨", async ({ page }) => {
    await page.goto("/");

    const userMenu = page.getByRole("button", { name: new RegExp(E2E_USER_DISPLAY_NAME) });
    await expect(userMenu).toBeVisible();
  });

  test("로그인 후 컨텐츠 상세에서 보상 수정 버튼이 활성화됨", async ({ page }) => {
    await page.goto("/");

    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();

    const settingsButton = page.getByTestId("content-reward-section").getByRole("button");
    await expect(settingsButton).toBeVisible();
    await expect(settingsButton).toBeEnabled();
  });

  test("로그인 후 즐겨찾기 버튼 토글이 작동함", async ({ page }) => {
    await page.goto("/");

    const firstRow = page.locator("table tbody tr").first();
    const favoriteButton = firstRow.getByRole("button", { name: /즐겨찾기/ });
    await expect(favoriteButton).toBeVisible();

    const isPressedBefore = await favoriteButton.getAttribute("aria-pressed");

    await favoriteButton.click();

    const isPressedAfter = await favoriteButton.getAttribute("aria-pressed");
    expect(isPressedBefore).not.toBe(isPressedAfter);
  });
});
