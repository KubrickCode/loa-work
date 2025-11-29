import { expect, test } from "@playwright/test";

test.describe("로그인 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("프로필 버튼 클릭 후 로그인 메뉴가 표시됨", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();

    await expect(page.getByRole("menuitem", { name: "로그인" })).toBeVisible();
  });

  test("로그인 클릭 시 로그인 다이얼로그가 열림", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();
    await page.getByRole("menuitem", { name: "로그인" }).click();

    const dialog = page.getByRole("dialog", { name: "로그인" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "로그인" })
    ).toBeVisible();
  });

  test("OAuth 로그인 버튼들이 표시됨", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();
    await page.getByRole("menuitem", { name: "로그인" }).click();

    const dialog = page.getByRole("dialog", { name: "로그인" });
    await expect(
      dialog.getByRole("button", { name: "Google로 계속하기" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Discord로 계속하기" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "카카오로 계속하기" })
    ).toBeVisible();
  });

  test("닫기 버튼 클릭 시 다이얼로그가 닫힘", async ({ page }) => {
    await page.getByRole("banner").getByRole("button").last().click();
    await page.getByRole("menuitem", { name: "로그인" }).click();

    const dialog = page.getByRole("dialog", { name: "로그인" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();
  });
});
