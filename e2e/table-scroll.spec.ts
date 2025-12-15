import { expect, test } from "@playwright/test";

test.describe("테이블 가로 스크롤", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("데스크톱 뷰포트에서 테이블이 스크롤 없이 표시됨", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    const table = page.locator("table");
    const scrollInfo = await table.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      needsScroll: el.scrollWidth > el.clientWidth,
    }));

    // 데스크톱에서는 가로 스크롤이 필요하지 않음
    expect(scrollInfo.needsScroll).toBe(false);
  });

  test("모든 컬럼 헤더가 표시됨", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    const expectedHeaders = [
      "즐겨찾기",
      "종류",
      "레벨",
      "이름",
      "소요시간",
      "시급(원)",
      "시급(골드)",
      "1수당 골드",
    ];

    for (const header of expectedHeaders) {
      await expect(
        page.locator("th").filter({ hasText: header })
      ).toBeVisible();
    }
  });
});
