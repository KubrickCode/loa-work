import { expect, test } from "@playwright/test";

test.describe("아이템 시세 페이지", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/item-price-list");
  });

  test("기본 탭(거래소 아이템)이 선택되어 있음", async ({ page }) => {
    const marketTab = page.getByRole("tab", { name: "거래소 아이템" });
    await expect(marketTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "재련 재료" })).toBeVisible();
  });

  test("경매장 아이템 탭 클릭 시 URL과 콘텐츠가 변경됨", async ({ page }) => {
    await page.getByRole("tab", { name: "경매장 아이템" }).click();

    await expect(page).toHaveURL(/tab=auction-item/);

    const auctionTab = page.getByRole("tab", { name: "경매장 아이템" });
    await expect(auctionTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "겁화의 보석" })).toBeVisible();
  });

  test("기타 아이템 탭 클릭 시 URL과 콘텐츠가 변경됨", async ({ page }) => {
    await page.getByRole("tab", { name: "기타 아이템" }).click();

    await expect(page).toHaveURL(/tab=extra-item/);

    const extraTab = page.getByRole("tab", { name: "기타 아이템" });
    await expect(extraTab).toHaveAttribute("aria-selected", "true");

    await expect(page.getByRole("button", { name: "기타 아이템" })).toBeVisible();
  });

  test("각 탭에 테이블 데이터가 로드됨", async ({ page }) => {
    // 거래소 아이템 탭
    let tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);

    // 경매장 아이템 탭
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);

    // 기타 아이템 탭
    await page.getByRole("tab", { name: "기타 아이템" }).click();
    tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);
  });

  test("재련 재료 섹션에서 검색 시 테이블이 필터링됨", async ({ page }) => {
    const refiningRegion = page.getByRole("region", { name: "재련 재료" });
    const searchInput = refiningRegion.getByPlaceholder("검색");
    const table = refiningRegion.locator("table");

    // 데이터 로딩 대기
    await table.locator("tbody tr").first().waitFor({ timeout: 15000 });

    // 검색 전 아이템 수 확인
    const rowsBefore = await table.locator("tbody tr").count();
    expect(rowsBefore).toBeGreaterThan(1);

    // "파편" 검색
    await searchInput.fill("파편");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);

    // 필터링된 결과 확인
    const rowsAfter = await table.locator("tbody tr").count();
    expect(rowsAfter).toBeLessThan(rowsBefore);

    // 검색 결과가 "파편"을 포함하는지 확인
    const firstItemName = await table
      .locator("tbody tr")
      .first()
      .locator("td")
      .first()
      .textContent();
    expect(firstItemName).toContain("파편");
  });

  test("섹션별 검색이 독립적으로 동작함", async ({ page }) => {
    const refiningRegion = page.getByRole("region", { name: "재련 재료" });
    const additionalRegion = page.getByRole("region", { name: "재련 추가 재료" });

    const refiningTable = refiningRegion.locator("table");
    const additionalTable = additionalRegion.locator("table");

    // 데이터 로딩 대기
    await refiningTable.locator("tbody tr").first().waitFor({ timeout: 15000 });
    await additionalTable.locator("tbody tr").first().waitFor({ timeout: 15000 });

    // 검색 전 각 섹션의 아이템 수 확인
    const refiningRowsBefore = await refiningTable.locator("tbody tr").count();
    const additionalRowsBefore = await additionalTable.locator("tbody tr").count();

    // 재련 재료 섹션에서 "파편" 검색
    await refiningRegion.getByPlaceholder("검색").fill("파편");
    await refiningRegion.getByPlaceholder("검색").press("Enter");
    await page.waitForTimeout(500);

    // 재련 재료 섹션만 필터링됨
    const refiningRowsAfter = await refiningTable.locator("tbody tr").count();
    expect(refiningRowsAfter).toBeLessThan(refiningRowsBefore);

    // 재련 추가 재료 섹션은 영향받지 않음
    const additionalRowsUnchanged = await additionalTable.locator("tbody tr").count();
    expect(additionalRowsUnchanged).toBe(additionalRowsBefore);

    // 재련 추가 재료 섹션에서 "용암" 검색 (용암의 숨결만 매칭)
    await additionalRegion.getByPlaceholder("검색").fill("용암");
    await additionalRegion.getByPlaceholder("검색").press("Enter");
    await page.waitForTimeout(500);

    // 재련 추가 재료 섹션이 필터링됨
    const additionalRowsAfter = await additionalTable.locator("tbody tr").count();
    expect(additionalRowsAfter).toBeLessThan(additionalRowsBefore);

    // 재련 재료 섹션의 필터링 결과가 유지됨
    const refiningRowsFinal = await refiningTable.locator("tbody tr").count();
    expect(refiningRowsFinal).toBe(refiningRowsAfter);
  });

  test("검색어 삭제 시 전체 목록이 복원됨", async ({ page }) => {
    const refiningRegion = page.getByRole("region", { name: "재련 재료" });
    const searchInput = refiningRegion.getByPlaceholder("검색");
    const table = refiningRegion.locator("table");

    // 데이터 로딩 대기
    await table.locator("tbody tr").first().waitFor({ timeout: 15000 });

    // 전체 아이템 수 확인
    const rowsAll = await table.locator("tbody tr").count();

    // 검색 후 필터링
    await searchInput.fill("파편");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const rowsFiltered = await table.locator("tbody tr").count();
    expect(rowsFiltered).toBeLessThan(rowsAll);

    // 검색어 삭제
    await searchInput.clear();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);

    // 전체 목록 복원 확인
    const rowsRestored = await table.locator("tbody tr").count();
    expect(rowsRestored).toBe(rowsAll);
  });

  test("전일 평균 거래가 정렬 버튼 클릭 시 테이블이 정렬됨", async ({
    page,
  }) => {
    const relicRegion = page.getByRole("region", { name: "유물 각인서" });
    const table = relicRegion.locator("table");

    // 데이터 로딩 대기
    await table.locator("tbody tr").first().waitFor({ timeout: 15000 });

    // 정렬 전 첫 번째 아이템의 가격 확인
    const firstPriceBefore = await table
      .locator("tbody tr")
      .first()
      .locator("td")
      .nth(2)
      .textContent();

    // 전일 평균 거래가 정렬 컨트롤 클릭 (role="button"인 정렬 컨트롤)
    const sortControl = table
      .locator("th")
      .filter({ hasText: "전일 평균 거래가" })
      .getByRole("button");
    await sortControl.click();
    await page.waitForTimeout(300);

    // 정렬 후 첫 번째 아이템의 가격 확인
    const firstPriceAfter = await table
      .locator("tbody tr")
      .first()
      .locator("td")
      .nth(2)
      .textContent();

    // 가격이 변경됨 (정렬 적용됨)
    expect(firstPriceBefore).not.toBe(firstPriceAfter);
  });

  test("전일 평균 거래가 오름차순 정렬 시 낮은 가격이 먼저 표시됨", async ({
    page,
  }) => {
    const relicRegion = page.getByRole("region", { name: "유물 각인서" });
    const table = relicRegion.locator("table");

    // 데이터 로딩 대기
    await table.locator("tbody tr").first().waitFor({ timeout: 15000 });

    // 정렬 컨트롤 클릭 (오름차순)
    const sortControl = table
      .locator("th")
      .filter({ hasText: "전일 평균 거래가" })
      .getByRole("button");
    await sortControl.click();
    await page.waitForTimeout(300);

    // 테이블의 가격 값들을 수집
    const rows = table.locator("tbody tr");
    const rowCount = await rows.count();
    const prices: number[] = [];

    for (let i = 0; i < Math.min(rowCount, 5); i++) {
      const priceText = await rows.nth(i).locator("td").nth(2).textContent();
      if (priceText) {
        prices.push(parseInt(priceText.replace(/[,G\s]/g, ""), 10));
      }
    }

    // 가격이 오름차순인지 확인
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test("경매장 아이템 탭 평균 즉시 구매가 info 버튼 클릭 시 툴팁 표시", async ({
    page,
  }) => {
    // 경매장 아이템 탭으로 이동
    await page.getByRole("tab", { name: "경매장 아이템" }).click();
    await expect(page).toHaveURL(/tab=auction-item/);

    // 겁화의 보석 섹션의 info 버튼 클릭
    const gemRegion = page.getByRole("region", { name: "겁화의 보석" });
    await gemRegion.getByLabel("info").click();

    // 툴팁 다이얼로그 확인
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("즉시 구매가 최저가순 첫 페이지 10개 항목 평균입니다");
  });

  test("기타 아이템 탭 아코디언 expand/collapse 동작", async ({ page }) => {
    // 기타 아이템 탭으로 이동
    await page.getByRole("tab", { name: "기타 아이템" }).click();
    await expect(page).toHaveURL(/tab=extra-item/);

    const accordionButton = page.getByRole("button", { name: "기타 아이템" });
    const accordionRegion = page.getByRole("region", { name: "기타 아이템" });

    // 초기 상태: expanded
    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");
    await expect(accordionRegion).toBeVisible();

    // collapse
    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute("aria-expanded", "false");
    await expect(accordionRegion).not.toBeVisible();

    // expand
    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");
    await expect(accordionRegion).toBeVisible();
  });

  test("기타 아이템 탭 테이블에 데이터 표시됨", async ({ page }) => {
    // 기타 아이템 탭으로 이동
    await page.getByRole("tab", { name: "기타 아이템" }).click();

    const extraRegion = page.getByRole("region", { name: "기타 아이템" });
    const table = extraRegion.locator("table");

    // 테이블 로드 대기
    await table.locator("tbody tr").first().waitFor();

    // 테이블 헤더 확인
    await expect(table.locator("th")).toContainText(["아이템", "개당 골드 가치"]);

    // 데이터 행이 존재하는지 확인
    const rowCount = await table.locator("tbody tr").count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("기타 아이템 탭 info 버튼 클릭 시 툴팁 표시", async ({ page }) => {
    // 기타 아이템 탭으로 이동
    await page.getByRole("tab", { name: "기타 아이템" }).click();

    const extraRegion = page.getByRole("region", { name: "기타 아이템" });
    await extraRegion.getByRole("button", { name: "info" }).click();

    // 툴팁 다이얼로그 확인
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("로그인 후 수정 가능합니다");
  });
});
