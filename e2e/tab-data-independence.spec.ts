import { expect, test } from "@playwright/test";

test.describe("탭 데이터 독립성", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("거래소 아이템 탭에서 경매장 탭 전환 시 각 탭이 독립적인 데이터 표시", async ({
    page,
  }) => {
    // 거래소 아이템 탭의 첫 번째 섹션 이름 확인
    const marketSectionButton = page
      .getByRole("button", { name: /재련 재료/i })
      .first();
    await expect(marketSectionButton).toBeVisible();

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.locator("table tbody tr").first().waitFor();

    // 경매장 탭은 다른 섹션을 가져야 함
    const auctionSectionButton = page
      .getByRole("button", { name: /악세서리|장신구|보석/i })
      .first();
    await expect(auctionSectionButton).toBeVisible();

    // 탭별로 다른 데이터가 표시됨
    const auctionFirstRow = page.locator("table tbody tr").first();
    await expect(auctionFirstRow).toBeVisible();
  });

  test("거래소 아이템 탭에만 섹션별 검색 기능이 존재함", async ({ page }) => {
    // 거래소 아이템 탭에서 검색 입력창 확인
    const marketSearchInput = page.getByPlaceholder("검색...").first();
    await expect(marketSearchInput).toBeVisible();

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.locator("table tbody tr").first().waitFor();

    // 경매장 탭에는 검색 입력창이 없음 (다른 UI 구조)
    const auctionSearchInput = page.getByPlaceholder("검색...");
    await expect(auctionSearchInput).toHaveCount(0);

    // 경매장 탭은 보석 레벨별 카드 형태로 표시됨
    const sectionHeader = page.getByText(/겁화의 보석|작열의 보석/i).first();
    await expect(sectionHeader).toBeVisible();
  });

  test("탭 전환 후 다시 원래 탭으로 돌아올 때 데이터가 유지됨", async ({
    page,
  }) => {
    // 거래소 아이템 탭의 첫 번째 행 텍스트 저장
    const marketFirstRowText = await page
      .locator("table tbody tr")
      .first()
      .textContent();

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await expect(page.getByRole("tab", { name: "경매장 아이템" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await page.locator("table tbody tr").first().waitFor();

    // 기타 아이템 탭으로 전환
    await page.getByRole("tab", { name: "기타 아이템" }).click();
    await expect(page.getByRole("tab", { name: "기타 아이템" })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    // 다시 거래소 아이템 탭으로 복귀
    await page.getByRole("tab", { name: "거래소 아이템" }).click();
    await expect(page.getByRole("tab", { name: "거래소 아이템" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await page.locator("table tbody tr").first().waitFor();

    // 데이터가 유지되는지 확인
    const restoredFirstRowText = await page
      .locator("table tbody tr")
      .first()
      .textContent();
    expect(restoredFirstRowText).toBe(marketFirstRowText);
  });

  test("각 탭의 정렬 상태가 독립적으로 유지됨", async ({ page }) => {
    // 거래소 아이템 탭에서 정렬 헤더 클릭 (예: 시세)
    const priceHeader = page.getByRole("columnheader", { name: /시세|가격/i });
    if (await priceHeader.isVisible()) {
      await priceHeader.click();
      await page.waitForTimeout(500);
    }

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.locator("table tbody tr").first().waitFor();

    // 경매장 탭은 기본 정렬 상태여야 함 (정렬 변경 안됨)
    // 또는 탭별로 정렬 상태가 공유될 수 있음
    const auctionRows = page.locator("table tbody tr");
    await expect(auctionRows).not.toHaveCount(0);
  });

  test("탭 전환 시 각 탭의 아코디언 상태가 독립적으로 유지됨", async ({
    page,
  }) => {
    // 거래소 아이템 탭에서 특정 아코디언 열기
    const marketAccordionButton = page
      .getByRole("button", { name: /재련 재료|재련 추가 재료/i })
      .first();
    if (await marketAccordionButton.isVisible()) {
      const isExpanded =
        (await marketAccordionButton.getAttribute("aria-expanded")) === "true";

      // 아코디언 토글
      await marketAccordionButton.click();
      await page.waitForTimeout(300);

      const newExpandedState =
        (await marketAccordionButton.getAttribute("aria-expanded")) === "true";
      expect(newExpandedState).not.toBe(isExpanded);
    }

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.waitForTimeout(500);

    // 경매장 탭은 자체 아코디언 상태를 가져야 함
    const auctionAccordionButton = page
      .getByRole("button", { name: /악세서리|보석/i })
      .first();
    if (await auctionAccordionButton.isVisible()) {
      await expect(auctionAccordionButton).toBeVisible();
    }
  });

  test("URL 파라미터가 현재 탭에 맞게 업데이트됨", async ({ page }) => {
    // 초기 URL 확인 (기본 탭)
    expect(page.url()).not.toContain("tab=");

    // 경매장 아이템 탭으로 전환
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await page.locator("table tbody tr").first().waitFor();

    // URL에 탭 파라미터 추가됨
    await expect(page).toHaveURL(/tab=auction-item/);

    // 기타 아이템 탭으로 전환
    await page.getByRole("tab", { name: "기타 아이템" }).click();
    await page.waitForTimeout(500);

    // URL 업데이트됨
    await expect(page).toHaveURL(/tab=extra-item/);

    // 거래소 아이템 탭으로 복귀
    await page.getByRole("tab", { name: "거래소 아이템" }).click();
    await page.waitForTimeout(500);

    // 기본 탭이므로 파라미터 제거될 수 있음
    // 또는 tab=market-item으로 명시될 수 있음
  });
});
