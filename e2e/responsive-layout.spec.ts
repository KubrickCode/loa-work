import { expect, test } from "@playwright/test";

test.describe("반응형 레이아웃 (모바일)", () => {
  test.use({
    storageState: { cookies: [], origins: [] },
    viewport: { width: 375, height: 667 },
  });

  test("모바일 뷰포트에서 햄버거 메뉴가 표시됨", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 네비게이션 내 버튼(햄버거 메뉴) 확인
    const hamburgerMenu = page.getByRole("navigation").getByRole("button");
    await expect(hamburgerMenu).toBeVisible();

    // 데스크탑 네비게이션 버튼은 숨겨짐
    await expect(
      page.getByRole("button", { name: "컨텐츠별 시급" })
    ).not.toBeVisible();
  });

  test("햄버거 메뉴 클릭 시 네비게이션 메뉴 다이얼로그 표시", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 햄버거 메뉴 클릭
    await page.getByRole("navigation").getByRole("button").click();

    // 다이얼로그로 메뉴 표시 확인
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "컨텐츠별 시급" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "컨텐츠별 보상" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "아이템 시세" })
    ).toBeVisible();
    await expect(dialog.getByRole("button", { name: "설명서" })).toBeVisible();
  });

  test("모바일 뷰포트에서 테이블이 표시됨", async ({ page }) => {
    await page.goto("/");

    const table = page.locator("table");
    await expect(table).toBeVisible();

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });

  test("모바일 뷰포트에서 테이블 가로 스크롤이 가능함", async ({ page }) => {
    await page.goto("/");

    // 테이블 데이터 로딩 대기
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 테이블 컨테이너에서 가로 스크롤 가능 여부 확인
    const scrollInfo = await page.evaluate(() => {
      const table = document.querySelector("table");
      const container = table?.parentElement;
      if (container) {
        return {
          scrollWidth: container.scrollWidth,
          clientWidth: container.clientWidth,
          hasHorizontalScroll: container.scrollWidth > container.clientWidth,
        };
      }
      return null;
    });

    expect(scrollInfo).not.toBeNull();
    expect(scrollInfo?.hasHorizontalScroll).toBe(true);

    // 테이블 헤더 텍스트가 DOM에 존재하는지 확인 (th 요소 내부)
    const headerTexts = await page.evaluate(() => {
      const headers = document.querySelectorAll("table thead th");
      return Array.from(headers).map((th) => th.textContent?.trim());
    });

    expect(headerTexts).toContain("즐겨찾기");
    expect(headerTexts).toContain("종류");
    expect(headerTexts).toContain("이름");
    expect(headerTexts).toContain("시급(원)");
    expect(headerTexts).toContain("1수당 골드");
  });

  test("모바일 뷰포트에서 필터 다이얼로그가 정상 동작함", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor({ timeout: 15000 });

    // 필터 버튼 클릭
    await page.getByRole("button", { name: "필터" }).click();

    // 필터 다이얼로그 확인
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 필터 옵션들이 표시됨
    await expect(dialog.getByText("컨텐츠 종류")).toBeVisible();
    await expect(dialog.getByText("컨텐츠 보상 종류")).toBeVisible();
    await expect(dialog.getByText("더보기 포함 여부")).toBeVisible();
    await expect(dialog.getByText("귀속 재료 포함 여부")).toBeVisible();
    await expect(dialog.getByText("관문 합쳐보기")).toBeVisible();

    // 닫기 버튼 동작 확인
    await dialog.getByRole("button", { name: "close" }).click();
    await expect(dialog).not.toBeVisible();
  });
});
