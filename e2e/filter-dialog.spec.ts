import { expect, test } from "@playwright/test";

test.describe("필터 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("필터 버튼 클릭 시 다이얼로그가 열림", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
  });

  test("컨텐츠 종류 필터가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("컨텐츠 종류")).toBeVisible();
    await expect(
      dialog.getByRole("combobox", { name: "컨텐츠 종류" })
    ).toBeVisible();
  });

  test("컨텐츠 보상 종류 필터가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("컨텐츠 보상 종류")).toBeVisible();
    await expect(
      dialog.getByRole("combobox", { name: "컨텐츠 보상 종류" })
    ).toBeVisible();
  });

  test("더보기 포함 여부 라디오 버튼이 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByText("컨텐츠 종류") });
    const group = dialog.getByRole("group").filter({ hasText: "더보기 포함 여부" });
    await expect(group).toBeVisible();
    await expect(
      group.getByRole("radio", { name: "미포함", exact: true })
    ).toBeChecked();
    await expect(
      group.getByRole("radio", { name: "포함", exact: true })
    ).not.toBeChecked();
  });

  test("귀속 재료 포함 여부 라디오 버튼이 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("귀속 재료 포함 여부")).toBeVisible();
  });

  test("관문 합쳐보기 라디오 버튼이 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("관문 합쳐보기")).toBeVisible();
    await expect(dialog.getByRole("radio", { name: "합쳐보기" })).toBeChecked();
  });

  test("닫기 버튼 클릭 시 다이얼로그가 닫힘", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "close" }).click();
    await expect(dialog).not.toBeVisible();
  });
});
