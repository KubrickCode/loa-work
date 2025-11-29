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

  test("시급 정보 섹션 필터 버튼 클릭 시 필터 팝오버 표시", async ({ page }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });
    await expect(dialog).toBeVisible();

    // 시급 정보 섹션의 필터 버튼 클릭
    await dialog.getByRole("button", { name: "필터" }).first().click();

    // 필터 팝오버 확인
    const filterDialog = dialog.getByRole("dialog");
    await expect(filterDialog).toBeVisible();

    // 필터 옵션 확인
    await expect(filterDialog.getByText("컨텐츠 보상 종류")).toBeVisible();
    await expect(filterDialog.getByText("더보기 포함 여부")).toBeVisible();
    await expect(filterDialog.getByText("귀속 재료 포함 여부")).toBeVisible();
  });

  test("시급 정보 필터 팝오버에서 더보기 포함 여부 라디오 버튼 변경이 동작함", async ({
    page,
  }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });

    // 시급 정보 섹션의 필터 버튼 클릭
    await dialog.getByRole("button", { name: "필터" }).first().click();

    const filterDialog = dialog.getByRole("dialog");
    await expect(filterDialog).toBeVisible();

    const seeMoreGroup = filterDialog
      .getByRole("group")
      .filter({ hasText: "더보기 포함 여부" });
    const excludeRadio = seeMoreGroup.getByRole("radio", {
      name: "미포함",
      exact: true,
    });
    const includeRadio = seeMoreGroup.getByRole("radio", {
      name: "포함",
      exact: true,
    });

    // 기본값: 미포함 선택됨
    await expect(excludeRadio).toBeChecked();
    await expect(includeRadio).not.toBeChecked();

    // 포함으로 변경 (라벨 클릭)
    await seeMoreGroup.locator("label").filter({ hasText: /^포함$/ }).click();
    await expect(includeRadio).toBeChecked();
    await expect(excludeRadio).not.toBeChecked();

    // 다시 미포함으로 변경
    await seeMoreGroup.locator("label").filter({ hasText: "미포함" }).click();
    await expect(excludeRadio).toBeChecked();
    await expect(includeRadio).not.toBeChecked();
  });

  test("시급 정보 필터 팝오버에서 귀속 재료 포함 여부 라디오 버튼 변경이 동작함", async ({
    page,
  }) => {
    await page.locator("table tbody tr").first().click();

    const dialog = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "컨텐츠 상세 정보" }) });

    // 시급 정보 섹션의 필터 버튼 클릭
    await dialog.getByRole("button", { name: "필터" }).first().click();

    const filterDialog = dialog.getByRole("dialog");
    await expect(filterDialog).toBeVisible();

    const boundGroup = filterDialog
      .getByRole("group")
      .filter({ hasText: "귀속 재료 포함 여부" });
    const excludeRadio = boundGroup.getByRole("radio", {
      name: "미포함",
      exact: true,
    });
    const includeRadio = boundGroup.getByRole("radio", {
      name: "포함",
      exact: true,
    });

    // 기본값: 미포함 선택됨
    await expect(excludeRadio).toBeChecked();
    await expect(includeRadio).not.toBeChecked();

    // 포함으로 변경 (라벨 클릭)
    await boundGroup.locator("label").filter({ hasText: /^포함$/ }).click();
    await expect(includeRadio).toBeChecked();
    await expect(excludeRadio).not.toBeChecked();

    // 다시 미포함으로 변경
    await boundGroup.locator("label").filter({ hasText: "미포함" }).click();
    await expect(excludeRadio).toBeChecked();
    await expect(includeRadio).not.toBeChecked();
  });
});
