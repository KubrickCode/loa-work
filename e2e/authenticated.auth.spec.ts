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
    await page.locator("table tbody tr").first().waitFor();

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

  test("골드 환율 수정 및 저장이 정상 동작함", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    // 환율 설정 다이얼로그 열기
    await page.getByRole("button", { name: /골드 환율 설정/ }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 새 환율 입력 (기존값 +10)
    const input = dialog.getByRole("spinbutton", { name: /100골드 당 원/ });
    const currentValue = await input.inputValue();
    const newValue = (parseInt(currentValue) + 10).toString();
    await input.fill(newValue);

    // 저장
    await dialog.getByRole("button", { name: "저장" }).click();

    // 다이얼로그 닫힘 확인
    await expect(dialog).not.toBeVisible();

    // 성공 알림 확인
    await expect(page.getByText("골드 환율이 수정되었습니다.")).toBeVisible();

    // 원래 값으로 복구
    await page.getByRole("button", { name: /골드 환율 설정/ }).click();
    await expect(dialog).toBeVisible();
    await input.fill(currentValue);
    await dialog.getByRole("button", { name: "저장" }).click();
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

  test("컨텐츠 소요시간 수정 및 저장이 정상 동작함", async ({ page }) => {
    await page.goto("/");

    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();

    const detailDialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(detailDialog).toBeVisible();

    // 소요시간 수정 버튼 클릭
    const durationEditButton = detailDialog
      .locator("dt", { hasText: /^소요 시간$/ })
      .locator("..")
      .locator("..")
      .getByRole("button");
    await durationEditButton.click();

    // 소요시간 수정 다이얼로그 확인
    const editDialog = page.getByRole("dialog").filter({
      has: page.getByRole("heading", { name: /소요시간 수정$/ }),
    });
    await expect(editDialog).toBeVisible();

    // 분 입력 필드에 새 값 입력
    const minuteInput = editDialog.getByRole("spinbutton", { name: "분" });
    const currentMinutes = await minuteInput.inputValue();
    const newMinutes = (parseInt(currentMinutes) + 2).toString();
    await minuteInput.fill(newMinutes);

    // 저장
    await editDialog.getByRole("button", { name: "저장" }).click();

    // 성공 알림 확인
    await expect(page.getByText("컨텐츠 소요시간이 수정되었습니다.")).toBeVisible();

    // 원래 값으로 복구
    await durationEditButton.click();
    await expect(editDialog).toBeVisible();
    await minuteInput.fill(currentMinutes);
    await editDialog.getByRole("button", { name: "저장" }).click();
  });

  test("컨텐츠 보상 수정 및 저장이 정상 동작함", async ({ page }) => {
    await page.goto("/");

    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();

    const detailDialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(detailDialog).toBeVisible();

    // 보상 수정 버튼 클릭
    const rewardEditButton = detailDialog
      .locator("p", { hasText: /^보상 정보$/ })
      .locator("..")
      .getByRole("button");
    await rewardEditButton.click();

    // 보상 수정 다이얼로그 확인
    const editDialog = page.getByRole("dialog").filter({
      has: page.getByRole("heading", { name: /보상 수정$/ }),
    });
    await expect(editDialog).toBeVisible();

    // 운명의 파편 입력 필드에 새 값 입력
    const fragmentInput = editDialog.getByRole("spinbutton", {
      name: "운명의 파편",
    });
    const currentValue = await fragmentInput.inputValue();
    const newValue = (parseFloat(currentValue) + 100).toString();
    await fragmentInput.fill(newValue);

    // 저장
    await editDialog.getByRole("button", { name: "저장" }).click();

    // 성공 알림 확인
    await expect(page.getByText("컨텐츠 보상이 수정되었습니다.")).toBeVisible();

    // 원래 값으로 복구
    await rewardEditButton.click();
    await expect(editDialog).toBeVisible();
    await fragmentInput.fill(currentValue);
    await editDialog.getByRole("button", { name: "저장" }).click();
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
