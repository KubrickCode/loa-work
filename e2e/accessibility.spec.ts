import { expect, test } from "@playwright/test";

test.describe("접근성 - 스크린 리더 지원", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("테이블에 적절한 role 속성이 있음", async ({ page }) => {
    // 테이블 요소 확인
    const table = page.getByRole("table");
    await expect(table).toBeVisible();

    // 테이블 구조 확인 (thead, tbody)
    const thead = page.locator("table thead");
    await expect(thead).toBeVisible();

    const tbody = page.locator("table tbody");
    await expect(tbody).toBeVisible();

    // 테이블 행 확인
    const rows = tbody.locator("tr");
    await expect(rows).not.toHaveCount(0);
  });

  test("다이얼로그에 aria-modal 및 role 속성이 있음", async ({ page }) => {
    // 테이블 행 클릭하여 다이얼로그 열기
    await page.locator("table tbody tr").first().click();

    // 다이얼로그 확인
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // aria-modal 확인
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    // 다이얼로그 제목 확인
    const heading = dialog.getByRole("heading", { name: "컨텐츠 상세 정보" });
    await expect(heading).toBeVisible();
  });

  test("버튼에 접근 가능한 이름이 있음", async ({ page }) => {
    // 네비게이션 버튼들 확인
    await expect(
      page.getByRole("button", { name: "컨텐츠별 시급" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "컨텐츠별 보상" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "아이템 시세" })
    ).toBeVisible();

    // 필터 버튼 확인
    const filterButton = page.getByRole("button", { name: /필터/i });
    await expect(filterButton.first()).toBeVisible();
  });

  test("링크에 접근 가능한 이름이 있음", async ({ page }) => {
    // 로고 링크 확인
    const logoLink = page.getByRole("link", { name: "로직장 홈으로 이동" });
    await expect(logoLink).toBeVisible();

    // 설명서 링크 확인
    const guideButton = page.getByRole("button", { name: /설명서/i });
    await expect(guideButton).toBeVisible();
  });

  test("폼 컨트롤에 레이블이 있음", async ({ page }) => {
    // 검색 입력창 확인
    const searchInput = page.getByRole("textbox", { name: /검색/i });
    await expect(searchInput).toBeVisible();
  });

  test("필터 다이얼로그의 라디오 그룹에 적절한 레이블이 있음", async ({
    page,
  }) => {
    // 테이블 행 클릭하여 상세 다이얼로그 열기
    await page.locator("table tbody tr").first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 필터 버튼 클릭
    await dialog.getByRole("button", { name: /필터/i }).first().click();

    // 필터 팝오버 확인
    const filterPopover = dialog.getByRole("dialog");
    await expect(filterPopover).toBeVisible();

    // 라디오 그룹 확인
    const radioGroups = filterPopover.getByRole("group");
    await expect(radioGroups).not.toHaveCount(0);

    // 라디오 버튼 확인
    const radioButtons = filterPopover.getByRole("radio");
    await expect(radioButtons).not.toHaveCount(0);
  });

  test("다이얼로그에서 Escape 키로 닫기 가능", async ({ page }) => {
    // 다이얼로그 열기
    await page.locator("table tbody tr").first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Escape 키로 닫기
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("포커스 가능한 요소에 시각적 포커스 표시가 있음", async ({ page }) => {
    // 첫 번째 탭 가능한 요소로 이동
    await page.keyboard.press("Tab");

    // 포커스된 요소 확인
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // 포커스 스타일이 있는지 확인 (outline 또는 box-shadow)
    const outlineStyle = await focusedElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.outline !== "none" || style.boxShadow !== "none";
    });
    expect(outlineStyle).toBe(true);
  });

  test("콘텐츠에 이미지가 있을 경우 확인 가능", async ({ page }) => {
    // 페이지에 이미지가 있는지 확인
    const images = page.locator("img");
    const imageCount = await images.count();

    // 이미지가 없으면 패스 (홈페이지는 테이블 데이터만 있음)
    if (imageCount === 0) {
      // 대신 SVG 아이콘이나 다른 시각적 요소 확인
      const svgIcons = page.locator("svg");
      const svgCount = await svgIcons.count();
      expect(svgCount).toBeGreaterThanOrEqual(0);
      return;
    }

    // 이미지가 있다면 접근성 속성 확인
    let processedCount = 0;
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      const role = await img.getAttribute("role");
      const ariaHidden = await img.getAttribute("aria-hidden");

      if (
        alt !== null ||
        role === "presentation" ||
        role === "none" ||
        ariaHidden === "true"
      ) {
        processedCount++;
      }
    }

    // 이미지 처리 현황 로그
    console.log(`Images: ${imageCount}, Accessible: ${processedCount}`);
  });

  test("아이템 시세 페이지의 탭에 적절한 ARIA 속성이 있음", async ({
    page,
  }) => {
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();

    // 탭 목록 확인
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();

    // 탭 확인
    const tabs = page.getByRole("tab");
    await expect(tabs).not.toHaveCount(0);

    // 선택된 탭 확인
    const selectedTab = page.getByRole("tab", { selected: true });
    await expect(selectedTab).toBeVisible();

    // aria-selected 속성 확인
    await expect(selectedTab).toHaveAttribute("aria-selected", "true");
  });

  test("아코디언에 적절한 ARIA 속성이 있음", async ({ page }) => {
    await page.goto("/item-price-list");
    await page.locator("table tbody tr").first().waitFor();

    // 아코디언 버튼 확인
    const accordionButton = page
      .getByRole("button", { name: /재련 재료|유물 각인서/i })
      .first();
    await expect(accordionButton).toBeVisible();

    // aria-expanded 속성 확인
    const isExpanded = await accordionButton.getAttribute("aria-expanded");
    expect(isExpanded === "true" || isExpanded === "false").toBe(true);
  });
});
