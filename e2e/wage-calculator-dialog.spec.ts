import { expect, test } from "@playwright/test";

test.describe("시급 계산기 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("시급 계산기 버튼 클릭 시 다이얼로그가 열림", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "컨텐츠 시급 계산기" })
    ).toBeVisible();
  });

  test("소요시간 입력 필드가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("spinbutton", { name: "분" })).toBeVisible();
    await expect(dialog.getByRole("spinbutton", { name: "초" })).toBeVisible();
  });

  test("보상 입력 필드가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    const expectedFields = [
      "골드",
      "운명의 파편",
      "운명의 돌파석",
      "운명의 파괴석",
      "운명의 수호석",
      "1레벨 보석",
      "용암의 숨결",
      "빙하의 숨결",
      "실링",
      "카드 경험치",
    ];

    for (const field of expectedFields) {
      await expect(
        dialog.getByRole("spinbutton", { name: field })
      ).toBeVisible();
    }
  });

  test("계산 및 닫기 버튼이 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "계산" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "닫기" })).toBeVisible();
  });

  test("닫기 버튼 클릭 시 다이얼로그가 닫힘", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "닫기" }).click();
    await expect(dialog).not.toBeVisible();
  });
});
