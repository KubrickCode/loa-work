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

  test("컨텐츠 종류 필터 선택 시 테이블이 해당 종류만 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "필터" }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "카제로스 레이드" }).click();

    // 옵션 선택 후 안정화 대기
    await page.waitForTimeout(300);

    // 다이얼로그가 아직 열려있으면 닫기
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }

    // 필터 적용 대기
    await page.waitForTimeout(500);

    // 테이블의 모든 행이 선택한 종류만 표시되는지 확인
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const categoryCell = rows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("카제로스 레이드");
    }
  });

  test("컨텐츠 종류 필터를 전체로 변경하면 모든 종류가 표시됨", async ({ page }) => {
    // 초기 행 수 저장
    const initialRowCount = await page.locator("table tbody tr").count();

    // 먼저 특정 종류로 필터링
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "카제로스 레이드" }).click();
    await page.waitForTimeout(300);
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }
    await page.waitForTimeout(500);

    const filteredRowCount = await page.locator("table tbody tr").count();
    expect(filteredRowCount).toBeLessThan(initialRowCount);

    // 다시 전체로 변경
    await page.getByRole("button", { name: "필터" }).click();
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "전체" }).click();
    await page.waitForTimeout(300);
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }
    await page.waitForTimeout(500);

    const allRowCount = await page.locator("table tbody tr").count();
    expect(allRowCount).toBeGreaterThan(filteredRowCount);
  });
});
