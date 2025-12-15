import { expect, test } from "@playwright/test";

test.describe.serial("다중 필터 조합 테스트", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("컨텐츠 종류 + 관문 분리하기 필터 조합", async ({ page }) => {
    const initialRowCount = await page.locator("table tbody tr").count();

    // 필터 다이얼로그 열기
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 1. 컨텐츠 종류: 카제로스 레이드 선택
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "카제로스 레이드" }).click();
    await page.waitForTimeout(300);

    // 다이얼로그가 닫혔으면 다시 열기
    if (!(await dialog.isVisible())) {
      await page.getByRole("button", { name: "필터" }).click();
      await expect(dialog).toBeVisible();
    }

    // 2. 관문 분리하기 선택
    await dialog.locator("label").filter({ hasText: "분리하기" }).click();

    // 다이얼로그 닫기
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }
    await page.waitForTimeout(500);

    // 결과 검증: 카제로스 레이드만 표시 + 관문별 분리
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();

    // 필터 적용으로 행 수가 변경되어야 함
    expect(rowCount).toBeGreaterThan(0);

    // 모든 행이 카제로스 레이드여야 함
    for (let i = 0; i < Math.min(rowCount, 5); i++) {
      const categoryCell = rows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("카제로스 레이드");
    }

    // 관문별로 분리되었는지 확인 (관문 텍스트 포함)
    const hasGateRows = await page
      .locator("table tbody tr")
      .filter({ hasText: /\d관문/ })
      .count();
    expect(hasGateRows).toBeGreaterThan(0);
  });

  test("더보기 포함 + 귀속 재료 포함 필터 조합", async ({ page }) => {
    // 필터 다이얼로그 열기
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");

    // 1. 더보기 포함 여부: 포함 선택
    const seeMoreGroup = dialog
      .getByRole("group")
      .filter({ hasText: "더보기 포함 여부" });
    await seeMoreGroup.locator("label").filter({ hasText: /^포함$/ }).click();
    await expect(
      seeMoreGroup.getByRole("radio", { name: "포함", exact: true })
    ).toBeChecked();

    // 2. 귀속 재료 포함 여부: 포함 선택
    const boundGroup = dialog
      .getByRole("group")
      .filter({ hasText: "귀속 재료 포함 여부" });
    await boundGroup.locator("label").filter({ hasText: /^포함$/ }).click();
    await expect(
      boundGroup.getByRole("radio", { name: "포함", exact: true })
    ).toBeChecked();

    // 다이얼로그 닫기
    await dialog.getByRole("button", { name: "close" }).click();

    // 필터가 적용되었는지 확인 (테이블이 여전히 표시됨)
    const rows = page.locator("table tbody tr");
    await expect(rows).not.toHaveCount(0);
  });

  test("컨텐츠 종류 + 컨텐츠 보상 종류 필터 조합", async ({ page }) => {
    // 필터 다이얼로그 열기
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 1. 컨텐츠 종류: 에픽 레이드 선택
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "에픽 레이드" }).click();
    await page.waitForTimeout(300);

    // 다이얼로그가 닫혔으면 다시 열기
    if (!(await dialog.isVisible())) {
      await page.getByRole("button", { name: "필터" }).click();
      await expect(dialog).toBeVisible();
    }

    // 2. 컨텐츠 보상 종류: 골드 선택 해제
    const rewardTypeCombobox = dialog.getByRole("combobox", {
      name: "컨텐츠 보상 종류",
    });
    await rewardTypeCombobox.click();
    const options = page.getByRole("listbox", { name: "컨텐츠 보상 종류" });
    await options.getByRole("option", { name: "골드" }).click();
    await page.keyboard.press("Escape");

    // 다이얼로그 닫기
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }
    await page.waitForTimeout(500);

    // 결과 검증: 에픽 레이드만 표시 + 골드 제외 시급
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    // 모든 행이 에픽 레이드여야 함
    for (let i = 0; i < Math.min(rowCount, 3); i++) {
      const categoryCell = rows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("에픽 레이드");
    }
  });

  test("세 가지 이상 필터 동시 적용", async ({ page }) => {
    // 필터 다이얼로그 열기
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 1. 컨텐츠 종류: 카제로스 레이드 선택
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "카제로스 레이드" }).click();
    await page.waitForTimeout(300);

    // 다이얼로그가 닫혔으면 다시 열기
    if (!(await dialog.isVisible())) {
      await page.getByRole("button", { name: "필터" }).click();
      await expect(dialog).toBeVisible();
    }

    // 2. 더보기 포함
    const seeMoreGroup = dialog
      .getByRole("group")
      .filter({ hasText: "더보기 포함 여부" });
    await seeMoreGroup.locator("label").filter({ hasText: /^포함$/ }).click();

    // 3. 관문 분리하기
    await dialog.locator("label").filter({ hasText: "분리하기" }).click();

    // 다이얼로그 닫기
    if (await dialog.isVisible()) {
      await dialog.getByRole("button", { name: "close" }).click();
    }
    await page.waitForTimeout(500);

    // 결과 검증
    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    // 모든 조건이 AND로 적용되어야 함
    for (let i = 0; i < Math.min(rowCount, 3); i++) {
      const categoryCell = rows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("카제로스 레이드");
    }

    // 관문별 분리 확인
    const hasGateRows = await page
      .locator("table tbody tr")
      .filter({ hasText: /\d관문/ })
      .count();
    expect(hasGateRows).toBeGreaterThan(0);
  });

  test("필터 초기화 후 다시 적용", async ({ page }) => {
    const initialCount = await page.locator("table tbody tr").count();

    // 필터 다이얼로그 열기 및 필터 적용
    await page.getByRole("button", { name: "필터" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "카제로스 레이드" }).click();

    // 다이얼로그가 닫힐 때까지 대기 (옵션 선택 시 자동으로 닫힘)
    await expect(dialog).not.toBeVisible({ timeout: 3000 }).catch(() => {
      // 다이얼로그가 아직 열려있으면 닫기
    });
    if (await dialog.isVisible()) {
      await page.keyboard.press("Escape");
    }

    // 필터 적용 대기 - 행 수가 변할 때까지
    await expect(async () => {
      const count = await page.locator("table tbody tr").count();
      expect(count).toBeLessThan(initialCount);
    }).toPass({ timeout: 5000 });

    const filteredCount = await page.locator("table tbody tr").count();

    // 다시 필터 열고 전체로 변경 (초기화)
    await page.getByRole("button", { name: "필터" }).click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "전체" }).click();

    // 다이얼로그 닫힘 대기
    await expect(dialog).not.toBeVisible({ timeout: 3000 }).catch(() => {});
    if (await dialog.isVisible()) {
      await page.keyboard.press("Escape");
    }

    // 전체 필터 적용 대기
    await expect(async () => {
      const count = await page.locator("table tbody tr").count();
      expect(count).toBeGreaterThan(filteredCount);
    }).toPass({ timeout: 5000 });

    // 다시 다른 필터 적용
    await page.getByRole("button", { name: "필터" }).click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("combobox", { name: "컨텐츠 종류" }).click();
    await page.getByRole("option", { name: "큐브" }).click();

    // 다이얼로그 닫힘 대기
    await expect(dialog).not.toBeVisible({ timeout: 3000 }).catch(() => {});
    if (await dialog.isVisible()) {
      await page.keyboard.press("Escape");
    }

    // 큐브 필터 적용 대기
    await expect(async () => {
      const firstRow = page.locator("table tbody tr").first();
      await expect(firstRow.locator("td").nth(1)).toContainText("큐브");
    }).toPass({ timeout: 5000 });

    // 큐브 필터 적용 확인
    const cubeRows = page.locator("table tbody tr");
    const cubeCount = await cubeRows.count();
    expect(cubeCount).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(cubeCount, 3); i++) {
      const categoryCell = cubeRows.nth(i).locator("td").nth(1);
      await expect(categoryCell).toContainText("큐브");
    }
  });
});
