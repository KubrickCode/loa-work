import { expect, test } from "@playwright/test";

test.describe("홈 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지가 정상적으로 로드됨", async ({ page }) => {
    await expect(page).toHaveTitle(/로직장/);
  });

  test("백엔드에서 골드 환율을 표시함", async ({ page }) => {
    // 골드 환율 설정 버튼이 표시되는지 확인 (백엔드 API 호출 필요)
    const exchangeRateButton = page.getByRole("button", {
      name: /골드 환율 설정/,
    });
    await expect(exchangeRateButton).toBeVisible();

    // 환율 정보가 포함되어 있는지 확인 (예: "500:650")
    await expect(exchangeRateButton).toContainText(/\d+:\d+/);
  });

  test("백엔드에서 컨텐츠 시급 목록을 로드함", async ({ page }) => {
    // 테이블 행이 존재하는지 확인 (백엔드에서 데이터를 받아옴)
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });
});
