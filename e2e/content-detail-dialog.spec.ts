import { expect, test } from "@playwright/test";

test.describe("컨텐츠 상세 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("테이블 행 클릭 시 상세 다이얼로그가 열림", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "컨텐츠 상세 정보" })
    ).toBeVisible();
  });

  test("다이얼로그에 기본 정보 섹션이 표시됨", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog.getByText("기본 정보")).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^종류$/ })).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^레벨$/ })).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^이름$/ })).toBeVisible();
  });

  test("다이얼로그에 시급 정보 섹션이 표시됨", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog.getByText("시급 정보")).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^소요 시간$/ })).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^시급\(원\)$/ })).toBeVisible();
    await expect(
      dialog.locator("dt", { hasText: /^시급\(골드\)$/ })
    ).toBeVisible();
    await expect(
      dialog.locator("dt", { hasText: /^1수당 골드$/ })
    ).toBeVisible();
  });

  test("다이얼로그에 보상 정보 섹션이 표시됨", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog.getByText("보상 정보")).toBeVisible();
  });

  test("닫기 버튼 클릭 시 다이얼로그가 닫힘", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "닫기" }).click();
    await expect(dialog).not.toBeVisible();
  });
});
