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

  test("로그인 후 골드 환율 설정 버튼이 활성화됨", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    const exchangeRateButton = page.getByRole("button", {
      name: /골드 환율 설정/,
    });
    await expect(exchangeRateButton).toBeVisible();
    await expect(exchangeRateButton).toBeEnabled();
  });

  test("로그인 후 골드 환율 설정 다이얼로그가 열림", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    await page.getByRole("button", { name: /골드 환율 설정/ }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("골드 환율 설정")).toBeVisible();
  });

  test("로그인 후 컨텐츠 상세에서 소요시간 수정 버튼이 활성화됨", async ({
    page,
  }) => {
    await page.goto("/");

    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog).toBeVisible();

    // 소요 시간 수정 버튼 확인
    const durationEditButton = dialog
      .locator("dt", { hasText: /^소요 시간$/ })
      .locator("..")
      .locator("..")
      .getByRole("button");
    await expect(durationEditButton).toBeEnabled();
  });

  test("로그아웃 후 UI가 비로그인 상태로 변경됨", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    // 사용자 메뉴 클릭
    const userMenu = page.getByRole("button", {
      name: new RegExp(E2E_USER_DISPLAY_NAME),
    });
    await userMenu.click();

    // 로그아웃 클릭
    await page.getByRole("menuitem", { name: "로그아웃" }).click();

    // 비로그인 상태 확인: 골드 환율 설정 버튼 비활성화
    const exchangeRateButton = page.getByRole("button", {
      name: /골드 환율 설정/,
    });
    await expect(exchangeRateButton).toBeDisabled();
  });
});
