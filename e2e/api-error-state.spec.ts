import { expect, test } from "@playwright/test";

test.describe("API 에러 상태 표시", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("홈 페이지에서 GraphQL 에러 발생 시 에러 메시지가 표시됨", async ({
    page,
  }) => {
    // GraphQL 요청에 에러 응답 반환
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [
            {
              message: "서버 오류가 발생했습니다.",
              extensions: { code: "INTERNAL_SERVER_ERROR" },
            },
          ],
          data: null,
        }),
      });
    });

    await page.goto("/");

    // 에러 메시지 또는 에러 상태 확인
    // ErrorBoundary가 error.message를 표시함
    const errorMessage = page.getByText(/오류|error|Error/i);
    await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });

    // 콘솔 에러 확인
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleMessages.push(msg.text());
      }
    });

    // 앱이 크래시하지 않았는지 확인 (페이지가 여전히 응답함)
    await expect(page).toHaveTitle(/로직장/);
  });

  test("아이템 시세 페이지에서 네트워크 에러 발생 시 에러 메시지가 표시됨", async ({
    page,
  }) => {
    // 네트워크 에러 시뮬레이션
    await page.route("**/graphql", async (route) => {
      await route.abort("failed");
    });

    await page.goto("/item-price-list");

    // 에러 상태 또는 에러 메시지 확인
    const errorIndicator = page.getByText(/오류|error|Error|failed|실패/i);
    await expect(errorIndicator.first()).toBeVisible({ timeout: 10000 });
  });

  test("컨텐츠별 보상 페이지에서 서버 에러 발생 시 에러 메시지가 표시됨", async ({
    page,
  }) => {
    // 서버 에러 (500) 응답
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [{ message: "Internal Server Error" }],
        }),
      });
    });

    await page.goto("/content-reward-list");

    // 에러 상태 확인 - "Response not successful: Received status code 500" 메시지 포함
    const errorIndicator = page.getByText(/오류|error|Error|Response|status|500/i);
    await expect(errorIndicator.first()).toBeVisible({ timeout: 10000 });
  });

  test("에러 발생 후 재시도 가능 여부 확인", async ({ page }) => {
    let requestCount = 0;

    // 첫 번째 요청은 실패, 이후 요청은 성공
    await page.route("**/graphql", async (route) => {
      requestCount++;
      if (requestCount === 1) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [{ message: "일시적 오류" }],
            data: null,
          }),
        });
      } else {
        // 이후 요청은 정상 처리
        await route.continue();
      }
    });

    await page.goto("/");

    // 에러 메시지 확인
    const errorMessage = page.getByText(/오류|error/i);
    await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });

    // 페이지 새로고침으로 재시도
    await page.reload();

    // 정상 데이터 로드 확인
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).not.toHaveCount(0, { timeout: 10000 });
  });
});
