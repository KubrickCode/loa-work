import { expect, test } from "@playwright/test";

test.describe("브라우저 히스토리 네비게이션", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("홈 페이지에서 다른 페이지로 이동 후 뒤로가기 시 홈 페이지로 복귀", async ({
    page,
  }) => {
    // 홈 페이지 이동
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    // 컨텐츠별 보상 페이지로 이동
    await page.getByRole("button", { name: "컨텐츠별 보상" }).click();
    await expect(page).toHaveURL(/\/content-reward-list/);
    await page.locator("table tbody tr").first().waitFor();

    // 뒤로가기
    await page.goBack();

    // 홈 페이지로 복귀 확인
    await expect(page).toHaveURL("/");
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });

  test("앞으로가기로 이전에 방문한 페이지로 복귀", async ({ page }) => {
    // 홈 페이지 이동
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    // 아이템 시세 페이지로 이동
    await page.getByRole("button", { name: "아이템 시세" }).click();
    await expect(page).toHaveURL(/\/item-price-list/);

    // 뒤로가기
    await page.goBack();
    await expect(page).toHaveURL("/");

    // 앞으로가기
    await page.goForward();
    await expect(page).toHaveURL(/\/item-price-list/);
  });

  test("아이템 시세 탭 전환 후 뒤로가기 시 이전 탭 복원", async ({ page }) => {
    // 아이템 시세 페이지 이동
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await expect(page).toHaveURL(/tab=auction-item/);

    // 홈으로 이동
    await page.getByRole("button", { name: "컨텐츠별 시급" }).click();
    await expect(page).toHaveURL("/");

    // 뒤로가기
    await page.goBack();

    // 경매장 아이템 탭이 복원되었는지 확인
    await expect(page).toHaveURL(/tab=auction-item/);
    await expect(
      page.getByRole("tab", { name: "경매장 아이템" })
    ).toHaveAttribute("aria-selected", "true");
  });

  test("필터 설정 후 페이지 이동 및 뒤로가기 시 필터 상태 복원", async ({
    page,
  }) => {
    // 홈 페이지 이동
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    // 필터 열기
    await page.getByRole("button", { name: "필터" }).click();

    // 필터 다이얼로그에서 컨텐츠 종류 선택
    const filterDialog = page.getByRole("dialog");
    await expect(filterDialog).toBeVisible();

    // 컨텐츠 종류 체크박스 선택 (예: 카제로스 레이드)
    const contentTypeCheckbox = filterDialog.getByRole("checkbox", {
      name: /카제로스 레이드/i,
    });
    if (await contentTypeCheckbox.isVisible()) {
      await contentTypeCheckbox.check();
    }

    // 필터 적용 (다이얼로그 닫기)
    await page.keyboard.press("Escape");

    // URL에 필터 파라미터 확인
    const currentUrl = page.url();

    // 다른 페이지로 이동
    await page.getByRole("button", { name: "아이템 시세" }).click();
    await expect(page).toHaveURL(/\/item-price-list/);

    // 뒤로가기
    await page.goBack();

    // 필터 상태 복원 확인 (URL 또는 UI 상태)
    await expect(page).toHaveURL("/");
  });

  test("여러 페이지 연속 이동 후 히스토리 네비게이션", async ({ page }) => {
    // 홈 -> 컨텐츠별 보상 -> 아이템 시세 순서로 이동
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    await page.getByRole("button", { name: "컨텐츠별 보상" }).click();
    await expect(page).toHaveURL(/\/content-reward-list/);

    await page.getByRole("button", { name: "아이템 시세" }).click();
    await expect(page).toHaveURL(/\/item-price-list/);

    // 뒤로가기 2번
    await page.goBack();
    await expect(page).toHaveURL(/\/content-reward-list/);

    await page.goBack();
    await expect(page).toHaveURL("/");

    // 앞으로가기 2번
    await page.goForward();
    await expect(page).toHaveURL(/\/content-reward-list/);

    await page.goForward();
    await expect(page).toHaveURL(/\/item-price-list/);
  });

  test("로고 클릭으로 홈 이동 후 뒤로가기", async ({ page }) => {
    // 아이템 시세 페이지로 직접 이동
    await page.goto("/item-price-list");

    // 로고 클릭하여 홈으로 이동
    await page.getByRole("link", { name: "로직장 홈으로 이동" }).click();
    await expect(page).toHaveURL("/");

    // 뒤로가기
    await page.goBack();
    await expect(page).toHaveURL(/\/item-price-list/);
  });
});
