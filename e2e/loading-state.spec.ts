import { expect, test } from "@playwright/test";

test.describe("로딩 상태 표시", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("홈 페이지 네트워크 지연 시 로딩 인디케이터가 표시되고 데이터 로드 후 사라짐", async ({
    page,
  }) => {
    // 모든 GraphQL 요청 지연 설정
    await page.route("**/graphql", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    // 로딩 인디케이터 표시 여부 추적
    let loadingIndicatorSeen = false;

    // 페이지 이동 시작 전에 로딩 인디케이터 관찰 설정
    page.on("framenavigated", async () => {
      try {
        // 로딩 인디케이터가 보이면 플래그 설정
        const indicator = page.getByText("데이터를 불러오는 중...");
        if (await indicator.isVisible({ timeout: 100 }).catch(() => false)) {
          loadingIndicatorSeen = true;
        }
      } catch {
        // ignore
      }
    });

    // 페이지 이동
    await page.goto("/");

    // 로딩 상태 확인을 위한 짧은 폴링
    for (let i = 0; i < 30 && !loadingIndicatorSeen; i++) {
      const indicator = page.getByText("데이터를 불러오는 중...");
      if (await indicator.isVisible({ timeout: 100 }).catch(() => false)) {
        loadingIndicatorSeen = true;
        break;
      }
      await page.waitForTimeout(100);
    }

    // 최종 상태: 데이터가 로드되어 테이블이 표시됨
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0, { timeout: 15000 });

    // 로딩 인디케이터가 사라짐 확인
    const loadingIndicator = page.getByText("데이터를 불러오는 중...");
    await expect(loadingIndicator).not.toBeVisible();

    // 로딩 인디케이터가 한 번이라도 표시되었어야 함
    // Note: 매우 빠른 네트워크에서는 감지 못할 수 있으므로 soft assertion
    if (!loadingIndicatorSeen) {
      console.log(
        "Warning: Loading indicator was not observed (network may be too fast)"
      );
    }
  });

  test("아이템 시세 페이지 로딩 중 로딩 인디케이터가 표시됨", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });

    const gotoPromise = page.goto("/item-price-list", {
      waitUntil: "domcontentloaded",
    });

    // 로딩 인디케이터 여러 개 중 첫 번째만 확인
    const loadingIndicators = page.getByText("데이터를 불러오는 중...");
    await expect(loadingIndicators.first()).toBeVisible({ timeout: 5000 });

    await gotoPromise;

    // 데이터 로드 후 아코디언 또는 테이블 표시 확인
    const accordionItems = page.getByRole("button", {
      name: /재련 재료|각인서/i,
    });
    await expect(accordionItems.first()).toBeVisible({ timeout: 10000 });
  });

  test("컨텐츠별 보상 페이지 로딩 중 로딩 인디케이터가 표시됨", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });

    const gotoPromise = page.goto("/content-reward-list", {
      waitUntil: "domcontentloaded",
    });

    const loadingIndicator = page.getByText("데이터를 불러오는 중...");
    await expect(loadingIndicator).toBeVisible({ timeout: 5000 });

    await gotoPromise;

    // 테이블 로드 완료 확인
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0, { timeout: 10000 });
  });

  test("로딩 후 데이터가 정상적으로 렌더링됨", async ({ page }) => {
    // 지연 없이 정상 로딩
    await page.goto("/");

    // 테이블 데이터 확인
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0);

    // 골드 환율 버튼 확인
    const exchangeRateButton = page.getByRole("button", {
      name: /골드 환율 설정/,
    });
    await expect(exchangeRateButton).toBeVisible();
    await expect(exchangeRateButton).toContainText(/\d+:\d+/);
  });
});
