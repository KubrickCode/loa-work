import { expect, test } from "@playwright/test";

test.describe("컨텐츠별 보상 페이지", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("네비게이션을 통해 페이지가 정상적으로 로드됨", async ({ page }) => {
    await page.getByRole("button", { name: "컨텐츠별 보상" }).click();

    await expect(page).toHaveURL("/content-reward-list");
    await expect(page).toHaveTitle(/컨텐츠별 보상.*로직장/);
  });

  test("테이블 헤더가 올바르게 표시됨", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    const expectedHeaders = [
      "관리",
      "종류",
      "레벨",
      "이름",
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

    for (const header of expectedHeaders) {
      await expect(
        page.locator("th").filter({ hasText: new RegExp(`^${header}$`) })
      ).toBeVisible();
    }
  });

  test("테이블 데이터가 로드됨", async ({ page }) => {
    await page.goto("/content-reward-list");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });

  test("컨텐츠 종류 필터 선택 시 해당 종류만 표시됨", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 컨텐츠 종류 콤보박스 클릭
    const contentTypeCombobox = page.locator('[id^="select::"]').first();
    await contentTypeCombobox.click();

    // 큐브 선택
    await page.getByRole("option", { name: "큐브" }).click();

    // 필터 적용 대기
    await page.waitForTimeout(500);

    // 테이블의 모든 행이 큐브인지 확인
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const categoryCell = rows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("큐브");
    }
  });

  test("컨텐츠 종류 필터를 전체로 변경하면 모든 종류가 표시됨", async ({
    page,
  }) => {
    await page.goto("/content-reward-list");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 초기 행 수 저장
    const initialRowCount = await page.locator("table tbody tr").count();

    // 먼저 큐브로 필터링
    const contentTypeCombobox = page.locator('[id^="select::"]').first();
    await contentTypeCombobox.click();
    await page.getByRole("option", { name: "큐브" }).click();

    // 큐브 필터 결과 대기 (행 수가 줄어들 때까지)
    await expect(page.locator("table tbody tr")).not.toHaveCount(initialRowCount);

    const filteredRowCount = await page.locator("table tbody tr").count();
    expect(filteredRowCount).toBeLessThan(initialRowCount);

    // 다시 전체로 변경
    await contentTypeCombobox.click();
    await page.getByRole("option", { name: "전체" }).click();

    // 전체 필터 결과 대기 (행 수가 늘어날 때까지)
    await expect(page.locator("table tbody tr")).not.toHaveCount(filteredRowCount);

    const allRowCount = await page.locator("table tbody tr").count();
    expect(allRowCount).toBeGreaterThan(filteredRowCount);
  });

  test("테이블 행 클릭 시 컨텐츠 상세 다이얼로그가 표시됨", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 첫 번째 행 클릭
    await page.locator("table tbody tr").first().click();

    // 다이얼로그 확인
    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog).toBeVisible();

    // 기본 정보 섹션 확인
    await expect(dialog.getByText("기본 정보")).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^종류$/ })).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^레벨$/ })).toBeVisible();
    await expect(dialog.locator("dt", { hasText: /^이름$/ })).toBeVisible();

    // 시급 정보 섹션 확인
    await expect(dialog.getByText("시급 정보")).toBeVisible();

    // 보상 정보 섹션 확인
    await expect(dialog.getByText("보상 정보")).toBeVisible();
  });
});
